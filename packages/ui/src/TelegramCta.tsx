import { cn } from './cn'

/** Enlace de invitación trackeado del canal (origen BLOG psz.es). */
export const TELEGRAM_BLOG_URL = 'https://t.me/+THW_yKW_kbE3M2Yy'

type TelegramCtaProps = {
  /** Enlace de invitación; por defecto el trackeado del blog. */
  href?: string
  className?: string
}

/**
 * Banda de captación al canal de Telegram PSZ 360.
 * Pensada para el final de los artículos del blog: promete lo que de verdad
 * diferencia al canal (las 3 rentabilidades netas), no "chollos".
 */
export function TelegramCta({ href = TELEGRAM_BLOG_URL, className }: TelegramCtaProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'group flex flex-col sm:flex-row sm:items-center gap-4 rounded-2xl',
        'border-2 border-gold-400/40 bg-navy-900 p-6 no-underline',
        'transition-colors hover:border-gold-400',
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gold-400 text-2xl"
      >
        📲
      </span>
      <span className="flex-1">
        <span className="block text-lg font-bold text-paper">
          Las oportunidades, antes que nadie
        </span>
        <span className="mt-1 block text-sm leading-relaxed text-paper/75">
          En mi canal de Telegram publico cada operación con sus{' '}
          <strong className="text-gold-300">3 rentabilidades netas</strong> (pesimista · realista ·
          optimista), la financiación y la reforma. Sin humo.
        </span>
      </span>
      <span className="shrink-0 rounded-lg bg-gold-400 px-5 py-2.5 text-sm font-bold text-navy-900 transition-transform group-hover:translate-x-0.5">
        Unirme al canal →
      </span>
    </a>
  )
}
