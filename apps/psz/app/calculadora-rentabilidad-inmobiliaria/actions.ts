'use server'

import { BONO_10Y_ES } from './benchmarks'

/**
 * Server Action: calculateRoi
 *
 * Calculadora de rentabilidad inmobiliaria con 3 escenarios:
 * pesimista, probable y optimista. Sin hipoteca por ahora — preparado
 * para añadir financiación en una segunda iteración.
 *
 * CONCEPTOS DIFERENCIALES (no los usa la competencia):
 *
 *  · Rentabilidad de adquisición: rendimiento sobre la inversión total
 *    INCLUYENDO ITP. Es lo que rinde el dinero en el momento de comprar.
 *
 *  · Rentabilidad real: rendimiento una vez el ITP queda como gasto
 *    sunk (no recuperable vía alquiler, queda amortizado a largo plazo).
 *    Refleja el rendimiento estable a largo plazo del activo, sobre el
 *    capital "operativo" (precio + gastos cierre + reformas, SIN ITP).
 *
 *  · Tiempo de amortización del ITP: años de flujo neto necesarios para
 *    recuperar el ITP pagado. Es la barrera mental que distingue una
 *    operación rápida vs una de horizonte largo.
 *
 * Toda la lógica vive aquí (server-only). El cliente recibe solo los
 * resultados ya calculados y los textos de los warnings.
 *
 * Propiedad de Inversia Global Digital, S.L.U. — Toño Palacios.
 * Prohibida su reproducción sin autorización expresa.
 */

// ─────────────────────────────────────────────────────────────────────────
// Tipos públicos
// ─────────────────────────────────────────────────────────────────────────

export type ScenarioName = 'pesimista' | 'probable' | 'optimista'

export interface RoiWarning {
  severity: 'info' | 'warning' | 'danger' | 'success'
  title: string
  body: string
}

export interface ScenarioResult {
  name: ScenarioName
  /** Renta mensual nominal del escenario (sin descontar vacancia) */
  rentaMensual: number
  /** Renta anual EFECTIVA tras aplicar reserva de vacancia */
  rentaAnualEfectiva: number
  rentaAnual: number
  /** Gastos mensuales prorrateados (comunidad + IBI/12 + residuos/12) */
  gastosMensualesProrrateados: number
  gastosAnualesTotales: number
  /** Renta mensual EFECTIVA − gastos mensuales prorrateados. No incluye suministros. */
  flujoNetoMensual: number
  flujoNetoAnual: number
  /** Rentabilidad de adquisición: sobre la inversión TOTAL incluyendo ITP */
  rentabilidadAdquisicionPct: number
  /** Rentabilidad real: sobre la inversión operativa SIN ITP (largo plazo) */
  rentabilidadRealPct: number
  /** Diferencia entre rentabilidad real y bono español a 10 años. Puede ser negativa. */
  primaSobreBonoPp: number
  /** Años hasta recuperar TODA la inversión (incluyendo ITP) con flujo neto. */
  paybackAnios: number
  /** Años de flujo neto necesarios para 'amortizar' el ITP. */
  amortizacionItpAnios: number
  warnings: RoiWarning[]
}

export interface RoiResult {
  inputs: {
    precioCompra: number
    itpPct: number
    itpImporte: number
    gastosCierre: number
    reformas: number
    ibiAnual: number
    comunidadMensual: number
    residuosAnual: number
    vacanciaPct: number
    /** Suma de TODO (precio + ITP + cierre + reformas) */
    inversionTotalAdquisicion: number
    /** SIN ITP (precio + cierre + reformas) — base para rentabilidad real */
    inversionOperativa: number
  }
  benchmark: {
    bono10yPct: number
    bono10yAsOf: string
  }
  escenarios: ScenarioResult[]
}

export type ActionState =
  | { ok: true; result: RoiResult }
  | { ok: false; error: string }
  | null

// ─────────────────────────────────────────────────────────────────────────
// Cálculos
// ─────────────────────────────────────────────────────────────────────────

