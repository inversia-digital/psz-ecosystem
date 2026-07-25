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

const SLUG = 'ley-5-2019-explicada-para-el-cliente'
const URL = `${SITE_URLS.psz}/blog/${SLUG}`
const post = getPostBySlug(SLUG)!

export const metadata: Metadata = {
  title: 'La Ley 5/2019 explicada para el cliente de una hipoteca',
  description:
    'Qué cambió la Ley 5/2019 de crédito inmobiliario para quien pide una hipoteca: transparencia, reparto de gastos, comisiones limitadas y el papel del notario, en lenguaje claro.',
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
    question: '¿Qué es la Ley 5/2019 y a quién protege?',
    answer:
      'Es la ley española que regula los contratos de crédito inmobiliario (las hipotecas sobre vivienda) desde el 16 de junio de 2019. Transpone una directiva europea y su objetivo es proteger al prestatario: refuerza la transparencia previa, reparte los gastos de forma más favorable al cliente, limita las comisiones y da un papel de control al notario antes de firmar.',
  },
  {
    question: '¿Quién paga los gastos de la hipoteca con la Ley 5/2019?',
    answer:
      'La ley reparte los gastos: el banco asume la gestoría, el registro, el arancel notarial de la escritura de préstamo y el Impuesto de Actos Jurídicos Documentados. El cliente paga esencialmente la tasación de la vivienda y, si quiere, su copia de la escritura. Es uno de los cambios más importantes frente a lo que pagaba antes el comprador.',
  },
  {
    question: '¿Qué es el acta notarial previa y por qué es obligatoria?',
    answer:
      'Antes de firmar la hipoteca, el cliente debe acudir al notario para una reunión en la que se comprueba que ha recibido y entendido la documentación (la FEIN y la FiAE) con la antelación mínima legal. El notario levanta un acta gratuita que deja constancia de que se ha informado correctamente. Sin esa acta, la hipoteca no puede firmarse.',
  },
  {
    question: '¿La Ley 5/2019 limita las comisiones de amortización anticipada?',
    answer:
      'Sí. La ley fija límites máximos a la comisión por amortizar o cancelar anticipadamente, distintos para las hipotecas a tipo fijo y a tipo variable, y también acota la comisión por pasar de variable a fijo. Como los porcentajes concretos y los plazos aplican según el tipo de préstamo, conviene verificar las condiciones vigentes y revisar tu escritura antes de amortizar.',
  },
  {
    question: '¿Puede mi banco obligarme a contratar sus seguros?',
    answer:
      'No puede obligarte a contratar sus productos como condición para dar la hipoteca. Puede ofrecerte bonificaciones en el tipo de interés si contratas ciertos productos (vinculaciones), pero está obligado a aceptar pólizas de otras compañías con coberturas equivalentes. Por eso conviene comparar: a veces el seguro del banco cuesta bastante más que uno alternativo.',
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
              La mayoría de la gente firma una hipoteca sin haber leído nunca la ley que la regula.
              Es normal: son cientos de páginas de lenguaje técnico. Pero hay una ley — la{' '}
              <strong>Ley 5/2019</strong> — que existe precisamente para protegerte a ti, el cliente,
              y que en la práctica te da derechos concretos que el banco tiene que respetar. Este
              artículo te la traduce a lo que de verdad cambia en tu bolsillo.
            </p>
            <p>
              Lo escribo desde el lado del cliente, que es donde me sitúo cuando negocio: mi trabajo
              como broker es que estos derechos no se queden en el papel. Si prefieres el resumen
              estructurado, lo tienes también en la página pilar{' '}
              <a href="/como-funciona-ley-5-2019">cómo funciona la Ley 5/2019</a>.
            </p>

            <h2 id="que-es">Qué es la Ley 5/2019 y de dónde viene</h2>
            <p>
              La{' '}
              <a
                href="https://www.boe.es/buscar/act.php?id=BOE-A-2019-3814"
                target="_blank"
                rel="noopener noreferrer"
              >
                Ley 5/2019, de 15 de marzo, reguladora de los contratos de crédito inmobiliario
              </a>{' '}
              entró en vigor el 16 de junio de 2019 y transpuso al derecho español la Directiva
              europea 2014/17/UE. Nació después de años de abusos en la contratación hipotecaria —
              cláusulas suelo, gastos cargados al cliente, información opaca — con una idea de fondo:
              que quien pide una hipoteca entienda lo que firma y no pague de más por
              desconocimiento.
            </p>
            <p>
              Aplica a los préstamos con garantía hipotecaria sobre inmuebles de uso residencial
              cuando el prestatario es una persona física (consumidor). Es la referencia que uso a
              diario cuando reviso una oferta bancaria.
            </p>

            <h2 id="transparencia">1. Transparencia antes de firmar: la FEIN y la FiAE</h2>
            <p>
              El cambio más visible es la información previa. Antes de comprometerte, el banco tiene
              que entregarte con antelación suficiente dos documentos clave:
            </p>
            <ul>
              <li>
                <strong>FEIN</strong> (Ficha Europea de Información Normalizada): la oferta
                vinculante, con el tipo, la cuota, el plazo, la TAE y el cuadro de amortización.
              </li>
              <li>
                <strong>FiAE</strong> (Ficha de Advertencias Estandarizadas): las cláusulas y riesgos
                que merecen especial atención (por ejemplo, el tipo de interés de referencia o las
                vinculaciones).
              </li>
            </ul>
            <p>
              Estos documentos tienen que estar en tus manos con la antelación mínima legal antes de
              la firma. No es un formalismo: es tu ventana para comparar y, si hace falta, negociar o
              cambiar de banco. Aquí es donde un buen análisis marca la diferencia entre una hipoteca
              del montón y una buena.
            </p>

            <h2 id="gastos">2. El reparto de gastos: quién paga qué</h2>
            <p>
              Este es el cambio que más dinero deja en el bolsillo del cliente. La Ley 5/2019 fija
              quién asume cada gasto de constitución de la hipoteca, y el reparto es netamente
              favorable al prestatario:
            </p>
            <ul>
              <li>
                <strong>Paga el banco:</strong> la gestoría, el registro de la propiedad, el arancel
                notarial de la escritura de préstamo y el Impuesto de Actos Jurídicos Documentados
                (AJD).
              </li>
              <li>
                <strong>Paga el cliente:</strong> la tasación de la vivienda y, si la quiere, su
                copia de la escritura.
              </li>
            </ul>
            <p>
              Ojo: aquí hablamos de los gastos de la <em>hipoteca</em>, no de los de la{' '}
              <em>compraventa</em> (ITP o IVA, notaría de la compra, etc.), que van por otro lado y
              cambian según la comunidad autónoma. El total de comprar suele sorprender, así que
              conviene estimarlo antes con la{' '}
              <a href="/calculadora-gastos-compra">calculadora de gastos de compra</a>.
            </p>

            <h2 id="comisiones">3. Comisiones limitadas por ley</h2>
            <p>
              La ley pone techo a comisiones que antes eran libres. Dos ejemplos que veo mucho:
            </p>
            <ul>
              <li>
                <strong>Amortización anticipada:</strong> hay límites máximos distintos para tipo
                fijo y tipo variable, y decrecen con el tiempo. Si estás pensando en adelantar
                capital, revisa tu escritura y calcula si compensa — lo desarrollo en{' '}
                <a href="/blog/amortizar-hipoteca-anticipadamente">
                  amortizar la hipoteca anticipadamente
                </a>
                .
              </li>
              <li>
                <strong>Conversión de variable a fijo:</strong> la comisión está acotada para
                fomentar que quien tenga una variable pueda pasarse a fijo si le conviene.
              </li>
            </ul>
            <p>
              Como los porcentajes y plazos dependen del tipo de préstamo y pueden matizarse, aquí
              toca <strong>verificar las condiciones vigentes</strong> y leer tu escritura concreta.
            </p>

            <h2 id="notario">4. El notario te protege: el acta previa</h2>
            <p>
              Uno de los mecanismos más potentes y menos conocidos: antes de firmar la hipoteca
              tienes que acudir al notario para una reunión en la que comprueba que has recibido la
              FEIN y la FiAE con la antelación mínima y que entiendes lo que vas a firmar. De esa
              reunión sale un <strong>acta notarial previa gratuita</strong>.
            </p>
            <p>
              Sin esa acta, la hipoteca no se puede firmar. Es tu última red de seguridad: un
              profesional independiente del banco verifica que no firmas nada a ciegas. Aprovéchala —
              es el momento de preguntar todo lo que no tengas claro.
            </p>

            <h2 id="seguros">5. Vinculaciones y seguros: no te pueden obligar</h2>
            <p>
              El banco no puede condicionar la concesión de la hipoteca a que contrates sus seguros u
              otros productos. Sí puede ofrecerte una bonificación en el tipo de interés a cambio de
              contratarlos (las famosas vinculaciones), pero está obligado a aceptar pólizas de otras
              compañías con coberturas equivalentes.
            </p>
            <p>
              Traducido: compara siempre. El seguro de vida del banco suele costar bastante más que
              uno alternativo, y a veces la bonificación no compensa el sobrecoste. Hago los números
              de esto en{' '}
              <a href="/blog/seguro-de-vida-vinculado-hipoteca">
                el seguro de vida vinculado a la hipoteca
              </a>
              , y puedes estimar tu caso con la{' '}
              <a href="/calculadora-seguro-vida-hipoteca">calculadora de seguro de vida</a>.
            </p>

            <h2 id="broker">Qué papel juega tu broker en todo esto</h2>
            <p>
              La Ley 5/2019 también regula a quien intermedia tu hipoteca. Un broker legal está
              inscrito en el Banco de España, tiene seguro de responsabilidad civil y no puede
              anunciarse como "independiente" salvo condiciones estrictas — por eso yo hablo de
              asesoramiento <strong>personalizado</strong>. Puedes comprobar que cualquier broker
              cumple la ley siguiendo{' '}
              <a href="/blog/como-verificar-broker-hipotecario-banco-de-espana">
                esta guía de verificación en el Banco de España
              </a>
              . Y si dudas entre ir por tu cuenta o con intermediario, lo comparo con números en{' '}
              <a href="/blog/broker-hipotecario-vs-ir-directo-al-banco">
                broker hipotecario o ir directo al banco
              </a>
              .
            </p>

            <h2 id="cierre">Cierre</h2>
            <p>
              La Ley 5/2019 no es un tecnicismo: es tu escudo. Te da información antes de firmar, te
              descarga la mayoría de los gastos, limita comisiones, te pone al notario de tu lado y
              te libera de vinculaciones abusivas. Conocerla es la diferencia entre firmar lo que te
              ponen delante y firmar lo que de verdad te conviene.
            </p>
            <p>
              Si estás con una oferta encima de la mesa y quieres una lectura profesional antes de
              firmar, cuéntame tu caso. Reviso la FEIN contigo y te digo dónde hay margen.
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
            ¿Quieres que revise tu hipoteca a la luz de la ley?
          </h2>
          <p className="text-paper/80 text-lg mb-8 max-w-prose mx-auto">
            Primera llamada gratis. Reviso tu oferta, te digo qué derechos estás dejando sobre la
            mesa y qué margen real hay para mejorarla.
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
            <Button href="/como-funciona-ley-5-2019" variant="primary" size="lg">
              Cómo funciona la Ley 5/2019
            </Button>
          </div>
        </Container>
      </Section>
    </main>
  )
}
