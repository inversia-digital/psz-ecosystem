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

const SLUG = 'cuanto-cobra-un-broker-hipotecario'
const URL = `${SITE_URLS.psz}/blog/${SLUG}`
const post = getPostBySlug(SLUG)!

export const metadata: Metadata = {
  title: 'Cuánto cobra un broker hipotecario en España (y cómo)',
  description:
    'Los modelos de cobro de un broker hipotecario —a éxito, honorarios fijos y retribución del banco— con cifras orientativas de mercado y cómo saber si lo que pagas está justificado.',
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
    question: '¿Cuánto cobra de media un broker hipotecario en España?',
    answer:
      'No hay una tarifa oficial: cada broker fija sus honorarios libremente. En el mercado conviven modelos a éxito (un porcentaje sobre el importe de la hipoteca o una cantidad fija por operación), modelos con reserva inicial más éxito, y casos en que el broker cobra del banco. Las cifras varían mucho según la complejidad del caso, así que conviene pedir el presupuesto por escrito antes de contratar.',
  },
  {
    question: '¿Qué es cobrar "a éxito" y por qué es lo más habitual?',
    answer:
      'Cobrar a éxito significa que el grueso de los honorarios solo se paga si el broker consigue la hipoteca y firmas. Es el modelo que más alinea el interés del broker con el tuyo: si no hay hipoteca, no hay factura (o solo se retiene una reserva pactada). Es la fórmula que más transparencia y compromiso transmite al cliente.',
  },
  {
    question: '¿Es legal que un broker cobre una reserva por adelantado?',
    answer:
      'Sí, siempre que sea transparente y esté pactado por escrito. Una reserva profesional inicial es un compromiso real de ambas partes y suele descontarse o devolverse según lo acordado. Lo que debe alarmarte es un broker que exige pagos elevados por adelantado y "garantiza" la aprobación del banco: nadie puede garantizar la decisión de la entidad.',
  },
  {
    question: '¿Los honorarios del broker se pueden financiar con la hipoteca?',
    answer:
      'Depende del banco y de la operación; no es automático ni universal. Lo prudente es contar con los honorarios dentro del presupuesto total de la compra, junto con la entrada y los gastos, y no dar por hecho que se financian. Verifica siempre las condiciones concretas de tu operación.',
  },
  {
    question: '¿Cómo sé si lo que me cobra el broker está justificado?',
    answer:
      'Compara el coste del broker con lo que aporta: mejora del tipo a lo largo de toda la vida del préstamo, menos vinculaciones y, sobre todo, la probabilidad de aprobación. Si el ahorro y el resultado superan los honorarios, está justificado. Pide siempre presupuesto por escrito y verifica que el broker está inscrito en el Banco de España.',
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
              Es la pregunta que todo el mundo quiere hacer y muchos no se atreven:{' '}
              <strong>"¿cuánto me vas a cobrar?"</strong>. La respondo sin rodeos, porque la opacidad
              en el precio es la primera bandera roja de un mal broker. Aquí tienes los modelos de
              cobro que existen en España, cifras orientativas de mercado y, sobre todo, cómo saber
              si lo que pagas está justificado.
            </p>
            <p>
              Aviso importante: no hay una tarifa oficial ni un colegio que fije precios. Cada broker
              fija sus honorarios libremente, así que las cantidades que verás por ahí son{' '}
              <strong>orientativas</strong> y cambian según la complejidad. Verifica siempre el
              presupuesto concreto por escrito.
            </p>

            <h2 id="modelos">Los tres modelos de cobro</h2>
            <p>
              Casi todo lo que verás en el mercado encaja en uno de estos tres esquemas (o una
              combinación):
            </p>

            <h3 id="a-exito">1. A éxito</h3>
            <p>
              El grueso de los honorarios solo se cobra si el broker consigue la hipoteca y tú
              firmas. Es el modelo que más alinea nuestros intereses: si no hay operación, no hay
              factura. Suele articularse como un porcentaje sobre el importe de la hipoteca o como una
              cantidad fija por operación. Es, con diferencia, la fórmula que más confianza transmite,
              y la que yo defiendo.
            </p>

            <h3 id="reserva-exito">2. Reserva inicial + éxito</h3>
            <p>
              Una variante frecuente: se abona una <strong>reserva profesional</strong> al firmar el
              contrato de intermediación (un compromiso real de ambas partes) y el resto solo cuando
              firmas la hipoteca. La reserva se descuenta del total o se devuelve según lo pactado si
              la operación no sale por causa imputable al broker. Es transparente siempre que esté
              todo por escrito.
            </p>

            <h3 id="del-banco">3. Retribución del banco</h3>
            <p>
              En algunos casos el broker cobra (total o parcialmente) de la entidad. Aquí lo esencial
              es la transparencia: la Ley 5/2019 tiene reglas sobre la retribución y sobre cómo debe
              informarse al cliente, y por eso un broker no puede anunciarse como "independiente"
              salvo condiciones muy estrictas. Yo prefiero hablar de asesoramiento{' '}
              <strong>personalizado</strong>. Pregunta siempre <em>de quién</em> cobra tu broker: es
              tu derecho saberlo.
            </p>

            <h2 id="cifras">Cifras orientativas de mercado</h2>
            <p>
              Con la advertencia de que varían mucho, en el mercado español es habitual ver los
              honorarios a éxito expresados como <strong>un porcentaje sobre el importe de la
              hipoteca</strong> (con frecuencia en el entorno de un pequeño porcentaje de un dígito)
              o como una <strong>cantidad fija por operación</strong>. Las reservas iniciales, cuando
              existen, suelen ser cantidades moderadas de compromiso.
            </p>
            <p>
              No doy una cifra única a propósito: sería deshonesto, porque el precio justo de una
              operación sencilla y el de una compleja (un autónomo, un no residente, una compra a
              través de sociedad) no son el mismo trabajo. Lo correcto es que el broker te dé{' '}
              <strong>su</strong> presupuesto por escrito para <strong>tu</strong> caso. Los míos
              están publicados en{' '}
              <a href="/tarifas-y-comisiones">tarifas y comisiones</a>.
            </p>

            <h2 id="justificado">Cómo saber si está justificado lo que pagas</h2>
            <p>
              El error es preguntar "¿cuánto cobra?" en vez de "¿qué me aporta frente a lo que
              cobra?". Un broker se paga cuando lo que consigue supera sus honorarios. Y consigue tres
              cosas medibles:
            </p>
            <ul>
              <li>
                <strong>Mejor tipo de interés.</strong> Una fracción de mejora en el tipo, aplicada a
                lo largo de 25-30 años, suma mucho más de lo que verás en la primera cuota. Puedes
                comprobar el efecto con la{' '}
                <a href="/calculadora-hipoteca">calculadora de hipoteca</a>.
              </li>
              <li>
                <strong>Menos vinculaciones.</strong> Quitar o reducir seguros y productos atados
                ahorra dinero cada año. En el seguro de vida, por ejemplo, la diferencia es grande —
                lo veo en{' '}
                <a href="/blog/seguro-de-vida-vinculado-hipoteca">
                  el seguro de vida vinculado a la hipoteca
                </a>
                .
              </li>
              <li>
                <strong>La aprobación misma.</strong> En perfiles complejos, el valor no es "un poco
                mejor": es conseguir el sí. Eso no tiene comparación posible con ir directo y que te
                digan que no.
              </li>
            </ul>
            <p>
              Si dudas entre pagar por un broker o ir por tu cuenta, hago esa comparación completa en{' '}
              <a href="/blog/broker-hipotecario-vs-ir-directo-al-banco">
                broker hipotecario o ir directo al banco
              </a>
              .
            </p>

            <h2 id="banderas">Banderas rojas en el precio</h2>
            <p>Desconfía si te encuentras con esto:</p>
            <ul>
              <li>
                <strong>No te da presupuesto por escrito</strong> antes de empezar.
              </li>
              <li>
                <strong>Exige pagos elevados por adelantado</strong> y "garantiza" que el banco
                aprobará (nadie puede garantizar la decisión de la entidad).
              </li>
              <li>
                <strong>No aparece en el registro del Banco de España.</strong> Sin inscripción, no
                es un broker legal — compruébalo con{' '}
                <a href="/blog/como-verificar-broker-hipotecario-banco-de-espana">
                  esta guía de verificación
                </a>
                .
              </li>
              <li>
                <strong>Es opaco sobre de quién cobra.</strong> Tienes derecho a saberlo, lo ampara
                la <a href="/como-funciona-ley-5-2019">Ley 5/2019</a>.
              </li>
            </ul>

            <h2 id="presupuesto">Presupuéstalo dentro del total de la compra</h2>
            <p>
              Un consejo práctico: mete los honorarios del broker en el mismo saco que la entrada y
              los gastos de compraventa, no los veas como un extra sorpresa. No des por hecho que se
              financian con la hipoteca (depende del banco). Para tener la foto completa de lo que
              cuesta comprar, usa la{' '}
              <a href="/calculadora-gastos-compra">calculadora de gastos de compra</a> y repasa qué
              cambia según dónde compres en{' '}
              <a href="/blog/gastos-de-comprar-vivienda-por-comunidad">
                los gastos de comprar vivienda por comunidad autónoma
              </a>
              .
            </p>

            <h2 id="cierre">Cierre</h2>
            <p>
              Un broker hipotecario cobra por un trabajo real, y el buen broker no tiene ningún
              problema en decirte cuánto y por qué antes de empezar. La transparencia en el precio no
              es un detalle: es la primera prueba de que estás ante un profesional. Pide presupuesto,
              verifica su registro y compara lo que cuesta con lo que aporta.
            </p>
            <p>
              Si quieres saber qué costaría tu operación conmigo, te lo digo claro desde la primera
              llamada, sin compromiso.
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
            ¿Quieres saber qué costaría tu operación?
          </h2>
          <p className="text-paper/80 text-lg mb-8 max-w-prose mx-auto">
            Primera llamada gratis. Te digo si tu caso es viable, a qué bancos lo presentaría y qué
            honorarios tendría, por escrito y sin sorpresas.
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
            <Button href="/tarifas-y-comisiones" variant="primary" size="lg">
              Ver mis tarifas
            </Button>
          </div>
        </Container>
      </Section>
    </main>
  )
}