function calcEscenario(
  name: ScenarioName,
  rentaMensual: number,
  inversionTotalAdquisicion: number,
  inversionOperativa: number,
  itpImporte: number,
  comunidadMensual: number,
  ibiAnual: number,
  residuosAnual: number,
  vacanciaPct: number,
): ScenarioResult {
  const rentaAnualNominal = rentaMensual * 12
  // Aplicamos la reserva de vacancia opcional. Default 0%.
  const factorOcupacion = Math.max(0, 1 - vacanciaPct / 100)
  const rentaAnualEfectiva = rentaAnualNominal * factorOcupacion

  // Gastos mensuales prorrateados — NO incluye suministros (a nombre del inquilino).
  const gastosMensualesProrrateados =
    comunidadMensual + ibiAnual / 12 + residuosAnual / 12
  const gastosAnualesTotales = comunidadMensual * 12 + ibiAnual + residuosAnual

  // Flujo mensual: usamos la renta NOMINAL para el flujo, ya que el visitante
  // razona "esto es lo que entra los meses en que cobro". La vacancia
  // se refleja en la rentabilidad anual (renta efectiva).
  const flujoNetoMensual = rentaMensual - gastosMensualesProrrateados
  const flujoNetoAnual = rentaAnualEfectiva - gastosAnualesTotales

  const rentabilidadAdquisicionPct =
    inversionTotalAdquisicion > 0
      ? (flujoNetoAnual / inversionTotalAdquisicion) * 100
      : 0
  const rentabilidadRealPct =
    inversionOperativa > 0 ? (flujoNetoAnual / inversionOperativa) * 100 : 0
  const primaSobreBonoPp = rentabilidadRealPct - BONO_10Y_ES.yieldPct
  const paybackAnios =
    flujoNetoAnual > 0 ? inversionTotalAdquisicion / flujoNetoAnual : Infinity
  const amortizacionItpAnios =
    flujoNetoAnual > 0 && itpImporte > 0 ? itpImporte / flujoNetoAnual : 0

  const ratioGastosSobreRenta =
    rentaAnualEfectiva > 0 ? (gastosAnualesTotales / rentaAnualEfectiva) * 100 : 0

  return {
    name,
    rentaMensual,
    rentaAnual: round2(rentaAnualNominal),
    rentaAnualEfectiva: round2(rentaAnualEfectiva),
    gastosMensualesProrrateados: round2(gastosMensualesProrrateados),
    gastosAnualesTotales: round2(gastosAnualesTotales),
    flujoNetoMensual: round2(flujoNetoMensual),
    flujoNetoAnual: round2(flujoNetoAnual),
    rentabilidadAdquisicionPct: round2(rentabilidadAdquisicionPct),
    rentabilidadRealPct: round2(rentabilidadRealPct),
    primaSobreBonoPp: round2(primaSobreBonoPp),
    paybackAnios: paybackAnios === Infinity ? Infinity : round2(paybackAnios),
    amortizacionItpAnios: round2(amortizacionItpAnios),
    warnings: generarWarnings({
      rentabilidadAdquisicionPct,
      rentabilidadRealPct,
      primaSobreBonoPp,
      paybackAnios,
      ratioGastosSobreRenta,
      flujoNetoMensual,
    }),
  }
}

// ─────────────────────────────────────────────────────────────────────────
// Rangos críticos PROPIETARIOS (años de práctica del PSI/broker)
// ─────────────────────────────────────────────────────────────────────────

