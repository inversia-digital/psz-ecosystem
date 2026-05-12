import type { Metadata } from 'next'
import { SITE_URLS } from '@psz/seo'
import { Container, Section } from '@psz/ui'

export const metadata: Metadata = {
  title: 'Información pre-contractual',
  description:
    'Información pre-contractual obligatoria conforme a la Ley 5/2019 — documentación entregada al cliente antes de la firma del contrato hipotecario.',
  alternates: { canonical: `${SITE_URLS.psz}/informacion-pre-contractual` },
  robots: { index: true, follow: true },
}

export default function Page() {
  return (
    <main>
      <Section tone="paper" padding="md" title="Información pre-contractual">
        <Container size="md">
          <div className="prose-psz">
            <p>
              La Ley 5/2019, de 15 de marzo, reguladora de los contratos de crédito inmobiliario,
              establece obligaciones específicas de información que el prestamista y el
              intermediario deben proporcionar al consumidor antes de la formalización del
              contrato de préstamo. Esta página resume cómo cumple INVERSIA GLOBAL DIGITAL, S.L.U.
              con dichas obligaciones cuando actúa como intermediario de crédito inmobiliario.
            </p>

            <h2>1. Información general previa al servicio</h2>
            <p>Al inicio de la relación, el prestador entrega al cliente:</p>
            <ul>
              <li>
                Datos identificativos del intermediario (denominación social, CIF, dirección,
                número de registro en Banco de España, datos de la autoridad de supervisión).
              </li>
              <li>Información sobre la asociación profesional a la que pertenece (ANICI).</li>
              <li>Existencia y cobertura del seguro de responsabilidad civil profesional.</li>
              <li>
                Tarifas máximas aplicables (publicadas en{' '}
                <a href="/tarifas-y-comisiones">/tarifas-y-comisiones</a>).
              </li>
              <li>Procedimiento de reclamaciones (publicado en <a href="/reclamaciones">/reclamaciones</a>).</li>
              <li>Servicios complementarios eventualmente ofertados (servicios de Personal Shopper Inmobiliario, asesoría en estructuras societarias).</li>
            </ul>

            <h2>2. Información Personalizada (Ficha Europea de Información Normalizada – FEIN)</h2>
            <p>
              Antes de cualquier oferta vinculante, la entidad financiera ofertante entrega al
              cliente la Ficha Europea de Información Normalizada (FEIN), documento estandarizado
              a nivel europeo que detalla:
            </p>
            <ul>
              <li>Importe del préstamo, plazo y moneda.</li>
              <li>Tipo de interés (fijo, variable, mixto) y su forma de cálculo.</li>
              <li>TAE (Tasa Anual Equivalente).</li>
              <li>Cuota mensual y cuadro de amortización.</li>
              <li>Comisiones aplicables (apertura, amortización anticipada, etc.).</li>
              <li>Productos vinculados o combinados ofertados por la entidad.</li>
              <li>Garantías exigidas.</li>
              <li>Coste total del préstamo y desglose.</li>
            </ul>
            <p>
              El intermediario revisa con el cliente cada apartado de la FEIN y aclara cualquier
              concepto.
            </p>

            <h2>3. Plazo de reflexión (10 días naturales)</h2>
            <p>
              Conforme al artículo 14.1.b de la Ley 5/2019, el cliente dispone de un plazo mínimo
              de <strong>diez (10) días naturales</strong> entre la entrega de la FEIN y la
              autorización de la firma ante notario, durante el cual el cliente puede:
            </p>
            <ul>
              <li>Reflexionar sobre las condiciones ofertadas.</li>
              <li>Acudir a un notario de su elección para recibir asesoramiento gratuito.</li>
              <li>Solicitar aclaraciones adicionales al intermediario o al prestamista.</li>
              <li>Comparar la oferta con otras alternativas.</li>
            </ul>
            <p>
              Este plazo es <strong>irrenunciable</strong> por parte del cliente.
            </p>

            <h2>4. Acta notarial previa a la firma</h2>
            <p>
              En el periodo de diez días anteriores a la firma del préstamo, el cliente debe
              comparecer ante el notario que haya elegido (gratuito conforme al art. 15 Ley 5/2019)
              para que éste verifique el cumplimiento de los requisitos de información,
              transparencia y comprensión del contrato. El notario levanta un acta que certifica
              que el cliente ha sido debidamente informado.
            </p>

            <h2>5. Productos vinculados y combinados</h2>
            <p>
              La Ley 5/2019 prohíbe la <strong>venta vinculada</strong> de productos accesorios
              (seguros, cuentas, tarjetas) salvo excepciones tasadas. Sí permite la <strong>venta
              combinada</strong>, ofreciendo descuentos en el tipo de interés a cambio de
              contratar productos adicionales, siempre que el cliente:
            </p>
            <ul>
              <li>Conozca expresamente las condiciones de la oferta combinada.</li>
              <li>Pueda contratar el préstamo sin esos productos a un tipo de interés sin esa bonificación.</li>
              <li>Reciba información comparativa entre ambas opciones.</li>
            </ul>

            <h2>6. Asesoramiento independiente</h2>
            <p>
              El intermediario declara expresamente que <strong>no presta servicios de asesoramiento
              independiente</strong> en el sentido del artículo 19.4 de la Ley 5/2019 (este término
              está reservado a quienes ofrecen análisis del mercado completo sin retribución de
              ninguna entidad). El servicio que el intermediario presta es de{' '}
              <strong>intermediación profesional remunerada por el cliente</strong>, con búsqueda
              activa entre varias entidades financieras conforme a las preferencias del cliente.
            </p>

            <h2>7. Confidencialidad de los datos</h2>
            <p>
              Toda la información proporcionada por el cliente durante el procedimiento
              pre-contractual queda protegida conforme a la{' '}
              <a href="/politica-privacidad">Política de Privacidad</a> del prestador (Reglamento
              UE 2016/679 RGPD y LOPDGDD).
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
