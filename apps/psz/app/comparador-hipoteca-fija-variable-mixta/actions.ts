'use server'

/**
 * Server action del comparador hipoteca fija/variable/mixta.
 *
 * Pregunta operativa: tengo el mismo importe y plazo. ¿Cuál de las tres
 * modalidades me conviene si el Euríbor se queda donde está, sube 1 pp
 * o sube 2 pp?
 *
 * El comparador resuelve un debate clásico: cuota inicial baja vs
 * predictibilidad total. No hay respuesta universal — depende del
 * horizonte y la tolerancia al riesgo. La calculadora cuantifica las
 * tres modalidades en 3 escenarios paralelos de evolución del Euríbor
 * para que el usuario decida con datos.
 *
 * Asunciones:
 *  - Fija: TIN constante toda la vida del préstamo.
 *  - Variable: Euríbor evoluciona según el escenario aplicado, el
 *    diferencial pactado se mantiene. Revisión anual asumida (la cuota
 *    cambia el primer mes del nuevo año con el TIN proyectado).
 *  - Mixta: durante N años el TIN fijo del tramo inicial; después, el
 *    Euríbor + diferencial mixta variable evoluciona según escenario.
 */

// ─────────────────────────────────────────────────────────────────────────
// Tipos
// ─────────────────────────────────────────────────────────────────────────

export type Modalidad = 'fija' | 'variable' | 'mixta'

export type EuriborScenarioKey = 'estable' | 'sube_1pp' | 'sube_2pp'

export interface ModalidadResult {
  modalidad: Modalidad
  tinInicialPct: number
  cuotaInicial: number
  cuotaPromedioProyectada: number
  intereseTotalProyectado: number
  cuotaMinima: number
  cuotaMaxima: number
  exposicionEuribor: 'no' | 'parcial' | 'total'
}

export interface ComparadorScenario {
  key: EuriborScenarioKey
  label: string
  description: string
  /** Variación anual asumida sobre el Euríbor actual */
  euriborOffsetAnualPct: number
  modalidades: Record<Modalidad, ModalidadResult>
  recomendacion: string
  ganador: Modalidad
}

export interface ComparadorWarning {
  severity: 'red' | 'amber' | 'green'
  title: string
  detail: string
}

export interface ComparadorResult {
  inputs: {
    importe: number
    plazoAnios: number
    fija: { tinPct: number }
    variable: { euriborPct: number; diferencialPct: number }
    mixta: { tramoFijoAnios: number; tinTramoFijoPct: number; diferencialVariablePct: number }
  }
  scenarios: ComparadorScenario[]
  warnings: ComparadorWarning[]
}

export type ActionState =
  | { ok: true; result: ComparadorResult }
  | { ok: false; error: string }
  | null

// ─────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────

function parseNum(form: FormData, key: string): number {
  const raw = (form.get(key) as string | null) ?? ''
  const clean = raw.replace(',', '.').replace(/[^\d.-]/g, '')
  const n = parseFloat(clean)
  return Number.isFinite(n) ? n : 0
}

function monthlyPayment(principal: number, tinAnualPct: number, plazoMeses: number): number {
  if (principal <= 0 || plazoMeses <= 0) return 0
  const i = tinAnualPct / 100 / 12
  if (i === 0) return principal / plazoMeses
  return (principal * i) / (1 - Math.pow(1 + i, -plazoMeses))
}

/**
 * Simulación año a año del préstamo:
 *   - Cada año el TIN puede ser distinto (variable/mixta).
 *   - Recalculamos la cuota cada año usando el capital pendiente al
 *     cierre del año anterior y el plazo restante.
 *   - Devolvemos cuota inicial, promedio, mínima, máxima e intereses
 *     totales acumulados.
 */
