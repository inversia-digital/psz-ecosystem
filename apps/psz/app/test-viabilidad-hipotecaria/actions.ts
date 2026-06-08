'use server'

import { forensicSignature } from '../_lib/signature'
import { withInvisibleWatermark } from '../_lib/invisible'

/**
 * Server Action: calculateViabilidad
 *
 * Test de viabilidad hipotecaria: a partir de ingresos, deudas, precio,
 * ahorro, plazo, edad y tipo de contrato, estima cuota, ratio de esfuerzo,
 * LTV y edad al vencimiento, y devuelve un veredicto VIABLE / AJUSTADA /
 * DIFÍCIL con los motivos. Los umbrales son criterios reales de mesa de
 * riesgos (no fórmulas de manual) — El Sello Palacios.
 *
 * Ejecuta SOLO en servidor. Propiedad de Inversia Global Digital, S.L.U.
 */

export type Veredicto = 'viable' | 'ajustada' | 'dificil'

export interface ViabFactor {
  severity: 'info' | 'warning' | 'danger' | 'success'
  title: string
  body: string
}

export interface ViabResult {
  inputs: {
    ingresos: number
    otrasCuotas: number
    precio: number
    ahorro: number
    plazoAnios: number
    edad: number
    tipoContrato: 'indefinido' | 'temporal' | 'autonomo'
  }
  veredicto: Veredicto
  cuotaEstimada: number
  ratioEsfuerzoPct: number
  ltvPct: number
  edadVencimiento: number
  hipotecaNecesaria: number
  gastosEstimados: number
  ahorroNecesarioTotal: number
  tinReferencia: number
  factores: ViabFactor[]
}

export type ActionState =
  | { ok: true; result: ViabResult; _psz_sig: string; _psz_ts: string }
  | { ok: false; error: string }
  | null

const TIN_REFERENCIA = 3.0 // tipo orientativo de mercado para estimar la cuota
const GASTOS_PCT = 0.12 // ~12% del precio (impuestos + notaría + registro + gestoría + tasación)

function cuotaFrancesa(capital: number, tinAnual: number, plazoMeses: number): number {
  if (capital <= 0) return 0
  if (tinAnual === 0) return capital / plazoMeses
  const i = tinAnual / 100 / 12
  return (capital * i) / (1 - Math.pow(1 + i, -plazoMeses))
}

export async function calculateViabilidad(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const ingresos = num(formData.get('ingresos'))
  const otrasCuotas = num(formData.get('otrasCuotas')) ?? 0
  const precio = num(formData.get('precio'))
  const ahorro = num(formData.get('ahorro'))
  const plazoAnios = num(formData.get('plazoAnios'))
  const edad = num(formData.get('edad'))
  const tc = String(formData.get('tipoContrato') || 'indefinido')
  const tipoContrato = (['indefinido', 'temporal', 'autonomo'].includes(tc) ? tc : 'indefinido') as
    'indefinido' | 'temporal' | 'autonomo'

  if (
    !validPositive(ingresos) || !validPositive(precio) ||
    ahorro === null || ahorro < 0 ||
    !validPositive(plazoAnios) || !validPositive(edad)
  ) {
    return { ok: false, error: 'Rellena ingresos, precio, ahorro, plazo y edad con valores válidos.' }
  }
  if (plazoAnios > 40) return { ok: false, error: 'Plazo no realista (máx. 40 años).' }
  if (edad > 90) return { ok: false, error: 'Edad no realista.' }

  const gastosEstimados = precio * GASTOS_PCT
  const ahorroNecesarioTotal = gastosEstimados // mínimo imprescindible: cubrir gastos
  const entradaAportable = Math.max(0, ahorro - gastosEstimados)
  const hipotecaNecesaria = Math.max(0, precio - entradaAportable)
  const ltvPct = (hipotecaNecesaria / precio) * 100
  const cuota = cuotaFrancesa(hipotecaNecesaria, TIN_REFERENCIA, Math.round(plazoAnios * 12))
  const ratioEsfuerzoPct = ((cuota + (otrasCuotas || 0)) / ingresos) * 100
  const edadVencimiento = Math.round(edad + plazoAnios)

  const { veredicto, factores } = evaluar({
    ratioEsfuerzoPct, ltvPct, edadVencimiento, tipoContrato,
    ahorro, gastosEstimados,
  })

  const result: ViabResult = {
    inputs: { ingresos, otrasCuotas: otrasCuotas || 0, precio, ahorro, plazoAnios, edad, tipoContrato },
    veredicto,
    cuotaEstimada: round2(cuota),
    ratioEsfuerzoPct: round2(ratioEsfuerzoPct),
    ltvPct: round2(ltvPct),
    edadVencimiento,
    hipotecaNecesaria: round2(hipotecaNecesaria),
    gastosEstimados: round2(gastosEstimados),
    ahorroNecesarioTotal: round2(ahorroNecesarioTotal),
    tinReferencia: TIN_REFERENCIA,
    factores,
  }

  return { ok: true, result, ...forensicSignature(result) }
}

