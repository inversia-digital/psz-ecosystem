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
}

export default nextConfig
