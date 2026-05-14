import type { Metadata } from 'next'

/**
 * Página interna /preview/logos — NO indexable.
 * Muestra 4 direcciones de logo para que el usuario elija.
 *
 * Cuando se decida una, esta página se puede borrar (no es contenido
 * de producción) o conservar como referencia de diseño.
 */

export const metadata: Metadata = {
  title: 'Preview · Logos (interno)',
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
}

// Paleta común para todos los logos
const NAVY = '#0F1B2D'
const GOLD = '#C8A852'
const GOLD_LIGHT = '#E5D08A'
const PAPER = '#FAFAF7'

// ────────────────────────────────────────────────────────────
// LOGOMARK A · Sello clásico circular refinado
// Inspiración: sellos notariales, registros oficiales
// ────────────────────────────────────────────────────────────
function LogomarkA({ size = 80, mono = false }: { size?: number; mono?: boolean }) {
  const stroke = mono ? NAVY : GOLD
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden>
      {/* Anillo exterior doble */}
      <circle cx="50" cy="50" r="46" fill="none" stroke={stroke} strokeWidth="2" />
      <circle cx="50" cy="50" r="42" fill="none" stroke={stroke} strokeWidth="0.6" />
      {/* Cuatro puntos cardinales */}
      <circle cx="50" cy="6" r="1.5" fill={stroke} />
      <circle cx="94" cy="50" r="1.5" fill={stroke} />
      <circle cx="50" cy="94" r="1.5" fill={stroke} />
      <circle cx="6" cy="50" r="1.5" fill={stroke} />
      {/* Monograma TP */}
      <text
        x="50"
        y="62"
        textAnchor="middle"
        fontSize="38"
        fontWeight="800"
        fontFamily="'Inter', sans-serif"
        letterSpacing="-2"
        fill={mono ? NAVY : NAVY}
      >
        TP
      </text>
      {/* E·242 curvado en la base */}
      <path id="curve-a" d="M 18 70 a 32 32 0 0 0 64 0" fill="none" />
      <text fontSize="6.5" fontWeight="700" fill={stroke} fontFamily="'Inter', sans-serif" letterSpacing="3">
        <textPath href="#curve-a" startOffset="50%" textAnchor="middle">
          BdE · E242
        </textPath>
      </text>
    </svg>
  )
}

// ────────────────────────────────────────────────────────────
// LOGOMARK B · Monograma TP entrelazado sin marco
// Inspiración: marcas premium contemporáneas (Loewe, Hermès)
// ────────────────────────────────────────────────────────────
function LogomarkB({ size = 80, mono = false }: { size?: number; mono?: boolean }) {
  const tColor = mono ? NAVY : GOLD
  const pColor = mono ? NAVY : NAVY
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden>
      {/* T grande con barra horizontal larga */}
      <g fill={tColor}>
        <rect x="12" y="22" width="60" height="10" />
        <rect x="37" y="22" width="10" height="56" />
      </g>
      {/* P entrelazada, su vertical pasa por delante del horizontal de la T */}
      <g fill={pColor}>
        <rect x="55" y="22" width="10" height="56" />
        <path d="M 55 22 h 18 a 16 16 0 0 1 0 32 h -18 v -10 h 14 a 6 6 0 0 0 0 -12 h -14 z" />
      </g>
      {/* Linea horizontal sutil debajo */}
      <line x1="20" y1="86" x2="80" y2="86" stroke={tColor} strokeWidth="1" />
    </svg>
  )
}

