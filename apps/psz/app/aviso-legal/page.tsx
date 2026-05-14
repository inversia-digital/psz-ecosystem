import type { Metadata } from 'next'
import { SITE_URLS } from '@psz/seo'
import { Container, Section } from '@psz/ui'

export const metadata: Metadata = {
  title: 'Aviso legal',
  description: 'Aviso legal de Inversia Global Digital S.L. (CIF B75281394), broker hipotecario nº E242 en el registro del Banco de España.',
  alternates: { canonical: `${SITE_URLS.psz}/aviso-legal` },
  robots: { index: true, follow: true },
}

export default function AvisoLegalPage() {
  return (
    <main>
      <Section tone="paper" padding="md" title="Aviso legal">
        <Container size="md">
          <div className="prose-psz">
            <h2>1. Datos identificativos del titular</h2>
            <p>
              En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la
              Sociedad de la Información y Comercio Electrónico (LSSI-CE), se informa de los datos del titular del sitio web psz.es:
            </p>
            <ul>
              <li><strong>Denominación social:</strong> INVERSIA GLOBAL DIGITAL, S.L.U.</li>
              <li><strong>CIF:</strong> B-75281394</li>
              <li><strong>Domicilio social:</strong> Polígono Alcoz Alto 21, 1-1, 50410 Cuarte de Huerva (Zaragoza), España</li>
              <li><strong>Teléfono:</strong> +34 876 280 545</li>
              <li><strong>Correo electrónico:</strong> info@inversiadigital.es</li>
              <li>
                <strong>Registro Mercantil de Zaragoza</strong> — los datos registrales completos
                (Tomo, Folio, Hoja, Inscripción) pueden solicitarse al responsable o consultarse
                en la nota simple del Registro Mercantil. Próxima incorporación a este aviso una
                vez verificada la última inscripción vigente.
              </li>
            </ul>
            <p className="text-sm text-ink-muted">
              <strong>Marca comercial PSZ.</strong> PSZ es la marca comercial utilizada por
              INVERSIA GLOBAL DIGITAL, S.L.U. para la prestación de servicios relacionados con
              intermediación hipotecaria, Personal Shopper Inmobiliario, estructuras societarias
              y formación. Determinados servicios concretos pueden prestarse directamente por
              INVERSIA GLOBAL DIGITAL, S.L.U. o, en su caso, por sociedades, profesionales o
              colaboradores vinculados al grupo, lo cual será informado al usuario antes de la
              contratación cuando resulte aplicable. La marca personal "Toño Palacios" es el
              nombre profesional de Antonio Palacios Cambero, fundador y administrador del grupo.
            </p>

            <h2>2. Actividad regulada</h2>
            <p>
              La sociedad titular del sitio web está inscrita en el Registro de Intermediarios de
              Crédito Inmobiliario del Banco de España con el número <strong>E242</strong>, conforme
              a lo dispuesto en la Ley 5/2019, de 15 de marzo, reguladora de los contratos de crédito
              inmobiliario y su normativa de desarrollo. Esta inscripción puede ser consultada y
              verificada de forma pública y gratuita en la sede electrónica del Banco de España
              (<a href="https://app.bde.es/rbe_spa/" target="_blank" rel="noopener noreferrer">app.bde.es</a>).
            </p>
            <p>
              El titular es además fundador y presidente de la Asociación Nacional de Intermediarios
              en Crédito Inmobiliario (<a href="https://anici.es/" target="_blank" rel="noopener noreferrer">ANICI</a>),
              con NIF G-21975008.
            </p>

            <h2>3. Objeto del sitio web</h2>
            <p>
              psz.es informa de los servicios de intermediación hipotecaria, Personal Shopper
              Inmobiliario y formación financiera prestados por el titular. La información publicada
              tiene carácter informativo y no constituye, por sí misma, oferta vinculante de servicios
              ni compromiso de contratación. La prestación efectiva del servicio requerirá la firma
              previa del correspondiente contrato y, cuando proceda, la entrega de la Ficha Europea
              de Información Normalizada (FEIN) según prescribe la Ley 5/2019.
            </p>

            <h2>4. Propiedad intelectual e industrial</h2>
            <p>
              Los textos, imágenes, gráficos, marca personal "Toño Palacios", marca comercial "PSZ",
              logotipos, código fuente y demás elementos del sitio web son titularidad exclusiva de
              Inversia Global Digital, S.L.U. o de terceros que han autorizado su uso. Queda prohibida
              su reproducción, distribución, comunicación pública o transformación, salvo autorización
              expresa por escrito. El uso de citas con fines informativos o académicos requiere
              atribución expresa y enlace al contenido original.
            </p>

            <h2>5. Responsabilidad</h2>
            <p>
              El titular se compromete a mantener la información del sitio web actualizada y veraz.
              No obstante, no se responsabiliza de errores tipográficos, omisiones puntuales o
              desactualizaciones temporales que puedan producirse. Cualquier información sobre
              condiciones hipotecarias publicada con carácter general en este sitio web está sujeta
              a las condiciones particulares del banco financiador y al perfil del cliente concreto.
            </p>
            <p>
              El titular no se responsabiliza del contenido de sitios web de terceros enlazados desde
              psz.es.
            </p>

            <h2>6. Firma electrónica</h2>
            <p>
              Los contratos profesionales suscritos con el titular se formalizan mediante firma
              electrónica a través de plataforma certificada (DocuSign), conforme al Reglamento (UE)
              nº 910/2014 (eIDAS) y a la Ley 6/2020 de servicios electrónicos de confianza. La firma
              electrónica tiene plena eficacia jurídica equivalente a la firma manuscrita.
            </p>

            <h2>7. Modificaciones</h2>
            <p>
              El titular se reserva el derecho a modificar este aviso legal en cualquier momento. Las
              modificaciones surtirán efecto desde su publicación en el sitio web.
            </p>

            <h2>8. Mediación previa y jurisdicción</h2>
            <p>
              Con carácter previo al ejercicio de cualquier acción judicial, las partes se comprometen
              a intentar resolver la controversia mediante mediación civil ante un mediador
              certificado en Zaragoza, conforme a la Ley 5/2012 de mediación en asuntos civiles y
              mercantiles. Si en el plazo de treinta (30) días naturales desde la solicitud escrita
              no se alcanzara acuerdo, cualquiera de las partes podrá acudir a los Juzgados y
              Tribunales de Zaragoza, con renuncia expresa a cualquier otro fuero, salvo que la
              normativa de consumidores y usuarios establezca otro distinto.
            </p>

            <h2>9. Hosting y proveedores tecnológicos</h2>
            <p>
              El sitio web psz.es se sirve a través de la plataforma Vercel Inc. (sede en Estados
              Unidos de América), con la que el responsable mantiene relación bajo cláusulas tipo
              de la Comisión Europea para transferencias internacionales de datos. Los servicios
              tecnológicos auxiliares (Resend para email transaccional, PostHog Cloud EU para
              analítica web, Google Analytics 4) actúan como encargados del tratamiento conforme
              a la <a href="/politica-privacidad">Política de Privacidad</a>.
            </p>

            <h2>10. Supervisión y autoridades competentes</h2>
            <p>El titular está sometido a la supervisión de las siguientes autoridades:</p>
            <ul>
              <li>
                <strong>Banco de España</strong> — supervisor de la actividad de intermediación
                de crédito inmobiliario (art. 27 Ley 5/2019).
              </li>
              <li>
                <strong>SEPBLAC</strong> (Servicio Ejecutivo de la Comisión de Prevención del
                Blanqueo de Capitales) — supervisor del cumplimiento de las obligaciones de
                prevención del blanqueo (Ley 10/2010).
              </li>
              <li>
                <strong>Agencia Española de Protección de Datos (AEPD)</strong> — supervisor del
                tratamiento de datos personales (RGPD + LOPDGDD).
              </li>
              <li>
                <strong>ANICI</strong> (Asociación Nacional de Intermediarios en Crédito
                Inmobiliario) — autoridad deontológica voluntaria asumida por el titular como
                miembro fundador (ANICI-001) y presidente.
              </li>
            </ul>

            <h2>11. Documentación complementaria publicada</h2>
            <p>
              Esta web publica adicionalmente los siguientes documentos legalmente requeridos o
              recomendables:
            </p>
            <ul>
              <li><a href="/politica-privacidad">Política de Privacidad</a></li>
              <li><a href="/cookies">Política de Cookies</a></li>
              <li><a href="/terminos">Condiciones generales de contratación</a></li>
              <li><a href="/tarifas-y-comisiones">Tarifas y comisiones máximas</a></li>
              <li><a href="/informacion-pre-contractual">Información pre-contractual (Ley 5/2019)</a></li>
              <li><a href="/reclamaciones">Procedimiento de reclamaciones</a></li>
              <li><a href="/codigo-de-conducta">Código de conducta profesional</a></li>
              <li>
                <a href="/disclaimer-estructuras-internacionales">
                  Aviso legal — Estructuras societarias internacionales
                </a>
              </li>
              <li>
                <a href="/condiciones-inarpa">
                  Condiciones de contratación — INARPA (formación)
                </a>
              </li>
            </ul>

            <h2>12. Legislación aplicable</h2>
            <p>
              El presente aviso legal se rige por la legislación española, en particular por la
              Ley 5/2019 de Contratos de Crédito Inmobiliario, el Real Decreto 309/2019 y la
              normativa complementaria.
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
