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
import { Button, Container, Faq, JsonLd, Section, TelegramCta } from '@psz/ui'
import { getPostBySlug, isLive } from '../_posts'

export const revalidate = 21600

const SLUG = 'hipoteca-para-funcionarios'
const URL = `${SITE_URLS.psz}/blog/${SLUG}`
const post = getPostBySlug(SLUG)!

export const metadata: Metadata = {
  title: 'Hipoteca para funcionarios: por qué el banco aprueba en 24 horas y hasta dónde llega',
  description:
    'Ser funcionario es el mejor perfil hipotecario de España: aprobación en oficina, hasta el 100 % sin aval en algunas entidades y tipos por debajo de mercado. Quién cuenta como funcionario para el banco, qué documentación piden, los «100 %» que son 95 % y cómo sacarle todo el partido.',
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
    question: '¿Los funcionarios pueden conseguir una hipoteca al 100 %?',
    answer:
      'Sí, en algunas entidades y sin necesidad de aval público, siempre que la cuota encaje en el ratio de endeudamiento y la tasación acompañe al precio. Otras entidades se quedan en el 95 % aunque lo anuncien como 100 %. La diferencia la marca la entidad y el momento, no el funcionario.',
  },
  {
    question: '¿Un interino cuenta como funcionario para el banco?',
    answer:
      'Depende de la entidad. Un funcionario de carrera con plaza en propiedad es el perfil pleno. Un interino con varios años de continuidad suele tratarse como funcionario en las entidades más flexibles y como contrato temporal en las más estrictas. Un laboral fijo de la Administración se acepta casi siempre.',
  },
  {
    question: '¿Qué documentación pide el banco a un funcionario?',
    answer:
      'El nombramiento o la toma de posesión, las tres últimas nóminas, la última declaración de la renta, un certificado de servicios o de antigüedad si la nómina no lo refleja, la vida laboral y los extractos de los últimos meses. Si tienes complementos fijos, conviene un certificado de retribuciones que los detalle.',
  },
  {
    question: '¿Los empleados de empresas públicas tienen las mismas condiciones?',
    answer:
      'En muchas entidades sí: personal de empresas participadas mayoritariamente por una administración (transporte público, sanidad, empresas municipales) se asimila al funcionario. No es automático; se pide por escrito y se argumenta con la estabilidad del puesto.',
  },
  {
    question: '¿Un funcionario joven debe usar el aval ICO?',
    answer:
      'No siempre. Si una entidad le da el 100 % sin aval, se ahorra los requisitos y la tramitación del ICO, que puede llevar meses. El aval tiene sentido cuando el porcentaje o el precio de la vivienda no encajan por la vía directa.',
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
              Hay un perfil que los bancos aprueban en la oficina sin subirlo a riesgos, al que
              financian por encima del 80 % sin pedir aval y al que ofrecen tipos que no aparecen en
              la web: el funcionario. No es un favor. Es matemática de riesgo. Y como casi ningún
              funcionario sabe hasta dónde puede llegar, la mayoría firma peor de lo que podría.
            </p>

            <h2 id="por-que">Por qué el banco te quiere</h2>
            <p>
              Una hipoteca es una apuesta a treinta años sobre tus ingresos. Al banco le preocupan
              dos cosas: que dejes de cobrar y que, si dejas de pagar, no pueda cobrar. Un
              funcionario de carrera resuelve las dos. Su plaza no depende de un ERE ni de que la
              empresa cierre, su nómina la paga una administración y, en caso de impago, esa nómina es
              embargable con la misma seguridad. Por eso muchas entidades tienen{' '}
              <strong>atribuciones especiales para funcionarios</strong>: la oficina puede aprobar
              sin que el expediente pase por el departamento de riesgos, a veces en 24 horas.
            </p>

            <h2 id="quien-cuenta">Quién cuenta como funcionario (para el banco)</h2>
            <p>
              Aquí está la primera sorpresa. Para el banco, «funcionario» es más ancho que el
              Estatuto Básico del Empleado Público:
            </p>
            <ul>
              <li>
                <strong>Funcionario de carrera con plaza en propiedad.</strong> El perfil pleno, en
                cualquier administración: estatal, autonómica, local, sanidad, educación, justicia,
                fuerzas armadas, policía y guardia civil.
              </li>
              <li>
                <strong>Personal laboral fijo</strong> de una administración. Casi siempre se acepta
                igual.
              </li>
              <li>
                <strong>Interinos.</strong> Depende de la entidad y de los años de continuidad. Con
                tres o cuatro años encadenados, varias entidades lo tratan como funcionario; otras,
                como un temporal más.
              </li>
              <li>
                <strong>Empleados de empresas públicas o participadas mayoritariamente</strong> por
                una administración: transporte urbano, empresas municipales de vivienda, hospitales
                públicos con gestión propia. Muchas entidades lo asimilan si se argumenta bien; no lo
                dan por hecho.
              </li>
              <li>
                <strong>Personal estatutario</strong> de la sanidad pública con plaza fija. Igual que
                el funcionario.
              </li>
            </ul>
            <p>
              Lo que no cuenta: un contrato temporal en la administración sin continuidad, una beca o
              un contrato de obra o servicio, por muy público que sea el empleador.
            </p>

            <h2 id="que-consigues">Qué consigue un funcionario que no consigue otro perfil</h2>
            <ul>
              <li>
                <strong>Porcentaje.</strong> El 90 % es la norma y el{' '}
                <strong>100 % sin aval público</strong> existe en algunas entidades, siempre que la
                cuota respete el ratio de endeudamiento y la tasación acompañe al precio. En otras, el
                producto «funcionario» es del 95 % aunque se anuncie como 100 %: la diferencia son
                10.000 € de tu bolsillo en una vivienda de 200.000 €.
              </li>
              <li>
                <strong>Tipo de interés.</strong> Hay tipos fijos y mixtos reservados a este perfil
                que no salen en la web ni en los comparadores. Se piden en oficina, y se piden mejor
                cuando quien los pide sabe que existen.
              </li>
              <li>
                <strong>Velocidad.</strong> Aprobación en la propia oficina, a veces al día
                siguiente. Eso vale dinero cuando hay unas arras con plazo.
              </li>
              <li>
                <strong>Menos vinculaciones.</strong> Como el riesgo es bajo, el banco necesita
                menos productos para «asegurar» la operación. Se negocia.
              </li>
              <li>
                <strong>Avalista de oro.</strong> Un funcionario como avalista de un hijo, de una
                pareja o de un familiar convierte una operación dudosa en una aprobada. Y el aval se
                puede pactar temporal: hasta que la deuda baje a un porcentaje del valor.
              </li>
            </ul>

            <h2 id="documentacion">Lo que te van a pedir</h2>
            <ul>
              <li>Nombramiento, toma de posesión o certificado de la plaza.</li>
              <li>Tres últimas nóminas y última declaración de la renta.</li>
              <li>Certificado de servicios o de antigüedad si la nómina no la refleja.</li>
              <li>Vida laboral y extractos de los últimos seis meses.</li>
              <li>
                Si tienes complementos fijos (guardias, destino, productividad consolidada), un
                certificado de retribuciones: el banco los computa si son estables y tú los
                documentas.
              </li>
              <li>Si estás en MUFACE, MUGEJU o ISFAS, dilo: hay entidades con productos específicos.</li>
            </ul>

            <h2 id="errores">Los errores que veo en funcionarios</h2>
            <ol>
              <li>
                <strong>Ir solo a su banco de toda la vida.</strong> Le dan «buenas condiciones» y
                firman. Buenas comparadas con qué. Un funcionario tiene poder de negociación y casi
                nunca lo usa.
              </li>
              <li>
                <strong>Aceptar un 95 % creyendo que es un 100 %.</strong> La oferta dice «hasta el
                100 %» y la parrilla interna dice 95 %. Se pide por escrito antes de las arras.
              </li>
              <li>
                <strong>Pedir el aval ICO por inercia.</strong> Si una entidad te da el 100 % por tu
                condición, el ICO solo añade requisitos y meses. Tiene sentido cuando el precio o el
                porcentaje no encajan por la vía directa. Los requisitos del aval están en{' '}
                <a href="/blog/aval-ico-2026-requisitos-precio-maximo">aval ICO 2026</a>.
              </li>
              <li>
                <strong>No declarar los complementos.</strong> Guardias y turnos son ingresos
                reales; si no se documentan, no existen para el ratio.
              </li>
              <li>
                <strong>Firmar con vinculaciones que no necesita.</strong> Seguros y planes que
                bonifican el tipo y que, calculados a treinta años, cuestan más que la bonificación.
                Lo explico en{' '}
                <a href="/blog/seguro-de-vida-vinculado-hipoteca">el seguro de vida vinculado a la
                hipoteca</a>.
              </li>
            </ol>

            <h2 id="pareja">Y si solo uno de los dos es funcionario</h2>
            <p>
              Sigue valiendo. El banco analiza la unidad familiar y la estabilidad de uno de los
              titulares arrastra el conjunto: es habitual que una pareja con un funcionario y un
              autónomo consiga condiciones de funcionario. Y si el otro tiene una situación que
              perjudica (un contrato temporal, una deuda), se puede estudiar que compre y firme el
              funcionario y el otro entre como avalista.
            </p>

            <h2 id="cierre">En resumen</h2>
            <p>
              Ser funcionario es el mejor perfil hipotecario de España, y la mayoría lo desaprovecha
              por no saber qué puede pedir. Porcentaje alto sin aval, tipos que no están en la web,
              aprobación rápida y menos vinculaciones. Mi trabajo es presentar tu expediente a las
              entidades que tienen ese producto activo en el momento de tu compra, con los
              complementos bien documentados, y negociar como negocia quien sabe lo que vale tu
              nómina.
            </p>
          </article>

          <TelegramCta className="mt-10" />
        </Container>
      </Section>

      <Section tone="soft" padding="md" title="Preguntas frecuentes sobre la hipoteca para funcionarios">
        <Container size="md">
          <Faq items={FAQ_ITEMS} />
        </Container>
      </Section>

      <Section tone="navy" padding="lg">
        <Container size="md" className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-paper mb-4">
            ¿Eres funcionario? Tu hipoteca puede ser mejor de lo que te han ofrecido
          </h2>
          <p className="text-paper/80 text-lg mb-8 max-w-prose mx-auto">
            Te digo en la primera llamada hasta dónde llega tu perfil y con qué entidades, sin
            compromiso.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button href={MORTGAGE_FORM_URL} variant="gold" size="lg" target="_blank" rel="noopener noreferrer">
              Solicitar mi hipoteca →
            </Button>
            <Button href="/calculadora-capacidad-endeudamiento" variant="primary" size="lg">
              Calcular mi capacidad de endeudamiento
            </Button>
          </div>
        </Container>
      </Section>
    </main>
  )
}
