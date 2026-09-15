import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import {
  MORTGAGE_FORM_URL,
  SITE_URLS,
  TONO,
  articleSchema,
  breadcrumbSchema,
  faqPageSchema,
} from '@psz/seo'
import { Button, Container, JsonLd, Section, TelegramCta } from '@psz/ui'
import { ArticleFaq } from '../../_components/ArticleFaq'
import { BarChart } from '../../_components/BarChart'
import { getPostBySlug, isLive } from '../_posts'

export const revalidate = 21600

const SLUG = 'tasacion-hipoteca-por-que-decide-tu-financiacion'
const URL = `${SITE_URLS.psz}/blog/${SLUG}`
const post = getPostBySlug(SLUG)!

export const metadata: Metadata = {
  title: 'La tasación decide tu hipoteca: cómo funciona, qué la baja y cómo reutilizarla',
  description:
    'El banco financia sobre el menor entre precio y tasación, así que la tasación manda. Quién la hace, cuánto vale y cuánto dura, por qué tasar para la entidad más exigente y usarla en varias, qué la hunde y qué hacer si sale baja. Con lo que dice la Ley 5/2019.',
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
    question: '¿Puedo llevar mi propia tasación al banco?',
    answer:
      'Sí. La Ley 5/2019 obliga al banco a aceptar cualquier tasación aportada por el cliente siempre que la haya hecho una sociedad de tasación homologada por el Banco de España y no esté caducada. El banco puede comprobarla, pero no puede obligarte a pagar otra con su tasadora.',
  },
  {
    question: '¿Cuánto dura una tasación?',
    answer:
      'Seis meses desde la fecha de emisión. Si la operación se alarga más, hay que actualizarla, lo que suele costar menos que una tasación nueva si la hace la misma sociedad.',
  },
  {
    question: '¿Por qué el banco financia sobre la tasación y no sobre el precio?',
    answer:
      'Porque financia sobre el menor de los dos. Si compras por 200.000 € y la tasación dice 180.000 €, el 80 % se calcula sobre 180.000 € y el resto lo pones tú. Si la tasación sale por encima del precio, el banco sigue calculando sobre el precio, salvo en productos concretos que financian sobre tasación.',
  },
  {
    question: '¿Qué hace que una tasación salga baja?',
    answer:
      'Testigos de la zona por debajo del precio, superficie registral menor que la real, discrepancias entre Registro y Catastro, cargas o afecciones, ocupación, obras sin licencia y viviendas que no cumplen normativa (sin cédula, sin certificado energético). Muchas de esas cosas se pueden preparar antes de la visita.',
  },
  {
    question: '¿Sirve la misma tasación para varios bancos?',
    answer:
      'Sí, si la ha hecho una tasadora homologada y está vigente. En la práctica, cada banco tiene su lista de tasadoras aceptadas: unas admiten cualquiera y otras solo unas pocas. Por eso conviene tasar con una sociedad que valga para la entidad más exigente de las que vas a presentar, y reutilizarla en las demás.',
  },
]