function generarWarnings({
  rentabilidadAdquisicionPct,
  rentabilidadRealPct,
  primaSobreBonoPp,
  paybackAnios,
  ratioGastosSobreRenta,
  flujoNetoMensual,
}: {
  rentabilidadAdquisicionPct: number
  rentabilidadRealPct: number
  primaSobreBonoPp: number
  paybackAnios: number
  ratioGastosSobreRenta: number
  flujoNetoMensual: number
}): RoiWarning[] {
  const warnings: RoiWarning[] = []

  // Flujo neto mensual negativo
  if (flujoNetoMensual < 0) {
    warnings.push({
      severity: 'danger',
      title: 'Flujo neto mensual NEGATIVO',
      body:
        'Con esta renta, los gastos prorrateados de comunidad, IBI y residuos se comen más de lo que entra. Cada mes pones dinero de tu bolsillo. Solo justificable si el plan es revalorización pura (capital gains) o reforma y reventa. Si es buy-and-hold, no compensa.',
    })
  }

  // Rentabilidad REAL (largo plazo) — el número que de verdad importa
  if (rentabilidadRealPct >= 8) {
    warnings.push({
      severity: 'success',
      title: `Rentabilidad real = ${rentabilidadRealPct.toFixed(2).replace('.', ',')}%`,
      body: 'A largo plazo, una vez asumido el ITP como sunk cost, el activo rinde por encima del 8% sobre el capital operativo. Excelente zona financiera siempre que la renta sea sostenible.',
    })
  }

  // Prima sobre el bono del estado — separa "compensa el riesgo" de "no compensa"
  if (primaSobreBonoPp < 0) {
    warnings.push({
      severity: 'danger',
      title: `Por debajo del bono del estado (${primaSobreBonoPp.toFixed(2).replace('.', ',')}pp)`,
      body: `Tu rentabilidad real está por debajo del bono español a 10 años (${BONO_10Y_ES.yieldPct.toFixed(2).replace('.', ',')}%). Estás asumiendo riesgo inmobiliario (vacancia, gestión, ciclo, derramas) para obtener menos rendimiento que la inversión sin riesgo. No compensa salvo plan de revalorización claro.`,
    })
  } else if (primaSobreBonoPp >= 0 && primaSobreBonoPp < 1.5) {
    warnings.push({
      severity: 'warning',
      title: `Prima sobre bono = +${primaSobreBonoPp.toFixed(2).replace('.', ',')}pp`,
      body: `Por encima del bono pero por margen estrecho. La prima de riesgo histórica del ladrillo sobre el bono suele estar en 2-3pp. Por debajo de 1,5pp, el riesgo adicional no se está pagando bien.`,
    })
  } else if (primaSobreBonoPp >= 3) {
    warnings.push({
      severity: 'success',
      title: `Prima sobre bono = +${primaSobreBonoPp.toFixed(2).replace('.', ',')}pp`,
      body: `Excelente prima sobre el activo libre de riesgo. El mercado te está pagando por encima de la media histórica para asumir el riesgo del inmobiliario. Adelante.`,
    })
  }
  if (rentabilidadRealPct < 0) {
    warnings.push({
      severity: 'danger',
      title: `Rentabilidad real NEGATIVA (${rentabilidadRealPct.toFixed(2).replace('.', ',')}%)`,
      body: 'Incluso descontando el ITP, la operación pierde dinero sobre papel a largo plazo. Solo tiene sentido como vehículo de revalorización pura — no es una inversión por renta.',
    })
  }

  // Rentabilidad de adquisición (rentabilidad sobre la inversión total real)
  if (rentabilidadAdquisicionPct < 4 && rentabilidadAdquisicionPct >= 0) {
    warnings.push({
      severity: 'info',
      title: `Rentabilidad de adquisición = ${rentabilidadAdquisicionPct.toFixed(2).replace('.', ',')}%`,
      body: 'En el momento de comprar, el dinero invertido rinde por debajo del bono del estado. Es habitual en operaciones donde el ITP es alto. Mira la rentabilidad real (a largo plazo) para evaluar si el activo paga la espera.',
    })
  }

  // Payback total
  if (paybackAnios === Infinity) {
    warnings.push({
      severity: 'danger',
      title: 'Payback infinito',
      body: 'Con el flujo neto actual nunca recuperas la inversión solo por rentas. La operación depende íntegramente de la revalorización al vender.',
    })
  } else if (paybackAnios > 30) {
    warnings.push({
      severity: 'warning',
      title: `Payback = ${paybackAnios.toFixed(1).replace('.', ',')} años`,
      body: 'Horizonte muy largo, exige plan de salida claro. Tendrías que mantener el activo más de 30 años solo con rentas — dependes del ciclo inmobiliario para salir bien.',
    })
  } else if (paybackAnios > 25) {
    warnings.push({
      severity: 'info',
      title: `Payback = ${paybackAnios.toFixed(1).replace('.', ',')} años`,
      body: 'Horizonte largo. Asegúrate de tener un plan B si el mercado del alquiler de la zona se ablanda durante ese tiempo.',
    })
  } else if (paybackAnios < 15) {
    warnings.push({
      severity: 'success',
      title: `Payback = ${paybackAnios.toFixed(1).replace('.', ',')} años`,
      body: 'Recuperación rápida solo con rentas. Excelente posición — la revalorización al vender sería plus, no condición.',
    })
  }

  // Ratio gastos sobre renta
  if (ratioGastosSobreRenta > 25) {
    warnings.push({
      severity: 'warning',
      title: `Gastos = ${ratioGastosSobreRenta.toFixed(0)}% de la renta anual`,
      body: 'Estructura de costes desfavorable. Más de un 25% de la renta se va en gastos no recuperables (IBI, comunidad, residuos). Revisa si la comunidad tiene derramas previstas o si el IBI catastral está desactualizado al alza.',
    })
  }

  return warnings
}

