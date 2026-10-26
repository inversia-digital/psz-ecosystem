/**
 * Lectura del euríbor a 12 meses desde el CSV diario del Banco de España.
 * Solo se ejecuta en servidor (render de /euribor-actual). Ver euribor-data.ts
 * para el mecanismo completo. scripts/euribor.mjs replica el parseo para
 * refrescar el respaldo desde la línea de comandos.
 */
import {
  BDE_CSV_URL,
  EURIBOR_FALLBACK,
  type EuriborMonth,
  type EuriborSnapshot,
} from './euribor-data'

/** 12 h: el BdE actualiza el CSV una vez al día (día hábil) */
export const EURIBOR_REVALIDATE_SECONDS = 43200

const MES: Record<string, number> = {
  ENE: 1, FEB: 2, MAR: 3, ABR: 4, MAY: 5, JUN: 6,
  JUL: 7, AGO: 8, SEP: 9, OCT: 10, NOV: 11, DIC: 12,
}
/** Columna 7 del CSV = serie TI_1_7.7, «Euríbor a 12 meses» */
const COL_EURIBOR_12M = 7
const DATE_RE = /^"(\d{2}) ([A-Z]{3}) (\d{4})"$/

export interface DailyRow {
  year: number
  month: number
  day: number
  value: number
}

const round3 = (n: number) => Math.round(n * 1000) / 1000

/** Parsea el CSV (latin-1 ya decodificado) y devuelve los días hábiles con dato, ordenados. */
export function parseBdeCsv(text: string): DailyRow[] {
  const rows: DailyRow[] = []
  for (const line of text.split(/\r?\n/)) {
    const cells = line.split(',')
    const m = DATE_RE.exec(cells[0] ?? '')
    if (!m) continue
    const raw = (cells[COL_EURIBOR_12M] ?? '').replace(/"/g, '').trim()
    if (raw === '' || raw === '_') continue
    const value = Number(raw)
    const month = MES[m[2] ?? '']
    if (!Number.isFinite(value) || !month) continue
    rows.push({ year: Number(m[3]), month, day: Number(m[1]), value })
  }
  rows.sort((a, b) => a.year - b.year || a.month - b.month || a.day - b.day)
  return rows
}

function monthAverage(rows: DailyRow[], year: number, month: number, closed: boolean): EuriborMonth | null {
  const vs = rows.filter((r) => r.year === year && r.month === month).map((r) => r.value)
  if (vs.length === 0) return null
  return { year, month, valuePct: round3(vs.reduce((a, b) => a + b, 0) / vs.length), days: vs.length, closed }
}

const prevMonth = (year: number, month: number) =>
  month === 1 ? { year: year - 1, month: 12 } : { year, month: month - 1 }

/** Días naturales que faltan hasta fin del mes de una fila */
function daysUntilMonthEnd(r: DailyRow) {
  const lastDay = new Date(Date.UTC(r.year, r.month, 0)).getUTCDate()
  return lastDay - r.day
}

/** Construye el snapshot a partir de las filas diarias. Lanza si algo no cuadra. */
export function buildSnapshot(rows: DailyRow[], fetchedAt: string): EuriborSnapshot {
  const last = rows[rows.length - 1]
  if (!last) throw new Error('CSV sin filas de euríbor 12M')
  if (last.value < -5 || last.value > 15) throw new Error(`Valor diario fuera de rango: ${last.value}`)

  const daily = {
    date: `${last.year}-${String(last.month).padStart(2, '0')}-${String(last.day).padStart(2, '0')}`,
    valuePct: last.value,
  }
  if (daily.date < EURIBOR_FALLBACK.daily.date) {
    throw new Error(`El CSV es más antiguo que el respaldo (${daily.date} < ${EURIBOR_FALLBACK.daily.date})`)
  }

  // El mes del último dato está cerrado si hoy ya es otro mes, salvo que
  // estemos en los primeros días y aún puedan faltar los últimos hábiles
  // (el BdE publica cada día con uno o dos días de retraso).
  const [fy = 0, fm = 0, fd = 0] = fetchedAt.split('-').map(Number)
  const lastIsCurrentMonth = last.year === fy && last.month === fm
  const lastMonthClosed = !lastIsCurrentMonth && !(fd <= 3 && daysUntilMonthEnd(last) > 1)

  const current = lastIsCurrentMonth ? monthAverage(rows, last.year, last.month, false) : null
  const closedRef = lastMonthClosed ? { year: last.year, month: last.month } : prevMonth(last.year, last.month)
  const closed = monthAverage(rows, closedRef.year, closedRef.month, true)
  const prevRef = prevMonth(closedRef.year, closedRef.month)
  const previous = monthAverage(rows, prevRef.year, prevRef.month, true)
  if (!closed || !previous) throw new Error('Faltan medias mensuales en el CSV')

  const monthOverMonthBps = Math.round((closed.valuePct - previous.valuePct) * 100)
  const trend = monthOverMonthBps > 5 ? 'subiendo' : monthOverMonthBps < -5 ? 'bajando' : 'estable'

  return { daily, current, closed, previous, monthOverMonthBps, trend, live: true, fetchedAt }
}

const todayIso = () => new Date().toISOString().slice(0, 10)

/**
 * Devuelve el euríbor vivo desde el BdE; si falla, el respaldo de
 * euribor-data.ts con `live: false`.
 */
export async function getEuribor(): Promise<EuriborSnapshot> {
  try {
    const res = await fetch(BDE_CSV_URL, {
      next: { revalidate: EURIBOR_REVALIDATE_SECONDS },
      headers: { 'user-agent': 'psz.es/euribor-actual (+https://psz.es)' },
    })
    if (!res.ok) throw new Error(`BdE respondió ${res.status}`)
    const text = new TextDecoder('latin1').decode(await res.arrayBuffer())
    return buildSnapshot(parseBdeCsv(text), todayIso())
  } catch (err) {
    console.warn('[euribor-actual] usando respaldo:', err instanceof Error ? err.message : err)
    return { ...EURIBOR_FALLBACK, live: false }
  }
}
