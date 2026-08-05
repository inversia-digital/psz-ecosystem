import type { MetadataRoute } from 'next'
import { SITE_URLS } from '@psz/seo'
import { POSTS, isLive } from './blog/_posts'

export const revalidate = 21600

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const blogPosts: MetadataRoute.Sitemap = POSTS.filter((p) => isLive(p.datePublished)).map((p) => ({
    url: `${SITE_URLS.psz}/blog/${p.slug}`,
    lastModified: new Date(p.datePublished),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [
    { url: SITE_URLS.psz, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    {
      url: `${SITE_URLS.psz}/sobre-mi`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.95,
    },
    {
      url: `${SITE_URLS.psz}/broker-hipotecario`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.95,
    },
    {
      url: `${SITE_URLS.psz}/hipoteca-primera-vivienda`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${SITE_URLS.psz}/hipoteca-inversor`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${SITE_URLS.psz}/canal-telegram-inversion-inmobiliaria`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${SITE_URLS.psz}/hipoteca-no-residentes`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${SITE_URLS.psz}/hipoteca-autonomos`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${SITE_URLS.psz}/tipos-de-hipoteca`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${SITE_URLS.psz}/euribor-actual`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${SITE_URLS.psz}/glosario-hipotecario`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URLS.psz}/estructuras-societarias`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${SITE_URLS.psz}/broker-hipotecario-zaragoza`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${SITE_URLS.psz}/broker-hipotecario-madrid`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${SITE_URLS.psz}/broker-hipotecario-barcelona`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${SITE_URLS.psz}/broker-hipotecario-valencia`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${SITE_URLS.psz}/broker-hipotecario-sevilla`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${SITE_URLS.psz}/personal-shopper-inmobiliario-zaragoza`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${SITE_URLS.psz}/preguntas-frecuentes`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${SITE_URLS.psz}/como-funciona-ley-5-2019`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.85,
    },
    {
      url: `${SITE_URLS.psz}/alta-ici-banco-espana`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${SITE_URLS.psz}/herramientas`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${SITE_URLS.psz}/calculadora-hipoteca`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.85,
    },
    {
      url: `${SITE_URLS.psz}/calculadora-rentabilidad-inmobiliaria`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.85,
    },
    {
      url: `${SITE_URLS.psz}/calculadora-capacidad-endeudamiento`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.85,
    },
    {
      url: `${SITE_URLS.psz}/calculadora-stress-test-euribor`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${SITE_URLS.psz}/calculadora-seguro-vida-hipoteca`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${SITE_URLS.psz}/comparador-hipoteca-fija-variable-mixta`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${SITE_URLS.psz}/blog`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    ...blogPosts,
    {
      url: `${SITE_URLS.psz}/contacto`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    // Legales — incluidas pero baja prioridad
    {
      url: `${SITE_URLS.psz}/aviso-legal`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${SITE_URLS.psz}/politica-privacidad`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${SITE_URLS.psz}/cookies`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${SITE_URLS.psz}/terminos`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    { url: `${SITE_URLS.psz}/tarifas-y-comisiones`, lastModified: now, changeFrequency: 'yearly', priority: 0.4 },
    { url: `${SITE_URLS.psz}/informacion-pre-contractual`, lastModified: now, changeFrequency: 'yearly', priority: 0.4 },
    { url: `${SITE_URLS.psz}/reclamaciones`, lastModified: now, changeFrequency: 'yearly', priority: 0.4 },
    { url: `${SITE_URLS.psz}/codigo-de-conducta`, lastModified: now, changeFrequency: 'yearly', priority: 0.4 },
    { url: `${SITE_URLS.psz}/disclaimer-estructuras-internacionales`, lastModified: now, changeFrequency: 'yearly', priority: 0.4 },
    { url: `${SITE_URLS.psz}/condiciones-inarpa`, lastModified: now, changeFrequency: 'yearly', priority: 0.5 },
  ]
}
