'use server'

/**
 * Server Action: calculateMortgage
 *
 * IMPORTANTE: este archivo se ejecuta EXCLUSIVAMENTE en el servidor.
 * El código de las fórmulas y los rangos críticos NUNCA llega al navegador
 * del visitante. Solo viaja el resultado ya calculado y los textos de los
 * warnings que el resultado dispara.
 *
 * Esto protege la propiedad intelectual real: no las fórmulas matemáticas
 * (públicas) sino los rangos críticos y las interpretaciones aprendidas
 * en años de práctica como broker.
 *
 * Propiedad de Inversia Global Digital, S.L.U. — Toño Palacios.
 * Prohibida su reproducción sin autorización expresa.
 */

// ─────────────────────────────────────────────────────────────────────────
// Tipos públicos (los que llegan al cliente como resultado)
// ─────────────────────────────────────────────────────────────────────────

export interface MortgageWarning {
  severity: 'info' | 'warning' | 'danger' | 'success'
  title: string
  body: string
}

export interface MortgageResult {
  /** Inputs validados, devueltos para mostrar resumen */
  inputs: {
    precioInmueble: number
    importeFinanciar: number
    plazoAnios: number
    tinPct: number
    ingresosNetosMensuales: number
  }
  /** Cálculo principal */
  cuotaMensual: number
  totalIntereses: number
  costeTotal: number
  ltvPct: number
  ratioEsfuerzoPct: number
  /** Warnings disparados según los rangos críticos */
  warnings: MortgageWarning[]
}

export type ActionState =
  | { ok: true; result: MortgageResult }
  | { ok: false; error: string }
  | null

// ─────────────────────────────────────────────────────────────────────────
// FÓRMULA — amortización francesa (pública desde el siglo XIX)
// ─────────────────────────────────────────────────────────────────────────

function cuotaAmortizacionFrancesa(
  capital: number,
  tinAnual: number,
  plazoMeses: number,
): number {
  if (tinAnual === 0) return capital / plazoMeses
  const i = tinAnual / 100 / 12
  return (capital * i) / (1 - Math.pow(1 + i, -plazoMeses))
}

// ─────────────────────────────────────────────────────────────────────────
// RANGOS CRÍTICOS — PROPIETARIOS (10+ años de práctica del broker)
// Estos NO son fórmulas matemáticas; son interpretaciones aprendidas.
// ─────────────────────────────────────────────────────────────────────────

function generarWarnings(
  ltvPct: number,
  ratioEsfuerzoPct: number,
  plazoAnios: number,
  tinPct: number,
): MortgageWarning[] {
  const warnings: MortgageWarning[] = []

  // Ratio de esfuerzo (cuota sobre ingresos)
  if (ratioEsfuerzoPct > 50) {
    warnings.push({
      severity: 'danger',
      title: `Cuota = ${ratioEsfuerzoPct.toFixed(1)}% de tus ingresos`,
      body:
        'Cuota financiera superior al 50% del ingreso neto. El scoring de prácticamente cualquier banco te rechazará en la primera fase. Habría que revisar plazo, importe o avalistas antes de presentar.',
    })
  } else if (ratioEsfuerzoPct > 35) {
    warnings.push({
      severity: 'warning',
      title: `Cuota = ${ratioEsfuerzoPct.toFixed(1)}% de tus ingresos`,
      body:
        'Alto riesgo de rechazo por scoring estándar. Depende de tu perfil podemos incrementar al 40% defendiendo tu caso ante el banco — bonificaciones, otros ingresos, garantías adicionales. Mira mi servicio de broker para estos casos.',
    })
  } else if (ratioEsfuerzoPct < 25) {
    warnings.push({
      severity: 'success',
      title: `Cuota = ${ratioEsfuerzoPct.toFixed(1)}% de tus ingresos`,
      body:
        'Ratio de esfuerzo cómodo. Los bancos suelen estar dispuestos a mejorar diferencial y eliminar vinculaciones en perfiles con esta holgura. Margen real de negociación.',
    })
  }

  // LTV
  if (ltvPct > 100) {
    warnings.push({
      severity: 'danger',
      title: `LTV = ${ltvPct.toFixed(1)}% — quieres financiar más que el precio`,
      body:
        'Estás solicitando más dinero que el precio del inmueble. Eso solo lo aceptan bancos en casos muy concretos (compra + reforma con presupuesto cerrado, segunda residencia con ITP financiado). Requiere expediente especializado.',
    })
  } else if (ltvPct > 80) {
    warnings.push({
      severity: 'warning',
      title: `LTV = ${ltvPct.toFixed(1)}% — por encima del 80%`,
      body:
        'Posiblemente necesitemos avalista, estudiamos tu caso. Algunos bancos llegan al 90-100% con seguro de prima única o avalistas familiares, pero el coste real sube. No es imposible — sí exige saber a qué banco presentarte.',
    })
  }

  // Plazo
  if (plazoAnios > 35) {
    warnings.push({
      severity: 'warning',
      title: `Plazo = ${plazoAnios} años`,
      body:
        'Se puede hacer, quizá necesitemos avalista, no lo sabemos aún. Por encima de 35 años la banca tradicional rara vez lo aprueba sin garantías adicionales. Bancos digitales y específicos sí lo aceptan en perfiles jóvenes.',
    })
  } else if (plazoAnios > 30) {
    warnings.push({
      severity: 'info',
      title: `Plazo = ${plazoAnios} años`,
      body:
        'Se puede hacer, quizá necesitemos avalista, no lo sabemos aún. La banca tradicional limita el plazo a 30-35 años según edad del titular al vencimiento. Lo estudiamos.',
    })
  }

  // TIN
  if (tinPct > 5) {
    warnings.push({
      severity: 'danger',
      title: `TIN = ${tinPct.toFixed(2)}% — muy por encima de mercado`,
      body:
        'TIN claramente por encima de la mediana actual. Algo está mal: o la oferta es abusiva o tu perfil necesita reforzarse. Negociamos con +20 entidades para bajarlo a rangos sanos.',
    })
  } else if (tinPct > 4.5) {
    warnings.push({
      severity: 'warning',
      title: `TIN = ${tinPct.toFixed(2)}%`,
      body:
        'Fuera de la mediana de mercado actual. Probablemente puedes renegociar con tu propio banco si llevas tiempo o presentarte a otras entidades. Diferenciales de 0,2-0,4 puntos sobre la TIN suelen estar disponibles para perfiles solventes.',
    })
  } else if (tinPct < 2.5 && tinPct > 0) {
    warnings.push({
      severity: 'success',
      title: `TIN = ${tinPct.toFixed(2)}% — buena referencia`,
      body:
        'Excelente referencia de mercado. Si esta TIN ya está confirmada por un banco, asegúrate de que la FEIN la sostiene y de que no hay vinculaciones ocultas que la suban en la práctica.',
    })
  }

  return warnings
}

