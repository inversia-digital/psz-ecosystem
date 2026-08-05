import type { Metadata } from 'next'
import {
  MORTGAGE_FORM_URL,
  SITE_URLS,
  TONO,
  articleSchema,
  breadcrumbSchema,
  faqPageSchema,
} from '@psz/seo'
import { Button, Container, Faq, JsonLd, Section, TelegramCta } from '@psz/ui'
import { getPostBySlug } from '../_posts'

const SLUG = 'segunda-mano-vs-obra-nueva'
const URL = `${SITE_URLS.psz}/blog/${SLUG}`
const post = getPostBySlug(SLUG)!

export const metadata: Metadata = {
  title: 'Segunda mano u obra nueva: qué cambia en la hipoteca',
  description:
    'Impuestos, gastos, financiación y plazos: en qué se diferencia comprar e hipotecar una vivienda de segunda mano frente a una de obra nueva en España.',
  alternates: { canonical: URL },
  openGraph: {
    url: URL,
    title: post.title,
    description: post.description,
    type: 'article',
    locale: 'es_ES',
    publishedTime: post.datePublished,
    authors: [TONO.fullName],
  },
}

const FAQ_ITEMS = [
  {
    question: '¿Qué impuesto se paga en cada caso?',
    answer:
      'La vivienda de segunda mano tributa por ITP (Impuesto de Transmisiones Patrimoniales), un porcentaje del precio que fija cada comunidad autónoma. La obra nueva tributa por IVA (un tipo estatal reducido para vivienda) más el AJD (Actos Jurídicos Documentados) autonómico. Son dos regímenes distintos, así que la factura fiscal cambia bastante según dónde compres. Conviene verificar los tipos vigentes en tu comunidad.',
  },
  {
    question: '¿Es más barato de impuestos comprar obra nueva o segunda mano?',
    answer:
      'Depende de la comunidad. En territorios con ITP alto, la segunda mano puede salir más cara de impuestos que la obra nueva; en otros con ITP reducido, al revés. No hay una respuesta única: hay que comparar el ITP de tu comunidad con el IVA más AJD. Además, en segunda mano puede haber tipos reducidos para jóvenes o vivienda habitual.',
  },
  {
    question: '¿Cómo se financia una obra nueva sobre plano?',
    answer:
      'En la obra nueva sobre plano vas pagando entregas a cuenta durante la construcción (con aval bancario obligatorio sobre esas cantidades) y la hipoteca se firma al final, en la escritura, cuando la vivienda está terminada. Eso significa que necesitas liquidez durante la obra y que el banco te concede la hipoteca meses después de reservar, con el riesgo de que tu situación cambie.',
  },
  {
    question: '¿La tasación cambia entre obra nueva y segunda mano?',
    answer:
      'El procedimiento de tasación es el mismo, pero en obra nueva sobre plano se tasa sobre proyecto y valores de mercado esperados, mientras que en segunda mano se tasa un inmueble ya existente y visible. En segunda mano es más fácil que aparezcan sorpresas (estado real, reformas necesarias) que conviene detectar antes de firmar.',
  },
  {
    question: '¿Qué conviene más para comprar para alquilar?',
    answer:
      'Para inversión suele ganar la segunda mano en zonas consolidadas: se compra por debajo, permite reforma con la que se sube el valor y el alquiler, y la ocupación es más rápida porque la demanda ya existe. La rentabilidad neta hay que calcularla siempre en tres escenarios, no fiarse de la bruta del anuncio. La obra nueva encaja mejor para vivienda propia que para rentabilidad.',
  },
]

