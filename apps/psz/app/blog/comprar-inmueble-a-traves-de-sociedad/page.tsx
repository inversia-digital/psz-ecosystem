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

const SLUG = 'comprar-inmueble-a-traves-de-sociedad'
const URL = `${SITE_URLS.psz}/blog/${SLUG}`
const post = getPostBySlug(SLUG)!

export const metadata: Metadata = {
  title: 'Comprar un inmueble a través de una sociedad: cuándo compensa',
  description:
    'Ventajas, inconvenientes y fiscalidad de comprar inmuebles mediante una sociedad frente a hacerlo como particular, y en qué perfil de inversor compensa de verdad.',
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
    question: '¿Sale más barato comprar un inmueble con una sociedad?',
    answer:
      'Depende del perfil y del volumen. La sociedad tributa por el impuesto de sociedades a un tipo fijo, mientras que el particular tributa por el IRPF a un tipo marginal que puede ser más alto. Pero la sociedad tiene costes propios: constitución, contabilidad, impuestos, gestoría y la doble tributación cuando repartes dividendos. Para un solo piso casi nunca compensa; para una cartera con beneficios que se reinvierten, puede tener sentido. Es una decisión que exige asesoramiento fiscal personalizado.',
  },
  {
    question: '¿Cómo tributan los alquileres en una sociedad frente a un particular?',
    answer:
      'El particular integra el rendimiento del alquiler de vivienda en la base general del IRPF, con derecho a la reducción del rendimiento neto de la Ley 12/2023. La sociedad tributa por el impuesto de sociedades sobre su beneficio, sin esa reducción, pero puede deducir más gastos y amortizaciones y difiere el impuesto personal hasta que reparte. El resultado neto de cada opción depende de tu tramo de IRPF y de si necesitas o no sacar el dinero.',
  },
  {
    question: '¿Un banco financia igual la compra a través de sociedad?',
    answer:
      'No siempre en las mismas condiciones. Muchos bancos analizan la operación de una sociedad patrimonial con más cautela: piden avales personales de los socios, aplican porcentajes de financiación más bajos o condiciones distintas a las de una hipoteca de particular. Conviene plantear la financiación desde el principio, porque la estructura societaria puede cambiar el acceso al crédito.',
  },
  {
    question: '¿Qué es una sociedad patrimonial y por qué importa?',
    answer:
      'Una sociedad patrimonial es aquella en la que más de la mitad del activo no está afecto a una actividad económica, típicamente inmuebles en alquiler sin medios materiales y humanos suficientes. Esta calificación tiene consecuencias fiscales relevantes: puede perder ciertos incentivos del impuesto de sociedades. Verificar si tu sociedad sería patrimonial es uno de los primeros análisis que debe hacer tu asesor.',
  },
  {
    question: '¿Puedo pasar mis pisos, que ya tengo como particular, a una sociedad?',
    answer:
      'Sí, pero aportar o vender inmuebles a una sociedad es una transmisión con coste fiscal: puede generar ganancia patrimonial en el IRPF, tributación indirecta y gastos de notaría y registro. No es un simple cambio de nombre. Antes de mover nada, hay que calcular el coste de la reestructuración y compararlo con el ahorro futuro. Esto no se improvisa; requiere un asesor fiscal.',
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
              "¿Y no me sale mejor montar una sociedad?" Es una de las preguntas que más me hacen los
              inversores en cuanto compran el segundo o el tercer piso. La respuesta honesta es:
              depende, y casi nunca es la que espera quien la formula. Comprar inmuebles a través de
              una sociedad tiene ventajas reales, pero también costes y complejidad que muchos vídeos
              de internet omiten para vender la moto de la "optimización fiscal".
            </p>
            <p>
              En este artículo te explico las ventajas, los inconvenientes y la lógica fiscal
              particular contra sociedad, para que llegues a tu asesor sabiendo qué preguntar. Y aviso
              desde ya, porque es importante: <strong>esto no es asesoramiento fiscal personalizado</strong>.
              La decisión depende de tu tramo de IRPF, de tu volumen, de si reinviertes y de tu
              situación concreta. Para decidir de verdad necesitas un asesor fiscal que analice tu
              caso; yo puedo ayudarte con la parte de financiación y con cómo lo ven los bancos.
            </p>

            <h2 id="dos-formas">Las dos formas de comprar</h2>
            <p>
              Cuando compras un inmueble para invertir, lo haces de una de estas dos maneras:
            </p>
            <ul>
              <li>
                <strong>Como particular:</strong> el inmueble está a tu nombre, los alquileres
                tributan en tu IRPF y los gastos y la reducción del rendimiento neto se aplican en tu
                declaración personal.
              </li>
              <li>
                <strong>A través de una sociedad</strong> (habitualmente una S.L.): el inmueble
                pertenece a la empresa, los alquileres tributan por el impuesto de sociedades y tú
                cobras a través de nómina, dividendos o préstamos socio-sociedad.
              </li>
            </ul>
            <p>
              No hay una opción "mejor" en abstracto. Hay una opción mejor para tu perfil. La clave
              está en el tipo impositivo, en los costes de estructura y en qué piensas hacer con el
              dinero que genera la inversión.
            </p>

            <h2 id="fiscalidad">La lógica fiscal: particular vs sociedad</h2>
            <p>
              La comparación fiscal se resume en un puñado de ideas que conviene entender antes de
              pisar la gestoría:
            </p>
            <ul>
              <li>
                <strong>El particular</strong> tributa por el alquiler de vivienda en la base general
                del IRPF, a su tipo marginal, con derecho a la reducción del rendimiento neto de la{' '}
                <a
                  href="https://www.boe.es/buscar/act.php?id=BOE-A-2023-11049"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ley 12/2023
                </a>{' '}
                (del 50% al 90% según el caso). Lo detallo en el artículo sobre{' '}
                <a href="/blog/fiscalidad-alquiler-reduccion-irpf">
                  fiscalidad del alquiler y la reducción del IRPF
                </a>
                .
              </li>
              <li>
                <strong>La sociedad</strong> tributa por el impuesto de sociedades a un tipo fijo sobre
                su beneficio. No tiene esa reducción del rendimiento neto, pero puede deducir gastos y
                amortizaciones y, sobre todo, <strong>diferir</strong> el impuesto personal mientras
                reinvierte, porque solo pagas IRPF cuando sacas el dinero vía dividendo.
              </li>
              <li>
                <strong>La doble tributación</strong> es el gran matiz: si repartes beneficios como
                dividendo, primero paga la sociedad y después pagas tú en el IRPF por ese dividendo.
                Por eso la sociedad brilla cuando reinviertes y pierde brillo cuando necesitas el
                dinero en tu bolsillo cada año.
              </li>
              <li>
                <strong>La sociedad patrimonial</strong> —la que solo tiene inmuebles en alquiler sin
                una estructura real— pierde algunos incentivos del impuesto de sociedades. Verificar si
                tu caso caería en esa categoría es de los primeros análisis que debe hacer tu asesor.
              </li>
            </ul>
            <p>
              Los tipos concretos del impuesto de sociedades y del IRPF cambian con las reformas y con
              tu comunidad autónoma, así que verifica la normativa vigente en la{' '}
              <a href="https://sede.agenciatributaria.gob.es/" target="_blank" rel="noopener noreferrer">
                Agencia Tributaria
              </a>{' '}
              y no des por buenos porcentajes que hayas leído hace tiempo.
            </p>

            <h2 id="ventajas">Ventajas de comprar con sociedad</h2>
            <ul>
              <li>
                <strong>Diferimiento fiscal.</strong> Si reinviertes los beneficios en más inmuebles,
                mantienes el capital trabajando sin pasar cada año por tu tipo marginal de IRPF.
              </li>
              <li>
                <strong>Deducción de gastos.</strong> La estructura societaria permite deducir gastos
                de actividad que un particular no puede.
              </li>
              <li>
                <strong>Planificación patrimonial y sucesoria.</strong> Repartir participaciones es más
                flexible que repartir inmuebles, algo relevante cuando piensas en herederos o socios.
              </li>
              <li>
                <strong>Separación de patrimonios y entrada de socios.</strong> Ordena la actividad y
                facilita coinvertir con otras personas.
              </li>
            </ul>

            <h2 id="inconvenientes">Inconvenientes que casi nadie te cuenta</h2>
            <ul>
              <li>
                <strong>Costes de estructura.</strong> Constitución, contabilidad, impuestos,
                declaraciones y gestoría todos los años. Para un solo piso, esos costes se suelen comer
                la ventaja fiscal.
              </li>
              <li>
                <strong>Doble tributación al repartir.</strong> Si necesitas el dinero cada año, pagas
                dos veces y la ventaja se evapora.
              </li>
              <li>
                <strong>Financiación más exigente.</strong> Muchos bancos analizan la hipoteca de una
                sociedad patrimonial con más cautela: avales personales, menor porcentaje financiado o
                condiciones peores. Conviene hablarlo antes, no después.
              </li>
              <li>
                <strong>Pérdida de la reducción del IRPF</strong> del alquiler de vivienda, que como
                particular puede llegar al 90% en los casos previstos.
              </li>
              <li>
                <strong>Complejidad y responsabilidad.</strong> Llevar una sociedad es una obligación
                continua, no un trámite de una vez.
              </li>
            </ul>

            <h2 id="cuando-compensa">Cuándo empieza a tener sentido</h2>
            <p>
              Como orientación general, no como regla, la sociedad empieza a tener sentido cuando se
              cumplen varias de estas condiciones a la vez: tienes una <strong>cartera</strong> de
              inmuebles y no un solo piso; los beneficios los <strong>reinviertes</strong> en lugar de
              gastarlos; tu tipo marginal de IRPF es alto; y buscas ordenar el patrimonio o coinvertir
              con socios. Cuando solo tienes un piso, lo alquilas y quieres cobrar la renta cada mes, lo
              normal es que como particular salgas mejor.
            </p>
            <p>
              Piénsalo con la cartera en la cabeza, no con un solo activo. Muchas de las operaciones que
              gestiono son compras en secundario de Alicante y Albacete, con reforma cuando aporta, que
              buscan rentabilidad neta de dos dígitos y ocupación rápida. Una operación real que
              gestioné: un piso en Almansa (Albacete) de 121 m², 125.000 € de compra, unos 143.510 € de
              inversión total, alquilado por 1.600 €/mes bajo el modelo de{' '}
              <a href="/blog/minipisos-dividir-vivienda-mas-rentabilidad">minipisos</a> y "alquilados
              nada más firmar". La rentabilidad neta fue del 12,9%, con rango realista de 12,0 / 12,9 /
              13,7. Cuando repites operaciones así y reinviertes, la conversación sobre la sociedad deja
              de ser teórica; con un único piso, casi siempre es humo. Y para distinguir el humo, tienes
              esta{' '}
              <a href="/blog/como-detectar-humo-oportunidad-inversion">guía anti-humo</a>.
            </p>

            <h2 id="financiacion">La financiación cambia con la estructura</h2>
            <p>
              Este es el punto que más se descuida y donde yo entro. La forma en que compras condiciona
              cómo te financian. Una hipoteca a nombre de una sociedad patrimonial no se analiza igual
              que la de un particular con nómina: cambian los porcentajes, los avales y el precio. Por
              eso la decisión de estructura y la de financiación hay que tomarlas juntas, no una detrás
              de otra. Puedes ver cómo enfoco la financiación del inversor en la página de{' '}
              <a href="/hipoteca-inversor">hipoteca para inversores</a> y la lógica de estructuras en{' '}
              <a href="/estructuras-societarias">estructuras societarias</a>.
            </p>

            <h2 id="cierre">Cierre</h2>
            <p>
              Comprar a través de una sociedad no es ni la panacea que venden algunos ni un error: es
              una herramienta que encaja en un perfil concreto —cartera, reinversión, tipo marginal
              alto— y sobra en otro —un solo piso del que quieres cobrar la renta—. La única forma seria
              de decidir es sentarte con un asesor fiscal que analice tus números y, en paralelo, ver
              cómo afecta a tu financiación. Yo te ayudo con la parte hipotecaria y con cómo lo miran
              los bancos; la firma fiscal, para tu asesor. Si quieres, empezamos por los números de tu
              caso con la{' '}
              <a href="/calculadora-rentabilidad-inmobiliaria">calculadora de rentabilidad</a> y lo
              vemos.
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
            ¿Comprar como particular o con sociedad? Vemos tu financiación
          </h2>
          <p className="text-paper/80 text-lg mb-8 max-w-prose mx-auto">
            Te digo cómo miran los bancos cada opción y montamos la financiación que encaje con tu
            estructura. Primera llamada gratis y sin compromiso.
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
            <Button href="/estructuras-societarias" variant="primary" size="lg">
              Estructuras societarias
            </Button>
          </div>
        </Container>
      </Section>
    </main>
  )
}
