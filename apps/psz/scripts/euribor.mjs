#!/usr/bin/env node
/**
 * Refresca el DATO DE RESPALDO del euríbor en app/euribor-actual/euribor-data.ts
 * a partir del CSV diario del Banco de España (serie TI_1_7.7, euríbor 12 m).
 *
 *   pnpm --filter psz euribor          # reescribe el bloque EURIBOR_FALLBACK
 *   pnpm --filter psz euribor --dry    # solo imprime, no toca el fichero
 *
 * La página lee el CSV en vivo en cada render (ver euribor-bde.ts); este
 * script solo evita que el respaldo envejezca. Ejecutarlo cada mes, o cuando
 * se toque la página, y hacer commit del resultado (antes, `pnpm --filter psz lastmod`).
 *
 * Replica a propósito el parseo de euribor-bde.ts (un .mjs no puede importar
 * el .ts sin compilar). Si cambia uno, cambiar el otro.
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const CSV_URL = 'https://www.bde.es/webbe/es/estadisticas/compartido/datos/csv/ti_1_7.csv'
const DATA_FILE = join(dirname(fileURLToPath(import.meta.url)), '..', 'app', 'euribor-actual', 'euribor-data.ts')
const DRY = process.argv.includes('--dry')

const MES = { ENE: 1, FEB: 2, MAR: 3, ABR: 4, MAY: 5, JUN: 6, JUL: 7, AGO: 8, SEP: 9, OCT: 10, NOV: 11, DIC: 12 }
const COL = 7
const DATE_RE = /^"(\d{2}) ([A-Z]{3}) (\d{4})"$/
const round3 = (n) => Math.round(n * 1000) / 1000

const res = await fetch(CSV_URL, { headers: { 'user-agent': 'psz.es/euribor-actual (+https://psz.es)' } })
if (!res.ok) throw new Error(`BdE respondió ${res.status}`)
const text = new TextDecoder('latin1').decode(await res.arrayBuffer())

const rows = []
for (const line of text.split(/\r?\n/)) {
  const cells = line.split(',')
  const m = DATE_RE.exec(cells[0] ?? '')
  if (!m) continue
  const raw = (cells[COL] ?? '').replace(/"/g, '').trim()
  if (raw === '' || raw === '_') continue
  const value = Number(raw)
  if (!Number.isFinite(value) || !MES[m[2]]) continue
  rows.push({ year: Number(m[3]), month: MES[m[2]], day: Number(m[1]), value })
}
rows.sort((a, b) => a.year - b.year || a.month - b.month || a.day - b.day)
const last = rows.at(-1)
if (!last) throw new Error('CSV sin datos')

const avg = (year, month, closed) => {
  const vs = rows.filter((r) => r.year === year && r.month === month).map((r) => r.value)
  if (!vs.length) return null
  return { year, month, valuePct: round3(vs.reduce((a, b) => a + b, 0) / vs.length), days: vs.length, closed }
}
const prev = (y, m) => (m === 1 ? { year: y - 1, month: 12 } : { year: y, month: m - 1 })

const today = new Date().toISOString().slice(0, 10)
const [fy, fm, fd] = today.split('-').map(Number)
const lastDayOfMonth = new Date(Date.UTC(last.year, last.month, 0)).getUTCDate()
const lastIsCurrent = last.year === fy && last.month === fm
const lastClosed = !lastIsCurrent && !(fd <= 3 && lastDayOfMonth - last.day > 1)
const current = lastIsCurrent ? avg(last.year, last.month, false) : null
const closedRef = lastClosed ? { year: last.year, month: last.month } : prev(last.year, last.month)
const closed = avg(closedRef.year, closedRef.month, true)
const prevRef = prev(closedRef.year, closedRef.month)
const previous = avg(prevRef.year, prevRef.month, true)
const bps = Math.round((closed.valuePct - previous.valuePct) * 100)
const trend = bps > 5 ? 'subiendo' : bps < -5 ? 'bajando' : 'estable'
const daily = {
  date: `${last.year}-${String(last.month).padStart(2, '0')}-${String(last.day).padStart(2, '0')}`,
  valuePct: last.value,
}

const fmtMonth = (m) =>
  m ? `{ year: ${m.year}, month: ${m.month}, valuePct: ${m.valuePct}, days: ${m.days}, closed: ${m.closed} }` : 'null'
const block = `export const EURIBOR_FALLBACK: EuriborSnapshot = {
  daily: { date: '${daily.date}', valuePct: ${daily.valuePct} },
  current: ${fmtMonth(current)},
  closed: ${fmtMonth(closed)},
  previous: ${fmtMonth(previous)},
  monthOverMonthBps: ${bps},
  trend: '${trend}',
  live: false,
  fetchedAt: '${today}',
}`

console.log(block)
if (DRY) process.exit(0)

const src = readFileSync(DATA_FILE, 'utf8')
const re = /(\/\/ EURIBOR_FALLBACK:BEGIN\n)[\s\S]*?(\n\/\/ EURIBOR_FALLBACK:END)/
if (!re.test(src)) throw new Error(`No encuentro el bloque EURIBOR_FALLBACK en ${DATA_FILE}`)
writeFileSync(DATA_FILE, src.replace(re, `$1${block}$2`))
console.log(`\nRespaldo actualizado en ${DATA_FILE}`)
