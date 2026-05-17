import type { MetadataRoute } from 'next'
import { SITE_URLS } from '@psz/seo'

/**
 * robots.txt dinámico de psz.es.
 *
 * Política:
 * - Permitido SEO normal (Googlebot, Bingbot, etc.) y retrieval para AI
 *   Overviews / ChatGPT / Perplexity (queremos aparecer en respuestas IA).
 * - Bloqueado scraping masivo para training de datasets (GPTBot, CCBot,
 *   Google-Extended, Amazonbot, Bytespider, anthropic-ai, etc.).
 * - Disallow rutas privadas (api, admin, recursos privados).
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Regla general: todos los bots permitidos en contenido público, pero
      // bloqueados de /api y rutas administrativas.
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/', '/_next/', '/preview/'],
      },

      // Bots de TRAINING (los bloqueamos — usan el contenido para entrenar
      // modelos sin compensación al autor)
      { userAgent: 'GPTBot', disallow: '/' },
      { userAgent: 'CCBot', disallow: '/' },
      { userAgent: 'Google-Extended', disallow: '/' },
      { userAgent: 'anthropic-ai', disallow: '/' },
      { userAgent: 'Bytespider', disallow: '/' },
      { userAgent: 'Amazonbot', disallow: '/' },
      { userAgent: 'Applebot-Extended', disallow: '/' },
      { userAgent: 'cohere-ai', disallow: '/' },
      { userAgent: 'FacebookBot', disallow: '/' },
      { userAgent: 'Diffbot', disallow: '/' },
      { userAgent: 'Omgili', disallow: '/' },
      { userAgent: 'ImagesiftBot', disallow: '/' },

      // Bots de RETRIEVAL en tiempo real (les permitimos — son los que
      // sirven respuestas IA cuando un usuario pregunta, queremos aparecer)
      { userAgent: 'ChatGPT-User', allow: '/' },
      { userAgent: 'PerplexityBot', allow: '/' },
      { userAgent: 'ClaudeBot', allow: '/' },
      { userAgent: 'Claude-Web', allow: '/' },
      { userAgent: 'Google-CloudVertexBot', allow: '/' },
    ],
    sitemap: `${SITE_URLS.psz}/sitemap.xml`,
    host: SITE_URLS.psz,
  }
}
