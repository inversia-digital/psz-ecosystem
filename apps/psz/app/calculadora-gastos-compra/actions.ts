'use server'

import { forensicSignature } from '../_lib/signature'
import { ITP_TABLE } from '../calculadora-rentabilidad-inmobiliaria/itpData'

/**
 * Server Action: calculateGastosCompra
 *
 * Calcula los gastos de compra de una vivienda en España (impuestos +
 * notaría + registro + gestoría + tasación) y el AHORRO NECESARIO real
 * (entrada no financiada + gastos), por Comunidad Autónoma.
 *
 * Ejecuta EXCLUSIVAMENTE en servidor: las fórmulas y los rangos críticos
 * (la lectura de broker) no llegan al navegador.
 *
 * Propiedad de Inversia Global Digital, S.L.U. — Toño Palacios (E242).
 * Los importes son ORIENTATIVOS; el impuesto real depende del valor de
 * referencia, tramos y bonificaciones autonómicas vigentes.
 */

export interface GastoLinea {
  concepto: string
  importe: number
  nota?: string
}

export interface GastosWarning {
  severity: 'info' | 'warning' | 'danger' | 'success'
  title: string
  body: string
}

export interface GastosResult {
  inputs: {
    precio: number
    ccaa: string
    ccaaNombre: string
    tipoVivienda: 'segunda_mano' | 'obra_nueva'
    financia: boolean
    importeHipoteca: number
  }
  lineas: GastoLinea[]
  totalGastos: number
  gastosPctSobrePrecio: number
  entrada: number
  ahorroNecesario: number
  ahorroPctSobrePrecio: number
  warnings: GastosWarning[]
}

export type ActionState =
  | { ok: true; result: GastosResult; _psz_sig: string; _psz_ts: string }
  | { ok: false; error: string }
  | null

// AJD (Actos Jurídicos Documentados) sobre la ESCRITURA DE COMPRA en obra
// nueva, orientativo por CA. Varía ~0,5–1,5%. (En 2ª mano no hay AJD de
// compra; y el AJD de la hipoteca lo paga el banco desde el RDL 17/2018.)
const AJD_OBRA_NUEVA: Record<string, number> = {
  MD: 0.75, PV: 0.0, NC: 0.5, CN: 1.0, AN: 1.2, AR: 1.5, AS: 1.2, IB: 1.2,
  CB: 1.5, CM: 1.5, CL: 1.5, CT: 1.5, EX: 1.5, GA: 1.5, RI: 1.0, MC: 1.5,
  VC: 1.4, CE: 0.5, ME: 0.5,
}

function estimarNotaria(precio: number): number {
  // Arancel notarial regulado (orientativo): base + tramo, acotado.
  return clamp(600 + precio * 0.0016, 600, 1500)
}
function estimarRegistro(precio: number): number {
  // Registro de la propiedad (orientativo): ~60% de la notaría aprox.
  return clamp(400 + precio * 0.0011, 400, 1100)
}

export async function calculateGastosCompra(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const precio = num(formData.get('precio'))
  const ccaa = String(formData.get('ccaa') || '').trim()
  const tipoVivienda = (String(formData.get('tipoVivienda') || 'segunda_mano') === 'obra_nueva'
    ? 'obra_nueva'
    : 'segunda_mano') as 'segunda_mano' | 'obra_nueva'
  const financia = String(formData.get('financia') || 'si') !== 'no'
  const importeHipotecaRaw = num(formData.get('importeHipoteca'))

  if (!validPositive(precio)) {
    return { ok: false, error: 'Indica un precio de compra válido (mayor que cero).' }
  }
  const ca = ITP_TABLE.find((c) => c.code === ccaa)
  if (!ca) {
    return { ok: false, error: 'Selecciona una Comunidad Autónoma.' }
  }
  if (precio > 20_000_000) {
    return { ok: false, error: 'Precio no realista. Revisa el valor.' }
  }
  const importeHipoteca = financia ? (importeHipotecaRaw ?? 0) : 0
  if (financia && importeHipoteca > precio) {
    return { ok: false, error: 'El importe de la hipoteca no puede superar el precio de compra.' }
  }

  const lineas: GastoLinea[] = []

  // ── Impuesto de la compra ──
  if (tipoVivienda === 'segunda_mano') {
    const itp = precio * (ca.rate / 100)
    lineas.push({
      concepto: `ITP (${ca.name})`,
      importe: itp,
      nota: `Tipo orientativo ${ca.range || ca.rate + '%'}. ${ca.notes || ''}`.trim(),
    })
  } else {
    const iva = precio * 0.1
    const ajdPct = AJD_OBRA_NUEVA[ca.code] ?? 1.2
    const ajd = precio * (ajdPct / 100)
    lineas.push({ concepto: 'IVA (10%)', importe: iva, nota: 'Vivienda nueva: 10% de IVA (4% para VPO de régimen especial).' })
    lineas.push({ concepto: `AJD (${ajdPct.toFixed(2).replace('.', ',')}%)`, importe: ajd, nota: `Actos Jurídicos Documentados sobre la escritura de compra en ${ca.name}. Orientativo; varía por CA.` })
  }

  // ── Gastos fijos ──
  const notaria = estimarNotaria(precio)
  const registro = estimarRegistro(precio)
  lineas.push({ concepto: 'Notaría', importe: notaria, nota: 'Arancel notarial regulado (orientativo).' })
  lineas.push({ concepto: 'Registro de la propiedad', importe: registro, nota: 'Inscripción de la compraventa (orientativo).' })

  if (financia) {
    lineas.push({ concepto: 'Gestoría', importe: 400, nota: 'Tramitación de impuestos e inscripciones (suele exigirla el banco).' })
    lineas.push({ concepto: 'Tasación', importe: 350, nota: 'Tasación homologada exigida por el banco para conceder la hipoteca.' })
  } else {
    lineas.push({ concepto: 'Gestoría', importe: 300, nota: 'Tramitación de impuestos e inscripciones (opcional al contado).' })
  }

  const totalGastos = lineas.reduce((s, l) => s + l.importe, 0)
  const gastosPctSobrePrecio = (totalGastos / precio) * 100
  const entrada = financia ? Math.max(0, precio - importeHipoteca) : precio
  const ahorroNecesario = entrada + totalGastos
  const ahorroPctSobrePrecio = (ahorroNecesario / precio) * 100
  const ltvPct = financia && importeHipoteca > 0 ? (importeHipoteca / precio) * 100 : 0

  const warnings = generarWarnings({
    ca, tipoVivienda, financia, gastosPctSobrePrecio, ltvPct, ahorroNecesario, totalGastos,
  })

  const result: GastosResult = {
    inputs: {
      precio, ccaa: ca.code, ccaaNombre: ca.name, tipoVivienda, financia, importeHipoteca,
    },
    lineas: lineas.map((l) => ({ ...l, importe: round2(l.importe) })),
    totalGastos: round2(totalGastos),
    gastosPctSobrePrecio: round2(gastosPctSobrePrecio),
    entrada: round2(entrada),
    ahorroNecesario: round2(ahorroNecesario),
    ahorroPctSobrePrecio: round2(ahorroPctSobrePrecio),
    warnings,
  }

  return { ok: true, result, ...forensicSignature(result) }
}

