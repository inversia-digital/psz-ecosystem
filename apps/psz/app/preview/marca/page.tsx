import type { Metadata } from 'next'
import { BrandMark, BRAND } from '../../_components/BrandMark'

/**
 * Manual de marca — Toño Palacios. Página interna, NO indexable.
 * Fuente viva: renderiza el componente real BrandMark, nunca capturas.
 */

export const metadata: Metadata = {
  title: 'Manual de marca · Toño Palacios (interno)',
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
}

const NAVY = BRAND.navy
const GOLD = BRAND.gold
const PAPER = '#FAFAF7'
const INK_MUTED = '#6674A6'

function Section({
  n,
  title,
  children,
}: {
  n: string
  title: string
  children: React.ReactNode
}) {
  return (
    <section style={{ marginBottom: 64 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 20 }}>
        <span
          style={{
            fontSize: 13,
            fontWeight: 700,
            color: GOLD,
            letterSpacing: 2,
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          {n}
        </span>
        <h2 style={{ fontSize: 26, fontWeight: 800, color: NAVY, letterSpacing: '-0.02em', margin: 0 }}>
          {title}
        </h2>
      </div>
      {children}
    </section>
  )
}

function Card({
  children,
  bg = '#fff',
  pad = 28,
}: {
  children: React.ReactNode
  bg?: string
  pad?: number
}) {
  return (
    <div
      style={{
        background: bg,
        border: '1px solid #E7E5DE',
        borderRadius: 14,
        padding: pad,
      }}
    >
      {children}
    </div>
  )
}

const Label = ({ children, on = 'light' }: { children: React.ReactNode; on?: 'light' | 'dark' }) => (
  <p
    style={{
      fontSize: 10,
      textTransform: 'uppercase',
      letterSpacing: 2,
      color: on === 'dark' ? 'rgba(255,255,255,0.55)' : INK_MUTED,
      margin: 0,
      marginBottom: 14,
      fontWeight: 600,
    }}
  >
    {children}
  </p>
)

export default function ManualDeMarcaPage() {
  return (
    <div style={{ background: PAPER, minHeight: '100vh', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <div style={{ maxWidth: 980, margin: '0 auto', padding: '64px 28px 120px' }}>
        {/* Portada */}
        <header
          style={{
            background: NAVY,
            borderRadius: 20,
            padding: '56px 48px',
            marginBottom: 64,
            display: 'flex',
            alignItems: 'center',
            gap: 36,
          }}
        >
          <BrandMark size={132} bg="dark" title="Toño Palacios" />
          <div>
            <p
              style={{
                fontSize: 12,
                textTransform: 'uppercase',
                letterSpacing: 4,
                color: GOLD,
                fontWeight: 700,
                margin: 0,
              }}
            >
              Manual de marca
            </p>
            <h1
              style={{
                fontSize: 44,
                fontWeight: 800,
                color: '#fff',
                letterSpacing: '-0.03em',
                margin: '8px 0 12px',
              }}
            >
              Toño Palacios
            </h1>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.75)', margin: 0, lineHeight: 1.5 }}>
              Antonio Palacios Cambero · Broker hipotecario nº E242 (Banco de España) ·
              Presidente de ANICI. Versión 1.0 · documento interno.
            </p>
          </div>
        </header>

        {/* 01 · Arquitectura de marca */}
        <Section n="01" title="Arquitectura de marca">
          <p style={{ fontSize: 16, color: NAVY, lineHeight: 1.65, marginTop: 0, maxWidth: 760 }}>
            Modelo <strong>endosado</strong>, una sola identidad maestra. La autoridad de esta
            marca es <strong>personal y verificable</strong> (registro E242 en Banco de España,
            presidencia de ANICI); por eso todo —web, papelería y herramientas— se firma con el
            mismo símbolo. Fragmentar la marca diluiría esa autoridad.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18, marginTop: 24 }}>
            <Card>
              <Label>Marca maestra (única)</Label>
              <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
                <BrandMark size={68} bg="light" />
                <div>
                  <p style={{ fontSize: 17, fontWeight: 800, color: NAVY, margin: 0 }}>
                    Toño Palacios
                  </p>
                  <p style={{ fontSize: 13, color: INK_MUTED, margin: '4px 0 0' }}>
                    Uso personal + herramientas + papelería
                  </p>
                </div>
              </div>
            </Card>
            <Card>
              <Label>El Sello Palacios — descriptor, no marca aparte</Label>
              <p style={{ fontSize: 13.5, color: NAVY, lineHeight: 1.55, margin: 0 }}>
                Es el <strong>nombre de la garantía</strong> que esta marca imprime sobre las
                herramientas (cálculo firmado, trazable e inalterable). Se expresa con el
                <strong> mismo símbolo</strong> + microcopy. Sólo se escindiría como certificación
                independiente si llega a licenciarse a terceros.
              </p>
            </Card>
          </div>
        </Section>

        {/* 02 · El símbolo */}
        <Section n="02" title="El símbolo">
          <p style={{ fontSize: 16, color: NAVY, lineHeight: 1.65, marginTop: 0, maxWidth: 760 }}>
            Monograma serif <strong>T·P</strong> partido por un filete vertical. Las letras están
            trazadas como <strong>vectores</strong> (no texto en una fuente): se reproduce idéntico
            en pantalla, favicon, redes sociales, impresión y PDF, sin depender de tipografías
            instaladas. Filete inferior + <strong>Nº E242</strong> es la “firma registral”.
          </p>
          <Card pad={36}>
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'space-around',
                gap: 24,
                flexWrap: 'wrap',
              }}
            >
              {[40, 64, 96, 160].map((s) => (
                <div key={s} style={{ textAlign: 'center' }}>
                  <BrandMark size={s} bg="light" />
                  <p style={{ fontSize: 11, color: INK_MUTED, marginTop: 10 }}>{s}px</p>
                </div>
              ))}
              <div style={{ textAlign: 'center' }}>
                <BrandMark size={32} bg="light" registry={false} />
                <p style={{ fontSize: 11, color: INK_MUTED, marginTop: 10 }}>
                  32px · sin firma
                </p>
              </div>
            </div>
          </Card>
          <p style={{ fontSize: 13.5, color: INK_MUTED, marginTop: 14, lineHeight: 1.5 }}>
            Por debajo de 40 px se omite “Nº E242” por legibilidad: queda sólo el monograma. El
            componente lo hace automáticamente; puede forzarse con la prop <code>registry</code>.
          </p>
        </Section>

        {/* 03 · Color sobre fondo */}
        <Section n="03" title="Comportamiento del color sobre fondo">
          <p style={{ fontSize: 16, color: NAVY, lineHeight: 1.65, marginTop: 0, maxWidth: 760 }}>
            Regla única: <strong>la letra cuyo color choca con el fondo pasa a blanco</strong>, de
            modo que <strong>siempre hay dos tonos legibles</strong>. Nunca hay una letra invisible.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18 }}>
            <Card bg={PAPER}>
              <Label>Fondo claro · base</Label>
              <div style={{ textAlign: 'center', padding: '12px 0' }}>
                <BrandMark size={120} bg="light" />
              </div>
              <p style={{ fontSize: 12.5, color: NAVY, margin: 0, textAlign: 'center' }}>
                T navy · P oro · filete oro
              </p>
            </Card>
            <Card bg={NAVY}>
              <Label on="dark">Fondo navy</Label>
              <div style={{ textAlign: 'center', padding: '12px 0' }}>
                <BrandMark size={120} bg="dark" />
              </div>
              <p
                style={{
                  fontSize: 12.5,
                  color: 'rgba(255,255,255,0.85)',
                  margin: 0,
                  textAlign: 'center',
                }}
              >
                T <strong style={{ color: '#fff' }}>blanca</strong> · P oro
              </p>
            </Card>
            <Card bg={GOLD}>
              <Label>Fondo oro</Label>
              <div style={{ textAlign: 'center', padding: '12px 0' }}>
                <BrandMark size={120} bg="gold" />
              </div>
              <p style={{ fontSize: 12.5, color: NAVY, margin: 0, textAlign: 'center' }}>
                T navy · P <strong>blanca</strong> · filete navy
              </p>
            </Card>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18, marginTop: 18 }}>
            <Card>
              <Label>Monocromo positivo (papelería, sello de tinta)</Label>
              <div style={{ textAlign: 'center', padding: '8px 0' }}>
                <BrandMark size={84} mono />
              </div>
            </Card>
            <Card bg={NAVY}>
              <Label on="dark">Monocromo invertido</Label>
              <div style={{ textAlign: 'center', padding: '8px 0' }}>
                <BrandMark size={84} mono inverse />
              </div>
            </Card>
          </div>
        </Section>

        {/* 04 · Sistema de color */}
        <Section n="04" title="Sistema de color">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18 }}>
            {[
              { name: 'Navy', hex: NAVY, token: 'navy.800 / ink', use: 'Base, autoridad, texto' },
              { name: 'Oro', hex: GOLD, token: 'gold.400', use: 'Acento, distinción' },
              { name: 'Papel', hex: PAPER, token: 'paper', use: 'Fondo modo claro' },
            ].map((c) => (
              <Card key={c.name} pad={0}>
                <div style={{ height: 96, background: c.hex, borderRadius: '13px 13px 0 0' }} />
                <div style={{ padding: 18 }}>
                  <p style={{ fontSize: 15, fontWeight: 800, color: NAVY, margin: 0 }}>{c.name}</p>
                  <p
                    style={{
                      fontSize: 13,
                      color: INK_MUTED,
                      margin: '4px 0 0',
                      fontFamily: 'ui-monospace, monospace',
                    }}
                  >
                    {c.hex} · {c.token}
                  </p>
                  <p style={{ fontSize: 12.5, color: NAVY, margin: '8px 0 0' }}>{c.use}</p>
                </div>
              </Card>
            ))}
          </div>
        </Section>

        {/* 05 · Tipografía */}
        <Section n="05" title="Tipografía">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
            <Card>
              <Label>Logotipo (símbolo)</Label>
              <p style={{ fontSize: 28, fontWeight: 800, color: NAVY, margin: 0, letterSpacing: '-0.02em' }}>
                Serif vectorizado
              </p>
              <p style={{ fontSize: 13.5, color: NAVY, marginTop: 10, lineHeight: 1.55 }}>
                El monograma T·P es un trazado propio. No se reescribe con una fuente: se usa
                siempre el componente o los SVG entregados.
              </p>
            </Card>
            <Card>
              <Label>Tipografía de sistema (UI, textos, “Nº E242”)</Label>
              <p style={{ fontSize: 28, fontWeight: 800, color: NAVY, margin: 0, letterSpacing: '-0.02em' }}>
                Inter
              </p>
              <p style={{ fontSize: 13.5, color: NAVY, marginTop: 10, lineHeight: 1.55 }}>
                Pesos 400 / 600 / 700 / 800. El nombre “Toño Palacios” acompaña al símbolo en
                Inter 700–800, tracking ajustado. La firma “Nº E242” en Inter 600, tracking 4.
              </p>
            </Card>
          </div>
        </Section>

        {/* 06 · Aplicaciones */}
        <Section n="06" title="Aplicaciones reales">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
            <Card bg={NAVY}>
              <Label on="dark">Cabecera del sitio</Label>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <BrandMark size={38} bg="dark" registry={false} title={null} />
                <span style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.05 }}>
                  <span style={{ fontWeight: 800, fontSize: 19, color: '#fff' }}>
                    <span style={{ color: GOLD }}>Toño</span> Palacios
                  </span>
                  <span
                    style={{
                      fontSize: 10,
                      textTransform: 'uppercase',
                      letterSpacing: 3,
                      color: 'rgba(255,255,255,0.55)',
                      marginTop: 3,
                    }}
                  >
                    Broker hipotecario · Nº E242
                  </span>
                </span>
              </div>
            </Card>
            <Card>
              <Label>Favicon (sobre navy, sin firma)</Label>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                {[16, 32, 48].map((s) => (
                  <div
                    key={s}
                    style={{
                      width: s,
                      height: s,
                      background: NAVY,
                      borderRadius: 6,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <BrandMark size={Math.round(s * 0.78)} bg="dark" registry={false} title={null} />
                  </div>
                ))}
                <span style={{ fontSize: 12.5, color: INK_MUTED }}>16 / 32 / 48 px</span>
              </div>
            </Card>
            <Card bg="linear-gradient(135deg,#0F1B3D 0%,#1A2D4A 100%)">
              <Label on="dark">Open Graph / redes</Label>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <BrandMark size={56} bg="dark" registry={false} title={null} />
                <div>
                  <p style={{ fontSize: 16, fontWeight: 700, color: '#fff', margin: 0 }}>
                    Toño Palacios
                  </p>
                  <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', margin: '2px 0 0' }}>
                    Broker hipotecario nº E242 · Presidente de ANICI
                  </p>
                </div>
              </div>
            </Card>
            <Card>
              <Label>Sello en herramientas (modelo endosado)</Label>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                  border: `1px solid ${GOLD}`,
                  background: '#FAF6EC',
                  borderRadius: 10,
                  padding: 14,
                }}
              >
                <BrandMark size={44} bg="light" title={null} />
                <div>
                  <p style={{ fontSize: 12, fontWeight: 800, color: NAVY, margin: 0, textTransform: 'uppercase', letterSpacing: 1 }}>
                    El Sello Palacios
                  </p>
                  <p style={{ fontSize: 11.5, color: '#5b5440', margin: '3px 0 0', lineHeight: 1.4 }}>
                    Cálculo firmado, trazable e inalterable por Antonio Palacios Cambero.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </Section>

        {/* 07 · Usos correctos / incorrectos */}
        <Section n="07" title="Usos — correcto e incorrecto">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
            <Card>
              <p style={{ fontSize: 13, fontWeight: 800, color: '#1D7A4D', margin: '0 0 14px' }}>
                ✓ SIEMPRE
              </p>
              <ul style={{ margin: 0, paddingLeft: 18, color: NAVY, fontSize: 13.5, lineHeight: 1.9 }}>
                <li>Usar el componente <code>BrandMark</code> o los SVG entregados.</li>
                <li>Respetar la regla de color sobre fondo (dos tonos legibles).</li>
                <li>Área de respeto ≥ 25% del lado del símbolo, libre de elementos.</li>
                <li>El mismo símbolo para marca personal y para “El Sello Palacios”.</li>
              </ul>
            </Card>
            <Card>
              <p style={{ fontSize: 13, fontWeight: 800, color: '#C41E3A', margin: '0 0 14px' }}>
                ✕ NUNCA
              </p>
              <ul style={{ margin: 0, paddingLeft: 18, color: NAVY, fontSize: 13.5, lineHeight: 1.9 }}>
                <li>Rehacer la T·P con una fuente serif cualquiera.</li>
                <li>Deformar, rotar, añadir sombras o degradados al símbolo.</li>
                <li>Recolorear fuera de la paleta (navy / oro / blanco).</li>
                <li>Crear una identidad visual separada para “El Sello Palacios”.</li>
                <li>Dejar una letra del mismo color que el fondo (invisible).</li>
              </ul>
            </Card>
          </div>
        </Section>

        {/* 08 · Entrega técnica */}
        <Section n="08" title="Entrega técnica">
          <Card>
            <ul style={{ margin: 0, paddingLeft: 18, color: NAVY, fontSize: 13.5, lineHeight: 2 }}>
              <li>
                Fuente única: <code>app/_components/BrandMark.tsx</code> — componente React +
                <code> brandMarkSvg()</code> + <code>brandMarkDataUri()</code>.
              </li>
              <li>Favicon / Apple icon: <code>app/icon.tsx</code> · <code>app/apple-icon.tsx</code> (generados).</li>
              <li>Open Graph: las 5 herramientas inyectan el símbolo vía data-URI.</li>
              <li>PDF: <code>RoiPdfDocument.tsx</code> reproduce los mismos trazados con primitivas @react-pdf.</li>
              <li>Documento portable: <code>docs/MANUAL-DE-MARCA.md</code>.</li>
            </ul>
          </Card>
          <p style={{ fontSize: 12, color: INK_MUTED, marginTop: 28, textAlign: 'center' }}>
            Documento interno · no indexable · © Inversia Global Digital S.L.U.
          </p>
        </Section>
      </div>
    </div>
  )
}
