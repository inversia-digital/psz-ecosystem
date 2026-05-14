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
import { SelloPalacios } from '../_components/SelloPalacios'
import ComparadorForm from './ComparadorForm'

const URL = `${SITE_URLS.psz}/comparador-hipoteca-fija-variable-mixta`

// ─────────────────────────────────────────────────────────────────────────
// METADATA
// ─────────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title:
    'Comparador hipoteca fija vs variable vs mixta 2026 · Toño Palacios broker E242',
  description:
    'Comparador propietario de hipoteca fija, variable y mixta diseñado y programado por Toño Palacios, broker hipotecario nº E242 (Banco de España) y presidente de ANICI. Calcula las 3 modalidades en paralelo con el mismo importe y plazo, simula 3 escenarios de evolución del Euríbor (estable, +1pp, +2pp) y muestra cuál es la mejor en cada escenario según intereses totales proyectados. Año a año, no fórmula estática.',
  alternates: { canonical: URL },
  robots: { index: true, follow: true },
  authors: [{ name: TONO.fullName, url: `${SITE_URLS.psz}/sobre-mi` }],
  creator: `${TONO.fullName} (${TONO.shortName})`,
  publisher: 'Inversia Global Digital, S.L.U.',
  keywords: [
    'comparador hipoteca fija variable mixta',
    'hipoteca fija o variable 2026',
    'mejor hipoteca fija o variable',
    'cuanto cuesta hipoteca fija vs variable',
    'simulador hipoteca mixta',
    'comparativa hipotecas',
    'hipoteca fija variable intereses totales',
    'tramo fijo mixta cuanto',
    'que hipoteca elegir',
  ],
  openGraph: {
    type: 'website',
    url: URL,
    siteName: 'psz.es',
    locale: 'es_ES',
    title: 'Comparador hipoteca fija vs variable vs mixta · Toño Palacios',
    description:
      'Las 3 modalidades en paralelo con el mismo importe + plazo, en 3 escenarios de Euríbor. Decide con números, no por intuición.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Comparador fija vs variable vs mixta · psz.es',
    description: '3 modalidades × 3 escenarios de Euríbor. Por Toño Palacios broker E242.',
  },
}

// ─────────────────────────────────────────────────────────────────────────
// FAQ
// ─────────────────────────────────────────────────────────────────────────

