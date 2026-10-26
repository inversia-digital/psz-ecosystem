import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { SITE_URLS, TONO, articleSchema, breadcrumbSchema, faqPageSchema } from '@psz/seo'
import { Button, Container, JsonLd, Section, TelegramCta } from '@psz/ui'
import { ArticleFaq } from '../../_components/ArticleFaq'
import { BarChart } from '../../_components/BarChart'
import { getPostBySlug, isLive } from '../_posts'

export const revalidate = 21600

const SLUG = 'revision-euribor-noviembre-2026'
const URL = `${SITE_URLS.psz}/blog/${SLUG}`
const post = getPostBySlug(SLUG)!

/** CTA con prefill y origen para atribuir el lead a este artículo en el CRM. */
const CTA_HREF = '/solicitar-hipoteca?origen=blog-revision-euribor-noviembre'

export const metadata: Metadata = {
  title: 'Revisión de euríbor en noviembre: qué mirar y qué ignorar',
  description:
    'Revisión del euríbor en noviembre: cuánto sube tu cuota por cada décima en una hipoteca de 150.000 € y qué comprobar antes de que se fije.',
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

/** 150.000 € pendientes, 25 años, diferencial 0,80 %, euríbor hipotético 3,262 %. Sistema francés. */
const ESCENARIOS: { subida: string; cuota: number; diferencia: string; highlight?: boolean }[] = [
  { subida: 'Base (euríbor hipotético 3,262 %)', cuota: 797, diferencia: '', highlight: true },
  { subida: '0,10 puntos', cuota: 805, diferencia: '+8 €' },
  { subida: '0,25 puntos', cuota: 818, diferencia: '+21 €' },
  { subida: '0,50 puntos', cuota: 839, diferencia: '+42 €' },
]

const FAQ_ITEMS = [
  {
    question: '¿Qué euríbor se aplica a mi revisión?',
    answer:
      'Lo habitual es el euríbor a doce meses, pero tu escritura dice si se usa la media del mes anterior o el valor de un día concreto.',
  },
  {
    question: '¿Cuánto sube mi cuota si el euríbor sube 0,10 puntos?',
    answer:
      'Unos 8 € al mes, con 150.000 € pendientes a 25 años y diferencial del 0,80 % (cálculo propio, sin seguros ni comisiones). Es proporcional al capital que te queda.',
  },
  {
    question: '¿Cambiar a tipo fijo cuesta algo?',
    answer:
      'Depende de tu contrato y de la entidad. Si hay algún coste, pide que te lo pongan por escrito. También pueden pedirte condiciones nuevas, como seguros o domiciliación. Compara el coste total, no solo la cuota.',
  },
  {
    question: '¿Me conviene cambiar de banco?',
    answer:
      'Solo si, tras sumar gastos y vinculaciones, el coste total baja. A veces tu banco mejora las condiciones si le planteas la alternativa.',
  },
  {
    question: '¿Puedes decirme si el euríbor va a subir o bajar?',
    answer:
      'No. Nadie debería prometerte eso. Lo que sí puedo hacer es ayudarte a calcular cuánto aguanta tu presupuesto en cada escenario.',
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
              Si tu hipoteca variable se revisa en noviembre, es normal que cada titular sobre el
              euríbor te sobresalte. Un día sube, otro frena, y tú solo quieres saber cuánto vas a
              pagar.
            </p>
            <p>
              Mi consejo es hacer dos cosas antes de mirar el índice: abrir tu escritura y hacer la
              cuenta en euros.
            </p>

            <h2 id="euribor-de-hoy">El euríbor de hoy no tiene por qué ser el de tu revisión</h2>
            <p>
              El euríbor se publica cada día, pero tu banco no usa necesariamente el de hoy. Según tu
              escritura, la revisión puede tomar la media del mes anterior o el valor de un día
              concreto previo a la fecha de revisión.
            </p>
            <p>
              Esa cláusula, la del tipo de referencia, es lo primero que hay que localizar. Lo
              habitual es que el índice sea el euríbor a doce meses, pero compruébalo en tu contrato.
            </p>
            <p>
              Si no sabes cuál se aplica en tu caso, cualquier cuenta hecha con la cifra de un titular
              es solo una aproximación.
            </p>

            <h2 id="cuanto-sube-la-cuota">Cuánto sube tu cuota por cada décima de euríbor</h2>
            <p>Veamos qué supone en tu cuota cada subida del índice.</p>
            <p>
              Un ejemplo mío, con una hipoteca tipo: 150.000 euros pendientes, 25 años por delante y
              diferencial del 0,80 %. Partimos de un{' '}
              <strong>euríbor hipotético de 3,262 %, solo para hacer la cuenta.</strong> Con ese punto
              de partida, la cuota sale en unos 797 euros al mes.
            </p>
            <div className="overflow-x-auto">
              <table>
                <thead>
                  <tr>
                    <th>Si el euríbor de referencia sube</th>
                    <th>Cuota aproximada</th>
                    <th>Diferencia al mes</th>
                  </tr>
                </thead>
                <tbody>
                  {ESCENARIOS.filter((e) => !e.highlight).map((e) => (
                    <tr key={e.subida}>
                      <td>{e.subida}</td>
                      <td>
                        <strong>{e.cuota} €</strong>
                      </td>
                      <td>{e.diferencia}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p>
              <em>
                Cálculo propio, cuota constante (sistema francés), sin seguros ni comisiones. Para
                saber la tuya, usa la <a href="/calculadora-hipoteca">calculadora de hipoteca</a> de
                psz.es.
              </em>
            </p>

            <BarChart
              title="Cuota mensual según la subida del euríbor (150.000 € pendientes, 25 años, diferencial 0,80 %)"
              unit="€"
              data={ESCENARIOS.map((e) => ({
                label: e.highlight ? 'Base (3,262 %)' : `+${e.subida.replace(' puntos', '')}`,
                value: e.cuota,
                highlight: e.highlight,
              }))}
              note="Euríbor hipotético del 3,262 %, solo para hacer la cuenta. Cálculo propio, sistema francés, sin seguros ni comisiones."
            />

            <h3>La lectura útil</h3>
            <p>
              Con este ejemplo, una subida de 0,10 puntos en el índice supone unos 8 euros más al
              mes. Los vaivenes pequeños de una sesión pesan muy poco en tu cuota.
            </p>
            <p>
              Lo que sí cambia tu presupuesto son las décimas que se sostienen y, sobre todo, el
              capital que te queda por pagar. El efecto es proporcional: con 75.000 euros pendientes,
              la mitad.
            </p>

            <h2 id="que-comprobar">Qué comprobar antes de la revisión de tu hipoteca variable</h2>
            <ol>
              <li>
                <strong>Fecha de revisión y referencia.</strong> Cuándo se revisa y qué dato exacto se
                toma (media mensual o día concreto).
              </li>
              <li>
                <strong>Diferencial y bonificaciones.</strong> Si tu tipo depende de nómina, seguros u
                otros productos, comprueba que siguen aplicándose. Una bonificación perdida pesa más
                que una décima de euríbor.
              </li>
              <li>
                <strong>Capital pendiente.</strong> Mira tu cuadro de amortización, no el importe que
                firmaste.
              </li>
              <li>
                <strong>La nueva cuota, por escrito.</strong> Pide al banco la cuota resultante y cómo
                la ha calculado. Contrástala con tu propia cuenta.
              </li>
            </ol>
            <p>
              Si quieres ver más escenarios, en la misma página de{' '}
              <a href="/herramientas">herramientas</a> tienes el resto de calculadoras.
            </p>

            <h2 id="pasar-a-fijo">¿Conviene pasar de variable a fijo?</h2>
            <p>
              Cuando el euríbor sube, es normal preguntarse si compensa cambiar de variable o mixta a
              fijo. Es una pregunta razonable, pero la comparación correcta no es de cuota, sino de
              coste total:
            </p>
            <ul>
              <li>el tipo fijo ofrecido y la TAE con todas las vinculaciones;</li>
              <li>los costes del cambio, si los hay: pídelos por escrito antes de decidir;</li>
              <li>
                seguros y productos que te exigen a cambio, que suelen esconderse en la letra
                pequeña;
              </li>
              <li>
                los años que te quedan: cuanto menos plazo, menos margen para amortizar los costes del
                cambio.
              </li>
            </ul>
            <p>Un fijo compra tranquilidad, no un ahorro garantizado.</p>
            <p>
              De vez en cuando aparecen titulares que anuncian hacia dónde va el euríbor. Son
              titulares de prensa, no datos, y yo no hago previsiones de tipos. Mi criterio es decidir
              con lo que ya sabes de tu contrato y tu presupuesto, no con lo que se supone que hará el
              mercado.
            </p>

            <h2 id="que-haria-yo">Qué haría yo en tu lugar</h2>
            <ul>
              <li>
                <strong>Si te toca revisión este mes:</strong> localiza la cláusula, calcula la
                horquilla de tu cuota y pide la cifra por escrito.
              </li>
              <li>
                <strong>Si estás pensando en cambiar de fijo o de banco:</strong> compara ofertas por
                coste total, con la ficha europea de información normalizada (FEIN) delante.
              </li>
              <li>
                <strong>Si vas a firmar una hipoteca nueva:</strong>{' '}
                <a href={CTA_HREF}>solicita tu estudio de hipoteca</a> y lo comparamos antes de
                firmar.
              </li>
            </ul>

            <ArticleFaq items={FAQ_ITEMS} title="Preguntas frecuentes" />

            <p>
              <em>
                Este artículo es divulgativo y no constituye asesoramiento personalizado. La concesión
                de cualquier hipoteca depende de la entidad.
              </em>
            </p>
            <p>
              <strong>{TONO.shortName}</strong>, broker hipotecario nº {TONO.credentials.bdeId} (Banco
              de España) y presidente de ANICI.
            </p>
          </article>

          <TelegramCta className="mt-10" />
        </Container>
      </Section>

      <Section tone="navy" padding="lg">
        <Container size="md" className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-paper mb-4">
            ¿Te toca revisión? Hacemos la cuenta con tu escritura delante
          </h2>
          <p className="text-paper/80 text-lg mb-8 max-w-prose mx-auto">
            Te calculo la horquilla de tu cuota con tu capital pendiente y tu diferencial reales, y
            si compensa o no mover la hipoteca. Primera evaluación gratuita y sin compromiso.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button href={CTA_HREF} variant="gold" size="lg">
              Solicitar mi estudio de hipoteca →
            </Button>
            <Button href="/calculadora-hipoteca" variant="primary" size="lg">
              Abrir la calculadora de hipoteca
            </Button>
          </div>
        </Container>
      </Section>
    </main>
  )
}
