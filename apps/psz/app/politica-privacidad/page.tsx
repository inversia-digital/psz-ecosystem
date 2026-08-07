import type { Metadata } from 'next'
import { SITE_URLS } from '@psz/seo'
import { Container, Section } from '@psz/ui'

export const metadata: Metadata = {
  title: 'Política de privacidad',
  description:
    'Política de privacidad de Inversia Global Digital S.L. — Cómo tratamos los datos personales conforme al RGPD, la LOPDGDD y los contratos de servicios que firmamos con clientes.',
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
              En INVERSIA GLOBAL DIGITAL, S.L.U. (en adelante, "el responsable") tratamos los datos
              personales de quienes navegan, contactan o contratan con nosotros conforme al
              Reglamento (UE) 2016/679 (RGPD), la Ley Orgánica 3/2018 de Protección de Datos
              Personales y Garantía de los Derechos Digitales (LOPDGDD) y la Ley 5/2019 de
              Contratos de Crédito Inmobiliario.
            </p>
            <p>
              Esta política refleja literalmente el tratamiento que aparece en los contratos de
              servicios que firmamos con nuestros clientes (Anexo I de protección de datos personales,
              art. 13 RGPD).
            </p>

            <h2>1. Responsable del tratamiento</h2>
            <ul>
              <li><strong>Identidad:</strong> INVERSIA GLOBAL DIGITAL, S.L.U.</li>
              <li><strong>CIF:</strong> B-75281394</li>
              <li><strong>Domicilio:</strong> Polígono Alcoz Alto 21, 1-1, 50410 Cuarte de Huerva (Zaragoza)</li>
              <li><strong>Correo electrónico:</strong> info@inversiadigital.es</li>
              <li><strong>Actividad regulada:</strong> Intermediario de Crédito Inmobiliario inscrito en el Banco de España con el número E242</li>
            </ul>

            <h2>2. Finalidades del tratamiento</h2>
            <p>Tratamos los datos personales con las siguientes finalidades:</p>
            <ul>
              <li>Gestión, prestación y seguimiento de los servicios de intermediación contratados (hipotecaria, Personal Shopper Inmobiliario, estructuras societarias).</li>
              <li>Comunicaciones necesarias para el desarrollo de la operación.</li>
              <li>Coordinación con terceros intervinientes (notarios, entidades financieras, registradores, técnicos, aseguradoras, gestorías y agencias) bajo el principio de minimización de datos.</li>
              <li>Cumplimiento de obligaciones legales aplicables, incluidas las derivadas de la Ley 10/2010 de prevención del blanqueo de capitales y de la financiación del terrorismo.</li>
              <li>Gestión documental y contractual derivada de la relación profesional.</li>
            </ul>

            <h2>3. Base jurídica del tratamiento</h2>
            <ul>
              <li>Ejecución del contrato suscrito entre las partes (art. 6.1.b RGPD).</li>
              <li>Cumplimiento de obligaciones legales aplicables al responsable (art. 6.1.c RGPD).</li>
              <li>Interés legítimo del responsable en la gestión y seguimiento de la operación (art. 6.1.f RGPD).</li>
              <li>
                Para comunicaciones comerciales o tratamientos no estrictamente necesarios:
                consentimiento del interesado (art. 6.1.a RGPD), revocable en cualquier momento.
              </li>
            </ul>

            <h2>4. Datos tratados</h2>
            <p>Según el servicio solicitado, tratamos las siguientes categorías:</p>
            <ul>
              <li>Datos identificativos: nombre, apellidos, DNI/NIE.</li>
              <li>Datos de contacto: email, teléfono, dirección postal.</li>
              <li>Datos económicos y patrimoniales: nóminas, declaraciones de la renta, vida laboral, propiedades, deudas, ratios de endeudamiento.</li>
              <li>Datos del inmueble objeto de financiación o adquisición.</li>
              <li>Cualquier otro dato proporcionado voluntariamente o necesario para la prestación del servicio.</li>
            </ul>

            <h2>5. Destinatarios de los datos</h2>
            <p>
              Los datos podrán ser comunicados, de forma estrictamente necesaria, a los siguientes
              destinatarios. Todos quedan sujetos a obligaciones de confidencialidad equivalentes a
              las del responsable:
            </p>
            <ul>
              <li>Notarios y registradores intervinientes en la operación.</li>
              <li>Organismos públicos (Hacienda, SEPBLAC, Banco de España, Registro Mercantil).</li>
              <li>Entidades financieras a las que se presente la solicitud de financiación, previa autorización expresa del cliente.</li>
              <li>Agencias inmobiliarias colaboradoras en la búsqueda y negociación.</li>
              <li>Empresas de reforma y técnicos (cuando el servicio incluya estos colaboradores).</li>
              <li>Entidades aseguradoras (tasadoras homologadas y seguros del inmueble).</li>
              <li>Asesorías fiscales y jurídicas externas, en su caso.</li>
              <li>
                <strong>Intermediarios de crédito inmobiliario colaboradores.</strong> Para tramitar
                su operación podemos apoyarnos en una red de intermediarios de crédito inmobiliario,
                todos ellos inscritos en el Registro de Intermediarios de Crédito Inmobiliario del
                Banco de España, que dan cobertura en determinadas zonas geográficas y especialidades
                de producto. Cuando su operación se desarrolle en una zona o requiera una especialidad
                atendida por uno de ellos, le asignaremos su expediente y le facilitaremos sus datos
                identificativos, de contacto y los relativos a la operación que usted nos haya
                proporcionado.{' '}
                <strong>
                  Estos colaboradores actúan como encargados del tratamiento en los términos del
                  artículo 28 del RGPD
                </strong>
                : tratan sus datos únicamente siguiendo nuestras instrucciones documentadas y con la
                exclusiva finalidad de estudiar y tramitar su operación, en virtud del correspondiente
                contrato de encargo. <strong>No pueden utilizarlos para fines propios ni incorporarlos
                a sus ficheros de captación</strong>, y al terminar el encargo deben devolverlos o
                suprimirlos. La dirección del expediente y la responsabilidad frente a usted siguen
                siendo nuestras en todo momento. La asignación se limita a los datos estrictamente
                necesarios y <strong>le será comunicada</strong>, indicándole quién se ocupará de su
                expediente. Si prefiere que lo tramitemos directamente nosotros, puede indicárnoslo
                sin que ello afecte a la atención de su solicitud.
              </li>
            </ul>

            <h2>5.bis Encargados del tratamiento y proveedores tecnológicos</h2>
            <p>
              Para la prestación de los servicios y el correcto funcionamiento de la web, el
              responsable utiliza proveedores tecnológicos que actúan como{' '}
              <strong>encargados del tratamiento</strong> en los términos del artículo 28 del RGPD.
              Estos proveedores solo tratan los datos siguiendo instrucciones documentadas del
              responsable y mediante los correspondientes contratos de encargo del tratamiento
              cuando resultan exigibles. Si alguno de ellos se encuentra fuera del Espacio
              Económico Europeo, se adoptan las garantías previstas por la normativa (decisiones
              de adecuación, cláusulas contractuales tipo de la Comisión Europea u otros
              mecanismos legalmente válidos).
            </p>
            <p>Categorías de encargados utilizados (relación actualizada a fecha de esta política):</p>
            <ul>
              <li>
                <strong>Hosting y CDN:</strong> Vercel Inc. (EEUU, bajo cláusulas contractuales
                tipo de la Comisión Europea). Cloudflare cuando aplique como capa de seguridad.
              </li>
              <li>
                <strong>Analítica web:</strong> Google Analytics 4 con IP anonimizada y Consent
                Mode v2 (Google Ireland Ltd., transferencia bajo cláusulas tipo); PostHog Cloud
                EU (servidores en Frankfurt, sin transferencia internacional).
              </li>
              <li>
                <strong>Gestor de tags:</strong> Google Tag Manager (Google Ireland Ltd.).
              </li>
              <li>
                <strong>Email transaccional:</strong> Resend (Estados Unidos, cláusulas tipo) para
                comunicaciones automatizadas relacionadas con la operación.
              </li>
              <li>
                <strong>Firma electrónica:</strong> DocuSign Inc. (Estados Unidos, cláusulas
                tipo), conforme al Reglamento (UE) 910/2014 (eIDAS).
              </li>
              <li>
                <strong>CRM operativo de expedientes:</strong> CRM Hipobrokers (alojado en
                infraestructura propia del grupo en territorio español), para la gestión
                operativa de los expedientes hipotecarios.
              </li>
              <li>
                <strong>Plataforma de formación (INARPA):</strong> proveedor de vídeo on-demand y
                LMS dedicado para los servicios formativos prestados a través de inarpa.es. Las
                condiciones específicas de este servicio se detallan en{' '}
                <a href="/condiciones-inarpa">/condiciones-inarpa</a>.
              </li>
              <li>
                <strong>Pasarela de pago (cuando se usa):</strong> Stripe Payments Europe Ltd.
                (Irlanda) para la gestión de cobros en operaciones electrónicas con consumidor.
              </li>
              <li>
                <strong>Calendario y citas (cuando se usa):</strong> Calendly o equivalente
                (Estados Unidos, cláusulas tipo) para la programación de reuniones
                videoconferenciadas.
              </li>
              <li>
                <strong>Asesoría legal, fiscal, contable o tecnológica externa:</strong> los
                profesionales colegiados o despachos que asisten al responsable acceden a los
                datos en lo estrictamente necesario para emitir su dictamen, bajo secreto
                profesional y contrato de encargo del tratamiento cuando aplique.
              </li>
            </ul>
            <p>
              La presente relación tiene carácter dinámico: si se incorporan nuevos encargados
              relevantes o se descontinúan algunos, esta política se actualizará en consecuencia.
              El cliente puede solicitar al responsable la información actualizada y los contratos
              de encargo correspondientes a cualquier proveedor que afecte a sus datos personales.
            </p>

            <h2>6. Plazo de conservación</h2>
            <p>
              Los datos se conservarán durante la vigencia de la relación contractual y, con
              posterioridad, durante los plazos de prescripción de las acciones civiles, mercantiles
              y fiscales aplicables, o mientras sean necesarios para la defensa ante posibles
              reclamaciones. Una vez cumplidos los plazos, los datos serán suprimidos o anonimizados.
            </p>

            <h2>7. Derechos de los interesados</h2>
            <p>Cualquier persona puede ejercer en cualquier momento los siguientes derechos:</p>
            <ul>
              <li>Acceso, rectificación y supresión.</li>
              <li>Oposición, limitación y portabilidad.</li>
              <li>Retirada del consentimiento prestado, sin afectar la licitud del tratamiento previo.</li>
              <li>No ser objeto de decisiones automatizadas con efectos jurídicos.</li>
            </ul>
            <p>
              Para ejercerlos, escriba a <strong>info@inversiadigital.es</strong> adjuntando copia de
              su documento identificativo. Si considera que el tratamiento no se ajusta a la
              normativa, puede presentar reclamación ante la Agencia Española de Protección de Datos
              (<a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer">aepd.es</a>).
            </p>

            <h2>7.bis Trazabilidad forense de descargas de PDF (medidas anti-fraude)</h2>
            <p>
              Las descargas de PDFs generados por las calculadoras propietarias del sitio web
              (por ejemplo, el análisis de rentabilidad inmobiliaria) generan un registro
              técnico mínimo con la siguiente información: identificador único de la descarga,
              fecha y hora, dirección IP del solicitante, agente de usuario (navegador) y, si
              está disponible, página de referencia (referer).
            </p>
            <p>
              <strong>Finalidad:</strong> protección de la propiedad intelectual del responsable
              y prevención de la reproducción no autorizada de los documentos generados. El
              registro permite, en caso de aparición pública no autorizada de un PDF generado
              por el sitio, asociar el documento a su descarga original.
            </p>
            <p>
              <strong>Base jurídica:</strong> interés legítimo del responsable en la protección
              de su propiedad intelectual (art. 6.1.f del Reglamento (UE) 2016/679, RGPD), tras
              ponderación con los derechos del interesado. La información recabada es mínima,
              técnica y se utiliza exclusivamente con fines anti-fraude. No se cruza con datos
              personales identificativos del usuario (nombre, email, etc.) salvo que existiera
              un proceso judicial que lo requiriera por orden de autoridad competente.
            </p>
            <p>
              <strong>Conservación:</strong> 12 meses desde la fecha de descarga, salvo que sea
              necesaria una conservación más amplia por la existencia de actuaciones de defensa
              de la propiedad intelectual en curso.
            </p>
            <p>
              <strong>Derechos del interesado:</strong> el usuario puede solicitar el acceso a
              su registro y la supresión de los datos asociados a través de los canales
              indicados en el apartado 7 de esta política. La supresión se atenderá salvo que
              exista una excepción legal (deber legal de conservación, intereses legítimos
              prevalentes, etc.).
            </p>

            <h2>8. Medidas de seguridad</h2>
            <p>
              El responsable ha adoptado las medidas técnicas y organizativas apropiadas para
              garantizar la seguridad, integridad y confidencialidad de los datos personales conforme
              al artículo 32 del RGPD.
            </p>
            <p>
              Como medida adicional, <strong>el responsable tiene contratado un seguro de
              responsabilidad civil específico para el tratamiento de datos personales</strong> que
              cubre posibles incidencias derivadas de su actividad. Esta garantía supera lo exigido
              por la normativa y refleja el compromiso del responsable con la protección efectiva de
              los datos de sus clientes.
            </p>

            <h2>9. Transferencias internacionales</h2>
            <p>
              El responsable no realiza transferencias internacionales de datos a países u
              organizaciones fuera del Espacio Económico Europeo (EEE) que no cuenten con el nivel
              adecuado de protección reconocido por la Comisión Europea o con garantías apropiadas
              (cláusulas tipo aprobadas por la Comisión, normas corporativas vinculantes, etc.).
            </p>

            <h2>10. Comunicaciones por correo electrónico</h2>
            <p>
              Las comunicaciones que mantenemos contigo a través de las direcciones de correo
              electrónico facilitadas en este sitio web o en los contratos firmados tienen plena
              validez jurídica.
            </p>

            <h2>11. Modificaciones</h2>
            <p>
              Esta política puede ser actualizada para adaptarla a cambios normativos u operativos.
              Las modificaciones surtirán efecto desde su publicación en el sitio web. Te
              recomendamos revisar periódicamente esta página.
            </p>

            <p className="text-sm text-ink-muted mt-12">
              Última actualización: mayo de 2026. Esta política refleja el Anexo I de protección de
              datos que firmamos con cada cliente al inicio del servicio.
            </p>
          </div>
        </Container>
      </Section>
    </main>
  )
}
