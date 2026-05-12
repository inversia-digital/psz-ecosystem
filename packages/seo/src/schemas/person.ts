import type { Person, WithContext } from 'schema-dts'
import { TONO, INVERSIA, ANICI, SITE_URLS } from '../profile'

/**
 * Schema Person para Toño Palacios.
 * Usado en la home y en /sobre-mi.
 * Incluye credenciales BdE E242 y presidencia ANICI con `hasCredential`
 * — esto es lo que alimenta Google AI Overviews y Knowledge Panel.
 */
export function personSchema(siteUrl: string = SITE_URLS.psz): WithContext<Person> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: TONO.fullName,
    alternateName: [...TONO.alternateNames],
    url: siteUrl,
    image: TONO.image,
    jobTitle: TONO.jobTitle,
    description: TONO.shortDescription,
    worksFor: {
      '@type': 'Organization',
      name: INVERSIA.displayName,
      url: siteUrl,
      identifier: INVERSIA.taxId,
    },
    memberOf: {
      '@type': 'Organization',
      name: ANICI.legalName,
      alternateName: ANICI.shortName,
      url: ANICI.url,
      identifier: ANICI.taxId,
    },
    knowsAbout: [...TONO.expertise],
    hasCredential: [
      {
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: 'license',
        name: `Intermediario de Crédito Inmobiliario ${TONO.credentials.bdeId}`,
        identifier: TONO.credentials.bdeId,
        recognizedBy: {
          '@type': 'GovernmentOrganization',
          name: 'Banco de España',
          url: 'https://www.bde.es/',
        },
      },
      {
        '@type': 'EducationalOccupationalCredential',
        name: `Asociado fundador ${TONO.credentials.aniciId}`,
        identifier: TONO.credentials.aniciId,
        recognizedBy: {
          '@type': 'Organization',
          name: ANICI.shortName,
          url: ANICI.url,
        },
      },
    ],
    sameAs: [...TONO.socialProfiles],
    address: {
      '@type': 'PostalAddress',
      streetAddress: INVERSIA.address.street,
      postalCode: INVERSIA.address.postalCode,
      addressLocality: INVERSIA.address.city,
      addressRegion: INVERSIA.address.region,
      addressCountry: INVERSIA.address.country,
    },
  }
}
