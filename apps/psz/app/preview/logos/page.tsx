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

// ════════════════════════════════════════════════════════════
// DIRECCIÓN PROFESIONAL — banca privada / notarial (bespoke)
// Monolínea custom + serif fino + microtexto de seguridad.
// Nada de bloques rectangulares ni estrellitas.
// ════════════════════════════════════════════════════════════

const SERIF = "'Hoefler Text', 'Cormorant Garamond', Georgia, 'Times New Roman', serif"

/**
 * Ligadura TP monolínea, dibujada a mano (paths, no tipografía).
 * El asta vertical es compartida por la T y la P — ligadura real.
 */
function MonolineTP({ cx = 50, cy = 50, s = 1, navy = NAVY, gold = GOLD }: { cx?: number; cy?: number; s?: number; navy?: string; gold?: string }) {
  return (
    <g transform={`translate(${cx} ${cy}) scale(${s}) translate(${-50} ${-50})`} fill="none" strokeLinecap="round">
      {/* T: travesaño + asta compartida (navy) */}
      <path d="M 30 32 H 70" stroke={navy} strokeWidth="3.4" />
      <path d="M 50 32 V 74" stroke={navy} strokeWidth="3.4" />
      {/* P: ojo a la derecha colgando del asta (oro) */}
      <path d="M 50 35.5 H 60 A 10.5 10.5 0 0 1 60 56.5 H 50" stroke={gold} strokeWidth="3.4" />
    </g>
  )
}

// P1 · Ligadura TP monolínea, sin marco — marca pura tipo banca privada
function LogomarkP1({ size = 80, mono = false }: { size?: number; mono?: boolean }) {
  const navy = NAVY
  const gold = mono ? NAVY : GOLD
  const showText = size >= 44
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden>
      <MonolineTP cx={50} cy={showText ? 46 : 50} s={0.96} navy={navy} gold={gold} />
      {showText && (
        <>
          <line x1="38" y1="78" x2="62" y2="78" stroke={mono ? NAVY : GOLD} strokeWidth="0.8" />
          <text x="50" y="89" textAnchor="middle" fontSize="7.5" fontWeight={600} fontFamily={SERIF} letterSpacing="4" fill={navy}>
            E·242
          </text>
        </>
      )}
    </svg>
  )
}

// P2 · Sello intaglio: anillos finos + microtexto de seguridad + ligadura
function LogomarkP2({ size = 80, mono = false }: { size?: number; mono?: boolean }) {
  const ink = mono ? NAVY : GOLD
  const showText = size >= 56
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden>
      {/* Anillos concéntricos finos (grabado calcográfico) */}
      <circle cx="50" cy="50" r="47" fill="none" stroke={ink} strokeWidth="1" />
      <circle cx="50" cy="50" r="44.5" fill="none" stroke={ink} strokeWidth="0.5" />
      <circle cx="50" cy="50" r="33" fill="none" stroke={ink} strokeWidth="0.5" />
      {showText && (
        <>
          {/* Microtexto circular de seguridad */}
          <path id="ring-p2" d="M 50 11 a 39 39 0 1 1 -0.01 0" fill="none" />
          <text fontSize="4.6" fontWeight={600} fill={ink} fontFamily={SERIF} letterSpacing="1.3">
            <textPath href="#ring-p2" startOffset="0">
              ANTONIO PALACIOS CAMBERO · BROKER HIPOTECARIO · Nº E242 BANCO DE ESPAÑA ·&nbsp;
            </textPath>
          </text>
        </>
      )}
      {/* Ligadura TP serif fina al centro */}
      <text x="50" y="64" textAnchor="middle" fontSize="40" fontWeight={500} fontFamily={SERIF} fill={NAVY} letterSpacing="-2">
        <tspan fill={NAVY}>T</tspan><tspan fill={mono ? NAVY : GOLD}>P</tspan>
      </text>
    </svg>
  )
}

