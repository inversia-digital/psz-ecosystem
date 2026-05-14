import type { Metadata } from 'next'
import {
  MORTGAGE_FORM_URL,
  SITE_URLS,
  TONO,
  breadcrumbSchema,
  faqPageSchema,
  speakableWebPageSchema,
  webApplicationSchema,
} from '@psz/seo'
import { Button, Container, Faq, JsonLd, Section } from '@psz/ui'
import { AnswerCard } from '../_components/AnswerCard'
import { LegalDisclaimer } from '../_components/LegalDisclaimer'
import StressForm from './StressForm'

const URL = `${SITE_URLS.psz}/calculadora-stress-test-euribor`

// ─────────────────────────────────────────────────────────────────────────
// METADATA
// ─────────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title:
    'Stress test Euríbor 2026 · ¿Cuánto subirá tu hipoteca? · Toño Palacios broker E242',
  description:
    'Calculadora propietaria de stress test del Euríbor diseñada y programada por Toño Palacios, broker hipotecario nº E242 (Banco de España) y presidente de ANICI. Simula cuánto subiría tu cuota mensual en hipoteca variable si el Euríbor sube 0,5, 1, 1,5 o 2 puntos porcentuales. 5 escenarios paralelos con TIN proyectado, cuota nueva, subida vs cuota actual, coste anual extra y ratio de esfuerzo proyectado. Cálculo server-side, sin registro.',
  alternates: { canonical: URL },
  robots: { index: true, follow: true },
  authors: [{ name: TONO.fullName, url: `${SITE_URLS.psz}/sobre-mi` }],
  creator: `${TONO.fullName} (${TONO.shortName})`,
  publisher: 'Inversia Global Digital, S.L.U.',
  keywords: [
    'stress test euribor',
    'simulador euribor hipoteca',
    'si euribor sube cuanto sube mi cuota',
    'calculadora subida euribor',
    'hipoteca variable euribor',
    'impacto euribor cuota',
    'proyeccion euribor 2026',
    'calculadora revision hipoteca',
    'cuota nueva euribor',
    'estres financiero hipoteca',
  ],
  openGraph: {
    type: 'website',
    url: URL,
    siteName: 'psz.es',
    locale: 'es_ES',
    title: 'Stress test Euríbor · ¿Cuánto subirá tu hipoteca? · Toño Palacios',
    description:
      '5 escenarios paralelos: cuota proyectada si el Euríbor sube 0, 0,5, 1, 1,5 o 2 puntos. Server-side, sin registro.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Stress test Euríbor · psz.es',
    description: '5 escenarios paralelos para anticipar cuánto subirá tu hipoteca. Por Toño Palacios broker E242.',
  },
}

// ─────────────────────────────────────────────────────────────────────────
// FAQ
// ─────────────────────────────────────────────────────────────────────────

