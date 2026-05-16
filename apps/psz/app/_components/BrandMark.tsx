/**
 * BrandMark — marca gráfica oficial de Toño Palacios (modelo "P6").
 *
 * Monograma serif T·P partido por filete vertical. La T y la P están
 * trazadas como PATHS vectoriales (no texto en una fuente): se renderiza
 * idéntico en web, favicon, Open Graph y PDF sin depender de ninguna
 * tipografía instalada. Esto es lo que distingue un logotipo profesional
 * de un texto puesto en una fuente.
 *
 * Arquitectura de marca: ENDOSADA.
 *  - Esta es la marca MAESTRA y única (uso personal + herramientas).
 *  - "El Sello Palacios" NO es una marca aparte: es el descriptor de la
 *    garantía que esta marca imprime sobre las herramientas. Se expresa
 *    a través de este mismo símbolo + microcopy (ver SelloPalacios.tsx).
 *
 * Regla de color sobre fondo: la letra cuyo color choca con el fondo
 * pasa a blanco, manteniendo siempre dos tonos legibles.
 *
 *   Base        → T navy · P oro · filetes oro
 *   Fondo navy  → T BLANCA · P oro · filetes oro
 *   Fondo oro   → T navy · P BLANCA · filetes navy
 *   Monocromo   → todo navy (o todo blanco si inverse)
 *
 * Tokens canónicos (design-system): navy.800 #0F1B3D · gold.400 #C9A961.
 */

export const BRAND = {
  navy: '#0F1B3D',
  gold: '#C9A961',
  white: '#FFFFFF',
} as const

export type BrandBg = 'light' | 'dark' | 'gold'

interface BrandColors {
  t: string
  p: string
  rule: string
}

function resolveColors(bg: BrandBg, mono: boolean, inverse: boolean): BrandColors {
  if (mono) {
    const c = inverse ? BRAND.white : BRAND.navy
    return { t: c, p: c, rule: c }
  }
  // Base: T navy, P oro, filete oro.
  const t = bg === 'dark' ? BRAND.white : BRAND.navy
  const p = bg === 'gold' ? BRAND.white : BRAND.gold
  const rule = bg === 'gold' ? BRAND.navy : BRAND.gold
  return { t, p, rule }
}

// ── Geometría del monograma (viewBox 0 0 100 100) ────────────────────
// Glifos serif de transición trazados a mano. Caja de mayúsculas y ≈30..70.

const T_PATHS = {
  bar: 'M12 30 H46 V35 H12 Z',
  serifL: 'M12.5 35 H16 V38.2 H12.5 Z',
  serifR: 'M42 35 H45.5 V38.2 H42 Z',
  stem: 'M26 35 H32 V66 H26 Z',
  foot: 'M17.5 70 C20.8 70 23.6 68.3 24.6 65.8 H33.4 C34.4 68.3 37.2 70 40.5 70 V70.6 H17.5 Z',
}

const P_PATHS = {
  stem: 'M54 30 H60.5 V70 H54 Z',
  serifTop: 'M50.5 30 H64 V34 H50.5 Z',
  foot: 'M49.5 70 C52.8 70 55.6 68.3 56.6 65.8 H58.4 C59.4 68.3 62.2 70 65.5 70 V70.6 H49.5 Z',
  // Anillo del ojo (regla evenodd: contorno externo + contra interior)
  bowl: 'M60.5 31 H74 A14 14 0 0 1 74 57 H60.5 Z M60.5 37 H70 A8 8 0 0 1 70 51 H60.5 Z',
}

interface BrandMarkProps {
  /** Lado del cuadro en px */
  size?: number
  /** Fondo sobre el que se coloca */
  bg?: BrandBg
  /** Monocromo (papelería, fax, sellos de tinta) */
  mono?: boolean
  /** En monocromo, usar blanco en vez de navy (sobre fondos oscuros) */
  inverse?: boolean
  /** Mostrar filete inferior + "Nº E242". Auto a partir de 40px si no se fuerza */
  registry?: boolean
  className?: string
  /** Etiqueta accesible. Si null → aria-hidden (decorativo junto a texto) */
  title?: string | null
}

