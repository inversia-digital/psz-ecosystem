/**
 * Glosario hipotecario v1 — 25 términos operativos del sector.
 *
 * Convenciones:
 *  - slug: anchor estable (no cambia entre versiones, importante para
 *    links externos). En lowercase con guiones, sin acentos.
 *  - name: cómo se busca y se cita el término.
 *  - description: <100 palabras autocontenidas, operativas. Pensadas
 *    para que un AI Overview pueda citarlas literal.
 *  - relatedSlugs: anchors a otros términos del glosario para
 *    cross-link en el render.
 *  - relatedPages: rutas dentro de psz.es donde el término se trata
 *    en profundidad (calculadora, pillar, blog).
 *  - externalRef: URL autoritativa externa (BOE, BdE) cuando la hay.
 *  - categoria: agrupador temático para la barra de filtros.
 */

export type GlosarioCategoria =
  | 'financiero'
  | 'documental'
  | 'fiscal'
  | 'operativo'
  | 'regulatorio'

export interface GlosarioTerm {
  slug: string
  name: string
  description: string
  categoria: GlosarioCategoria
  relatedSlugs?: string[]
  relatedPages?: Array<{ label: string; href: string }>
  externalRef?: { label: string; url: string }
}

export const GLOSARIO_CATEGORIAS: Record<GlosarioCategoria, { label: string; color: string }> = {
  financiero: { label: 'Conceptos financieros', color: 'bg-sky-100 text-sky-900 border-sky-200' },
  documental: { label: 'Documentos', color: 'bg-amber-100 text-amber-900 border-amber-200' },
  fiscal: { label: 'Impuestos y fiscalidad', color: 'bg-purple-100 text-purple-900 border-purple-200' },
  operativo: { label: 'Operativa hipoteca', color: 'bg-emerald-100 text-emerald-900 border-emerald-200' },
  regulatorio: { label: 'Regulación', color: 'bg-rose-100 text-rose-900 border-rose-200' },
}

