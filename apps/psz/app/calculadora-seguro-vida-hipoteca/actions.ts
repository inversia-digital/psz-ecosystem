'use server'

/**
 * Server action de la calculadora de seguro de vida vinculado a hipoteca.
 *
 * Pregunta operativa doble:
 *   1. ¿Cuánto costaría en el mercado un seguro de vida por el capital de
 *      mi hipoteca? (estimación orientativa por edad/capital/fumador/IPA)
 *   2. Si el banco me bonifica el TIN por contratar SU seguro, ¿me
 *      compensa mantenerlo o desvincularme y contratar fuera?
 *
 * La segunda pregunta es la que casi nadie responde con números: comparar
 * el SOBREPRECIO del seguro bancario contra el AHORRO de la bonificación.
 * Ley 5/2019, art. 17: el banco puede bonificar por productos vinculados,
 * pero debe aceptar pólizas alternativas con condiciones equiparables y
 * no puede cobrar por analizarlas.
 *
 * Las primas estimadas son ORIENTATIVAS (banda de mercado ±20%): la prima
 * real depende de la aseguradora, cuestionario de salud, profesión y
 * coberturas exactas. Esto no es mediación de seguros ni una oferta.
 */

import { forensicSignature } from '../_lib/signature'

// ─────────────────────────────────────────────────────────────────────────
// Tipos
// ─────────────────────────────────────────────────────────────────────────

export interface SeguroWarning {
  severity: 'red' | 'amber' | 'green'
  title: string
  detail: string
}

export interface SeguroResult {
  inputs: {
    edad: number
    capitalAsegurado: number
    fumador: boolean
    invalidez: boolean
    primaActualAnual: number      // 0 si no se indicó
    bonificacionPct: number       // pp de TIN bonificados por el seguro; 0 si no se indicó
  }
  // Banda de mercado estimada (prima anual, seguro individual de vida-riesgo)
  primaMercadoMin: number
  primaMercadoMed: number
  primaMercadoMax: number
  // Referencia típica de póliza colocada por banca (estudios sector: ~2-3x mercado)
  primaBancoTipica: number
  // Comparativa con la prima actual del usuario (solo si la indicó)
  sobreprecioAnual: number | null       // primaActual - primaMercadoMed
  sobreprecioPct: number | null         // % sobre mercado med
  ahorroDecenal: number | null          // sobreprecio × 10 años
  // Módulo bonificación (solo si indicó bonificación)
  costeBonificacionAnual: number | null // capital × pp/100 (aprox. interés extra 1er año)
  veredictoDesvincular: 'compensa' | 'no-compensa' | 'ajustado' | null
  warnings: SeguroWarning[]
}

export type ActionState =
  | { ok: true; result: SeguroResult; _psz_sig: string; _psz_ts: string }
  | { ok: false; error: string }
  | null

// ─────────────────────────────────────────────────────────────────────────
// Tarifa orientativa (‰ anual sobre capital asegurado, vida-riesgo
// fallecimiento, no fumador). Interpolación lineal entre puntos de edad.
// Banda de mercado: ±20% sobre la tasa media resultante.
// ─────────────────────────────────────────────────────────────────────────

const TASA_POR_MIL: ReadonlyArray<readonly [number, number]> = [
  [18, 0.55],
  [25, 0.6],
  [30, 0.7],
  [35, 0.9],
  [40, 1.4],
  [45, 2.2],
  [50, 3.6],
  [55, 6.0],
  [60, 9.5],
  [65, 15.0],
  [70, 24.0],
]

const RECARGO_FUMADOR = 1.7
const RECARGO_INVALIDEZ = 1.35 // cobertura adicional de invalidez permanente absoluta (IPA)
const FACTOR_BANCA = 2.2      // referencia de sobreprecio típico banca vs individual (orientativo)

function tasaPorMil(edad: number): number {
  const pts = TASA_POR_MIL
  if (edad <= pts[0]![0]) return pts[0]![1]
  const last = pts[pts.length - 1]!
  if (edad >= last[0]) return last[1]
  for (let i = 0; i < pts.length - 1; i++) {
    const [e0, t0] = pts[i]!
    const [e1, t1] = pts[i + 1]!
    if (edad >= e0 && edad <= e1) {
      const f = (edad - e0) / (e1 - e0)
      return t0 + f * (t1 - t0)
    }
  }
  return last[1]
}

