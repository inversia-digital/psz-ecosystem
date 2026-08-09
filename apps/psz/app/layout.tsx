import type { Metadata, Viewport } from 'next'
import { Inter, Gelasio } from 'next/font/google'
import Script from 'next/script'
import { GoogleTagManager } from '@next/third-parties/google'
import { SpeedInsights } from '@vercel/speed-insights/next'
import {
  personSchema,
  organizationSchema,
  professionalServiceSchema,
  SITE_URLS,
  TONO,
} from '@psz/seo'
import { JsonLd } from '@psz/ui'
import CookieBanner from './_components/CookieBanner'
import SiteHeader from './_components/SiteHeader'
import SiteFooter from './_components/SiteFooter'
import './globals.css'

const GTM_ID = 'GTM-562TXZDP'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

// Tipografía del logotipo (monograma T·P) — elegida: Gelasio.
// Métricamente idéntica a Georgia, empaquetada → idéntica en todos los
// dispositivos (pantalla, móvil, PDF, redes).
const gelasio = Gelasio({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-gelasio',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URLS.psz),
  title: {
    default: `${TONO.shortName} | Broker hipotecario nº ${TONO.credentials.bdeId} · Presidente ANICI`,
    template: `%s | ${TONO.shortName}`,
  },
  description:
    'Broker hipotecario registrado en Banco de España (E242) y presidente de ANICI. Asesoría hipotecaria en toda España. Las hipotecas que tu banco no te cuenta.',
  applicationName: 'PSZ — Toño Palacios',
  authors: [{ name: TONO.fullName, url: `${SITE_URLS.psz}/sobre-mi` }],
  creator: `${TONO.fullName} (${TONO.shortName})`,
  publisher: 'Inversia Global Digital, S.L.U.',
  generator: 'Next.js',
  other: {
    'copyright': `© ${new Date().getFullYear()} Inversia Global Digital, S.L.U. (CIF B75281394). Diseño y código de Antonio Palacios Cambero (Toño Palacios), broker hipotecario nº E242 (Banco de España). https://psz.es/sobre-mi`,
    'designer': 'Antonio Palacios Cambero (Toño Palacios) — broker hipotecario nº E242',
    'owner': 'Inversia Global Digital, S.L.U. — CIF B75281394 — https://psz.es',
    'reply-to': 'info@inversiadigital.es',
    'identifier-URL': SITE_URLS.psz,
  },
  keywords: [
    'broker hipotecario',
    'broker hipotecario España',
    'intermediario crédito inmobiliario',
    'Toño Palacios',
    'Antonio Palacios',
    'mejor broker hipotecario',
    'personal shopper inmobiliario',
    'ANICI',
    'E242',
  ],
  alternates: {
    canonical: SITE_URLS.psz,
  },
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: SITE_URLS.psz,
    siteName: 'Toño Palacios — PSZ',
    title: `${TONO.shortName} | Broker hipotecario nº ${TONO.credentials.bdeId} · Presidente ANICI`,
    description:
      'Broker hipotecario registrado en Banco de España (E242) y presidente de ANICI. Asesoría hipotecaria en toda España.',
    images: [
      {
        url: '/og-default.jpg',
        width: 1200,
        height: 630,
        alt: 'Toño Palacios, broker hipotecario en España',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${TONO.shortName} | Broker hipotecario E242 · Presidente ANICI`,
    description:
      'Broker hipotecario registrado en Banco de España (E242) y presidente de ANICI. Servicio nacional.',
    images: ['/og-default.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  verification: {
    other: {
      'msvalidate.01': '4EF22D6E29D1B1314C7B4C756EA7799C',
    },
  },
}

export const viewport: Viewport = {
  themeColor: '#0F1B3D',
  width: 'device-width',
  initialScale: 1,
}

/**
 * SourceCredit — inyecta un comentario HTML literal al inicio del <head>.
 *
 * React no admite comentarios HTML como nodos JSX, así que usamos
 * dangerouslySetInnerHTML sobre un script con type="text/html-comment"
 * (un MIME que ningún navegador ejecuta) para que el comentario quede
 * presente en el HTML servido sin afectar al render.
 *
 * Propósito: cualquiera que haga "ver código fuente" o scrape la página
 * verá la atribución completa. No es DRM, es una huella legal/forense
 * útil para reclamar autoría si alguien clona el código.
 */
function SourceCredit() {
  const credit = `
═══════════════════════════════════════════════════════════════════════════════
  psz.es — Calculadoras y contenido propiedad intelectual de:

  Antonio Palacios Cambero ("Toño Palacios")
  Broker hipotecario nº E242 (Banco de España, Ley 5/2019)
  Presidente de ANICI · Asociado fundador ANICI-001
  Fundador del instituto INARPA

  Sociedad operativa: INVERSIA GLOBAL DIGITAL, S.L.U. (CIF B75281394)
  Web oficial: https://psz.es/sobre-mi
  Verificación BdE: https://app.bde.es/rbe_spa/  (buscar "E242")

  © ${new Date().getFullYear()} — Reproducción no autorizada sancionable conforme
  al RDL 1/1996 (Texto Refundido de la Ley de Propiedad Intelectual).

  Si has llegado aquí desde "ver código fuente", ahora ya sabes a quién
  atribuir esta web — y a quién contactar si quieres trabajar con él.
═══════════════════════════════════════════════════════════════════════════════
`
  return (
    <script
      type="text/html-comment"
      dangerouslySetInnerHTML={{ __html: `\n<!--${credit}-->\n` }}
    />
  )
}

/**
 * OJO con la forma de este árbol: `<html>` solo puede tener `<head>` y `<body>`
 * como hijos. Antes colgaban de él un `<Script>` y `<GoogleTagManager>`, y había
 * además un `<head>` escrito a mano. El navegador reubica esos nodos al parsear,
 * así que el DOM real (head, body) no coincidía con el árbol que React esperaba
 * al hidratar → error #418 en todas las páginas y, al ocurrir fuera de un
 * Suspense, #423: React tiraba el HTML del servidor y repintaba TODA la página
 * en el cliente. Todo va ahora dentro de `<body>`; el `<head>` lo gestiona Next
 * con la Metadata API, que es lo que documenta el App Router.
 *
 * El orden entre el consent mode y GoogleTagManager SE MANTIENE: es requisito
 * de RGPD/LSSI y está auditado.
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${inter.variable} ${gelasio.variable}`}>
      <body>
        {/* CONSENT MODE V2 — defaults DENIED por RGPD + LSSI. Tiene que ir
            ANTES de GoogleTagManager para que el primer hit lleve las señales
            de consentimiento al servidor. Cuando aparezca el banner de
            cookies, en accept se llamará a gtag('consent','update',{...}).
            Con strategy="beforeInteractive" Next lo iza al HTML inicial, así que
            sigue ejecutándose antes que GTM aunque viva dentro de <body>. */}
        <Script id="consent-mode-default" strategy="beforeInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent', 'default', {
  'ad_storage': 'denied',
  'ad_user_data': 'denied',
  'ad_personalization': 'denied',
  'analytics_storage': 'denied',
  'functionality_storage': 'granted',
  'personalization_storage': 'denied',
  'security_storage': 'granted',
  'wait_for_update': 500
});
gtag('set', 'ads_data_redaction', true);
gtag('set', 'url_passthrough', true);`}
        </Script>
        <GoogleTagManager gtmId={GTM_ID} />
        {/*
         * SourceCredit — comentario HTML embebido en el documento.
         * Si alguien hace "ver código fuente" o scrapea esta página,
         * se lleva la atribución. Invisible para usuarios normales.
         */}
        <SourceCredit />
        <JsonLd data={personSchema()} />
        <JsonLd data={organizationSchema()} />
        <JsonLd data={professionalServiceSchema()} />
        <SiteHeader />
        {children}
        <SiteFooter />
        <CookieBanner />
        <SpeedInsights />
      </body>
    </html>
  )
}