function simulate(
  principal: number,
  plazoAnios: number,
  tinPorAnio: number[],
): {
  cuotaInicial: number
  cuotaPromedio: number
  cuotaMinima: number
  cuotaMaxima: number
  intereseTotal: number
} {
  let capitalPendiente = principal
  let plazoRestanteMeses = plazoAnios * 12
  const cuotas: number[] = []
  let interesesAcumulados = 0

  for (let year = 0; year < plazoAnios; year++) {
    const tinAnual = tinPorAnio[Math.min(year, tinPorAnio.length - 1)]!
    const i = tinAnual / 100 / 12
    const cuotaMensual = monthlyPayment(capitalPendiente, tinAnual, plazoRestanteMeses)
    cuotas.push(cuotaMensual)

    // Avanzar 12 meses
    for (let m = 0; m < 12 && plazoRestanteMeses > 0; m++) {
      const intereseMes = capitalPendiente * i
      const amortMes = cuotaMensual - intereseMes
      capitalPendiente = Math.max(0, capitalPendiente - amortMes)
      interesesAcumulados += intereseMes
      plazoRestanteMeses--
    }
  }

  return {
    cuotaInicial: cuotas[0] ?? 0,
    cuotaPromedio: cuotas.length > 0 ? cuotas.reduce((a, b) => a + b, 0) / cuotas.length : 0,
    cuotaMinima: Math.min(...cuotas),
    cuotaMaxima: Math.max(...cuotas),
    intereseTotal: interesesAcumulados,
  }
}

const SCENARIO_META: Record<
  EuriborScenarioKey,
  { label: string; description: string; offset: number }
> = {
  estable: {
    label: 'Euríbor estable',
    description: 'El Euríbor se mantiene en su nivel actual durante toda la vida del préstamo.',
    offset: 0,
  },
  sube_1pp: {
    label: 'Euríbor sube 1 pp',
    description: 'El Euríbor sube progresivamente +1 pp y se estabiliza en ese nivel (escenario base).',
    offset: 1,
  },
  sube_2pp: {
    label: 'Euríbor sube 2 pp',
    description: 'El Euríbor sube progresivamente +2 pp y se estabiliza (escenario adverso similar a 2022-23).',
    offset: 2,
  },
}

// ─────────────────────────────────────────────────────────────────────────
// Server action principal
// ─────────────────────────────────────────────────────────────────────────

