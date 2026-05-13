'use client'

/**
 * Botón "i" reutilizable para tooltips cortos en la calculadora.
 * Para tooltips largos con tabla, usar ItpInfoButton.
 *
 * Click → muestra popover. ESC / click fuera cierra.
 */

import { useEffect, useRef, useState, type ReactNode } from 'react'

export default function InfoTooltip({
  title,
  children,
  ariaLabel,
}: {
  title?: string
  children: ReactNode
  ariaLabel?: string
}) {
  const [open, setOpen] = useState(false)
  const wrapRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    const onClick = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('mousedown', onClick)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('mousedown', onClick)
    }
  }, [open])

  return (
    <span ref={wrapRef} className="relative inline-flex">
      <button
        type="button"
        aria-label={ariaLabel ?? 'Más información'}
        aria-expanded={open}
        onClick={() => setOpen((p) => !p)}
        className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-navy-100 hover:bg-navy-200 text-navy-700 hover:text-navy-900 text-xs font-bold transition-colors"
      >
        i
      </button>

      {open && (
        <span
          role="tooltip"
          className="absolute left-0 top-7 z-20 w-[min(85vw,360px)] bg-paper-card border border-navy-200 rounded-lg shadow-card p-4 text-sm leading-relaxed text-ink"
        >
          {title && <span className="block font-semibold text-navy-800 mb-1.5">{title}</span>}
          <span className="block text-ink-soft">{children}</span>
        </span>
      )}
    </span>
  )
}
