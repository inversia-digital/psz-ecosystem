import type { MetadataRoute } from 'next'
import { SITE_URLS } from '@psz/seo'

/**
 * robots.txt dinámico de psz.es.
 *
 * Política: permitimos el acceso de los rastreadores de IA — tanto de retrieval en
 * tiempo real (ChatGPT, Claude, Perplexity, Gemini/AI Overviews) como de indexación —
 * porque el objetivo es la MÁXIMA visibilidad en respuestas generativas. Solo se
 * protegen las rutas privadas (api, admin, internos).
 *
 * IMPORTANTE: Cloudflare puede inyectar un bloque "Managed content / Content Signals"
 * que vuelve a bloquear bots de IA (ClaudeBot, GPTBot, Google-Extended…) por delante de
 * este robots. Si psz.es sigue apareciendo como bloqueada para IA, desactivar en el panel
 * de Cloudflare (zona psz.es) el bloqueo de bots de IA / robots.txt gestionado.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/', '/_next/', '/preview/'],
      },
    ],
    sitemap: `${SITE_URLS.psz}/sitemap.xml`,
    host: SITE_URLS.psz,
  }
}