// ── Rangos críticos / lectura de broker ──
function generarWarnings(d: {
  ca: { code: string; name: string; rate: number }
  tipoVivienda: 'segunda_mano' | 'obra_nueva'
  financia: boolean
  gastosPctSobrePrecio: number
  ltvPct: number
  ahorroNecesario: number
  totalGastos: number
}): GastosWarning[] {
  const w: GastosWarning[] = []

  w.push({
    severity: 'info',
    title: `Necesitas ~${eur0(d.ahorroNecesario)} ahorrado para esta compra`,
    body: d.financia
      ? 'Incluye la entrada (la parte del precio que el banco no financia) más todos los gastos e impuestos. El banco financia la vivienda, casi nunca los gastos: ese dinero tiene que salir de tu bolsillo.'
      : 'Al pagar al contado necesitas el precio íntegro más los gastos e impuestos.',
  })

  if (d.financia && d.ltvPct > 80) {
    w.push({
      severity: 'warning',
      title: `Financias el ${d.ltvPct.toFixed(0)}% del precio (LTV > 80%)`,
      body: 'Por encima del 80% de financiación entras en terreno de avalista o seguro de prima única, y el banco sigue sin cubrir los gastos. Asegúrate de tener el colchón de gastos aparte. Si quieres saber qué bancos llegan a tu caso, eso lo trabajo como broker.',
    })
  }

  // Regla del 10-13%
  if (d.tipoVivienda === 'segunda_mano') {
    w.push({
      severity: 'info',
      title: `Gastos ≈ ${d.gastosPctSobrePrecio.toFixed(1)}% del precio`,
      body: 'En vivienda de segunda mano la regla práctica es reservar un 10-12% del precio para gastos. El grueso es el ITP, que en tu comunidad marca la diferencia.',
    })
  } else {
    w.push({
      severity: 'info',
      title: `Gastos ≈ ${d.gastosPctSobrePrecio.toFixed(1)}% del precio`,
      body: 'En obra nueva paga IVA (10%) + AJD en lugar de ITP. La regla práctica es reservar un 11-13% del precio para gastos.',
    })
  }

  // ITP alto / bajo por CA (solo 2ª mano)
  if (d.tipoVivienda === 'segunda_mano') {
    if (d.ca.rate >= 9) {
      w.push({
        severity: 'warning',
        title: `${d.ca.name}: ITP alto (${d.ca.rate}%)`,
        body: 'Tu comunidad está entre las de ITP más alto. Revisa si te aplican bonificaciones por vivienda habitual, edad (joven), familia numerosa, discapacidad o municipio despoblado: pueden rebajarlo bastante.',
      })
    } else if (d.ca.rate <= 6.5) {
      w.push({
        severity: 'success',
        title: `${d.ca.name}: ITP bajo (${d.ca.rate}%)`,
        body: 'Tu comunidad tiene de los ITP más bajos de España, lo que reduce mucho los gastos de compra frente a otras comunidades.',
      })
    }
  }

  return w
}

// ── Helpers ──
function num(v: FormDataEntryValue | null): number | null {
  if (typeof v !== 'string') return null
  const t = v.trim().replace(/\./g, '').replace(',', '.')
  if (!t) return null
  const n = Number(t)
  return Number.isFinite(n) ? n : null
}
function validPositive(v: number | null): v is number {
  return v !== null && v > 0
}
function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n))
}
function round2(n: number): number {
  return Math.round(n * 100) / 100
}
function eur0(n: number): string {
  return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n)
}
