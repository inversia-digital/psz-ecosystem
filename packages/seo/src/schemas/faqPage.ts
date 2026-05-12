import type { FAQPage, WithContext } from 'schema-dts'

export interface FAQItem {
  question: string
  answer: string
}

export function faqPageSchema(items: FAQItem[]): WithContext<FAQPage> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }
}
