/**
 * Las páginas /preview/* son herramientas INTERNAS (logos, manual de
 * marca, tipografía).
 *
 * El control de acceso vive en `middleware.ts`:
 *  - localhost  → acceso libre (verificación en desarrollo)
 *  - cualquier otro host → HTTP Basic Auth (PREVIEW_USER / PREVIEW_PASS)
 *  - sin PREVIEW_PASS configurado → 404 (nunca queda abierto)
 *
 * Además: noindex en cada página + Disallow /preview/ en robots.txt.
 */
export default function PreviewLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
