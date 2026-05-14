/**
 * POST /api/pdf/rentabilidad
 *
 * Recibe el resultado de la calculadora de rentabilidad (validado en cliente)
 * y devuelve un PDF binario con todo el análisis + branding propio.
 *
 * Ejecuta en runtime Node.js (no edge) porque @react-pdf/renderer necesita
 * APIs de Node para componer el PDF.
 */

import { renderToBuffer } from '@react-pdf/renderer'
import { NextRequest, NextResponse } from 'next/server'
import { RoiPdfDocument } from '@/app/calculadora-rentabilidad-inmobiliaria/pdf/RoiPdfDocument'
import type { RoiResult } from '@/app/calculadora-rentabilidad-inmobiliaria/actions'
import { generateCanaryToken, logCanaryBeacon } from '@/app/_lib/canary'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

interface Body {
  result: RoiResult
}

export async function POST(req: NextRequest) {
  let body: Body
  try {
    body = (await req.json()) as Body
  } catch {
    return NextResponse.json({ error: 'JSON inválido' }, { status: 400 })
  }

  if (!body?.result || !Array.isArray(body.result.escenarios)) {
    return NextResponse.json({ error: 'Faltan datos del análisis' }, { status: 400 })
  }

  // ─────────────────────────────────────────────────────────────────
  // Capa 4.A — Canary token forense
  // Cada PDF descargado lleva un identificador único embebido en
  // metadata. Capa 4.D — Beacon: registramos en Vercel runtime logs
  // (consultable desde dashboard).
  //
  // Base jurídica: interés legítimo del responsable en la protección
  // de su propiedad intelectual y la prevención del uso indebido
  // (art. 6.1.f RGPD). La IP y user-agent se registran sólo con fines
  // forenses; no se cruzan con datos personales identificativos.
  // Política: /politica-privacidad sección 8.bis.
  // ─────────────────────────────────────────────────────────────────
  const canary = generateCanaryToken('psz-pdf-roi')

  logCanaryBeacon('pdf-rentabilidad', canary, {
    ip:
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
      req.headers.get('x-real-ip') ??
      null,
    userAgent: req.headers.get('user-agent'),
    referer: req.headers.get('referer'),
  })

  const buffer = await renderToBuffer(
    <RoiPdfDocument
      result={body.result}
      fechaIso={new Date().toISOString()}
      canaryToken={canary.token}
    />,
  )

  const fileName = `analisis-rentabilidad-psz-${new Date().toISOString().slice(0, 10)}.pdf`

  return new NextResponse(buffer as unknown as BodyInit, {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${fileName}"`,
      'Cache-Control': 'no-store',
      // Devolver el canary también como header — útil para auditoría
      // y para que el cliente pueda referenciar la descarga concreta
      'X-PSZ-Doc-Id': canary.token,
    },
  })
}
