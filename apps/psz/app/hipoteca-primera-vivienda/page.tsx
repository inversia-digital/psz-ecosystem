import type { Metadata } from 'next'
import {
  MORTGAGE_FORM_URL,
  SITE_URLS,
  TONO,
  articleSchema,
  breadcrumbSchema,
  faqPageSchema,
  howToSchema,
  speakableWebPageSchema,
} from '@psz/seo'
import { Button, Container, CredentialBadge, Faq, JsonLd, Section } from '@psz/ui'
import { AnswerCard } from '../_components/AnswerCard'
import { PILLAR_PRIMERA_VIVIENDA } from './content'

const URL = `${SITE_URLS.psz}/hipoteca-primera-vivienda`

// ─────────────────────────────────────────────────────────────────────────
// METADATA
// ─────────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: 'Hipoteca primera vivienda 2026 · Guía del comprador primerizo en España',
  description:
    'Guía operativa de hipoteca para primera vivienda en España 2026: cuánto cash necesitas (entrada + ITP por CCAA + gastos), ayudas y avales ICO disponibles, criterios reales de scoring bancario y errores del primerizo. Por Toño Palacios, broker hipotecario nº E242 (Banco de España).',
  alternates: { canonical: URL },
  robots: { index: true, follow: true },
  authors: [{ name: TONO.fullName, url: `${SITE_URLS.psz}/sobre-mi` }],
  creator: TONO.fullName,
  publisher: 'Inversia Global Digital, S.L.U.',
  keywords: [
    'hipoteca primera vivienda',
    'hipoteca primera casa',
    'comprador primerizo hipoteca',
    'cuanto necesito para comprar primera vivienda',
    'gastos compra primera vivienda',
    'ayudas hipoteca primera vivienda',
    'aval ICO hipoteca joven',
    'hipoteca joven menores 35',
    'requisitos hipoteca primera vivienda',
    'ITP primera vivienda CCAA',
    'hipoteca verde primera vivienda',
    'FEIN hipoteca primera vivienda',
  ],
  openGraph: {
    type: 'article',
    url: URL,
    siteName: 'psz.es',
    locale: 'es_ES',
    title: 'Hipoteca primera vivienda 2026 — Guía del comprador primerizo',
    description:
      'Cuánto cash necesitas, qué ayudas aplican, cómo te valora el banco como primerizo y errores típicos. Guía operativa por Toño Palacios.',
    authors: [TONO.fullName],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hipoteca primera vivienda 2026 · psz.es',
    description:
      'Cash necesario, ayudas ICO, scoring bancario para primerizo y 8 pasos del proceso. Guía por Toño Palacios.',
  },
}

const P = PILLAR_PRIMERA_VIVIENDA

// ─────────────────────────────────────────────────────────────────────────
// Página
// ─────────────────────────────────────────────────────────────────────────

