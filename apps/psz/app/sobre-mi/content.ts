/**
 * Contenido de /sobre-mi.
 * Página de perfil personal de Toño Palacios. ~1.700 palabras.
 * Tono: autoridad sin estatus, datos verificables, persona visible.
 */

export const SOBRE_MI = {
  hero: {
    eyebrow: 'Sobre Toño Palacios',
    h1: 'Antonio Palacios Cambero',
    sub: 'Broker hipotecario nº E242 (Banco de España) · Presidente de ANICI · Fundador de INARPA',
  },

  /** 5 hitos institucionales y operativos. Sin años concretos para que envejezcan bien. */
  milestones: [
    {
      title: 'Registro Banco de España nº E242',
      body: 'Alta como Intermediario de Crédito Inmobiliario en el registro oficial del Banco de España. El dato es público y verificable en cualquier momento. Es el número que me identifica como profesional regulado bajo la Ley 5/2019.',
    },
    {
      title: 'Cofundación y presidencia de ANICI',
      body: 'Soy presidente de ANICI (Asociación Nacional de Intermediarios en Crédito Inmobiliario) y socio fundador con el número ANICI-001. Desde la asociación trabajamos para profesionalizar el sector, dar voz al intermediario ante las instituciones y combatir el intrusismo.',
    },
    {
      title: 'Fundación del instituto INARPA',
      body: 'Fundé INARPA (Instituto de Arquitectura Patrimonial) para formar a inversores y a otros profesionales del sector en lo que sé hacer. El instituto está en construcción y abriremos en cuanto esté listo.',
    },
    {
      title: 'Estructura patrimonial propia',
      body: 'Mi servicio se opera desde una estructura empresarial diseñada para dar continuidad, independencia económica y blindaje patrimonial. La solidez se construye con tiempo y con orden.',
    },
    {
      title: 'Podcast Hipobrokers',
      body: 'Dirijo y produzco el podcast de Hipobrokers en YouTube, donde abordo casos reales, regulación del sector y entrevistas a profesionales con criterio. La voz del intermediario hipotecario también necesita altavoz.',
    },
  ],

  manifesto: {
    title: 'Por qué hago esto',
    paragraphs: [
      'El cliente medio firma una hipoteca tres veces en su vida. El banco lo hace cada día, varias veces. La asimetría informativa es brutal: una de las partes domina el producto, conoce las cláusulas, calcula el coste real; la otra apenas si entiende qué firma. Ahí es donde estoy yo.',
      'Mi trabajo no es venderte una hipoteca. Es ponerte al mismo nivel que el banco para que la firma sea una decisión informada, no una concesión. Significa comparar +20 entidades a la vez, negociar diferenciales que ningún cliente individual conseguiría, eliminar comisiones y vinculaciones que sobran, leerte cláusula a cláusula la oferta vinculante y acompañarte hasta la firma en notaría.',
      'Lo que diferencia mi forma de trabajar de otros brokers no es el catálogo de bancos — es prácticamente el mismo para todos. Es la transparencia operativa: mis honorarios los conoces antes de empezar, mi número de registro está publicado en la web del Banco de España, mi nombre y mi cara están en todas las páginas de este sitio. Si fallo, fallo yo. No hay reparto de responsabilidad que valga.',
    ],
  },

  bio: {
    title: 'Mi trayectoria',
    paragraphs: [
      'Empecé a operar en el sector inmobiliario hace más de una década, primero como inversor a título personal y luego acompañando a otros en operaciones cada vez más complejas: pisos para alquiler, segundas residencias, flipping, naves industriales, subastas, nuda propiedad, operaciones con avalistas, hipotecas para no residentes, fiscalidad patrimonial. Solo en 2025 cerramos con éxito más de 100 operaciones hipotecarias.',
      'Más allá del crédito hipotecario, también me ocupo del diseño de estructuras societarias: holdings nacionales (tipo Inversiones Palantio, mi propio holding) que separan operativa de patrimonio, y estructuras societarias internacionales para inversión transfronteriza, facturación en divisas y protección patrimonial. Lo aprendí estructurando mi propio patrimonio y ahora lo aplico para clientes con perfil similar al mío.',
      'Cuando la cantidad de gente que me pedía asesoramiento dejó de caber en favores de café, decidí profesionalizar la actividad. Me formé específicamente para el rol regulado, presenté mi alta como intermediario de crédito inmobiliario al Banco de España y recibí el número E242. Es el momento en el que dejé de ser "el amigo que sabe de hipotecas" y pasé a ser broker hipotecario por escrito.',
      'Poco después, junto a otros profesionales del sector con las mismas inquietudes, fundamos ANICI: la primera asociación nacional de intermediarios de crédito inmobiliario, con código deontológico propio, exigencias formativas internas más estrictas que las legales y representación frente al Banco de España y otros reguladores. Hoy presido la asociación.',
      'En paralelo creé INARPA, el instituto de arquitectura patrimonial, para formar a otros profesionales en lo que yo aprendí operando. Y empezamos el podcast Hipobrokers en YouTube para dar voz pública al sector — porque hasta entonces la conversación sobre hipotecas la marcaban los bancos.',
    ],
  },

  formation: {
    title: 'Formación',
    body: 'Mi trayectoria académica incluye un grado universitario, un máster y varios postgrados en áreas vinculadas a la inversión inmobiliaria, la financiación y el derecho patrimonial. La base teórica no sustituye a la operativa: la verdadera escuela han sido las operaciones reales cerradas con clientes reales a lo largo de los años, y la conversación constante con notarios, abogados, asesores fiscales y otros profesionales del sector.',
  },

  team: {
    title: 'Mi equipo de brokers',
    intro:
      'No trabajo solo. Conmigo colabora un equipo de brokers asociados en ANICI, especializados en las distintas fases de la operación hipotecaria. Cada uno aporta su disciplina sin renunciar a la responsabilidad compartida.',
    members: [
      {
        name: 'Toño Palacios',
        role: 'Fundador · Broker hipotecario nº E242 · Presidente de ANICI',
        body: 'Estrategia, negociación bancaria de alto nivel, casos complejos y representación institucional.',
        photo: '/images/tono-formal.jpg',
      },
      {
        name: 'Lucía Toro',
        role: 'Analista y broker hipotecaria · Asociada ANICI',
        body: 'Análisis financiero y estudio de viabilidad. Conduce la presentación del expediente a entidades y la negociación de las primeras ofertas.',
        photo: null,
      },
      {
        name: 'Irene Vidal',
        role: 'Departamento jurídico y broker hipotecaria · Asociada ANICI',
        body: 'Abogada especializada en derecho hipotecario e inmobiliario. Revisa cláusulas, prepara y acompaña la firma en notaría, y es profesora de derecho en INARPA.',
        photo: '/images/irene-vidal.jpg',
      },
    ],
  },

  companies: {
    title: 'Empresas y marcas que dirijo',
    body: 'El servicio se opera desde una estructura empresarial diseñada para garantizar continuidad, independencia económica y blindaje patrimonial. Las marcas con las que trabajo el día a día son cuatro: PSZ (broker personal directo), Hipobrokers (red profesional de brokers colaboradores y B2B), INARPA (instituto de formación financiera y patrimonial) y ANICI (asociación nacional de intermediarios, de la que soy presidente). El backoffice operativo es Inversia Global Digital S.L., empresa registrada en el Banco de España con el número E242 — el dato que pueden consultar y verificar mis clientes en cualquier momento.',
    brands: [
      { name: 'PSZ', short: 'Broker personal y oportunidades inmobiliarias', url: 'https://psz.es' },
      { name: 'Hipobrokers', short: 'Red B2B de brokers colaboradores', url: 'https://hipobrokers.com' },
      { name: 'INARPA', short: 'Instituto de formación en inversión patrimonial', url: 'https://inarpa.es' },
      { name: 'ANICI', short: 'Asociación nacional de intermediarios de crédito inmobiliario', url: 'https://anici.es' },
    ],
  },

  podcast: {
    title: 'Podcast Hipobrokers',
    body: 'Dirijo y produzco el podcast Hipobrokers en YouTube. Lo dedicamos a la realidad del sector hipotecario: casos cerrados (anonimizados), análisis del mercado, regulación, conversaciones con notarios, asesores fiscales y otros brokers asociados en ANICI. La industria hipotecaria necesita un espacio donde la voz del intermediario tenga el mismo peso que la del banco — eso intento que sea el podcast.',
    cta: 'Ver en YouTube',
    // Pendiente: URL final del canal YouTube cuando Toño la confirme
    url: 'https://www.youtube.com/@hipobrokers',
  },

  credentials: {
    title: 'Credenciales verificables',
    intro:
      'Toda autoridad en este sector tiene que poder verificarse. Aquí están las mías con los enlaces oficiales:',
    items: [
      {
        label: 'Registro Banco de España',
        value: 'Intermediario de Crédito Inmobiliario nº E242 · INVERSIA GLOBAL DIGITAL, S.L.U. (CIF B75281394) — buscar por código E242, CIF o razón social',
        verifyUrl: 'https://app.bde.es/rbe_spa/',
        verifyText: 'Consultar registro BdE',
      },
      {
        label: 'ANICI',
        value: 'Presidente y asociado nº ANICI-001 (fundador)',
        verifyUrl: 'https://asociados.anici.es/verificar',
        verifyText: 'Verificador público ANICI',
      },
      {
        label: 'Ley 5/2019',
        value: 'Operativa conforme a la Ley de Contratos de Crédito Inmobiliario',
        verifyUrl: 'https://www.boe.es/buscar/act.php?id=BOE-A-2019-3814',
        verifyText: 'Texto BOE',
      },
      {
        label: 'Empresa operativa',
        value: 'Inversia Global Digital S.L. · CIF B75281394',
        verifyUrl: 'https://www.boe.es/diario_borme/',
        verifyText: 'Registro Mercantil',
      },
    ],
  },
} as const
