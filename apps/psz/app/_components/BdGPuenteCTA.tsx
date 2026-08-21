import { Button, Container } from '@psz/ui'

const BDG_DIAGNOSTICO_URL = 'https://brokerdeguardia.es/diagnostico/'

type Props = { href?: string }

/**
 * Puente hacia Broker de Guardia (brokerdeguardia.es), el servicio de
 * preparación previa: para el visitante al que la calculadora le dice que
 * TODAVÍA no llega. Es el reparto de dominios del grupo (plan SEO 21-ago-2026):
 * psz.es atiende al que ya puede; Broker de Guardia prepara al que aún no.
 *
 * Banner discreto al pie de las calculadoras, mismo patrón que
 * CanalTelegramBanner para no competir con el CTA principal de cada página.
 */
export function BdGPuenteBanner({ href = BDG_DIAGNOSTICO_URL }: Props) {
  return (
    <Container size="lg" className="my-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-center gap-4 rounded-xl border border-gold-400 bg-paper-card px-6 py-4 shadow-soft text-center sm:text-left">
        <p className="text-sm text-navy-800 leading-relaxed">
          <span aria-hidden>🛟</span> <strong>¿Los números dicen que todavía no?</strong> Para eso
          está Broker de Guardia: un año de preparación con fecha objetivo, y un diagnóstico
          gratuito de dos minutos para saber dónde estás.
        </p>
        <Button
          href={href}
          variant="gold"
          size="sm"
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0"
        >
          Hacer el diagnóstico
        </Button>
      </div>
    </Container>
  )
}
