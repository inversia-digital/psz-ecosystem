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
import CapacidadForm from './CapacidadForm'

const URL = `${SITE_URLS.psz}/calculadora-capacidad-endeudamiento`

// ─────────────────────────────────────────────────────────────────────────
// METADATA SEO
// ─────────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title:
    'Calculadora capacidad de endeudamiento 2026 · ¿Cuánto te daría el banco? · Toño Palacios',
  description:
    'Calculadora propietaria de capacidad de endeudamiento hipotecaria diseñada y programada por Toño Palacios, broker hipotecario nº E242 (Banco de España) y presidente de ANICI. Calcula cuánta hipoteca te concedería realmente un banco español según tus ingresos netos, edad, otras deudas mensuales y aporte propio. 3 escenarios paralelos: conservador (ratio esfuerzo 30%), estándar (35%, tope habitual de la banca minorista) y agresivo (40%, solo con perfiles muy sólidos). Aplica criterios reales de mesa de riesgos (LTV, plazo recortado por edad, ratio deudas). Cálculo server-side, lógica propietaria.',
  alternates: { canonical: URL },
  robots: { index: true, follow: true },
  authors: [{ name: TONO.fullName, url: `${SITE_URLS.psz}/sobre-mi` }],
  creator: `${TONO.fullName} (${TONO.shortName})`,
  publisher: 'Inversia Global Digital, S.L.U.',
  keywords: [
    'calculadora capacidad endeudamiento',
    'cuanto banco me presta hipoteca',
    'cuanta hipoteca me dan',
    'calculadora cuánto me presta el banco',
    'capacidad de endeudamiento hipoteca',
    'cuanta hipoteca puedo pedir',
    'simulador capacidad endeudamiento',
    'ratio esfuerzo hipoteca calculadora',
    'cuánto me da el banco para comprar piso',
    'capacidad de pago hipoteca',
  ],
  openGraph: {
    type: 'website',
    url: URL,
    siteName: 'psz.es',
    locale: 'es_ES',
    title: 'Calculadora de capacidad de endeudamiento — ¿Cuánto te darían?',
    description:
      'Calcula cuánta hipoteca te aprobaría un banco según tus ingresos, edad, deudas y aporte propio. 3 escenarios paralelos según ratio de esfuerzo.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Calculadora de capacidad de endeudamiento · psz.es',
    description: '¿Cuánto banco te darían realmente? 3 escenarios paralelos según ratio de esfuerzo.',
  },
}

// ─────────────────────────────────────────────────────────────────────────
// FAQ
// ─────────────────────────────────────────────────────────────────────────

