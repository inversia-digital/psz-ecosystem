import type { Metadata } from 'next'
import {
  SITE_URLS,
  TONO,
  breadcrumbSchema,
  speakableWebPageSchema,
} from '@psz/seo'
import { Container, JsonLd, Section } from '@psz/ui'
import { AnswerCard } from '../_components/AnswerCard'
import HonorariosModal from '../_components/HonorariosModal'

const URL = `${SITE_URLS.psz}/tarifas-y-comisiones`

export const metadata: Metadata = {
  title: 'Tarifas y comisiones · Toño Palacios broker hipotecario E242',
  description:
    'Publicación oficial de tarifas y comisiones de Inversia Global Digital S.L. (Toño Palacios, broker E242 y presidente de ANICI) para los servicios de intermediación hipotecaria y Personal Shopper Inmobiliario. Conforme a Orden EHA/2899/2011 y Ley 5/2019.',
  alternates: { canonical: URL },
  robots: { index: true, follow: true },
  authors: [{ name: TONO.fullName, url: `${SITE_URLS.psz}/sobre-mi` }],
  openGraph: {
    type: 'article',
    url: URL,
    title: 'Tarifas y comisiones · Toño Palacios',
    description: 'Tarifa pública de intermediación hipotecaria y Personal Shopper Inmobiliario.',
    locale: 'es_ES',
  },
}

