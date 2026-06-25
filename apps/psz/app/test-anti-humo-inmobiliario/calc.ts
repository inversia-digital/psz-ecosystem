/**
 * Núcleo de cálculo del "test anti-humo" (puro, sin 'use server').
 * Lo reutilizan: el server action (actions.ts), la metadata dinámica de la
 * página (page.tsx) y la imagen social dinámica (api/og-antihumo).
 *
 * Misma metodología que la calculadora de rentabilidad seria (mismo itpData,
 * misma definición de inversión real y de neta) para que los números cuadren.
 */

import { ITP_TABLE } from '../calculadora-rentabilidad-inmobiliaria/itpData'

// Gastos de compra FIJOS (notaría ~800-1.000 + registro ~300 + gestoría). No
// escalan con el precio: en zonas fuera de Madrid/Barcelona rondan los 1.300 €.
const GASTOS_COMPRA_DEFAULT = 1300
const GASTOS_ANUALES_PCT_DEFAULT = 28 // IBI (~200) + comunidad (~300) + seguro/impago + mantenimiento + vacíos + gestión, sobre la renta

export type Veredicto = 'bruta' | 'inflada' | 'intermedia' | 'coherente' | 'sin_anunciada'

export interface AntiHumoResult {
  precio: number
  alquilerMensual: number
  ccaaCode: string
  ccaaName: string
  itpPct: number
  reforma: number
  anunciada: number | null
  rentaAnual: number
  itpEur: number
  gastosCompraEur: number
  honorarios: number
  inversionReal: number
  gastosAnualesEur: number
  /** true si los gastos anuales se estimaron (% de la renta), false si los puso el usuario */
  gastosAnualesEstimado: boolean
  rentaNetaAnual: number
  brutaPct: number
  netaPct: number
  veredicto: Veredicto
  /** etiqueta corta para chips/imagen (sin emoji) */
  veredictoEtiqueta: string
  veredictoTitulo: string
  veredictoCuerpo: string
  gapPuntos: number
  gapEurAnio: number
}

export interface AntiHumoInput {
  precio: number
  alquiler: number
  ccaaCode?: string
  reforma?: number
  /** Gastos de compra fijos (notaría + registro + gestoría). Por defecto 1.300 €. */
  gastosCompra?: number
  /** Honorarios de la agencia / personal shopper. Por defecto 0. */
  honorarios?: number
  /** Gastos anuales TOTALES en €/año (IBI + comunidad + seguro + …). Si no se
   *  da, se estima como un % de la renta (GASTOS_ANUALES_PCT_DEFAULT). */
  gastosAnualesEur?: number
  anunciada?: number | null
}

const fmtPct = (n: number) => `${n.toFixed(2).replace('.', ',')} %`
const fmtEur = (n: number) =>
  new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n)