export const GLOSARIO_TERMS: GlosarioTerm[] = [
  {
    slug: 'ajd',
    name: 'AJD (Actos Jurídicos Documentados)',
    description:
      'Impuesto autonómico que grava la escritura notarial de compraventa y de hipoteca. Tipo variable por comunidad autónoma (0,5%-1,5%). Desde el Real Decreto-Ley 17/2018, el AJD correspondiente a la escritura de hipoteca lo paga el banco, no el cliente; el AJD de la compraventa sigue siendo a cargo del comprador.',
    categoria: 'fiscal',
    relatedSlugs: ['itp', 'gastos-cierre'],
  },
  {
    slug: 'amortizacion-anticipada',
    name: 'Amortización anticipada',
    description:
      'Pago de capital pendiente de la hipoteca antes del vencimiento contractual. Puede ser total o parcial. Por Ley 5/2019, las comisiones están limitadas: máximo 2% en variable los primeros 3 años (1,5% del 4º al 5º), o 2% en fija durante los primeros 10 años (1,5% después). Reduce intereses futuros y/o plazo restante.',
    categoria: 'operativo',
    relatedSlugs: ['tin', 'tae', 'novacion'],
    relatedPages: [{ label: 'Calculadora de hipoteca', href: '/calculadora-hipoteca' }],
  },
  {
    slug: 'amortizacion-francesa',
    name: 'Amortización francesa',
    description:
      'Sistema de amortización estándar en hipotecas residenciales españolas. Cuotas mensuales iguales durante toda la vida del préstamo (asumiendo TIN fijo), con mayor peso de intereses en los primeros años y mayor peso de amortización del capital al final. Es la fórmula que usan todos los simuladores y la que se aplica por defecto salvo pacto distinto.',
    categoria: 'financiero',
    relatedSlugs: ['tin', 'cuota-hipoteca'],
    relatedPages: [{ label: 'Calculadora de hipoteca', href: '/calculadora-hipoteca' }],
  },
  {
    slug: 'aval',
    name: 'Aval (avalista personal)',
    description:
      'Garantía personal añadida a la hipoteca: una tercera persona se compromete a responder con su patrimonio si el deudor principal no paga. Habitual cuando el LTV pasa del 80% o el ratio de esfuerzo es alto. El avalista responde con todo su patrimonio presente y futuro, no solo con la vivienda hipotecada — es un compromiso serio.',
    categoria: 'operativo',
    relatedSlugs: ['ltv', 'ratio-esfuerzo', 'aval-ico'],
  },
  {
    slug: 'aval-ico',
    name: 'Aval estatal del ICO (hipoteca joven)',
    description:
      'Programa público de aval para vivienda habitual de jóvenes menores de 35 años o familias con menores a cargo. Avala hasta el 20% del valor de la vivienda, permitiendo llegar al 95-100% LTV con respaldo del Estado. Requiere ingresos brutos hasta 37.800 €/año individuales o 50.400 €/año conjuntos. Vigente hasta 31 de diciembre de 2027.',
    categoria: 'operativo',
    relatedSlugs: ['ltv', 'aval'],
    relatedPages: [{ label: 'Hipoteca primera vivienda', href: '/hipoteca-primera-vivienda' }],
  },
  {
    slug: 'cirbe',
    name: 'CIRBE (Central de Información de Riesgos del Banco de España)',
    description:
      'Base de datos pública del Banco de España donde figuran las deudas y avales de cada persona física o jurídica con cualquier entidad financiera española. Cuando solicitas hipoteca, el banco consulta tu CIRBE para ver tus deudas actuales. Tienes derecho a solicitar tu informe CIRBE gratis directamente al Banco de España.',
    categoria: 'documental',
    relatedSlugs: ['scoring', 'ratio-esfuerzo'],
    externalRef: { label: 'Consulta CIRBE — Banco de España', url: 'https://app.bde.es/' },
  },
  {
    slug: 'cuota-hipoteca',
    name: 'Cuota mensual',
    description:
      'Pago periódico (habitualmente mensual) que combina amortización de capital e intereses sobre el capital pendiente. En amortización francesa la cuota es constante mientras el TIN no varíe. La cuota mensual depende del capital prestado, el TIN, el plazo y la modalidad (fija, variable, mixta). El banco limita su importe al ratio de esfuerzo aceptable.',
    categoria: 'financiero',
    relatedSlugs: ['amortizacion-francesa', 'tin', 'ratio-esfuerzo'],
    relatedPages: [{ label: 'Calculadora de hipoteca', href: '/calculadora-hipoteca' }],
  },
  {
    slug: 'dacion-pago',
    name: 'Dación en pago',
    description:
      'Acuerdo por el cual el deudor entrega el inmueble hipotecado al banco para saldar la deuda hipotecaria, total o parcialmente. No es un derecho automático del cliente: el banco puede aceptarla o rechazarla. Más frecuente en perfiles con dificultades graves de pago o procesos de ejecución avanzados. Tiene implicaciones fiscales (IRPF, plusvalía municipal) que conviene revisar caso por caso.',
    categoria: 'operativo',
    relatedSlugs: ['hipoteca'],
  },
  {
    slug: 'euribor',
    name: 'Euríbor',
    description:
      'Euro Interbank Offered Rate. Tipo de interés diario al que los bancos europeos se prestan dinero entre sí. Las hipotecas a tipo variable en España se referencian habitualmente al Euríbor 12 meses más un diferencial pactado. La revisión de la cuota es semestral o anual según contrato. Cuando sube el Euríbor, sube la cuota; cuando baja, baja.',
    categoria: 'financiero',
    relatedSlugs: ['tin', 'tipo-fija', 'tipo-variable', 'tipo-mixta'],
  },
  {
    slug: 'fein',
    name: 'FEIN (Ficha Europea de Información Normalizada)',
    description:
      'Documento oficial regulado por la Ley 5/2019 art. 14 que el banco debe entregar al cliente al menos 10 días naturales antes de la firma en notaría. Resume todas las condiciones de la oferta hipotecaria (TIN, TAE, plazo, vinculaciones, comisiones) y vincula al banco durante esos 10 días. Es el único documento vinculante en una hipoteca antes de firmar.',
    categoria: 'documental',
    relatedSlugs: ['acta-notarial', 'ley-5-2019', 'tae', 'tin'],
    externalRef: {
      label: 'Ley 5/2019 art. 14',
      url: 'https://www.boe.es/buscar/act.php?id=BOE-A-2019-3814',
    },
  },
  {
    slug: 'fiae',
    name: 'FIAE (Ficha de Advertencias Estandarizadas)',
    description:
      'Documento complementario a la FEIN previsto por la Ley 5/2019. Detalla advertencias específicas sobre cláusulas potencialmente sensibles (suelo, vencimiento anticipado, intereses moratorios, vinculaciones, divisas distintas al euro). El banco entrega FIAE junto con la FEIN. Tiene la misma fuerza vinculante que la FEIN durante el periodo de reflexión de 10 días.',
    categoria: 'documental',
    relatedSlugs: ['fein', 'ley-5-2019'],
  },
  {
    slug: 'gastos-cierre',
    name: 'Gastos de cierre (compraventa con hipoteca)',
    description:
      'Conjunto de pagos asociados a la operación de compraventa más constitución de hipoteca: ITP (o IVA+AJD en obra nueva), notaría, registro, gestoría, tasación. Para una primera vivienda en España suelen sumar entre el 8% y el 12% del precio según comunidad autónoma. Hay que tenerlos presupuestados aparte del aporte para entrada — sin ellos, la operación cae.',
    categoria: 'operativo',
    relatedSlugs: ['itp', 'ajd', 'tasacion'],
    relatedPages: [{ label: 'Hipoteca primera vivienda', href: '/hipoteca-primera-vivienda' }],
  },
  {
    slug: 'acta-notarial',
    name: 'Acta notarial previa',
    description:
      'Comparecencia gratuita ante notario antes de firmar la hipoteca, obligatoria por la Ley 5/2019. El notario verifica que el cliente ha entendido las condiciones y que el banco ha entregado toda la documentación legalmente exigida (FEIN, FIAE, oferta vinculante). Sin acta previa no puede firmarse la hipoteca. La citación llega del banco directamente.',
    categoria: 'documental',
    relatedSlugs: ['fein', 'fiae', 'ley-5-2019'],
  },
  {
    slug: 'hipoteca',
    name: 'Hipoteca (préstamo hipotecario)',
    description:
      'Préstamo de un banco a un cliente, con un inmueble como garantía. Si el cliente no paga, el banco puede ejecutar la hipoteca y subastar el inmueble para recuperar la deuda. En España regulada por la Ley 5/2019 (parte del consumidor) y por la Ley Hipotecaria (parte registral). El banco está obligado a entregar FEIN y respetar el periodo de reflexión de 10 días antes de la firma.',
    categoria: 'financiero',
    relatedSlugs: ['ltv', 'tin', 'tae', 'fein', 'ley-5-2019'],
    relatedPages: [{ label: 'Servicio de broker hipotecario', href: '/broker-hipotecario' }],
  },
  {
    slug: 'iva-compraventa',
    name: 'IVA (compraventa de vivienda nueva)',
    description:
      'Impuesto que se aplica a la compraventa de vivienda de obra nueva (primera transmisión). Tipo general del 10% sobre el precio en vivienda nueva, 4% en vivienda VPO. La vivienda usada NO tributa por IVA, sino por ITP. La compraventa con IVA requiere además pagar AJD por la escritura.',
    categoria: 'fiscal',
    relatedSlugs: ['itp', 'ajd'],
  },
  {
    slug: 'intermediario-credito-inmobiliario',
    name: 'Intermediario de Crédito Inmobiliario (ICI)',
    description:
      'Figura regulada por la Ley 5/2019: profesional o sociedad que ofrece servicios de intermediación con prestamistas inmobiliarios en nombre del cliente. Conocido coloquialmente como "broker hipotecario". Debe estar inscrito en el Registro del Banco de España, tener formación específica, seguro de responsabilidad civil y aplicar código de conducta. Trabaja para el cliente, no para el banco.',
    categoria: 'regulatorio',
    relatedSlugs: ['ley-5-2019', 'hipoteca'],
    relatedPages: [
      { label: 'Servicio de broker hipotecario', href: '/broker-hipotecario' },
      { label: 'Cómo funciona la Ley 5/2019', href: '/como-funciona-ley-5-2019' },
    ],
  },
  {
    slug: 'itp',
    name: 'ITP (Impuesto de Transmisiones Patrimoniales)',
    description:
      'Impuesto autonómico que grava la compra de vivienda usada (segunda mano y posteriores transmisiones). Tipo variable por comunidad autónoma: del 4% en País Vasco al 13% en tramos altos de Cataluña. Madrid 6%, Andalucía 7%, Canarias 6,5%, C. Valenciana 10% hasta junio 2026 y 9% desde el 1 de junio de 2026, Cataluña progresivo 10-13%. En vivienda nueva no se paga ITP sino IVA + AJD.',
    categoria: 'fiscal',
    relatedSlugs: ['ajd', 'iva-compraventa', 'gastos-cierre'],
    relatedPages: [
      {
        label: 'Calculadora de rentabilidad inmobiliaria',
        href: '/calculadora-rentabilidad-inmobiliaria',
      },
    ],
  },
  {
    slug: 'ley-5-2019',
    name: 'Ley 5/2019 de Contratos de Crédito Inmobiliario',
    description:
      'Ley española de 15 de marzo de 2019 que regula la actividad de prestamistas e intermediarios de crédito inmobiliario, transpone la directiva europea 2014/17/UE y establece derechos del consumidor: entrega obligatoria de FEIN, periodo de reflexión de 10 días, acta notarial previa, comisiones de amortización limitadas, transparencia de vinculaciones, supervisión del Banco de España.',
    categoria: 'regulatorio',
    relatedSlugs: ['fein', 'acta-notarial', 'intermediario-credito-inmobiliario'],
    relatedPages: [
      { label: 'Cómo funciona la Ley 5/2019', href: '/como-funciona-ley-5-2019' },
    ],
    externalRef: {
      label: 'BOE — Ley 5/2019',
      url: 'https://www.boe.es/buscar/act.php?id=BOE-A-2019-3814',
    },
  },
  {
    slug: 'ltv',
    name: 'LTV (Loan-to-Value)',
    description:
      'Porcentaje del valor del inmueble que financia el banco. En España la banca minorista típica concede hasta 80% LTV en primera vivienda habitual y 60-70% LTV en inversión o segunda residencia. Por encima del 80% requiere garantía adicional (aval familiar, aval ICO) o entra en categoría de mayor riesgo con sobreprecio en el TIN.',
    categoria: 'financiero',
    relatedSlugs: ['hipoteca', 'aval', 'aval-ico', 'tasacion'],
    relatedPages: [
      { label: 'Calculadora de hipoteca', href: '/calculadora-hipoteca' },
      {
        label: 'Calculadora de capacidad de endeudamiento',
        href: '/calculadora-capacidad-endeudamiento',
      },
    ],
  },
  {
    slug: 'novacion',
    name: 'Novación hipotecaria',
    description:
      'Modificación de las condiciones de la hipoteca con el mismo banco: cambio de TIN, ampliación o reducción de plazo, cambio de fija a variable o viceversa, cambio de titularidad, etc. El cliente paga una comisión por novación según contrato (típicamente 0-1% sobre capital pendiente). No implica cambio de banco — para eso se usa la subrogación.',
    categoria: 'operativo',
    relatedSlugs: ['subrogacion', 'tin', 'hipoteca'],
  },
  {
    slug: 'ratio-esfuerzo',
    name: 'Ratio de esfuerzo',
    description:
      'Porcentaje de los ingresos netos mensuales del cliente destinado al pago de la cuota hipotecaria y otras deudas mensuales (préstamos personales, financieras, leasing). La banca española típica acepta hasta 35-40% como máximo. Por encima del 40% la operación suele rechazarse en scoring automático. Es uno de los tres filtros principales del scoring bancario, junto con LTV y plazo por edad.',
    categoria: 'financiero',
    relatedSlugs: ['scoring', 'cuota-hipoteca', 'ltv'],
    relatedPages: [
      {
        label: 'Calculadora de capacidad de endeudamiento',
        href: '/calculadora-capacidad-endeudamiento',
      },
    ],
  },
  {
    slug: 'scoring',
    name: 'Scoring bancario',
    description:
      'Algoritmo interno que cada banco usa para decidir si aprueba una operación de financiación. Evalúa ratio de esfuerzo, antigüedad laboral, otras deudas (CIRBE), aporte propio, estabilidad del perfil, vinculaciones y, en algunos bancos, datos no financieros (zona, edad, sector profesional). Cada banco pondera distinto, pero los umbrales operativos son consistentes en la banca minorista española.',
    categoria: 'operativo',
    relatedSlugs: ['ratio-esfuerzo', 'cirbe', 'ltv'],
  },
  {
    slug: 'subrogacion',
    name: 'Subrogación de acreedor',
    description:
      'Cambio del banco titular de la hipoteca, manteniendo el cliente las mismas condiciones del préstamo (capital pendiente, plazo, garantía) con un banco distinto que ofrece mejores condiciones. Útil cuando otro banco ofrece mejor TIN o menos vinculaciones. Coste limitado por ley a 0,5% del capital pendiente como máximo. Procedimiento regulado por la Ley 2/1994.',
    categoria: 'operativo',
    relatedSlugs: ['novacion', 'tin', 'hipoteca'],
  },
  {
    slug: 'tae',
    name: 'TAE (Tasa Anual Equivalente)',
    description:
      'Tipo efectivo anual que incluye TIN + comisiones (apertura, estudio, mantenimiento de cuenta) + coste de productos vinculados obligatorios. Es la métrica oficial de comparación entre ofertas hipotecarias exigida por el Banco de España y aparece destacada en la FEIN. Comparar ofertas solo por TIN es engañoso: un banco con TIN bajo pero vinculaciones caras puede tener TAE peor.',
    categoria: 'financiero',
    relatedSlugs: ['tin', 'fein', 'vinculaciones'],
  },
  {
    slug: 'tasacion',
    name: 'Tasación hipotecaria',
    description:
      'Valoración pericial del inmueble realizada por una sociedad de tasación homologada por el Banco de España (Real Decreto 775/1997). El cliente paga la tasación, normalmente entre 250 € y 600 € según inmueble. El banco usa el menor valor entre tasación y precio de compraventa como base para calcular el LTV. La tasación es válida durante 6 meses.',
    categoria: 'operativo',
    relatedSlugs: ['ltv', 'gastos-cierre'],
  },
  {
    slug: 'tin',
    name: 'TIN (Tipo de Interés Nominal)',
    description:
      'Tipo de interés del préstamo sin comisiones ni gastos. Es el porcentaje que se publicita en los productos comerciales y aparece en la FEIN. En hipoteca fija el TIN es constante toda la vida del préstamo; en variable es Euríbor + diferencial; en mixta es fijo durante unos años y luego variable. No es comparable entre ofertas por sí solo — hay que mirar también la TAE.',
    categoria: 'financiero',
    relatedSlugs: ['tae', 'euribor', 'tipo-fija', 'tipo-variable', 'tipo-mixta'],
  },
  {
    slug: 'tipo-fija',
    name: 'Hipoteca a tipo fijo',
    description:
      'Modalidad de hipoteca en la que el TIN es constante durante toda la vida del préstamo, independientemente de cómo evolucione el Euríbor. La cuota mensual es la misma del primer al último mes (salvo que se nove o subrogue). TIN inicial superior a la variable, a cambio de previsibilidad total. Plazo máximo habitual: 25-30 años en banca minorista.',
    categoria: 'financiero',
    relatedSlugs: ['tipo-variable', 'tipo-mixta', 'tin', 'euribor'],
  },
  {
    slug: 'tipo-variable',
    name: 'Hipoteca a tipo variable',
    description:
      'Modalidad de hipoteca en la que el TIN se calcula como Euríbor (habitualmente Euríbor 12 meses) más un diferencial pactado. La cuota se revisa cada 6 o 12 meses según contrato. Cuando el Euríbor sube, sube la cuota; cuando baja, baja. TIN inicial más bajo que fija, a cambio de exposición al riesgo del mercado interbancario.',
    categoria: 'financiero',
    relatedSlugs: ['tipo-fija', 'tipo-mixta', 'euribor', 'tin'],
  },
  {
    slug: 'tipo-mixta',
    name: 'Hipoteca a tipo mixto',
    description:
      'Modalidad que combina las dos anteriores: TIN fijo durante los primeros años (típicamente 3, 5, 7 o 10) y luego variable referenciado a Euríbor + diferencial. Permite tener cuota previsible mientras consolidas tu situación financiera, y pasar a variable después. Es el formato más equilibrado para primerizos con horizonte intermedio.',
    categoria: 'financiero',
    relatedSlugs: ['tipo-fija', 'tipo-variable', 'tin', 'euribor'],
  },
  {
    slug: 'vinculaciones',
    name: 'Vinculaciones (productos vinculados)',
    description:
      'Productos asociados que el banco exige u ofrece para bonificar el TIN: seguro de hogar y vida con el banco, plan de pensiones, domiciliación de nómina, tarjeta de crédito, alarma, etc. Por Ley 5/2019, el banco debe ofrecer también la hipoteca SIN vinculaciones y reflejar el coste diferencial en la FEIN. Cada vinculación suele bonificar el TIN entre 0,1 y 0,3 puntos porcentuales.',
    categoria: 'operativo',
    relatedSlugs: ['tin', 'tae', 'fein'],
  },
]