export default function Page() {
  return (
    <main>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Inicio', url: SITE_URLS.psz },
          { name: 'Tarifas y comisiones', url: URL },
        ])}
      />
      <JsonLd
        data={speakableWebPageSchema({
          url: URL,
          name: 'Tarifas y comisiones — Toño Palacios broker hipotecario',
          description: 'Tarifa pública de intermediación hipotecaria y Personal Shopper Inmobiliario conforme a Orden EHA/2899/2011 y Ley 5/2019.',
          cssSelectors: ['h1', '.speakable-summary'],
        })}
      />
      <Section tone="paper" padding="md" title="Tarifas y comisiones">
        <Container size="md">
          <AnswerCard question="¿Cuánto cobra Toño Palacios como broker hipotecario?">
            Reserva inicial de 600 € al firmar el contrato de intermediación y honorarios a éxito
            de entre tres mil y cuatro mil quinientos euros al cierre de la operación, según
            complejidad. Servicio exento de IVA (Ley 37/1992 art. 20.1.18º). Tarifa publicada
            conforme a la Orden EHA/2899/2011 y la Ley 5/2019.
          </AnswerCard>
          <div className="prose-psz">
            <p>
              En cumplimiento de las obligaciones de transparencia previstas en la Orden
              EHA/2899/2011 de transparencia y protección del cliente de servicios bancarios y en
              el artículo 14 de la Ley 5/2019, de 15 de marzo, reguladora de los contratos de
              crédito inmobiliario, INVERSIA GLOBAL DIGITAL, S.L.U. publica las tarifas máximas
              aplicables a sus servicios de intermediación de crédito inmobiliario y servicios
              accesorios.
            </p>
            <p>
              Estas tarifas tienen carácter <strong>máximo</strong>. En operaciones concretas pueden
              aplicarse importes inferiores en función de la complejidad, el importe y el perfil
              del cliente. El importe definitivo se acuerda por escrito antes del inicio del
              servicio y queda reflejado en el contrato de intermediación firmado por ambas partes.
            </p>

            <h2>1. Servicio de intermediación hipotecaria</h2>
            <p>
              Comprende el estudio del expediente, la elaboración del dossier ejecutivo, la
              presentación simultánea a entidades financieras, la negociación de condiciones, la
              coordinación de tasación, la revisión de la Ficha Europea de Información
              Normalizada (FEIN) y, cuando proceda, el acompañamiento a la firma en notaría.
            </p>
            <ul>
              <li>
                <strong>Reserva profesional al firmar el contrato de intermediación:</strong>{' '}
                600 € (importe fijo). Cubre el inicio del trabajo. Devolución íntegra
                si el prestador no consigue la hipoteca por causa imputable a él.
              </li>
              <li>
                <strong>Honorarios a éxito al firmar la hipoteca:</strong> entre tres mil y cuatro
                mil quinientos euros, según complejidad del caso, importe financiado, número de
                entidades a negociar y garantías adicionales.
              </li>
              <li>
                <strong>Régimen fiscal:</strong> servicio exento de IVA conforme al artículo
                20.1.18º de la Ley 37/1992 del Impuesto sobre el Valor Añadido.
              </li>
              <li>
                <strong>Cláusula de éxito:</strong> los honorarios a éxito solo se devengan si la
                operación finaliza con la firma del contrato hipotecario. En caso contrario, no se
                cobra cantidad alguna por ese tramo.
              </li>
            </ul>

            <div className="not-prose my-6">
              <HonorariosModal />
            </div>

            <h2>2. Servicio de Personal Shopper Inmobiliario (PSI)</h2>
            <p>
              Comprende la localización y selección de oportunidades inmobiliarias, el análisis de
              rentabilidad, la negociación de la operación de compraventa, la coordinación con
              tasadora, notaría, gestoría y, cuando proceda, la integración con el servicio de
              intermediación hipotecaria.
            </p>
            <ul>
              <li>
                <strong>Honorarios:</strong> desde cuatro mil euros más IVA al tipo general
                aplicable (actualmente 21%).
              </li>
              <li>
                Las condiciones específicas se acuerdan por escrito antes del inicio del servicio,
                en función de la zona, el importe objetivo de inversión y el alcance de la
                búsqueda.
              </li>
              <li>
                <strong>Período de protección de honorarios:</strong> doce (12) meses desde la
                presentación del inmueble por parte del prestador, durante los cuales el cliente
                no podrá adquirirlo eludiendo el contrato de intermediación.
              </li>
            </ul>

            <h2>3. Diseño de estructuras societarias</h2>
            <p>
              Servicio especializado de asesoramiento en estructuras societarias nacionales
              (sociedades operativas y holdings) e internacionales. Los honorarios se acuerdan
              <strong> caso por caso</strong> en función de la complejidad de la estructura, el
              número de sociedades constituidas, las aportaciones no dinerarias implicadas y el
              alcance del acompañamiento posterior.
            </p>
            <p>
              La primera videoconsulta es <strong>gratuita y sin compromiso</strong>. Al final de
              la misma, se entrega un presupuesto orientativo por escrito específico para cada
              caso.
            </p>

            <h2>4. Gastos de terceros (no incluidos)</h2>
            <p>
              Las tarifas anteriores corresponden exclusivamente a la prestación profesional del
              titular. No incluyen los gastos de terceros derivados de la operación, que son por
              cuenta del cliente y, cuando proceda, se anticipan a éste para su abono directo:
            </p>
            <ul>
              <li>Tasación del inmueble.</li>
              <li>Gastos notariales y registrales (escritura, AJD, inscripción).</li>
              <li>Gestoría administrativa.</li>
              <li>Comisiones bancarias (apertura, estudio).</li>
              <li>Seguros exigidos por la entidad financiera.</li>
              <li>Cualquier impuesto, tasa o tributo aplicable a la operación.</li>
            </ul>

            <h2>5. Formas de pago</h2>
            <p>
              Todos los pagos se realizan mediante transferencia bancaria a la cuenta titularidad
              de Inversia Global Digital S.L. indicada en el contrato. No se aceptan pagos en
              efectivo por importes superiores a 1.000 € (Ley 11/2021 de medidas de prevención y
              lucha contra el fraude fiscal).
            </p>

            <h2>6. Reembolsos</h2>
            <p>
              La reserva profesional abonada en el momento de la firma del contrato de
              intermediación se reembolsa íntegramente al cliente <strong>si el prestador no
              consigue la financiación por causa imputable a él</strong>. No procede reembolso
              cuando la causa de no finalización es imputable al cliente (desistimiento, retirada
              de documentación, modificación sustancial del perfil financiero durante el
              proceso, etc.) o a terceros (rechazo de las entidades por motivos objetivos).
            </p>

            <h2>7. Modificaciones de tarifas</h2>
            <p>
              Las presentes tarifas pueden ser modificadas. Las modificaciones surten efecto desde
              su publicación en este sitio web y se aplican exclusivamente a operaciones cuyo
              contrato de intermediación se firme después de dicha publicación. Las operaciones
              en curso mantienen las tarifas vigentes en el momento de la firma del contrato.
            </p>

            <p className="text-sm text-ink-muted mt-12">
              Última actualización: mayo de 2026. Estas tarifas se publican en cumplimiento de la
              Orden EHA/2899/2011 y la Ley 5/2019.
            </p>
          </div>
        </Container>
      </Section>
    </main>
  )
}
