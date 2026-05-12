import type { Metadata } from 'next'
import { SITE_URLS } from '@psz/seo'
import { Container, Section } from '@psz/ui'

export const metadata: Metadata = {
  title: 'Política de privacidad',
  description: 'Política de privacidad de Inversia Global Digital S.L. — Cómo tratamos los datos personales de nuestros clientes conforme al RGPD y la LOPDGDD.',
  alternates: { canonical: `${SITE_URLS.psz}/politica-privacidad` },
  robots: { index: true, follow: true },
}

export default function PoliticaPrivacidadPage() {
  return (
    <main>
      <Section tone="paper" padding="md" title="Política de privacidad">
        <Container size="md">
          <div className="prose-psz">
            <p>
              En INVERSIA GLOBAL DIGITAL, S.L.U. (en adelante, "el responsable") nos comprometemos a
              proteger los datos personales de quienes navegan, contactan o contratan con nosotros, de
              conformidad con el Reglamento (UE) 2016/679 (RGPD), la Ley Orgánica 3/2018 de Protección
              de Datos Personales y Garantía de los Derechos Digitales (LOPDGDD) y demás normativa
              vigente.
            </p>

            <h2>1. Responsable del tratamiento</h2>
            <ul>
              <li><strong>Identidad:</strong> INVERSIA GLOBAL DIGITAL, S.L.U. — CIF B-75281394</li>
              <li><strong>Domicilio:</strong> Polígono Alcoz Alto 21, 1-1, 50410 Cuarte de Huerva (Zaragoza)</li>
              <li><strong>Correo electrónico:</strong> info@inversiadigital.es</li>
              <li><strong>Actividad regulada:</strong> Intermediario de Crédito Inmobiliario inscrito en el Banco de España con el número E242</li>
            </ul>

            <h2>2. Finalidades del tratamiento</h2>
            <p>Tratamos los datos personales con las siguientes finalidades:</p>
            <ul>
              <li>Atender consultas, solicitudes de información y preparar presupuestos.</li>
              <li>Prestar servicios de intermediación hipotecaria, Personal Shopper Inmobiliario y formación.</li>
              <li>Tramitar expedientes hipotecarios ante entidades financieras, tasadoras, gestorías y notarías.</li>
              <li>Cumplir obligaciones legales y fiscales (en particular, las derivadas de la Ley 5/2019, la Ley 10/2010 de prevención del blanqueo de capitales, y la normativa fiscal).</li>
              <li>Enviar comunicaciones informativas o comerciales propias cuando se haya prestado consentimiento explícito.</li>
            </ul>

            <h2>3. Base legal del tratamiento</h2>
            <ul>
              <li><strong>Ejecución del contrato</strong> y medidas precontractuales solicitadas por el interesado (art. 6.1.b RGPD).</li>
              <li><strong>Cumplimiento de obligaciones legales</strong> aplicables al responsable (art. 6.1.c RGPD).</li>
              <li><strong>Consentimiento</strong> del interesado para comunicaciones comerciales y para datos no estrictamente necesarios (art. 6.1.a RGPD), revocable en cualquier momento.</li>
              <li><strong>Interés legítimo</strong> del responsable en proteger su actividad y los sistemas (art. 6.1.f RGPD).</li>
            </ul>

            <h2>4. Datos tratados</h2>
            <p>
              Según el servicio solicitado, podemos tratar: datos identificativos (nombre, DNI/NIE),
              datos de contacto (email, teléfono, dirección), datos económicos y patrimoniales (nóminas,
              IRPF, propiedades), datos del inmueble objeto de financiación, y cualquier otro dato
              proporcionado voluntariamente.
            </p>

            <h2>5. Destinatarios y cesiones</h2>
            <p>Los datos podrán comunicarse a:</p>
            <ul>
              <li>Entidades financieras a las que se presente la solicitud de hipoteca, previa autorización expresa.</li>
              <li>Tasadoras homologadas, gestorías y notarías que intervengan en la operación.</li>
              <li>Asesorías fiscales y jurídicas externas, en su caso.</li>
              <li>Administraciones públicas, cuando exista obligación legal (Hacienda, SEPBLAC, Banco de España).</li>
              <li>Proveedores tecnológicos (hosting Vercel Inc., email transaccional Resend, analítica PostHog Cloud EU y Google Analytics) que actúan como encargados del tratamiento con garantías equivalentes al RGPD.</li>
            </ul>
            <p>No se realizan transferencias internacionales fuera del Espacio Económico Europeo sin garantías adecuadas (cláusulas tipo de la Comisión Europea, en su caso).</p>

            <h2>6. Plazo de conservación</h2>
            <p>
              Los datos se conservarán mientras dure la relación profesional y, posteriormente, durante
              los plazos legales aplicables (entre 5 y 10 años, según la obligación: fiscal, contable,
              de prevención de blanqueo, etc.). Una vez cumplidos los plazos, los datos serán suprimidos
              o anonimizados.
            </p>

            <h2>7. Derechos del interesado</h2>
            <p>Cualquier persona puede ejercer sus derechos de:</p>
            <ul>
              <li>Acceso, rectificación y supresión.</li>
              <li>Limitación del tratamiento.</li>
              <li>Oposición al tratamiento.</li>
              <li>Portabilidad de los datos.</li>
              <li>Retirada del consentimiento prestado, sin afectar la licitud del tratamiento previo.</li>
              <li>No ser objeto de decisiones automatizadas con efectos jurídicos.</li>
            </ul>
            <p>
              Para ejercerlos, escriba a <strong>info@inversiadigital.es</strong> adjuntando copia de
              su documento identificativo. Si considera que el tratamiento no se ajusta a la normativa,
              puede presentar una reclamación ante la Agencia Española de Protección de Datos
              (<a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer">aepd.es</a>).
            </p>

            <h2>8. Medidas de seguridad</h2>
            <p>
              El responsable aplica las medidas técnicas y organizativas apropiadas conforme al
              artículo 32 RGPD para garantizar la confidencialidad, integridad y disponibilidad de los
              datos personales tratados.
            </p>

            <h2>9. Modificaciones</h2>
            <p>
              Esta política puede ser actualizada para adaptarla a cambios normativos u operativos. Las
              modificaciones surtirán efecto desde su publicación en el sitio web.
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
