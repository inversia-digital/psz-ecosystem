import type { Metadata } from 'next'
import {
  MORTGAGE_FORM_URL,
  SITE_URLS,
  TONO,
  articleSchema,
  breadcrumbSchema,
  faqPageSchema,
  speakableWebPageSchema,
} from '@psz/seo'
import {
  Button,
  Container,
  CredentialBadge,
  Faq,
  JsonLd,
  Section,
} from '@psz/ui'
import { AnswerCard } from '../_components/AnswerCard'
import { LegalDisclaimer } from '../_components/LegalDisclaimer'
import { PILLAR_HIPOTECA_INVERSOR } from './content'

const URL = `${SITE_URLS.psz}/hipoteca-inversor`

// ─────────────────────────────────────────────────────────────────────────
// METADATA
// ─────────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: 'Hipoteca inversor 2026 · LTV, plazos y fiscalidad real · Toño Palacios broker E242',
  description:
    'Guía operativa de hipoteca para inversor inmobiliario en España 2026: LTV reales para inversión (60-70%, no 80%), por qué los plazos se acortan a 25 años, cash necesario por operación (38-48% del precio), criterios reales de scoring para inversor recurrente, qué inmuebles financia la banca y cuáles no, hipoteca personal vs sociedad (SL patrimonial, SOCIMI), errores típicos. Por Toño Palacios, broker hipotecario nº E242 (Banco de España) y presidente de ANICI.',
  alternates: { canonical: URL },
  robots: { index: true, follow: true },
  authors: [{ name: TONO.fullName, url: `${SITE_URLS.psz}/sobre-mi` }],
  creator: `${TONO.fullName} (${TONO.shortName})`,
  publisher: 'Inversia Global Digital, S.L.U.',
  keywords: [
    'hipoteca inversor',
    'hipoteca inversion inmobiliaria',
    'hipoteca segunda vivienda',
    'LTV inversion inmobiliaria',
    'hipoteca alquiler',
    'hipoteca SL patrimonial',
    'hipoteca sociedad inversion',
    'SOCIMI hipoteca',
    'fiscalidad alquiler IRPF',
    'cash-on-cash inmobiliario',
    'rentabilidad real vs cash on cash',
    'apalancamiento inmobiliario optimo',
  ],
  openGraph: {
    type: 'article',
    url: URL,
    siteName: 'psz.es',
    locale: 'es_ES',
    title: 'Hipoteca inversor — Guía operativa por Toño Palacios broker E242',
    description:
      'LTV reales, plazos, fiscalidad, hipoteca personal vs sociedad, errores del inversor. Por Toño Palacios broker hipotecario E242.',
    authors: [TONO.fullName],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hipoteca inversor · psz.es',
    description: 'LTV reales, plazos, fiscalidad, hipoteca personal vs sociedad. Por Toño Palacios broker E242.',
  },
}

const P = PILLAR_HIPOTECA_INVERSOR

// ─────────────────────────────────────────────────────────────────────────
// Página
// ─────────────────────────────────────────────────────────────────────────

