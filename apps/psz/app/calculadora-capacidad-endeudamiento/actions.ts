'use server'

/**
 * Server action de la calculadora de capacidad de endeudamiento.
 *
 * Pregunta a la inversa de la calculadora de hipoteca:
 *   - Hipoteca: "dado el préstamo, ¿cuál es mi cuota?"
 *   - Capacidad: "dado mi sueldo, ¿cuánto préstamo me darían?"
 *
 * Calcula 3 escenarios paralelos con distintos ratios de esfuerzo
 * (conservador 30%, estándar 35%, agresivo 40%) para que el usuario
 * vea su rango realista en función de hasta dónde se quiera apretar.
 *
 * Los rangos críticos (ratio máximo, edad máxima, LTV, etc.) son los
 * que aplica la banca minorista española en su mesa de riesgos, no
 * fórmulas matemáticas genéricas. Vienen de la experiencia operativa
 * con +20 entidades.
 */

import { BONO_10Y_ES } from '../calculadora-rentabilidad-inmobiliaria/benchmarks'

// ─────────────────────────────────────────────────────────────────────────
// Tipos
// ─────────────────────────────────────────────────────────────────────────

export type EscenarioKey = 'conservador' | 'estandar' | 'agresivo'

export interface EscenarioInputs {
  ratioEsfuerzoPct: number  // 0..100
  label: string
  description: string
}

export interface CapacidadScenario {
  key: EscenarioKey
  meta: EscenarioInputs
  cuotaMensualMax: number       // €/mes que el banco aceptaría como cuota
  importeFinanciableMax: number // €  que el banco prestaría
  plazoAniosUsado: number       // años usados para PV de la cuota
  precioMaxInmueble: number     // € (importe financiable + aporte propio)
  ltvImplicito: number          // % LTV del precioMaxInmueble
}

export interface CapacidadWarning {
  severity: 'red' | 'amber' | 'green'
  title: string
  detail: string
}

export interface CapacidadResult {
  inputs: {
    ingresosNetos: number     // €/mes (sumado)
    edadMaxima: number        // años
    otrasDeudas: number       // €/mes
    aportePropio: number      // €
    tinPct: number            // %
    parejaConTitular: boolean
  }
  benchmark: { yieldPct: number; asOf: string }
  scenarios: Record<EscenarioKey, CapacidadScenario>
  warnings: CapacidadWarning[]
}

export type ActionState = { ok: true; result: CapacidadResult } | { ok: false; error: string } | null

// ─────────────────────────────────────────────────────────────────────────
// Constantes operativas (banca minorista española, mediana 2026)
// ─────────────────────────────────────────────────────────────────────────

const EDAD_MAXIMA_FIN_HIPOTECA = 75  // años; mediana de banca española
const PLAZO_MAXIMO_ANIOS = 30
const PLAZO_MINIMO_ANIOS = 10
const LTV_MAXIMO_TIPICO = 0.80       // 80% LTV para primera vivienda

const ESCENARIOS: Record<EscenarioKey, EscenarioInputs> = {
  conservador: {
    ratioEsfuerzoPct: 30,
    label: 'Conservador',
    description: 'Ratio de esfuerzo 30%. Margen para imprevistos. Banco lo ve cómodo.',
  },
  estandar: {
    ratioEsfuerzoPct: 35,
    label: 'Estándar',
    description: 'Ratio de esfuerzo 35%. Tope habitual de la banca minorista.',
  },
  agresivo: {
    ratioEsfuerzoPct: 40,
    label: 'Agresivo',
    description: 'Ratio de esfuerzo 40%. Sólo con perfiles muy sólidos y sin otras deudas.',
  },
}

// ─────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────

function parseNum(form: FormData, key: string): number {
  const raw = (form.get(key) as string | null) ?? ''
  const clean = raw.replace(',', '.').replace(/[^\d.-]/g, '')
  const n = parseFloat(clean)
  return Number.isFinite(n) ? n : 0
}

function parseInt0(form: FormData, key: string): number {
  return Math.floor(parseNum(form, key))
}

/**
 * Principal financiable (Present Value) dado una cuota periódica fija,
 * un tipo de interés mensual y un número de cuotas. Es la inversa de
 * la fórmula de cuota de amortización francesa.
 *
 *   PV = C · (1 - (1+i)^-n) / i
 *
 * Si i = 0 (caso teórico), PV = C · n.
 */