// P3 · Signet: roundel macizo navy, TP en oro en hueco, keyline fino
function LogomarkP3({ size = 80, mono = false }: { size?: number; mono?: boolean }) {
  const disc = mono ? PAPER : NAVY
  const letter = mono ? NAVY : GOLD
  const ring = mono ? NAVY : GOLD
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden>
      <circle cx="50" cy="50" r="47" fill="none" stroke={ring} strokeWidth="1" />
      <circle cx="50" cy="50" r="43" fill={disc} stroke={mono ? NAVY : 'none'} strokeWidth={mono ? 1 : 0} />
      <text x="50" y="63" textAnchor="middle" fontSize="40" fontWeight={500} fontFamily={SERIF} fill={letter} letterSpacing="-2">
        TP
      </text>
      <text x="50" y="78" textAnchor="middle" fontSize="6" fontWeight={600} fontFamily={SERIF} letterSpacing="3" fill={letter} opacity={0.85}>
        E·242
      </text>
    </svg>
  )
}

// P4 · Logotipo serif (la firma ES el logo) — abogados / asesores premium
function LogomarkP4({ size = 80, mono = false }: { size?: number; mono?: boolean }) {
  // Marca tipográfica; el "size" controla la altura del bloque
  const accent = mono ? NAVY : GOLD
  return (
    <svg width={size * 2.6} height={size} viewBox="0 0 260 100" aria-hidden>
      <text x="130" y="44" textAnchor="middle" fontSize="38" fontWeight={500} fontFamily={SERIF} fill={NAVY} letterSpacing="0.5">
        Toño Palacios
      </text>
      <line x1="40" y1="58" x2="220" y2="58" stroke={accent} strokeWidth="0.8" />
      <text x="130" y="74" textAnchor="middle" fontSize="9" fontWeight={600} fontFamily={SERIF} letterSpacing="5" fill={NAVY} opacity={0.75}>
        BROKER HIPOTECARIO
      </text>
      <text x="130" y="88" textAnchor="middle" fontSize="7" fontWeight={600} fontFamily={SERIF} letterSpacing="3" fill={accent}>
        Nº E242 · BANCO DE ESPAÑA
      </text>
    </svg>
  )
}

// P5 · Iniciales serif en marco fino con esquinas — suizo / arquitectónico
function LogomarkP5({ size = 80, mono = false }: { size?: number; mono?: boolean }) {
  const line = mono ? NAVY : GOLD
  const showText = size >= 40
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden>
      {/* Marco doble fino */}
      <rect x="12" y="12" width="76" height="76" fill="none" stroke={line} strokeWidth="1" />
      <rect x="16" y="16" width="68" height="68" fill="none" stroke={line} strokeWidth="0.5" />
      {/* Ticks de esquina */}
      <path d="M 12 24 V 12 H 24 M 88 24 V 12 H 76 M 12 76 V 88 H 24 M 88 76 V 88 H 76" fill="none" stroke={line} strokeWidth="1.4" />
      <text x="50" y="58" textAnchor="middle" fontSize="34" fontWeight={500} fontFamily={SERIF} fill={NAVY} letterSpacing="-1">
        <tspan fill={NAVY}>T</tspan><tspan fill={mono ? NAVY : GOLD}>P</tspan>
      </text>
      {showText && (
        <text x="50" y="74" textAnchor="middle" fontSize="6.5" fontWeight={600} fontFamily={SERIF} letterSpacing="3" fill={line}>
          E·242
        </text>
      )}
    </svg>
  )
}

