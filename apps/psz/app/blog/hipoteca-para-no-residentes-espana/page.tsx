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

const SLUG = 'hipoteca-para-no-residentes-espana'
const URL = `${SITE_URLS.psz}/blog/${SLUG}`
const post = getPostBySlug(SLUG)!

export const metadata: Metadata = {
  title: 'Hipoteca para no residentes en España: requisitos reales',
  description:
    'Hasta qué porcentaje financian los bancos a un no residente, qué documentación piden, cómo afecta la doble imposición y los errores que más operaciones tumban.',
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
    question: '¿Qué porcentaje financia un banco español a un no residente?',
    answer:
      'Como rango orientativo, la banca española suele financiar en torno al 60-70% del valor de tasación o compraventa (el menor de los dos) a un comprador no residente, frente al 80% habitual del residente. El porcentaje concreto depende del banco, del país de residencia del comprador y de la solidez de sus ingresos, y conviene verificar las condiciones vigentes con cada entidad porque varían con el mercado.',
  },
  {
    question: '¿Necesito el NIE antes de pedir la hipoteca?',
    answer:
      'Sí. El NIE (Número de Identidad de Extranjero) es imprescindible para abrir cuenta, firmar el préstamo y liquidar los impuestos de la compra. Sin NIE no hay operación. Puede tramitarse en el consulado español del país de residencia o en España, y conviene iniciarlo cuanto antes porque los plazos de cita varían mucho según la oficina.',
  },
  {
    question: '¿Un no residente paga más impuestos al comprar?',
    answer:
      'Los impuestos de la compra (ITP en segunda mano o IVA más AJD en obra nueva) son los mismos que para un residente y dependen de la comunidad autónoma. La diferencia aparece después: el no residente tributa por el Modelo 210 del IRNR (impuesto sobre la renta de no residentes) por la imputación de renta si la vivienda no se alquila, o por los ingresos si la alquila. Conviene revisar el convenio de doble imposición entre España y su país.',
  },
  {
    question: '¿La doble imposición me hace pagar dos veces por lo mismo?',
    answer:
      'No, ese es precisamente el problema que evitan los convenios de doble imposición que España tiene firmados con la mayoría de países. En general, el impuesto pagado en España por el inmueble se tiene en cuenta en la declaración del país de residencia para no tributar dos veces por la misma renta. El mecanismo exacto depende de cada convenio, así que conviene asesorarse con un fiscalista en ambos países.',
  },
  {
    question: '¿Puedo conseguir hipoteca si cobro mis ingresos en otra moneda?',
    answer:
      'Sí, pero es más exigente. El banco valora la estabilidad y la conversión de esos ingresos, y la Ley 5/2019 obliga a informar con detalle de los préstamos en moneda extranjera y del riesgo de tipo de cambio. Presentar la documentación de ingresos traducida, apostillada y ordenada es lo que marca la diferencia entre un "no" rápido y un "sí" negociado.',
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
              Cada semana hablo con extranjeros que quieren comprar en España y se topan con la misma
              sorpresa: el banco les ofrece bastante menos financiación de la que esperaban, y encima
              les pide una montaña de documentos que en su país nadie les había mencionado. No es
              mala suerte ni discriminación: es cómo funciona la financiación a no residentes. Este
              artículo te explica qué puedes conseguir de verdad, qué papeles vas a necesitar y cómo
              encaja la fiscalidad para que no te lleves un susto después de firmar.
            </p>
            <p>
              Soy broker hipotecario registrado en el Banco de España (número <strong>E242</strong>)
              y una parte importante de mi trabajo es acompañar a compradores no residentes. Aquí no
              vas a encontrar promesas: vas a encontrar el terreno de juego real.
            </p>

            <h2 id="que-es-no-residente">Qué significa "no residente" para el banco</h2>
            <p>
              A efectos hipotecarios, un no residente es quien no tiene su residencia fiscal en
              España, con independencia de su nacionalidad. Un español que vive y tributa en Alemania
              es no residente; un alemán que vive y tributa en España es residente. Lo que mira el
              banco no es tu pasaporte, sino dónde declaras tus impuestos y de dónde vienen tus
              ingresos.
            </p>
            <p>
              Esa distinción lo cambia casi todo: el porcentaje que te financian, la documentación
              que te piden y cómo tributarás después. Por eso conviene tenerla clara desde el primer
              día. Todo el marco lo desarrollo en la página pilar de{' '}
              <a href="/hipoteca-no-residentes">hipoteca para no residentes</a>, y aquí bajo al
              detalle práctico.
            </p>

            <h2 id="cuanto-financian">Cuánto financian: el rango real, sin humo</h2>
            <p>
              La cifra que más repito en las primeras llamadas: como <strong>rango orientativo</strong>,
              la banca española suele financiar en torno al <strong>60-70%</strong> del valor de
              tasación o de compraventa (el menor de los dos) a un no residente. El residente parte
              del 80% habitual. No es una norma escrita en piedra ni un umbral legal: es la política
              de riesgo con la que trabaja la mayoría de entidades, y varía según el banco, tu país
              de residencia y la solidez de tus ingresos. Conviene <strong>verificar las condiciones
              vigentes</strong> con cada entidad, porque se mueven con el mercado.
            </p>
            <p>
              ¿Qué implica en euros? Si compras una vivienda de 200.000 €, tendrás que aportar de tu
              bolsillo la entrada (entre 60.000 y 80.000 € según el porcentaje) más los gastos e
              impuestos de la compra, que suman otro pico. Antes de enamorarte de un piso conviene
              hacer esa cuenta: puedes estimar la factura de gastos con la{' '}
              <a href="/calculadora-gastos-compra">calculadora de gastos de compra</a> y tu margen de
              endeudamiento con la{' '}
              <a href="/calculadora-capacidad-endeudamiento">calculadora de capacidad</a>.
            </p>
            <p>
              El error más caro que veo es presuponer el 80% y descubrir el 60% con las arras ya
              firmadas. Ahí el comprador o pone más dinero del previsto o pierde la señal. Se evita
              sabiendo el rango antes de comprometer nada.
            </p>

            <h2 id="documentacion">La documentación: aquí se ganan o se pierden las operaciones</h2>
            <p>
              La financiación a no residentes no se cae normalmente por el precio del piso, sino por
              los papeles. El banco necesita entender tu solvencia sin poder acudir a las fuentes
              españolas habituales (vida laboral, declaración de la renta española). Por eso pide más
              y lo pide más ordenado:
            </p>
            <ul>
              <li>
                <strong>NIE</strong> (Número de Identidad de Extranjero) — imprescindible y previo a
                todo. Lo trato a fondo en la guía de{' '}
                <a href="/blog/nie-y-documentacion-para-comprar-casa-espana">
                  NIE y documentación para comprar casa en España
                </a>
                .
              </li>
              <li><strong>Pasaporte</strong> o documento de identidad del país de origen, en vigor.</li>
              <li>
                <strong>Justificantes de ingresos</strong>: nóminas, contrato laboral o, si eres
                autónomo/empresario, las cuentas y declaraciones de impuestos de tu país.
              </li>
              <li>
                <strong>Declaración de la renta</strong> del país de residencia (los dos últimos
                ejercicios suele bastar).
              </li>
              <li>
                <strong>Extractos bancarios</strong> recientes que muestren la entrada de ingresos y
                el ahorro con el que afrontas la entrada.
              </li>
              <li>
                <strong>Informe de deudas y solvencia</strong> del país de origen (el equivalente a
                la CIRBE española).
              </li>
            </ul>
            <p>
              Y una capa extra que muchos olvidan: cuando el documento no está en español, el banco
              suele exigir <strong>traducción jurada</strong> y, en algunos casos, <strong>apostilla
              de La Haya</strong> para validar su autenticidad. Preparar todo esto lleva semanas, así
              que se empieza antes de buscar piso, no después.
            </p>

            <h2 id="doble-imposicion">Impuestos y doble imposición: lo que pasa después de firmar</h2>
            <p>
              Los impuestos de la compra en sí (ITP en segunda mano, o IVA más AJD en obra nueva) son
              los mismos para residente y no residente y dependen de la comunidad autónoma. Ahí no
              hay penalización por ser extranjero. La diferencia llega con la tenencia del inmueble.
            </p>
            <p>
              Como no residente, tributarás en España por el <strong>Impuesto sobre la Renta de No
              Residentes (IRNR)</strong> a través del{' '}
              <a
                href="https://sede.agenciatributaria.gob.es/Sede/no-residentes.html"
                target="_blank"
                rel="noopener noreferrer"
              >
                Modelo 210 de la Agencia Tributaria
              </a>
              . Si no alquilas la vivienda, Hacienda te imputa una renta ficticia por el mero hecho
              de tenerla a tu disposición; si la alquilas, tributas por los ingresos. Los tipos y
              reglas cambian, así que conviene <strong>verificar las condiciones vigentes</strong> en
              la sede de la AEAT.
            </p>
            <p>
              Aquí aparece la palabra que asusta: <strong>doble imposición</strong>. La buena noticia
              es que España tiene firmados convenios de doble imposición con la mayoría de países
              precisamente para que no pagues dos veces por la misma renta. En general, lo pagado en
              España se tiene en cuenta en tu declaración del país de residencia. El mecanismo exacto
              depende de cada convenio, y por eso mi recomendación es siempre la misma: asesórate con
              un fiscalista en ambos países antes de comprar, no después.
            </p>
            <p>
              Un aviso importante y actual: el <strong>Golden Visa por inversión inmobiliaria</strong>
              {' '}que permitía obtener residencia comprando vivienda <strong>se eliminó en España en
              2025</strong>. Si has leído que comprar un piso te da la residencia, esa vía ya no está
              vigente. No la incluyas en tus planes.
            </p>

            <h2 id="ingresos-otra-moneda">Si cobras en otra moneda</h2>
            <p>
              Cuando tus ingresos son en libras, dólares, francos o cualquier divisa distinta del
              euro, el banco añade una capa de análisis: la conversión y la estabilidad de esos
              ingresos. La Ley 5/2019 obliga a la entidad a informarte con detalle del riesgo de tipo
              de cambio en los préstamos en moneda extranjera. No es un obstáculo insalvable, pero sí
              exige presentar la documentación impecable y, a menudo, negociar con el banco adecuado
              en lugar del primero que aparezca.
            </p>

            <h2 id="tipo-de-hipoteca">Fija, variable o mixta siendo no residente</h2>
            <p>
              La decisión entre tipo fijo, variable o mixto no cambia por ser no residente, pero pesa
              más: gestionar una hipoteca a distancia y en otra divisa hace que la previsibilidad de
              la cuota valga oro. A muchos compradores no residentes les encaja el tipo fijo por pura
              tranquilidad. Lo comparo con criterio en{' '}
              <a href="/blog/hipoteca-fija-variable-o-mixta">
                hipoteca fija, variable o mixta
              </a>{' '}
              y tienes el marco general en la página de{' '}
              <a href="/tipos-de-hipoteca">tipos de hipoteca</a>.
            </p>
            <p>
              Y ojo con el <strong>seguro de vida vinculado</strong>: los bancos suelen condicionar
              la bonificación del tipo a contratar sus pólizas, que casi siempre salen caras. Antes
              de aceptar la del banco, lee{' '}
              <a href="/blog/seguro-de-vida-vinculado-hipoteca">
                cómo no pagar de más por el seguro de vida
              </a>
              .
            </p>

            <h2 id="proceso">El proceso completo, en orden</h2>
            <p>
              La hipoteca es solo una pieza. Si quieres ver el recorrido entero —NIE, cuenta
              bancaria, arras, impuestos y firma en notaría— lo he ordenado paso a paso en{' '}
              <a href="/blog/comprar-vivienda-en-espana-siendo-extranjero">
                comprar vivienda en España siendo extranjero
              </a>
              . Léelo junto a este artículo: uno te dice cuánto te financiarán, el otro en qué orden
              hacer las cosas.
            </p>

            <h2 id="cierre">Cierre</h2>
            <p>
              Comprar en España siendo no residente es perfectamente viable, pero exige jugar con las
              reglas reales: una financiación en torno al 60-70%, documentación traducida y ordenada,
              y una fiscalidad que se resuelve con los convenios de doble imposición si te asesoras a
              tiempo. Lo que hunde operaciones no es la distancia, es la improvisación.
            </p>
            <p>
              Si estás valorando comprar desde fuera, cuéntame tu caso. Reviso tu perfil, te digo con
              franqueza qué financiación es realista y a qué bancos tiene sentido presentar tu
              operación. Puedes verificar mi registro <strong>E242</strong> cuando quieras: así es
              como trabajo, explicado en{' '}
              <a href="/broker-hipotecario">cómo funciona mi servicio</a>.
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
            ¿Compras en España desde el extranjero?
          </h2>
          <p className="text-paper/80 text-lg mb-8 max-w-prose mx-auto">
            Primera llamada gratis. Reviso tu perfil de no residente, te digo qué financiación es
            realista y preparamos la documentación que de verdad convence al banco.
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
            <Button href="/hipoteca-no-residentes" variant="primary" size="lg">
              Hipoteca para no residentes
            </Button>
          </div>
        </Container>
      </Section>
    </main>
  )
}
