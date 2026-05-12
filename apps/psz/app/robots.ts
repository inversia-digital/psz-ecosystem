import type { MetadataRoute } from 'next'
import { SITE_URLS } from '@psz/seo'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
    ],
    sitemap: `${SITE_URLS.psz}/sitemap.xml`,
    host: SITE_URLS.psz,
  }
}
