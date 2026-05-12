import type { Metadata } from 'next'
import { SITE_URLS } from '@psz/seo'
import { Container, Section } from '@psz/ui'

export const metadata: Metadata = {
  title: 'Código de conducta profesional',
  description:
    'Compromisos deontológicos asumidos por Toño Palacios e Inversia Global Digital S.L. como intermediarios de crédito inmobiliario y como asociados de ANICI.',
  alternates: { canonical: `${SITE_URLS.psz}/codigo-de-conducta` },
  robots: { index: true, follow: true },
}

export default function Page() {
  return (
    <main>
      <Section tone="paper" padding="md" title="Código de conducta profesional">
        <Container size="md">
          <div className="prose-psz">
            <p>
              Toño Palacios y INVERSIA GLOBAL DIGITAL, S.L.U. asumen los siguientes compromisos
              deontológicos en el ejercicio de su actividad como intermediarios de crédito
              inmobiliario, derivados tanto de la normativa vigente (Ley 5/2019, Real Decreto
              309/2019) como de su pertenencia a ANICI (Asociación Nacional de Intermediarios en
              Crédito Inmobiliario), de la que Toño Palacios es presidente.
            </p>

            <h2>1. Información veraz, completa y comprensible</h2>
            <p>
              Toda la información que se proporciona al cliente —oral, escrita o publicitaria— es
              veraz, completa, no engañosa y comprensible. No se utilizan letra pequeña ni
              construcciones lingüísticas diseñadas para confundir. Cuando un dato es estimado o
              depende de variables, se indica expresamente.
            </p>

            <h2>2. Independencia profesional</h2>
            <p>
              El intermediario no actúa en exclusiva para ninguna entidad financiera. Negocia
              simultáneamente con varias entidades para encontrar la mejor oferta para el cliente.
              No percibe comisiones ocultas ni vinculaciones por dirigir clientes a una entidad
              concreta.
            </p>

            <h2>3. Transparencia en los honorarios</h2>
            <p>
              Los honorarios se acuerdan por escrito antes del inicio del servicio y se publican
              en <a href="/tarifas-y-comisiones">/tarifas-y-comisiones</a>. No existen cargos
              ocultos, sobreprecios derivados de productos cruzados ni penalizaciones no pactadas.
            </p>

            <h2>4. Gestión de conflictos de interés</h2>
            <p>
              Cuando exista un eventual conflicto de interés —por relación previa con alguna
              entidad financiera, por percepción de incentivos comerciales o por cualquier otra
              circunstancia— el intermediario lo comunica al cliente por escrito antes de
              continuar con el servicio. En ningún caso se prioriza el interés del intermediario
              sobre el del cliente.
            </p>

            <h2>5. Confidencialidad</h2>
            <p>
              Toda la información del cliente —financiera, patrimonial, personal o profesional—
              está protegida por estricta confidencialidad. Sólo se comunica a terceros con
              autorización expresa del cliente (entidades financieras a las que se presenta el
              dossier) o cuando la ley lo exige (obligaciones tributarias, SEPBLAC).
            </p>

            <h2>6. Negativa a operaciones ilícitas</h2>
            <p>
              El intermediario rechaza expresamente cualquier operación que pueda implicar:
            </p>
            <ul>
              <li>Blanqueo de capitales (Ley 10/2010 PBC).</li>
              <li>Financiación del terrorismo.</li>
              <li>Falseamiento de documentación o información al banco.</li>
              <li>Operaciones con fondos cuyo origen no esté justificado.</li>
              <li>Vehículos en jurisdicciones consideradas no cooperativas por la OCDE.</li>
            </ul>
            <p>
              Si durante la operación se detectan indicios de cualquiera de estas circunstancias,
              el servicio se interrumpe inmediatamente y se comunica al SEPBLAC conforme a las
              obligaciones legales aplicables.
            </p>

            <h2>7. Diligencia debida</h2>
            <p>
              El intermediario aplica la diligencia debida exigida por la normativa de prevención
              del blanqueo de capitales: identificación del cliente, comprobación del origen de
              fondos, identificación del titular real cuando el cliente es una persona jurídica,
              y conservación de la documentación durante los plazos legales.
            </p>

            <h2>8. Formación continua</h2>
            <p>
              El intermediario mantiene la formación específica acreditada exigida por la Ley
              5/2019 y la actualiza periódicamente para mantenerse al día sobre cambios
              normativos, condiciones de mercado y mejores prácticas profesionales.
            </p>

            <h2>9. Compromiso con la mejora del sector</h2>
            <p>
              Como presidente de ANICI, Toño Palacios asume un compromiso institucional adicional:
              representar al colectivo profesional ante las autoridades de supervisión, promover
              la profesionalización del sector y combatir el intrusismo de quienes ejercen sin
              estar registrados en Banco de España.
            </p>

            <h2>10. Aceptación de reclamaciones</h2>
            <p>
              Cualquier discrepancia, queja o reclamación se tramita conforme al procedimiento
              público en <a href="/reclamaciones">/reclamaciones</a>, con plazos claros y
              respuesta motivada por escrito. La existencia de una reclamación no exime al
              prestador del deber de continuar prestando el servicio con la misma calidad
              profesional.
            </p>

            <h2>11. Atención humana</h2>
            <p>
              Más allá de las obligaciones normativas, el intermediario asume un compromiso de
              atención humana: el cliente no es un expediente, es una persona tomando una
              decisión financiera importante. Cada operación se trata con el cuidado que se
              tendría con la propia.
            </p>

            <p className="text-sm text-ink-muted mt-12">
              Última actualización: mayo de 2026. Este código de conducta se complementa con el
              código deontológico de ANICI ({' '}
              <a href="https://anici.es" target="_blank" rel="noopener noreferrer">
                anici.es
              </a>
              ) al que Toño Palacios está adherido como asociado fundador (ANICI-001) y presidente
              de la asociación.
            </p>
          </div>
        </Container>
      </Section>
    </main>
  )
}
