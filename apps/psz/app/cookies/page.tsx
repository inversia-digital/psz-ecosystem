import type { Metadata } from 'next'
import { SITE_URLS } from '@psz/seo'
import { Container, Section } from '@psz/ui'

export const metadata: Metadata = {
  title: 'Política de cookies',
  description: 'Política de cookies de psz.es — Tipos de cookies utilizadas y cómo gestionarlas.',
  alternates: { canonical: `${SITE_URLS.psz}/cookies` },
  robots: { index: true, follow: true },
}

export default function CookiesPage() {
  return (
    <main>
      <Section tone="paper" padding="md" title="Política de cookies">
        <Container size="md">
          <div className="prose-psz">
            <h2>1. Qué son las cookies</h2>
            <p>
              Las cookies son pequeños archivos de texto que un sitio web almacena en el navegador del
              usuario para recordar información sobre su visita. Pueden ser propias (gestionadas por
              psz.es) o de terceros (gestionadas por otros servicios contratados por el responsable).
            </p>

            <h2>2. Dominios cubiertos por esta política</h2>
            <p>Esta política se aplica a los siguientes dominios operados por el responsable:</p>
            <ul>
              <li><a href="https://psz.es">psz.es</a> (contenedor Google Tag Manager <code>GTM-562TXZDP</code>)</li>
              <li><a href="https://inarpa.es" target="_blank" rel="noopener noreferrer">inarpa.es</a> (contenedor Google Tag Manager <code>GTM-PFP72MGD</code>)</li>
              <li><a href="https://bio.psz.es" target="_blank" rel="noopener noreferrer">bio.psz.es</a></li>
              <li><a href="https://activos.psz.es" target="_blank" rel="noopener noreferrer">activos.psz.es</a></li>
            </ul>

            <h2>3. Cookies utilizadas</h2>

            <h3>3.1 Cookies técnicas o necesarias</h3>
            <p>
              Imprescindibles para el funcionamiento del sitio. No requieren consentimiento del
              usuario (art. 22.2 LSSI). Se usan para:
            </p>
            <ul>
              <li>Garantizar la sesión segura del usuario y prevenir ataques CSRF.</li>
              <li>Recordar las preferencias del usuario (consentimiento de cookies, idioma, modo claro/oscuro).</li>
              <li>Distribuir la carga del servidor (Vercel Edge Network, Cloudflare).</li>
              <li>Cumplimiento de la firma electrónica de contratos (DocuSign).</li>
            </ul>

            <h3>3.2 Cookies de análisis y medición (requieren consentimiento)</h3>
            <p>
              No se activan hasta que el usuario las acepta expresamente en el banner de
              consentimiento. Mientras tanto, Google Consent Mode v2 mantiene
              <code>analytics_storage: denied</code> en todos los servicios:
            </p>
            <ul>
              <li>
                <strong>Google Tag Manager</strong> (contenedor <code>GTM-562TXZDP</code> en psz.es
                y <code>GTM-PFP72MGD</code> en inarpa.es) — orquesta el resto de tags publicitarios
                y analíticos. No genera cookies propias; sí carga tags de terceros si están
                configurados.
              </li>
              <li>
                <strong>Google Analytics 4</strong> (cookies <code>_ga</code>, <code>_ga_*</code>)
                — análisis de tráfico y comportamiento. Datos agregados, IP anonimizada,
                transferencia internacional bajo cláusulas tipo de la Comisión Europea.
              </li>
              <li>
                <strong>PostHog Cloud EU</strong> — análisis de producto en servidores europeos
                (Frankfurt). Cumple RGPD nativamente, sin transferencia internacional.
              </li>
            </ul>

            <h3>3.3 Cookies publicitarias</h3>
            <p>
              Actualmente <strong>psz.es e inarpa.es no utilizan cookies publicitarias propias
              ni de terceros</strong>. Si en el futuro se incorporasen (Meta Pixel, Google Ads,
              LinkedIn Insight Tag), esta política se actualizaría con el detalle de cada una y
              quedarían sujetas a aceptación expresa en el banner de consentimiento.
            </p>

            <h2>4. Google Consent Mode v2</h2>
            <p>
              Cumpliendo con la exigencia de Google (marzo 2024) y con la guía de cookies de la
              AEPD, todos nuestros sitios implementan Consent Mode v2 con valores por defecto
              negados antes de que el usuario interactúe con el banner de cookies:
            </p>
            <ul>
              <li><code>ad_storage</code>: <strong>denied</strong></li>
              <li><code>ad_user_data</code>: <strong>denied</strong></li>
              <li><code>ad_personalization</code>: <strong>denied</strong></li>
              <li><code>analytics_storage</code>: <strong>denied</strong></li>
              <li><code>functionality_storage</code>: <strong>granted</strong> (cookies técnicas)</li>
              <li><code>personalization_storage</code>: <strong>denied</strong></li>
              <li><code>security_storage</code>: <strong>granted</strong> (cookies de seguridad/antifraude)</li>
            </ul>
            <p>
              Esto significa que <strong>antes de que aceptes el banner</strong>, ningún sistema
              de análisis o publicidad recibe datos personales tuyos. Cuando aceptas,
              actualizamos las señales mediante <code>gtag('consent','update', ...)</code> y solo
              entonces empieza la medición consentida.
            </p>

            <h2>5. Gestión y desactivación</h2>
            <p>
              Puedes aceptar, rechazar o configurar las cookies en el banner de consentimiento al
              acceder al sitio. También puedes gestionarlas desde la configuración de tu navegador:
            </p>
            <ul>
              <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer">Google Chrome</a></li>
              <li><a href="https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias" target="_blank" rel="noopener noreferrer">Mozilla Firefox</a></li>
              <li><a href="https://support.apple.com/es-es/HT201265" target="_blank" rel="noopener noreferrer">Safari</a></li>
              <li><a href="https://support.microsoft.com/es-es/help/4027947" target="_blank" rel="noopener noreferrer">Microsoft Edge</a></li>
            </ul>
            <p>
              La desactivación de cookies analíticas no impide el uso del sitio, pero limita
              nuestra capacidad de mejorarlo.
            </p>

            <h2>6. Más información</h2>
            <p>
              Para más información sobre el uso de cookies en España, puede consultar la guía oficial
              de la Agencia Española de Protección de Datos:{' '}
              <a href="https://www.aepd.es/guias/guia-cookies.pdf" target="_blank" rel="noopener noreferrer">
                Guía sobre el uso de cookies (AEPD)
              </a>
              .
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
