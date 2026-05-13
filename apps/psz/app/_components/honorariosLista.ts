/**
 * Lista exhaustiva del trabajo que hace Toño Palacios como broker
 * hipotecario para justificar sus honorarios. Pensada para mostrarse
 * en el modal "¿Por qué estos honorarios?".
 *
 * Estructura: 13 grupos secuenciales (proceso real end-to-end +
 * plus diferenciales: inversión, arras, fiscal, estructura).
 *
 * Todo lo que aparece aquí es trabajo real que el broker ejecuta
 * o supervisa. Nada de relleno. Si lees esta lista entiendes el
 * precio.
 */

export interface ServiceGroup {
  title: string
  subtitle?: string
  items: string[]
}

export const HONORARIOS_GRUPOS: ServiceGroup[] = [
  {
    title: '1 — Diagnóstico financiero inicial',
    subtitle: 'Antes de presentarte ante ningún banco.',
    items: [
      'Entrevista en profundidad sin compromiso para comprender la operación, el contexto familiar y el objetivo patrimonial.',
      'Análisis del perfil financiero completo: nóminas, IRPF, vida laboral, declaración de actividades, deudas previas y CIRBE.',
      'Estudio de scoring bancario simulado entidad por entidad — saber qué bancos te aceptarán y cuáles te rechazarán antes de presentarte.',
      'Cálculo de capacidad de endeudamiento real (LTV, LTI, ratio de esfuerzo financiero, deuda viva acumulada).',
      'Diagnóstico de viabilidad económica, jurídica y temporal de la operación.',
      'Detección temprana de banderas rojas que podrían tumbar la operación más adelante.',
      'Recomendación honesta de no operar si el caso no es viable — y devolución íntegra de la reserva si esa decisión es nuestra.',
    ],
  },
  {
    title: '2 — Análisis técnico del inmueble',
    subtitle: 'No solo del comprador: también del activo que se va a financiar.',
    items: [
      'Análisis registral del inmueble: nota simple actualizada, escritura, situación urbanística.',
      'Detección de cargas, embargos, IBI pendiente, derramas y deudas de comunidad.',
      'Análisis comparativo del precio frente al valor real de mercado en la zona.',
      'Predicción del rango de tasación oficial antes de pagarla — para no llevarte sorpresas.',
      'Revisión de la documentación urbanística: licencia de primera ocupación, cédula de habitabilidad, ITE.',
      'Análisis específico si el inmueble es VPO, suelo rústico, edificio protegido o cualquier casuística especial.',
    ],
  },
  {
    title: '3 — Construcción del expediente bancario',
    subtitle: 'Lo que ve el banco lo decide tu broker, no tú.',
    items: [
      'Preparación profesional del dossier financiero: presentación visual + narrativa coherente.',
      'Argumentario específico por entidad — cada banco valora distintos puntos, y eso lo conoce el broker.',
      'Recopilación de documentación con checklist exhaustivo y seguimiento hasta tenerlo todo.',
      'Verificación de coherencia entre documentos antes de presentarlos (errores tipográficos, fechas, importes).',
      'Storytelling financiero para perfiles atípicos: autónomos, comerciales con variable, freelance, expatriados, divorciados con pensión, jubilados, no residentes.',
      'Anonimización y organización limpia del expediente conforme a normativa de protección de datos.',
    ],
  },
  {
    title: '4 — Negociación con más de 20 entidades en paralelo',
    subtitle: 'Aquí está el grueso del valor. Donde el cliente de a pie solo habla con uno o dos bancos, yo negocio con todos a la vez.',
    items: [
      'Presentación simultánea de tu operación a las entidades adecuadas a tu perfil (no en exclusiva con una).',
      'Negociación del diferencial sobre el euríbor en hipotecas variables.',
      'Negociación del tipo (fijo, variable o mixto) según el momento del mercado y tu horizonte.',
      'Negociación de comisiones: apertura, mantenimiento, amortización anticipada total y parcial, subrogación, novación.',
      'Eliminación de vinculaciones innecesarias: seguros de vida, hogar, planes de pensiones, tarjetas, domiciliaciones, cuentas remuneradas.',
      'Negociación de cláusulas de cancelación anticipada y de bonificación por vinculaciones útiles.',
      'Comparativa objetiva entre ofertas: TAE real comparable (no la TAE de portada que esconde costes).',
      'Detección de cláusulas potencialmente abusivas en las ofertas antes de aceptarlas.',
      'Gestión de varias rondas de contraofertas hasta cerrar la mejor condición posible.',
    ],
  },
  {
    title: '5 — Tasación oficial y FEIN',
    subtitle: 'El tramo legal donde se cierra la oferta vinculante.',
    items: [
      'Coordinación con sociedad tasadora homologada por el Banco de España.',
      'Acompañamiento técnico durante la visita del tasador al inmueble — lo que se enseña importa.',
      'Revisión del informe de tasación recibido. Si está mal valorado, se puede impugnar.',
      'Análisis técnico de la FEIN (Ficha Europea de Información Normalizada) entregada por el banco.',
      'Uso correcto del periodo legal de reflexión de 10 días naturales (art. 14 Ley 5/2019).',
      'Si hay varias FEINs sobre la mesa: comparación detallada para elegir la mejor.',
    ],
  },
  {
    title: '6 — Notaría y firma',
    subtitle: 'Lo más importante del proceso. No vas solo.',
    items: [
      'Acompañamiento al acta notarial previa, comparecencia obligatoria y gratuita conforme al art. 15 de la Ley 5/2019.',
      'Revisión final de la escritura antes de la firma definitiva.',
      'Detección de discrepancias entre la FEIN y la escritura — pasa más de lo que parece.',
      'Acompañamiento físico a notaría si lo pides, incluido en honorarios y con gastos de desplazamiento absorbidos.',
      'Soporte de comunicación con la notaría durante la firma para resolver cualquier duda al instante.',
    ],
  },
  {
    title: '7 — Post-firma y seguimiento',
    subtitle: 'El servicio no termina cuando firmas. Termina cuando estás tranquilo.',
    items: [
      'Verificación de la correcta inscripción en el Registro de la Propiedad.',
      'Recordatorio de plazos: liquidación de AJD, comunicaciones a Hacienda, primer recibo de IBI, comunicación de cambio de domicilio.',
      'Disponibilidad continuada para dudas posteriores: subidas de tipo, revisión de cuota, refinanciaciones futuras, ampliaciones.',
    ],
  },
  {
    title: 'Plus — Conocimiento de inversión inmobiliaria',
    subtitle: 'No es lo mismo financiar tu primera vivienda que financiar una operación de inversión. Yo me ocupo de ambas, pero la segunda exige otra mirada.',
    items: [
      'Análisis de rentabilidad bruta y neta de la operación si es inversión.',
      'Cálculo de ROI, TIR, cash-on-cash y payback financiero.',
      'Recomendación de estructura jurídica óptima para la compra: persona física, SL operativa, SLU patrimonial o vehículo internacional.',
      'Análisis de la palanca financiera real frente al capital propio que pones.',
      'Acceso, cuando procede, a operaciones off-market a través de mi red propia de inversores y a la actividad Personal Shopper Inmobiliario.',
    ],
  },
  {
    title: 'Plus — Revisión de contratos previos (arras y precontrato)',
    subtitle: 'Donde el comprador más se quema. Antes de firmar arras, hay que verlas.',
    items: [
      'Revisión profesional del contrato de arras antes de firmarlo.',
      'Diferenciación correcta del tipo de arras: penitenciales, confirmatorias o penales. Cada una tiene consecuencias jurídicas distintas.',
      'Detección de cláusulas abusivas o desfavorables al comprador en el contrato.',
      'Negociación de plazos realistas para la concesión hipotecaria — no aceptar 30 días si lo razonable son 60.',
      'Inclusión de cláusula de condicionamiento de la operación a la concesión efectiva de la financiación.',
      'Acompañamiento legal si surge litigio por arras a través de la red de abogados de confianza.',
    ],
  },
  {
    title: 'Plus — Fiscalidad aplicada a la operación',
    subtitle: 'La cuenta no termina en el precio del piso ni en la cuota mensual. Termina cuando entiendes el impacto fiscal completo.',
    items: [
      'Análisis del impuesto aplicable (IVA frente a ITP) según tipo de inmueble y perfil del comprador.',
      'Cálculo del AJD (Actos Jurídicos Documentados) y demás impuestos del cierre.',
      'Optimización fiscal cuando hay margen: deducción por adquisición de vivienda habitual donde proceda, gestión de la plusvalía municipal.',
      'Si es inversor: análisis del tratamiento fiscal de las rentas inmobiliarias en IRPF, deducción de gastos y amortización.',
      'Análisis comparativo de tributación según vehículo (persona física vs sociedad patrimonial).',
      'Coordinación con el asesor fiscal del cliente para alinear estrategia inmobiliaria y estrategia tributaria.',
    ],
  },
  {
    title: 'Plus — Estructura societaria (cuando aplica)',
    subtitle: 'Para inversores con cartera ya consolidada o con horizonte de larga duración.',
    items: [
      'Diseño de holding patrimonial nacional cuando la operativa lo justifica.',
      'Asesoramiento sobre la estructura societaria óptima según volumen, horizonte temporal y planificación sucesoria.',
      'Coordinación con notaría y asesor fiscal para la constitución del vehículo elegido.',
    ],
  },
  {
    title: 'Plus — Seguros vinculados a la hipoteca',
    subtitle: 'El banco te empujará a contratar seguros con ellos. No todos te convienen.',
    items: [
      'Análisis del seguro de hogar exigido por el banco — lo justo legalmente, no más.',
      'Análisis del seguro de vida vinculado: cuándo es necesario y cuándo es negociable.',
      'Comparativa objetiva de los seguros propuestos por el banco frente al mercado abierto.',
      'Negociación para excluir las vinculaciones innecesarias o sobre-precio.',
    ],
  },
  {
    title: 'Garantías institucionales y reguladoras',
    subtitle: 'Lo que diferencia a un broker regulado de cualquier intermediario.',
    items: [
      'Inscripción pública en el Banco de España con el número E242, verificable por cualquier ciudadano en el registro oficial.',
      'Pertenencia y presidencia de ANICI (Asociación Nacional de Intermediarios en Crédito Inmobiliario), con código deontológico vinculante y verificador propio.',
      'Seguro de responsabilidad civil profesional vigente conforme a la Ley 5/2019.',
      'Formación continua acreditada según el RD 309/2019.',
      'Procedimiento de reclamaciones documentado y mediación previa antes de cualquier acción judicial (Ley 5/2012).',
      'Tarifas y honorarios publicados con carácter previo y firmados por escrito antes de iniciar el trabajo (Orden EHA/2899/2011).',
    ],
  },
]
