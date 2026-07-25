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

const SLUG = 'gastos-de-comprar-vivienda-por-comunidad'
const URL = `${SITE_URLS.psz}/blog/${SLUG}`
const post = getPostBySlug(SLUG)!

export const metadata: Metadata = {
  title: 'Gastos de comprar vivienda por comunidad autónoma',
  description:
    'ITP, IVA, AJD, notaría, registro y gestoría: cuánto suma comprar una vivienda según la comunidad autónoma, con la horquilla real y cómo reducir la factura.',
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
    question: '¿Cuánto suman los gastos de comprar una vivienda en España?',
    answer:
      'Como referencia general, los gastos e impuestos de comprar una vivienda suman en torno al 10-12% del precio en segunda mano y algo menos en obra nueva. La partida más grande es el impuesto (ITP en segunda mano o IVA más AJD en obra nueva). El resto son notaría, registro, gestoría y la tasación. La cifra exacta depende mucho de la comunidad autónoma.',
  },
  {
    question: '¿Por qué cambian tanto los gastos según la comunidad autónoma?',
    answer:
      'Porque el impuesto principal —el ITP en segunda mano y el AJD en obra nueva— lo fija y recauda cada comunidad autónoma, no el Estado. Eso hace que el mismo piso al mismo precio tenga una factura fiscal distinta según dónde esté. Notaría y registro, en cambio, están regulados por aranceles estatales y varían poco entre territorios.',
  },
  {
    question: '¿El banco financia los gastos de compra?',
    answer:
      'Por norma no. El banco financia hasta el 80% del valor de compra o tasación, pero los impuestos y gastos corren de tu cuenta y hay que tenerlos ahorrados aparte de la entrada. Solo en casos concretos (perfil muy solvente, financiación con aval público) se puede llegar a más porcentaje, pero no debes darlo por hecho.',
  },
  {
    question: '¿Hay bonificaciones para reducir el ITP?',
    answer:
      'Sí, muchas comunidades aplican tipos reducidos de ITP en ciertos supuestos: compradores menores de 35 años, familias numerosas, vivienda habitual, personas con discapacidad o zonas rurales despobladas. Los requisitos y porcentajes cambian por territorio y se actualizan, así que conviene verificar las condiciones vigentes en tu comunidad antes de comprar.',
  },
  {
    question: '¿Quién paga los gastos de la hipoteca desde la Ley 5/2019?',
    answer:
      'Desde la Ley 5/2019, el banco asume la mayor parte de los gastos de constitución de la hipoteca: gestoría, registro, notaría de la escritura de préstamo y el AJD de la hipoteca. El comprador paga los gastos de la compraventa (el impuesto de la vivienda, su parte de notaría) y la tasación. Esto separó claramente los gastos de comprar de los gastos de hipotecar.',
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
              Hay una frase que repito en cada primera llamada: la entrada no es lo único que tienes
              que tener ahorrado. Encima del 20% que no financia el banco, hay que sumar los impuestos
              y gastos de la compraventa, que rondan el 10-12% del precio. Y aquí viene lo que sorprende
              a casi todo el mundo: esa cifra cambia mucho según la comunidad autónoma donde compres.
              Te explico de qué se compone la factura y dónde puedes reducirla.
            </p>

            <h2 id="las-partidas">De qué se compone la factura</h2>
            <p>Los gastos de comprar una vivienda se dividen en cuatro bloques:</p>
            <ul>
              <li>
                <strong>El impuesto de la vivienda</strong> — la partida grande, y la que más varía
                por territorio (lo veremos enseguida).
              </li>
              <li>
                <strong>Notaría</strong> — regulada por arancel estatal, depende del precio del
                inmueble.
              </li>
              <li>
                <strong>Registro de la propiedad</strong> — también por arancel, para inscribir la
                compra a tu nombre.
              </li>
              <li>
                <strong>Gestoría</strong> — opcional en la compraventa, tramita impuestos e
                inscripción.
              </li>
            </ul>
            <p>
              A esto se añade la <strong>tasación</strong>, necesaria para la hipoteca, que paga el
              comprador. Notaría, registro y gestoría se parecen bastante en toda España; la
              diferencia real entre comunidades la marca el impuesto.
            </p>

            <h2 id="el-impuesto">El impuesto: ITP o IVA, según el tipo de vivienda</h2>
            <p>
              Aquí está la clave de todo. El impuesto depende de si compras segunda mano u obra nueva
              — una distinción que desarrollo en{' '}
              <a href="/blog/segunda-mano-vs-obra-nueva">
                vivienda de segunda mano u obra nueva
              </a>
              :
            </p>
            <ul>
              <li>
                <strong>Segunda mano → ITP.</strong> El Impuesto de Transmisiones Patrimoniales lo
                fija <em>cada comunidad autónoma</em>. Es un porcentaje del precio de compra, y ahí
                está toda la variación territorial: el mismo piso, al mismo precio, tributa distinto en
                una comunidad o en otra.
              </li>
              <li>
                <strong>Obra nueva → IVA + AJD.</strong> El IVA de vivienda es un tipo reducido estatal
                (igual en todo el país), y encima se paga el AJD (Actos Jurídicos Documentados), que sí
                fija cada comunidad.
              </li>
            </ul>
            <p>
              Como los tipos de ITP y AJD los deciden las comunidades y se actualizan, no voy a dar
              porcentajes que puedan quedar desfasados: lo importante es que{' '}
              <strong>verifiques el tipo vigente</strong> en la web de tu comunidad o en el{' '}
              <a
                href="https://sede.agenciatributaria.gob.es/"
                target="_blank"
                rel="noopener noreferrer"
              >
                portal de la Agencia Tributaria
              </a>{' '}
              antes de comprar. Para tu caso concreto, con tu precio y tu comunidad, la{' '}
              <a href="/calculadora-gastos-compra">calculadora de gastos de compra</a> te da la cifra
              directamente.
            </p>

            <h2 id="por-que-varia">Por qué el mismo piso cuesta más en una comunidad que en otra</h2>
            <p>
              Porque la vivienda tiene fiscalidad autonómica. Dos personas que compran un piso idéntico
              al mismo precio, una en un territorio con ITP alto y otra en uno con ITP reducido, pueden
              tener una diferencia de varios miles de euros solo en impuestos. Por eso, cuando alguien
              me dice "tengo X ahorrado", lo primero que hago es mirar en qué comunidad va a comprar:
              ese dato cambia cuánto piso puede permitirse de verdad.
            </p>

            <h2 id="bonificaciones">Cómo reducir la factura fiscal</h2>
            <p>
              La buena noticia es que muchas comunidades aplican tipos reducidos de ITP para
              determinados perfiles. Los más habituales:
            </p>
            <ul>
              <li>
                <strong>Menores de 35 años</strong> que compran su vivienda habitual — muy relevante si
                encajas, lo trato junto a otras ayudas en{' '}
                <a href="/blog/hipoteca-joven-menos-35-anos">
                  hipoteca para jóvenes de menos de 35 años
                </a>
                .
              </li>
              <li>Familias numerosas.</li>
              <li>Personas con discapacidad.</li>
              <li>Compra de vivienda habitual (frente a segunda residencia o inversión).</li>
              <li>Zonas rurales o en riesgo de despoblación.</li>
            </ul>
            <p>
              Los requisitos y porcentajes cambian por territorio y se revisan cada año, así que
              conviene <strong>verificar las condiciones vigentes</strong> y, muy importante, comprobar
              si hay que solicitar la bonificación en el momento de la compra. Aplicarla bien puede
              ahorrarte varios miles de euros de golpe.
            </p>

            <h2 id="gastos-hipoteca">Ojo: gastos de comprar ≠ gastos de hipotecar</h2>
            <p>
              Un punto que confunde a mucha gente. Desde la{' '}
              <a
                href="https://www.boe.es/buscar/act.php?id=BOE-A-2019-3814"
                target="_blank"
                rel="noopener noreferrer"
              >
                Ley 5/2019
              </a>
              , los gastos de <em>constituir la hipoteca</em> (gestoría, registro, notaría del préstamo
              y AJD de la hipoteca) los asume mayoritariamente el <strong>banco</strong>. Lo que pagas
              tú son los gastos de la <em>compraventa</em>: el impuesto de la vivienda, tu parte de
              notaría y la tasación. Es decir, comprar y financiar tienen facturas separadas, y la
              reforma de 2019 alivió al comprador en la parte hipotecaria.
            </p>

            <h2 id="ejemplo">Cómo lo calculo yo con un cliente</h2>
            <p>
              El orden que sigo siempre es este: primero fijamos precio objetivo y comunidad; después
              calculo el impuesto que corresponde y le sumo notaría, registro, gestoría y tasación; y
              con eso sé cuánto necesita ahorrado <em>además</em> de la entrada. Ese total es el dato
              que de verdad manda a la hora de decidir qué piso es alcanzable. Lo desgloso junto al
              ahorro total en{' '}
              <a href="/blog/cuanto-ahorro-necesito-comprar-primera-vivienda">
                cuánto ahorro necesitas para comprar tu primera vivienda
              </a>
              , y encaja en el orden general de la{' '}
              <a href="/blog/comprar-primera-vivienda-paso-a-paso">
                guía para comprar la primera vivienda paso a paso
              </a>
              .
            </p>

            <h2 id="cierre">Cierre</h2>
            <p>
              Los gastos de comprar no son un detalle menor: son entre el 10 y el 12% del precio y
              varían miles de euros según tu comunidad autónoma. Calcúlalos antes de enamorarte de un
              piso, comprueba si tienes derecho a alguna bonificación y ténlos apartados del ahorro de
              la entrada. Haz una estimación rápida de la cuota con la{' '}
              <a href="/calculadora-hipoteca">calculadora de hipoteca</a> y de la factura fiscal con la{' '}
              <a href="/calculadora-gastos-compra">calculadora de gastos de compra</a>. Y si quieres
              que revisemos tu caso concreto, cuéntamelo.
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
            ¿Quieres saber cuánto te costará de verdad comprar?
          </h2>
          <p className="text-paper/80 text-lg mb-8 max-w-prose mx-auto">
            Primera llamada gratis. Calculo contigo la factura completa —impuestos, gastos y cuota— y
            te digo cuánto necesitas ahorrado. Sin compromiso.
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
            <Button href="/hipoteca-primera-vivienda" variant="primary" size="lg">
              Hipoteca primera vivienda
            </Button>
          </div>
        </Container>
      </Section>
    </main>
  )
}
