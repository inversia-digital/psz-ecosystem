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

const SLUG = 'amortizar-hipoteca-anticipadamente'
const URL = `${SITE_URLS.psz}/blog/${SLUG}`
const post = getPostBySlug(SLUG)!

export const metadata: Metadata = {
  title: 'Amortizar la hipoteca anticipadamente: cuándo conviene',
  description:
    'Reducir cuota o reducir plazo, coste de oportunidad frente al Euríbor y las comisiones de la Ley 5/2019: cuándo amortizar anticipadamente tu hipoteca tiene sentido y cuándo no.',
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
    question: '¿Qué es mejor al amortizar: reducir cuota o reducir plazo?',
    answer:
      'Reducir plazo ahorra más intereses en total, porque acortas el tiempo durante el cual pagas intereses. Reducir cuota ahorra menos intereses pero te alivia el pago mensual y te da más margen de seguridad. Si tu prioridad es pagar lo mínimo posible en intereses, reduce plazo; si tu prioridad es respirar cada mes, reduce cuota. No hay una respuesta universal: depende de tu situación.',
  },
  {
    question: '¿Cuánto se paga de comisión por amortizar anticipadamente?',
    answer:
      'La Ley 5/2019 limita las comisiones por amortización anticipada. En hipotecas a tipo variable el máximo es del 0,25% del capital amortizado durante los tres primeros años y 0,15% del cuarto al quinto, y cero después; en las de tipo fijo puede llegar al 2% los diez primeros años y 1,5% después. Son topes legales y en muchos casos la comisión real es menor o nula, así que conviene verificar las condiciones de tu escritura.',
  },
  {
    question: '¿Compensa amortizar la hipoteca o invertir ese dinero?',
    answer:
      'Es una decisión de coste de oportunidad. Amortizar equivale a obtener una rentabilidad segura igual al tipo de tu hipoteca. Si tu hipoteca está al 3% y crees que puedes obtener una rentabilidad neta superior con tu dinero de forma consistente y asumiendo el riesgo, invertir puede rentar más; si no, amortizar es un rendimiento seguro y sin riesgo. Cuanto más alto esté el Euríbor y tu tipo, más atractivo es amortizar.',
  },
  {
    question: '¿Amortizar la hipoteca tiene ventajas fiscales?',
    answer:
      'Solo en un caso concreto: quienes compraron su vivienda habitual antes del 1 de enero de 2013 pueden seguir aplicando la deducción por inversión en vivienda habitual en el IRPF sobre lo que amortizan, dentro de los límites vigentes. Para compras posteriores esa deducción está suprimida a nivel estatal. Conviene verificar las condiciones vigentes con la Agencia Tributaria o un asesor.',
  },
  {
    question: '¿Es mejor amortizar poco a poco o de golpe?',
    answer:
      'Depende de la comisión y de tu disciplina. Amortizaciones periódicas pequeñas van reduciendo intereses de forma constante y son fáciles de sostener; una amortización grande de golpe tiene más impacto inmediato pero inmoviliza mucho ahorro. Antes de dejar la cuenta a cero, conserva siempre un colchón de emergencia: amortizar no debe dejarte sin liquidez.',
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
              "Me ha entrado algo de dinero, ¿lo meto en la hipoteca?" Es una de las preguntas que más
              me hacen, y la respuesta honesta casi nunca es un sí o un no rotundo: es "depende, y
              déjame ver los números". Amortizar anticipadamente puede ahorrarte miles de euros o ser
              una decisión mediocre que te deja sin liquidez para poco beneficio. En este artículo te
              doy el criterio: reducir cuota o plazo, qué comisiones aplican con la Ley 5/2019, y cómo
              comparar amortizar frente a lo que ese mismo dinero podría rentar.
            </p>
            <p>
              Soy broker hipotecario registrado en el Banco de España (número <strong>E242</strong>) y
              esta conversación la tengo cada semana. Vamos al grano.
            </p>

            <h2 id="que-es">Qué es amortizar anticipadamente</h2>
            <p>
              Amortizar de forma anticipada es aportar dinero extra para reducir el capital pendiente
              de tu hipoteca antes de tiempo. Como los intereses se calculan sobre el capital que
              queda por pagar, reducir ese capital reduce los intereses futuros. Puedes hacerlo de
              forma puntual (una entrada de dinero) o periódica (aportaciones cada cierto tiempo), y
              siempre te obliga a elegir entre dos caminos.
            </p>

            <h2 id="cuota-vs-plazo">Reducir cuota o reducir plazo: la decisión clave</h2>
            <p>
              Cuando amortizas, el banco te pregunta qué quieres hacer con la reducción, y aquí mucha
              gente elige por intuición cuando debería elegir por objetivo:
            </p>
            <ul>
              <li>
                <strong>Reducir plazo:</strong> mantienes la misma cuota pero terminas antes. Es la
                opción que <strong>más intereses ahorra en total</strong>, porque acortas el tiempo
                durante el que pagas intereses.
              </li>
              <li>
                <strong>Reducir cuota:</strong> mantienes el plazo pero pagas menos cada mes. Ahorra
                menos intereses, pero te da <strong>oxígeno mensual</strong> y margen de seguridad.
              </li>
            </ul>
            <p>
              La regla que doy: si tu prioridad es pagar lo mínimo posible en intereses y tu economía
              aguanta bien la cuota actual, <strong>reduce plazo</strong>. Si lo que necesitas es
              respirar cada mes o protegerte ante una subida del Euríbor, <strong>reduce cuota</strong>.
              No hay una respuesta universal; hay tu situación.
            </p>

            <h2 id="comisiones">Qué comisiones aplican (Ley 5/2019)</h2>
            <p>
              La{' '}
              <a
                href="https://www.boe.es/buscar/act.php?id=BOE-A-2019-3814"
                target="_blank"
                rel="noopener noreferrer"
              >
                Ley 5/2019 de crédito inmobiliario
              </a>{' '}
              limitó las comisiones por amortización anticipada, que antes eran una barrera. Los{' '}
              <strong>topes legales</strong> (máximos, no importes garantizados) son:
            </p>
            <ul>
              <li>
                <strong>Tipo variable:</strong> máximo del 0,25% del capital amortizado durante los
                tres primeros años, 0,15% entre el cuarto y el quinto, y <strong>0%</strong> a partir
                de ahí.
              </li>
              <li>
                <strong>Tipo fijo:</strong> hasta el 2% del capital durante los diez primeros años y
                hasta el 1,5% después.
              </li>
            </ul>
            <p>
              Importante: son <strong>máximos</strong> y, además, la comisión solo se cobra si el banco
              tiene una pérdida financiera por tu amortización; en muchos casos reales es menor o nula.
              Antes de amortizar, mira tu escritura y <strong>verifica las condiciones vigentes</strong>
              {' '}de tu contrato. Puedes repasar el marco general en{' '}
              <a href="/como-funciona-ley-5-2019">cómo funciona la Ley 5/2019</a>.
            </p>

            <h2 id="coste-oportunidad">Amortizar frente al Euríbor: el coste de oportunidad</h2>
            <p>
              Esta es la parte que separa una buena decisión de una automática. Amortizar la hipoteca
              equivale a obtener una <strong>rentabilidad segura igual al tipo de tu préstamo</strong>.
              Si tu hipoteca está al 3%, cada euro que amortizas te "renta" un 3% seguro y sin riesgo,
              porque son intereses que dejas de pagar.
            </p>
            <p>
              La pregunta entonces es: ¿ese mismo dinero podría rentarte más en otro sitio? Si crees
              que puedes obtener de forma consistente una <strong>rentabilidad neta superior</strong> a
              tu tipo hipotecario, asumiendo el riesgo que eso implica, quizá invertir gane. Si no,
              amortizar es un rendimiento seguro difícil de batir. Y aquí entra el Euríbor: en una
              hipoteca variable, cuanto más alto esté el Euríbor, más alto es tu tipo y más atractivo
              se vuelve amortizar.
            </p>
            <p>
              Por eso conviene saber cómo se comportaría tu cuota si el Euríbor sube: esa foto es la que
              te dice si amortizar para reducir cuota es una prioridad de seguridad. La lógica del{' '}
              <a href="/calculadora-stress-test-euribor">test de estrés del Euríbor</a> es justo esa,
              ver cuánto aguantas antes de agobiarte. Si estás decidiendo el tipo de tu hipoteca de
              cara al futuro, lo complementa{' '}
              <a href="/blog/hipoteca-fija-variable-o-mixta">hipoteca fija, variable o mixta</a> y el
              marco de{' '}
              <a href="/tipos-de-hipoteca">tipos de hipoteca</a>.
            </p>

            <h2 id="amortizar-o-subrogar">¿Amortizar o cambiar de banco?</h2>
            <p>
              Amortizar y subrogar resuelven problemas distintos: <strong>amortizar baja la
              deuda</strong>, <strong>subrogar baja el tipo</strong>. A veces la mejor jugada no es
              meter el ahorro en tu hipoteca cara, sino llevarte la hipoteca a otro banco más barato y
              conservar la liquidez, o hacer ambas cosas. Comparo cuándo compensa cada una en{' '}
              <a href="/blog/subrogacion-de-hipoteca-cuando-compensa">
                subrogación de hipoteca: cuándo compensa
              </a>
              . No des por hecho que amortizar es siempre la respuesta; a veces mover el préstamo rinde
              más.
            </p>

            <h2 id="fiscalidad">La excepción fiscal (y a quién afecta)</h2>
            <p>
              Hay un matiz fiscal que solo aplica a un grupo concreto: quienes compraron su{' '}
              <strong>vivienda habitual antes del 1 de enero de 2013</strong> conservan el derecho a la
              deducción por inversión en vivienda habitual en el IRPF, que premia lo que amortizan
              dentro de los límites vigentes. Para ese perfil, amortizar tiene un incentivo fiscal
              extra. Para compras posteriores, esa deducción estatal está suprimida. Como la fiscalidad
              cambia, <strong>verifica las condiciones vigentes</strong> en la{' '}
              <a
                href="https://sede.agenciatributaria.gob.es/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Agencia Tributaria
              </a>{' '}
              o con un asesor. Si tu vivienda es de alquiler y no habitual, la lógica fiscal es otra y
              la trato en{' '}
              <a href="/blog/fiscalidad-alquiler-reduccion-irpf">
                fiscalidad del alquiler y reducción del IRPF
              </a>
              .
            </p>

            <h2 id="antes-de-amortizar">Antes de amortizar, revisa esto</h2>
            <ul>
              <li>
                <strong>Colchón de emergencia primero.</strong> No dejes la cuenta a cero: amortizar no
                debe costarte tu liquidez. El dinero que metes en la hipoteca ya no lo puedes sacar.
              </li>
              <li>
                <strong>Deudas más caras antes.</strong> Si tienes un préstamo al consumo o tarjetas
                al 8-20%, amortiza esas antes que una hipoteca al 3%.
              </li>
              <li>
                <strong>Mira la comisión real de tu escritura</strong>, no el tope legal.
              </li>
              <li>
                <strong>Decide cuota o plazo según tu objetivo</strong>, no por defecto.
              </li>
            </ul>

            <h2 id="cierre">Cierre</h2>
            <p>
              Amortizar la hipoteca es, muchas veces, una excelente decisión: rentabilidad segura,
              menos deuda y más tranquilidad. Pero no es automática. Elige entre cuota y plazo según tu
              objetivo, comprueba la comisión real de tu escritura, compárala con lo que ese dinero
              podría rentar y no te quedes sin colchón. Y no olvides que a veces subrogar rinde más que
              amortizar.
            </p>
            <p>
              Si tienes ahorro y dudas de qué hacer con tu hipoteca, cuéntame tu caso. Reviso tu
              escritura, calculo el ahorro de amortizar frente a subrogar y te digo con números qué
              tiene más sentido para ti. Trabajo con registro <strong>E242</strong> verificable; así lo
              hago en{' '}
              <a href="/broker-hipotecario">cómo funciona mi servicio</a>.
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
            ¿Amortizar, subrogar o invertir ese dinero?
          </h2>
          <p className="text-paper/80 text-lg mb-8 max-w-prose mx-auto">
            Primera llamada gratis. Reviso tu escritura y tus números y te digo con franqueza qué hace
            trabajar mejor tu dinero: reducir deuda, cambiar de banco o mantener liquidez.
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
            <Button href="/calculadora-stress-test-euribor" variant="primary" size="lg">
              Probar el test de estrés
            </Button>
          </div>
        </Container>
      </Section>
    </main>
  )
}
