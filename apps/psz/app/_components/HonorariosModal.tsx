'use client'

/**
 * Modal "¿Por qué estos honorarios?".
 *
 * Trigger: cualquier elemento que envuelva al componente <HonorariosModal>.
 * Por defecto renderiza un botón link "¿Por qué estos honorarios?" pero si
 * se le pasa `children`, usa ese contenido como trigger (para envolver un
 * número de honorarios, por ejemplo).
 *
 * Contenido: lista exhaustiva de 13 grupos del trabajo que el broker hace
 * (ver honorariosLista.ts). Scrollable.
 *
 * UX:
 *  - Open: click trigger
 *  - Close: X · ESC · click fuera (backdrop)
 *  - body scroll lock cuando está abierto
 *  - Focus en el primer elemento al abrir (a11y básico)
 */

import { ReactNode, useCallback, useEffect, useState } from 'react'
import { TONO } from '@psz/seo'
import { HONORARIOS_GRUPOS } from './honorariosLista'

interface Props {
  children?: ReactNode
  /** Texto del botón cuando no se pasan children. */
  triggerLabel?: string
  /** Si true, el trigger se renderiza como link inline (subrayado). Si no, como botón. */
  inline?: boolean
}

export default function HonorariosModal({
  children,
  triggerLabel = '¿Por qué estos honorarios?',
  inline = false,
}: Props) {
  const [open, setOpen] = useState(false)

  const close = useCallback(() => setOpen(false), [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, close])

  const triggerClass = children
    ? 'cursor-pointer no-underline'
    : inline
      ? 'underline underline-offset-2 decoration-dotted text-navy-700 hover:text-navy-900 cursor-pointer bg-transparent border-0 p-0 font-medium'
      : 'inline-flex items-center gap-2 bg-navy-800 hover:bg-navy-700 text-paper text-sm font-semibold px-4 py-2 rounded-lg border border-navy-600 transition-colors'

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={triggerClass}
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        {children ?? (
          <>
            <span>{triggerLabel}</span>
            {!inline && <span aria-hidden>→</span>}
          </>
        )}
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="honorarios-modal-title"
          className="fixed inset-0 z-[60] flex items-end md:items-center justify-center p-0 md:p-6"
        >
          {/* Backdrop */}
          <button
            type="button"
            aria-label="Cerrar"
            onClick={close}
            className="absolute inset-0 bg-navy-950/75 backdrop-blur-sm"
          />

          {/* Card */}
          <div className="relative bg-paper rounded-t-2xl md:rounded-2xl shadow-hover w-full max-w-3xl max-h-[90vh] flex flex-col">
            {/* Header sticky */}
            <header className="flex items-start justify-between gap-4 px-6 md:px-8 py-5 border-b border-navy-100">
              <div>
                <p className="text-xs uppercase tracking-wider text-gold-600 font-semibold mb-1">
                  Justificación de honorarios
                </p>
                <h2
                  id="honorarios-modal-title"
                  className="text-2xl md:text-3xl font-bold text-navy-800 leading-tight"
                >
                  ¿Por qué estos honorarios?
                </h2>
                <p className="text-sm text-ink-soft mt-2 max-w-prose">
                  Todo lo que hago de principio a fin para que tu hipoteca sea la mejor
                  posible — y para asumirlo con responsabilidad regulada. Por orden,
                  paso a paso.
                </p>
              </div>
              <button
                type="button"
                onClick={close}
                aria-label="Cerrar"
                className="text-ink-muted hover:text-navy-800 text-2xl leading-none p-1 -m-1 shrink-0"
              >
                ✕
              </button>
            </header>

            {/* Contenido scrollable */}
            <div className="overflow-y-auto px-6 md:px-8 py-6 grow">
              <ol className="space-y-8">
                {HONORARIOS_GRUPOS.map((g) => (
                  <li key={g.title}>
                    <h3 className="text-lg font-bold text-navy-800 mb-1">{g.title}</h3>
                    {g.subtitle && (
                      <p className="text-sm text-ink-soft italic mb-3">{g.subtitle}</p>
                    )}
                    <ul className="space-y-2">
                      {g.items.map((it, i) => (
                        <li
                          key={i}
                          className="flex gap-3 text-sm text-ink-soft leading-relaxed"
                        >
                          <span
                            aria-hidden
                            className="shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-gold-400"
                          />
                          <span>{it}</span>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ol>

              {/* Cierre del modal */}
              <div className="mt-10 pt-6 border-t border-navy-100">
                <p className="text-sm text-ink-soft leading-relaxed">
                  Esta lista no es promocional: es el trabajo real que ejecuto en cada operación,
                  documentado y trazable. Mis honorarios públicos están en{' '}
                  <a href="/tarifas-y-comisiones" className="underline underline-offset-2 text-navy-700 hover:text-navy-900">
                    /tarifas-y-comisiones
                  </a>{' '}
                  y se firman por escrito antes de empezar. Mi número de registro en
                  Banco de España es{' '}
                  <a
                    href={TONO.credentials.bdeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-2 text-navy-700 hover:text-navy-900"
                  >
                    {TONO.credentials.bdeId}
                  </a>
                  , verificable por ti en cualquier momento. También puedes verificarme
                  como asociado{' '}
                  <a
                    href={TONO.credentials.aniciVerifierUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-2 text-navy-700 hover:text-navy-900"
                  >
                    en el verificador público de ANICI
                  </a>
                  .
                </p>
              </div>
            </div>

            {/* Footer */}
            <footer className="px-6 md:px-8 py-4 border-t border-navy-100 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3 bg-paper-soft">
              <button
                type="button"
                onClick={close}
                className="text-sm text-ink-muted hover:text-navy-800 underline underline-offset-2"
              >
                Cerrar
              </button>
              <a
                href="/contacto"
                onClick={close}
                className="inline-flex justify-center items-center bg-gold-400 hover:bg-gold-300 text-navy-900 font-bold text-sm px-5 py-2.5 rounded-lg no-underline transition-colors"
              >
                Hablar con Toño sobre mi caso →
              </a>
            </footer>
          </div>
        </div>
      )}
    </>
  )
}
