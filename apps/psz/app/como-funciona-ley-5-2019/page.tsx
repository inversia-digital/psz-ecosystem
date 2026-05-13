import type { Metadata } from 'next'
import {
  SITE_URLS,
  TONO,
  breadcrumbSchema,
  faqPageSchema,
  speakableWebPageSchema,
} from '@psz/seo'
import { Button, Container, JsonLd, Section } from '@psz/ui'

const URL = `${SITE_URLS.psz}/como-funciona-ley-5-2019`

const BOE_URL = 'https://www.boe.es/buscar/act.php?id=BOE-A-2019-3814'
const BDE_REGISTRO = 'https://app.bde.es/rbe_spa/'

export const metadata: Metadata = {
  title: 'Cómo funciona la Ley 5/2019 de Contratos de Crédito Inmobiliario',
  description:
    'Guía completa de la Ley 5/2019: qué regula, derechos del consumidor, FEIN, ' +
    'acta notarial previa, papel del intermediario y supervisión del Banco de España. ' +
    'Explicado por Toño Palacios, broker hipotecario nº E242 y presidente de ANICI.',
  alternates: { canonical: URL },
  robots: { index: true, follow: true },
  openGraph: {
    type: 'article',
    url: URL,
    title: 'Cómo funciona la Ley 5/2019 de Contratos de Crédito Inmobiliario',
    description: 'Guía completa de la regulación hipotecaria española: derechos, plazos, FEIN, notario, intermediarios.',
    locale: 'es_ES',
    authors: [TONO.fullName],
  },
}

const FAQ_ITEMS = [
  {
    question: '¿Qué regula la Ley 5/2019?',
    answer:
      'La Ley 5/2019, de 15 de marzo, reguladora de los contratos de crédito inmobiliario, regula la actividad de prestamistas e intermediarios de crédito inmobiliario en España. Transpone la directiva europea 2014/17/UE y entró en vigor el 16 de junio de 2019.',
  },
  {
    question: '¿Qué es la FEIN?',
    answer:
      'La FEIN (Ficha Europea de Información Normalizada) es el documento oficial que resume la oferta hipotecaria. El banco está obligado a entregarla con un mínimo de 10 días naturales de antelación a la firma. Es vinculante para el banco durante esos 10 días.',
  },
  {
    question: '¿Cuánto dura el periodo de reflexión obligatorio?',
    answer:
      '10 días naturales como mínimo, contados desde la entrega de la FEIN. Durante ese plazo el cliente puede retirarse sin penalización. La firma en notaría no puede producirse antes de que transcurran esos 10 días.',
  },
  {
    question: '¿Qué es el acta notarial previa?',
    answer:
      'Es una comparecencia gratuita ante notario antes de firmar la hipoteca, obligatoria por la Ley 5/2019. El notario verifica que el cliente ha entendido las condiciones y que el banco ha entregado toda la documentación legalmente exigida. Sin acta previa no puede firmarse la hipoteca.',
  },
  {
    question: '¿Qué papel juega el intermediario de crédito inmobiliario?',
    answer:
      'El intermediario (también llamado broker hipotecario) actúa por cuenta del cliente, negociando con varios bancos. La Ley 5/2019 le obliga a estar registrado en el Banco de España, tener formación específica, seguro de responsabilidad civil y código de conducta.',
  },
  {
    question: '¿Qué pasa si el banco incumple algún plazo de la Ley 5/2019?',
    answer:
      'El cliente puede reclamar al servicio de atención al cliente del banco, al Servicio de Reclamaciones del Banco de España, o iniciar mediación previa. Los incumplimientos pueden anular cláusulas concretas o, según gravedad, generar responsabilidad administrativa para la entidad.',
  },
]

