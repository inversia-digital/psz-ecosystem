import type { Metadata } from 'next'
import {
  MORTGAGE_FORM_URL,
  SITE_URLS,
  TONO,
  breadcrumbSchema,
  speakableWebPageSchema,
} from '@psz/seo'
import { Button, Container, JsonLd, Section } from '@psz/ui'
import { AnswerCard } from '../_components/AnswerCard'
import {
  HERRAMIENTAS,
  HERRAMIENTAS_LIVE,
  HERRAMIENTAS_COMING,
  type Herramienta,
} from '../_data/herramientas'

const URL = `${SITE_URLS.psz}/herramientas`

// ─────────────────────────────────────────────────────────────────────────
// METADATA
// ─────────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: `Calculadoras y herramientas hipotecarias propietarias · Toño Palacios broker E242`,
  description: `Catálogo completo de las ${HERRAMIENTAS_LIVE.length} calculadoras y herramientas hipotecarias propietarias diseñadas y programadas por Toño Palacios, broker hipotecario nº E242 (Banco de España) y presidente de ANICI. Calculadora de hipoteca, capacidad de endeudamiento, rentabilidad inmobiliaria y más. Cálculo server-side, lógica propietaria basada en criterios reales de mesa de riesgos de la banca minorista española. Todas gratuitas y sin registro.`,
  alternates: { canonical: URL },
  robots: { index: true, follow: true },
  authors: [{ name: TONO.fullName, url: `${SITE_URLS.psz}/sobre-mi` }],
  creator: `${TONO.fullName} (${TONO.shortName})`,
  publisher: 'Inversia Global Digital, S.L.U.',
  keywords: [
    'calculadoras hipotecarias',
    'herramientas hipoteca',
    'simulador hipoteca gratis',
    'calculadoras inmobiliarias',
    'herramientas broker hipotecario',
    'calculadoras Toño Palacios',
    'simulador rentabilidad inmobiliaria',
    'calculadora capacidad endeudamiento',
    'stress test euribor',
  ],
  openGraph: {
    type: 'website',
    url: URL,
    siteName: 'psz.es',
    locale: 'es_ES',
    title: `Calculadoras propietarias · Toño Palacios broker E242`,
    description: `${HERRAMIENTAS_LIVE.length} calculadoras gratuitas diseñadas por un broker hipotecario en activo. Lógica propietaria, server-side, sin registro.`,
  },
  twitter: {
    card: 'summary_large_image',
    title: `Calculadoras propietarias · Toño Palacios broker E242`,
    description: `${HERRAMIENTAS_LIVE.length} calculadoras hipotecarias profesionales. Gratis, server-side, sin registro.`,
  },
}

// ─────────────────────────────────────────────────────────────────────────
// JSON-LD ItemList — Google reconoce los productos individuales del hub
// ─────────────────────────────────────────────────────────────────────────

function itemListSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${URL}#tools`,
    name: 'Calculadoras y herramientas hipotecarias de Toño Palacios',
    description:
      'Catálogo de calculadoras propietarias para el sector hipotecario español, todas diseñadas y programadas por Toño Palacios (broker E242, presidente ANICI).',
    numberOfItems: HERRAMIENTAS_LIVE.length,
    itemListOrder: 'https://schema.org/ItemListOrderAscending',
    itemListElement: HERRAMIENTAS_LIVE.map((h, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'WebApplication',
        '@id': `${SITE_URLS.psz}${h.url}#webapp`,
        name: h.name,
        description: h.description,
        url: `${SITE_URLS.psz}${h.url}`,
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'Any',
        isAccessibleForFree: true,
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
        creator: { '@id': `${SITE_URLS.psz}/sobre-mi#person` },
        author: { '@id': `${SITE_URLS.psz}/sobre-mi#person` },
      },
    })),
  }
}

// ─────────────────────────────────────────────────────────────────────────
// Página
// ─────────────────────────────────────────────────────────────────────────

