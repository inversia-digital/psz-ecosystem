import type { Metadata } from 'next'
import { SITE_URLS } from '@psz/seo'
import { Container, Section } from '@psz/ui'
import CookiePrefsButton from '../_components/CookiePrefsButton'

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

            <h2>5. Tabla técnica de cookies utilizadas</h2>
            <p>
              Relación concreta de cookies que pueden instalarse en psz.es e inarpa.es según las
              opciones del usuario en el banner de consentimiento. La relación puede variar en
              función de los servicios activos en cada momento; el usuario puede revisar, aceptar
              o rechazar las cookies no técnicas desde el panel de configuración del banner.
            </p>
            <div className="not-prose my-6 overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-navy-50 text-navy-800">
                    <th className="text-left px-3 py-2 border border-navy-100 font-semibold">Cookie</th>
                    <th className="text-left px-3 py-2 border border-navy-100 font-semibold">Proveedor</th>
                    <th className="text-left px-3 py-2 border border-navy-100 font-semibold">Finalidad</th>
                    <th className="text-left px-3 py-2 border border-navy-100 font-semibold">Tipo</th>
                    <th className="text-left px-3 py-2 border border-navy-100 font-semibold">Duración</th>
                    <th className="text-left px-3 py-2 border border-navy-100 font-semibold">Base jurídica</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-3 py-2 border border-navy-100"><code>psz_cc</code></td>
                    <td className="px-3 py-2 border border-navy-100">psz.es</td>
                    <td className="px-3 py-2 border border-navy-100">Almacenar la decisión del usuario en el banner de consentimiento.</td>
                    <td className="px-3 py-2 border border-navy-100">Técnica</td>
                    <td className="px-3 py-2 border border-navy-100">365 días</td>
                    <td className="px-3 py-2 border border-navy-100">Interés legítimo (art. 22.2 LSSI)</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 border border-navy-100"><code>_ga</code></td>
                    <td className="px-3 py-2 border border-navy-100">Google Analytics 4</td>
                    <td className="px-3 py-2 border border-navy-100">Identificar al usuario para medición agregada de tráfico.</td>
                    <td className="px-3 py-2 border border-navy-100">Análisis</td>
                    <td className="px-3 py-2 border border-navy-100">24 meses</td>
                    <td className="px-3 py-2 border border-navy-100">Consentimiento</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 border border-navy-100"><code>_ga_*</code></td>
                    <td className="px-3 py-2 border border-navy-100">Google Analytics 4</td>
                    <td className="px-3 py-2 border border-navy-100">Persistir el estado de la sesión en la propiedad GA4 concreta.</td>
                    <td className="px-3 py-2 border border-navy-100">Análisis</td>
                    <td className="px-3 py-2 border border-navy-100">24 meses</td>
                    <td className="px-3 py-2 border border-navy-100">Consentimiento</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 border border-navy-100"><code>ph_*</code></td>
                    <td className="px-3 py-2 border border-navy-100">PostHog Cloud EU</td>
                    <td className="px-3 py-2 border border-navy-100">Análisis de producto y eventos. Servidores en Frankfurt (UE).</td>
                    <td className="px-3 py-2 border border-navy-100">Análisis</td>
                    <td className="px-3 py-2 border border-navy-100">12 meses</td>
                    <td className="px-3 py-2 border border-navy-100">Consentimiento</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 border border-navy-100"><code>__vercel_*</code></td>
                    <td className="px-3 py-2 border border-navy-100">Vercel Inc.</td>
                    <td className="px-3 py-2 border border-navy-100">Distribución de carga en el edge network. No identifica al usuario.</td>
                    <td className="px-3 py-2 border border-navy-100">Técnica</td>
                    <td className="px-3 py-2 border border-navy-100">Sesión</td>
                    <td className="px-3 py-2 border border-navy-100">Interés legítimo (art. 22.2 LSSI)</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 border border-navy-100"><code>_GRECAPTCHA</code></td>
                    <td className="px-3 py-2 border border-navy-100">Google reCAPTCHA</td>
                    <td className="px-3 py-2 border border-navy-100">Protección antispam de formularios externos vinculados (CRM Hipobrokers, DocuSign).</td>
                    <td className="px-3 py-2 border border-navy-100">Técnica</td>
                    <td className="px-3 py-2 border border-navy-100">6 meses</td>
                    <td className="px-3 py-2 border border-navy-100">Interés legítimo (seguridad)</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-ink-muted">
              Nota: psz.es e inarpa.es <strong>no instalan a fecha de hoy cookies publicitarias</strong>{' '}
              propias ni de terceros. Si en el futuro se incorporasen (por ejemplo, Meta Pixel,
              TikTok Pixel, LinkedIn Insight Tag, Google Ads), esta tabla se actualizaría con el
              detalle correspondiente y se requeriría consentimiento expreso.
            </p>

            <h2>6. Cambiar tu decisión en cualquier momento</h2>
            <p>
              Si quieres revocar o modificar tu consentimiento, pulsa el botón siguiente. Se
              borrará tu decisión actual y volverá a aparecer el banner de cookies para que
              elijas de nuevo:
            </p>
            <p>
              <CookiePrefsButton />
            </p>

            <h2>7. Gestión y desactivación</h2>
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

            <h2>8. Más información</h2>
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
