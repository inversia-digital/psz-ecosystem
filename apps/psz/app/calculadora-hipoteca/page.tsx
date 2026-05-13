import type { Metadata } from 'next'
import {
  MORTGAGE_FORM_URL,
  SITE_URLS,
  TONO,
  breadcrumbSchema,
  speakableWebPageSchema,
} from '@psz/seo'
import { Button, Container, JsonLd, Section } from '@psz/ui'
import MortgageForm from './MortgageForm'
import HonorariosModal from '../_components/HonorariosModal'

const URL = `${SITE_URLS.psz}/calculadora-hipoteca`

export const metadata: Metadata = {
  title: 'Calculadora de hipoteca — Cuota, intereses, LTV y ratio de esfuerzo',
  description:
    'Calculadora de hipoteca profesional. Calcula tu cuota mensual estimada, intereses totales, LTV efectivo y ratio de esfuerzo financiero. Con avisos automáticos sobre rangos críticos de scoring bancario. Herramienta de Toño Palacios, broker hipotecario nº E242 y presidente de ANICI.',
  alternates: { canonical: URL },
  robots: { index: true, follow: true },
  keywords: [
    'calculadora hipoteca',
    'cuota hipoteca mensual',
    'simulador hipoteca',
    'calculadora LTV',
    'ratio esfuerzo hipoteca',
    'TIN hipoteca calculadora',
  ],
  openGraph: {
    url: URL,
    title: 'Calculadora de hipoteca profesional',
    description: 'Calcula tu cuota, intereses, LTV y ratio de esfuerzo. Avisos automáticos sobre rangos críticos de scoring bancario.',
    locale: 'es_ES',
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

      {/* HERO */}
      <Section tone="navy" padding="lg">
        <Container size="lg">
          <p className="text-gold-300 text-sm uppercase tracking-wider mb-3">
            Herramienta propietaria · Cálculo server-side
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
              tener fricción; el broker la resuelve. <HonorariosModal inline triggerLabel="¿Por qué estos honorarios?" />
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
    </main>
  )
}