export default function LeyPage() {
  return (
    <main>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Inicio', url: SITE_URLS.psz },
          { name: 'Ley 5/2019', url: URL },
        ])}
      />
      <JsonLd data={faqPageSchema(FAQ_ITEMS)} />
      <JsonLd
        data={speakableWebPageSchema({
          url: URL,
          name: 'Ley 5/2019 de Contratos de Crédito Inmobiliario',
          description: 'Guía completa de la regulación hipotecaria española.',
          cssSelectors: ['h1', '.speakable-summary'],
        })}
      />

      {/* HERO */}
      <Section tone="navy" padding="lg">
        <Container size="lg">
          <p className="text-gold-300 text-sm uppercase tracking-wider mb-3">
            Guía regulatoria · Hipoteca y consumidor
          </p>
          <h1 className="text-4xl md:text-6xl font-bold text-paper leading-tight mb-4">
            Cómo funciona la
            <br />
            <span className="text-gold-400">Ley 5/2019</span> de Crédito Inmobiliario
          </h1>
          <p className="speakable-summary text-xl text-paper/80 max-w-3xl">
            La Ley 5/2019 es la norma que regula tu hipoteca y el rol de los brokers en España. Cubre derechos del consumidor, plazos obligatorios (FEIN, acta notarial, periodo de reflexión), exigencias al banco y al intermediario. Aquí está explicada de forma operativa, no académica.
          </p>
          <p className="text-sm text-paper/60 mt-6">
            Por{' '}
            <a href="/sobre-mi" className="text-gold-300 hover:text-gold-200">
              {TONO.shortName}
            </a>
            , broker hipotecario nº {TONO.credentials.bdeId} y presidente de ANICI.
          </p>
        </Container>
      </Section>

      {/* CONTEXTO */}
      <Section tone="paper" padding="md" title="Qué es y por qué existe">
        <Container size="md">
          <div className="prose-psz">
            <p>
              La <strong>Ley 5/2019, de 15 de marzo, reguladora de los contratos de crédito
              inmobiliario</strong> es la norma española que protege al consumidor que firma
              una hipoteca. Transpone la <strong>Directiva 2014/17/UE</strong> al
              ordenamiento español y entró en vigor el <strong>16 de junio de 2019</strong>.
            </p>
            <p>
              Su objetivo es corregir las asimetrías informativas entre el banco (que firma
              miles de hipotecas cada año y conoce perfectamente cada cláusula) y el cliente
              (que firma una hipoteca dos o tres veces en toda su vida y no domina los
              detalles). Para conseguirlo, impone al banco varias obligaciones de
              transparencia, períodos mínimos de reflexión y la intervención de un notario
              independiente <em>antes</em> de la firma.
            </p>
            <p>
              <a href={BOE_URL} target="_blank" rel="noopener noreferrer">
                Consultar texto íntegro en el BOE →
              </a>
            </p>
          </div>
        </Container>
      </Section>

      {/* QUÉ REGULA */}
      <Section tone="soft" padding="md" title="Qué regula concretamente">
        <Container size="lg">
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                t: '1. Contratos de crédito inmobiliario',
                b: 'Hipotecas sobre inmuebles residenciales, locales comerciales para uso propio del cliente y créditos para adquirir o mantener derechos sobre el inmueble. Quedan fuera las hipotecas concedidas exclusivamente para fines profesionales o empresariales.',
              },
              {
                t: '2. Información pre-contractual',
                b: 'Obligación del banco de entregar la Ficha Europea de Información Normalizada (FEIN), la Ficha de Advertencias Estandarizadas (FiAE), una copia del proyecto de contrato, el documento de gastos, y una manifestación del cliente sobre la documentación recibida.',
              },
              {
                t: '3. Plazos obligatorios',
                b: '10 días naturales mínimos entre la entrega de la FEIN y la firma en notaría (artículo 14). La oferta vinculante del banco no puede modificarse durante ese plazo.',
              },
              {
                t: '4. Acta notarial previa',
                b: 'Comparecencia obligatoria y gratuita ante notario antes de firmar. El notario verifica que el cliente entiende las condiciones y certifica el cumplimiento del periodo de reflexión. Sin acta previa, el banco no puede formalizar la hipoteca.',
              },
              {
                t: '5. Régimen de los intermediarios',
                b: 'Registro obligatorio en el Banco de España, formación específica acreditada, seguro de responsabilidad civil profesional, código de conducta, transparencia en honorarios y supervisión continua.',
              },
              {
                t: '6. Cláusulas y prácticas abusivas',
                b: 'Prohibición expresa de determinadas cláusulas (suelo abusivo, vencimiento anticipado sin proporcionalidad, intereses moratorios excesivos). Revisión judicial agilizada para cláusulas controvertidas.',
              },
            ].map((b, i) => (
              <article
                key={i}
                className="bg-paper-card border border-navy-100 rounded-xl p-6 shadow-soft"
              >
                <h3 className="text-lg font-semibold text-navy-800 mb-2">{b.t}</h3>
                <p className="text-ink-soft text-sm leading-relaxed">{b.b}</p>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      {/* ROL DEL INTERMEDIARIO */}
      <Section tone="paper" padding="md" title="Qué exige al intermediario de crédito inmobiliario">
        <Container size="md">
          <div className="prose-psz">
            <p>
              Si contratas a un broker hipotecario (o "intermediario de crédito inmobiliario",
              el término legal), la Ley 5/2019 te garantiza que ese profesional cumple los
              siguientes requisitos:
            </p>
            <ul>
              <li>
                <strong>Inscripción en el registro público del Banco de España</strong>.
                Cualquier ciudadano puede consultarlo gratuitamente en{' '}
                <a href={BDE_REGISTRO} target="_blank" rel="noopener noreferrer">
                  app.bde.es
                </a>
                . Buscando "{TONO.credentials.bdeId}" aparece la inscripción de{' '}
                {TONO.shortName}.
              </li>
              <li>
                <strong>Formación específica acreditada</strong> por una entidad autorizada
                (mínimo de horas y temarios definidos por el Banco de España).
              </li>
              <li>
                <strong>Seguro de responsabilidad civil profesional</strong> vigente durante
                toda su actividad.
              </li>
              <li>
                <strong>Honorarios pactados por escrito antes de empezar a trabajar</strong>,
                con publicación de la tarifa general en su web (Orden EHA/2899/2011).
              </li>
              <li>
                <strong>Independencia frente a entidades financieras</strong>: el
                intermediario no puede actuar en exclusiva para una sola entidad
                (excepto los "vinculados", figura distinta con régimen propio).
              </li>
              <li>
                <strong>Diligencia debida</strong> en prevención del blanqueo (Ley 10/2010
                PBC), identificación del cliente y verificación del origen de los fondos.
              </li>
              <li>
                <strong>Procedimiento de reclamaciones</strong> propio y obligación de
                someterse a mediación o al Servicio de Reclamaciones del Banco de España.
              </li>
            </ul>
            <p>
              Si un broker no cumple alguno de estos puntos, no es un intermediario regulado
              y la operación está fuera del paraguas de la Ley 5/2019.
            </p>
          </div>
        </Container>
      </Section>

      {/* FAQ */}
      <Section tone="soft" padding="md" title="Preguntas frecuentes sobre la Ley 5/2019">
        <Container size="md">
          <div className="divide-y divide-navy-100">
            {FAQ_ITEMS.map((item, i) => (
              <article key={i} className="py-6">
                <h3 className="text-xl font-semibold text-navy-800 mb-3">{item.question}</h3>
                <p className="text-ink-soft leading-relaxed">{item.answer}</p>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section tone="navy" padding="md">
        <Container size="md" className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-paper mb-4">
            ¿Vas a firmar una hipoteca y quieres que alguien te la negocie?
          </h2>
          <p className="text-paper/80 text-lg mb-8 max-w-prose mx-auto">
            Trabajo dentro del marco completo de la Ley 5/2019. Honorarios públicos, registro
            verificable y procedimiento de reclamaciones documentado. La primera llamada es
            gratuita.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button href="/broker-hipotecario" variant="gold" size="lg">
              Ver mi servicio de broker →
            </Button>
            <Button href="/preguntas-frecuentes" variant="primary" size="lg">
              Preguntas frecuentes
            </Button>
          </div>
        </Container>
      </Section>
    </main>
  )
}