const FAQ = [
  {
    question: '¿Qué es la capacidad de endeudamiento hipotecaria?',
    answer:
      'La capacidad de endeudamiento es el importe máximo de hipoteca que un banco te concedería sin superar su umbral interno de riesgo. La banca minorista española suele aceptar que la cuota mensual (incluyendo otras deudas) no supere el 35-40% de los ingresos netos del titular o titulares.',
  },
  {
    question: '¿Cuál es la fórmula real que usa el banco?',
    answer:
      'Hay tres filtros simultáneos: (1) ratio de esfuerzo máximo del 35-40% sobre ingresos netos, incluyendo otras deudas; (2) plazo máximo recortado para que la hipoteca termine antes de los 75 años del titular más mayor; (3) LTV máximo del 80% en primera vivienda y 60-70% en inversión. El banco aplica el más restrictivo de los tres.',
  },
  {
    question: '¿Por qué la calculadora muestra 3 escenarios y no uno?',
    answer:
      'Porque el banco no tiene un único umbral. Trabaja con un rango. El escenario conservador (30% ratio) es el que aprueba sin discusión; el estándar (35%) es la mediana; el agresivo (40%) sólo entra con perfiles muy sólidos y sin otras deudas. Ver los 3 te da el rango realista de tu operación.',
  },
  {
    question: '¿Influye mi edad en la capacidad de endeudamiento?',
    answer:
      'Sí. La mayoría de bancos españoles exige que la hipoteca termine antes de los 75 años del titular más mayor (algunos amplían a 80 con vida laboral demostrable). Si tienes 50 años, el plazo máximo será de 25 años en vez de 30 — la cuota mensual sube y el importe financiable baja.',
  },
  {
    question: '¿Cuánto sube mi capacidad si añado un co-titular?',
    answer:
      'Suben los ingresos sumados pero también puede subir la edad máxima si el co-titular es mayor. La mejora suele estar entre 30% y 60% sobre la capacidad individual, dependiendo de si el co-titular tiene otras deudas y de cuántos años haya entre los dos.',
  },
  {
    question: '¿Qué pasa si tengo otras deudas?',
    answer:
      'Cada euro de cuota mensual que ya pagas (préstamo personal, financiera del coche, leasing, otra hipoteca) es un euro menos disponible para la cuota hipotecaria nueva. La banca aplica el ratio del 35% sobre el TOTAL de cuotas, no solo la hipoteca. Reducir deudas antes de pedir la hipoteca es la palanca más rápida para aumentar capacidad.',
  },
  {
    question: '¿Qué TIN debo usar en el simulador?',
    answer:
      'En mayo 2026 el TIN mediano para primera vivienda está alrededor del 3,5-4% en hipoteca fija. Para inversión sube al 4,5-5,5%. Usa el slider para ver cómo cambia tu capacidad si el TIN sube o baja — un punto porcentual cambia tu capacidad financiable un 10-12% aprox.',
  },
  {
    question: '¿Es lo mismo capacidad de endeudamiento y precio máximo del inmueble?',
    answer:
      'No. La capacidad de endeudamiento es el importe que te presta el banco. El precio máximo del inmueble es esa cantidad MÁS tu aporte propio (entrada + gastos de cierre). Si tu capacidad es 200.000 € y tienes 50.000 € de aporte, puedes comprar un inmueble de hasta 250.000 € aproximadamente, dejando margen para los gastos de cierre.',
  },
  {
    question: '¿Por qué algunos perfiles cobran lo mismo y reciben hipotecas muy distintas?',
    answer:
      'Porque ingresos no es el único filtro. Estabilidad laboral (autónomo vs nómina indefinida vs funcionario), vinculación a productos del banco, edad, historial crediticio (CIRBE) y composición del aporte propio cambian dramáticamente la respuesta del banco. Dos personas con 3.000€/mes pueden recibir ofertas de 200.000€ y 280.000€ por el mismo precio.',
  },
  {
    question: '¿Esta calculadora sustituye al estudio de un broker?',
    answer:
      'No. Es una primera aproximación realista, pero el estudio profesional incluye análisis del expediente completo, identificación de qué bancos son receptivos a tu perfil concreto y negociación de condiciones. La calculadora te dice si tu caso es viable; el broker maximiza la oferta.',
  },
] as const

// ─────────────────────────────────────────────────────────────────────────
// Página
// ─────────────────────────────────────────────────────────────────────────

