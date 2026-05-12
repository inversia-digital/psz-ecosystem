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
  // Headers de seguridad y caching básicos
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
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
