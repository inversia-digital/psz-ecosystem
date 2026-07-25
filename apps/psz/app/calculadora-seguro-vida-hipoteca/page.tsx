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
import SeguroVidaForm from './SeguroVidaForm'

const URL = `${SITE_URLS.psz}/calculadora-seguro-vida-hipoteca`

// ─────────────────────────────────────────────────────────────────────────
// METADATA
// ─────────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title:
    'Calculadora seguro de vida hipoteca · ¿Pagas de más con el banco? · Toño Palacios broker E242',
  description:
    'Calculadora del seguro de vida vinculado a tu hipoteca, diseñada por Toño Palacios, broker hipotecario nº E242 (Banco de España) y presidente de ANICI. Estima la prima anual de mercado por edad, capital y coberturas, la compara con la referencia típica de póliza bancaria (2-3× más cara) y te da el veredicto: ¿te compensa desvincular el seguro del banco aunque pierdas la bonificación de TIN? Con el marco de la Ley 5/2019. Cálculo server-side, gratis, sin registro.',
  alternates: { canonical: URL },
  robots: { index: true, follow: true },
  authors: [{ name: TONO.fullName, url: `${SITE_URLS.psz}/sobre-mi` }],
  creator: `${TONO.fullName} (${TONO.shortName})`,
  publisher: 'Inversia Global Digital, S.L.U.',
  keywords: [
    'calculadora seguro de vida hipoteca',
    'seguro de vida hipoteca calcular',
    'cuanto cuesta seguro de vida hipoteca',
    'seguro vida vinculado banco caro',
    'quitar seguro de vida del banco',
    'cambiar seguro vida hipoteca',
    'bonificacion tin seguro vida',
    'seguro vida hipoteca obligatorio',
    'prima unica financiada hipoteca',
    'ley 5/2019 productos vinculados',
  ],
  openGraph: {
    type: 'website',
    url: URL,
    siteName: 'psz.es',
    locale: 'es_ES',
    title: 'Calculadora seguro de vida hipoteca · ¿Pagas de más con el banco? · Toño Palacios',
    description:
      'Banda de mercado por tu perfil vs lo que pagas hoy, y el veredicto: ¿compensa desvincular aunque pierdas la bonificación? Server-side, sin registro.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Calculadora seguro de vida hipoteca · psz.es',
    description:
      '¿El seguro de vida del banco te cuesta el doble? Calcula tu banda de mercado y el veredicto de desvincular. Por Toño Palacios broker E242.',
  },
}

// ─────────────────────────────────────────────────────────────────────────
// FAQ
// ─────────────────────────────────────────────────────────────────────────

