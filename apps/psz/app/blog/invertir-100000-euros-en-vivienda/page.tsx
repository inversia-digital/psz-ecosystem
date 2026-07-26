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

const SLUG = 'invertir-100000-euros-en-vivienda'
const URL = `${SITE_URLS.psz}/blog/${SLUG}`
const post = getPostBySlug(SLUG)!

export const metadata: Metadata = {
  title: 'Invertir 100.000 € en vivienda: qué compra hoy',
  description:
    'Qué operación real montas con 100.000 € en vivienda para alquilar: al contado o apalancado, gastos, reforma y rentabilidad neta en tres escenarios, con casos reales.',
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
    question: '¿Qué se puede comprar con 100.000 € para invertir en vivienda?',
    answer:
      'Con 100.000 € tienes dos caminos: comprar un piso al contado en secundario de precio medio-bajo (con o sin reforma), o usar ese capital como entrada más gastos y apalancarte con hipoteca para comprar un activo mayor o varios pequeños. La primera opción es más simple y sin deuda; la segunda multiplica la rentabilidad sobre tus fondos propios pero añade riesgo. La decisión depende de tu perfil, no de una regla universal.',
  },
  {
    question: '¿Es mejor comprar al contado o apalancarse con hipoteca?',
    answer:
      'Al contado eliminas el riesgo de la deuda y cobras el alquiler íntegro, pero inmovilizas todo el capital en un solo activo. Apalancándote, la misma cantidad da para más ladrillo y la rentabilidad sobre tus fondos propios sube si el alquiler cubre la cuota con holgura; a cambio asumes cuota, intereses y el riesgo de vacío. No hay respuesta única: hay que calcular ambos en tres escenarios.',
  },
  {
    question: '¿Cuánto se gasta de más sobre el precio de compra?',
    answer:
      'Sobre el precio hay que sumar ITP (en vivienda usada, variable por comunidad autónoma), notaría, registro y gestoría, más la reforma si la hay. En conjunto, los gastos de compra rondan con frecuencia el 10-13% del precio en vivienda usada, aunque depende de la comunidad. Esa cifra hay que meterla en la inversión total antes de calcular cualquier rentabilidad. Verificar el ITP vigente de tu comunidad.',
  },
  {
    question: '¿Qué rentabilidad neta puedo esperar con 100.000 €?',
    answer:
      'Depende del activo, la ciudad y si hay reforma o división. En operaciones de secundario bien compradas he visto rentabilidades netas de un dígito alto a dos dígitos, siempre sobre la inversión total y en tres escenarios (pesimista, realista, optimista). Son cifras orientativas de casos concretos, no una promesa: cada operación se calcula aparte y con datos verificados.',
  },
  {
    question: '¿Es buena idea meter todo el dinero en un solo piso?',
    answer:
      'Concentrar 100.000 € en un único activo es simple pero poco diversificado: un mal inquilino o una avería grande te afectan de lleno. Repartir en dos operaciones más pequeñas, o combinar capital propio con algo de financiación, reduce ese riesgo de concentración. La diversificación no elimina el riesgo, pero evita que un solo problema arruine el año.',
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
              "Tengo 100.000 € y no sé qué hacer con ellos." Es una de las frases que más escucho.
              Y mi respuesta nunca empieza por un piso concreto, sino por una pregunta: ¿quieres
              cobrar tranquilo o quieres que ese capital trabaje al máximo? Porque con 100.000 €
              puedes montar operaciones muy distintas, y la buena no es la que da el número más alto
              en un anuncio, sino la que encaja con tu tolerancia al riesgo.
            </p>
            <p>
              En este artículo monto dos operaciones ejemplo con casos reales de mi cartera, con la
              rentabilidad neta en tres escenarios, para que veas qué compra de verdad ese dinero en
              España hoy. Nada de titulares redondos: números con gastos, con impuestos y con la
              cuenta hecha sobre la inversión total.
            </p>

            <h2 id="dos-caminos">Dos caminos con el mismo capital</h2>
            <p>
              Antes de mirar activos, decide la estrategia. Con 100.000 € tienes dos rutas
              principales, y son filosóficamente distintas:
            </p>
            <ul>
              <li>
                <strong>Al contado, sin deuda.</strong> Compras un piso en secundario de precio
                medio-bajo, con o sin reforma, y cobras el alquiler íntegro. Cero cuota, cero riesgo
                de tipos, máxima tranquilidad. A cambio, concentras todo en un activo.
              </li>
              <li>
                <strong>Apalancado con hipoteca.</strong> Usas los 100.000 € como entrada más gastos
                y financias el resto. El mismo capital da para más ladrillo — o para dos operaciones
                pequeñas — y la rentabilidad sobre tus fondos propios sube si el alquiler cubre la
                cuota con holgura. El precio es asumir deuda, intereses y el riesgo de vacío.
              </li>
            </ul>
            <p>
              No hay ganador universal. Depende de si duermes tranquilo con deuda o no. Lo que sí es
              universal es que ambos caminos se calculan igual: rentabilidad neta sobre inversión
              total y en tres escenarios.
            </p>

            <h2 id="operacion-contado">Operación 1 — Al contado: un piso que renta desde el primer mes</h2>
            <p>
              Te enseño una operación real que gestioné. Piso de 97 m² en Orihuela (Alicante): compra
              por 78.000 € y, sumando ITP, notaría, registro y gestoría, una inversión total de{' '}
              <strong>90.540 €</strong> — cabe holgado en el presupuesto de 100.000 €. Se alquiló por{' '}
              <strong>750 €/mes</strong>, el mismo día de la firma.
            </p>
            <p>La rentabilidad neta, sobre la inversión total y en tres escenarios:</p>
            <ul>
              <li>
                <strong>PESIMISTA:</strong> con más vacío y alguna avería, la neta baja pero se
                mantiene sólida.
              </li>
              <li>
                <strong>REALISTA:</strong> ocupación alta y gastos normales, en torno al{' '}
                <strong>9,5% neto</strong>. Es el escenario con el que decidiría.
              </li>
              <li>
                <strong>OPTIMISTA:</strong> cero vacío y fiscalidad aprovechada al máximo, algo por
                encima.
              </li>
            </ul>
            <p>
              Con los 100.000 € casi enteros en un activo, este es el perfil "cobrar tranquilo": un
              piso bien comprado en secundario, alquilado rápido, sin deuda. Si te sobran unos miles,
              los dejas como colchón para el primer imprevisto.
            </p>

            <h2 id="operacion-reforma">Operación 2 — Comprar barato y reformar para rentar más</h2>
            <p>
              Si el capital lo permite y quieres exprimir la rentabilidad, la compra en secundario más
              reforma es de lo más eficiente. Dos casos reales de mi cartera:
            </p>
            <ul>
              <li>
                <strong>Monóvar (Alicante), piso de 114 m²:</strong> compra por 42.000 € + 3.000 € de
                reforma, inversión total <strong>54.040 €</strong>; alquiler 550 €/mes; rentabilidad
                neta en torno al <strong>11,6%</strong> (escenarios 9,9 / 10,5 / 11,2%). Con esa
                inversión te sobra la mitad del presupuesto.
              </li>
              <li>
                <strong>Sax (Alicante):</strong> compra por 33.000 € + 8.600 € de reforma, inversión
                total <strong>49.740 €</strong>; alquiler 500 €/mes; rentabilidad neta en torno al{' '}
                <strong>11,2%</strong> (10,0 / 11,2 / 12,4%).
              </li>
            </ul>
            <p>
              Aquí está la idea potente: con 100.000 € podrías montar <em>dos</em> operaciones como
              estas y diversificar, en lugar de meterlo todo en un solo piso. Dos activos, dos
              inquilinos, dos flujos de renta. Si uno tiene un mes malo, el otro sigue. La reforma no
              siempre compensa — cuándo sí y cuándo se come el margen lo explico en{' '}
              <a href="/blog/rehabilitar-para-alquilar-reforma-rentable">
                rehabilitar para alquilar
              </a>
              .
            </p>

            <h2 id="apalancamiento">La opción apalancada: cuando 100.000 € valen por más</h2>
            <p>
              Si te llevas bien con la deuda, esos 100.000 € pueden ser la entrada más los gastos de
              una operación mayor. La rentabilidad que importa entonces no es la del activo, sino la
              de tus fondos propios: si el alquiler cubre la cuota, los gastos y aún deja beneficio,
              el apalancamiento amplifica tu rentabilidad. Si el número va justo, la amplifica en
              sentido contrario.
            </p>
            <p>
              Por eso el apalancamiento se estructura, no se improvisa. Conviene simular la cuota con
              margen y comprobar que aguanta subidas del Euríbor con la{' '}
              <a href="/calculadora-stress-test-euribor">calculadora de stress test del Euríbor</a>,
              y montar la financiación desde la lógica de{' '}
              <a href="/hipoteca-inversor">hipoteca para inversores</a>, que no es la misma que la de
              una vivienda habitual.
            </p>

            <h2 id="numeros">Haz siempre los números antes de enamorarte del piso</h2>
            <p>
              El error más caro que veo no es elegir mal ciudad, es enamorarse de un piso y luego
              buscar números que lo justifiquen. El orden correcto es el inverso: primero el número,
              después el ladrillo. Antes de visitar nada, pasa la operación por la{' '}
              <a href="/calculadora-rentabilidad-inmobiliaria">
                calculadora de rentabilidad inmobiliaria
              </a>{' '}
              y quédate con el escenario realista, no con el optimista.
            </p>
            <p>
              Y si la oportunidad viene con "rentabilidad garantizada" o una cifra redonda sin
              desglose, pásala por el{' '}
              <a href="/test-anti-humo-inmobiliario">test anti-humo inmobiliario</a> antes de dar un
              euro. Casi siempre esa cifra brillante es bruta, no neta — la diferencia la explico en{' '}
              <a href="/blog/rentabilidad-bruta-vs-neta-alquiler">
                rentabilidad bruta vs neta del alquiler
              </a>
              .
            </p>

            <h2 id="quien-busca">Quién busca el piso: hazlo tú o delega</h2>
            <p>
              Encontrar el activo correcto en secundario, con margen y sin trampas, lleva tiempo y
              criterio. Puedes hacerlo tú, o delegarlo en alguien que analice la operación con la
              rentabilidad neta antes de que compres. En qué consiste ese trabajo y cuándo se paga
              solo lo cuento en{' '}
              <a href="/blog/personal-shopper-inmobiliario-para-inversores">
                personal shopper inmobiliario para inversores
              </a>
              .
            </p>

            <h2 id="cierre">Cierre</h2>
            <p>
              Con 100.000 € en España hoy compras cosas muy distintas: desde un piso al contado que
              renta cerca del 9,5% neto y te deja dormir, hasta dos operaciones de compra más reforma
              con rentabilidades netas de dos dígitos, o una operación apalancada que multiplica tus
              fondos propios. La cifra bonita no decide; la decide tu perfil y la cuenta hecha sobre
              la inversión total, en tres escenarios. Haz los números primero. Siempre.
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
            ¿Tienes el capital y quieres la operación bien hecha?
          </h2>
          <p className="text-paper/80 text-lg mb-8 max-w-prose mx-auto">
            Analizo tu presupuesto y te propongo la operación con rentabilidad neta en tres
            escenarios, al contado o apalancada. Números reales, sin promesas.
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
