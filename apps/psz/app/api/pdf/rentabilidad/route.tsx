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

  const buffer = await renderToBuffer(
    <RoiPdfDocument result={body.result} fechaIso={new Date().toISOString()} />,
  )

  const fileName = `analisis-rentabilidad-psz-${new Date().toISOString().slice(0, 10)}.pdf`

  return new NextResponse(buffer as unknown as BodyInit, {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${fileName}"`,
      'Cache-Control': 'no-store',
    },
  })
}
