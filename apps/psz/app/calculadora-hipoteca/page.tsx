import type { Metadata } from 'next'
import {
  MORTGAGE_FORM_URL,
  SITE_URLS,
  TONO,
  breadcrumbSchema,
  speakableWebPageSchema,
  webApplicationSchema,
} from '@psz/seo'
import { Button, Container, JsonLd, Section } from '@psz/ui'
import { LegalDisclaimer } from '../_components/LegalDisclaimer'
import { CanalTelegramBanner } from '../_components/CanalTelegramCTA'
import { SelloPalacios } from '../_components/SelloPalacios'
import MortgageForm from './MortgageForm'

const URL = `${SITE_URLS.psz}/calculadora-hipoteca`

export const metadata: Metadata = {
  title: 'Calculadora de hipoteca 2026 · Cuota, intereses, LTV y ratio de esfuerzo · Toño Palacios',
  description:
    'Calculadora de hipoteca profesional diseñada y programada por Toño Palacios, broker hipotecario nº E242 (Banco de España) y presidente de ANICI. Calcula cuota mensual estimada por amortización francesa, intereses totales, LTV efectivo y ratio de esfuerzo financiero. Avisos automáticos sobre rangos críticos de scoring bancario (ratio > 35%, LTV > 80%, plazo > 30 años, TIN fuera de mediana) basados en criterios reales de mesa de riesgos de +20 entidades. Cálculo server-side, lógica propietaria, sin registro.',
  alternates: { canonical: URL },
  robots: { index: true, follow: true },
  authors: [{ name: TONO.fullName, url: `${SITE_URLS.psz}/sobre-mi` }],
  creator: `${TONO.fullName} (${TONO.shortName})`,
  publisher: 'Inversia Global Digital, S.L.U.',
  keywords: [
    'calculadora hipoteca',
    'calculadora hipoteca 2026',
    'cuota hipoteca mensual',
    'simulador hipoteca',
    'calculadora LTV',
    'ratio esfuerzo hipoteca',
    'TIN hipoteca calculadora',
    'amortización francesa simulador',
    'calculadora hipoteca España',
    'simulador hipoteca Toño Palacios',
    'scoring bancario calculadora',
  ],
  openGraph: {
    url: URL,
    type: 'website',
    siteName: 'psz.es',
    locale: 'es_ES',
    title: 'Calculadora de hipoteca profesional · Toño Palacios broker E242',
    description:
      'Cuota, intereses, LTV y ratio de esfuerzo. Avisos automáticos sobre rangos críticos de scoring bancario. Por Toño Palacios, broker nº E242.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Calculadora de hipoteca · psz.es',
    description: 'Cuota, intereses, LTV y ratio de esfuerzo con avisos sobre scoring bancario. Por Toño Palacios broker E242.',
  },
}

