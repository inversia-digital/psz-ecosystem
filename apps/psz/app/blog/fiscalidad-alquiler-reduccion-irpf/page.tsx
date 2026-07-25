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

const SLUG = 'fiscalidad-alquiler-reduccion-irpf'
const URL = `${SITE_URLS.psz}/blog/${SLUG}`
const post = getPostBySlug(SLUG)!

export const metadata: Metadata = {
  title: 'Fiscalidad del alquiler: la reducción del IRPF explicada',
  description:
    'Cómo tributa el alquiler de vivienda en el IRPF, qué gastos puedes deducir y cómo funciona la reducción del rendimiento neto del 50 al 90% tras la Ley 12/2023.',
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
    question: '¿Qué gastos puedo deducir del alquiler en el IRPF?',
    answer:
      'Son deducibles los gastos necesarios para obtener el rendimiento: intereses de la hipoteca del inmueble, IBI, tasa de basuras, comunidad, seguros, gastos de conservación y reparación, honorarios de administración, suministros que pague el propietario y la amortización del inmueble (3% sobre el mayor de coste de adquisición o valor catastral, excluido el suelo). Los intereses más los gastos de reparación no pueden superar los ingresos del año, pero el exceso se puede deducir en los cuatro ejercicios siguientes. Conviene verificar la normativa vigente antes de presentar la declaración.',
  },
  {
    question: '¿Cuánto es la reducción del rendimiento neto del alquiler de vivienda?',
    answer:
      'Con carácter general la reducción es del 50% del rendimiento neto positivo para contratos firmados a partir del 1 de enero de 2024, según la Ley 12/2023. Sube al 60% si se ha rehabilitado la vivienda en los dos años previos, al 70% en zonas de mercado residencial tensionado con inquilinos jóvenes o vivienda de alquiler asequible, y al 90% si en una zona tensionada se baja la renta al menos un 5% respecto al contrato anterior. Los contratos anteriores a 2024 mantienen la reducción del 60%. Verifica siempre la redacción vigente porcentaje por porcentaje.',
  },
  {
    question: '¿La reducción se aplica al alquiler turístico o por habitaciones?',
    answer:
      'No. La reducción del rendimiento neto solo se aplica al arrendamiento de vivienda habitual del inquilino. El alquiler turístico o de temporada tributa como rendimiento del capital inmobiliario sin derecho a esa reducción, y si va acompañado de servicios de hostelería puede pasar a ser actividad económica. El alquiler por habitaciones es un supuesto discutido, por lo que conviene consultarlo con un asesor fiscal antes de aplicar cualquier reducción.',
  },
  {
    question: '¿Puedo deducir la amortización si compré el piso hace años?',
    answer:
      'Sí. La amortización del 3% se calcula sobre el mayor de dos valores: el coste de adquisición satisfecho (excluido el valor del suelo) o el valor catastral de la construcción. Es un gasto que no supone salida de caja y que reduce el rendimiento neto cada año que el inmueble está alquilado, incluso mucho después de la compra. Es uno de los gastos que más olvidan los propietarios que declaran por su cuenta.',
  },
  {
    question: '¿Qué pasa si no declaro los ingresos del alquiler?',
    answer:
      'No declarar el alquiler es una infracción tributaria: Hacienda cruza datos de fianzas depositadas, suministros y movimientos bancarios, y las regularizaciones llevan intereses de demora y sanción. Además, si no declaras pierdes el derecho a aplicar la reducción del rendimiento neto sobre esos ingresos aunque después regularices. Declarar bien casi siempre sale más barato que la sanción por ocultar.',
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
              Cuando alguien me enseña la rentabilidad de un piso de alquiler, casi siempre falta lo
              mismo: el IRPF. Y no es un detalle menor. Sobre el rendimiento del alquiler pagas tu
              tipo marginal, que para muchos inversores está entre el 30% y el 45%. La diferencia
              entre calcularlo bien y calcularlo mal puede convertir una operación de dos dígitos en
              una mediocre. La buena noticia es que la ley te da gastos deducibles y una reducción
              muy potente sobre el rendimiento neto. Vamos a verlo con orden.
            </p>
            <p>
              Aviso importante antes de seguir: esto es una guía general, no asesoramiento fiscal
              personalizado. Tu caso concreto —titularidad, tipo de contrato, comunidad autónoma,
              tramo de IRPF— cambia el resultado. Antes de presentar tu declaración, verifica la
              normativa vigente en la{' '}
              <a
                href="https://sede.agenciatributaria.gob.es/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Agencia Tributaria
              </a>{' '}
              y contrasta los números con un asesor de confianza.
            </p>

            <h2 id="como-tributa">Cómo tributa el alquiler de vivienda</h2>
            <p>
              El alquiler de una vivienda genera un <strong>rendimiento del capital inmobiliario</strong>{' '}
              que se integra en la base imponible general del IRPF y tributa a tu tipo marginal. El
              esquema es sencillo de enunciar:
            </p>
            <ul>
              <li>
                <strong>Ingresos íntegros:</strong> lo que cobras de renta durante el año.
              </li>
              <li>
                <strong>(–) Gastos deducibles:</strong> los gastos necesarios para obtener esa renta.
              </li>
              <li>
                <strong>= Rendimiento neto.</strong>
              </li>
              <li>
                <strong>(–) Reducción del rendimiento neto:</strong> del 50% al 90% si es vivienda
                habitual del inquilino.
              </li>
              <li>
                <strong>= Rendimiento neto reducido</strong>, que es lo que de verdad suma a tu base.
              </li>
            </ul>
            <p>
              El error clásico es olvidar los gastos y la amortización, tributar sobre el ingreso
              bruto y creer que el alquiler "no compensa por los impuestos". Casi nunca es así cuando
              se declara bien. Esta lógica de bruto contra neto es la misma que explico para la
              rentabilidad en el artículo sobre{' '}
              <a href="/blog/rentabilidad-bruta-vs-neta-alquiler">
                rentabilidad bruta frente a neta del alquiler
              </a>
              : el titular siempre es más bonito que el número que acaba en tu bolsillo.
            </p>

            <h2 id="gastos-deducibles">Los gastos que puedes deducir</h2>
            <p>
              Estos son los gastos deducibles más habituales del alquiler de vivienda. Guárdate las
              facturas: sin justificante, no hay deducción.
            </p>
            <ul>
              <li>
                <strong>Intereses de la hipoteca</strong> del inmueble alquilado (solo la parte de
                intereses, no la amortización de capital).
              </li>
              <li>
                <strong>IBI, tasa de basuras</strong> y demás tributos que recaigan sobre el
                inmueble.
              </li>
              <li>
                <strong>Comunidad de propietarios</strong> y derramas de gasto corriente.
              </li>
              <li>
                <strong>Seguros</strong> del hogar, de impago y de responsabilidad civil.
              </li>
              <li>
                <strong>Gastos de conservación y reparación:</strong> pintura, arreglo de
                instalaciones, sustitución de elementos. Ojo: las mejoras y ampliaciones no son gasto
                del año, se amortizan.
              </li>
              <li>
                <strong>Honorarios de administración y gestión</strong>, y los de formalización del
                contrato.
              </li>
              <li>
                <strong>Suministros</strong> que pague el propietario.
              </li>
              <li>
                <strong>Amortización del inmueble:</strong> el 3% sobre el mayor del coste de
                adquisición satisfecho o el valor catastral, excluido siempre el valor del suelo. Es
                un gasto sin salida de caja que muchos propietarios no aplican.
              </li>
            </ul>
            <p>
              Hay un límite conjunto: los intereses más los gastos de reparación y conservación no
              pueden superar los ingresos íntegros del año. Lo que no puedas deducir por ese límite
              no se pierde: se arrastra a los cuatro ejercicios siguientes. La lista exacta y sus
              matices están en la ley del IRPF; consúltala actualizada en la{' '}
              <a
                href="https://sede.agenciatributaria.gob.es/"
                target="_blank"
                rel="noopener noreferrer"
              >
                sede de la Agencia Tributaria
              </a>{' '}
              porque cambia con las reformas.
            </p>

            <h2 id="reduccion">La reducción del rendimiento neto: del 50% al 90%</h2>
            <p>
              Aquí está el gran incentivo fiscal del alquiler de vivienda. Tras la{' '}
              <a
                href="https://www.boe.es/buscar/act.php?id=BOE-A-2023-11049"
                target="_blank"
                rel="noopener noreferrer"
              >
                Ley 12/2023, de 24 de mayo, por el derecho a la vivienda
              </a>
              , la reducción del rendimiento neto positivo funciona por tramos para los contratos
              firmados a partir del 1 de enero de 2024:
            </p>
            <ul>
              <li>
                <strong>50% con carácter general.</strong> Es el punto de partida para cualquier
                alquiler de vivienda habitual del inquilino.
              </li>
              <li>
                <strong>60% si has rehabilitado</strong> la vivienda en los dos años anteriores a la
                firma del contrato.
              </li>
              <li>
                <strong>70%</strong> en zonas de mercado residencial tensionado cuando alquilas por
                primera vez a jóvenes de entre 18 y 35 años, o en supuestos de vivienda asequible o a
                administraciones y entidades sin ánimo de lucro.
              </li>
              <li>
                <strong>90%</strong> en zonas tensionadas si formalizas un contrato bajando la renta
                al menos un 5% respecto al contrato anterior.
              </li>
            </ul>
            <p>
              Los contratos anteriores a 2024 conservan la reducción del 60% con las reglas antiguas.
              Dos cautelas que repito siempre: la reducción solo se aplica sobre rendimientos{' '}
              <strong>positivos</strong> y <strong>declarados</strong> (si no declaras, la pierdes), y
              la definición de "zona tensionada" depende de que la comunidad autónoma la haya
              aprobado. Verifica la normativa vigente y el listado de zonas antes de contar con el 70%
              o el 90%: no están disponibles en todas partes.
            </p>

            <h2 id="ejemplo">Un ejemplo con números</h2>
            <p>
              Tomo una operación real que gestioné para ilustrarlo, con cifras redondeadas y sin dar
              nombres. Un piso en Orihuela (Alicante) comprado por 78.000 €, inversión total de unos
              90.540 € con gastos, alquilado por 750 €/mes —de hecho el mismo día de la firma—. Eso
              son 9.000 € de ingresos íntegros al año.
            </p>
            <p>
              Supongamos gastos deducibles anuales de unos 2.400 € entre IBI, comunidad, seguro y,
              sobre todo, la amortización del 3%. El rendimiento neto sería de 6.600 €. Si es vivienda
              habitual del inquilino y aplica la reducción general del 50%, el rendimiento neto
              reducido baja a 3.300 €. A un tipo marginal del 37%, el IRPF de esa operación ronda los
              1.221 € al año, no los 3.330 € que pagarías sobre el neto sin reducción. Esa diferencia
              es exactamente la que separa una rentabilidad neta real atractiva de una decepción.
            </p>
            <p>
              Fíjate en el orden correcto de trabajo: primero eliges bien el activo y su precio de
              entrada, después calculas la rentabilidad neta y solo entonces afinas la fiscalidad.
              Para el paso previo tienes mi{' '}
              <a href="/blog/comprar-piso-para-alquilar-guia">guía para comprar un piso para alquilar</a>{' '}
              y la{' '}
              <a href="/calculadora-rentabilidad-inmobiliaria">
                calculadora de rentabilidad inmobiliaria
              </a>
              , donde puedes meter estos números y ver el efecto de los impuestos en la rentabilidad
              neta.
            </p>

            <h2 id="particular-o-sociedad">¿Particular o sociedad?</h2>
            <p>
              Cuando el volumen de alquileres crece, muchos inversores se preguntan si conviene tener
              los inmuebles a título personal o a través de una sociedad, porque el impuesto de
              sociedades tiene un tipo distinto al IRPF. No hay respuesta universal: depende de tu
              tramo, de si reinviertes los beneficios y de los costes de estructura. Lo desarrollo en
              el artículo sobre{' '}
              <a href="/blog/comprar-inmueble-a-traves-de-sociedad">
                comprar un inmueble a través de una sociedad
              </a>{' '}
              y en la página de{' '}
              <a href="/estructuras-societarias">estructuras societarias</a>. En cualquier caso, esa
              decisión sí exige asesoramiento fiscal personalizado; no la tomes solo con lo que leas
              aquí.
            </p>

            <h2 id="errores">Errores que veo cada campaña de renta</h2>
            <ul>
              <li>
                <strong>No aplicar la amortización.</strong> Es el gasto que más se olvida y el que
                más rebaja el rendimiento neto.
              </li>
              <li>
                <strong>Confundir reparación con mejora.</strong> La reparación es gasto del año; la
                mejora se amortiza. Meterlo mal levanta banderas en una comprobación.
              </li>
              <li>
                <strong>Aplicar la reducción a alquiler turístico o de temporada.</strong> No procede.
              </li>
              <li>
                <strong>Deducir la cuota entera de la hipoteca.</strong> Solo son deducibles los
                intereses, no la amortización de capital.
              </li>
              <li>
                <strong>No declarar "para ahorrar".</strong> Hacienda cruza fianzas y suministros; la
                sanción sale más cara y encima pierdes la reducción.
              </li>
            </ul>

            <h2 id="cierre">Cierre</h2>
            <p>
              La fiscalidad no debería asustarte al invertir en vivienda, pero sí debería estar en tu
              hoja de cálculo desde el primer día. Con los gastos bien deducidos y la reducción del
              rendimiento neto bien aplicada, el alquiler de vivienda sigue siendo uno de los activos
              con mejor trato fiscal para el pequeño inversor en España. Eso sí: cada caso es
              distinto. Usa esta guía para entender el mecanismo, verifica la normativa vigente en la
              Agencia Tributaria y siéntate con tu asesor fiscal antes de decidir. Yo te ayudo con la
              parte de financiación y de números de la operación; la firma fiscal, déjasela a un
              profesional.
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
            ¿Vas a comprar para alquilar y quieres los números claros?
          </h2>
          <p className="text-paper/80 text-lg mb-8 max-w-prose mx-auto">
            Te ayudo a montar la financiación y a ver la rentabilidad neta real de la operación,
            impuestos incluidos. Primera llamada gratis y sin compromiso.
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