export async function calculateComparador(
  _prev: ActionState,
  form: FormData,
): Promise<ActionState> {
  const importe = parseNum(form, 'importe')
  const plazoAnios = parseNum(form, 'plazoAnios')

  const fijaTinPct = parseNum(form, 'fijaTinPct')
  const variableEuriborPct = parseNum(form, 'variableEuriborPct')
  const variableDiferencialPct = parseNum(form, 'variableDiferencialPct')

  const mixtaTramoFijoAnios = parseNum(form, 'mixtaTramoFijoAnios')
  const mixtaTinTramoFijoPct = parseNum(form, 'mixtaTinTramoFijoPct')
  const mixtaDiferencialVariablePct = parseNum(form, 'mixtaDiferencialVariablePct')

  // Validaciones
  if (importe <= 0) return { ok: false, error: 'Indica el importe a financiar.' }
  if (plazoAnios <= 0 || plazoAnios > 40)
    return { ok: false, error: 'El plazo debe estar entre 1 y 40 años.' }
  if (fijaTinPct < 0 || fijaTinPct > 15)
    return { ok: false, error: 'El TIN fijo debe estar entre 0% y 15%.' }
  if (variableEuriborPct < -2 || variableEuriborPct > 10)
    return { ok: false, error: 'El Euríbor actual fuera de rango razonable.' }
  if (variableDiferencialPct < 0 || variableDiferencialPct > 5)
    return { ok: false, error: 'El diferencial variable debe estar entre 0% y 5%.' }
  if (mixtaTramoFijoAnios < 1 || mixtaTramoFijoAnios > plazoAnios - 1)
    return { ok: false, error: `El tramo fijo de la mixta debe estar entre 1 y ${plazoAnios - 1} años.` }
  if (mixtaTinTramoFijoPct < 0 || mixtaTinTramoFijoPct > 15)
    return { ok: false, error: 'El TIN del tramo fijo mixta debe estar entre 0% y 15%.' }

  const plazoEnt = Math.round(plazoAnios)

  // Build escenarios
  const scenarios: ComparadorScenario[] = (
    Object.keys(SCENARIO_META) as EuriborScenarioKey[]
  ).map((key) => {
    const meta = SCENARIO_META[key]
    const euriborProyectado = variableEuriborPct + meta.offset

    // Fija: TIN constante toda la vida
    const tinFijaPorAnio = Array(plazoEnt).fill(fijaTinPct)
    const fijaSim = simulate(importe, plazoEnt, tinFijaPorAnio)

    // Variable: TIN = Euríbor proyectado + diferencial todos los años
    const tinVariablePorAnio = Array(plazoEnt).fill(
      euriborProyectado + variableDiferencialPct,
    )
    const variableSim = simulate(importe, plazoEnt, tinVariablePorAnio)

    // Mixta: tramo fijo + tramo variable
    const tramoFijoEnt = Math.round(mixtaTramoFijoAnios)
    const tinMixtaPorAnio = Array(plazoEnt)
      .fill(0)
      .map((_, year) =>
        year < tramoFijoEnt
          ? mixtaTinTramoFijoPct
          : euriborProyectado + mixtaDiferencialVariablePct,
      )
    const mixtaSim = simulate(importe, plazoEnt, tinMixtaPorAnio)

    const modalidades: Record<Modalidad, ModalidadResult> = {
      fija: {
        modalidad: 'fija',
        tinInicialPct: fijaTinPct,
        cuotaInicial: Math.round(fijaSim.cuotaInicial),
        cuotaPromedioProyectada: Math.round(fijaSim.cuotaPromedio),
        intereseTotalProyectado: Math.round(fijaSim.intereseTotal),
        cuotaMinima: Math.round(fijaSim.cuotaMinima),
        cuotaMaxima: Math.round(fijaSim.cuotaMaxima),
        exposicionEuribor: 'no',
      },
      variable: {
        modalidad: 'variable',
        tinInicialPct: Number((variableEuriborPct + variableDiferencialPct).toFixed(2)),
        cuotaInicial: Math.round(variableSim.cuotaInicial),
        cuotaPromedioProyectada: Math.round(variableSim.cuotaPromedio),
        intereseTotalProyectado: Math.round(variableSim.intereseTotal),
        cuotaMinima: Math.round(variableSim.cuotaMinima),
        cuotaMaxima: Math.round(variableSim.cuotaMaxima),
        exposicionEuribor: 'total',
      },
      mixta: {
        modalidad: 'mixta',
        tinInicialPct: mixtaTinTramoFijoPct,
        cuotaInicial: Math.round(mixtaSim.cuotaInicial),
        cuotaPromedioProyectada: Math.round(mixtaSim.cuotaPromedio),
        intereseTotalProyectado: Math.round(mixtaSim.intereseTotal),
        cuotaMinima: Math.round(mixtaSim.cuotaMinima),
        cuotaMaxima: Math.round(mixtaSim.cuotaMaxima),
        exposicionEuribor: 'parcial',
      },
    }

    // Quién gana en este escenario: el de menor intereseTotalProyectado
    const ganador = (Object.values(modalidades) as ModalidadResult[]).reduce((prev, curr) =>
      curr.intereseTotalProyectado < prev.intereseTotalProyectado ? curr : prev,
    ).modalidad

    const ahorroVsPeor =
      Math.max(...Object.values(modalidades).map((m) => m.intereseTotalProyectado)) -
      modalidades[ganador].intereseTotalProyectado

    const labelGanador =
      ganador === 'fija' ? 'Fija' : ganador === 'variable' ? 'Variable' : 'Mixta'

    return {
      key,
      label: meta.label,
      description: meta.description,
      euriborOffsetAnualPct: meta.offset,
      modalidades,
      ganador,
      recomendacion:
        `En este escenario gana ${labelGanador} con ${Math.round(modalidades[ganador].intereseTotalProyectado).toLocaleString('es-ES')} € en intereses totales. ` +
        `Ahorro vs la peor modalidad: ${Math.round(ahorroVsPeor).toLocaleString('es-ES')} €.`,
    }
  })

  // ───────────────────────────────────────────────────────────────────────
  // Avisos
  // ───────────────────────────────────────────────────────────────────────

  const warnings: ComparadorWarning[] = []

  // 1. Spread fija vs variable inicial
  const tinVariableInicial = variableEuriborPct + variableDiferencialPct
  const spreadFijaVariable = fijaTinPct - tinVariableInicial
  if (spreadFijaVariable < 0.3) {
    warnings.push({
      severity: 'green',
      title: `Fija muy competitiva: solo ${Math.abs(spreadFijaVariable * 100).toFixed(0)} puntos básicos por encima de la variable`,
      detail:
        'Con este spread tan bajo, fijar conviene casi siempre — la prima por predictibilidad es mínima. Si tu horizonte de permanencia es > 5 años, fija.',
    })
  } else if (spreadFijaVariable >= 1.5) {
    warnings.push({
      severity: 'amber',
      title: `Spread fija-variable alto (${spreadFijaVariable.toFixed(2)} pp)`,
      detail:
        'La fija está cara comparada con la variable. Para que compense la fija, el Euríbor debería subir significativamente y mantenerse alto durante años. Considera mixta como compromiso.',
    })
  }

  // 2. Tramo fijo de la mixta corto
  if (mixtaTramoFijoAnios < 5) {
    warnings.push({
      severity: 'amber',
      title: `Tramo fijo de la mixta corto (${Math.round(mixtaTramoFijoAnios)} años)`,
      detail:
        'Con tramo fijo de menos de 5 años quedas expuesto al Euríbor muy pronto. La mixta tiene sentido cuando el tramo fijo cubre el periodo de mayor estrés financiero (típicamente los primeros 7-10 años).',
    })
  } else if (mixtaTramoFijoAnios >= 10) {
    warnings.push({
      severity: 'green',
      title: `Tramo fijo de la mixta amplio (${Math.round(mixtaTramoFijoAnios)} años)`,
      detail:
        'Muy buen tramo. Pasas la fase de mayor estrés financiero blindado y entras al tramo variable con la hipoteca más amortizada — la sensibilidad al Euríbor es mucho menor a esa altura del préstamo.',
    })
  }

  // 3. Plazo largo en variable
  if (plazoAnios >= 25) {
    warnings.push({
      severity: 'amber',
      title: `Plazo largo (${Math.round(plazoAnios)} años) — la variable amplifica el riesgo`,
      detail:
        'En plazos >25 años la exposición acumulada al Euríbor es muy alta. La fija o la mixta con tramo fijo largo dan margen de seguridad importante. Hacer stress test con la otra calculadora ayuda a visualizarlo.',
    })
  }

  // 4. Ganador estable vs adverso
  const ganadorEstable = scenarios[0]!.ganador
  const ganadorAdverso = scenarios[2]!.ganador
  if (ganadorEstable !== ganadorAdverso) {
    warnings.push({
      severity: 'amber',
      title: `Si Euríbor estable gana ${ganadorEstable}, si sube 2pp gana ${ganadorAdverso}`,
      detail:
        'El "ganador" cambia según el escenario. Esto significa que tu decisión depende de cuánto confíes en que el Euríbor se mantendrá estable. Si tu aversión al riesgo es alta, blíndate; si crees que el Euríbor seguirá bajo, asume.',
    })
  } else {
    warnings.push({
      severity: 'green',
      title: `Modalidad ${ganadorEstable} gana en los 3 escenarios`,
      detail:
        'La misma modalidad sale mejor independientemente de cómo evolucione el Euríbor. Decisión robusta — sin sorpresas si te equivocas en la previsión de tipos.',
    })
  }

  return {
    ok: true,
    result: {
      inputs: {
        importe: Math.round(importe),
        plazoAnios: Number(plazoAnios.toFixed(1)),
        fija: { tinPct: fijaTinPct },
        variable: { euriborPct: variableEuriborPct, diferencialPct: variableDiferencialPct },
        mixta: {
          tramoFijoAnios: Math.round(mixtaTramoFijoAnios),
          tinTramoFijoPct: mixtaTinTramoFijoPct,
          diferencialVariablePct: mixtaDiferencialVariablePct,
        },
      },
      scenarios,
      warnings,
    },
  }
}
