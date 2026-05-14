import type { FaqEntry } from '@psz/ui'

/**
 * Contenido del pillar `/hipoteca-autonomos`.
 *
 * Pillar de alto valor SEO: "hipoteca autónomos" es búsqueda con
 * volumen y bajo CTR de respuestas honestas en el sector. La mayoría
 * de medios reproducen "necesitas 2 ejercicios IRPF" sin entrar en
 * los detalles operativos (módulos vs estimación directa, bancos
 * receptivos, anti-optimización IRPF, etc.).
 *
 * Audiencia: autónomo español en RETA, con o sin sociedad propia,
 * que quiere hipoteca residencial (primera o segunda vivienda) o
 * de inversión inmobiliaria.
 */

export const PILLAR_AUTONOMOS = {
  hero: {
    eyebrow: 'Guía pillar · Hipoteca para autónomo',
    h1: 'Hipoteca para autónomos en España',
    sub:
      'Guía operativa para autónomo español que quiere conseguir hipoteca. Por qué los bancos son más estrictos contigo, qué documentación específica te van a pedir, qué bancos son realmente receptivos al perfil autónomo, cómo presentar el dossier para sacarle partido a tu IRPF (módulos vs estimación directa) y qué errores cuestan caro. Por Antonio Palacios Cambero (Toño Palacios), broker hipotecario nº E242.',
  },

  // Por qué los bancos son más estrictos
  whyStricter: {
    title: 'Por qué los bancos son más estrictos con un autónomo',
    paragraphs: [
      'No es discriminación: es gestión de riesgo. El banco no tiene acceso a tu nómina mensual estable, no puede verificar tu antigüedad laboral en SS de forma simple y depende de tu declaración IRPF anual para estimar tu capacidad. Eso aumenta la incertidumbre y el banco la compensa con criterios más conservadores.',
      'La realidad operativa: la mitad de bancos españoles tiene políticas internas que limitan el porcentaje de cartera hipotecaria autónoma. Una vez alcanzado el cupo, dejan de operar con autónomos hasta el siguiente ejercicio aunque el perfil concreto sea excelente. No te lo dicen abiertamente — pero sí lo notas en la negativa "por scoring".',
    ],
  },

  // Requisitos mínimos
  requirements: {
    title: 'Requisitos mínimos del autónomo para hipoteca',
    items: [
      {
        title: '2 ejercicios IRPF cerrados (mínimo)',
        body:
          'Algunos bancos aceptan 1 año + previsiones, pero la mediana española exige 2 ejercicios completos cerrados y presentados. Si estás en tu primer año como autónomo, la operación es muy difícil; con 2 años entras al rango "viable"; con 3+ años de antigüedad, el banco te valora como autónomo consolidado.',
      },
      {
        title: 'Rendimiento neto IRPF suficiente',
        body:
          'El banco mira tu rendimiento neto IRPF (no tu facturación bruta). El ratio de esfuerzo del 35% se aplica sobre lo que has declarado neto, dividido entre 12 meses. Si tu IRPF declarado es 25.000 €/año, el banco considera 2.083 €/mes a efectos de hipoteca — independientemente de que tu facturación bruta sea 60.000.',
      },
      {
        title: 'Alta en RETA acreditada',
        body:
          'Certificado de alta en el RETA con antigüedad y al corriente de cuotas. Una incidencia con la Seguridad Social en los últimos 12 meses tumba la operación. Verifica con la app de la Seg. Social tu estado antes de iniciar.',
      },
      {
        title: 'Sin incidencias en CIRBE',
        body:
          'El banco mira tu CIRBE para verificar deudas existentes (préstamos profesionales, leasing, líneas de circulante). Como autónomo, conviene que el CIRBE no muestre incidencias y que las deudas profesionales no consuman más del 30% de tu rendimiento neto.',
      },
      {
        title: 'Estabilidad del sector',
        body:
          'Sectores volátiles (hostelería, construcción, eventos) reciben tratamiento más restrictivo. Sectores estables (consultoría, sanidad, educación, profesionales colegiados) tienen más facilidad. Esto no es público pero es un factor de scoring real.',
      },
    ],
  },

  // Documentación específica
  documentation: {
    title: 'Documentación específica para autónomo',
    intro:
      'La documentación es más extensa que para asalariado porque el banco necesita reconstruir tu solvencia desde múltiples fuentes en lugar de simplemente verificar nóminas. Conviene tenerla preparada desde el primer día.',
    items: [
      'IRPF (modelo 100) de los últimos 2 ó 3 ejercicios completos, con anexo de actividades económicas',
      'Si tributas en estimación objetiva (módulos): justificación de los módulos aplicados y certificado del epígrafe IAE',
      'Modelo 130 (pagos fraccionados) de los últimos 4 trimestres',
      'Modelo 303 (IVA trimestral) últimos 4 trimestres, salvo exento',
      'Certificado de alta y antigüedad en el RETA (descargable de la Seg. Social)',
      'Certificado al corriente de pagos con la Seg. Social (TC1/TC2 o equivalente)',
      'Certificado al corriente con AEAT (modelo 1 emitido por Hacienda)',
      'Vida laboral actualizada',
      'Si tienes sociedad propia: cuentas anuales depositadas en el Registro Mercantil de los últimos 2 ejercicios + nota simple de tu participación',
      'Movimientos de las cuentas profesionales y personales últimos 6-12 meses (algunos bancos)',
    ],
  },

  // Bancos receptivos
  bancosReceptivos: {
    title: 'Bancos receptivos al perfil autónomo',
    intro:
      'No todos los bancos tratan al autónomo igual. Algunos tienen departamentos específicos de "empresa y autónomo" con criterios distintos a los del asalariado; otros aplican el mismo scoring restrictivo. La diferencia entre presentar la operación al banco correcto y al incorrecto pueden ser 4-6 semanas perdidas y un rechazo "por scoring" sin explicación.',
    paragraphs: [
      'Como broker hipotecario, mi mapa actualizado de qué bancos están receptivos al perfil autónomo cambia por trimestre — depende de cupos internos, ciclo y políticas comerciales temporales. Lo que sí es estructural: los bancos con red de oficinas amplias y experiencia con pyme suelen ser más receptivos que los bancos puramente digitales.',
      'No publicamos pricing ni listado nominal porque cambia rápido y porque la conversación con el banco depende del perfil concreto. Sí está claro que llevar la operación a un broker con experiencia con autónomos ahorra mucho tiempo y aumenta drásticamente la probabilidad de aprobación.',
    ],
  },

  // Anti-optimización IRPF
  antiOptimization: {
    title: 'El problema "anti-optimización IRPF"',
    paragraphs: [
      'Aquí está el conflicto operativo más típico del autónomo: durante años has optimizado tu IRPF para pagar menos impuestos (gastos deducibles agresivos, amortizaciones, dietas, vehículo, parte de la casa, etc.). Eso reduce tu rendimiento neto declarado y, en el momento de pedir hipoteca, el banco te ve "pequeño".',
      'Lo que la mayoría de asesores fiscales no te dice: si vas a pedir hipoteca en los próximos 2 años, conviene **dejar de optimizar agresivamente** los dos últimos ejercicios. Pagar más IRPF a corto plazo a cambio de mostrar un rendimiento neto mayor que justifique la hipoteca. Es una decisión que tiene que tomarse con tu asesor fiscal con tiempo.',
      'No es maquillar: es presentar tu actividad real sin gastos deducibles marginales que no aportan valor operativo. Si llevas 5 años deduciendo el 30% de un piso como "oficina en casa" y te niegas a quitarlo, tu IRPF dirá que ganas menos de lo que realmente generas — y el banco actuará en consecuencia.',
      'El broker hipotecario puede ayudar a planificar esto en operaciones grandes, en coordinación con el asesor fiscal. No es habitual hacer cosas distintas a esto, pero conviene saberlo.',
    ],
  },

  // Trucos operativos
  operationalTips: {
    title: 'Trucos operativos para autónomo',
    items: [
      {
        title: 'Domicilia los pagos profesionales en una sola cuenta',
        body:
          'Los bancos valoran ver claridad en los movimientos. Si tu actividad está repartida en 3 cuentas, tener todo en una sola cuenta los últimos 6 meses simplifica el análisis y mejora la primera impresión.',
      },
      {
        title: 'Reduce deudas profesionales antes de pedir hipoteca',
        body:
          'Cada cuota mensual de leasing del coche, línea de circulante o préstamo profesional reduce tu capacidad. Si puedes amortizar parcialmente antes de la solicitud, mejor.',
      },
      {
        title: 'Si tienes pareja asalariada, optimiza la titularidad',
        body:
          'La hipoteca a nombre de ambos titulares mejora considerablemente si tu pareja es asalariada con contrato indefinido. La parte estable del scoring (su nómina) compensa la incertidumbre del autónomo.',
      },
      {
        title: 'No mientas sobre actividad paralela',
        body:
          'Si tienes ingresos extra no declarados (alquileres no declarados, trabajos en B), no los menciones en la solicitud y NO los uses como justificación de aporte propio. La verificación bancaria es rigurosa y descubrirlo cae la operación + reporte a SEPBLAC.',
      },
      {
        title: 'Solicita la hipoteca al cierre del ejercicio fiscal',
        body:
          'Empieza el proceso en enero-febrero con el IRPF del año recién cerrado. Tu información financiera está fresca, completa y verificable. Pedir hipoteca en octubre con datos de hace 9 meses suele complicar.',
      },
    ],
  },

  // Errores típicos
  mistakes: {
    title: 'Errores típicos del autónomo al pedir hipoteca',
    items: [
      {
        title: 'No haber preparado el IRPF de los últimos 2 años para hipoteca',
        body:
          'Llegas con un rendimiento neto declarado bajísimo (por optimización fiscal) y descubres que el banco te ve insolvente. Es muy tarde para reescribir el IRPF — quedan 12+ meses hasta poder presentar uno con números más fuertes.',
      },
      {
        title: 'Asumir que el banco te financia como asalariado',
        body:
          'Calculas LTV 80%, presupuesto el 28-32% de cash y descubres en la prevaloración que te ofrecen 70% LTV (no 80%) por ser autónomo. Asume LTV 70-75% en operaciones de primera vivienda como autónomo, no 80%.',
      },
      {
        title: 'Llevar la operación a cualquier banco',
        body:
          'No todos los bancos son receptivos al autónomo. Llevar el expediente a 3 bancos que no operan con autónomos consume 4-6 semanas y termina en 3 negativas seguidas. El broker hipotecario conoce el mapa por trimestre.',
      },
      {
        title: 'Mezclar la economía profesional con la personal sin orden',
        body:
          'Si tu cuenta personal recibe ingresos profesionales sin separación clara, el banco no puede reconstruir tu situación. Conviene separar cuentas al menos 6 meses antes de solicitar.',
      },
      {
        title: 'No incluir gastos profesionales reales en el cálculo de capacidad',
        body:
          'Como autónomo tienes gastos profesionales recurrentes (cuota RETA, mutua, asesoría, software, alquiler oficina). El banco los descuenta de tu rendimiento neto. Si no los has reflejado correctamente en IRPF (por optimización agresiva), el banco asume que tu capacidad es mayor pero te exige mantener un buffer adicional.',
      },
    ],
  },

  // FAQ
  faq: [
    {
      question: '¿Puede un autónomo conseguir hipoteca en España?',
      answer:
        'Sí, pero con condiciones distintas al asalariado. Requisitos mínimos: 2 ejercicios IRPF cerrados, alta en RETA al corriente, rendimiento neto suficiente para el ratio de esfuerzo del 35%, sin incidencias en CIRBE. La banca minorista española financia hasta 70-75% LTV en primera vivienda al autónomo (vs 80% al asalariado) y TIN sobrecoste de +0,2-0,5 pp.',
    },
    {
      question: '¿Cuántos años de IRPF necesito como autónomo?',
      answer:
        'Mínimo 2 ejercicios completos cerrados y presentados (modelo 100). Algunos bancos aceptan 1 año + previsiones pero el rango "estándar" empieza con 2 años. Con 3+ años de antigüedad como autónomo y rendimiento neto creciente, el banco te valora como autónomo consolidado y las condiciones mejoran.',
    },
    {
      question: '¿Qué ingresos cuenta el banco para autónomo?',
      answer:
        'El rendimiento neto IRPF declarado, no la facturación bruta. Si declaras 25.000 €/año netos, el banco considera unos 2.083 €/mes a efectos del ratio de esfuerzo del 35%. La facturación bruta y los gastos deducibles no le interesan al banco — solo el "neto" que aparece en la casilla correspondiente de tu IRPF.',
    },
    {
      question: '¿Me conviene reducir gastos deducibles antes de pedir hipoteca?',
      answer:
        'Si planeas pedir hipoteca en los próximos 2 años, sí conviene reducir optimización fiscal agresiva los ejercicios previos para mostrar un rendimiento neto que justifique la operación. No es maquillar — es presentar tu actividad sin gastos marginales que no aportan valor operativo. Decisión a tomar con tu asesor fiscal con tiempo.',
    },
    {
      question: '¿Qué LTV financia un banco a un autónomo?',
      answer:
        'En primera vivienda habitual, entre 70% y 75% LTV (vs 80% del asalariado). En inversión inmobiliaria, entre 55% y 65% LTV. Por encima de esos niveles, el banco exige aval personal de un titular asalariado o aval ICO si encajas en el programa de jóvenes.',
    },
    {
      question: '¿Qué bancos son más receptivos al autónomo en España?',
      answer:
        'Los bancos con red amplia de oficinas y experiencia con pyme (Santander, BBVA, CaixaBank, Banco Sabadell, Bankinter) suelen ser más receptivos que los bancos puramente digitales. Pero cada trimestre cambian los cupos internos de "cartera autónomo". Un broker hipotecario con experiencia con autónomos sabe qué banco está abierto a cada perfil este mes.',
    },
    {
      question: '¿Hay diferencia entre módulos y estimación directa para el banco?',
      answer:
        'Sí. Estimación directa (declaras ingresos reales menos gastos reales) le da al banco una foto más completa de tu actividad y suele ser bien valorada. Módulos (cifra forfait según epígrafe IAE) introduce menos información financiera real y algunos bancos lo penalizan ligeramente. La operación es viable con módulos pero requiere más documentación complementaria.',
    },
    {
      question: '¿Puedo presentar la hipoteca a nombre de mi sociedad si soy administrador?',
      answer:
        'Sí, pero es otra operación distinta: hipoteca a nombre de SL con aval personal del administrador. TIN típicamente más alto (+0,5-1 pp), trámite mercantil adicional, contabilidad rigurosa. Solo conviene cuando ya tienes 3+ propiedades a título personal o cuando la fiscalidad personal te empuja a marginales >37%.',
    },
    {
      question: '¿Qué pasa si llevo menos de 2 años como autónomo?',
      answer:
        'Operación muy difícil con banca minorista estándar. Opciones: (1) esperar hasta tener 2 ejercicios IRPF cerrados; (2) operar con aval personal de un titular asalariado con ingresos estables; (3) sumar tu pareja asalariada como co-titular para que la parte estable del scoring compense; (4) si es operación de inversión, considerar entrada al 50-55% LTV solamente.',
    },
    {
      question: '¿Conviene contratar un broker hipotecario siendo autónomo?',
      answer:
        'Sí, casi siempre. La diferencia entre presentar tu caso al banco correcto y al incorrecto, con la documentación correcta y el "framing" correcto, puede ser la diferencia entre aprobación y rechazo. El broker conoce los cupos internos por trimestre, las políticas de cada banco con autónomos y cómo presentar el dossier para minimizar fricción.',
    },
    {
      question: '¿Cuánto tarda una hipoteca para autónomo?',
      answer:
        'Entre 6 y 10 semanas (vs 4-8 del asalariado): 2-3 semanas de preparación documental, 2-4 semanas de análisis bancario (más profundo por el perfil autónomo), 1-2 semanas de tasación, 10 días obligatorios de reflexión post-FEIN. Si la operación implica también constitución o cambio societario, suma 4-6 semanas más.',
    },
  ] as ReadonlyArray<FaqEntry>,
} as const
