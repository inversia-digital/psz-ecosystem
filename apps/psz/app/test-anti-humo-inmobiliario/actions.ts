'use server'

/**
 * Server Action: testAntiHumo
 *
 * "El test anti-humo inmobiliario" — versión gancho/social de la calculadora
 * de rentabilidad. Con 2 datos (precio + alquiler) + lo que "te anuncian",
 * desenmascara el truco habitual del sector: publicar la rentabilidad BRUTA
 * (alquiler×12 / precio) etiquetada solo como "rentabilidad", que el inversor
 * lee como neta. La neta real ronda 3-4 puntos menos.
 *
 * Misma metodología que la calculadora seria (mismo itpData, misma definición
 * de inversión real y de neta) para que los números cuadren. La capa propia
 * aquí es el VEREDICTO.
 *
 * Toda la lógica vive en el servidor; el cliente recibe el resultado calculado.
 * Propiedad de Inversia Global Digital, S.L.U. — Toño Palacios.
 */

import { ITP_TABLE } from '../calculadora-rentabilidad-inmobiliaria/itpData'

// Supuestos por defecto (transparentes y editables — eso es el mensaje de marca)
const GASTOS_COMPRA_PCT = 2 // notaría + registro + AJD + gestoría, % sobre precio
const GASTOS_ANUALES_PCT_DEFAULT = 28 // IBI + comunidad + seguro/impago + mantenimiento + vacíos + gestión, % sobre la renta

export type Veredicto = 'bruta' | 'inflada' | 'intermedia' | 'coherente' | 'sin_anunciada'

export interface AntiHumoResult {
  precio: number
  alquilerMensual: number
  ccaaCode: string
  ccaaName: string
  itpPct: number
  reforma: number
  gastosAnualesPct: number
  anunciada: number | null

  rentaAnual: number
  itpEur: number
  gastosCompraEur: number
  inversionReal: number
  gastosAnualesEur: number
  rentaNetaAnual: number

  brutaPct: number
  netaPct: number

  veredicto: Veredicto
  veredictoTitulo: string
  veredictoCuerpo: string
  /** Puntos porcentuales que el titular ignora (anunciada − neta; o bruta − neta si no hay anunciada). */
  gapPuntos: number
  /** € al año que ese desfase representa sobre tu inversión real. */
  gapEurAnio: number
}

export type ActionState =
  | { ok: true; result: AntiHumoResult }
  | { ok: false; error: string }
  | null

function num(v: FormDataEntryValue | null): number {
  if (v == null) return NaN
  const s = String(v).trim().replace(/[\s€%]/g, '')
  if (s === '') return NaN
  // Formato español: coma = decimal, punto = miles.
  if (s.includes(',')) return parseFloat(s.replace(/\./g, '').replace(',', '.'))
  // Sin coma: puntos solo como miles si encajan el patrón (1.234 / 1.234.567); si no, decimal.
  if (/^\d{1,3}(\.\d{3})+$/.test(s)) return parseFloat(s.replace(/\./g, ''))
  return parseFloat(s)
}

