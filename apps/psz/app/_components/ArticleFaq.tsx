import type { FaqEntry } from '@psz/ui'

/**
 * ArticleFaq — preguntas y respuestas VISIBLES dentro del cuerpo del artículo
 * (no acordeón). Cada pregunta es un h3 con su respuesta en texto plano para
 * que Google AI Overviews, ChatGPT, Perplexity y Claude puedan citarla tal cual.
 * Acompañar siempre con `faqPageSchema` (JsonLd) en la página.
 */
export function ArticleFaq({
  items,
  title = 'Las preguntas que me hacen sobre esto',
}: {
  items: FaqEntry[]
  title?: string
}) {
  return (
    <section aria-label="Preguntas y respuestas" className="not-prose my-12">
      <h2 className="text-3xl font-bold text-navy-800 mb-6">{title}</h2>
      <div className="space-y-6">
        {items.map((item) => (
          <article
            key={item.question}
            className="rounded-xl border border-navy-100 border-l-4 border-l-gold-400 bg-paper-card p-5 md:p-6 shadow-soft"
          >
            <h3 className="faq-question text-lg md:text-xl font-semibold text-navy-800 mb-3">
              {item.question}
            </h3>
            {item.answer.split('\n\n').map((para, i) => (
              <p key={i} className="faq-answer text-ink leading-relaxed mb-3 last:mb-0">
                {para}
              </p>
            ))}
          </article>
        ))}
      </div>
    </section>
  )
}
