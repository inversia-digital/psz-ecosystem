import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
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
import './globals.css'

const GTM_ID = 'GTM-562TXZDP'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URLS.psz),
  title: {
    default: `${TONO.shortName} | Broker hipotecario nº ${TONO.credentials.bdeId} · Presidente ANICI`,
    template: `%s | ${TONO.shortName}`,
  },
  description:
    'Broker hipotecario registrado en Banco de España (E242) y presidente de ANICI. Asesoría hipotecaria en toda España. Las hipotecas que tu banco no te cuenta.',
  applicationName: 'PSZ',
  authors: [{ name: TONO.fullName, url: `${SITE_URLS.psz}/sobre-mi` }],
  generator: 'Next.js',
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={inter.variable}>
      <GoogleTagManager gtmId={GTM_ID} />
      <head>
        <JsonLd data={personSchema()} />
        <JsonLd data={organizationSchema()} />
        <JsonLd data={professionalServiceSchema()} />
      </head>
      <body>
        {children}
        <SpeedInsights />
      </body>
    </html>
  )
}