// P6 · Monograma serif partido por filete vertical — heráldico moderno
function LogomarkP6({ size = 80, mono = false }: { size?: number; mono?: boolean }) {
  const accent = mono ? NAVY : GOLD
  const showText = size >= 40
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden>
      <line x1="50" y1="20" x2="50" y2="62" stroke={accent} strokeWidth="0.8" />
      <text x="44" y="56" textAnchor="end" fontSize="40" fontWeight={500} fontFamily={SERIF} fill={NAVY}>T</text>
      <text x="56" y="56" textAnchor="start" fontSize="40" fontWeight={500} fontFamily={SERIF} fill={mono ? NAVY : GOLD}>P</text>
      {showText && (
        <>
          <line x1="26" y1="74" x2="74" y2="74" stroke={accent} strokeWidth="0.8" />
          <text x="50" y="86" textAnchor="middle" fontSize="7" fontWeight={600} fontFamily={SERIF} letterSpacing="4" fill={NAVY}>
            E·242
          </text>
        </>
      )}
    </svg>
  )
}

// ════════════════════════════════════════════════════════════
// ★ EL HÍBRIDO PEDIDO — sello de A + letras EXACTAS de B + E242
// La T/P son la geometría literal de LogomarkB, escalada con
// transform para caber dentro del anillo-sello de LogomarkA.
// ════════════════════════════════════════════════════════════

/**
 * Las letras exactas de LogomarkB (rect + path idénticos), envueltas
 * en un <g transform> para escalarlas y centrarlas donde haga falta.
 * Bounding box original de B ≈ x:12→89, y:22→78  → centro (50.5, 50).
 */
function ExactTPfromB({ scale, cx = 50, cy = 50, mono = false }: { scale: number; cx?: number; cy?: number; mono?: boolean }) {
  const tColor = mono ? NAVY : GOLD
  const pColor = NAVY
  const tx = cx - 50.5 * scale
  const ty = cy - 50 * scale
  return (
    <g transform={`translate(${tx} ${ty}) scale(${scale})`}>
      <g fill={tColor}>
        <rect x="12" y="22" width="60" height="10" />
        <rect x="37" y="22" width="10" height="56" />
      </g>
      <g fill={pColor}>
        <rect x="55" y="22" width="10" height="56" />
        <path d="M 55 22 h 18 a 16 16 0 0 1 0 32 h -18 v -10 h 14 a 6 6 0 0 0 0 -12 h -14 z" />
      </g>
    </g>
  )
}

// X1 · Doble anillo + 4 puntos (de A) + TP exacto de B + E242 recto pequeño
function LogomarkX1({ size = 80, mono = false }: { size?: number; mono?: boolean }) {
  const stroke = mono ? NAVY : GOLD
  const showText = size >= 40
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden>
      <circle cx="50" cy="50" r="46" fill="none" stroke={stroke} strokeWidth="2" />
      <circle cx="50" cy="50" r="42" fill="none" stroke={stroke} strokeWidth="0.6" />
      <circle cx="50" cy="6" r="1.6" fill={stroke} />
      <circle cx="94" cy="50" r="1.6" fill={stroke} />
      <circle cx="50" cy="94" r="1.6" fill={stroke} />
      <circle cx="6" cy="50" r="1.6" fill={stroke} />
      <ExactTPfromB scale={0.56} cx={50} cy={showText ? 45 : 50} mono={mono} />
      {showText && (
        <text
          x="50"
          y="80"
          textAnchor="middle"
          fontSize="8"
          fontWeight="700"
          fontFamily="'Inter', sans-serif"
          letterSpacing="3"
          fill={stroke}
        >
          E242
        </text>
      )}
    </svg>
  )
}

