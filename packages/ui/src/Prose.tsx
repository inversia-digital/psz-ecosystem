import type { HTMLAttributes } from 'react'
import { cn } from './cn'

/**
 * Contenedor de texto largo con estilos legibles.
 * Para artículos, pillars, "Sobre mí", etc.
 * Usa la clase utility `prose-psz` definida en globals.css de cada app.
 */
export function Prose({ className, children, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('prose-psz mx-auto max-w-prose', className)} {...rest}>
      {children}
    </div>
  )
}