// ── Rangos críticos propietarios (mesa de riesgos) ──
function evaluar(d: {
  ratioEsfuerzoPct: number
  ltvPct: number
  edadVencimiento: number
  tipoContrato: 'indefinido' | 'temporal' | 'autonomo'
  ahorro: number
  gastosEstimados: number
}): { veredicto: Veredicto; factores: ViabFactor[] } {
  const f: ViabFactor[] = []
  let nivel = 0 // 0 viable, 1 ajustada, 2 difícil

  // Ahorro insuficiente para gastos
  if (d.ahorro < d.gastosEstimados) {
    nivel = Math.max(nivel, 2)
    f.push({
      severity: 'danger',
      title: 'Ahorro insuficiente para los gastos de compra',
      body: `Solo los gastos e impuestos rondan ${eur0(d.gastosEstimados)} y el banco no los financia. Con tu ahorro no llegas a cubrirlos, así que la operación no es viable tal cual: necesitas más ahorro o un precio menor.`,
    })
  }

  // Ratio de esfuerzo
  if (d.ratioEsfuerzoPct > 50) {
    nivel = Math.max(nivel, 2)
    f.push({ severity: 'danger', title: `Ratio de esfuerzo ${pct(d.ratioEsfuerzoPct)} — muy alto`, body: 'La cuota (más tus otras deudas) supera el 50% de tus ingresos. El scoring de prácticamente cualquier banco lo rechaza. Habría que bajar precio, alargar plazo o sumar titular/avalista.' })
  } else if (d.ratioEsfuerzoPct > 40) {
    nivel = Math.max(nivel, 2)
    f.push({ severity: 'danger', title: `Ratio de esfuerzo ${pct(d.ratioEsfuerzoPct)} — fuera de rango`, body: 'Por encima del 40% la mayoría de entidades dicen que no. Algún banco lo estudia con perfil muy sólido, pero es difícil sin reforzar la operación.' })
  } else if (d.ratioEsfuerzoPct > 35) {
    nivel = Math.max(nivel, 1)
    f.push({ severity: 'warning', title: `Ratio de esfuerzo ${pct(d.ratioEsfuerzoPct)} — ajustado`, body: 'Entre el 35% y el 40% depende del banco y del perfil. Se puede defender con buen historial, estabilidad y garantías; aquí el broker marca la diferencia presentando el caso al banco adecuado.' })
  } else {
    f.push({ severity: 'success', title: `Ratio de esfuerzo ${pct(d.ratioEsfuerzoPct)} — dentro de rango`, body: 'Por debajo del 35% el scoring lo ve con buenos ojos. Margen para negociar diferencial y vinculaciones.' })
  }

  // LTV
  if (d.ltvPct > 100) {
    nivel = Math.max(nivel, 2)
    f.push({ severity: 'danger', title: `Necesitas financiar el ${d.ltvPct.toFixed(0)}% (LTV > 100%)`, body: 'Pides más que el valor de la vivienda. Solo casos muy concretos (compra+reforma, etc.). Necesitas más ahorro.' })
  } else if (d.ltvPct > 90) {
    nivel = Math.max(nivel, 2)
    f.push({ severity: 'danger', title: `LTV ${d.ltvPct.toFixed(0)}% — muy alto`, body: 'Financiar más del 90% es excepcional: requiere avalista, doble garantía o seguro de prima única, con peor precio. Difícil sin reforzar.' })
  } else if (d.ltvPct > 80) {
    nivel = Math.max(nivel, 1)
    f.push({ severity: 'warning', title: `LTV ${d.ltvPct.toFixed(0)}% — por encima del 80%`, body: 'Por encima del 80% suele pedirse avalista o seguro de prima única. Hay bancos que llegan al 90-100% en perfiles concretos; saber a cuál presentarte es clave.' })
  } else {
    f.push({ severity: 'success', title: `LTV ${d.ltvPct.toFixed(0)}% — cómodo`, body: 'Financiación dentro del estándar (≤80%). El banco tiene margen para mejorar condiciones.' })
  }

  // Edad al vencimiento
  if (d.edadVencimiento > 80) {
    nivel = Math.max(nivel, 2)
    f.push({ severity: 'danger', title: `Edad al vencimiento: ${d.edadVencimiento} años`, body: 'La banca limita la edad al final del préstamo (normalmente 75-80). Por encima rara vez aprueban; habría que acortar plazo o sumar un titular más joven.' })
  } else if (d.edadVencimiento > 75) {
    nivel = Math.max(nivel, 1)
    f.push({ severity: 'warning', title: `Edad al vencimiento: ${d.edadVencimiento} años`, body: 'Cerca del límite habitual (75-80). Algunos bancos lo aceptan, otros recortan plazo. Conviene saber a cuál ir.' })
  }

  // Tipo de contrato
  if (d.tipoContrato === 'temporal') {
    nivel = Math.max(nivel, 1)
    f.push({ severity: 'warning', title: 'Contrato temporal', body: 'Sin contrato indefinido, el scoring es más exigente: pedirán antigüedad, continuidad demostrable o un segundo titular estable. No imposible, pero hay que presentarlo bien.' })
  } else if (d.tipoContrato === 'autonomo') {
    nivel = Math.max(nivel, 1)
    f.push({ severity: 'warning', title: 'Autónomo', body: 'Como autónomo, el banco mirará 2 años de declaraciones, estabilidad de ingresos y cuota de autónomos. Es perfectamente financiable con el expediente bien armado.' })
  }

  const veredicto: Veredicto = nivel >= 2 ? 'dificil' : nivel === 1 ? 'ajustada' : 'viable'
  return { veredicto, factores: f.map((x) => ({ ...x, body: withInvisibleWatermark(x.body) })) }
}

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
function round2(n: number): number {
  return Math.round(n * 100) / 100
}
function eur0(n: number): string {
  return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n)
}
function pct(n: number): string {
  return `${n.toFixed(1).replace('.', ',')}%`
}