const FAQ = [
  {
    question: '¿Qué diferencia hay entre hipoteca fija, variable y mixta?',
    answer:
      'La hipoteca fija mantiene el mismo TIN durante toda la vida del préstamo y la cuota es constante. La variable se referencia al Euríbor más un diferencial pactado y revisa la cuota cada 6 o 12 meses. La mixta combina ambas: TIN fijo durante los primeros años (típicamente 3, 5, 7 o 10) y después pasa a variable referenciada al Euríbor.',
  },
  {
    question: '¿Cuál es la mejor opción en 2026?',
    answer:
      'Depende del horizonte y la aversión al riesgo, no hay respuesta universal. Si valoras predictibilidad y vas a vivir en la casa más de 10 años, fija. Si crees que el Euríbor bajará o vas a vender pronto, variable. Mixta es el equilibrio para primerizos con horizonte intermedio y deseo de blindar los primeros años. El comparador te lo cuantifica en 3 escenarios de Euríbor.',
  },
  {
    question: '¿Por qué la calculadora simula con tres escenarios de Euríbor?',
    answer:
      'Porque el Euríbor no es predecible. El escenario "estable" asume que se mantiene en el valor actual; "+1pp" es un movimiento plausible en 12-18 meses; "+2pp" es adverso, similar a lo que pasó en 2022-2023. Mirar los tres a la vez te muestra si tu decisión es robusta o cambia según el camino que tome el Euríbor.',
  },
  {
    question: '¿Por qué a veces gana la fija en estable pero la variable cuando sube el Euríbor?',
    answer:
      'Suena paradójico pero pasa cuando el TIN fijo es muy alto frente a la variable inicial y aun así sigue siendo más bajo que la variable proyectada en escenarios de subida. También influye el plazo: cuanto más largo, más impacto tiene la subida acumulada del Euríbor sobre la variable. Es exactamente lo que el comparador permite ver visualmente.',
  },
  {
    question: '¿Qué tramo fijo conviene en una hipoteca mixta?',
    answer:
      'Operativamente, entre 7 y 10 años es el sweet spot. Cubre la fase de mayor estrés financiero (primeros años con cuota más alta sobre ingresos), durante esos años amortizas capital y reduces la sensibilidad al Euríbor del tramo variable posterior. Tramos fijos de menos de 5 años suelen ser insuficientes; tramos de más de 12 años empiezan a ser cara la fija pura.',
  },
  {
    question: '¿Cómo afecta el plazo a la elección?',
    answer:
      'A más plazo, más exposición acumulada al Euríbor en la variable. Una hipoteca a 30 años en variable acumula muchísima sensibilidad — basta con que el Euríbor suba 1 punto y mantenga ese nivel para que pagues decenas de miles de euros más. A 15 años el impacto es mucho menor porque amortizas rápido. Plazos largos favorecen fija o mixta con tramo fijo largo.',
  },
  {
    question: '¿Qué pasa con las bonificaciones por vinculaciones?',
    answer:
      'No se incluyen en este comparador (el TIN que introduces es el neto pactado). Si quieres ver el efecto de las vinculaciones, prueba a meter el TIN bonificado y, por separado, el TIN sin bonificar. La diferencia te dice cuánto vale realmente vincularte y si compensa el coste de los productos asociados.',
  },
  {
    question: '¿La calculadora incluye comisiones de apertura?',
    answer:
      'No. Sólo simula intereses totales por amortización francesa. Las comisiones de apertura (típicamente 0,5-1,5% del importe), gestoría y tasación son gastos pre-firma adicionales que no varían entre las 3 modalidades — la elección no se ve afectada. Sí pueden cambiar tu cash necesario inicial.',
  },
  {
    question: '¿Conviene novar variable a fija si veo que ganaría la fija?',
    answer:
      'A veces sí, a veces no. La novación tiene comisiones, la tasación nueva cuesta dinero y el TIN fijo actual del mercado puede ser distinto al que introdujiste aquí. Para una decisión real, calcula el coste de novar + intereses futuros de la fija nueva y compara con seguir variable. El broker hipotecario hace esa cuenta con los TINs reales disponibles hoy.',
  },
  {
    question: '¿Sustituye este comparador al consejo de un broker?',
    answer:
      'No. Te da la fotografía cuantitativa de las 3 modalidades. Pero la decisión incluye factores no calculables aquí: tu liquidez, otras deudas, expectativa de cambios laborales, posibilidad de amortización anticipada en los próximos años, mejores ofertas reales de mercado. El broker integra eso y negocia con varios bancos.',
  },
] as const

// ─────────────────────────────────────────────────────────────────────────
// Página
// ─────────────────────────────────────────────────────────────────────────