const FAQ = [
  {
    question: '¿Es obligatorio contratar el seguro de vida con la hipoteca?',
    answer:
      'No. Ningún banco puede obligarte a contratar un seguro de vida para concederte la hipoteca. Lo que sí permite la Ley 5/2019 (art. 17) es BONIFICAR el tipo de interés si contratas productos vinculados como el seguro de vida. Además, el banco está obligado a aceptar pólizas alternativas de otra aseguradora con condiciones equiparables, sin empeorar la oferta y sin cobrarte por analizarlas.',
  },
  {
    question: '¿Cuánto cuesta un seguro de vida para la hipoteca?',
    answer:
      'Depende sobre todo de la edad, el capital asegurado, si fumas y las coberturas (solo fallecimiento o también invalidez). Como orden de magnitud de mercado en pólizas individuales: un no fumador de 30-35 años por 100.000 € de capital paga en torno a 70-120 € al año; a los 45, unos 200-300 €; a partir de 55 la prima crece deprisa. Las pólizas colocadas por la banca suelen costar entre 2 y 3 veces más que las individuales equivalentes, según estudios del sector.',
  },
  {
    question: '¿Por qué el seguro de vida del banco es más caro?',
    answer:
      'Porque no compite: se vende en el momento de la firma, cuando el cliente no compara, y a menudo con capital fijo (no decreciente) y recargos de distribución altos. Estudios de asociaciones de consumidores y del sector asegurador sitúan el sobreprecio medio de las pólizas bancarias en 2-3 veces la prima de una póliza individual equivalente. En una hipoteca a 25 años, esa diferencia puede superar varios miles de euros.',
  },
  {
    question: '¿Qué es la prima única financiada (PUF) y por qué debo evitarla?',
    answer:
      'Es la modalidad en la que el banco calcula la prima de varios años (o de toda la vida del préstamo), la suma al capital de la hipoteca y te la financia — con intereses. Pagas el seguro por adelantado, con deuda, y pierdes flexibilidad para cambiar de aseguradora. Los supervisores llevan años señalándola como práctica problemática. Si te la ofrecen, pide la alternativa de prima anual renovable.',
  },
  {
    question: '¿Puedo cambiar el seguro de vida de mi hipoteca a otra aseguradora?',
    answer:
      'Sí, en cualquier renovación. Pasos: (1) contrata la póliza nueva con capital y coberturas equiparables, con la cláusula del acreedor hipotecario si tu escritura la exige; (2) comunica a tu aseguradora actual la no renovación con al menos 30 días de antelación al vencimiento (art. 22 de la Ley de Contrato de Seguro); (3) informa al banco. Si tu hipoteca tiene bonificación por el seguro, comprueba antes qué pierdes: esta calculadora te hace esa cuenta.',
  },
  {
    question: '¿Pierdo la bonificación del TIN si cambio el seguro de aseguradora?',
    answer:
      'Depende de tu escritura. En muchas hipotecas la bonificación exige que el seguro esté contratado A TRAVÉS del banco; en otras basta con tener la cobertura, sea de quien sea. Si la pierdes, la cuenta es sencilla: bonificación en puntos × capital pendiente ≈ ahorro anual que dejas de tener. Si el sobreprecio del seguro bancario supera esa cifra, desvincular te compensa. Es exactamente la comparación que hace esta calculadora.',
  },
  {
    question: '¿Qué capital debo asegurar?',
    answer:
      'Lo razonable es asegurar el capital PENDIENTE de la hipoteca, y revisarlo cada año o cada pocos años a medida que amortizas. Muchas pólizas bancarias mantienen el capital inicial constante durante años: pagas cobertura por deuda que ya no existe. Las pólizas de capital decreciente o las renovables anuales ajustadas a deuda pendiente evitan ese sobrecoste.',
  },
  {
    question: '¿El beneficiario del seguro tiene que ser el banco?',
    answer:
      'Lo habitual es incluir una cláusula de designación del acreedor hipotecario: si falleces, el seguro paga primero la deuda pendiente al banco y el remanente va a tus herederos. Es legítimo y protege a tu familia de heredar la deuda. Lo que no es aceptable es asegurar capitales muy superiores a la deuda con el banco como único beneficiario.',
  },
  {
    question: 'Soy fumador o tengo una profesión de riesgo, ¿cambia mucho la prima?',
    answer:
      'Sí. El tabaco encarece la prima de forma sustancial (orientativamente un 50-80% más). Las profesiones de riesgo y ciertas condiciones de salud también añaden recargos o exclusiones, y las aseguradoras las valoran de forma distinta — precisamente por eso conviene cotizar en varias: la dispersión de precios entre compañías para un mismo perfil "no estándar" es enorme.',
  },
  {
    question: '¿Esta calculadora sustituye a un mediador de seguros?',
    answer:
      'No. Da una banda de mercado orientativa y la cuenta racional de la vinculación (sobreprecio vs bonificación), pero la contratación concreta — cuestionario de salud, exclusiones, carencias, cláusula del acreedor — es terreno del mediador de seguros o de la aseguradora. Como broker hipotecario te digo cuándo los números justifican moverse; la póliza te la debe colocar un profesional del seguro.',
  },
] as const

// ─────────────────────────────────────────────────────────────────────────
// Página
// ─────────────────────────────────────────────────────────────────────────