// ────────────────────────────────────────────────────────────
// LOGOMARK C · Escudo heráldico
// Inspiración: heráldica española clásica, sello de armas
// ────────────────────────────────────────────────────────────
function LogomarkC({ size = 80, mono = false }: { size?: number; mono?: boolean }) {
  const accent = mono ? NAVY : GOLD
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden>
      {/* Escudo francés moderno (con punta) */}
      <path
        d="M 20 10 L 80 10 L 80 55 Q 80 80 50 92 Q 20 80 20 55 Z"
        fill={mono ? 'none' : PAPER}
        stroke={accent}
        strokeWidth="2.5"
      />
      {/* Banda diagonal */}
      <path
        d="M 20 30 L 80 30 L 80 38 L 20 38 Z"
        fill={accent}
        opacity={mono ? 0.15 : 1}
      />
      {/* Monograma TP */}
      <text
        x="50"
        y="68"
        textAnchor="middle"
        fontSize="28"
        fontWeight="800"
        fontFamily="'Inter', sans-serif"
        letterSpacing="-1.5"
        fill={NAVY}
      >
        TP
      </text>
      {/* Estrella corona arriba */}
      <text x="50" y="26" textAnchor="middle" fontSize="10" fill={NAVY} fontWeight="700">
        ✦
      </text>
    </svg>
  )
}

// ────────────────────────────────────────────────────────────
// LOGOMARK D · Sello de lacre (8-point seal)
// Inspiración: lacre vintage, sellos premium contemporáneos
// ────────────────────────────────────────────────────────────
function LogomarkD({ size = 80, mono = false }: { size?: number; mono?: boolean }) {
  const fill = mono ? PAPER : GOLD
  const stroke = mono ? NAVY : NAVY
  // Sello con 12 puntos redondeados (forma de medallón / wax seal)
  const points = 12
  const outer = 46
  const inner = 40
  const path: string[] = []
  for (let i = 0; i < points * 2; i++) {
    const angle = (i / (points * 2)) * Math.PI * 2 - Math.PI / 2
    const r = i % 2 === 0 ? outer : inner
    const x = 50 + r * Math.cos(angle)
    const y = 50 + r * Math.sin(angle)
    path.push(i === 0 ? `M ${x.toFixed(2)} ${y.toFixed(2)}` : `L ${x.toFixed(2)} ${y.toFixed(2)}`)
  }
  path.push('Z')
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden>
      <path d={path.join(' ')} fill={fill} stroke={stroke} strokeWidth="2" />
      {/* Inner ring */}
      <circle cx="50" cy="50" r="32" fill="none" stroke={stroke} strokeWidth="0.8" />
      {/* Monograma TP */}
      <text
        x="50"
        y="62"
        textAnchor="middle"
        fontSize="32"
        fontWeight="800"
        fontFamily="'Inter', sans-serif"
        letterSpacing="-2"
        fill={NAVY}
      >
        TP
      </text>
    </svg>
  )
}

// ════════════════════════════════════════════════════════════
// HÍBRIDOS A+B — monograma TP de B con el E242 discreto de A
// ════════════════════════════════════════════════════════════

/**
 * Helper: el monograma TP interlocked que comparten los 3 híbridos.
 * Misma estructura que LogomarkB pero parametrizada por escala.
 */
function TPMonogram({
  cx = 50,
  cy = 50,
  width = 60,
  height = 56,
  tColor,
  pColor,
}: {
  cx?: number
  cy?: number
  width?: number
  height?: number
  tColor: string
  pColor: string
}) {
  const left = cx - width / 2
  const top = cy - height / 2
  const w = width
  const h = height
  // T (10/56 = ~18% bar height)
  const tBarH = h * 0.18
  const tStemW = w * 0.16
  return (
    <>
      <g fill={tColor}>
        <rect x={left} y={top} width={w * 0.65} height={tBarH} />
        <rect x={left + w * 0.27} y={top} width={tStemW} height={h} />
      </g>
      {/* P entrelazada — su vertical y bowl están a la derecha */}
      <g fill={pColor}>
        <rect x={left + w * 0.55} y={top} width={tStemW} height={h} />
        <path
          d={`M ${left + w * 0.55} ${top} h ${w * 0.3} a ${h * 0.29} ${h * 0.29} 0 0 1 0 ${h * 0.57} h ${-w * 0.3} v ${-h * 0.18} h ${w * 0.23} a ${h * 0.11} ${h * 0.11} 0 0 0 0 ${-h * 0.21} h ${-w * 0.23} z`}
        />
      </g>
    </>
  )
}

