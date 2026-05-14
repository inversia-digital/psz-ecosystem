'use server'

/**
 * Server action del stress test Euríbor.
 *
 * Pregunta operativa: si el Euríbor sube X puntos porcentuales en la
 * próxima revisión de mi hipoteca variable, ¿cuál será mi cuota nueva?
 *
 * El stress test es un ejercicio de prudencia financiera. La banca lo
 * aplica internamente al estudiar viabilidad de operaciones nuevas
 * (típicamente con un margen de +200 pb sobre el Euríbor actual). Lo
 * exponemos aquí al usuario final para que pueda anticipar el impacto
 * en SU cuota actual en hipoteca variable o mixta en periodo variable.
 *
 * 5 escenarios paralelos: +0 / +0.5 / +1 / +1.5 / +2 puntos sobre el
 * Euríbor que el usuario indica que está actualmente aplicando su
 * hipoteca.
 *
 * NO necesitamos TIN como input: lo deducimos sumando Euríbor +
 * diferencial. La cuota inicial mostrada en la columna +0 debería
 * coincidir con la cuota real del usuario, lo que valida el cálculo.
 */

import { BONO_10Y_ES } from '../calculadora-rentabilidad-inmobiliaria/benchmarks'

// ─────────────────────────────────────────────────────────────────────────
// Tipos
// ─────────────────────────────────────────────────────────────────────────

export type EuriborDelta = 0 | 0.5 | 1 | 1.5 | 2

export interface StressScenario {
  delta: EuriborDelta
  tinNuevoPct: number       // Euríbor + delta + diferencial
  cuotaMensual: number      // €
  cuotaIncrementoMensual: number  // € sobre la cuota base (+0)
  cuotaIncrementoAnual: number    // € sobre la cuota base × 12
  intereseTotalProyectado: number // € intereses totales hasta fin del préstamo
  ratioEsfuerzoPct: number | null // % si el usuario indicó ingresos; null si no
}

export interface StressWarning {
  severity: 'red' | 'amber' | 'green'
  title: string
  detail: string
}

export interface StressResult {
  inputs: {
    capitalPendiente: number
    plazoRestanteAnios: number
    euriborActualPct: number
    diferencialPct: number
    ingresosNetos: number  // 0 si no se indicó
  }
  cuotaBase: number  // cuota en escenario +0 (la actual)
  tinBasePct: number  // Euríbor actual + diferencial
  benchmark: { yieldPct: number; asOf: string }
  scenarios: StressScenario[]
  warnings: StressWarning[]
}

export type ActionState = { ok: true; result: StressResult } | { ok: false; error: string } | null

// ─────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────

function parseNum(form: FormData, key: string): number {
  const raw = (form.get(key) as string | null) ?? ''
  const clean = raw.replace(',', '.').replace(/[^\d.-]/g, '')
  const n = parseFloat(clean)
  return Number.isFinite(n) ? n : 0
}

/**
 * Cuota mensual de amortización francesa.
 *   C = P · i / (1 - (1+i)^-n)
 * donde:
 *   P = principal pendiente
 *   i = tipo de interés mensual (TIN anual / 12 / 100)
 *   n = nº de cuotas
 */
function monthlyPayment(principal: number, tinAnualPct: number, plazoMeses: number): number {
  if (principal <= 0 || plazoMeses <= 0) return 0
  const i = tinAnualPct / 100 / 12
  if (i === 0) return principal / plazoMeses
  return (principal * i) / (1 - Math.pow(1 + i, -plazoMeses))
}

const DELTAS: EuriborDelta[] = [0, 0.5, 1, 1.5, 2]

// ─────────────────────────────────────────────────────────────────────────
// Server action principal
// ─────────────────────────────────────────────────────────────────────────

