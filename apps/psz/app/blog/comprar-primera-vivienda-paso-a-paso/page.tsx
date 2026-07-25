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

const SLUG = 'comprar-primera-vivienda-paso-a-paso'
const URL = `${SITE_URLS.psz}/blog/${SLUG}`
const post = getPostBySlug(SLUG)!

export const metadata: Metadata = {
  title: 'Comprar tu primera vivienda paso a paso (guía 2026)',
  description:
    'La hoja de ruta completa para comprar tu primera casa: del ahorro previo a la firma en notaría, con los tiempos, los documentos y los errores que veo cada semana.',
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
    question: '¿Cuánto tarda todo el proceso de comprar la primera vivienda?',
    answer:
      'Desde que encuentras el piso hasta la firma en notaría suele pasar entre 6 y 12 semanas. Lo que más tarda es la aprobación de la hipoteca y la tasación (2 a 5 semanas) y la coordinación de la notaría. Si el ahorro y la documentación están preparados antes de buscar piso, el proceso se acorta mucho.',
  },
  {
    question: '¿Qué se firma antes de la hipoteca?',
    answer:
      'Casi siempre un contrato de arras, que reserva la vivienda mientras tramitas la financiación. Las más habituales son las arras penitenciales, que permiten a cada parte echarse atrás con una penalización pactada. Es un momento delicado: hay que fijar bien el plazo para que dé tiempo a conseguir la hipoteca.',
  },
  {
    question: '¿Puedo firmar las arras sin tener la hipoteca aprobada?',
    answer:
      'Se hace continuamente, pero con cuidado. Antes de firmar arras conviene tener al menos un estudio de viabilidad de la hipoteca y un plazo de arras suficiente (idealmente 45-60 días). Si firmas arras y luego el banco te dice que no, puedes perder la señal. Por eso recomiendo tener la financiación encarrilada antes de comprometer dinero.',
  },
  {
    question: '¿Qué gastos hay que tener ahorrados además de la entrada?',
    answer:
      'Además del 20% de entrada, hay que sumar los impuestos y gastos de la compraventa: ITP o IVA, notaría, registro y gestoría, que suman en torno al 10-12% del precio según la comunidad autónoma. También el coste de la tasación. Conviene tener ese dinero aparte, porque el banco no lo financia.',
  },
  {
    question: '¿Merece la pena un broker para comprar la primera vivienda?',
    answer:
      'Depende de tu caso, pero para un primer comprador el mayor valor es evitar errores caros: firmar arras con plazo insuficiente, aceptar la primera oferta del banco o pagar productos vinculados innecesarios. Un intermediario registrado presenta tu operación a varios bancos a la vez y negocia condiciones. Cobra a éxito, así que puedes valorar si compensa sin coste inicial.',
  },
]

