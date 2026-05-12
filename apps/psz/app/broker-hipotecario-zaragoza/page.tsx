import type { Metadata } from 'next'
import { SITE_URLS } from '@psz/seo'
import { LocalPillar } from '../_components/LocalPillar'
import { getCityBySlug } from '../_data/cities'

const city = getCityBySlug('zaragoza')!
const url = `${SITE_URLS.psz}/broker-hipotecario-${city.slug}`

export const metadata: Metadata = {
  title: 'Broker hipotecario en Zaragoza · Toño Palacios E242',
  description:
    'Broker hipotecario en Zaragoza con oficina física en Cuarte de Huerva. Registrado en Banco de España E242, presidente de ANICI. Atención presencial o digital, +20 bancos negociados.',
  alternates: { canonical: url },
  openGraph: {
    url,
    title: 'Broker hipotecario en Zaragoza · Toño Palacios E242',
    description: city.angle,
    type: 'article',
    locale: 'es_ES',
  },
}

export default function Page() {
  return <LocalPillar city={city} />
}