export async function calculateStressTest(
  _prev: ActionState,
  form: FormData,
): Promise<ActionState> {
  const capitalPendiente = parseNum(form, 'capitalPendiente')
  const plazoRestanteAnios = parseNum(form, 'plazoRestanteAnios')
  const euriborActualPct = parseNum(form, 'euriborActualPct')
  const diferencialPct = parseNum(form, 'diferencialPct')
  const ingresosNetos = parseNum(form, 'ingresosNetos')

  if (capitalPendiente <= 0) {
    return { ok: false, error: 'Indica el capital pendiente de tu hipoteca.' }
  }
  if (plazoRestanteAnios <= 0 || plazoRestanteAnios > 40) {
    return { ok: false, error: 'El plazo restante debe estar entre 1 y 40 años.' }
  }
  if (euriborActualPct < -2 || euriborActualPct > 10) {
    return { ok: false, error: 'El Euríbor indicado fuera de rango razonable (-2% a 10%).' }
  }
  if (diferencialPct < 0 || diferencialPct > 5) {
    return { ok: false, error: 'El diferencial debe estar entre 0% y 5%.' }
  }

  const plazoMeses = Math.round(plazoRestanteAnios * 12)
  const tinBasePct = euriborActualPct + diferencialPct
  const cuotaBase = monthlyPayment(capitalPendiente, tinBasePct, plazoMeses)

  const scenarios: StressScenario[] = DELTAS.map((delta) => {
    const tinNuevoPct = euriborActualPct + delta + diferencialPct
    const cuota = monthlyPayment(capitalPendiente, tinNuevoPct, plazoMeses)
    const increMensual = cuota - cuotaBase
    const intereseTotalProyectado = Math.max(0, cuota * plazoMeses - capitalPendiente)
    const ratioEsfuerzo =
      ingresosNetos > 0 ? (cuota / ingresosNetos) * 100 : null

    return {
      delta,
      tinNuevoPct: Number(tinNuevoPct.toFixed(2)),
      cuotaMensual: Math.round(cuota),
      cuotaIncrementoMensual: Math.round(increMensual),
      cuotaIncrementoAnual: Math.round(increMensual * 12),
      intereseTotalProyectado: Math.round(intereseTotalProyectado),
      ratioEsfuerzoPct: ratioEsfuerzo === null ? null : Number(ratioEsfuerzo.toFixed(1)),
    }
  })

  // ───────────────────────────────────────────────────────────────────────
  // Avisos — criterios de mesa de riesgos
  // ───────────────────────────────────────────────────────────────────────

  const warnings: StressWarning[] = []
  const escenarioPlus2 = scenarios[scenarios.length - 1]!

  // 1. Ratio de esfuerzo proyectado superando umbrales
  if (ingresosNetos > 0) {
    const ratioPlus2 = escenarioPlus2.ratioEsfuerzoPct ?? 0
    if (ratioPlus2 >= 50) {
      warnings.push({
        severity: 'red',
        title: `Si el Euríbor sube 2 pp, tu cuota se comería el ${ratioPlus2.toFixed(0)}% de tus ingresos`,
        detail:
          'Por encima del 50% de ratio de esfuerzo la situación es financieramente insostenible. ' +
          'Subrogación a tipo fijo, novación con tu banco actual o amortización parcial anticipada ' +
          'son palancas que conviene evaluar ya, antes de que el escenario se materialice.',
      })
    } else if (ratioPlus2 >= 40) {
      warnings.push({
        severity: 'amber',
        title: `Cuota proyectada al ${ratioPlus2.toFixed(0)}% de ingresos en escenario adverso`,
        detail:
          'Por encima del 40% empieza a haber estrés financiero relevante. La banca minorista ' +
          'rechaza operaciones nuevas a partir de ese ratio. Conviene tener plan B preparado ' +
          '(reserva de liquidez para las primeras subidas, conversación con el banco sobre cambio ' +
          'de modalidad).',
      })
    } else if (ratioPlus2 < 30) {
      warnings.push({
        severity: 'green',
        title: `Cuota proyectada al ${ratioPlus2.toFixed(0)}% incluso en escenario adverso`,
        detail:
          'Tu hipoteca tiene margen de seguridad incluso si el Euríbor sube 2 pp. No suele ser ' +
          'necesario actuar de forma anticipada — pero conviene revisar cada 12 meses.',
      })
    }
  }

  // 2. Incremento absoluto fuerte en escenario +1pp
  const escenarioPlus1 = scenarios[2]! // +1pp
  if (escenarioPlus1.cuotaIncrementoMensual >= 200) {
    warnings.push({
      severity: 'amber',
      title: `Solo con 1 punto de subida, tu cuota subiría ${escenarioPlus1.cuotaIncrementoMensual} €/mes`,
      detail:
        `Eso es ${escenarioPlus1.cuotaIncrementoAnual} € adicionales al año. Si esta cantidad ` +
        'compromete tu liquidez familiar, conviene plantear conversión a fija o mixta antes de ' +
        'la próxima revisión. La mayoría de bancos ofrece novación gratuita o con coste limitado.',
    })
  }

  // 3. TIN base muy bajo (sospecha de hipoteca antigua)
  if (tinBasePct < 1.5) {
    warnings.push({
      severity: 'green',
      title: `TIN actual muy competitivo (${tinBasePct.toFixed(2)}%)`,
      detail:
        'Tu hipoteca tiene un TIN por debajo del actual mercado. Subrogar a fija probablemente NO te ' +
        'compense porque el TIN fijo de mercado está por encima de tu variable actual. La mejor ' +
        'estrategia suele ser mantener y amortizar anticipadamente si el Euríbor sube fuerte.',
    })
  } else if (tinBasePct > 5) {
    warnings.push({
      severity: 'amber',
      title: `TIN actual elevado (${tinBasePct.toFixed(2)}%) — la subrogación puede compensar`,
      detail:
        'Si tu TIN actual ya está por encima del 5%, conviene comparar con ofertas fijas de mercado. ' +
        'En muchos casos compensa cambiar a una hipoteca fija con TIN más bajo aunque pagues la ' +
        'comisión de subrogación (máximo 0,5% del capital pendiente por Ley 5/2019).',
    })
  }

  // 4. Plazo restante largo + sensibilidad alta
  if (plazoRestanteAnios >= 25) {
    warnings.push({
      severity: 'amber',
      title: `Te quedan ${Math.round(plazoRestanteAnios)} años — la sensibilidad al Euríbor es alta`,
      detail:
        'Cuanto más capital te queda y más plazo, más amplifica el Euríbor cualquier subida. Los ' +
        'porcentajes de los escenarios se traducen en muchísimo dinero a lo largo del tiempo. ' +
        'Considera amortización anticipada de capital cuando puedas — reduce el principal expuesto.',
    })
  }

  return {
    ok: true,
    result: {
      inputs: {
        capitalPendiente: Math.round(capitalPendiente),
        plazoRestanteAnios: Number(plazoRestanteAnios.toFixed(1)),
        euriborActualPct: Number(euriborActualPct.toFixed(2)),
        diferencialPct: Number(diferencialPct.toFixed(2)),
        ingresosNetos: Math.round(ingresosNetos),
      },
      cuotaBase: Math.round(cuotaBase),
      tinBasePct: Number(tinBasePct.toFixed(2)),
      benchmark: { yieldPct: BONO_10Y_ES.yieldPct, asOf: BONO_10Y_ES.asOf },
      scenarios,
      warnings,
    },
  }
}
