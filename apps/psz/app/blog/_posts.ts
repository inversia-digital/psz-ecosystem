/**
 * Registro central de entradas del blog.
 * Cada slug tiene su carpeta propia en app/blog/[slug]/page.tsx con el cuerpo.
 * Aquí solo los metadatos para listar en el índice y generar sitemap.
 *
 * Cuando crucemos los 5-10 posts, se refactoriza a route dinámica + MDX.
 */

export interface PostMeta {
  slug: string
  title: string
  description: string
  category: string
  datePublished: string
  readingTime: string
  cover?: string
}

export const POSTS: PostMeta[] = [
  // ── Primera vivienda ──────────────────────────────────────────────
  {
    slug: 'cuanto-ahorro-necesito-comprar-primera-vivienda',
    title: 'Cuánto ahorro necesitas para comprar tu primera vivienda en España',
    description:
      'Cuánto dinero hay que tener ahorrado para comprar la primera vivienda: la entrada, los gastos de compraventa y la regla del 30%, con ejemplos por precio y las excepciones que permiten financiar el 90-100%.',
    category: 'Primera vivienda',
    datePublished: '2026-07-25',
    readingTime: '6 min',
  },
  {
    slug: 'avales-ico-primera-vivienda',
    title: 'Avales ICO para primera vivienda: cómo financiar cerca del 100%',
    description:
      'Qué es la Línea de Avales ICO para primera vivienda, quién puede pedirla, cuánto avala el Estado y cómo permite comprar sin tener el 20% de entrada. Requisitos y cautelas antes de contar con ella.',
    category: 'Primera vivienda',
    datePublished: '2026-07-26',
    readingTime: '7 min',
  },
  {
    slug: 'hipoteca-joven-menos-35-anos',
    title: 'Hipoteca para jóvenes de menos de 35 años: bancos y ayudas',
    description:
      'Qué opciones de hipoteca tiene un menor de 35 años en España: avales públicos, financiación ampliada, ayudas por comunidad autónoma y cómo presentar el perfil joven para que el banco diga sí.',
    category: 'Primera vivienda',
    datePublished: '2026-07-30',
    readingTime: '7 min',
  },
  {
    slug: 'comprar-primera-vivienda-paso-a-paso',
    title: 'Comprar tu primera vivienda paso a paso (guía 2026)',
    description:
      'La hoja de ruta completa para comprar tu primera casa: del ahorro previo a la firma en notaría, con los tiempos, los documentos y los errores que veo cada semana.',
    category: 'Primera vivienda',
    datePublished: '2026-07-27',
    readingTime: '9 min',
  },
  {
    slug: 'segunda-mano-vs-obra-nueva',
    title: 'Vivienda de segunda mano u obra nueva: qué cambia en la hipoteca',
    description:
      'Impuestos, gastos, financiación y plazos: en qué se diferencia comprar (e hipotecar) una vivienda de segunda mano frente a una de obra nueva en España.',
    category: 'Primera vivienda',
    datePublished: '2026-07-28',
    readingTime: '7 min',
  },
  {
    slug: 'gastos-de-comprar-vivienda-por-comunidad',
    title: 'Gastos de comprar una vivienda en España por comunidad autónoma',
    description:
      'ITP, IVA, AJD, notaría, registro y gestoría: cuánto suma comprar una vivienda según la comunidad autónoma, con la horquilla real y cómo reducir la factura.',
    category: 'Primera vivienda',
    datePublished: '2026-07-29',
    readingTime: '7 min',
  },
  // ── Inversión inmobiliaria ────────────────────────────────────────
  {
    slug: 'minipisos-dividir-vivienda-mas-rentabilidad',
    title: 'Minipisos: cómo un piso grande puede rentar como varios',
    description:
      'Qué son los minipisos, en qué se diferencian del alquiler por habitaciones, por qué elevan la rentabilidad y qué requisitos legales y técnicos hay que cumplir antes de meterse. Con la rentabilidad en tres escenarios y las cautelas de un profesional.',
    category: 'Inversión inmobiliaria',
    datePublished: '2026-07-25',
    readingTime: '8 min',
  },
  {
    slug: 'rentabilidad-bruta-vs-neta-alquiler',
    title: 'Rentabilidad bruta vs neta del alquiler: por qué el 10% casi nunca es real',
    description:
      'La diferencia entre la rentabilidad bruta que ves en los anuncios y la neta que de verdad cobras, con el desglose de todos los gastos y un ejemplo real de mi cartera.',
    category: 'Inversión inmobiliaria',
    datePublished: '2026-07-19',
    readingTime: '8 min',
  },
  {
    slug: 'invertir-100000-euros-en-vivienda',
    title: 'Invertir 100.000 € en vivienda: qué compra de verdad en España hoy',
    description:
      'Qué operación real puedes montar con 100.000 € de inversión en vivienda para alquilar: apalancamiento, gastos, reforma y rentabilidad neta en tres escenarios, con casos reales.',
    category: 'Inversión inmobiliaria',
    datePublished: '2026-07-24',
    readingTime: '9 min',
  },
  {
    slug: 'comprar-piso-para-alquilar-guia',
    title: 'Comprar un piso para alquilar: guía completa de rentabilidad',
    description:
      'Cómo elegir, financiar y calcular un piso para alquilar que de verdad rente: ubicación, números, fiscalidad y los errores que arruinan la rentabilidad. Con operaciones reales.',
    category: 'Inversión inmobiliaria',
    datePublished: '2026-07-23',
    readingTime: '9 min',
  },
  {
    slug: 'rentabilidad-alquiler-por-ciudades-espana',
    title: 'Rentabilidad del alquiler por ciudades en España: dónde renta más',
    description:
      'Qué ciudades y zonas ofrecen mejor rentabilidad neta del alquiler en España y por qué, con el matiz que casi nadie hace: la rentabilidad neta en tres escenarios, no la bruta del titular.',
    category: 'Inversión inmobiliaria',
    datePublished: '2026-07-31',
    readingTime: '8 min',
  },
  {
    slug: 'rehabilitar-para-alquilar-reforma-rentable',
    title: 'Rehabilitar para alquilar: cuándo la reforma sube la rentabilidad',
    description:
      'Cuándo una reforma aumenta de verdad la rentabilidad de una inversión y cuándo se come el margen, con el criterio para presupuestarla y casos reales de compra + reforma.',
    category: 'Inversión inmobiliaria',
    datePublished: '2026-08-01',
    readingTime: '8 min',
  },
  {
    slug: 'fiscalidad-alquiler-reduccion-irpf',
    title: 'Fiscalidad del alquiler: la reducción del IRPF (50/60/90%) explicada',
    description:
      'Cómo tributa el alquiler de vivienda en el IRPF, qué gastos puedes deducir y cómo funciona la reducción del rendimiento neto (del 50% al 90%) tras la Ley de Vivienda. Con ejemplos.',
    category: 'Inversión inmobiliaria',
    datePublished: '2026-08-02',
    readingTime: '8 min',
  },
  {
    slug: 'como-detectar-humo-oportunidad-inversion',
    title: 'Cómo detectar humo en una oportunidad de inversión inmobiliaria',
    description:
      '"Rentabilidad garantizada", cifras infladas y letra pequeña: las señales de alarma de una oportunidad de inversión que no es lo que parece, y cómo comprobar los números tú mismo.',
    category: 'Inversión inmobiliaria',
    datePublished: '2026-08-03',
    readingTime: '7 min',
  },
  {
    slug: 'personal-shopper-inmobiliario-para-inversores',
    title: 'Qué es un Personal Shopper Inmobiliario para inversores y cuándo compensa',
    description:
      'Qué hace un personal shopper inmobiliario enfocado a inversión, en qué se diferencia del que busca vivienda habitual, cuánto cobra y cuándo su trabajo se paga solo con la operación.',
    category: 'Inversión inmobiliaria',
    datePublished: '2026-08-04',
    readingTime: '7 min',
  },
  {
    slug: 'comprar-inmueble-a-traves-de-sociedad',
    title: 'Comprar un inmueble a través de una sociedad: cuándo tiene sentido',
    description:
      'Ventajas, inconvenientes y fiscalidad de comprar inmuebles mediante una sociedad frente a hacerlo como particular, y en qué perfil de inversor compensa de verdad.',
    category: 'Inversión inmobiliaria',
    datePublished: '2026-08-05',
    readingTime: '8 min',
  },
  // ── Normativa / broker ────────────────────────────────────────────
  {
    slug: 'como-verificar-broker-hipotecario-banco-de-espana',
    title:
      '¿Cómo verificar si un broker hipotecario está registrado en Banco de España?',
    description:
      'Guía paso a paso para comprobar si tu broker está autorizado por el Banco de España. Registro oficial, asociación profesional, banderas rojas y mi propio número E242 como ejemplo.',
    category: 'Verificación y normativa',
    datePublished: '2026-05-12',
    readingTime: '7 min',
  },
  {
    slug: 'como-hacerse-intermediario-credito-inmobiliario-ici',
    title: 'Cómo hacerse intermediario de crédito inmobiliario (ICI) en España',
    description:
      'Requisitos, formación LCCI, seguro de responsabilidad civil y alta en el Banco de España para ejercer legalmente como intermediario de crédito inmobiliario (broker hipotecario).',
    category: 'Verificación y normativa',
    datePublished: '2026-07-17',
    readingTime: '9 min',
  },
  {
    slug: 'ley-5-2019-explicada-para-el-cliente',
    title: 'La Ley 5/2019 explicada para el cliente: qué derechos te da tu hipoteca',
    description:
      'Qué cambió la Ley 5/2019 de crédito inmobiliario para quien pide una hipoteca: transparencia, reparto de gastos, comisiones limitadas y el papel del notario. En lenguaje claro.',
    category: 'Verificación y normativa',
    datePublished: '2026-08-07',
    readingTime: '8 min',
  },
  {
    slug: 'broker-hipotecario-vs-ir-directo-al-banco',
    title: 'Broker hipotecario o ir directo al banco: qué te conviene',
    description:
      'Ventajas y límites de contratar tu hipoteca a través de un broker frente a negociar tú directamente con los bancos, con números de cuándo compensa cada opción.',
    category: 'Verificación y normativa',
    datePublished: '2026-08-08',
    readingTime: '7 min',
  },
  {
    slug: 'cuanto-cobra-un-broker-hipotecario',
    title: 'Cuánto cobra un broker hipotecario en España (y cómo)',
    description:
      'Los modelos de cobro de un broker hipotecario —a éxito, honorarios fijos, del banco— con cifras orientativas, y cómo saber si lo que pagas está justificado.',
    category: 'Verificación y normativa',
    datePublished: '2026-08-09',
    readingTime: '6 min',
  },
  // ── No residentes ─────────────────────────────────────────────────
  {
    slug: 'hipoteca-para-no-residentes-espana',
    title: 'Hipoteca para no residentes en España: requisitos y financiación',
    description:
      'Qué financiación puede conseguir un no residente para comprar en España, qué documentación necesita, hasta qué porcentaje financian los bancos y los errores más habituales.',
    category: 'No residentes',
    datePublished: '2026-07-21',
    readingTime: '8 min',
  },
  {
    slug: 'comprar-vivienda-en-espana-siendo-extranjero',
    title: 'Comprar vivienda en España siendo extranjero: guía completa',
    description:
      'El proceso completo para que un extranjero compre vivienda en España: NIE, cuenta bancaria, impuestos, financiación y firma, con los pasos en orden y los plazos reales.',
    category: 'No residentes',
    datePublished: '2026-08-10',
    readingTime: '9 min',
  },
  {
    slug: 'nie-y-documentacion-para-comprar-casa-espana',
    title: 'NIE y documentación para comprar una casa en España',
    description:
      'Qué es el NIE, cómo obtenerlo y qué otros documentos necesita un no residente o extranjero para comprar e hipotecar una vivienda en España.',
    category: 'No residentes',
    datePublished: '2026-08-11',
    readingTime: '6 min',
  },
  // ── Perfiles y producto ───────────────────────────────────────────
  {
    slug: 'hipoteca-para-autonomos-guia',
    title: 'Hipoteca para autónomos: cómo conseguirla (guía práctica)',
    description:
      'Qué mira el banco cuando un autónomo pide hipoteca, qué documentación e ingresos demostrar y cómo presentar la operación para superar el scoring. Con casos reales.',
    category: 'Perfiles y producto',
    datePublished: '2026-07-15',
    readingTime: '8 min',
  },
  {
    slug: 'hipoteca-fija-variable-o-mixta',
    title: 'Hipoteca fija, variable o mixta: cuál elegir en 2026',
    description:
      'Cómo elegir entre hipoteca fija, variable y mixta según tu perfil y el momento del Euríbor, con el criterio para decidir y una simulación en tres escenarios.',
    category: 'Perfiles y producto',
    datePublished: '2026-07-12',
    readingTime: '8 min',
  },
  {
    slug: 'subrogacion-de-hipoteca-cuando-compensa',
    title: 'Subrogación de hipoteca: cuándo compensa cambiar de banco',
    description:
      'Qué es subrogar la hipoteca, cuánto cuesta por la Ley 5/2019, cuándo compensa frente a la novación y cómo calcular el ahorro real antes de moverte.',
    category: 'Perfiles y producto',
    datePublished: '2026-08-12',
    readingTime: '7 min',
  },
  {
    slug: 'amortizar-hipoteca-anticipadamente',
    title: 'Amortizar la hipoteca anticipadamente: cuándo conviene',
    description:
      'Reducir cuota o reducir plazo, coste de oportunidad frente al Euríbor y ventajas fiscales: cuándo amortizar anticipadamente tu hipoteca tiene sentido y cuándo no.',
    category: 'Perfiles y producto',
    datePublished: '2026-08-13',
    readingTime: '7 min',
  },
  {
    slug: 'seguro-de-vida-vinculado-hipoteca',
    title: 'Seguro de vida vinculado a la hipoteca: cómo no pagar de más',
    description:
      'Por qué el seguro de vida del banco suele costar el doble, qué dice la Ley 5/2019 sobre las pólizas alternativas y cómo calcular si compensa desvincularlo aunque pierdas la bonificación.',
    category: 'Perfiles y producto',
    datePublished: '2026-08-06',
    readingTime: '7 min',
  },
  {
    slug: 'contrato-arras-penitenciales',
    title: 'Contrato de arras penitenciales: cómo te protege antes de la hipoteca',
    description:
      'Las arras penitenciales son el contrato que firma la mayoría de compradores antes de la hipoteca, sin saber del todo qué firman. Esta guía explica qué son, qué tipos hay, cómo te protegen y los errores que veo cada semana.',
    category: 'Contratos previos a la hipoteca',
    datePublished: '2026-05-12',
    readingTime: '7 min',
  },
]

export function isLive(datePublished: string): boolean {
  return new Date(datePublished).getTime() <= Date.now()
}

export function getPostBySlug(slug: string): PostMeta | undefined {
  return POSTS.find((p) => p.slug === slug)
}
