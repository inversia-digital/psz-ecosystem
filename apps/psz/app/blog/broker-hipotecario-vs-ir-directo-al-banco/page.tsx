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

const SLUG = 'broker-hipotecario-vs-ir-directo-al-banco'
const URL = `${SITE_URLS.psz}/blog/${SLUG}`
const post = getPostBySlug(SLUG)!

export const metadata: Metadata = {
  title: 'Broker hipotecario o ir directo al banco: qué te conviene',
  description:
    'Ventajas y límites de contratar tu hipoteca con un broker frente a negociar tú directamente con los bancos, con el criterio para saber cuándo compensa cada opción.',
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
    question: '¿Un broker hipotecario consigue mejores condiciones que yo solo?',
    answer:
      'No siempre, pero con frecuencia sí. Un broker presenta tu operación a varias entidades a la vez, conoce el apetito de riesgo de cada una y sabe cómo estructurar el expediente. Eso suele traducirse en mejor tipo, menos vinculaciones o una aprobación que por tu cuenta no habrías conseguido. En perfiles sencillos con mucho ahorro la diferencia puede ser pequeña; en perfiles complejos suele ser decisiva.',
  },
  {
    question: '¿Cuánto me cuesta ir con un broker frente a ir directo al banco?',
    answer:
      'Ir directo al banco no tiene coste de intermediación, pero el precio que pagas es tu tiempo y el riesgo de no comparar bien. Un broker cobra honorarios (a éxito, fijos, o retribución del banco según el modelo), y la pregunta correcta no es si cobra, sino si el ahorro y la probabilidad de aprobación que aporta superan lo que cuesta. Lo desgloso en el artículo sobre cuánto cobra un broker.',
  },
  {
    question: '¿Cuándo NO merece la pena un broker?',
    answer:
      'Si tienes un perfil muy sólido (contrato fijo, antigüedad, ahorro por encima del 30% del precio), la operación es sencilla y disfrutas negociando y comparando, puedes conseguir tú una buena hipoteca. En ese caso el valor del broker es sobre todo ahorrarte tiempo y gestión. El broker brilla cuando el caso se complica.',
  },
  {
    question: '¿El broker trabaja para mí o para el banco?',
    answer:
      'Un broker regulado por la Ley 5/2019 te asesora de forma personalizada y está sujeto a normas de conducta. La clave es la transparencia del modelo de cobro: debes saber desde el principio cómo y cuánto cobra, y de quién. Un broker que te cobra a ti alinea su interés con conseguirte la mejor operación; verifica siempre que está inscrito en el Banco de España antes de contratar.',
  },
  {
    question: '¿Puedo pedir a varios bancos por mi cuenta y luego ir con un broker?',
    answer:
      'Puedes, pero cuidado: cada solicitud formal deja rastro y pedir a muchos bancos a la vez sin criterio puede perjudicar tu expediente. Un broker precisamente ordena a qué entidades presentar y en qué orden, para no "quemar" tu operación. Si ya has pedido por tu cuenta, díselo al broker: forma parte del punto de partida.',
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
              Voy a hacer algo poco habitual en alguien que vive de esto: te voy a decir cuándo{' '}
              <strong>no</strong> necesitas un broker. Porque la pregunta no es "¿broker sí o no?",
              sino "¿qué me conviene <em>a mí</em>, con mi perfil y mi operación?". Y hay perfiles
              que se apañan solos perfectamente.
            </p>
            <p>
              Soy broker hipotecario registrado en el Banco de España (número <strong>E242</strong>)
              y presidente de la asociación del sector, así que conozco las dos caras. Este artículo
              te da el criterio honesto para decidir, sin humo.
            </p>

            <h2 id="ir-directo">Ir directo al banco: cuándo tiene sentido</h2>
            <p>
              Negociar tú directamente con las entidades es gratis en honorarios y te da control
              total. Tiene sentido cuando se cumplen varias de estas condiciones:
            </p>
            <ul>
              <li>
                Tu perfil es <strong>sólido y sencillo</strong>: contrato indefinido, antigüedad,
                ingresos estables, poca deuda.
              </li>
              <li>
                Tienes <strong>ahorro holgado</strong> — por encima del 30% del precio entre entrada
                y gastos — así que el banco te ve con buenos ojos casi de entrada.
              </li>
              <li>
                Tienes <strong>tiempo</strong> y no te importa pedir cita en varias oficinas,
                comparar FEIN y regatear.
              </li>
              <li>Te sientes cómodo con los números y con la letra pequeña.</li>
            </ul>
            <p>
              Si te reconoces aquí, adelante. Eso sí, hazlo con método: antes de nada comprueba tu
              margen con la{' '}
              <a href="/calculadora-capacidad-endeudamiento">
                calculadora de capacidad de endeudamiento
              </a>{' '}
              y simula cuotas con la <a href="/calculadora-hipoteca">calculadora de hipoteca</a>. Y
              no pidas a diez bancos a la vez sin orden: puede perjudicar tu expediente.
            </p>

            <h2 id="con-broker">Ir con un broker: qué aporta de verdad</h2>
            <p>
              Un broker no es "un intermediario que se lleva una comisión". Es alguien que hace un
              trabajo concreto y medible:
            </p>
            <ul>
              <li>
                <strong>Presenta tu caso a varias entidades a la vez</strong> y sabe cuál tiene
                apetito por tu perfil en ese momento. El apetito de riesgo de los bancos cambia; un
                broker lo vive a diario.
              </li>
              <li>
                <strong>Estructura el expediente</strong> para que el banco lo apruebe: cómo se
                presentan los ingresos de un autónomo, cómo se justifica el ahorro, cómo se ordena la
                operación.
              </li>
              <li>
                <strong>Negocia el tipo y las vinculaciones</strong> con más músculo que un cliente
                suelto, porque aporta volumen a la entidad.
              </li>
              <li>
                <strong>Te ahorra tiempo y errores</strong>: una sola interlocución en lugar de
                cinco, y alguien que ha visto tu tipo de operación cientos de veces.
              </li>
            </ul>
            <p>
              Donde el broker marca la diferencia real es en los perfiles complicados: autónomos,
              no residentes, compras a través de sociedad, operaciones de inversión. Ahí no hablamos
              de "un poco mejor tipo": muchas veces hablamos de conseguir la hipoteca frente a no
              conseguirla. Lo trato por perfiles en{' '}
              <a href="/hipoteca-autonomos">hipoteca para autónomos</a>,{' '}
              <a href="/hipoteca-no-residentes">hipoteca para no residentes</a> e{' '}
              <a href="/hipoteca-inversor">hipoteca para inversores</a>.
            </p>

            <h2 id="numeros">Los números: cuándo compensa pagar por ello</h2>
            <p>
              La cuenta es sencilla de plantear. Un broker compensa cuando lo que aporta —
              <strong>mejor tipo</strong> a lo largo de la vida del préstamo,{' '}
              <strong>menos vinculaciones</strong>, o directamente la{' '}
              <strong>aprobación</strong> que no habrías logrado — supera sus honorarios.
            </p>
            <p>
              Una décima de mejora en el tipo de una hipoteca de tamaño medio a 25-30 años suele
              sumar más de lo que cuesta el servicio; y ese cálculo ni siquiera pone precio a
              conseguir el sí cuando el banco te habría dicho que no. La pregunta correcta no es "¿me
              cobra?", sino "¿el resultado paga el coste?". Desgloso los modelos de cobro y las
              cifras orientativas en{' '}
              <a href="/blog/cuanto-cobra-un-broker-hipotecario">
                cuánto cobra un broker hipotecario
              </a>{' '}
              y en mi página de{' '}
              <a href="/tarifas-y-comisiones">tarifas y comisiones</a>.
            </p>

            <h2 id="transparencia">La condición innegociable: transparencia</h2>
            <p>
              Vayas por donde vayas, hay una regla que no admite excepción: si eliges broker, tiene
              que ser <strong>legal y transparente</strong>. Eso significa inscrito en el Banco de
              España, con seguro de responsabilidad civil, con honorarios que conoces y firmas antes
              de empezar, y sin promesas de "aprobación garantizada" (nadie puede garantizar la
              decisión del banco).
            </p>
            <p>
              Comprobarlo te lleva cinco minutos: te lo explico paso a paso en{' '}
              <a href="/blog/como-verificar-broker-hipotecario-banco-de-espana">
                cómo verificar un broker hipotecario en el Banco de España
              </a>
              . Un apunte de precisión que distingue al profesional serio: la ley no permite
              anunciarse como asesor "independiente" salvo condiciones muy estrictas, así que
              desconfía del que abusa de esa palabra — lo correcto es hablar de asesoramiento{' '}
              <strong>personalizado</strong>. Y si quieres entender el marco completo de tus
              derechos, está en{' '}
              <a href="/como-funciona-ley-5-2019">cómo funciona la Ley 5/2019</a>.
            </p>

            <h2 id="decision">Cómo decidir en tu caso concreto</h2>
            <p>Resumido en una regla práctica:</p>
            <ul>
              <li>
                <strong>Perfil sencillo + ahorro holgado + tiempo:</strong> puedes ir directo, con
                método y comparando.
              </li>
              <li>
                <strong>Perfil complejo, prisa, o quieres exprimir las condiciones:</strong> un
                broker suele pagarse solo.
              </li>
              <li>
                <strong>Duda:</strong> una primera consulta gratis te aclara si tu caso necesita
                ayuda o no. Un buen broker te dirá "esto lo haces tú solo" si es verdad.
              </li>
            </ul>

            <h2 id="cierre">Cierre</h2>
            <p>
              No hay una respuesta universal, hay una respuesta <em>tuya</em>. Ve directo al banco si
              tu operación es simple y tienes tiempo; ve con broker si el caso se complica o quieres
              que alguien pelee las condiciones por ti. Lo único no negociable es que, si eliges
              intermediario, sea verificable.
            </p>
            <p>
              Si quieres que te diga sin coste en qué grupo estás, cuéntame tu caso. Te seré honesto
              incluso si la respuesta es que no me necesitas.
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
            ¿Broker o directo? Te lo digo tras ver tu caso
          </h2>
          <p className="text-paper/80 text-lg mb-8 max-w-prose mx-auto">
            Primera llamada gratis. Te digo si tu operación la resuelves tú solo o si un broker se
            paga solo en tu caso. Sin humo y sin presión.
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
            <Button href="/broker-hipotecario" variant="primary" size="lg">
              Cómo trabajo
            </Button>
          </div>
        </Container>
      </Section>
    </main>
  )
}
