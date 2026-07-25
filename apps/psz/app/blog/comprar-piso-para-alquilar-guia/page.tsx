import type { Metadata } from 'next'
import {
  MORTGAGE_FORM_URL,
  SITE_URLS,
  TONO,
  articleSchema,
  breadcrumbSchema,
  faqPageSchema,
  howToSchema,
} from '@psz/seo'
import { Button, Container, Faq, JsonLd, Section } from '@psz/ui'
import { getPostBySlug } from '../_posts'

const SLUG = 'comprar-piso-para-alquilar-guia'
const URL = `${SITE_URLS.psz}/blog/${SLUG}`
const post = getPostBySlug(SLUG)!

export const metadata: Metadata = {
  title: 'Comprar un piso para alquilar: guía de rentabilidad',
  description:
    'Cómo elegir, financiar y calcular un piso para alquilar que de verdad rente: ubicación, números, fiscalidad y los errores que arruinan la rentabilidad. Con casos reales.',
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
    question: '¿Qué rentabilidad debo buscar al comprar un piso para alquilar?',
    answer:
      'La cifra que importa es la rentabilidad neta sobre la inversión total, no la bruta del anuncio. Como orientación, muchas operaciones de vivienda tradicional se mueven en un dígito medio-alto neto, y las de dos dígitos existen pero requieren compra en secundario, gestión activa o reforma. Lo esencial es calcular cada caso en tres escenarios (pesimista, realista, optimista) y decidir por el realista.',
  },
  {
    question: '¿Cuánto dinero necesito para comprar un piso de alquiler con hipoteca?',
    answer:
      'Para inversión, los bancos suelen financiar un porcentaje menor que en vivienda habitual, así que hay que aportar más entrada más los gastos de compra (ITP o IVA, notaría, registro, gestoría). En conjunto conviene contar con la entrada más un 10-13% aproximado de gastos sobre el precio, según la comunidad autónoma. Verificar las condiciones de financiación y el ITP vigentes.',
  },
  {
    question: '¿Es mejor un piso barato en secundario o uno en zona prime?',
    answer:
      'Para rentabilidad neta, el secundario de precio medio-bajo con buena demanda de alquiler suele ganar, porque el alquiler no baja proporcionalmente al precio: un piso más barato puede rentar un porcentaje mayor. La zona prime da más revalorización potencial y menos rentabilidad por alquiler. Depende de si tu objetivo es renta mensual o plusvalía a largo plazo.',
  },
  {
    question: '¿Qué gastos e impuestos tiene alquilar un piso?',
    answer:
      'Recurrentes: IBI, comunidad, seguros de hogar e impago, mantenimiento y periodos sin inquilino. Fiscales: el rendimiento del alquiler tributa en el IRPF, aunque la reducción del rendimiento neto puede rebajar mucho la factura. Todos estos conceptos hay que restarlos para pasar de la rentabilidad bruta a la neta. Verificar la fiscalidad vigente en agenciatributaria.es.',
  },
  {
    question: '¿Cuánto se tarda en alquilar un piso comprado para invertir?',
    answer:
      'Depende de la ciudad, el precio y el estado del piso. En zonas con demanda alta y un activo bien preparado, el alquiler puede cerrarse en días; en zonas más frías o con precio por encima de mercado puede llevar semanas o meses. En los escenarios conviene contar siempre con algún periodo de vacío para no inflar la rentabilidad.',
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
      <JsonLd
        data={howToSchema({
          name: 'Cómo comprar un piso para alquilar que de verdad rente',
          description:
            'Método paso a paso para elegir, financiar y calcular un piso de alquiler con rentabilidad neta en tres escenarios.',
          url: URL,
          totalTime: 'PT30M',
          estimatedCost: { currency: 'EUR', value: 0 },
          steps: [
            {
              name: 'Define tu objetivo y presupuesto real',
              text:
                'Decide si buscas renta mensual o revalorización, y calcula el capital disponible sumando la entrada más los gastos de compra (10-13% aproximado sobre el precio en vivienda usada, según comunidad).',
            },
            {
              name: 'Elige la zona por demanda de alquiler, no por gusto propio',
              text:
                'Busca zonas con demanda de alquiler estable y precios que permitan una rentabilidad neta razonable. El secundario de precio medio-bajo suele rentar más que la zona prime.',
            },
            {
              name: 'Calcula la rentabilidad neta en tres escenarios',
              text:
                'Sobre la inversión total (precio más gastos más reforma), resta todos los gastos anuales y la fiscalidad. Calcula pesimista, realista y optimista, y decide por el realista.',
            },
            {
              name: 'Estructura la financiación con margen',
              text:
                'Si te apalancas, comprueba que el alquiler cubre la cuota con holgura y que aguanta subidas del Euríbor. La financiación de inversión difiere de la de vivienda habitual.',
            },
            {
              name: 'Cierra la compra y prepara el piso para alquilar rápido',
              text:
                'Negocia el precio, formaliza en notaría y deja el piso en condiciones de alquilarse cuanto antes para minimizar el periodo de vacío.',
            },
          ],
        })}
      />

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
              Comprar un piso para alquilar parece sencillo: encuentras algo bonito, lo compras, lo
              alquilas y cobras. En la práctica, la mayoría de errores que arruinan una inversión se
              cometen antes de firmar, cuando el comprador se enamora del piso y hace los números
              después. El orden correcto es el inverso, y de eso va esta guía: cómo elegir, financiar
              y calcular un piso de alquiler que rente de verdad, con el criterio que aplico en mi
              propia cartera.
            </p>
            <p>
              Voy a ir paso a paso, con casos reales, y siempre con la rentabilidad calculada como
              debe hacerse: neta, sobre la inversión total y en tres escenarios. Nada de titulares.
            </p>

            <h2 id="objetivo">Paso 1 — Define tu objetivo antes que el piso</h2>
            <p>
              La primera pregunta no es "qué piso", es "para qué". Hay dos objetivos distintos y a
              menudo incompatibles: <strong>renta mensual</strong> (cobrar todos los meses el máximo
              posible) y <strong>revalorización</strong> (que el piso valga más dentro de años). La
              zona prime da revalorización y poca renta; el secundario de precio medio-bajo da renta
              y menos plusvalía. No puedes optimizar las dos a la vez, así que elige.
            </p>
            <p>
              Luego, el presupuesto real. No es solo lo que tienes: es lo que tienes menos los gastos
              de compra. Si compras con hipoteca de inversión, los bancos financian menos que en
              vivienda habitual, así que necesitas más entrada. Estima tu capacidad con la{' '}
              <a href="/calculadora-capacidad-endeudamiento">
                calculadora de capacidad de endeudamiento
              </a>{' '}
              y monta la financiación desde la lógica de{' '}
              <a href="/hipoteca-inversor">hipoteca para inversores</a>.
            </p>

            <h2 id="zona">Paso 2 — Elige la zona por los números, no por el gusto</h2>
            <p>
              El error más caro es comprar en la zona que a ti te gustaría vivir. A tu inquilino le
              da igual tu gusto: quiere una zona con demanda, transporte y servicios. Y a tu bolsillo
              le importa que el precio de compra permita una rentabilidad neta razonable.
            </p>
            <p>
              La clave contraintuitiva: un piso más barato suele rentar un porcentaje mayor, porque
              el alquiler no baja en la misma proporción que el precio. Por eso muchas de mis mejores
              operaciones están en secundario de Alicante y Albacete, no en el centro de una gran
              capital. Qué ciudades y zonas rinden mejor lo detallo en{' '}
              <a href="/blog/rentabilidad-alquiler-por-ciudades-espana">
                rentabilidad del alquiler por ciudades en España
              </a>
              .
            </p>

            <h2 id="numeros">Paso 3 — Haz los números antes de visitar</h2>
            <p>
              Aquí es donde se gana o se pierde la inversión. Sobre cualquier piso que te interese,
              calcula la rentabilidad neta: al alquiler anual réstale IBI, comunidad, seguros,
              mantenimiento, vacío y fiscalidad; divide entre la inversión total (precio + gastos +
              reforma). Y hazlo en tres escenarios: PESIMISTA, REALISTA y OPTIMISTA. Decide siempre
              por el realista.
            </p>
            <p>
              La distancia entre la cifra del anuncio y la que ingresas es enorme, y la explico
              entera en{' '}
              <a href="/blog/rentabilidad-bruta-vs-neta-alquiler">
                rentabilidad bruta vs neta del alquiler
              </a>
              . Para hacerlo rápido, la{' '}
              <a href="/calculadora-rentabilidad-inmobiliaria">
                calculadora de rentabilidad inmobiliaria
              </a>{' '}
              ya te separa bruta de neta y te obliga a meter los gastos.
            </p>

            <h2 id="casos">Paso 4 — Aprende de operaciones reales</h2>
            <p>
              Te enseño tres operaciones reales que gestioné, con la neta sobre inversión total:
            </p>
            <ul>
              <li>
                <strong>Orihuela (Alicante), 97 m²:</strong> compra 78.000 €, inversión total 90.540
                €; alquiler 750 €/mes; rentabilidad neta en torno al <strong>9,5%</strong> — alquilado
                el mismo día de la firma.
              </li>
              <li>
                <strong>Almansa (Albacete), 121 m²:</strong> compra 125.000 €, sin reforma, inversión
                total 143.510 €; alquiler 1.600 €/mes en formato minipisos; rentabilidad neta en
                torno al <strong>12,9%</strong> (12,0 / 12,9 / 13,7%), alquilados nada más firmar.
              </li>
              <li>
                <strong>Monóvar (Alicante), 114 m²:</strong> compra 42.000 € + 3.000 € de reforma,
                inversión total 54.040 €; alquiler 550 €/mes; rentabilidad neta en torno al{' '}
                <strong>11,6%</strong> (9,9 / 10,5 / 11,2%).
              </li>
            </ul>
            <p>
              Fíjate en el patrón: secundario bien comprado, reforma solo cuando aporta, ocupación
              muy rápida y rentabilidades netas de dos dígitos en varios casos. El de Almansa muestra
              además una palanca extra: dividir un piso grande en minipisos multiplica la renta, algo
              que desarrollo en{' '}
              <a href="/blog/minipisos-dividir-vivienda-mas-rentabilidad">
                minipisos: cómo un piso grande puede rentar como varios
              </a>
              .
            </p>

            <h2 id="reforma">Paso 5 — Decide la reforma con cabeza</h2>
            <p>
              Una reforma puede subir el alquiler más de lo que cuesta, o comerse el margen entero.
              La regla es simple: reforma solo cuando el aumento de alquiler que consigues justifica
              la inversión, y presupuéstala con holgura porque siempre aparece un imprevisto. En Sax
              (Alicante), una compra de 33.000 € + 8.600 € de reforma se quedó en 49.740 € de
              inversión y renta 500 €/mes, con una neta en torno al 11,2%. Cuándo la reforma suma y
              cuándo resta lo explico en{' '}
              <a href="/blog/rehabilitar-para-alquilar-reforma-rentable">
                rehabilitar para alquilar
              </a>
              .
            </p>

            <h2 id="fiscalidad">Paso 6 — No olvides la fiscalidad</h2>
            <p>
              El rendimiento del alquiler tributa en el IRPF, pero la reducción del rendimiento neto
              puede rebajar bastante la factura y, por tanto, subir tu rentabilidad neta real. Es una
              de las palancas más ignoradas por el inversor novato. La detallo, con los porcentajes
              vigentes tras la Ley de Vivienda, en{' '}
              <a href="/blog/fiscalidad-alquiler-reduccion-irpf">
                fiscalidad del alquiler y la reducción del IRPF
              </a>{' '}
              — <em>verificar condiciones vigentes en agenciatributaria.es</em>.
            </p>

            <h2 id="errores">Los errores que arruinan la rentabilidad</h2>
            <ul>
              <li>Calcular con la rentabilidad bruta y llevarse el susto con la neta.</li>
              <li>Asumir cero vacío y cero averías en el único escenario que miras.</li>
              <li>Enamorarse del piso y buscar números que lo justifiquen a posteriori.</li>
              <li>Comprar en zona sin demanda de alquiler porque "estaba barato".</li>
              <li>
                Fiarse de "rentabilidad garantizada": no existe. Pasa toda oferta por el{' '}
                <a href="/test-anti-humo-inmobiliario">test anti-humo inmobiliario</a> y lee{' '}
                <a href="/blog/como-detectar-humo-oportunidad-inversion">
                  cómo detectar humo en una oportunidad
                </a>
                .
              </li>
            </ul>

            <h2 id="cierre">Cierre</h2>
            <p>
              Comprar un piso para alquilar que rente no es cuestión de suerte, es cuestión de método:
              objetivo claro, zona por números, rentabilidad neta en tres escenarios y reforma solo
              cuando aporta. Si sigues ese orden, la mayoría de errores caros se evitan solos. Y si
              prefieres delegar la búsqueda y el análisis, ese trabajo se paga solo cuando la
              operación es buena: lo cuento en{' '}
              <a href="/blog/personal-shopper-inmobiliario-para-inversores">
                personal shopper inmobiliario para inversores
              </a>
              .
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
            ¿Vas a comprar para alquilar y quieres que los números salgan?
          </h2>
          <p className="text-paper/80 text-lg mb-8 max-w-prose mx-auto">
            Analizo la operación y la financiación con rentabilidad neta en tres escenarios antes de
            que firmes. Sin humo, con casos reales detrás.
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
