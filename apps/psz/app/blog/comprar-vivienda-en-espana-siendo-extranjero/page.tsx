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

const SLUG = 'comprar-vivienda-en-espana-siendo-extranjero'
const URL = `${SITE_URLS.psz}/blog/${SLUG}`
const post = getPostBySlug(SLUG)!

export const metadata: Metadata = {
  title: 'Comprar vivienda en España siendo extranjero: guía en 7 pasos',
  description:
    'El proceso completo y en orden para que un extranjero compre casa en España: NIE, cuenta bancaria, arras, hipoteca, impuestos y firma en notaría, con plazos reales.',
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
    question: '¿Cuánto tarda un extranjero en comprar una vivienda en España?',
    answer:
      'Desde que empiezas hasta la firma en notaría, un proceso ordenado suele llevar entre dos y cuatro meses. Lo que más alarga los plazos es el NIE (según la cita disponible) y la documentación de ingresos del extranjero, que a menudo hay que traducir y apostillar. La hipoteca en sí, una vez el banco tiene todo, se resuelve en semanas.',
  },
  {
    question: '¿Puedo comprar en España sin estar físicamente en el país?',
    answer:
      'Sí. Puedes otorgar un poder notarial (poder de compraventa) a una persona de confianza o a tu abogado para que firme en tu nombre, tanto las arras como la escritura y la hipoteca. El poder se firma ante notario en tu país y se apostilla. Muchas operaciones de no residentes se cierran así sin que el comprador viaje para la firma.',
  },
  {
    question: '¿Necesito una cuenta bancaria española para comprar?',
    answer:
      'En la práctica sí. La necesitas para domiciliar la hipoteca, pagar los impuestos de la compra, atender suministros y, a menudo, para que el banco valore la operación. Se puede abrir como no residente presentando el pasaporte y un certificado de no residencia; el NIE facilita mucho el trámite.',
  },
  {
    question: '¿Qué impuestos paga un extranjero al comprar vivienda en España?',
    answer:
      'Los mismos que un residente en el momento de la compra: ITP si es segunda mano (varía por comunidad autónoma) o IVA más AJD si es obra nueva, más notaría, registro y gestoría. La diferencia llega después con el Impuesto sobre la Renta de No Residentes (Modelo 210). Conviene verificar los tipos vigentes de cada comunidad autónoma.',
  },
  {
    question: '¿Comprar una vivienda me da la residencia en España?',
    answer:
      'No. El Golden Visa por inversión inmobiliaria, que permitía obtener residencia comprando vivienda por un importe determinado, se eliminó en España en 2025. Comprar una casa hoy no otorga derecho de residencia por sí mismo. La compra y el permiso de residencia son trámites independientes.',
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
          name: 'Cómo comprar una vivienda en España siendo extranjero',
          description:
            'Proceso ordenado para que un comprador extranjero o no residente adquiera una vivienda en España, desde la obtención del NIE hasta la firma en notaría.',
          url: URL,
          totalTime: 'P90D',
          estimatedCost: { currency: 'EUR', value: 0 },
          steps: [
            {
              name: 'Obtén el NIE',
              text:
                'Solicita el Número de Identidad de Extranjero en el consulado español de tu país o en España. Es imprescindible para abrir cuenta, firmar y pagar impuestos. Inícialo cuanto antes porque los plazos de cita varían mucho.',
            },
            {
              name: 'Abre una cuenta bancaria española',
              text:
                'Abre una cuenta como no residente (o residente si procede) para domiciliar la hipoteca, pagar los impuestos de la compra y los suministros. Se abre con pasaporte y certificado de no residencia.',
            },
            {
              name: 'Comprueba tu financiación antes de buscar piso',
              text:
                'Confirma con un broker o banco qué porcentaje te financian como no residente (rango orientativo del 60-70%) y cuánto necesitas de entrada y gastos, para buscar dentro de tu presupuesto real.',
              url: `${SITE_URLS.psz}/hipoteca-no-residentes`,
            },
            {
              name: 'Reserva el inmueble con un contrato de arras',
              text:
                'Firma un contrato de arras (normalmente penitenciales) que fija precio, plazo y condiciones, y entrega la señal. Revisa el contrato antes de firmar: es vinculante y protege a ambas partes.',
              url: `${SITE_URLS.psz}/blog/contrato-arras-penitenciales`,
            },
            {
              name: 'Formaliza la hipoteca',
              text:
                'Presenta la documentación de ingresos (traducida y apostillada si procede) al banco, recibe la oferta vinculante (FEIN) y cumple los plazos de transparencia de la Ley 5/2019, incluida la visita informativa al notario.',
            },
            {
              name: 'Firma ante notario e inscribe la vivienda',
              text:
                'Firma la escritura de compraventa y la de hipoteca ante notario (en persona o mediante poder notarial), paga el precio y la gestoría inscribe la propiedad en el Registro de la Propiedad.',
            },
            {
              name: 'Liquida los impuestos y regulariza tu situación fiscal',
              text:
                'Paga el ITP o IVA+AJD de la compra en plazo y ten en cuenta la tributación posterior como no residente (Modelo 210 del IRNR). Asesórate con un fiscalista sobre el convenio de doble imposición con tu país.',
              url: 'https://sede.agenciatributaria.gob.es/Sede/no-residentes.html',
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
              La mayoría de los problemas que veo en compradores extranjeros no vienen de que la
              operación sea difícil, sino de hacer las cosas en el orden equivocado: enamorarse de un
              piso antes de saber cuánto les financian, firmar arras sin el NIE tramitado, o
              descubrir a última hora que la documentación de ingresos hay que traducirla y
              apostillarla. Comprar en España siendo extranjero es perfectamente factible; solo hay
              que seguir la secuencia correcta.
            </p>
            <p>
              Soy broker hipotecario registrado en el Banco de España (número <strong>E242</strong>) y
              acompaño a menudo a compradores no residentes. Esta es la hoja de ruta que sigo con
              ellos, paso a paso y en orden.
            </p>

            <h2 id="paso-1">Paso 1 — El NIE, antes que nada</h2>
            <p>
              El <strong>NIE</strong> (Número de Identidad de Extranjero) es la llave de todo: sin él
              no abres cuenta, no firmas y no pagas impuestos. Puedes tramitarlo en el consulado
              español de tu país o en España, y el cuello de botella suele ser la cita. Por eso es el
              primer paso: inícialo antes incluso de mirar pisos en serio. Todo el detalle de cómo
              obtenerlo y qué documentos acompañarlo lo tienes en{' '}
              <a href="/blog/nie-y-documentacion-para-comprar-casa-espana">
                NIE y documentación para comprar casa en España
              </a>
              .
            </p>

            <h2 id="paso-2">Paso 2 — Abre una cuenta bancaria española</h2>
            <p>
              La necesitas para domiciliar la hipoteca, pagar los impuestos de la compra y atender
              suministros. Como no residente puedes abrirla presentando el pasaporte y un certificado
              de no residencia; con el NIE ya en la mano, el trámite es más ágil. Elegir bien el
              banco aquí también ayuda: a veces la entidad donde abres la cuenta es la que mejor
              hipoteca te ofrecerá después.
            </p>

            <h2 id="paso-3">Paso 3 — Sabe cuánto te financian ANTES de buscar</h2>
            <p>
              Este es el paso que casi todo el mundo se salta y el que más disgustos evita. Como{' '}
              <strong>rango orientativo</strong>, la banca española financia en torno al{' '}
              <strong>60-70%</strong> del valor de tasación o compraventa a un no residente, frente al
              80% del residente. Sabiendo eso, calculas cuánta entrada y cuántos gastos necesitas y
              buscas dentro de tu presupuesto real, no del imaginario.
            </p>
            <p>
              Desarrollo los porcentajes, la documentación de ingresos y la doble imposición en{' '}
              <a href="/blog/hipoteca-para-no-residentes-espana">
                hipoteca para no residentes en España
              </a>
              , y tienes el marco completo en la página de{' '}
              <a href="/hipoteca-no-residentes">hipoteca para no residentes</a>. Para poner números a
              los gastos e impuestos de la compra, usa la{' '}
              <a href="/calculadora-gastos-compra">calculadora de gastos de compra</a>.
            </p>

            <h2 id="paso-4">Paso 4 — Reserva el inmueble con arras</h2>
            <p>
              Cuando encuentras la vivienda, se firma un contrato de <strong>arras</strong>
              {' '}—normalmente penitenciales— que fija el precio, el plazo hasta la escritura y las
              condiciones, y entregas una señal. Es un contrato vinculante y con consecuencias
              económicas si te echas atrás, así que conviene entender bien qué firmas. Lo explico
              entero en{' '}
              <a href="/blog/contrato-arras-penitenciales">contrato de arras penitenciales</a>. No
              firmes arras sin tener claro que la hipoteca es viable: para eso sirve el paso 3.
            </p>

            <h2 id="paso-5">Paso 5 — Formaliza la hipoteca</h2>
            <p>
              Con las arras firmadas, se presenta al banco la documentación de ingresos —traducida y
              apostillada cuando no está en español— y la entidad emite la oferta vinculante
              (<strong>FEIN</strong>). Aquí entra en juego la Ley 5/2019: tienes un periodo de
              transparencia con la documentación precontractual y una visita informativa al notario
              antes de firmar, pensada para que entiendas lo que asumes. Es una protección real,
              aprovéchala.
            </p>
            <p>
              Es también el momento de decidir el tipo de hipoteca. Gestionar el préstamo a distancia
              y quizá en otra divisa hace que la previsibilidad valga mucho; comparo fija, variable y
              mixta con criterio en{' '}
              <a href="/blog/hipoteca-fija-variable-o-mixta">
                hipoteca fija, variable o mixta
              </a>
              . Y antes de aceptar los seguros que el banco vincula a la bonificación, lee{' '}
              <a href="/blog/seguro-de-vida-vinculado-hipoteca">
                cómo no pagar de más por el seguro de vida
              </a>
              .
            </p>

            <h2 id="paso-6">Paso 6 — Firma ante notario</h2>
            <p>
              Se firman la escritura de compraventa y la de hipoteca ante notario, se paga el precio y
              la gestoría se encarga de inscribir la propiedad en el Registro. Si no puedes viajar,
              puedes otorgar un <strong>poder notarial</strong> a alguien de confianza o a tu abogado
              para que firme en tu nombre; el poder se firma en tu país y se apostilla. Muchas
              operaciones de no residentes se cierran así, sin que el comprador ponga un pie en
              España el día de la firma.
            </p>

            <h2 id="paso-7">Paso 7 — Impuestos y situación fiscal posterior</h2>
            <p>
              En la compra pagas ITP (segunda mano) o IVA más AJD (obra nueva), que dependen de la
              comunidad autónoma, más notaría, registro y gestoría —conviene{' '}
              <strong>verificar los tipos vigentes</strong> de tu comunidad. Después, como no
              residente, tributarás por el{' '}
              <a
                href="https://sede.agenciatributaria.gob.es/Sede/no-residentes.html"
                target="_blank"
                rel="noopener noreferrer"
              >
                Impuesto sobre la Renta de No Residentes (Modelo 210)
              </a>
              . Aquí es clave asesorarse sobre el <strong>convenio de doble imposición</strong> entre
              España y tu país para no tributar dos veces por la misma renta.
            </p>
            <p>
              Un recordatorio importante: comprar vivienda <strong>ya no da derecho a residencia</strong>.
              El Golden Visa por inversión inmobiliaria se eliminó en España en 2025, así que la
              compra y el permiso de residencia son trámites totalmente independientes.
            </p>

            <h2 id="plazos">¿Cuánto tarda todo esto?</h2>
            <p>
              Con la documentación bien preparada, un proceso ordenado suele llevar entre{' '}
              <strong>dos y cuatro meses</strong> desde el arranque hasta la firma. El NIE y la
              traducción/apostilla de documentos son lo que más alarga; la hipoteca, una vez el banco
              tiene todo, se resuelve en semanas. Por eso insisto tanto en empezar por el NIE y por
              saber tu financiación: son los dos frentes lentos.
            </p>

            <h2 id="cierre">Cierre</h2>
            <p>
              Comprar en España siendo extranjero no es complicado si respetas el orden: NIE, cuenta,
              financiación confirmada, arras, hipoteca, notaría e impuestos. El desorden es lo que
              cuesta dinero y tiempo. Si haces las cosas en secuencia, la distancia deja de ser un
              problema.
            </p>
            <p>
              Si estás en ello, cuéntame tu caso. Reviso tu perfil, te digo qué financiación es
              realista y te acompaño en cada paso. Así trabajo, con mi registro <strong>E242</strong>
              {' '}verificable en todo momento: lo tienes explicado en{' '}
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
            ¿Quieres comprar en España sin sustos?
          </h2>
          <p className="text-paper/80 text-lg mb-8 max-w-prose mx-auto">
            Primera llamada gratis. Te ordeno el proceso, te digo qué financiación es realista para
            tu perfil y te acompaño desde el NIE hasta la firma.
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