/**
 * Cadena SVG (fuente única de verdad). Se usa tal cual en el DOM y como
 * data-URI en Open Graph / favicon / PDF.
 */
export function brandMarkSvg(opts: {
  size?: number
  bg?: BrandBg
  mono?: boolean
  inverse?: boolean
  registry?: boolean
} = {}): string {
  const { size = 80, bg = 'light', mono = false, inverse = false } = opts
  const registry = opts.registry ?? size >= 40
  const { t, p, rule } = resolveColors(bg, mono, inverse)

  const reg = registry
    ? `<line x1="26" y1="78" x2="74" y2="78" stroke="${rule}" stroke-width="0.8"/>` +
      `<text x="50" y="89" text-anchor="middle" font-size="7" font-weight="600" letter-spacing="4" ` +
      `font-family="Inter, ui-sans-serif, system-ui, sans-serif" fill="${t}">Nº E242</text>`
    : ''

  return (
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 100 100">` +
    `<line x1="50" y1="24" x2="50" y2="62" stroke="${rule}" stroke-width="0.8"/>` +
    `<g fill="${t}">` +
    `<path d="${T_PATHS.bar}"/><path d="${T_PATHS.serifL}"/><path d="${T_PATHS.serifR}"/>` +
    `<path d="${T_PATHS.stem}"/><path d="${T_PATHS.foot}"/></g>` +
    `<g fill="${p}">` +
    `<path d="${P_PATHS.stem}"/><path d="${P_PATHS.serifTop}"/><path d="${P_PATHS.foot}"/>` +
    `<path fill-rule="evenodd" d="${P_PATHS.bowl}"/></g>` +
    reg +
    `</svg>`
  )
}

/** data-URI listo para <img src> en Open Graph / favicon / PDF. */
export function brandMarkDataUri(opts: Parameters<typeof brandMarkSvg>[0] = {}): string {
  const svg = brandMarkSvg(opts)
  // Edge-safe: btoa existe en edge runtime y navegador; Buffer en Node.
  const b64 =
    typeof btoa === 'function'
      ? btoa(unescape(encodeURIComponent(svg)))
      : Buffer.from(svg, 'utf-8').toString('base64')
  return `data:image/svg+xml;base64,${b64}`
}

/** Componente React para el DOM. */
export function BrandMark({
  size = 80,
  bg = 'light',
  mono = false,
  inverse = false,
  registry,
  className,
  title = 'Toño Palacios — broker hipotecario nº E242',
}: BrandMarkProps) {
  const showRegistry = registry ?? size >= 40
  const { t, p, rule } = resolveColors(bg, mono, inverse)
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      role={title ? 'img' : 'presentation'}
      aria-label={title ?? undefined}
      aria-hidden={title ? undefined : true}
    >
      <line x1="50" y1="24" x2="50" y2="62" stroke={rule} strokeWidth="0.8" />
      <g fill={t}>
        <path d={T_PATHS.bar} />
        <path d={T_PATHS.serifL} />
        <path d={T_PATHS.serifR} />
        <path d={T_PATHS.stem} />
        <path d={T_PATHS.foot} />
      </g>
      <g fill={p}>
        <path d={P_PATHS.stem} />
        <path d={P_PATHS.serifTop} />
        <path d={P_PATHS.foot} />
        <path fillRule="evenodd" d={P_PATHS.bowl} />
      </g>
      {showRegistry && (
        <>
          <line x1="26" y1="78" x2="74" y2="78" stroke={rule} strokeWidth="0.8" />
          <text
            x="50"
            y="89"
            textAnchor="middle"
            fontSize="7"
            fontWeight={600}
            letterSpacing="4"
            fontFamily="Inter, ui-sans-serif, system-ui, sans-serif"
            fill={t}
          >
            Nº E242
          </text>
        </>
      )}
    </svg>
  )
}

export default BrandMark