export default function CalculadoraCapacidadPage() {
  return (
    <main>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Inicio', url: SITE_URLS.psz },
          { name: 'Calculadora de capacidad de endeudamiento', url: URL },
        ])}
      />
      <JsonLd
        data={webApplicationSchema({
          url: URL,
          name: 'Calculadora de capacidad de endeudamiento',
          description:
            'Calculadora propietaria que estima cuánta hipoteca te concedería la banca minorista española según ingresos, edad, otras deudas y aporte propio. Aplica los criterios reales de scoring bancario (ratio de esfuerzo, plazo por edad, LTV implícito).',
          category: 'FinanceApplication',
          features: [
            'Cálculo de cuota mensual máxima admisible por el banco',
            'Cálculo del importe máximo financiable según ratio de esfuerzo',
            'Cálculo del precio máximo del inmueble (importe + aporte propio)',
            'Cálculo del LTV implícito',
            'Plazo máximo recortado por edad del titular',
            'Soporte para co-titular (pareja)',
            'Descuento de otras deudas mensuales existentes',
            '3 escenarios paralelos: conservador (30%), estándar (35%), agresivo (40%)',
            'Avisos automáticos sobre rangos críticos del scoring bancario',
            'Cálculo server-side (lógica protegida, no scrapeable)',
          ],
        })}
      />
      <JsonLd data={faqPageSchema([...FAQ])} />
      <JsonLd
        data={speakableWebPageSchema({
          url: URL,
          name: 'Calculadora de capacidad de endeudamiento',
          description:
            'Calcula cuánta hipoteca te concedería el banco según tus ingresos, edad, otras deudas y aporte propio. 3 escenarios paralelos según ratio de esfuerzo.',
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
            <span className="text-sm text-paper/85">Calculadora capacidad de endeudamiento</span>
          </nav>

          <p className="text-gold-300 text-sm uppercase tracking-wider mb-3">
            Herramienta propietaria con El Sello Palacios · 3 escenarios · Cálculo server-side
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-paper leading-tight mb-4">
            Calculadora de capacidad de endeudamiento
          </h1>
          <p className="speakable-summary text-lg text-paper/80 max-w-3xl">
            ¿Cuánto te daría realmente el banco? Calcula tu capacidad de endeudamiento hipotecaria
            según tus ingresos, edad, otras deudas y aporte propio. Tres escenarios paralelos según
            ratio de esfuerzo (30%, 35%, 40%) — el rango realista entre lo que aprobaría sin
            discusión y el techo absoluto.
          </p>
        </Container>
      </Section>

      {/* CALCULADORA */}
      <Section tone="paper" padding="md">
        <Container size="xl">
          <CapacidadForm />
        </Container>
      </Section>

      {/* ADVERTENCIA LEGAL — concesión depende del banco */}
      <Section tone="paper" padding="sm">
        <Container size="md">
          <LegalDisclaimer variant="mortgage" />
        </Container>
      </Section>

      {/* AVISO LEGAL */}
      <Section tone="paper" padding="md">
        <Container size="md">
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 text-sm leading-relaxed text-amber-900">
            <p className="font-bold text-amber-950 mb-2">Aviso legal — léelo antes de tomar decisiones</p>
            <p className="mb-2">
              Esta herramienta es una calculadora orientativa. <strong>No constituye oferta vinculante
              de hipoteca</strong> ni asesoramiento financiero personalizado en los términos del
              artículo 19 de la Ley 5/2019 de Contratos de Crédito Inmobiliario.
            </p>
            <p className="mb-2">
              La capacidad calculada se basa en los criterios habituales de la banca minorista
              española (ratio de esfuerzo 30-40%, plazo máximo recortado por edad, LTV típico 80%),
              pero cada entidad tiene sus propios umbrales que pueden variar caso a caso. El
              importe que finalmente apruebe el banco depende también del scoring crediticio
              completo (CIRBE, antigüedad laboral, vinculaciones, productos cruzados, garantías
              adicionales) que no se simula aquí.
            </p>
            <p>
              El único documento <strong>vinculante</strong> es la Ficha Europea de Información
              Normalizada (FEIN) que el banco entrega antes de la firma, conforme al artículo 14
              de la Ley 5/2019, con un periodo de reflexión obligatorio de diez (10) días naturales.
            </p>
          </div>
        </Container>
      </Section>

      {/* COMO LEE UN BROKER */}
      <Section tone="soft" padding="md" title="Cómo lee un broker estos números">
        <Container size="md">
          <AnswerCard question="¿Cuánta hipoteca me daría el banco?">
            Tu capacidad de endeudamiento depende de cuatro variables: ingresos netos mensuales,
            edad del titular más mayor (que recorta el plazo máximo), otras deudas existentes y
            aporte propio disponible. La banca minorista española aplica un ratio de esfuerzo
            máximo del 35% y un plazo máximo que cierre antes de los 75 años. Toño Palacios,
            broker hipotecario nº E242, opera con +20 entidades y conoce qué bancos amplían
            esos umbrales en perfiles concretos.
          </AnswerCard>
          <div className="prose-psz">
            <p>
              El número que devuelve la calculadora es el techo aproximado de la banca minorista.
              Pero la oferta real depende de tres capas adicionales que solo se valoran caso por caso:
            </p>
            <ul>
              <li>
                <strong>Tipo de contrato laboral.</strong> Funcionario y nómina indefinida desde
                hace ≥2 años son los perfiles cómodos. Autónomos necesitan dos ejercicios IRPF
                cerrados — sin eso, la mitad de bancos rechaza directamente.
              </li>
              <li>
                <strong>CIRBE y scoring crediticio.</strong> Si tienes incidencias previas (ASNEF,
                CIRBE positiva, devoluciones recientes), el banco corta antes de mirar el ratio.
                La calculadora no simula esto porque no es público.
              </li>
              <li>
                <strong>Vinculaciones que estás dispuesto a aceptar.</strong> Domiciliar nómina,
                contratar seguro de hogar y vida con el banco, plan de pensiones — cada
                vinculación bonifica el TIN entre 0,1 y 0,4 puntos. Con bonificaciones, tu
                capacidad sube porque la cuota baja.
              </li>
            </ul>
            <p>
              Si la calculadora te dispara un aviso o te encajas en el escenario agresivo, el broker
              entra precisamente ahí: a maximizar la oferta moviendo las palancas que no se
              calculan en un simulador.
            </p>
          </div>
        </Container>
      </Section>

      {/* FAQ */}
      <Section
        tone="paper"
        padding="md"
        title="Preguntas frecuentes sobre capacidad de endeudamiento"
      >
        <Container size="md">
          <Faq items={[...FAQ]} />
        </Container>
      </Section>

      {/* INTERNAL LINKING */}
      <Section tone="paper" padding="md" title="También te puede interesar">
        <Container size="lg">
          <div className="grid md:grid-cols-3 gap-4">
            <a
              href="/calculadora-hipoteca"
              className="block bg-paper-card border border-navy-100 rounded-xl p-6 hover:border-gold-400 hover:shadow-card transition-all no-underline"
            >
              <p className="text-xs uppercase tracking-wider text-gold-600 font-semibold mb-2">
                Otra herramienta
              </p>
              <h3 className="text-lg font-semibold text-navy-800 mb-2">Calculadora de hipoteca</h3>
              <p className="text-sm text-ink-soft">
                Una vez sabes cuánto te darían, calcula la cuota exacta, intereses totales, LTV y
                ratio de esfuerzo de tu operación.
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
                Calculadora de rentabilidad inmobiliaria
              </h3>
              <p className="text-sm text-ink-soft">
                Si vas a invertir, calcula rentabilidad de adquisición, real, flujo neto mensual y
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
                Si la calculadora te dispara un aviso, llámame antes de presentar la operación.
                +20 bancos, criterios reales de scoring.
              </p>
            </a>
          </div>
          <div className="mt-4 bg-gold-50 border border-gold-300 rounded-lg p-4 text-center">
            <p className="text-sm text-navy-800">
              ¿Es tu primera vivienda? Lee la{' '}
              <a
                href="/hipoteca-primera-vivienda"
                className="text-navy-700 hover:text-navy-900 underline font-semibold"
              >
                guía completa del comprador primerizo
              </a>{' '}
              para entender cuánto cash necesitas, qué ayudas aplican y cómo te valora el banco.
            </p>
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
              Esta calculadora la he diseñado yo, no un comparador genérico. La diferencia está en
              los umbrales: el ratio del 35%, la edad de cierre a 75, el corte de viabilidad en
              30% de deudas previas — son los números reales con los que la banca minorista
              española aprueba o rechaza operaciones, no fórmulas matemáticas de manual.
            </p>
            <p className="text-navy-700 leading-relaxed mb-0">
              Si la calculadora te encaja en el escenario conservador, tu caso está cómodo. Si te
              encaja en el agresivo o te dispara avisos, hay margen pero hace falta un broker que
              elija el banco correcto y prepare el dossier.{' '}
              <a href="/broker-hipotecario" className="text-navy-700 hover:text-navy-900 underline font-semibold">
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
            ¿Tu capacidad te encaja con el precio que buscas?
          </h2>
          <p className="text-paper/80 text-lg mb-8 max-w-prose mx-auto">
            Si la calculadora te encaja en escenario conservador o estándar, tu caso es viable. Si
            te encaja agresivo o te dispara avisos, llámame antes de presentar la operación a un
            banco — la diferencia entre un "no" y un "sí" se decide en el dossier.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button href={`${MORTGAGE_FORM_URL}?origen=capacidad-endeudamiento`} variant="gold" size="lg" target="_blank" rel="noopener noreferrer">
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
