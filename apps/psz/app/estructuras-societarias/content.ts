import type { FaqEntry } from '@psz/ui'

/**
 * Contenido del pillar /estructuras-societarias.
 * Servicio premium dirigido a inversores con cierto volumen.
 *
 * ⚠️ NO mencionar nunca que Toño tiene una LLC personal o fundación en Panamá.
 * La estructura personal de Toño es interna. Aquí se habla del SERVICIO que
 * Toño ofrece a clientes con necesidades similares.
 */

export const ESTRUCTURAS = {
  hero: {
    eyebrow: 'Servicio premium · Asesoría patrimonial',
    h1: 'Estructuras societarias para inversores',
    sub: 'Diseño de holdings nacionales y estructuras societarias internacionales para integrar tu operativa inmobiliaria con la protección patrimonial. Para perfiles con cierto volumen que ya no encajan en operar a título personal.',
  },

  whyMatters: {
    title: 'Por qué importa separar operativa de patrimonio',
    paragraphs: [
      'Cuando empezaste a invertir en inmuebles a título personal, todo era simple: tu DNI, tu IRPF, tus propiedades. A medida que el volumen crece, ese esquema se queda pequeño: tu patrimonio personal queda expuesto a las contingencias de cada operación, la fiscalidad se vuelve menos eficiente, la sucesión se complica, y los bancos empiezan a mirarte con otros ojos a partir de ciertas cifras.',
      'La pregunta no es si necesitas una estructura societaria, sino *cuándo* y *qué tipo*. La respuesta depende de tu volumen actual, tus planes a 5-10 años, tu situación familiar y tu apetito por la complejidad operativa.',
      'No vendo estructuras como un producto. Te explico qué tienes hoy, qué te conviene mañana, y cuándo merece la pena dar el salto. Si la respuesta es "todavía no", te lo digo igual.',
    ],
  },

  forWhom: {
    title: '¿Para quién es este servicio?',
    profiles: [
      {
        title: 'Inversor con 3-5 propiedades a título personal',
        body: 'Has acumulado patrimonio inmobiliario operando como persona física. Empiezas a notar que la fiscalidad de las rentas inmobiliarias en IRPF te penaliza, que tu patrimonio personal queda expuesto, y que los bancos empiezan a poner trabas porque "ya tienes demasiadas hipotecas en CIRBE".',
      },
      {
        title: 'Profesional liberal con patrimonio que blindar',
        body: 'Médico, abogado, asesor, consultor con ingresos altos y patrimonio en formación. Quieres separar de manera clara el patrimonio personal del riesgo profesional. Una estructura societaria bien diseñada hace que tu casa y tus inmuebles no respondan por una reclamación profesional.',
      },
      {
        title: 'Empresario o autónomo consolidado',
        body: 'Tienes una empresa operativa que genera caja. Quieres distribuir resultados a un vehículo patrimonial que invierta en inmuebles, sin que la liquidez quede atrapada en la empresa operativa o tributando en IRPF al 47%.',
      },
      {
        title: 'Inversor internacional o con residencia móvil',
        body: 'Inviertes en varios países, tienes ingresos en distintas divisas o tu residencia fiscal puede cambiar. Una estructura societaria internacional bien diseñada simplifica la operativa, optimiza la fiscalidad legal y protege tu patrimonio frente a contingencias en cualquier jurisdicción.',
      },
    ],
  },

  levels: {
    title: 'Tres niveles de estructura, según tu situación',
    items: [
      {
        level: '01',
        title: 'Sociedad operativa única (SLU)',
        body: 'El paso más simple desde la persona física. Una sola sociedad limitada unipersonal que adquiere y gestiona los inmuebles. Tributación al 25% en Impuesto sobre Sociedades, deducción de gastos más amplia que en IRPF, separación de responsabilidades. Apto para perfiles con 3-7 propiedades y horizonte estable.',
      },
      {
        level: '02',
        title: 'Holding patrimonial nacional',
        body: 'Una sociedad holding (SLU) en la cima que posee participaciones en una o varias sociedades operativas (una por área de negocio o por bloque de inmuebles). Permite consolidar resultados, optimizar la fiscalidad de dividendos entre sociedades del grupo (exención del 95%), facilitar la sucesión y blindar el patrimonio. Apto para perfiles con 7+ propiedades o que combinan inmuebles con otras actividades.',
      },
      {
        level: '03',
        title: 'Estructura societaria internacional',
        body: 'Para perfiles con vocación internacional, ingresos en varias divisas, o necesidad de mayor flexibilidad operativa. Combina vehículos en jurisdicciones con marco legal sólido y fiscalidad clara — siempre con declaración impecable ante la AEAT española cuando corresponda. No es un atajo fiscal, es un diseño patrimonial con visión global.',
      },
    ],
  },

  spainVsIntl: {
    title: 'España vs internacional: cuándo encaja cada una',
    body: 'La mayoría de mis clientes están perfectamente servidos con una estructura nacional bien diseñada — SLU o holding SLU. La estructura internacional solo tiene sentido en casos concretos: operativa real fuera de España (no aparente), residencia fiscal no española o en transición, inversiones transfronterizas, o necesidad de un nivel de protección patrimonial que la legislación española no ofrece (por ejemplo en sectores con alta exposición a reclamaciones). Te lo digo sin azúcar: el 70% de los inversores que me preguntan por "abrir una LLC americana" no la necesitan. Los que sí, lo sabremos en la primera llamada.',
  },

  process: {
    title: 'Cómo lo trabajamos',
    steps: [
      {
        n: '01',
        title: 'Diagnóstico (primera videollamada, gratis)',
        body: 'Me cuentas tu situación actual: patrimonio, ingresos, sociedades existentes, planes a 5-10 años, situación familiar. En una hora salimos con un diagnóstico honesto sobre qué tienes, qué te conviene y qué no.',
      },
      {
        n: '02',
        title: 'Propuesta de estructura por escrito',
        body: 'Si la primera llamada apunta a que merece la pena seguir, te entrego una propuesta detallada con la estructura recomendada, el flujo de creación, los costes esperados (constitución, escrituras, asesoría fiscal continuada) y los plazos.',
      },
      {
        n: '03',
        title: 'Implementación con profesionales de confianza',
        body: 'Trabajo con notarios, abogados mercantilistas y asesores fiscales seleccionados. Coordino la creación de las sociedades, las aportaciones no dinerarias si las hubiera (incluyendo tus inmuebles), los cambios registrales y la integración con tu IRPF y tu actividad bancaria.',
      },
      {
        n: '04',
        title: 'Acompañamiento posterior',
        body: 'La estructura no es un "set and forget". Te acompaño los primeros 12 meses para resolver dudas operativas, optimizar decisiones de distribución de dividendos, integrar la fiscalidad y revisar si la estructura sigue siendo la adecuada cuando crezca el patrimonio.',
      },
    ],
  },

  fees: {
    title: 'Honorarios',
    body: 'Los honorarios de asesoría en estructuras societarias se acuerdan caso por caso, en función de la complejidad de la estructura, el número de sociedades creadas, las aportaciones no dinerarias implicadas y el alcance del acompañamiento posterior. Es un servicio premium que no tiene tarifa pública porque cada caso es distinto. La primera videollamada es gratuita y sin compromiso — al final de ella te doy un rango de honorarios concreto para tu caso.',
  },

  faq: [
    {
      question: '¿Una SLU para invertir en inmuebles me sale rentable comparado con IRPF?',
      answer:
        'Depende de tu tipo marginal en IRPF y de cuánto inviertas en gastos deducibles dentro de la sociedad. Como regla aproximada: si tu tipo marginal en IRPF está por encima del 30-35% y tienes ingresos por alquiler significativos, la SLU empieza a tener sentido (el IS es 25%). Pero hay que computar también los costes de la sociedad (gestoría, IS, dividendos) y la fricción operativa. Lo veo caso por caso.',
    },
    {
      question: '¿Una holding me sirve para reducir el Impuesto de Sucesiones?',
      answer:
        'La holding bien diseñada permite acceder a las reducciones por "empresa familiar" en Impuesto de Sucesiones (hasta el 95% en la mayoría de comunidades autónomas) cuando se cumplen los requisitos: actividad económica real, participación mínima, ejercicio de funciones directivas y mantenimiento de los requisitos durante un periodo. No es automático ni mecánico — requiere estructurar la sociedad cumpliendo los requisitos de manera sostenida.',
    },
    {
      question: '¿Las estructuras internacionales son legales o son "paraísos fiscales"?',
      answer:
        'Las estructuras internacionales son perfectamente legales cuando se diseñan con actividad económica real en el país receptor, se declaran correctamente ante la Hacienda española (Modelo 720 si corresponde, transparencia fiscal internacional, etc.) y se evitan jurisdicciones consideradas paraíso fiscal por la OCDE o España. Yo solo trabajo con estructuras 100% declaradas y trazables. Si lo que buscas es opacidad o no declarar, no soy tu broker.',
    },
    {
      question: '¿Puedo aportar mis inmuebles actuales (en mi nombre) a una sociedad nueva?',
      answer:
        'Sí, mediante aportación no dineraria. Implica una tasación, escritura ante notario, AJD aplicable y, en algunos casos, plusvalía municipal (aunque hay exenciones por reestructuración empresarial conforme al artículo 76 LIS). El coste fiscal de la aportación se compensa con los beneficios futuros de operar desde la sociedad. Hay que hacer números antes de decidir.',
    },
    {
      question: '¿Cuánto tarda en estar operativa una estructura completa?',
      answer:
        'Para una SLU sencilla con todo en orden, 2-4 semanas desde la firma de la propuesta hasta el alta en censo y operativa bancaria. Para una holding con varias sociedades operativas y aportaciones no dinerarias, 6-12 semanas dependiendo de los inmuebles a aportar y la coordinación con tasadora, notaría y registro. Para una estructura internacional, 8-16 semanas considerando los plazos de la jurisdicción extranjera.',
    },
  ] as FaqEntry[],
} as const
