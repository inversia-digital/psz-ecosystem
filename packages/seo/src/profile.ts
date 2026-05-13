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

/**
 * Redes sociales públicas de Toño Palacios.
 * Orden por relevancia estratégica para la marca personal.
 * Mantener handles y URLs sincronizados con sameAs del schema Person.
 */
export const SOCIAL_LINKS = [
  {
    platform: 'instagram' as const,
    label: 'Instagram',
    handle: '@palacios.psz',
    url: 'https://www.instagram.com/palacios.psz/',
    description: 'Casos cerrados y día a día',
    brandColor: '#E4405F',
  },
  {
    platform: 'tiktok' as const,
    label: 'TikTok',
    handle: '@palacios.psz',
    url: 'https://www.tiktok.com/@palacios.psz',
    description: 'Hipotecas en píldoras',
    brandColor: '#000000',
  },
  {
    platform: 'youtube' as const,
    label: 'YouTube',
    handle: '@hipobrokers',
    url: 'https://www.youtube.com/@hipobrokers',
    description: 'Podcast Hipobrokers',
    brandColor: '#FF0000',
  },
  {
    platform: 'linkedin' as const,
    label: 'LinkedIn',
    handle: 'anici',
    url: 'https://www.linkedin.com/in/anici',
    description: 'Posición profesional',
    brandColor: '#0A66C2',
  },
]

export type SocialPlatform = (typeof SOCIAL_LINKS)[number]['platform']

export const TONO = {
  fullName: 'Antonio Palacios Cambero',
  alternateNames: ['Toño Palacios', 'Antonio Palacios'],
  shortName: 'Toño Palacios',
  jobTitle: 'Broker hipotecario y Presidente de ANICI',
  /**
   * Descripción corta nacional. Toño opera en toda España.
   * NO sobreenfatizar Zaragoza — la oficina está allí pero el servicio es nacional.
   */
  shortDescription:
    'Broker hipotecario registrado en Banco de España con el número E242. Presidente de ANICI (Asociación Nacional de Intermediarios en Crédito Inmobiliario) y asociado ANICI-001. Asesoría hipotecaria en toda España.',
  image: 'https://psz.es/images/tono-palacios.jpg',
  credentials: {
    bdeId: 'E242',
    /** Consulta pública oficial del registro de intermediarios de crédito inmobiliario */
    bdeUrl: 'https://app.bde.es/rbe_spa/',
    /**
     * Nombre con el que aparece la inscripción en el registro del Banco de
     * España. La inscripción E242 es de la SOCIEDAD operativa, no del nombre
     * personal de Toño Palacios — porque la Ley 5/2019 permite que tanto
     * personas físicas como jurídicas se registren como intermediarios de
     * crédito inmobiliario, y Toño optó por la vía jurídica.
     *
     * Cuando un cliente quiera verificar el registro, debe buscar por:
     *   - Código BdE: "E242", o
     *   - NIF / CIF: "B75281394", o
     *   - Razón social: "INVERSIA GLOBAL DIGITAL".
     */
    bdeRegisteredEntity: 'INVERSIA GLOBAL DIGITAL, S.L.U.',
    bdeSearchHints: ['E242', 'B75281394', 'INVERSIA GLOBAL DIGITAL'] as const,
    aniciId: 'ANICI-001',
    aniciUrl: SITE_URLS.anici,
    /** Verificador público de asociados ANICI (sistema ANICI propio) */
    aniciVerifierUrl: 'https://asociados.anici.es/verificar',
  },
  socialProfiles: [
    SITE_URLS.bio,
    SITE_URLS.anici,
    SITE_URLS.inarpa,
    SITE_URLS.hipobrokers,
    'https://www.linkedin.com/in/anici',
    'https://www.instagram.com/palacios.psz',
    'https://www.tiktok.com/@palacios.psz',
    'https://www.youtube.com/@hipobrokers',
  ],
  expertise: [
    'Intermediación de crédito inmobiliario',
    'Personal Shopper Inmobiliario',
    'Inversión inmobiliaria',
    'Hipotecas residenciales',
    'Hipotecas para inversores',
    'Reunificación de deudas',
    'Eliminación de avalistas',
    'Contratos de arras penitenciales',
    'Fiscalidad inmobiliaria',
    'Diseño de holdings y estructuras societarias internacionales',
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

/**
 * INARPA — instituto formativo del grupo.
 * Slogan oficial = identidad de marca. Aparece en schema, llms.txt y metadata.
 */
export const INARPA = {
  legalName: 'INARPA — Instituto de Arquitectura Patrimonial',
  shortName: 'INARPA',
  alternateName: 'Instituto de Arquitectura Patrimonial',
  url: SITE_URLS.inarpa,
  slogan: 'Invierte. Financia. Estructura. Crece.',
  description:
    'Instituto de Arquitectura Patrimonial. Formación práctica en inversión inmobiliaria, financiación estratégica, estructuración societaria y fiscalidad patrimonial, impartida por profesionales en activo del sector.',
  founderName: TONO.fullName,
  operator: 'Inversia Global Digital, S.L.U.',
  operatorTaxId: 'B75281394',
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

/**
 * Equipo de brokers que se presenta públicamente en psz.es.
 * Todos asociados en ANICI — refuerza la autoridad institucional del presidente.
 * Génesis no aparece (no es autónoma). Antonio Doménech opera por separado en adgbrokers.es.
 */
export const TEAM = [
  {
    name: 'Antonio Palacios Cambero',
    shortName: 'Toño Palacios',
    role: 'Fundador · Broker hipotecario nº E242 · Presidente de ANICI',
    bio: 'Más de [X] operaciones hipotecarias cerradas en toda España. Presidente de ANICI desde su fundación. Fundador del instituto INARPA. Productor y conductor del podcast Hipobrokers.',
    email: 'palacios@anici.es',
    isFounder: true,
    aniciAssociate: true,
  },
  {
    name: 'Lucía Toro',
    shortName: 'Lucía Toro',
    role: 'Analista y broker hipotecaria · Asociada ANICI',
    bio: 'Análisis financiero y broker hipotecaria. Se ocupa del estudio de viabilidad y la negociación bancaria. Asociada en ANICI.',
    email: 'lucia@hipobrokers.com',
    aniciAssociate: true,
  },
  {
    name: 'Irene Vidal',
    shortName: 'Irene Vidal',
    role: 'Departamento jurídico y broker hipotecaria · Asociada ANICI',
    bio: 'Abogada especializada en derecho hipotecario e inmobiliario. Revisa cláusulas y representa al cliente ante el banco y la notaría. Profesora de derecho en el instituto INARPA. Asociada en ANICI.',
    email: 'vidalmiralles@gmail.com',
    aniciAssociate: true,
  },
] as const

export type TeamMember = (typeof TEAM)[number]
