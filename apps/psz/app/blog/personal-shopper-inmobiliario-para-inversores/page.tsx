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

const SLUG = 'personal-shopper-inmobiliario-para-inversores'
const URL = `${SITE_URLS.psz}/blog/${SLUG}`
const post = getPostBySlug(SLUG)!

export const metadata: Metadata = {
  title: 'Personal Shopper Inmobiliario para inversores: cuándo compensa',
  description:
    'Qué hace un personal shopper inmobiliario enfocado a inversión, en qué se diferencia del que busca vivienda habitual, cuánto cobra y cuándo su trabajo se paga solo.',
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
    question: '¿Qué diferencia hay entre un personal shopper y una agencia inmobiliaria?',
    answer:
      'La agencia trabaja habitualmente por cuenta del vendedor y cobra de él, así que su interés es cerrar la venta de su cartera. El personal shopper inmobiliario trabaja por cuenta del comprador: busca en todo el mercado, negocia el precio a la baja y defiende los intereses de quien le paga, que es el comprador. Son papeles opuestos en la misma operación, y por eso conviene tener claro quién cobra de quién.',
  },
  {
    question: '¿En qué se diferencia un personal shopper para inversión del de vivienda habitual?',
    answer:
      'El de vivienda habitual busca la casa donde vas a vivir: prioriza gustos, zona, luz y colegios. El de inversión busca un activo que rente: prioriza el precio de entrada, el alquiler de mercado, el estado del inmueble, los gastos y la rentabilidad neta en tres escenarios. Uno optimiza tu vida; el otro optimiza tu retorno. La forma de mirar un mismo piso es completamente distinta.',
  },
  {
    question: '¿Cuánto cobra un personal shopper inmobiliario?',
    answer:
      'Los modelos más habituales son un porcentaje sobre el precio de compra (orientativamente en el entorno del 1% al 3%), unos honorarios fijos por operación, o una reserva inicial más un éxito al cerrar. Las cifras varían mucho por profesional y por operación, así que hay que pedir el modelo por escrito antes de empezar. Verifica siempre las condiciones concretas del servicio.',
  },
  {
    question: '¿Cuándo se paga solo un personal shopper para inversión?',
    answer:
      'Cuando lo que consigue supera lo que cobra: acceso a inmuebles fuera del mercado abierto, una rebaja de precio negociada, evitar una compra mala o comprar un activo que renta más de lo que habrías encontrado por tu cuenta. En operaciones de inversión donde un punto de rentabilidad se traduce en miles de euros al año, un buen filtro y una buena negociación suelen cubrir el coste con holgura.',
  },
  {
    question: '¿Un personal shopper me consigue también la hipoteca?',
    answer:
      'No siempre. La búsqueda del inmueble y la intermediación hipotecaria son servicios distintos. Cuando van de la mano, la ventaja es que la operación se piensa completa: activo, financiación y números encajan desde el principio. Si un mismo profesional cubre ambas partes, comprueba que la parte hipotecaria está registrada en el Banco de España conforme a la Ley 5/2019.',
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
              La mayoría de la gente busca piso como busca vuelos: entra en un portal, filtra por
              precio y zona, y llama a los anuncios que le gustan. Para comprar la casa en la que vas a
              vivir puede valer. Para invertir, es la peor forma de hacerlo, porque el mercado
              publicado es solo una parte del mercado, y el precio del anuncio casi nunca es el precio
              de cierre. Ahí es donde entra un personal shopper inmobiliario enfocado a inversión: un
              profesional que trabaja para el comprador y mira cada inmueble como lo que es, un activo
              que tiene que rentar.
            </p>
            <p>
              En este artículo te explico qué hace de verdad, en qué se diferencia del que busca
              vivienda habitual, cuánto cobra y —lo importante— cuándo su trabajo se paga solo.
            </p>

            <h2 id="que-es">Qué es un personal shopper inmobiliario</h2>
            <p>
              Un personal shopper inmobiliario es un profesional que representa al{' '}
              <strong>comprador</strong>. Esa es la palabra clave. La agencia tradicional suele
              trabajar por cuenta del vendedor y cobra de él, así que su objetivo natural es colocar la
              cartera que tiene al mejor precio para el propietario. El personal shopper hace lo
              contrario: busca en todo el mercado, defiende tus intereses y negocia el precio a la
              baja, porque quien le paga eres tú.
            </p>
            <p>
              Su trabajo típico incluye definir el criterio de compra, rastrear el mercado (incluido lo
              que no está en portales), preseleccionar y visitar, analizar cada opción con números,
              negociar el precio y las condiciones, y acompañar hasta la firma. En inversión, además,
              filtra por rentabilidad, no por gusto.
            </p>

            <h2 id="inversion-vs-vivienda">Inversión no es lo mismo que vivienda habitual</h2>
            <p>
              Aquí está el matiz que casi nadie explica. Un personal shopper para vivienda habitual
              busca <strong>tu casa</strong>: prioriza la zona que te gusta, la luz, la distribución,
              los colegios, el barrio. El de inversión busca <strong>un activo</strong>: prioriza el
              precio de entrada, el alquiler real de mercado, el estado del inmueble, los gastos y la
              rentabilidad neta.
            </p>
            <p>
              El mismo piso puede ser un "no" para vivienda y un "sí" rotundo para inversión, o al
              revés. Un segundo sin ascensor en una zona secundaria puede ser incómodo para vivir y, a
              la vez, una compra excelente para alquilar si el número cuadra. Por eso el criterio de
              búsqueda cambia por completo. Lo desarrollo con más detalle en la{' '}
              <a href="/blog/comprar-piso-para-alquilar-guia">
                guía para comprar un piso para alquilar
              </a>
              .
            </p>

            <h2 id="que-aporta">Qué aporta de verdad en una operación de inversión</h2>
            <ul>
              <li>
                <strong>Acceso a más mercado.</strong> Buena parte de las operaciones de inversión no
                se cierran sobre anuncios abiertos, sino sobre inmuebles que se mueven por contactos,
                herencias, entidades o carteras. Un profesional con red ve lo que tú no ves.
              </li>
              <li>
                <strong>Filtro por números, no por foto.</strong> Descarta rápido lo que no renta y te
                ahorra semanas de visitas inútiles. Cada operación pasa por la{' '}
                <a href="/calculadora-rentabilidad-inmobiliaria">
                  calculadora de rentabilidad inmobiliaria
                </a>{' '}
                antes de perder tu tiempo con una visita.
              </li>
              <li>
                <strong>Negociación.</strong> Bajar el precio de compra es la palanca de rentabilidad
                más potente que existe, porque afecta a todos los años de la inversión. Un buen
                negociador que representa solo al comprador tiene margen que tú, con prisa e ilusión,
                normalmente no tienes.
              </li>
              <li>
                <strong>Detectar humo.</strong> Un profesional serio te frena ante una "oportunidad"
                inflada. Ese criterio lo trato en{' '}
                <a href="/blog/como-detectar-humo-oportunidad-inversion">
                  cómo detectar humo en una oportunidad de inversión
                </a>
                .
              </li>
              <li>
                <strong>Operación completa.</strong> Cuando la búsqueda del activo y la financiación se
                piensan juntas, encaja todo: precio, hipoteca y rentabilidad. Ahí es donde mi trabajo
                como intermediario hipotecario se conecta con la búsqueda.
              </li>
            </ul>

            <h2 id="cuanto-cobra">Cuánto cobra y qué modelos hay</h2>
            <p>
              No hay una tarifa única. Los modelos más habituales son:
            </p>
            <ul>
              <li>
                <strong>Porcentaje sobre el precio de compra</strong>, orientativamente en el entorno
                del 1% al 3% según la operación.
              </li>
              <li>
                <strong>Honorarios fijos por operación</strong>, con independencia del precio del
                inmueble.
              </li>
              <li>
                <strong>Reserva inicial más éxito:</strong> un compromiso al empezar y el grueso al
                cerrar la compra. Es el modelo que más alinea intereses, porque el profesional cobra de
                verdad cuando tú compras bien.
              </li>
            </ul>
            <p>
              Las cifras varían mucho, así que pide siempre el modelo por escrito antes de empezar y
              verifica las condiciones concretas. La pregunta que nunca debes dejar de hacer es:{' '}
              <strong>¿de quién cobras?</strong> Si el profesional cobra del vendedor, no te
              representa a ti, por mucho que use la etiqueta de personal shopper.
            </p>

            <h2 id="cuando-compensa">Cuándo se paga solo</h2>
            <p>
              La regla es sencilla: compensa cuando lo que consigue supera lo que cobra. Y en
              inversión eso ocurre a menudo, porque un punto de rentabilidad son miles de euros a lo
              largo de la vida del activo. Te lo enseño con una operación real que gestioné, con cifras
              redondeadas y sin nombres.
            </p>
            <p>
              Un piso en Monóvar (Alicante) de 114 m²: 42.000 € de compra más 3.000 € de reforma, unos
              54.040 € de inversión total, alquilado por 550 €/mes. La rentabilidad neta salió al
              11,6%, con un rango realista de 9,9 / 10,5 / 11,2 según ocupación y gastos. En una
              operación así, negociar 3.000 € en el precio de compra o evitar un error de estado del
              inmueble cubre de sobra unos honorarios. Y si el activo se hubiera elegido mal, ningún
              descuento posterior lo habría arreglado.
            </p>
            <p>
              Ese es el punto: en inversión, el valor no está en encontrar un piso, está en{' '}
              <strong>comprar bien</strong> el piso adecuado. Cuando el volumen de compras crece, mucha
              gente se plantea además hacerlo a través de sociedad; lo trato en{' '}
              <a href="/blog/comprar-inmueble-a-traves-de-sociedad">
                comprar un inmueble a través de una sociedad
              </a>{' '}
              y en la página de <a href="/estructuras-societarias">estructuras societarias</a>.
            </p>

            <h2 id="como-elegir">Cómo elegir un buen personal shopper para inversión</h2>
            <ul>
              <li>Que trabaje explícitamente por cuenta del comprador y te diga de quién cobra.</li>
              <li>Que te enseñe operaciones reales con rentabilidad neta en tres escenarios, no promesas.</li>
              <li>Que analice cada inmueble con números antes de que lo visites.</li>
              <li>Que entienda la financiación, porque activo e hipoteca se deciden juntos.</li>
              <li>Que ponga el modelo de honorarios por escrito desde el principio.</li>
            </ul>
            <p>
              Si además la parte de financiación la lleva un intermediario registrado en el Banco de
              España, mejor: puedes verificarlo en un minuto con{' '}
              <a href="/blog/como-verificar-broker-hipotecario-banco-de-espana">esta guía</a>. Así
              sabes que quien te acompaña en la hipoteca está dentro del marco de la Ley 5/2019.
            </p>

            <h2 id="cierre">Cierre</h2>
            <p>
              Un personal shopper inmobiliario para inversores no es un lujo: es la forma de comprar
              bien cuando el objetivo es que el inmueble rente. Su valor está en el acceso a más
              mercado, en el filtro por números y en la negociación del precio, que es la palanca de
              rentabilidad más potente que existe. Compensa cuando lo que consigue supera lo que
              cobra, y en inversión eso ocurre con frecuencia. Si estás pensando en comprar para
              alquilar, mira antes los números con la{' '}
              <a href="/calculadora-rentabilidad-inmobiliaria">calculadora de rentabilidad</a> y, si
              quieres, lo vemos juntos: yo trabajo pegado a la financiación, que es donde muchas
              operaciones se ganan o se pierden.
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
            ¿Vas a comprar para invertir y quieres comprar bien?
          </h2>
          <p className="text-paper/80 text-lg mb-8 max-w-prose mx-auto">
            Te ayudo a pensar la operación completa: activo, financiación y rentabilidad neta en tres
            escenarios. Primera llamada gratis y sin compromiso.
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
            <Button href="/hipoteca-inversor" variant="primary" size="lg">
              Hipoteca para inversores
            </Button>
          </div>
        </Container>
      </Section>
    </main>
  )
}
