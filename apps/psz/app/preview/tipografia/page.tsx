import type { Metadata } from 'next'
import {
  Playfair_Display,
  Lora,
  EB_Garamond,
  Cormorant_Garamond,
  Gelasio,
  PT_Serif,
} from 'next/font/google'

/**
 * Página interna NO indexable: elegir la tipografía del logotipo P6.
 * Mismo monograma exacto, 6 fuentes empaquetadas, lado a lado.
 */

export const metadata: Metadata = {
  title: 'Preview · Tipografía del logo (interno)',
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
}

const playfair = Playfair_Display({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--f-playfair' })
const lora = Lora({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--f-lora' })
const ebgaramond = EB_Garamond({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--f-ebg' })
const cormorant = Cormorant_Garamond({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--f-cormorant' })
const gelasio = Gelasio({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--f-gelasio' })
const ptserif = PT_Serif({ subsets: ['latin'], weight: ['400', '700'], variable: '--f-ptserif' })

const NAVY = '#0F1B2D'
const GOLD = '#C8A852'
const PAPER = '#FAFAF7'

const FONTS = [
  { id: 1, name: 'Playfair Display', css: 'var(--f-playfair), Georgia, serif', note: 'Didone de alto contraste. Lujo editorial, muy elegante.' },
  { id: 2, name: 'Lora', css: 'var(--f-lora), Georgia, serif', note: 'Serif equilibrada y legible. Ya es token del design-system.' },
  { id: 3, name: 'EB Garamond', css: 'var(--f-ebg), Georgia, serif', note: 'Garamond clásica, humanista, sobria.' },
  { id: 4, name: 'Cormorant Garamond', css: 'var(--f-cormorant), Georgia, serif', note: 'Garamond fina y estilizada (la que probamos antes).' },
  { id: 5, name: 'Gelasio', css: 'var(--f-gelasio), Georgia, serif', note: 'Métricamente IDÉNTICA a Georgia (tu imagen 2).' },
  { id: 6, name: 'PT Serif', css: 'var(--f-ptserif), Georgia, serif', note: 'Serif de transición, sólida y neutra.' },
] as const

function P6({ font, dark = false }: { font: string; dark?: boolean }) {
  const t = dark ? '#FFFFFF' : NAVY
  const p = GOLD
  const rule = GOLD
  return (
    <svg width={150} height={150} viewBox="0 0 100 100" aria-hidden>
      <line x1="50" y1="20" x2="50" y2="62" stroke={rule} strokeWidth="0.8" />
      <text x="44" y="56" textAnchor="end" fontSize="40" fontWeight={500} fill={t} style={{ fontFamily: font }}>
        T
      </text>
      <text x="56" y="56" textAnchor="start" fontSize="40" fontWeight={500} fill={p} style={{ fontFamily: font }}>
        P
      </text>
      <line x1="26" y1="74" x2="74" y2="74" stroke={rule} strokeWidth="0.8" />
      <text
        x="50"
        y="86"
        textAnchor="middle"
        fontSize="7"
        fontWeight={600}
        letterSpacing="4"
        fill={t}
        style={{ fontFamily: font }}
      >
        E·242
      </text>
    </svg>
  )
}

export default function TipografiaPage() {
  const cls = `${playfair.variable} ${lora.variable} ${ebgaramond.variable} ${cormorant.variable} ${gelasio.variable} ${ptserif.variable}`
  return (
    <div className={cls} style={{ background: PAPER, minHeight: '100vh', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '56px 24px 120px' }}>
        <h1 style={{ fontSize: 30, fontWeight: 800, color: NAVY, margin: 0 }}>
          Elige la tipografía del logo
        </h1>
        <p style={{ fontSize: 15, color: '#5b6472', marginTop: 10, marginBottom: 40, lineHeight: 1.6 }}>
          El monograma P6 es exactamente el mismo en todas. Solo cambia la tipografía.
          Dime el <strong>número</strong> de la que quieres y la dejo fija en toda la marca
          (web, favicon, redes, PDF), idéntica en todos los dispositivos.
        </p>

        {FONTS.map((f) => (
          <div
            key={f.id}
            style={{
              display: 'grid',
              gridTemplateColumns: '46px 1fr 1fr',
              alignItems: 'center',
              gap: 20,
              background: '#fff',
              border: '1px solid #E7E5DE',
              borderRadius: 14,
              padding: 20,
              marginBottom: 16,
            }}
          >
            <div style={{ fontSize: 26, fontWeight: 800, color: GOLD, textAlign: 'center' }}>
              {f.id}
            </div>
            <div>
              <p style={{ fontSize: 17, fontWeight: 700, color: NAVY, margin: 0 }}>{f.name}</p>
              <p style={{ fontSize: 13, color: '#5b6472', margin: '6px 0 0', lineHeight: 1.5 }}>
                {f.note}
              </p>
              <div style={{ marginTop: 14 }}>
                <P6 font={f.css} />
              </div>
            </div>
            <div
              style={{
                background: NAVY,
                borderRadius: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '18px 0',
              }}
            >
              <P6 font={f.css} dark />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