export default function HipotecaPrimeraViviendaPage() {
  return (
    <main>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Inicio', url: SITE_URLS.psz },
          { name: 'Hipoteca primera vivienda', url: URL },
        ])}
      />
      <JsonLd
        data={articleSchema({
          headline: 'Hipoteca primera vivienda 2026 — Guía del comprador primerizo en España',
          description:
            'Guía operativa para comprar tu primera vivienda en España en 2026: cash necesario por CCAA, ayudas y avales ICO, criterios reales de scoring bancario y proceso paso a paso.',
          url: URL,
          datePublished: '2026-05-14',
          dateModified: '2026-05-14',
        })}
      />
      <JsonLd data={faqPageSchema([...P.faq])} />
      <JsonLd
        data={howToSchema({
          name: 'Cómo comprar tu primera vivienda en España con hipoteca',
          description:
            'Proceso operativo paso a paso desde el cálculo de capacidad hasta la firma en notaría, conforme a la Ley 5/2019.',
          url: URL,
          totalTime: 'P8W',
          estimatedCost: { currency: 'EUR', value: 0 },
          steps: P.process.map((s) => ({ name: s.title, text: s.body })),
        })}
      />
      <JsonLd
        data={speakableWebPageSchema({
          url: URL,
          name: 'Hipoteca primera vivienda 2026',
          description:
            'Guía operativa de hipoteca para comprador primerizo en España: cash necesario, ayudas, criterios bancarios y proceso paso a paso.',
          cssSelectors: ['h1', '.speakable-summary', 'summary'],
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
            <span className="text-sm text-paper/85">Hipoteca primera vivienda</span>
          </nav>

          <p className="text-gold-300 text-sm uppercase tracking-wider mb-3">
            {P.hero.eyebrow}
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-paper leading-tight mb-4">
            {P.hero.h1}
          </h1>
          <p className="speakable-summary text-lg text-paper/85 max-w-3xl mb-6">{P.hero.sub}</p>

          <div className="flex flex-wrap gap-3 mb-8">
            <CredentialBadge
              label="BdE nº"
              value={TONO.credentials.bdeId}
              href={TONO.credentials.bdeUrl}
              hint="verificable"
              className="border-navy-700 bg-navy-800 text-paper"
            />
            <CredentialBadge
              label="Presidente"
              value="ANICI"
              href={SITE_URLS.anici}
              hint="institucional"
              className="border-navy-700 bg-navy-800 text-paper"
            />
          </div>

          <div className="flex flex-wrap gap-4">
            <Button
              href={MORTGAGE_FORM_URL}
              variant="gold"
              size="lg"
              target="_blank"
              rel="noopener noreferrer"
            >
              Solicitar mi primera hipoteca →
            </Button>
            <Button href="/calculadora-capacidad-endeudamiento" variant="primary" size="lg">
              ¿Cuánto me darían?
            </Button>
          </div>
        </Container>
      </Section>

      {/* TOC */}
      <nav aria-label="Tabla de contenidos" className="bg-paper-soft border-b border-navy-100">
        <Container size="lg" className="py-4">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-muted">
            <li><a href="#que-cambia">¿Qué cambia?</a></li>
            <li><a href="#cash">Cuánto cash necesitas</a></li>
            <li><a href="#ayudas">Ayudas 2026</a></li>
            <li><a href="#scoring">Cómo te valora el banco</a></li>
            <li><a href="#errores">Errores típicos</a></li>
            <li><a href="#fija-variable">Fija o variable</a></li>
            <li><a href="#proceso">Proceso paso a paso</a></li>
            <li><a href="#faq">FAQ</a></li>
          </ul>
        </Container>
      </nav>

      {/* ANSWER CARD */}
      <Section tone="paper" padding="md">
        <Container size="md">
          <AnswerCard question="¿Cuánto dinero necesito para comprar mi primera vivienda con hipoteca en España?">
            Entre el <strong>28% y el 32% del precio del inmueble</strong> en efectivo demostrable:
            20% de entrada (porque la banca financia hasta 80% LTV en primera vivienda), el ITP
            según comunidad autónoma (4-13%), 1-2% de gastos de cierre (notaría, registro,
            gestoría) y 1-2% de colchón. En 2026 hay además aval estatal del ICO para menores de
            35 años o familias con menores, que avala hasta el 20% para llegar al 95-100% LTV.
          </AnswerCard>
        </Container>
      </Section>

      {/* QUÉ CAMBIA */}
      <Section id="que-cambia" tone="paper" padding="md" title={P.whatChanges.title}>
        <Container size="md">
          <p className="text-lg text-ink-soft mb-6">{P.whatChanges.intro}</p>
          <div className="space-y-4">
            {P.whatChanges.items.map((item, i) => (
              <article
                key={i}
                className="bg-paper-card border border-navy-100 border-l-4 border-l-gold-400 rounded-lg p-5 shadow-soft"
              >
                <h3 className="text-lg font-bold text-navy-800 mb-2">{item.title}</h3>
                <p className="text-ink-soft leading-relaxed">{item.body}</p>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      {/* CASH NEEDED */}
      <Section id="cash" tone="soft" padding="md" title={P.cashNeeded.title}>
        <Container size="md">
          <p className="text-lg text-ink-soft mb-4">{P.cashNeeded.intro}</p>
          <div className="prose-psz">
            {P.cashNeeded.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          {/* Tabla por CCAA */}
          <div className="mt-8 bg-paper-card border border-navy-100 rounded-xl overflow-hidden">
            <p className="px-6 py-4 bg-navy-50 border-b border-navy-100 text-sm font-bold text-navy-800">
              {P.cashNeeded.table.title}
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-paper-soft text-navy-800">
                  <tr>
                    {P.cashNeeded.table.headers.map((h) => (
                      <th key={h} className="text-left px-4 py-3 font-semibold">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {P.cashNeeded.table.rows.map((row, i) => (
                    <tr
                      key={i}
                      className="border-t border-navy-100 hover:bg-paper-soft transition-colors"
                    >
                      {row.map((cell, j) => (
                        <td key={j} className="px-4 py-3 text-ink-soft">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="px-6 py-3 bg-paper-soft border-t border-navy-100 text-xs text-ink-muted leading-relaxed">
              {P.cashNeeded.table.footnote}
            </p>
          </div>

          <div className="mt-8 bg-gold-50 border border-gold-300 rounded-lg p-5">
            <p className="text-sm text-navy-800">
              <strong>¿Necesitas la cuenta exacta para tu caso?</strong> Usa la{' '}
              <a
                href="/calculadora-capacidad-endeudamiento"
                className="text-navy-700 hover:text-navy-900 underline font-semibold"
              >
                calculadora de capacidad de endeudamiento
              </a>{' '}
              para ver tu precio máximo según tu aporte propio, o la{' '}
              <a
                href="/calculadora-hipoteca"
                className="text-navy-700 hover:text-navy-900 underline font-semibold"
              >
                calculadora de hipoteca
              </a>{' '}
              para simular cuota e intereses totales de una operación concreta.
            </p>
          </div>
        </Container>
      </Section>

      {/* AYUDAS */}
      <Section id="ayudas" tone="paper" padding="md" title={P.aids.title}>
        <Container size="md">
          <p className="text-lg text-ink-soft mb-6">{P.aids.intro}</p>
          <div className="grid md:grid-cols-2 gap-4">
            {P.aids.items.map((item, i) => (
              <article
                key={i}
                className="bg-paper-card border border-navy-100 border-t-4 border-t-emerald-500 rounded-lg p-5 shadow-soft"
              >
                <h3 className="text-lg font-bold text-navy-800 mb-2">{item.title}</h3>
                <p className="text-ink-soft leading-relaxed text-sm">{item.body}</p>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      {/* SCORING BANCARIO */}
      <Section id="scoring" tone="soft" padding="md" title={P.bankScoring.title}>
        <Container size="md">
          <div className="prose-psz mb-6">
            {P.bankScoring.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <div className="bg-paper-card border border-navy-100 rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-navy-800 text-paper">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold">Criterio</th>
                  <th className="text-left px-4 py-3 font-semibold">Umbral típico</th>
                  <th className="text-left px-4 py-3 font-semibold">Detalle</th>
                </tr>
              </thead>
              <tbody>
                {P.bankScoring.criteria.map((c, i) => (
                  <tr key={i} className="border-t border-navy-100">
                    <td className="px-4 py-3 font-semibold text-navy-800 whitespace-nowrap">{c.name}</td>
                    <td className="px-4 py-3 text-gold-700 font-semibold whitespace-nowrap">{c.value}</td>
                    <td className="px-4 py-3 text-ink-soft">{c.detail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </Section>

      {/* ERRORES */}
      <Section id="errores" tone="paper" padding="md" title={P.mistakes.title}>
        <Container size="md">
          <div className="space-y-4">
            {P.mistakes.items.map((item, i) => (
              <article
                key={i}
                className="bg-paper-card border border-navy-100 border-l-4 border-l-red-400 rounded-lg p-5 shadow-soft"
              >
                <h3 className="text-lg font-bold text-navy-800 mb-2">
                  <span className="text-red-500 mr-2">{i + 1}.</span>
                  {item.title}
                </h3>
                <p className="text-ink-soft leading-relaxed">{item.body}</p>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      {/* FIJA VS VARIABLE VS MIXTA */}
      <Section id="fija-variable" tone="soft" padding="md" title={P.mortgageType.title}>
        <Container size="md">
          <p className="text-lg text-ink-soft mb-6">{P.mortgageType.intro}</p>
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            {P.mortgageType.types.map((t, i) => (
              <article
                key={i}
                className="bg-paper-card border border-navy-100 rounded-xl p-5 shadow-soft"
              >
                <h3 className="text-xl font-bold text-navy-800 mb-3">{t.name}</h3>
                <p className="text-xs uppercase tracking-wider text-gold-600 font-bold mb-1">
                  Encaja si
                </p>
                <p className="text-sm text-ink-soft mb-3">{t.whenItFits}</p>
                <p className="text-xs uppercase tracking-wider text-emerald-700 font-bold mb-1">
                  A favor
                </p>
                <p className="text-sm text-ink-soft mb-3">{t.upside}</p>
                <p className="text-xs uppercase tracking-wider text-red-700 font-bold mb-1">
                  En contra
                </p>
                <p className="text-sm text-ink-soft">{t.downside}</p>
              </article>
            ))}
          </div>
          <div className="bg-gold-50 border border-gold-300 rounded-lg p-5">
            <p className="text-sm text-navy-800 leading-relaxed">
              <strong>Mi recomendación operativa:</strong> {P.mortgageType.recommendation}
            </p>
          </div>
        </Container>
      </Section>

      {/* PROCESO PASO A PASO */}
      <Section id="proceso" tone="paper" padding="md" title="Proceso paso a paso (8 pasos · 4-8 semanas)">
        <Container size="md">
          <ol className="space-y-4">
            {P.process.map((s) => (
              <li
                key={s.n}
                className="flex gap-5 bg-paper-soft p-5 rounded-lg border border-navy-100"
              >
                <span className="text-3xl font-bold text-gold-500 shrink-0 w-12 text-center">
                  {s.n}
                </span>
                <div>
                  <h3 className="text-lg font-bold text-navy-800 mb-1">{s.title}</h3>
                  <p className="text-ink-soft leading-relaxed">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {/* FAQ */}
      <Section id="faq" tone="soft" padding="md" title="Preguntas frecuentes sobre hipoteca para primera vivienda">
        <Container size="md">
          <Faq items={[...P.faq]} />
        </Container>
      </Section>

      {/* INTERNAL LINKING */}
      <Section tone="paper" padding="md" title="Herramientas y servicios relacionados">
        <Container size="lg">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <a
              href="/calculadora-capacidad-endeudamiento"
              className="block bg-paper-card border border-navy-100 rounded-xl p-6 hover:border-gold-400 hover:shadow-card transition-all no-underline"
            >
              <p className="text-xs uppercase tracking-wider text-gold-600 font-semibold mb-2">
                Herramienta
              </p>
              <h3 className="text-lg font-semibold text-navy-800 mb-2">
                Capacidad de endeudamiento
              </h3>
              <p className="text-sm text-ink-soft">
                Primer paso del proceso. ¿Cuánto te daría realmente el banco? 3 escenarios.
              </p>
            </a>

            <a
              href="/calculadora-hipoteca"
              className="block bg-paper-card border border-navy-100 rounded-xl p-6 hover:border-gold-400 hover:shadow-card transition-all no-underline"
            >
              <p className="text-xs uppercase tracking-wider text-gold-600 font-semibold mb-2">
                Herramienta
              </p>
              <h3 className="text-lg font-semibold text-navy-800 mb-2">Calculadora de hipoteca</h3>
              <p className="text-sm text-ink-soft">
                Una vez tengas oferta, simula cuota, intereses, LTV y ratio de esfuerzo.
              </p>
            </a>

            <a
              href="/broker-hipotecario"
              className="block bg-paper-card border border-navy-100 rounded-xl p-6 hover:border-gold-400 hover:shadow-card transition-all no-underline"
            >
              <p className="text-xs uppercase tracking-wider text-gold-600 font-semibold mb-2">
                Servicio
              </p>
              <h3 className="text-lg font-semibold text-navy-800 mb-2">Broker hipotecario</h3>
              <p className="text-sm text-ink-soft">
                Si tu perfil no es estándar o ya te rechazaron, llámame antes de seguir.
              </p>
            </a>

            <a
              href="/como-funciona-ley-5-2019"
              className="block bg-paper-card border border-navy-100 rounded-xl p-6 hover:border-gold-400 hover:shadow-card transition-all no-underline"
            >
              <p className="text-xs uppercase tracking-wider text-gold-600 font-semibold mb-2">
                Pilar regulatorio
              </p>
              <h3 className="text-lg font-semibold text-navy-800 mb-2">
                Cómo funciona la Ley 5/2019
              </h3>
              <p className="text-sm text-ink-soft">
                La norma que regula tu hipoteca. FEIN, acta notarial, derechos del consumidor.
              </p>
            </a>
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section tone="navy" padding="lg">
        <Container size="md" className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-paper mb-4">
            ¿Vamos con tu primera hipoteca?
          </h2>
          <p className="text-paper/85 text-lg mb-8 max-w-prose mx-auto">
            Si quieres que estudie tu caso, te diga a qué bancos podemos presentarlo y negocie las
            condiciones por ti, escríbeme. Primera llamada gratis y sin compromiso. Reserva
            inicial 600 € al firmar el contrato de intermediación; honorarios a éxito entre tres
            mil y cuatro mil quinientos euros al cierre.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button
              href={MORTGAGE_FORM_URL}
              variant="gold"
              size="lg"
              target="_blank"
              rel="noopener noreferrer"
            >
              Solicitar mi primera hipoteca →
            </Button>
            <Button href="/broker-hipotecario" variant="primary" size="lg">
              Ver servicio de broker
            </Button>
          </div>
        </Container>
      </Section>
    </main>
  )
}
