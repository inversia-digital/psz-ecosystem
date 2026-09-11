import type { Metadata } from 'next'
import { INVERSIA, SITE_URLS } from '@psz/seo'
import { Container, Section } from '@psz/ui'

const FORM_URL = 'https://inversiadigital.es/reclamaciones/?m=psz'

export const metadata: Metadata = {
  title: 'Atención a la clientela y reclamaciones',
  description:
    'Servicio de Atención a la Clientela de Inversia Global Digital S.L.U. (intermediario de crédito inmobiliario n.º E242 del Banco de España): cómo presentar una queja o reclamación, acuse con clave, plazo de un mes, reglamento y vía ante el Banco de España.',
  alternates: { canonical: `${SITE_URLS.psz}/reclamaciones` },
  robots: { index: true, follow: true },
}

export default function Page() {
  return (
    <main>
      <Section tone="paper" padding="md" title="Atención a la clientela y reclamaciones">
        <Container size="md">
          <div className="prose-psz">
            <p>
              psz.es es el sitio de Toño Palacios, intermediario de crédito inmobiliario que ejerce a
              través de {INVERSIA.legalName}. Este es el Servicio de Atención a la Clientela de la
              entidad, conforme al artículo 29 de la Ley 44/2002, de 22 de noviembre (redacción dada
              por la Ley 10/2025, de 26 de diciembre, de servicios de atención a la clientela), a la
              Ley 5/2019, de 15 de marzo, y al Real Decreto 309/2019, de 26 de abril.
            </p>

            <h2>1. Servicio de Atención a la Clientela</h2>
            <ul>
              <li>
                <strong>Titular:</strong> {INVERSIA.legalName} · CIF {INVERSIA.taxId} · intermediario de
                crédito inmobiliario inscrito en el Registro del Banco de España con el n.º{' '}
                <strong>{INVERSIA.bdeId}</strong> (compruébelo en el{' '}
                <a href="https://sedeelectronica.bde.es" target="_blank" rel="noopener noreferrer">
                  registro oficial del Banco de España
                </a>
                , única fuente de fe).
              </li>
              <li>
                <strong>Responsable del Servicio:</strong> D. Antonio Palacios Cambero, administrador
                único.
              </li>
              <li>
                <strong>Dirección postal:</strong> Servicio de Atención a la Clientela ·{' '}
                {INVERSIA.address.street} · {INVERSIA.address.postalCode} {INVERSIA.address.city} (
                {INVERSIA.address.region}).
              </li>
              <li>
                <strong>Correo electrónico habilitado:</strong>{' '}
                <a href={`mailto:${INVERSIA.email}?subject=Queja%20o%20reclamaci%C3%B3n%20(psz.es)`}>
                  {INVERSIA.email}
                </a>
              </li>
              <li>
                <strong>Horario de atención:</strong> de lunes a viernes, de 9:00 a 18:00 h (excepto
                festivos). Las quejas presentadas fuera de ese horario se registran con la fecha y hora
                de su recepción.
              </li>
            </ul>

            <h2>2. Nuestra obligación</h2>
            <p>
              Estamos obligados a atender y resolver las quejas y reclamaciones que presente nuestra
              clientela <strong>en el plazo máximo de un mes</strong> desde su presentación. El servicio
              es gratuito y actúa con autonomía respecto de la actividad comercial. Al recibir su
              reclamación le entregaremos un <strong>acuse de recibo con una clave identificativa</strong>{' '}
              (formato REC-AAAA-NNNN) que deja constancia de la fecha y hora de presentación y le permite
              seguir su expediente.
            </p>

            <h2>3. Cómo presentar una queja o reclamación</h2>
            <p>
              Puede presentarla, personalmente o mediante representante acreditado, por cualquiera de
              estos canales (no se admiten reclamaciones por teléfono):
            </p>
            <p>
              <a
                href={FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-xl bg-navy px-5 py-3 font-semibold text-paper no-underline"
              >
                Presentar reclamación en línea
              </a>{' '}
              <a
                href="/docs/formulario-reclamacion.pdf"
                className="inline-block rounded-xl border-2 border-navy px-5 py-3 font-semibold text-navy no-underline"
              >
                Descargar formulario (PDF)
              </a>
            </p>
            <ul>
              <li>
                <strong>Formulario en línea</strong> en el sitio del titular (inversiadigital.es), con
                acuse de recibo inmediato.
              </li>
              <li>
                <strong>Correo electrónico:</strong> {INVERSIA.email} (puede adjuntar el formulario en
                PDF).
              </li>
              <li>
                <strong>Por escrito</strong>, en la dirección postal indicada.
              </li>
            </ul>
            <p>
              El escrito debe contener: nombre, apellidos y domicilio (y DNI/NIE, o datos registrales si
              es empresa); motivo de la queja o reclamación, con las cuestiones concretas sobre las que
              solicita pronunciamiento; servicio o persona con la que se produjeron los hechos;
              declaración de que el asunto no se está tramitando en vía administrativa, arbitral o
              judicial; lugar, fecha y firma; y la documentación en que se funde. Puede presentarse en
              castellano o en cualquiera de las lenguas cooficiales. La queja se presenta una sola vez.
            </p>

            <h2>4. Seguimiento y resolución</h2>
            <p>
              Con su clave puede consultar el estado del expediente escribiendo a {INVERSIA.email}{' '}
              (indique la clave en el asunto). Si faltara algún dato esencial, se lo pediremos con un
              plazo de diez días naturales para completarlo. La resolución, siempre{' '}
              <strong>motivada</strong>, se le comunicará <strong>por escrito</strong> —correo
              electrónico o postal, en soporte duradero— en el plazo de diez días naturales desde su
              fecha, por el canal que usted haya indicado o, en su defecto, por el que utilizó para
              presentarla. Una decisión favorable a su reclamación vincula a la entidad; a usted no le
              vincula, y conserva íntegras sus acciones.
            </p>

            <h2>5. Si no está conforme</h2>
            <p>
              Si la resolución es contraria a su pretensión, o transcurre un mes sin respuesta, puede
              dirigirse al <strong>Servicio de Reclamaciones del Banco de España</strong> a través del{' '}
              <a href="https://clientebancario.bde.es" target="_blank" rel="noopener noreferrer">
                Portal del Cliente Bancario
              </a>{' '}
              o de la{' '}
              <a href="https://sedeelectronica.bde.es" target="_blank" rel="noopener noreferrer">
                sede electrónica
              </a>{' '}
              (C/ Alcalá 48, 28014 Madrid), en el plazo de un año desde que presentó la reclamación ante
              nosotros. Es requisito haber reclamado antes ante este Servicio. También puede acudir a los
              servicios de consumo de su comunidad autónoma, a la{' '}
              <a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer">
                Agencia Española de Protección de Datos
              </a>{' '}
              en materia de datos personales, y a los juzgados y tribunales. Cuando el contrato lo prevea,
              las partes intentarán una mediación civil previa conforme a la Ley 5/2012.
            </p>

            <h2>6. Reglamento y normativa</h2>
            <ul>
              <li>
                <a href="/docs/reglamento-atencion-clientela.pdf">
                  Reglamento de funcionamiento del Servicio de Atención a la Clientela
                </a>{' '}
                (PDF).
              </li>
              <li>
                Normativa de transparencia y protección de la clientela: Ley 5/2019, de 15 de marzo,
                reguladora de los contratos de crédito inmobiliario; Real Decreto 309/2019, de 26 de
                abril; Orden EHA/2899/2011, de 28 de octubre; Ley 44/2002, de 22 de noviembre, arts. 29 a
                30; Ley 10/2025, de 26 de diciembre, de servicios de atención a la clientela.
              </li>
              <li>
                Véase también la <a href="/informacion-pre-contractual">información precontractual</a>,
                las <a href="/tarifas-y-comisiones">tarifas y comisiones</a> y el{' '}
                <a href="/codigo-de-conducta">código de conducta</a>.
              </li>
            </ul>

            <h2>7. Protección de datos</h2>
            <p>
              Los datos de las reclamaciones se tratan exclusivamente para su gestión y el cumplimiento
              de obligaciones legales, conforme a la{' '}
              <a href="/politica-privacidad">Política de Privacidad</a>, y se conservan cinco años desde
              la resolución. Puede ejercer sus derechos en {INVERSIA.email}.
            </p>

            <p className="text-sm text-ink-muted mt-12">Última actualización: 12 de septiembre de 2026.</p>
          </div>
        </Container>
      </Section>
    </main>
  )
}