export async function testAntiHumo(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const precio = num(formData.get('precio'))
  const alquiler = num(formData.get('alquiler'))
  const ccaaCode = String(formData.get('ccaa') || 'VC')
  const reformaRaw = num(formData.get('reforma'))
  const gastosPctRaw = num(formData.get('gastosAnualesPct'))
  const anunciadaRaw = num(formData.get('anunciada'))

  if (!Number.isFinite(precio) || precio <= 0) return { ok: false, error: 'Introduce un precio de compra válido.' }
  if (!Number.isFinite(alquiler) || alquiler <= 0) return { ok: false, error: 'Introduce el alquiler mensual estimado.' }

  const ccaa = ITP_TABLE.find((c) => c.code === ccaaCode) || ITP_TABLE.find((c) => c.code === 'VC')!
  const itpPct = ccaa.rate
  const reforma = Number.isFinite(reformaRaw) && reformaRaw > 0 ? reformaRaw : 0
  const gastosAnualesPct =
    Number.isFinite(gastosPctRaw) && gastosPctRaw >= 0 && gastosPctRaw <= 90 ? gastosPctRaw : GASTOS_ANUALES_PCT_DEFAULT
  const anunciada = Number.isFinite(anunciadaRaw) && anunciadaRaw > 0 ? anunciadaRaw : null

  const rentaAnual = alquiler * 12
  const itpEur = (precio * itpPct) / 100
  const gastosCompraEur = (precio * GASTOS_COMPRA_PCT) / 100
  const inversionReal = precio + itpEur + gastosCompraEur + reforma
  const gastosAnualesEur = (rentaAnual * gastosAnualesPct) / 100
  const rentaNetaAnual = rentaAnual - gastosAnualesEur

  const brutaPct = (rentaAnual / precio) * 100
  const netaPct = (rentaNetaAnual / inversionReal) * 100

  const fmtPct = (n: number) => `${n.toFixed(2).replace('.', ',')} %`

  // ── VEREDICTO (el corazón) ──────────────────────────────────────────────
  let veredicto: Veredicto
  let veredictoTitulo: string
  let veredictoCuerpo: string

  if (anunciada == null) {
    veredicto = 'sin_anunciada'
    veredictoTitulo = 'Esta es la diferencia que casi nadie te enseña'
    veredictoCuerpo = `La rentabilidad bruta de esta operación es ${fmtPct(brutaPct)}, pero la neta real (descontando impuestos de compra, gastos y desembolso completo) es ${fmtPct(netaPct)}. Si en un anuncio te enseñan la primera y la llaman "rentabilidad" a secas, te están enseñando el número grande, no el que cobras.`
  } else if (anunciada > brutaPct + 0.4) {
    veredicto = 'inflada'
    veredictoTitulo = '🔴 Esa cifra ni siquiera cuadra como bruta'
    veredictoCuerpo = `Te anuncian ${fmtPct(anunciada)}, pero ni con la fórmula más optimista (la bruta) sale más de ${fmtPct(brutaPct)}. O hay datos mal puestos, o directamente te la están inflando. La neta real sería ${fmtPct(netaPct)}.`
  } else if (Math.abs(anunciada - brutaPct) <= 0.4) {
    veredicto = 'bruta'
    veredictoTitulo = '🔴 Te están dando la BRUTA, no la neta'
    veredictoCuerpo = `Ese ${fmtPct(anunciada)} es exactamente la rentabilidad bruta (alquiler × 12 ÷ precio). Es el truco más común del sector: el número grande, etiquetado como "rentabilidad". Lo que de verdad cobras, descontando ITP, gastos de compra y gastos anuales, es ${fmtPct(netaPct)}.`
  } else if (anunciada <= netaPct + 0.5) {
    veredicto = 'coherente'
    veredictoTitulo = '🟢 Coherente con una rentabilidad neta real'
    veredictoCuerpo = `Ese ${fmtPct(anunciada)} encaja con la neta real que sale aquí (${fmtPct(netaPct)}). Buena señal: parece que quien te lo anuncia está contando los gastos, no solo enseñando el número grande.`
  } else {
    veredicto = 'intermedia'
    veredictoTitulo = '🟠 Está entre la bruta y la neta'
    veredictoCuerpo = `Ese ${fmtPct(anunciada)} se sitúa entre la bruta (${fmtPct(brutaPct)}) y la neta real (${fmtPct(netaPct)}): probablemente no incluye todos los gastos. Pide el desglose completo antes de decidir.`
  }

  const ref = anunciada != null ? anunciada : brutaPct
  const gapPuntos = ref - netaPct
  const gapEurAnio = (gapPuntos / 100) * inversionReal

  return {
    ok: true,
    result: {
      precio,
      alquilerMensual: alquiler,
      ccaaCode: ccaa.code,
      ccaaName: ccaa.name,
      itpPct,
      reforma,
      gastosAnualesPct,
      anunciada,
      rentaAnual,
      itpEur,
      gastosCompraEur,
      inversionReal,
      gastosAnualesEur,
      rentaNetaAnual,
      brutaPct,
      netaPct,
      veredicto,
      veredictoTitulo,
      veredictoCuerpo,
      gapPuntos,
      gapEurAnio,
    },
  }
}
