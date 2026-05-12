import type { Metadata } from 'next'
import { SITE_URLS } from '@psz/seo'
import { LocalPillar } from '../_components/LocalPillar'
import { getCityBySlug } from '../_data/cities'

const city = getCityBySlug('madrid')!
const url = `${SITE_URLS.psz}/broker-hipotecario-${city.slug}`

export const metadata: Metadata = {
  title: 'Broker hipotecario en Madrid · Toño Palacios E242',
  description:
    'Broker hipotecario para clientes en Madrid. Registrado en Banco de España E242, presidente de ANICI. Especializado en no residentes, hipotecas de alto importe y banca privada. Sin coste de desplazamiento.',
  alternates: { canonical: url },
  openGraph: {
    url,
    title: 'Broker hipotecario en Madrid · Toño Palacios E242',
    description: city.angle,
    type: 'article',
    locale: 'es_ES',
  },
}

export default function Page() {
  return <LocalPillar city={city} />
}
