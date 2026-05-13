/**
 * WebSite schema — declara el sitio como entidad coherente para el grafo SEO.
 *
 * Aporta tres señales útiles a Google y a motores IA:
 *  1. `@id` estable `${SITE_URLS.psz}/#website` que otros schemas pueden
 *     referenciar via `isPartOf` (Articles, WebPages, etc.).
 *  2. `potentialAction.SearchAction` → habilita el sitelinks search box
 *     en SERP. Aquí lo apuntamos al hub de FAQ (preguntas-frecuentes)
 *     porque NO tenemos buscador on-site real; las IAs lo interpretan
 *     como "este sitio tiene un repositorio Q&A consultable".
 *  3. `publisher` apunta a la Organization que opera el sitio
 *     (Inversia Global Digital) y `author/creator` a Toño Palacios como
 *     Person — refuerza E-E-A-T en el grafo.
 *
 * Spec: https://schema.org/WebSite
 * Sitelinks search: https://developers.google.com/search/docs/appearance/sitelinks-search-box
 */

import { INVERSIA, SITE_URLS, TONO } from '../profile'

export function websiteSchema(siteUrl: string = SITE_URLS.psz) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteUrl}/#website`,
    url: siteUrl,
    name: 'psz.es — Toño Palacios',
    alternateName: ['Toño Palacios', 'PSZ.es', 'Inversia Global Digital'],
    description:
      `${TONO.shortName} — broker hipotecario en España (Banco de España nº ${TONO.credentials.bdeId}), ` +
      `presidente de ANICI y fundador del instituto INARPA. ` +
      `Servicios de intermediación hipotecaria, Personal Shopper Inmobiliario y estructuras societarias.`,
    inLanguage: 'es-ES',
    publisher: {
      '@type': 'Organization',
      '@id': `${siteUrl}/#organization`,
      name: INVERSIA.displayName,
      legalName: INVERSIA.legalName,
      identifier: INVERSIA.taxId,
      url: siteUrl,
    },
    author: { '@id': `${SITE_URLS.psz}/sobre-mi#person` },
    creator: { '@id': `${SITE_URLS.psz}/sobre-mi#person` },
    copyrightHolder: {
      '@type': 'Organization',
      '@id': `${siteUrl}/#organization`,
      name: INVERSIA.displayName,
    },
    copyrightYear: new Date().getFullYear(),
    /**
     * SearchAction apuntado al hub de FAQ. Las queries del usuario se
     * resuelven con un anchor `#q=` que el hub puede ignorar — lo importante
     * es la señal estructural de que existe un repositorio buscable.
     */
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteUrl}/preguntas-frecuentes?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
}
