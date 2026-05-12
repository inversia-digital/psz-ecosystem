/**
 * Fuente única de verdad de la identidad de Toño Palacios y las empresas del grupo.
 * Cualquier dato que aparezca en schemas, llms.txt, footers, contacto, etc.
 * tiene que importarse desde aquí. Así no hay divergencias entre páginas/apps.
 */

export const SITE_URLS = {
  psz: 'https://psz.es',
  bio: 'https://bio.psz.es',
  inarpa: 'https://inarpa.es',
  anici: 'https://anici.es',
  hipobrokers: 'https://hipobrokers.com',
  activosPsz: 'https://activos.psz.es',
  crmHipobrokers: 'https://crm.hipobrokers.com',
} as const

/** Formulario de captación de cliente que quiere hipoteca (CRM Hipobrokers) */
export const MORTGAGE_FORM_URL =
  'https://crm.hipobrokers.com/users/referer-ici-account/5XsQSB9RBlyqZxX3xvCV'

/** Canal Telegram de oportunidades para inversores */
export const TELEGRAM_INVESTORS_URL = 'https://t.me/+SB3qrIEnuScxNjgy'

export const TONO = {
  fullName: 'Antonio Palacios Cambero',
  alternateNames: ['Toño Palacios', 'Antonio Palacios'],
  shortName: 'Toño Palacios',
  jobTitle: 'Broker hipotecario y Presidente de ANICI',
  shortDescription:
    'Broker hipotecario en Zaragoza registrado en Banco de España con el número E242. Presidente de ANICI (Asociación Nacional de Intermediarios en Crédito Inmobiliario) y asociado ANICI-001.',
  image: 'https://psz.es/images/tono-palacios.jpg',
  credentials: {
    bdeId: 'E242',
    bdeUrl: 'https://app.bde.es/cgi/cgi/registroPublic',
    aniciId: 'ANICI-001',
    aniciUrl: SITE_URLS.anici,
  },
  socialProfiles: [
    SITE_URLS.bio,
    SITE_URLS.anici,
    SITE_URLS.inarpa,
    SITE_URLS.hipobrokers,
    'https://www.linkedin.com/in/palacios-psz',
    'https://www.instagram.com/palacios.psz',
    'https://www.tiktok.com/@palacios.psz',
    'https://www.youtube.com/@palacios_psz',
  ],
  expertise: [
    'Intermediación de crédito inmobiliario',
    'Personal Shopper Inmobiliario',
    'Inversión inmobiliaria',
    'Hipotecas residenciales',
    'Hipotecas para inversores',
    'Reunificación de deudas',
    'Eliminación de avalistas',
    'Fiscalidad inmobiliaria',
  ],
} as const

export const INVERSIA = {
  legalName: 'INVERSIA GLOBAL DIGITAL, SLU',
  displayName: 'Inversia Global Digital S.L.',
  alternateNames: ['Inversia Digital', 'PSZ'],
  taxId: 'B75281394',
  bdeId: 'E242',
  phone: '+34876280545',
  email: 'info@inversiadigital.es',
  iban: 'ES19 0049 5485 5829 1634 4067',
  address: {
    street: 'Polígono Alcoz Alto 21, 1-1',
    postalCode: '50410',
    city: 'Cuarte de Huerva',
    region: 'Zaragoza',
    country: 'ES',
  },
  geo: {
    latitude: 41.62,
    longitude: -0.937,
  },
  founderName: TONO.fullName,
  founderUrl: `${SITE_URLS.psz}/sobre-mi`,
} as const

export const PALANTIO = {
  legalName: 'INVERSIONES PALANTIO, SLU',
  displayName: 'Inversiones Palantio SLU',
  taxId: 'B21763941',
  role: 'holding',
} as const

export const ANICI = {
  legalName: 'Asociación Nacional de Intermediarios en Crédito Inmobiliario',
  shortName: 'ANICI',
  taxId: 'G21975008',
  presidentName: TONO.fullName,
  url: SITE_URLS.anici,
} as const

export const HIPOBROKERS = {
  legalName: 'HIPOBROKERS, SL',
  displayName: 'Hipobrokers',
  taxId: 'B22976294',
  url: SITE_URLS.hipobrokers,
  brokerFeeExternal: 1500,
  brokerFeeDirect: 4500,
  currency: 'EUR',
} as const

/** Colaboradores autónomos visibles en la web (Génesis NO incluida — sin alta de autónoma) */
export const TEAM = [
  {
    name: 'Antonio Palacios Cambero',
    shortName: 'Toño Palacios',
    role: 'Broker hipotecario y Presidente de ANICI',
    email: 'palacios@anici.es',
    isFounder: true,
  },
  {
    name: 'Antonio Doménech Gómez',
    shortName: 'Antonio Doménech',
    role: 'Broker hipotecario (autónomo colaborador) · Socio en Hipobrokers',
    email: 'adg@anici.es',
  },
  {
    name: 'Lucía',
    shortName: 'Lucía',
    role: 'Gestora hipotecaria (autónoma colaboradora)',
    email: 'lucia@hipobrokers.com',
  },
] as const

export type TeamMember = (typeof TEAM)[number]
