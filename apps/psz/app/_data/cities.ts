/**
 * Datos por ciudad para los pillars locales /broker-hipotecario-[slug].
 * Cada ciudad tiene su contenido específico — Google penaliza duplicados.
 *
 * El componente LocalPillar lee de aquí y renderiza la página completa.
 */

export interface CityData {
  slug: string
  name: string
  region: string
  geo: { lat: number; lng: number }
  angle: string // Hook único de la ciudad
  intro: string // Párrafo introductorio para el hero
  marketSummary: string // Resumen del mercado inmobiliario local
  pricePerSqm: string // Precio medio aproximado por m²
  banksActive: string[] // Bancos especialmente activos en la plaza
  clientProfiles: string[] // Perfiles típicos de cliente en esta ciudad
  typicalCase: { title: string; body: string }
  faq: { question: string; answer: string }[]
  workMode: string // Cómo trabajo desde/para esta ciudad
  /** Secciones específicas de la plaza (fiscalidad, extranjeros, avales…). Opcional: solo las ciudades con contenido propio. */
  sections?: { title: string; paragraphs: string[] }[]
}

export const CITIES: CityData[] = [
  {
    slug: 'zaragoza',
    name: 'Zaragoza',
    region: 'Aragón',
    geo: { lat: 41.6488, lng: -0.8891 },
    angle: 'Mi casa. Oficina física en Cuarte de Huerva y atención presencial preferente.',
    intro:
      'Zaragoza es donde tengo mi oficina y donde he conocido a la mayoría de mis clientes durante años. Si vives aquí, además del servicio digital completo, puedes verme en persona en Cuarte de Huerva siempre que lo necesites. Y conozco el mercado local de hipotecas mejor que el de ninguna otra ciudad.',
    marketSummary:
      'Mercado moderado, estable y predecible. Sin la inflación de Madrid o Barcelona, sin las oscilaciones del eje mediterráneo. Demanda fuerte de primera vivienda en el cinturón metropolitano (Cuarte, Utebo, Zuera) y oportunidades reales de inversión en barrios consolidados.',
    pricePerSqm: '1.700 €/m² (Centro: 2.500-3.500 €/m²)',
    banksActive: [
      'Ibercaja (líder local con condiciones diferenciadas)',
      'CaixaBank',
      'Banco Sabadell',
      'BBVA',
      'Cajamar',
      'Banco Santander',
    ],
    clientProfiles: [
      'Primera vivienda — jóvenes y familias jóvenes con nómina',
      'Segunda residencia o ampliación',
      'Inversores locales con 1-3 propiedades',
      'Autónomos consolidados de la provincia',
    ],
    typicalCase: {
      title: 'Caso típico Zaragoza: joven autónomo con avalistas',
      body: 'Cliente de 32 años, autónomo desde hace 4, ingresos variables. Buscaba piso en Actur por 195.000 €. Primer banco rechazó por scoring automático. Presentamos dossier ejecutivo a tres entidades (incluyendo Ibercaja que conoce el perfil aragonés bien) con dos avalistas. Aprobada al 90% con condiciones competitivas. Negociamos la salida de los avalistas a los 24 meses.',
    },
    faq: [
      {
        question: '¿Tengo que ir a tu oficina en Cuarte de Huerva?',
        answer:
          'No es obligatorio, pero muchos clientes locales lo prefieren. Mi oficina está en Polígono Alcoz Alto 21 (Cuarte de Huerva, junto a Zaragoza capital). Puedes venir para la primera reunión, para la firma del contrato o cuando quieras revisar el expediente en persona. Si prefieres todo digital, también funciona perfectamente.',
      },
      {
        question: '¿Conoces bien Ibercaja y los bancos aragoneses?',
        answer:
          'Sí. Llevo años negociando con Ibercaja, que es el banco que mejor entiende el perfil del cliente aragonés (especialmente autónomos del sector primario, comerciantes locales, perfiles con propiedades familiares). También trabajo con todos los nacionales que operan en Zaragoza.',
      },
      {
        question: '¿Cuáles son los barrios con más oportunidades de inversión en Zaragoza?',
        answer:
          'Sin entrar a detalle, hoy las zonas con mejor relación rentabilidad/riesgo son Las Fuentes, La Almozara y partes del Casco Histórico para alquiler tradicional; y el cinturón metropolitano (Cuarte, María de Huerva, Utebo) para revalorización a medio plazo. Cada caso es distinto y depende del perfil del inversor.',
      },
    ],
    workMode:
      'Modalidad mixta: digital + presencial cuando convenga. La oficina está abierta a clientes con cita previa.',
  },
  {
    slug: 'madrid',
    name: 'Madrid',
    region: 'Comunidad de Madrid',
    geo: { lat: 40.4168, lng: -3.7038 },
    angle: 'El mercado más exigente y caro de España. Necesitas un broker que conozca el terreno.',
    intro:
      'Madrid es el mercado hipotecario más competitivo y caro de España. Las hipotecas para inversores, no residentes y operaciones de alto importe se negocian aquí de forma diferente que en el resto del país. Trabajo con clientes de Madrid en remoto al 100% y, si la operación lo requiere, viajo a la notaría sin coste adicional para ti.',
    marketSummary:
      'Mercado de gran volumen con tres niveles muy diferenciados: vivienda media (Vallecas, Carabanchel, Villaverde) en torno a 2.500-3.000 €/m²; vivienda alta (Chamberí, Retiro, Chamartín) en torno a 5.000-7.000 €/m²; y prime (Salamanca, Centro) que sube fácilmente a 8.000-10.000 €/m². Fuerte presencia de no residentes y banca privada.',
    pricePerSqm: '4.200 €/m² (Salamanca/Centro: 8.000-10.000 €/m²)',
    banksActive: [
      'CaixaBank (acuerdos diferenciados con perfil madrileño)',
      'BBVA',
      'Banco Santander',
      'Sabadell',
      'Bankinter (especialmente para perfiles premium)',
      'Bancos privados: Andbank, UBS, Bankinter Investment (para operaciones grandes)',
    ],
    clientProfiles: [
      'Compradores de primera vivienda con ingresos altos',
      'No residentes (UE y extracomunitarios) buscando segunda residencia o inversión',
      'Inversores buscando rentabilidad por alquiler de larga duración',
      'Cambio de vivienda con venta de actual y compra simultánea',
      'Operaciones de alto importe (400.000 €+) que requieren banca privada',
    ],
    typicalCase: {
      title: 'Caso típico Madrid: no residente con financiación 60%',
      body: 'Ejecutivo francés residente en París, busca piso de inversión de 580.000 € en zona Salamanca. Los bancos por defecto le ofrecen 50-55% LTV a no residentes. Trabajamos el dossier con dos entidades especializadas en no residencia y conseguimos 60% LTV a tipo fijo competitivo. La firma fue en remoto desde París con apoderado en Madrid.',
    },
    faq: [
      {
        question: '¿Atiendes a no residentes (extranjeros) que compran en Madrid?',
        answer:
          'Sí, y es uno de los perfiles que más trabajo en la plaza madrileña. Las hipotecas para no residentes tienen tipos de interés ligeramente superiores y LTV menores (40-65% típicamente), pero hay entidades especializadas que sé identificar según país de origen, situación fiscal y tipo de operación. Trabajo tanto con no residentes UE como extracomunitarios.',
      },
      {
        question: '¿Necesitas que vaya a Madrid para la primera reunión?',
        answer:
          'No. Todo el proceso es 100% digital — primera videollamada, presentación de dossier, comparativas, negociación. Solo voy a Madrid si lo necesitas para la firma en notaría (sin coste adicional, está incluido en mis honorarios). Muchos clientes me eligen precisamente porque no exijo presencia física para arrancar.',
      },
      {
        question: '¿Puedo conseguir hipoteca al 90% o 100% para un piso de 500.000 €+ en Madrid?',
        answer:
          'Para importes altos, la mayoría de bancos limitan el LTV al 80% (a veces 75% en zona prime). Hay perfiles muy concretos — funcionario, ingresos muy altos y estables, garantías adicionales — que pueden acceder a más, pero no es la norma. Te lo digo en la primera llamada con honestidad: si lo que pides es viable, vamos a por ello; si no lo es, te lo explico antes de que pierdas tiempo.',
      },
    ],
    workMode:
      'Digital al 100%. Visita a Madrid para firma de notaría si me la pides (incluida en honorarios).',
    sections: [
      {
        title: 'Comprar la primera vivienda en Madrid: ICO y «Mi Primera Vivienda»',
        paragraphs: [
          'Madrid es la comunidad con el precio máximo más alto del aval ICO, 325.000 €, y tiene además su propio programa, «Mi Primera Vivienda», que permite financiar el 100 % del menor entre precio y tasación hasta 390.000 € a jóvenes con contrato indefinido o plaza de funcionario y dos años de residencia en la comunidad. Los dos programas no se combinan: se elige el que encaja con la edad, los ingresos y el precio.',
          'El programa madrileño va por fondos asignados a cada entidad y se ha agotado más de una vez: hay meses en los que no existe y meses en los que vuelve. Por eso nunca doy por hecho un aval hasta la semana en que presento el expediente, y nunca firmo arras contando con él sin confirmarlo.',
        ],
      },
      {
        title: 'No residentes y operaciones de alto importe',
        paragraphs: [
          'Madrid concentra las compras de no residentes y las operaciones por encima de 400.000 €. Para un no residente el porcentaje habitual está entre el 50 y el 65 %, con los ingresos del país de origen documentados y una cuenta en España; hay entidades especializadas por país y perfil. En importes altos, la mayoría de bancos limita al 80 %, y en zona prime al 75 %, y la negociación pasa a ser de tipo, vinculaciones y plazo más que de porcentaje.',
          'En estas operaciones la tasación manda: en distritos con precios muy dispares, una tasación por debajo del precio es frecuente y cambia el importe. La encargo pensando en todas las entidades a las que va el expediente, para presentar una sola.',
        ],
      },
      {
        title: 'Impuestos y gastos en la Comunidad de Madrid',
        paragraphs: [
          'Madrid es de las comunidades con menor carga fiscal en la compra: el Impuesto sobre Transmisiones Patrimoniales general es del 6 % en vivienda de segunda mano, con bonificaciones para vivienda habitual, familias numerosas y jóvenes según la normativa vigente; en obra nueva, IVA del 10 % más Actos Jurídicos Documentados. Desde la Ley 5/2019, el AJD del préstamo lo paga el banco. En el dossier de cada operación calculo el coste total antes de las arras, para que el ahorro necesario sea el real.',
        ],
      },
    ],
  },
  {
    slug: 'barcelona',
    name: 'Barcelona',
    region: 'Cataluña',
    geo: { lat: 41.3851, lng: 2.1734 },
    angle: 'Mercado bilingüe con fuerte presencia internacional. Inversión y segunda residencia dominan.',
    intro:
      'Barcelona tiene un perfil de mercado diferente al de Madrid: más diversificado por nacionalidades, con presencia muy fuerte de inversores europeos buscando segunda residencia, expats consolidados, y un mercado de alquiler vacacional con regulación cada vez más exigente. Te ayudo a navegar las particularidades catalanas — incluso las fiscales — desde mi oficina en Zaragoza.',
    marketSummary:
      'Mercado diversificado: vivienda media (Sant Andreu, Nou Barris) en torno a 2.500-3.500 €/m²; zonas consolidadas (Gracia, Eixample) en torno a 4.500-6.000 €/m²; y zonas prime (Sarrià-Sant Gervasi, Pedralbes) que superan los 7.000-9.000 €/m². Fuerte demanda de extranjeros UE.',
    pricePerSqm: '4.000 €/m² (Zona alta: 7.000-9.000 €/m²)',
    banksActive: [
      'CaixaBank (sede central en Barcelona, condiciones diferenciadas)',
      'Banco Sabadell (también con fuerte arraigo catalán)',
      'BBVA',
      'Banco Santander',
      'Bankinter',
    ],
    clientProfiles: [
      'Expats consolidados (italianos, franceses, alemanes, holandeses)',
      'Inversores europeos buscando segunda residencia',
      'Jubilados extranjeros adquiriendo residencia permanente',
      'Inversores de alquiler tradicional (no turístico)',
      'Compradores de primera vivienda en zonas en alza',
    ],
    typicalCase: {
      title: 'Caso típico Barcelona: francés con segunda residencia',
      body: 'Pareja francesa residente en Lyon, busca apartamento de 380.000 € en Eixample para uso de fin de semana y vacaciones. Su banco francés (BNP Paribas) les ofrecía hipoteca pero con tipo mucho peor que el mercado español. Conseguimos hipoteca al 60% LTV con CaixaBank a tipo fijo competitivo, gestión bilingüe del expediente, y firma simultánea en Barcelona ante notario.',
    },
    faq: [
      {
        question: '¿Conoces las particularidades fiscales catalanas (ITP, AJD)?',
        answer:
          'Sí. El Impuesto sobre Transmisiones Patrimoniales en Cataluña tiene tramos diferentes al resto de España, y el Actos Jurídicos Documentados aplicable a la hipoteca también. Lo incluyo en el cálculo total de gastos cuando hacemos el dossier — sin sorpresas en notaría. Si tu operación tiene casuística fiscal más compleja, trabajamos con asesor fiscal catalán de confianza.',
      },
      {
        question: '¿Las hipotecas en Barcelona tienen tipos diferentes que en el resto de España?',
        answer:
          'No. El tipo de interés es nacional — los bancos no diferencian por comunidad. Lo que sí cambia es el porcentaje de financiación (LTV) según barrio (los bancos son más conservadores en zonas con precios muy altos por kilómetro cuadrado) y las preferencias de cada banco por ciertos perfiles (por ejemplo CaixaBank tiene mejor predisposición con perfiles catalanes consolidados que un banco fuera de la plaza).',
      },
      {
        question: '¿Atiendes operaciones de extranjeros que compran piso turístico para alquilar?',
        answer:
          'Sí, pero con un aviso importante: la regulación del alquiler turístico en Barcelona (y en toda Cataluña) está cada vez más restringida. Antes de plantear una hipoteca con esa finalidad, te explico el marco legal actualizado y los riesgos. No te vendo una operación que no me dejaría comprar a mí mismo.',
      },
      {
        question: '¿Puedo llegar al 100 % de financiación en Barcelona con un aval público?',
        answer:
          'Depende de tu perfil. El aval estatal del ICO para menores de 35 años y familias con menores a cargo permite financiar hasta el 100 % del menor entre precio y tasación, con un precio máximo de vivienda de 300.000 € en Cataluña, un límite de patrimonio y de ingresos, dos años de residencia legal y formalización hasta el 31 de diciembre de 2027. La Generalitat tiene además su propia línea a través del ICF. Cada entidad aplica sus propios topes sobre el aval: te digo cuáles lo tienen operativo en el momento de tu operación, no el que salió en prensa.',
      },
      {
        question: '¿Cuánto tarda una hipoteca en Barcelona y qué documentos me van a pedir?',
        answer:
          'Entre cuatro y ocho semanas desde que el expediente está completo hasta la firma, según la entidad y la tasación. Para un residente: DNI o NIE, vida laboral, últimas nóminas o dos ejercicios de IRPF si eres autónomo, extractos de seis meses, justificación del ahorro y la documentación del inmueble. Para un no residente, además, documentación de ingresos de tu país traducida y una cuenta en un banco español para domiciliar la cuota. Preparo el expediente para que el banco no tenga que pedir nada dos veces.',
      },
    ],
    workMode: 'Digital al 100%. Visita a Barcelona para firma si la pides (sin coste adicional).',
    sections: [
      {
        title: 'Comprar en Barcelona siendo extranjero: NIE, residencia y porcentaje',
        paragraphs: [
          'Barcelona es la plaza donde más expedientes de compradores extranjeros gestiono. La primera pregunta no es qué banco, sino qué eres para el banco: residente fiscal en España, residente en la UE o no residente. Con NIE y residencia consolidada, el porcentaje de financiación puede llegar al 80 % o más, como el de cualquier español. Sin residencia, la mayoría de entidades se queda entre el 60 % y el 70 % del menor entre precio y tasación, exige justificar los ingresos del país de origen y domiciliar la cuota en una cuenta española.',
          'Lo que decide la operación no es la nacionalidad, sino el expediente: ingresos demostrables, ahorro justificado y una tasación que acompañe al precio. Con un comprador de Lyon, Milán o Ámsterdam preparo la documentación traducida antes de presentarla, elijo las entidades que sí trabajan el perfil y coordino la firma en una notaría de Barcelona.',
        ],
      },
      {
        title: 'Impuestos y gastos de comprar vivienda en Cataluña',
        paragraphs: [
          'En vivienda de segunda mano, Cataluña aplica un Impuesto sobre Transmisiones Patrimoniales del 10 % con carácter general, con tipos reducidos para compradores jóvenes, familias numerosas o monoparentales y personas con discapacidad, siempre con requisitos de renta y de vivienda habitual. En obra nueva se paga el IVA del 10 % y el impuesto de Actos Jurídicos Documentados de la compraventa. Desde la Ley 5/2019, el AJD del préstamo lo paga el banco, no tú.',
          'A eso se suman notaría, registro, gestoría y tasación. En el dossier de cada operación calculo el coste total de la compra y de la hipoteca antes de que firmes las arras, para que el ahorro que necesitas sea el real y no el del anuncio.',
        ],
      },
      {
        title: 'Inversión y alquiler en Barcelona: lo que cambia en 2026',
        paragraphs: [
          'El alquiler turístico en Barcelona está en retirada: el Ayuntamiento ha anunciado la extinción de las licencias de uso turístico en 2028 y Cataluña regula los precios en zonas tensionadas. Eso no cierra la inversión, la reorienta: alquiler de larga duración en barrios con demanda estable, viviendas para reformar en distritos en alza y operaciones de segunda residencia para compradores europeos.',
          'Para una inversión, el banco computará el alquiler previsto con prudencia y financiará normalmente hasta el 70 %. Con una segunda vivienda libre de cargas como garantía adicional se puede ir más lejos. Analizo la rentabilidad neta en tres escenarios, pesimista, realista y optimista, y no financio operaciones que solo salen en el optimista.',
        ],
      },
      {
        title: 'Cómo trabajo con los bancos en Cataluña',
        paragraphs: [
          'No todas las entidades trabajan igual con intermediarios en Cataluña, y las condiciones de una misma entidad cambian según la oficina y el momento. Mi trabajo es saber, en la semana en que presento tu expediente, qué bancos son receptivos a tu perfil en esta plaza, presentarlo a los que sí y negociar el diferencial, el plazo y las vinculaciones. Sin acuerdos ocultos: no cobro de los bancos y mis honorarios te los explico por escrito antes de empezar.',
        ],
      },
    ],
  },
  {
    slug: 'valencia',
    name: 'Valencia',
    region: 'Comunidad Valenciana',
    geo: { lat: 39.4699, lng: -0.3763 },
    angle: 'Mercado en alza con rentabilidad atractiva. Inversores e internacionales en crecimiento.',
    intro:
      'Valencia es la plaza que más ha crecido en interés inversor en los últimos años. Precios todavía razonables comparados con Madrid o Barcelona, fuerte demanda de alquiler (tanto tradicional como vacacional regulado), y una llegada constante de inversores nacionales e internacionales. Te ayudo a entender qué tipo de operación encaja con tu perfil — no todas las "oportunidades" lo son.',
    marketSummary:
      'Mercado en crecimiento sostenido pero todavía asequible. Vivienda media (Patraix, La Saïdia, Camins al Grau) en torno a 1.700-2.200 €/m²; zonas con encanto (Ruzafa, Russafa, Eixample valenciano) en torno a 2.800-3.500 €/m²; y zonas prime (El Pla del Real, Centro histórico, Marítim) en torno a 3.000-4.000 €/m².',
    pricePerSqm: '1.900 €/m² (Centro: 3.000-4.000 €/m²)',
    banksActive: [
      'CaixaBank',
      'Banco Sabadell',
      'BBVA',
      'Cajamar (acuerdos diferenciados en la Comunidad Valenciana)',
      'Banco Santander',
      'Caixa Popular (cooperativa local con perfil específico)',
    ],
    clientProfiles: [
      'Inversores de Madrid o Barcelona buscando rentabilidad en ciudad asequible',
      'Jubilados europeos (especialmente nórdicos y holandeses)',
      'Compradores de primera vivienda nacionales',
      'Inversores en alquiler vacacional regulado',
    ],
    typicalCase: {
      title: 'Caso típico Valencia: inversor diversificando con piso de alquiler',
      body: 'Inversor barcelonés con 2 propiedades en zona alta de Barcelona, busca diversificar geográficamente y bajar el ticket medio. Compra piso de 175.000 € en Ruzafa para alquiler tradicional. Conseguimos hipoteca al 70% LTV (la entidad financia inversores con histórico hipotecario favorable) a tipo mixto. Rentabilidad bruta proyectada: 5,8% anual.',
    },
    faq: [
      {
        question: '¿Es buen momento para comprar en Valencia para invertir?',
        answer:
          'Buena pregunta y respuesta sin azúcar: Valencia ha subido fuerte en los últimos años, así que ya no es la "oportunidad infravalorada" que era hace cinco. Aún así, comparada con Madrid y Barcelona, los ratios de rentabilidad bruta siguen siendo mejores y la demanda de alquiler es sólida. Como siempre, depende del barrio, del estado del inmueble y de tu estrategia (alquiler tradicional, vacacional o revalorización).',
      },
      {
        question: '¿Puedo conseguir hipoteca para vivienda destinada a alquiler vacacional?',
        answer:
          'Sí, pero con tres consideraciones: (1) el banco normalmente lo trata como inversión, no como vivienda habitual, así que el LTV baja y el tipo sube; (2) Valencia tiene restricciones de licencia turística en muchas zonas — antes de comprar, hay que verificar si la finca admite licencia; (3) los rendimientos turísticos no se computan como nómina al banco, así que el LTV se calcula sobre tus ingresos estables. Lo trabajamos completo antes de presentar el expediente.',
      },
      {
        question: '¿Conoces el mercado valenciano lo suficiente para asesorar bien?',
        answer:
          'Conozco bien el mercado financiero valenciano (qué bancos aceptan qué perfiles, condiciones diferenciadas, particularidades). Para el mercado inmobiliario en sí, suelo trabajar con un equipo de profesionales locales de confianza cuando el cliente quiere también análisis de zona y selección de inmueble. La hipoteca la negocio yo; la búsqueda del inmueble, si la quieres, te la coordino.',
      },
    ],
    workMode: 'Digital al 100%. Visita a Valencia para firma si la pides (sin coste adicional).',
    sections: [
      {
        title: 'El aval del IVF: la ventaja de comprar en la Comunitat Valenciana',
        paragraphs: [
          'La Comunitat Valenciana tiene el programa autonómico más generoso de España para la primera vivienda: el aval del Institut Valencià de Finances cubre el 20 % de la entrada y permite llegar al 100 % del precio a compradores de hasta 45 años, sin el límite de ingresos de la línea estatal del ICO. Sirve para obra nueva, segunda mano y vivienda protegida, siempre que sea vivienda habitual y no tengas otra en propiedad.',
          'Dos matices que decido con cada cliente: el aval del IVF y el aval ICO no se pueden combinar, así que hay que elegir el que mejor encaja; y no todas las entidades lo dan en todas las modalidades (alguna solo en hipoteca mixta). Con el tope del ICO en 250.000 € en la Comunitat, para muchas viviendas de Valencia el IVF es simplemente la mejor vía.',
        ],
      },
      {
        title: 'Comprar en Valencia siendo extranjero o no residente',
        paragraphs: [
          'Valencia recibe cada año más compradores europeos, y el banco los trata según lo que son para él: residente con NIE, residente en la UE o no residente. Con residencia consolidada el porcentaje puede llegar al 80 % como el de cualquier español; sin ella, la mayoría se queda entre el 60 y el 70 % del menor entre precio y tasación, con los ingresos del país de origen documentados y traducidos y una cuenta en un banco español.',
          'Preparo el expediente para que no falte nada en la primera presentación, elijo las entidades que sí trabajan el perfil y coordino la firma en una notaría de Valencia.',
        ],
      },
      {
        title: 'Inversión en Valencia: alquiler tradicional, no turístico',
        paragraphs: [
          'La licencia turística en Valencia está restringida en buena parte de la ciudad y el banco, en cualquier caso, financia una inversión sobre el 70 % y computa el alquiler previsto con prudencia. Donde sigue habiendo recorrido es en el alquiler de larga duración en barrios con demanda estable y en viviendas para reformar. Analizo cada operación con tres escenarios de rentabilidad neta, pesimista, realista y optimista, y solo entro en las que salen también en el pesimista.',
        ],
      },
    ],
  },
  {
    slug: 'sevilla',
    name: 'Sevilla',
    region: 'Andalucía',
    geo: { lat: 37.3891, lng: -5.9845 },
    angle: 'Mercado estable con precios razonables. Vivienda habitual y autónomos consolidados.',
    intro:
      'Sevilla tiene un mercado hipotecario menos especulativo que Madrid o Barcelona y precios todavía razonables. La mayoría de operaciones que veo son vivienda habitual de profesionales consolidados, autónomos andaluces con varios ejercicios cerrados, y compradores de primera vivienda. Trabajo con clientes de toda Andalucía Occidental desde la primera videollamada hasta la firma en notaría.',
    marketSummary:
      'Mercado estable con crecimiento sostenido pero sin burbuja. Vivienda media (Macarena, Bellavista, Cerro-Amate) en torno a 1.300-1.700 €/m²; zonas consolidadas (Triana, Nervión, Los Remedios) en torno a 2.000-2.800 €/m²; y zona prime (Centro histórico, Sevilla Este de calidad) en torno a 2.500-3.500 €/m².',
    pricePerSqm: '1.600 €/m² (Centro: 2.500-3.500 €/m²)',
    banksActive: [
      'Unicaja Banco (líder regional andaluz con condiciones diferenciadas)',
      'CaixaBank',
      'Cajasur (especialmente competitivo con perfiles del sur)',
      'Banco Santander',
      'BBVA',
      'Banco Sabadell',
    ],
    clientProfiles: [
      'Primera vivienda — profesionales liberales y autónomos consolidados',
      'Familias jóvenes con nómina pública o privada estable',
      'Autónomos con 2-3 años de IRPF positivo',
      'Inversores andaluces de bajo volumen (1-2 propiedades)',
    ],
    typicalCase: {
      title: 'Caso típico Sevilla: autónoma con 3 años de IRPF',
      body: 'Abogada autónoma de 35 años, 3 ejercicios cerrados con ingresos crecientes. Buscaba piso de 170.000 € en Nervión para vivienda habitual. Tres bancos en oficina la rechazaron al primer scoring (autónomos con menos de 5 años suelen tener problemas en los scoring automáticos). Presentamos dossier ejecutivo a Unicaja (banco regional que conoce el perfil andaluz) y CaixaBank: aprobada al 80% LTV, tipo fijo competitivo, sin avalistas.',
    },
    faq: [
      {
        question: '¿Trabajas con Unicaja, que es el banco regional andaluz?',
        answer:
          'Sí. Unicaja es un banco con fuerte arraigo en Andalucía y entiende bien perfiles regionales (autónomos del sector servicios, agricultura, profesiones liberales sevillanas). Para clientes andaluces suele ser uno de los primeros bancos a los que presento el dossier, junto a CaixaBank y los nacionales.',
      },
      {
        question: '¿Atiendes operaciones en toda Andalucía o solo Sevilla?',
        answer:
          'Toda Andalucía. Tengo clientes en Sevilla, Málaga, Granada, Cádiz, Córdoba, Huelva. El servicio es 100% digital hasta la firma, así que la ciudad no es un obstáculo. Si necesitas firma presencial en notaría, viajo a cualquier punto andaluz sin coste adicional.',
      },
      {
        question: '¿Es ahora buen momento para comprar primera vivienda en Sevilla?',
        answer:
          'Para vivienda habitual con horizonte largo (10+ años), el "momento" pesa menos de lo que dice la prensa. Lo importante es: que la cuota encaje cómodamente en tus ingresos (regla del 30%), que la hipoteca esté bien negociada (no aceptes la primera oferta de tu banco), y que el inmueble esté tasado conservadoramente. Sevilla, comparada con Madrid o Barcelona, sigue ofreciendo precios cómodos para perfiles medios.',
      },
    ],
    workMode: 'Digital al 100%. Visita a Sevilla o cualquier ciudad andaluza para firma si la pides.',
    sections: [
      {
        title: 'Primera vivienda en Andalucía: el aval de la Junta y el tope del ICO',
        paragraphs: [
          'Andalucía tiene el precio máximo más bajo del aval ICO después de Extremadura: 225.000 €. Para muchas viviendas de Sevilla capital eso deja fuera la línea estatal, y ahí entra la garantía de la Junta de Andalucía para menores de 40 años empadronados en la comunidad, sin otra vivienda y con compromiso de vivienda habitual, con un precio máximo en torno a 295.000 €. En la mayoría de entidades permite llegar al 95 % del menor entre precio y tasación, y en alguna al 100 %.',
          'Los dos avales no se combinan. Y una advertencia que repito en Sevilla más que en ningún sitio: varios productos que se anuncian como «100 %» son en realidad un 95 %. El 5 % restante y los gastos son del comprador. Se pide por escrito antes de las arras.',
        ],
      },
      {
        title: 'Autónomos y profesionales andaluces: cómo se presenta el expediente',
        paragraphs: [
          'Es el perfil que más trabajo en Sevilla y el que más rechaza el scoring automático de las oficinas: el banco computa el rendimiento neto de las dos últimas rentas, no la facturación, y a menudo pide tres ejercicios. Un expediente de autónomo se presenta con los modelos 100, 130 y 303, los extractos ordenados y una explicación de la evolución del negocio, a las entidades que tienen criterio real con este perfil. Así es como una operación rechazada tres veces en oficina acaba aprobada.',
        ],
      },
      {
        title: 'Impuestos y gastos de comprar vivienda en Andalucía',
        paragraphs: [
          'Andalucía aplica un Impuesto sobre Transmisiones Patrimoniales del 7 % en vivienda de segunda mano, con tipos reducidos para menores de 35 años, familias numerosas y personas con discapacidad en vivienda habitual, con límites de precio; en obra nueva, IVA del 10 % más Actos Jurídicos Documentados. En el dossier calculo el coste total de compra e hipoteca antes de las arras.',
        ],
      },
    ],
  },
]

export function getCityBySlug(slug: string): CityData | undefined {
  return CITIES.find((c) => c.slug === slug)
}