export default function HipotecaInversorPage() {
  return (
    <main>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Inicio', url: SITE_URLS.psz },
          { name: 'Hipoteca inversor', url: URL },
        ])}
      />
      <JsonLd
        data={articleSchema({
          headline: 'Hipoteca para inversión inmobiliaria en España 2026',
          description:
            'Guía operativa de hipoteca para inversor inmobiliario en España: LTV reales, plazos, fiscalidad, hipoteca personal vs sociedad, qué inmuebles financia la banca y errores típicos del inversor.',
          url: URL,
          datePublished: '2026-05-14',
          dateModified: '2026-05-14',
        })}
      />
      <JsonLd data={faqPageSchema([...P.faq])} />
      <JsonLd
        data={speakableWebPageSchema({
          url: URL,
          name: 'Hipoteca inversor en España',
          description:
            'Guía operativa de hipoteca para inversor inmobiliario: LTV reales, plazos, fiscalidad y errores típicos.',
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
            <span className="text-sm text-paper/85">Hipoteca inversor</span>
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
              Solicitar análisis de operación →
            </Button>
            <Button
              href="/calculadora-rentabilidad-inmobiliaria"
              variant="primary"
              size="lg"
            >
              Calcular rentabilidad
            </Button>
          </div>
        </Container>
      </Section>

      {/* TOC */}
      <nav aria-label="Tabla de contenidos" className="bg-paper-soft border-b border-navy-100">
        <Container size="lg" className="py-4">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-muted">
            <li><a href="#diferencias">Vs primera vivienda</a></li>
            <li><a href="#cash">Cash necesario</a></li>
            <li><a href="#scoring">Cómo te valora el banco</a></li>
            <li><a href="#personal-sociedad">Personal vs sociedad</a></li>
            <li><a href="#inmuebles">Qué inmuebles financia</a></li>
            <li><a href="#errores">Errores típicos</a></li>
            <li><a href="#faq">FAQ</a></li>
          </ul>
        </Container>
      </nav>

      {/* ANSWER CARD */}
      <Section tone="paper" padding="md">
        <Container size="md">
          <AnswerCard question="¿Cómo es una hipoteca para inversión inmobiliaria en España?">
            La banca minorista española financia inversión inmobiliaria con <strong>LTV del
            60-70%</strong> (no 80% como en primera vivienda habitual), plazo máximo de{' '}
            <strong>25 años</strong>, TIN con sobrecoste de +0,3-0,8 puntos sobre la mediana de
            primera vivienda y vinculaciones más duras (seguros específicos para alquiler, mayor
            saldo en cuenta). El cash necesario por operación está entre el 38% y el 48% del
            precio. Toño Palacios, broker hipotecario nº E242 y presidente de ANICI, integra el
            análisis financiero y la elección de banco correcto para inversor.
          </AnswerCard>
        </Container>
      </Section>

      {/* DIFERENCIAS */}
      <Section id="diferencias" tone="paper" padding="md" title={P.diferencias.title}>
        <Container size="md">
          <p className="text-lg text-ink-soft mb-6">{P.diferencias.intro}</p>
          <div className="bg-paper-card border border-navy-100 rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-navy-800 text-paper">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold">Criterio</th>
                  <th className="text-left px-4 py-3 font-semibold">Primera vivienda</th>
                  <th className="text-left px-4 py-3 font-semibold">Inversión</th>
                </tr>
              </thead>
              <tbody>
                {P.diferencias.rows.map((r, i) => (
                  <tr key={i} className="border-t border-navy-100 align-top">
                    <td className="px-4 py-3 font-semibold text-navy-800">{r.criterio}</td>
                    <td className="px-4 py-3 text-ink-soft">{r.primera}</td>
                    <td className="px-4 py-3 text-ink-soft">{r.inversor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
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
          <div className="mt-6 bg-gold-50 border border-gold-300 rounded-lg p-5">
            <p className="text-sm text-navy-800">
              <strong>Cuéntale tu caso a las calculadoras:</strong> usa la{' '}
              <a
                href="/calculadora-capacidad-endeudamiento"
                className="text-navy-700 hover:text-navy-900 underline font-semibold"
              >
                calculadora de capacidad
              </a>{' '}
              ajustando mentalmente el LTV al 65-70% y la{' '}
              <a
                href="/calculadora-rentabilidad-inmobiliaria"
                className="text-navy-700 hover:text-navy-900 underline font-semibold"
              >
                calculadora de rentabilidad
              </a>{' '}
              para ver si la operación se auto-paga.
            </p>
          </div>
        </Container>
      </Section>

      {/* SCORING */}
      <Section id="scoring" tone="paper" padding="md" title={P.bankScoring.title}>
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
                  <tr key={i} className="border-t border-navy-100 align-top">
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

      {/* PERSONAL VS SOCIEDAD */}
      <Section id="personal-sociedad" tone="soft" padding="md" title={P.personalVsSociedad.title}>
        <Container size="md">
          <p className="text-lg text-ink-soft mb-6">{P.personalVsSociedad.intro}</p>
          <div className="grid md:grid-cols-2 gap-4">
            {P.personalVsSociedad.items.map((item, i) => (
              <article
                key={i}
                className="bg-paper-card border border-navy-100 border-t-4 border-t-gold-400 rounded-lg p-5 shadow-soft"
              >
                <h3 className="text-lg font-bold text-navy-800 mb-2">{item.when}</h3>
                <p className="text-xs uppercase tracking-wider text-gold-600 font-bold mb-1">
                  Encaja si
                </p>
                <p className="text-sm text-ink-soft mb-3">{item.whenItFits}</p>
                <p className="text-xs uppercase tracking-wider text-emerald-700 font-bold mb-1">
                  A favor
                </p>
                <ul className="text-sm text-ink-soft mb-3 space-y-1 list-disc pl-5">
                  {item.pros.map((p, j) => (
                    <li key={j}>{p}</li>
                  ))}
                </ul>
                <p className="text-xs uppercase tracking-wider text-red-700 font-bold mb-1">
                  En contra
                </p>
                <ul className="text-sm text-ink-soft space-y-1 list-disc pl-5">
                  {item.cons.map((c, j) => (
                    <li key={j}>{c}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <div className="mt-6 bg-gold-50 border border-gold-300 rounded-lg p-5 text-sm text-navy-800">
            <strong>Nota operativa:</strong> {P.personalVsSociedad.note}
          </div>
        </Container>
      </Section>

      {/* QUÉ INMUEBLES FINANCIA */}
      <Section id="inmuebles" tone="paper" padding="md" title={P.inmuebleType.title}>
        <Container size="md">
          <div className="prose-psz mb-6">
            {P.inmuebleType.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <div className="space-y-3">
            {P.inmuebleType.items.map((item, i) => {
              const colorMap: Record<string, string> = {
                'Sí': 'border-l-emerald-400 bg-emerald-50',
                'Sí con matices': 'border-l-amber-400 bg-amber-50',
                'Con dificultad': 'border-l-orange-400 bg-orange-50',
                'Solo con cambio de uso formalizado': 'border-l-amber-400 bg-amber-50',
                'No': 'border-l-red-400 bg-red-50',
                'No (financiación vía préstamo personal)': 'border-l-red-400 bg-red-50',
                'Sí en banca privada o especializada': 'border-l-amber-400 bg-amber-50',
                'Excepcional': 'border-l-red-400 bg-red-50',
              }
              const cls = colorMap[item.verdict] ?? 'border-l-navy-300 bg-paper-card'
              return (
                <article
                  key={i}
                  className={`border border-navy-100 border-l-4 rounded-lg p-4 ${cls}`}
                >
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                    <h3 className="font-bold text-navy-800">{item.type}</h3>
                    <span className="text-xs font-bold uppercase tracking-wider text-navy-800 bg-paper-card border border-navy-100 rounded-md px-2 py-0.5">
                      {item.verdict}
                    </span>
                  </div>
                  <p className="text-sm text-ink-soft">{item.detail}</p>
                </article>
              )
            })}
          </div>
        </Container>
      </Section>

      {/* ERRORES */}
      <Section id="errores" tone="soft" padding="md" title={P.mistakes.title}>
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

      {/* ADVERTENCIA LEGAL */}
      <Section tone="paper" padding="sm">
        <Container size="md">
          <LegalDisclaimer variant="investment" />
        </Container>
      </Section>

      {/* FAQ */}
      <Section id="faq" tone="paper" padding="md" title="Preguntas frecuentes sobre hipoteca de inversión">
        <Container size="md">
          <Faq items={[...P.faq]} />
        </Container>
      </Section>

      {/* INTERNAL LINKING */}
      <Section tone="paper" padding="md" title="Herramientas y servicios relacionados">
        <Container size="lg">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <a
              href="/calculadora-rentabilidad-inmobiliaria"
              className="block bg-paper-card border border-navy-100 rounded-xl p-6 hover:border-gold-400 hover:shadow-card transition-all no-underline"
            >
              <p className="text-xs uppercase tracking-wider text-gold-600 font-semibold mb-2">
                Herramienta clave
              </p>
              <h3 className="text-lg font-semibold text-navy-800 mb-2">
                Rentabilidad inmobiliaria
              </h3>
              <p className="text-sm text-ink-soft">
                Rentabilidad de adquisición y real, flujo neto, amortización ITP en 3 escenarios.
              </p>
            </a>

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
                Cuánto te daría el banco. Ajusta LTV mentalmente al 65-70% para inversión.
              </p>
            </a>

            <a
              href="/estructuras-societarias"
              className="block bg-paper-card border border-navy-100 rounded-xl p-6 hover:border-gold-400 hover:shadow-card transition-all no-underline"
            >
              <p className="text-xs uppercase tracking-wider text-gold-600 font-semibold mb-2">
                Servicio
              </p>
              <h3 className="text-lg font-semibold text-navy-800 mb-2">
                Estructuras societarias
              </h3>
              <p className="text-sm text-ink-soft">
                SL patrimonial, SOCIMI y holdings cuando la operación lo justifica.
              </p>
            </a>

            <a
              href="/broker-hipotecario"
              className="block bg-paper-card border border-navy-100 rounded-xl p-6 hover:border-gold-400 hover:shadow-card transition-all no-underline"
            >
              <p className="text-xs uppercase tracking-wider text-gold-600 font-semibold mb-2">
                Servicio
              </p>
              <h3 className="text-lg font-semibold text-navy-800 mb-2">
                Broker hipotecario
              </h3>
              <p className="text-sm text-ink-soft">
                Para inversor el broker hace más diferencia que en primera vivienda.
              </p>
            </a>
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section tone="navy" padding="lg">
        <Container size="md" className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-paper mb-4">
            ¿Operación de inversión en marcha?
          </h2>
          <p className="text-paper/85 text-lg mb-8 max-w-prose mx-auto">
            Te analizo el caso completo: viabilidad financiera, rentabilidad real, mejor banco
            para tu perfil y, si procede, si conviene operar a título personal o en sociedad.
            Reserva inicial 600 €; honorarios a éxito entre tres mil y cuatro mil quinientos
            euros al cierre.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button
              href={MORTGAGE_FORM_URL}
              variant="gold"
              size="lg"
              target="_blank"
              rel="noopener noreferrer"
            >
              Solicitar análisis →
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
