import { Button, Container, Section } from '@psz/ui'
import { TELEGRAM_INVESTORS_URL_HERRAMIENTAS } from '@psz/seo'

type Props = { href?: string }

/**
 * CTA al canal de Telegram de inversores (@palacios_psz · "PSZ 360 |
 * Inversiones & Financiación"). Usa el enlace rastreable
 * "Web · psz.es Herramientas" para que Telegram atribuya las altas a esta
 * fuente. Bloque destacado — pensado para el hub /herramientas.
 */
export function CanalTelegramCTA({ href = TELEGRAM_INVESTORS_URL_HERRAMIENTAS }: Props) {
  return (
    <Section tone="navy" padding="md">
      <Container size="md" className="text-center">
        <p className="text-gold-300 text-sm uppercase tracking-wider mb-3">Canal de inversores</p>
        <h2 className="text-2xl md:text-3xl font-bold text-paper mb-4">¿Inviertes en inmobiliario?</h2>
        <p className="text-paper/80 text-lg mb-8 max-w-prose mx-auto">
          Recibe oportunidades de inversión inmobiliaria ya analizadas, antes que nadie, en mi canal
          de Telegram. Sin coste y sin compromiso.
        </p>
        <Button href={href} variant="gold" size="lg" target="_blank" rel="noopener noreferrer">
          📣 Únete al canal
        </Button>
      </Container>
    </Section>
  )
}

/**
 * Variante discreta (banner) para el pie de cada calculadora, para no competir
 * con el CTA contextual principal de cada página.
 */
export function CanalTelegramBanner({ href = TELEGRAM_INVESTORS_URL_HERRAMIENTAS }: Props) {
  return (
    <Container size="lg" className="my-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-center gap-4 rounded-xl border border-gold-400 bg-paper-card px-6 py-4 shadow-soft text-center sm:text-left">
        <p className="text-sm text-navy-800 leading-relaxed">
          <span aria-hidden>📣</span> <strong>¿Inviertes en inmobiliario?</strong> Recibe
          oportunidades ya analizadas, antes que nadie, en mi canal de Telegram.
        </p>
        <Button
          href={href}
          variant="gold"
          size="sm"
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0"
        >
          Únete al canal
        </Button>
      </div>
    </Container>
  )
}
