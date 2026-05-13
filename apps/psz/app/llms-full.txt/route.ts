import { generateLlmsFullTxt } from '@psz/seo'

/**
 * /llms-full.txt — versión exhaustiva del llms.txt corto.
 *
 * Convención emergente https://llmstxt.org/ — los motores IA que ingieren
 * contenido extendido (Perplexity en modo deep, Claude crawling, etc.)
 * leen primero `/llms.txt` (índice + Q&As cortas) y, si necesitan más
 * contexto, descargan `/llms-full.txt` (~6-10k palabras).
 *
 * Ventaja: contenido plano sin HTML, sin JavaScript, fácil de tokenizar
 * y de citar literal por la IA.
 */
export const dynamic = 'force-static'
export const revalidate = 86400 // 24h

export async function GET() {
  return new Response(generateLlmsFullTxt(), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  })
}