// HÍBRIDO H1 · TP + línea horizontal + E·242 debajo
function LogomarkH1({ size = 80, mono = false }: { size?: number; mono?: boolean }) {
  const accent = mono ? NAVY : GOLD
  const showE242 = size >= 40 // a tamaños muy pequeños (favicon), ocultar
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden>
      <TPMonogram cy={showE242 ? 38 : 50} tColor={accent} pColor={NAVY} />
      {showE242 && (
        <>
          <line x1="32" y1="72" x2="68" y2="72" stroke={accent} strokeWidth="1.2" />
          <text
            x="50"
            y="86"
            textAnchor="middle"
            fontSize="9"
            fontWeight="700"
            fontFamily="'Inter', sans-serif"
            letterSpacing="2"
            fill={accent}
          >
            E·242
          </text>
        </>
      )}
    </svg>
  )
}

// HÍBRIDO H2 · TP + chip "Nº E242" debajo
function LogomarkH2({ size = 80, mono = false }: { size?: number; mono?: boolean }) {
  const accent = mono ? NAVY : GOLD
  const showE242 = size >= 40
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden>
      <TPMonogram cy={showE242 ? 36 : 50} tColor={accent} pColor={NAVY} />
      {showE242 && (
        <g>
          <rect
            x="28"
            y="74"
            width="44"
            height="14"
            rx="2"
            fill="none"
            stroke={accent}
            strokeWidth="1.2"
          />
          <text
            x="50"
            y="84"
            textAnchor="middle"
            fontSize="8"
            fontWeight="700"
            fontFamily="'Inter', sans-serif"
            letterSpacing="1.5"
            fill={accent}
          >
            BdE Nº E242
          </text>
        </g>
      )}
    </svg>
  )
}

// HÍBRIDO H3 · TP con E·242 integrado en una marca de stamp inferior izquierda
function LogomarkH3({ size = 80, mono = false }: { size?: number; mono?: boolean }) {
  const accent = mono ? NAVY : GOLD
  const showE242 = size >= 48
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden>
      <TPMonogram cy={50} tColor={accent} pColor={NAVY} />
      {showE242 && (
        <text
          x="92"
          y="92"
          textAnchor="end"
          fontSize="7"
          fontWeight="700"
          fontFamily="'Inter', sans-serif"
          letterSpacing="2"
          fill={accent}
          opacity="0.85"
        >
          E·242
        </text>
      )}
    </svg>
  )
}

// ────────────────────────────────────────────────────────────
// Wordmark (común a todos)
// ────────────────────────────────────────────────────────────
function Wordmark({ scale = 1, color = NAVY }: { scale?: number; color?: string }) {
  return (
    <span
      style={{
        fontFamily: "'Inter', sans-serif",
        fontWeight: 800,
        letterSpacing: '-0.04em',
        fontSize: `${24 * scale}px`,
        color,
        lineHeight: 1,
      }}
    >
      <span style={{ color: GOLD }}>Toño</span>{' '}
      <span>Palacios</span>
    </span>
  )
}

// ────────────────────────────────────────────────────────────
// Página
// ────────────────────────────────────────────────────────────
const LOGOMARKS = [
  { letter: 'A', name: 'Sello circular clásico', desc: 'Institucional, sobrio. Refuerza la idea de "registro/autoridad". Pareja natural de El Sello Palacios.', Component: LogomarkA },
  { letter: 'B', name: 'Monograma TP entrelazado', desc: 'Premium contemporáneo. Sin marco. Muy escalable, perfecto para favicon y avatares pequeños.', Component: LogomarkB },
  { letter: 'C', name: 'Escudo heráldico', desc: 'Heráldica española clásica. Comunica linaje, tradición, autoridad institucional.', Component: LogomarkC },
  { letter: 'D', name: 'Sello de lacre 12-puntas', desc: 'Vintage premium. Sugiere "sellado/certificado" — encaja al 100% con el concepto El Sello Palacios.', Component: LogomarkD },
] as const

