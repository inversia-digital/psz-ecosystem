import type { ReactNode } from 'react'
import { cn } from './cn'

interface CredentialBadgeProps {
  label: string
  value: string
  href?: string
  hint?: string
  icon?: ReactNode
  className?: string
}

/**
 * Etiqueta de credencial verificable.
 * Usar para mostrar "Registro BdE E242" o "Asociado ANICI-001" con enlace a verificación.
 */
export function CredentialBadge({
  label,
  value,
  href,
  hint,
  icon,
  className,
}: CredentialBadgeProps) {
  const content = (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-md border border-navy-200 bg-paper-card px-3 py-1.5 text-sm shadow-soft',
        href && 'transition-colors hover:border-gold-400 hover:shadow-card',
        className,
      )}
    >
      {icon}
      <span className="text-ink-muted">{label}</span>
      <span className="font-semibold text-ink">{value}</span>
      {hint && <span className="text-xs text-ink-muted">· {hint}</span>}
    </span>
  )

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="no-underline">
        {content}
      </a>
    )
  }
  return content
}
