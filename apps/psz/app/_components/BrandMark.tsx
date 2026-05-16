/**
 * BrandMark — marca gráfica oficial de Toño Palacios (modelo "P6").
 *
 * Monograma serif T·P partido por un filete vertical, con filete inferior
 * y firma registral "Nº E242". Es EXACTAMENTE el P6 aprobado: letras serif
 * limpias y centradas (no trazados a mano). En contextos de rasterizado
 * (OG/favicon) la serif puede caer a una serif de sistema, pero el dibujo
 * permanece nítido y centrado.
 *
 * Arquitectura de marca: ENDOSADA.
 *  - Marca MAESTRA y única (uso personal + herramientas).
 *  - "El Sello Palacios" NO es una marca aparte: es el descriptor de la
 *    garantía que esta marca imprime sobre las herramientas.
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

const SERIF =
  "'Hoefler Text', 'Cormorant Garamond', Georgia, 'Times New Roman', serif"

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
 *
 * Dos maquetaciones, ambas perfectamente centradas en el cuadro 100×100:
 *  - con firma   → P6 completo (TP + filete vertical + filete inf. + Nº E242)
 *  - sin firma   → solo TP + filete vertical, centrado verticalmente
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

  const tp = (baseline: number, fs: number) =>
    `<text x="44" y="${baseline}" text-anchor="end" font-family="${SERIF}" font-size="${fs}" font-weight="500" fill="${t}">T</text>` +
    `<text x="56" y="${baseline}" text-anchor="start" font-family="${SERIF}" font-size="${fs}" font-weight="500" fill="${p}">P</text>`

  const body = registry
    ? `<line x1="50" y1="20" x2="50" y2="62" stroke="${rule}" stroke-width="0.8"/>` +
      tp(56, 40) +
      `<line x1="26" y1="74" x2="74" y2="74" stroke="${rule}" stroke-width="0.8"/>` +
      `<text x="50" y="86" text-anchor="middle" font-family="${SERIF}" font-size="7" font-weight="600" letter-spacing="4" fill="${t}">Nº E242</text>`
    : `<line x1="50" y1="31" x2="50" y2="69" stroke="${rule}" stroke-width="0.8"/>` +
      tp(65, 44)

  return (
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 100 100">` +
    body +
    `</svg>`
  )
}

// Base64 100% JS — sin Buffer (Node) ni unescape (deprecado). Seguro en
// Edge Runtime, navegador y Node. El bundler Edge de Vercel rechaza
// cualquier referencia a Buffer aunque esté guardada por typeof.
const B64_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'

function base64FromBytes(bytes: number[]): string {
  let out = ''
  for (let i = 0; i < bytes.length; i += 3) {
    const b0 = bytes[i]!
    const b1 = i + 1 < bytes.length ? bytes[i + 1]! : 0
    const b2 = i + 2 < bytes.length ? bytes[i + 2]! : 0
    out += B64_ALPHABET[b0 >> 2]
    out += B64_ALPHABET[((b0 & 3) << 4) | (b1 >> 4)]
    out += i + 1 < bytes.length ? B64_ALPHABET[((b1 & 15) << 2) | (b2 >> 6)] : '='
    out += i + 2 < bytes.length ? B64_ALPHABET[b2 & 63] : '='
  }
  return out
}

/** data-URI listo para <img src> en Open Graph / favicon / PDF. */
export function brandMarkDataUri(opts: Parameters<typeof brandMarkSvg>[0] = {}): string {
  const svg = brandMarkSvg(opts)
  const utf8 = encodeURIComponent(svg).replace(/%([0-9A-Fa-f]{2})/g, (_, h) =>
    String.fromCharCode(parseInt(h, 16)),
  )
  const bytes: number[] = []
  for (let i = 0; i < utf8.length; i++) bytes.push(utf8.charCodeAt(i) & 0xff)
  return `data:image/svg+xml;base64,${base64FromBytes(bytes)}`
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
  const baseline = showRegistry ? 56 : 65
  const fs = showRegistry ? 40 : 44
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
      <line
        x1="50"
        y1={showRegistry ? 20 : 31}
        x2="50"
        y2={showRegistry ? 62 : 69}
        stroke={rule}
        strokeWidth="0.8"
      />
      <text
        x="44"
        y={baseline}
        textAnchor="end"
        fontFamily={SERIF}
        fontSize={fs}
        fontWeight={500}
        fill={t}
      >
        T
      </text>
      <text
        x="56"
        y={baseline}
        textAnchor="start"
        fontFamily={SERIF}
        fontSize={fs}
        fontWeight={500}
        fill={p}
      >
        P
      </text>
      {showRegistry && (
        <>
          <line x1="26" y1="74" x2="74" y2="74" stroke={rule} strokeWidth="0.8" />
          <text
            x="50"
            y="86"
            textAnchor="middle"
            fontFamily={SERIF}
            fontSize="7"
            fontWeight={600}
            letterSpacing="4"
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
