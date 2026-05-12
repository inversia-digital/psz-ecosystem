import { generateLlmsTxt } from '@psz/seo'

/**
 * /llms.txt — endpoint nativo Next.js (App Router) que genera el archivo
 * en server-side a partir del helper centralizado en @psz/seo.
 *
 * Ventaja sobre el .txt estático: si actualizamos datos en
 * packages/seo/src/profile.ts, el llms.txt se regenera automáticamente.
 */
export const dynamic = 'force-static'
export const revalidate = 86400 // 24h

export async function GET() {
  return new Response(generateLlmsTxt(), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  })
}
