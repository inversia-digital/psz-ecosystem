import type { Metadata } from 'next'
import { SITE_URLS, breadcrumbSchema } from '@psz/seo'
import { Container, JsonLd, Section } from '@psz/ui'
import { POSTS } from './_posts'

const URL = `${SITE_URLS.psz}/blog`

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Artículos sobre hipotecas, inversión inmobiliaria y regulación del crédito inmobiliario, firmados por Toño Palacios (broker hipotecario nº E242, presidente de ANICI).',
  alternates: { canonical: URL },
  openGraph: {
    url: URL,
    title: 'Blog · Toño Palacios broker hipotecario',
    description:
      'Hipotecas, inversión inmobiliaria y regulación del crédito inmobiliario, sin promesas vacías.',
    type: 'website',
    locale: 'es_ES',
  },
}

export default function BlogIndexPage() {
  return (
    <main>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Inicio', url: SITE_URLS.psz },
          { name: 'Blog', url: URL },
        ])}
      />

      <Section
        tone="navy"
        padding="lg"
        eyebrow="Blog"
        title="Hipotecas, inversión inmobiliaria y regulación"
        lead={
          <span className="text-paper/80">
            Sin promesas vacías. Artículos firmados, datos verificables, casos reales.
          </span>
        }
      >
        <Container size="lg" />
      </Section>

      <Section tone="paper" padding="md">
        <Container size="lg">
          {POSTS.length === 0 ? (
            <p className="text-center text-ink-muted py-10">
              No hay artículos publicados todavía.
            </p>
          ) : (
            <ul className="space-y-6">
              {POSTS.map((p) => (
                <li key={p.slug}>
                  <article className="bg-paper-card border border-navy-100 rounded-xl p-6 md:p-8 shadow-soft hover:shadow-card transition-shadow">
                    <div className="flex flex-wrap items-center gap-3 mb-3 text-sm">
                      <span className="text-gold-600 font-semibold uppercase tracking-wider text-xs">
                        {p.category}
                      </span>
                      <span className="text-ink-muted">·</span>
                      <time className="text-ink-muted" dateTime={p.datePublished}>
                        {formatDate(p.datePublished)}
                      </time>
                      <span className="text-ink-muted">·</span>
                      <span className="text-ink-muted">{p.readingTime}</span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-3 text-navy-800">
                      <a href={`/blog/${p.slug}`} className="no-underline hover:text-navy-900">
                        {p.title}
                      </a>
                    </h2>
                    <p className="text-ink-soft mb-4">{p.description}</p>
                    <a
                      href={`/blog/${p.slug}`}
                      className="inline-flex items-center gap-1 text-navy-700 hover:text-navy-900 font-medium"
                    >
                      Leer artículo completo →
                    </a>
                  </article>
                </li>
              ))}
            </ul>
          )}
        </Container>
      </Section>
    </main>
  )
}

function formatDate(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })
}