// X2 · Doble anillo + TP exacto de B + "E·242" curvado en la base (como A)
function LogomarkX2({ size = 80, mono = false }: { size?: number; mono?: boolean }) {
  const stroke = mono ? NAVY : GOLD
  const showText = size >= 44
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden>
      <circle cx="50" cy="50" r="46" fill="none" stroke={stroke} strokeWidth="2" />
      <circle cx="50" cy="50" r="42" fill="none" stroke={stroke} strokeWidth="0.6" />
      <circle cx="50" cy="6" r="1.6" fill={stroke} />
      <circle cx="94" cy="50" r="1.6" fill={stroke} />
      <circle cx="50" cy="94" r="1.6" fill={stroke} />
      <circle cx="6" cy="50" r="1.6" fill={stroke} />
      <ExactTPfromB scale={0.56} cx={50} cy={showText ? 44 : 50} mono={mono} />
      {showText && (
        <>
          <path id="curve-x2" d="M 20 70 a 30 30 0 0 0 60 0" fill="none" />
          <text fontSize="7" fontWeight="700" fill={stroke} fontFamily="'Inter', sans-serif" letterSpacing="3">
            <textPath href="#curve-x2" startOffset="50%" textAnchor="middle">
              E·242
            </textPath>
          </text>
        </>
      )}
    </svg>
  )
}

// X3 · Anillo único fino + TP exacto de B más grande + E242 recto
function LogomarkX3({ size = 80, mono = false }: { size?: number; mono?: boolean }) {
  const stroke = mono ? NAVY : GOLD
  const showText = size >= 40
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden>
      <circle cx="50" cy="50" r="46" fill="none" stroke={stroke} strokeWidth="1.6" />
      <ExactTPfromB scale={0.64} cx={50} cy={showText ? 44 : 50} mono={mono} />
      {showText && (
        <text
          x="50"
          y="82"
          textAnchor="middle"
          fontSize="8.5"
          fontWeight="700"
          fontFamily="'Inter', sans-serif"
          letterSpacing="3"
          fill={stroke}
        >
          E242
        </text>
      )}
    </svg>
  )
}

// ════════════════════════════════════════════════════════════
// SELLOS A+B — marco circular de A con el monograma TP de B
// (la forma de sello de A + las letras geométricas de B)
// ════════════════════════════════════════════════════════════

// SELLO S1 · Doble anillo + 4 puntos cardinales + TP geométrico + BdE·E242 curvado
function LogomarkS1({ size = 80, mono = false }: { size?: number; mono?: boolean }) {
  const stroke = mono ? NAVY : GOLD
  const showText = size >= 44
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden>
      {/* Anillo exterior doble (de A) */}
      <circle cx="50" cy="50" r="46" fill="none" stroke={stroke} strokeWidth="2" />
      <circle cx="50" cy="50" r="42" fill="none" stroke={stroke} strokeWidth="0.6" />
      {/* Cuatro puntos cardinales (de A) */}
      <circle cx="50" cy="6" r="1.6" fill={stroke} />
      <circle cx="94" cy="50" r="1.6" fill={stroke} />
      <circle cx="50" cy="94" r="1.6" fill={stroke} />
      <circle cx="6" cy="50" r="1.6" fill={stroke} />
      {/* Monograma TP geométrico (de B) */}
      <TPMonogram cx={50} cy={showText ? 45 : 50} width={42} height={40} tColor={mono ? NAVY : GOLD} pColor={NAVY} />
      {/* BdE · E242 curvado en la base (de A) */}
      {showText && (
        <>
          <path id="curve-s1" d="M 20 70 a 30 30 0 0 0 60 0" fill="none" />
          <text fontSize="6.5" fontWeight="700" fill={stroke} fontFamily="'Inter', sans-serif" letterSpacing="3">
            <textPath href="#curve-s1" startOffset="50%" textAnchor="middle">
              BdE · E242
            </textPath>
          </text>
        </>
      )}
    </svg>
  )
}

