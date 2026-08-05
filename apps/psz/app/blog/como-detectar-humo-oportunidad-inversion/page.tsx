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

const SLUG = 'como-detectar-humo-oportunidad-inversion'
const URL = `${SITE_URLS.psz}/blog/${SLUG}`
const post = getPostBySlug(SLUG)!

export const metadata: Metadata = {
  title: 'Cómo detectar humo en una oportunidad de inversión',
  description:
    'Las señales de alarma de una oportunidad inmobiliaria que no es lo que parece: rentabilidad garantizada, cifras infladas y letra pequeña, y cómo comprobar los números tú mismo.',
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
    question: '¿Existe la "rentabilidad garantizada" en inversión inmobiliaria?',
    answer:
      'No de forma realista. Toda inversión tiene riesgo: vacíos, impagos, derramas, cambios de tipos y de fiscalidad. Cuando alguien "garantiza" una rentabilidad, o bien traslada ese riesgo a una empresa que puede quebrar, o bien está omitiendo variables. La única garantía honesta es enseñar los tres escenarios —pesimista, realista y optimista— y explicar de qué depende cada uno. Desconfía de cualquier número presentado como seguro.',
  },
  {
    question: '¿Por qué la rentabilidad que anuncian casi nunca es la que cobras?',
    answer:
      'Porque casi siempre publican la rentabilidad bruta: renta anual dividida entre el precio, sin restar gastos ni impuestos. La rentabilidad neta descuenta IBI, comunidad, seguros, mantenimiento, periodos de vacío, gestión y el IRPF. Entre la bruta del anuncio y la neta que ingresas puede haber varios puntos porcentuales de diferencia. Siempre hay que pedir el desglose de gastos y calcular la neta antes de decidir.',
  },
  {
    question: '¿Qué preguntas debo hacer para comprobar una oportunidad?',
    answer:
      'Pide el precio total con todos los gastos de compra, el alquiler real de mercado de la zona (no el prometido), el desglose completo de gastos anuales, el estado real del inmueble y su comunidad, y la rentabilidad neta en tres escenarios. Si te enseñan el activo, la operación se sostiene con datos verificables; si te enseñan el retorno pero no el activo ni los supuestos, es humo.',
  },
  {
    question: '¿Es mala señal que me metan prisa para invertir?',
    answer:
      'La urgencia artificial es una de las banderas rojas más fiables. "Solo quedan dos plazas", "el precio sube mañana" o "si no firmas hoy lo pierdes" buscan que decidas sin comprobar los números. Una oportunidad real aguanta que verifiques los datos con calma. Si no aguanta unos días de análisis, no era una oportunidad, era una venta a presión.',
  },
  {
    question: '¿Cómo compruebo yo mismo si los números cuadran?',
    answer:
      'Coge el precio total de la operación, resta todos los gastos anuales reales, aplica un periodo de vacío prudente y la fiscalidad, y calcula la rentabilidad neta en tres escenarios. Puedes hacerlo con una calculadora de rentabilidad inmobiliaria en unos minutos. Si tus números no se parecen a los del vendedor, la diferencia son los supuestos que él no te contó.',
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
              En inversión inmobiliaria se vende mucho humo. Cursos que prometen libertad financiera,
              "oportunidades" con rentabilidades imposibles, promotoras que garantizan retornos como
              si el mercado no existiera. Llevo años dentro del sector y te lo digo claro: el 90% de
              lo que brilla se apaga en cuanto pones los números encima de la mesa. Este artículo es
              justo eso, la linterna para ver detrás del humo antes de firmar nada.
            </p>
            <p>
              No hace falta ser experto. Hace falta un método y unas cuantas preguntas incómodas. Si
              una oportunidad no las aguanta, ya tienes tu respuesta.
            </p>

            <h2 id="que-es-humo">Qué es "humo" en inversión inmobiliaria</h2>
            <p>
              Humo no es necesariamente una estafa. Muchas veces es una operación real presentada de
              forma engañosa: se enseña el mejor escenario como si fuera el único, se ocultan gastos,
              se infla el alquiler esperado o se maquilla la rentabilidad usando la bruta en lugar de
              la neta. El resultado es el mismo: tú decides con una foto que no se corresponde con la
              realidad, y el problema aparece cuando ya has puesto el dinero.
            </p>
            <p>
              La forma más rápida de reconocerlo es esta: <strong>el humo te enseña el retorno; una
              oportunidad de verdad te enseña el activo</strong>. Si te hablan mucho de cuánto vas a
              ganar y poco del inmueble concreto, la zona, el estado real y los supuestos, enciende
              todas las alarmas.
            </p>

            <h2 id="banderas-rojas">Las banderas rojas más frecuentes</h2>
            <p>
              🚩 <strong>"Rentabilidad garantizada".</strong> No existe de forma honesta. Toda
              inversión tiene riesgo: vacíos, impagos, derramas, tipos, fiscalidad. Quien "garantiza"
              o miente o traslada el riesgo a una empresa que puede desaparecer. Lo honesto es enseñar
              tres escenarios, no un número seguro.
            </p>
            <p>
              🚩 <strong>Solo la rentabilidad bruta.</strong> El titular del 10% casi nunca es real.
              Cuando descuentas gastos e impuestos, la neta baja bastante. Si nadie te da el desglose,
              te están enseñando el escaparate, no la tienda. Lo explico a fondo en el artículo sobre{' '}
              <a href="/blog/rentabilidad-bruta-vs-neta-alquiler">
                rentabilidad bruta frente a neta del alquiler
              </a>
              .
            </p>
            <p>
              🚩 <strong>Alquiler esperado por encima del mercado.</strong> Comprueba en portales qué
              se alquila de verdad en esa calle y ese tamaño, hoy. Si el número prometido está un 20%
              por encima de lo real, toda la rentabilidad se sostiene sobre una fantasía.
            </p>
            <p>
              🚩 <strong>Urgencia artificial.</strong> "Solo quedan dos plazas", "el precio sube
              mañana". La prisa busca que no compruebes los datos. Una operación real aguanta que la
              analices con calma.
            </p>
            <p>
              🚩 <strong>Nadie responde de la operación.</strong> Sin empresa identificable, sin CIF,
              sin caras, sin histórico verificable. En finanzas, la reputación se enseña; quien la
              esconde, algo esconde.
            </p>
            <p>
              🚩 <strong>El coste de "acceder" es el negocio.</strong> Cuando lo que de verdad se
              vende es el curso, la membresía o la "comunidad", y las operaciones son la excusa,
              estás pagando por el humo, no por el activo.
            </p>
            <p>
              Con una bandera, frena. Con dos o más, casi seguro que estás delante de humo. Tengo un{' '}
              <a href="/test-anti-humo-inmobiliario">test anti-humo inmobiliario</a> que recorre estas
              señales una a una para que puntúes tu oportunidad antes de dar un paso más.
            </p>

            <h2 id="comprobar-numeros">Cómo comprobar los números tú mismo</h2>
            <p>
              La mejor defensa contra el humo es la aritmética. No necesitas más que estos cinco
              datos y un rato de calma:
            </p>
            <ol>
              <li>
                <strong>Precio total real:</strong> precio de compra más impuestos y gastos de
                compraventa. Estímalos con la{' '}
                <a href="/calculadora-gastos-compra">calculadora de gastos de compra</a>, que cambian
                por comunidad autónoma.
              </li>
              <li>
                <strong>Alquiler real de mercado</strong> de esa zona y ese tamaño, mirando anuncios
                comparables, no el que promete el vendedor.
              </li>
              <li>
                <strong>Gastos anuales:</strong> IBI, comunidad, seguros, mantenimiento, gestión y un
                periodo de vacío prudente (nunca cero).
              </li>
              <li>
                <strong>Fiscalidad:</strong> el IRPF sobre el rendimiento del alquiler, con su
                reducción. Lo detallo en{' '}
                <a href="/blog/fiscalidad-alquiler-reduccion-irpf">
                  fiscalidad del alquiler y la reducción del IRPF
                </a>
                .
              </li>
              <li>
                <strong>Rentabilidad neta en tres escenarios.</strong> No un número: tres. Pesimista,
                realista y optimista.
              </li>
            </ol>
            <p>
              Puedes montar todo esto en minutos con la{' '}
              <a href="/calculadora-rentabilidad-inmobiliaria">
                calculadora de rentabilidad inmobiliaria
              </a>
              . Si el resultado que sale se aleja mucho del que te vendieron, la diferencia son
              exactamente los supuestos que te ocultaron.
            </p>

            <h2 id="tres-escenarios">Por qué siempre trabajo con tres escenarios</h2>
            <p>
              En todas mis operaciones presento la rentabilidad neta en tres escenarios:{' '}
              <strong>pesimista, realista y optimista</strong>. No es un adorno: es la única forma
              honesta de que un inversor entienda de qué depende su retorno. El realista es el que
              debe guiar la decisión; el pesimista te dice si aguantas un mal año; el optimista es el
              techo, no la expectativa.
            </p>
            <p>
              Te pongo un caso real que gestioné, con números redondeados y sin nombres. Un piso en
              Sax (Alicante): 33.000 € de compra más 8.600 € de reforma, unos 49.740 € de inversión
              total, alquilado por 500 €/mes. La rentabilidad neta salió al 11,2%, pero no la vendo
              como un número plano: el rango realista fue 10,0 / 11,2 / 12,4 según ocupación y gastos.
              Ese rango es la verdad; un "11,2% garantizado" habría sido humo.
            </p>
            <p>
              Fíjate en la diferencia de tono. El humo te da un número redondo y brillante. El trabajo
              serio te da un rango, te explica los supuestos y te enseña el activo. Cuando veas datos
              reales de mi cartera, verás siempre esa estructura de tres escenarios; es mi forma de
              trabajar y también tu vara de medir a cualquier otro.
            </p>

            <h2 id="quien-te-lo-cuenta">Mira también quién te lo cuenta</h2>
            <p>
              Detrás de una oportunidad hay siempre alguien. Comprueba quién es. Si es un intermediario
              hipotecario, tiene que estar registrado en el Banco de España; te explico cómo
              verificarlo en{' '}
              <a href="/blog/como-verificar-broker-hipotecario-banco-de-espana">
                esta guía de verificación
              </a>
              . Si te vende un servicio de búsqueda de inmuebles de inversión, mira si su interés está
              alineado con el tuyo o si cobra del vendedor. Trato ese punto en el artículo sobre el{' '}
              <a href="/blog/personal-shopper-inmobiliario-para-inversores">
                personal shopper inmobiliario para inversores
              </a>
              . La transparencia sobre quién cobra y por qué es, muchas veces, el primer filtro
              antihumo.
            </p>

            <h2 id="cierre">Cierre</h2>
            <p>
              Detectar humo no requiere desconfiar de todo el mundo; requiere pedir datos y hacer los
              números. Una oportunidad real te enseña el activo, te da el desglose de gastos, te
              muestra la rentabilidad neta en tres escenarios y aguanta que la verifiques con calma. Si
              cumple eso, adelante. Si te vende un retorno redondo con prisa y sin activo detrás, ya
              sabes lo que es. Pasa cualquier oportunidad por el{' '}
              <a href="/test-anti-humo-inmobiliario">test anti-humo</a> y por la{' '}
              <a href="/calculadora-rentabilidad-inmobiliaria">calculadora de rentabilidad</a> antes de
              firmar. Y si quieres una segunda mirada sobre una operación concreta, para eso estoy.
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
            ¿Tienes una oportunidad delante y dudas si es humo?
          </h2>
          <p className="text-paper/80 text-lg mb-8 max-w-prose mx-auto">
            Cuéntamela y le hacemos los números juntos, con rentabilidad neta en tres escenarios.
            Primera llamada gratis, sin compromiso y sin presión.
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
