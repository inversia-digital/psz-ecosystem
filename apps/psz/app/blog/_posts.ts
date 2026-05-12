/**
 * Registro central de entradas del blog.
 * Cada slug tiene su carpeta propia en app/blog/[slug]/page.tsx con el cuerpo.
 * Aquí solo los metadatos para listar en el índice y generar sitemap.
 *
 * Cuando crucemos los 5-10 posts, se refactoriza a route dinámica + MDX.
 */

export interface PostMeta {
  slug: string
  title: string
  description: string
  category: string
  datePublished: string
  readingTime: string
  cover?: string
}

export const POSTS: PostMeta[] = [
  {
    slug: 'contrato-arras-penitenciales',
    title: 'Contrato de arras penitenciales: cómo te protege antes de la hipoteca',
    description:
      'Las arras penitenciales son el contrato que firma la mayoría de compradores antes de la hipoteca, sin saber del todo qué firman. Esta guía explica qué son, qué tipos hay, cómo te protegen y los errores que veo cada semana.',
    category: 'Contratos previos a la hipoteca',
    datePublished: '2026-05-12',
    readingTime: '7 min',
  },
  {
    slug: 'como-verificar-broker-hipotecario-banco-de-espana',
    title:
      '¿Cómo verificar si un broker hipotecario está registrado en Banco de España?',
    description:
      'Guía paso a paso para comprobar si tu broker está autorizado por el Banco de España. Registro oficial, asociación profesional, banderas rojas y mi propio número E242 como ejemplo.',
    category: 'Verificación y normativa',
    datePublished: '2026-05-12',
    readingTime: '7 min',
  },
]

export function getPostBySlug(slug: string): PostMeta | undefined {
  return POSTS.find((p) => p.slug === slug)
}
