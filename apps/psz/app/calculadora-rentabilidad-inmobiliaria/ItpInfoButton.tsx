'use client'

/**
 * Botón "i" que abre un popover con la tabla ITP por CCAA.
 * Posicionado inline al lado de la label del slider ITP.
 *
 * Comportamiento:
 *  - Click "i" → muestra/oculta popover
 *  - ESC cierra
 *  - Click fuera cierra
 *  - Popover scrollable si la tabla es larga
 */

import { useEffect, useRef, useState } from 'react'
import { ITP_TABLE, ITP_LAST_REVIEW, ITP_NEXT_REVIEW } from './itpData'

export default function ItpInfoButton() {
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
        aria-label="Ver tabla de tipos ITP por comunidad autónoma"
        aria-expanded={open}
        onClick={() => setOpen((p) => !p)}
        className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-navy-100 hover:bg-navy-200 text-navy-700 hover:text-navy-900 text-xs font-bold transition-colors"
      >
        i
      </button>

      {open && (
        <div
          role="dialog"
          aria-label="Tipos ITP por comunidad autónoma"
          className="absolute left-0 top-7 z-30 w-[min(94vw,760px)] bg-paper-card border border-navy-200 rounded-xl shadow-hover p-5 text-sm"
        >
          <div className="flex justify-between items-start gap-3 mb-3">
            <div>
              <p className="text-xs uppercase tracking-wider text-gold-600 font-semibold">
                Datos orientativos
              </p>
              <p className="font-bold text-navy-800 text-base">
                ITP por Comunidad Autónoma
              </p>
              <p className="text-xs text-ink-muted mt-0.5">
                Última revisión: {ITP_LAST_REVIEW} · Próxima revisión: {ITP_NEXT_REVIEW}
              </p>
            </div>
            <button
              type="button"
              aria-label="Cerrar"
              onClick={() => setOpen(false)}
              className="text-ink-muted hover:text-navy-800 text-lg leading-none p-0.5"
            >
              ✕
            </button>
          </div>

          <div className="max-h-[60vh] overflow-y-auto pr-1 -mr-1">
            <table className="w-full text-left" style={{ tableLayout: 'fixed' }}>
              <colgroup>
                <col style={{ width: '22%' }} />
                <col style={{ width: '12%' }} />
                <col style={{ width: '66%' }} />
              </colgroup>
              <thead className="sticky top-0 bg-paper-card border-b border-navy-100">
                <tr>
                  <th className="py-2 pr-2 text-xs uppercase tracking-wider text-ink-muted font-semibold">
                    Comunidad
                  </th>
                  <th className="py-2 px-2 text-xs uppercase tracking-wider text-ink-muted font-semibold text-right">
                    Tipo
                  </th>
                  <th className="py-2 pl-2 text-xs uppercase tracking-wider text-ink-muted font-semibold">
                    Notas
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy-100">
                {ITP_TABLE.map((c) => (
                  <tr key={c.code} className="hover:bg-paper-soft">
                    <td className="py-2 pr-2 font-medium text-navy-800 align-top leading-snug">
                      {c.name}
                    </td>
                    <td className="py-2 px-2 text-right align-top">
                      <span className="font-bold text-navy-800 text-[11px] leading-snug">
                        {c.range ?? `${c.rate}%`}
                      </span>
                    </td>
                    <td className="py-2 pl-2 text-xs text-ink-soft align-top leading-snug">
                      {c.notes ?? '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-[11px] text-ink-muted leading-relaxed mt-4 pt-3 border-t border-navy-100">
            Datos orientativos del Impuesto sobre Transmisiones Patrimoniales (ITP) según
            legislación vigente al cierre de la última revisión. El tipo aplicable a tu operación
            concreta depende del valor de referencia catastral, tramos, bonificaciones
            (vivienda habitual, edad, familia numerosa, zonas rurales, etc.) y normativa
            autonómica vigente en la fecha de la compraventa. Verifica con la Hacienda
            Autonómica correspondiente o con un asesor fiscal antes de cerrar la operación.
          </p>
        </div>
      )}
    </span>
  )
}
