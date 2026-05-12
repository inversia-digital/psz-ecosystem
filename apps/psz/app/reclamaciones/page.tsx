import type { Metadata } from 'next'
import { INVERSIA, SITE_URLS } from '@psz/seo'
import { Container, Section } from '@psz/ui'

export const metadata: Metadata = {
  title: 'Reclamaciones · Servicio de atención al cliente',
  description:
    'Procedimiento para presentar quejas o reclamaciones ante Inversia Global Digital S.L., con remisión al Servicio de Reclamaciones del Banco de España en caso de no resolución.',
  alternates: { canonical: `${SITE_URLS.psz}/reclamaciones` },
  robots: { index: true, follow: true },
}

export default function Page() {
  return (
    <main>
      <Section tone="paper" padding="md" title="Reclamaciones">
        <Container size="md">
          <div className="prose-psz">
            <p>
              En INVERSIA GLOBAL DIGITAL, S.L.U. cuidamos cada operación con el máximo rigor
              profesional. Si pese a ello consideras que algún servicio prestado no se ajusta a
              lo contratado, tienes derecho a presentar una queja o reclamación. Esta página
              describe el procedimiento y los plazos.
            </p>

            <h2>1. Presentación de la reclamación ante el responsable</h2>
            <p>
              La primera vía es siempre la directa con el prestador del servicio. Toda
              reclamación debe presentarse por escrito al correo electrónico:
            </p>
            <p>
              <strong>reclamaciones@inversiadigital.es</strong>
            </p>
            <p>O, alternativamente, a la dirección postal:</p>
            <p>
              INVERSIA GLOBAL DIGITAL, S.L.U.
              <br />
              Departamento de Atención al Cliente
              <br />
              {INVERSIA.address.street}
              <br />
              {INVERSIA.address.postalCode} {INVERSIA.address.city}, {INVERSIA.address.region}
              <br />
              España
            </p>
            <p>La reclamación debe contener, como mínimo:</p>
            <ul>
              <li>Identificación del reclamante (nombre completo, DNI/NIE, dirección, correo, teléfono).</li>
              <li>Identificación del servicio o contrato al que se refiere la reclamación.</li>
              <li>Hechos motivo de la reclamación, con la mayor concreción posible.</li>
              <li>Pretensión concreta (qué se solicita).</li>
              <li>Indicación de que no se ha sometido la cuestión a un órgano administrativo, arbitral o judicial.</li>
            </ul>

            <h2>2. Plazo de respuesta</h2>
            <p>
              El prestador acusará recibo de la reclamación en un plazo máximo de <strong>diez (10)
              días hábiles</strong> y responderá de forma motivada en un plazo máximo de{' '}
              <strong>dos (2) meses</strong> desde la fecha de presentación, conforme a lo previsto
              en la Orden ECC/2502/2012 y normativa concordante. La respuesta se enviará por la
              misma vía utilizada para presentar la reclamación, salvo que el reclamante indique
              expresamente otra preferencia.
            </p>

            <h2>3. Reclamación ante el Banco de España</h2>
            <p>
              Si transcurridos los dos (2) meses no se hubiera recibido respuesta, o si la
              respuesta recibida no es satisfactoria para el reclamante, este puede presentar su
              reclamación ante el Servicio de Reclamaciones del Banco de España, organismo
              supervisor de los intermediarios de crédito inmobiliario.
            </p>
            <ul>
              <li>
                <strong>Web:</strong>{' '}
                <a
                  href="https://clientebancario.bde.es"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  clientebancario.bde.es
                </a>
              </li>
              <li>
                <strong>Trámite online:</strong>{' '}
                <a
                  href="https://sedeelectronica.bde.es"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  sedeelectronica.bde.es
                </a>{' '}
                — apartado de reclamaciones de servicios financieros
              </li>
              <li>
                <strong>Dirección postal:</strong> Servicio de Reclamaciones del Banco de España ·
                C/ Alcalá, 48 · 28014 Madrid
              </li>
            </ul>
            <p>
              La reclamación ante el Banco de España requiere haber agotado previamente la
              reclamación ante el prestador. El Banco de España emite informes motivados sobre la
              actuación profesional pero, salvo casos concretos, no resuelve la controversia con
              efectos vinculantes (las partes pueden continuar la vía judicial).
            </p>

            <h2>4. Mediación civil previa al ejercicio de acciones judiciales</h2>
            <p>
              Conforme a lo previsto en los contratos firmados con el prestador, y antes del
              ejercicio de cualquier acción judicial, las partes se comprometen a intentar
              resolver la controversia mediante <strong>mediación civil ante un mediador
              certificado en Zaragoza</strong>, conforme a la Ley 5/2012 de mediación en asuntos
              civiles y mercantiles. Si en el plazo de treinta (30) días naturales desde la
              solicitud escrita de mediación no se alcanzara acuerdo, cualquiera de las partes
              podrá acudir a los Juzgados y Tribunales competentes.
            </p>

            <h2>5. Protección de datos en el procedimiento de reclamación</h2>
            <p>
              Los datos personales facilitados durante el procedimiento de reclamación serán
              tratados conforme a la{' '}
              <a href="/politica-privacidad">Política de Privacidad</a> del responsable y
              exclusivamente para la gestión de la reclamación, sin cesión a terceros salvo
              obligación legal.
            </p>

            <h2>6. Conservación de la documentación</h2>
            <p>
              El prestador conserva la documentación relativa a reclamaciones y su tramitación
              durante un plazo mínimo de <strong>cinco (5) años</strong> desde la fecha de
              resolución, conforme a lo previsto en la normativa de prevención del blanqueo de
              capitales (Ley 10/2010) y demás normativa aplicable.
            </p>

            <p className="text-sm text-ink-muted mt-12">
              Última actualización: mayo de 2026.
            </p>
          </div>
        </Container>
      </Section>
    </main>
  )
}
