/**
 * Euríbor a 12 meses: tipos, formato y DATO DE RESPALDO.
 *
 * CÓMO SE ACTUALIZA LA PÁGINA /euribor-actual
 * ------------------------------------------
 * 1. En tiempo de render, `euribor-bde.ts` descarga el CSV diario del Banco
 *    de España (serie TI_1_7.7, «Euríbor a 12 meses», un valor por día
 *    hábil) y calcula:
 *      - el último dato diario publicado,
 *      - la media del mes en curso (provisional),
 *      - la media del último mes cerrado (es el dato mensual oficial que
 *        usan las revisiones de hipoteca: media aritmética simple de los
 *        valores diarios del mes),
 *      - la variación respecto al mes anterior y la tendencia.
 *    Next.js cachea esa descarga 12 h (`next: { revalidate: 43200 }`) y la
 *    página se regenera con la misma cadencia, así que el dato nunca tiene
 *    más de medio día de retraso sin que nadie toque nada.
 * 2. Si el BdE no responde o el CSV viene raro, la página usa
 *    `EURIBOR_FALLBACK` (este fichero) y lo dice en el pie del dato.
 * 3. Para que el respaldo no envejezca, cada mes (o cuando se toque esta
 *    página) se ejecuta `pnpm --filter psz euribor`, que descarga el CSV,
 *    reescribe el bloque `EURIBOR_FALLBACK` y lo imprime. Después, commit.
 *
 * Fuente: Banco de España, estadísticas de tipos de interés, cuadro 1.7
 * (mercados monetarios), columna «Euríbor a 12 meses».
 *   Página: https://www.bde.es/webbe/es/estadisticas/temas/tipos-interes.html
 *   CSV:    https://www.bde.es/webbe/es/estadisticas/compartido/datos/csv/ti_1_7.csv
 */

export const BDE_CSV_URL =
  'https://www.bde.es/webbe/es/estadisticas/compartido/datos/csv/ti_1_7.csv'
export const BDE_PAGE_URL = 'https://www.bde.es/webbe/es/estadisticas/temas/tipos-interes.html'
export const BDE_SOURCE_LABEL = 'Banco de España (tipos de interés, cuadro 1.7, euríbor a 12 meses)'

export interface EuriborDaily {
  /** Fecha ISO (AAAA-MM-DD) del último día hábil con dato */
  date: string
  /** Valor en %, tres decimales como lo publica el BdE */
  valuePct: number
}

export interface EuriborMonth {
  year: number
  /** 1-12 */
  month: number
  /** Media aritmética simple de los días hábiles del mes, tres decimales */
  valuePct: number
  /** Días hábiles con dato incluidos en la media */
  days: number
  /** true si el mes ya ha terminado (la media es definitiva) */
  closed: boolean
}

export interface EuriborSnapshot {
  daily: EuriborDaily
  /** Mes en curso, media provisional; null si el mes aún no tiene ningún dato */
  current: EuriborMonth | null
  /** Último mes cerrado: el dato mensual que se aplica a las revisiones */
  closed: EuriborMonth
  /** Mes anterior al cerrado, para la variación */
  previous: EuriborMonth
  /** Variación de la media cerrada respecto al mes anterior, en puntos básicos */
  monthOverMonthBps: number
  trend: 'subiendo' | 'bajando' | 'estable'
  /** true si los datos vienen del CSV del BdE; false si es el respaldo de este fichero */
  live: boolean
  /** Fecha ISO (AAAA-MM-DD) en que se leyó el CSV (o se escribió el respaldo) */
  fetchedAt: string
}

// ─── RESPALDO ────────────────────────────────────────────────────────────
// Lo reescribe `pnpm --filter psz euribor`. No editar a mano salvo urgencia.
// EURIBOR_FALLBACK:BEGIN
export const EURIBOR_FALLBACK: EuriborSnapshot = {
  daily: { date: '2026-10-23', valuePct: 3.267 },
  current: { year: 2026, month: 10, valuePct: 3.227, days: 17, closed: false },
  closed: { year: 2026, month: 9, valuePct: 3.247, days: 22, closed: true },
  previous: { year: 2026, month: 8, valuePct: 2.954, days: 21, closed: true },
  monthOverMonthBps: 29,
  trend: 'subiendo',
  live: false,
  fetchedAt: '2026-10-26',
}
// EURIBOR_FALLBACK:END

// ─── HITOS ───────────────────────────────────────────────────────────────
/**
 * Puntos de inflexión del euríbor a 12 meses (medias mensuales del BdE).
 * No es la serie completa: son los meses que explican el nivel actual.
 * El último hito se completa en render con el último mes cerrado.
 */
export interface EuriborMilestone {
  label: string
  valuePct: number
  context: string
}

export const EURIBOR_HISTORY: EuriborMilestone[] = [
  { label: 'Julio 2008', valuePct: 5.393, context: 'Máximo histórico, justo antes de la crisis financiera' },
  { label: 'Diciembre 2012', valuePct: 0.549, context: 'Mínimos tras la crisis de deuda del euro' },
  { label: 'Febrero 2016', valuePct: -0.008, context: 'Primer mes en negativo' },
  { label: 'Enero 2021', valuePct: -0.505, context: 'Mínimo histórico, en plena pandemia' },
  { label: 'Diciembre 2022', valuePct: 3.018, context: 'Subida abrupta: el BCE sube tipos para frenar la inflación' },
  { label: 'Octubre 2023', valuePct: 4.16, context: 'Pico del ciclo de subidas del BCE' },
  { label: 'Diciembre 2024', valuePct: 2.436, context: 'Ciclo de bajadas del BCE' },
  { label: 'Julio 2025', valuePct: 2.079, context: 'Mínimo del ciclo de bajadas' },
  { label: 'Febrero 2026', valuePct: 2.221, context: 'Último mes antes del repunte de 2026' },
]

// ─── FORMATO ─────────────────────────────────────────────────────────────
export const MONTHS_ES = [
  'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
  'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre',
] as const

/** «3,267%» (tres decimales, coma decimal) */
export const formatPct = (n: number, decimals = 3) => `${n.toFixed(decimals).replace('.', ',')}%`

/** «+29 pb» */
export const formatBps = (n: number) => `${n > 0 ? '+' : ''}${n} pb`

/** «septiembre de 2026» */
export const monthLabel = (m: Pick<EuriborMonth, 'year' | 'month'>) =>
  `${MONTHS_ES[m.month - 1]} de ${m.year}`

/** «23 de octubre de 2026» a partir de una fecha ISO */
export const dateLabel = (iso: string) => {
  const [y = 0, m = 1, d = 0] = iso.split('-').map(Number)
  return `${d} de ${MONTHS_ES[m - 1]} de ${y}`
}

/** «23 oct 2026» (para títulos cortos) */
export const dateShort = (iso: string) => {
  const [y = 0, m = 1, d = 0] = iso.split('-').map(Number)
  return `${d} ${(MONTHS_ES[m - 1] ?? '').slice(0, 3)} ${y}`
}

/** Mes siguiente a uno dado */
export const nextMonth = (m: Pick<EuriborMonth, 'year' | 'month'>) =>
  m.month === 12 ? { year: m.year + 1, month: 1 } : { year: m.year, month: m.month + 1 }
