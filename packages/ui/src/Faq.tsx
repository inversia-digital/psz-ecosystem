import { cn } from './cn'

export interface FaqEntry {
  question: string
  answer: string
}

interface FaqProps {
  items: FaqEntry[]
  className?: string
}

/**
 * Bloque FAQ con elementos <details>/<summary> nativos.
 * Accesible, sin JS, accordion automático.
 * Acompañar con FAQPage schema (ver `faqPageSchema` en @psz/seo).
 */
export function Faq({ items, className }: FaqProps) {
  return (
    <div className={cn('space-y-3', className)}>
      {items.map((item, i) => (
        <details
          key={i}
          className="group rounded-lg border border-navy-100 bg-paper-card p-5 shadow-soft transition-shadow hover:shadow-card open:shadow-card"
        >
          <summary className="cursor-pointer list-none font-semibold text-ink flex items-start justify-between gap-4">
            <span>{item.question}</span>
            <span
              aria-hidden
              className="text-gold-500 text-2xl leading-none transition-transform group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <div className="mt-4 text-ink-soft leading-relaxed prose-psz">
            {item.answer.split('\n\n').map((para, j) => (
              <p key={j} className="mb-3 last:mb-0">
                {para}
              </p>
            ))}
          </div>
        </details>
      ))}
    </div>
  )
}
