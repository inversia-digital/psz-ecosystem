import type { Metadata } from 'next'
import {
  SITE_URLS,
  TELEGRAM_INVESTORS_URL_HERRAMIENTAS,
  TONO,
  breadcrumbSchema,
  faqPageSchema,
  webApplicationSchema,
} from '@psz/seo'
import { Button, Container, Faq, JsonLd, Section } from '@psz/ui'
import { LegalDisclaimer } from '../_components/LegalDisclaimer'
import { SelloPalacios } from '../_components/SelloPalacios'
import AntiHumoForm from './AntiHumoForm'

const URL = `${SITE_URLS.psz}/test-anti-humo-inmobiliario`

export const metadata: Metadata = {
  title: 'El test anti-humo inmobiliario · ¿te dan la bruta o la neta? | Toño Palacios',
  description:
    'El 10% que ves en los anuncios casi nunca es el 10% que cobras. Mete precio, alquiler y "lo que te anuncian" y este test te dice si te están enseñando la rentabilidad bruta, si te la inflan o si es coherente con la neta real. Por Toño Palacios, broker hipotecario nº E242.',
  alternates: { canonical: URL },
  robots: { index: true, follow: true },
  authors: [{ name: TONO.fullName, url: `${SITE_URLS.psz}/sobre-mi` }],
  creator: `${TONO.fullName} (${TONO.shortName})`,
  publisher: 'Inversia Global Digital, S.L.U.',
  keywords: [
    'rentabilidad bruta vs neta',
    'detectar rentabilidad inflada',
    'rentabilidad falsa inmobiliaria',
    'el 10% que ves no es el 10% que cobras',
    'calcular rentabilidad neta alquiler',
    'rentabilidad real de un piso',
    'me engañan con la rentabilidad',
    'test rentabilidad inmobiliaria',
    'rentabilidad bruta alquiler fórmula',
  ],
  openGraph: {
    url: URL,
    type: 'website',
    locale: 'es_ES',
    siteName: 'psz.es',
    title: 'El test anti-humo inmobiliario · ¿te dan la bruta o la neta?',
    description:
      'El número grande del anuncio rara vez es lo que cobras. Comprueba en 10 segundos si te enseñan la rentabilidad bruta como si fuera neta.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'El test anti-humo inmobiliario',
    description: 'El 10% que ves casi nunca es el 10% que cobras. Compruébalo.',
  },
}

const FAQ = [
  {
    question: '¿Qué diferencia hay entre rentabilidad bruta y neta?',
    answer:
      'La bruta es alquiler × 12 ÷ precio: un número de manual que ignora el ITP, los gastos de compra y los gastos anuales. La neta real descuenta todo eso y se calcula sobre el dinero que de verdad pones (precio + impuestos + gastos + reforma). La bruta suele ser 3-4 puntos mayor que la neta.',
  },
  {
    question: '¿Por qué muchos anuncios enseñan una rentabilidad que no cobras?',
    answer:
      'Porque la bruta es el número más grande y más fácil de calcular, y "rentabilidad" a secas suena a lo que te llevas. No es necesariamente mentira: es enseñar el techo y callar el suelo. Este test compara lo que te anuncian con la bruta y con la neta real para que veas cuál te están dando.',
  },
  {
    question: '¿Cómo sé si me están dando la bruta?',
    answer:
      'Si la cifra que te anuncian coincide casi al decimal con alquiler × 12 ÷ precio, te están dando la bruta. Es el patrón más habitual del sector. Mete los datos arriba y el test te lo dice directamente, con la neta real y la diferencia en euros al año.',
  },
  {
    question: '¿Este test es tan "inventado" como el de la competencia?',
    answer:
      'No, y por eso enseñamos todos los supuestos (ITP por comunidad, % de gastos, reforma) editables a la vista. Esa transparencia es justo lo contrario del humo: puedes ver de dónde sale cada número y ajustarlo a tu caso.',
  },
  {
    question: '¿Incluye el IRPF?',
    answer:
      'No: trabaja con la rentabilidad neta antes de IRPF, porque el impacto fiscal depende de tu tramo personal y de si es vivienda habitual del inquilino. Para el análisis completo (3 escenarios, flujo mensual, fiscalidad orientativa) usa la calculadora de rentabilidad inmobiliaria.',
  },
] as const