const FAQ = [
  {
    question: '¿Qué es un stress test Euríbor en una hipoteca?',
    answer:
      'Un stress test del Euríbor es la simulación de cuánto subiría tu cuota mensual si el Euríbor 12 meses (al que se referencian la mayoría de hipotecas variables españolas) subiera una determinada cantidad de puntos porcentuales en la próxima revisión. La banca lo aplica internamente al estudiar operaciones nuevas; este simulador lo aplica a tu hipoteca actual.',
  },
  {
    question: '¿Por qué la calculadora muestra 5 escenarios y no solo uno?',
    answer:
      'Porque el Euríbor no se mueve de forma predecible y conviene tener un rango realista. +0 es tu situación actual (referencia); +0,5 y +1 son movimientos plausibles en un horizonte de 12-18 meses; +1,5 y +2 son escenarios adversos. Mirar los 5 a la vez ayuda a entender la sensibilidad real de tu cuota frente al Euríbor.',
  },
  {
    question: '¿Qué hago si la calculadora me dice que mi cuota se dispararía?',
    answer:
      'Tres palancas operativas en orden de menor a mayor impacto: (1) amortización anticipada parcial para reducir el principal expuesto al Euríbor; (2) novación con tu banco actual para cambiar de variable a fija o mixta; (3) subrogación a otra entidad con mejor oferta fija. El broker hipotecario te ayuda a elegir cuál encaja con tu caso.',
  },
  {
    question: '¿Cuánto cuesta cambiar de hipoteca variable a fija?',
    answer:
      'Por la Ley 5/2019 la comisión por subrogación de acreedor (cambio de banco) está limitada al 0,5% del capital pendiente como máximo, y desaparece tras el quinto año. La novación con el mismo banco (cambio interno de modalidad) suele ser gratuita o tener un coste limitado pactado en contrato. Suma además gastos de tasación nueva si la subrogación lo requiere.',
  },
  {
    question: '¿De dónde sacas el Euríbor a aplicar en mi hipoteca actual?',
    answer:
      'El Euríbor que aparece en tu última revisión es el Euríbor 12 meses (mensual) publicado por el Banco de España el mes que tocaba revisión. Lo encuentras en tu última carta de revisión o en la app de tu banco en la sección "datos de la hipoteca". El diferencial está en tu escritura de hipoteca y no cambia.',
  },
  {
    question: '¿Por qué la columna +0 tiene que coincidir con mi cuota real?',
    answer:
      'Porque el escenario +0 reproduce tu situación actual: aplica Euríbor + diferencial = TIN actual y calcula la cuota con el capital y plazo restantes que has introducido. Si la cuota +0 no cuadra con la que paga tu banco, es probable que alguno de los inputs esté mal (capital pendiente, plazo restante, Euríbor aplicado o diferencial).',
  },
  {
    question: '¿Es realista que el Euríbor suba 2 puntos en un año?',
    answer:
      'En la subida de 2022-2023 el Euríbor pasó de -0,5% a +4% en menos de 18 meses (movimiento de 4,5 puntos). El escenario +2pp aquí es un stress moderado, no un caso extremo. Conviene tener esa cifra como referencia conservadora en cualquier decisión de hipoteca variable a largo plazo.',
  },
  {
    question: '¿Qué pasa si tengo hipoteca mixta en el tramo fijo todavía?',
    answer:
      'Si tu hipoteca mixta sigue en el tramo fijo, este simulador no aplica todavía — tu cuota está blindada hasta que pase al tramo variable. Anota la fecha exacta de transición y vuelve a usarlo cuando se acerque; en muchos casos conviene novar a fija antes de que se haga la conversión automática a variable.',
  },
  {
    question: '¿Conviene amortizar anticipadamente si subiera el Euríbor?',
    answer:
      'Depende del coste de oportunidad de tu dinero. Si tu hipoteca está al 4% TIN y puedes obtener una rentabilidad libre de riesgo superior (bono del estado, depósito a plazo), no compensa amortizar. Si la rentabilidad alternativa es menor, sí compensa porque reduces el capital expuesto al riesgo Euríbor. Calcula caso a caso.',
  },
  {
    question: '¿Esta calculadora reemplaza a un broker?',
    answer:
      'No. Te da la foto cuantitativa del impacto en tu cuota, pero la decisión (mantener variable, novar a fija, subrogar, amortizar) depende de tu situación completa: liquidez, otras deudas, horizonte de permanencia en la vivienda, mejor oferta de mercado disponible. El broker hipotecario integra todo eso y negocia con varios bancos en tu nombre.',
  },
] as const

// ─────────────────────────────────────────────────────────────────────────
// Página
// ─────────────────────────────────────────────────────────────────────────