export default function ArticlePage() {
  return (
    <main>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Inicio', url: SITE_URLS.psz },
          { name: 'Blog', url: `${SITE_URLS.psz}/blog` },
          { name: post.title, url: URL },
        ])}
      />
      <JsonLd
        data={articleSchema({
          headline: post.title,
          description: post.description,
          url: URL,
          datePublished: post.datePublished,
        })}
      />
      <JsonLd data={faqPageSchema(FAQ_ITEMS)} />

      {/* HEADER */}
      <Section tone="navy" padding="lg">
        <Container size="md">
          <p className="text-gold-300 text-sm uppercase tracking-wider mb-3">
            {post.category} · {post.readingTime}
          </p>
          <h1 className="text-3xl md:text-5xl font-bold text-paper leading-tight mb-4">
            {post.title}
          </h1>
          <p className="text-lg text-paper/80 mb-4">{post.description}</p>
          <p className="text-sm text-paper/60">
            Por{' '}
            <a href="/sobre-mi" className="text-gold-300 hover:text-gold-200">
              {TONO.shortName}
            </a>
            {' · '}
            <time dateTime={post.datePublished}>
              {new Date(post.datePublished).toLocaleDateString('es-ES', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </time>
          </p>
        </Container>
      </Section>

      {/* BODY */}
      <Section tone="paper" padding="md">
        <Container size="md">
          <article className="prose-psz">
            <p className="text-lg">
              "¿Compro segunda mano u obra nueva?" es una de las primeras decisiones a las que se
              enfrenta quien va a comprar casa, y casi nadie la aborda desde donde de verdad importa:
              no es solo cuestión de gustos o de estado del inmueble, sino de impuestos, de cómo se
              paga y de cuándo entra la hipoteca. Cambian cosas que impactan directamente en cuánto
              dinero necesitas y cuándo lo necesitas. Te lo ordeno.
            </p>

            <h2 id="impuestos">La diferencia grande: los impuestos</h2>
            <p>
              Es la distinción que más pesa en la factura final, y mucha gente la descubre tarde.
            </p>
            <ul>
              <li>
                <strong>Segunda mano:</strong> pagas <strong>ITP</strong> (Impuesto de Transmisiones
                Patrimoniales), un porcentaje del precio que fija <em>cada comunidad autónoma</em>.
                Por eso comprar el mismo piso cuesta distinto según el territorio.
              </li>
              <li>
                <strong>Obra nueva:</strong> pagas <strong>IVA</strong> (tipo estatal reducido para
                vivienda) más <strong>AJD</strong> (Actos Jurídicos Documentados, también
                autonómico).
              </li>
            </ul>
            <p>
              ¿Cuál sale más barato? Depende de tu comunidad. En territorios con ITP alto, la segunda
              mano puede resultar más cara de impuestos que la obra nueva; en otros con ITP reducido,
              al revés. No hay regla universal. Comparo la horquilla real por territorio en{' '}
              <a href="/blog/gastos-de-comprar-vivienda-por-comunidad">
                gastos de comprar una vivienda por comunidad autónoma
              </a>
              , y siempre recomiendo <strong>verificar los tipos vigentes</strong>, porque cambian.
              Para tu caso concreto, la{' '}
              <a href="/calculadora-gastos-compra">calculadora de gastos de compra</a> te da la cifra
              exacta.
            </p>

            <h2 id="como-se-paga">Cómo se paga: liquidez y momento de la hipoteca</h2>
            <p>
              Aquí está la diferencia que menos se cuenta y más problemas da. En la{' '}
              <strong>segunda mano</strong>, el proceso es directo: arras, hipoteca y firma en unas
              semanas. En la <strong>obra nueva sobre plano</strong>, en cambio, vas pagando entregas
              a cuenta durante la construcción — que puede durar uno o dos años — y la hipoteca no se
              firma hasta el final, cuando la vivienda está terminada y se escritura.
            </p>
            <p>Esto tiene dos consecuencias importantes:</p>
            <ol>
              <li>
                <strong>Necesitas liquidez durante la obra.</strong> Las entregas a cuenta salen de tu
                bolsillo (con aval bancario obligatorio sobre esas cantidades, eso sí).
              </li>
              <li>
                <strong>La hipoteca llega meses o años después de reservar.</strong> Si tu situación
                laboral cambia entre la reserva y la firma, el banco reevalúa. Reservas hoy con un
                perfil y firmas mañana con otro.
              </li>
            </ol>
            <p>
              En la segunda mano el contrato clave es el de arras, que firmas al principio; lo explico
              en <a href="/blog/contrato-arras-penitenciales">esta guía</a>. En la obra nueva, el
              contrato relevante es el de compraventa con el promotor y sus entregas a cuenta.
            </p>

            <h2 id="financiacion">Qué financia el banco en cada caso</h2>
            <p>
              La norma general es la misma: el banco cubre hasta el 80% del menor entre precio y
              tasación. Pero el matiz cambia:
            </p>
            <ul>
              <li>
                En <strong>segunda mano</strong> se tasa un inmueble existente y visible. Más fácil de
                valorar, pero también más fácil que aparezcan sorpresas (estado real, reformas
                pendientes).
              </li>
              <li>
                En <strong>obra nueva</strong> se tasa sobre proyecto. A veces el promotor tiene un
                acuerdo con un banco que financia esa promoción en condiciones concretas, lo que
                puede simplificar — o encorsetar — tu elección de entidad.
              </li>
            </ul>
            <p>
              Sea cual sea, antes de comprometerte conviene saber cuánto te dará el banco y qué cuota
              supone. Estímalo con la{' '}
              <a href="/calculadora-capacidad-endeudamiento">
                calculadora de capacidad de endeudamiento
              </a>{' '}
              y entiende el marco general en la página de{' '}
              <a href="/hipoteca-primera-vivienda">hipoteca para primera vivienda</a>. Y si dudas
              entre tipo fijo, variable o mixto, lo comparo en{' '}
              <a href="/tipos-de-hipoteca">tipos de hipoteca</a>.
            </p>

            <h2 id="plazos">Plazos y certidumbre</h2>
            <p>
              La <strong>segunda mano</strong> te da certidumbre: ves lo que compras, sabes cuándo
              entras (6-12 semanas) y el precio está cerrado. La <strong>obra nueva</strong> te da
              vivienda a estrenar y eficiencia energética, pero introduce incertidumbre de plazos
              (los retrasos de entrega son habituales) y de mercado durante la construcción.
            </p>

            <h2 id="inversion">¿Y para invertir?</h2>
            <p>
              Cuando el objetivo es comprar para alquilar, mi experiencia se inclina claramente hacia
              la <strong>segunda mano</strong> en zonas consolidadas: se compra por debajo, permite una
              reforma con la que subes valor y renta, y la ocupación es más rápida porque la demanda ya
              existe. En mi cartera trabajo secundario en Alicante y Albacete precisamente por eso, con
              rentabilidades netas de dos dígitos.
            </p>
            <p>
              Ahora bien, la rentabilidad hay que calcularla siempre <strong>neta y en tres
              escenarios — pesimista, realista y optimista —</strong>, nunca fiándose de la bruta que
              aparece en el anuncio. La obra nueva, por su precio de entrada más alto, suele encajar
              mejor como vivienda propia que como inversión pura.
            </p>

            <h2 id="resumen">Resumen para decidir</h2>
            <ul>
              <li>
                <strong>Quiero entrar rápido y con certidumbre:</strong> segunda mano.
              </li>
              <li>
                <strong>Quiero vivienda a estrenar y puedo esperar:</strong> obra nueva, con liquidez
                para las entregas.
              </li>
              <li>
                <strong>Compro para alquilar:</strong> normalmente segunda mano con reforma.
              </li>
              <li>
                <strong>En cualquier caso:</strong> compara la factura fiscal de tu comunidad antes de
                decidir.
              </li>
            </ul>

            <h2 id="cierre">Cierre</h2>
            <p>
              Segunda mano y obra nueva no son mejor o peor en abstracto: son dos operaciones
              distintas en impuestos, liquidez y plazos. Elige la que encaje con tu situación real, no
              con la foto del piso. Antes de firmar nada, revisa el proceso completo en mi{' '}
              <a href="/blog/comprar-primera-vivienda-paso-a-paso">
                guía para comprar la primera vivienda paso a paso
              </a>{' '}
              y calcula cuánto necesitas ahorrado en{' '}
              <a href="/blog/cuanto-ahorro-necesito-comprar-primera-vivienda">este artículo</a>. Si
              quieres, lo vemos juntos en una llamada.
            </p>
          </article>

          <TelegramCta className="mt-10" />
        </Container>
      </Section>

      {/* FAQ */}
      <Section tone="soft" padding="md" title="Preguntas frecuentes">
        <Container size="md">
          <Faq items={FAQ_ITEMS} />
        </Container>
      </Section>

      {/* CTA */}
      <Section tone="navy" padding="lg">
        <Container size="md" className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-paper mb-4">
            ¿Dudas entre segunda mano y obra nueva?
          </h2>
          <p className="text-paper/80 text-lg mb-8 max-w-prose mx-auto">
            Primera llamada gratis. Te ayudo a comparar la factura real de cada opción y a estructurar
            la financiación que más te conviene. Sin compromiso.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button
              href={MORTGAGE_FORM_URL}
              variant="gold"
              size="lg"
              target="_blank"
              rel="noopener noreferrer"
            >
              Solicitar mi hipoteca →
            </Button>
            <Button href="/hipoteca-primera-vivienda" variant="primary" size="lg">
              Hipoteca primera vivienda
            </Button>
          </div>
        </Container>
      </Section>
    </main>
  )
}
