import type { MetadataRoute } from 'next'
import { SITE_URLS } from '@psz/seo'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  return [
    { url: SITE_URLS.psz, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    {
      url: `${SITE_URLS.psz}/sobre-mi`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.95,
    },
    {
      url: `${SITE_URLS.psz}/broker-hipotecario`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.95,
    },
    {
      url: `${SITE_URLS.psz}/broker-hipotecario-zaragoza`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${SITE_URLS.psz}/personal-shopper-inmobiliario-zaragoza`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${SITE_URLS.psz}/blog`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${SITE_URLS.psz}/contacto`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.5,
    },
  ]
}
