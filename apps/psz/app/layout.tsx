import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import {
  personSchema,
  organizationSchema,
  professionalServiceSchema,
  SITE_URLS,
  TONO,
} from '@psz/seo'
import { JsonLd } from '@psz/ui'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URLS.psz),
  title: {
    default: `${TONO.shortName} | Broker hipotecario nº ${TONO.credentials.bdeId} en Zaragoza`,
    template: `%s | ${TONO.shortName}`,
  },
  description:
    'Broker hipotecario registrado en Banco de España (E242) y presidente de ANICI. Hipotecas y oportunidades inmobiliarias en Zaragoza, sin promesas vacías.',
  applicationName: 'PSZ',
  authors: [{ name: TONO.fullName, url: `${SITE_URLS.psz}/sobre-mi` }],
  generator: 'Next.js',
  keywords: [
    'broker hipotecario Zaragoza',
    'intermediario crédito inmobiliario',
    'Toño Palacios',
    'Antonio Palacios',
    'hipoteca Zaragoza',
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
    title: `${TONO.shortName} | Broker hipotecario nº ${TONO.credentials.bdeId} en Zaragoza`,
    description:
      'Broker hipotecario registrado en Banco de España (E242) y presidente de ANICI. Hipotecas y oportunidades inmobiliarias en Zaragoza.',
    images: [
      {
        url: '/og-default.jpg',
        width: 1200,
        height: 630,
        alt: 'Toño Palacios, broker hipotecario en Zaragoza',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${TONO.shortName} | Broker hipotecario E242 Zaragoza`,
    description:
      'Broker hipotecario registrado en Banco de España (E242) y presidente de ANICI.',
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
}

export const viewport: Viewport = {
  themeColor: '#0F1B3D',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={inter.variable}>
      <head>
        <JsonLd data={personSchema()} />
        <JsonLd data={organizationSchema()} />
        <JsonLd data={professionalServiceSchema()} />
      </head>
      <body>{children}</body>
    </html>
  )
}
