/**
 * Benchmarks de referencia para comparar la rentabilidad inmobiliaria.
 *
 * Datos hardcodeados con revisión periódica. Mismo patrón que la tabla ITP.
 * Actualizar manualmente cada 3 meses.
 */

/**
 * Rentabilidad del bono del estado español a 10 años.
 * Es el activo libre de riesgo de referencia para un residente español.
 * Si una inversión inmobiliaria rinde menos que esto, no compensa el
 * riesgo añadido (morosidad, vacancia, gestión, ciclo del mercado).
 */
export const BONO_10Y_ES = {
  yieldPct: 3.53,
  asOf: 'mayo 2026',
  nextReview: 'agosto 2026',
  source: 'Tesoro Público · BCE',
}
