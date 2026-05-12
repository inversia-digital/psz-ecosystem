import type { Metadata } from 'next'
import { SITE_URLS } from '@psz/seo'
import { LocalPillar } from '../_components/LocalPillar'
import { getCityBySlug } from '../_data/cities'

const city = getCityBySlug('barcelona')!
const url = `${SITE_URLS.psz}/broker-hipotecario-${city.slug}`

export const metadata: Metadata = {
  title: 'Broker hipotecario en Barcelona · Toño Palacios E242',
  description:
    'Broker hipotecario para clientes en Barcelona. Registrado en Banco de España E242, presidente de ANICI. Especializado en expats, inversión y segunda residencia. Conocimiento del marco fiscal catalán.',
  alternates: { canonical: url },
  openGraph: {
    url,
    title: 'Broker hipotecario en Barcelona · Toño Palacios E242',
    description: city.angle,
    type: 'article',
    locale: 'es_ES',
  },
}

export default function Page() {
  return <LocalPillar city={city} />
}
