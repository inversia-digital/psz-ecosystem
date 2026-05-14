/**
 * Server-side signature forense — Capa 4.B.
 *
 * Cada respuesta de un server action incluye `_psz_sig` (HMAC-SHA256
 * sobre timestamp + payload) y `_psz_ts` (ISO timestamp).
 *
 * Si un scraper copia bruto la respuesta de nuestras calculadoras y la
 * sirve en su propia web, la signature viaja con ella. Como solo
 * nosotros tenemos la clave privada en el servidor, podemos demostrar
 * que ese output fue generado por nuestro sistema.
 *
 * La clave PSZ_FORENSIC_SECRET vive solo en producción (Vercel env
 * vars). En desarrollo cae a un fallback público — la signature
 * funciona pero NO sirve como prueba forense local.
 *
 * Cómo se verifica más adelante (si hay caso de copia):
 *   1. Tomas el sospechoso "_psz_sig" + "_psz_ts" + el payload que
 *      acompaña.
 *   2. Recalculas HMAC-SHA256(secret + ts + payload).
 *   3. Si coincide → output legítimo nuestro.
 */

import { createHmac } from 'crypto'

const FORENSIC_SECRET =
  process.env.PSZ_FORENSIC_SECRET ??
  'dev-fallback-NOT-FOR-PRODUCTION-set-PSZ_FORENSIC_SECRET-on-vercel'

export interface ForensicSignature {
  _psz_sig: string
  _psz_ts: string
}

/**
 * Genera signature forense sobre cualquier payload serializable.
 * Se devuelve como objeto que el caller puede esparcir en la response:
 *
 *   return { ok: true, ...result, ...forensicSignature(result) }
 */
export function forensicSignature(payload: unknown): ForensicSignature {
  const ts = new Date().toISOString()
  const serialized = typeof payload === 'string' ? payload : JSON.stringify(payload)
  const sig = createHmac('sha256', FORENSIC_SECRET)
    .update(`${ts}|${serialized}`)
    .digest('hex')

  return {
    _psz_sig: sig,
    _psz_ts: ts,
  }
}

/**
 * Verifica una signature forense. Usado para auditoría posterior si
 * encontramos un output sospechoso en la web de un copión.
 *
 * Devuelve true si la signature es válida (= output legítimo nuestro).
 */
export function verifyForensicSignature(
  payload: unknown,
  signature: ForensicSignature,
): boolean {
  const expected = createHmac('sha256', FORENSIC_SECRET)
    .update(
      `${signature._psz_ts}|${
        typeof payload === 'string' ? payload : JSON.stringify(payload)
      }`,
    )
    .digest('hex')
  return expected === signature._psz_sig
}