// SELLO S2 · Moneda/medalla: texto curvado arriba y abajo + TP geométrico centro
function LogomarkS2({ size = 80, mono = false }: { size?: number; mono?: boolean }) {
  const stroke = mono ? NAVY : GOLD
  const showText = size >= 56
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden>
      <circle cx="50" cy="50" r="46" fill="none" stroke={stroke} strokeWidth="2" />
      <circle cx="50" cy="50" r="40" fill="none" stroke={stroke} strokeWidth="0.6" />
      {/* Monograma TP geométrico (de B) */}
      <TPMonogram cx={50} cy={50} width={40} height={38} tColor={mono ? NAVY : GOLD} pColor={NAVY} />
      {showText && (
        <>
          {/* Arco superior — TOÑO PALACIOS */}
          <path id="curve-s2-top" d="M 18 50 a 32 32 0 0 1 64 0" fill="none" />
          <text fontSize="6.5" fontWeight="700" fill={stroke} fontFamily="'Inter', sans-serif" letterSpacing="2.5">
            <textPath href="#curve-s2-top" startOffset="50%" textAnchor="middle">
              TOÑO PALACIOS
            </textPath>
          </text>
          {/* Arco inferior — BROKER · E242 */}
          <path id="curve-s2-bot" d="M 18 50 a 32 32 0 0 0 64 0" fill="none" />
          <text fontSize="6.5" fontWeight="700" fill={stroke} fontFamily="'Inter', sans-serif" letterSpacing="2.5">
            <textPath href="#curve-s2-bot" startOffset="50%" textAnchor="middle">
              BROKER · E242
            </textPath>
          </text>
          {/* Estrellitas separadoras a los lados */}
          <text x="11" y="52.5" textAnchor="middle" fontSize="6" fill={stroke} fontWeight="700">✦</text>
          <text x="89" y="52.5" textAnchor="middle" fontSize="6" fill={stroke} fontWeight="700">✦</text>
        </>
      )}
    </svg>
  )
}