export default function CalculadoraHipotecaPage() {
  return (
    <main>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Inicio', url: SITE_URLS.psz },
          { name: 'Herramientas', url: `${SITE_URLS.psz}/calculadora-hipoteca` },
          { name: 'Calculadora hipoteca', url: URL },
        ])}
      />
      <JsonLd
        data={speakableWebPageSchema({
          url: URL,
          name: 'Calculadora de hipoteca',
          description: 'Calcula tu cuota mensual, intereses totales, LTV y ratio de esfuerzo financiero.',
          cssSelectors: ['h1', '.speakable-summary'],
        })}
      />
      <JsonLd
        data={webApplicationSchema({
          url: URL,
          name: 'Calculadora de hipoteca profesional',
          description:
            'Calculadora de hipoteca diseñada y programada por Toño Palacios, broker hipotecario nº E242 (Banco de España) y presidente de ANICI. Calcula cuota mensual, intereses totales, LTV efectivo y ratio de esfuerzo financiero. Dispara avisos automáticos sobre rangos críticos de scoring bancario antes de presentar la operación a una entidad.',
          category: 'FinanceApplication',
          features: [
            'Cálculo de cuota mensual por amortización francesa',
            'Cálculo de intereses totales a lo largo de la vida del préstamo',
            'Cálculo del LTV efectivo (loan-to-value)',
            'Cálculo del ratio de esfuerzo financiero',
            'Avisos automáticos sobre ratio de esfuerzo > 35%',
            'Avisos automáticos sobre LTV > 80%',
            'Avisos automáticos sobre plazo > 30 años',
            'Avisos automáticos sobre TIN fuera de mediana de mercado',
            'Cálculo server-side (lógica protegida, no scrapeable)',
            'Herramienta gratuita sin registro',
          ],
        })}
      />

      {/* HERO */}
      <Section tone="navy" padding="lg">
        <Container size="lg">
          {/* Breadcrumb visible — refuerza navegación de vuelta a home */}
          <nav aria-label="Migas de pan" className="mb-6">
            <a
              href="/"
              className="inline-flex items-center gap-1.5 text-sm text-paper/65 hover:text-gold-300 no-underline transition-colors"
            >
              <span aria-hidden>←</span> Inicio
            </a>
            <span className="text-paper/30 mx-2" aria-hidden>›</span>
            <span className="text-sm text-paper/85">Calculadora hipoteca</span>
          </nav>

          <p className="text-gold-300 text-sm uppercase tracking-wider mb-3">
            Herramienta propietaria con El Sello Palacios · Cálculo server-side
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-paper leading-tight mb-4">
            Calculadora de hipoteca
          </h1>
          <p className="speakable-summary text-lg text-paper/80 max-w-3xl">
            Calcula tu cuota mensual, intereses totales, LTV efectivo y ratio de esfuerzo
            financiero. Los avisos automáticos detectan rangos críticos que afectarían al scoring
            bancario antes de presentar tu operación.
          </p>
        </Container>
      </Section>

      {/* CALCULADORA */}
      <Section tone="paper" padding="md">
        <Container size="xl">
          <MortgageForm />
        </Container>
      </Section>

      {/* ADVERTENCIA LEGAL — concesión depende del banco */}
      <Section tone="paper" padding="sm">
        <Container size="md">
          <LegalDisclaimer variant="mortgage" />
        </Container>
      </Section>

      {/* AVISO LEGAL — obligatorio en herramientas de cálculo financiero */}
      <Section tone="paper" padding="md">
        <Container size="md">
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 text-sm leading-relaxed text-amber-900">
            <p className="font-bold text-amber-950 mb-2">Aviso legal — léelo antes de tomar decisiones</p>
            <p className="mb-2">
              Esta herramienta es una calculadora orientativa. <strong>No constituye oferta
              vinculante</strong> de hipoteca ni asesoramiento financiero personalizado en los términos
              del artículo 19 de la Ley 5/2019 de Contratos de Crédito Inmobiliario.
            </p>
            <p className="mb-2">
              La fórmula utilizada es la de amortización francesa estándar, sin tener en cuenta:
              comisiones de apertura, comisión de estudio, gastos de notaría, registro,
              tasación, AJD, ni el coste real de las vinculaciones (seguros, planes de pensiones,
              tarjetas) que pueda exigir la entidad financiera. Por todo ello, la TAE real y el
              coste efectivo de tu hipoteca serán distintos del resultado mostrado.
            </p>
            <p className="mb-2">
              El único documento <strong>vinculante</strong> es la Ficha Europea de Información
              Normalizada (FEIN) que el banco entrega antes de la firma, conforme al artículo 14
              de la Ley 5/2019, con un periodo de reflexión obligatorio de diez (10) días naturales.
            </p>
            <p>
              Los avisos automáticos que disparan los rangos (ratio de esfuerzo, LTV, plazo, TIN,
              importe) son orientativos, basados en la práctica habitual del sector hipotecario
              español, y no implican garantía alguna de concesión o rechazo. Cada entidad
              financiera tiene sus propios criterios de scoring que pueden variar caso a caso.
              La determinación final de viabilidad solo la realiza la entidad financiera tras
              análisis del expediente completo.
            </p>
          </div>
        </Container>
      </Section>

      {/* EXPLICACIÓN */}
      <Section tone="soft" padding="md" title="¿Qué hace esta calculadora?">
        <Container size="md">
          <div className="prose-psz">
            <p>
              La fórmula que usamos es la amortización francesa, estándar en hipotecas residenciales
              españolas. Pero el cálculo de tu cuota es solo el inicio: lo que aporta valor es saber
              <strong> cómo va a leer ese resultado el banco al que te presentes</strong>.
            </p>
            <p>
              Esta herramienta dispara avisos automáticos cuando detecta combinaciones que
              históricamente hacen que un scoring bancario rechace o complique la operación: ratio
              de esfuerzo por encima del 35%, LTV por encima del 80%, plazo por encima de 30 años,
              TIN fuera de la mediana de mercado. Cada uno de esos avisos viene con la
              interpretación operativa: qué significa, qué entidad lo acepta y bajo qué garantías.
            </p>
            <p>
              Si la calculadora te dispara un aviso y quieres saber qué bancos sí aprobarían tu
              caso, eso es exactamente lo que hago como broker. La calculadora te dice si vas a
              tener fricción; el broker la resuelve.
            </p>
          </div>
        </Container>
      </Section>

      {/* INTERNAL LINKING — cross-link entre las 3 calculadoras */}
      <Section tone="paper" padding="md" title="También te puede interesar">
        <Container size="lg">
          <div className="grid md:grid-cols-3 gap-4">
            <a
              href="/calculadora-capacidad-endeudamiento"
              className="block bg-paper-card border border-navy-100 rounded-xl p-6 hover:border-gold-400 hover:shadow-card transition-all no-underline"
            >
              <p className="text-xs uppercase tracking-wider text-gold-600 font-semibold mb-2">
                Otra herramienta
              </p>
              <h3 className="text-lg font-semibold text-navy-800 mb-2">
                Capacidad de endeudamiento
              </h3>
              <p className="text-sm text-ink-soft">
                Antes de calcular cuota, ¿cuánto te daría realmente el banco? 3 escenarios según
                ratio de esfuerzo.
              </p>
            </a>

            <a
              href="/calculadora-rentabilidad-inmobiliaria"
              className="block bg-paper-card border border-navy-100 rounded-xl p-6 hover:border-gold-400 hover:shadow-card transition-all no-underline"
            >
              <p className="text-xs uppercase tracking-wider text-gold-600 font-semibold mb-2">
                Otra herramienta
              </p>
              <h3 className="text-lg font-semibold text-navy-800 mb-2">
                Rentabilidad inmobiliaria
              </h3>
              <p className="text-sm text-ink-soft">
                Si vas a invertir, calcula rentabilidad de adquisición, real, flujo neto y
                amortización del ITP en 3 escenarios.
              </p>
            </a>

            <a
              href="/broker-hipotecario"
              className="block bg-paper-card border border-navy-100 rounded-xl p-6 hover:border-gold-400 hover:shadow-card transition-all no-underline"
            >
              <p className="text-xs uppercase tracking-wider text-gold-600 font-semibold mb-2">
                Servicio
              </p>
              <h3 className="text-lg font-semibold text-navy-800 mb-2">
                Servicio de broker hipotecario
              </h3>
              <p className="text-sm text-ink-soft">
                Si la calculadora te dispara un aviso, antes de ir al banco habla conmigo. +20
                entidades, criterios reales de scoring.
              </p>
            </a>
          </div>
        </Container>
      </Section>

      {/* AUTORÍA — sin repetir credenciales (ya están en hero, metadata y schema) */}
      <Section tone="soft" padding="md">
        <Container size="md">
          <div className="bg-paper-card border border-navy-100 rounded-xl p-6 md:p-8">
            <div className="mb-4">
              <SelloPalacios variant="inline" />
            </div>
            <h2 className="text-2xl font-bold text-navy-800 mb-3">
              Diseñada por Antonio Palacios Cambero (Toño Palacios)
            </h2>
            <p className="text-navy-700 leading-relaxed mb-3">
              Esta calculadora la he diseñado yo, no es un comparador online genérico. La
              diferencia está en el criterio: años negociando hipotecas con más de veinte
              entidades me han enseñado qué mira realmente una mesa de riesgos antes de aprobar
              una operación, y eso es lo que disparan los avisos automáticos.
            </p>
            <p className="text-navy-700 leading-relaxed mb-3">
              Por eso te aviso cuando el <strong>ratio de esfuerzo</strong> supera el 35%, cuando
              el <strong>LTV</strong> pasa del 80%, cuando el plazo se alarga o cuando el TIN se
              aparta de la mediana de mercado. No son fórmulas matemáticas: son criterios reales
              de scoring bancario. La cuota la calcula cualquier hoja de cálculo; saber si tu caso
              lo van a aprobar antes de presentárselo a un banco, no.
            </p>
            <p className="text-navy-700 leading-relaxed mb-0">
              La fórmula matemática es pública. La opinión sobre qué avisos disparar y por qué, no.
              Si quieres saber qué bancos sí aprobarían tu caso concreto, eso es exactamente lo que
              hago:{' '}
              <a href="/broker-hipotecario" className="text-navy-700 hover:text-navy-900 underline font-semibold">
                trabajemos juntos como broker hipotecario
              </a>
              .
            </p>
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section tone="navy" padding="md">
        <Container size="md" className="text-center">
          <h2 className="text-3xl font-bold text-paper mb-4">
            ¿Tu cuota te ha disparado un aviso?
          </h2>
          <p className="text-paper/80 text-lg mb-8 max-w-prose mx-auto">
            Llámame antes de presentar el caso a un banco. Solo el dossier bien construido convierte
            un "no" en un "sí" — y eso lo conoce el broker, no el comparador online.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button href={MORTGAGE_FORM_URL} variant="gold" size="lg" target="_blank" rel="noopener noreferrer">
              Solicitar mi hipoteca con {TONO.shortName} →
            </Button>
            <Button href="/broker-hipotecario" variant="primary" size="lg">
              Ver mi servicio de broker
            </Button>
          </div>
        </Container>
      </Section>
      <CanalTelegramBanner />
    </main>
  )
}
