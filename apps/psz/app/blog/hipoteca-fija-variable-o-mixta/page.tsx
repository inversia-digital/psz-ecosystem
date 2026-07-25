import type { Metadata } from 'next'
import {
  MORTGAGE_FORM_URL,
  SITE_URLS,
  TONO,
  articleSchema,
  breadcrumbSchema,
  faqPageSchema,
} from '@psz/seo'
import { Button, Container, Faq, JsonLd, Section } from '@psz/ui'
import { getPostBySlug } from '../_posts'

const SLUG = 'hipoteca-fija-variable-o-mixta'
const URL = `${SITE_URLS.psz}/blog/${SLUG}`
const post = getPostBySlug(SLUG)!

export const metadata: Metadata = {
  title: 'Hipoteca fija, variable o mixta: cuál elegir en 2026',
  description:
    'Cómo elegir entre hipoteca fija, variable y mixta según tu perfil y el momento del Euríbor, con el criterio para decidir y una simulación en tres escenarios.',
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
    question: '¿Qué diferencia hay entre hipoteca fija, variable y mixta?',
    answer:
      'En la fija pagas el mismo tipo de interés durante toda la vida del préstamo, así que la cuota no cambia. En la variable el tipo se revisa periódicamente sumando un diferencial al Euríbor, por lo que la cuota sube o baja con el índice. La mixta combina ambas: un primer tramo a tipo fijo (habitualmente los primeros años) y el resto a variable referenciado al Euríbor.',
  },
  {
    question: '¿Qué es el Euríbor y por qué afecta a mi hipoteca?',
    answer:
      'El Euríbor es el tipo de interés al que las entidades europeas se prestan dinero entre sí y es el índice de referencia más habitual de las hipotecas variables en España. Si tu hipoteca es variable o está en el tramo variable de una mixta, tu cuota se calcula sumando tu diferencial al Euríbor vigente en cada revisión. Por eso su evolución determina cuánto pagas. Conviene consultar el valor actualizado, que publica el Banco de España.',
  },
  {
    question: '¿Es mejor la fija o la variable en 2026?',
    answer:
      'No hay una respuesta universal: depende de tu perfil y de tu tolerancia al riesgo, no solo del momento del Euríbor. La fija te da tranquilidad y presupuesto cerrado; la variable puede salir más barata si el Euríbor se mantiene bajo, pero te expone a subidas. La mixta busca un punto intermedio. La decisión correcta es la que puedes sostener en el peor escenario, no la que parece mejor hoy.',
  },
  {
    question: '¿Puedo cambiar de variable a fija más adelante?',
    answer:
      'Sí. Puedes cambiar el tipo de tu hipoteca mediante una novación (acuerdo con tu propio banco) o una subrogación (traspaso a otra entidad). La Ley 5/2019 limita las comisiones para pasar de variable a fijo precisamente para facilitar ese cambio. Antes de moverte conviene calcular si el ahorro compensa los costes.',
  },
  {
    question: '¿Qué pasa con mi cuota si sube el Euríbor?',
    answer:
      'Si tienes hipoteca variable, en la siguiente revisión (normalmente anual o semestral) la cuota se recalcula con el nuevo Euríbor: si ha subido, pagas más; si ha bajado, pagas menos. En una fija no te afecta. Antes de firmar una variable conviene simular la cuota con el Euríbor en un escenario alto para comprobar que podrías asumirla.',
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
              "¿Fija, variable o mixta?" es la pregunta que más me repiten, y casi siempre esperan
              que les dé <em>la</em> respuesta. No existe. La hipoteca correcta no es la más barata
              sobre el papel de hoy: es la que puedes sostener el día que las cosas se ponen feas.
              Este artículo te da el criterio para elegir con la cabeza, no con el titular del
              Euríbor de esta semana.
            </p>
            <p>
              Antes de nada, un cimiento: da igual el tipo que elijas si la cuota no cabe en tu
              economía. Comprueba tu margen real con la{' '}
              <a href="/calculadora-capacidad-endeudamiento">
                calculadora de capacidad de endeudamiento
              </a>{' '}
              y ten a mano el marco general de producto en{' '}
              <a href="/tipos-de-hipoteca">tipos de hipoteca</a>.
            </p>

            <h2 id="las-tres">Las tres modalidades, en claro</h2>
            <p>
              <strong>Hipoteca fija.</strong> El mismo tipo de interés toda la vida del préstamo. La
              cuota no se mueve, pase lo que pase con el Euríbor. Pagas por la tranquilidad: el tipo
              de salida suele ser algo más alto que el de una variable en su momento bueno.
            </p>
            <p>
              <strong>Hipoteca variable.</strong> El tipo se revisa periódicamente sumando un
              diferencial al Euríbor. Si el Euríbor baja, tu cuota baja; si sube, sube. Puede salir
              muy barata en épocas de Euríbor bajo, pero te comes íntegro el riesgo de las subidas.
            </p>
            <p>
              <strong>Hipoteca mixta.</strong> Un primer tramo a tipo fijo (habitualmente los
              primeros años) y el resto a variable referenciado al Euríbor. Busca lo mejor de los dos
              mundos: certidumbre al principio, cuando más apretado sueles ir, y exposición al índice
              después.
            </p>

            <h2 id="euribor">El Euríbor: la variable que no controlas</h2>
            <p>
              El{' '}
              <a href="https://www.bde.es" target="_blank" rel="noopener noreferrer">
                Euríbor
              </a>{' '}
              es el índice de referencia de la mayoría de hipotecas variables en España. Lo importante
              para ti no es adivinar dónde estará (nadie lo sabe, y quien te diga lo contrario vende
              humo), sino <strong>prepararte para varios escenarios</strong>. El valor vigente lo
              publica el Banco de España; consúltalo y toma tu decisión con el dato actualizado, no
              con el de hace meses.
            </p>

            <h2 id="escenarios">Decide con tres escenarios, no con uno</h2>
            <p>
              La forma seria de elegir entre variable y fija es simular tu cuota con el Euríbor en
              tres escenarios y ver si aguantas el peor. No te doy cifras inventadas del índice —
              cambian y hay que <strong>verificar el valor vigente</strong> — pero sí el marco de
              razonamiento:
            </p>
            <ul>
              <li>
                <strong>Escenario PESIMISTA — Euríbor alto.</strong> El índice sube por encima de lo
                previsto. Tu cuota variable se dispara en la revisión. La pregunta clave:{' '}
                <em>¿podrías pagarla sin ahogarte?</em> Si la respuesta es no, la variable no es para
                ti.
              </li>
              <li>
                <strong>Escenario REALISTA — Euríbor moderado.</strong> El índice se mueve en una
                banda intermedia. Aquí es donde comparas de verdad el coste total de una fija frente a
                una variable a lo largo de los años. Es el escenario sobre el que centro la decisión.
              </li>
              <li>
                <strong>Escenario OPTIMISTA — Euríbor bajo.</strong> El índice baja o se mantiene
                contenido. La variable brilla y la mixta también en su tramo final. Es el premio si
                aciertas, pero no puede ser la base de la decisión.
              </li>
            </ul>
            <p>
              La regla de oro: <strong>elige la opción que sobrevive a tu escenario pesimista</strong>
              , no la que gana en el optimista. Puedes hacer exactamente este ejercicio con la{' '}
              <a href="/calculadora-stress-test-euribor">
                calculadora de stress test del Euríbor
              </a>
              , que te enseña cómo quedaría tu cuota si el índice se tensiona, y afinar la cuota base
              con la <a href="/calculadora-hipoteca">calculadora de hipoteca</a>.
            </p>

            <h2 id="perfil">Elige según tu perfil, no según la moda</h2>
            <p><strong>Te encaja la fija si:</strong></p>
            <ul>
              <li>Valoras la tranquilidad y quieres presupuesto cerrado a 25-30 años.</li>
              <li>Tu economía es ajustada y una subida de cuota te complicaría de verdad.</li>
              <li>No quieres estar pendiente del Euríbor cada revisión.</li>
            </ul>
            <p><strong>Te encaja la variable si:</strong></p>
            <ul>
              <li>Tienes colchón de sobra para absorber subidas sin sufrir.</li>
              <li>Piensas amortizar pronto o vender en pocos años.</li>
              <li>Asumes el riesgo con conocimiento y aguantas el escenario pesimista.</li>
            </ul>
            <p><strong>Te encaja la mixta si:</strong></p>
            <ul>
              <li>Quieres seguridad en los primeros años (los más apretados) y aceptas variable después.</li>
              <li>Buscas un punto medio entre el coste de la fija y el riesgo de la variable.</li>
            </ul>

            <h2 id="cambiar">No es para siempre: puedes cambiar</h2>
            <p>
              Elegir hoy no te condena de por vida. Puedes pasar de variable a fija (o cambiar de
              banco) mediante una <strong>novación</strong> con tu entidad o una{' '}
              <strong>subrogación</strong> a otra. La Ley 5/2019 limita las comisiones para pasar de
              variable a fijo precisamente para facilitártelo — el marco completo de tus derechos está
              en <a href="/como-funciona-ley-5-2019">cómo funciona la Ley 5/2019</a>. Ahora bien, antes
              de moverte hay que echar cuentas: te explico cuándo compensa en{' '}
              <a href="/blog/subrogacion-de-hipoteca-cuando-compensa">
                subrogación de hipoteca: cuándo compensa
              </a>
              .
            </p>

            <h2 id="vinculaciones">Ojo a las vinculaciones y al tipo "de escaparate"</h2>
            <p>
              El tipo que anuncia el banco casi siempre está bonificado por contratar seguros y
              productos. El tipo real que pagas si no los contratas es otro. Compara el tipo sin
              bonificar y calcula si las vinculaciones compensan — en el seguro de vida, por ejemplo,
              casi nunca: lo desgloso en{' '}
              <a href="/blog/seguro-de-vida-vinculado-hipoteca">
                el seguro de vida vinculado a la hipoteca
              </a>
              . Y recuerda que el banco no puede obligarte a contratar sus productos, solo ofrecerte
              bonificación por hacerlo.
            </p>

            <h2 id="cierre">Cierre</h2>
            <p>
              Fija, variable o mixta no es una cuestión de acertar el futuro del Euríbor, sino de
              conocerte a ti: tu colchón, tus planes y cuánta incertidumbre puedes vivir tranquilo.
              Simula los tres escenarios, elige la que aguanta el pesimista y no te dejes llevar por
              el titular de esta semana.
            </p>
            <p>
              Si quieres que hagamos esa simulación con tu caso real y te diga qué modalidad te
              conviene —y a qué bancos presentarla—, cuéntame tu situación en la primera llamada.
            </p>
          </article>
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
            ¿Fija, variable o mixta? Decidámoslo con tus números
          </h2>
          <p className="text-paper/80 text-lg mb-8 max-w-prose mx-auto">
            Primera llamada gratis. Simulamos tu cuota en tres escenarios de Euríbor y te digo qué
            modalidad aguanta tu peor caso, no solo el mejor.
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
            <Button href="/calculadora-stress-test-euribor" variant="primary" size="lg">
              Probar el stress test del Euríbor
            </Button>
          </div>
        </Container>
      </Section>
    </main>
  )
}
