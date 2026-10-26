#!/usr/bin/env node
/**
 * Genera app/_data/lastmod.ts con la fecha real del último cambio de cada ruta
 * pública (según git) para que el sitemap lleve un <lastmod> honesto en vez de
 * la fecha del build.
 *
 * Se ejecuta A MANO antes de hacer commit de cambios de contenido:
 *   pnpm --filter psz lastmod
 * No se ejecuta en el build de Vercel: su clon es superficial y las fechas
 * saldrían mal. El fichero generado se versiona.
 *
 * Cada ruta toma la fecha más reciente entre su carpeta y los ficheros de
 * datos de los que depende (DEPS). Las entradas del blog usan la mayor entre
 * su datePublished y el último cambio de su carpeta.
 */
import { execSync } from 'node:child_process'
import { existsSync, readdirSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const appDir = resolve(here, '..', 'app')
const out = join(appDir, '_data', 'lastmod.ts')

/** Ficheros de datos compartidos: si cambian, cambia la página que los pinta. */
const DEPS = {
  '/': ['_data/whyTono.ts'],
  '/herramientas': ['_data/herramientas.ts'],
  '/euribor-actual': ['euribor-actual/euribor-data.ts'],
  '/broker-hipotecario': ['broker-hipotecario/content.ts'],
  '/broker-hipotecario-zaragoza': ['_data/cities.ts', '_components/LocalPillar.tsx'],
  '/broker-hipotecario-madrid': ['_data/cities.ts', '_components/LocalPillar.tsx'],
  '/broker-hipotecario-barcelona': ['_data/cities.ts', '_components/LocalPillar.tsx'],
  '/broker-hipotecario-valencia': ['_data/cities.ts', '_components/LocalPillar.tsx'],
  '/broker-hipotecario-sevilla': ['_data/cities.ts', '_components/LocalPillar.tsx'],
}

/** Carpetas de app/ que no son rutas públicas del sitemap. */
const SKIP = new Set(['_components', '_data', '_lib', 'api', 'admin', 'preview', 'blog'])

function gitDate(paths) {
  const existing = paths.filter((p) => existsSync(join(appDir, p)))
  if (existing.length === 0) return null
  const args = existing.map((p) => `"${join(appDir, p)}"`).join(' ')
  const outp = execSync(`git log -1 --format=%cs -- ${args}`, { cwd: appDir }).toString().trim()
  return outp || null
}

const routes = {}
// Portada
routes['/'] = gitDate(['page.tsx', 'layout.tsx', ...(DEPS['/'] ?? [])])
// Rutas de primer nivel
for (const entry of readdirSync(appDir, { withFileTypes: true })) {
  if (!entry.isDirectory() || SKIP.has(entry.name)) continue
  const route = `/${entry.name}`
  routes[route] = gitDate([entry.name, ...(DEPS[route] ?? [])])
}
// Blog: índice y entradas
routes['/blog'] = gitDate(['blog/page.tsx', 'blog/_posts.ts'])
for (const entry of readdirSync(join(appDir, 'blog'), { withFileTypes: true })) {
  if (!entry.isDirectory()) continue
  routes[`/blog/${entry.name}`] = gitDate([`blog/${entry.name}`])
}

const lines = Object.entries(routes)
  .filter(([, d]) => d)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([r, d]) => `  '${r}': '${d}',`)

writeFileSync(
  out,
  `/**
 * Fecha real del último cambio de cada ruta (según git). GENERADO por
 * scripts/lastmod.mjs; no editar a mano. Regenerar con \`pnpm --filter psz lastmod\`
 * antes de hacer commit de cambios de contenido.
 */
export const LASTMOD: Record<string, string> = {
${lines.join('\n')}
}

/** Fecha de última modificación de una ruta; si no consta, la fecha de respaldo. */
export function lastmod(route: string, fallback: Date): Date {
  const d = LASTMOD[route]
  return d ? new Date(d) : fallback
}
`,
  'utf8',
)
console.log(`lastmod.ts: ${lines.length} rutas`)
