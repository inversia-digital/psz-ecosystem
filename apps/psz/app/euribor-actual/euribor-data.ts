/**
 * Valor del Euríbor 12M — fuente única de verdad.
 *
 * Versión v1: constante manual revisada mensualmente. La fuente oficial
 * es el Banco de España (publicación mensual del valor medio del Euríbor
 * 12M del mes anterior).
 *
 * v2 (futuro): cron job que descarga el valor desde la API del BdE y
 * actualiza este fichero. Por ahora la actualización es manual durante
 * la primera semana de cada mes.
 *
 * Mantenimiento: revisar este valor entre los días 1-5 de cada mes
 * cuando el BdE publica el dato oficial del mes anterior.
 *
 * Fuente oficial: Boletín Estadístico del Banco de España, Cuadro 19.5
 * (https://www.bde.es/webbde/es/estadis/infoest/htmls/tipos/tipos.html)
 */

export interface EuriborSnapshot {
  /** Valor en %, dos decimales */
  valuePct: number
  /** Mes y año del dato (es la media del mes anterior, ya cerrada) */
  asOf: string
  /** Para qué mes aplica este valor en revisiones */
  appliesTo: string
  /** Variación respecto al mes anterior, en puntos básicos (positivos = sube) */
  monthOverMonthBps: number
  /** Tendencia leíble por humanos */
  trend: 'subiendo' | 'bajando' | 'estable'
  /** Próxima revisión mensual */
  nextReview: string
  /** Fuente */
  source: string
  sourceUrl: string
}

export const EURIBOR_12M: EuriborSnapshot = {
  valuePct: 2.45,
  asOf: 'abril 2026',
  appliesTo: 'revisiones de mayo 2026',
  monthOverMonthBps: -8,
  trend: 'bajando',
  nextReview: 'primera semana de junio 2026',
  source: 'Banco de España (Boletín Estadístico, cuadro 19.5)',
  sourceUrl: 'https://www.bde.es/webbde/es/estadis/infoest/htmls/tipos/tipos.html',
}

/**
 * Histórico de hitos del Euríbor 12M para contextualizar visualmente.
 * No es serie completa — son los puntos de inflexión que la mayoría de
 * la gente recuerda y que ayudan a entender la situación actual.
 */
export interface EuriborMilestone {
  year: string
  valuePct: number
  context: string
}

export const EURIBOR_HISTORY: EuriborMilestone[] = [
  { year: '2008', valuePct: 5.39, context: 'Pico antes de la crisis financiera global' },
  { year: '2010', valuePct: 1.53, context: 'Recuperación tras el rescate bancario español' },
  { year: '2016', valuePct: -0.07, context: 'Primera vez en territorio negativo (BCE)' },
  { year: '2020', valuePct: -0.50, context: 'Mínimo histórico durante COVID-19' },
  { year: '2022', valuePct: 3.02, context: 'Subida abrupta por inflación post-pandemia' },
  { year: '2023', valuePct: 4.16, context: 'Pico tras subidas agresivas del BCE' },
  { year: '2024', valuePct: 3.15, context: 'Inicio del ciclo de bajadas del BCE' },
  { year: '2025', valuePct: 2.68, context: 'Normalización gradual de tipos' },
  { year: '2026', valuePct: EURIBOR_12M.valuePct, context: 'Valor actual' },
]