const HOWTO_STEPS = [
  {
    name: 'Calcula tu ahorro y tu capacidad',
    text: 'Antes de mirar pisos, calcula cuánto tienes ahorrado y hasta dónde llega tu capacidad de endeudamiento. Necesitas el 20% de entrada más un 10-12% de impuestos y gastos, y la cuota no debería superar el 30-35% de tus ingresos netos.',
    url: `${SITE_URLS.psz}/calculadora-capacidad-endeudamiento`,
  },
  {
    name: 'Consigue un estudio de viabilidad de la hipoteca',
    text: 'Antes de comprometerte con un piso, ten claro qué banco te financiará y en qué condiciones. Un estudio previo evita que firmes arras y luego el banco diga que no.',
    url: `${SITE_URLS.psz}/hipoteca-primera-vivienda`,
  },
  {
    name: 'Busca y elige la vivienda',
    text: 'Define zona, tipo de vivienda y presupuesto máximo real (no el que te gustaría). Valora si te compensa segunda mano u obra nueva por impuestos y plazos.',
    url: `${SITE_URLS.psz}/blog/segunda-mano-vs-obra-nueva`,
  },
  {
    name: 'Firma el contrato de arras',
    text: 'Reserva la vivienda con un contrato de arras, normalmente penitenciales. Fija un plazo suficiente (45-60 días) para conseguir la hipoteca sin prisas y revisa bien las condiciones antes de entregar la señal.',
    url: `${SITE_URLS.psz}/blog/contrato-arras-penitenciales`,
  },
  {
    name: 'Tramita la hipoteca y la tasación',
    text: 'Presenta la operación a varios bancos a la vez, aporta la documentación y espera la tasación oficial. El banco emite la FEIN (oferta vinculante) y dispones de al menos diez días para revisarla.',
    url: `${SITE_URLS.psz}/hipoteca-primera-vivienda`,
  },
  {
    name: 'Firma en notaría',
    text: 'Se firma la escritura de compraventa y la de hipoteca ante notario. Antes hay una visita informativa obligatoria al notario para revisar las condiciones. Se pagan los impuestos y gastos y recibes las llaves.',
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
          name: 'Cómo comprar tu primera vivienda paso a paso',
          description:
            'Hoja de ruta completa para comprar la primera vivienda en España: del ahorro previo y el estudio de la hipoteca a la firma en notaría.',
          url: URL,
          totalTime: 'P70D',
          estimatedCost: { currency: 'EUR', value: 0 },
          steps: HOWTO_STEPS,
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
              Comprar tu primera vivienda es la operación económica más grande que harás en tu vida, y
              casi siempre se aborda sin manual. En estos años he acompañado el proceso decenas de
              veces y he visto que los errores caros no están al final, sino al principio: gente que
              se enamora de un piso antes de saber si el banco se lo financia, o que firma arras con
              un plazo imposible. Esta es la hoja de ruta que sigo, en orden, con los tiempos reales
              y los puntos donde conviene frenar.
            </p>

            <h2 id="paso-0">Paso 0 — Los números, antes que los pisos</h2>
            <p>
              El error más frecuente es empezar mirando idealista. Primero hay que saber cuánto
              puedes gastar de verdad. Necesitas dos cifras: cuánto tienes ahorrado y cuánto te
              financiará el banco. Como norma, el banco cubre el 80% del menor entre precio y
              tasación, así que tienes que aportar el 20% de entrada más un 10-12% de impuestos y
              gastos. Lo detallo con ejemplos en{' '}
              <a href="/blog/cuanto-ahorro-necesito-comprar-primera-vivienda">
                cuánto ahorro necesitas para comprar tu primera vivienda
              </a>
              .
            </p>
            <p>
              Para la segunda cifra, tu capacidad de pago, la cuota más tus deudas no debería pasar
              del 30-35% de tus ingresos netos. Estímalo con la{' '}
              <a href="/calculadora-capacidad-endeudamiento">
                calculadora de capacidad de endeudamiento
              </a>{' '}
              antes de nada. Salir a buscar con un presupuesto máximo real te ahorra meses y
              disgustos.
            </p>

            <h2 id="paso-1">Paso 1 — Estudio de viabilidad de la hipoteca</h2>
            <p>
              Antes de comprometerte con una vivienda concreta, conviene tener claro qué banco te va
              a financiar y en qué condiciones. Esto es lo que evita el drama de firmar arras y que
              luego el banco diga que no. Un estudio previo mira tu perfil, tus ingresos y tu ahorro
              y te dice si eres viable y a qué tipo aproximado. Es la base del trabajo que explico en
              la página de <a href="/hipoteca-primera-vivienda">hipoteca para primera vivienda</a>.
            </p>

            <h2 id="paso-2">Paso 2 — Buscar y elegir la vivienda</h2>
            <p>
              Con el presupuesto máximo claro, empieza la búsqueda. Aquí la decisión que más impacta
              en el bolsillo es segunda mano frente a obra nueva, porque cambian los impuestos, los
              plazos y la forma de pago. Lo comparo a fondo en{' '}
              <a href="/blog/segunda-mano-vs-obra-nueva">
                vivienda de segunda mano u obra nueva: qué cambia en la hipoteca
              </a>
              . Mi consejo: no visites nada que esté por encima de tu tope; el enamoramiento sube el
              presupuesto sin que te des cuenta.
            </p>

            <h2 id="paso-3">Paso 3 — El contrato de arras</h2>
            <p>
              Cuando encuentras el piso y acuerdas el precio, se firma un contrato de arras que
              reserva la vivienda y te da tiempo para tramitar la hipoteca. Las más habituales son
              las penitenciales, que permiten a cada parte echarse atrás con una penalización
              pactada. El punto crítico es el <strong>plazo</strong>: fíjalo en 45-60 días para que
              dé tiempo a la aprobación bancaria y la tasación. Este contrato lo explico entero en{' '}
              <a href="/blog/contrato-arras-penitenciales">
                mi guía sobre el contrato de arras penitenciales
              </a>
              , porque es donde más gente pierde dinero por firmar deprisa.
            </p>

            <h2 id="paso-4">Paso 4 — Tramitar la hipoteca</h2>
            <p>
              Con las arras firmadas, se presenta la operación al banco (o mejor, a varios a la vez
              para comparar). El banco pide documentación, encarga la tasación oficial y, si todo
              encaja, emite la FEIN, la oferta vinculante. Por la{' '}
              <a
                href="https://www.boe.es/buscar/act.php?id=BOE-A-2019-3814"
                target="_blank"
                rel="noopener noreferrer"
              >
                Ley 5/2019
              </a>{' '}
              dispones de al menos diez días naturales para revisarla con calma antes de firmar. Esta
              fase es la que más tarda: entre dos y cinco semanas según el banco.
            </p>

            <h2 id="paso-5">Paso 5 — Los gastos: ténlos apartados</h2>
            <p>
              Antes de firmar tienes que tener el dinero de los impuestos y gastos, porque no se
              financian: ITP o IVA, notaría, registro y gestoría suman en torno al 10-12% del precio,
              y varían mucho por territorio. Calcula tu factura concreta con la{' '}
              <a href="/calculadora-gastos-compra">calculadora de gastos de compra</a> y compara por
              comunidad en{' '}
              <a href="/blog/gastos-de-comprar-vivienda-por-comunidad">
                gastos de comprar una vivienda por comunidad autónoma
              </a>
              . Recuerda <strong>verificar las condiciones fiscales vigentes</strong>, porque el ITP
              lo fija cada comunidad y cambia.
            </p>

            <h2 id="paso-6">Paso 6 — La firma en notaría</h2>
            <p>
              El último paso. Primero hay una visita informativa obligatoria al notario, sin coste,
              donde repasa contigo las condiciones de la hipoteca para asegurarse de que las
              entiendes. Y unos días después se firma: la escritura de compraventa y la de hipoteca,
              se pagan los impuestos y gastos y recibes las llaves. A partir de ahí, ya es tuya.
            </p>

            <h2 id="errores">Los errores que veo cada semana</h2>
            <ul>
              <li>Buscar piso antes de saber la capacidad real de financiación.</li>
              <li>Firmar arras con plazo insuficiente para conseguir la hipoteca.</li>
              <li>No tener apartado el dinero de impuestos y gastos.</li>
              <li>Aceptar la primera oferta del banco sin comparar con otros.</li>
              <li>Contratar productos vinculados (seguros, tarjetas) sin calcular si compensan.</li>
            </ul>
            <p>
              Si quieres una segunda opinión sobre la parte de financiación, ese es exactamente el
              trabajo que hago como <a href="/broker-hipotecario">broker hipotecario</a>: presento tu
              caso a varios bancos, negocio y te acompaño hasta la notaría.
            </p>

            <h2 id="cierre">Cierre</h2>
            <p>
              Comprar tu primera casa no es difícil si lo haces en el orden correcto: primero los
              números, luego los pisos. Prepara el ahorro, ten encarrilada la hipoteca antes de
              firmar arras y no te saltes ningún gasto. Con eso cubierto, el resto es papeleo. Haz una
              primera estimación con la <a href="/calculadora-hipoteca">calculadora de hipoteca</a> y,
              si quieres, cuéntame tu caso para ver si eres viable hoy.
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
            ¿Vas a comprar tu primera vivienda?
          </h2>
          <p className="text-paper/80 text-lg mb-8 max-w-prose mx-auto">
            Primera llamada gratis. Te digo si tu caso es viable, cuánto necesitas ahorrado y a qué
            bancos conviene presentarlo. Sin compromiso, sin coste.
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
            <Button href="/hipoteca-primera-vivienda" variant="primary" size="lg">
              Hipoteca primera vivienda
            </Button>
          </div>
        </Container>
      </Section>
    </main>
  )
}
