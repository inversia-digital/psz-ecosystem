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
              para cada operación.
            </p>
            <ul>
              <li><strong>Intermediación hipotecaria directa:</strong> honorarios entre 3.000 € y 4.500 €, atendiendo a la complejidad de la operación. Servicio exento de IVA conforme al artículo 20.1.18º de la Ley 37/1992 del IVA.</li>
              <li><strong>Intermediación derivada por broker colaborador:</strong> 1.500 € por operación resuelta.</li>
              <li><strong>Personal Shopper Inmobiliario:</strong> honorarios desde 4.000 € + IVA 21%, en función de la operación.</li>
              <li><strong>Cláusula de éxito:</strong> los honorarios de intermediación hipotecaria solo se devengan si la operación finaliza con la firma del contrato hipotecario. En caso contrario, no se cobra cantidad alguna por el trabajo realizado.</li>
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
              El tratamiento de datos personales en el marco de la prestación del servicio se rige por
              la <a href="/politica-privacidad">Política de Privacidad</a> del prestador.
            </p>

            <h2>8. Resolución y desistimiento</h2>
            <p>
              El cliente puede desistir del contrato de intermediación en cualquier momento mediante
              comunicación escrita. Si el desistimiento se produce una vez iniciada la negociación
              activa con entidades, no se devengarán honorarios salvo que se hubiera firmado oferta
              vinculante.
            </p>

            <h2>9. Ley aplicable y jurisdicción</h2>
            <p>
              Las presentes condiciones se rigen por la legislación española, en particular por la Ley
              5/2019, de 15 de marzo, reguladora de los contratos de crédito inmobiliario.
            </p>
            <p>
              Para la resolución de cualquier controversia, las partes se someten a los Juzgados y
              Tribunales de Zaragoza, salvo que la normativa de consumidores y usuarios establezca otro
              fuero distinto. Es aplicable la posibilidad de mediación o arbitraje cuando así se acuerde
              de mutuo acuerdo.
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
