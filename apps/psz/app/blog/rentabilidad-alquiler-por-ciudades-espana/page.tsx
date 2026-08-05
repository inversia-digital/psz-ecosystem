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

const SLUG = 'rentabilidad-alquiler-por-ciudades-espana'
const URL = `${SITE_URLS.psz}/blog/${SLUG}`
const post = getPostBySlug(SLUG)!

export const metadata: Metadata = {
  title: 'Rentabilidad del alquiler por ciudades en España',
  description:
    'Qué ciudades y zonas ofrecen mejor rentabilidad neta del alquiler en España y por qué, con el matiz que casi nadie hace: la neta en tres escenarios, no la bruta del titular.',
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
    question: '¿Qué ciudades tienen más rentabilidad de alquiler en España?',
    answer:
      'En términos de rentabilidad bruta, suelen aparecer capitales de precio medio-bajo y ciudades intermedias antes que Madrid o Barcelona, porque en las grandes el precio de compra sube más que el alquiler. Pero la clasificación cambia al pasar a rentabilidad neta y por barrios: dentro de una misma ciudad hay zonas que rentan el doble que otras. Conviene mirar datos oficiales actualizados y no fiarse de rankings genéricos.',
  },
  {
    question: '¿Dónde puedo consultar datos oficiales de precios de alquiler?',
    answer:
      'El Ministerio de Vivienda y Agenda Urbana (MIVAU) publica estadísticas de vivienda y el Sistema Estatal de Índices de Precios de Referencia del Alquiler (SERPAVI) ofrece índices por zona. Son las fuentes públicas de referencia para contrastar lo que dice un anuncio. Conviene verificar siempre los datos vigentes, porque el mercado se mueve.',
  },
  {
    question: '¿Por qué Madrid y Barcelona rentan menos por alquiler?',
    answer:
      'Porque el precio de compra en las grandes capitales ha subido más que los alquileres, lo que comprime la rentabilidad por renta. A cambio ofrecen más potencial de revalorización y demanda muy estable. Si tu objetivo es renta mensual, las ciudades intermedias y el secundario suelen rentar más; si buscas plusvalía a largo plazo, la ecuación cambia.',
  },
  {
    question: '¿La rentabilidad de un ranking de ciudades es la que voy a cobrar yo?',
    answer:
      'Casi nunca. Los rankings usan rentabilidad bruta media de una ciudad entera, y tú compras un piso concreto en un barrio concreto con sus gastos concretos. Tu rentabilidad neta real depende del activo, la fiscalidad, el vacío y la reforma. Usa los rankings para orientarte de zona, pero calcula siempre tu operación aparte y en tres escenarios.',
  },
  {
    question: '¿Es mejor invertir en mi ciudad o en otra más rentable?',
    answer:
      'Invertir cerca facilita la gestión y el conocimiento del mercado, pero puede salir menos rentable si tu ciudad tiene precios altos. Invertir en una zona más rentable exige gestión a distancia o apoyo local. No hay respuesta única: depende de tu tiempo, tu red de contactos y si delegas la gestión. Lo importante es que la rentabilidad neta compense la complejidad añadida.',
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
              Cada pocos meses sale un ranking de "las ciudades donde más renta el alquiler". Y cada
              vez recibo el mismo mensaje: "Toño, ¿me compro un piso en tal ciudad, que sale al 8%?".
              Mi respuesta siempre incomoda un poco: ese 8% es rentabilidad bruta media de una ciudad
              entera, y tú no vas a comprar una ciudad, vas a comprar un piso concreto en un barrio
              concreto. La rentabilidad de verdad no está en el mapa de España, está en la operación.
            </p>
            <p>
              En este artículo te explico qué zonas rentan más y por qué, dónde consultar los datos
              oficiales para no fiarte de titulares, y el matiz que casi nadie hace: la rentabilidad
              que importa es la neta, sobre la inversión total y en tres escenarios. Con ese filtro,
              muchos rankings se leen de otra forma.
            </p>

            <h2 id="patron">El patrón general: donde el precio subió menos, renta más</h2>
            <p>
              La lógica de fondo es sencilla. La rentabilidad por alquiler es el cociente entre lo
              que cobras y lo que pagaste. En las grandes capitales —Madrid, Barcelona— el precio de
              compra ha subido con fuerza, más que los alquileres, y eso comprime la rentabilidad por
              renta aunque la demanda sea altísima. En ciudades intermedias y en el secundario de
              precio medio-bajo, el alquiler no baja en la misma proporción que el precio, y la
              rentabilidad sube.
            </p>
            <p>
              Por eso, en rentabilidad por renta, suelen aparecer antes capitales medianas y ciudades
              intermedias que las grandes. Las grandes ofrecen otra cosa: revalorización potencial y
              demanda muy estable. Si tu objetivo es cobrar cada mes, miras a las primeras; si buscas
              plusvalía a largo plazo, la ecuación cambia. No hay ciudad "mejor" en abstracto: hay
              ciudad mejor para tu objetivo.
            </p>

            <h2 id="datos">Dónde mirar los datos oficiales (y no el titular)</h2>
            <p>
              Antes de creerte cualquier cifra, contrástala con fuentes públicas. Las de referencia
              en España son:
            </p>
            <ul>
              <li>
                <strong>MIVAU</strong> (Ministerio de Vivienda y Agenda Urbana): estadísticas
                oficiales de vivienda y precios.
              </li>
              <li>
                <strong>SERPAVI</strong>, el Sistema Estatal de Índices de Precios de Referencia del
                Alquiler, que da índices por zona y te sirve para saber si un alquiler está por
                encima o por debajo de referencia.
              </li>
            </ul>
            <p>
              Con esos datos puedes comprobar si el alquiler que promete un anuncio es realista o
              está inflado. Ten en cuenta que el mercado se mueve: <em>verifica siempre los datos
              vigentes</em> en las fuentes oficiales, no uses cifras de hace dos años.
            </p>

            <h2 id="barrios">El matiz que casi nadie hace: importa el barrio, no la ciudad</h2>
            <p>
              Aquí está la clave que separa al inversor de titular del inversor de números. Dentro de
              una misma ciudad, la rentabilidad varía enormemente entre barrios. Una zona con demanda
              de alquiler estable y precios de compra contenidos puede rentar el doble que el centro
              caro de esa misma ciudad. El ranking te orienta sobre en qué ciudad mirar; el barrio y
              el piso deciden tu rentabilidad real.
            </p>
            <p>
              Mi propia cartera lo demuestra. No invierto en el centro de grandes capitales, sino en
              secundario de Alicante y Albacete, donde encuentro rentabilidades netas de dos dígitos:
            </p>
            <ul>
              <li>
                <strong>Almansa (Albacete), 121 m²:</strong> compra 125.000 €, inversión total
                143.510 €; alquiler 1.600 €/mes en formato minipisos; rentabilidad neta en torno al{' '}
                <strong>12,9%</strong> (12,0 / 12,9 / 13,7%), alquilados nada más firmar.
              </li>
              <li>
                <strong>Orihuela (Alicante), 97 m²:</strong> compra 78.000 €, inversión total 90.540
                €; alquiler 750 €/mes; rentabilidad neta en torno al <strong>9,5%</strong>, alquilado
                el mismo día de la firma.
              </li>
              <li>
                <strong>Monóvar (Alicante), 114 m²:</strong> compra 42.000 € + 3.000 € de reforma,
                inversión total 54.040 €; alquiler 550 €/mes; rentabilidad neta en torno al{' '}
                <strong>11,6%</strong> (9,9 / 10,5 / 11,2%).
              </li>
            </ul>
            <p>
              Son operaciones reales que gestioné, y ninguna aparecería en un ranking de ciudades
              famosas. La rentabilidad estaba en el barrio y en la compra, no en el nombre de la
              ciudad. El caso de Almansa muestra además que la estrategia manda: dividir en minipisos
              multiplica la renta, algo que desarrollo en{' '}
              <a href="/blog/minipisos-dividir-vivienda-mas-rentabilidad">
                minipisos: cómo un piso grande puede rentar como varios
              </a>
              .
            </p>

            <h2 id="neta">Del ranking a tu bolsillo: pasa siempre a rentabilidad neta</h2>
            <p>
              Un ranking de ciudades usa rentabilidad bruta media. Tú cobras rentabilidad neta de un
              piso concreto. Entre las dos hay tres a cinco puntos de diferencia, que se los llevan
              IBI, comunidad, seguros, mantenimiento, vacío y fiscalidad. Un 8% bruto de titular
              puede quedarse en un 5-6% neto real. La mecánica completa la explico en{' '}
              <a href="/blog/rentabilidad-bruta-vs-neta-alquiler">
                rentabilidad bruta vs neta del alquiler
              </a>
              .
            </p>
            <p>
              Así que el proceso correcto es: usa el ranking y los datos de MIVAU/SERPAVI para elegir
              zona, pero calcula tu operación concreta con la{' '}
              <a href="/calculadora-rentabilidad-inmobiliaria">
                calculadora de rentabilidad inmobiliaria
              </a>{' '}
              en tres escenarios —pesimista, realista, optimista— y decide por el realista. Nunca
              compres una ciudad; compra una operación cuyos números aguanten.
            </p>

            <h2 id="lejos">¿Invertir lejos de casa?</h2>
            <p>
              Si la mejor rentabilidad está en otra provincia, tienes un dilema real: invertir cerca
              es cómodo de gestionar pero puede rentar menos; invertir lejos renta más pero exige
              gestión a distancia o apoyo local. No hay respuesta única. Lo que sí es seguro es que la
              rentabilidad neta extra debe compensar la complejidad añadida — si el margen es
              marginal, no vale la pena el kilometraje.
            </p>
            <p>
              Aquí es donde tiene sentido delegar la búsqueda y el análisis en alguien que conozca la
              zona rentable y calcule los números por ti; ese trabajo, bien hecho, se paga solo con la
              operación, como explico en{' '}
              <a href="/blog/personal-shopper-inmobiliario-para-inversores">
                personal shopper inmobiliario para inversores
              </a>
              . Y si vas a apalancarte para comprar fuera, estructura la financiación desde la{' '}
              <a href="/hipoteca-inversor">hipoteca para inversores</a>.
            </p>

            <h2 id="humo">Cuidado con los rankings interesados</h2>
            <p>
              No todos los rankings son inocentes. Algunos los publican portales o promotoras con
              interés en que compres en una zona concreta, y usan la cifra bruta más favorable. Si un
              ranking o una oferta te promete una rentabilidad redonda "garantizada" para toda una
              ciudad, desconfía y pásalo por el{' '}
              <a href="/test-anti-humo-inmobiliario">test anti-humo inmobiliario</a>. Las señales de
              alarma las detallo en{' '}
              <a href="/blog/como-detectar-humo-oportunidad-inversion">
                cómo detectar humo en una oportunidad de inversión
              </a>
              .
            </p>

            <h2 id="cierre">Cierre</h2>
            <p>
              La pregunta "¿en qué ciudad renta más el alquiler?" tiene una respuesta honesta: en la
              que tú compres bien un piso concreto en un barrio con demanda, y calcules la
              rentabilidad neta en tres escenarios. Los rankings orientan; los barrios deciden; los
              números mandan. Usa MIVAU y SERPAVI para contrastar, no titulares, y recuerda que la
              mejor operación de tu vida probablemente no salga en ningún ranking.
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
            ¿Buscas la zona que de verdad renta para tu presupuesto?
          </h2>
          <p className="text-paper/80 text-lg mb-8 max-w-prose mx-auto">
            Analizo la operación con rentabilidad neta en tres escenarios y datos contrastados. Te
            digo dónde y qué compra tu dinero, sin rankings de humo.
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
