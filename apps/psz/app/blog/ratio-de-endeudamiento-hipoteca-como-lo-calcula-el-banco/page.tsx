import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import {
  MORTGAGE_FORM_URL,
  SITE_URLS,
  TONO,
  articleSchema,
  breadcrumbSchema,
  faqPageSchema,
} from '@psz/seo'
import { Button, Container, JsonLd, Section, TelegramCta } from '@psz/ui'
import { ArticleFaq } from '../../_components/ArticleFaq'
import { BarChart } from '../../_components/BarChart'
import { getPostBySlug, isLive } from '../_posts'

export const revalidate = 21600

const SLUG = 'ratio-de-endeudamiento-hipoteca-como-lo-calcula-el-banco'
const URL = `${SITE_URLS.psz}/blog/${SLUG}`
const post = getPostBySlug(SLUG)!

export const metadata: Metadata = {
  title: 'Ratio de endeudamiento: cómo lo calcula cada banco y qué hacer cuando no te da',
  description:
    'El ratio de endeudamiento decide más hipotecas que el ahorro. Qué ingresos computa el banco y cuáles no, qué deudas restan, por qué unos aceptan el 30 % y otros el 40 %, y las siete vías legales para encajar una operación que se queda corta.',
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
    question: '¿Qué es el ratio de endeudamiento de una hipoteca?',
    answer:
      'Es el porcentaje de tus ingresos netos mensuales que se va en pagar deudas: la cuota de la hipoteca que pides más las cuotas de cualquier otro préstamo o tarjeta. Si ganas 3.000 € netos y entre hipoteca y coche pagas 1.050 €, tu ratio es del 35 %.',
  },
  {
    question: '¿Cuál es el ratio máximo que aceptan los bancos?',
    answer:
      'La mayoría se mueve entre el 30 y el 35 %. Algunas entidades llegan al 40 % con buen perfil, y unas pocas lo admiten en cualquier modalidad. Con ingresos altos el ratio pesa menos que el dinero que queda para vivir; con ingresos justos, el banco es más estricto.',
  },
  {
    question: '¿El banco cuenta los alquileres que cobro como ingresos?',
    answer:
      'Solo si están declarados en la renta, y normalmente entre el 50 y el 80 % de su importe. Alguna entidad computa el 100 % en operaciones de inversión. Un alquiler cobrado en efectivo y no declarado no existe para el banco, y además puede ser motivo de denegación.',
  },
  {
    question: '¿Cómo calcula el ratio el banco si soy autónomo?',
    answer:
      'Sobre el rendimiento neto de las dos últimas declaraciones de la renta, no sobre lo que facturas ni sobre lo que te transfieres. Si tributas por módulos, computa lo que declaras. Optimizar el IRPF a la baja el año antes de pedir la hipoteca es el error más caro de un autónomo.',
  },
  {
    question: '¿Puedo mejorar mi ratio de endeudamiento antes de pedir la hipoteca?',
    answer:
      'Sí: cancelar deudas pequeñas, alargar el plazo de la hipoteca, sumar un cotitular o un avalista, documentar ingresos que no estabas contando (complementos, alquileres declarados) o presentar la operación a una entidad con un ratio máximo más alto. Lo que no debes hacer es ocultar una deuda: el banco reconsulta la central de riesgos antes de firmar.',
  },
]

