import { INVERSIA, TONO } from '../profile'

export interface CitySchemaInput {
  cityName: string
  region: string
  latitude?: number
  longitude?: number
  url: string
}

/**
 * Schema FinancialService localizado por ciudad.
 * Refuerza señal de SEO local en Google. El primario es siempre España, pero se
 * añade la ciudad como areaServed dominante para el pillar local.
 */
export function localFinancialServiceSchema(input: CitySchemaInput): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FinancialService',
    name: `Toño Palacios — Broker hipotecario en ${input.cityName}`,
    image: TONO.image,
    url: input.url,
    telephone: INVERSIA.phone,
    email: INVERSIA.email,
    priceRange: '€€',
    address: {
      '@type': 'PostalAddress',
      streetAddress: INVERSIA.address.street,
      postalCode: INVERSIA.address.postalCode,
      addressLocality: INVERSIA.address.city,
      addressRegion: INVERSIA.address.region,
      addressCountry: INVERSIA.address.country,
    },
    geo: input.latitude != null && input.longitude != null
      ? { '@type': 'GeoCoordinates', latitude: input.latitude, longitude: input.longitude }
      : undefined,
    areaServed: [
      { '@type': 'City', name: input.cityName },
      { '@type': 'AdministrativeArea', name: input.region },
      { '@type': 'Country', name: 'España' },
    ],
    serviceType: 'Intermediación hipotecaria',
    provider: {
      '@type': 'Organization',
      name: INVERSIA.displayName,
      identifier: INVERSIA.taxId,
    },
    founder: {
      '@type': 'Person',
      name: TONO.fullName,
      jobTitle: TONO.jobTitle,
      identifier: TONO.credentials.bdeId,
    },
  }
}
