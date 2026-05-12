import { INVERSIA, TONO, SITE_URLS } from '../profile'

/**
 * Schema ProfessionalService para psz.es.
 *
 * Devuelve un objeto sin tipar estrictamente con schema-dts porque
 * ProfessionalServiceLeaf en schema-dts no expone `serviceType` ni `provider`
 * (los hereda de Service en schema.org, pero schema-dts es conservador).
 * El JSON resultante es válido en validator.schema.org y Google Rich Results.
 */
export function professionalServiceSchema(
  siteUrl: string = SITE_URLS.psz,
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Toño Palacios — Broker Hipotecario',
    image: TONO.image,
    url: siteUrl,
    telephone: INVERSIA.phone,
    email: INVERSIA.email,
    priceRange: '€€',
    // Dirección fiscal de la empresa operativa (Cuarte de Huerva, Zaragoza).
    // No significa que solo opere allí — el servicio es nacional (ver areaServed).
    address: {
      '@type': 'PostalAddress',
      streetAddress: INVERSIA.address.street,
      postalCode: INVERSIA.address.postalCode,
      addressLocality: INVERSIA.address.city,
      addressRegion: INVERSIA.address.region,
      addressCountry: INVERSIA.address.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: INVERSIA.geo.latitude,
      longitude: INVERSIA.geo.longitude,
    },
    // Servicio nacional — España como primario, Zaragoza/Aragón secundarios para SEO local.
    areaServed: [
      { '@type': 'Country', name: 'España' },
      { '@type': 'AdministrativeArea', name: 'Aragón' },
      { '@type': 'City', name: 'Zaragoza' },
    ],
    serviceType: [
      'Intermediación hipotecaria',
      'Personal Shopper Inmobiliario',
      'Asesoramiento financiero inmobiliario',
      'Reunificación de deudas',
      'Eliminación de avalistas',
    ],
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