export default function ArticlePage() {
  if (!isLive(post.datePublished)) notFound()
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

      <Section tone="paper" padding="md">
        <Container size="md">
          <article className="prose-psz">
            <p className="text-lg">
              Cuando un banco dice que no, casi nunca es por el ahorro. Es porque la cuota no cabe
              en tus ingresos según <strong>su</strong> forma de calcularlo. Y ahí está la clave:
              cada entidad calcula el ratio de endeudamiento a su manera, computa unos ingresos y no
              otros, resta unas deudas y no otras, y admite un máximo distinto. El mismo expediente
              es un «no» en una oficina y un «sí» en la de enfrente.
            </p>

            <h2 id="formula">La fórmula (y por qué no es una sola)</h2>
            <p>
              Ratio de endeudamiento = cuotas mensuales de todas tus deudas ÷ ingresos netos
              mensuales. El resultado se compara con un máximo que suele estar entre el{' '}
              <strong>30 y el 35 %</strong>. Algunas entidades llegan al <strong>40 %</strong> con
              buen perfil, y unas pocas lo admiten en cualquier modalidad, lo que las convierte en
              la salida natural cuando la operación va justa. Puedes hacer una primera estimación
              con mi{' '}
              <a href="/calculadora-capacidad-endeudamiento">calculadora de capacidad de
              endeudamiento</a>, pero lo que decide es lo que viene ahora: qué entra en el numerador
              y qué entra en el denominador.
            </p>

            <h2 id="ingresos">Qué ingresos computa el banco (y cuáles no)</h2>
            <ul>
              <li>
                <strong>Nómina fija:</strong> al 100 %, en doce o catorce pagas prorrateadas.
              </li>
              <li>
                <strong>Variable, comisiones, horas extra:</strong> normalmente la media de los dos
                últimos años, y a menudo solo una parte. Si el variable es la mitad de tu sueldo,
                para el banco ganas menos de lo que crees.
              </li>
              <li>
                <strong>Autónomos:</strong> el <strong>rendimiento neto de las dos últimas
                rentas</strong>, no la facturación ni lo que te transfieres. Por módulos, lo que
                declaras. Un autónomo que gana 5.500 € y declara 4.100 € en IRPF gana 4.100 € para
                el banco. Lo detallo en{' '}
                <a href="/hipoteca-autonomos">hipoteca para autónomos</a>.
              </li>
              <li>
                <strong>Alquileres:</strong> solo si están declarados, y entre el 50 y el 80 % de su
                importe según entidad; alguna computa el 100 % en operaciones de inversión. Un
                alquiler en efectivo sin declarar no existe, y en más de una entidad es motivo de
                denegación directa.
              </li>
              <li>
                <strong>Pensiones de alimentos que cobras:</strong> con sentencia y justificante, sí.
                Las que pagas restan como una deuda más.
              </li>
              <li>
                <strong>Complementos del sector público</strong> (guardias, turnos, destino): si son
                estables y los documentas, cuentan. Si no, no.
              </li>
              <li>
                <strong>Ingresos futuros</strong> (un ascenso firmado, un contrato que empieza el
                mes que viene): casi ninguna entidad los computa. Alguna especializada lo hace con
                el contrato en la mano.
              </li>
            </ul>

            <h2 id="deudas">Qué deudas restan</h2>
            <ul>
              <li>La cuota de la nueva hipoteca, calculada a menudo con un tipo «de estrés» por encima del real, sobre todo en variable.</li>
              <li>Préstamos personales y del coche: la cuota completa, aunque queden tres meses.</li>
              <li>
                <strong>Tarjetas de crédito y revolving:</strong> el límite disponible se penaliza
                aunque no lo uses. Cancelar una tarjeta que no necesitas mejora el ratio.
              </li>
              <li>
                <strong>Avales que has firmado</strong> a terceros: aparecen en la central de riesgos
                y cuentan como riesgo tuyo.
              </li>
              <li>Cuotas de financiaciones «sin intereses» de tiendas: también son deuda.</li>
            </ul>
            <p>
              Todo esto el banco lo ve en la <strong>CIRBE</strong>, la central de riesgos del Banco
              de España, donde constan las deudas a partir de 1.000 €, y lo contrasta con tus
              extractos. Y lo <strong>vuelve a consultar antes de firmar</strong>. Sobre eso escribo
              en{' '}
              <a href="/blog/pedir-hipoteca-en-varios-bancos-a-la-vez-cirbe">pedir la hipoteca en
              varios bancos a la vez</a>.
            </p>

            <h2 id="vias">Siete vías legales cuando el ratio no da</h2>
            <ol>
              <li>
                <strong>Cancelar deudas pequeñas antes de pedir.</strong> Un préstamo del coche con
                180 € de cuota y 2.000 € pendientes cuesta más en ratio que en dinero. Se liquida y
                se pide la hipoteca un mes después.
              </li>
              <li>
                <strong>Alargar el plazo.</strong> De 25 a 30 años la cuota baja en torno a un 10 %.
                Se paga más interés total, pero permite entrar; y siempre se puede amortizar
                anticipadamente, como explico en{' '}
                <a href="/blog/amortizar-hipoteca-anticipadamente">amortizar la hipoteca
                anticipadamente</a>.
              </li>
              <li>
                <strong>Sumar un cotitular que no compra.</strong> Un padre o una pareja que entra
                en el préstamo sin entrar en la escritura. Algunas entidades lo admiten.
              </li>
              <li>
                <strong>Avalista temporal.</strong> Un aval que se cancela cuando la deuda baja a un
                porcentaje del valor de la vivienda. Se pacta al firmar y evita que el aval sea para
                toda la vida.
              </li>
              <li>
                <strong>Documentar ingresos que no estabas contando.</strong> Complementos,
                alquileres declarados, un segundo trabajo con contrato. Cada euro documentado baja el
                ratio.
              </li>
              <li>
                <strong>Elegir la entidad por su ratio máximo.</strong> Una operación al 38 % es
                imposible en un banco que corta al 35 % y normal en otro que admite el 40 %. Saber
                cuál es cuál es exactamente el trabajo de un broker.
              </li>
              <li>
                <strong>Un préstamo personal declarado para la entrada.</strong> Legal, siempre que
                el banco lo sepa y lo compute. Algunas entidades lo aceptan dentro del ratio;
                ocultarlo, en cambio, es falsedad en la solicitud y motivo de vencimiento anticipado
                del préstamo.
              </li>
            </ol>

            <h2 id="ejemplo">Un ejemplo con números</h2>
            <p>
              Pareja con 4.200 € netos al mes, préstamo del coche de 260 € y una tarjeta con 3.000 €
              de límite sin usar. Piden 210.000 € a 25 años: cuota estimada de unos 1.050 €. Ratio:
              (1.050 + 260 + la penalización de la tarjeta) ÷ 4.200 ≈ 33-35 %. Justo en la frontera.
              Cancelando la tarjeta, liquidando el coche (quedan 1.800 €) y pasando a 30 años, la
              cuota baja a unos 940 € y el ratio a un 22 %. Misma pareja, misma casa, misma entidad:
              de «lo sentimos» a aprobada.
            </p>

            <BarChart
              title="El ejemplo en cifras: ratio de endeudamiento antes y después de preparar el expediente"
              unit="%"
              max={45}
              data={[
                { label: 'Máximo que admiten las entidades flexibles', value: 40 },
                { label: 'Máximo habitual', value: 35 },
                { label: 'La pareja, tal como llegó', value: 34, display: '33-35 %' },
                { label: 'Tras cancelar tarjeta y coche, a 30 años', value: 22, highlight: true },
              ]}
              note="Ingresos netos de 4.200 €/mes, hipoteca de 210.000 €. Cuota estimada de 1.050 € a 25 años y de 940 € a 30 años."
            />

            <BarChart
              title="Qué parte de cada ingreso computa el banco (criterio habitual)"
              unit="%"
              max={100}
              data={[
                { label: 'Nómina fija', value: 100 },
                { label: 'Alquileres declarados', value: 65, display: '50-80 %' },
                { label: 'Variable y horas extra', value: 50, display: 'media de 2 años, a menudo parcial' },
                { label: 'Ingresos futuros (contrato aún no iniciado)', value: 5, display: 'casi nunca' },
                { label: 'Alquileres sin declarar', value: 1, display: '0 %' },
              ]}
            />

            <ArticleFaq items={FAQ_ITEMS} />

            <h2 id="cierre">En resumen</h2>
            <p>
              El ratio de endeudamiento no es un número tuyo: es un número que calcula cada banco con
              sus reglas. Conocer qué ingresos computa, qué deudas resta y hasta dónde llega cada
              entidad es lo que convierte un expediente rechazado en uno aprobado, sin esconder
              nada. Ese cálculo, con tu caso real y con las entidades adecuadas, es lo primero que
              hago con cada cliente.
            </p>
          </article>

          <TelegramCta className="mt-10" />
        </Container>
      </Section>


      <Section tone="navy" padding="lg">
        <Container size="md" className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-paper mb-4">
            ¿Tu ratio no da? Vemos por dónde encaja
          </h2>
          <p className="text-paper/80 text-lg mb-8 max-w-prose mx-auto">
            Calculo tu ratio como lo calcula cada entidad y te digo qué vía legal abre tu operación.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button href={MORTGAGE_FORM_URL} variant="gold" size="lg" target="_blank" rel="noopener noreferrer">
              Solicitar mi hipoteca →
            </Button>
            <Button href="/calculadora-capacidad-endeudamiento" variant="primary" size="lg">
              Calcular mi capacidad de endeudamiento
            </Button>
          </div>
        </Container>
      </Section>
    </main>
  )
}
