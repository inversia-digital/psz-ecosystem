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
    ],
    workMode: 'Digital al 100%. Visita a Barcelona para firma si la pides (sin coste adicional).',
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
  },
]

export function getCityBySlug(slug: string): CityData | undefined {
  return CITIES.find((c) => c.slug === slug)
}
