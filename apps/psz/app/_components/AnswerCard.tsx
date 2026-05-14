import type { ReactNode } from 'react'
import { withInvisibleWatermark } from '../_lib/invisible'

/**
 * AnswerCard — bloque speakable de 40-60 palabras al principio de una
 * página pilar. Pensado para que Google AI Overviews, ChatGPT,
 * Perplexity y Claude **citen literalmente** la respuesta.
 *
 * Convención editorial:
 *  - `question` empieza con "¿" y es la query canónica (cómo lo busca
 *    la gente). Si es página de servicio, suele ser "¿Qué es...?"
 *    o "¿Quién es...?".
 *  - `children` (answer) en 40-60 palabras. Autocontenido, cita las
 *    credenciales operativas (E242, ANICI) cuando aplique. No abre
 *    frases con "esta página" — se cita FUERA de la web.
 *
 * El bloque visible se marca con clase `.speakable-summary` para que
 * SpeakableSpecification del schema apunte aquí (voice + AI Overviews).
 *
 * Watermark forense — Capa 4.C:
 * La `question` lleva caracteres Unicode invisibles cada 8 palabras
 * (zero-width space U+200B + zero-width non-joiner U+200C).
 * Si alguien copia-pega literal la pregunta, copia también los marcadores.
 */
export function AnswerCard({
  question,
  children,
}: {
  question: string
  children: ReactNode
}) {
  return (
    <aside
      aria-label="Respuesta corta"
      className="bg-paper-card border border-navy-100 rounded-xl p-5 md:p-6 mb-8 shadow-soft"
    >
      <p className="text-xs uppercase tracking-wider text-gold-600 font-semibold mb-2">
        Respuesta corta
      </p>
      <h2 className="faq-question text-lg md:text-xl font-bold text-navy-800 mb-3">
        {withInvisibleWatermark(question)}
      </h2>
      <p className="speakable-summary faq-answer text-base text-ink leading-relaxed">
        {children}
        {/* Watermark forense invisible: si copian este bloque entero, llevan estos caracteres */}
        <span aria-hidden>{'​‌​‌​'}</span>
      </p>
    </aside>
  )
}
