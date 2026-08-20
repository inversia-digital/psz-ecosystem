/**
 * Alta en el boletín (server-to-server, 100% oculto).
 *
 * El formulario del pie hace fetch a /api/newsletter (mismo origen). Aquí
 * firmamos el cuerpo con HMAC-SHA256 (el mismo CAPTA_SECRET del puente de
 * leads) y lo reenviamos al CRM, que guarda el alta y avisa a info@psz.es.
 * El navegador del visitante nunca contacta con el CRM.
 */
import { NextRequest, NextResponse } from 'next/server'
import crypto from 'node:crypto'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const CRM_URL = 'https://crm.psz.es/capta/newsletter'
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

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

  // Honeypot: los bots rellenan el campo oculto; a ellos se les dice "ok" y
  // no se guarda nada — protestar les enseña a esquivarlo.
  if (typeof d.web === 'string' && d.web !== '') {
    return NextResponse.json({ ok: true })
  }

  const email = String(d.email ?? '').trim().toLowerCase()
  if (!EMAIL_RE.test(email) || email.length > 160) {
    return NextResponse.json({ ok: false, error: 'email' }, { status: 422 })
  }
  if (!d.acepto) {
    return NextResponse.json({ ok: false, error: 'consentimiento' }, { status: 422 })
  }

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? null
  const body = JSON.stringify({
    email,
    acepto: true,
    origen: typeof d.origen === 'string' && d.origen ? d.origen.slice(0, 60) : 'psz.es',
    consent_texto:
      'Acepto recibir el boletín de Toño Palacios y la política de privacidad de psz.es',
    ip,
  })
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
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ ok: false, error: 'network' }, { status: 502 })
  }
}