const HYBRIDS = [
  {
    letter: 'H1',
    name: 'Híbrido — TP + línea + E·242 debajo',
    desc: 'El más sobrio de los tres. El TP domina arriba; debajo, una línea fina horizontal separa y aparece "E·242" en pequeño caps. A tamaño favicon (32px) se oculta automáticamente el E242 y queda sólo el monograma.',
    Component: LogomarkH1,
  },
  {
    letter: 'H2',
    name: 'Híbrido — TP + chip "BdE Nº E242"',
    desc: 'Más explícito sobre la autoridad. El TP arriba; debajo, un chip rectangular con borde fino indica "BdE Nº E242". Mejor para tamaños grandes (hero, OG, PDF). En favicon se oculta el chip.',
    Component: LogomarkH2,
  },
  {
    letter: 'H3',
    name: 'Híbrido — TP centrado + E·242 firma esquina',
    desc: 'El más minimalista. El TP ocupa todo el espacio sin perder protagonismo. El "E·242" aparece como firma pequeña en la esquina inferior derecha — como las marcas de pintor. Apenas se nota pero está siempre presente.',
    Component: LogomarkH3,
  },
] as const

export default function PreviewLogosPage() {
  return (
    <main style={{ background: PAPER, minHeight: '100vh', padding: '40px 24px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <header style={{ marginBottom: 48 }}>
          <p style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: 3, color: GOLD, fontWeight: 700 }}>
            Interno · No indexable
          </p>
          <h1 style={{ fontSize: 42, fontWeight: 800, color: NAVY, marginTop: 8, letterSpacing: '-0.03em' }}>
            Preview de logos — Toño Palacios
          </h1>
          <p style={{ marginTop: 16, fontSize: 16, color: NAVY, opacity: 0.7, maxWidth: 720, lineHeight: 1.5 }}>
            Cuatro direcciones distintas. Cada una mostrada en 4 contextos reales: favicon (32px),
            header del sitio (40px + wordmark), hero grande, y monocromo para letterhead /
            documento legal. Eliges una numerando (A / B / C / D) y la implemento como logo
            definitivo en header, footer, OG images, PDF y favicon.
          </p>
        </header>

        {LOGOMARKS.map(({ letter, name, desc, Component }) => (
          <section
            key={letter}
            style={{
              background: '#fff',
              borderRadius: 16,
              padding: 32,
              marginBottom: 32,
              boxShadow: '0 4px 24px rgba(15,27,45,0.06)',
              border: '1px solid #E5E5E5',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 24 }}>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 40,
                  height: 40,
                  borderRadius: 8,
                  background: GOLD,
                  color: NAVY,
                  fontWeight: 800,
                  fontSize: 22,
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                {letter}
              </span>
              <h2 style={{ fontSize: 24, fontWeight: 700, color: NAVY, letterSpacing: '-0.02em', margin: 0 }}>
                {name}
              </h2>
            </div>
            <p style={{ fontSize: 15, color: NAVY, opacity: 0.7, marginBottom: 28, maxWidth: 680, lineHeight: 1.5 }}>
              {desc}
            </p>

            {/* Grid de contextos */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: 16,
              }}
            >
              {/* Contexto 1: Favicon (32px) sobre paper */}
              <div style={{ background: PAPER, border: '1px solid #E5E5E5', borderRadius: 8, padding: 24, textAlign: 'center' }}>
                <p style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: 2, color: NAVY, opacity: 0.5, marginBottom: 16 }}>
                  Favicon 32px (pestaña del navegador)
                </p>
                <Component size={32} />
                <p style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: 2, color: NAVY, opacity: 0.5, marginTop: 16 }}>
                  + tamaño grande 96px
                </p>
                <div style={{ marginTop: 8 }}>
                  <Component size={96} />
                </div>
              </div>

              {/* Contexto 2: Header (logomark + wordmark) sobre navy */}
              <div style={{ background: NAVY, border: '1px solid #E5E5E5', borderRadius: 8, padding: 24, textAlign: 'center' }}>
                <p style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: 2, color: PAPER, opacity: 0.5, marginBottom: 16 }}>
                  Header del sitio
                </p>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12 }}>
                  <Component size={42} />
                  <Wordmark scale={1} color={PAPER} />
                </div>
                <p style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: 2, color: PAPER, opacity: 0.5, marginTop: 24 }}>
                  Hero grande
                </p>
                <div style={{ marginTop: 12, display: 'inline-flex', alignItems: 'center', gap: 16 }}>
                  <Component size={72} />
                  <Wordmark scale={2.2} color={PAPER} />
                </div>
              </div>

              {/* Contexto 3: Monocromo (letterhead / documento legal) */}
              <div style={{ background: '#fff', border: '1px solid #E5E5E5', borderRadius: 8, padding: 24, textAlign: 'center' }}>
                <p style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: 2, color: NAVY, opacity: 0.5, marginBottom: 16 }}>
                  Monocromo (papelería, fax, B/N)
                </p>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12 }}>
                  <Component size={48} mono />
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 800,
                      letterSpacing: '-0.04em',
                      fontSize: 28,
                      color: NAVY,
                      lineHeight: 1,
                    }}
                  >
                    Toño Palacios
                  </span>
                </div>
                <p style={{ fontSize: 11, color: NAVY, opacity: 0.6, marginTop: 16, fontFamily: "'Inter', sans-serif" }}>
                  Antonio Palacios Cambero · Broker hipotecario nº E242 · Presidente ANICI
                </p>
              </div>

              {/* Contexto 4: Sobre gold (PDF header / certificado) */}
              <div style={{ background: GOLD_LIGHT, border: '1px solid #E5E5E5', borderRadius: 8, padding: 24, textAlign: 'center' }}>
                <p style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: 2, color: NAVY, opacity: 0.7, marginBottom: 16 }}>
                  Variante "sello dorado" (certificado / PDF premium)
                </p>
                <Component size={84} />
              </div>
            </div>
          </section>
        ))}

        {/* SECCIÓN HÍBRIDOS A+B */}
        <div style={{ marginTop: 64, marginBottom: 32, padding: '24px 0', borderTop: `3px solid ${GOLD}`, borderBottom: `3px solid ${GOLD}` }}>
          <p style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: 3, color: GOLD, fontWeight: 700, marginBottom: 8 }}>
            Combinación pedida
          </p>
          <h2 style={{ fontSize: 32, fontWeight: 800, color: NAVY, letterSpacing: '-0.03em', margin: 0 }}>
            Híbridos A + B — TP entrelazado con E·242 discreto
          </h2>
          <p style={{ marginTop: 12, fontSize: 15, color: NAVY, opacity: 0.7, maxWidth: 720, lineHeight: 1.5 }}>
            Tres formas distintas de incorporar el número de registro al monograma TP sin
            saturar el diseño. En favicon (32px) el E242 se oculta automáticamente — solo
            queda el monograma reconocible.
          </p>
        </div>

        {HYBRIDS.map(({ letter, name, desc, Component }) => (
          <section
            key={letter}
            style={{
              background: '#fff',
              borderRadius: 16,
              padding: 32,
              marginBottom: 32,
              boxShadow: '0 4px 24px rgba(15,27,45,0.06)',
              border: `2px solid ${GOLD}`,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 24 }}>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingLeft: 12,
                  paddingRight: 12,
                  height: 40,
                  borderRadius: 8,
                  background: NAVY,
                  color: GOLD,
                  fontWeight: 800,
                  fontSize: 20,
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                {letter}
              </span>
              <h2 style={{ fontSize: 22, fontWeight: 700, color: NAVY, letterSpacing: '-0.02em', margin: 0 }}>
                {name}
              </h2>
            </div>
            <p style={{ fontSize: 15, color: NAVY, opacity: 0.7, marginBottom: 28, maxWidth: 680, lineHeight: 1.5 }}>
              {desc}
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
              <div style={{ background: PAPER, border: '1px solid #E5E5E5', borderRadius: 8, padding: 24, textAlign: 'center' }}>
                <p style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: 2, color: NAVY, opacity: 0.5, marginBottom: 16 }}>
                  Favicon 32px (E·242 oculto) + 96px (E·242 visible)
                </p>
                <Component size={32} />
                <div style={{ marginTop: 16 }}>
                  <Component size={96} />
                </div>
              </div>
              <div style={{ background: NAVY, border: '1px solid #E5E5E5', borderRadius: 8, padding: 24, textAlign: 'center' }}>
                <p style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: 2, color: PAPER, opacity: 0.5, marginBottom: 16 }}>
                  Header del sitio + Hero grande
                </p>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12 }}>
                  <Component size={48} />
                  <Wordmark scale={1} color={PAPER} />
                </div>
                <div style={{ marginTop: 24, display: 'inline-flex', alignItems: 'center', gap: 16 }}>
                  <Component size={80} />
                  <Wordmark scale={2.2} color={PAPER} />
                </div>
              </div>
              <div style={{ background: '#fff', border: '1px solid #E5E5E5', borderRadius: 8, padding: 24, textAlign: 'center' }}>
                <p style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: 2, color: NAVY, opacity: 0.5, marginBottom: 16 }}>
                  Monocromo (papelería / fax)
                </p>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12 }}>
                  <Component size={56} mono />
                  <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800, letterSpacing: '-0.04em', fontSize: 28, color: NAVY, lineHeight: 1 }}>
                    Toño Palacios
                  </span>
                </div>
                <p style={{ fontSize: 11, color: NAVY, opacity: 0.6, marginTop: 16, fontFamily: "'Inter', sans-serif" }}>
                  Antonio Palacios Cambero · Broker hipotecario nº E242 · Presidente ANICI
                </p>
              </div>
              <div style={{ background: GOLD_LIGHT, border: '1px solid #E5E5E5', borderRadius: 8, padding: 24, textAlign: 'center' }}>
                <p style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: 2, color: NAVY, opacity: 0.7, marginBottom: 16 }}>
                  Variante "sello dorado" (PDF premium)
                </p>
                <Component size={96} />
              </div>
            </div>
          </section>
        ))}

        {/* Footer con instrucciones */}
        <footer style={{ marginTop: 48, padding: '32px', background: '#fff', borderRadius: 16, border: `2px solid ${GOLD}` }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: NAVY, marginBottom: 12 }}>Cómo decidir</h2>
          <p style={{ fontSize: 15, color: NAVY, opacity: 0.8, marginBottom: 16, lineHeight: 1.6 }}>
            Has pedido una combinación A+B. Las tres opciones <strong>H1, H2, H3</strong> de
            arriba son tres variantes del híbrido — todas usan el monograma TP entrelazado
            como elemento principal y varían sólo en cómo aparece el E·242.
          </p>
          <ul style={{ fontSize: 14, color: NAVY, opacity: 0.7, lineHeight: 1.8, paddingLeft: 20 }}>
            <li><strong>H1</strong>: el más equilibrado. Línea + E·242 caps debajo del TP. Recomendado por defecto.</li>
            <li><strong>H2</strong>: más explícito. Chip con "BdE Nº E242" — útil si quieres reforzar el origen institucional.</li>
            <li><strong>H3</strong>: el más minimalista. TP grande sin distracciones; E·242 como firma de esquina.</li>
          </ul>
          <p style={{ marginTop: 24, fontSize: 14, color: NAVY }}>
            Dime <strong>"voy con H1"</strong> (o H2 / H3) y procedo a implementarlo en:
            header, SelloPalacios, favicon, OG images y PDF.
          </p>
        </footer>
      </div>
    </main>
  )
}
