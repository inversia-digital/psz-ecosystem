/**
 * Registry centralizado de las herramientas propietarias del despacho.
 *
 * Fuente única de verdad: cuando se publica una nueva calculadora, basta
 * con añadir una entry aquí y se propaga automáticamente al hub
 * `/herramientas`, al footer y al JSON-LD ItemList del schema del hub.
 *
 * Convenciones:
 *  - `slug`: ruta corta sin barra inicial. Determina la URL del producto.
 *  - `status`: 'live' (publicada) | 'coming' (próximamente, aparece en
 *    el hub con badge gris para mostrar el roadmap del despacho).
 *  - `audience`: a quién le sirve la herramienta — refuerza intent
 *    matching en SEO.
 *  - `keyFigure`: la métrica clave que devuelve la herramienta (lo que
 *    busca el usuario). Aparece destacada en la card del hub.
 */

export type HerramientaStatus = 'live' | 'coming'

export interface Herramienta {
  slug: string
  url: string
  name: string
  shortName: string
  description: string
  features: string[]
  audience: string
  keyFigure: string
  icon: string
  /** Tailwind bg-* para ribete superior de la card */
  ribbonClass: string
  status: HerramientaStatus
}

const ROOT = '/'

export const HERRAMIENTAS: Herramienta[] = [
  {
    slug: 'calculadora-hipoteca',
    url: `${ROOT}calculadora-hipoteca`,
    name: 'Calculadora de hipoteca',
    shortName: 'Hipoteca',
    description:
      'Calcula tu cuota mensual estimada, intereses totales, LTV efectivo y ratio de esfuerzo financiero. Avisos automáticos sobre rangos críticos del scoring bancario (ratio > 35%, LTV > 80%, plazo > 30 años, TIN fuera de mediana).',
    features: [
      'Cuota mensual por amortización francesa',
      'Intereses totales del préstamo',
      'LTV efectivo (loan-to-value)',
      'Ratio de esfuerzo financiero',
      'Avisos sobre scoring bancario real',
    ],
    audience: 'Comprador con oferta hipotecaria o que quiere simular antes de pedir',
    keyFigure: 'Cuota mensual',
    icon: '🏠',
    ribbonClass: 'bg-gold-400',
    status: 'live',
  },
  {
    slug: 'calculadora-capacidad-endeudamiento',
    url: `${ROOT}calculadora-capacidad-endeudamiento`,
    name: 'Calculadora de capacidad de endeudamiento',
    shortName: 'Capacidad',
    description:
      '¿Cuánto te daría realmente el banco? Calcula tu capacidad de endeudamiento hipotecaria según ingresos, edad, otras deudas y aporte propio. 3 escenarios paralelos según ratio de esfuerzo (30%, 35%, 40%).',
    features: [
      'Cuota máxima admisible por el banco',
      'Importe máximo financiable',
      'Precio máximo del inmueble',
      '3 escenarios: conservador/estándar/agresivo',
      'Plazo recortado por edad del titular',
      'Soporte para pareja co-titular',
    ],
    audience: 'Comprador antes de buscar inmueble, para saber su rango realista',
    keyFigure: 'Importe máximo de hipoteca',
    icon: '🧮',
    ribbonClass: 'bg-emerald-500',
    status: 'live',
  },
  {
    slug: 'calculadora-rentabilidad-inmobiliaria',
    url: `${ROOT}calculadora-rentabilidad-inmobiliaria`,
    name: 'Calculadora de rentabilidad inmobiliaria',
    shortName: 'Rentabilidad',
    description:
      'Rentabilidad de adquisición y rentabilidad real, flujo neto mensual, amortización del ITP, payback total, comparativa con el bono español a 10 años y sensibilidad al precio. En 3 escenarios paralelos. PDF descargable.',
    features: [
      'Rentabilidad de adquisición (sobre inversión total con ITP)',
      'Rentabilidad real (sobre inversión operativa)',
      'Flujo neto mensual',
      'Amortización del ITP en años',
      'Prima sobre el bono español 10 años',
      'Sensibilidad al precio máximo',
      'ITP por CCAA actualizado',
      'PDF descargable con marca propia',
    ],
    audience: 'Inversor que evalúa adquisición para alquiler',
    keyFigure: 'Rentabilidad real anual',
    icon: '📈',
    ribbonClass: 'bg-sky-500',
    status: 'live',
  },
  {
    slug: 'calculadora-stress-test-euribor',
    url: `${ROOT}calculadora-stress-test-euribor`,
    name: 'Stress test Euríbor',
    shortName: 'Stress test',
    description:
      'Si el Euríbor sube X puntos, ¿cuánto subirá tu cuota mensual? Simula 5 escenarios paralelos (+0, +0,5, +1, +1,5, +2 pp) sobre tu hipoteca variable actual para anticipar el impacto en tu economía y decidir si conviene novar a fija.',
    features: [
      'Cuota nueva en 5 escenarios de Euríbor',
      'TIN aplicado en cada escenario',
      'Incremento mensual y anual sobre cuota actual',
      'Ratio de esfuerzo proyectado',
      'Avisos sobre novación, subrogación y amortización anticipada',
    ],
    audience: 'Titular de hipoteca variable o mixta en periodo variable',
    keyFigure: 'Cuota proyectada según Euríbor',
    icon: '📊',
    ribbonClass: 'bg-rose-500',
    status: 'live',
  },
  {
    slug: 'comparador-hipoteca-fija-variable-mixta',
    url: `${ROOT}comparador-hipoteca-fija-variable-mixta`,
    name: 'Comparador fija vs variable vs mixta',
    shortName: 'Comparador',
    description:
      'Las tres modalidades en paralelo con el mismo importe y plazo en 3 escenarios de evolución del Euríbor (estable, +1pp, +2pp). Simulación año a año para que decidas con números, no por intuición.',
    features: [
      'Cuota inicial en las 3 modalidades',
      'Cuota promedio proyectada año a año',
      'Intereses totales proyectados',
      '3 escenarios de Euríbor: estable, +1pp, +2pp',
      'Modalidad ganadora destacada en cada escenario',
      'Avisos sobre robustez de tu decisión',
    ],
    audience: 'Comprador eligiendo modalidad hipotecaria',
    keyFigure: 'Coste total comparado',
    icon: '⚖️',
    ribbonClass: 'bg-purple-500',
    status: 'live',
  },
  {
    slug: 'calculadora-gastos-compra',
    url: `${ROOT}calculadora-gastos-compra`,
    name: 'Calculadora de gastos de compra',
    shortName: 'Gastos de compra',
    description:
      '¿Cuánto necesitas ahorrado de verdad para comprar? Calcula impuestos (ITP por comunidad en segunda mano, o IVA + AJD en obra nueva), notaría, registro, gestoría y tasación, y el ahorro total necesario (entrada + gastos).',
    features: [
      'ITP por comunidad autónoma (segunda mano)',
      'IVA + AJD (obra nueva)',
      'Notaría, registro, gestoría y tasación',
      'Ahorro necesario = entrada + gastos',
      'Avisos sobre bonificaciones y regla del 10-12%',
    ],
    audience: 'Comprador que quiere saber el ahorro real antes de lanzarse',
    keyFigure: 'Ahorro necesario para comprar',
    icon: '🧾',
    ribbonClass: 'bg-teal-500',
    status: 'live',
  },
  {
    slug: 'calculadora-subrogacion-hipoteca',
    url: `${ROOT}calculadora-subrogacion-hipoteca`,
    name: 'Calculadora de subrogación de hipoteca',
    shortName: 'Subrogación',
    description:
      '¿Te compensa cambiar tu hipoteca a otro banco? Compara los intereses que te quedan con tu TIN actual frente a un TIN nuevo, descuenta los costes del cambio (comisión, tasación, gestoría) y calcula el ahorro neto, el ahorro mensual y el punto de equilibrio.',
    features: [
      'Ahorro neto tras descontar costes del cambio',
      'Ahorro en la cuota mensual',
      'Punto de equilibrio (meses para recuperar costes)',
      'Comparación de intereses restantes (TIN actual vs nuevo)',
      'Avisos sobre subrogación, novación y Ley 5/2019',
    ],
    audience: 'Titular de hipoteca que valora cambiar de banco o renegociar',
    keyFigure: 'Ahorro neto al cambiar',
    icon: '🔄',
    ribbonClass: 'bg-indigo-500',
    status: 'live',
  },
  {
    slug: 'test-viabilidad-hipotecaria',
    url: `${ROOT}test-viabilidad-hipotecaria`,
    name: 'Test de viabilidad hipotecaria',
    shortName: 'Test de viabilidad',
    description:
      '¿Tu operación pasaría el filtro del banco? Con tus ingresos, deudas, precio, ahorro, plazo, edad y tipo de contrato, estima cuota, ratio de esfuerzo, LTV y edad al vencimiento, y devuelve un veredicto VIABLE / AJUSTADA / DIFÍCIL con los motivos.',
    features: [
      'Veredicto VIABLE / AJUSTADA / DIFÍCIL',
      'Ratio de esfuerzo, LTV y edad al vencimiento',
      'Cuota estimada con TIN de referencia',
      'Motivos detallados de cada factor',
      'Criterios reales de mesa de riesgos',
    ],
    audience: 'Cualquiera que quiere saber si su caso es financiable antes de buscar',
    keyFigure: 'Veredicto de viabilidad',
    icon: '🚦',
    ribbonClass: 'bg-cyan-500',
    status: 'live',
  },
]

export const HERRAMIENTAS_LIVE = HERRAMIENTAS.filter((h) => h.status === 'live')
export const HERRAMIENTAS_COMING = HERRAMIENTAS.filter((h) => h.status === 'coming')