export function computeAntiHumo(inp: AntiHumoInput): AntiHumoResult {
  const precio = inp.precio
  const alquiler = inp.alquiler
  const ccaa = ITP_TABLE.find((c) => c.code === (inp.ccaaCode || 'VC')) || ITP_TABLE.find((c) => c.code === 'VC')!
  const itpPct = ccaa.rate
  const reforma = inp.reforma && inp.reforma > 0 ? inp.reforma : 0
  const gastosCompraEur =
    inp.gastosCompra != null && inp.gastosCompra >= 0 ? inp.gastosCompra : GASTOS_COMPRA_DEFAULT
  const honorarios = inp.honorarios && inp.honorarios > 0 ? inp.honorarios : 0
  const anunciada = inp.anunciada != null && inp.anunciada > 0 ? inp.anunciada : null

  const rentaAnual = alquiler * 12
  const itpEur = (precio * itpPct) / 100
  const inversionReal = precio + itpEur + gastosCompraEur + reforma + honorarios
  const gastosAnualesProvided = inp.gastosAnualesEur != null && inp.gastosAnualesEur > 0
  const gastosAnualesEur = gastosAnualesProvided ? inp.gastosAnualesEur! : (rentaAnual * GASTOS_ANUALES_PCT_DEFAULT) / 100
  const gastosAnualesEstimado = !gastosAnualesProvided
  const rentaNetaAnual = rentaAnual - gastosAnualesEur

  const brutaPct = (rentaAnual / precio) * 100
  const netaPct = (rentaNetaAnual / inversionReal) * 100

  const ref = anunciada != null ? anunciada : brutaPct
  const gapPuntos = ref - netaPct
  const gapEurAnio = (gapPuntos / 100) * inversionReal

  let veredicto: Veredicto
  let veredictoEtiqueta: string
  let veredictoTitulo: string
  let veredictoCuerpo: string

  if (anunciada == null) {
    veredicto = 'sin_anunciada'
    veredictoEtiqueta = 'Lo que ves ≠ lo que cobras'
    veredictoTitulo = 'El número que te enseñan NO es el que cobras'
    veredictoCuerpo = `La rentabilidad bruta de esta operación es ${fmtPct(
      brutaPct,
    )} — el número grande, fácil y llamativo. La que de verdad te entra al bolsillo, descontando impuestos de compra y gastos, es ${fmtPct(
      netaPct,
    )}. Esos ${fmtPct(Math.abs(gapPuntos))} de diferencia son ${fmtEur(Math.abs(gapEurAnio))} al año que casi nadie te enseña.`
  } else if (anunciada > brutaPct + 0.4) {
    veredicto = 'inflada'
    veredictoEtiqueta = 'Te la inflan'
    veredictoTitulo = 'Esa cifra ni inflando los números sale'
    veredictoCuerpo = `Te venden un ${fmtPct(anunciada)}, pero ni con la fórmula más optimista del mundo (la bruta) pasa de ${fmtPct(
      brutaPct,
    )}. O hay datos cocinados, o directamente te la están inflando. Lo real: ${fmtPct(netaPct)}.`
  } else if (Math.abs(anunciada - brutaPct) <= 0.4) {
    veredicto = 'bruta'
    veredictoEtiqueta = 'Te cuelan la bruta'
    veredictoTitulo = 'El timo del número grande'
    veredictoCuerpo = `Ese ${fmtPct(
      anunciada,
    )} es clavado a la rentabilidad BRUTA (alquiler × 12 ÷ precio). Es el truco más viejo del sector: el número grande, etiquetado como "rentabilidad", para que pique el inversor con prisa. Lo que cobras de verdad: ${fmtPct(
      netaPct,
    )}. Te están ocultando ${fmtEur(Math.abs(gapEurAnio))} al año.`
  } else if (anunciada <= netaPct + 0.5) {
    veredicto = 'coherente'
    veredictoEtiqueta = 'Juego limpio'
    veredictoTitulo = 'Estos sí juegan limpio'
    veredictoCuerpo = `Ese ${fmtPct(anunciada)} cuadra con la neta real (${fmtPct(
      netaPct,
    )}). Buena señal: parece que quien te lo enseña cuenta los gastos, no solo el número grande. Una rareza, la verdad.`
  } else {
    veredicto = 'intermedia'
    veredictoEtiqueta = 'Medio humo'
    veredictoTitulo = 'Ni bruta ni neta: un número a medias'
    veredictoCuerpo = `Ese ${fmtPct(anunciada)} se queda entre la bruta (${fmtPct(brutaPct)}) y la neta real (${fmtPct(
      netaPct,
    )}): te enseñan algunos gastos y se callan otros. Pide el desglose completo antes de firmar nada.`
  }

  if (honorarios > 0) {
    veredictoCuerpo += ` (Aquí están contados también los ${fmtEur(
      honorarios,
    )} de honorarios de la agencia/PSI: un coste real de la operación que el número honesto incluye desde el principio.)`
  }

  return {
    precio,
    alquilerMensual: alquiler,
    ccaaCode: ccaa.code,
    ccaaName: ccaa.name,
    itpPct,
    reforma,
    gastosAnualesEstimado,
    anunciada,
    rentaAnual,
    itpEur,
    gastosCompraEur,
    honorarios,
    inversionReal,
    gastosAnualesEur,
    rentaNetaAnual,
    brutaPct,
    netaPct,
    veredicto,
    veredictoEtiqueta,
    veredictoTitulo,
    veredictoCuerpo,
    gapPuntos,
    gapEurAnio,
  }
}

/** Parseo de números en formato español: "120.000" miles, "10,5" decimal. */
export function parseEsNumber(v: unknown): number {
  if (v == null) return NaN
  const s = String(v).trim().replace(/[\s€%]/g, '')
  if (s === '') return NaN
  if (s.includes(',')) return parseFloat(s.replace(/\./g, '').replace(',', '.'))
  if (/^\d{1,3}(\.\d{3})+$/.test(s)) return parseFloat(s.replace(/\./g, ''))
  return parseFloat(s)
}
