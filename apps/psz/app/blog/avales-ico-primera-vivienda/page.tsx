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

const SLUG = 'avales-ico-primera-vivienda'
const URL = `${SITE_URLS.psz}/blog/${SLUG}`
const post = getPostBySlug(SLUG)!

export const metadata: Metadata = {
  title: 'Avales ICO para primera vivienda: financiar cerca del 100% (2026)',
  description:
    'Qué es la Línea de Avales ICO para primera vivienda, quién puede pedirla, cuánto avala el Estado y cómo permite financiar cerca del 100% sin tener el 20% de entrada. Con los requisitos y las cautelas antes de contar con ella.',
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
    question: '¿Qué es el aval ICO para la primera vivienda?',
    answer:
      'Es una garantía pública: el Estado, a través del ICO (Instituto de Crédito Oficial), avala ante el banco una parte de la hipoteca —con carácter general hasta el 20%— para que el banco pueda financiar por encima del habitual 80%, acercándose al 100% del precio. No es dinero que recibas: es un aval que sustituye a la entrada que normalmente tendrías que aportar. La hipoteca la pides y la pagas igual; simplemente el banco asume menos riesgo porque una parte está avalada por el Estado.',
  },
  {
    question: '¿Quién puede pedir el aval ICO?',
    answer:
      'La línea se dirige principalmente a jóvenes (habitualmente hasta 35 años) y a familias con menores a cargo que cumplan los requisitos de la convocatoria: que sea su vivienda habitual, primera vivienda, y no superar unos límites de ingresos y de patrimonio fijados por el programa. Los umbrales exactos (edad, renta máxima, precio de la vivienda) se establecen en la normativa vigente y pueden actualizarse, por lo que hay que consultarlos en el momento de solicitarlo.',
  },
  {
    question: '¿Con el aval ICO puedo comprar sin ningún ahorro?',
    answer:
      'Casi, pero no del todo. El aval cubre la entrada (el ~20% que no financia el banco), así que puedes acceder sin tener ese ahorro. Pero los gastos de compraventa (impuestos, notaría, registro, gestoría, tasación), que rondan el 10-12% del precio, siguen sin financiarse: esos los aportas tú. Conviene tener ahorrado al menos ese porcentaje.',
  },
  {
    question: '¿Dónde se solicita el aval ICO?',
    answer:
      'No se pide directamente al ICO, sino a través de los bancos adheridos a la línea. Solicitas tu hipoteca en una entidad participante y, si cumples los requisitos, se tramita con el aval incorporado. No todas las entidades están adheridas ni todas aplican los mismos criterios de concesión, así que compensa comparar varias.',
  },
  {
    question: '¿El aval ICO encarece la hipoteca?',
    answer:
      'El aval en sí no tiene coste directo para el comprador. Ahora bien, financiar un porcentaje más alto del precio significa más capital y, por tanto, más intereses a lo largo de la vida del préstamo; y algunas entidades reservan sus mejores condiciones para quien aporta entrada. Por eso conviene comparar el conjunto (tipo, plazo, vinculaciones), no solo el hecho de que te avalen.',
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
              El mayor obstáculo para comprar la primera vivienda casi nunca es la cuota: es reunir
              la <strong>entrada del 20%</strong>. El aval ICO existe precisamente para eso —para que
              quien puede pagar una hipoteca pero no tiene el ahorro de la entrada pueda comprar—. Te
              explico qué es, quién puede pedirlo y, sobre todo, qué mirar antes de contar con él.
            </p>

            <h2 id="que-es">Qué es (y qué no es) el aval ICO</h2>
            <p>
              El aval del ICO <strong>no es dinero que recibas</strong>. Es una garantía pública: el
              Estado avala ante el banco una parte de tu hipoteca —con carácter general hasta el{' '}
              <strong>20%</strong>— de forma que la entidad puede prestarte por encima del habitual
              80% del valor, acercándose al <strong>100% del precio</strong>. Dicho simple: el aval
              hace el papel de la entrada que no tienes.
            </p>
            <p>
              La hipoteca la pides, la firmas y la pagas igual que cualquier otra. La diferencia es
              que el banco asume menos riesgo porque una parte está respaldada por el Estado, y por
              eso acepta financiar más.
            </p>

            <h2 id="quien">Quién puede pedirlo</h2>
            <p>
              La línea se dirige sobre todo a <strong>jóvenes (habitualmente hasta 35 años)</strong>{' '}
              y a <strong>familias con menores a cargo</strong>. Los requisitos habituales:
            </p>
            <ul>
              <li>Que sea tu <strong>vivienda habitual y primera vivienda</strong>.</li>
              <li>No superar unos <strong>límites de ingresos</strong> fijados por la convocatoria.</li>
              <li>No superar un determinado <strong>patrimonio</strong>.</li>
              <li>Cumplir los requisitos de residencia y situación que marque la normativa vigente.</li>
            </ul>
            <p>
              <strong>Importante:</strong> los umbrales exactos —edad, renta máxima, límites— se
              fijan en la normativa del programa y <strong>se actualizan</strong>. Antes de dar por
              hecho que encajas, consulta las condiciones vigentes en la fuente oficial del{' '}
              <a href="https://www.ico.es/" target="_blank" rel="noopener noreferrer">ICO</a> o
              pregúntame y lo miramos con tu caso.
            </p>

            <h2 id="entrada-si-gastos-no">Cubre la entrada, no los gastos</h2>
            <p>
              Este es el matiz que más malentendidos genera. El aval cubre el ~20% de entrada, pero{' '}
              <strong>los gastos de compraventa siguen siendo tuyos</strong>: impuestos (ITP o
              IVA+AJD), notaría, registro, gestoría y tasación, que rondan el{' '}
              <strong>10-12% del precio</strong>. Es decir: con aval ICO puedes comprar sin tener el
              20% de entrada, pero conviene tener ahorrado al menos ese 10-12% de gastos. Lo
              desgloso en el artículo{' '}
              <a href="/blog/cuanto-ahorro-necesito-comprar-primera-vivienda">cuánto ahorro
              necesitas para tu primera vivienda</a>.
            </p>

            <h2 id="como">Cómo se solicita</h2>
            <ol>
              <li>
                <strong>No se pide al ICO directamente</strong>, sino a través de un{' '}
                <strong>banco adherido</strong> a la línea.
              </li>
              <li>Solicitas tu hipoteca en una entidad participante y, si cumples, se tramita con el aval incorporado.</li>
              <li>
                No todas las entidades están adheridas ni aplican los mismos criterios de concesión:
                una puede rechazarte y otra aprobarte el mismo caso. Por eso compensa presentarlo a varias.
              </li>
            </ol>

            <h2 id="cuidado">Antes de lanzarte: tres cosas a mirar</h2>
            <ul>
              <li>
                <strong>Financiar más es pagar más intereses.</strong> Acceder al 100% está bien si
                lo necesitas, pero cuanto más capital, más intereses a lo largo del préstamo. Haz el
                número del coste total, no solo de la cuota.
              </li>
              <li>
                <strong>Las mejores condiciones a veces se reservan a quien aporta entrada.</strong>{' '}
                Compara el conjunto (tipo, plazo, vinculaciones), no solo si te avalan.
              </li>
              <li>
                <strong>Compra con margen.</strong> Entrar al 100% deja menos colchón: si el Euríbor
                sube (en variable) o cambia tu situación, conviene haber medido el escenario adverso.
                Para eso tienes la{' '}
                <a href="/calculadora-stress-test-euribor">calculadora de stress test del
                Euríbor</a>.
              </li>
            </ul>

            <h2 id="cierre">En resumen</h2>
            <p>
              El aval ICO es una herramienta potente para quien tiene ingresos estables pero no ha
              podido ahorrar la entrada: convierte "no puedo comprar" en "puedo, si encaja en los
              requisitos". La clave está en confirmar que cumples las condiciones vigentes, tener
              cubiertos los gastos, y elegir bien el banco. Presentar tu caso a varias entidades
              adheridas —y saber cuál da mejores condiciones con aval— es justo donde un
              intermediario te ahorra tiempo y dinero.
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
            ¿Encajas en el aval ICO? Lo miramos con tus números
          </h2>
          <p className="text-paper/80 text-lg mb-8 max-w-prose mx-auto">
            Primera llamada gratis. Verifico si cumples los requisitos vigentes y a qué bancos
            adheridos tiene sentido presentar tu primera vivienda.
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