export default function ArticlePage() {
  if (!isLive(post.datePublished)) notFound()
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

      <Section tone="paper" padding="md">
        <Container size="md">
          <article className="prose-psz">
            <p className="text-lg">
              El banco no financia el 80 % de lo que pagas. Financia el 80 % del{' '}
              <strong>menor entre el precio y la tasación</strong>. Esa frase, que casi nadie lee
              hasta que le afecta, decide más hipotecas que el tipo de interés. Una tasación 15.000 €
              por debajo del precio son 12.000 € más de entrada que salen de tu bolsillo o una
              compra que se cae. Y sin embargo la mayoría de compradores encarga la tasación como
              quien pide un café: la que diga el banco, cuando diga el banco.
            </p>

            <h2 id="que-es">Qué es una tasación hipotecaria y quién puede hacerla</h2>
            <p>
              Es una valoración oficial del inmueble hecha por una{' '}
              <strong>sociedad de tasación homologada por el Banco de España</strong>, siguiendo una
              metodología reglada (la Orden ECO/805/2003). Cuesta entre 300 y 500 € para una vivienda
              normal, la pagas tú y tiene una <strong>validez de seis meses</strong>. El tasador
              visita el inmueble, mide, fotografía, revisa la nota simple y el Catastro y compara con
              «testigos»: ventas y ofertas recientes de inmuebles parecidos en la zona.
            </p>
            <p>
              Y un dato que cambia la relación de fuerzas: la <strong>Ley 5/2019</strong> obliga al
              banco a <strong>aceptar la tasación que tú aportes</strong>, siempre que la haya hecho
              una tasadora homologada y no esté caducada. El banco puede revisarla, pero no puede
              obligarte a pagar la suya.
            </p>

            <h2 id="menor">Por qué el «menor de los dos» lo cambia todo</h2>
            <ul>
              <li>
                <strong>Tasación por debajo del precio.</strong> Compras por 200.000 € y tasa en
                180.000 €: el 80 % son 144.000 €, no 160.000 €. Los 16.000 € de diferencia son
                tuyos. Es la causa más frecuente de compra que se cae después de las arras.
              </li>
              <li>
                <strong>Tasación por encima del precio.</strong> Con carácter general el banco sigue
                calculando sobre el precio, así que no te da más dinero. Hay excepciones: productos
                que financian sobre el valor de tasación, en los que una tasación bien fundamentada
                cubre un porcentaje mayor del precio. Siempre con valor justificable y testigos
                reales; inflar una tasación es fraude y el tasador se juega su homologación.
              </li>
              <li>
                <strong>Con aval público</strong> (ICO o autonómico), el importe se calcula igualmente
                sobre el menor de los dos. Una tasación corta deja el aval cojo. Lo explico en{' '}
                <a href="/blog/aval-ico-2026-requisitos-precio-maximo">aval ICO 2026</a>.
              </li>
            </ul>

            <BarChart
              title="Compra de 200.000 €: cuánto presta el banco al 80 % según lo que diga la tasación"
              unit="€"
              max={200000}
              data={[
                { label: 'Tasación 180.000 €', value: 144000, display: '144.000 € (faltan 16.000 €)' },
                { label: 'Tasación 200.000 €', value: 160000, display: '160.000 €', highlight: true },
                { label: 'Tasación 220.000 €', value: 160000, display: '160.000 € (el tope es el precio)' },
              ]}
              note="El banco calcula sobre el menor entre precio y tasación. Solo en productos concretos que financian sobre tasación una valoración alta cubre más precio."
            />

            <h2 id="reutilizar">La regla que más dinero ahorra: tasar para el más exigente y reutilizar</h2>
            <p>
              Cada banco tiene su cuadro de tasadoras. Unas entidades aceptan cualquier sociedad
              homologada; otras solo trabajan con una lista cerrada de cuatro o cinco. Si vas a
              presentar el expediente a tres bancos, no encargues tres tasaciones: encarga{' '}
              <strong>una, con una tasadora que valga para la entidad más exigente</strong>, y
              preséntala en las tres. La tasación que sirve para el banco más estricto sirve para
              casi todos; al revés, no. Este orden de operaciones ahorra entre 600 y 1.000 € y, sobre
              todo, semanas.
            </p>

            <h2 id="que-la-baja">Qué hunde una tasación (y qué se puede preparar antes)</h2>
            <ol>
              <li>
                <strong>Superficie registral menor que la real.</strong> El tasador valora los
                metros que constan en el Registro. Una ampliación o un cerramiento sin inscribir no
                cuentan. Si la diferencia entre Registro y Catastro supera el 10 %, más de una entidad
                para la operación hasta que se subsane.
              </li>
              <li>
                <strong>Obras sin licencia o cambios de uso.</strong> Un local convertido en
                vivienda sin cédula de habitabilidad se tasa como local, o no se tasa.
              </li>
              <li>
                <strong>Cargas y afecciones.</strong> Una hipoteca anterior que se cancelará en la
                firma no es problema; un embargo o una afección fiscal reciente sí lo son.
              </li>
              <li>
                <strong>Ocupación.</strong> Una vivienda con inquilino o con ocupantes se valora
                distinto y muchos bancos no la financian como vivienda habitual.
              </li>
              <li>
                <strong>Testigos flojos.</strong> Si en la zona se han vendido pisos parecidos más
                baratos, la tasación irá a esos precios aunque tú pagues más. Antes de ofertar,
                conviene saber a cuánto se vende de verdad, no a cuánto se anuncia.
              </li>
              <li>
                <strong>Documentación que falta el día de la visita.</strong> Nota simple de menos de
                tres meses, certificado energético y, en obra con reforma, presupuesto y proyecto.
                Sin ellos, el informe se para.
              </li>
            </ol>

            <h2 id="het">Tasar con reforma: el valor «en hipótesis de edificio terminado»</h2>
            <p>
              Si compras para reformar y quieres que el banco financie la obra, la tasación tiene que
              recoger dos valores: el actual y el que tendrá la vivienda terminada. Para el segundo,
              la tasadora exige <strong>proyecto visado y licencia de obras</strong>, y algunas no
              emiten hasta tener la licencia concedida. Un ayuntamiento tarda semanas. Si hay unas
              arras con plazo, este es el punto que hay que arrancar el primer día, no el último.
            </p>

            <h2 id="sale-baja">Qué hacer si la tasación sale baja</h2>
            <ul>
              <li>
                <strong>Pedir el informe completo</strong> y revisar los testigos. Un error de
                superficie o un testigo mal elegido se puede reclamar a la tasadora.
              </li>
              <li>
                <strong>Renegociar el precio con el vendedor.</strong> Una tasación oficial por debajo
                del precio es el mejor argumento que tendrás nunca en una negociación.
              </li>
              <li>
                <strong>Segunda tasación con otra sociedad</strong>, si tienes motivos fundados. Dos
                tasaciones dispares no son raras en zonas con pocas ventas.
              </li>
              <li>
                <strong>Cambiar la estructura de la operación:</strong> más entrada, garantía adicional
                o una entidad con otro criterio.
              </li>
            </ul>

            <ArticleFaq items={FAQ_ITEMS} />

            <h2 id="cierre">En resumen</h2>
            <p>
              La tasación no es un trámite: es el número sobre el que se calcula tu hipoteca. Elegir
              la tasadora pensando en todas las entidades a las que vas a ir, preparar el inmueble y
              la documentación antes de la visita y saber qué hacer si el valor sale corto es la
              diferencia entre una operación que fluye y una que se cae en el último momento. En cada
              expediente que llevo, la tasación se decide el primer día, con el plan de bancos
              delante.
            </p>
          </article>

          <TelegramCta className="mt-10" />
        </Container>
      </Section>


      <Section tone="navy" padding="lg">
        <Container size="md" className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-paper mb-4">
            Una sola tasación, bien elegida, para todos los bancos
          </h2>
          <p className="text-paper/80 text-lg mb-8 max-w-prose mx-auto">
            Antes de encargarla, decidimos juntos a qué entidades va tu expediente y con qué tasadora
            sirve para todas.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button href={MORTGAGE_FORM_URL} variant="gold" size="lg" target="_blank" rel="noopener noreferrer">
              Solicitar mi hipoteca →
            </Button>
            <Button href="/calculadora-hipoteca" variant="primary" size="lg">
              Calcular mi hipoteca
            </Button>
          </div>
        </Container>
      </Section>
    </main>
  )
}
