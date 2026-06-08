'use server'

import { forensicSignature } from '../_lib/signature'
import { withInvisibleWatermark } from '../_lib/invisible'

/**
 * Server Action: calculateSubrogacion
 *
 * ¿Compensa cambiar/subrogar la hipoteca? Compara los intereses que quedan
 * por pagar con el TIN actual frente a un TIN nuevo (amortización francesa
 * sobre el capital pendiente y el plazo restante), descuenta los costes del
 * cambio y calcula ahorro neto, ahorro mensual y punto de equilibrio.
 *
 * Ejecuta SOLO en servidor (lógica + rangos críticos protegidos).
 * Propiedad de Inversia Global Digital, S.L.U. — Toño Palacios (E242).
 */

export interface SubroWarning {
  severity: 'info' | 'warning' | 'danger' | 'success'
  title: string
  body: string
}

export interface SubroResult {
  inputs: {
    capitalPendiente: number
    aniosRestantes: number
    tinActual: number
    tinNuevo: number
    comisionPct: number
    costesFijos: number
  }
  cuotaActual: number
  cuotaNueva: number
  ahorroCuotaMensual: number
  interesesActual: number
  interesesNuevo: number
  ahorroIntereses: number
  costeCambio: number
  ahorroNeto: number
  /** Meses para recuperar los costes del cambio (null si no se recuperan) */
  puntoEquilibrioMeses: number | null
  warnings: SubroWarning[]
}

export type ActionState =
  | { ok: true; result: SubroResult; _psz_sig: string; _psz_ts: string }
  | { ok: false; error: string }
  | null

function cuotaFrancesa(capital: number, tinAnual: number, plazoMeses: number): number {
  if (tinAnual === 0) return capital / plazoMeses
  const i = tinAnual / 100 / 12
  return (capital * i) / (1 - Math.pow(1 + i, -plazoMeses))
}

export async function calculateSubrogacion(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const capitalPendiente = num(formData.get('capitalPendiente'))
  const aniosRestantes = num(formData.get('aniosRestantes'))
  const tinActual = num(formData.get('tinActual'))
  const tinNuevo = num(formData.get('tinNuevo'))
  const comisionPct = num(formData.get('comisionPct')) ?? 0
  const costesFijos = num(formData.get('costesFijos')) ?? 0

  if (
    !validPositive(capitalPendiente) ||
    !validPositive(aniosRestantes) ||
    tinActual === null || tinActual < 0 ||
    tinNuevo === null || tinNuevo < 0
  ) {
    return { ok: false, error: 'Rellena capital pendiente, años restantes y ambos TIN con valores válidos.' }
  }
  if (aniosRestantes > 40) return { ok: false, error: 'Plazo restante no realista (máx. 40 años).' }
  if (tinActual > 20 || tinNuevo > 20) return { ok: false, error: 'TIN no realista. Revisa los valores.' }

  const n = Math.round(aniosRestantes * 12)
  const cuotaActual = cuotaFrancesa(capitalPendiente, tinActual, n)
  const cuotaNueva = cuotaFrancesa(capitalPendiente, tinNuevo, n)
  const interesesActual = cuotaActual * n - capitalPendiente
  const interesesNuevo = cuotaNueva * n - capitalPendiente
  const ahorroIntereses = interesesActual - interesesNuevo
  const ahorroCuotaMensual = cuotaActual - cuotaNueva
  const costeCambio = capitalPendiente * (comisionPct / 100) + costesFijos
  const ahorroNeto = ahorroIntereses - costeCambio
  const puntoEquilibrioMeses =
    ahorroCuotaMensual > 0 ? Math.ceil(costeCambio / ahorroCuotaMensual) : null

  const warnings = generarWarnings({
    capitalPendiente, aniosRestantes, tinActual, tinNuevo,
    ahorroNeto, ahorroCuotaMensual, costeCambio, puntoEquilibrioMeses,
  })

  const result: SubroResult = {
    inputs: { capitalPendiente, aniosRestantes, tinActual, tinNuevo, comisionPct, costesFijos },
    cuotaActual: round2(cuotaActual),
    cuotaNueva: round2(cuotaNueva),
    ahorroCuotaMensual: round2(ahorroCuotaMensual),
    interesesActual: round2(interesesActual),
    interesesNuevo: round2(interesesNuevo),
    ahorroIntereses: round2(ahorroIntereses),
    costeCambio: round2(costeCambio),
    ahorroNeto: round2(ahorroNeto),
    puntoEquilibrioMeses,
    warnings,
  }

  return { ok: true, result, ...forensicSignature(result) }
}

function generarWarnings(d: {
  capitalPendiente: number
  aniosRestantes: number
  tinActual: number
  tinNuevo: number
  ahorroNeto: number
  ahorroCuotaMensual: number
  costeCambio: number
  puntoEquilibrioMeses: number | null
}): SubroWarning[] {
  const w: SubroWarning[] = []

  if (d.tinNuevo >= d.tinActual) {
    w.push({
      severity: 'danger',
      title: 'El TIN nuevo no mejora al actual',
      body: 'Si el tipo que te ofrecen no es más bajo que el que ya tienes, cambiar no reduce intereses y solo añade costes. La subrogación tiene sentido cuando hay una rebaja real de tipo o cuando quitas vinculaciones caras.',
    })
  } else if (d.ahorroNeto > 0) {
    w.push({
      severity: 'success',
      title: `Te compensa: ahorro neto de ${eur0(d.ahorroNeto)}`,
      body: `Bajar del ${pct(d.tinActual)} al ${pct(d.tinNuevo)} te ahorra más en intereses de lo que cuesta el cambio${d.puntoEquilibrioMeses ? `, y recuperas los costes en unos ${d.puntoEquilibrioMeses} meses` : ''}. A partir de ahí, ahorro limpio.`,
    })
  } else {
    w.push({
      severity: 'warning',
      title: 'El ahorro no cubre los costes del cambio',
      body: 'Con estos números, lo que te ahorrarías en intereses no compensa los costes de cambiar (comisión, tasación, gestoría). Revisa si puedes negociar un TIN mejor o reducir comisiones antes de mover la hipoteca.',
    })
  }

  if (d.puntoEquilibrioMeses && d.puntoEquilibrioMeses > d.aniosRestantes * 12) {
    w.push({
      severity: 'warning',
      title: 'Tardarías más en amortizar el cambio que lo que queda de hipoteca',
      body: 'El punto de equilibrio cae más allá del final de tu préstamo: no llegarías a recuperar los costes. No compensa.',
    })
  }

  if (d.aniosRestantes < 5) {
    w.push({
      severity: 'info',
      title: `Quedan ${d.aniosRestantes} años: el grueso de intereses ya está pagado`,
      body: 'En el sistema francés los intereses se concentran al principio. Al final del préstamo casi toda la cuota es capital, así que el margen de ahorro por bajar el tipo es pequeño.',
    })
  }

  w.push({
    severity: 'info',
    title: 'Subrogación, novación o nueva hipoteca',
    body: 'Subrogar = llevarte la hipoteca a otro banco conservando el préstamo. Novar = renegociar con tu banco actual. Cancelar y firmar una nueva = más costes pero más flexibilidad. La Ley 5/2019 limita las comisiones (p. ej. amortización/subrogación en fijo: 2% los 10 primeros años, 1,5% después; en variable: 0,25% los 3 primeros años o 0,15% los 5 primeros, según pacto). Conviene revisar tu escritura.',
  })

  return w.map((x) => ({ ...x, body: withInvisibleWatermark(x.body) }))
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
  return `${n.toFixed(2).replace('.', ',')}%`
}
