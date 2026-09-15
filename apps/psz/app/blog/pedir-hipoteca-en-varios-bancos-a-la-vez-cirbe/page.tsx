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
import { getPostBySlug, isLive } from '../_posts'

export const revalidate = 21600

const SLUG = 'pedir-hipoteca-en-varios-bancos-a-la-vez-cirbe'
const URL = `${SITE_URLS.psz}/blog/${SLUG}`
const post = getPostBySlug(SLUG)!

export const metadata: Metadata = {
  title: 'Pedir la hipoteca en varios bancos a la vez: qué ven, qué no y dónde está el límite',
  description:
    'Presentar tu hipoteca a tres bancos es legal y es lo que hace un buen broker. Lo que no es legal es firmar dos préstamos ocultando uno. Qué consulta cada banco en la CIRBE, por qué la vuelven a mirar antes de la firma, qué pasa con la tasación y las diez cosas que un analista comprueba.',
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
    question: '¿Es malo pedir la hipoteca en varios bancos a la vez?',
    answer:
      'No. En España los bancos no ven cuántas solicitudes has presentado en otras entidades: la central de riesgos registra deudas, no peticiones. Comparar tres ofertas es lo razonable y es lo que hace un intermediario. Lo que no se puede hacer es firmar más de una hipoteca ocultando las demás.',
  },
  {
    question: '¿Qué es la CIRBE y qué ve el banco en ella?',
    answer:
      'Es la Central de Información de Riesgos del Banco de España. Cada entidad declara los préstamos, créditos y avales de sus clientes, y cualquier banco que estudia tu hipoteca consulta tu posición: qué debes, a quién, con qué garantía y si estás al día. Aparecen las operaciones a partir de 1.000 €. Tú puedes pedir tu propio informe gratis en la web del Banco de España.',
  },
  {
    question: '¿El banco vuelve a consultar la CIRBE antes de firmar?',
    answer:
      'Sí. Entre la aprobación y la firma pueden pasar semanas, y las entidades reconsultan la central de riesgos y piden una declaración responsable de que no has contraído nuevas deudas. Una hipoteca firmada días antes en otro banco tarda en aparecer, pero aparece, y el préstamo puede vencer anticipadamente por falsedad en la solicitud.',
  },
  {
    question: '¿Puedo usar la misma tasación en varios bancos?',
    answer:
      'Sí, si la ha hecho una sociedad homologada y está vigente. Cada banco tiene su lista de tasadoras aceptadas, así que conviene tasar con una que valga para la entidad más exigente y presentar la misma en todas.',
  },
  {
    question: '¿Cuántos bancos son demasiados?',
    answer:
      'Más de tres o cuatro rara vez aporta nada y consume tiempo de todos. Un expediente bien preparado se presenta a las entidades que encajan con el perfil y con la vivienda, no a todas. Mandarlo a diez es la forma más rápida de que ninguna se lo tome en serio.',
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
              Dos preguntas que me hacen casi todos los clientes: «¿pasa algo si pido la hipoteca en
              varios bancos?» y, en voz más baja, «¿se enteran?». La respuesta a la primera es no,
              es lo que hay que hacer. La respuesta a la segunda es la que importa: los bancos no ven
              tus solicitudes, pero ven tus deudas, y las ven dos veces. Ahí está el límite entre
              comparar y cometer un fraude.
            </p>

            <h2 id="legal">Presentar a varios bancos es legal, y es lo correcto</h2>
            <p>
              Una hipoteca es la mayor compra de tu vida y no aceptarías el primer precio de un
              coche. Presentar el mismo expediente a dos o tres entidades para comparar tipo, plazo,
              vinculaciones y porcentaje es exactamente lo que hace un intermediario de crédito
              inmobiliario, y lo que la Ley 5/2019 fomenta con la información precontractual
              normalizada: la FEIN de cada banco se puede comparar línea a línea. Te lo cuento en{' '}
              <a href="/blog/broker-hipotecario-vs-ir-directo-al-banco">broker hipotecario o ir
              directo al banco</a>.
            </p>
            <p>
              Lo que hay que hacer bien: presentar a las entidades que encajan con tu perfil (no a
              diez), con <strong>una sola tasación</strong> válida para todas y con la documentación
              idéntica. Y ser transparente: si un banco te pregunta si estás mirando en otros, la
              respuesta es sí.
            </p>

            <h2 id="que-ven">Qué ve un banco cuando estudia tu hipoteca</h2>
            <ul>
              <li>
                <strong>La CIRBE.</strong> La central de riesgos del Banco de España, donde cada
                entidad declara los préstamos, créditos y avales de sus clientes a partir de 1.000
                €. Cualquier banco al que pidas una hipoteca consulta tu posición: cuánto debes, a
                quién, con qué garantía, si hay impagos. <strong>No registra solicitudes</strong>, solo
                deudas vivas. Puedes pedir tu propio informe gratis en la sede electrónica del Banco
                de España; conviene hacerlo antes de pedir nada.
              </li>
              <li>
                <strong>Los ficheros de morosidad</strong> (ASNEF, Badexcug). Una deuda de 200 € de
                una compañía telefónica tumba una hipoteca de 200.000 €.
              </li>
              <li>
                <strong>Tus extractos.</strong> Seis meses de movimientos, leídos por alguien que
                sabe leerlos: ingresos regulares, cuotas de préstamos que no has declarado, apuestas,
                descubiertos, transferencias periódicas a un tercero.
              </li>
              <li>
                <strong>El origen del dinero de la entrada.</strong> Un ingreso en efectivo de 30.000
                € la semana antes de pedir la hipoteca no es una entrada: es una pregunta.
              </li>
              <li>
                <strong>El Registro y el Catastro</strong> del inmueble, y la tasación.
              </li>
              <li>
                <strong>Una declaración responsable</strong> de que la información es veraz y de
                que no tienes más deudas que las declaradas. Se firma, y tiene consecuencias.
              </li>
            </ul>

            <h2 id="dos-veces">Por qué lo ven dos veces</h2>
            <p>
              Entre la aprobación y la firma pasan semanas. Antes de firmar, el banco{' '}
              <strong>reconsulta la CIRBE</strong> y vuelve a pedir la declaración responsable.
              Aquí es donde se cae la idea, que circula en cursos y en grupos, de aprovechar el
              «desfase» de la central de riesgos para firmar dos o tres hipotecas casi a la vez «sin
              que salte». Salta. Las entidades declaran a la CIRBE cada mes, y lo que no se ve en la
              reconsulta se ve en la siguiente. Una hipoteca ocultada en la solicitud es{' '}
              <strong>falsedad en la declaración</strong>: motivo de vencimiento anticipado del
              préstamo (te lo reclaman entero), de inclusión en ficheros, y en los casos graves, de
              denuncia. Y arrastra a quien lo haya organizado: un intermediario que estructure eso
              se juega su inscripción en el Banco de España y su seguro, y entra en terreno de
              prevención del blanqueo.
            </p>
            <p>
              No existe la versión «sin que se enteren». Existe «todavía no se han enterado».
            </p>

            <h2 id="analista">Las diez cosas que comprueba un analista de riesgos</h2>
            <ol>
              <li>Que los ingresos de la nómina coinciden con la vida laboral, el IRPF y los extractos.</li>
              <li>Que la empresa existe, factura y paga: llaman, buscan y cruzan.</li>
              <li>Que las cuotas que aparecen en los extractos coinciden con lo que consta en la CIRBE.</li>
              <li>Que el ahorro de la entrada tiene un origen que se puede explicar y documentar.</li>
              <li>Que no hay apuestas, descubiertos ni devoluciones de recibos en los últimos seis meses.</li>
              <li>Que la tasación acompaña al precio y que la tasadora es aceptada.</li>
              <li>Que el Registro y el Catastro cuadran y que no hay cargas que no se cancelen en la firma.</li>
              <li>Que el uso declarado (vivienda habitual, segunda residencia, inversión) es coherente con tu situación.</li>
              <li>Que el régimen matrimonial es el que dices y que quien compra es quien firma.</li>
              <li>Que la declaración responsable sigue siendo cierta el día de la firma.</li>
            </ol>

            <h2 id="como-lo-hago">Cómo lo hace un broker registrado</h2>
            <p>
              Elijo dos o tres entidades por encaje real, no por probar. Preparo un expediente único,
              con una tasación que sirva para todas (lo explico en{' '}
              <a href="/blog/tasacion-hipoteca-por-que-decide-tu-financiacion">la tasación decide tu
              hipoteca</a>) y con cada deuda declarada, incluida la que tú preferirías no contar: un
              préstamo personal declarado se puede encajar en el ratio en varias entidades; uno
              escondido tumba la operación cuando aparece. Comparo las FEIN, negocio con la que mejor
              encaja y, cuando hay dos aprobadas, se elige una y se comunica a la otra. Se firma una.
              Lo que gana el cliente es la mejor de las ofertas reales; lo que no pierde es la
              hipoteca, la casa y las arras.
            </p>

            <ArticleFaq items={FAQ_ITEMS} />

            <h2 id="cierre">En resumen</h2>
            <p>
              Compara todo lo que quieras: los bancos no ven tus solicitudes, ven tus deudas. Y las
              ven antes de aprobar y otra vez antes de firmar. La estrategia buena es la aburrida:
              dos o tres entidades bien elegidas, un expediente honesto y una tasación que valga
              para todas. La otra no es una estrategia; es un préstamo que te van a reclamar entero.
            </p>
          </article>

          <TelegramCta className="mt-10" />
        </Container>
      </Section>


      <Section tone="navy" padding="lg">
        <Container size="md" className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-paper mb-4">
            Tu expediente, a los bancos que encajan. Una tasación. Ninguna sorpresa.
          </h2>
          <p className="text-paper/80 text-lg mb-8 max-w-prose mx-auto">
            Registrado en el Banco de España con el número E242. Comparo, negocio y te digo la verdad
            en la primera llamada.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button href={MORTGAGE_FORM_URL} variant="gold" size="lg" target="_blank" rel="noopener noreferrer">
              Solicitar mi hipoteca →
            </Button>
            <Button href="/blog/como-verificar-broker-hipotecario-banco-de-espana" variant="primary" size="lg">
              Cómo verificar a un broker
            </Button>
          </div>
        </Container>
      </Section>
    </main>
  )
}
