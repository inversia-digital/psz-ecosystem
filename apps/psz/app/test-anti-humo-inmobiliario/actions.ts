'use server'

/**
 * Server Action del "test anti-humo". Parsea el FormData y delega el cálculo
 * + veredicto en el núcleo puro (calc.ts), que también reutilizan la metadata
 * dinámica y la imagen social.
 *
 * Propiedad de Inversia Global Digital, S.L.U. — Toño Palacios.
 */

import { computeAntiHumo, parseEsNumber, type AntiHumoResult } from './calc'

export type { AntiHumoResult, Veredicto } from './calc'

export type ActionState =
  | { ok: true; result: AntiHumoResult }
  | { ok: false; error: string }
  | null

export async function testAntiHumo(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const precio = parseEsNumber(formData.get('precio'))
  const alquiler = parseEsNumber(formData.get('alquiler'))
  if (!Number.isFinite(precio) || precio <= 0) return { ok: false, error: 'Introduce un precio de compra válido.' }
  if (!Number.isFinite(alquiler) || alquiler <= 0) return { ok: false, error: 'Introduce el alquiler mensual estimado.' }

  const reforma = parseEsNumber(formData.get('reforma'))
  const gastosAnualesEur = parseEsNumber(formData.get('gastosAnualesEur'))
  const gastosCompra = parseEsNumber(formData.get('gastosCompra'))
  const honorarios = parseEsNumber(formData.get('honorarios'))
  const anunciada = parseEsNumber(formData.get('anunciada'))

  const result = computeAntiHumo({
    precio,
    alquiler,
    ccaaCode: String(formData.get('ccaa') || 'VC'),
    reforma: Number.isFinite(reforma) ? reforma : 0,
    gastosCompra: Number.isFinite(gastosCompra) ? gastosCompra : undefined,
    honorarios: Number.isFinite(honorarios) ? honorarios : 0,
    gastosAnualesEur: Number.isFinite(gastosAnualesEur) ? gastosAnualesEur : undefined,
    anunciada: Number.isFinite(anunciada) ? anunciada : null,
  })
  return { ok: true, result }
}
