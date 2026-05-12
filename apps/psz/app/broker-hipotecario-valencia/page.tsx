import type { Metadata } from 'next'
import { SITE_URLS } from '@psz/seo'
import { LocalPillar } from '../_components/LocalPillar'
import { getCityBySlug } from '../_data/cities'

const city = getCityBySlug('valencia')!
const url = `${SITE_URLS.psz}/broker-hipotecario-${city.slug}`

export const metadata: Metadata = {
  title: 'Broker hipotecario en Valencia · Toño Palacios E242',
  description:
    'Broker hipotecario para clientes en Valencia. Registrado en Banco de España E242, presidente de ANICI. Especializado en inversión, alquiler vacacional regulado y compradores extranjeros.',
  alternates: { canonical: url },
  openGraph: {
    url,
    title: 'Broker hipotecario en Valencia · Toño Palacios E242',
    description: city.angle,
    type: 'article',
    locale: 'es_ES',
  },
}

export default function Page() {
  return <LocalPillar city={city} />
}
