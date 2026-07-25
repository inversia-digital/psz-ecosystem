#!/usr/bin/env node
/**
 * IndexNow — notifica a Bing (y por tanto al buscador de ChatGPT), Yandex, etc.
 * de las URLs de psz.es para acelerar su rastreo e indexación.
 *
 * Bing es el índice que usa la búsqueda web de ChatGPT: estar en Bing es
 * requisito para que ChatGPT pueda citar el sitio. IndexNow es la vía de
 * notificación instantánea (no sustituye a darse de alta en Bing Webmaster
 * Tools, pero acelera el descubrimiento).
 *
 * Uso:
 *   node scripts/indexnow-submit.mjs            # envía todas las URLs del sitemap
 *   node scripts/indexnow-submit.mjs <url> ...  # envía URLs concretas
 *
 * La key debe estar publicada en https://psz.es/<KEY>.txt (fichero en public/).
 */

const KEY = '306838afd27223eca8061e2ca445a103'
const HOST = 'psz.es'
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`
const SITEMAP = `https://${HOST}/sitemap.xml`
const ENDPOINT = 'https://api.indexnow.org/indexnow'

async function urlsFromSitemap() {
  const res = await fetch(SITEMAP, { headers: { 'User-Agent': 'psz-indexnow/1.0' } })
  if (!res.ok) throw new Error(`sitemap ${res.status}`)
  const xml = await res.text()
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim())
}

async function main() {
  const args = process.argv.slice(2)
  const urlList = args.length ? args : await urlsFromSitemap()
  if (!urlList.length) {
    console.error('Sin URLs que enviar.')
    process.exit(1)
  }
  const body = {
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList,
  }
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(body),
  })
  console.log(`IndexNow -> HTTP ${res.status} (${res.statusText}) · ${urlList.length} URLs`)
  // 200 y 202 = aceptado. 422 = key/host mismatch. 403 = key no válida en keyLocation.
  if (res.status >= 400) {
    console.error(await res.text())
    process.exit(1)
  }
}

main().catch((e) => {
  console.error('Error IndexNow:', e.message)
  process.exit(1)
})
