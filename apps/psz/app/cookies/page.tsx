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

            <h2>2. Cookies utilizadas en psz.es</h2>

            <h3>2.1 Cookies técnicas o necesarias</h3>
            <p>
              Imprescindibles para el funcionamiento del sitio. No requieren consentimiento del
              usuario. Se usan para:
            </p>
            <ul>
              <li>Garantizar la sesión segura del usuario y prevenir ataques CSRF.</li>
              <li>Recordar las preferencias mostradas (consentimiento de cookies, idioma).</li>
              <li>Distribuir la carga del servidor (Vercel Edge Network).</li>
            </ul>

            <h3>2.2 Cookies de análisis</h3>
            <p>Requieren consentimiento previo. Nos permiten medir el uso del sitio para mejorarlo:</p>
            <ul>
              <li><strong>Google Analytics 4</strong> — análisis de tráfico y comportamiento. Datos agregados, IP anonimizada.</li>
              <li><strong>PostHog Cloud EU</strong> — análisis de producto en servidores europeos. Cumple RGPD nativamente.</li>
            </ul>

            <h3>2.3 Cookies publicitarias</h3>
            <p>
              <strong>psz.es no utiliza cookies publicitarias propias ni de terceros.</strong> No
              compartimos datos con redes publicitarias.
            </p>

            <h2>3. Gestión y desactivación</h2>
            <p>
              Puede aceptar, rechazar o configurar las cookies en el banner de consentimiento al
              acceder al sitio. También puede gestionarlas desde la configuración de su navegador:
            </p>
            <ul>
              <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer">Google Chrome</a></li>
              <li><a href="https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias" target="_blank" rel="noopener noreferrer">Mozilla Firefox</a></li>
              <li><a href="https://support.apple.com/es-es/HT201265" target="_blank" rel="noopener noreferrer">Safari</a></li>
              <li><a href="https://support.microsoft.com/es-es/help/4027947" target="_blank" rel="noopener noreferrer">Microsoft Edge</a></li>
            </ul>
            <p>
              La desactivación de cookies analíticas no impide el uso del sitio, pero limita nuestra
              capacidad de mejorarlo.
            </p>

            <h2>4. Más información</h2>
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
