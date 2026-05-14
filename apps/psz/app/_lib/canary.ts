/**
 * Canary tokens forenses — Capa 4.A y 4.D.
 *
 * Cada descarga de PDF lleva un identificador único embebido en
 * metadata. Si el PDF aparece distribuido en otra web/foro/redes,
 * podemos asociarlo a su origen (timestamp + IP + user agent).
 *
 * El token es un UUID v4 + timestamp + hash hash forense:
 *   ots_<8-hex>_<unix-ts>_<2-hex>
 *
 * Es opaco para el usuario final pero verificable internamente.
 *
 * El "beacon" (registro) es 4.D: cada generación de canary se loguea
 * vía console.log estructurado a Vercel runtime logs, lo que da
 * trazabilidad básica sin necesidad de BBDD. Para v2 se puede mover a
 * Supabase o similar para queries más cómodas.
 */

import { createHash, randomBytes } from 'crypto'

export interface CanaryToken {
  /** Token corto humano-legible (~25 chars), seguro para embeber en metadata */
  token: string
  /** Timestamp UTC ISO del canary */
  ts: string
}

export function generateCanaryToken(prefix = 'psz'): CanaryToken {
  const ts = new Date().toISOString()
  const random = randomBytes(8).toString('hex') // 16 chars hex
  const unix = Math.floor(Date.now() / 1000).toString(36) // timestamp compact
  const tail = createHash('sha256').update(`${prefix}|${random}|${unix}`).digest('hex').slice(0, 4)
  return {
    token: `${prefix}_${random}_${unix}_${tail}`,
    ts,
  }
}

/**
 * Beacon: registra la generación de un canary token. En producción va
 * a Vercel runtime logs (consultable desde el dashboard de Vercel).
 *
 * Estructura intencionalmente plana para facilitar queries con grep o
 * filtros del dashboard.
 */
export function logCanaryBeacon(
  context: 'pdf-rentabilidad' | 'pdf-capacidad' | 'pdf-otros',
  token: CanaryToken,
  request?: {
    ip?: string | null
    userAgent?: string | null
    referer?: string | null
  },
): void {
  // Estructura plana JSON para grep desde Vercel logs:
  //   "psz_canary_beacon" → busca en logs todas las descargas
  console.log(
    JSON.stringify({
      psz_canary_beacon: true,
      context,
      token: token.token,
      ts: token.ts,
      ip: request?.ip ?? null,
      ua: request?.userAgent ?? null,
      ref: request?.referer ?? null,
    }),
  )
}
