import type { MetadataRoute } from 'next'
import { SITE_URLS } from '@psz/seo'
import { POSTS, isLive } from './blog/_posts'
import { lastmod } from './_data/lastmod'

export const revalidate = 21600

export default function sitemap(): MetadataRoute.Sitemap {
  // Fecha real del último cambio de cada ruta (app/_data/lastmod.ts, generado
  // desde git con `pnpm --filter psz lastmod`). Antes todas llevaban la fecha
  // del build, que no es un lastmod honesto.
  const now = new Date()
  const mod = (path: string, fallback: Date = now) => lastmod(path, fallback)
  const blogPosts: MetadataRoute.Sitemap = POSTS.filter((p) => isLive(p.datePublished)).map((p) => ({
    url: `${SITE_URLS.psz}/blog/${p.slug}`,
    lastModified: mod(`/blog/${p.slug}`, new Date(p.datePublished)),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [
    { url: SITE_URLS.psz, lastModified: mod('/'), changeFrequency: 'weekly', priority: 1.0 },
    {
      url: `${SITE_URLS.psz}/sobre-mi`,
      lastModified: mod('/sobre-mi'),
      changeFrequency: 'monthly',
      priority: 0.95,
    },
    {
      url: `${SITE_URLS.psz}/broker-hipotecario`,
      lastModified: mod('/broker-hipotecario'),
      changeFrequency: 'monthly',
      priority: 0.95,
    },
    {
      url: `${SITE_URLS.psz}/hipoteca-primera-vivienda`,
      lastModified: mod('/hipoteca-primera-vivienda'),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${SITE_URLS.psz}/hipoteca-inversor`,
      lastModified: mod('/hipoteca-inversor'),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${SITE_URLS.psz}/canal-telegram-inversion-inmobiliaria`,
      lastModified: mod('/canal-telegram-inversion-inmobiliaria'),
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${SITE_URLS.psz}/hipoteca-no-residentes`,
      lastModified: mod('/hipoteca-no-residentes'),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${SITE_URLS.psz}/hipoteca-autonomos`,
      lastModified: mod('/hipoteca-autonomos'),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${SITE_URLS.psz}/tipos-de-hipoteca`,
      lastModified: mod('/tipos-de-hipoteca'),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${SITE_URLS.psz}/euribor-actual`,
      lastModified: mod('/euribor-actual'),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${SITE_URLS.psz}/glosario-hipotecario`,
      lastModified: mod('/glosario-hipotecario'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URLS.psz}/estructuras-societarias`,
      lastModified: mod('/estructuras-societarias'),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${SITE_URLS.psz}/broker-hipotecario-zaragoza`,
      lastModified: mod('/broker-hipotecario-zaragoza'),
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${SITE_URLS.psz}/broker-hipotecario-madrid`,
      lastModified: mod('/broker-hipotecario-madrid'),
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${SITE_URLS.psz}/broker-hipotecario-barcelona`,
      lastModified: mod('/broker-hipotecario-barcelona'),
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${SITE_URLS.psz}/broker-hipotecario-valencia`,
      lastModified: mod('/broker-hipotecario-valencia'),
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${SITE_URLS.psz}/broker-hipotecario-sevilla`,
      lastModified: mod('/broker-hipotecario-sevilla'),
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    // /personal-shopper-inmobiliario-zaragoza no existe (404): retirada del sitemap el 26-oct-2026.
    {
      url: `${SITE_URLS.psz}/preguntas-frecuentes`,
      lastModified: mod('/preguntas-frecuentes'),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${SITE_URLS.psz}/como-funciona-ley-5-2019`,
      lastModified: mod('/como-funciona-ley-5-2019'),
      changeFrequency: 'yearly',
      priority: 0.85,
    },
    {
      url: `${SITE_URLS.psz}/alta-ici-banco-espana`,
      lastModified: mod('/alta-ici-banco-espana'),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${SITE_URLS.psz}/herramientas`,
      lastModified: mod('/herramientas'),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${SITE_URLS.psz}/calculadora-hipoteca`,
      lastModified: mod('/calculadora-hipoteca'),
      changeFrequency: 'yearly',
      priority: 0.85,
    },
    {
      url: `${SITE_URLS.psz}/calculadora-rentabilidad-inmobiliaria`,
      lastModified: mod('/calculadora-rentabilidad-inmobiliaria'),
      changeFrequency: 'yearly',
      priority: 0.85,
    },
    {
      url: `${SITE_URLS.psz}/calculadora-capacidad-endeudamiento`,
      lastModified: mod('/calculadora-capacidad-endeudamiento'),
      changeFrequency: 'yearly',
      priority: 0.85,
    },
    {
      url: `${SITE_URLS.psz}/calculadora-stress-test-euribor`,
      lastModified: mod('/calculadora-stress-test-euribor'),
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${SITE_URLS.psz}/calculadora-seguro-vida-hipoteca`,
      lastModified: mod('/calculadora-seguro-vida-hipoteca'),
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${SITE_URLS.psz}/comparador-hipoteca-fija-variable-mixta`,
      lastModified: mod('/comparador-hipoteca-fija-variable-mixta'),
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${SITE_URLS.psz}/blog`,
      lastModified: mod('/blog'),
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    ...blogPosts,
    {
      url: `${SITE_URLS.psz}/contacto`,
      lastModified: mod('/contacto'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    // Legales — incluidas pero baja prioridad
    {
      url: `${SITE_URLS.psz}/aviso-legal`,
      lastModified: mod('/aviso-legal'),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${SITE_URLS.psz}/politica-privacidad`,
      lastModified: mod('/politica-privacidad'),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${SITE_URLS.psz}/cookies`,
      lastModified: mod('/cookies'),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${SITE_URLS.psz}/terminos`,
      lastModified: mod('/terminos'),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    { url: `${SITE_URLS.psz}/tarifas-y-comisiones`, lastModified: mod('/tarifas-y-comisiones'), changeFrequency: 'yearly', priority: 0.4 },
    { url: `${SITE_URLS.psz}/informacion-pre-contractual`, lastModified: mod('/informacion-pre-contractual'), changeFrequency: 'yearly', priority: 0.4 },
    { url: `${SITE_URLS.psz}/reclamaciones`, lastModified: mod('/reclamaciones'), changeFrequency: 'yearly', priority: 0.4 },
    { url: `${SITE_URLS.psz}/codigo-de-conducta`, lastModified: mod('/codigo-de-conducta'), changeFrequency: 'yearly', priority: 0.4 },
    { url: `${SITE_URLS.psz}/disclaimer-estructuras-internacionales`, lastModified: mod('/disclaimer-estructuras-internacionales'), changeFrequency: 'yearly', priority: 0.4 },
    { url: `${SITE_URLS.psz}/condiciones-inarpa`, lastModified: mod('/condiciones-inarpa'), changeFrequency: 'yearly', priority: 0.5 },
  ]
}
