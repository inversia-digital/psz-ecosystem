/**
 * BrandMark — marca gráfica oficial de Toño Palacios.
 *
 * PORT EXACTO de LogomarkP6 (/preview/logos). Mismas coordenadas, misma
 * tipografía, mismos colores, mismo umbral. NO se reinterpreta: si hay
 * que cambiar el logo se cambia aquí y se replica en /preview/logos, no
 * al revés.
 *
 * Arquitectura: ENDOSADA. Marca maestra única. "El Sello Palacios" es el
 * descriptor de la garantía, no una marca aparte.
 */

// Paleta EXACTA del P6 original (no la del design-system; es la que se
// aprobó visualmente en /preview/logos).
const NAVY = '#0F1B2D'
const GOLD = '#C8A852'
const WHITE = '#FFFFFF'

export const BRAND = { navy: NAVY, gold: GOLD, white: WHITE } as const

export type BrandBg = 'light' | 'dark' | 'gold'

// Para rasterizado (OG/favicon): nombre literal, mejor esfuerzo.
const SERIF = "Georgia, Gelasio, 'Times New Roman', serif"

// Para el DOM: Georgia primero (el aspecto aprobado en Windows) y, si no
// existe, Gelasio empaquetada por next/font (métricamente IDÉNTICA a
// Georgia). Las variables CSS solo resuelven vía `style`, no vía atributo.
const SERIF_DOM =
  "Georgia, var(--font-gelasio), Gelasio, 'Times New Roman', serif"

/** adapt() EXACTO del original: si el base choca con el fondo → blanco. */
function adapt(base: string, bg: BrandBg): string {
  if (bg === 'dark' && base === NAVY) return WHITE
  if (bg === 'gold' && base === GOLD) return WHITE
  return base
}

/** sealInk() EXACTO del original: mono→navy, gold-bg→navy, resto→oro. */
function sealInk(mono: boolean, bg: BrandBg): string {
  if (mono) return NAVY
  if (bg === 'gold') return NAVY
  return GOLD
}

interface MarkColors {
  tColor: string
  pColor: string
  accent: string
  e242: string
}

function resolveColors(bg: BrandBg, mono: boolean, inverse: boolean): MarkColors {
  if (mono) {
    const c = inverse ? WHITE : NAVY
    return { tColor: c, pColor: c, accent: c, e242: c }
  }
  // Base original: T navy, P oro, filete oro, E·242 navy.
  return {
    tColor: adapt(NAVY, bg),
    pColor: adapt(GOLD, bg),
    accent: sealInk(false, bg),
    e242: adapt(NAVY, bg),
  }
}

interface BrandMarkProps {
  size?: number
  bg?: BrandBg
  mono?: boolean
  /** En monocromo, usar blanco (sobre fondos oscuros) */
  inverse?: boolean
  /** Mostrar filete inferior + "E·242". Por defecto, igual que el
   *  original: visible cuando size >= 40 */
  registry?: boolean
  className?: string
  /** Etiqueta accesible. null → decorativo (aria-hidden) */
  title?: string | null
}

/**
 * Cadena SVG — fuente única de verdad para OG / favicon / PDF.
 * Geometría IDÉNTICA a LogomarkP6.
 */
export function brandMarkSvg(opts: {
  size?: number
  bg?: BrandBg
  mono?: boolean
  inverse?: boolean
  registry?: boolean
} = {}): string {
  const { size = 80, bg = 'light', mono = false, inverse = false } = opts
  const showText = opts.registry ?? size >= 40
  const { tColor, pColor, accent, e242 } = resolveColors(bg, mono, inverse)

  const reg = showText
    ? `<line x1="26" y1="74" x2="74" y2="74" stroke="${accent}" stroke-width="0.8"/>` +
      `<text x="50" y="86" text-anchor="middle" font-size="7" font-weight="600" letter-spacing="4" font-family="${SERIF}" fill="${e242}">E·242</text>`
    : ''

  return (
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 100 100">` +
    `<line x1="50" y1="20" x2="50" y2="62" stroke="${accent}" stroke-width="0.8"/>` +
    `<text x="44" y="56" text-anchor="end" font-size="40" font-weight="500" font-family="${SERIF}" fill="${tColor}">T</text>` +
    `<text x="56" y="56" text-anchor="start" font-size="40" font-weight="500" font-family="${SERIF}" fill="${pColor}">P</text>` +
    reg +
    `</svg>`
  )
}

// Base64 100% JS — sin Buffer (Node) ni unescape. Seguro en Edge Runtime.
const B64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'

function base64FromBytes(bytes: number[]): string {
  let out = ''
  for (let i = 0; i < bytes.length; i += 3) {
    const b0 = bytes[i]!
    const b1 = i + 1 < bytes.length ? bytes[i + 1]! : 0
    const b2 = i + 2 < bytes.length ? bytes[i + 2]! : 0
    out += B64[b0 >> 2]
    out += B64[((b0 & 3) << 4) | (b1 >> 4)]
    out += i + 1 < bytes.length ? B64[((b1 & 15) << 2) | (b2 >> 6)] : '='
    out += i + 2 < bytes.length ? B64[b2 & 63] : '='
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

/**
 * Componente React. Replica EXACTA de LogomarkP6: mismas coordenadas,
 * fontSize 40, peso 500, "E·242", umbral size >= 40.
 */
export function BrandMark({
  size = 80,
  bg = 'light',
  mono = false,
  inverse = false,
  registry,
  className,
  title = 'Toño Palacios — broker hipotecario nº E242',
}: BrandMarkProps) {
  const showText = registry ?? size >= 40
  const { tColor, pColor, accent, e242 } = resolveColors(bg, mono, inverse)
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
      <line x1="50" y1="20" x2="50" y2="62" stroke={accent} strokeWidth="0.8" />
      <text
        x="44"
        y="56"
        textAnchor="end"
        fontSize="40"
        fontWeight={500}
        style={{ fontFamily: SERIF_DOM }}
        fill={tColor}
      >
        T
      </text>
      <text
        x="56"
        y="56"
        textAnchor="start"
        fontSize="40"
        fontWeight={500}
        style={{ fontFamily: SERIF_DOM }}
        fill={pColor}
      >
        P
      </text>
      {showText && (
        <>
          <line x1="26" y1="74" x2="74" y2="74" stroke={accent} strokeWidth="0.8" />
          <text
            x="50"
            y="86"
            textAnchor="middle"
            fontSize="7"
            fontWeight={600}
            letterSpacing="4"
            style={{ fontFamily: SERIF_DOM }}
            fill={e242}
          >
            E·242
          </text>
        </>
      )}
    </svg>
  )
}

export default BrandMark
