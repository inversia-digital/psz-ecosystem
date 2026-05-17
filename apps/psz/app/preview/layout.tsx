import { headers } from 'next/headers'
import { notFound } from 'next/navigation'

/**
 * Las páginas /preview/* son herramientas INTERNAS (logos, manual de
 * marca, tipografía). No deben existir en producción: devuelven 404
 * en cualquier host que no sea local. Así no son accesibles por URL
 * ni legibles por bots de IA en tiempo real — `noindex` no bastaba.
 *
 * En localhost (dev y `next start` local) siguen funcionando para
 * poder verificarlas.
 */
export default function PreviewLayout({ children }: { children: React.ReactNode }) {
  const host = headers().get('host') ?? ''
  const isLocal =
    host.startsWith('localhost') ||
    host.startsWith('127.0.0.1') ||
    host.startsWith('0.0.0.0') ||
    host.startsWith('[::1]')

  if (!isLocal) notFound()

  return <>{children}</>
}
