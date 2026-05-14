import type { Metadata } from 'next'
import {
  SITE_URLS,
  TONO,
  breadcrumbSchema,
  definedTermSetSchema,
  speakableWebPageSchema,
} from '@psz/seo'
import { Button, Container, JsonLd, Section } from '@psz/ui'
import { AnswerCard } from '../_components/AnswerCard'
import { GLOSARIO_CATEGORIAS, GLOSARIO_TERMS, type GlosarioCategoria } from './content'

const URL = `${SITE_URLS.psz}/glosario-hipotecario`

// ─────────────────────────────────────────────────────────────────────────
// METADATA
// ─────────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: `Glosario hipotecario · ${GLOSARIO_TERMS.length} términos operativos del sector`,
  description: `Glosario completo de términos hipotecarios y de crédito inmobiliario en España: LTV, TIN, TAE, FEIN, ITP, AJD, Euríbor, ratio de esfuerzo, scoring bancario, subrogación, novación y más. ${GLOSARIO_TERMS.length} definiciones operativas <100 palabras autocontenidas. Por Toño Palacios, broker hipotecario nº E242.`,
  alternates: { canonical: URL },
  robots: { index: true, follow: true },
  authors: [{ name: TONO.fullName, url: `${SITE_URLS.psz}/sobre-mi` }],
  creator: TONO.fullName,
  publisher: 'Inversia Global Digital, S.L.U.',
  keywords: [
    'glosario hipotecario',
    'términos hipoteca',
    'que es LTV hipoteca',
    'que es TIN y TAE',
    'que es FEIN',
    'que es ITP AJD',
    'glosario crédito inmobiliario',
    'diccionario hipotecario',
    'jerga banca hipotecaria',
    'definiciones hipoteca',
    'que es Euríbor',
    'subrogación novación hipoteca',
  ],
  openGraph: {
    type: 'website',
    url: URL,
    siteName: 'psz.es',
    locale: 'es_ES',
    title: `Glosario hipotecario · ${GLOSARIO_TERMS.length} términos operativos`,
    description: 'Definiciones autocontenidas de la jerga hipotecaria española. LTV, TIN, TAE, FEIN, ITP, AJD, Euríbor y más.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Glosario hipotecario · psz.es',
    description: `${GLOSARIO_TERMS.length} términos operativos del sector, por Toño Palacios broker E242.`,
  },
}

// Ordenación alfabética para el render
const TERMS_SORTED = [...GLOSARIO_TERMS].sort((a, b) => a.name.localeCompare(b.name, 'es'))

// Letras inicales únicas para el índice (saltamos artículos y siglas)
const FIRST_LETTERS = Array.from(
  new Set(TERMS_SORTED.map((t) => normalizeFirstLetter(t.name))),
).sort((a, b) => a.localeCompare(b, 'es'))

function normalizeFirstLetter(name: string): string {
  // Quita acentos y devuelve la primera letra en mayúscula
  return name
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .charAt(0)
    .toUpperCase()
}

// ─────────────────────────────────────────────────────────────────────────
// Página
// ─────────────────────────────────────────────────────────────────────────

