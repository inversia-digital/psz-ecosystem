import type { FaqEntry } from '@psz/ui'

/**
 * Contenido del pillar /broker-hipotecario (nacional).
 * Separado del JSX para mantener la página declarativa y para que las variantes
 * locales (/broker-hipotecario-zaragoza, /-madrid, etc.) puedan reusar y
 * sobreescribir solo lo que cambia.
 */

export const PILLAR_BROKER = {
  hero: {
    eyebrow: 'Broker hipotecario · Servicio nacional',
    h1: 'Broker hipotecario en España',
    sub: 'Negocio tu hipoteca con más de 20 bancos. Asesoría transparente, sin promesas vacías. Registro Banco de España nº E242, presidente de ANICI.',
  },

  whatIsIt: {
    title: '¿Qué hace exactamente un broker hipotecario?',
    paragraphs: [
      'Un broker hipotecario es un profesional independiente que negocia tu hipoteca con varias entidades financieras a la vez para conseguirte las mejores condiciones posibles. No trabaja para un banco concreto: trabaja para ti.',
      'A diferencia de tu director de oficina —cuyo objetivo es vender productos de SU banco—, mi trabajo es comparar lo que ofrecen +20 entidades, identificar dónde encaja tu perfil, negociar el diferencial y el TAE, y acompañarte hasta la firma en notaría.',
      'Mi función concreta incluye: analizar tu situación financiera y patrimonial, preparar el dossier de presentación al banco, negociar simultáneamente con varias entidades, eliminar comisiones y vinculaciones innecesarias, coordinar la tasación, revisar las cláusulas del contrato y representarte ante el banco hasta la firma.',
      'En España la actividad está regulada por la Ley 5/2019 de Contratos de Crédito Inmobiliario. Solo pueden ejercer profesionales inscritos en el Registro de Intermediarios de Crédito Inmobiliario del Banco de España. Mi número de registro es **E242** y puedes verificarlo en cualquier momento en la web oficial del Banco de España.',
    ],
  },

  whyTono: {
    title: 'Por qué Toño Palacios y no otro broker',
    // Datos consumidos desde el módulo compartido @/app/_data/whyTono
  },

  differences: {
    title: 'Broker vs intermediario vs comparador vs banco',
    rows: [
      {
        actor: 'Banco (tu oficina)',
        works_for: 'Para el banco',
        products: 'Solo los suyos',
        cost: 'Sin coste aparente (cargado en el TAE)',
        regulated_by: 'Banco de España',
      },
      {
        actor: 'Comparador online',
        works_for: 'Para sí mismo (cobra a los bancos por leads)',
        products: 'Catálogo de varios bancos',
        cost: 'Aparentemente gratis (cobra al banco)',
        regulated_by: 'Variable',
      },
      {
        actor: 'Intermediario / Broker hipotecario (yo)',
        works_for: 'Para ti',
        products: '+20 bancos negociados a medida',
        cost: 'Honorarios a éxito transparentes',
        regulated_by: 'Banco de España (Ley 5/2019)',
      },
    ],
  },

  national: {
    title: 'Servicio en toda España',
    paragraphs: [
      'Trabajo con clientes en las 17 comunidades autónomas. La gestión hipotecaria es 100% digital: análisis del perfil, preparación del dossier, negociación con bancos, revisión del contrato, todo se hace por videollamada, email y firma electrónica.',
      'Para la firma en notaría te acompaño físicamente si me lo pides — a cualquier punto de España, con los gastos de desplazamiento incluidos en mis honorarios. Cuando no es necesario, la firma se hace con normalidad sin mi presencia.',
      'Mis clientes operativos en este momento están en Madrid, Barcelona, Valencia, Sevilla, Bilbao, Málaga, Zaragoza, Alicante, Murcia, Las Palmas y otras ciudades. La ubicación no es un obstáculo; la banca es la misma en toda España.',
    ],
  },

  mortgageTypes: {
    title: 'Tipos de hipoteca que negocio',
    items: [
      {
        name: 'Hipoteca fija',
        body: 'Cuota constante toda la vida del préstamo. Para perfiles conservadores o cuando el Euribor sube. Negocio diferenciales por debajo de la media del mercado.',
      },
      {
        name: 'Hipoteca variable',
        body: 'Euríbor + diferencial. Para quien apuesta por bajadas de tipos a medio plazo. Optimizamos el diferencial y las bonificaciones a pagar.',
      },
      {
        name: 'Hipoteca mixta',
        body: 'Tramo inicial fijo + tramo final variable. La opción más popular en 2026. Negocio tanto el plazo del fijo como las condiciones del variable.',
      },
      {
        name: 'Hipoteca al 100% (o cerca)',
        body: 'Solo posible para perfiles muy concretos (funcionarios, empleados públicos, jóvenes con avalistas, propiedades por debajo del valor de tasación). Conozco las puertas de cada banco para estos casos.',
      },
      {
        name: 'Hipoteca para inversores',
        body: 'Para inmuebles destinados a alquiler o rentabilidad. Estructura distinta, condiciones distintas, plazos distintos. Mi especialidad — recuerda que dirijo el instituto INARPA.',
      },
      {
        name: 'Subrogación o cambio de banco',
        body: 'Mejorar tu hipoteca actual moviéndola de banco o renegociando con el tuyo actual. En muchos casos el ahorro paga mis honorarios x10.',
      },
      {
        name: 'Reunificación de deudas',
        body: 'Si tienes hipoteca + préstamos personales + tarjetas, unificarlo todo en una sola cuota más barata. Análisis previo para ver si compensa.',
      },
      {
        name: 'Eliminación de avalistas / dobles garantías',
        body: 'Liberar a tus padres o socios del aval cuando ya tu solvencia es suficiente. Negocio con el banco la sustitución de garantías.',
      },
    ],
  },

  fees: {
    title: 'Reserva profesional + honorarios a éxito',
    paragraphs: [
      'Mi modelo de cobro tiene dos tramos, ambos por escrito y conocidos antes de empezar:',
      '**Reserva profesional al firmar el contrato de intermediación: 600 €.** Cubre el inicio del trabajo — estudio del expediente, dossier ejecutivo, primera presentación a entidades, coordinación de tasación. La reserva es compromiso real de ambas partes: si yo no consigo la hipoteca por causa imputable a mí, te la devuelvo íntegra.',
      '**Honorarios a éxito al firmar la hipoteca: entre tres mil y cuatro mil quinientos euros** según complejidad del caso (importe, garantías, perfil). Es un servicio exento de IVA según el artículo 20.1.18º de la Ley 37/1992 del IVA. Si no firmamos hipoteca, no se cobra este tramo.',
      'Por qué cobro reserva y no opero "100% a éxito": un broker que no pide reserva no se compromete contractualmente con el caso. Yo invierto horas reales antes de la firma, presento tu expediente a entidades con mi nombre y reputación. La reserva equilibra: tú te comprometes a continuar, yo me comprometo a darlo todo. Ni comisiones ocultas, ni vinculaciones encubiertas, ni productos cruzados.',
    ],
  },

  process: {
    title: 'Cómo es el proceso paso a paso',
    steps: [
      {
        n: '01',
        title: 'Primera llamada o videollamada (gratis y sin compromiso)',
        body: 'Me cuentas tu situación: ingresos, ahorro, deudas, qué quieres comprar y para qué. En 30 minutos te digo si tu caso es viable y a qué bancos vamos a presentarlo. Si decidimos seguir, firmamos el contrato de intermediación y se abona la reserva profesional de 600 €.',
      },
      {
        n: '02',
        title: 'Recopilación de documentación',
        body: 'Te envío una lista concreta (nóminas, declaraciones de renta, vida laboral, escritura del inmueble, etc.). La revisamos juntos y preparamos un dossier ejecutivo que vende tu perfil al banco.',
      },
      {
        n: '03',
        title: 'Negociación simultánea con +20 bancos',
        body: 'Presentamos tu caso a varias entidades a la vez. Cada banco hace su oferta. Yo negocio diferencial, comisiones, bonificaciones y vinculaciones para sacarte la mejor.',
      },
      {
        n: '04',
        title: 'Comparativa final y elección',
        body: 'Te entrego una comparativa clara con las 2 o 3 mejores ofertas. Tú decides cuál te convence. Yo te asesoro pero no te empujo: la firma es tuya.',
      },
      {
        n: '05',
        title: 'Tasación y oferta vinculante',
        body: 'Coordino la tasación independiente y la entrega de la FEIN (Ficha Europea de Información Normalizada). Revisamos cláusula a cláusula que coincide con lo negociado.',
      },
      {
        n: '06',
        title: 'Firma en notaría',
        body: 'Si me lo pides, te acompaño físicamente a la notaría y aclaro cualquier cláusula en directo. Si no lo necesitas, la firma se hace con normalidad. Cuando firmas, mi trabajo está hecho.',
      },
      {
        n: '07',
        title: 'Soporte post-firma',
        body: 'Si en los meses siguientes el banco mete alguna comisión inesperada o necesitas cambiar algo, sigo siendo tu interlocutor.',
      },
    ],
  },

  cases: {
    title: 'Casos reales (anonimizados)',
    items: [
      {
        title: 'Hipoteca al 95% con dos avalistas eliminados',
        body: 'Cliente joven sin nómina histórica, padres avalando, vivienda en Madrid de 320.000 €. Conseguimos hipoteca al 95% del valor de tasación con un banco que normalmente exige 80% LTV, y en la primera renegociación a los 18 meses sacamos a los padres del aval.',
      },
      {
        title: 'Subrogación con ahorro de 47.000 €',
        body: 'Hipoteca variable Euribor + 1,25% firmada en 2018. Capital pendiente 180.000 €, 22 años restantes. Subrogamos a mixta 10 años fija al 2,15% + variable Euribor + 0,55%. Ahorro neto sobre el escenario más probable: 47.000 € en cuota total.',
      },
      {
        title: 'Hipoteca para autónomo con dos años de facturación',
        body: 'Autónoma con solo dos ejercicios cerrados (lo mínimo legal). Cuatro bancos la rechazaron en su oficina. Presentamos dossier ejecutivo a tres entidades especializadas: aprobada en dos, firmamos al 80% LTV con la que mejor TAE ofrecía.',
      },
      {
        title: 'Reunificación con cuota 320 € más baja',
        body: 'Familia con hipoteca + 2 préstamos personales + 3 tarjetas revolving. Cuota total mensual 1.480 €. Reunificación: una sola hipoteca ampliada con cuota de 1.160 €. La operación se pagó sola en menos de un año.',
      },
    ],
  },

  faq: [
    {
      question: '¿Qué hace exactamente un broker hipotecario?',
      answer:
        'Un broker hipotecario es un profesional independiente registrado en el Banco de España que negocia tu hipoteca con varias entidades a la vez para conseguir las mejores condiciones. No trabaja para un banco: trabaja para ti. Mi función es analizar tu perfil, presentarte ante +20 bancos en paralelo, negociar diferencial y TAE, eliminar vinculaciones innecesarias, coordinar tasación y acompañarte hasta la firma en notaría.',
    },
    {
      question: '¿Cuánto cuesta contratar a Toño Palacios como broker hipotecario?',
      answer:
        'Mi modelo es reserva profesional + honorarios a éxito. Al firmar el contrato de intermediación se abona una reserva de 600 € que cubre el inicio del trabajo. Al firmar la hipoteca se cobran los honorarios restantes (entre tres mil y cuatro mil quinientos euros según complejidad del caso), exentos de IVA según el artículo 20.1.18º de la Ley 37/1992. Si no consigo la hipoteca por causa imputable a mí, te devuelvo la reserva íntegra. El importe completo lo conoces y firmas antes de empezar a trabajar.',
    },
    {
      question: '¿Cómo verifico que mi broker está registrado en Banco de España?',
      answer:
        'En la web oficial del Banco de España existe el Registro de Intermediarios de Crédito Inmobiliario y Prestamistas Inmobiliarios. Cualquier ciudadano puede consultarlo de forma gratuita. Mi número de registro es E242 y la inscripción está a nombre de la sociedad operativa INVERSIA GLOBAL DIGITAL, S.L.U. (CIF B75281394); si me buscas, hazlo por E242, por el CIF o por la razón social. Si un broker no quiere darte su número o no aparece en ese registro, no es un intermediario legal y la operación está fuera de la regulación de la Ley 5/2019.',
    },
    {
      question: '¿En qué se diferencia un broker hipotecario de un comparador o un intermediario?',
      answer:
        'Los comparadores online (tipo Idealista, Rastreator) cobran a los bancos por enviarte clientes; trabajan para el comparador, no para ti. Los intermediarios y los brokers hipotecarios son la misma figura legal en España bajo la Ley 5/2019, registrados en Banco de España y vinculados por código deontológico. La diferencia de nombre es semántica. La diferencia real está en quién te factura: si te factura un comparador con honorarios "cero" para ti, alguien está pagando esa cuenta (el banco) y eso siempre repercute en tus condiciones.',
    },
    {
      question: '¿Trabajas solo con clientes en Zaragoza o en toda España?',
      answer:
        'Atiendo en toda España. Mi oficina legal está en Cuarte de Huerva (Zaragoza) pero el servicio es 100% digital. Tengo clientes operativos en Madrid, Barcelona, Valencia, Sevilla, Bilbao, Málaga, Alicante, Murcia, Las Palmas y otras ciudades. Si necesitas que te acompañe a la firma en notaría, lo hago en cualquier punto de España con los gastos de desplazamiento incluidos en mis honorarios; si no lo necesitas, la firma se hace con normalidad sin mi presencia.',
    },
    {
      question: '¿Cuánto se tarda en conseguir una hipoteca con un broker?',
      answer:
        'Desde el primer contacto hasta la firma en notaría suelen ser 4 a 8 semanas, dependiendo de la complejidad del caso y de la agilidad de los bancos. La primera semana es recopilación de documentación y dossier. Las siguientes 2-3 semanas son negociación y oferta vinculante (FEIN). Las últimas 1-2 semanas son tasación y notaría. Acelero todo lo que puedo, pero algunos plazos los marca la entidad financiera por ley.',
    },
    {
      question: '¿Puedo conseguir hipoteca siendo extranjero, autónomo o con nómina irregular?',
      answer:
        'Sí, en muchos casos. Los autónomos pueden hipoteca con dos años de declaración fiscal y un dossier bien presentado. Los extranjeros residentes y los no residentes tienen acceso a hipotecas específicas (variando según país de origen). Las nóminas irregulares (comerciales con variable, freelancers, ingresos por dividendos) requieren presentar promedios y proyecciones. La clave es preparar el dossier correctamente y presentarlo a bancos especializados en cada perfil. Mi conocimiento de qué banco acepta qué perfil es lo que más valor te aporta en estos casos.',
    },
    {
      question: '¿Es seguro contratar un broker hipotecario? ¿Qué supervisión tiene?',
      answer:
        'Sí, siempre que esté registrado en el Banco de España. La actividad está regulada por la Ley 5/2019 de Contratos de Crédito Inmobiliario, que obliga a los intermediarios a tener formación específica, seguro de responsabilidad civil profesional, código de conducta, transparencia en honorarios y registro público. Además, ANICI (la asociación nacional, de la que soy presidente) tiene un código deontológico interno que va más allá del mínimo legal. Si quieres seguridad extra, comprueba siempre el registro BdE y, en mi caso, la presidencia ANICI.',
    },
    {
      question: '¿Qué documentos necesito para empezar?',
      answer:
        'Para una primera valoración: DNI, últimas 3 nóminas (o IRPF de los últimos 2 años si eres autónomo), vida laboral, último recibo de cuotas si tienes otras deudas, y los datos básicos del inmueble que quieres comprar (nota simple, escritura o publicación inmobiliaria). Con eso tengo suficiente para decirte si tu caso es viable. La documentación completa para la presentación a banco la preparamos juntos después.',
    },
    {
      question: '¿Y si mi caso es complicado (deudas, avalistas, hipoteca rechazada antes)?',
      answer:
        'Justo en esos casos es donde más valor aporta un broker. Los bancos en oficina rechazan al primer "no" del scoring automático. Yo trabajo el dossier, sé qué entidades tienen criterios distintos, negocio explicaciones razonables para historiales irregulares, y a veces planteo estructuras alternativas (avalistas temporales, dos titulares, refinanciación previa). El 60% de mis casos llegan tras un rechazo previo y un porcentaje muy alto se resuelve con éxito. Lo importante es no rendirse en el primer "no".',
    },
  ] as FaqEntry[],
} as const
