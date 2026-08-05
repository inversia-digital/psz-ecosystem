import type { Metadata } from 'next'
import {
  MORTGAGE_FORM_URL,
  SITE_URLS,
  TONO,
  articleSchema,
  breadcrumbSchema,
  faqPageSchema,
  howToSchema,
} from '@psz/seo'
import { Button, Container, Faq, JsonLd, Section, TelegramCta } from '@psz/ui'
import { getPostBySlug } from '../_posts'

const SLUG = 'como-hacerse-intermediario-credito-inmobiliario-ici'
const URL = `${SITE_URLS.psz}/blog/${SLUG}`
const post = getPostBySlug(SLUG)!

export const metadata: Metadata = {
  title: 'Cómo hacerse intermediario de crédito inmobiliario (ICI)',
  description:
    'Requisitos, formación LCCI, seguro de responsabilidad civil y alta en el Banco de España para ejercer legalmente como intermediario de crédito inmobiliario (broker hipotecario) en España.',
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
    question: '¿Qué es un intermediario de crédito inmobiliario (ICI)?',
    answer:
      'Es la figura profesional que la Ley 5/2019 define para quien intermedia entre el cliente y las entidades financieras en la contratación de un crédito hipotecario. Comercialmente se le llama "broker hipotecario", pero el término legal es intermediario de crédito inmobiliario. Para ejercer hay que estar inscrito en el registro del Banco de España; hacerlo sin inscripción es una actividad ilegal.',
  },
  {
    question: '¿Puedo darme de alta como persona física o necesito una sociedad?',
    answer:
      'La Ley 5/2019 permite ambas vías: puedes inscribirte como persona física o como persona jurídica (sociedad). Cada opción tiene implicaciones fiscales y de responsabilidad distintas. En mi caso opté por la vía jurídica: la inscripción E242 corresponde a INVERSIA GLOBAL DIGITAL, S.L.U., no a mi nombre personal.',
  },
  {
    question: '¿Qué formación necesito para ser broker hipotecario?',
    answer:
      'La normativa exige conocimientos y competencia acreditados mediante formación específica sobre los contratos de crédito inmobiliario (los cursos habitualmente llamados "LCCI"). El contenido mínimo y las horas están fijados por la normativa de desarrollo del Banco de España, así que conviene verificar los requisitos vigentes antes de contratar un curso, porque la homologación puede cambiar.',
  },
  {
    question: '¿Es obligatorio el seguro de responsabilidad civil?',
    answer:
      'Sí. El intermediario de crédito inmobiliario debe contar con un seguro de responsabilidad civil profesional (o garantía equivalente) que cubra las responsabilidades derivadas de su actividad en todos los territorios donde opere. Es un requisito para la inscripción y su falta de renovación puede provocar la baja del registro.',
  },
  {
    question: '¿Cuánto se tarda en darse de alta en el Banco de España?',
    answer:
      'El plazo depende de que la documentación esté completa y correcta desde el principio. El Banco de España revisa formación, seguro, honorabilidad y el resto de requisitos antes de resolver la inscripción. Como los plazos administrativos varían, conviene verificar los tiempos y trámites vigentes en la sede electrónica del Banco de España antes de planificar el arranque de la actividad.',
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
      <JsonLd
        data={howToSchema({
          name: 'Cómo hacerse intermediario de crédito inmobiliario (ICI) en España',
          description:
            'Pasos para inscribirse como intermediario de crédito inmobiliario en el Banco de España conforme a la Ley 5/2019: requisitos, formación LCCI, seguro de responsabilidad civil y alta en el registro.',
          url: URL,
          totalTime: 'P30D',
          estimatedCost: { currency: 'EUR', value: 0 },
          steps: [
            {
              name: 'Confirma que cumples los requisitos de acceso',
              text:
                'La Ley 5/2019 exige honorabilidad comercial y profesional y ausencia de antecedentes que impidan ejercer. Antes de nada, comprueba que tu situación (personal o de la sociedad) permite la inscripción. Verifica los requisitos vigentes en la sede electrónica del Banco de España.',
              url: 'https://www.bde.es',
            },
            {
              name: 'Completa la formación específica (LCCI)',
              text:
                'Cursa la formación en contratos de crédito inmobiliario acreditada conforme a la normativa. El contenido y las horas mínimas los fija el desarrollo reglamentario del Banco de España; verifica que el curso que elijas cumple el estándar vigente antes de pagarlo.',
            },
            {
              name: 'Contrata el seguro de responsabilidad civil profesional',
              text:
                'Suscribe un seguro de responsabilidad civil (o garantía equivalente) con la cobertura mínima exigida para el ámbito en el que vas a operar (estatal o autonómico). Sin esta póliza en vigor no hay inscripción.',
            },
            {
              name: 'Decide la vía: persona física o sociedad',
              text:
                'La Ley 5/2019 permite inscribirte como persona física o como persona jurídica. Valora la estructura fiscal y de responsabilidad. En mi caso me inscribí por la vía jurídica: INVERSIA GLOBAL DIGITAL, S.L.U., con código E242 y ámbito estatal.',
            },
            {
              name: 'Presenta la solicitud de alta en el Banco de España',
              text:
                'Reúne la documentación (formación, seguro, datos de la persona o sociedad) y presenta la solicitud de inscripción en el Registro de Intermediarios de Crédito Inmobiliario del Banco de España. Cuando se resuelve, recibes tu número de registro público.',
              url: 'https://app.bde.es/rbe_spa/',
            },
            {
              name: 'Publica tu número y opera con transparencia',
              text:
                'Una vez inscrito, muestra tu número de registro en tu web y comunicaciones, mantén el seguro en vigor y cumple las normas de conducta. Asociarte a la asociación profesional del sector (ANICI) añade una capa de autorregulación por encima del mínimo legal.',
              url: SITE_URLS.anici,
            },
          ],
        })}
      />

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
              Me lo preguntan cada semana: gente que ya trabaja en el sector inmobiliario o
              financiero y quiere dar el paso a ejercer como broker hipotecario en regla. La
              respuesta corta es que "broker hipotecario" no es un título que uno se ponga solo:
              desde 2019 es una actividad regulada, con nombre propio —{' '}
              <strong>intermediario de crédito inmobiliario (ICI)</strong> — y con un procedimiento
              de alta obligatorio en el Banco de España.
            </p>
            <p>
              Lo cuento desde dentro. Yo mismo estoy inscrito con el número <strong>E242</strong> y
              soy presidente de la asociación nacional del sector, así que esta guía no es teoría:
              es el camino real que hay que recorrer, con las trampas donde veo tropezar a quien
              empieza. Antes de entrar, si lo que quieres es <em>comprobar</em> a un broker en lugar
              de convertirte en uno, tienes el proceso paso a paso en{' '}
              <a href="/blog/como-verificar-broker-hipotecario-banco-de-espana">
                cómo verificar un broker hipotecario en el Banco de España
              </a>
              .
            </p>

            <h2 id="que-es-ici">Qué es exactamente un ICI</h2>
            <p>
              La{' '}
              <a
                href="https://www.boe.es/buscar/act.php?id=BOE-A-2019-3814"
                target="_blank"
                rel="noopener noreferrer"
              >
                Ley 5/2019, de 15 de marzo, reguladora de los contratos de crédito inmobiliario
              </a>{' '}
              creó la figura del intermediario de crédito inmobiliario. Es el profesional que pone
              en contacto al cliente con las entidades financieras y le asiste en la contratación de
              un préstamo hipotecario, cobrando por ese servicio. Lo que en la calle llamamos
              "broker hipotecario" es, en el papel, un ICI.
            </p>
            <p>
              El matiz importante: la ley no permite anunciarse como asesor "independiente" salvo que
              se cumplan condiciones muy estrictas de retribución. Por eso yo siempre hablo de
              asesoramiento <strong>personalizado</strong>, no de independencia. Es un detalle que
              distingue a quien conoce la norma de quien la ha leído por encima. Si quieres entender
              qué derechos te da esta ley como cliente, lo desarrollo en{' '}
              <a href="/blog/ley-5-2019-explicada-para-el-cliente">
                la Ley 5/2019 explicada para el cliente
              </a>{' '}
              y en la página pilar{' '}
              <a href="/como-funciona-ley-5-2019">cómo funciona la Ley 5/2019</a>.
            </p>

            <h2 id="requisitos">Los requisitos de acceso</h2>
            <p>
              Para inscribirte tienes que acreditar, a grandes rasgos, cuatro cosas. Ninguna es
              opcional y el Banco de España las revisa antes de darte el alta:
            </p>
            <ul>
              <li>
                <strong>Honorabilidad comercial y profesional.</strong> No tener antecedentes ni
                situaciones que la normativa considera incompatibles con la actividad.
              </li>
              <li>
                <strong>Formación específica.</strong> Conocimientos acreditados sobre los contratos
                de crédito inmobiliario (los cursos LCCI).
              </li>
              <li>
                <strong>Seguro de responsabilidad civil profesional</strong> (o garantía
                equivalente) en vigor.
              </li>
              <li>
                <strong>Inscripción en el registro</strong> del Banco de España antes de captar un
                solo cliente.
              </li>
            </ul>
            <p>
              El detalle fino de cada requisito (coberturas mínimas del seguro, horas de formación,
              documentación exacta) lo fija la normativa de desarrollo y puede actualizarse, así que
              conviene <strong>verificar las condiciones vigentes</strong> en la sede electrónica
              del <a href="https://www.bde.es" target="_blank" rel="noopener noreferrer">Banco de España</a> antes
              de arrancar el trámite.
            </p>

            <h2 id="formacion">La formación LCCI</h2>
            <p>
              La formación es el requisito que más dudas genera. La ley exige competencia acreditada,
              y en la práctica eso se traduce en cursos homologados sobre la Ley de Contratos de
              Crédito Inmobiliario. Hay contenidos mínimos y horas mínimas fijados por la normativa.
            </p>
            <p>
              Mi consejo, después de haber visto a mucha gente pagar cursos que no valían: antes de
              matricularte, confirma que el programa cumple el estándar vigente y que el proveedor
              emite un certificado válido a efectos del registro. No todos los "cursos de broker"
              que se anuncian sirven para el alta. Verifica siempre contra la fuente oficial, no
              contra la publicidad del curso.
            </p>

            <h2 id="seguro">El seguro de responsabilidad civil</h2>
            <p>
              Este es el requisito que más profesionales descuidan una vez dados de alta. El seguro
              de responsabilidad civil profesional no es un trámite de un día: hay que mantenerlo en
              vigor mientras ejerzas. Si dejas que caduque, puedes causar baja en el registro aunque
              tu inscripción no "caduque" por sí sola.
            </p>
            <p>
              La cobertura mínima depende del ámbito en el que operes (estatal o autonómico) y de si
              actúas como principal o como representante designado. Es otro punto donde toca{' '}
              <strong>verificar las condiciones vigentes</strong>: las cuantías las marca la
              normativa y se revisan periódicamente.
            </p>

            <h2 id="persona-o-sociedad">¿Persona física o sociedad?</h2>
            <p>
              La Ley 5/2019 te deja elegir, y la decisión no es menor. Inscribirte como persona
              física es más sencillo y barato al principio; hacerlo como sociedad separa tu
              patrimonio personal del de la actividad y suele ser más eficiente cuando el volumen
              crece o cuando montas equipo.
            </p>
            <p>
              Yo elegí la vía jurídica: la inscripción <strong>E242</strong> es de INVERSIA GLOBAL
              DIGITAL, S.L.U. (CIF B75281394), no de mi nombre. Por eso, cuando alguien quiere
              verificarme, tiene que buscar por el código E242, por el CIF o por la razón social,
              no por "Toño Palacios". Si estás pensando en estructurar la actividad desde el
              principio, en{' '}
              <a href="/estructuras-societarias">estructuras societarias</a> explico cuándo una
              sociedad aporta de verdad y cuándo es sobreingeniería.
            </p>

            <h2 id="alta-bde">El alta en el Banco de España</h2>
            <p>
              Con la formación hecha, el seguro contratado y la vía decidida, llega la solicitud de
              inscripción en el Registro de Intermediarios de Crédito Inmobiliario. Es el paso que
              convierte todo lo anterior en un número público verificable. He reunido el detalle del
              procedimiento y del propio registro en la página{' '}
              <a href="/alta-ici-banco-espana">alta ICI en el Banco de España</a>, que mantengo
              actualizada porque los formularios y plazos cambian.
            </p>
            <p>
              Cuando el Banco de España resuelve, tu inscripción aparece en el{' '}
              <a
                href="https://app.bde.es/rbe_spa/"
                target="_blank"
                rel="noopener noreferrer"
              >
                registro público de intermediarios
              </a>{' '}
              y cualquiera puede consultarla gratis. A partir de ahí ya puedes ejercer y —muy
              importante— debes publicar tu número.
            </p>

            <h2 id="anici">Un paso más: asociarte</h2>
            <p>
              El registro te hace legal. La asociación profesional te hace mejor. Ser miembro de{' '}
              <a href={SITE_URLS.anici} target="_blank" rel="noopener noreferrer">
                ANICI
              </a>{' '}
              (Asociación Nacional de Intermediarios en Crédito Inmobiliario) añade código de
              conducta, formación continua, representación ante el regulador y una comunidad que
              comparte criterio. No es obligatorio, pero un cliente que sabe verificar valora la
              diferencia. Como presidente y asociado fundador, lo digo con toda la parcialidad del
              mundo: la autorregulación del sector es lo que separa a la profesión del intrusismo.
            </p>

            <h2 id="cierre">Cierre</h2>
            <p>
              Hacerse intermediario de crédito inmobiliario no es difícil, pero es exigente: hay que
              formarse de verdad, asegurarse, elegir estructura y pasar por el registro. Ese filtro
              es una buena noticia, no una molestia — es lo que hace que la palabra de un broker
              registrado valga algo frente al cliente.
            </p>
            <p>
              Si estás en el camino y quieres contrastar dudas, o si eres cliente y prefieres
              trabajar con alguien que ya ha recorrido todo esto, hablamos cuando quieras.
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
            ¿Cliente o futuro colega? Empecemos por tu caso
          </h2>
          <p className="text-paper/80 text-lg mb-8 max-w-prose mx-auto">
            Si buscas hipoteca, la primera llamada es gratis y te digo si tu caso es viable. Si
            quieres entender el registro desde dentro, te enseño cómo se verifica el mío.
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
            <Button href="/alta-ici-banco-espana" variant="primary" size="lg">
              Alta ICI en Banco de España
            </Button>
          </div>
        </Container>
      </Section>
    </main>
  )
}
