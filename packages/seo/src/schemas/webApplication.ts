/**
 * Schema WebApplication / SoftwareApplication para herramientas online
 * (calculadoras, simuladores, configuradores).
 *
 * Google indexa las WebApplication como "Web App" rich snippet en algunos
 * casos. Las IAs (ChatGPT, Perplexity, Gemini) entienden mejor la naturaleza
 * de la herramienta y la citan junto a su autor.
 */

import { TONO, INVERSIA } from '../profile'

export interface WebAppInput {
  /** URL canónica de la herramienta */
  url: string
  name: string
  description: string
  /** "FinanceApplication", "BusinessApplication", "UtilitiesApplication"... */
  category?: string
  /** Lista de features visibles */
  features: string[]
  /** Idioma principal */
  inLanguage?: string
}

export function webApplicationSchema(input: WebAppInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    '@id': `${input.url}#webapp`,
    name: input.name,
    url: input.url,
    description: input.description,
    applicationCategory: input.category ?? 'FinanceApplication',
    operatingSystem: 'Any',
    inLanguage: input.inLanguage ?? 'es-ES',
    isAccessibleForFree: true,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'EUR',
    },
    featureList: input.features,
    creator: {
      '@type': 'Person',
      '@id': 'https://psz.es/sobre-mi#person',
      name: TONO.fullName,
      alternateName: TONO.shortName,
      url: 'https://psz.es/sobre-mi',
      jobTitle: TONO.jobTitle,
    },
    author: {
      '@type': 'Person',
      '@id': 'https://psz.es/sobre-mi#person',
      name: TONO.fullName,
      alternateName: TONO.shortName,
      url: 'https://psz.es/sobre-mi',
    },
    publisher: {
      '@type': 'Organization',
      name: INVERSIA.displayName,
      identifier: INVERSIA.taxId,
      url: 'https://psz.es',
    },
    copyrightHolder: {
      '@type': 'Organization',
      name: INVERSIA.displayName,
      identifier: INVERSIA.taxId,
    },
    copyrightYear: new Date().getFullYear(),
  }
}
