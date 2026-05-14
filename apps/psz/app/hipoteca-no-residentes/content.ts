import type { FaqEntry } from '@psz/ui'

/**
 * Contenido del pillar `/hipoteca-no-residentes`.
 *
 * Pillar de comprador extranjero o residente fiscal fuera de España
 * adquiriendo vivienda en territorio nacional. Audiencia con
 * particularidades fuertes: LTV mucho menor (40-65%), documentación
 * específica por país de origen, requisitos fiscales (NIE, IRNR),
 * bancos especializados que sí entienden el perfil y proceso parcialmente
 * a distancia.
 *
 * Mantenimiento: revisar LTV típicos cada 6 meses (varían según
 * ciclo del mercado inmobiliario español).
 */

export const PILLAR_NO_RESIDENTES = {
  hero: {
    eyebrow: 'Guía pillar · Comprador no residente',
    h1: 'Hipoteca para no residentes en España',
    sub:
      'Guía operativa para extranjeros o residentes fiscales fuera de España que quieren comprar vivienda en territorio nacional con financiación bancaria. LTV reales (40-65%, muy lejos del 80% que aplica a residentes), documentación específica por país de origen (UE, UK post-Brexit, Latinoamérica, EEUU, resto del mundo), requisitos fiscales (NIE, IRNR) y bancos receptivos. Por Toño Palacios, broker hipotecario nº E242.',
  },

  // ─────────────────────────────────────────────────────────────────────
  // Lo que cambia vs residente
  // ─────────────────────────────────────────────────────────────────────
  diferencias: {
    title: 'Lo que cambia cuando eres no residente fiscal en España',
    intro:
      'Como no residente fiscal, la banca minorista española te aplica un marco completamente distinto al residente: LTV menor, documentación más exigente, TIN típicamente más alto y plazos más cortos. No es discriminación: es gestión de riesgo del banco frente a un perfil cuya información crediticia no puede verificar internamente como sí hace con los residentes (CIRBE, vida laboral, IRPF español).',
    rows: [
      {
        criterio: 'LTV máximo',
        residente: 'Hasta 80% en primera vivienda',
        noResidente: '40% UE / 50-65% no UE según país',
      },
      {
        criterio: 'Cash necesario aprox.',
        residente: '28-32% del precio (entrada + gastos)',
        noResidente: '50-65% del precio del inmueble',
      },
      {
        criterio: 'Plazo máximo típico',
        residente: '30 años',
        noResidente: '20-25 años',
      },
      {
        criterio: 'TIN diferencial',
        residente: 'Mediana de mercado',
        noResidente: '+0,5 a +1 pp sobre la mediana',
      },
      {
        criterio: 'NIE obligatorio',
        residente: 'Ya lo tienes con DNI',
        noResidente: 'Trámite previo imprescindible',
      },
      {
        criterio: 'Documentación financiera',
        residente: 'Verificable por el banco (CIRBE, AEAT)',
        noResidente: 'Debes aportar y, en ocasiones, traducir y apostillar',
      },
      {
        criterio: 'Cuenta bancaria',
        residente: 'No necesariamente nueva',
        noResidente: 'Apertura de cuenta no residente normalmente exigida',
      },
      {
        criterio: 'Firma',
        residente: 'Presencial en notaría',
        noResidente: 'A distancia con poder notarial apostillado',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────
  // LTVs por país de origen
  // ─────────────────────────────────────────────────────────────────────
  ltvsPorOrigen: {
    title: 'LTVs típicos por origen del comprador',
    intro:
      'La banca minorista española clasifica al comprador no residente por su país de residencia fiscal, no por nacionalidad. Un español residente fiscal en Suiza recibe el mismo trato que un suizo. Estos son los LTVs típicos:',
    rows: [
      {
        zona: 'Unión Europea (residente fiscal en UE)',
        ltv: '60-70%',
        notas: 'Acceso a la mayoría de bancos. Documentación traducida acepta jurada en muchos casos. Requiere certificado de empadronamiento fiscal del país de origen.',
      },
      {
        zona: 'Reino Unido (post-Brexit)',
        ltv: '55-65%',
        notas: 'Tratamiento ligeramente más restrictivo desde Brexit. Algunos bancos exigen documentación apostillada. Persiste oferta específica para UK por el volumen histórico.',
      },
      {
        zona: 'Suiza, Noruega, Islandia (EEE no UE)',
        ltv: '55-65%',
        notas: 'Similar a UE en la mayoría de bancos. Tributación específica requiere asesoramiento fiscal.',
      },
      {
        zona: 'EEUU, Canadá, Australia',
        ltv: '50-60%',
        notas: 'Requisito habitual: documentación apostillada (Apostilla de La Haya), traducción jurada. Bancos receptivos: Santander, BBVA. Otros pueden rechazar.',
      },
      {
        zona: 'América Latina',
        ltv: '50-60%',
        notas: 'Tratamiento variable por país: México y Argentina más fácil, Venezuela y países con sanciones más complejo. Apostilla y traducción jurada obligatorias.',
      },
      {
        zona: 'Países sin convenio de doble imposición con España',
        ltv: '40-50%',
        notas: 'LTV mínimo, plazos más cortos. Algunos bancos directamente no operan. Casos típicos: Emiratos Árabes, ciertas regiones africanas y asiáticas.',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────
  // Documentación específica
  // ─────────────────────────────────────────────────────────────────────
  documentacion: {
    title: 'Documentación que vas a necesitar',
    intro:
      'La documentación se puede dividir en cuatro bloques. El primero es imprescindible para CUALQUIER operación; los otros tres dependen del banco y tu perfil. Toda la documentación procedente del extranjero suele necesitar Apostilla de La Haya (o legalización consular en países no firmantes) y traducción jurada al español.',
    bloques: [
      {
        title: 'Identidad y residencia',
        items: [
          'NIE (Número de Identificación de Extranjero) — trámite previo en cualquier comisaría de policía nacional o consulado español del país de residencia',
          'Pasaporte vigente',
          'Certificado de empadronamiento fiscal del país de residencia (apostillado)',
          'Certificado de no residencia fiscal en España (si aplica)',
        ],
      },
      {
        title: 'Capacidad económica',
        items: [
          'Últimas 6 nóminas o equivalente (si trabajador por cuenta ajena)',
          'Últimas 2-3 declaraciones de impuestos del país de residencia (apostilladas)',
          'Si autónomo o sociedad propia: cuentas anuales 2-3 años + acreditación de propiedad de la sociedad',
          'Vida laboral o equivalente del país de origen',
        ],
      },
      {
        title: 'Patrimonio y aporte propio',
        items: [
          'Certificado bancario de saldos de los últimos 6-12 meses (apostillado)',
          'Justificación del origen del aporte propio (ahorros vs herencia vs venta de activos)',
          'Si el aporte viene de otro país: prueba de la transferencia internacional y origen lícito (prevención del blanqueo)',
          'Certificado de la entidad bancaria de no tener cargas',
        ],
      },
      {
        title: 'Inmueble',
        items: [
          'Nota simple del Registro de la Propiedad (la pide el banco directamente)',
          'Tasación por sociedad homologada por el Banco de España (la encarga el banco; la paga el cliente)',
          'Contrato de arras o reserva firmado entre comprador y vendedor',
          'En obra nueva: licencia de primera ocupación o cédula de habitabilidad',
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────
  // Bancos receptivos
  // ─────────────────────────────────────────────────────────────────────
  bancosReceptivos: {
    title: 'Bancos receptivos al perfil no residente',
    intro:
      'No todos los bancos españoles operan con no residentes con la misma facilidad. Algunos tienen departamentos dedicados al "international banking" con personal multilingüe; otros directamente derivan estas operaciones a sus departamentos centrales y los plazos se alargan. Como broker hipotecario, presento la operación a los bancos correctos según el país de origen del cliente — no a los 20 indiscriminadamente.',
    paragraphs: [
      'La oferta no residente varía además por temporada y por el ciclo del mercado inmobiliario español. En épocas de gran liquidez bancaria, los LTV suben y los TINs bajan; en épocas restrictivas, lo contrario.',
      'Los bancos que más operan con no residentes en España suelen ser los grandes nacionales con presencia internacional (Santander, BBVA, CaixaBank) y entidades especializadas. Los bancos de menor tamaño y cajas regionales muchas veces no admiten este perfil o solo lo hacen con LTV muy bajos.',
    ],
  },

  // ─────────────────────────────────────────────────────────────────────
  // Fiscalidad relevante
  // ─────────────────────────────────────────────────────────────────────
  fiscalidad: {
    title: 'Fiscalidad relevante para no residentes',
    intro:
      'Al no ser residente fiscal en España, tu tributación es distinta. Esta sección no sustituye al asesoramiento fiscal personalizado de un asesor colegiado en tu país y en España — pero te da el marco operativo para anticipar costes.',
    items: [
      {
        title: 'NIE — Número de Identificación de Extranjero',
        body:
          'Imprescindible para CUALQUIER trámite económico en España (cuenta bancaria, hipoteca, escritura de compraventa, alta de suministros). Se solicita en una comisaría de policía nacional con cita previa o en el consulado español del país de residencia. Plazo de obtención: 2-6 semanas según oficina. Coste: 9,84 € (tasa modelo 790).',
      },
      {
        title: 'IRNR — Impuesto sobre la Renta de no Residentes',
        body:
          'Como propietario no residente de inmueble en España, tributas por IRNR (no por IRPF). Si la vivienda está vacía, pagas un impuesto sobre "renta imputada" del 1,1-2% del valor catastral al año. Si la alquilas, tributas por los ingresos del alquiler al 19% (residentes UE) o 24% (no UE) sobre rendimientos netos.',
      },
      {
        title: 'Impuesto sobre el Patrimonio',
        body:
          'Algunas comunidades autónomas tienen Impuesto sobre el Patrimonio para no residentes propietarios. Madrid tiene bonificación del 100% (no se paga); Cataluña, Baleares y otras lo aplican. Consulta la normativa autonómica donde compras.',
      },
      {
        title: 'Plusvalía municipal (al vender)',
        body:
          'Si vendes la vivienda con ganancia, pagas plusvalía municipal (impuesto autonómico sobre el incremento de valor del terreno urbano). Adicionalmente, la ganancia patrimonial tributa al 19% IRNR (residentes UE) o 24% (no UE).',
      },
      {
        title: 'Convenios de doble imposición',
        body:
          'España tiene convenios de doble imposición con la mayoría de países. Te permiten descontar en tu país de residencia parte de lo pagado en España. Revisa el convenio aplicable con un asesor fiscal del país de origen — los efectos varían mucho según jurisdicción.',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────
  // Proceso paso a paso
  // ─────────────────────────────────────────────────────────────────────
  proceso: [
    {
      n: '1',
      title: 'Obtén el NIE antes de empezar',
      body:
        'Sin NIE no se puede firmar nada en España. Solicítalo en el consulado español de tu país (la opción más práctica si estás fuera) o en cualquier comisaría española durante una visita. Plazo medio: 2-6 semanas. Sin NIE el proceso se detiene.',
    },
    {
      n: '2',
      title: 'Calcula tu rango realista de financiación',
      body:
        'Como no residente, asume LTV del 50-65% (no 80% como un residente). Para una vivienda de 250.000 € en LTV 60%, el banco te financia 150.000 € — necesitas 100.000 € de entrada + ~25.000-35.000 € de gastos. Cash total: ~130.000 €. Sé honesto contigo mismo antes de buscar inmueble.',
    },
    {
      n: '3',
      title: 'Abre cuenta bancaria de no residente en España',
      body:
        'La mayoría de bancos exige abrirla antes de tramitar la hipoteca. Trámite presencial habitualmente, aunque algunos bancos admiten apertura remota con DocuSign + verificación documental. Coste: 0-150 €/año dependiendo del banco.',
    },
    {
      n: '4',
      title: 'Reúne la documentación apostillada y traducida',
      body:
        'Bloque más lento. Cada documento del país de origen necesita Apostilla de La Haya (en notaría/ministerio del país de origen) y traducción jurada al español (la haces una vez aquí). Plazo medio: 3-6 semanas. Coste: 500-2.000 € según volumen de documentos.',
    },
    {
      n: '5',
      title: 'Solicita prevaloración a 2-3 bancos receptivos',
      body:
        'No vayas a cualquier banco. La operación encaja con bancos que tienen departamento de no residentes o que históricamente operan con tu país de origen. Un broker hipotecario te dirige al banco correcto desde el principio y evita 4-6 semanas perdidas en negativas.',
    },
    {
      n: '6',
      title: 'Firma el contrato de arras con el vendedor',
      body:
        'En muchas operaciones de no residentes las arras se firman cuando tienes la prevaloración bancaria, no antes. El contrato de arras suele incluir cláusula de "sujeto a aprobación bancaria" que protege tu reserva si la hipoteca cae por causa imputable al banco.',
    },
    {
      n: '7',
      title: 'Recibe la FEIN y espera el periodo de reflexión',
      body:
        'Igual que un residente: el banco está obligado a entregar la FEIN con un mínimo de 10 días naturales antes de la firma (Ley 5/2019 art. 14). Lo recibes traducido a tu idioma si lo solicitas y si el banco lo ofrece (no todos lo hacen). El acta notarial previa también aplica.',
    },
    {
      n: '8',
      title: 'Firma de la hipoteca y compraventa en notaría',
      body:
        'Dos opciones: viajar a España para la firma presencial o firmar a distancia con poder notarial apostillado a favor de un representante en España. El poder notarial debe estar otorgado ante notario del país de origen, apostillado y traducido. Coste del poder: 200-500 €.',
    },
  ],

  // ─────────────────────────────────────────────────────────────────────
  // Errores típicos del no residente
  // ─────────────────────────────────────────────────────────────────────
  mistakes: {
    title: 'Errores que cuestan caro al no residente',
    items: [
      {
        title: 'Asumir LTV 80% como residente',
        body:
          'Es el error más caro. Calculas el cash basado en LTV 80%, firmas arras del 10%, descubres en la prevaloración que el banco te ofrece 55% LTV y pierdes las arras o tienes que aportar el dinero adicional. Asume siempre 50-65% LTV en tu primera operación como no residente.',
      },
      {
        title: 'No empezar por el NIE',
        body:
          'Algunos compradores intentan firmar arras o contactar bancos sin tener el NIE todavía. El NIE es el primer paso, no el último. Sin él no avanza absolutamente nada. Empieza el trámite del NIE 2-3 meses antes de la fecha objetivo de firma.',
      },
      {
        title: 'No verificar la apostilla y la traducción jurada',
        body:
          'Apostilla y traducción jurada NO son lo mismo. La apostilla certifica que el documento original es válido en su país; la traducción jurada traduce el contenido oficialmente al español. Necesitas ambas. Cualquier documento sin apostilla se rechaza por la mayoría de bancos.',
      },
      {
        title: 'Llevar la documentación a cualquier banco',
        body:
          'No todos los bancos operan con no residentes y los que lo hacen tienen criterios muy distintos por país de origen. Llevar el expediente a un banco que no operará con tu perfil es 3-4 semanas perdidas. El broker hipotecario sabe qué bancos van a tu caso.',
      },
      {
        title: 'No considerar el coste fiscal del IRNR',
        body:
          'Como propietario no residente, pagas IRNR todos los años aunque la vivienda esté vacía (renta imputada 1,1-2% del valor catastral). Es un coste recurrente que muchos compradores no incluyen en su cálculo total de tenencia y descubren tarde.',
      },
      {
        title: 'Subestimar los costes de cierre',
        body:
          'Encima de los gastos típicos (ITP/IVA, notaría, registro, gestoría), añade: apostillas y traducciones (~500-2.000 €), poder notarial (~200-500 €), cuenta de no residente (~0-150 €/año), asesoría fiscal (~300-800 €). Suma 1-2% adicional del precio en costes específicos del no residente.',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────
  // FAQ
  // ─────────────────────────────────────────────────────────────────────
  faq: [
    {
      question: '¿Cuánto LTV financia un banco español a un no residente?',
      answer:
        'Entre el 40% y el 70% según país de residencia fiscal: 60-70% para residentes en UE, 55-65% para Reino Unido y EEE no UE, 50-60% para EEUU, Canadá, Australia y Latinoamérica, 40-50% para países sin convenio de doble imposición con España. Muy lejos del 80% que aplica a residentes.',
    },
    {
      question: '¿Qué es el NIE y cómo lo consigo si no vivo en España?',
      answer:
        'NIE (Número de Identificación de Extranjero) es el identificador fiscal que todo extranjero necesita para cualquier trámite económico en España. Se solicita en el consulado español de tu país de residencia o en cualquier comisaría de policía nacional. Plazo: 2-6 semanas. Coste: 9,84 €. Sin NIE no se puede comprar nada en España.',
    },
    {
      question: '¿Puedo firmar la hipoteca sin viajar a España?',
      answer:
        'Sí. Se otorga un poder notarial en el país de residencia ante notario local, se apostilla (Apostilla de La Haya) y se traduce de forma jurada. El representante apoderado en España firma en tu nombre. Coste del poder: 200-500 €. Plazo de tramitación: 2-3 semanas. Algunos bancos también admiten firma electrónica con DocuSign.',
    },
    {
      question: '¿Qué documentación necesita un no residente para una hipoteca en España?',
      answer:
        'Cuatro bloques: identidad (NIE, pasaporte), capacidad económica (nóminas o cuentas anuales, declaraciones de impuestos), patrimonio (certificados bancarios, justificación del origen del aporte propio) e inmueble (nota simple, contrato de arras). Toda la documentación extranjera necesita apostilla y traducción jurada al español. Plazo medio de preparación: 3-6 semanas.',
    },
    {
      question: '¿Qué impuestos paga un propietario no residente en España?',
      answer:
        'Tres principales: IRNR sobre renta imputada (1,1-2% del valor catastral si la vivienda está vacía) o sobre rentas de alquiler (19% UE / 24% no UE), Impuesto sobre el Patrimonio según comunidad autónoma, IBI municipal. Al vender, plusvalía municipal y ganancia patrimonial al 19-24% por IRNR.',
    },
    {
      question: '¿Cuáles son los bancos españoles que operan con no residentes?',
      answer:
        'Los grandes nacionales con presencia internacional son los más receptivos: Santander, BBVA, CaixaBank tienen departamentos específicos de "international banking" con personal multilingüe. Otros bancos como Sabadell, Bankinter y Openbank operan según país y volumen. Las cajas regionales y bancos pequeños raramente admiten este perfil.',
    },
    {
      question: '¿Por qué la hipoteca de no residente es más cara?',
      answer:
        'Por dos razones: el TIN típicamente lleva +0,5 a +1 punto porcentual de sobrecoste, y el LTV menor obliga a poner más cash propio (50-65% del precio vs 28-32% para residentes). El banco asume mayor riesgo porque no tiene acceso a tu información crediticia interna como sí tiene con un residente (CIRBE, IRPF español, vida laboral SS).',
    },
    {
      question: '¿Cuánto tarda una hipoteca de no residente?',
      answer:
        'Entre 8 y 14 semanas, casi el doble que para residentes: 4-6 semanas de preparación documental (NIE, apostilla, traducción jurada), 2-4 semanas de análisis bancario (más profundo por el perfil no residente), 1-2 semanas de tasación, 10 días obligatorios de reflexión post-FEIN. Si la operación incluye obra nueva o segunda vivienda, suma más.',
    },
    {
      question: '¿Conviene contratar un broker para una hipoteca de no residente?',
      answer:
        'Sí, casi siempre. El broker hipotecario español conoce qué bancos operan con tu perfil concreto (varía por país de origen), qué documentación pide cada uno, qué LTV ofrecen y qué condiciones negociar. Sin broker es muy frecuente perder 4-6 semanas entre bancos que rechazan el perfil. Toño Palacios opera con clientes de UE, UK, EEUU y Latinoamérica.',
    },
    {
      question: '¿Puede un español residente en otro país comprar como no residente?',
      answer:
        'Sí. La banca clasifica por residencia fiscal, no por nacionalidad. Un español residente fiscal en Reino Unido, Suiza o Argentina recibe el mismo trato que un nativo de ese país. El criterio es donde tributas por tus rentas mundiales, no el pasaporte. Si dudas, el certificado de residencia fiscal de tu país zanja la cuestión.',
    },
    {
      question: '¿Hay límite a cuántas propiedades puede comprar un no residente?',
      answer:
        'No hay límite legal en España para no residentes (a diferencia de algunos países que restringen propiedad extranjera). Sí hay implicaciones fiscales: a partir de cierto volumen patrimonial, el Impuesto sobre el Patrimonio empieza a aplicar progresivamente según comunidad autónoma. Conviene asesoramiento fiscal antes de operaciones múltiples.',
    },
  ] as ReadonlyArray<FaqEntry>,
} as const
