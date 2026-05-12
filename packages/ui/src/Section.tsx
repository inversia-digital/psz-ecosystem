import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from './cn'

interface SectionProps extends HTMLAttributes<HTMLElement> {
  id?: string
  eyebrow?: string
  title?: string
  lead?: ReactNode
  tone?: 'paper' | 'soft' | 'navy'
  padding?: 'sm' | 'md' | 'lg'
}

const toneMap = {
  paper: 'bg-paper text-ink',
  soft: 'bg-paper-soft text-ink',
  navy: 'bg-navy-900 text-paper',
}

const paddingMap = {
  sm: 'py-12',
  md: 'py-16',
  lg: 'py-24 md:py-28',
}

export function Section({
  id,
  eyebrow,
  title,
  lead,
  tone = 'paper',
  padding = 'md',
  className,
  children,
  ...rest
}: SectionProps) {
  return (
    <section id={id} className={cn(toneMap[tone], paddingMap[padding], className)} {...rest}>
      {(eyebrow || title || lead) && (
        <header className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 mb-10 text-center">
          {eyebrow && (
            <p
              className={cn(
                'text-sm uppercase tracking-wider mb-3',
                tone === 'navy' ? 'text-gold-300' : 'text-ink-muted',
              )}
            >
              {eyebrow}
            </p>
          )}
          {title && (
            <h2
              className={cn(
                'text-3xl md:text-4xl font-bold mb-4',
                tone === 'navy' ? 'text-paper' : 'text-ink',
              )}
            >
              {title}
            </h2>
          )}
          {lead && (
            <div
              className={cn(
                'text-lg',
                tone === 'navy' ? 'text-paper/80' : 'text-ink-soft',
              )}
            >
              {lead}
            </div>
          )}
        </header>
      )}
      {children}
    </section>
  )
}
