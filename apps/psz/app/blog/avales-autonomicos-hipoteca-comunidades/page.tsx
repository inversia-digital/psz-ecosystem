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

const SLUG = 'avales-autonomicos-hipoteca-comunidades'
const URL = `${SITE_URLS.psz}/blog/${SLUG}`
const post = getPostBySlug(SLUG)!

export const metadata: Metadata = {
  title: 'Avales autonómicos para comprar vivienda: los siete programas, explicados',
  description:
    'Comunitat Valenciana (IVF), Madrid, Cataluña (ICF), Andalucía, Castilla y León, Murcia y País Vasco tienen su propio aval para llegar al 95-100 % de la hipoteca. Edad, precio máximo, qué permite cada uno, sus trampas y cómo se combinan con el aval ICO.',
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

const PROGRAMAS = [
  {
    nombre: 'Comunitat Valenciana · aval del IVF',
    quien: 'Compradores de hasta 45 años (el límite más alto de España), sin otra vivienda, con residencia en la Comunitat y para vivienda habitual. Sirve para obra nueva, segunda mano y vivienda protegida.',
    permite: 'Aval del 20 % que permite llegar al 100 % del precio. Sin el límite de ingresos del ICO, aunque el banco sigue exigiendo capacidad de pago.',
    ojo: 'Es el programa más generoso y el que más entidades trabajan. La tasación tiene que llegar al precio, y algunas entidades solo lo dan en hipoteca mixta, no a tipo fijo.',
  },
  {
    nombre: 'Comunidad de Madrid · «Mi Primera Vivienda»',
    quien: 'Jóvenes (menores de 36 años en la mayoría de entidades, alguna llega a 40), con contrato indefinido o plaza de funcionario y dos años de residencia continuada en la comunidad.',
    permite: 'Financiar el 100 % del menor entre precio y tasación, con un precio máximo de vivienda de 390.000 €.',
    ojo: 'Va por fondos asignados a cada entidad y se han agotado en más de una ocasión: hay meses en los que «no hay» y meses en los que vuelve a funcionar. Se confirma la semana en que se presenta el expediente, no antes.',
  },
  {
    nombre: 'Cataluña · préstamo del ICF',
    quien: 'Jóvenes que compran su primera vivienda habitual en Cataluña.',
    permite: 'La Generalitat presta el 20 % de la entrada en vez de avalarlo; con ese préstamo el banco financia el resto. En la práctica la mayoría de entidades se queda en el 95 %.',
    ojo: 'Es un préstamo que se devuelve, y la vivienda queda sujeta a un régimen de protección con condiciones en futuras ventas. Léelo entero antes de firmar: para muchos compradores compensa más una hipoteca al 90 % con un préstamo personal declarado.',
  },
  {
    nombre: 'Andalucía · garantía de la Junta',
    quien: 'Hasta 40 años, empadronado en Andalucía, sin otra vivienda y con compromiso de vivienda habitual durante al menos dos años.',
    permite: 'Llegar al 95 % del menor entre precio y tasación en la mayoría de entidades, y al 100 % en alguna. Precio máximo en torno a 295.000 €, ampliable si la vivienda es eficiente.',
    ojo: 'Varias entidades lo anuncian como «100 %» y en su parrilla real es un 95 %. Pídelo por escrito antes de contar con ello.',
  },
  {
    nombre: 'Castilla y León · SomaCyL',
    quien: 'Compradores de vivienda habitual en la comunidad, con requisitos de renta.',
    permite: 'Es el programa que más lejos llega: hasta el 97,5 % del precio de compra.',
    ojo: 'La solicitud la hace el propio comprador en la web del programa, no el banco. Si el trámite no está iniciado cuando se pide la hipoteca, la operación se alarga.',
  },
  {
    nombre: 'Región de Murcia · ICREF',
    quien: 'Jóvenes y familias que compran vivienda habitual en la Región.',
    permite: 'Aval autonómico sobre la entrada, con varias entidades adheridas.',
    ojo: 'Convocatoria con fecha de fin (la actual, hasta diciembre de 2026). Comprobar vigencia antes de firmar arras.',
  },
  {
    nombre: 'País Vasco · GazteAval',
    quien: 'Jóvenes que compran su primera vivienda en Euskadi.',
    permite: 'Aval que permite llegar al 100 % en las entidades adheridas.',
    ojo: 'Pocas entidades, casi todas de la plaza. Un comprador de fuera de Euskadi no lo puede usar aunque compre allí.',
  },
]

const FAQ_ITEMS = [
  {
    question: '¿Qué es un aval autonómico para la hipoteca?',
    answer:
      'Es una garantía o un préstamo de la comunidad autónoma que cubre la parte de la entrada que el banco no financia, normalmente el 20 %. Con esa garantía el banco puede prestar el 95 o el 100 % del menor entre precio y tasación. Cada comunidad tiene su programa, con sus requisitos de edad, residencia, precio máximo y entidades adheridas.',
  },
  {
    question: '¿Puedo usar el aval de mi comunidad y el aval ICO a la vez?',
    answer:
      'No sobre la misma hipoteca. La línea estatal del ICO es incompatible con otros avales públicos. Hay que elegir el programa que mejor encaje: por ejemplo, en la Comunitat Valenciana el aval del IVF suele ser mejor opción porque llega hasta los 45 años y no tiene el límite de ingresos del ICO.',
  },
  {
    question: '¿El aval autonómico me garantiza la hipoteca?',
    answer:
      'No. El aval cubre la entrada, pero quien aprueba es el banco, y el banco sigue exigiendo capacidad de pago, estabilidad laboral y una tasación que acompañe al precio. Un aval no convierte en viable una operación que no lo es.',
  },
  {
    question: '¿Qué comunidad tiene el mejor aval para comprar vivienda?',
    answer:
      'Depende del perfil. La Comunitat Valenciana es la más generosa en edad (hasta 45 años) y en ingresos; Castilla y León es la que más porcentaje permite (97,5 %); Madrid tiene el precio máximo más alto (390.000 €) pero se queda sin fondos con frecuencia; Cataluña es la menos atractiva porque es un préstamo con condiciones sobre la vivienda.',
  },
  {
    question: '¿Los avales autonómicos sirven para invertir o para segunda residencia?',
    answer:
      'No. Todos exigen que sea la vivienda habitual del comprador, y varios piden mantenerla como tal durante un tiempo mínimo. Para inversión, las vías son otras: financiación sobre el 70 % o garantías adicionales.',
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
            {' · '}Estado de los programas a septiembre de 2026
          </p>
        </Container>
      </Section>

      <Section tone="paper" padding="md">
        <Container size="md">
          <article className="prose-psz">
            <p className="text-lg">
              Casi todo el mundo conoce el aval ICO. Muy pocos saben que{' '}
              <strong>siete comunidades autónomas tienen su propio programa</strong> para cubrir la
              entrada de la primera vivienda, que en varios casos es mejor que el estatal, y que no
              se pueden combinar entre sí. Elegir bien el aval, antes de firmar las arras, puede
              ser la diferencia entre comprar y no comprar. Aquí están los siete, con lo que
              permiten y con lo que no te cuentan.
            </p>

            <h2 id="como-funcionan">Cómo funcionan (todos igual, con matices)</h2>
            <p>
              El banco financia por norma el 80 % del menor entre el precio y la tasación. El aval
              autonómico cubre el 20 % restante ante el banco, de modo que la entidad puede llegar al
              95 o al 100 %. Tú sigues pagando la hipoteca entera; la comunidad solo responde si tú
              no pagas. Tres reglas que se cumplen en todos los programas:
            </p>
            <ul>
              <li>
                <strong>El aval no sustituye la capacidad de pago.</strong> Quien aprueba es el
                banco, y mira lo mismo de siempre: ingresos, estabilidad, ratio de endeudamiento y
                tasación. Lo explico en{' '}
                <a href="/blog/ratio-de-endeudamiento-hipoteca-como-lo-calcula-el-banco">cómo calcula
                el banco tu ratio de endeudamiento</a>.
              </li>
              <li>
                <strong>Son incompatibles con el aval ICO</strong> sobre la misma hipoteca. Hay que
                elegir.
              </li>
              <li>
                <strong>Los gastos e impuestos no entran.</strong> El 100 % es del precio de la
                vivienda; el ITP, la notaría y el registro salen de tu ahorro.
              </li>
            </ul>

            <h2 id="programas">Los siete programas, uno a uno</h2>
            {PROGRAMAS.map((p) => (
              <div key={p.nombre} className="not-prose mb-6 rounded-xl border border-navy-100 bg-paper-card p-5 shadow-soft">
                <h3 className="text-xl font-semibold text-navy-800 mb-3">{p.nombre}</h3>
                <p className="mb-2 text-ink-soft">
                  <strong className="text-navy-800">Para quién:</strong> {p.quien}
                </p>
                <p className="mb-2 text-ink-soft">
                  <strong className="text-navy-800">Qué permite:</strong> {p.permite}
                </p>
                <p className="text-ink-soft">
                  <strong className="text-navy-800">Ojo:</strong> {p.ojo}
                </p>
              </div>
            ))}
            <p>
              <small>
                Datos a septiembre de 2026. Los programas cambian de convocatoria, de fondos y de
                entidades adheridas varias veces al año. Antes de comprometerte, se verifica con el
                organismo y con la entidad.
              </small>
            </p>

            <BarChart
              title="Hasta dónde llega cada programa (porcentaje máximo del precio, 2026)"
              unit="%"
              max={100}
              data={[
                { label: 'Comunitat Valenciana · IVF', value: 100, highlight: true },
                { label: 'Comunidad de Madrid · Mi Primera Vivienda', value: 100 },
                { label: 'País Vasco · GazteAval', value: 100 },
                { label: 'Castilla y León · SomaCyL', value: 97.5, display: '97,5 %' },
                { label: 'Andalucía · garantía de la Junta', value: 95, display: '95 % (100 % en alguna entidad)' },
                { label: 'Cataluña · préstamo ICF', value: 95, display: '95 % en la práctica' },
                { label: 'Aval ICO (estatal)', value: 100, display: '100 % (tope de precio por comunidad)' },
              ]}
              note="Porcentaje sobre el menor entre precio y tasación. Los gastos e impuestos no entran en ningún programa."
            />

            <BarChart
              title="Edad máxima del comprador en cada programa"
              unit="años"
              max={50}
              data={[
                { label: 'Comunitat Valenciana · IVF', value: 45, highlight: true },
                { label: 'Andalucía · Junta', value: 40 },
                { label: 'Madrid · Mi Primera Vivienda', value: 36, display: '36 (40 en alguna entidad)' },
                { label: 'Aval ICO (sin menores a cargo)', value: 35 },
              ]}
              note="Con menores a cargo, el aval ICO no tiene límite de edad."
            />

            <h2 id="ico-o-autonomico">¿ICO o aval autonómico? Cómo decidirlo</h2>
            <p>
              La decisión es una tabla de dos columnas: lo que tú cumples y lo que la vivienda
              cumple.
            </p>
            <ul>
              <li>
                <strong>Tienes entre 36 y 45 años y compras en la Comunitat Valenciana:</strong> el
                ICO ya no te sirve; el IVF sí.
              </li>
              <li>
                <strong>Tus ingresos superan el límite provincial del ICO:</strong> mira el aval de
                tu comunidad, que en varios casos no tiene ese tope.
              </li>
              <li>
                <strong>La vivienda supera el precio máximo del ICO en tu comunidad</strong> (225.000
                € en Andalucía, 300.000 € en Cataluña, 325.000 € en Madrid): el programa autonómico
                suele tener un tope más alto.
              </li>
              <li>
                <strong>Cumples todo en los dos:</strong> compara las condiciones que te da cada
                entidad con cada aval. El tipo de interés puede ser mejor con uno que con otro, y
                eso a treinta años pesa más que el porcentaje.
              </li>
            </ul>
            <p>
              Los requisitos completos del aval estatal los tienes en{' '}
              <a href="/blog/aval-ico-2026-requisitos-precio-maximo">aval ICO 2026: requisitos,
              precio máximo y errores que lo tumban</a>.
            </p>

            <h2 id="trampas">Las cuatro trampas que veo repetirse</h2>
            <ol>
              <li>
                <strong>«Con el aval me dan el 100 %».</strong> En varios programas, y en varias
                entidades, el producto real es del 95 %. El 5 % restante más los gastos son tuyos.
              </li>
              <li>
                <strong>Firmar arras antes de confirmar fondos.</strong> Programas como el de Madrid
                se agotan y se reactivan. Unas arras firmadas con un aval que ese mes no existe son
                10.000 € en riesgo.
              </li>
              <li>
                <strong>Una tasación por debajo del precio.</strong> Con aval, el banco financia sobre
                el menor de los dos valores. Si la tasación no llega al precio, el aval no lo
                arregla.
              </li>
              <li>
                <strong>No leer las obligaciones posteriores.</strong> Mantener la vivienda como
                habitual varios años, limitaciones en la venta, devolución del préstamo en el caso
                catalán. Son condiciones, no letra pequeña.
              </li>
            </ol>

            <ArticleFaq items={FAQ_ITEMS} />

            <h2 id="cierre">En resumen</h2>
            <p>
              Los avales autonómicos son la vía al 100 % que menos se conoce y, para muchos perfiles,
              la mejor. Cada uno tiene su edad, su precio máximo, sus entidades y sus fondos, y no se
              combinan con el ICO. Mi trabajo es elegir contigo el programa que encaja, confirmar con
              la entidad que lo tiene operativo esa semana y presentar el expediente con la
              tasación y la documentación que el aval exige. Sin sorpresas en notaría.
            </p>
          </article>

          <TelegramCta className="mt-10" />
        </Container>
      </Section>


      <Section tone="navy" padding="lg">
        <Container size="md" className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-paper mb-4">
            ¿Qué aval te conviene? Lo decidimos con tus datos y tu vivienda
          </h2>
          <p className="text-paper/80 text-lg mb-8 max-w-prose mx-auto">
            Comparo el programa de tu comunidad con el aval ICO y te digo cuál encaja y con qué
            entidad, antes de que firmes nada.
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