function presentValueFromMonthlyPayment(
  cuotaMensual: number,
  tinAnualPct: number,
  plazoMeses: number,
): number {
  if (cuotaMensual <= 0 || plazoMeses <= 0) return 0
  const i = tinAnualPct / 100 / 12
  if (i === 0) return cuotaMensual * plazoMeses
  return (cuotaMensual * (1 - Math.pow(1 + i, -plazoMeses))) / i
}

// ─────────────────────────────────────────────────────────────────────────
// Server action principal
// ─────────────────────────────────────────────────────────────────────────

export async function calculateCapacidad(
  _prev: ActionState,
  form: FormData,
): Promise<ActionState> {
  const ingresosTitular1 = parseNum(form, 'ingresosTitular1')
  const edadTitular1 = parseInt0(form, 'edadTitular1')

  const ingresosTitular2 = parseNum(form, 'ingresosTitular2')
  const edadTitular2 = parseInt0(form, 'edadTitular2')

  const otrasDeudas = parseNum(form, 'otrasDeudas')
  const aportePropio = parseNum(form, 'aportePropio')
  const tinPct = parseNum(form, 'tinPct')

  // Validaciones mínimas
  if (ingresosTitular1 <= 0) {
    return { ok: false, error: 'Indica al menos los ingresos netos mensuales del titular principal.' }
  }
  if (edadTitular1 <= 17 || edadTitular1 > 75) {
    return { ok: false, error: 'La edad del titular principal debe estar entre 18 y 75 años.' }
  }
  if (tinPct < 0 || tinPct > 20) {
    return { ok: false, error: 'El TIN estimado debe estar entre 0% y 20%.' }
  }

  const parejaConTitular = ingresosTitular2 > 0
  const ingresosNetos = ingresosTitular1 + (parejaConTitular ? ingresosTitular2 : 0)
  const edadMaxima = Math.max(edadTitular1, parejaConTitular ? edadTitular2 : 0)

  // Plazo máximo permitido por edad
  const plazoMaxPorEdad = EDAD_MAXIMA_FIN_HIPOTECA - edadMaxima
  const plazoAniosUsado = Math.max(
    PLAZO_MINIMO_ANIOS,
    Math.min(PLAZO_MAXIMO_ANIOS, plazoMaxPorEdad),
  )
  const plazoMeses = plazoAniosUsado * 12

  // 3 escenarios
  const scenarios = (Object.keys(ESCENARIOS) as EscenarioKey[]).reduce(
    (acc, key) => {
      const meta = ESCENARIOS[key]
      const cuotaMensualMax = Math.max(
        0,
        (ingresosNetos * meta.ratioEsfuerzoPct) / 100 - otrasDeudas,
      )
      const importeFinanciableMax = Math.round(
        presentValueFromMonthlyPayment(cuotaMensualMax, tinPct, plazoMeses),
      )
      const precioMaxInmueble = importeFinanciableMax + aportePropio
      const ltvImplicito =
        precioMaxInmueble > 0 ? (importeFinanciableMax / precioMaxInmueble) * 100 : 0

      acc[key] = {
        key,
        meta,
        cuotaMensualMax: Math.round(cuotaMensualMax),
        importeFinanciableMax,
        plazoAniosUsado,
        precioMaxInmueble: Math.round(precioMaxInmueble),
        ltvImplicito,
      }
      return acc
    },
    {} as Record<EscenarioKey, CapacidadScenario>,
  )

  // ───────────────────────────────────────────────────────────────────────
  // Warnings — criterios reales de mesa de riesgos
  // ───────────────────────────────────────────────────────────────────────

  const warnings: CapacidadWarning[] = []

  // 1. Otras deudas elevadas
  const ratioDeudasExistentes = otrasDeudas > 0 ? (otrasDeudas / ingresosNetos) * 100 : 0
  if (ratioDeudasExistentes >= 30) {
    warnings.push({
      severity: 'red',
      title: `Tus deudas actuales ya consumen ${ratioDeudasExistentes.toFixed(0)}% de tus ingresos`,
      detail:
        'La banca minorista española suele rechazar operaciones cuando las deudas existentes ' +
        '(préstamos personales, leasing, hipotecas previas, financieras) consumen más del 30% ' +
        'de los ingresos netos. Antes de pedir la hipoteca, conviene reducir o cancelar parte ' +
        'de esas deudas.',
    })
  } else if (ratioDeudasExistentes >= 20) {
    warnings.push({
      severity: 'amber',
      title: `Otras deudas suponen ${ratioDeudasExistentes.toFixed(0)}% de tus ingresos`,
      detail:
        'No es bloqueante pero reduce significativamente tu capacidad. Cada euro de deuda ' +
        'existente es un euro menos de cuota disponible para la hipoteca nueva.',
    })
  }

  // 2. Plazo recortado por edad
  if (plazoMaxPorEdad < PLAZO_MAXIMO_ANIOS) {
    warnings.push({
      severity: 'amber',
      title: `Plazo limitado a ${plazoAniosUsado} años por edad`,
      detail:
        `La mayoría de bancos en España exige que la hipoteca termine antes de los ` +
        `${EDAD_MAXIMA_FIN_HIPOTECA} años del titular más mayor. Con ${edadMaxima} años, el ` +
        `plazo máximo cae a ${plazoAniosUsado} años, lo que sube la cuota mensual y ` +
        `reduce el importe financiable. Algunas entidades amplían hasta 75-80 con vida ' +
        'laboral demostrable.`,
    })
  }

  // 3. Capacidad nula
  if (scenarios.estandar.cuotaMensualMax <= 0) {
    warnings.push({
      severity: 'red',
      title: 'Tus deudas existentes ya superan tu capacidad de pago',
      detail:
        'Con tus ingresos actuales y las deudas que ya tienes, no hay margen para cuota de ' +
        'hipoteca dentro del ratio del 35% que la banca acepta. Hay que reducir deudas o ' +
        'incrementar ingresos antes de pedir financiación.',
    })
  }

  // 4. Aporte propio bajo (LTV implícito > 80%)
  if (scenarios.estandar.ltvImplicito >= 95) {
    warnings.push({
      severity: 'red',
      title: `Aporte propio muy bajo (LTV implícito ${scenarios.estandar.ltvImplicito.toFixed(0)}%)`,
      detail:
        'Con el aporte que indicas, tendrías que financiar más del 95% del precio del inmueble. ' +
        'La banca rara vez supera el 80-90% LTV en primera vivienda y nunca en inversión. Sin ' +
        'más aporte o aval adicional, esta operación no es viable hoy.',
    })
  } else if (scenarios.estandar.ltvImplicito >= 85) {
    warnings.push({
      severity: 'amber',
      title: `Vas a necesitar LTV alto (${scenarios.estandar.ltvImplicito.toFixed(0)}%) — sobrecoste probable`,
      detail:
        'Por encima del 80% LTV la banca habitualmente sube el TIN o exige garantías adicionales. ' +
        'Si puedes aumentar el aporte propio aunque sea 5-10%, los términos de la oferta mejoran ' +
        'sensiblemente.',
    })
  } else if (scenarios.estandar.ltvImplicito <= 60) {
    warnings.push({
      severity: 'green',
      title: `LTV implícito bajo (${scenarios.estandar.ltvImplicito.toFixed(0)}%) — perfil cómodo para el banco`,
      detail:
        'Con un LTV inferior al 65% tienes margen para negociar mejor TIN, plazo flexible y ' +
        'menos vinculaciones. Tu aporte propio te da posición.',
    })
  }

  // 5. Aporte propio sin precio implícito (no quiere comprar todavía)
  if (aportePropio === 0) {
    warnings.push({
      severity: 'amber',
      title: 'No has indicado aporte propio',
      detail:
        'El precio máximo del inmueble se calcula sumando el importe financiable más tu aporte ' +
        'propio. Sin aporte, el banco te financia como mucho el 80% del valor de tasación — ' +
        'el 20% restante más los gastos de cierre (~3-5%) tienen que salir de tu bolsillo. ' +
        'Si todavía no sabes cuánto puedes aportar, ése es el primer dato a definir.',
    })
  }

  // 6. Estrés sobre el bono — meta-aviso pedagógico (no bloqueante)
  if (tinPct > 0 && tinPct < BONO_10Y_ES.yieldPct + 0.5) {
    warnings.push({
      severity: 'amber',
      title: `TIN estimado por debajo del bono español a 10 años + 0,5 pp`,
      detail:
        `El bono español a 10 años está en ${BONO_10Y_ES.yieldPct.toFixed(2)}% (${BONO_10Y_ES.asOf}). ` +
        `La banca minorista no suele ofrecer hipotecas a TIN inferior al bono + 0,5-1,5 pp. ` +
        `Si tu TIN simulado está por debajo, probablemente la realidad será más cara.`,
    })
  }

  return {
    ok: true,
    result: {
      inputs: {
        ingresosNetos: Math.round(ingresosNetos),
        edadMaxima,
        otrasDeudas: Math.round(otrasDeudas),
        aportePropio: Math.round(aportePropio),
        tinPct,
        parejaConTitular,
      },
      benchmark: { yieldPct: BONO_10Y_ES.yieldPct, asOf: BONO_10Y_ES.asOf },
      scenarios,
      warnings,
    },
  }
}
