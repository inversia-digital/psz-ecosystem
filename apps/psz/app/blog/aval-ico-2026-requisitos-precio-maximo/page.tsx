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
import { Button, Container, Faq, JsonLd, Section, TelegramCta } from '@psz/ui'
import { getPostBySlug, isLive } from '../_posts'

export const revalidate = 21600

const SLUG = 'aval-ico-2026-requisitos-precio-maximo'
const URL = `${SITE_URLS.psz}/blog/${SLUG}`
const post = getPostBySlug(SLUG)!

export const metadata: Metadata = {
  title: 'Aval ICO 2026: requisitos, precio máximo por comunidad y errores que lo tumban',
  description:
    'La línea de avales ICO reactivada en 2026, explicada con la letra pequeña: residencia legal, 150.000 € de patrimonio, ingresos por provincia, precio máximo por comunidad, aval del 20 o 25 %, hasta el 31-12-2027 y los diez detalles que tumban un expediente.',
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

const PRECIOS: [string, string][] = [
  ['Comunidad de Madrid', '325.000 €'],
  ['Cataluña, Navarra y País Vasco', '300.000 €'],
  ['Aragón e Illes Balears', '275.000 €'],
  ['Asturias, Canarias, Cantabria, Castilla y León, Castilla-La Mancha, Comunitat Valenciana, Galicia, Región de Murcia, La Rioja, Ceuta y Melilla', '250.000 €'],
  ['Andalucía', '225.000 €'],
  ['Extremadura', '200.000 €'],
]

const FAQ_ITEMS = [
  {
    question: '¿Cuáles son los requisitos del aval ICO en 2026?',
    answer:
      'Tener como máximo 35 años (o cualquier edad si tienes menores a cargo), residencia legal en España durante los dos años anteriores de forma continuada, un patrimonio neto de hasta 150.000 € por comprador, ingresos por debajo del límite fijado para tu provincia, no haber sido propietario de otra vivienda, que sea tu vivienda habitual y que el precio no supere el máximo de tu comunidad autónoma. Como máximo dos compradores, y los dos deben cumplir.',
  },
  {
    question: '¿Cuánto avala el Estado y hasta cuándo?',
    answer:
      'El 20 % del préstamo, o el 25 % si la vivienda tiene certificado energético D o mejor. El aval dura los diez primeros años de la hipoteca. Las hipotecas se pueden formalizar hasta el 31 de diciembre de 2027 o hasta que se agoten los fondos.',
  },
  {
    question: '¿Cuál es el precio máximo de la vivienda con aval ICO?',
    answer:
      'Depende de la comunidad autónoma: 325.000 € en Madrid; 300.000 € en Cataluña, Navarra y País Vasco; 275.000 € en Aragón y Baleares; 225.000 € en Andalucía; 200.000 € en Extremadura; y 250.000 € en el resto. Se comprueba sobre el precio de compraventa sin impuestos ni gastos.',
  },
  {
    question: '¿El aval ICO financia el 100 %?',
    answer:
      'Permite financiar hasta el 100 % del menor entre el precio de compra y el valor de tasación. Los impuestos y gastos de la compra no entran, así que hay que tenerlos ahorrados. Y cada banco aplica sus propios límites: algunos no pasan del 95 % de la tasación aunque la línea lo permita.',
  },
  {
    question: '¿Puedo combinar el aval ICO con la ayuda de mi comunidad autónoma?',
    answer:
      'No. La línea estatal es incompatible con otros avales públicos sobre la misma hipoteca. Hay que elegir el programa que mejor encaje con tu perfil y con la vivienda, y eso conviene decidirlo antes de firmar las arras.',
  },
  {
    question: '¿Por qué mi banco dice que no tiene el aval ICO?',
    answer:
      'Porque la adhesión es voluntaria y cada entidad decide cuándo lo activa, con qué condiciones y en qué oficinas. Durante el primer semestre de 2026 la línea estuvo parada a la espera de la renovación, y desde su reactivación solo una parte de las entidades la tiene operativa. Si tu banco no lo trabaja, hay que ir a uno que sí.',
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
            {' · '}Datos verificados en la fuente oficial del ICO a septiembre de 2026
          </p>
        </Container>
      </Section>

      <Section tone="paper" padding="md">
        <Container size="md">
          <article className="prose-psz">
            <p className="text-lg">
              El aval ICO es la ayuda pública que más hipotecas de primera vivienda desbloquea en
              España, y también la que más expedientes tumba por un detalle de la letra pequeña. En
              2026 la línea se paró de enero a junio, se reactivó con requisitos nuevos y cada banco
              la aplica a su manera. Esto es lo que hay que saber, con los datos oficiales y con lo
              que veo en los expedientes que gestiono como broker registrado en el Banco de España.
            </p>

            <h2 id="que-es">Qué es exactamente el aval ICO</h2>
            <p>
              No es dinero que recibes. Es una garantía del Estado, a través del Instituto de
              Crédito Oficial, que cubre ante el banco el <strong>20 % del préstamo</strong>, o el{' '}
              <strong>25 % si la vivienda tiene certificado energético D o mejor</strong>. Con esa
              garantía el banco puede financiar hasta el <strong>100 % del menor entre el precio
              de compra y el valor de tasación</strong>, en vez del 80 % habitual. El aval dura los
              diez primeros años de la hipoteca y no tiene coste directo para ti.
            </p>
            <p>
              Lo que no cubre son los <strong>impuestos y gastos</strong> de la compra (ITP o IVA,
              notaría, registro, gestoría, tasación). Eso sigue saliendo de tu bolsillo: entre un 10
              y un 12 % del precio según la comunidad. Lo desgloso en{' '}
              <a href="/blog/gastos-de-comprar-vivienda-por-comunidad">gastos de comprar vivienda por
              comunidad</a>.
            </p>

            <h2 id="requisitos">Los requisitos de 2026, uno a uno</h2>
            <ul>
              <li>
                <strong>Edad:</strong> hasta 35 años. Si tienes menores a cargo, no hay límite de
                edad. Y ojo: <strong>solo cuentan los menores de 18 años</strong>; un hijo de 19 que
                vive contigo no te convierte en beneficiario.
              </li>
              <li>
                <strong>Residencia:</strong> residencia <strong>legal</strong> en España durante los
                dos años anteriores a la solicitud, de forma continua e ininterrumpida. No hace
                falta nacionalidad española ni comunitaria: con NIE y dos años de residencia legal
                se puede. Se acredita con el certificado de empadronamiento con fecha de alta.
              </li>
              <li>
                <strong>Patrimonio:</strong> hasta <strong>150.000 € netos por comprador</strong>.
                Este límite subió con la reactivación de 2026; antes era de 100.000 €.
              </li>
              <li>
                <strong>Ingresos:</strong> desde el 19 de junio de 2026 el límite{' '}
                <strong>ya no es único para toda España</strong>: hay una tabla por provincia,
                expresada en múltiplos del IPREM. Se suma 0,3 veces el IPREM por cada menor a cargo
                y un 70 % más si la familia es monoparental. Son ingresos brutos.
              </li>
              <li>
                <strong>Primera vivienda:</strong> no haber sido propietario de otra vivienda. Debe
                ser tu vivienda habitual y no puedes ejercer en ella una actividad económica.
              </li>
              <li>
                <strong>Compradores:</strong> como máximo dos, y{' '}
                <strong>los dos tienen que cumplir</strong> todos los requisitos. Los compradores
                deben ser los mismos que los deudores de la hipoteca.
              </li>
              <li>
                <strong>Precio:</strong> por debajo del máximo fijado para tu comunidad (tabla más
                abajo).
              </li>
              <li>
                <strong>Solvencia:</strong> sin incidencias en la central de riesgos y al corriente
                con Hacienda y la Seguridad Social.
              </li>
              <li>
                <strong>Plazo:</strong> la hipoteca tiene que formalizarse antes del{' '}
                <strong>31 de diciembre de 2027</strong>, o antes si se agotan los fondos.
              </li>
              <li>
                <strong>Incompatibilidad:</strong> el aval ICO{' '}
                <strong>no se puede combinar con otros avales públicos</strong> sobre la misma
                hipoteca. Si tu comunidad tiene su propio programa, hay que elegir.
              </li>
            </ul>

            <h2 id="precio-maximo">Precio máximo de la vivienda por comunidad</h2>
            <p>
              Es el filtro que más gente descubre tarde. Se aplica sobre el precio de compraventa sin
              impuestos ni gastos:
            </p>
            <div className="overflow-x-auto">
              <table>
                <thead>
                  <tr>
                    <th>Comunidad autónoma</th>
                    <th>Precio máximo</th>
                  </tr>
                </thead>
                <tbody>
                  {PRECIOS.map(([ccaa, precio]) => (
                    <tr key={ccaa}>
                      <td>{ccaa}</td>
                      <td>
                        <strong>{precio}</strong>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p>
              <small>
                Tabla vigente a septiembre de 2026. Los importes los fija la convocatoria y pueden
                cambiar: antes de firmar unas arras contando con el aval, compruébalo en{' '}
                <a href="https://www.ico.es/" target="_blank" rel="noopener noreferrer">
                  ico.es
                </a>{' '}
                o pregúntame.
              </small>
            </p>

            <h2 id="tumban">Los diez detalles que tumban un expediente con aval ICO</h2>
            <p>
              Todos son reales. Los he visto caer, en expedientes míos o de compañeros, por cada uno
              de ellos:
            </p>
            <ol>
              <li>
                <strong>La tasación no acompaña al precio.</strong> El importe se calcula sobre el
                menor entre precio y tasación. Si la tasación sale por debajo, el 100 % es del
                valor tasado, no del precio, y el hueco lo pones tú. Y si sale muy por encima,
                tampoco te da más: algunas entidades incluso lo miran con lupa.
              </li>
              <li>
                <strong>Compra uno y firman dos.</strong> Los compradores y los deudores tienen que
                coincidir. Si compra ella sola y la hipoteca la firman los dos, no hay aval.
              </li>
              <li>
                <strong>Un hijo que ya tiene 18 años.</strong> Solo cuentan los menores. Un
                documento que circulaba lo contaba mal; la respuesta del propio ICO es esa.
              </li>
              <li>
                <strong>Contrato temporal.</strong> La línea no lo prohíbe, pero los bancos apenas
                lo miran. Con un contrato temporal la conversación suele acabar antes de empezar.
              </li>
              <li>
                <strong>Residencia fiscal en vez de residencia legal.</strong> Lo que pide la
                línea es residencia legal continuada. Presentar solo la declaración de la renta no
                acredita los dos años; el padrón con fecha de alta sí.
              </li>
              <li>
                <strong>Autopromoción.</strong> Construirte tu casa no entra. Obra nueva comprada a
                un promotor, sí.
              </li>
              <li>
                <strong>Rústico.</strong> Depende de la entidad y del inmueble. Con urbanización
                alrededor, suministros y accesos hay bancos que lo aceptan; una parcela con un
                cortijo por legalizar, no.
              </li>
              <li>
                <strong>Vivienda habitual que deja de serlo.</strong> Alquilarla a los dos años sin
                justificarlo puede tener consecuencias. Es un aval para vivir, no para invertir.
              </li>
              <li>
                <strong>Contar el aval como si fuera dinero.</strong> Los gastos siguen siendo
                tuyos. Un expediente con el aval aprobado y sin los 20.000 € de impuestos y
                gastos no llega a notaría.
              </li>
              <li>
                <strong>Elegir el banco equivocado.</strong> La adhesión es voluntaria, la línea
                estuvo parada medio año y hoy solo una parte de las entidades la tiene operativa, y
                cambia de mes en mes. Presentar el expediente a un banco que no la trabaja es perder
                semanas.
              </li>
            </ol>

            <h2 id="documentacion">Qué documentación te van a pedir</h2>
            <ul>
              <li>DNI, NIE o pasaporte y certificado de empadronamiento con fecha de inicio de la residencia.</li>
              <li>Libro de familia, certificado de pareja de hecho o partida de nacimiento de los menores, si aplica.</li>
              <li>Certificado negativo del Catastro o nota del servicio de índices del Registro (que no tienes otra vivienda).</li>
              <li>Certificado de eficiencia energética de la vivienda, anterior a la compra: decide si el aval es del 20 o del 25 %.</li>
              <li>Tasación oficial.</li>
              <li>Última declaración de la renta o certificado negativo de la Agencia Tributaria, y autorización para que se consulte durante la vida del préstamo.</li>
              <li>Certificados de estar al corriente con Hacienda y con la Seguridad Social.</li>
            </ul>

            <h2 id="trucos">Cuatro cosas legítimas que conviene saber</h2>
            <ul>
              <li>
                <strong>Si en la pareja uno cumple y el otro no</strong>, la solución habitual es
                que compre y firme el que cumple, y el otro entre como avalista. Si estáis casados en
                gananciales, hacen falta capitulaciones matrimoniales, que cuestan poco más de cien
                euros en notaría.
              </li>
              <li>
                <strong>El certificado energético vale dinero.</strong> Con calificación A, B, C o
                D el aval sube del 20 al 25 %. Si la vivienda está en el límite, un certificado
                hecho antes de la compra puede cambiar la operación.
              </li>
              <li>
                <strong>Con NIE, hazte cliente del banco antes de pedir nada.</strong> Muchas
                entidades no estudian el expediente de un no nacional que no tiene cuenta abierta en
                una oficina.
              </li>
              <li>
                <strong>El aval se puede mejorar después.</strong> Firmar con avalista o con
                condiciones mediocres para cerrar la compra y, pasado un año de cuotas al día,
                estudiar una subrogación a otra entidad es una estrategia legal y frecuente. Lo
                explico en{' '}
                <a href="/blog/subrogacion-de-hipoteca-cuando-compensa">cuándo compensa subrogar la
                hipoteca</a>.
              </li>
            </ul>

            <h2 id="cronologia">Por qué a veces «no está»: la cronología de la línea</h2>
            <p>
              La línea nació en 2024 y se ha ido renovando. En 2026 estuvo{' '}
              <strong>parada de enero a junio</strong>: la renovación se aprobó, pero los bancos no
              podían enviar expedientes hasta que se firmaran las adendas y se publicaran los
              precios máximos por comunidad. Desde la reactivación de junio, con los requisitos
              nuevos, cada entidad decide cuándo la activa y en qué condiciones. Por eso una
              hipoteca con aval ICO tarda más que una normal (tres o cuatro meses no es raro) y por
              eso conviene no prometer nada al vendedor hasta tener confirmado que la entidad la
              tiene operativa.
            </p>

            <h2 id="cierre">En resumen</h2>
            <p>
              El aval ICO de 2026 es más generoso en patrimonio y más ajustado en precio y en
              ingresos según dónde compres. Funciona muy bien para quien tiene ingresos estables,
              dos años de residencia legal, los gastos ahorrados y una vivienda por debajo del tope
              de su comunidad. Falla por los detalles: la tasación, quién compra y quién firma, la
              edad de los hijos, la residencia mal acreditada y el banco que no lo trabaja. Mi
              trabajo es que ninguno de esos diez detalles te pille en notaría.
            </p>
          </article>

          <TelegramCta className="mt-10" />
        </Container>
      </Section>

      <Section tone="soft" padding="md" title="Preguntas frecuentes sobre el aval ICO 2026">
        <Container size="md">
          <Faq items={FAQ_ITEMS} />
        </Container>
      </Section>

      <Section tone="navy" padding="lg">
        <Container size="md" className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-paper mb-4">
            ¿Encajas en el aval ICO? Lo comprobamos con tus números
          </h2>
          <p className="text-paper/80 text-lg mb-8 max-w-prose mx-auto">
            Reviso los requisitos con tu caso real y te digo qué entidades tienen la línea operativa
            en el momento de tu operación, no las que salieron en prensa.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button href={MORTGAGE_FORM_URL} variant="gold" size="lg" target="_blank" rel="noopener noreferrer">
              Solicitar mi hipoteca →
            </Button>
            <Button href="/hipoteca-primera-vivienda" variant="primary" size="lg">
              Hipoteca de primera vivienda
            </Button>
          </div>
        </Container>
      </Section>
    </main>
  )
}