// ─────────────────────────────────────────────────────────────────────────
// Server Action
// ─────────────────────────────────────────────────────────────────────────

export async function calculateMortgage(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  // Parse + validar inputs
  const precioInmueble = num(formData.get('precioInmueble'))
  const importeFinanciar = num(formData.get('importeFinanciar'))
  const plazoAnios = num(formData.get('plazoAnios'))
  const tinPct = num(formData.get('tinPct'))
  const ingresosNetosMensuales = num(formData.get('ingresosNetosMensuales'))

  if (
    !validPositive(precioInmueble) ||
    !validPositive(importeFinanciar) ||
    !validPositive(plazoAnios) ||
    tinPct === null ||
    tinPct < 0 ||
    !validPositive(ingresosNetosMensuales)
  ) {
    return { ok: false, error: 'Rellena todos los campos con valores válidos (mayores que cero).' }
  }
  if (plazoAnios > 50) {
    return { ok: false, error: 'Plazo máximo razonable: 50 años.' }
  }
  if (tinPct > 25) {
    return { ok: false, error: 'TIN no realista. Revisa el valor.' }
  }

  const plazoMeses = plazoAnios * 12
  const cuotaMensual = cuotaAmortizacionFrancesa(importeFinanciar, tinPct, plazoMeses)
  const totalPagado = cuotaMensual * plazoMeses
  const totalIntereses = totalPagado - importeFinanciar
  const costeTotal = totalPagado
  const ltvPct = (importeFinanciar / precioInmueble) * 100
  const ratioEsfuerzoPct = (cuotaMensual / ingresosNetosMensuales) * 100

  const warnings = generarWarnings(ltvPct, ratioEsfuerzoPct, plazoAnios, tinPct)

  return {
    ok: true,
    result: {
      inputs: {
        precioInmueble,
        importeFinanciar,
        plazoAnios,
        tinPct,
        ingresosNetosMensuales,
      },
      cuotaMensual: round2(cuotaMensual),
      totalIntereses: round2(totalIntereses),
      costeTotal: round2(costeTotal),
      ltvPct: round2(ltvPct),
      ratioEsfuerzoPct: round2(ratioEsfuerzoPct),
      warnings,
    },
  }
}

// ─────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────

function num(v: FormDataEntryValue | null): number | null {
  if (typeof v !== 'string') return null
  const trimmed = v.trim().replace(',', '.')
  if (!trimmed) return null
  const n = Number(trimmed)
  return Number.isFinite(n) ? n : null
}

function validPositive(v: number | null): v is number {
  return v !== null && v > 0
}

function round2(n: number): number {
  return Math.round(n * 100) / 100
}
