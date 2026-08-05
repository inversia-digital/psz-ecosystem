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

const SLUG = 'seguro-de-vida-vinculado-hipoteca'
const URL = `${SITE_URLS.psz}/blog/${SLUG}`
const post = getPostBySlug(SLUG)!

export const metadata: Metadata = {
  title: 'Seguro de vida vinculado a la hipoteca: cómo no pagar de más',
  description:
    'Por qué el seguro de vida del banco suele costar el doble, qué dice la Ley 5/2019 sobre las pólizas alternativas y cómo calcular si compensa desvincularlo.',
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
    question: '¿Es obligatorio contratar el seguro de vida con la hipoteca?',
    answer:
      'No. La ley no obliga a tener un seguro de vida para poder firmar una hipoteca. Lo que ocurre es que el banco suele ofrecer una bonificación en el tipo de interés a cambio de contratarlo, y a veces lo presenta como si fuera imprescindible. Es una vinculación comercial, no un requisito legal. El seguro de daños del inmueble sí es obligatorio; el de vida, no.',
  },
  {
    question: '¿Puedo contratar el seguro de vida con otra compañía distinta del banco?',
    answer:
      'Sí. El artículo 17 de la Ley 5/2019 obliga al banco a aceptar pólizas alternativas de otro proveedor siempre que tengan condiciones y coberturas equivalentes a las que exige, y le prohíbe cobrarte por examinar esa póliza. Es decir, puedes llevar un seguro más barato de otra aseguradora y el banco debe aceptarlo si cubre lo mismo. Conviene verificar la redacción vigente del artículo.',
  },
  {
    question: '¿Pierdo la bonificación del tipo si no contrato el seguro del banco?',
    answer:
      'Puedes perderla, y por eso hay que hacer el cálculo completo. El banco suele subir el tipo de interés cuando no contratas sus productos vinculados. La pregunta correcta no es "¿me sale más barato el seguro?", sino "¿qué me cuesta más al año: el sobreprecio de la póliza del banco, o la subida del tipo por no contratarla?". Solo comparando ambas cosas sabes qué te conviene de verdad.',
  },
  {
    question: '¿El seguro de vida de la hipoteca se paga una vez o cada año?',
    answer:
      'Depende de la modalidad. La prima puede ser anual (pagas cada año y suele encarecerse con la edad) o de prima única financiada (pagas todo de golpe al principio, a menudo sumándolo al préstamo, con lo que también pagas intereses sobre esa cantidad). La prima única financiada es la fórmula que más encarece el coste total y la que más conviene revisar antes de firmar.',
  },
  {
    question: '¿Puedo cambiar el seguro de vida después de firmar la hipoteca?',
    answer:
      'Sí. Puedes cambiar de compañía durante la vida del préstamo, respetando los plazos de renovación de la póliza. Muchos clientes contratan el seguro del banco al firmar por comodidad y lo sustituyen después por uno más barato con coberturas equivalentes. Hay que revisar el efecto sobre la bonificación del tipo y avisar en plazo, pero es un derecho que se puede ejercer.',
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
              El seguro de vida vinculado a la hipoteca es, con diferencia, el producto donde más
              dinero de más pagan mis clientes sin darse cuenta. No porque el seguro sea malo —muchas
              veces tener uno es sensato—, sino porque el que ofrece el banco suele costar el doble que
              uno equivalente contratado por tu cuenta, y encima se presenta como si fuera obligatorio.
              Ni es obligatorio, ni tienes por qué contratarlo con el banco. Te explico cómo funciona y
              cómo no pagar de más.
            </p>

            <h2 id="obligatorio">Lo primero: no es obligatorio</h2>
            <p>
              La ley <strong>no obliga</strong> a contratar un seguro de vida para firmar una hipoteca.
              El único seguro obligatorio ligado a una hipoteca es el de daños del inmueble (el seguro
              de hogar en su cobertura de continente). El de vida es una <strong>vinculación
              comercial</strong>: el banco te ofrece una bonificación en el tipo de interés a cambio de
              contratarlo, y a veces lo cuela en la conversación como si sin él no hubiera hipoteca. No
              es así.
            </p>
            <p>
              Entender esta diferencia entre lo obligatorio y lo vinculado es la base de todo. Es una de
              las cosas que cambió la Ley 5/2019 para proteger al cliente, y la resumo en el artículo
              sobre{' '}
              <a href="/blog/ley-5-2019-explicada-para-el-cliente">
                la Ley 5/2019 explicada para el cliente
              </a>{' '}
              y en la página de <a href="/como-funciona-ley-5-2019">cómo funciona la Ley 5/2019</a>.
            </p>

            <h2 id="por-que-cuesta-mas">Por qué el seguro del banco suele costar el doble</h2>
            <p>
              El banco no es una aseguradora: actúa como mediador y cobra una comisión por colocarte la
              póliza de su compañía asociada. Esa comisión la pagas tú, dentro de la prima. A eso se
              suma la modalidad de pago, que es donde está la trampa más cara:
            </p>
            <ul>
              <li>
                <strong>Prima anual:</strong> pagas cada año y la prima suele subir con la edad, así
                que el coste crece con el tiempo.
              </li>
              <li>
                <strong>Prima única financiada:</strong> pagas todo de golpe al principio y, muy a
                menudo, el banco lo suma al importe del préstamo. Resultado: pagas la prima{' '}
                <strong>y</strong> los intereses de la hipoteca sobre esa prima durante años. Es la
                fórmula que más encarece el coste total y la que más veo firmar sin leer.
              </li>
            </ul>
            <p>
              Por el mismo capital asegurado y coberturas equivalentes, una póliza contratada
              directamente con una aseguradora suele salir bastante más barata que la del banco. No es
              raro ver diferencias que, sumadas a lo largo de la vida del préstamo, se cuentan en miles
              de euros.
            </p>

            <h2 id="ley-5-2019">Qué dice la Ley 5/2019: tu derecho a la póliza alternativa</h2>
            <p>
              Aquí está tu escudo legal. El{' '}
              <a
                href="https://www.boe.es/buscar/act.php?id=BOE-A-2019-3814"
                target="_blank"
                rel="noopener noreferrer"
              >
                artículo 17 de la Ley 5/2019
              </a>{' '}
              regula las ventas vinculadas y combinadas. En lo que te importa:
            </p>
            <ul>
              <li>
                El banco debe <strong>aceptar pólizas alternativas</strong> de otro proveedor siempre
                que ofrezcan condiciones y un nivel de cobertura <strong>equivalentes</strong> a las
                que él exige.
              </li>
              <li>
                El banco <strong>no puede cobrarte</strong> por examinar o aceptar esa póliza
                alternativa.
              </li>
              <li>
                Puede seguir ofreciéndote una bonificación en el tipo por contratar sus productos, pero
                no imponerte su seguro como condición para conceder el préstamo.
              </li>
            </ul>
            <p>
              Traducido: puedes llevar tu propio seguro de vida, más barato, y el banco tiene que
              aceptarlo si cubre lo mismo. Verifica la redacción vigente del artículo antes de negociar,
              porque es tu mejor argumento en la mesa.
            </p>

            <h2 id="calcular">Cómo calcular si compensa desvincularlo</h2>
            <p>
              Aquí está el error habitual: mirar solo el precio del seguro. La cuenta correcta compara{' '}
              <strong>dos costes anuales</strong>:
            </p>
            <ol>
              <li>
                <strong>Opción A — seguro del banco:</strong> tipo de interés bonificado + prima cara
                del banco.
              </li>
              <li>
                <strong>Opción B — seguro por tu cuenta:</strong> tipo de interés sin esa bonificación
                (más alto) + prima barata de otra aseguradora.
              </li>
            </ol>
            <p>
              La pregunta no es "¿cuál seguro es más barato?", sino "¿qué me cuesta más al año en total:
              el sobreprecio de la póliza del banco, o la subida del tipo por no contratarla?". A veces
              gana la A y a veces la B; depende del importe de la hipoteca, de cuánto suba el tipo el
              banco y de la diferencia de primas.
            </p>
            <p>
              Para hacerlo bien necesitas ver el efecto real sobre la cuota. Puedes montar los dos
              escenarios con la{' '}
              <a href="/calculadora-seguro-vida-hipoteca">
                calculadora de seguro de vida de la hipoteca
              </a>
              , que compara el coste total con y sin la bonificación, y contrastarlo con la{' '}
              <a href="/calculadora-hipoteca">calculadora de hipoteca</a> para ver cómo cambia la cuota
              al mover el tipo. Con los dos números delante, la decisión deja de ser una intuición y
              pasa a ser aritmética.
            </p>

            <h2 id="estrategia">Mi recomendación práctica</h2>
            <ul>
              <li>
                <strong>Compara siempre.</strong> Antes de firmar, pide presupuesto de al menos una
                aseguradora ajena al banco por el mismo capital y coberturas.
              </li>
              <li>
                <strong>Huye de la prima única financiada</strong> salvo que hayas hecho el número: es
                la fórmula que más encarece el coste total.
              </li>
              <li>
                <strong>Puedes firmar ahora y cambiar después.</strong> Si por comodidad contratas el
                del banco al firmar, tienes derecho a sustituirlo más adelante por uno equivalente más
                barato, respetando los plazos de renovación. Muchos clientes hacen justo esto.
              </li>
              <li>
                <strong>Cuidado con perder la bonificación entera.</strong> A veces el seguro va en un
                paquete con la cuenta, la tarjeta o los recibos. Mira qué parte de la bonificación
                depende de qué producto antes de renunciar a uno.
              </li>
            </ul>
            <p>
              Y una reflexión de fondo: un seguro de vida bien dimensionado no es un enemigo. Si tienes
              pareja, hijos o avalistas, que la hipoteca no caiga sobre ellos si te pasa algo es
              sensato. El problema no es tener seguro; es pagar el doble por él sin saberlo. La misma
              lógica de comparar antes de firmar aplica a decidir el{' '}
              <a href="/blog/hipoteca-fija-variable-o-mixta">tipo de hipoteca</a> o a valorar una{' '}
              <a href="/blog/subrogacion-de-hipoteca-cuando-compensa">subrogación</a>.
            </p>

            <h2 id="cierre">Cierre</h2>
            <p>
              El seguro de vida vinculado a la hipoteca ni es obligatorio ni tiene por qué contratarse
              con el banco. La Ley 5/2019 te da derecho a llevar una póliza alternativa equivalente y
              prohíbe que te cobren por examinarla. La decisión correcta sale de comparar el coste total
              anual de las dos opciones —seguro del banco con tipo bonificado frente a seguro externo
              con tipo sin bonificar—, no de mirar solo el precio de la prima. Haz ese cálculo con la{' '}
              <a href="/calculadora-seguro-vida-hipoteca">calculadora de seguro de vida</a> antes de
              firmar. Y si quieres, lo revisamos juntos: negociar bien esta parte de la vinculación es,
              muchas veces, de lo que más dinero ahorra en toda la hipoteca.
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
            ¿Quieres negociar tu hipoteca sin pagar de más en vinculaciones?
          </h2>
          <p className="text-paper/80 text-lg mb-8 max-w-prose mx-auto">
            Reviso tu oferta y te digo qué vinculaciones compensan y cuáles no, seguro de vida
            incluido. Primera llamada gratis y sin compromiso.
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
