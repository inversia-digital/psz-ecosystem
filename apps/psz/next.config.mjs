/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Permitir importar packages locales del monorepo sin pre-compilarlos
  transpilePackages: ['@psz/ui', '@psz/seo', '@psz/design-system'],
  experimental: {
    // optimizePackageImports mejora tree-shaking en imports masivos
    optimizePackageImports: ['@psz/ui'],
  },
  // Headers de seguridad reforzados (anti-clickjacking, anti-XSS, anti-MITM,
  // anti-scraping moderado y compatible con AI Overviews / SEO normal)
  async headers() {
    // CSP que permite los proveedores que usamos: Vercel Analytics + Speed Insights,
    // Google Tag Manager + GA4, PostHog Cloud EU, fuentes Google (Inter).
    // Si más adelante añadimos Stripe.js, Resend o cualquier dominio externo,
    // hay que añadirlo aquí.
    const csp = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.vercel-scripts.com https://*.googletagmanager.com https://*.google-analytics.com https://eu.i.posthog.com https://*.posthog.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' data: https://fonts.gstatic.com",
      "img-src 'self' data: blob: https: ",
      "connect-src 'self' https://*.vercel-insights.com https://vitals.vercel-insights.com https://*.google-analytics.com https://eu.i.posthog.com https://*.posthog.com https://*.ingest.sentry.io",
      "frame-src 'self' https://www.googletagmanager.com",
      "frame-ancestors 'none'",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self' https://crm.hipobrokers.com",
      'upgrade-insecure-requests',
    ].join('; ')

    return [
      {
        source: '/(.*)',
        headers: [
          // Seguridad básica (ya existían)
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' },

          // Anti-clickjacking — denegamos embed en iframes incluso desde otros sitios
          { key: 'X-Frame-Options', value: 'DENY' },

          // HSTS — forzar HTTPS durante 1 año, incluyendo subdominios. Preload-ready
          { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains; preload' },

          // Aislamiento de cross-origin
          { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
          { key: 'Cross-Origin-Resource-Policy', value: 'same-site' },

          // CSP definida arriba
          { key: 'Content-Security-Policy', value: csp },

          // Bloquear FLoC / Topics API (privacidad y cumplimiento RGPD)
          { key: 'Permissions-Policy', value: 'interest-cohort=(), browsing-topics=()' },

          // Anti-MIME-sniffing reforzado
          { key: 'X-Download-Options', value: 'noopen' },

          // Aviso copyright (no técnico, pero queda en headers)
          { key: 'X-Copyright', value: '© Inversia Global Digital S.L. - Todos los derechos reservados' },
        ],
      },
      {
        // Archivos legales: que no se embeban en iframe + sin caché agresiva
        source: '/(aviso-legal|politica-privacidad|cookies|terminos|tarifas-y-comisiones|reclamaciones|informacion-pre-contractual|codigo-de-conducta|disclaimer-estructuras-internacionales)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=3600, must-revalidate' },
          { key: 'X-Robots-Tag', value: 'index, follow, noarchive' },
        ],
      },
      {
        source: '/llms.txt',
        headers: [{ key: 'Content-Type', value: 'text/plain; charset=utf-8' }],
      },
    ]
  },

  // 301 redirects desde URLs antiguas del WordPress al nuevo Next.js.
  // Importantes para preservar SEO al hacer el cutover DNS.
  async redirects() {
    return [
      // Servicios — redirigen al pillar nacional o a su sección
      { source: '/psi', destination: '/sobre-mi#equipo', permanent: true },
      { source: '/reunificar-deudas', destination: '/broker-hipotecario#tipos', permanent: true },
      { source: '/eliminar-aval', destination: '/broker-hipotecario#tipos', permanent: true },

      // Oportunidades — redirigen al canal Telegram (intención del usuario)
      {
        source: '/oportunidades',
        destination: 'https://t.me/+SB3qrIEnuScxNjgy',
        permanent: true,
        basePath: false,
      },
      {
        source: '/oportunidades-de-inversion-inmobiliaria',
        destination: 'https://t.me/+SB3qrIEnuScxNjgy',
        permanent: true,
        basePath: false,
      },
      {
        source: '/oportunidad-flip-alicante',
        destination: 'https://t.me/+SB3qrIEnuScxNjgy',
        permanent: true,
        basePath: false,
      },

      // Formulario hipoteca — redirige al CRM Hipobrokers
      {
        source: '/solicitar-hipoteca',
        destination: 'https://crm.hipobrokers.com/users/referer-ici-account/5XsQSB9RBlyqZxX3xvCV',
        permanent: true,
        basePath: false,
      },

      // Página obsoleta de gestión logística — redirige al aviso legal
      { source: '/gestion-logistica', destination: '/aviso-legal', permanent: true },

      // Confirmaciones de alta — al home
      { source: '/alta-confirmada', destination: '/', permanent: false },
    ]
  },
}

export default nextConfig
