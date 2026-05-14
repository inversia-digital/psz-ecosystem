import type { FaqEntry } from '@psz/ui'

/**
 * Contenido del pillar `/hipoteca-primera-vivienda`.
 *
 * Pillar de comprador primerizo en España. Es el de mayor volumen de
 * búsqueda del sector, así que merece densidad operativa y rangos
 * reales, no marketing genérico.
 *
 * Mantenimiento: revisar tabla ICO joven y tipos ITP cada 3-4 meses
 * (próxima ventana: agosto 2026).
 */

export const PILLAR_PRIMERA_VIVIENDA = {
  hero: {
    eyebrow: 'Guía pillar · Comprador primerizo',
    h1: 'Hipoteca para tu primera vivienda en España',
    sub:
      'Lo que cambia cuando es tu primera hipoteca: cuánto cash necesitas realmente (entrada + gastos), qué ayudas aplican en 2026, cómo te valora el banco como perfil sin historial hipotecario y qué errores cuestan más al comprador primerizo. Guía operativa de Toño Palacios, broker hipotecario nº E242.',
  },

  // ─────────────────────────────────────────────────────────────────────
  // ¿Qué cambia si es tu primera vivienda?
  // ─────────────────────────────────────────────────────────────────────
  whatChanges: {
    title: '¿Qué cambia si es tu primera vivienda?',
    intro:
      'Una primera hipoteca no es solo una hipoteca "normal". El banco te aplica criterios distintos a los de un inversor o un comprador con historial, y tú accedes a ventajas que no aplican fuera de la primera residencia.',
    items: [
      {
        title: 'LTV máximo del 80% (en lugar del 60-70% de inversión)',
        body:
          'Como primera vivienda habitual, la banca minorista española financia hasta el 80% del menor entre tasación y precio de compra. En inversión o segunda residencia, el techo cae al 60-70%. Esto significa que con menos cash propio puedes comprar.',
      },
      {
        title: 'Bonificaciones reservadas exclusivamente para primera vivienda',
        body:
          'Avales públicos (programa hipoteca joven), bonificaciones autonómicas para menores de 35 años, financiación verde para vivienda de eficiencia A/B y, según comunidad, reducción de ITP o AJD. Nada de esto aplica si la operación es para alquilar.',
      },
      {
        title: 'Vinculaciones más blandas',
        body:
          'El banco asume que es tu vivienda habitual y que mantendrás la relación durante toda la hipoteca. Por eso es más flexible en bonificaciones por nómina, seguros y planes de pensiones — la mayoría de bancos ofrece -0,3 a -0,8 puntos de TIN a cambio de 3-5 vinculaciones razonables.',
      },
      {
        title: 'Mayor escrutinio del scoring porque no tienes historial hipotecario',
        body:
          'Como primerizo no apareces en CIRBE con histórico hipotecario. El banco te valora exclusivamente por nómina, antigüedad laboral, deudas existentes y aporte propio. Esto hace que el dossier importe más que en perfiles repetidores.',
      },
      {
        title: 'Plazo más largo que en inversión',
        body:
          'En primera vivienda la banca acepta hasta 30 años de plazo (algunos bancos amplían a 35 con perfil muy joven). En inversión raramente pasan de 25, y en activos a reformar bajan a 20.',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────
  // Cuánto cash necesitas REALMENTE
  // ─────────────────────────────────────────────────────────────────────
  cashNeeded: {
    title: 'Cuánto dinero necesitas realmente (entrada + gastos)',
    intro:
      'La cifra que se da en la mayoría de medios — "necesitas el 20% para entrar a una hipoteca" — es engañosa. Es solo la entrada. Encima hay gastos de cierre que muchos primerizos descubren tarde y que pueden representar un 8-12% adicional del precio.',
    paragraphs: [
      'La regla operativa que utilizamos en el despacho: para una primera vivienda en España, necesitas tener disponible entre el 28% y el 32% del precio de compra en efectivo demostrable antes de empezar.',
      'Ese porcentaje cubre: la entrada (20% del valor de tasación o precio, el menor de los dos), los impuestos de la operación (ITP en vivienda usada o IVA+AJD en obra nueva), los honorarios de notaría y registro (~0,5-1% del precio), los honorarios de gestoría y tasación (entre 400 y 800 € fijos), y un colchón de imprevistos del 1-2% del precio.',
      'Si vas a presentar la operación a un broker hipotecario, suma además los honorarios del broker (en mi caso: reserva inicial de 600 € + entre tres mil y cuatro mil quinientos euros al cierre, todo por escrito antes de empezar, conforme a la Orden EHA/2899/2011).',
    ],
    table: {
      title: 'Cash necesario por CCAA (ejemplo: vivienda usada de 200.000 €)',
      headers: ['Comunidad', 'ITP', 'Entrada + ITP + gastos cierre + colchón'],
      rows: [
        ['País Vasco', '4%', '~56.000 € (28%)'],
        ['Madrid', '6%', '~60.000 € (30%)'],
        ['Canarias', '6,5%', '~61.000 € (30,5%)'],
        ['Andalucía / La Rioja', '7%', '~62.000 € (31%)'],
        ['Murcia / Castilla-La Mancha', '8%', '~64.000 € (32%)'],
        ['Galicia', '9%', '~66.000 € (33%)'],
        ['Cantabria / C. Valenciana¹', '10%', '~68.000 € (34%)'],
        ['Cataluña (tramos altos)', '10-13%', '~68.000-74.000 € (34-37%)'],
        ['Baleares', '8-13%', '~64.000-74.000 € (32-37%)'],
      ],
      footnote:
        '¹ Comunidad Valenciana: tipo del 10% hasta 31 de mayo de 2026, baja al 9% desde el 1 de junio de 2026. Cifras orientativas. La tabla completa de ITP por CCAA con detalle de tramos y exenciones está disponible en la calculadora de rentabilidad inmobiliaria (botón "i" del campo ITP).',
    },
  },

  // ─────────────────────────────────────────────────────────────────────
  // Ayudas y bonificaciones 2026
  // ─────────────────────────────────────────────────────────────────────
  aids: {
    title: 'Ayudas y bonificaciones disponibles en 2026',
    intro:
      'Hay tres categorías de ayudas activas a fecha de mayo de 2026 que pueden aplicar al comprador primerizo. Ninguna aplica de oficio: hay que solicitar cada una con los plazos y la documentación específica.',
    items: [
      {
        title: 'Aval estatal del ICO para vivienda de jóvenes',
        body:
          'Programa que avala hasta el 20% del valor de la vivienda para menores de 35 años (o familias con menores a cargo) con ingresos brutos hasta 37.800 €/año individuales o 50.400 €/año conjuntos. Sirve para llegar al 95-100% LTV con respaldo público. Vigente hasta 31 de diciembre de 2027.',
      },
      {
        title: 'Bonificaciones autonómicas (variables por CCAA)',
        body:
          'Madrid, Andalucía, Galicia, Murcia y varias autonomías tienen tipos reducidos de ITP para menores de 35 o 40 años, familias numerosas o personas con discapacidad. Reducciones típicas de 1-3 puntos sobre el ITP general (ej.: Madrid baja del 6% al 4% en perfiles que cumplen). Consulta el Decreto autonómico vigente.',
      },
      {
        title: 'Hipoteca verde (eficiencia energética A o B)',
        body:
          'Si la vivienda que compras tiene certificado energético A o B, la mayoría de bancos españoles aplica una bonificación adicional de -0,1 a -0,25 puntos sobre el TIN. Suele ser compatible con las bonificaciones por vinculaciones. Requiere que el certificado esté inscrito en el registro autonómico antes de la firma.',
      },
      {
        title: 'Deducción IRPF — solo hipotecas anteriores a 2013',
        body:
          'Si firmaste hipoteca para vivienda habitual antes del 1 de enero de 2013, conservas la deducción del 15% de las cantidades aportadas, con un máximo de 9.040 €/año. Para hipotecas posteriores a esa fecha NO existe deducción estatal (salvo regímenes forales de Navarra y País Vasco con sus propios beneficios). No esperes "desgravación" en tu IRPF si tu hipoteca es del 2026.',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────
  // Cómo te valora el banco
  // ─────────────────────────────────────────────────────────────────────
  bankScoring: {
    title: 'Cómo te valora el banco como comprador primerizo',
    paragraphs: [
      'El scoring bancario es un algoritmo que evalúa cinco variables principales: ratio de esfuerzo, antigüedad laboral, otras deudas, aporte propio y estabilidad del perfil. Cada banco pondera las variables distinto, pero los umbrales operativos son bastante consistentes en la banca minorista española.',
      'Como primerizo, el banco no tiene historial hipotecario tuyo, así que el peso del expediente sube. Cuanto más limpio y bien presentado entregues el dossier, mejor scoring tienes. Aquí están los umbrales reales con los que la mesa de riesgos decide:',
    ],
    criteria: [
      {
        name: 'Ratio de esfuerzo',
        value: 'Máximo 35-40%',
        detail:
          'La cuota de la hipoteca (más otras cuotas mensuales que ya pagues) no debe superar el 35% de tus ingresos netos mensuales. Algunos bancos amplían al 40% con perfiles muy sólidos sin otras deudas.',
      },
      {
        name: 'Antigüedad laboral',
        value: 'Mínimo 6 meses (recomendado 1-2 años)',
        detail:
          'Con nómina indefinida menos de 6 meses, la mitad de bancos rechaza. Con 1 año en activo y contrato indefinido entras cómodo. Autónomos necesitan 2 ejercicios IRPF cerrados.',
      },
      {
        name: 'Edad del titular más mayor',
        value: 'Plazo cierra antes de los 75',
        detail:
          'El banco recorta el plazo máximo para que la hipoteca termine antes de tus 75 años. Algunos amplían a 80 con vida laboral demostrable. Si tienes 50, el plazo máximo cae a 25 años.',
      },
      {
        name: 'LTV objetivo',
        value: '≤ 80%',
        detail:
          'Banca minorista financia hasta el 80% LTV en primera vivienda. Para llegar al 90-95% se requiere aval familiar, aval ICO o sobreprecio en el TIN. Por encima del 95% es excepcional.',
      },
      {
        name: 'Aporte propio acreditable',
        value: 'Origen lícito demostrable',
        detail:
          'El banco te pedirá justificar el origen del dinero que aportas: ahorros, donación documentada, herencia, venta de activos. Para importes superiores a 50.000 € la prevención del blanqueo (Ley 10/2010) puede pedir documentación adicional.',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────
  // Errores típicos del primerizo
  // ─────────────────────────────────────────────────────────────────────
  mistakes: {
    title: 'Errores que cuestan caro al comprador primerizo',
    items: [
      {
        title: 'Mirar la cuota antes que el precio total',
        body:
          'La cuota mensual cómoda no significa hipoteca cómoda. Una cuota de 800 € a 35 años cuesta más en intereses totales que la misma cuota a 25 años, aunque sea más fácil de pagar. Mira siempre intereses totales y plazo, no solo cuota mensual.',
      },
      {
        title: 'No tener presupuestados los gastos de cierre',
        body:
          'El error nº 1 del primerizo: ahorra justo el 20% para entrada y se queda sin dinero para notaría, registro, ITP, gestoría y colchón. La hipoteca cae porque el banco verifica que tienes cash suficiente para los gastos y se queda corto. Presupuesta el 28-32% del precio total.',
      },
      {
        title: 'Aceptar la primera oferta del banco sin contraprueba',
        body:
          'Cada banco tiene mediana propia de TIN, comisiones y vinculaciones. La oferta de tu banco habitual no es necesariamente la mejor. Pide oferta vinculante (FEIN) a un mínimo de 2-3 bancos antes de decidir. La FEIN es vinculante por ley durante 10 días naturales.',
      },
      {
        title: 'Confundir TIN con TAE',
        body:
          'TIN = tipo nominal sin comisiones. TAE = tipo efectivo incluyendo comisiones y vinculaciones. Comparar ofertas por TIN es engañoso: un banco con TIN bajo pero vinculaciones caras puede tener TAE peor que un banco con TIN alto y sin productos cruzados. Compara siempre TAE.',
      },
      {
        title: 'Firmar la hipoteca antes de leer la FEIN línea por línea',
        body:
          'La FEIN tiene 6-10 páginas y resume todas las condiciones. El periodo de 10 días naturales de reflexión obligatoria (Ley 5/2019 art. 14) es EXACTAMENTE para que te la leas. Si encuentras una cláusula que no entiendes, pregúntala al banco o a un broker antes de pisar la notaría.',
      },
      {
        title: 'Vincularse a productos que no usas',
        body:
          'El banco bonifica el TIN si contratas tarjeta, plan de pensiones o seguro de vida. Si no vas a usar esos productos, esas vinculaciones son sobrecoste neto. Calcula siempre coste total de la vinculación frente a la bonificación obtenida.',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────
  // Fija, variable o mixta para primerizo
  // ─────────────────────────────────────────────────────────────────────
  mortgageType: {
    title: 'Fija, variable o mixta — cuál te conviene como primerizo',
    intro:
      'Las tres modalidades funcionan en primera vivienda. La decisión depende de tu perfil de riesgo, horizonte de permanencia en la vivienda y previsión sobre el Euríbor.',
    types: [
      {
        name: 'Fija',
        whenItFits:
          'Si valoras la predictibilidad por encima de todo, vas a vivir allí más de 10 años y no te imaginas siguiendo el Euríbor mes a mes.',
        upside:
          'Misma cuota toda la vida del préstamo. Cero exposición al Euríbor. Presupuesto familiar previsible. Negociable a 25-30 años en banca minorista.',
        downside:
          'TIN inicial más alto que variable. Si el Euríbor baja, no te beneficias. Si decides amortizar anticipadamente, la comisión puede ser ligeramente superior.',
      },
      {
        name: 'Variable',
        whenItFits:
          'Si tu plan es vender o subrogar en menos de 10 años, o si crees que el Euríbor seguirá bajo y aceptas variabilidad.',
        upside:
          'TIN inicial significativamente más bajo que la fija. Si el Euríbor baja, baja tu cuota. Comisión de amortización anticipada limitada por Ley 5/2019.',
        downside:
          'Si el Euríbor sube (como pasó en 2022-2023), tu cuota puede subir 30-50% en 12-18 meses. Estrés financiero real.',
      },
      {
        name: 'Mixta',
        whenItFits:
          'Equilibrio para primerizos: predictibilidad los primeros años (cuando más expuesto estás financieramente) y flexibilidad después.',
        upside:
          'TIN fijo los primeros 3, 5, 7 o 10 años (según tramo elegido). Cuota previsible mientras consolidas tu situación. Pasa a variable cuando ya tienes margen.',
        downside:
          'Más compleja de comparar entre bancos. Algunos bancos cobran comisiones por el cambio de tramo. Requiere leer la FEIN con atención.',
      },
    ],
    recommendation:
      'Para perfil primerizo con horizonte largo (>10 años) y aversión al riesgo: hipoteca fija si el TIN fijo de mercado está por debajo del Euríbor + 1,5 pp; mixta tramo 5-10 años en otro caso. Para primerizo joven con perspectiva de cambio de vivienda en 5-7 años: variable o mixta corta. La elección no es matemática — depende de cómo duermes con la cuota subiendo.',
  },

  // ─────────────────────────────────────────────────────────────────────
  // Proceso paso a paso (alimenta HowTo schema)
  // ─────────────────────────────────────────────────────────────────────
  process: [
    {
      n: '1',
      title: 'Calcula tu capacidad real de endeudamiento',
      body:
        'Antes de mirar pisos, sabe cuánto te daría realmente el banco. Usa la calculadora de capacidad de endeudamiento para tener tu rango (conservador / estándar / agresivo) y tu precio máximo con el aporte propio que tengas.',
    },
    {
      n: '2',
      title: 'Ahorra el 28-32% del precio del inmueble en cash',
      body:
        'Entrada (20%) + ITP/IVA+AJD (4-13% según CCAA) + gastos de cierre (~1-2%) + colchón (~1-2%). No empieces a buscar piso sin tener este capital disponible — la operación se te caerá en última instancia por falta de cash.',
    },
    {
      n: '3',
      title: 'Busca inmueble dentro de tu capacidad realista',
      body:
        'Limita la búsqueda a precios donde el cash que tienes cubra el 28-32%. Si tienes 60.000 €, no busques pisos de 250.000 €. Si te enamoras de uno fuera de rango, el banco lo cortará.',
    },
    {
      n: '4',
      title: 'Solicita prevaloración a 2-3 bancos',
      body:
        'Con DNI, 3 últimas nóminas, vida laboral y nota simple del inmueble, los bancos te dan una prevaloración no vinculante en 3-7 días. Pídela a un mínimo de 2-3 bancos distintos para comparar. La oferta del banco habitual no suele ser la mejor.',
    },
    {
      n: '5',
      title: 'Negocia condiciones antes de pedir la oferta vinculante',
      body:
        'TIN, comisión de apertura, vinculaciones aceptables, plazo, modalidad. Esta es la fase donde un broker hipotecario aporta más valor: negocia con los bancos cara a cara y conoce qué entidad acepta qué bonificación. Si vas tú directo, no aceptes la primera oferta del banco.',
    },
    {
      n: '6',
      title: 'Recibe y revisa la FEIN (Ficha Europea Información Normalizada)',
      body:
        'El banco está obligado a entregarte la FEIN con un mínimo de 10 días naturales antes de la firma. Es el único documento vinculante. Léela línea por línea — comprueba TIN, TAE, vinculaciones, comisión de apertura, comisión de amortización anticipada, plazo. Si algo no cuadra, pregunta antes de firmar.',
    },
    {
      n: '7',
      title: 'Pasa por el acta notarial previa (obligatoria por Ley 5/2019)',
      body:
        'Comparecencia gratuita ante notario antes de firmar. El notario verifica que has entendido las condiciones y que el banco ha entregado toda la documentación. Sin acta previa no puede firmarse la hipoteca. La citación llega del banco directamente.',
    },
    {
      n: '8',
      title: 'Firma la escritura de hipoteca y compraventa en notaría',
      body:
        'Día clave: firmas compraventa y constitución de hipoteca el mismo día (a veces son dos firmas distintas separadas por horas). El notario lee las cláusulas relevantes. Tras la firma, recibes las llaves y pagas los gastos pendientes. La gestoría se ocupa de inscribir en el registro.',
    },
  ],

  // ─────────────────────────────────────────────────────────────────────
  // FAQ — citables por IAs en <80 palabras autocontenidas
  // ─────────────────────────────────────────────────────────────────────
  faq: [
    {
      question: '¿Cuánto cash necesito para comprar mi primera vivienda en España?',
      answer:
        'Entre el 28% y el 32% del precio del inmueble en efectivo demostrable: 20% de entrada (porque el banco financia hasta el 80% LTV en primera vivienda), entre el 4% y el 13% de ITP según comunidad autónoma (o IVA+AJD si es obra nueva), 1-2% de gastos de cierre (notaría, registro, gestoría, tasación) y 1-2% de colchón para imprevistos.',
    },
    {
      question: '¿Existe alguna ayuda del Estado para comprar mi primera vivienda?',
      answer:
        'Sí. El programa de aval estatal del ICO para vivienda de jóvenes (vigente hasta diciembre de 2027) avala hasta el 20% del valor de la vivienda para menores de 35 años o familias con menores a cargo, con ingresos brutos hasta 37.800 €/año individuales o 50.400 €/año conjuntos. Permite llegar al 95-100% LTV con respaldo público.',
    },
    {
      question: '¿Necesito tener un contrato indefinido para que me den hipoteca?',
      answer:
        'No es obligatorio pero sí el caso más fácil. Con contrato indefinido y antigüedad ≥1 año entras cómodo. Con temporal o autónomo se complica: temporales necesitan demostrar continuidad (varios contratos del mismo tipo), autónomos requieren 2 ejercicios IRPF cerrados. Los bancos no rechazan en bloque, evalúan caso por caso.',
    },
    {
      question: '¿Es mejor hipoteca fija, variable o mixta para una primera vivienda?',
      answer:
        'Depende del horizonte y la aversión al riesgo. Para horizonte >10 años y aversión al riesgo, fija. Para horizonte <7 años o expectativa de Euríbor bajo, variable. Mixta (fija los primeros 5-10 años, luego variable) es el equilibrio típico para primerizo joven que prioriza predictibilidad al inicio.',
    },
    {
      question: '¿Qué pasa si el Euríbor sube y tengo hipoteca variable?',
      answer:
        'Tu cuota sube en la siguiente revisión (semestral o anual según contrato). Si el Euríbor sube 1 punto porcentual, una hipoteca de 200.000 € a 30 años puede subir la cuota mensual unos 100-130 €. La revisión es automática — no puedes negociar. La salida es subrogar a fija o pagar la subida.',
    },
    {
      question: '¿Cuál es el periodo de reflexión obligatorio en una hipoteca?',
      answer:
        'Diez días naturales desde la entrega de la FEIN (Ficha Europea de Información Normalizada), según el artículo 14 de la Ley 5/2019. Durante esos 10 días el cliente puede retirarse sin penalización. La firma en notaría no puede producirse antes de que transcurran. Es una garantía del consumidor, no un favor del banco.',
    },
    {
      question: '¿Qué es la TAE y por qué importa más que el TIN?',
      answer:
        'TIN es el tipo de interés nominal sin comisiones ni vinculaciones. TAE es el tipo efectivo anual que incluye TIN + comisiones (apertura, estudio) + coste de productos vinculados obligatorios. La TAE es la métrica oficial de comparación entre ofertas: un banco con TIN bajo pero vinculaciones caras puede tener TAE peor que un banco con TIN alto sin vinculaciones.',
    },
    {
      question: '¿Puedo desgravarme la hipoteca en el IRPF?',
      answer:
        'Solo si firmaste hipoteca para vivienda habitual antes del 1 de enero de 2013. Para hipotecas firmadas después no existe deducción estatal (salvo regímenes forales de Navarra y País Vasco con sus propios beneficios). Si tu hipoteca es de 2026, no esperes desgravación estatal en tu declaración de la renta.',
    },
    {
      question: '¿Qué es la FEIN y por qué es importante?',
      answer:
        'La FEIN (Ficha Europea de Información Normalizada) es el documento oficial donde el banco te detalla todas las condiciones de la oferta hipotecaria: TIN, TAE, plazo, vinculaciones, comisiones, capital, cuota. Por Ley 5/2019 el banco debe entregártela al menos 10 días antes de la firma y queda vinculada durante esos 10 días.',
    },
    {
      question: '¿Conviene contratar un broker hipotecario para mi primera hipoteca?',
      answer:
        'Sí en tres casos claros: (1) si tu perfil no es estándar (autónomo, temporal, ingresos variables, joven con poco aval, no residente), (2) si ya te ha rechazado al menos un banco, (3) si valoras tu tiempo y no quieres negociar tú con varios bancos. En perfiles estándar con contrato indefinido y aporte holgado, puede no ser necesario.',
    },
    {
      question: '¿Cuánto tiempo se tarda en cerrar una primera hipoteca?',
      answer:
        'Entre 4 y 8 semanas desde el primer contacto con el banco hasta la firma en notaría: 1 semana de documentación, 2-3 de estudio bancario y negociación, 1-2 de tasación, y los 10 días obligatorios de reflexión post-FEIN. Si el banco te exige documentación adicional o el inmueble tiene cargas, el plazo se alarga.',
    },
  ] as ReadonlyArray<FaqEntry>,
} as const
