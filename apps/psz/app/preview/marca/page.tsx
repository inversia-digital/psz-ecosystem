import type { Metadata } from 'next'
import { BrandMark, BRAND, brandMarkDataUri } from '../../_components/BrandMark'

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
    <div style={{ background: bg, border: '1px solid #E7E5DE', borderRadius: 14, padding: pad }}>
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

const P = ({ children }: { children: React.ReactNode }) => (
  <p style={{ fontSize: 15, color: NAVY, lineHeight: 1.65, margin: '0 0 14px', maxWidth: 760 }}>
    {children}
  </p>
)

function DoDont({ ok, items }: { ok: boolean; items: string[] }) {
  return (
    <Card>
      <p style={{ fontSize: 13, fontWeight: 800, color: ok ? '#1D7A4D' : '#C41E3A', margin: '0 0 14px' }}>
        {ok ? '✓ SIEMPRE' : '✕ NUNCA'}
      </p>
      <ul style={{ margin: 0, paddingLeft: 18, color: NAVY, fontSize: 13.5, lineHeight: 1.9 }}>
        {items.map((t, i) => (
          <li key={i} dangerouslySetInnerHTML={{ __html: t }} />
        ))}
      </ul>
    </Card>
  )
}

export default function ManualDeMarcaPage() {
  // Assets descargables (SVG reales generados por el componente)
  const downloads = [
    { label: 'Color · fondo claro', uri: brandMarkDataUri({ size: 512, bg: 'light' }), file: 'tp-color-claro.svg' },
    { label: 'Color · fondo navy', uri: brandMarkDataUri({ size: 512, bg: 'dark' }), file: 'tp-color-navy.svg' },
    { label: 'Color · fondo oro', uri: brandMarkDataUri({ size: 512, bg: 'gold' }), file: 'tp-color-oro.svg' },
    { label: 'Monocromo navy', uri: brandMarkDataUri({ size: 512, mono: true }), file: 'tp-mono-navy.svg' },
    { label: 'Monocromo blanco', uri: brandMarkDataUri({ size: 512, mono: true, inverse: true }), file: 'tp-mono-blanco.svg' },
    { label: 'Favicon (sin firma)', uri: brandMarkDataUri({ size: 256, bg: 'dark', registry: false }), file: 'tp-favicon.svg' },
  ]

  return (
    <div style={{ background: PAPER, minHeight: '100vh', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <div style={{ maxWidth: 980, margin: '0 auto', padding: '64px 28px 120px' }}>
        {/* Portada */}
        <header
          style={{
            background: NAVY,
            borderRadius: 20,
            padding: '56px 48px',
            marginBottom: 56,
            display: 'flex',
            alignItems: 'center',
            gap: 36,
          }}
        >
          <BrandMark size={132} bg="dark" title="Toño Palacios" />
          <div>
            <p style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: 4, color: GOLD, fontWeight: 700, margin: 0 }}>
              Manual de marca
            </p>
            <h1 style={{ fontSize: 44, fontWeight: 800, color: '#fff', letterSpacing: '-0.03em', margin: '8px 0 12px' }}>
              Toño Palacios
            </h1>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.75)', margin: 0, lineHeight: 1.5 }}>
              Antonio Palacios Cambero · Broker hipotecario nº E242 (Banco de España) ·
              Presidente de ANICI. Versión 2.0 · documento interno.
            </p>
          </div>
        </header>

        {/* Índice */}
        <Card pad={24}>
          <Label>Contenido</Label>
          <ol style={{ margin: 0, paddingLeft: 20, color: NAVY, fontSize: 14, lineHeight: 1.95, columns: 2 }}>
            <li>Arquitectura de marca</li>
            <li>El símbolo</li>
            <li>Especificaciones del símbolo</li>
            <li>Color sobre fondo</li>
            <li>Sistema de color</li>
            <li>Accesibilidad y contraste</li>
            <li>Tipografía</li>
            <li>Identidad verbal — tono de voz</li>
            <li>Nombre y credenciales</li>
            <li>Aplicaciones</li>
            <li>Papelería y firma de email</li>
            <li>Usos correcto e incorrecto</li>
            <li>Assets descargables</li>
            <li>Entrega técnica y gobernanza</li>
          </ol>
        </Card>

        <div style={{ height: 56 }} />

        {/* 01 */}
        <Section n="01" title="Arquitectura de marca">
          <P>
            Modelo <strong>endosado</strong>, una sola identidad maestra. La autoridad de esta
            marca es <strong>personal y verificable</strong> (registro E242 en Banco de España,
            presidencia de ANICI); por eso todo —web, papelería y herramientas— se firma con el
            mismo símbolo. Fragmentar la marca diluiría esa autoridad.
          </P>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
            <Card>
              <Label>Marca maestra (única)</Label>
              <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
                <BrandMark size={68} bg="light" />
                <div>
                  <p style={{ fontSize: 17, fontWeight: 800, color: NAVY, margin: 0 }}>Toño Palacios</p>
                  <p style={{ fontSize: 13, color: INK_MUTED, margin: '4px 0 0' }}>
                    Personal + herramientas + papelería
                  </p>
                </div>
              </div>
            </Card>
            <Card>
              <Label>El Sello Palacios — descriptor, no marca aparte</Label>
              <p style={{ fontSize: 13.5, color: NAVY, lineHeight: 1.55, margin: 0 }}>
                Es el <strong>nombre de la garantía</strong> que esta marca imprime sobre las
                herramientas (cálculo firmado, trazable e inalterable). Mismo símbolo + microcopy.
                Sólo se escindiría si se licencia a terceros.
              </p>
            </Card>
          </div>
        </Section>

        {/* 02 */}
        <Section n="02" title="El símbolo">
          <P>
            Monograma serif <strong>T·P</strong> partido por un filete vertical, con filete
            inferior y firma registral <strong>Nº E242</strong>. Se renderiza desde un único
            componente, idéntico en pantalla, favicon, redes y PDF.
          </P>
          <Card pad={44}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <BrandMark size={220} bg="light" />
            </div>
            <p style={{ fontSize: 12, color: INK_MUTED, marginTop: 16, textAlign: 'center' }}>
              Marca completa (con firma registral)
            </p>
          </Card>
        </Section>

        {/* 03 — NUEVO: Especificaciones */}
        <Section n="03" title="Especificaciones del símbolo">
          <P>
            Reglas no negociables de implantación. El símbolo necesita aire y un tamaño
            mínimo para conservar su autoridad.
          </P>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
            {/* Área de respeto */}
            <Card>
              <Label>Área de respeto</Label>
              <div
                style={{
                  position: 'relative',
                  display: 'inline-block',
                  border: `1px dashed ${GOLD}`,
                  padding: 36,
                  background: PAPER,
                  borderRadius: 6,
                }}
              >
                <div style={{ border: '1px dashed rgba(102,116,166,0.4)' }}>
                  <BrandMark size={120} bg="light" />
                </div>
              </div>
              <p style={{ fontSize: 13, color: NAVY, marginTop: 14, lineHeight: 1.5 }}>
                Margen libre mínimo = <strong>la altura del filete vertical</strong> (≈ 25 % del
                lado) en los 4 lados. Ningún texto, imagen o borde dentro de esa zona.
              </p>
            </Card>

            {/* Tamaño mínimo */}
            <Card>
              <Label>Tamaño mínimo</Label>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 28, justifyContent: 'center', paddingTop: 8 }}>
                <div style={{ textAlign: 'center' }}>
                  <BrandMark size={72} bg="light" />
                  <p style={{ fontSize: 11, color: INK_MUTED, marginTop: 8 }}>72 px · mín. con firma</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <BrandMark size={24} bg="light" registry={false} />
                  <p style={{ fontSize: 11, color: INK_MUTED, marginTop: 8 }}>24 px · mín. sin firma</p>
                </div>
              </div>
              <p style={{ fontSize: 13, color: NAVY, marginTop: 18, lineHeight: 1.5 }}>
                Con “Nº E242”: nunca por debajo de <strong>72 px / 19 mm</strong>. Sin firma
                (favicon, sellos pequeños): nunca por debajo de <strong>24 px</strong>.
              </p>
            </Card>
          </div>

          {/* Retícula de construcción */}
          <div style={{ marginTop: 18 }}>
            <Card>
              <Label>Retícula de construcción (viewBox 100 × 100)</Label>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{ position: 'relative', width: 240, height: 240 }}>
                  <svg
                    width={240}
                    height={240}
                    viewBox="0 0 100 100"
                    style={{ position: 'absolute', inset: 0 }}
                    aria-hidden
                  >
                    {Array.from({ length: 11 }).map((_, i) => (
                      <g key={i} stroke="rgba(102,116,166,0.25)" strokeWidth="0.3">
                        <line x1={i * 10} y1="0" x2={i * 10} y2="100" />
                        <line x1="0" y1={i * 10} x2="100" y2={i * 10} />
                      </g>
                    ))}
                    <line x1="50" y1="0" x2="50" y2="100" stroke="rgba(200,168,82,0.5)" strokeWidth="0.5" />
                  </svg>
                  <div style={{ position: 'absolute', inset: 0 }}>
                    <BrandMark size={240} bg="light" />
                  </div>
                </div>
              </div>
              <p style={{ fontSize: 13, color: NAVY, marginTop: 14, lineHeight: 1.55 }}>
                Coordenadas exactas (no aproximar): eje del filete <code>x=50</code>; T/P línea
                base <code>y=67</code>, cuerpo 40; filete vertical <code>y 31→70</code>; filete
                horizontal <code>y=74</code> (x 26→74); firma <code>y=86</code>, cuerpo 7,
                tracking 4. Estos valores los garantiza el componente <code>BrandMark</code>.
              </p>
            </Card>
          </div>

          {/* Lockups oficiales */}
          <div style={{ marginTop: 18 }}>
            <Card bg={NAVY}>
              <Label on="dark">Lockups oficiales (los únicos válidos)</Label>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: 24,
                  alignItems: 'center',
                }}
              >
                <div style={{ textAlign: 'center' }}>
                  <BrandMark size={84} bg="dark" registry={false} title={null} />
                  <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', marginTop: 12 }}>
                    A · Símbolo solo
                  </p>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
                    <BrandMark size={44} bg="dark" registry={false} title={null} />
                    <span style={{ fontWeight: 800, fontSize: 18, color: '#fff' }}>
                      <span style={{ color: GOLD }}>Toño</span> Palacios
                    </span>
                  </div>
                  <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', marginTop: 12 }}>
                    B · Símbolo + nombre
                  </p>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
                    <BrandMark size={44} bg="dark" registry={false} title={null} />
                    <span style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.15, textAlign: 'left' }}>
                      <span style={{ fontWeight: 800, fontSize: 16, color: '#fff' }}>
                        <span style={{ color: GOLD }}>Toño</span> Palacios
                      </span>
                      <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.6)', letterSpacing: 1 }}>
                        BROKER HIPOTECARIO · Nº E242
                      </span>
                    </span>
                  </div>
                  <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', marginTop: 12 }}>
                    C · Símbolo + nombre + cargo
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </Section>

        {/* 04 — Color sobre fondo */}
        <Section n="04" title="Comportamiento del color sobre fondo">
          <P>
            Regla única: <strong>la letra cuyo color choca con el fondo pasa a blanco</strong>,
            de modo que <strong>siempre hay dos tonos legibles</strong>. Nunca una letra invisible.
          </P>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18 }}>
            <Card bg={PAPER}>
              <Label>Fondo claro · base</Label>
              <div style={{ textAlign: 'center', padding: '12px 0' }}>
                <BrandMark size={120} bg="light" />
              </div>
              <p style={{ fontSize: 12.5, color: NAVY, margin: 0, textAlign: 'center' }}>
                T navy · P oro · filetes oro
              </p>
            </Card>
            <Card bg={NAVY}>
              <Label on="dark">Fondo navy</Label>
              <div style={{ textAlign: 'center', padding: '12px 0' }}>
                <BrandMark size={120} bg="dark" />
              </div>
              <p style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.85)', margin: 0, textAlign: 'center' }}>
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

        {/* 05 — Sistema de color */}
        <Section n="05" title="Sistema de color">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18 }}>
            {[
              { name: 'Navy', hex: NAVY, token: 'navy / ink', use: 'Base, autoridad, texto' },
              { name: 'Oro', hex: GOLD, token: 'gold accent', use: 'Acento, distinción' },
              { name: 'Papel', hex: PAPER, token: 'paper', use: 'Fondo modo claro' },
            ].map((c) => (
              <Card key={c.name} pad={0}>
                <div style={{ height: 96, background: c.hex, borderRadius: '13px 13px 0 0' }} />
                <div style={{ padding: 18 }}>
                  <p style={{ fontSize: 15, fontWeight: 800, color: NAVY, margin: 0 }}>{c.name}</p>
                  <p style={{ fontSize: 13, color: INK_MUTED, margin: '4px 0 0', fontFamily: 'ui-monospace, monospace' }}>
                    {c.hex} · {c.token}
                  </p>
                  <p style={{ fontSize: 12.5, color: NAVY, margin: '8px 0 0' }}>{c.use}</p>
                </div>
              </Card>
            ))}
          </div>
        </Section>

        {/* 06 — NUEVO: Accesibilidad */}
        <Section n="06" title="Accesibilidad y contraste">
          <P>
            Ratios de contraste medidos (WCAG 2.1). <strong>El oro NO es un color de texto sobre
            blanco</strong>: solo filetes y elementos gráficos. Para texto, navy o blanco.
          </P>
          <Card pad={0}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13.5 }}>
              <thead>
                <tr style={{ background: PAPER, textAlign: 'left' }}>
                  {['Combinación', 'Ratio', 'WCAG', 'Uso permitido'].map((h) => (
                    <th key={h} style={{ padding: '12px 16px', color: NAVY, fontWeight: 700 }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ['Navy sobre blanco / papel', '17,3:1', 'AAA', 'Texto, todo'],
                  ['Blanco sobre navy', '17,3:1', 'AAA', 'Texto, todo'],
                  ['Navy sobre oro', '7,6:1', 'AAA', 'Texto, botones'],
                  ['Oro sobre navy', '7,6:1', 'AA / AAA grande', 'Texto destacado, acentos'],
                  ['Oro sobre blanco', '2,3:1', '✕ FALLA', 'Solo filetes / decoración'],
                ].map((r, i) => (
                  <tr key={i} style={{ borderTop: '1px solid #EFEDE6' }}>
                    <td style={{ padding: '12px 16px', color: NAVY }}>{r[0]}</td>
                    <td style={{ padding: '12px 16px', color: NAVY, fontFamily: 'ui-monospace, monospace' }}>
                      {r[1]}
                    </td>
                    <td
                      style={{
                        padding: '12px 16px',
                        fontWeight: 700,
                        color: (r[2] ?? '').includes('FALLA') ? '#C41E3A' : '#1D7A4D',
                      }}
                    >
                      {r[2]}
                    </td>
                    <td style={{ padding: '12px 16px', color: NAVY }}>{r[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </Section>

        {/* 07 — Tipografía */}
        <Section n="07" title="Tipografía">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
            <Card>
              <Label>Logotipo (símbolo)</Label>
              <p style={{ fontSize: 28, fontWeight: 800, color: NAVY, margin: 0, letterSpacing: '-0.02em' }}>
                Gelasio
              </p>
              <p style={{ fontSize: 13.5, color: NAVY, marginTop: 10, lineHeight: 1.55 }}>
                Serif idéntica a Georgia, empaquetada con la web → idéntica en todos los
                dispositivos. Cuerpo 40, peso 500. Solo dentro del componente <code>BrandMark</code>.
              </p>
            </Card>
            <Card>
              <Label>Tipografía de sistema (UI, textos, “Nº E242”)</Label>
              <p style={{ fontSize: 28, fontWeight: 800, color: NAVY, margin: 0, letterSpacing: '-0.02em' }}>
                Inter
              </p>
              <p style={{ fontSize: 13.5, color: NAVY, marginTop: 10, lineHeight: 1.55 }}>
                Pesos 400 / 600 / 700 / 800. Nombre “Toño Palacios” en Inter 700–800; firma
                “Nº E242” en serif del logo, tracking 4.
              </p>
            </Card>
          </div>
          <Card>
            <Label>Escala tipográfica para documentos</Label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <span style={{ fontSize: 30, fontWeight: 800, color: NAVY }}>H1 · 30/800 · titulares</span>
              <span style={{ fontSize: 22, fontWeight: 700, color: NAVY }}>H2 · 22/700 · secciones</span>
              <span style={{ fontSize: 16, fontWeight: 600, color: NAVY }}>H3 · 16/600 · subsecciones</span>
              <span style={{ fontSize: 15, fontWeight: 400, color: NAVY }}>Cuerpo · 15/400 · interlineado 1,6</span>
              <span style={{ fontSize: 12, fontWeight: 600, color: INK_MUTED, letterSpacing: 2 }}>
                ETIQUETA · 12/600 · MAYÚSCULAS TRACKING 2
              </span>
            </div>
          </Card>
        </Section>

        {/* 08 — NUEVO: Identidad verbal */}
        <Section n="08" title="Identidad verbal — tono de voz">
          <P>
            La marca habla con <strong>autoridad sin estridencia</strong>. Tono de un profesional
            que sabe, no de un vendedor que promete. La credibilidad se demuestra con datos y
            credenciales verificables, no con superlativos.
          </P>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
            <Card>
              <Label>Principios</Label>
              <ul style={{ margin: 0, paddingLeft: 18, color: NAVY, fontSize: 13.5, lineHeight: 1.85 }}>
                <li><strong>Claro antes que técnico.</strong> Explica, no deslumbra.</li>
                <li><strong>Autoridad, no estatus.</strong> Se citan credenciales (E242, ANICI), no lujo.</li>
                <li><strong>Académico sin presumir.</strong> Formación y rigor implícitos, nunca los títulos por delante.</li>
                <li><strong>Sin promesas de rentabilidad</strong> ni urgencias artificiales.</li>
                <li><strong>Honesto con el riesgo.</strong> Si algo no conviene al cliente, se dice.</li>
              </ul>
            </Card>
            <div style={{ display: 'grid', gap: 18 }}>
              <Card>
                <p style={{ fontSize: 12, fontWeight: 800, color: '#1D7A4D', margin: '0 0 8px' }}>✓ SÍ</p>
                <p style={{ fontSize: 13.5, color: NAVY, margin: 0, lineHeight: 1.5 }}>
                  “Broker hipotecario registrado en Banco de España (nº E242). Te explico qué te
                  conviene y por qué, con números.”
                </p>
              </Card>
              <Card>
                <p style={{ fontSize: 12, fontWeight: 800, color: '#C41E3A', margin: '0 0 8px' }}>✕ NO</p>
                <p style={{ fontSize: 13.5, color: NAVY, margin: 0, lineHeight: 1.5 }}>
                  “El MEJOR broker. Hipotecas GARANTIZADAS al instante. ¡No esperes más!”
                </p>
              </Card>
            </div>
          </div>
        </Section>

        {/* 09 — NUEVO: Nombre y credenciales */}
        <Section n="09" title="Nombre y credenciales">
          <P>
            Crítico. El uso correcto del nombre y las credenciales <strong>protege la autoridad
            regulatoria</strong> y evita confusión con homónimos (existe un chef “Toño Palacio”
            sin “s”; nunca debe mezclarse). Coherencia exacta en web, schema, prensa y legal.
          </P>
          <Card pad={0}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13.5 }}>
              <thead>
                <tr style={{ background: PAPER, textAlign: 'left' }}>
                  {['Contexto', 'Forma canónica EXACTA'].map((h) => (
                    <th key={h} style={{ padding: '12px 16px', color: NAVY, fontWeight: 700 }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ['Marca / coloquial', 'Toño Palacios'],
                  ['Legal / contratos / registros', 'Antonio Palacios Cambero'],
                  ['Credencial principal', 'Broker hipotecario nº E242 (Banco de España)'],
                  ['Cargo institucional', 'Presidente de ANICI'],
                  ['Sociedad operativa', 'Inversia Global Digital, S.L.U.'],
                  ['Firma completa', 'Antonio Palacios Cambero (Toño Palacios) — broker hipotecario nº E242 (Banco de España) y presidente de ANICI'],
                ].map((r, i) => (
                  <tr key={i} style={{ borderTop: '1px solid #EFEDE6' }}>
                    <td style={{ padding: '12px 16px', color: INK_MUTED }}>{r[0]}</td>
                    <td style={{ padding: '12px 16px', color: NAVY, fontWeight: 600 }}>{r[1]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18, marginTop: 18 }}>
            <DoDont
              ok
              items={[
                'Escribir siempre <strong>“nº E242”</strong> junto a “Banco de España” la primera vez que aparece.',
                '“Toño <strong>Palacios</strong>” con S. Es el apellido correcto.',
                'Mantener idéntica la redacción en web, JSON-LD, prensa y legal.',
                'Asociar siempre el nombre a <strong>broker hipotecario / intermediario de crédito</strong>.',
              ]}
            />
            <DoDont
              ok={false}
              items={[
                'Confundir con el chef <strong>“Toño Palacio”</strong> (sin S). No es la misma persona.',
                'Inventar variantes del registro (“E-242”, “nºE 242”, “licencia 242”).',
                'Atribuir títulos académicos concretos por delante del nombre.',
                'Usar “el mejor”, “número 1” u otras afirmaciones no verificables.',
              ]}
            />
          </div>
        </Section>

        {/* 10 — Aplicaciones */}
        <Section n="10" title="Aplicaciones">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
            <Card bg={NAVY}>
              <Label on="dark">Cabecera del sitio</Label>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <BrandMark size={38} bg="dark" registry={false} title={null} />
                <span style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.05 }}>
                  <span style={{ fontWeight: 800, fontSize: 19, color: '#fff' }}>
                    <span style={{ color: GOLD }}>Toño</span> Palacios
                  </span>
                  <span style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: 3, color: 'rgba(255,255,255,0.55)', marginTop: 3 }}>
                    Broker hipotecario · Nº E242
                  </span>
                </span>
              </div>
            </Card>
            <Card>
              <Label>Favicon (navy, sin firma)</Label>
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
          </div>
        </Section>

        {/* 11 — NUEVO: Papelería */}
        <Section n="11" title="Papelería y firma de email">
          {/* Tarjeta de visita */}
          <Card>
            <Label>Tarjeta de visita (85 × 55 mm) — anverso / reverso</Label>
            <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
              <div
                style={{
                  width: 320,
                  height: 200,
                  background: '#fff',
                  border: '1px solid #E7E5DE',
                  borderRadius: 10,
                  padding: 24,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <BrandMark size={52} bg="light" registry={false} title={null} />
                <div>
                  <p style={{ fontSize: 17, fontWeight: 800, color: NAVY, margin: 0 }}>
                    Antonio Palacios Cambero
                  </p>
                  <p style={{ fontSize: 11, color: INK_MUTED, margin: '3px 0 0', letterSpacing: 0.5 }}>
                    Broker hipotecario nº E242 · Presidente de ANICI
                  </p>
                  <p style={{ fontSize: 11, color: NAVY, margin: '10px 0 0' }}>
                    psz.es · Inversia Global Digital, S.L.U.
                  </p>
                </div>
              </div>
              <div
                style={{
                  width: 320,
                  height: 200,
                  background: NAVY,
                  borderRadius: 10,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <BrandMark size={120} bg="dark" />
              </div>
            </div>
          </Card>

          {/* Firma de email */}
          <div style={{ marginTop: 18 }}>
            <Card>
              <Label>Firma de email</Label>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16,
                  borderLeft: `3px solid ${GOLD}`,
                  paddingLeft: 16,
                }}
              >
                <BrandMark size={56} bg="light" registry={false} title={null} />
                <div>
                  <p style={{ fontSize: 15, fontWeight: 800, color: NAVY, margin: 0 }}>
                    Antonio Palacios Cambero <span style={{ color: INK_MUTED, fontWeight: 500 }}>· Toño Palacios</span>
                  </p>
                  <p style={{ fontSize: 12, color: NAVY, margin: '3px 0 0' }}>
                    Broker hipotecario nº E242 (Banco de España) · Presidente de ANICI
                  </p>
                  <p style={{ fontSize: 12, color: INK_MUTED, margin: '3px 0 0' }}>
                    psz.es · Inversia Global Digital, S.L.U.
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Membrete */}
          <div style={{ marginTop: 18 }}>
            <Card>
              <Label>Membrete A4 (cabecera)</Label>
              <div
                style={{
                  border: '1px solid #E7E5DE',
                  borderRadius: 8,
                  padding: '20px 28px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderBottom: `2px solid ${GOLD}`,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <BrandMark size={40} bg="light" registry={false} title={null} />
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 800, color: NAVY, margin: 0 }}>Toño Palacios</p>
                    <p style={{ fontSize: 9, color: INK_MUTED, margin: '2px 0 0', letterSpacing: 1.5, textTransform: 'uppercase' }}>
                      Broker hipotecario · Nº E242
                    </p>
                  </div>
                </div>
                <p style={{ fontSize: 10, color: INK_MUTED, margin: 0, textAlign: 'right' }}>
                  Inversia Global Digital, S.L.U.<br />psz.es
                </p>
              </div>
            </Card>
          </div>
        </Section>

        {/* 12 — Usos */}
        <Section n="12" title="Usos — correcto e incorrecto">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
            <DoDont
              ok
              items={[
                'Usar el componente <code>BrandMark</code> o los SVG de la sección 13.',
                'Respetar la regla de color sobre fondo (dos tonos legibles).',
                'Área de respeto ≥ 25 % del lado del símbolo.',
                'El mismo símbolo para marca personal y “El Sello Palacios”.',
              ]}
            />
            <DoDont
              ok={false}
              items={[
                'Recomponer la T·P a mano en vez de usar el componente.',
                'Deformar, rotar, descentrar, añadir sombras o degradados.',
                'Recolorear fuera de la paleta (navy / oro / blanco).',
                'Crear una identidad visual separada para “El Sello Palacios”.',
                'Dejar una letra del mismo color que el fondo.',
              ]}
            />
          </div>
        </Section>

        {/* 13 — NUEVO: Assets descargables */}
        <Section n="13" title="Assets descargables">
          <P>
            SVG vectoriales generados por el propio componente (siempre actualizados). Para
            imprentas y diseñadores externos. Click derecho → guardar, o usa el enlace.
          </P>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {downloads.map((d) => (
              <a
                key={d.file}
                href={d.uri}
                download={d.file}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12,
                  textDecoration: 'none',
                  background: d.label.includes('navy') || d.label.includes('Favicon') ? NAVY : '#fff',
                  border: '1px solid #E7E5DE',
                  borderRadius: 12,
                  padding: 20,
                  alignItems: 'center',
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={d.uri} alt={d.label} width={72} height={72} />
                <span
                  style={{
                    fontSize: 12.5,
                    fontWeight: 700,
                    color: d.label.includes('navy') || d.label.includes('Favicon') ? '#fff' : NAVY,
                    textAlign: 'center',
                  }}
                >
                  {d.label}
                </span>
                <span style={{ fontSize: 11, color: GOLD, fontWeight: 600 }}>↓ {d.file}</span>
              </a>
            ))}
          </div>
        </Section>

        {/* 14 — Entrega técnica y gobernanza */}
        <Section n="14" title="Entrega técnica y gobernanza">
          <Card>
            <ul style={{ margin: 0, paddingLeft: 18, color: NAVY, fontSize: 13.5, lineHeight: 2 }}>
              <li>
                Fuente única: <code>app/_components/BrandMark.tsx</code> — componente +
                <code> brandMarkSvg()</code> + <code>brandMarkDataUri()</code>.
              </li>
              <li>Favicon / Apple icon: <code>app/icon.tsx</code> · <code>app/apple-icon.tsx</code>.</li>
              <li>Open Graph: las 5 herramientas inyectan el símbolo vía data-URI.</li>
              <li>PDF: <code>RoiPdfDocument.tsx</code> reproduce el símbolo con primitivas nativas.</li>
              <li>Tipografía: Gelasio empaquetada en <code>app/layout.tsx</code> (next/font).</li>
              <li>Documento portable: <code>docs/MANUAL-DE-MARCA.md</code>.</li>
            </ul>
            <p style={{ fontSize: 13.5, color: NAVY, marginTop: 16, lineHeight: 1.6 }}>
              <strong>Gobernanza:</strong> cualquier cambio del logo se hace en
              <code> BrandMark.tsx</code> y se propaga solo. No se editan copias. Cambios de marca
              los aprueba Antonio Palacios Cambero; esta página es la referencia viva.
            </p>
          </Card>
          <p style={{ fontSize: 12, color: INK_MUTED, marginTop: 28, textAlign: 'center' }}>
            Manual de marca v2.0 · documento interno · no indexable · © Inversia Global Digital, S.L.U.
          </p>
        </Section>
      </div>
    </div>
  )
}
