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

const SLUG = 'subrogacion-de-hipoteca-cuando-compensa'
const URL = `${SITE_URLS.psz}/blog/${SLUG}`
const post = getPostBySlug(SLUG)!

export const metadata: Metadata = {
  title: 'Subrogación de hipoteca: cuándo compensa cambiar de banco',
  description:
    'Qué es subrogar la hipoteca, cuánto cuesta con la Ley 5/2019, en qué se diferencia de la novación y cómo calcular el ahorro real antes de mover tu préstamo de banco.',
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
    question: '¿Qué es la subrogación de una hipoteca?',
    answer:
      'La subrogación de acreedor consiste en trasladar tu hipoteca de un banco a otro que te ofrece mejores condiciones, sin cancelarla ni firmar una nueva compraventa. Cambia la entidad prestamista, pero el préstamo sigue vinculado al mismo inmueble y a la misma deuda pendiente. Se regula en la Ley 5/2019 de crédito inmobiliario.',
  },
  {
    question: '¿Cuánto cuesta subrogar una hipoteca con la Ley 5/2019?',
    answer:
      'La Ley 5/2019 limita las comisiones por reembolso o subrogación. En las hipotecas a tipo variable la comisión máxima es del 0,25% del capital durante los tres primeros años y 0,15% del cuarto al quinto, y cero después; en las de tipo fijo puede llegar al 2% los diez primeros años y 1,5% después. Son máximos legales: el importe real depende de tu escritura y del capital pendiente, así que conviene verificar las condiciones vigentes de tu contrato.',
  },
  {
    question: '¿Qué diferencia hay entre subrogación y novación?',
    answer:
      'La subrogación cambia de banco: te llevas la hipoteca a otra entidad. La novación modifica las condiciones dentro del mismo banco (por ejemplo, pasar de variable a fijo o alargar el plazo) mediante un acuerdo con tu entidad actual. La novación evita el trámite de cambiar de banco, pero solo funciona si tu banco quiere mejorar; la subrogación es la palanca cuando no quiere.',
  },
  {
    question: '¿Compensa subrogar la hipoteca?',
    answer:
      'Compensa cuando el ahorro en intereses durante la vida restante del préstamo supera con holgura los costes de la operación (comisión, tasación y gestión). Como regla práctica, cuanto más capital y más años te queden y mayor sea la diferencia de tipo, más sentido tiene. Con poco capital pendiente o pocos años, el ahorro suele ser demasiado pequeño para que valga la pena.',
  },
  {
    question: '¿Puedo usar la subrogación solo para negociar con mi banco?',
    answer:
      'Sí, y es una táctica muy habitual. Cuando le llevas a tu banco una oferta de subrogación real de otra entidad, muchas veces prefiere igualarla mediante una novación antes que perder al cliente. Tener una oferta en firme sobre la mesa es lo que da fuerza a la negociación; sin ella, la conversación rara vez avanza.',
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
              "Me han dicho que puedo cambiar mi hipoteca de banco y pagar menos. ¿Es verdad?" Sí, se
              llama subrogación y a veces es una de las mejores decisiones financieras que puedes
              tomar. Otras veces, el ahorro se lo comen los costes y no compensa moverse. La clave no
              es la teoría, son los números de tu caso concreto. En este artículo te explico qué es la
              subrogación, cuánto cuesta con la Ley 5/2019, en qué se diferencia de la novación y cómo
              calcular si de verdad te sale a cuenta.
            </p>
            <p>
              Soy broker hipotecario registrado en el Banco de España (número <strong>E242</strong>) y
              esta operación la hago con frecuencia. Te la cuento sin humo.
            </p>

            <h2 id="que-es">Qué es subrogar la hipoteca</h2>
            <p>
              La <strong>subrogación de acreedor</strong> consiste en trasladar tu hipoteca de tu banco
              actual a otro que te ofrece mejores condiciones. No cancelas el préstamo ni firmas una
              nueva compraventa: la deuda pendiente y el inmueble son los mismos, lo que cambia es la
              entidad que te presta y, con ella, el tipo de interés y las condiciones. Está regulada
              en la{' '}
              <a
                href="https://www.boe.es/buscar/act.php?id=BOE-A-2019-3814"
                target="_blank"
                rel="noopener noreferrer"
              >
                Ley 5/2019 de crédito inmobiliario
              </a>
              , que precisamente facilitó y abarató este cambio para dar más poder al cliente.
            </p>
            <p>
              Es distinto de la <strong>subrogación de deudor</strong>, que es cuando te subrogas en la
              hipoteca del promotor al comprar obra nueva o cuando cambia quién debe el préstamo. Aquí
              hablo de la de acreedor: cambiar de banco buscando mejores condiciones.
            </p>

            <h2 id="subrogacion-vs-novacion">Subrogación vs novación: la decisión de fondo</h2>
            <p>
              Antes de mover nada conviene tener claras las dos herramientas, porque casi siempre se
              usan juntas:
            </p>
            <ul>
              <li>
                <strong>Subrogación:</strong> cambias de banco. Te llevas la hipoteca a otra entidad
                con mejores condiciones.
              </li>
              <li>
                <strong>Novación:</strong> modificas las condiciones dentro de tu mismo banco (bajar
                el tipo, pasar de variable a fijo, alargar o acortar el plazo) mediante un acuerdo con
                tu entidad actual.
              </li>
            </ul>
            <p>
              La lógica práctica es sencilla: la novación es más cómoda porque no cambias de banco,
              pero <strong>solo funciona si tu banco quiere mejorarte</strong>. La subrogación es la
              palanca que le da sentido a la conversación: cuando le enseñas a tu banco una oferta de
              subrogación real de otra entidad, muchas veces prefiere igualarla con una novación antes
              que perderte. Sin esa oferta encima de la mesa, la negociación rara vez avanza.
            </p>

            <h2 id="cuanto-cuesta">Cuánto cuesta subrogar (comisiones Ley 5/2019)</h2>
            <p>
              La Ley 5/2019 puso límites a las comisiones para que cambiar de banco no fuera una
              trampa. Los <strong>topes legales</strong> (máximos, no importes fijos) son:
            </p>
            <ul>
              <li>
                <strong>Hipoteca a tipo variable:</strong> comisión máxima del 0,25% del capital
                reembolsado durante los tres primeros años, 0,15% entre el cuarto y el quinto año, y
                <strong> 0%</strong> a partir de ahí.
              </li>
              <li>
                <strong>Hipoteca a tipo fijo:</strong> hasta el 2% del capital durante los diez
                primeros años y hasta el 1,5% después.
              </li>
            </ul>
            <p>
              Son <strong>máximos</strong>: lo que pagues depende de lo que diga tu escritura y del
              capital pendiente. Además de esta comisión, cuenta con la <strong>tasación</strong> del
              inmueble (que suele exigir el banco nuevo) y posibles gastos de gestión. Como los
              importes y algún detalle pueden cambiar, conviene{' '}
              <strong>verificar las condiciones vigentes</strong> de tu contrato y consultar el marco
              en{' '}
              <a href="/como-funciona-ley-5-2019">cómo funciona la Ley 5/2019</a>.
            </p>

            <h2 id="cuando-compensa">Cuándo compensa de verdad</h2>
            <p>
              La regla es simple de enunciar y fácil de olvidar: <strong>compensa cuando el ahorro en
              intereses de la vida restante del préstamo supera con holgura los costes de la
              operación</strong>. Y ese ahorro depende de tres factores:
            </p>
            <ul>
              <li>
                <strong>Capital pendiente:</strong> cuanto más debas, más pesa cada décima de tipo.
              </li>
              <li>
                <strong>Años que te quedan:</strong> el ahorro se acumula año a año; con pocos años
                restantes hay poco margen para recuperar los costes.
              </li>
              <li>
                <strong>Diferencia de tipo:</strong> pasar del 3,5% al 2,5% no es lo mismo que del 3%
                al 2,8%.
              </li>
            </ul>
            <p>
              Traducido: si te quedan muchos años, mucho capital y consigues bajar el tipo de forma
              notable, la subrogación suele merecer mucho la pena. Si te queda poco préstamo o la
              rebaja es pequeña, el ahorro se lo comen la comisión y la tasación y no vale el esfuerzo.
            </p>
            <p>
              No te fíes de la intuición: haz el número. Puedes estimar el ahorro y compararlo con los
              costes en la{' '}
              <a href="/calculadora-subrogacion-hipoteca">calculadora de subrogación de hipoteca</a>.
              Ese cálculo es el que convierte "me han dicho que ahorraría" en una cifra concreta sobre
              la que decidir.
            </p>

            <h2 id="cambiar-tipo">Subrogar para cambiar de tipo de interés</h2>
            <p>
              Muchas subrogaciones no buscan solo bajar unas décimas, sino <strong>cambiar la
              naturaleza</strong> del préstamo: pasar de una variable que sube con el Euríbor a una
              fija que da tranquilidad, o al revés. Esa decisión merece pensarse aparte del ahorro
              puro: la comparo con criterio en{' '}
              <a href="/blog/hipoteca-fija-variable-o-mixta">hipoteca fija, variable o mixta</a>, y
              tienes el marco general en{' '}
              <a href="/tipos-de-hipoteca">tipos de hipoteca</a>. Si tu miedo es que la cuota se
              dispare con el Euríbor, antes de subrogar conviene ver cuánto aguantarías: para eso está
              la lógica del{' '}
              <a href="/calculadora-stress-test-euribor">test de estrés del Euríbor</a>.
            </p>

            <h2 id="ojo-vinculaciones">Ojo con las vinculaciones y el seguro</h2>
            <p>
              Un tipo más bajo en el banco nuevo suele venir condicionado a productos vinculados:
              nómina, tarjetas y, sobre todo, <strong>seguros</strong>. Antes de darte por ganador con
              la nueva oferta, calcula el coste total incluyendo esas vinculaciones, porque a veces
              anulan el ahorro del tipo. El seguro de vida es el caso más caro y el más fácil de
              optimizar: lo explico en{' '}
              <a href="/blog/seguro-de-vida-vinculado-hipoteca">
                seguro de vida vinculado a la hipoteca
              </a>
              .
            </p>

            <h2 id="alternativa">La alternativa que a veces gana: amortizar</h2>
            <p>
              No siempre la respuesta es mover la hipoteca. Si tienes ahorro disponible, a veces sale
              más a cuenta <strong>amortizar anticipadamente</strong> que subrogar, o combinar ambas.
              Es una decisión de coste de oportunidad que trato a fondo en{' '}
              <a href="/blog/amortizar-hipoteca-anticipadamente">
                amortizar la hipoteca anticipadamente
              </a>
              . La subrogación baja el tipo; la amortización baja la deuda. No son lo mismo y a veces
              conviene una, otra o las dos.
            </p>

            <h2 id="cierre">Cierre</h2>
            <p>
              Subrogar la hipoteca es una de las pocas palancas que la ley pone claramente del lado del
              cliente, y la Ley 5/2019 la abarató a propósito. Pero no es automática: compensa cuando
              te quedan capital y años por delante y la rebaja de tipo es real, contando comisión,
              tasación y vinculaciones. Antes de moverte, haz el número y usa la oferta como palanca de
              negociación con tu propio banco.
            </p>
            <p>
              Si estás pensando en cambiar tu hipoteca de banco, cuéntame tu caso. Reviso tu escritura,
              calculo el ahorro real y te digo con franqueza si compensa subrogar, novar o quedarte
              como estás. Trabajo con registro <strong>E242</strong> verificable; así lo hago en{' '}
              <a href="/broker-hipotecario">cómo funciona mi servicio</a>.
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
            ¿Tu hipoteca actual se puede mejorar?
          </h2>
          <p className="text-paper/80 text-lg mb-8 max-w-prose mx-auto">
            Primera llamada gratis. Reviso tu escritura, calculo el ahorro real de subrogar o novar y
            te digo con números si compensa moverte o quedarte.
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
            <Button href="/calculadora-subrogacion-hipoteca" variant="primary" size="lg">
              Calcular mi ahorro
            </Button>
          </div>
        </Container>
      </Section>
    </main>
  )
}
