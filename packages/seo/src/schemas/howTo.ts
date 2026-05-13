/**
 * HowTo schema — receta paso a paso citable por AI Overviews y AI engines.
 *
 * Especialmente potente para queries "cómo + verbo" (cómo verificar un
 * broker, cómo solicitar una hipoteca, etc.). Google muestra estos pasos
 * directamente en el SERP.
 *
 * Spec: https://schema.org/HowTo
 */

export interface HowToStep {
  name: string
  text: string
  url?: string
  image?: string
}

export interface HowToInput {
  name: string
  description: string
  url: string
  totalTime?: string // ISO 8601 duration (e.g. "PT2M" = 2 minutos)
  estimatedCost?: { currency: string; value: number }
  steps: HowToStep[]
}

export function howToSchema(input: HowToInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: input.name,
    description: input.description,
    url: input.url,
    ...(input.totalTime ? { totalTime: input.totalTime } : {}),
    ...(input.estimatedCost
      ? {
          estimatedCost: {
            '@type': 'MonetaryAmount',
            currency: input.estimatedCost.currency,
            value: input.estimatedCost.value,
          },
        }
      : { estimatedCost: { '@type': 'MonetaryAmount', currency: 'EUR', value: 0 } }),
    step: input.steps.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.name,
      text: s.text,
      ...(s.url ? { url: s.url } : {}),
      ...(s.image ? { image: s.image } : {}),
    })),
  }
}
