'use server'

/**
 * Server Action: calculateRoi
 *
 * Calculadora de rentabilidad inmobiliaria con 3 escenarios:
 * pesimista, probable y optimista. Sin hipoteca por ahora — preparado
 * para añadir financiación en una segunda iteración.
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
  rentaMensual: number
  rentaAnual: number
  /** Gastos mensuales prorrateados (comunidad + IBI/12 + residuos/12) */
  gastosMensualesProrrateados: number
  gastosAnualesTotales: number
  /** Renta mensual − gastos mensuales prorrateados. No incluye luz/gas/agua (inquilino). */
  flujoNetoMensual: number
  flujoNetoAnual: number
  rentabilidadBrutaPct: number
  rentabilidadNetaPct: number
  /** Años hasta recuperar la inversión total con la renta neta. */
  paybackAnios: number
  warnings: RoiWarning[]
}

export interface RoiResult {
  inputs: {
    precioCompra: number
    gastosCierre: number
    reformas: number
    ibiAnual: number
    comunidadMensual: number
    residuosAnual: number
    inversionTotal: number
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
  inversionTotal: number,
  comunidadMensual: number,
  ibiAnual: number,
  residuosAnual: number,
): ScenarioResult {
  const rentaAnual = rentaMensual * 12

  // Gastos mensuales prorrateados — NO incluye luz/gas/agua (a nombre del inquilino).
  const gastosMensualesProrrateados =
    comunidadMensual + ibiAnual / 12 + residuosAnual / 12
  const gastosAnualesTotales = comunidadMensual * 12 + ibiAnual + residuosAnual

  const flujoNetoMensual = rentaMensual - gastosMensualesProrrateados
  const flujoNetoAnual = rentaAnual - gastosAnualesTotales

  const rentabilidadBrutaPct = inversionTotal > 0 ? (rentaAnual / inversionTotal) * 100 : 0
  const rentabilidadNetaPct = inversionTotal > 0 ? (flujoNetoAnual / inversionTotal) * 100 : 0
  const paybackAnios = flujoNetoAnual > 0 ? inversionTotal / flujoNetoAnual : Infinity

  const ratioGastosSobreRenta = rentaAnual > 0 ? (gastosAnualesTotales / rentaAnual) * 100 : 0

  return {
    name,
    rentaMensual,
    rentaAnual,
    gastosMensualesProrrateados: round2(gastosMensualesProrrateados),
    gastosAnualesTotales: round2(gastosAnualesTotales),
    flujoNetoMensual: round2(flujoNetoMensual),
    flujoNetoAnual: round2(flujoNetoAnual),
    rentabilidadBrutaPct: round2(rentabilidadBrutaPct),
    rentabilidadNetaPct: round2(rentabilidadNetaPct),
    paybackAnios:
      paybackAnios === Infinity ? Infinity : round2(paybackAnios),
    warnings: generarWarnings({
      rentabilidadBrutaPct,
      rentabilidadNetaPct,
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
  rentabilidadBrutaPct,
  rentabilidadNetaPct,
  paybackAnios,
  ratioGastosSobreRenta,
  flujoNetoMensual,
}: {
  rentabilidadBrutaPct: number
  rentabilidadNetaPct: number
  paybackAnios: number
  ratioGastosSobreRenta: number
  flujoNetoMensual: number
}): RoiWarning[] {
  const warnings: RoiWarning[] = []

  // Flujo neto mensual negativo → operación que pierde dinero cada mes
  if (flujoNetoMensual < 0) {
    warnings.push({
      severity: 'danger',
      title: 'Flujo neto mensual NEGATIVO',
      body:
        'Con esta renta, los gastos de comunidad, IBI y tasas se comen más de lo que entra. Cada mes pones dinero de tu bolsillo. Solo justificable si el plan es revalorización pura (capital gains) o reforma y reventa. Si es buy-and-hold, no compensa.',
    })
  }

  // Rentabilidad bruta
  if (rentabilidadBrutaPct >= 8) {
    warnings.push({
      severity: 'success',
      title: `Rentabilidad bruta = ${rentabilidadBrutaPct.toFixed(2).replace('.', ',')}%`,
      body: 'Adelante con ello, ganas seguro. Por encima del 8% bruto en 2026 es zona muy buena. Confirma que la zona no tiene problemas de morosidad estructural y verifica que la renta es realista (no la del anuncio, la del mercado real).',
    })
  } else if (rentabilidadBrutaPct < 5) {
    warnings.push({
      severity: 'warning',
      title: `Rentabilidad bruta = ${rentabilidadBrutaPct.toFixed(2).replace('.', ',')}%`,
      body: 'Zona difícil de defender financieramente. Por debajo del 5% bruto necesitas que la revalorización del activo compense la rentabilidad mediocre. Solo justificable si compras en zona de fuerte revalorización confirmada.',
    })
  }

  // Rentabilidad neta
  if (rentabilidadNetaPct < 4 && rentabilidadNetaPct >= 0) {
    warnings.push({
      severity: 'warning',
      title: `Rentabilidad neta = ${rentabilidadNetaPct.toFixed(2).replace('.', ',')}%`,
      body: 'Por debajo del bono del estado a 10 años, no compensa. Estás asumiendo riesgo inmobiliario (morosidad, vacancia, desperfectos, gestión) para obtener menos que el bono soberano sin riesgo. Revisa la operación.',
    })
  }
  if (rentabilidadNetaPct < 0) {
    warnings.push({
      severity: 'danger',
      title: `Rentabilidad neta NEGATIVA (${rentabilidadNetaPct.toFixed(2).replace('.', ',')}%)`,
      body: 'La operación es deficitaria sobre papel. Solo tiene sentido como vehículo de revalorización pura. Para alquiler buy-and-hold convencional, no.',
    })
  }

  // Payback
  if (paybackAnios === Infinity) {
    warnings.push({
      severity: 'danger',
      title: 'Payback infinito',
      body: 'Con el flujo neto actual nunca recuperas la inversión solo por rentas. La operación depende íntegramente de la revalorización al vender.',
    })
  } else if (paybackAnios > 25) {
    warnings.push({
      severity: 'warning',
      title: `Payback = ${paybackAnios.toFixed(1).replace('.', ',')} años`,
      body: 'Horizonte largo, exige plan de salida claro. Tendrás que vender el activo para realizar la rentabilidad, lo que introduce dependencia del ciclo inmobiliario. Asegúrate de tener un plan B si el ciclo no acompaña.',
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

  const inversionTotal = precioCompra + gastosCierre + reformas

  const escenarios: ScenarioResult[] = [
    calcEscenario('pesimista', rentaPesimista, inversionTotal, comunidadMensual, ibiAnual, residuosAnual),
    calcEscenario('probable', rentaProbable, inversionTotal, comunidadMensual, ibiAnual, residuosAnual),
    calcEscenario('optimista', rentaOptimista, inversionTotal, comunidadMensual, ibiAnual, residuosAnual),
  ]

  return {
    ok: true,
    result: {
      inputs: {
        precioCompra,
        gastosCierre,
        reformas,
        ibiAnual,
        comunidadMensual,
        residuosAnual,
        inversionTotal,
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