export default function TestAntiHumoPage() {
  return (
    <main>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Inicio', url: SITE_URLS.psz },
          { name: 'El test anti-humo inmobiliario', url: URL },
        ])}
      />
      <JsonLd
        data={webApplicationSchema({
          url: URL,
          name: 'El test anti-humo inmobiliario',
          description:
            'Herramienta que desenmascara rentabilidades inmobiliarias engañosas: compara la rentabilidad que te anuncian con la bruta y con la neta real para detectar si te enseñan el número grande como si fuera lo que cobras.',
          category: 'FinanceApplication',
          features: [
            'Veredicto directo: te dan la bruta / te la inflan / es coherente',
            'Rentabilidad bruta vs rentabilidad neta real',
            'ITP por comunidad autónoma actualizado',
            'Desfase en puntos y en euros al año que el anuncio ignora',
            'Supuestos visibles y editables (transparencia total)',
            'Tarjeta de resultado compartible en redes',
          ],
        })}
      />
      <JsonLd data={faqPageSchema([...FAQ])} />

      {/* HERO */}
      <Section tone="navy" padding="lg">
        <Container size="lg">
          <nav aria-label="Migas de pan" className="mb-6">
            <a href="/" className="inline-flex items-center gap-1.5 text-sm text-paper/65 hover:text-gold-300 no-underline transition-colors">
              <span aria-hidden>←</span> Inicio
            </a>
            <span className="text-paper/30 mx-2" aria-hidden>›</span>
            <span className="text-sm text-paper/85">Test anti-humo inmobiliario</span>
          </nav>
          <p className="text-gold-300 text-sm uppercase tracking-wider mb-3">Herramienta honesta · El Sello Palacios · E242</p>
          <h1 className="text-4xl md:text-5xl font-bold text-paper leading-tight mb-4">El test anti-humo inmobiliario</h1>
          <p className="speakable-summary text-lg text-paper/80 max-w-3xl">
            El <strong>10% que ves</strong> en muchos anuncios casi nunca es el <strong>10% que cobras</strong>. Mete el
            precio, el alquiler y la <strong>rentabilidad que te anuncian</strong>, y este test te dice en 10 segundos si te
            están enseñando la <strong>bruta</strong> como si fuera la neta, si te la inflan o si es coherente con la{' '}
            <strong>rentabilidad neta real</strong>.
          </p>
        </Container>
      </Section>

      <Section tone="paper" padding="md">
        <Container size="lg">
          <AntiHumoForm />
        </Container>
      </Section>

      <Section tone="paper" padding="sm">
        <Container size="md">
          <LegalDisclaimer variant="investment" />
        </Container>
      </Section>

      {/* Cómo funciona el truco */}
      <Section tone="soft" padding="md" title="El truco que este test desenmascara">
        <Container size="md">
          <div className="prose-psz">
            <p>
              El patrón es viejo y se repite en redes: se publica la <strong>rentabilidad bruta</strong> (alquiler × 12 ÷
              precio) etiquetada solo como <em>“rentabilidad”</em>. Suena al dinero que te llevas, pero ignora tres cosas que
              sí pagas: el <strong>ITP</strong> de tu comunidad, los <strong>gastos de compra</strong> (notaría, registro,
              AJD, gestoría) y los <strong>gastos anuales</strong> (IBI, comunidad, seguro, impagos, mantenimiento, vacíos,
              gestión). Cuando descuentas todo eso, el número baja 3-4 puntos.
            </p>
            <p>
              Aquí no señalamos a nadie con nombre y apellidos: hablamos del <strong>patrón</strong> del sector. Y dejamos
              todos los supuestos a la vista y editables, que es exactamente lo contrario del humo.
            </p>
          </div>
        </Container>
      </Section>

      {/* FAQ */}
      <Section tone="paper" padding="md" title="Preguntas frecuentes">
        <Container size="md">
          <Faq items={[...FAQ]} />
        </Container>
      </Section>

      {/* Autoría / Sello */}
      <Section tone="soft" padding="md">
        <Container size="md">
          <div className="bg-paper-card border border-navy-100 rounded-xl p-6 md:p-8">
            <div className="mb-4">
              <SelloPalacios variant="inline" />
            </div>
            <h2 className="text-2xl font-bold text-navy-800 mb-3">Por qué lo hago así</h2>
            <p className="text-ink-soft leading-relaxed">
              Llevo años viendo cómo se vende inmobiliario con el número grande por delante. Este test no es para vender humo
              al revés: es para que entres a cualquier operación sabiendo lo que de verdad cobras. La fórmula es pública; el
              criterio sobre qué enseñar y qué esconden otros es lo que aporta un broker honesto. Si quieres aplicarlo a una
              operación real, trabajemos juntos —{' '}
              <a href="/broker-hipotecario" className="text-navy-700 hover:text-navy-900 underline">como broker hipotecario</a>{' '}
              o{' '}
              <a href="/personal-shopper-inmobiliario-zaragoza" className="text-navy-700 hover:text-navy-900 underline">
                como Personal Shopper Inmobiliario
              </a>
              .
            </p>
          </div>
        </Container>
      </Section>

      {/* CTA Telegram inversores */}
      <Section tone="navy" padding="md">
        <Container size="md" className="text-center">
          <h2 className="text-3xl font-bold text-paper mb-4">¿Inviertes en serio? Te paso las que SÍ salen a cuenta</h2>
          <p className="text-paper/80 text-lg mb-8 max-w-prose mx-auto">
            Tengo red propia de inversores con operaciones no públicas en toda España, ya analizadas con rentabilidad real
            (no la del anuncio). Sin coste y sin compromiso.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button href={TELEGRAM_INVESTORS_URL_HERRAMIENTAS} variant="gold" size="lg" target="_blank" rel="noopener noreferrer">
              Canal Telegram de inversores →
            </Button>
            <Button href="/calculadora-rentabilidad-inmobiliaria" variant="primary" size="lg">
              Análisis completo (3 escenarios)
            </Button>
          </div>
        </Container>
      </Section>
    </main>
  )
}
