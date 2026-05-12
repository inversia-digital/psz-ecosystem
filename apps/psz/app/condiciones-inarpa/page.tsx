import type { Metadata } from 'next'
import { SITE_URLS } from '@psz/seo'
import { Container, Section } from '@psz/ui'

export const metadata: Metadata = {
  title: 'Condiciones de contratación · INARPA',
  description:
    'Condiciones específicas de contratación de los servicios formativos de INARPA — Instituto de Arquitectura Patrimonial. Política de desistimiento conforme al TRLGDCU.',
  alternates: { canonical: `${SITE_URLS.psz}/condiciones-inarpa` },
  robots: { index: true, follow: true },
}

export default function CondicionesInarpaPage() {
  return (
    <main>
      <Section tone="paper" padding="md" title="Condiciones de contratación — INARPA">
        <Container size="md">
          <div className="prose-psz">
            <p>
              Las presentes condiciones se aplican específicamente a la contratación de los
              servicios formativos prestados a través de INARPA (Instituto de Arquitectura
              Patrimonial), marca operada por <strong>INVERSIA GLOBAL DIGITAL, S.L.U.</strong>{' '}
              (CIF B-75281394, en adelante "el prestador"). Complementan las{' '}
              <a href="/terminos">Condiciones generales de contratación</a>, la{' '}
              <a href="/aviso-legal">Aviso legal</a> y la{' '}
              <a href="/politica-privacidad">Política de Privacidad</a>.
            </p>

            <h2>1. Naturaleza del servicio</h2>
            <p>
              INARPA es un servicio de formación online en inversión inmobiliaria, financiación
              estratégica, estructuración societaria, fiscalidad patrimonial, compliance legal y
              gestión de seguros. El contenido se ofrece principalmente en formato de vídeo,
              accesible a través de una plataforma online tras la formalización del pago y el
              alta del alumno.
            </p>

            <h2>2. Contenido contratado</h2>
            <p>El alumno contrata uno de los siguientes formatos:</p>
            <ul>
              <li>
                <strong>Acceso por escuela:</strong> vídeos de la escuela contratada en acceso de
                por vida, junto con los descargables, ejercicios y materiales asociados.
              </li>
              <li>
                <strong>Acceso Completo al Instituto:</strong> acceso a los vídeos de las siete
                (7) escuelas en modalidad de por vida, con cuatro (4) rutas de aprendizaje
                estructuradas y descargables por módulo.
              </li>
            </ul>
            <p>
              Tanto en uno como en el otro, los <strong>primeros 12 meses</strong> desde la fecha
              de contratación incluyen, sin coste adicional: acceso a la comunidad de alumnos,
              soporte por email del equipo docente, actualizaciones de contenido derivadas de
              cambios normativos y nuevas escuelas que se publiquen durante ese periodo (en
              modalidad Acceso Completo).
            </p>
            <p>
              Transcurridos los 12 meses, el acceso a los vídeos contratados se mantiene de
              forma indefinida. Si el alumno desea continuar formando parte de la comunidad,
              recibir nuevas actualizaciones y mantener el soporte, podrá activar de forma
              voluntaria la cuota mensual de continuidad (€65/mes), que podrá cancelar en
              cualquier momento.
            </p>

            <h2>3. Precio y facturación</h2>
            <p>
              Los precios publicados en la página{' '}
              <a href="https://inarpa.es#precio" target="_blank" rel="noopener noreferrer">
                inarpa.es/#precio
              </a>{' '}
              se expresan sin IVA. Se aplicará el IVA legal vigente en el momento de la
              contratación. El prestador emite factura electrónica a nombre del contratante
              (persona física o jurídica) en el plazo máximo de quince (15) días desde la
              recepción del pago.
            </p>

            <h2>4. Derecho de desistimiento</h2>
            <p>
              Conforme al artículo 102 del Real Decreto Legislativo 1/2007, de 16 de noviembre,
              por el que se aprueba el texto refundido de la Ley General para la Defensa de los
              Consumidores y Usuarios (en adelante, "TRLGDCU"), el alumno consumidor dispone de
              un <strong>plazo de catorce (14) días naturales</strong> desde la formalización
              del contrato para ejercer el derecho de desistimiento sin necesidad de
              justificación y sin penalización.
            </p>
            <p>
              No obstante, en virtud del artículo 103.m) del TRLGDCU, el derecho de
              desistimiento <strong>no será aplicable</strong> al suministro de contenido digital
              que no se preste en un soporte material cuando la ejecución haya comenzado con el
              previo consentimiento expreso del consumidor y con el conocimiento por su parte de
              que, en consecuencia, pierde su derecho de desistimiento.
            </p>
            <p>
              Para garantizar al alumno una protección superior a la mínima legal, el prestador
              aplica voluntariamente la siguiente <strong>política de desistimiento ampliada</strong>:
            </p>
            <ul>
              <li>
                <strong>Sin acceso al contenido (0% consumido):</strong> el alumno tiene derecho
                a la <strong>devolución íntegra</strong> de las cantidades abonadas dentro de los
                14 días naturales desde la contratación. Reembolso por la misma vía de pago en un
                plazo máximo de 14 días.
              </li>
              <li>
                <strong>Acceso parcial (hasta el 20% del contenido reproducido):</strong>{' '}
                devolución íntegra dentro del plazo de 14 días, asumiendo el alumno que el
                consumo realizado no le habilita a ejercer reclamación posterior sobre dicho
                contenido.
              </li>
              <li>
                <strong>Acceso entre el 20% y el 50% del contenido reproducido:</strong>{' '}
                devolución prorrateada del 50% del importe abonado, siempre dentro del plazo de
                14 días desde la contratación.
              </li>
              <li>
                <strong>Acceso superior al 50% del contenido reproducido:</strong> se entenderá
                el servicio sustancialmente prestado y no procederá devolución, salvo
                incumplimiento contrastable por parte del prestador.
              </li>
            </ul>
            <p>
              Para ejercer el desistimiento, el alumno deberá enviar una comunicación escrita por
              correo electrónico a <a href="mailto:info@inarpa.es">info@inarpa.es</a> indicando su
              nombre completo, número de factura y motivo del desistimiento (este último es
              opcional). El prestador acusará recibo en un plazo máximo de 48 horas hábiles y
              procederá al reembolso por la misma vía de pago utilizada.
            </p>

            <h2>5. Pérdidas de acceso y exclusiones</h2>
            <p>El prestador se reserva el derecho de suspender o cancelar el acceso del alumno, sin derecho a reembolso, en los siguientes casos:</p>
            <ul>
              <li>
                Compartir credenciales de acceso con terceros. El sistema detecta accesos
                simultáneos desde múltiples ubicaciones o dispositivos no autorizados.
              </li>
              <li>
                Descarga, reproducción pública, reventa o redistribución de los contenidos sin
                autorización expresa por escrito del prestador.
              </li>
              <li>
                Uso de los contenidos para fines contrarios a la ley, la moral, el orden público
                o los derechos de terceros.
              </li>
            </ul>
            <p>
              En estos supuestos, el prestador podrá ejercer adicionalmente las acciones legales
              que correspondan en defensa de sus derechos de propiedad intelectual e industrial.
            </p>

            <h2>6. Propiedad intelectual</h2>
            <p>
              Los contenidos formativos (vídeos, textos, descargables, ejercicios, gráficos,
              esquemas, código y cualquier otro material) son propiedad exclusiva del prestador o
              de los profesionales que los han elaborado y los han cedido al prestador para su
              explotación. La contratación del servicio otorga al alumno una licencia personal,
              intransferible y no exclusiva para el visionado privado y el estudio individual.
              Queda expresamente prohibida cualquier otra forma de explotación.
            </p>

            <h2>7. Responsabilidad del prestador</h2>
            <p>
              El contenido formativo de INARPA tiene carácter <strong>educativo</strong>. No
              constituye asesoramiento financiero, fiscal, jurídico ni de seguros personalizado.
              Las decisiones de inversión, contratación de productos financieros, planificación
              fiscal, constitución de sociedades o suscripción de pólizas de seguros que el
              alumno tome en virtud del contenido aprendido son <strong>responsabilidad
              exclusiva del alumno</strong>, y deberán ser validadas por profesionales colegiados
              autorizados antes de su implementación cuando la naturaleza de la decisión lo
              requiera.
            </p>
            <p>
              El prestador no responde de pérdidas patrimoniales, sanciones administrativas o
              cualquier otro perjuicio derivado de la aplicación incorrecta o incompleta del
              contenido por parte del alumno.
            </p>

            <h2>8. Modificaciones del programa</h2>
            <p>
              El prestador podrá modificar, ampliar o sustituir el contenido de las escuelas
              cuando los cambios normativos, técnicos o de mercado así lo aconsejen, sin que ello
              suponga alteración de las condiciones económicas pactadas. El alumno que disponga
              de Acceso Completo recibirá tales actualizaciones sin coste adicional durante el
              periodo de 12 meses iniciales y durante el tiempo que mantenga activa la cuota
              mensual de continuidad.
            </p>

            <h2>9. Reclamaciones y mediación</h2>
            <p>
              El procedimiento general de reclamaciones se describe en{' '}
              <a href="/reclamaciones">/reclamaciones</a>. Adicionalmente, el alumno consumidor
              tiene a su disposición la plataforma europea de resolución de litigios en línea
              de la Comisión Europea (<a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer">ec.europa.eu/consumers/odr</a>) y los organismos
              autonómicos de consumo competentes según el lugar de residencia del alumno.
            </p>

            <h2>10. Legislación aplicable y jurisdicción</h2>
            <p>
              Las presentes condiciones se rigen por la legislación española, en particular por
              el Real Decreto Legislativo 1/2007 (TRLGDCU), la Ley 34/2002 de Servicios de la
              Sociedad de la Información (LSSI), el Reglamento (UE) 2016/679 (RGPD) y la Ley
              Orgánica 3/2018 (LOPDGDD). Con carácter previo al ejercicio de cualquier acción
              judicial, las partes intentarán resolver la controversia mediante mediación civil,
              conforme a la Ley 5/2012. Si en el plazo de treinta (30) días naturales no se
              alcanzara acuerdo, cualquiera de las partes podrá acudir a los Juzgados y
              Tribunales que correspondan según la normativa de consumidores.
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
