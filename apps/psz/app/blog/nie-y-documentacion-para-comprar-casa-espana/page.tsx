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

const SLUG = 'nie-y-documentacion-para-comprar-casa-espana'
const URL = `${SITE_URLS.psz}/blog/${SLUG}`
const post = getPostBySlug(SLUG)!

export const metadata: Metadata = {
  title: 'NIE y documentación para comprar casa en España',
  description:
    'Qué es el NIE, cómo obtenerlo dentro y fuera de España y qué documentos —traducidos y apostillados— necesita un extranjero para comprar e hipotecar una vivienda.',
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
    question: '¿Qué es exactamente el NIE y para qué sirve?',
    answer:
      'El NIE (Número de Identidad de Extranjero) es el número de identificación fiscal que España asigna a cualquier extranjero que tenga relaciones económicas, profesionales o sociales en el país. No es un permiso de residencia: es un identificador. Sin NIE no puedes abrir cuenta bancaria, firmar una compraventa, formalizar una hipoteca ni pagar los impuestos de la compra.',
  },
  {
    question: '¿Puedo pedir el NIE desde mi país o tengo que viajar a España?',
    answer:
      'Puedes solicitarlo de dos formas: en el consulado o embajada de España de tu país de residencia, o en España en una Oficina de Extranjería o comisaría de Policía Nacional con cita previa. También puede tramitarlo un representante con un poder notarial en tu nombre. El plazo depende sobre todo de la disponibilidad de cita, que varía mucho según la oficina.',
  },
  {
    question: '¿El NIE caduca?',
    answer:
      'El número de NIE en sí es permanente y no cambia. Lo que puede caducar es el documento físico o el certificado que lo acredita cuando se emite con una vigencia determinada; en ese caso se renueva el documento, pero el número te acompaña siempre. Para la compra, lo importante es tener el número asignado y un justificante en vigor.',
  },
  {
    question: '¿Qué documentos de mi país tengo que traducir y apostillar?',
    answer:
      'Como regla general, los documentos que no estén en español y que el banco o el notario necesiten valorar —justificantes de ingresos, declaraciones de impuestos, certificados de solvencia— suelen requerir traducción jurada y, en muchos casos, apostilla de La Haya para acreditar su autenticidad. Conviene confirmar con la entidad y el notario qué documentos concretos exigen antes de traducirlo todo.',
  },
  {
    question: '¿Necesito abogado para conseguir el NIE y comprar?',
    answer:
      'No es obligatorio, pero para un no residente suele compensar. Un abogado o gestor puede tramitar el NIE mediante poder, revisar el contrato de arras y la escritura, y coordinar la documentación con el banco y el notario. En operaciones a distancia es especialmente útil, ya que puede firmar en tu nombre con un poder notarial.',
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
              Si eres extranjero y quieres comprar en España, hay un trámite que decide el ritmo de
              toda la operación: el NIE. No es el más difícil, pero sí el que más gente subestima, y
              cuando llega tarde bloquea todo lo demás —la cuenta, la hipoteca, la firma—. En este
              artículo te explico qué es, cómo conseguirlo dentro y fuera de España y qué otros
              documentos vas a necesitar para que el banco y el notario digan que sí.
            </p>
            <p>
              Soy broker hipotecario registrado en el Banco de España (número <strong>E242</strong>) y
              esta es la documentación que preparo con los compradores no residentes antes incluso de
              buscar piso.
            </p>

            <h2 id="que-es-nie">Qué es el NIE (y qué no es)</h2>
            <p>
              El <strong>NIE (Número de Identidad de Extranjero)</strong> es el número de
              identificación fiscal que España asigna a cualquier extranjero con intereses
              económicos, profesionales o sociales en el país. Es un <strong>identificador</strong>,
              no un permiso de residencia: tener NIE no significa que puedas vivir en España, y vivir
              en España no depende de comprar una casa. Son cosas distintas que conviene no mezclar.
            </p>
            <p>
              Para comprar, el NIE es imprescindible porque lo necesitas para:
            </p>
            <ul>
              <li>Abrir una cuenta bancaria.</li>
              <li>Firmar el contrato de arras y la escritura de compraventa.</li>
              <li>Formalizar la hipoteca.</li>
              <li>Pagar los impuestos de la compra y declarar como no residente.</li>
            </ul>
            <p>
              En resumen: sin NIE no hay operación. Por eso, en la secuencia completa que ordeno en{' '}
              <a href="/blog/comprar-vivienda-en-espana-siendo-extranjero">
                comprar vivienda en España siendo extranjero
              </a>
              , el NIE es siempre el primer paso.
            </p>

            <h2 id="como-obtener">Cómo obtener el NIE: las tres vías</h2>
            <p>Tienes tres caminos, y elegir bien te ahorra semanas:</p>
            <p>
              <strong>1. En el consulado o embajada de España de tu país.</strong> Es la vía más
              cómoda si aún no estás en España. Pides cita, presentas el formulario oficial
              (modelo EX-15), tu pasaporte y el justificante del motivo económico (por ejemplo, que
              vas a comprar una vivienda). El consulado tramita la asignación del número.
            </p>
            <p>
              <strong>2. En España, presencialmente.</strong> En una Oficina de Extranjería o
              comisaría de Policía Nacional habilitada, con cita previa. Aquí el cuello de botella es
              la disponibilidad de cita, que en algunas zonas turísticas va muy justa.
            </p>
            <p>
              <strong>3. Mediante representante con poder notarial.</strong> Puedes autorizar a un
              abogado o gestor en España para que solicite el NIE en tu nombre. Es la opción estrella
              para operaciones a distancia, porque ese mismo poder puede servir luego para firmar la
              compraventa sin que viajes.
            </p>
            <p>
              La información oficial y los formularios actualizados están en los portales del{' '}
              <a
                href="https://www.exteriores.gob.es/es/Paginas/index.aspx"
                target="_blank"
                rel="noopener noreferrer"
              >
                Ministerio de Asuntos Exteriores
              </a>{' '}
              y del{' '}
              <a
                href="https://www.inclusion.gob.es/web/migraciones/extranjeria"
                target="_blank"
                rel="noopener noreferrer"
              >
                portal de Extranjería
              </a>
              . Como los requisitos y las tasas se actualizan, conviene{' '}
              <strong>verificar las condiciones vigentes</strong> antes de pedir la cita.
            </p>

            <h2 id="documentacion">La documentación para comprar e hipotecar</h2>
            <p>
              Con el NIE en marcha, el banco necesita entender tu solvencia sin acceso a las fuentes
              españolas habituales. Esta es la documentación que suele pedirse a un comprador
              extranjero o no residente:
            </p>
            <ul>
              <li><strong>NIE y pasaporte</strong> (o documento de identidad del país de origen) en vigor.</li>
              <li>
                <strong>Justificantes de ingresos</strong>: nóminas y contrato laboral si eres
                empleado; cuentas anuales y declaraciones de impuestos si eres autónomo o
                empresario.
              </li>
              <li><strong>Declaración de la renta</strong> de tu país (los dos últimos ejercicios).</li>
              <li><strong>Extractos bancarios</strong> recientes que muestren ingresos y ahorro.</li>
              <li>
                <strong>Certificado de solvencia o informe de deudas</strong> de tu país (el
                equivalente a la CIRBE española).
              </li>
              <li><strong>Certificado de no residencia</strong>, útil para abrir la cuenta bancaria.</li>
            </ul>
            <p>
              Cómo pesa cada uno de estos documentos en la decisión del banco, y hasta qué porcentaje
              financian a un no residente, lo detallo en{' '}
              <a href="/blog/hipoteca-para-no-residentes-espana">
                hipoteca para no residentes en España
              </a>
              . Tienes además el marco completo del producto en la página de{' '}
              <a href="/hipoteca-no-residentes">hipoteca para no residentes</a>.
            </p>

            <h2 id="traduccion-apostilla">Traducción jurada y apostilla: el paso que retrasa</h2>
            <p>
              Aquí está el detalle que más plazos alarga. Cuando un documento no está en español, el
              banco o el notario suelen exigir <strong>traducción jurada</strong> (hecha por un
              traductor oficial reconocido) y, en muchos casos, <strong>apostilla de La Haya</strong>
              {' '}sobre el documento original para acreditar su autenticidad ante las autoridades
              españolas.
            </p>
            <p>
              La apostilla se tramita en tu país, no en España, y puede llevar días o semanas. Mi
              recomendación práctica: pregunta primero al banco y al notario qué documentos concretos
              te van a exigir traducidos y apostillados, y solo entonces lánzalo. Traducir de más es
              tirar dinero; traducir de menos es frenar la firma.
            </p>

            <h2 id="poder-notarial">El poder notarial: comprar sin viajar</h2>
            <p>
              Si no puedes o no quieres estar en España para cada trámite, el <strong>poder
              notarial</strong> lo resuelve. Firmas ante notario en tu país un poder que autoriza a
              alguien de confianza —a menudo tu abogado— a actuar en tu nombre: solicitar el NIE,
              abrir la cuenta, firmar las arras, la compraventa y la hipoteca. El poder se apostilla y
              se traduce, y con él muchas operaciones de no residentes se cierran íntegramente a
              distancia.
            </p>

            <h2 id="errores">Errores que veo repetirse</h2>
            <ul>
              <li>
                <strong>Dejar el NIE para el final.</strong> Es lento por las citas; empezarlo tarde
                bloquea todo lo demás.
              </li>
              <li>
                <strong>Traducir sin preguntar.</strong> Traducir y apostillar documentos que luego
                nadie pide es gastar tiempo y dinero para nada.
              </li>
              <li>
                <strong>Confundir NIE con residencia.</strong> Ni el NIE ni comprar una casa dan
                derecho a residir: recuerda que el Golden Visa por inversión inmobiliaria se eliminó
                en España en 2025.
              </li>
              <li>
                <strong>Presentar los ingresos desordenados.</strong> La financiación a no residentes
                se gana con documentación impecable; el desorden se traduce en "no".
              </li>
            </ul>

            <h2 id="cierre">Cierre</h2>
            <p>
              El NIE y la documentación no son la parte glamurosa de comprar una casa, pero son la que
              decide si la operación avanza o se atasca. Empieza por el NIE, pregunta qué documentos
              te exigen antes de traducir nada y, si estás lejos, apóyate en un poder notarial. Con
              eso, el resto del proceso fluye.
            </p>
            <p>
              Si estás preparando una compra desde el extranjero, cuéntame tu caso. Te digo qué
              documentación necesita tu perfil concreto y coordino con el banco para que no te falte
              ni te sobre nada. Trabajo con registro <strong>E242</strong> verificable; puedes ver
              cómo lo hago en{' '}
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
            ¿Preparas tu documentación para comprar en España?
          </h2>
          <p className="text-paper/80 text-lg mb-8 max-w-prose mx-auto">
            Primera llamada gratis. Reviso qué documentos necesita tu perfil, te ordeno el NIE y la
            financiación, y coordino con el banco para que la firma no se atasque.
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
