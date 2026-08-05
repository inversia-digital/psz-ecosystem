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

const SLUG = 'rehabilitar-para-alquilar-reforma-rentable'
const URL = `${SITE_URLS.psz}/blog/${SLUG}`
const post = getPostBySlug(SLUG)!

export const metadata: Metadata = {
  title: 'Rehabilitar para alquilar: cuándo la reforma renta',
  description:
    'Cuándo una reforma sube de verdad la rentabilidad y cuándo se come el margen, con el criterio para presupuestarla y casos reales de compra + reforma en tres escenarios.',
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
    question: '¿Cuándo compensa reformar un piso para alquilar?',
    answer:
      'Compensa cuando el aumento de alquiler que consigues, o el ahorro en vacío y averías, justifica el coste de la reforma dentro de un plazo razonable. Si una reforma sube el alquiler lo suficiente para recuperarse en pocos años y además mejora la ocupación, suma. Si es puramente estética y no mueve el alquiler ni la demanda, suele comerse el margen. La clave es calcular la rentabilidad neta con y sin reforma.',
  },
  {
    question: '¿Cómo se calcula si una reforma es rentable?',
    answer:
      'Se compara la rentabilidad neta de dos escenarios: comprar sin reformar y alquilar tal cual, frente a comprar, reformar (sumando el coste a la inversión total) y alquilar más caro. Si la segunda opción da una rentabilidad neta mayor sobre la inversión total, la reforma renta. Siempre conviene calcularlo en tres escenarios (pesimista, realista, optimista) y presupuestar la obra con holgura.',
  },
  {
    question: '¿Cuánto hay que presupuestar de más por imprevistos en una reforma?',
    answer:
      'En reformas de vivienda usada siempre aparecen sorpresas: instalaciones antiguas, humedades, elementos que hay que rehacer. Conviene añadir un colchón sobre el presupuesto cerrado para no quedarse corto, y pedir presupuesto detallado por partidas, no una cifra global. Un imprevisto no presupuestado es lo que convierte una reforma rentable en una que se come el margen.',
  },
  {
    question: '¿Hay ayudas o deducciones por rehabilitar una vivienda?',
    answer:
      'Existen programas de ayudas a la rehabilitación y deducciones fiscales ligadas a mejoras de eficiencia energética, que cambian con el tiempo y por comunidad autónoma. Pueden mejorar la rentabilidad de una reforma, pero no conviene contar con ellas hasta confirmarlas. Verificar las ayudas y deducciones vigentes en las fuentes oficiales (MIVAU y agenciatributaria.es) antes de incluirlas en los números.',
  },
  {
    question: '¿La reforma sube el alquiler o solo el valor del piso?',
    answer:
      'Puede hacer las dos cosas, pero para el inversor de alquiler lo que importa es cuánto sube la renta mensual y cuánto mejora la ocupación. Una reforma que revaloriza el piso pero no mueve el alquiler solo interesa si vas a vender. Si vas a alquilar, mide la reforma por su efecto en el alquiler y en el vacío, que es lo que alimenta tu rentabilidad neta.',
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
              "Lo reformo entero y lo alquilo el doble." Es una frase que suena bien y que arruina
              muchas inversiones. Porque reformar no es gratis, y no toda reforma sube el alquiler lo
              suficiente para pagarse. La reforma es una de las palancas más potentes para subir la
              rentabilidad de una inversión inmobiliaria — y también una de las formas más rápidas de
              comerse el margen si se hace por gusto y no por números.
            </p>
            <p>
              En este artículo te explico cuándo una reforma renta de verdad, cuándo es dinero
              perdido, y cómo decidirlo con la única herramienta que no engaña: comparar la
              rentabilidad neta con y sin reforma, en tres escenarios. Con casos reales de mi cartera
              donde la reforma fue la clave de la operación.
            </p>

            <h2 id="regla">La regla de oro: la reforma se mide por el alquiler, no por lo bonita</h2>
            <p>
              El error de principiante es reformar para que quede bonito. Al inversor de alquiler no
              le paga la estética: le paga el alquiler mensual y la ocupación. Por eso la pregunta no
              es "¿queda mejor?", sino <strong>"¿cuánto más alquiler consigo, y en cuánto tiempo lo
              recupero?"</strong>.
            </p>
            <p>
              Una reforma renta cuando cumple al menos una de estas condiciones:
            </p>
            <ul>
              <li>Sube el alquiler mensual lo suficiente para amortizarse en pocos años.</li>
              <li>Mejora la ocupación: alquila más rápido y con menos vacío.</li>
              <li>Evita averías y gastos recurrentes que se comerían la renta.</li>
              <li>
                Permite cambiar de estrategia — por ejemplo, dividir en minipisos — y multiplicar la
                renta.
              </li>
            </ul>
            <p>
              Si una reforma no toca ninguna de esas palancas, es gasto, no inversión. Y el gasto se
              resta de tu rentabilidad neta.
            </p>

            <h2 id="calculo">Cómo se decide: dos rentabilidades netas, cara a cara</h2>
            <p>
              La forma honesta de decidir una reforma es calcular dos veces la rentabilidad neta sobre
              la inversión total, y compararlas:
            </p>
            <ol>
              <li>
                <strong>Sin reforma:</strong> compras y alquilas tal cual. Inversión = precio +
                gastos de compra. Alquiler = el que soporta el piso sin tocar.
              </li>
              <li>
                <strong>Con reforma:</strong> compras, reformas y alquilas más caro. Inversión =
                precio + gastos + reforma. Alquiler = el nuevo, más alto.
              </li>
            </ol>
            <p>
              Si la opción 2 da una rentabilidad neta mayor, la reforma renta. Si la 1 gana, mejor
              alquilar tal cual. Y siempre en tres escenarios: PESIMISTA, REALISTA y OPTIMISTA,
              decidiendo por el realista. La mecánica de la rentabilidad neta, con todos los gastos,
              la detallo en{' '}
              <a href="/blog/rentabilidad-bruta-vs-neta-alquiler">
                rentabilidad bruta vs neta del alquiler
              </a>
              , y puedes comparar los dos escenarios con la{' '}
              <a href="/calculadora-rentabilidad-inmobiliaria">
                calculadora de rentabilidad inmobiliaria
              </a>
              .
            </p>

            <h2 id="casos">Casos reales donde la reforma fue la clave</h2>
            <p>
              Te enseño tres operaciones reales que gestioné, todas con compra en secundario más
              reforma, con la rentabilidad neta sobre la inversión total:
            </p>
            <ul>
              <li>
                <strong>Sax (Alicante):</strong> compra por 33.000 € + 8.600 € de reforma, inversión
                total <strong>49.740 €</strong>; alquiler 500 €/mes; rentabilidad neta en torno al{' '}
                <strong>11,2%</strong> (escenarios 10,0 / 11,2 / 12,4%). Aquí la reforma fue lo que
                puso el piso en condiciones de alquilarse bien y con una renta digna.
              </li>
              <li>
                <strong>Monóvar (Alicante), 114 m²:</strong> compra por 42.000 € + 3.000 € de reforma,
                inversión total <strong>54.040 €</strong>; alquiler 550 €/mes; rentabilidad neta en
                torno al <strong>11,6%</strong> (9,9 / 10,5 / 11,2%). Reforma ligera, muy quirúrgica,
                justo lo necesario.
              </li>
              <li>
                <strong>Monóvar (Alicante), 92 m²:</strong> compra por 37.000 € + 10.000 € de reforma,
                inversión total <strong>55.540 €</strong>; alquiler 500 €/mes; rentabilidad neta en
                torno al <strong>10,3%</strong>.
              </li>
            </ul>
            <p>
              El patrón es claro: reforma dimensionada al activo, no reforma máxima. En Monóvar de
              114 m² bastaron 3.000 € bien puestos; en el de 92 m² hicieron falta 10.000 €. La
              reforma no se hace por norma, se hace por lo que necesita cada piso para rentar.
            </p>

            <h2 id="reforma-profunda">Cuándo la reforma profunda multiplica la renta</h2>
            <p>
              Hay un escalón superior: la reforma que no solo pone bonito el piso, sino que cambia su
              uso. El mejor ejemplo de mi cartera es una operación real en{' '}
              <strong>Elda (Alicante)</strong>: compra por 73.000 € + una reforma de{' '}
              <strong>60.000 €</strong> —un proyecto de reforma y división profunda—, inversión total{' '}
              <strong>162.080 €</strong>; alquiler <strong>2.150 €/mes</strong>; rentabilidad neta en
              torno al <strong>17,5%</strong> (escenarios 15,5 / 17,5 / 18,7%).
            </p>
            <p>
              Fíjate: la reforma casi iguala al precio de compra, y aun así es la operación más
              rentable de las que te he enseñado. ¿Por qué? Porque no fue una reforma estética, fue
              una reforma que multiplicó la capacidad de renta del inmueble mediante la división. Ese
              es el caso extremo en el que reformar mucho renta muchísimo — pero también el que más
              criterio técnico y control de presupuesto exige. La lógica de dividir para rentar más la
              desarrollo en{' '}
              <a href="/blog/minipisos-dividir-vivienda-mas-rentabilidad">
                minipisos: cómo un piso grande puede rentar como varios
              </a>
              .
            </p>

            <h2 id="presupuesto">Cómo presupuestar para que no se coma el margen</h2>
            <p>
              La reforma rentable en el papel se convierte en ruinosa cuando el presupuesto se
              descontrola. Mis reglas:
            </p>
            <ul>
              <li>
                <strong>Presupuesto por partidas, no cifra global.</strong> Exige detalle: fontanería,
                electricidad, carpintería, acabados. Una cifra redonda esconde sorpresas.
              </li>
              <li>
                <strong>Colchón para imprevistos.</strong> En vivienda usada siempre aparecen
                instalaciones viejas, humedades o elementos a rehacer. Añade margen sobre lo cerrado.
              </li>
              <li>
                <strong>No sobre-reformes para tu gusto.</strong> El inquilino no paga materiales de
                lujo. Reforma al nivel que el mercado de alquiler de esa zona reconoce.
              </li>
              <li>
                <strong>Cuenta el tiempo de obra como vacío.</strong> Mientras reformas no cobras
                alquiler; ese periodo entra en los números.
              </li>
            </ul>
            <p>
              Y ojo con las ayudas: existen programas de rehabilitación y deducciones ligadas a
              eficiencia energética que pueden mejorar los números, pero cambian y dependen de la
              comunidad. No cuentes con ellas hasta confirmarlas — <em>verificar ayudas y deducciones
              vigentes en MIVAU y agenciatributaria.es</em>.
            </p>

            <h2 id="financiacion">Financiar la reforma</h2>
            <p>
              La reforma también se puede financiar, y eso cambia la rentabilidad sobre tus fondos
              propios. Hay operaciones donde apalancar compra más reforma tiene mucho sentido, siempre
              que el nuevo alquiler cubra la cuota con holgura. Estructurar bien esa financiación es
              parte del trabajo, y se hace desde la lógica de{' '}
              <a href="/hipoteca-inversor">hipoteca para inversores</a>, no desde la de una vivienda
              habitual.
            </p>

            <h2 id="humo">Cuidado con la reforma que solo existe en el Excel</h2>
            <p>
              Muchas "oportunidades" se venden con una reforma teórica: "compras a este precio,
              inviertes X en reforma y alquilas por Y". Casi siempre el coste de reforma está
              subestimado y el alquiler final sobreestimado. Antes de creerte esos números, pásalos
              por el <a href="/test-anti-humo-inmobiliario">test anti-humo inmobiliario</a> y revisa
              las señales de alarma en{' '}
              <a href="/blog/como-detectar-humo-oportunidad-inversion">
                cómo detectar humo en una oportunidad de inversión
              </a>
              . Una reforma bien hecha es de las mejores inversiones; una reforma de folleto es de las
              peores.
            </p>

            <h2 id="cierre">Cierre</h2>
            <p>
              Rehabilitar para alquilar puede llevar una operación de un dígito medio a rentabilidades
              netas de dos dígitos, como el 11,2% de Sax o el 17,5% de Elda. Pero la reforma no renta
              por sí sola: renta cuando está dimensionada al activo, presupuestada con holgura y
              medida por el alquiler que consigue, no por lo bonita que queda. Calcula siempre las dos
              rentabilidades netas —con y sin reforma— en tres escenarios, y deja que decidan los
              números. Si el margen está en la obra, adelante; si no, alquila tal cual.
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
            ¿Tienes un piso a reformar y no sabes si los números salen?
          </h2>
          <p className="text-paper/80 text-lg mb-8 max-w-prose mx-auto">
            Comparo la rentabilidad neta con y sin reforma en tres escenarios y estructuro la
            financiación. Te digo si la obra suma o se come el margen.
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
