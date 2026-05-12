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

const SLUG = 'como-verificar-broker-hipotecario-banco-de-espana'
const URL = `${SITE_URLS.psz}/blog/${SLUG}`
const post = getPostBySlug(SLUG)!

export const metadata: Metadata = {
  title: 'Cómo verificar un broker hipotecario en Banco de España',
  description:
    'Guía paso a paso para comprobar si tu broker hipotecario está autorizado por el Banco de España. Verificación oficial, banderas rojas y mi caso E242.',
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
    question: '¿Es lo mismo broker hipotecario que intermediario de crédito inmobiliario?',
    answer:
      'Sí. La Ley 5/2019 usa el término oficial "intermediario de crédito inmobiliario". "Broker hipotecario" es la denominación comercial habitual del mismo profesional. Cualquier persona o empresa que ofrezca servicios de intermediación hipotecaria tiene que estar inscrita en el registro del Banco de España con el mismo procedimiento, independientemente de cómo se autodenomine comercialmente.',
  },
  {
    question: '¿Cuántos brokers hipotecarios están registrados en España?',
    answer:
      'El número exacto fluctúa según altas y bajas, pero a fecha de 2026 hay varios cientos de intermediarios registrados con número Exxx (ámbito estatal) y algunas decenas con ámbito autonómico. La cifra puede consultarse en el registro público actualizado en tiempo real desde la sede electrónica del Banco de España.',
  },
  {
    question: '¿Puedo verificar a un asesor que trabaja dentro de un banco?',
    answer:
      'No de la misma forma. Los asesores que trabajan dentro de la oficina de un banco (empleados directos) no necesitan estar en el registro de intermediarios — están bajo otra supervisión bancaria. La normativa de intermediarios solo aplica a profesionales externos al banco que intermedian con varias entidades. Si tu interlocutor es empleado del banco, no esperes encontrarlo en este registro.',
  },
  {
    question: '¿Qué hago si mi broker está registrado en una comunidad y yo vivo en otra?',
    answer:
      'Un intermediario inscrito solo en una comunidad autónoma no puede operar legalmente fuera de ella. Si vives en otra comunidad, busca un intermediario con inscripción estatal (número Exxx) o pide al broker autonómico que demuestre algún tipo de convenio con un intermediario estatal. En la práctica, lo más limpio es elegir uno con ámbito nacional.',
  },
  {
    question: '¿El número de registro caduca?',
    answer:
      'La inscripción no caduca, pero el intermediario puede causar baja por incumplimiento, renuncia o por no renovar el seguro de responsabilidad civil profesional. Por eso vale la pena verificar el estado actualizado del registro, no fiarse de un número que viste hace dos años.',
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
              Hoy contratar una hipoteca tiene dos partes: la negociación con el banco y, cada vez
              más a menudo, un intermediario que la gestiona en nombre del cliente. Esa figura — el
              broker hipotecario o intermediario de crédito inmobiliario — está regulada por la Ley
              5/2019, y operar sin la autorización correspondiente es ilegal. La buena noticia es
              que verificar si tu broker es legal es público, gratuito y se hace en cinco minutos.
            </p>
            <p>
              Esta guía te explica los cuatro pasos para comprobarlo. Al final, te enseño cómo
              verificar mi propio número (<strong>E242</strong>) para que veas el proceso completo
              aplicado a un caso real.
            </p>

            <h2 id="la-regulacion">La regulación: por qué los brokers tienen que estar registrados</h2>
            <p>
              La{' '}
              <a
                href="https://www.boe.es/buscar/act.php?id=BOE-A-2019-3814"
                target="_blank"
                rel="noopener noreferrer"
              >
                Ley 5/2019, de 15 de marzo, reguladora de los contratos de crédito inmobiliario
              </a>
              , transpuso al ordenamiento español la Directiva 2014/17/UE. Antes de esta ley,
              cualquiera podía llamarse "broker hipotecario" y captar clientes sin más requisitos
              que la voluntad de hacerlo. Desde 2019, la actividad está restringida a profesionales:
            </p>
            <ul>
              <li>Inscritos en el Registro de Intermediarios de Crédito Inmobiliario del Banco de España.</li>
              <li>Con seguro de responsabilidad civil profesional obligatorio.</li>
              <li>Con formación específica acreditada (los cursos LCCI están homologados).</li>
              <li>Sometidos a códigos de conducta y normas de comportamiento concretas.</li>
            </ul>
            <p>
              El registro lo gestiona el Banco de España y es público. Cualquier ciudadano puede
              consultarlo gratis y comprobar si un intermediario o una empresa están autorizados. Si
              no aparecen, no son legales y la operación está fuera de la regulación.
            </p>
            <p>
              <strong>
                Si alguien te dice "yo gestiono hipotecas" sin poder mostrarte su número de
                registro, no es broker hipotecario. Es otra cosa.
              </strong>
            </p>

            <h2 id="paso-1">Paso 1 — Consulta el registro oficial del Banco de España</h2>
            <p>
              <strong>Dónde:</strong> la sede electrónica del Banco de España, sección de registros
              oficiales.
            </p>
            <p>
              <strong>URL directa:</strong>{' '}
              <a
                href="https://app.bde.es/cgi/cgi/registroPublic"
                target="_blank"
                rel="noopener noreferrer"
              >
                app.bde.es/cgi/cgi/registroPublic
              </a>
              {' '}(también accesible desde sedeelectronica.bde.es → Registros → "Intermediarios de
              crédito inmobiliario").
            </p>
            <p>
              <strong>Qué hacer:</strong>
            </p>
            <ol>
              <li>
                Selecciona el tipo de registro: "Intermediarios de crédito inmobiliario y prestamistas
                inmobiliarios".
              </li>
              <li>
                Introduce el dato que tengas: nombre de la persona física, razón social de la
                empresa, o número de registro.
              </li>
              <li>Pulsa "Buscar".</li>
            </ol>
            <p>
              El sistema te devuelve un listado con los profesionales o empresas que coinciden. Para
              cada uno verás:
            </p>
            <ul>
              <li>Nombre completo o razón social.</li>
              <li>Número de inscripción (formato Exxx para intermediarios estatales).</li>
              <li>Tipo de inscripción y comunidad autónoma desde la que opera.</li>
              <li>Si hay representantes designados.</li>
            </ul>
            <p>
              <strong>Qué buscar:</strong> que coincida el nombre o la empresa que te ofrece
              servicios; que el número de registro esté activo; que el ámbito territorial cubra
              donde tú vas a operar (si la inscripción es solo autonómica, no puede operar en otras
              comunidades).
            </p>
            <p>
              Si la persona o empresa no aparece, <strong>no está registrada</strong> y por tanto no
              puede ejercer legalmente como intermediario de crédito inmobiliario.
            </p>

            <h2 id="paso-2">Paso 2 — Comprueba la asociación profesional</h2>
            <p>
              El registro del Banco de España garantiza la legalidad. La pertenencia a una asociación
              profesional reconocida añade un nivel extra de garantía: códigos deontológicos
              propios, formación continua exigida, defensa frente a malas prácticas y representación
              institucional ante el regulador.
            </p>
            <p>
              En España, la asociación nacional del sector es{' '}
              <a href={SITE_URLS.anici} target="_blank" rel="noopener noreferrer">
                ANICI
              </a>
              {' '}(Asociación Nacional de Intermediarios en Crédito Inmobiliario). Sus asociados
              están comprometidos con un código de conducta que va más allá del mínimo legal.
            </p>
            <p>Para comprobar si un broker está asociado a ANICI:</p>
            <ol>
              <li>
                Entra en{' '}
                <a href={SITE_URLS.anici} target="_blank" rel="noopener noreferrer">
                  anici.es
                </a>{' '}
                → sección "Verificador" o "Asociados".
              </li>
              <li>Consulta por nombre o número de asociado.</li>
              <li>Confirma que aparece como asociado activo.</li>
            </ol>
            <p>
              Si un broker no pertenece a ninguna asociación, no es ilegal — pero pierde una capa de
              auto-regulación que un cliente debería valorar.
            </p>

            <h2 id="paso-3">Paso 3 — Identifica las banderas rojas</h2>
            <p>
              A partir de los dos pasos anteriores, ya tienes el dato oficial. Pero antes incluso de
              buscar en el registro, hay señales claras de que algo no encaja:
            </p>
            <p>
              🚩 <strong>No publica su número de registro BdE en la web.</strong> Si un broker no
              muestra su número en home/footer/contacto, sospecha. Los profesionales registrados
              están orgullosos de su número, lo enseñan voluntariamente.
            </p>
            <p>
              🚩 <strong>No identifica la empresa operativa.</strong> La normativa exige razón
              social, CIF y dirección física. Si una web vende "asesoría hipotecaria" sin mostrar
              quién está detrás (empresa, CIF, dirección), no es transparente.
            </p>
            <p>
              🚩 <strong>Garantiza la aprobación del banco.</strong> Ningún broker puede garantizar
              que un banco te apruebe — la decisión es del banco. Quien lo "garantiza" miente o
              cobra por adelantado.
            </p>
            <p>
              🚩 <strong>Sin oficina física ni equipo identificable.</strong> Una web sin nombres,
              sin caras, sin LinkedIn ni redes sociales públicas es un riesgo. El sector financiero
              es de reputación: quien la tiene, la enseña.
            </p>
            <p>
              🚩 <strong>Solo WhatsApp como canal.</strong> Falta de email corporativo, falta de
              números fijos, falta de presencia profesional indica una operación informal —
              incompatible con la responsabilidad civil profesional exigida.
            </p>
            <p>
              Si encuentras cualquiera de estas banderas, <strong>no pases del primer paso</strong>.
              Si encuentras dos o más, es muy probable que estés frente a una operación no regulada.
            </p>

            <h2 id="paso-4">Paso 4 — Aplica la guía a un caso real (el mío)</h2>
            <p>Aplico la guía a mí mismo para que veas el proceso completo:</p>
            <ol>
              <li>
                <strong>Registro BdE:</strong> mi número es <strong>E242</strong>. Si entras en{' '}
                <a
                  href="https://app.bde.es/cgi/cgi/registroPublic"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  app.bde.es/cgi/cgi/registroPublic
                </a>
                , seleccionas "Intermediarios de crédito inmobiliario" y escribes "E242", aparece
                mi inscripción: Inversia Global Digital S.L., ámbito estatal.
              </li>
              <li>
                <strong>Asociación:</strong> soy presidente de{' '}
                <a href={SITE_URLS.anici} target="_blank" rel="noopener noreferrer">
                  ANICI
                </a>{' '}
                y socio fundador (número ANICI-001). Público y verificable en la web de la
                asociación.
              </li>
              <li>
                <strong>Empresa operativa:</strong> Inversia Global Digital S.L. — CIF B75281394,
                Polígono Alcoz Alto 21, 50410 Cuarte de Huerva (Zaragoza). Inscrita en el Registro
                Mercantil.
              </li>
              <li>
                <strong>Modelo reserva + éxito:</strong> al firmar el contrato de intermediación se
                abona una reserva profesional de seiscientos euros (compromiso real de ambas partes);
                el resto de honorarios solo se cobra cuando firmas la hipoteca. Si no consigo la
                hipoteca por causa imputable a mí, la reserva se devuelve íntegra. Conoces y firmas
                las cifras antes de empezar.
              </li>
              <li>
                <strong>Equipo identificable:</strong> yo, Lucía Toro (analista) e Irene Vidal
                (jurídico). Todos asociados ANICI, todos con LinkedIn público.
              </li>
              <li>
                <strong>Cero banderas rojas:</strong> el número está en cada página de psz.es, la
                empresa en cada footer, los honorarios en la página de servicio, sin garantías
                falsas.
              </li>
            </ol>
            <p>
              Verifica tú mismo el proceso. Si el broker que estás evaluando pasa los cuatro pasos,
              está en regla. Si no, busca otro.
            </p>

            <h2 id="que-hacer">Qué hacer si encuentras un broker no registrado</h2>
            <p>
              Si descubres que la persona o empresa que te ha ofrecido servicios de intermediación
              <strong> no está en el registro</strong> del Banco de España:
            </p>
            <ol>
              <li>
                <strong>No firmes nada con ellos.</strong> Cualquier contrato que firmes está fuera
                del marco protector de la Ley 5/2019.
              </li>
              <li>
                <strong>Pide explicaciones por escrito.</strong> Quizá hay un error o están en
                trámite de inscripción. Pero la respuesta debe ser inmediata y verificable.
              </li>
              <li>
                <strong>Denuncia si ya te han cobrado</strong> o si te están reteniendo información
                o dinero. El Banco de España tiene una oficina específica de reclamaciones contra
                intermediarios.
              </li>
              <li>
                <strong>Busca un broker registrado.</strong> La guía anterior te sirve para
                encontrar uno fiable en cinco minutos.
              </li>
            </ol>

            <h2 id="cierre">Cierre</h2>
            <p>
              La transparencia regulatoria es la base de la confianza en el sector hipotecario.
              Verificar la legalidad de tu broker es un derecho, no una desconfianza. Si trabajas
              con un broker registrado, asociado a la asociación nacional, con empresa operativa
              transparente y honorarios a éxito, has cubierto el 95% del riesgo previo a contratar.
            </p>
            <p>
              Si tienes dudas sobre un broker concreto, te invito a verificar en los enlaces que te
              he dado en cada paso. Si lo prefieres, puedes contar conmigo: mi número es{' '}
              <strong>E242</strong> y puedes comprobarlo en cualquier momento.
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
            ¿Quieres trabajar con un broker registrado y verificable?
          </h2>
          <p className="text-paper/80 text-lg mb-8 max-w-prose mx-auto">
            Primera llamada gratis. Te digo si tu caso es viable y a qué bancos podemos presentarlo.
            Sin compromiso, sin coste, sin presión.
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