function parseNum(form: FormData, key: string): number {
  const raw = (form.get(key) as string | null) ?? ''
  const clean = raw.replace(',', '.').replace(/[^\d.-]/g, '')
  const n = parseFloat(clean)
  return Number.isFinite(n) ? n : 0
}

// ─────────────────────────────────────────────────────────────────────────
// Server action principal
// ─────────────────────────────────────────────────────────────────────────

export async function calculateSeguroVida(
  _prev: ActionState,
  form: FormData,
): Promise<ActionState> {
  const edad = parseNum(form, 'edad')
  const capitalAsegurado = parseNum(form, 'capitalAsegurado')
  const fumador = form.get('fumador') === 'si'
  const invalidez = form.get('invalidez') === 'si'
  const primaActualAnual = parseNum(form, 'primaActualAnual')
  const bonificacionPct = parseNum(form, 'bonificacionPct')

  if (edad < 18 || edad > 70) {
    return { ok: false, error: 'La edad debe estar entre 18 y 70 años.' }
  }
  if (capitalAsegurado < 10000 || capitalAsegurado > 2000000) {
    return {
      ok: false,
      error: 'Indica el capital a asegurar (entre 10.000 € y 2.000.000 €). Lo habitual es el capital pendiente de tu hipoteca.',
    }
  }
  if (primaActualAnual < 0 || primaActualAnual > 20000) {
    return { ok: false, error: 'La prima actual indicada está fuera de rango.' }
  }
  if (bonificacionPct < 0 || bonificacionPct > 2) {
    return { ok: false, error: 'La bonificación por el seguro suele estar entre 0 y 0,5 puntos de TIN. Revisa el dato (máximo admitido: 2).' }
  }

  // Prima anual estimada de mercado
  let tasa = tasaPorMil(edad)
  if (fumador) tasa *= RECARGO_FUMADOR
  if (invalidez) tasa *= RECARGO_INVALIDEZ
  const primaMed = (capitalAsegurado / 1000) * tasa
  const primaMin = primaMed * 0.8
  const primaMax = primaMed * 1.2
  const primaBanco = primaMed * FACTOR_BANCA

  // Comparativa con la prima actual
  const tienePrima = primaActualAnual > 0
  const sobreprecio = tienePrima ? primaActualAnual - primaMed : null
  const sobreprecioPct = tienePrima ? ((primaActualAnual / primaMed) - 1) * 100 : null

  // Módulo bonificación: interés extra aproximado del primer año si pierdes
  // la bonificación (capital pendiente × pp). Aproximación conservadora:
  // el coste real decrece cada año al amortizar capital.
  const tieneBonif = bonificacionPct > 0
  const costeBonif = tieneBonif ? capitalAsegurado * (bonificacionPct / 100) : null

  let veredicto: SeguroResult['veredictoDesvincular'] = null
  if (tienePrima && tieneBonif && sobreprecio !== null && costeBonif !== null) {
    const diff = sobreprecio - costeBonif
    if (diff > 100) veredicto = 'compensa'
    else if (diff < -100) veredicto = 'no-compensa'
    else veredicto = 'ajustado'
  }

  // ───────────────────────────────────────────────────────────────────────
  // Avisos
  // ───────────────────────────────────────────────────────────────────────

  const warnings: SeguroWarning[] = []

  if (tienePrima && sobreprecioPct !== null) {
    if (sobreprecioPct >= 100) {
      warnings.push({
        severity: 'red',
        title: `Estás pagando más del doble de la banda de mercado estimada (+${sobreprecioPct.toFixed(0)}%)`,
        detail:
          `Tu prima actual supera en ${Math.round(sobreprecio!)} €/año la estimación media de mercado para tu perfil. ` +
          'En 10 años son ' + Math.round(sobreprecio! * 10) + ' €. La Ley 5/2019 (art. 17) obliga al banco a aceptar ' +
          'una póliza alternativa con condiciones equiparables: puedes cambiar de aseguradora sin tocar tu hipoteca. ' +
          'Compara siempre el ahorro con la bonificación de TIN que perderías, si la hay.',
      })
    } else if (sobreprecioPct >= 40) {
      warnings.push({
        severity: 'amber',
        title: `Tu prima está un ${sobreprecioPct.toFixed(0)}% por encima de la banda media estimada`,
        detail:
          'Sobreprecio relevante. Pide 2-3 cotizaciones individuales por el mismo capital y coberturas y compara. ' +
          'Si tu banco te bonifica el TIN por el seguro, calcula las dos columnas (este simulador lo hace abajo) antes de decidir.',
      })
    } else if (sobreprecioPct <= 15) {
      warnings.push({
        severity: 'green',
        title: 'Tu prima está dentro de la banda de mercado estimada',
        detail:
          'Pagas un precio razonable para tu perfil. Revísalo igualmente cada 2-3 años: el capital pendiente baja al amortizar ' +
          'y el capital asegurado debería acompañarlo (muchas pólizas bancarias no lo ajustan).',
      })
    }
  }

  if (veredicto === 'compensa') {
    warnings.push({
      severity: 'red',
      title: 'Con tus números, desvincular COMPENSA',
      detail:
        `El sobreprecio de tu seguro (${Math.round(sobreprecio!)} €/año) supera lo que te ahorra la bonificación de TIN ` +
        `(≈${Math.round(costeBonif!)} €/año el primer año, y cada año menos según amortizas). Contratar fuera y renunciar a la ` +
        'bonificación te deja dinero neto en el bolsillo desde el primer año — y la brecha crece con el tiempo.',
    })
  } else if (veredicto === 'no-compensa') {
    warnings.push({
      severity: 'green',
      title: 'Con tus números, HOY conviene mantener la bonificación',
      detail:
        `La bonificación de TIN te ahorra ≈${Math.round(costeBonif!)} €/año, más que el sobreprecio del seguro ` +
        `(${Math.round(Math.max(0, sobreprecio ?? 0))} €/año). Ojo: el ahorro de la bonificación DECRECE cada año al amortizar capital ` +
        'y la prima del seguro SUBE con la edad. Recalcula cada año — el punto de cruce llega casi siempre.',
    })
  } else if (veredicto === 'ajustado') {
    warnings.push({
      severity: 'amber',
      title: 'Está ajustado: la diferencia es menor de ±100 €/año',
      detail:
        'Sobreprecio del seguro y ahorro de la bonificación prácticamente empatan. En este caso pesan los intangibles: ' +
        'cobertura real de cada póliza (¿incluye IPA?), capital asegurado (¿se ajusta al amortizar?), y tu comodidad. ' +
        'Vuelve a calcular en la próxima renovación: la balanza se moverá.',
    })
  }

  if (edad >= 50) {
    warnings.push({
      severity: 'amber',
      title: 'A partir de 50 años la prima crece deprisa: revisa el capital asegurado',
      detail:
        'La tasa de riesgo se acelera con la edad. Si tu deuda pendiente ya es baja, asegurar el capital inicial de la hipoteca ' +
        'es pagar cobertura de más: ajusta el capital asegurado a la deuda pendiente real y la prima bajará en proporción.',
    })
  }

  const result: SeguroResult = {
    inputs: {
      edad: Math.round(edad),
      capitalAsegurado: Math.round(capitalAsegurado),
      fumador,
      invalidez,
      primaActualAnual: Math.round(primaActualAnual),
      bonificacionPct: Number(bonificacionPct.toFixed(2)),
    },
    primaMercadoMin: Math.round(primaMin),
    primaMercadoMed: Math.round(primaMed),
    primaMercadoMax: Math.round(primaMax),
    primaBancoTipica: Math.round(primaBanco),
    sobreprecioAnual: sobreprecio === null ? null : Math.round(sobreprecio),
    sobreprecioPct: sobreprecioPct === null ? null : Number(sobreprecioPct.toFixed(0)),
    ahorroDecenal: sobreprecio === null ? null : Math.round(sobreprecio * 10),
    costeBonificacionAnual: costeBonif === null ? null : Math.round(costeBonif),
    veredictoDesvincular: veredicto,
    warnings,
  }
  return { ok: true, result, ...forensicSignature(result) }
}
