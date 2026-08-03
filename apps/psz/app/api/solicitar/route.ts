/**
 * Reenvío de lead al CRM (server-to-server, 100% oculto).
 *
 * El funnel de /solicitar-hipoteca hace fetch a /api/solicitar (mismo origen).
 * Aquí firmamos el cuerpo con HMAC-SHA256 (secreto compartido CAPTA_SECRET) y
 * lo reenviamos al endpoint de ingestión del CRM. El navegador del visitante
 * NUNCA contacta con el CRM ni ve su dirección.
 *
 * Requiere la variable de entorno CAPTA_SECRET (configurada en Vercel).
 */
import { NextRequest, NextResponse } from 'next/server'
import crypto from 'node:crypto'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const CRM_URL = 'https://crm.psz.es/capta/ingest'
const FUENTE = 'WEBPSZ'

export async function POST(req: NextRequest) {
  const secret = process.env.CAPTA_SECRET
  if (!secret) {
    return NextResponse.json({ ok: false, error: 'config' }, { status: 500 })
  }

  let d: Record<string, unknown>
  try {
    d = await req.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'json' }, { status: 400 })
  }

  const str = (k: string) => {
    const v = d[k]
    return v === undefined || v === null || v === '' ? null : String(v).trim()
  }
  const num = (k: string) => {
    const v = d[k]
    if (v === undefined || v === null || v === '') return null
    const n = Number(v)
    return Number.isFinite(n) ? n : null
  }
  const bool = (k: string) => Boolean(d[k])

  if (!str('nombre') || !str('email') || !str('telefono') || !bool('acepto')) {
    return NextResponse.json({ ok: false, error: 'faltan datos obligatorios' }, { status: 422 })
  }

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? null

  const payload = {
    fuente_codigo: FUENTE,
    nombre: str('nombre'),
    email: str('email'),
    telefono: str('telefono'),
    acepto: true,
    tipo_operacion: str('tipo_operacion'),
    ubicacion: str('ubicacion'),
    precio: num('precio'),
    financiacion: num('financiacion'),
    situacion_laboral: str('situacion_laboral'),
    ingresos: num('ingresos'),
    deudas: num('deudas'),
    ahorros: num('ahorros'),
    edad: num('edad'),
    bancos: str('bancos'),
    no_residente: bool('no_residente'),
    vivienda_libre: bool('vivienda_libre'),
    pignorables: bool('pignorables'),
    mensaje: str('mensaje'),
    origen: str('origen'),
    ip,
  }

  const body = JSON.stringify(payload)
  const sig = crypto.createHmac('sha256', secret).update(body, 'utf8').digest('hex')

  try {
    const r = await fetch(CRM_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Capta-Signature': sig },
      body,
      cache: 'no-store',
    })
    if (!r.ok) {
      return NextResponse.json({ ok: false, error: 'upstream' }, { status: 502 })
    }
    const j = (await r.json().catch(() => ({}))) as { ref?: string }
    return NextResponse.json({ ok: true, ref: j?.ref ?? null })
  } catch {
    return NextResponse.json({ ok: false, error: 'network' }, { status: 502 })
  }
}
