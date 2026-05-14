import type { FaqEntry } from '@psz/ui'

/**
 * Contenido del pillar `/tipos-de-hipoteca`.
 *
 * Pillar tipológico: explica las modalidades de hipoteca residencial
 * disponibles en España, sus diferenciales, a quién encaja cada una y
 * los gotchas operativos. Complementa el comparador
 * /comparador-hipoteca-fija-variable-mixta (que cuantifica) con
 * contenido cualitativo (cuándo y por qué).
 */

export const PILLAR_TIPOS_HIPOTECA = {
  hero: {
    eyebrow: 'Guía pillar · Modalidades hipotecarias',
    h1: 'Tipos de hipoteca en España',
    sub:
      'Las 3 modalidades principales (fija, variable, mixta) más las menos habituales (IRPH, multidivisa, hipoteca inversa, hipoteca verde, inversión y subrogación). A quién encaja cada una, cuándo conviene cada elección y los gotchas operativos que rara vez se cuentan. Por Antonio Palacios Cambero (Toño Palacios), broker hipotecario nº E242 (Banco de España) y presidente de ANICI.',
  },

  // Las 3 modalidades principales en detalle
  mainModalities: {
    title: 'Las tres modalidades principales',
    intro:
      'En España, prácticamente todas las hipotecas residenciales firmadas hoy son fija, variable o mixta. Cada modalidad responde a una pregunta operativa distinta: predictibilidad vs ahorro inicial vs equilibrio. La elección no es matemática — depende de horizonte, perfil de riesgo y previsión sobre los tipos.',
    items: [
      {
        name: 'Fija',
        color: 'border-l-emerald-400',
        oneliner: 'TIN constante toda la vida del préstamo. Cuota previsible.',
        whoFits:
          'Comprador que valora predictibilidad por encima de ahorro inicial, horizonte de permanencia > 10 años, aversión al riesgo del Euríbor. Primera vivienda habitual con plan a largo plazo. Familias que no quieren seguir el Euríbor mes a mes.',
        howItWorks:
          'El TIN se pacta al inicio y no cambia. La cuota mensual es la misma del primer al último mes (salvo novación o subrogación). En la FEIN aparece como "tipo fijo a X% durante 360 meses".',
        upside: [
          'Cero exposición al Euríbor',
          'Cuota previsible — facilita presupuesto familiar',
          'No sufres con noticias macroeconómicas',
          'Negociable a 25-30 años en banca minorista',
        ],
        downside: [
          'TIN inicial más alto que variable',
          'Si el Euríbor baja, no te beneficias',
          'Comisión de amortización anticipada ligeramente superior (limitada por Ley 5/2019)',
        ],
        gotcha:
          'El TIN fijo "publicitado" suele ser el bonificado al máximo (con todas las vinculaciones). El TIN fijo "sin vinculaciones" puede estar 0,5-0,8 puntos por encima. Compara siempre con vinculaciones que realmente vas a aceptar, no con el escenario teórico.',
      },
      {
        name: 'Variable',
        color: 'border-l-amber-400',
        oneliner: 'TIN = Euríbor + diferencial. Revisión semestral o anual.',
        whoFits:
          'Comprador con horizonte corto (vender o subrogar en <7 años), tolerancia alta al riesgo, expectativa de Euríbor estable o decreciente. Inversor con propiedades múltiples y tesorería para absorber subidas. NO es para primerizos con poco colchón.',
        howItWorks:
          'El TIN se calcula como Euríbor (típicamente el 12 meses publicado por BdE) más un diferencial fijo pactado (típico 0,5-1,2%). La cuota se revisa cada 6 o 12 meses según contrato. Cuando sube el Euríbor, sube tu cuota; cuando baja, baja.',
        upside: [
          'TIN inicial significativamente más bajo que fija',
          'Si el Euríbor baja, baja tu cuota automáticamente',
          'Comisión de amortización anticipada limitada por Ley 5/2019 (máximo 0,25% del capital amortizado en variable durante los primeros 3 años, 0,15% después)',
          'Plazo flexible',
        ],
        downside: [
          'Si el Euríbor sube fuerte (como en 2022-23: +4pp en 18 meses), tu cuota sube 30-50% en 12-18 meses',
          'Estrés financiero real en escenarios adversos',
          'Difícil presupuesto familiar a largo plazo',
        ],
        gotcha:
          'El diferencial pactado es CONSTANTE — lo que cambia es el Euríbor. Si firmas Euríbor + 0,85% con Euríbor a 2,8%, tu TIN actual es 3,65%. Si el Euríbor sube a 4%, tu TIN pasa a 4,85% sin que cambies de hipoteca ni firmes nada. La revisión es automática.',
      },
      {
        name: 'Mixta',
        color: 'border-l-sky-400',
        oneliner: 'Fijo los primeros N años, luego variable. Combina lo mejor de ambas.',
        whoFits:
          'Primerizo joven con horizonte intermedio (5-15 años) que quiere blindar la fase inicial de mayor estrés financiero y asumir riesgo después. Comprador que cree que el Euríbor estará alto los próximos 3-7 años pero se normalizará a largo plazo. El "compromiso pragmático" más recomendado para primerizo medio en 2026.',
        howItWorks:
          'Durante un tramo inicial de N años (típicamente 3, 5, 7 o 10), el TIN es fijo a un tipo pactado. Pasado ese tramo, pasa automáticamente a variable referenciada a Euríbor + diferencial. La cuota cambia el primer mes del nuevo tramo.',
        upside: [
          'Cuota predecible los primeros años (cuando más estresado estás financieramente)',
          'Capital amortizado durante el tramo fijo reduce la base expuesta al Euríbor del tramo variable',
          'TIN inicial intermedio entre fija pura y variable pura',
        ],
        downside: [
          'Más compleja de comparar entre bancos (hay que mirar ambos tramos)',
          'Algunos bancos cobran comisión por el cambio de tramo',
          'Decisión "qué hacer al pasar a variable" hay que tomarla a los N años (¿novar a fija?)',
        ],
        gotcha:
          'El tramo fijo "barato" suele venir con un diferencial variable posterior alto (compensación del banco). Mira siempre la combinación completa: TIN fijo + Euríbor estimado del tramo variable + diferencial. Un mixta con tramo fijo a 2,5% durante 5 años pero diferencial posterior de 1,5% puede ser peor que una variable directa a Euríbor + 0,8%.',
      },
    ],
  },

  // Modalidades menos habituales
  minorModalities: {
    title: 'Modalidades menos habituales',
    intro:
      'Estas modalidades existen en el mercado español pero representan una fracción muy pequeña de las hipotecas firmadas hoy. Conviene saber qué son para distinguirlas si te las ofrecen — algunas son legítimas, otras son productos legacy que no recomendaría.',
    items: [
      {
        name: 'Hipoteca referenciada al IRPH',
        verdict: 'Evitar si tienes opción',
        body:
          'IRPH = Índice de Referencia de Préstamos Hipotecarios. Alternativa al Euríbor pero históricamente más alto. Tiene historia litigiosa (sentencias de abusividad sectoriales). Bancos siguen ofreciéndolo en algunos productos pero rara vez compensa frente a una variable referenciada al Euríbor estándar.',
      },
      {
        name: 'Hipoteca multidivisa',
        verdict: 'Evitar salvo perfil muy específico',
        body:
          'Préstamo referenciado a una divisa distinta del euro (típicamente yen japonés, franco suizo). Atractivo cuando el tipo de cambio es favorable, peligroso cuando el euro se deprecia. Casos judiciales masivos en España por opacidad en la información precontractual. Solo encaja si percibes ingresos significativos en esa divisa.',
      },
      {
        name: 'Hipoteca inversa',
        verdict: 'Producto específico para mayores de 65',
        body:
          'El banco te paga una renta mensual a cambio de la vivienda al fallecer. Producto pensado para personas mayores con vivienda en propiedad pagada y sin herederos, o que quieren liquidez sin vender. Complejidad fiscal y emocional alta — requiere asesoramiento especializado.',
      },
      {
        name: 'Hipoteca verde',
        verdict: 'Recomendable si tu inmueble es A o B energético',
        body:
          'No es una modalidad distinta sino una bonificación: si la vivienda que compras tiene certificado energético A o B inscrito antes de la firma, la mayoría de bancos aplica -0,1 a -0,25 puntos sobre el TIN. Compatible con fija, variable o mixta.',
      },
      {
        name: 'Hipoteca para inversión / segunda vivienda',
        verdict: 'Modalidad operativa, no modalidad legal',
        body:
          'Cualquier hipoteca destinada a vivienda no habitual (inversión, segunda residencia) recibe condiciones distintas: LTV 60-70% (no 80%), plazo 25 años (no 30), TIN +0,3-0,8 pp. Es una clasificación interna del banco, no una modalidad legal distinta. Ver el pillar específico /hipoteca-inversor.',
      },
      {
        name: 'Subrogación de acreedor',
        verdict: 'No es modalidad nueva, es cambio de banco',
        body:
          'Cambias el banco titular de tu hipoteca actual sin perder la garantía. Útil cuando otro banco ofrece mejor TIN o menos vinculaciones. Comisión limitada por Ley 5/2019 al 0,5% del capital pendiente máximo. Operación parecida a firmar una nueva con menos trámites.',
      },
    ],
  },

  // Decisión por perfil
  decisionByProfile: {
    title: 'Qué modalidad encaja con tu perfil',
    intro:
      'No hay respuesta universal a "¿fija o variable?" porque el perfil del comprador cambia la respuesta. Estas son las recomendaciones operativas por perfil tras +100 operaciones del despacho en 2025.',
    rows: [
      {
        perfil: 'Primerizo joven (<35) con horizonte largo (>15 años)',
        recomendacion: 'Mixta tramo 7-10 años, o fija si la diferencia de TIN es <0,5 pp',
        rationale:
          'La predictibilidad en la fase de consolidación financiera vale más que el ahorro de TIN. Pasada esa fase, ya tienes capacidad para asumir riesgo Euríbor.',
      },
      {
        perfil: 'Primerizo con horizonte intermedio (5-10 años)',
        recomendacion: 'Variable, o mixta con tramo fijo 5 años',
        rationale:
          'Si vas a vender o subrogar antes de 10 años, la variable suele compensar — pagas menos al inicio, vendes antes de que llegue el riesgo acumulado.',
      },
      {
        perfil: 'Comprador adulto (>50) con horizonte corto',
        recomendacion: 'Fija — plazo más corto y predictibilidad total',
        rationale:
          'Edad cierra antes de 75 años, plazo máximo más corto, capacidad de absorber shocks menor que un joven. La predictibilidad vale más.',
      },
      {
        perfil: 'Inversor con propiedades múltiples',
        recomendacion: 'Variable o mixta con tramo fijo corto (3-5 años)',
        rationale:
          'La tesorería del inversor puede absorber subidas del Euríbor. El ahorro de TIN inicial multiplicado por el flujo de operaciones compensa el riesgo. Plan de salida claro reduce horizonte.',
      },
      {
        perfil: 'Autónomo con ingresos variables',
        recomendacion: 'Fija, sin dudar',
        rationale:
          'Tu ingreso ya es variable. Añadirle una cuota variable es exponer doble. La fija aporta el ancla de predictibilidad que tu ingreso no tiene.',
      },
      {
        perfil: 'No residente fiscal en España',
        recomendacion: 'Fija — predictibilidad para gestión desde el extranjero',
        rationale:
          'Gestionar el seguimiento del Euríbor y revisiones desde fuera de España añade fricción. La fija elimina ese trabajo.',
      },
    ],
  },

  // Bonificaciones y vinculaciones
  bonificaciones: {
    title: 'Bonificaciones y vinculaciones — cómo se calcula el TIN real',
    paragraphs: [
      'El TIN "publicitado" en la web del banco suele ser el bonificado al máximo (con todas las vinculaciones aceptadas). El TIN "sin vinculaciones" puede estar 0,5-0,8 puntos por encima. La diferencia se llama "diferencial de bonificación" y conviene calcularlo en términos absolutos (€ ahorrados frente a € pagados en productos vinculados).',
      'Bonificaciones típicas en banca minorista española:',
    ],
    bonificacionesList: [
      { trigger: 'Domiciliación de nómina', bono: '-0,3 a -0,5 pp TIN', coste: '0 € (si ya tienes nómina)' },
      { trigger: 'Seguro de hogar con el banco', bono: '-0,1 a -0,3 pp TIN', coste: '+50-150 €/año vs mercado' },
      { trigger: 'Seguro de vida con el banco', bono: '-0,1 a -0,3 pp TIN', coste: '+100-300 €/año vs mercado' },
      { trigger: 'Plan de pensiones (aportación mínima anual)', bono: '-0,1 a -0,2 pp TIN', coste: 'según aportación' },
      { trigger: 'Tarjeta de crédito con el banco', bono: '-0,05 a -0,1 pp TIN', coste: '20-50 €/año' },
      { trigger: 'Alarma con el banco', bono: '-0,05 a -0,1 pp TIN', coste: '+200-400 €/año' },
      { trigger: 'Recibos domiciliados (≥3)', bono: '-0,05 a -0,1 pp TIN', coste: '0 €' },
    ],
    cierre:
      'Por Ley 5/2019 el banco está obligado a ofrecerte también la hipoteca SIN vinculaciones y reflejar la diferencia de coste total en la FEIN. Compara siempre las dos ofertas con números absolutos, no con porcentajes.',
  },

  // Errores al elegir modalidad
  mistakes: {
    title: 'Errores típicos al elegir modalidad',
    items: [
      {
        title: 'Elegir por la cuota inicial',
        body:
          'Mirar solo la cuota inicial del primer mes es el error nº1. La variable siempre gana en este ranking pero puede perder fácilmente cuando sube el Euríbor. Mira siempre coste total proyectado + cuota máxima en escenario adverso (usa el comparador y el stress test).',
      },
      {
        title: 'Asumir el TIN publicitado sin las vinculaciones reales',
        body:
          'El TIN del escaparate es el bonificado. Si las vinculaciones que asumes son más caras que la bonificación que te aportan, el TIN "real" para ti es peor que el publicitado. Calcula coste total de cada vinculación.',
      },
      {
        title: 'Confundir TIN con TAE',
        body:
          'TIN es el tipo de interés nominal sin comisiones. TAE es el tipo efectivo con todo incluido (comisiones de apertura, estudio, productos vinculados). Compara siempre TAE entre ofertas — un banco con TIN bajo pero TAE alto te cobra más al final.',
      },
      {
        title: 'Quedarse con la oferta del banco habitual',
        body:
          'Tu banco habitual no es necesariamente el que te dará mejor hipoteca. Cada banco tiene políticas distintas. Solicita FEIN a 2-3 bancos mínimo o trabaja con un broker hipotecario que negocie por ti.',
      },
      {
        title: 'No pensar en la salida (horizonte)',
        body:
          'Una hipoteca a 30 años no significa que la pagarás 30 años. Si vendes la vivienda a los 10 años, la modalidad que importa es la que rinde mejor esos 10 primeros años — no a 30. Define tu horizonte realista antes de elegir.',
      },
    ],
  },

  // FAQ
  faq: [
    {
      question: '¿Cuáles son los tipos de hipoteca disponibles en España?',
      answer:
        'Las tres modalidades principales son: hipoteca fija (TIN constante toda la vida del préstamo), hipoteca variable (Euríbor + diferencial, revisión 6-12 meses) y hipoteca mixta (fijo los primeros N años, después variable). Adicionalmente existen modalidades menos habituales: IRPH (alternativa al Euríbor), multidivisa, hipoteca inversa (para mayores de 65) y bonificaciones tipo hipoteca verde por eficiencia energética A/B.',
    },
    {
      question: '¿Cuál es la mejor modalidad de hipoteca en 2026?',
      answer:
        'Depende de tu perfil. Para primerizo con horizonte largo y aversión al riesgo: mixta tramo 7-10 años o fija. Para horizonte corto (<7 años): variable o mixta corta. Para autónomo: fija. Para no residente: fija. Para inversor con tesorería: variable. No hay respuesta universal — usa el comparador para cuantificar tu caso concreto en 3 escenarios de Euríbor.',
    },
    {
      question: '¿En qué se diferencian fija y variable?',
      answer:
        'Fija: TIN constante toda la vida del préstamo, cuota previsible, TIN inicial más alto. Variable: TIN = Euríbor + diferencial pactado, revisión cada 6 o 12 meses, TIN inicial más bajo pero expuesto al riesgo del Euríbor. La diferencia operativa real es predictibilidad (fija) vs ahorro inicial (variable) con riesgo asumido.',
    },
    {
      question: '¿Qué tramo fijo conviene en una hipoteca mixta?',
      answer:
        'Operativamente entre 7 y 10 años es el sweet spot. Cubre la fase de mayor estrés financiero (primeros años con cuota más alta sobre ingresos), durante esos años amortizas capital y reduces la sensibilidad al Euríbor del tramo variable posterior. Tramos fijos de menos de 5 años suelen ser insuficientes; tramos de más de 12 años empiezan a tener el coste de una fija pura.',
    },
    {
      question: '¿Qué es el Euríbor y cómo afecta a mi hipoteca?',
      answer:
        'El Euríbor (Euro Interbank Offered Rate) es el tipo interbancario al que las hipotecas variables españolas se referencian habitualmente. La revisión de la cuota es semestral o anual según contrato. Si tu hipoteca es Euríbor 12M + 0,85% y el Euríbor actual es 2,8%, tu TIN aplicado es 3,65%. Cuando sube el Euríbor, sube tu cuota; cuando baja, baja.',
    },
    {
      question: '¿Qué pasa si elegí variable y el Euríbor sube fuerte?',
      answer:
        'Tu cuota sube en la próxima revisión. Tres opciones operativas: (1) amortizar parcialmente para reducir el capital expuesto, (2) novar con tu banco actual cambiando de variable a fija, (3) subrogar a otra entidad con mejor oferta fija. La comisión de subrogación está limitada por Ley 5/2019 a 0,5% del capital pendiente máximo. Usa el stress test para anticipar el impacto.',
    },
    {
      question: '¿Qué es la hipoteca verde y conviene?',
      answer:
        'Es una bonificación que aplican la mayoría de bancos cuando la vivienda comprada tiene certificado energético A o B inscrito antes de la firma. Reducen el TIN entre -0,1 y -0,25 puntos. Compatible con fija, variable o mixta. Si la vivienda es eficiente, conviene exigir la bonificación al banco — la mayoría no la ofrece de oficio, tienes que pedirla.',
    },
    {
      question: '¿Qué son las vinculaciones y cuánto bonifican?',
      answer:
        'Son productos del banco que aceptas contratar a cambio de una bonificación del TIN. Las típicas: domiciliación de nómina (-0,3 a -0,5 pp), seguro de hogar (-0,1 a -0,3 pp), seguro de vida (-0,1 a -0,3 pp), plan de pensiones, tarjeta y alarma. Por Ley 5/2019 el banco debe ofrecer también la hipoteca sin vinculaciones. Compara siempre el coste total de las vinculaciones frente al ahorro de TIN.',
    },
    {
      question: '¿Qué es el IRPH y por qué no se recomienda?',
      answer:
        'El IRPH (Índice de Referencia de Préstamos Hipotecarios) es una alternativa al Euríbor que históricamente ha estado más alta. Tiene historia litigiosa en España por sentencias sobre opacidad en la información precontractual. Aunque algunos bancos siguen ofreciéndolo, rara vez compensa frente a una variable referenciada al Euríbor estándar. Si te ofrecen IRPH, exige Euríbor a cambio.',
    },
    {
      question: '¿Conviene la hipoteca multidivisa en 2026?',
      answer:
        'Como regla general, no. La hipoteca multidivisa (referenciada a yen japonés, franco suizo u otra divisa distinta del euro) introduce un riesgo cambiario que rara vez compensa para un consumidor minorista. Hubo litigios masivos en España por opacidad. Solo encaja si percibes ingresos significativos y estables en esa divisa, lo que es muy poco habitual.',
    },
    {
      question: '¿Cómo elijo modalidad si dudo entre las tres?',
      answer:
        'Sigue tres pasos: (1) define tu horizonte realista de permanencia en la vivienda — la modalidad gana o pierde según ese horizonte; (2) usa el comparador fija/variable/mixta para cuantificar en 3 escenarios de Euríbor; (3) si los 3 escenarios dan el mismo ganador, tu decisión es robusta; si cambia, tu decisión depende de lo que creas del Euríbor — y entonces conviene también revisar el stress test.',
    },
  ] as ReadonlyArray<FaqEntry>,
} as const
