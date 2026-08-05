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

const SLUG = 'hipoteca-joven-menos-35-anos'
const URL = `${SITE_URLS.psz}/blog/${SLUG}`
const post = getPostBySlug(SLUG)!

export const metadata: Metadata = {
  title: 'Hipoteca para jóvenes de menos de 35 años: bancos y ayudas',
  description:
    'Qué opciones de hipoteca tiene un menor de 35 años: avales públicos, financiación ampliada y ayudas por comunidad. Cómo presentar el perfil joven para que el banco diga sí.',
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
    question: '¿Hay hipotecas específicas para menores de 35 años?',
    answer:
      'No existe un producto legal llamado "hipoteca joven" con condiciones fijadas por ley. Lo que hay son ayudas públicas (como la línea de avales ICO) y ventajas comerciales que algunos bancos aplican a perfiles jóvenes. La hipoteca es la misma; lo que cambia es el apoyo para reunir la entrada y, a veces, alguna bonificación en el tipo.',
  },
  {
    question: '¿Puede un joven comprar sin tener el 20% de entrada ahorrado?',
    answer:
      'Sí, en algunos casos. La Línea de Avales ICO permite que el Estado avale hasta un porcentaje del precio para que el banco financie por encima del 80% habitual. También hay ayudas autonómicas y, con un buen perfil de ingresos, algún banco puede financiar más. Aun así, siempre hay que tener ahorrado el dinero de los impuestos y gastos de la compra.',
  },
  {
    question: '¿Qué edad se considera "joven" para las ayudas?',
    answer:
      'Depende de cada ayuda. La Línea de Avales ICO para primera vivienda fija el límite en menos de 35 años (o unidades familiares con menores a cargo). Muchas ayudas autonómicas usan también el umbral de 35 años, pero los requisitos de edad, ingresos y precio de la vivienda cambian por comunidad, así que conviene verificar las condiciones vigentes en cada convocatoria.',
  },
  {
    question: '¿Ser joven perjudica en el scoring del banco?',
    answer:
      'No por la edad en sí. El banco valora la estabilidad de ingresos y la antigüedad laboral, y ahí un joven suele tener menos recorrido. Se compensa con un contrato indefinido, ahorro demostrable, poca deuda y, si hace falta, un avalista. La edad joven incluso juega a favor en el plazo: se puede pedir a más años porque hay margen hasta la jubilación.',
  },
  {
    question: '¿Compensa esperar a tener más ahorro o comprar ya con aval?',
    answer:
      'Depende de tu caso. Comprar antes con aval significa asumir una cuota mayor y menos colchón; esperar significa pagar alquiler mientras ahorras y arriesgarte a que el precio suba. No hay respuesta universal: hay que hacer los números concretos de cuota, ahorro y capacidad. Es exactamente lo que reviso en la primera llamada, sin coste.',
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
              La pregunta que más me hacen los menores de 35 es la misma: "¿hay alguna hipoteca
              especial para mí?". La respuesta honesta es que no existe un producto mágico llamado
              hipoteca joven, pero sí un conjunto de ayudas y de estrategias que, bien combinadas,
              marcan la diferencia entre comprar ahora o seguir de alquiler tres años más. En este
              artículo te cuento qué hay de verdad y cómo se presenta un perfil joven para que el
              banco diga que sí.
            </p>

            <h2 id="el-muro-de-la-entrada">El muro real: la entrada, no la cuota</h2>
            <p>
              El obstáculo para casi todos los jóvenes no es pagar la cuota mensual — muchos ya pagan
              un alquiler parecido o superior — sino reunir el ahorro inicial. El banco financia por
              norma hasta el 80% del valor de tasación o compra (el menor de los dos), así que hay
              que aportar ese 20% de entrada más los impuestos y gastos de la compraventa. Antes de
              nada conviene saber cuánto necesitas de verdad: lo desgloso con ejemplos en{' '}
              <a href="/blog/cuanto-ahorro-necesito-comprar-primera-vivienda">
                este artículo sobre el ahorro necesario para la primera vivienda
              </a>
              .
            </p>
            <p>
              Ahí está la clave de por qué las ayudas para jóvenes se centran casi todas en ese muro:
              no rebajan la cuota, ayudan a saltar la barrera de la entrada.
            </p>

            <h2 id="avales-ico">La Línea de Avales ICO: comprar sin el 20%</h2>
            <p>
              La herramienta pública más importante hoy para un joven es la{' '}
              <a
                href="https://www.ico.es/web/ico/linea-avales-vivienda-jovenes-familias"
                target="_blank"
                rel="noopener noreferrer"
              >
                Línea de Avales ICO
              </a>{' '}
              para primera vivienda. En resumen: el Estado avala una parte del préstamo para que el
              banco pueda financiar por encima del 80% habitual, acercándose al 100% del precio. Está
              pensada precisamente para menores de 35 años (y para unidades familiares con menores a
              cargo).
            </p>
            <p>
              No es dinero que te dan: es una garantía que asume el Estado frente al banco. Tú sigues
              pidiendo tu hipoteca y respondiendo por ella. Los requisitos de renta, precio máximo de
              la vivienda y plazos cambian con cada convocatoria, así que hay que{' '}
              <strong>verificar las condiciones vigentes</strong> en la web del ICO antes de contar
              con ella. Lo explico en detalle, con sus cautelas, en{' '}
              <a href="/blog/avales-ico-primera-vivienda">
                mi guía sobre los avales ICO para primera vivienda
              </a>
              , porque tiene letra pequeña que conviene entender.
            </p>

            <h2 id="ayudas-autonomicas">Ayudas por comunidad autónoma</h2>
            <p>
              Además del aval estatal, muchas comunidades tienen sus propias ayudas para jóvenes:
              subvenciones a la entrada, bonificaciones fiscales en el impuesto de transmisiones para
              menores de 35 años que compran su vivienda habitual, o líneas de aval autonómicas
              propias. Aquí no hay un mapa único: cada comunidad fija sus umbrales de edad, renta y
              precio, y las convocatorias abren y cierran.
            </p>
            <p>
              Por eso mi consejo es doble: primero, mira si tu comunidad tiene un tipo reducido de
              ITP para jóvenes, porque puede ahorrarte varios miles de euros de golpe (comparo la
              factura fiscal por territorio en{' '}
              <a href="/blog/gastos-de-comprar-vivienda-por-comunidad">
                este artículo sobre los gastos de compra por comunidad
              </a>
              ); y segundo, revisa las convocatorias abiertas antes de firmar nada, porque muchas
              exigen solicitarlas <em>antes</em> de la compra.
            </p>

            <h2 id="que-mira-el-banco">Qué mira el banco en un perfil joven</h2>
            <p>
              La edad no penaliza por sí misma. Lo que el banco valora es la estabilidad, y ahí un
              joven suele tener menos recorrido demostrable. Estos son los factores que de verdad
              mueven la aguja:
            </p>
            <ul>
              <li>
                <strong>Tipo de contrato y antigüedad.</strong> Un indefinido con uno o dos años pesa
                mucho más que un sueldo alto pero reciente o temporal.
              </li>
              <li>
                <strong>Ratio de endeudamiento.</strong> La cuota más el resto de deudas no debería
                pasar de en torno al 30-35% de los ingresos netos. Puedes estimar tu margen con la{' '}
                <a href="/calculadora-capacidad-endeudamiento">
                  calculadora de capacidad de endeudamiento
                </a>
                .
              </li>
              <li>
                <strong>Ahorro demostrable.</strong> No solo tener el dinero, sino haber sido capaz
                de generarlo: demuestra hábito de ahorro, no un ingreso puntual de fuera.
              </li>
              <li>
                <strong>Plazo disponible.</strong> Aquí la juventud juega a favor: con 30 años puedes
                pedir a 30 o incluso 35 años porque hay margen hasta la jubilación, lo que baja la
                cuota mensual.
              </li>
            </ul>

            <h2 id="el-avalista">El avalista: cuándo tiene sentido</h2>
            <p>
              Cuando falta ahorro o antigüedad, la figura del avalista (normalmente los padres)
              destraba muchas operaciones. Pero hay que usarla con cabeza: quien avala responde con
              todo su patrimonio si tú dejas de pagar. Prefiero siempre estructurar la operación para
              que el aval sea temporal — que pueda retirarse en unos años cuando el perfil del joven
              madura o cuando se ha amortizado parte — antes que dejarlo de por vida. Es una de las
              cosas que negocio con el banco caso por caso.
            </p>

            <h2 id="estrategia">La estrategia que recomiendo</h2>
            <p>
              Con perfiles jóvenes sigo casi siempre el mismo orden de trabajo:
            </p>
            <ol>
              <li>
                <strong>Calcular la capacidad real</strong> antes de mirar pisos, para no enamorarte
                de algo fuera de tu alcance.
              </li>
              <li>
                <strong>Comprobar qué ayudas encajan</strong>: aval ICO, ayudas autonómicas, ITP
                reducido por edad.
              </li>
              <li>
                <strong>Ordenar la documentación</strong> para presentar el perfil de la mejor forma
                posible.
              </li>
              <li>
                <strong>Presentar a varios bancos a la vez</strong>, no ir uno por uno, para comparar
                ofertas reales.
              </li>
            </ol>
            <p>
              Si quieres ver el proceso completo de compra de principio a fin, lo tienes en mi{' '}
              <a href="/blog/comprar-primera-vivienda-paso-a-paso">
                guía para comprar tu primera vivienda paso a paso
              </a>
              . Y si prefieres entender el marco general de financiación para quien compra por
              primera vez, esa es justo la página de{' '}
              <a href="/hipoteca-primera-vivienda">hipoteca para primera vivienda</a>.
            </p>

            <h2 id="cierre">Cierre</h2>
            <p>
              Ser joven no es un problema para conseguir hipoteca: es un perfil con menos recorrido
              que hay que presentar bien y apoyar en las ayudas que existen. La combinación de aval
              ICO, ventajas autonómicas y un plazo largo puede hacer viable hoy lo que hace cinco
              años era imposible. Lo que no recomiendo nunca es forzar la compra sin colchón: haz los
              números antes con la{' '}
              <a href="/calculadora-hipoteca">calculadora de hipoteca</a> y decide con la cabeza
              fría.
            </p>
            <p>
              Si tienes menos de 35 y no sabes por dónde empezar, cuéntame tu caso. Te digo en una
              llamada si eres viable hoy o qué te falta para serlo.
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
            ¿Menos de 35 y quieres comprar tu primera casa?
          </h2>
          <p className="text-paper/80 text-lg mb-8 max-w-prose mx-auto">
            Primera llamada gratis. Te digo si tu caso es viable hoy, qué ayudas encajan y a qué
            bancos conviene presentarlo. Sin compromiso.
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