export default function CalculadoraSeguroVidaHipotecaPage() {
  return (
    <main>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Inicio', url: SITE_URLS.psz },
          { name: 'Herramientas', url: `${SITE_URLS.psz}/herramientas` },
          { name: 'Seguro de vida hipoteca', url: URL },
        ])}
      />
      <JsonLd
        data={webApplicationSchema({
          url: URL,
          name: 'Calculadora de seguro de vida de hipoteca',
          description:
            'Calculadora que estima la prima anual de mercado de un seguro de vida por edad, capital y coberturas, la compara con la referencia típica de póliza bancaria y calcula si compensa desvincular el seguro del banco frente a la bonificación de TIN (marco Ley 5/2019).',
          category: 'FinanceApplication',
          features: [
            'Banda de prima anual de mercado estimada (mín-media-máx) por edad, capital, tabaco e invalidez',
            'Referencia típica de póliza bancaria (2-3× mercado según estudios del sector)',
            'Comparativa con tu prima actual: sobreprecio anual y proyección a 10 años',
            'La cuenta de la bonificación: sobreprecio del seguro vs ahorro de TIN bonificado',
            'Veredicto: compensa desvincular / mantener / ajustado',
            'Avisos con el marco legal (Ley 5/2019 art. 17, LCS art. 22)',
            'Cálculo server-side (lógica protegida, no scrapeable)',
          ],
        })}
      />
      <JsonLd data={faqPageSchema([...FAQ])} />
      <JsonLd
        data={speakableWebPageSchema({
          url: URL,
          name: 'Calculadora seguro de vida hipoteca',
          description:
            'Estima tu prima de mercado, compárala con la del banco y descubre si te compensa desvincular.',
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
            <span className="text-sm text-paper/85">Seguro de vida hipoteca</span>
          </nav>

          <p className="text-gold-300 text-sm uppercase tracking-wider mb-3">
            Herramienta propietaria con El Sello Palacios · banda de mercado + veredicto de vinculación
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-paper leading-tight mb-4">
            Calculadora de seguro de vida de hipoteca
          </h1>
          <p className="speakable-summary text-lg text-paper/85 max-w-3xl">
            El seguro de vida que se firma con la hipoteca suele costar 2-3 veces más que el mismo
            seguro contratado fuera. Esta calculadora estima tu banda de mercado por edad, capital
            y coberturas, la compara con lo que pagas hoy y hace la cuenta que casi nadie hace:
            ¿te compensa desvincular aunque pierdas la bonificación de TIN?
          </p>
        </Container>
      </Section>

      {/* CALCULADORA */}
      <Section tone="paper" padding="md">
        <Container size="xl">
          <SeguroVidaForm />
        </Container>
      </Section>

      {/* ADVERTENCIA LEGAL */}
      <Section tone="paper" padding="sm">
        <Container size="md">
          <LegalDisclaimer variant="mortgage" />
          <p className="text-xs text-ink-muted leading-relaxed mt-3">
            Las primas mostradas son estimaciones orientativas de mercado por perfil actuarial
            genérico; la prima real depende de la aseguradora, el cuestionario de salud, la
            profesión y las coberturas exactas. Esta herramienta no constituye mediación de
            seguros ni oferta de contratación.
          </p>
        </Container>
      </Section>

      {/* CÓMO LEE UN BROKER */}
      <Section tone="soft" padding="md" title="Cómo lee un broker estos números">
        <Container size="md">
          <AnswerCard question="¿Me compensa quitar el seguro de vida del banco?">
            Es una resta, no una opinión: sobreprecio anual del seguro bancario frente a lo que te
            ahorra la bonificación de TIN. Con 150.000 € pendientes y 0,10 puntos de bonificación,
            el banco te ahorra unos 150 € al año; si su seguro te cuesta 400 € más que uno
            individual equivalente, mantener la vinculación te cuesta 250 € netos al año — y la
            brecha crece, porque la bonificación decrece al amortizar y la prima sube con la edad.
          </AnswerCard>
          <div className="prose-psz">
            <p>
              Tres cosas que reviso siempre en el seguro de vida de una hipoteca:
            </p>
            <ul>
              <li>
                <strong>Capital asegurado vs deuda pendiente.</strong> Si llevas 8 años amortizando
                y el seguro sigue cubriendo el capital inicial, estás pagando cobertura de deuda
                que ya no existe. Ajustarlo baja la prima en proporción.
              </li>
              <li>
                <strong>Prima única financiada.</strong> Si en la firma te sumaron el seguro al
                capital del préstamo, estás pagando intereses por tu propio seguro. En la primera
                oportunidad (novación, subrogación, renovación), conviene deshacerla.
              </li>
              <li>
                <strong>La letra de la bonificación.</strong> Algunas escrituras bonifican por
                &quot;tener seguro de vida&quot; (de quien sea) y otras por &quot;contratarlo con la
                entidad&quot;. La diferencia son cientos de euros al año — está en tu oferta
                vinculante (FEIN) y en la escritura.
              </li>
            </ul>
            <p>
              La Ley 5/2019 te da la palanca: el banco debe aceptar pólizas alternativas
              equiparables y no puede empeorarte las condiciones por presentarlas. El seguro de
              vida es de los pocos costes de la hipoteca que puedes renegociar TODOS los años.
            </p>
          </div>
        </Container>
      </Section>

      {/* FAQ */}
      <Section tone="paper" padding="md" title="Preguntas frecuentes sobre el seguro de vida de la hipoteca">
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
              href="/calculadora-stress-test-euribor"
              className="block bg-paper-card border border-navy-100 rounded-xl p-6 hover:border-gold-400 hover:shadow-card transition-all no-underline"
            >
              <p className="text-xs uppercase tracking-wider text-gold-600 font-semibold mb-2">
                Otra herramienta
              </p>
              <h3 className="text-lg font-semibold text-navy-800 mb-2">Stress test Euríbor</h3>
              <p className="text-sm text-ink-soft">
                ¿Cuánto subiría tu cuota si el Euríbor sube 0,5, 1, 1,5 o 2 puntos?
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
                Vinculaciones, bonificaciones y letra pequeña: las negociamos por ti.
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
              Esta calculadora la he programado yo, no es un script genérico. La diferencia está en
              el veredicto: no me limito a estimar la prima de mercado, hago la cuenta completa de
              la vinculación — sobreprecio del seguro contra ahorro de la bonificación — que es la
              que de verdad decide si te conviene moverte.
            </p>
            <p className="text-navy-700 leading-relaxed mb-0">
              Si tu hipoteca arrastra seguros caros, prima única financiada o bonificaciones que no
              compensan, se puede renegociar.{' '}
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
            ¿La cuenta te sale en rojo?
          </h2>
          <p className="text-paper/85 text-lg mb-8 max-w-prose mx-auto">
            Si pagas el doble de mercado o tu bonificación no compensa, hay margen de mejora — en
            el seguro y muchas veces también en la propia hipoteca. Revisemos la operación
            completa.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button href={`${MORTGAGE_FORM_URL}?origen=seguro-vida-hipoteca`} variant="gold" size="lg" target="_blank" rel="noopener noreferrer">
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
