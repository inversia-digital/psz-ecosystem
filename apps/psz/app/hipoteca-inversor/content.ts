import type { FaqEntry } from '@psz/ui'

/**
 * Contenido del pillar `/hipoteca-inversor`.
 *
 * Pillar de hipoteca para inversor en España. Audiencia distinta al
 * primerizo: el inversor ya tiene historial hipotecario, suele tener
 * 2-N propiedades, mira métricas de rentabilidad y se enfrenta a
 * condiciones de banca distintas (LTV menor, TIN más alto, plazos
 * más cortos, vinculaciones más duras).
 *
 * Mantenimiento: revisar el bono español 10y y la mediana TIN de
 * inversión cada 3-4 meses.
 */

export const PILLAR_HIPOTECA_INVERSOR = {
  hero: {
    eyebrow: 'Guía pillar · Inversor inmobiliario',
    h1: 'Hipoteca para inversión inmobiliaria en España',
    sub:
      'Cómo conseguir financiación cuando ya tienes patrimonio: LTV reales para inversión (60-70%, no 80%), por qué los plazos se acortan, qué vinculaciones aceptan los bancos para inversor, cuándo conviene una hipoteca a título personal vs a nombre de sociedad y cuándo el broker hace la diferencia. Por Toño Palacios, broker hipotecario nº E242.',
  },

  // ─────────────────────────────────────────────────────────────────────
  // En qué se diferencia hipoteca primera vivienda vs inversión
  // ─────────────────────────────────────────────────────────────────────
  diferencias: {
    title: 'En qué se diferencia hipoteca inversión vs primera vivienda',
    intro:
      'La banca minorista española aplica un marco totalmente distinto cuando la operación es para inversión que cuando es para vivienda habitual. No es solo "un poco más caro": son criterios separados, productos separados y, en muchos casos, mesas de riesgos separadas dentro del banco.',
    rows: [
      {
        criterio: 'LTV máximo',
        primera: 'Hasta 80% (con aval ICO hasta 95-100%)',
        inversor: '60-70% típico, raro pasar del 70%',
      },
      {
        criterio: 'Plazo máximo',
        primera: 'Hasta 30 años (algunos bancos 35)',
        inversor: 'Hasta 25 años; en propiedades a reformar 20',
      },
      {
        criterio: 'TIN diferencial',
        primera: 'Mediana de mercado',
        inversor: '+0,3 a +0,8 pp sobre la mediana de primera vivienda',
      },
      {
        criterio: 'Vinculaciones',
        primera: 'Bonifican TIN (-0,3 a -0,8 pp)',
        inversor: 'Más duras: seguro alquiler, plan pensiones, mayor saldo cuenta',
      },
      {
        criterio: 'Análisis de scoring',
        primera: 'Ratio esfuerzo sobre ingresos del titular',
        inversor: 'Ratio esfuerzo sobre ingresos + rentabilidad del activo',
      },
      {
        criterio: 'Aval ICO joven',
        primera: 'Disponible para menores de 35',
        inversor: 'No aplica',
      },
      {
        criterio: 'Bonificaciones autonómicas ITP',
        primera: 'Reducciones para perfiles específicos',
        inversor: 'No aplica (ITP general)',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────
  // Cuánto cash necesita un inversor REALMENTE
  // ─────────────────────────────────────────────────────────────────────
  cashNeeded: {
    title: 'Cuánto cash necesita un inversor realmente',
    intro:
      'La regla del 28-32% del primerizo no aplica al inversor. Como el LTV cae al 60-70%, la entrada sube al 30-40% del precio. Sumando gastos de cierre e ITP por CCAA, el cash necesario para una operación de inversión en España suele estar entre el 38% y el 48% del precio de compra.',
    paragraphs: [
      'Tomando un piso de inversión de 150.000 €: con LTV 70% el banco te financia 105.000 €, lo que te obliga a poner 45.000 € de entrada (30%). Sumando ITP típico del 8-10% (12.000-15.000 €), gastos de cierre (~3.000 €) y un colchón de imprevistos (3.000 €), el cash necesario son aproximadamente 63.000-66.000 € — el 42-44% del precio de compra.',
      'Si el banco baja el LTV al 60% (operaciones más complejas o segunda propiedad), el cash sube al 48-52% del precio. Conviene tenerlo claro antes de buscar inmueble: no es lo mismo "puedo comprar pisos de hasta 200.000 €" basado en LTV 80% que en LTV 65%.',
      'Para el cálculo concreto de tu caso, usa la calculadora de capacidad de endeudamiento con el aporte propio que tengas y ajusta el LTV mentalmente al 65-70% en lugar del 80% que asume por defecto en primera vivienda.',
    ],
  },

  // ─────────────────────────────────────────────────────────────────────
  // Cómo te valora el banco como inversor
  // ─────────────────────────────────────────────────────────────────────
  bankScoring: {
    title: 'Cómo te valora el banco como inversor',
    paragraphs: [
      'Como inversor, el banco aplica un doble análisis: tu solvencia personal Y la rentabilidad del activo que vas a financiar. No basta con tener ingresos altos — si el inmueble no genera flujo suficiente, la operación cae.',
      'La fórmula operativa simplificada: el banco quiere ver que la cuota hipotecaria + gastos recurrentes del inmueble es menor que el 70-75% de la renta esperada (no del precio de venta del anuncio, sino de la renta defendible para esa zona, que el banco verifica con sus propias bases de datos).',
    ],
    criteria: [
      {
        name: 'Ratio de esfuerzo personal',
        value: 'Máximo 35% incluyendo TODAS las hipotecas',
        detail:
          'El banco suma la cuota de la nueva hipoteca + cuotas de hipotecas existentes + otras deudas y aplica el 35% sobre tus ingresos netos totales. Cada hipoteca anterior reduce tu capacidad para la siguiente.',
      },
      {
        name: 'Rentabilidad del activo',
        value: 'Renta cubre 130-150% de cuota + gastos',
        detail:
          'El banco quiere ver que la operación se "auto-paga". Renta esperada de la zona ≥ 1,3-1,5 × (cuota hipotecaria + comunidad + IBI + tasa de residuos). Si no, el riesgo recae enteramente sobre tus ingresos personales.',
      },
      {
        name: 'Histórico hipotecario',
        value: 'Sin incidencias en CIRBE',
        detail:
          'Como inversor recurrente, el banco mira el CIRBE para verificar que has cumplido puntualmente con tus hipotecas anteriores. Una incidencia, aunque sea menor (un retraso puntual de 30 días), endurece la operación.',
      },
      {
        name: 'Diversificación del patrimonio',
        value: 'No más de 3-4 propiedades por titular individual',
        detail:
          'A partir de la 4ª-5ª hipoteca personal, muchos bancos retiran a operar contigo a título personal y te piden estructura societaria (SL patrimonial o SOCIMI si encajas). No es regulación: es política interna por concentración de riesgo.',
      },
      {
        name: 'Tasación con perfil de inversión',
        value: 'Valor de tasación específico para alquiler',
        detail:
          'La sociedad de tasación aplica metodología distinta cuando el destino es alquiler: descuenta vacancia, calcula yield bruto vs zona y verifica que la renta esperada sea defendible. Una tasación "para inversión" puede salir 5-10% por debajo de la de "primera vivienda" del mismo inmueble.',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────
  // Hipoteca personal vs sociedad
  // ─────────────────────────────────────────────────────────────────────
  personalVsSociedad: {
    title: 'Hipoteca a título personal vs en sociedad: cuándo conviene cada una',
    intro:
      'Es la pregunta que se hace el inversor a partir de la segunda propiedad. La respuesta correcta depende de tu volumen, tu fiscalidad personal y tu horizonte. Aquí están los criterios operativos.',
    items: [
      {
        when: 'Hipoteca a título personal',
        whenItFits:
          '1-3 propiedades de alquiler, ingresos personales razonables, sin necesidad de optimizar fiscalidad agresivamente.',
        pros: [
          'Más simple: misma persona física, mismo declarante fiscal',
          'TIN típicamente más bajo que la financiación a sociedad',
          'Acceso a bonificaciones por nómina, plan de pensiones, seguros',
          'Decisión rápida del banco (perfil estándar minorista)',
        ],
        cons: [
          'Tributación de la renta en IRPF (rendimientos del capital inmobiliario, marginal hasta 47%)',
          'Responsabilidad ilimitada con tu patrimonio personal',
          'A partir de 3-4 propiedades, los bancos te empiezan a empujar a sociedad',
          'No te beneficias del régimen ETVE ni de SOCIMI',
        ],
      },
      {
        when: 'Hipoteca a nombre de sociedad (SL patrimonial)',
        whenItFits:
          '4+ propiedades, ingresos del alquiler significativos, planificación sucesoria, separación operativa-patrimonio.',
        pros: [
          'Tributación en Impuesto de Sociedades (tipo general 25%, primer tramo 15% durante 2 años en sociedades de nueva creación)',
          'Limitación de responsabilidad al capital social',
          'Facilita la transmisión patrimonial (compra-venta de participaciones)',
          'Permite acumular en holding sin tributar dividendos (régimen ETVE)',
          'Apta para estructurar SOCIMI si llegas a ≥5 propiedades',
        ],
        cons: [
          'TIN más alto que personal (+0,5 a +1 pp típico)',
          'Trámites contables y mercantiles (cuentas anuales, libro de socios, modelo 200)',
          'El banco exige aval personal de los socios casi siempre, por lo que la limitación de responsabilidad es relativa al banco aunque sí real frente a terceros',
          'Constitución y mantenimiento tienen costes (~500-1500 €/año)',
        ],
      },
    ],
    note:
      'La decisión correcta requiere analizar tu IRPF personal, número de propiedades actuales, horizonte de adquisiciones futuras y planificación sucesoria. Esta decisión la asesoro caso por caso — pero NO constituyo sociedades; coordino con abogados mercantilistas autorizados.',
  },

  // ─────────────────────────────────────────────────────────────────────
  // Errores típicos del inversor
  // ─────────────────────────────────────────────────────────────────────
  mistakes: {
    title: 'Errores que cuestan caro al inversor inmobiliario',
    items: [
      {
        title: 'Asumir LTV 80% en una operación de inversión',
        body:
          'Es el error nº 1 del inversor primerizo. La banca minorista NO da 80% LTV en inversión. Llegas a la oferta vinculante y descubres que el banco financia 65-70%, lo que te obliga a poner más cash del que tenías presupuestado. Resultado: la operación cae en última instancia.',
      },
      {
        title: 'No incluir vacancia ni mantenimiento en la rentabilidad',
        body:
          'La rentabilidad "bruta" de los anuncios inmobiliarios no descuenta vacancia (1-2 meses al año sin inquilino), mantenimiento ordinario (pintura, electrodomésticos, derramas) ni impagos. La rentabilidad real cae 1-2 puntos porcentuales frente a la del anuncio. Si tu margen es 4% bruto, tu real es 2-3% — apenas igual o inferior al bono español a 10 años.',
      },
      {
        title: 'Confundir cash-on-cash con rentabilidad real del activo',
        body:
          'El apalancamiento bancario infla artificialmente el cash-on-cash. Una operación con LTV 70% puede mostrar 10% cash-on-cash pero solo 3% rentabilidad real del activo. Cuando llegue la próxima subida de tipos, el cash-on-cash colapsa. Mira siempre las dos métricas.',
      },
      {
        title: 'Optimizar fiscalmente sin contar con el coste de la estructura',
        body:
          'Crear sociedad para una sola propiedad raramente compensa: ~1.000 €/año de costes de mantenimiento societario, contables y fiscales. La sociedad empieza a tener sentido a partir de 3-4 propiedades con flujo combinado significativo o por planificación sucesoria, no antes.',
      },
      {
        title: 'No verificar la viabilidad antes de firmar las arras',
        body:
          'Firmas arras del 10% del precio, contactas al banco, y el banco te aprueba solo el 60% LTV cuando habías calculado el 70%. Pierdes las arras o tienes que poner el dinero extra. La prevaloración hipotecaria SIEMPRE debe ir antes de firmar arras, no al revés.',
      },
      {
        title: 'Subestimar el coste real de las vinculaciones bancarias',
        body:
          'Para inversor, el banco suele exigir seguros más caros (con coberturas más amplias para alquiler) y mayor saldo en cuenta. Un seguro de hogar específico para alquiler puede costar 400-700 €/año vs los 150-250 € de primera vivienda. Calcula el coste total real, no solo la bonificación de TIN.',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────
  // Tipos de inmueble que financia / no financia
  // ─────────────────────────────────────────────────────────────────────
  inmuebleType: {
    title: 'Qué inmuebles financia la banca (y cuáles no)',
    paragraphs: [
      'Como inversor, no todos los inmuebles son iguales a ojos del banco. La política interna varía por entidad, pero hay categorías bastante consistentes en banca minorista española.',
    ],
    items: [
      {
        type: 'Piso o casa terminada en zona residencial',
        verdict: 'Sí',
        detail: 'Producto estándar. LTV 60-70%, plazo 25 años, TIN +0,3-0,5 pp sobre primera vivienda.',
      },
      {
        type: 'Vivienda en obra nueva sobre plano',
        verdict: 'Sí con matices',
        detail: 'Algunos bancos sí, otros piden que esté terminada al 80% antes de firmar. Plazo desde la entrega de llaves.',
      },
      {
        type: 'Propiedad a reformar (no habitable)',
        verdict: 'Con dificultad',
        detail: 'LTV baja al 50-60%, plazo se acorta a 15-20 años. Algunos bancos exigen presupuesto de reforma cerrado y financian con desembolsos por hitos.',
      },
      {
        type: 'Local comercial reconvertido a vivienda',
        verdict: 'Solo con cambio de uso formalizado',
        detail: 'El banco exige tener la licencia de cambio de uso ANTES de firmar la hipoteca. Si está en trámite, no avanza.',
      },
      {
        type: 'Plaza de garaje individual',
        verdict: 'No (financiación vía préstamo personal)',
        detail: 'Importe pequeño hace que la banca no quiera hipoteca específica. Se financia vía préstamo personal a tipos más altos.',
      },
      {
        type: 'Trastero',
        verdict: 'No',
        detail: 'Mismo motivo que el garaje. Solo accesorio a la hipoteca del piso principal.',
      },
      {
        type: 'Multifamiliar (edificio completo)',
        verdict: 'Sí en banca privada o especializada',
        detail: 'Operación corporativa. Banca minorista no entra; banca privada o especializada en inmobiliario sí. TIN distinto al residencial.',
      },
      {
        type: 'Suelo / parcela',
        verdict: 'Excepcional',
        detail: 'Producto raro en banca minorista. Suele requerir avales adicionales y plazos muy cortos (5-10 años).',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────
  // FAQ
  // ─────────────────────────────────────────────────────────────────────
  faq: [
    {
      question: '¿Cuánto LTV financia un banco para inversión inmobiliaria en España?',
      answer:
        'Entre el 60% y el 70% del valor de tasación (o precio, el menor de los dos) en la banca minorista española típica. En primera vivienda habitual sube al 80%. Para alcanzar el 70% suelen pedir perfil sólido, ingresos demostrables, sin más de 3 hipotecas previas en CIRBE y la propiedad en zona prime o defendible.',
    },
    {
      question: '¿Por qué la hipoteca para inversión es más cara que para primera vivienda?',
      answer:
        'Porque el banco asume mayor riesgo: LTV menor reduce su garantía, pero también el TIN sube +0,3 a +0,8 puntos porcentuales sobre la mediana de primera vivienda, las vinculaciones son más duras y el plazo más corto. Es política interna: el banco no quiere concentración de operaciones de inversión en su cartera.',
    },
    {
      question: '¿Cuándo conviene hipoteca a título personal vs en sociedad?',
      answer:
        'Personal hasta 2-3 propiedades. Sociedad a partir de 4+ propiedades, o cuando el tipo marginal de IRPF te pega un 37-47% sobre rendimientos del capital inmobiliario. La sociedad limita responsabilidad y tributa en IS al 25% (15% primeros 2 años en nuevas), pero tiene costes de mantenimiento ~1.000 €/año.',
    },
    {
      question: '¿Qué es una SOCIMI y cuándo encaja en una operación de inversión?',
      answer:
        'SOCIMI = Sociedad Cotizada de Inversión en el Mercado Inmobiliario. Régimen fiscal especial al 0% en IS si cumple requisitos (≥5 inmuebles destinados a alquiler, mantenimiento mínimo 3 años, distribución obligatoria de 80% beneficios). Es estructura para portafolios grandes (≥10 propiedades), no aplica a inversores con 2-3 pisos.',
    },
    {
      question: '¿Puedo amortizar el préstamo con las rentas del alquiler en IRPF?',
      answer:
        'Sí. Como inversor con propiedad alquilada, puedes deducir en IRPF los intereses pagados de la hipoteca (no la cuota completa, solo los intereses), los gastos de comunidad, IBI, tasa de residuos, seguro, amortización del 3% del valor de construcción y reparaciones. La renta tributa como rendimiento del capital inmobiliario, neto de esos gastos.',
    },
    {
      question: '¿Existe reducción del 60% en IRPF por alquilar a vivienda habitual?',
      answer:
        'Sí, conforme al artículo 23.2 LIRPF, el rendimiento neto positivo del alquiler de vivienda habitual del inquilino tiene una reducción del 50-90% según condiciones (zona tensionada, alquiler reducido, inquilino joven, etc.). Las reducciones se aplicaron con modificaciones tras la Ley 12/2023 — consulta los porcentajes vigentes con tu asesor fiscal.',
    },
    {
      question: '¿Cuál es la rentabilidad mínima razonable para invertir en alquiler?',
      answer:
        'Como referencia operativa: la rentabilidad real (sobre inversión operativa sin ITP) debería estar al menos 2-3 puntos porcentuales por encima del bono español a 10 años (actualmente sobre 3,5%). Por debajo de 5% real no compensa el riesgo y la gestión. Por encima de 6% es zona aceptable; por encima de 8% es excelente si la renta es sostenible.',
    },
    {
      question: '¿Conviene apalancarse al máximo en operaciones de inversión?',
      answer:
        'No siempre. El máximo apalancamiento (70% LTV) infla el cash-on-cash mientras los tipos están bajos, pero cuando suben (escenario stress test Euríbor), el flujo neto puede volverse negativo. Apalancamiento óptimo: el que mantiene flujo neto mensual positivo incluso si el Euríbor sube 1-2 puntos. Verifica con el stress test antes de firmar.',
    },
    {
      question: '¿Qué pasa si tengo varias hipotecas y quiero pedir una nueva?',
      answer:
        'El banco suma todas tus cuotas hipotecarias actuales + cuota de la nueva y aplica el ratio del 35% sobre tus ingresos. Si una de tus propiedades está alquilada, algunos bancos te dejan contar un 70-100% de la renta como ingreso adicional (con contrato y movimientos bancarios demostrables); otros no. Esto cambia la viabilidad en muchas operaciones.',
    },
    {
      question: '¿Cuánto tiempo tarda una hipoteca de inversión vs primera vivienda?',
      answer:
        'Algo más: entre 6 y 10 semanas (vs 4-8 de primera vivienda). El banco hace análisis adicional de rentabilidad del activo, tasación específica para inversión y verificación CIRBE más profunda. Si la operación incluye constitución de sociedad, suma 4-6 semanas más para los trámites mercantiles.',
    },
    {
      question: '¿Necesito un broker para una hipoteca de inversión?',
      answer:
        'No es obligatorio pero conviene mucho más que en primera vivienda. Cada banco tiene políticas internas distintas para inversor que no son públicas: cuántas hipotecas previas tolera, qué % de renta del alquiler computa como ingreso, qué tipos de inmueble financia. El broker conoce el mapa y te dirige al banco correcto sin perder semanas en negativas.',
    },
  ] as ReadonlyArray<FaqEntry>,
} as const
