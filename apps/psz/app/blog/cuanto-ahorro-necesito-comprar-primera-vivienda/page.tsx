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

const SLUG = 'cuanto-ahorro-necesito-comprar-primera-vivienda'
const URL = `${SITE_URLS.psz}/blog/${SLUG}`
const post = getPostBySlug(SLUG)!

export const metadata: Metadata = {
  title: 'Cuánto ahorro necesitas para comprar tu primera vivienda (2026)',
  description:
    'Cuánto dinero hay que tener ahorrado para comprar la primera vivienda en España: la entrada, los gastos de compraventa y la regla del 30%, con ejemplos y las excepciones que permiten financiar el 90-100%.',
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
    question: '¿Cuánto dinero necesito ahorrado para comprar mi primera vivienda?',
    answer:
      'La regla general en España es tener ahorrado alrededor del 30% del precio de la vivienda: aproximadamente un 20% de entrada (porque la mayoría de bancos financian hasta el 80% del valor de tasación o compraventa, el menor de los dos) más un 10-12% adicional para los gastos de compraventa (impuestos, notaría, registro, gestoría y tasación). Para una vivienda de 150.000 € eso son unos 45.000 € de ahorro. Hay excepciones que reducen esa cifra, que explico más abajo.',
  },
  {
    question: '¿Puedo comprar mi primera vivienda sin ahorros o con el 100% financiado?',
    answer:
      'Es posible pero no habitual. Las vías reales son: (1) la Línea de Avales ICO para primera vivienda, en la que el Estado avala hasta un 20% para jóvenes y familias con menores que cumplan los requisitos, permitiendo al banco financiar cerca del 100%; (2) comprar por debajo del valor de tasación, de modo que el 80% de la tasación se acerque al precio real; (3) promociones puntuales de banca al 90-100% para perfiles muy solventes. Aun así, casi siempre necesitarás cubrir los gastos de compraventa con ahorro propio.',
  },
  {
    question: '¿Los gastos de compraventa se pueden incluir en la hipoteca?',
    answer:
      'Por norma general no. El banco financia sobre el valor del inmueble, no sobre los impuestos y gastos de la operación, que debes aportar tú. La excepción es cuando la tasación es superior al precio de compra y el banco acepta financiar un porcentaje mayor del precio real: ahí, en la práctica, parte de los gastos queda cubierta. Es una de las cosas que un intermediario negocia caso a caso.',
  },
  {
    question: '¿Cuánto son los gastos de comprar una vivienda de segunda mano frente a obra nueva?',
    answer:
      'En vivienda de segunda mano el impuesto principal es el ITP (Impuesto de Transmisiones Patrimoniales), que fija cada comunidad autónoma y suele moverse entre el 6% y el 10%. En obra nueva se paga IVA (10% con carácter general en vivienda) más AJD (Actos Jurídicos Documentados, según comunidad). A eso se suman notaría, registro, gestoría y tasación, comunes a ambos casos. Por eso el total de gastos ronda el 10-12% del precio.',
  },
  {
    question: '¿Cuánto puedo pagar de hipoteca según mis ingresos?',
    answer:
      'La referencia que usa la banca es que la cuota no supere aproximadamente el 30-35% de tus ingresos netos mensuales, sumando todas tus deudas. Con ese límite y el plazo, se calcula el capital máximo que te concederían. Puedes estimarlo con la calculadora de capacidad de endeudamiento de esta web antes de buscar piso.',
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
              Es la primera pregunta que me hace casi todo el que quiere comprar su primera casa, y
              casi siempre antes de mirar pisos: <strong>¿cuánto dinero necesito tener ahorrado?</strong>{' '}
              La respuesta corta es una regla que conviene grabarse: en torno al <strong>30% del
              precio</strong> de la vivienda. La respuesta larga —y las excepciones que rebajan esa
              cifra— es lo que te explico aquí.
            </p>

            <h2 id="dos-partes">El ahorro se divide en dos partes</h2>
            <p>
              Cuando compras una vivienda con hipoteca necesitas cubrir dos cosas con dinero propio:
              la <strong>entrada</strong> y los <strong>gastos de compraventa</strong>. Son
              conceptos distintos y conviene no mezclarlos.
            </p>

            <h3>1. La entrada (≈ 20% del precio)</h3>
            <p>
              La mayoría de bancos en España financian como máximo el <strong>80% del menor de dos
              valores</strong>: el precio de compraventa o el valor de tasación. El 20% restante lo
              pones tú. Es lo que se llama la entrada. Este límite del 80% no es un capricho del
              banco: responde a los criterios de riesgo con los que trabaja la banca minorista
              española para vivienda habitual.
            </p>

            <h3>2. Los gastos de compraventa (≈ 10-12% del precio)</h3>
            <p>
              A la entrada hay que sumar los gastos e impuestos de la operación, que{' '}
              <strong>no financia el banco</strong> y aportas de tu bolsillo:
            </p>
            <ul>
              <li>
                <strong>Impuesto.</strong> En vivienda de segunda mano, el ITP (Impuesto de
                Transmisiones Patrimoniales), que fija cada comunidad autónoma y suele ir del 6% al
                10%. En obra nueva, IVA (10% general) más AJD.
              </li>
              <li><strong>Notaría</strong> por la escritura de compraventa y la de hipoteca.</li>
              <li><strong>Registro de la Propiedad.</strong></li>
              <li><strong>Gestoría</strong> (tramitación de impuestos e inscripción).</li>
              <li><strong>Tasación</strong> de la vivienda (la exige el banco; suele rondar 300-500 €).</li>
            </ul>
            <p>
              En conjunto, estos gastos rondan el <strong>10-12% del precio</strong>. Un desglose
              exacto para tu comunidad autónoma lo tienes en la{' '}
              <a href="/calculadora-gastos-compra">calculadora de gastos de compra</a>.
            </p>

            <h2 id="la-regla">La regla del 30%, con números</h2>
            <p>
              Sumando entrada (20%) y gastos (10-12%), el ahorro necesario ronda el{' '}
              <strong>30-32% del precio</strong>. Así queda para tres precios habituales de primera
              vivienda:
            </p>
            <ul>
              <li>
                <strong>Vivienda de 120.000 €:</strong> ~24.000 € de entrada + ~13.200 € de gastos ={' '}
                <strong>≈ 37.200 €</strong>.
              </li>
              <li>
                <strong>Vivienda de 150.000 €:</strong> ~30.000 € de entrada + ~16.500 € de gastos ={' '}
                <strong>≈ 46.500 €</strong>.
              </li>
              <li>
                <strong>Vivienda de 200.000 €:</strong> ~40.000 € de entrada + ~22.000 € de gastos ={' '}
                <strong>≈ 62.000 €</strong>.
              </li>
            </ul>
            <p>
              Son cifras orientativas: el porcentaje exacto de gastos depende de tu comunidad
              autónoma y de si es obra nueva o segunda mano.
            </p>

            <h2 id="excepciones">Las excepciones que rebajan el ahorro necesario</h2>
            <p>
              La regla del 30% es el caso general, no una ley física. Hay vías legítimas para
              comprar con menos ahorro:
            </p>
            <ol>
              <li>
                <strong>Línea de Avales ICO para primera vivienda.</strong> El Estado, a través del
                ICO, avala hasta un 20% de la hipoteca para jóvenes y familias con menores que
                cumplan los requisitos (entre ellos, límites de renta y que sea vivienda habitual).
                Con ese aval, el banco puede financiar cerca del 100% del precio, y solo necesitas
                cubrir los gastos. Las condiciones cambian con el tiempo:{' '}
                <strong>verifica siempre la convocatoria vigente</strong> antes de contar con ella.
              </li>
              <li>
                <strong>Comprar por debajo del valor de tasación.</strong> Si la tasación sale por
                encima del precio que pagas, el 80% de esa tasación puede acercarse al 90-95% de tu
                precio real. Encontrar esas operaciones es parte del trabajo.
              </li>
              <li>
                <strong>Financiación al 90-100% para perfiles muy solventes.</strong> Algunos bancos
                la ofrecen de forma puntual a funcionarios, profesiones estables o rentas altas. No
                se publicita: se negocia.
              </li>
            </ol>

            <h2 id="broker">Dónde entra un intermediario</h2>
            <p>
              La cifra de ahorro no es fija para todos: depende del banco, de la tasación y de tu
              perfil. Un intermediario de crédito inmobiliario trabaja precisamente ese margen:
              presenta tu operación a varias entidades a la vez, busca la que da mejor porcentaje de
              financiación para tu caso, y valora si encajas en un aval ICO o en una financiación
              ampliada. La diferencia entre necesitar un 30% o un 12% de ahorro puede depender de a
              qué banco y cómo se presente la operación.
            </p>
            <p>
              Antes de nada, haz dos números en casa: cuánto puedes aportar y cuánta cuota
              aguantas. Para lo segundo tienes la{' '}
              <a href="/calculadora-capacidad-endeudamiento">calculadora de capacidad de
              endeudamiento</a>. Con esas dos cifras sabrás en qué rango de precio te puedes mover
              de forma realista.
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
            ¿Quieres saber qué banco financiaría más tu caso?
          </h2>
          <p className="text-paper/80 text-lg mb-8 max-w-prose mx-auto">
            Primera llamada gratis. Con tus números te digo cuánto ahorro necesitas de verdad y a
            qué entidades tiene sentido presentar tu primera vivienda.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button href={MORTGAGE_FORM_URL} variant="gold" size="lg" target="_blank" rel="noopener noreferrer">
              Solicitar mi hipoteca →
            </Button>
            <Button href="/hipoteca-primera-vivienda" variant="primary" size="lg">
              Hipoteca de primera vivienda
            </Button>
          </div>
        </Container>
      </Section>
    </main>
  )
}