export default function CalculadoraStressTestEuriborPage() {
  return (
    <main>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Inicio', url: SITE_URLS.psz },
          { name: 'Herramientas', url: `${SITE_URLS.psz}/herramientas` },
          { name: 'Stress test Euríbor', url: URL },
        ])}
      />
      <JsonLd
        data={webApplicationSchema({
          url: URL,
          name: 'Stress test Euríbor',
          description:
            'Calculadora propietaria que simula cuánto subiría tu cuota hipotecaria mensual en hipoteca variable si el Euríbor 12 meses subiera 0, 0,5, 1, 1,5 o 2 puntos porcentuales en la próxima revisión. Devuelve TIN proyectado, cuota nueva, incremento mensual, coste anual extra y ratio de esfuerzo proyectado.',
          category: 'FinanceApplication',
          features: [
            '5 escenarios paralelos de Euríbor (+0 / +0,5 / +1 / +1,5 / +2 pp)',
            'Cuota mensual proyectada en cada escenario',
            'Incremento mensual y anual sobre la cuota actual',
            'TIN aplicado en cada escenario (Euríbor + diferencial)',
            'Ratio de esfuerzo financiero proyectado (opcional con ingresos)',
            'Avisos sobre criterios de mesa de riesgos',
            'Recomendaciones operativas (amortización, novación, subrogación)',
            'Cálculo server-side (lógica protegida, no scrapeable)',
          ],
        })}
      />
      <JsonLd data={faqPageSchema([...FAQ])} />
      <JsonLd
        data={speakableWebPageSchema({
          url: URL,
          name: 'Stress test Euríbor',
          description:
            'Simula la cuota proyectada de tu hipoteca variable en 5 escenarios de subida del Euríbor.',
          cssSelectors: ['h1', '.speakable-summary', 'summary'],
        })}
      />

      {/* HERO */}
      <Section tone="navy" padding="lg">
        <Container size="lg">
          <nav aria-label="Migas de pan" className="mb-6">
            <a
              href="/"
              className="inline-flex items-center gap-1.5 text-sm text-paper/65 hover:text-gold-300 no-underline transition-colors"
            >
              <span aria-hidden>←</span> Inicio
            </a>
            <span className="text-paper/30 mx-2" aria-hidden>›</span>
            <a
              href="/herramientas"
              className="text-sm text-paper/65 hover:text-gold-300 no-underline"
            >
              Herramientas
            </a>
            <span className="text-paper/30 mx-2" aria-hidden>›</span>
            <span className="text-sm text-paper/85">Stress test Euríbor</span>
          </nav>

          <p className="text-gold-300 text-sm uppercase tracking-wider mb-3">
            Herramienta propietaria de {TONO.shortName} · 5 escenarios paralelos
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-paper leading-tight mb-4">
            Stress test Euríbor
          </h1>
          <p className="speakable-summary text-lg text-paper/85 max-w-3xl">
            Si el Euríbor sube X puntos, ¿cuánto subirá tu cuota mensual? Simulamos 5 escenarios
            paralelos (+0, +0,5, +1, +1,5, +2 pp) sobre tu hipoteca variable actual y proyectamos
            el ratio de esfuerzo. La banca aplica este tipo de simulación internamente al estudiar
            viabilidad de operaciones — aquí lo aplicas a la tuya.
          </p>
        </Container>
      </Section>

      {/* CALCULADORA */}
      <Section tone="paper" padding="md">
        <Container size="xl">
          <StressForm />
        </Container>
      </Section>

      {/* ADVERTENCIA LEGAL */}
      <Section tone="paper" padding="sm">
        <Container size="md">
          <LegalDisclaimer variant="mortgage" />
        </Container>
      </Section>

      {/* CÓMO LEE UN BROKER */}
      <Section tone="soft" padding="md" title="Cómo lee un broker estos números">
        <Container size="md">
          <AnswerCard question="¿Cuánto subirá mi cuota si sube el Euríbor?">
            La subida del Euríbor se traslada a tu cuota cada 6 o 12 meses, según contrato. Una
            subida de 1 punto porcentual sobre una hipoteca variable de 150.000 € a 20 años
            restantes incrementa la cuota mensual aproximadamente 70-90 € (840-1.080 € al año).
            Una subida de 2 puntos casi duplica esa cifra. Tres palancas para reaccionar:
            amortización parcial anticipada, novación a fija con el mismo banco o subrogación a
            otra entidad con mejor TIN fijo.
          </AnswerCard>
          <div className="prose-psz">
            <p>
              Los 5 escenarios paralelos te dan el rango realista. El escenario <strong>+1pp</strong>{' '}
              es probablemente el más útil porque refleja el típico movimiento que vimos en
              2022-2023 (cuando el Euríbor pasó de negativo a +4% en 18 meses).
            </p>
            <p>
              Si el escenario <strong>+2pp</strong> compromete tu liquidez familiar (ratio de
              esfuerzo &gt; 40%), la decisión racional es actuar AHORA, no cuando la cuota ya haya
              subido. Cambiar de variable a fija no es una decisión binaria — depende de:
            </p>
            <ul>
              <li>
                <strong>TIN fijo de mercado vs tu TIN variable actual.</strong> Si tu variable está
                en 4% y la fija de mercado en 3,2%, cambiar tiene sentido. Si tu variable está en
                2% y la fija en 3,2%, no compensa salvo que prevés subidas masivas.
              </li>
              <li>
                <strong>Comisión de subrogación / novación.</strong> Limitada por Ley 5/2019 a un
                máximo de 0,5% del capital pendiente. Hay que sumar tasación nueva si la
                subrogación lo requiere (~300-500 €).
              </li>
              <li>
                <strong>Horizonte de permanencia en la vivienda.</strong> Si vas a vender o
                subrogar en menos de 5 años, el cambio probablemente no se amortiza.
              </li>
            </ul>
            <p>
              El broker hipotecario integra estas tres variables y, sobre todo, sabe qué entidades
              están ofreciendo qué condiciones de fijo a fecha de hoy. La calculadora te dice si
              hay un problema; el broker lo resuelve.
            </p>
          </div>
        </Container>
      </Section>

      {/* FAQ */}
      <Section tone="paper" padding="md" title="Preguntas frecuentes sobre stress test Euríbor">
        <Container size="md">
          <Faq items={[...FAQ]} />
        </Container>
      </Section>

      {/* INTERNAL LINKING */}
      <Section tone="paper" padding="md" title="También te puede interesar">
        <Container size="lg">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <a
              href="/calculadora-hipoteca"
              className="block bg-paper-card border border-navy-100 rounded-xl p-6 hover:border-gold-400 hover:shadow-card transition-all no-underline"
            >
              <p className="text-xs uppercase tracking-wider text-gold-600 font-semibold mb-2">
                Otra herramienta
              </p>
              <h3 className="text-lg font-semibold text-navy-800 mb-2">Calculadora de hipoteca</h3>
              <p className="text-sm text-ink-soft">
                Cuota, intereses, LTV y ratio de esfuerzo de una operación nueva o existente.
              </p>
            </a>

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
                ¿Cuánto te daría el banco si pidieras una hipoteca hoy? 3 escenarios.
              </p>
            </a>

            <a
              href="/herramientas"
              className="block bg-paper-card border border-navy-100 rounded-xl p-6 hover:border-gold-400 hover:shadow-card transition-all no-underline"
            >
              <p className="text-xs uppercase tracking-wider text-gold-600 font-semibold mb-2">
                Catálogo completo
              </p>
              <h3 className="text-lg font-semibold text-navy-800 mb-2">Todas las herramientas</h3>
              <p className="text-sm text-ink-soft">
                Hub de calculadoras propietarias del despacho.
              </p>
            </a>

            <a
              href="/broker-hipotecario"
              className="block bg-paper-card border border-navy-100 rounded-xl p-6 hover:border-gold-400 hover:shadow-card transition-all no-underline"
            >
              <p className="text-xs uppercase tracking-wider text-gold-600 font-semibold mb-2">
                Servicio
              </p>
              <h3 className="text-lg font-semibold text-navy-800 mb-2">Broker hipotecario</h3>
              <p className="text-sm text-ink-soft">
                Si el stress test te dispara avisos, negociamos novación o subrogación.
              </p>
            </a>
          </div>
        </Container>
      </Section>

      {/* AUTORÍA */}
      <Section tone="soft" padding="md">
        <Container size="md">
          <div className="bg-paper-card border border-navy-100 rounded-xl p-6 md:p-8">
            <p className="text-xs uppercase tracking-wider text-gold-600 font-semibold mb-3">
              Quién hay detrás de esta herramienta
            </p>
            <h2 className="text-2xl font-bold text-navy-800 mb-3">
              Diseñada por {TONO.shortName}
            </h2>
            <p className="text-navy-700 leading-relaxed mb-3">
              Este stress test lo he programado yo, no es un script genérico. La diferencia
              operativa está en los avisos: no me limito a calcular la cuota proyectada, te digo
              qué hacer con ella en función del ratio de esfuerzo resultante y de cómo está tu TIN
              actual frente a la mediana de mercado.
            </p>
            <p className="text-navy-700 leading-relaxed mb-0">
              Si el resultado te dispara avisos críticos, podemos hablar de novación o
              subrogación.{' '}
              <a
                href="/broker-hipotecario"
                className="text-navy-700 hover:text-navy-900 underline font-semibold"
              >
                Trabajemos juntos como broker hipotecario
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
            ¿El escenario adverso te quita el sueño?
          </h2>
          <p className="text-paper/85 text-lg mb-8 max-w-prose mx-auto">
            Si la calculadora te pone en zona roja, hablemos antes de que la próxima revisión
            llegue. Tres palancas posibles: amortización anticipada, novación, subrogación. La
            decisión correcta depende de tu caso completo.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button href={MORTGAGE_FORM_URL} variant="gold" size="lg" target="_blank" rel="noopener noreferrer">
              Solicitar análisis con {TONO.shortName} →
            </Button>
            <Button href="/broker-hipotecario" variant="primary" size="lg">
              Ver servicio de broker
            </Button>
          </div>
        </Container>
      </Section>
    </main>
  )
}
