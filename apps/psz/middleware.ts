/**
 * Edge middleware de psz.es
 *
 * Dos responsabilidades:
 *
 * 1. **Tracking de visitantes** (RGPD art 6.1.f — interés legítimo en
 *    seguridad y prevención de abuso). Captura metadata server-side
 *    de cada request a páginas públicas y la registra:
 *      - Siempre en stdout estructurado → Vercel Logs (retención 30d)
 *      - Si VISITS_INGEST_URL está configurado, también lo envía
 *        ahí (Supabase / Postgres) para consulta desde /admin/visitas
 *
 * 2. **Protección de /admin** con HTTP Basic Auth. ADMIN_USER y
 *    ADMIN_PASS se setean en Vercel env vars.
 *
 * Edge runtime, sin Node.js APIs. fetch al ingest se hace con
 * waitUntil para no bloquear la respuesta del usuario.
 */

import { NextRequest, NextResponse } from 'next/server'

export const config = {
  matcher: [
    /*
     * Aplicar a TODAS las rutas excepto:
     * - _next/static (estáticos)
     * - _next/image (imágenes optimizadas)
     * - favicon, icon, apple-icon, robots, sitemap, manifest
     * - api/visits/log (evitar bucle infinito de logging)
     */
    '/((?!_next/static|_next/image|favicon|icon|apple-icon|robots\\.txt|sitemap\\.xml|manifest\\.webmanifest|api/visits).*)',
  ],
}

export async function middleware(req: NextRequest) {
  const url = new URL(req.url)
  const path = url.pathname

  // 1. Protección de /admin con Basic Auth
  if (path.startsWith('/admin')) {
    const auth = req.headers.get('authorization')
    const expectedUser = process.env.ADMIN_USER || 'admin'
    const expectedPass = process.env.ADMIN_PASS

    if (!expectedPass) {
      // Si no hay password configurado, bloquear acceso completamente
      return new NextResponse('Admin no configurado', { status: 503 })
    }

    if (!auth || !auth.startsWith('Basic ')) {
      return new NextResponse('Auth required', {
        status: 401,
        headers: { 'WWW-Authenticate': 'Basic realm="PSZ Admin"' },
      })
    }

    try {
      const decoded = atob(auth.slice('Basic '.length))
      const [user, pass] = decoded.split(':')
      if (user !== expectedUser || pass !== expectedPass) {
        return new NextResponse('Credenciales inválidas', {
          status: 401,
          headers: { 'WWW-Authenticate': 'Basic realm="PSZ Admin"' },
        })
      }
    } catch {
      return new NextResponse('Auth malformada', { status: 400 })
    }
    // Si llega aquí, autenticado. Continúa sin loggear (admin no es público).
    return NextResponse.next()
  }

  // 2. Tracking de visitantes — solo rutas no-api
  if (path.startsWith('/api/')) return NextResponse.next()

  const geo = (req as unknown as { geo?: { country?: string; region?: string; city?: string } })
    .geo || {}
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
        || req.headers.get('x-real-ip')
        || 'unknown'

  const visit = {
    ts: new Date().toISOString(),
    method: req.method,
    path,
    query: url.search || null,
    referer: req.headers.get('referer') || null,
    ua: req.headers.get('user-agent') || null,
    ip,
    country: geo.country || null,
    region: geo.region || null,
    city: geo.city || null,
    lang: req.headers.get('accept-language')?.split(',')[0] || null,
    // Cloudflare añade estos cuando esté delante (post-activación)
    cf_ipcountry: req.headers.get('cf-ipcountry') || null,
    cf_asn: req.headers.get('cf-ip-asn') || null,
    cf_threat_score: req.headers.get('cf-threat-score') || null,
    cf_bot_score: req.headers.get('cf-bot-score') || null,
    cf_ja3: req.headers.get('cf-ja3-hash') || null,
    // Vercel
    vercel_region: req.headers.get('x-vercel-deployment-region') || null,
  }

  // 2a. Log estructurado a stdout → Vercel Logs (siempre activo, gratis)
  console.log(JSON.stringify({ type: 'visit', ...visit }))

  // 2b. Si hay endpoint de ingest, mandar la visita ahí (Supabase, etc.)
  const ingestUrl = process.env.VISITS_INGEST_URL
  const ingestSecret = process.env.VISITS_INGEST_SECRET
  if (ingestUrl && ingestSecret) {
    // Fire-and-forget — no bloqueamos la respuesta al usuario
    const ingestPromise = fetch(ingestUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-ingest-secret': ingestSecret,
      },
      body: JSON.stringify(visit),
    }).catch(() => {
      /* fallar silenciosamente — no romper la web */
    })

    // waitUntil garantiza que la fetch termina aunque la respuesta ya se haya servido
    const ev = (req as unknown as { waitUntil?: (p: Promise<unknown>) => void }).waitUntil
    if (typeof ev === 'function') ev(ingestPromise)
  }

  return NextResponse.next()
}