// SELLO S3 · Anillo único fino + TP geométrico grande + E·242 recto debajo
function LogomarkS3({ size = 80, mono = false }: { size?: number; mono?: boolean }) {
  const stroke = mono ? NAVY : GOLD
  const showText = size >= 44
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden>
      {/* Un solo anillo elegante */}
      <circle cx="50" cy="50" r="46" fill="none" stroke={stroke} strokeWidth="1.6" />
      {/* Monograma TP geométrico grande (de B) */}
      <TPMonogram cx={50} cy={showText ? 44 : 50} width={48} height={46} tColor={mono ? NAVY : GOLD} pColor={NAVY} />
      {showText && (
        <text
          x="50"
          y="80"
          textAnchor="middle"
          fontSize="9"
          fontWeight="700"
          fontFamily="'Inter', sans-serif"
          letterSpacing="3"
          fill={stroke}
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

const SEALS = [
  {
    letter: 'S1',
    name: 'Sello — doble anillo + TP geométrico + BdE·E242 curvado',
    desc: 'La combinación más directa de lo que pediste: el marco de sello de la A (doble anillo + 4 puntos cardinales + "BdE · E242" curvado en la base) pero con el monograma TP geométrico entrelazado de la B en el centro, en vez del "TP" tipográfico. En favicon se oculta el texto curvado y queda anillo + monograma.',
    Component: LogomarkS1,
  },
  {
    letter: 'S2',
    name: 'Sello — moneda/medalla con texto arriba y abajo',
    desc: 'Tipo moneda conmemorativa o sello notarial completo: "TOÑO PALACIOS" curvado en el arco superior, "BROKER · E242" en el inferior, estrellitas a los lados y el monograma TP geométrico en el centro. El más institucional. Necesita tamaño grande para leerse (se simplifica en favicon).',
    Component: LogomarkS2,
  },
  {
    letter: 'S3',
    name: 'Sello — anillo único fino + TP grande + E·242 recto',
    desc: 'El más limpio de los sellos: un solo aro fino, el monograma TP geométrico grande y protagonista, y "E·242" en texto recto pequeño debajo. Mantiene la forma de sello de A pero con mucho aire. Escala muy bien a tamaños medianos.',
    Component: LogomarkS3,
  },
] as const

const PRO = [
  {
    letter: 'P1',
    name: 'Ligadura TP monolínea — banca privada',
    desc: 'Dibujada a mano (paths vectoriales, no una fuente). El asta vertical la comparten la T y la P: es una ligadura real. Trazo fino uniforme, sin marco. Es la referencia de marca personal de banca privada (Lombard Odier, Pictet). El más bespoke y atemporal.',
    Component: LogomarkP1,
  },
  {
    letter: 'P2',
    name: 'Sello intaglio — microtexto de seguridad',
    desc: 'Anillos concéntricos finos (grabado calcográfico, como un billete o un sello notarial) con microtexto circular real: "ANTONIO PALACIOS CAMBERO · BROKER HIPOTECARIO · Nº E242 BANCO DE ESPAÑA". La credibilidad institucional hecha logo. Necesita tamaño; en favicon se simplifica.',
    Component: LogomarkP2,
  },
  {
    letter: 'P3',
    name: 'Signet — roundel macizo, TP en hueco',
    desc: 'Disco navy sólido con la TP en oro reservada en el hueco y un keyline fino exterior. Estética de anillo de sello / signet (Asprey, Coutts). Máximo contraste, lectura instantánea a cualquier tamaño, impecable como favicon.',
    Component: LogomarkP3,
  },
  {
    letter: 'P4',
    name: 'Logotipo serif — la firma ES el logo',
    desc: 'Para un profesional, muchas veces el nombre bien compuesto es la mejor marca (despachos de abogados, family offices). "Toño Palacios" en serif fino, filete, y bajada "BROKER HIPOTECARIO · Nº E242 BANCO DE ESPAÑA". Sobrio, autoritativo, sin iconografía.',
    Component: LogomarkP4,
  },
  {
    letter: 'P5',
    name: 'Iniciales serif en marco — suizo',
    desc: 'TP en serif fino dentro de un marco doble fino con ticks de esquina arquitectónicos. Estética de banca privada suiza. Ordenado, geométrico pero elegante, con "E·242" integrado.',
    Component: LogomarkP5,
  },
  {
    letter: 'P6',
    name: 'Monograma serif partido por filete',
    desc: 'T y P en serif fino separadas/unidas por un filete vertical, y un filete inferior con "E·242". Heráldico moderno y minimalista, mucho aire.',
    Component: LogomarkP6,
  },
] as const

const XHYBRIDS = [
  {
    letter: 'X1',
    name: 'Letras EXACTAS de B dentro del sello de A + E242',
    desc: 'Exactamente lo que pediste: el círculo-sello del modelo A (doble anillo + 4 puntitos cardinales) con las letras T/P IDÉNTICAS al modelo B (T dorada + P azul entrelazadas, misma geometría exacta) y "E242" en pequeño debajo. En favicon se oculta el E242.',
    Component: LogomarkX1,
  },
  {
    letter: 'X2',
    name: 'Igual que X1 pero con "E·242" curvado en la base',
    desc: 'Mismo concepto que X1 pero el "E·242" va curvado siguiendo el arco inferior del sello, como en el modelo A original. Más "sello oficial".',
    Component: LogomarkX2,
  },
  {
    letter: 'X3',
    name: 'Anillo único fino + letras de B grandes + E242',
    desc: 'Variante más limpia: un solo aro fino (sin doble anillo ni puntitos), las letras de B más grandes y protagonistas, y "E242" debajo. Respira más.',
    Component: LogomarkX3,
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

        {/* ███ DIRECCIÓN PROFESIONAL — MIRAR ESTO PRIMERO ███ */}
        <div style={{ marginBottom: 32, padding: '28px 32px', background: NAVY, borderRadius: 16, border: `2px solid ${GOLD}` }}>
          <p style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: 4, color: GOLD, fontWeight: 700, marginBottom: 8 }}>
            Nueva dirección · banca privada / notarial
          </p>
          <h2 style={{ fontSize: 32, fontWeight: 800, color: PAPER, letterSpacing: '-0.03em', margin: 0 }}>
            Bespoke, no genérico
          </h2>
          <p style={{ marginTop: 12, fontSize: 15, color: PAPER, opacity: 0.78, maxWidth: 760, lineHeight: 1.55 }}>
            Cambio total de enfoque. Fuera bloques rectangulares y estrellitas. Aquí hay
            <strong> seis conceptos distintos</strong> con la referencia estética de la banca
            privada europea (Lombard Odier, Pictet, Coutts) y el sello notarial: ligadura
            monolínea dibujada a mano, microtexto de seguridad, signet macizo, logotipo
            serif. Tipografía serif fina — nada que parezca una plantilla.
          </p>
        </div>

        {PRO.map(({ letter, name, desc, Component }) => (
          <section
            key={letter}
            style={{
              background: '#fff',
              borderRadius: 16,
              padding: 32,
              marginBottom: 32,
              boxShadow: '0 4px 24px rgba(15,27,45,0.06)',
              border: `3px solid ${NAVY}`,
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
            <p style={{ fontSize: 15, color: NAVY, opacity: 0.7, marginBottom: 28, maxWidth: 700, lineHeight: 1.55 }}>
              {desc}
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
              <div style={{ background: PAPER, border: '1px solid #E5E5E5', borderRadius: 8, padding: 24, textAlign: 'center' }}>
                <p style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: 2, color: NAVY, opacity: 0.5, marginBottom: 16 }}>
                  Favicon 32px + 96px + 160px
                </p>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 20 }}>
                  <Component size={32} />
                  <Component size={96} />
                </div>
                <div style={{ marginTop: 16 }}>
                  <Component size={160} />
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
                <div style={{ marginTop: 24 }}>
                  <Component size={96} />
                </div>
              </div>
              <div style={{ background: '#fff', border: '1px solid #E5E5E5', borderRadius: 8, padding: 24, textAlign: 'center' }}>
                <p style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: 2, color: NAVY, opacity: 0.5, marginBottom: 16 }}>
                  Monocromo (papelería / fax)
                </p>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12 }}>
                  <Component size={56} mono />
                  <span style={{ fontFamily: SERIF, fontWeight: 500, fontSize: 30, color: NAVY, lineHeight: 1 }}>
                    Toño Palacios
                  </span>
                </div>
                <p style={{ fontSize: 11, color: NAVY, opacity: 0.6, marginTop: 16, fontFamily: SERIF }}>
                  Antonio Palacios Cambero · Broker hipotecario nº E242 · Presidente ANICI
                </p>
              </div>
              <div style={{ background: GOLD_LIGHT, border: '1px solid #E5E5E5', borderRadius: 8, padding: 24, textAlign: 'center' }}>
                <p style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: 2, color: NAVY, opacity: 0.7, marginBottom: 16 }}>
                  Variante dorada (PDF premium / certificado)
                </p>
                <Component size={120} />
              </div>
            </div>
          </section>
        ))}

        {/* ★ SECCIÓN DESTACADA — EL HÍBRIDO PEDIDO */}
        <div style={{ marginBottom: 32, padding: '24px 28px', background: NAVY, borderRadius: 16 }}>
          <p style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: 3, color: GOLD, fontWeight: 700, marginBottom: 8 }}>
            ★ Lo que pediste — míralo primero
          </p>
          <h2 style={{ fontSize: 30, fontWeight: 800, color: PAPER, letterSpacing: '-0.03em', margin: 0 }}>
            Sello de A + letras EXACTAS de B + E242
          </h2>
          <p style={{ marginTop: 12, fontSize: 15, color: PAPER, opacity: 0.75, maxWidth: 720, lineHeight: 1.5 }}>
            Ahora las letras T/P son la geometría <strong>literal del modelo B</strong> (T
            dorada + P azul entrelazadas, no un dibujo aproximado), metidas dentro del
            <strong> anillo-sello del modelo A</strong>, con "E242" en pequeño. Tres
            variantes según cómo va el anillo y el E242.
          </p>
        </div>

        {XHYBRIDS.map(({ letter, name, desc, Component }) => (
          <section
            key={letter}
            style={{
              background: '#fff',
              borderRadius: 16,
              padding: 32,
              marginBottom: 32,
              boxShadow: '0 4px 24px rgba(15,27,45,0.06)',
              border: `3px solid ${GOLD}`,
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
                  Favicon 32px + 96px + 160px
                </p>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 20 }}>
                  <Component size={32} />
                  <Component size={96} />
                </div>
                <div style={{ marginTop: 16 }}>
                  <Component size={160} />
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
                  <Component size={84} />
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
                  Variante "sello dorado" (PDF premium / certificado)
                </p>
                <Component size={120} />
              </div>
            </div>
          </section>
        ))}

        <p style={{ fontSize: 13, textTransform: 'uppercase', letterSpacing: 3, color: NAVY, opacity: 0.4, fontWeight: 700, marginTop: 56, marginBottom: 20 }}>
          ── Resto de exploraciones (referencia) ──
        </p>

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

        {/* SECCIÓN SELLOS A+B */}
        <div style={{ marginTop: 64, marginBottom: 32, padding: '24px 0', borderTop: `3px solid ${NAVY}`, borderBottom: `3px solid ${NAVY}` }}>
          <p style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: 3, color: NAVY, fontWeight: 700, marginBottom: 8 }}>
            Segunda combinación pedida
          </p>
          <h2 style={{ fontSize: 32, fontWeight: 800, color: NAVY, letterSpacing: '-0.03em', margin: 0 }}>
            Sellos A + B — la forma de sello de A con las letras de B
          </h2>
          <p style={{ marginTop: 12, fontSize: 15, color: NAVY, opacity: 0.7, maxWidth: 720, lineHeight: 1.5 }}>
            Pediste la <strong>forma de sello circular de la A</strong> pero con el
            <strong> monograma TP geométrico entrelazado de la B</strong> (no el "TP"
            tipográfico). Aquí tienes tres densidades distintas del mismo concepto.
          </p>
        </div>

        {SEALS.map(({ letter, name, desc, Component }) => (
          <section
            key={letter}
            style={{
              background: '#fff',
              borderRadius: 16,
              padding: 32,
              marginBottom: 32,
              boxShadow: '0 4px 24px rgba(15,27,45,0.06)',
              border: `2px solid ${NAVY}`,
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
                  background: GOLD,
                  color: NAVY,
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
                  Favicon 32px (simplificado) + 96px (completo)
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
                  <Component size={84} />
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
                  Variante "sello dorado" (PDF premium / certificado)
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
          <p style={{ fontSize: 15, color: NAVY, opacity: 0.8, marginTop: 20, marginBottom: 12, lineHeight: 1.6 }}>
            Y la <strong>segunda combinación</strong> que pediste — forma de sello de A con
            las letras geométricas de B — está en las opciones <strong>S1, S2, S3</strong>:
          </p>
          <ul style={{ fontSize: 14, color: NAVY, opacity: 0.7, lineHeight: 1.8, paddingLeft: 20 }}>
            <li><strong>S1</strong>: doble anillo + 4 puntos + "BdE·E242" curvado. La traducción más fiel de lo que pediste.</li>
            <li><strong>S2</strong>: tipo moneda/medalla, con "TOÑO PALACIOS" arriba y "BROKER·E242" abajo. El más institucional.</li>
            <li><strong>S3</strong>: anillo único fino + TP grande + E·242 recto. El más limpio y moderno.</li>
          </ul>
          <p style={{ marginTop: 24, fontSize: 14, color: NAVY }}>
            Dime <strong>"voy con S1"</strong> (o H1 / H2 / H3 / S2 / S3 / A / B…) y procedo a
            implementarlo en: header, SelloPalacios, favicon, OG images y PDF.
          </p>
        </footer>
      </div>
    </main>
  )
}
