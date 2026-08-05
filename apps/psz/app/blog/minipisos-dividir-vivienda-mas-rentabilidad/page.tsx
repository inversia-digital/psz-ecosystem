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

const SLUG = 'minipisos-dividir-vivienda-mas-rentabilidad'
const URL = `${SITE_URLS.psz}/blog/${SLUG}`
const post = getPostBySlug(SLUG)!

export const metadata: Metadata = {
  title: 'Minipisos: cómo un piso grande puede rentar como varios (2026)',
  description:
    'Qué son los minipisos, en qué se diferencian del alquiler por habitaciones, por qué elevan la rentabilidad y qué requisitos legales y técnicos hay que cumplir antes de meterse. Con la rentabilidad en tres escenarios y las cautelas de un profesional.',
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
    question: '¿Qué es un minipiso y en qué se diferencia del alquiler por habitaciones?',
    answer:
      'Un minipiso es una unidad de vivienda completa e independiente —con su cocina, su baño y su salón propios— resultante de dividir un inmueble grande en varias viviendas más pequeñas. Se diferencia del alquiler por habitaciones en que en éste se comparten zonas comunes (cocina, baño) y se alquila cada habitación por separado, mientras que en el minipiso cada inquilino tiene una vivienda cerrada y autónoma. El minipiso ofrece más privacidad y suele soportar mejor precio por metro, pero exige obra y cumplir requisitos legales más estrictos.',
  },
  {
    question: '¿Por qué un piso dividido en minipisos renta más?',
    answer:
      'Porque el precio del alquiler no es lineal con la superficie: dos viviendas de 55 m² suelen rentar más, sumadas, que una sola de 110 m². El inquilino paga sobre todo por tener una vivienda propia y bien ubicada, no por cada metro adicional. Al dividir, multiplicas el número de rentas sobre la misma superficie y la misma inversión de compra, lo que eleva la rentabilidad bruta. La clave está en que esa mejora sobreviva a los costes de la obra, las licencias y la gestión —por eso hay que mirar la rentabilidad neta, no la bruta—.',
  },
  {
    question: '¿Es legal dividir una vivienda en minipisos?',
    answer:
      'Depende del municipio y del inmueble. Hace falta, según el caso: licencia municipal de obra y de división, que el planeamiento urbanístico permita el aumento del número de viviendas, cumplir superficies y condiciones mínimas de habitabilidad (cédula de habitabilidad de cada unidad), y a veces la división horizontal ante notario y su inscripción registral. Algunos ayuntamientos limitan o prohíben la creación de nuevas viviendas por división. Nunca se debe dar por hecho: hay que verificarlo antes de comprar, no después.',
  },
  {
    question: '¿Puedo financiar la compra y la reforma de un proyecto de minipisos?',
    answer:
      'Sí, pero no con una hipoteca de vivienda habitual estándar. Suele estructurarse como financiación a inversor, combinando la hipoteca sobre el inmueble con la financiación de la obra, y el banco valora el proyecto completo (coste de compra + reforma vs valor y rentas resultantes). El encaje bancario de un proyecto así es distinto al de una compra normal: se presenta con números y con el proyecto técnico, y no todas las entidades lo hacen.',
  },
  {
    question: '¿Qué rentabilidad da un piso convertido en minipisos?',
    answer:
      'Varía mucho según ciudad, coste de la obra y ocupación, así que lo honesto es darla en tres escenarios (pesimista, realista y optimista) y siempre neta —después de gastos, impuestos y una previsión de vacancia—, no en bruto. Un proyecto bien ubicado y bien ejecutado puede situarse en rentabilidades netas de dos dígitos, pero un mismo proyecto mal calculado (obra que se dispara, licencia que no llega, rotación alta de inquilinos) puede quedarse en la mitad. La diferencia está en el análisis previo.',
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
              Hay una idea sencilla detrás de una de las estrategias de inversión inmobiliaria más
              rentables que veo en el mercado: <strong>el alquiler no se paga por metro cuadrado, se
              paga por vivienda</strong>. Y de esa idea nace el minipiso: coger un inmueble grande y
              convertirlo en varias viviendas pequeñas, completas e independientes. Bien hecho,
              multiplica la renta sobre la misma inversión. Mal hecho, es una trampa cara. Te explico
              las dos caras.
            </p>

            <h2 id="que-es">Qué es exactamente un minipiso</h2>
            <p>
              Un minipiso es una <strong>vivienda completa y autónoma</strong> —con cocina, baño y
              salón propios— resultante de dividir un inmueble mayor en varias unidades. No confundir
              con el <strong>alquiler por habitaciones</strong>, donde se comparten zonas comunes y
              se alquila cada dormitorio. En el minipiso cada inquilino cierra su puerta y tiene su
              casa; en el alquiler por habitaciones, comparte.
            </p>
            <p>
              La diferencia importa mucho: el minipiso da más privacidad, soporta mejor precio y
              atrae a un inquilino más estable, pero exige <strong>obra</strong> y cumplir requisitos
              legales bastante más estrictos.
            </p>

            <h2 id="por-que-renta-mas">Por qué renta más</h2>
            <p>
              Porque el precio del alquiler no crece de forma lineal con la superficie. Un piso de
              110 m² no renta el doble que uno de 55 m². El inquilino paga sobre todo por tener una
              vivienda propia y bien situada. Así que si divides esos 110 m² en dos viviendas de ~55,
              la suma de las dos rentas supera a la del piso entero — sobre la misma compra.
            </p>
            <p>
              He visto proyectos donde un inmueble grande, dividido en minipisos completos, pasa a
              rentar de forma sensiblemente superior a lo que rentaría entero. Pero{' '}
              <strong>ese salto en bruto solo vale si sobrevive a los costes</strong>: la obra, las
              licencias, la gestión de más inquilinos y una previsión realista de meses vacíos.
            </p>

            <h2 id="tres-rentabilidades">La rentabilidad, en tres escenarios (y siempre neta)</h2>
            <p>
              Aquí es donde separo el análisis serio del humo. Cualquiera te enseña la rentabilidad
              <em> bruta</em> de un minipiso, que impresiona. Yo no trabajo así: cualquier proyecto
              de inversión que analizo lleva <strong>tres rentabilidades netas</strong> —después de
              gastos, impuestos y vacancia—:
            </p>
            <ul>
              <li>
                <strong>Pesimista:</strong> la obra se encarece, la ocupación tarda, hay más
                rotación. Es el suelo que tienes que poder aguantar.
              </li>
              <li>
                <strong>Realista:</strong> el escenario central, el que de verdad manejamos para
                decidir.
              </li>
              <li>
                <strong>Optimista:</strong> todo sale bien. Es el techo, no la promesa.
              </li>
            </ul>
            <p>
              Un proyecto de minipisos bien ubicado y bien ejecutado puede alcanzar rentabilidades
              netas de dos dígitos. El mismo proyecto mal calculado se queda en la mitad. La
              diferencia no está en la suerte: está en el análisis previo. Puedes empezar a hacer
              tus números con la{' '}
              <a href="/calculadora-rentabilidad-inmobiliaria">calculadora de rentabilidad
              inmobiliaria</a>, que ya trabaja con esos tres escenarios.
            </p>

            <h2 id="cautelas">Lo que casi nadie te cuenta: las cautelas legales</h2>
            <p>
              Aquí está el 90% del riesgo, y donde más gente se equivoca por ir con prisa. Antes de
              comprar —no después— hay que verificar:
            </p>
            <ul>
              <li>
                <strong>Que el municipio permita aumentar el número de viviendas.</strong> Muchos
                ayuntamientos limitan o directamente prohíben crear nuevas viviendas por división.
                Si el planeamiento no lo permite, el proyecto muere antes de empezar.
              </li>
              <li>
                <strong>Licencias de obra y de división</strong> municipales.
              </li>
              <li>
                <strong>Cédula de habitabilidad de cada unidad:</strong> superficies y condiciones
                mínimas (luz, ventilación, instalaciones). Cada minipiso debe ser habitable por
                derecho propio.
              </li>
              <li>
                <strong>División horizontal</strong> ante notario e inscripción registral cuando
                proceda, para que cada unidad exista jurídicamente.
              </li>
              <li>
                <strong>Estatutos de la comunidad de propietarios:</strong> a veces prohíben la
                división de elementos.
              </li>
            </ul>
            <p>
              <strong>Nunca des por hecho que "se puede".</strong> Comprar un inmueble para
              dividirlo y descubrir después que el ayuntamiento no autoriza la división es el error
              más caro de esta estrategia. La comprobación previa no es opcional.
            </p>

            <h2 id="financiacion">La financiación es distinta</h2>
            <p>
              Un proyecto de minipisos no se financia con una hipoteca de vivienda habitual normal.
              Se estructura como <strong>operación de inversor</strong>: el banco valora el proyecto
              completo —coste de compra más reforma frente al valor y las rentas resultantes— y no
              todas las entidades entran en este tipo de operación. Se presenta con números y con el
              proyecto técnico delante. Encajar esa financiación en el banco adecuado es parte del
              trabajo de un intermediario que además entiende de inversión.
            </p>

            <h2 id="cierre">En resumen</h2>
            <p>
              El minipiso es una de las estrategias que mejor rentabilidad da hoy en España, porque
              exprime una verdad simple: se paga por vivienda, no por metro. Pero es también una de
              las que más gente hace mal, por saltarse la comprobación legal y por mirar la bruta en
              vez de la neta. Hecho con análisis previo, licencias comprobadas y las tres
              rentabilidades sobre la mesa, es un proyecto sólido. Hecho con prisa, es un problema
              con escritura.
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
            ¿Estás valorando un proyecto de inversión inmobiliaria?
          </h2>
          <p className="text-paper/80 text-lg mb-8 max-w-prose mx-auto">
            Antes de comprar, hagamos los números de verdad: rentabilidad neta en tres escenarios,
            viabilidad legal de la división y cómo financiar la operación. Sin humo.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button href={MORTGAGE_FORM_URL} variant="gold" size="lg" target="_blank" rel="noopener noreferrer">
              Hablar de mi proyecto →
            </Button>
            <Button href="/calculadora-rentabilidad-inmobiliaria" variant="primary" size="lg">
              Calcular rentabilidad
            </Button>
          </div>
        </Container>
      </Section>
    </main>
  )
}