// ─────────────────────────────────────────────────────────────────────────
// Server Action
// ─────────────────────────────────────────────────────────────────────────

export async function calculateRoi(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const precioCompra = num(formData.get('precioCompra'))
  const itpPct = num(formData.get('itpPct')) ?? 10
  const gastosCierre = num(formData.get('gastosCierre')) ?? 0
  const reformas = num(formData.get('reformas')) ?? 0
  const ibiAnual = num(formData.get('ibiAnual')) ?? 0
  const comunidadMensual = num(formData.get('comunidadMensual')) ?? 0
  const residuosAnual = num(formData.get('residuosAnual')) ?? 0
  const rentaPesimista = num(formData.get('rentaPesimista'))
  const rentaProbable = num(formData.get('rentaProbable'))
  const rentaOptimista = num(formData.get('rentaOptimista'))

  if (
    !validPositive(precioCompra) ||
    !validPositive(rentaPesimista) ||
    !validPositive(rentaProbable) ||
    !validPositive(rentaOptimista)
  ) {
    return {
      ok: false,
      error:
        'Rellena al menos el precio de compra y las 3 rentas (pesimista, probable, optimista). El resto son opcionales pero recomendados.',
    }
  }
  if (rentaPesimista > rentaProbable || rentaProbable > rentaOptimista) {
    return {
      ok: false,
      error: 'Las rentas deben estar ordenadas: pesimista ≤ probable ≤ optimista.',
    }
  }
  if (itpPct < 0 || itpPct > 25) {
    return { ok: false, error: 'El tipo de ITP debe estar entre 0% y 25%.' }
  }

  const vacanciaPct = num(formData.get('vacanciaPct')) ?? 0
  if (vacanciaPct < 0 || vacanciaPct > 50) {
    return { ok: false, error: 'La reserva de vacancia debe estar entre 0% y 50%.' }
  }

  const itpImporte = precioCompra * (itpPct / 100)
  const inversionTotalAdquisicion = precioCompra + itpImporte + gastosCierre + reformas
  const inversionOperativa = precioCompra + gastosCierre + reformas

  const escenarios: ScenarioResult[] = (
    ['pesimista', 'probable', 'optimista'] as const
  ).map((name, idx) => {
    const renta = [rentaPesimista, rentaProbable, rentaOptimista][idx]!
    return calcEscenario(
      name,
      renta,
      inversionTotalAdquisicion,
      inversionOperativa,
      itpImporte,
      comunidadMensual,
      ibiAnual,
      residuosAnual,
      vacanciaPct,
    )
  })

  return {
    ok: true,
    result: {
      inputs: {
        precioCompra,
        itpPct,
        itpImporte: round2(itpImporte),
        gastosCierre,
        reformas,
        ibiAnual,
        comunidadMensual,
        residuosAnual,
        vacanciaPct,
        inversionTotalAdquisicion: round2(inversionTotalAdquisicion),
        inversionOperativa: round2(inversionOperativa),
      },
      benchmark: {
        bono10yPct: BONO_10Y_ES.yieldPct,
        bono10yAsOf: BONO_10Y_ES.asOf,
      },
      escenarios,
    },
  }
}

// ─────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────

function num(v: FormDataEntryValue | null): number | null {
  if (typeof v !== 'string') return null
  const trimmed = v.trim().replace(',', '.')
  if (!trimmed) return null
  const n = Number(trimmed)
  return Number.isFinite(n) && n >= 0 ? n : null
}

function validPositive(v: number | null): v is number {
  return v !== null && v > 0
}

function round2(n: number): number {
  return Math.round(n * 100) / 100
}