export default function GlosarioPage() {
  return (
    <main>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Inicio', url: SITE_URLS.psz },
          { name: 'Glosario hipotecario', url: URL },
        ])}
      />
      <JsonLd
        data={definedTermSetSchema({
          url: URL,
          name: 'Glosario hipotecario · psz.es',
          description: `Colección de ${GLOSARIO_TERMS.length} términos operativos del sector hipotecario español: conceptos financieros, documentos, fiscalidad, operativa y regulación. Definiciones <100 palabras autocontenidas, citables literal por motores de IA y voice search.`,
          terms: GLOSARIO_TERMS.map((t) => ({
            slug: t.slug,
            name: t.name,
            description: t.description,
            url: t.externalRef?.url,
          })),
        })}
      />
      <JsonLd
        data={speakableWebPageSchema({
          url: URL,
          name: 'Glosario hipotecario',
          description: `Glosario operativo de ${GLOSARIO_TERMS.length} términos del sector hipotecario español, autocontenidos y citables.`,
          cssSelectors: ['h1', '.speakable-summary', '.term-name', '.term-description'],
        })}
      />

      {/* HERO */}
      <Section tone="navy" padding="lg">
        <Container size="lg">
          <nav aria-label="Migas de pan" className="mb-6">
            <a
              href="/"
              className="inline-flex items-center gap-1.5 text-sm text-paper/65 hover:text-gold-300 no-underline transition-colors"
            >
              <span aria-hidden>←</span> Inicio
            </a>
            <span className="text-paper/30 mx-2" aria-hidden>›</span>
            <span className="text-sm text-paper/85">Glosario hipotecario</span>
          </nav>

          <p className="text-gold-300 text-sm uppercase tracking-wider mb-3">
            Diccionario operativo del sector · {GLOSARIO_TERMS.length} términos
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-paper leading-tight mb-4">
            Glosario hipotecario
          </h1>
          <p className="speakable-summary text-lg text-paper/85 max-w-3xl">
            Definiciones operativas, no de manual: cómo se usan estos términos en el día a día
            de una hipoteca en España. Cada entrada está pensada como respuesta autocontenida
            que un asistente de IA puede citar literal sin contexto adicional.
          </p>
        </Container>
      </Section>

      {/* ÍNDICE alfabético */}
      <Section tone="paper" padding="sm">
        <Container size="lg">
          <p className="text-xs uppercase tracking-wider text-gold-700 font-bold mb-3">
            Salta a la letra
          </p>
          <div className="flex flex-wrap gap-2">
            {FIRST_LETTERS.map((letter) => (
              <a
                key={letter}
                href={`#letra-${letter.toLowerCase()}`}
                className="inline-flex items-center justify-center w-9 h-9 bg-paper-card border border-navy-100 rounded-md text-navy-800 font-bold hover:border-gold-400 hover:bg-gold-50 transition-colors no-underline"
              >
                {letter}
              </a>
            ))}
          </div>
        </Container>
      </Section>

      {/* ANSWER CARD */}
      <Section tone="soft" padding="md">
        <Container size="md">
          <AnswerCard question="¿Qué términos hipotecarios necesito conocer antes de firmar?">
            En cualquier hipoteca española vas a leer al menos 6 conceptos clave: <strong>LTV</strong> (cuánto te
            presta el banco sobre el valor del inmueble), <strong>TIN</strong> (tipo nominal sin comisiones),{' '}
            <strong>TAE</strong> (tipo efectivo con todo incluido), <strong>FEIN</strong> (la oferta vinculante),{' '}
            <strong>ITP</strong> (el impuesto autonómico de la compra) y <strong>ratio de esfuerzo</strong>{' '}
            (cuánto puedes pagar al mes según ingresos). Este glosario los desgrana todos junto con otros 25
            términos operativos que aparecen en cualquier expediente hipotecario.
          </AnswerCard>
        </Container>
      </Section>

      {/* CATEGORÍAS — leyenda */}
      <Section tone="paper" padding="sm">
        <Container size="lg">
          <p className="text-xs uppercase tracking-wider text-ink-muted font-bold mb-3">
            Categorías temáticas
          </p>
          <div className="flex flex-wrap gap-2">
            {(Object.keys(GLOSARIO_CATEGORIAS) as GlosarioCategoria[]).map((cat) => (
              <span
                key={cat}
                className={`inline-block px-3 py-1 text-xs font-semibold rounded-md border ${GLOSARIO_CATEGORIAS[cat].color}`}
              >
                {GLOSARIO_CATEGORIAS[cat].label}
              </span>
            ))}
          </div>
        </Container>
      </Section>

      {/* TÉRMINOS — agrupados por letra inicial */}
      <Section tone="paper" padding="md">
        <Container size="lg">
          {FIRST_LETTERS.map((letter) => {
            const termsForLetter = TERMS_SORTED.filter(
              (t) => normalizeFirstLetter(t.name) === letter,
            )
            return (
              <div key={letter} className="mb-10 last:mb-0">
                <div
                  id={`letra-${letter.toLowerCase()}`}
                  className="flex items-baseline gap-3 mb-4 border-b-2 border-navy-100 pb-2"
                >
                  <h2 className="text-3xl font-bold text-gold-500">{letter}</h2>
                  <span className="text-xs text-ink-muted uppercase tracking-wider">
                    {termsForLetter.length} término{termsForLetter.length === 1 ? '' : 's'}
                  </span>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {termsForLetter.map((term) => {
                    const cat = GLOSARIO_CATEGORIAS[term.categoria]
                    return (
                      <article
                        key={term.slug}
                        id={term.slug}
                        className="bg-paper-card border border-navy-100 rounded-xl p-5 shadow-soft scroll-mt-20"
                      >
                        <div className="flex flex-wrap items-start gap-2 mb-2">
                          <h3 className="term-name text-lg font-bold text-navy-800 leading-tight flex-1">
                            {term.name}
                          </h3>
                          <span
                            className={`inline-block px-2 py-0.5 text-[10px] font-semibold rounded-md border whitespace-nowrap ${cat.color}`}
                          >
                            {cat.label}
                          </span>
                        </div>
                        <p className="term-description text-sm text-ink-soft leading-relaxed mb-3">
                          {term.description}
                        </p>

                        {/* Links relacionados internos del glosario */}
                        {term.relatedSlugs && term.relatedSlugs.length > 0 && (
                          <p className="text-xs text-ink-muted">
                            <span className="font-semibold">Relacionado:</span>{' '}
                            {term.relatedSlugs.map((slug, i) => {
                              const related = GLOSARIO_TERMS.find((t) => t.slug === slug)
                              if (!related) return null
                              return (
                                <span key={slug}>
                                  <a
                                    href={`#${slug}`}
                                    className="text-navy-700 hover:text-navy-900 underline"
                                  >
                                    {related.name.split(' ')[0]}
                                  </a>
                                  {i < term.relatedSlugs!.length - 1 ? ' · ' : ''}
                                </span>
                              )
                            })}
                          </p>
                        )}

                        {/* Páginas internas en profundidad */}
                        {term.relatedPages && term.relatedPages.length > 0 && (
                          <p className="text-xs text-gold-700 font-semibold mt-2">
                            {term.relatedPages.map((p, i) => (
                              <span key={p.href}>
                                <a href={p.href} className="hover:text-gold-600 underline">
                                  {p.label} →
                                </a>
                                {i < term.relatedPages!.length - 1 ? ' · ' : ''}
                              </span>
                            ))}
                          </p>
                        )}

                        {/* Referencia externa autoritativa */}
                        {term.externalRef && (
                          <p className="text-xs text-ink-muted mt-2">
                            Fuente:{' '}
                            <a
                              href={term.externalRef.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-navy-700 hover:text-navy-900 underline"
                            >
                              {term.externalRef.label} ↗
                            </a>
                          </p>
                        )}
                      </article>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </Container>
      </Section>

      {/* CTA */}
      <Section tone="navy" padding="lg">
        <Container size="md" className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-paper mb-4">
            ¿No encuentras un término?
          </h2>
          <p className="text-paper/85 text-lg mb-8 max-w-prose mx-auto">
            Si te has topado con jerga hipotecaria que no aparece en este glosario, escríbeme y
            la añado. El sector usa muchos eufemismos y términos técnicos — este glosario crece
            con cada operación.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button href="/contacto" variant="gold" size="lg">
              Proponer un término
            </Button>
            <Button href="/broker-hipotecario" variant="primary" size="lg">
              Ver mi servicio de broker
            </Button>
          </div>
        </Container>
      </Section>
    </main>
  )
}
