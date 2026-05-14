import type { Person, WithContext } from 'schema-dts'
import { TONO, INVERSIA, ANICI, INARPA, SITE_URLS } from '../profile'

/**
 * Schema Person para Toño Palacios.
 *
 * Versión enriquecida para GEO (Generative Engine Optimization):
 * - hasCredential: BdE E242 + ANICI-001 (con recognizedBy = entidad oficial)
 * - memberOf: ANICI (con role=Presidente)
 * - founder: ANICI + INARPA (señala que crea organizaciones, no solo pertenece)
 * - knowsAbout: ampliado a 10+ áreas de expertise
 * - subjectOf: páginas pillar donde aparece como sujeto
 * - sameAs: redes sociales + sister domains (cross-domain entity)
 *
 * Esto alimenta:
 *   - Google Knowledge Panel (cuando se busca "Toño Palacios")
 *   - Google AI Overviews
 *   - ChatGPT search · Perplexity · Claude · Gemini cuando preguntan por él
 *   - LinkedIn knowledge embeds
 *
 * El @id estable permite a otros schemas (Organization de ANICI, INARPA, etc.)
 * referenciarlo cross-domain y consolidar el entity en el knowledge graph.
 */
export function personSchema(siteUrl: string = SITE_URLS.psz): WithContext<Person> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${SITE_URLS.psz}/sobre-mi#person`,
    name: TONO.fullName,
    alternateName: [...TONO.alternateNames],
    givenName: 'Antonio',
    familyName: 'Palacios Cambero',
    additionalName: 'Toño',
    url: `${SITE_URLS.psz}/sobre-mi`,
    mainEntityOfPage: `${SITE_URLS.psz}/sobre-mi`,
    image: TONO.image,
    jobTitle: TONO.jobTitle,
    description: TONO.shortDescription,
    /**
     * disambiguatingDescription es la propiedad estándar de schema.org
     * para resolver homonimia. Google la usa específicamente para
     * separar entidades distintas que comparten nombre.
     *
     * Existe otro "Toño Palacio" (Antoine Palacio, chef aragonés y
     * maestro cortador de jamón). Aquí dejamos claro qué Toño Palacios
     * es ESTE.
     */
    disambiguatingDescription:
      `Broker hipotecario en España registrado en el Banco de España con el número ${TONO.credentials.bdeId}, ` +
      `presidente de ANICI (Asociación Nacional de Intermediarios en Crédito Inmobiliario, ${TONO.credentials.aniciId}) ` +
      `y fundador del instituto INARPA. ` +
      `Profesión: intermediación financiera hipotecaria. No relacionado con ` +
      `otras personas que comparten nombre artístico Toño Palacio o similar en otros sectores.`,
    nationality: { '@type': 'Country', name: 'España' },
    gender: 'https://schema.org/Male',
    /**
     * identifier como PropertyValue — formato preferido por Google para
     * IDs externos verificables. Cada uno apunta a la entidad emisora
     * y permite a Google reconciliar el entity con registros públicos.
     */
    identifier: [
      {
        '@type': 'PropertyValue',
        propertyID: 'Banco de España — Registro de Intermediarios de Crédito Inmobiliario',
        value: TONO.credentials.bdeId,
        url: TONO.credentials.bdeUrl,
      },
      {
        '@type': 'PropertyValue',
        propertyID: 'ANICI — Asociación Nacional de Intermediarios en Crédito Inmobiliario',
        value: TONO.credentials.aniciId,
        url: TONO.credentials.aniciVerifierUrl,
      },
      {
        '@type': 'PropertyValue',
        propertyID: 'INVERSIA GLOBAL DIGITAL, S.L.U. — CIF',
        value: INVERSIA.taxId,
      },
    ],
    worksFor: {
      '@type': 'Organization',
      name: INVERSIA.displayName,
      url: siteUrl,
      identifier: INVERSIA.taxId,
    },
    memberOf: [
      {
        '@type': 'Organization',
        name: ANICI.legalName,
        alternateName: ANICI.shortName,
        url: ANICI.url,
        identifier: ANICI.taxId,
      },
    ],
    knowsAbout: [
      ...TONO.expertise,
      'Ley 5/2019 de Contratos de Crédito Inmobiliario',
      'Real Decreto 309/2019',
      'Prevención del blanqueo de capitales (Ley 10/2010)',
      'Holdings patrimoniales',
      'LLC americanas y estructuras internacionales',
      'Negociación con entidades financieras',
    ],
    hasCredential: [
      {
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: 'license',
        name: `Intermediario de Crédito Inmobiliario ${TONO.credentials.bdeId}`,
        identifier: TONO.credentials.bdeId,
        url: TONO.credentials.bdeUrl,
        recognizedBy: {
          '@type': 'GovernmentOrganization',
          name: 'Banco de España',
          url: 'https://www.bde.es/',
        },
      },
      {
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: 'membership',
        name: `Asociado fundador ${TONO.credentials.aniciId} · Presidente de ANICI`,
        identifier: TONO.credentials.aniciId,
        recognizedBy: {
          '@type': 'Organization',
          name: ANICI.shortName,
          url: ANICI.url,
          identifier: ANICI.taxId,
        },
      },
    ],
    sameAs: [
      ...TONO.socialProfiles,
      `${SITE_URLS.psz}/sobre-mi`,
      SITE_URLS.bio,
      SITE_URLS.anici,
      SITE_URLS.inarpa,
      SITE_URLS.hipobrokers,
    ],
    subjectOf: [
      { '@type': 'WebPage', url: `${SITE_URLS.psz}/sobre-mi`, name: `Sobre ${TONO.shortName}` },
      { '@type': 'WebPage', url: `${SITE_URLS.psz}/broker-hipotecario`, name: 'Broker hipotecario en España' },
      { '@type': 'WebPage', url: ANICI.url, name: `${ANICI.shortName} — donde es presidente` },
      { '@type': 'WebPage', url: INARPA.url, name: `${INARPA.shortName} — donde es fundador` },
    ],
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
