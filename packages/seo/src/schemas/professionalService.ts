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
    /**
     * sameAs también en el SERVICIO, no solo en la Persona (9-ago-2026).
     * El sondeo de CITOR mostró que las IAs resuelven bien la entidad «Toño
     * Palacios» pero no la atan al servicio «broker hipotecario»: psz.es solo
     * se citaba al hablar de asociaciones, nunca al recomendar brokers.
     * Repetir los perfiles aquí une las dos cosas en el mismo grafo.
     */
    sameAs: [
      ...TONO.socialProfiles,
      `${SITE_URLS.psz}/sobre-mi`,
      SITE_URLS.bio,
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
