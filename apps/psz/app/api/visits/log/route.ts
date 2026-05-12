/**
 * Endpoint que recibe la metadata de visita desde el middleware Edge.
 *
 * Persiste en Supabase si SUPABASE_URL y SUPABASE_SERVICE_KEY están
 * configurados; si no, solo acepta el POST y devuelve 204 (no-op).
 *
 * Protección por header x-ingest-secret == VISITS_INGEST_SECRET para
 * evitar que terceros falsifiquen visitas desde fuera.
 *
 * Llamado por: apps/psz/middleware.ts (vía VISITS_INGEST_URL=https://psz.es/api/visits/log)
 */

import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

interface Visit {
  ts: string
  method: string | null
  path: string | null
  query: string | null
  referer: string | null
  ua: string | null
  ip: string | null
  country: string | null
  region: string | null
  city: string | null
  lang: string | null
  cf_ipcountry: string | null
  cf_asn: string | null
  cf_threat_score: string | null
  cf_bot_score: string | null
  cf_ja3: string | null
  vercel_region: string | null
}

export async function POST(req: NextRequest) {
  // 1. Validar shared secret
  const got = req.headers.get('x-ingest-secret')
  const expected = process.env.VISITS_INGEST_SECRET
  if (!expected || got !== expected) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  // 2. Parse body
  let visit: Visit
  try {
    visit = (await req.json()) as Visit
  } catch {
    return new NextResponse('Bad JSON', { status: 400 })
  }

  // 3. Persistencia opcional en Supabase
  const supabaseUrl = process.env.SUPABASE_URL
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY
  if (!supabaseUrl || !supabaseServiceKey) {
    // No persistimos pero ack OK para no romper el middleware
    return new NextResponse(null, { status: 204 })
  }

  try {
    const res = await fetch(`${supabaseUrl}/rest/v1/visitor_logs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: supabaseServiceKey,
        Authorization: `Bearer ${supabaseServiceKey}`,
        Prefer: 'return=minimal',
      },
      body: JSON.stringify(visit),
    })
    if (!res.ok) {
      console.error('visits/log supabase error', res.status, await res.text())
      return new NextResponse('Persist failed', { status: 500 })
    }
  } catch (err) {
    console.error('visits/log fetch error', err)
    return new NextResponse('Persist exception', { status: 500 })
  }

  return new NextResponse(null, { status: 204 })
}
