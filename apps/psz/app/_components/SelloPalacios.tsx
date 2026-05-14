/**
 * SelloPalacios — sub-marca paraguas aplicada a todo el trabajo
 * propietario de Toño Palacios (calculadoras, pillars, contenido).
 *
 * Funciona como sello de calidad / firma editorial: "este contenido lleva
 * El Sello Palacios" significa que ha sido diseñado y validado por Toño
 * Palacios personalmente, broker hipotecario nº E242 (Banco de España) y
 * presidente de ANICI.
 *
 * Tres variantes según el contexto:
 *  - `inline`: pequeño badge para usar dentro de prose o cards
 *  - `badge`: badge medium para sections destacadas
 *  - `hero`: bloque grande con tagline expandida para featured placements
 *
 * Visual texto-primero. Cuando tengamos el logotipo definitivo, lo
 * reemplazamos con el SVG correspondiente sin tocar este API.
 */

import type { ReactNode } from 'react'

interface SelloPalaciosProps {
  variant?: 'inline' | 'badge' | 'hero'
  /** Tagline custom — si no se pasa, usa la canónica del despacho */
  tagline?: ReactNode
  /** Override className opcional para tunear el placement */
  className?: string
}

const TAGLINE_DEFAULT =
  'Diseñado y programado por Antonio Palacios Cambero (Toño Palacios) — broker hipotecario nº E242 (Banco de España) y presidente de ANICI.'

export function SelloPalacios({
  variant = 'inline',
  tagline,
  className = '',
}: SelloPalaciosProps) {
  if (variant === 'inline') {
    return (
      <span
        className={`inline-flex items-center gap-1.5 rounded-md border border-gold-400 bg-gold-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-navy-900 ${className}`}
        title="El Sello Palacios — diseñado por Toño Palacios, broker hipotecario nº E242"
      >
        <span aria-hidden className="text-gold-600">✦</span>
        El Sello Palacios
      </span>
    )
  }

  if (variant === 'badge') {
    return (
      <aside
        className={`inline-flex items-start gap-3 rounded-lg border border-gold-300 bg-gold-50 p-4 ${className}`}
      >
        <SealMark />
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-navy-800">
            El Sello Palacios
          </p>
          <p className="text-xs text-navy-700 leading-relaxed mt-0.5">
            {tagline ?? TAGLINE_DEFAULT}
          </p>
        </div>
      </aside>
    )
  }

  // hero
  return (
    <div
      className={`flex flex-col sm:flex-row items-start sm:items-center gap-4 rounded-xl border-2 border-gold-400 bg-gradient-to-br from-gold-50 to-paper-card p-5 sm:p-6 shadow-soft ${className}`}
    >
      <SealMark large />
      <div>
        <p className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-gold-700 mb-1">
          Este contenido lleva
        </p>
        <p className="text-xl sm:text-2xl font-bold text-navy-900 mb-2 leading-tight">
          El Sello Palacios
        </p>
        <p className="text-sm text-navy-700 leading-relaxed">
          {tagline ?? TAGLINE_DEFAULT}
        </p>
      </div>
    </div>
  )
}

/**
 * Sello visual minimalista — círculo dorado con monograma TP estilizado.
 * SVG inline, escalable, sin dependencias. Sustituible por el logotipo
 * definitivo cuando esté listo (solo cambiar este componente).
 */
function SealMark({ large = false }: { large?: boolean }) {
  const size = large ? 64 : 36
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      aria-hidden
      className="shrink-0"
      role="presentation"
    >
      {/* Anillo exterior */}
      <circle cx="32" cy="32" r="30" fill="none" stroke="#C8A852" strokeWidth="2" />
      {/* Anillo interior */}
      <circle cx="32" cy="32" r="24" fill="none" stroke="#C8A852" strokeWidth="0.8" />
      {/* Monograma TP */}
      <text
        x="32"
        y="40"
        textAnchor="middle"
        fontSize="20"
        fontWeight="800"
        fill="#0F1B2D"
        fontFamily="'Inter', 'Helvetica Neue', sans-serif"
        letterSpacing="-1"
      >
        TP
      </text>
      {/* Estrella decorativa arriba */}
      <text
        x="32"
        y="14"
        textAnchor="middle"
        fontSize="6"
        fill="#C8A852"
        fontFamily="'Inter', sans-serif"
      >
        ✦
      </text>
      {/* Texto curvado debajo: "E242" */}
      <text
        x="32"
        y="56"
        textAnchor="middle"
        fontSize="5"
        fontWeight="700"
        fill="#C8A852"
        fontFamily="'Inter', sans-serif"
        letterSpacing="1"
      >
        E·242
      </text>
    </svg>
  )
}
