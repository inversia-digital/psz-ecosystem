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

const SLUG = 'contrato-arras-penitenciales'
const URL = `${SITE_URLS.psz}/blog/${SLUG}`
const post = getPostBySlug(SLUG)!

export const metadata: Metadata = {
  title: 'Contrato de arras penitenciales: cómo te protege',
  description:
    'Qué son las arras penitenciales, en qué se diferencian de otras arras, cómo te protegen antes de la hipoteca y los errores más comunes que veo cada semana.',
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
    question: '¿Qué pasa si yo, comprador, me echo atrás tras firmar arras penitenciales?',
    answer:
      'En arras penitenciales, el comprador puede desistir libremente perdiendo la cantidad entregada como arras (normalmente el 10% del precio). No tienes que justificar el motivo y el vendedor no puede obligarte a continuar. Es el precio de la libertad de desistir sin batalla judicial.',
  },
  {
    question: '¿Y si el vendedor se echa atrás después de firmar arras penitenciales?',
    answer:
      'El vendedor también puede desistir, pero está obligado a devolverte la cantidad recibida DUPLICADA. Es decir, si entregaste 20.000 € como arras, el vendedor que se eche atrás te devuelve 40.000 €. La asimetría está pensada para desincentivar el desistimiento por parte del vendedor cuando aparece un comprador con mejor oferta.',
  },
  {
    question: '¿Cuánto se entrega normalmente como arras?',
    answer:
      'Lo más habitual en España es el 10% del precio de compraventa, aunque es negociable entre las partes. He visto arras desde el 5% hasta el 15%. Mi recomendación: que la cuantía sea suficiente para que ambas partes se tomen en serio el acuerdo (10% suele ser el equilibrio) pero no tan alta que se vuelva insostenible si tienes que desistir.',
  },
  {
    question: '¿Tengo que firmar arras antes de tener la hipoteca aprobada?',
    answer:
      'No es obligatorio, pero es la práctica habitual. El comprador firma arras para "reservar" el inmueble mientras gestiona la hipoteca. La protección está en redactar el contrato con una cláusula que te permita recuperar las arras (o no perderlas) si el banco rechaza la financiación por causas no imputables a ti. Esa cláusula es crítica y la mayoría de modelos genéricos no la incluyen bien redactada.',
  },
  {
    question: '¿Las arras se cuentan como parte del precio o son adicionales?',
    answer:
      'Se cuentan como parte del precio. Si las arras son 20.000 € sobre un precio total de 200.000 €, en la firma ante notario abonarás los 180.000 € restantes (más impuestos y gastos). Las arras son un anticipo del precio, no un cargo adicional.',
  },
  {
    question: '¿Es lo mismo "señal" que "arras"?',
    answer:
      'En la práctica popular se usan como sinónimos, pero jurídicamente no son lo mismo. La "señal" o "reserva" suele ser una cantidad pequeña (1.000-3.000 €) que reserva el inmueble unos días mientras se firman las arras formales. Las arras son el contrato real con efectos jurídicos plenos. Una señal sin contrato escrito no te protege apenas; las arras con contrato bien redactado, sí.',
  },
] as const

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
      <JsonLd data={faqPageSchema([...FAQ_ITEMS])} />

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
              Antes de firmar la hipoteca, casi todos los compradores firman un papel que se llama
              "arras" o "señal". La mayoría lo firma con una idea vaga de lo que está aceptando, y
              cuando algo se tuerce —y a veces se tuerce— descubren que firmar ese papel sin
              entenderlo cuesta caro.
            </p>
            <p>
              Las arras penitenciales son el tipo más habitual y, bien diseñadas, son una de las
              mejores protecciones que tienes en el camino entre el "sí, este piso es para mí" y la
              firma ante notario. Esta guía explica qué son, qué tipos existen, cómo te protegen y
              los tres errores que veo cada semana.
            </p>

            <h2 id="que-son">Qué son las arras penitenciales</h2>
            <p>
              Las arras penitenciales son un contrato privado entre comprador y vendedor por el que
              ambos se comprometen a la compraventa de un inmueble en un plazo determinado, con la
              entrega de una cantidad por parte del comprador como garantía del compromiso.
              Reguladas en el artículo 1454 del Código Civil, su característica clave es que{' '}
              <strong>cualquiera de las dos partes puede desistir</strong> pagando un coste pactado:
            </p>
            <ul>
              <li>Si <strong>desiste el comprador</strong>: pierde la cantidad entregada como arras.</li>
              <li>Si <strong>desiste el vendedor</strong>: debe devolver la cantidad recibida duplicada.</li>
            </ul>
            <p>
              Esta asimetría es deliberada: incentiva que ambas partes mantengan el compromiso y
              ofrece una salida ordenada si algo cambia (ascenso laboral en otra ciudad, problema
              familiar, oferta mejor del vendedor para él, lo que sea).
            </p>

            <h2 id="tipos">Los tres tipos de arras (importante)</h2>
            <p>
              El Código Civil reconoce tres tipos de arras y se diferencian en sus consecuencias.
              Que el contrato diga "arras" no significa nada por sí solo — lo importante es el
              clausulado:
            </p>
            <p>
              <strong>1. Arras confirmatorias (art. 1454 CC, en su acepción tradicional).</strong>{' '}
              Son una entrega que confirma el contrato y se imputa al precio. Si una parte
              incumple, la otra puede exigir el cumplimiento forzoso del contrato o resolverlo con
              indemnización de daños. <strong>No permiten desistir libremente</strong>. Son las
              "menos protectoras" para quien quiere flexibilidad.
            </p>
            <p>
              <strong>2. Arras penales.</strong> Establecen una indemnización predeterminada en caso
              de incumplimiento. Como las confirmatorias, no permiten desistir libremente, pero al
              menos fijan de antemano cuánto se cobra/paga si se rompe el contrato.
            </p>
            <p>
              <strong>3. Arras penitenciales (art. 1454 CC clásico).</strong> Permiten desistir
              libremente a cualquiera de las partes, con el coste pactado (perder la entrega para
              el comprador, devolverla duplicada para el vendedor). <strong>Son las más
              protectoras</strong> y las que recomiendo casi siempre, salvo casos muy concretos.
            </p>
            <p>
              <strong>Cuidado:</strong> si el contrato dice solo "arras" sin especificar, la
              jurisprudencia suele interpretarlas como confirmatorias (las menos protectoras). Hay
              que dejar escrito expresamente "arras penitenciales conforme al artículo 1454 del
              Código Civil".
            </p>

            <h2 id="por-que-importa">Por qué importa especialmente antes de la hipoteca</h2>
            <p>
              El comprador típico firma arras cuando encuentra el piso que le gusta, antes de que
              la hipoteca esté aprobada formalmente. El razonamiento es: "reservo el inmueble para
              que no se lo lleven mientras gestiono la financiación". Tiene sentido, pero abre un
              riesgo enorme: <strong>¿qué pasa si el banco te rechaza la hipoteca?</strong>
            </p>
            <p>
              Sin una cláusula específica que te proteja en ese supuesto, perderías las arras (10%
              del precio típicamente — entre 20.000 € y 50.000 € en operaciones medias) por una
              decisión que no depende de ti. La cláusula correcta es la "<strong>condición
              suspensiva de financiación</strong>": establece que si el banco rechaza la
              financiación por causas no imputables al comprador, el contrato queda sin efecto y
              las arras se devuelven íntegras.
            </p>
            <p>
              Esta cláusula está MAL redactada en la mayoría de modelos genéricos descargados de
              internet. Las plantillas la incluyen pero no especifican:
            </p>
            <ul>
              <li>Cuántas entidades hay que probar antes de declarar imposible la financiación (recomendado: mínimo 3).</li>
              <li>Qué se considera "causa no imputable al comprador" (la lista debe ser precisa, no genérica).</li>
              <li>El plazo para acreditar las gestiones (típico: 30-45 días).</li>
              <li>Cómo se acreditan los rechazos (carta del banco, no email genérico).</li>
            </ul>

            <h2 id="errores">Los tres errores más frecuentes</h2>
            <p>
              <strong>Error 1: firmar "arras" sin especificar el tipo.</strong> Si el contrato no
              dice expresamente "arras penitenciales art. 1454 CC", quedas en zona gris. La
              jurisprudencia tiende a interpretarlo como arras confirmatorias y pierdes la
              flexibilidad de desistir.
            </p>
            <p>
              <strong>Error 2: aceptar plazos demasiado cortos.</strong> El plazo entre firma de
              arras y firma ante notario debe ser realista para conseguir la hipoteca: mínimo
              45-60 días en una operación estándar, 60-90 si el perfil es complejo. Plazos
              inferiores te exponen a que se acabe el tiempo sin financiación y pierdas las arras
              "por culpa tuya" técnicamente.
            </p>
            <p>
              <strong>Error 3: confundir señal/reserva con arras.</strong> Una "señal" o "reserva"
              entregada en efectivo a un agente inmobiliario sin contrato firmado no es legalmente
              una arras. Si el vendedor se echa atrás, no podrás reclamar el duplicado; solo la
              devolución de la cantidad entregada. Antes de entregar dinero, exige contrato firmado
              entre comprador y vendedor (no agente intermediario).
            </p>

            <h2 id="checklist">Checklist mínimo del contrato de arras</h2>
            <p>Si te pasan un contrato de arras para firmar, verifica que incluya:</p>
            <ul>
              <li>✓ Identificación completa de comprador, vendedor e inmueble (referencia catastral).</li>
              <li>✓ Precio total de compraventa y cantidad de las arras (con porcentaje sobre el total).</li>
              <li>✓ Mención expresa: "arras penitenciales conforme al artículo 1454 del Código Civil".</li>
              <li>✓ Plazo para la firma ante notario (45-90 días según complejidad).</li>
              <li>✓ Cláusula de condición suspensiva por no obtención de financiación bancaria, con detalle de qué se considera "rechazo".</li>
              <li>✓ Reparto de gastos posteriores (ITP, AJD, notaría, registro).</li>
              <li>✓ Situación cargas del inmueble (hipotecas previas, embargos) y compromiso de levantarlas antes de la firma.</li>
              <li>✓ Pacto sobre el destino de las arras en caso de que se cumpla el contrato (imputarse al precio).</li>
            </ul>

            <h2 id="mi-rol">Mi rol como broker hipotecario en este momento</h2>
            <p>
              Aunque mi trabajo principal es la negociación con el banco, en muchas operaciones
              acabo revisando también el contrato de arras antes de que el cliente lo firme. Las
              razones son tres:
            </p>
            <ul>
              <li>
                Detecto cláusulas que dañan al cliente sin que se dé cuenta (plazos cortos, falta
                de condición suspensiva, arras "confirmatorias" disfrazadas).
              </li>
              <li>
                Adapto el plazo de las arras al perfil real de la operación que voy a presentar al
                banco (perfiles complejos necesitan más tiempo).
              </li>
              <li>
                Coordino fechas con la notaría y la entidad financiera para que todo cuadre.
              </li>
            </ul>
            <p>
              Si necesitas que te revise un contrato de arras antes de firmarlo, dímelo en la
              primera videollamada. No es un servicio que cobre por separado cuando ya me has
              contratado para la hipoteca — es parte del paquete.
            </p>
          </article>
        </Container>
      </Section>

      {/* FAQ */}
      <Section tone="soft" padding="md" title="Preguntas frecuentes">
        <Container size="md">
          <Faq items={[...FAQ_ITEMS]} />
        </Container>
      </Section>

      {/* CTA */}
      <Section tone="navy" padding="lg">
        <Container size="md" className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-paper mb-4">
            ¿Tienes un contrato de arras delante y no estás seguro?
          </h2>
          <p className="text-paper/80 text-lg mb-8 max-w-prose mx-auto">
            Pásamelo en la primera llamada gratis. Te digo qué está bien, qué hay que mejorar y si
            la operación es viable con la financiación que necesitas.
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
            <Button href="/broker-hipotecario" variant="primary" size="lg">
              Cómo trabajo
            </Button>
          </div>
        </Container>
      </Section>
    </main>
  )
}
