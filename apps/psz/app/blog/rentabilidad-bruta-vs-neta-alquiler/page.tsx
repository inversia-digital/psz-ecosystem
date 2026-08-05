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

const SLUG = 'rentabilidad-bruta-vs-neta-alquiler'
const URL = `${SITE_URLS.psz}/blog/${SLUG}`
const post = getPostBySlug(SLUG)!

export const metadata: Metadata = {
  title: 'Rentabilidad bruta vs neta del alquiler: la real',
  description:
    'La diferencia entre la rentabilidad bruta del anuncio y la neta que de verdad cobras: el desglose de todos los gastos y un caso real de mi cartera, en tres escenarios.',
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
    question: '¿Cómo se calcula la rentabilidad bruta del alquiler?',
    answer:
      'La rentabilidad bruta se calcula dividiendo el alquiler anual (mensualidad multiplicada por 12) entre el precio de compra, y multiplicando por 100. No descuenta ningún gasto, por eso siempre sale más alta que la real. Es el número que aparece en la mayoría de anuncios de inversión porque es el más favorable.',
  },
  {
    question: '¿Qué es la rentabilidad neta y por qué es la que importa?',
    answer:
      'La rentabilidad neta divide el beneficio real (alquiler anual menos todos los gastos anuales) entre la inversión total (precio más gastos de compra y reforma). Es la única cifra que refleja lo que de verdad te queda en el bolsillo, porque incluye IBI, comunidad, seguros, mantenimiento, periodos sin inquilino y fiscalidad. Un profesional serio siempre trabaja con la neta.',
  },
  {
    question: '¿Qué gastos hay que restar para pasar de bruta a neta?',
    answer:
      'Los gastos recurrentes son IBI, comunidad de propietarios, seguro de hogar y de impago, mantenimiento y averías, y la parte de IRPF que pagas por el rendimiento. A eso se suman los gastos de la compra (ITP o IVA, notaría, registro, gestoría) y, si la hay, la reforma. La diferencia entre bruta y neta suele ser de tres a cinco puntos porcentuales.',
  },
  {
    question: '¿Por qué el 10% de rentabilidad que anuncian casi nunca es real?',
    answer:
      'Porque ese 10% suele ser rentabilidad bruta calculada sobre el precio de compra sin sumar gastos, sin descontar los costes recurrentes y sin contar los meses de vacío. Al hacer el cálculo neto sobre la inversión total, ese 10% bruto se queda con frecuencia en un 6-7% neto. No es humo necesariamente, pero es otra cifra.',
  },
  {
    question: '¿Qué rentabilidad neta es razonable esperar en España hoy?',
    answer:
      'Depende mucho de la ciudad, el tipo de activo y si hay reforma o división. Como orientación, en vivienda tradicional muchas operaciones se mueven en una rentabilidad neta de un dígito medio-alto, y las de dos dígitos existen pero requieren compra en secundario, gestión activa o estrategias como minipisos. Conviene calcular cada caso en tres escenarios y no fiarse de una única cifra.',
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
              Cada semana me llega el mismo anuncio con otra cara: "piso con un 10% de rentabilidad".
              Y cada semana hago el mismo ejercicio con el cliente: cogemos ese 10%, le restamos lo
              que el anuncio no cuenta, y casi siempre acabamos en un 6 o un 7% real. No es que el
              anunciante mienta necesariamente — es que enseña la rentabilidad bruta, que es la más
              bonita, y calla la neta, que es la que de verdad ingresas.
            </p>
            <p>
              En este artículo te enseño la diferencia con números, el desglose completo de gastos
              que separa una cifra de otra, y un caso real de mi propia cartera calculado como yo
              lo hago: en tres escenarios y sobre la inversión total. Si vas a comprar para
              alquilar, esta es la aritmética que tienes que dominar antes de mirar un solo anuncio.
            </p>

            <h2 id="bruta">Qué es la rentabilidad bruta (y por qué siempre parece buena)</h2>
            <p>
              La rentabilidad bruta es la cuenta de la servilleta. Coges el alquiler mensual, lo
              multiplicas por doce, lo divides entre el precio de compra y lo multiplicas por cien.
              Un piso de 100.000 € que alquilas por 700 €/mes da 8.400 € al año, es decir un{' '}
              <strong>8,4% bruto</strong>. Suena bien, y por eso es el número que verás en el 90% de
              los anuncios de inversión.
            </p>
            <p>
              El problema es que esa cuenta ignora tres cosas enormes: lo que cuesta comprar el piso
              (que no es solo el precio), lo que cuesta mantenerlo cada año, y lo que se lleva
              Hacienda. La rentabilidad bruta es útil solo para descartar rápido lo que ni siquiera
              merece un segundo vistazo. Para decidir, no sirve.
            </p>

            <h2 id="neta">Qué es la rentabilidad neta (y por qué es la única que cuenta)</h2>
            <p>
              La rentabilidad neta responde a la única pregunta que importa: de cada euro que
              invierto, ¿cuánto me queda limpio al año? Se calcula así:
            </p>
            <p>
              <strong>
                Rentabilidad neta = (alquiler anual − gastos anuales) ÷ inversión total × 100
              </strong>
            </p>
            <p>
              Fíjate en los dos cambios respecto a la bruta. Arriba, al alquiler le restamos los
              gastos. Abajo, no dividimos entre el precio, sino entre la <em>inversión total</em>:
              precio más impuestos de compra, notaría, registro, gestoría y reforma si la hay. Los
              dos ajustes tiran de la cifra hacia abajo, y por eso la neta siempre es menor que la
              bruta. Cuánto menor depende de los gastos, que es donde está el detalle.
            </p>

            <h2 id="gastos">El desglose de gastos que nadie te enseña</h2>
            <p>
              Estos son los conceptos que separan la rentabilidad bruta de la neta. Los agrupo en dos
              bloques: los de la compra (una vez) y los recurrentes (cada año).
            </p>
            <p>
              <strong>Gastos de la compra (se suman a la inversión):</strong>
            </p>
            <ul>
              <li>
                Impuesto de transmisiones (ITP) en vivienda usada, que varía mucho por comunidad
                autónoma; o IVA + AJD en obra nueva. Detallo la horquilla por CCAA en la{' '}
                <a href="/calculadora-gastos-compra">calculadora de gastos de compra</a> —{' '}
                <em>verificar condiciones vigentes en tu comunidad</em>.
              </li>
              <li>Notaría, registro de la propiedad y gestoría.</li>
              <li>Reforma, cuando la operación la necesita para poder alquilarse o rentar más.</li>
            </ul>
            <p>
              <strong>Gastos recurrentes (se restan del alquiler cada año):</strong>
            </p>
            <ul>
              <li>IBI, tasa de basuras y comunidad de propietarios.</li>
              <li>Seguro de hogar y, muy recomendable, seguro de impago de alquiler.</li>
              <li>Mantenimiento, averías y una reserva para reposiciones (calderas, electrodomésticos).</li>
              <li>
                Periodos sin inquilino: aunque alquiles rápido, el mercado descuenta rotación. Yo
                siempre meto al menos medio mes de vacío al año en el escenario realista.
              </li>
              <li>
                IRPF sobre el rendimiento del alquiler. Aquí hay buenas noticias: la reducción del
                rendimiento neto puede bajar mucho la factura fiscal. Lo explico en detalle en{' '}
                <a href="/blog/fiscalidad-alquiler-reduccion-irpf">
                  fiscalidad del alquiler y la reducción del IRPF
                </a>{' '}
                — datos según normativa vigente, <em>verificar en agenciatributaria.es</em>.
              </li>
            </ul>
            <p>
              Sumados, estos conceptos suelen recortar entre tres y cinco puntos de rentabilidad.
              Ese es el salto de la bruta a la neta, y es exactamente lo que el titular del anuncio
              se guarda.
            </p>

            <h2 id="caso-real">Un caso real de mi cartera, con las tres rentabilidades</h2>
            <p>
              Te enseño una operación real que gestioné para que veas los números de verdad. Piso de
              97 m² en Orihuela (Alicante): compra por 78.000 € y, sumando ITP, notaría, registro y
              gestoría, una inversión total de <strong>90.540 €</strong>. Se alquiló por{' '}
              <strong>750 €/mes</strong> — de hecho, el mismo día de la firma.
            </p>
            <p>La rentabilidad bruta sobre el precio de compra saldría alta y engañosa. La que yo
              entrego al inversor es la neta sobre la inversión total, y siempre en tres escenarios:
            </p>
            <ul>
              <li>
                <strong>PESIMISTA:</strong> más meses de vacío, alguna avería y fiscalidad menos
                favorable. La rentabilidad neta baja, pero sigue siendo sólida.
              </li>
              <li>
                <strong>REALISTA:</strong> ocupación alta, gastos normales. Es el escenario central
                y el que uso para decidir: en esta operación, una rentabilidad neta en torno al{' '}
                <strong>9,5%</strong>.
              </li>
              <li>
                <strong>OPTIMISTA:</strong> cero vacío, gasto contenido y aprovechando al máximo la
                reducción fiscal. El techo razonable, no la promesa.
              </li>
            </ul>
            <p>
              Ese 9,5% neto es un número honesto. Si lo hubiera vendido como bruto, habría podido
              poner un titular más alto y menos cierto. La diferencia entre las dos cifras es,
              literalmente, la diferencia entre marketing y realidad.
            </p>

            <h2 id="como-calcular">Cómo calcularlo tú antes de comprar</h2>
            <p>
              No necesitas ser analista para hacer esta cuenta. Necesitas ser honesto con los gastos.
              El error típico no es de matemáticas, es de optimismo: gente que asume cero vacío, cero
              averías y la fiscalidad más favorable, y luego se sorprende. Mi regla es simple:
              calcula siempre los tres escenarios y toma la decisión mirando el realista, nunca el
              optimista.
            </p>
            <p>
              Para hacerlo rápido tienes la{' '}
              <a href="/calculadora-rentabilidad-inmobiliaria">
                calculadora de rentabilidad inmobiliaria
              </a>
              , que ya te separa bruta de neta y te obliga a meter los gastos. Y si el anuncio que
              estás mirando promete un número redondo y brillante sin desglose, pásalo antes por el{' '}
              <a href="/test-anti-humo-inmobiliario">test anti-humo inmobiliario</a>: casi siempre la
              cifra bonita es bruta. Profundizo en las señales de alarma en{' '}
              <a href="/blog/como-detectar-humo-oportunidad-inversion">
                cómo detectar humo en una oportunidad de inversión
              </a>
              .
            </p>

            <h2 id="subir-neta">Cómo se sube la rentabilidad neta (sin humo)</h2>
            <p>
              La neta no se mejora inflando el titular, se mejora con gestión. Tres palancas reales:
            </p>
            <ul>
              <li>
                <strong>Comprar bien.</strong> En secundario, con margen de negociación, la
                inversión total baja y la neta sube desde el primer día.
              </li>
              <li>
                <strong>Reformar cuando aporta.</strong> Una reforma bien dimensionada puede subir
                el alquiler más de lo que cuesta. Cuándo sí y cuándo no lo explico en{' '}
                <a href="/blog/rehabilitar-para-alquilar-reforma-rentable">
                  rehabilitar para alquilar
                </a>
                .
              </li>
              <li>
                <strong>Cambiar de estrategia.</strong> Un piso grande dividido en minipisos puede
                rentar como varios: lo desarrollo en{' '}
                <a href="/blog/minipisos-dividir-vivienda-mas-rentabilidad">
                  minipisos: cómo un piso grande puede rentar como varios
                </a>
                .
              </li>
            </ul>
            <p>
              Y la palanca que casi nadie cuenta: el apalancamiento. Financiar parte de la compra con
              hipoteca cambia la rentabilidad sobre los fondos propios. Es una herramienta potente y
              también un riesgo si el número no aguanta, por eso conviene estructurarla bien desde la
              página de <a href="/hipoteca-inversor">hipoteca para inversores</a>.
            </p>

            <h2 id="cierre">Cierre</h2>
            <p>
              Si te quedas con una idea, que sea esta: la rentabilidad bruta es la del anuncio, la
              neta es la de tu cuenta corriente. Nunca decidas con la primera. Pide el desglose,
              calcula los tres escenarios y quédate con el realista. Un buen activo no necesita
              maquillarse con la cifra bruta; los números honestos ya son suficientemente buenos.
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
            ¿Quieres los números reales de una operación, no el titular?
          </h2>
          <p className="text-paper/80 text-lg mb-8 max-w-prose mx-auto">
            Analizo tu caso con rentabilidad neta en tres escenarios y te digo si el número aguanta.
            Sin humo, sin promesas redondas.
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
