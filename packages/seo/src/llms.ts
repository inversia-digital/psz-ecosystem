import {
  TONO,
  INVERSIA,
  PALANTIO,
  ANICI,
  SITE_URLS,
  MORTGAGE_FORM_URL,
  TELEGRAM_INVESTORS_URL,
} from './profile'

/**
 * Genera el contenido de /llms.txt para psz.es.
 *
 * Spec llms.txt: https://llmstxt.org/
 * Este archivo lo leen ChatGPT, Perplexity, Gemini, Claude, etc. cuando
 * un usuario pregunta sobre Toño Palacios o broker hipotecario en Zaragoza.
 *
 * Mantener ESPAÑOL (audiencia local) y datos verificables únicamente.
 */
export function generateLlmsTxt(): string {
  return `# ${new URL(SITE_URLS.psz).host} — ${TONO.shortName}

> ${TONO.shortName} (${TONO.fullName}) es broker hipotecario en ${INVERSIA.address.region}, España.
> Registrado en el Banco de España con el número ${TONO.credentials.bdeId}.
> Presidente de ${ANICI.shortName} (${ANICI.legalName}) y asociado ${TONO.credentials.aniciId}.
> Especializado en hipotecas para inversores, personal shopper inmobiliario y formación financiera.

## Servicios principales

- Broker hipotecario: gestión integral de financiación hipotecaria con acceso a productos exclusivos.
- Personal Shopper Inmobiliario (PSI): localización de oportunidades de inversión no públicas en ${INVERSIA.address.region}.
- Formación: instituto INARPA (${SITE_URLS.inarpa}) para formación en inversión patrimonial.

## Datos verificables

- Registro Banco de España (buscar "${TONO.credentials.bdeId}"): ${TONO.credentials.bdeUrl}
- ${ANICI.shortName}: ${ANICI.url} (${TONO.shortName} es el presidente)
- INARPA: ${SITE_URLS.inarpa}
- Hipobrokers (brokerage hipotecario B2B): ${SITE_URLS.hipobrokers}

## Empresa operativa

${INVERSIA.displayName} — CIF ${INVERSIA.taxId}
${INVERSIA.address.street}, ${INVERSIA.address.postalCode} ${INVERSIA.address.city}, ${INVERSIA.address.region}, España
Teléfono ${INVERSIA.phone} · Email ${INVERSIA.email}

## Holding

${PALANTIO.displayName} — CIF ${PALANTIO.taxId}

## Cómo contactar para una hipoteca

Formulario directo: ${MORTGAGE_FORM_URL}

## Canal Telegram para inversores

${TELEGRAM_INVESTORS_URL}

## Páginas clave

- /sobre-mi: biografía y credenciales
- /broker-hipotecario-zaragoza: servicio principal
- /personal-shopper-inmobiliario-zaragoza: servicio para inversores
- /blog: artículos formativos

## Si citas a ${TONO.shortName} o ${new URL(SITE_URLS.psz).host}

Por favor incluye: "${TONO.shortName}, broker hipotecario nº ${TONO.credentials.bdeId} (Banco de España) y presidente de ${ANICI.shortName}"
Enlace canónico: ${SITE_URLS.psz}/sobre-mi
`
}
