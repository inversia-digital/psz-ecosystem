import type { Metadata } from 'next'
import { SITE_URLS } from '@psz/seo'
import { Container, Section } from '@psz/ui'

export const metadata: Metadata = {
  title: 'Términos y condiciones de contratación',
  description: 'Términos y condiciones generales aplicables a los servicios de Toño Palacios e Inversia Global Digital S.L.',
  alternates: { canonical: `${SITE_URLS.psz}/terminos` },
  robots: { index: true, follow: true },
}

export default function TerminosPage() {
  return (
    <main>
      <Section tone="paper" padding="md" title="Términos y condiciones de contratación">
        <Container size="md">
          <div className="prose-psz">
            <h2>1. Objeto</h2>
            <p>
              Las presentes condiciones generales regulan la prestación de servicios profesionales por
              parte de INVERSIA GLOBAL DIGITAL, S.L.U. (en adelante, "el prestador"), con CIF
              B-75281394, inscrita como Intermediario de Crédito Inmobiliario en el Banco de España con
              el número E242, conforme a la Ley 5/2019, de 15 de marzo.
            </p>

            <h2>2. Servicios ofrecidos</h2>
            <ul>
              <li><strong>Intermediación hipotecaria:</strong> negociación de financiación hipotecaria ante entidades financieras en nombre del cliente.</li>
              <li><strong>Personal Shopper Inmobiliario (PSI):</strong> localización, análisis y negociación de operaciones de inversión inmobiliaria.</li>
              <li><strong>Formación financiera:</strong> a través del instituto INARPA, con contratación independiente.</li>
            </ul>

            <h2>3. Honorarios y forma de pago</h2>
            <p>
              Los honorarios se establecen por escrito antes del inicio del servicio y son específicos
              para cada operación. El modelo de cobro en la intermediación hipotecaria consta de dos
              tramos:
            </p>
            <ul>
              <li>
                <strong>Reserva profesional:</strong> al firmar el contrato de intermediación, el
                cliente abona una reserva de 600 €. Este importe cubre el inicio del
                trabajo (estudio del expediente, dossier ejecutivo, presentación a entidades
                financieras, coordinación inicial). Si el prestador no consigue la hipoteca por
                causa imputable a él, la reserva se devuelve íntegra. Si el cliente desiste
                voluntariamente o no continúa por causa no imputable al prestador, la reserva no se
                reembolsa.
              </li>
              <li>
                <strong>Honorarios a éxito:</strong> entre tres mil y cuatro mil quinientos euros,
                atendiendo a la complejidad de la operación. Se devengan únicamente si la operación
                finaliza con la firma del contrato hipotecario. Servicio exento de IVA conforme al
                artículo 20.1.18º de la Ley 37/1992 del IVA.
              </li>
              <li>
                <strong>Personal Shopper Inmobiliario:</strong> honorarios desde cuatro mil euros
                más IVA al 21%, en función de la operación. Régimen de cobro específico que se
                acuerda por escrito antes del inicio del servicio.
              </li>
            </ul>

            <h2>4. Proceso de contratación</h2>
            <ol>
              <li>Primera consulta gratuita y sin compromiso para evaluar la viabilidad.</li>
              <li>Entrega al cliente de un presupuesto escrito con honorarios, alcance, plazos y obligaciones de ambas partes.</li>
              <li>Aceptación del presupuesto y firma del contrato de intermediación.</li>
              <li>Inicio del servicio, recopilación de documentación y negociación con entidades.</li>
              <li>Entrega de la Ficha Europea de Información Normalizada (FEIN) por la entidad financiera elegida.</li>
              <li>Firma ante notario y, en su caso, devengo de los honorarios.</li>
            </ol>

            <h2>5. Obligaciones del cliente</h2>
            <ul>
              <li>Facilitar información veraz, completa y actualizada sobre su situación económica.</li>
              <li>Aportar la documentación requerida en los plazos solicitados.</li>
              <li>Informar de cualquier cambio relevante en su situación durante la tramitación.</li>
              <li>No iniciar de manera paralela gestiones con otras entidades para la misma operación sin previa comunicación.</li>
            </ul>

            <h2>6. Limitación de responsabilidad</h2>
            <p>
              El prestador actúa como intermediario y no garantiza la concesión de la financiación por
              las entidades financieras, dado que la decisión de aprobación corresponde exclusivamente
              a éstas. El prestador se compromete a actuar con la diligencia profesional propia de un
              intermediario de crédito inmobiliario.
            </p>
            <p>
              El prestador dispone de seguro de responsabilidad civil profesional conforme a las
              exigencias de la Ley 5/2019.
            </p>

            <h2>7. Protección de datos</h2>
            <p>
              El tratamiento de datos personales en el marco de la prestación del servicio se rige
              por la <a href="/politica-privacidad">Política de Privacidad</a> del prestador, que
              reproduce el Anexo I de protección de datos (art. 13 RGPD) que se firma con cada cliente
              al inicio del servicio. El prestador dispone de un seguro de responsabilidad civil
              específico para el tratamiento de datos personales como medida adicional de garantía.
            </p>

            <h2>8. Firma electrónica</h2>
            <p>
              Los contratos profesionales se formalizan mediante firma electrónica a través de
              DocuSign, conforme al Reglamento (UE) nº 910/2014 (eIDAS) y a la Ley 6/2020 de
              servicios electrónicos de confianza. La firma electrónica tiene plena eficacia jurídica
              equivalente a la firma manuscrita. La firma del cliente implica la aceptación plena e
              irrevocable de todas las condiciones contractuales.
            </p>

            <h2>9. Duración y resolución</h2>
            <p>
              El contrato de intermediación hipotecaria estará vigente hasta la formalización de la
              operación o, en su defecto, transcurridos doce (12) meses desde la firma, salvo prórroga
              acordada por escrito. Cualquiera de las partes podrá resolver el contrato por
              incumplimiento grave de la otra. La resolución por causa imputable al cliente no
              generará derecho a devolución de la reserva profesional abonada.
            </p>
            <p>
              El cliente puede desistir del contrato de intermediación en cualquier momento mediante
              comunicación escrita. Si el desistimiento se produce una vez iniciada la negociación
              activa con entidades, no se devengarán los honorarios a éxito salvo que se hubiera
              firmado oferta vinculante; la reserva profesional ya abonada cubre el trabajo invertido.
            </p>

            <h2>10. Mediación previa y jurisdicción</h2>
            <p>
              Con carácter previo al ejercicio de cualquier acción judicial, las partes se comprometen
              a intentar resolver la controversia mediante mediación civil ante un mediador
              certificado en Zaragoza, conforme a la Ley 5/2012 de mediación en asuntos civiles y
              mercantiles. Si en el plazo de treinta (30) días naturales desde la solicitud escrita
              no se alcanzara acuerdo, cualquiera de las partes podrá acudir a los Juzgados y
              Tribunales de Zaragoza, con renuncia expresa a cualquier otro fuero, salvo que la
              normativa de consumidores y usuarios establezca otro distinto.
            </p>

            <h2>11. Nulidad parcial</h2>
            <p>
              Si alguna cláusula del presente contrato fuera declarada nula o ineficaz, dicha nulidad
              no afectará al resto, que permanecerá plenamente vigente y se adaptará en lo necesario
              para preservar los efectos más próximos a los originalmente pactados.
            </p>

            <h2>12. Ley aplicable</h2>
            <p>
              Las presentes condiciones se rigen por la legislación española, en particular por la
              Ley 5/2019, de 15 de marzo, reguladora de los contratos de crédito inmobiliario, el
              Real Decreto 309/2019 y la normativa complementaria.
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
