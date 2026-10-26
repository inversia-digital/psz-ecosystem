import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { SITE_URLS, TONO, articleSchema, breadcrumbSchema, faqPageSchema } from '@psz/seo'
import { Button, Container, JsonLd, Section, TelegramCta } from '@psz/ui'
import { ArticleFaq } from '../../_components/ArticleFaq'
import { BarChart } from '../../_components/BarChart'
import { getPostBySlug, isLive } from '../_posts'

export const revalidate = 21600

const SLUG = 'fija-mixta-o-variable-euribor-octubre-2026'
const URL = `${SITE_URLS.psz}/blog/${SLUG}`
const post = getPostBySlug(SLUG)!

/** CTA con prefill y origen para atribuir el lead a este artículo en el CRM. */
const CTA_HREF = '/solicitar-hipoteca?origen=blog-fija-mixta-variable'

export const metadata: Metadata = {
  title: 'Hipoteca fija, mixta o variable con el euríbor al 3,26%',
  description:
    '¿Hipoteca fija, mixta o variable con el euríbor al 3,26%? Test de estrés en euros y tres preguntas para decidir sin adivinar el futuro.',
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

/** Hipoteca de 150.000 € a 30 años, sistema francés. Variable con diferencial ilustrativo de 0,60 puntos. */
const ESCENARIOS: { escenario: string; tin: string; cuota: number; highlight?: boolean }[] = [
  { escenario: 'Fija (desde, con bonificaciones)', tin: '2,55 %', cuota: 597 },
  { escenario: 'Variable, euríbor un punto más bajo', tin: '2,86 %', cuota: 621 },
  { escenario: 'Variable, euríbor actual', tin: '3,86 %', cuota: 704, highlight: true },
  { escenario: 'Variable, euríbor un punto más alto', tin: '4,86 %', cuota: 792 },
]

const FAQ_ITEMS = [
  {
    question: '¿Es buen momento para pasar a tipo fijo?',
    answer:
      'Nadie puede decirlo con honestidad. Depende de cuánto aguante tu presupuesto una subida y de cuánto tiempo vas a mantener el préstamo, no de acertar con el euríbor.',
  },
  {
    question: '¿Cuánto cuesta cambiar de variable a fija?',
    answer:
      'Depende de tu contrato y de la fecha en que lo firmaste. La Ley 5/2019 (artículo 23.6) limita la compensación por pasar de variable a fijo al 0,05 % del capital pendiente durante los tres primeros años del préstamo y no permite cobrarla después, pero hay que sumar notaría, registro y, a veces, tasación. Mira tu escritura y pide al banco el coste total por escrito.',
  },
  {
    question: '¿Qué es mejor para comparar, TIN o TAE?',
    answer:
      'La TAE, porque incluye comisiones y, si las bonificaciones son obligatorias, el coste de los productos vinculados. Compara siempre dos TAE: con vinculación y sin ella.',
  },
  {
    question: '¿La hipoteca mixta es un punto medio?',
    answer:
      'Es una fija durante los primeros años y una variable después. Sirve si crees que tu horizonte en la vivienda es corto o si quieres un periodo de calma antes del euríbor. No elimina el riesgo, lo aplaza.',
  },
  {
    question: '¿Me sirve un broker hipotecario?',
    answer:
      'Un broker compara entidades y condiciones por ti, pero la concesión depende siempre del banco. Lo que debe darte es un cálculo claro de qué te cuesta cada opción.',
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
            {' · '}Euríbor del Banco de España a 22 de octubre de 2026
          </p>
        </Container>
      </Section>

      <Section tone="paper" padding="md">
        <Container size="md">
          <article className="prose-psz">
            <p className="text-lg">
              El 22 de octubre de 2026 el euríbor a doce meses cerró en el 3,262 %, según el Banco
              de España. Con el índice ahí, la pregunta que más me llega como broker hipotecario es
              siempre la misma: ¿mixta, fija o variable?
            </p>
            <p>
              Mi respuesta es incómoda. Nadie sabe hacia dónde irá el euríbor. Así que la pregunta
              útil no es qué tipo va a ganar, sino{' '}
              <strong>cuánto aguanta tu presupuesto si te equivocas</strong>.
            </p>

            <h2 id="euribor-hoy">Euríbor hoy: lo que sabemos y lo que no</h2>
            <p>Sabemos que el euríbor ha subido y que el contexto empuja:</p>
            <ul>
              <li>
                El IPC de septiembre quedó en el 4,9 % y la inflación subyacente en el 3,1 %, según
                el INE (dato definitivo del 14 de octubre).
              </li>
              <li>
                El Brent llegó a los 111 dólares el 20 de octubre tras los ataques a instalaciones
                energéticas de Arabia Saudí, su nivel más alto desde mayo.
              </li>
            </ul>
            <p>
              Lo que no sabemos es qué pasará después. La prueba está en que la misma semana
              convivían titulares que apuntaban a una bajada del índice y otros que hablaban de
              repunte. Dos lecturas opuestas, ninguna certeza. Por eso aquí no encontrarás una
              previsión mía.
            </p>

            <h2 id="test-de-estres">El test de estrés: un punto de euríbor, en euros</h2>
            <p>
              Tomo una hipoteca de 150.000 euros a 30 años. Una variable con diferencial de 0,60
              puntos (cifra ilustrativa) tendría hoy un TIN del 3,86 %.
            </p>
            <p>
              Mira qué pasa si el euríbor se mueve un punto en cualquier dirección. Y compárala con
              una fija del 2,55 % TIN, la cifra desde la que arrancan las fijas con bonificaciones en
              los comparadores este mes (HelpMyCash, octubre de 2026).
            </p>
            <div className="overflow-x-auto">
              <table>
                <thead>
                  <tr>
                    <th>Escenario</th>
                    <th>TIN</th>
                    <th>Cuota mensual</th>
                  </tr>
                </thead>
                <tbody>
                  {ESCENARIOS.map((e) => (
                    <tr key={e.escenario}>
                      <td>{e.escenario}</td>
                      <td>{e.tin}</td>
                      <td>
                        <strong>{e.cuota} €</strong>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <BarChart
              title="Cuota mensual de una hipoteca de 150.000 € a 30 años según el euríbor"
              unit="€"
              data={ESCENARIOS.map((e) => ({
                label: e.escenario,
                value: e.cuota,
                highlight: e.highlight,
              }))}
              note="Variable con diferencial ilustrativo de 0,60 puntos sobre el euríbor del 22 de octubre de 2026 (3,262 %, Banco de España); fija desde el 2,55 % TIN con bonificaciones (HelpMyCash, octubre de 2026). Cálculo propio, sistema francés."
            />

            <h3>Qué enseña la tabla</h3>
            <p>
              Cada punto de euríbor mueve la cuota unos 85 euros al mes, más de mil euros al año, en
              esta hipoteca.
            </p>
            <p>
              La variable puede abaratarse o encarecerse, y la tabla enseña los dos lados. Esa
              simetría es el punto de partida de cualquier decisión.
            </p>

            <h3>Ojo con el titular de la fija</h3>
            <p>
              Una fija del 2,55 % exige bonificaciones (nómina, seguros, tarjeta) cuyo coste hay que
              sumar: en ese caso concreto la TAE con todo vinculado se va al 3,49 % y, sin bonificar,
              el TIN sube un punto. Compara por TAE, con y sin vinculación, no por el TIN del titular.
            </p>
            <p>
              Puedes rehacer la tabla con tus números en el{' '}
              <a href="/comparador-hipoteca-fija-variable-mixta">comparador fija, variable o mixta</a>{' '}
              y llevar la variable al límite con el{' '}
              <a href="/calculadora-stress-test-euribor">test de estrés del euríbor</a>.
            </p>

            <h2 id="tres-preguntas">Tres preguntas antes de elegir</h2>

            <h3>1. ¿Cabe tu cuota si todo sale mal?</h3>
            <p>
              Mi criterio: la cuota con dos puntos más de euríbor debería seguir cabiendo en tu
              presupuesto sin tocar el ahorro de emergencia.
            </p>
            <p>
              Si no cabe, la variable pura hoy no es para ti. La fija compra algo concreto:
              tranquilidad.
            </p>

            <h3>2. ¿Cuánto tiempo vas a quedarte?</h3>
            <p>
              Si lo normal es vender o cambiar de casa en cinco o siete años, una{' '}
              <strong>hipoteca mixta</strong>, con tramo fijo y después euríbor, puede encajar. El
              tramo variable quizá ni lo llegues a vivir.
            </p>
            <p>Si es la casa de toda la vida, pesa más la certeza de la fija.</p>

            <h3>3. ¿Cuánto cuesta esa certeza?</h3>
            <p>
              Históricamente, la fija ha costado más de entrada que la variable cuando el euríbor
              estaba bajo, y menos cuando la variable se dispara. Hoy la tabla sale a favor de la
              fija de entrada, pero eso cambia con el índice. Es un seguro: se paga una prima para no
              depender del euríbor.
            </p>
            <p>
              Si compras con poco ahorro inicial, revisa también cómo encaja el{' '}
              <a href="/blog/aval-ico-2026-requisitos-precio-maximo">aval ICO 2026</a> en tu
              operación. Y si quieres el criterio general para elegir tipo, sin la coyuntura de este
              mes, está en{' '}
              <a href="/blog/hipoteca-fija-variable-o-mixta">hipoteca fija, variable o mixta: cuál
              elegir</a>.
            </p>

            <h2 id="ya-tienes-variable">Si ya tienes una hipoteca variable o mixta</h2>
            <p>
              Con el euríbor al alza, muchas personas con hipoteca variable o mixta se plantean pasar
              a tipo fijo. Cambiar tiene costes:
            </p>
            <ul>
              <li>
                la comisión por el cambio, que la Ley 5/2019 limita al 0,05 % del capital pendiente
                durante los tres primeros años del préstamo y prohíbe a partir del cuarto;
              </li>
              <li>notaría y registro;</li>
              <li>quizá tasación;</li>
              <li>y el banco querrá renegociar condiciones.</li>
            </ul>
            <p>
              La cuenta sencilla es esta: si el cambio te ahorrara 100 euros al mes (1.200 al año),
              un coste de 1.500 euros se recupera en poco más de un año, y uno de 6.000 en cinco.
            </p>
            <p>
              Pide por escrito el coste total antes de decidir y compara con lo que ofrecen otras
              entidades.
            </p>

            <ArticleFaq items={FAQ_ITEMS} title="Preguntas frecuentes" />

            <h2 id="que-hacer">Qué hacer ahora</h2>
            <ul>
              <li>
                <strong>Si vas a firmar:</strong> haz la tabla de arriba con tus números y mira el
                peor escenario.
              </li>
              <li>
                <strong>Si ya tienes hipoteca y revisas pronto:</strong> pide el coste del cambio por
                escrito.
              </li>
              <li>
                <strong>Si quieres que lo calcule contigo:</strong>{' '}
                <a href={CTA_HREF}>solicita tu estudio de hipoteca</a>.
              </li>
              <li>
                <strong>Si lo tuyo es invertir para alquilar:</strong> la cuota entra en tu cálculo
                de rentabilidad neta. En el{' '}
                <a href="/canal-telegram-inversion-inmobiliaria">canal de Telegram para inversores</a>{' '}
                comparto cómo la calculo en tres escenarios.
              </li>
            </ul>

            <p>
              <em>
                Este artículo es información general y no es asesoramiento personalizado: la
                concesión de cualquier hipoteca depende de la entidad. Datos de mercado a 22 y 23 de
                octubre de 2026; cuotas calculadas por sistema francés.
              </em>
            </p>
            <p>
              <strong>{TONO.shortName}</strong>, broker hipotecario nº {TONO.credentials.bdeId} (Banco
              de España) y presidente de ANICI.
            </p>
          </article>

          <TelegramCta className="mt-10" />
        </Container>
      </Section>

      <Section tone="navy" padding="lg">
        <Container size="md" className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-paper mb-4">
            ¿Fija, mixta o variable? Lo calculamos con tus números
          </h2>
          <p className="text-paper/80 text-lg mb-8 max-w-prose mx-auto">
            Te preparo la tabla del peor escenario con tu operación real y te digo qué entidades
            encajan con tu perfil. Primera evaluación gratuita y sin compromiso.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button href={CTA_HREF} variant="gold" size="lg">
              Solicitar mi estudio de hipoteca →
            </Button>
            <Button href="/comparador-hipoteca-fija-variable-mixta" variant="primary" size="lg">
              Abrir el comparador
            </Button>
          </div>
        </Container>
      </Section>
    </main>
  )
}
