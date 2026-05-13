/**
 * SpeakableSpecification schema — para queries por voz (Google Assistant,
 * AI Overviews que se leen en voz alta) y motores de respuesta IA.
 *
 * Indica qué partes del DOM deben leerse como respuesta. Schema.org
 * recomienda usar CSS selectors o XPath para identificar bloques speakable.
 *
 * Lo aplicamos a WebPages clave: home, /sobre-mi, /broker-hipotecario.
 *
 * Spec: https://schema.org/SpeakableSpecification
 * Google docs: https://developers.google.com/search/docs/appearance/structured-data/speakable
 */

export interface SpeakablePageProps {
  url: string
  name: string
  description: string
  /** CSS selectors o XPath del DOM speakable. Por defecto: lead/intro */
  cssSelectors?: string[]
}

export function speakableWebPageSchema({
  url,
  name,
  description,
  cssSelectors = ['.speakable-summary', 'h1', '.lead'],
}: SpeakablePageProps) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name,
    description,
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: cssSelectors,
    },
    inLanguage: 'es-ES',
  }
}
