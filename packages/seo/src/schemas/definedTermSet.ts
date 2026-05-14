/**
 * DefinedTermSet — colección de DefinedTerm. Schema.org reconoce esta
 * estructura como glosario citable. Google la usa para entender el
 * tema/jerga del sitio y AI Overviews puede citar definiciones
 * individuales.
 *
 * Cada DefinedTerm tiene su propio @id basado en su anchor (#ltv,
 * #tae, etc.), así otros schemas pueden referenciarlo:
 *   "termCode" → @id del término definido
 *
 * Spec: https://schema.org/DefinedTermSet
 */

import { SITE_URLS } from '../profile'

export interface DefinedTermInput {
  /** Anchor slug (sin #). Ej: "ltv", "tae", "fein" */
  slug: string
  name: string
  description: string
  /** Categoría temática opcional (ej: "Conceptos financieros") */
  inDefinedTermSet?: string
  /** URL externa autoritativa (BOE, BdE, etc.) si la hay */
  url?: string
}

export interface DefinedTermSetInput {
  /** URL canónica del glosario */
  url: string
  name: string
  description: string
  terms: DefinedTermInput[]
}

export function definedTermSetSchema(input: DefinedTermSetInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'DefinedTermSet',
    '@id': `${input.url}#glosario`,
    name: input.name,
    description: input.description,
    url: input.url,
    inLanguage: 'es-ES',
    publisher: {
      '@type': 'Organization',
      '@id': `${SITE_URLS.psz}/#organization`,
    },
    hasDefinedTerm: input.terms.map((t) => ({
      '@type': 'DefinedTerm',
      '@id': `${input.url}#${t.slug}`,
      name: t.name,
      description: t.description,
      inDefinedTermSet: `${input.url}#glosario`,
      url: t.url ?? `${input.url}#${t.slug}`,
    })),
  }
}
