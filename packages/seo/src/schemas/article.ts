import type { Article, WithContext } from 'schema-dts'
import { INVERSIA, SITE_URLS, TONO } from '../profile'

export interface ArticleSchemaInput {
  headline: string
  description: string
  url: string
  image?: string
  datePublished: string
  dateModified?: string
}

/**
 * Schema Article para entradas del blog.
 * Incluye author (Person Toño) y publisher (Organization Inversia)
 * para reforzar E-E-A-T en Google y AI Overviews.
 */
export function articleSchema(input: ArticleSchemaInput): WithContext<Article> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: input.headline,
    description: input.description,
    image: input.image ?? TONO.image,
    author: {
      '@type': 'Person',
      name: TONO.fullName,
      url: `${SITE_URLS.psz}/sobre-mi`,
    },
    publisher: {
      '@type': 'Organization',
      name: INVERSIA.displayName,
      url: SITE_URLS.psz,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URLS.psz}/images/logo.png`,
      },
    },
    datePublished: input.datePublished,
    dateModified: input.dateModified ?? input.datePublished,
    mainEntityOfPage: input.url,
  }
}