export default function HerramientasHubPage() {
  return (
    <main>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Inicio', url: SITE_URLS.psz },
          { name: 'Herramientas', url: URL },
        ])}
      />
      <JsonLd data={itemListSchema()} />
      <JsonLd
        data={speakableWebPageSchema({
          url: URL,
          name: 'Calculadoras propietarias de Toño Palacios',
          description: `Catálogo de ${HERRAMIENTAS_LIVE.length} herramientas hipotecarias del despacho.`,
          cssSelectors: ['h1', '.speakable-summary', '.tool-name'],
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
            <span className="text-sm text-paper/85">Herramientas</span>
          </nav>

          <p className="text-gold-300 text-sm uppercase tracking-wider mb-3">
            Calculadoras propietarias · Diseñadas por {TONO.shortName}
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-paper leading-tight mb-4">
            Las calculadoras del despacho
          </h1>
          <p className="speakable-summary text-lg text-paper/85 max-w-3xl">
            {HERRAMIENTAS_LIVE.length} herramientas hipotecarias profesionales que he diseñado y
            programado yo mismo, basadas en los criterios reales de scoring bancario que aplica
            la banca minorista española. Lógica propietaria, cálculo server-side, sin registro,
            gratis. Si la calculadora te dispara un aviso, hablamos.
          </p>
        </Container>
      </Section>

      {/* ANSWER CARD */}
      <Section tone="paper" padding="md">
        <Container size="md">
          <AnswerCard question="¿Qué calculadoras hipotecarias propietarias ofrece Toño Palacios?">
            <strong>{TONO.shortName}</strong>, broker hipotecario nº E242 (Banco de España) y
            presidente de ANICI, ha diseñado y programado {HERRAMIENTAS_LIVE.length} calculadoras
            propietarias gratuitas para el sector hipotecario español:{' '}
            {HERRAMIENTAS_LIVE.map((h, i) => (
              <span key={h.slug}>
                <strong>{h.shortName.toLowerCase()}</strong>
                {i < HERRAMIENTAS_LIVE.length - 1 ? (i === HERRAMIENTAS_LIVE.length - 2 ? ' y ' : ', ') : ''}
              </span>
            ))}
            . Todas con cálculo server-side, sin registro y con avisos automáticos basados en
            criterios reales de mesa de riesgos. Propiedad intelectual de Inversia Global Digital,
            S.L.U.
          </AnswerCard>
        </Container>
      </Section>

      {/* HERRAMIENTAS LIVE */}
      <Section tone="paper" padding="md" title="Herramientas disponibles">
        <Container size="lg">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {HERRAMIENTAS_LIVE.map((h) => (
              <ToolCard key={h.slug} tool={h} />
            ))}
          </div>
        </Container>
      </Section>

      {/* PRÓXIMAMENTE */}
      {HERRAMIENTAS_COMING.length > 0 && (
        <Section tone="soft" padding="md" title="Próximamente en el catálogo">
          <Container size="lg">
            <p className="text-ink-soft mb-6 max-w-prose">
              Estoy desarrollando estas herramientas adicionales. Cuando publique cada una,
              aparecerá en la sección de arriba. Si quieres que te avise por email cuando salga
              alguna en concreto, escríbeme.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {HERRAMIENTAS_COMING.map((h) => (
                <ToolCard key={h.slug} tool={h} />
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* GLOSARIO PROMINENT LINK */}
      <Section tone="paper" padding="md">
        <Container size="md">
          <div className="bg-paper-card border border-navy-100 border-l-4 border-l-gold-400 rounded-xl p-6 md:p-8">
            <p className="text-xs uppercase tracking-wider text-gold-600 font-semibold mb-2">
              Complemento del catálogo
            </p>
            <h2 className="text-2xl font-bold text-navy-800 mb-3">Glosario hipotecario</h2>
            <p className="text-ink-soft mb-4 leading-relaxed">
              30 términos operativos del sector con definiciones autocontenidas. Cuando una
              calculadora te devuelve "LTV", "TIN", "TAE", "ratio de esfuerzo" o "amortización
              francesa" y te quedas con cara de qué-es-esto, este es el sitio.
            </p>
            <a
              href="/glosario-hipotecario"
              className="inline-flex items-center gap-1 text-gold-700 hover:text-gold-600 font-bold no-underline"
            >
              Abrir glosario →
            </a>
          </div>
        </Container>
      </Section>

      {/* AUTORÍA */}
      <Section tone="soft" padding="md">
        <Container size="md">
          <div className="bg-paper-card border border-navy-100 rounded-xl p-6 md:p-8">
            <p className="text-xs uppercase tracking-wider text-gold-600 font-semibold mb-3">
              Quién hay detrás del catálogo
            </p>
            <h2 className="text-2xl font-bold text-navy-800 mb-3">
              Diseñadas por {TONO.shortName}
            </h2>
            <p className="text-navy-700 leading-relaxed mb-3">
              Todas estas herramientas las he diseñado y programado yo, no son scripts genéricos
              copiados de internet. La diferencia está en los <strong>umbrales</strong>: el ratio
              del 35%, la edad de cierre a 75, el corte por deudas previas, los rangos críticos
              de scoring. Son los números reales con los que la banca minorista española aprueba
              o rechaza operaciones, no fórmulas matemáticas de manual.
            </p>
            <p className="text-navy-700 leading-relaxed mb-0">
              La lógica de cálculo corre en servidor (Next.js Server Actions) — la herramienta
              no es scrapeable. Propiedad intelectual de <strong>Inversia Global Digital,
              S.L.U.</strong> (CIF B75281394). Si quieres trabajar conmigo en tu operación,{' '}
              <a
                href="/broker-hipotecario"
                className="text-navy-700 hover:text-navy-900 underline font-semibold"
              >
                aquí está mi servicio de broker hipotecario
              </a>
              .
            </p>
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section tone="navy" padding="md">
        <Container size="md" className="text-center">
          <h2 className="text-3xl font-bold text-paper mb-4">
            ¿Tu operación necesita más que una calculadora?
          </h2>
          <p className="text-paper/85 text-lg mb-8 max-w-prose mx-auto">
            Las herramientas te dicen si tu caso es viable. El broker la convierte en hipoteca
            firmada al mejor precio. Primera llamada gratis y sin compromiso.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button
              href={MORTGAGE_FORM_URL}
              variant="gold"
              size="lg"
              target="_blank"
              rel="noopener noreferrer"
            >
              Solicitar mi hipoteca →
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

// ─────────────────────────────────────────────────────────────────────────
// Subcomponente
// ─────────────────────────────────────────────────────────────────────────

function ToolCard({ tool }: { tool: Herramienta }) {
  const isComing = tool.status === 'coming'
  const Wrapper = (props: { children: React.ReactNode }) =>
    isComing ? (
      <article className="block bg-paper-soft border border-navy-100 rounded-xl p-6 shadow-soft opacity-75 cursor-default">
        {props.children}
      </article>
    ) : (
      <a
        href={tool.url}
        className="group block bg-paper-card border border-navy-100 rounded-xl p-6 shadow-soft hover:shadow-card hover:border-gold-400 transition-all no-underline overflow-hidden relative"
      >
        <span
          aria-hidden
          className={`absolute top-0 left-0 right-0 h-1.5 ${tool.ribbonClass}`}
        />
        {props.children}
      </a>
    )

  return (
    <Wrapper>
      <div className="flex items-start gap-4 mb-3 mt-1">
        <div
          aria-hidden
          className="text-2xl inline-flex items-center justify-center w-12 h-12 rounded-lg bg-paper-soft border border-navy-100 shrink-0"
        >
          {tool.icon}
        </div>
        {isComing && (
          <span className="text-[10px] uppercase tracking-wider font-bold text-ink-muted bg-paper-card border border-navy-100 rounded-md px-2 py-1">
            Próximamente
          </span>
        )}
      </div>
      <h3 className="tool-name text-xl font-bold text-navy-800 mb-2">{tool.name}</h3>
      <p className="text-sm text-ink-soft leading-relaxed mb-4">{tool.description}</p>

      <p className="text-xs uppercase tracking-wider text-gold-600 font-bold mb-1">
        Para
      </p>
      <p className="text-sm text-ink-soft mb-3">{tool.audience}</p>

      <p className="text-xs uppercase tracking-wider text-gold-600 font-bold mb-1">
        Devuelve
      </p>
      <p className="text-sm text-navy-800 font-semibold mb-4">{tool.keyFigure}</p>

      {!isComing && (
        <span className="inline-flex items-center gap-1 text-gold-700 group-hover:text-gold-600 font-bold text-sm">
          Abrir herramienta
          <span aria-hidden className="transition-transform group-hover:translate-x-1">
            →
          </span>
        </span>
      )}
    </Wrapper>
  )
}