export default function ComparadorPage() {
  return (
    <main>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Inicio', url: SITE_URLS.psz },
          { name: 'Herramientas', url: `${SITE_URLS.psz}/herramientas` },
          { name: 'Comparador fija/variable/mixta', url: URL },
        ])}
      />
      <JsonLd
        data={webApplicationSchema({
          url: URL,
          name: 'Comparador hipoteca fija vs variable vs mixta',
          description:
            'Calculadora propietaria que compara las tres modalidades de hipoteca residencial española (fija, variable, mixta) en paralelo con el mismo importe y plazo, simulando 3 escenarios de evolución del Euríbor (estable, +1pp, +2pp). Devuelve cuota inicial, cuota promedio proyectada, intereses totales y modalidad ganadora en cada escenario.',
          category: 'FinanceApplication',
          features: [
            'Comparación de las 3 modalidades en paralelo',
            'Mismo importe y plazo en las 3 columnas',
            '3 escenarios de evolución del Euríbor (estable, +1pp, +2pp)',
            'Simulación año a año con TIN proyectado',
            'Cuota inicial, promedio, mínima y máxima por modalidad',
            'Intereses totales proyectados',
            'Modalidad ganadora destacada en cada escenario',
            'Avisos automáticos sobre spread fija-variable, tramo fijo mixta y plazo largo',
            'Cálculo server-side (lógica protegida, no scrapeable)',
          ],
        })}
      />
      <JsonLd data={faqPageSchema([...FAQ])} />
      <JsonLd
        data={speakableWebPageSchema({
          url: URL,
          name: 'Comparador hipoteca fija vs variable vs mixta',
          description: 'Comparación de las 3 modalidades en paralelo con simulación año a año.',
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
            <span className="text-sm text-paper/85">Comparador fija/variable/mixta</span>
          </nav>

          <p className="text-gold-300 text-sm uppercase tracking-wider mb-3">
            Herramienta propietaria con El Sello Palacios · 3 modalidades × 3 escenarios Euríbor
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-paper leading-tight mb-4">
            Comparador hipoteca fija vs variable vs mixta
          </h1>
          <p className="speakable-summary text-lg text-paper/85 max-w-3xl">
            Las tres modalidades en paralelo con el mismo importe y plazo. Simulación año a año
            en tres escenarios de evolución del Euríbor (estable, +1pp, +2pp). Cuota inicial,
            cuota promedio proyectada, intereses totales y modalidad ganadora en cada escenario.
            Decide con números, no por intuición.
          </p>
        </Container>
      </Section>

      {/* CALCULADORA */}
      <Section tone="paper" padding="md">
        <Container size="xl">
          <ComparadorForm />
        </Container>
      </Section>

      {/* ADVERTENCIA LEGAL */}
      <Section tone="paper" padding="sm">
        <Container size="md">
          <LegalDisclaimer variant="mortgage" />
        </Container>
      </Section>

      {/* CÓMO LEE UN BROKER */}
      <Section tone="soft" padding="md" title="Cómo lee un broker estos resultados">
        <Container size="md">
          <AnswerCard question="¿Mejor hipoteca fija, variable o mixta?">
            No hay respuesta universal — depende de tu horizonte y aversión al riesgo. La fija
            blinda toda la vida del préstamo a cambio de TIN inicial más alto. La variable empieza
            barata pero queda expuesta al Euríbor. La mixta combina ambas. Este comparador te
            cuantifica las 3 modalidades en 3 escenarios de Euríbor para que veas si tu decisión
            es robusta (gana la misma en los 3) o sensible al camino que tome el Euríbor. Toño
            Palacios (broker E242) lo integra con tu liquidez, otras deudas y mejor oferta real
            de mercado.
          </AnswerCard>
          <div className="prose-psz">
            <p>
              La pregunta correcta no es <em>"¿cuál es la mejor modalidad?"</em>, sino{' '}
              <em>"¿cuál es la mejor modalidad para mí?"</em>. El comparador te da los números;
              la decisión final integra tres capas:
            </p>
            <ul>
              <li>
                <strong>Horizonte de permanencia.</strong> Si planeas vender en menos de 5 años,
                la variable suele compensar — pagas poco al principio, vendes antes de que se
                materialice el riesgo. Si vas a vivir allí 15+ años, la fija da margen de
                seguridad importante.
              </li>
              <li>
                <strong>Capacidad de absorber sorpresas.</strong> Si la subida +2pp del Euríbor
                te lleva al 45% de ratio de esfuerzo, la variable no es opción independientemente
                de los números. La predictibilidad tiene valor.
              </li>
              <li>
                <strong>Expectativa sobre los tipos.</strong> Nadie predice tipos a 30 años,
                pero el BCE comunica trayectoria a 18-24 meses. Si esperas que el Euríbor se
                mantenga estable o baje, variable; si esperas subidas, fija o mixta.
              </li>
            </ul>
            <p>
              Si el comparador muestra que la misma modalidad gana en los 3 escenarios, tu
              decisión es robusta. Si el ganador cambia según el escenario, tu decisión depende
              de lo que creas que pasará con el Euríbor — y entonces conviene también revisar el{' '}
              <a href="/calculadora-stress-test-euribor">stress test</a> para ver el impacto en
              tu cuota mensual si te equivocas.
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

      {/* INTERNAL LINKING */}
      <Section tone="paper" padding="md" title="También te puede interesar">
        <Container size="lg">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <a
              href="/calculadora-stress-test-euribor"
              className="block bg-paper-card border border-navy-100 rounded-xl p-6 hover:border-gold-400 hover:shadow-card transition-all no-underline"
            >
              <p className="text-xs uppercase tracking-wider text-gold-600 font-semibold mb-2">
                Herramienta
              </p>
              <h3 className="text-lg font-semibold text-navy-800 mb-2">Stress test Euríbor</h3>
              <p className="text-sm text-ink-soft">
                Si te has decantado por variable o mixta, verifica el impacto en tu cuota si el
                Euríbor sube.
              </p>
            </a>
            <a
              href="/calculadora-hipoteca"
              className="block bg-paper-card border border-navy-100 rounded-xl p-6 hover:border-gold-400 hover:shadow-card transition-all no-underline"
            >
              <p className="text-xs uppercase tracking-wider text-gold-600 font-semibold mb-2">
                Herramienta
              </p>
              <h3 className="text-lg font-semibold text-navy-800 mb-2">Calculadora de hipoteca</h3>
              <p className="text-sm text-ink-soft">
                Una vez elegida la modalidad, calcula cuota, intereses, LTV y ratio de esfuerzo.
              </p>
            </a>
            <a
              href="/hipoteca-primera-vivienda"
              className="block bg-paper-card border border-navy-100 rounded-xl p-6 hover:border-gold-400 hover:shadow-card transition-all no-underline"
            >
              <p className="text-xs uppercase tracking-wider text-gold-600 font-semibold mb-2">
                Pillar guía
              </p>
              <h3 className="text-lg font-semibold text-navy-800 mb-2">
                Hipoteca primera vivienda
              </h3>
              <p className="text-sm text-ink-soft">
                Guía completa del comprador primerizo. Cash necesario, ayudas, scoring.
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
                Negocio TIN de las 3 modalidades con +20 entidades para tu caso concreto.
              </p>
            </a>
          </div>
        </Container>
      </Section>

      {/* AUTORÍA */}
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
              Este comparador lo he diseñado yo, no es la suma de tres simuladores genéricos. La
              diferencia operativa: simulamos año a año (no fórmula estática) las tres
              modalidades con el mismo capital y plazo, en tres escenarios de Euríbor en
              paralelo. Y el aviso final te dice si tu decisión es robusta (mismo ganador en los
              3 escenarios) o sensible al camino del Euríbor.
            </p>
            <p className="text-navy-700 leading-relaxed mb-0">
              Si quieres que negocie las ofertas reales de las 3 modalidades con varios bancos
              para tu caso concreto,{' '}
              <a
                href="/broker-hipotecario"
                className="text-navy-700 hover:text-navy-900 underline font-semibold"
              >
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
            ¿Decidido o todavía dudas entre modalidades?
          </h2>
          <p className="text-paper/85 text-lg mb-8 max-w-prose mx-auto">
            Si el comparador deja claro que tu decisión es robusta, ya sabes el siguiente paso.
            Si el ganador cambia según el escenario, hablemos: integramos tu situación completa y
            negocio las 3 modalidades con varios bancos.
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
