import type { Organization, WithContext } from 'schema-dts'
import { INVERSIA, PALANTIO, SITE_URLS } from '../profile'

export function organizationSchema(siteUrl: string = SITE_URLS.psz): WithContext<Organization> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${siteUrl}/#organization`,
    name: INVERSIA.displayName,
    legalName: INVERSIA.legalName,
    alternateName: [...INVERSIA.alternateNames],
    url: siteUrl,
    logo: `${siteUrl}/images/logo.png`,
    telephone: INVERSIA.phone,
    email: INVERSIA.email,
    taxID: INVERSIA.taxId,
    founder: {
      '@type': 'Person',
      name: INVERSIA.founderName,
      url: INVERSIA.founderUrl,
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: INVERSIA.address.street,
      postalCode: INVERSIA.address.postalCode,
      addressLocality: INVERSIA.address.city,
      addressRegion: INVERSIA.address.region,
      addressCountry: INVERSIA.address.country,
    },
    parentOrganization: {
      '@type': 'Organization',
      name: PALANTIO.displayName,
      identifier: PALANTIO.taxId,
    },
    areaServed: { '@type': 'Country', name: 'España' },
    sameAs: [SITE_URLS.anici, SITE_URLS.inarpa, SITE_URLS.hipobrokers],
  }
}
