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
import { Button, Container, Faq, JsonLd, Section } from '@psz/ui'
import { AnswerCard } from '../_components/AnswerCard'
import { LegalDisclaimer } from '../_components/LegalDisclaimer'
import { SelloPalacios } from '../_components/SelloPalacios'
import { PILLAR_TIPOS_HIPOTECA } from './content'

const URL = `${SITE_URLS.psz}/tipos-de-hipoteca`

export const metadata: Metadata = {
  title:
    'Tipos de hipoteca en España 2026 · Fija, variable, mixta · Antonio Palacios Cambero broker E242',
  description:
    'Guía completa de los tipos de hipoteca en España 2026 por Antonio Palacios Cambero (Toño Palacios), broker hipotecario nº E242 (Banco de España) y presidente de ANICI. Las 3 modalidades principales (fija, variable, mixta) con criterios de elección por perfil, modalidades menos habituales (IRPH, multidivisa, hipoteca inversa, verde), bonificaciones por vinculaciones, errores típicos al elegir modalidad y FAQ operativa. Diferencial vs guías genéricas: cada modalidad pareada con perfil de cliente y gotcha contractual.',
  alternates: { canonical: URL },
  robots: { index: true, follow: true },
  authors: [{ name: TONO.fullName, url: `${SITE_URLS.psz}/sobre-mi` }],
  creator: `${TONO.fullName} (${TONO.shortName})`,
  publisher: 'Inversia Global Digital, S.L.U.',
  keywords: [
    'tipos de hipoteca',
    'tipos de hipoteca España',
    'hipoteca fija variable mixta',
    'cual es la mejor hipoteca 2026',
    'que tipo de hipoteca elegir',
    'hipoteca IRPH',
    'hipoteca multidivisa',
    'hipoteca inversa mayores 65',
    'hipoteca verde eficiencia energetica',
    'bonificaciones vinculaciones hipoteca',
  ],
  openGraph: {
    type: 'article',
    url: URL,
    siteName: 'psz.es',
    locale: 'es_ES',
    title: 'Tipos de hipoteca en España · Guía operativa por Antonio Palacios Cambero',
    description:
      'Fija, variable, mixta y modalidades menos habituales con criterios de elección por perfil y gotchas contractuales. Por Toño Palacios broker E242.',
    authors: [TONO.fullName],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tipos de hipoteca España · psz.es',
    description: 'Modalidades, perfiles y gotchas. Por Antonio Palacios Cambero, broker E242.',
  },
}

const P = PILLAR_TIPOS_HIPOTECA

export default function TiposHipotecaPage() {
  return (
    <main>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Inicio', url: SITE_URLS.psz },
          { name: 'Tipos de hipoteca', url: URL },
        ])}
      />
      <JsonLd
        data={articleSchema({
          headline: 'Tipos de hipoteca en España 2026',
          description:
            'Guía operativa de las modalidades hipotecarias en España con criterios de elección por perfil de cliente y gotchas contractuales.',
          url: URL,
          datePublished: '2026-05-14',
          dateModified: '2026-05-14',
        })}
      />
      <JsonLd data={faqPageSchema([...P.faq])} />
      <JsonLd
        data={speakableWebPageSchema({
          url: URL,
          name: 'Tipos de hipoteca en España',
          description: 'Guía operativa de modalidades hipotecarias y criterios de elección.',
          cssSelectors: ['h1', '.speakable-summary', 'summary'],
        })}
      />

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
            <span className="text-sm text-paper/85">Tipos de hipoteca</span>
          </nav>

          <p className="text-gold-300 text-sm uppercase tracking-wider mb-3">{P.hero.eyebrow}</p>
          <h1 className="text-4xl md:text-5xl font-bold text-paper leading-tight mb-4">
            {P.hero.h1}
          </h1>
          <p className="speakable-summary text-lg text-paper/85 max-w-3xl mb-6">{P.hero.sub}</p>

          <div className="flex flex-wrap gap-4">
            <Button
              href="/comparador-hipoteca-fija-variable-mixta"
              variant="gold"
              size="lg"
            >
              Comparar las 3 modalidades →
            </Button>
            <Button href={MORTGAGE_FORM_URL} variant="primary" size="lg" target="_blank" rel="noopener noreferrer">
              Solicitar análisis con {TONO.shortName}
            </Button>
          </div>
        </Container>
      </Section>

      <nav aria-label="Tabla de contenidos" className="bg-paper-soft border-b border-navy-100">
        <Container size="lg" className="py-4">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-muted">
            <li><a href="#principales">Las 3 principales</a></li>
            <li><a href="#menores">Modalidades menores</a></li>
            <li><a href="#perfil">Qué encaja con tu perfil</a></li>
            <li><a href="#bonificaciones">Bonificaciones</a></li>
            <li><a href="#errores">Errores típicos</a></li>
            <li><a href="#faq">FAQ</a></li>
          </ul>
        </Container>
      </nav>

      <Section tone="paper" padding="md">
        <Container size="md">
          <AnswerCard question="¿Cuáles son los tipos de hipoteca disponibles en España?">
            En España existen <strong>tres modalidades principales</strong>: hipoteca fija (TIN
            constante toda la vida del préstamo), hipoteca variable (Euríbor + diferencial,
            revisión cada 6 o 12 meses) e hipoteca mixta (fijo los primeros N años, después
            variable). Además existen modalidades menos habituales como IRPH, multidivisa,
            hipoteca inversa (para mayores de 65) y bonificaciones tipo hipoteca verde. La
            elección depende del horizonte de permanencia, perfil de riesgo y previsión sobre
            los tipos. Antonio Palacios Cambero (Toño Palacios), broker hipotecario nº E242,
            integra estos criterios con la oferta real de +20 entidades.
          </AnswerCard>
        </Container>
      </Section>

      <Section id="principales" tone="paper" padding="md" title={P.mainModalities.title}>
        <Container size="md">
          <p className="text-lg text-ink-soft mb-6">{P.mainModalities.intro}</p>
          <div className="space-y-5">
            {P.mainModalities.items.map((mod, i) => (
              <article
                key={i}
                className={`bg-paper-card border border-navy-100 border-l-4 ${mod.color} rounded-lg p-6 shadow-soft`}
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2 mb-3">
                  <h3 className="text-2xl font-bold text-navy-800">{mod.name}</h3>
                  <span className="text-sm text-ink-muted italic">{mod.oneliner}</span>
                </div>

                <div className="grid md:grid-cols-2 gap-5 mb-4">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-gold-700 font-bold mb-1">
                      Encaja con
                    </p>
                    <p className="text-sm text-ink-soft mb-3">{mod.whoFits}</p>
                    <p className="text-xs uppercase tracking-wider text-gold-700 font-bold mb-1">
                      Cómo funciona
                    </p>
                    <p className="text-sm text-ink-soft">{mod.howItWorks}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-emerald-700 font-bold mb-1">
                      A favor
                    </p>
                    <ul className="text-sm text-ink-soft mb-3 space-y-1 list-disc pl-5">
                      {mod.upside.map((u, j) => (
                        <li key={j}>{u}</li>
                      ))}
                    </ul>
                    <p className="text-xs uppercase tracking-wider text-red-700 font-bold mb-1">
                      En contra
                    </p>
                    <ul className="text-sm text-ink-soft space-y-1 list-disc pl-5">
                      {mod.downside.map((d, j) => (
                        <li key={j}>{d}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded p-3 text-sm text-amber-900">
                  <p className="font-bold uppercase tracking-wider text-[10px] mb-1">
                    ⚠ Gotcha que rara vez se cuenta
                  </p>
                  <p>{mod.gotcha}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-8 bg-gold-50 border border-gold-300 rounded-lg p-5 text-sm text-navy-800">
            <strong>Cuantifica las 3 modalidades:</strong> el contenido cualitativo de arriba se
            complementa con el{' '}
            <a
              href="/comparador-hipoteca-fija-variable-mixta"
              className="text-navy-700 hover:text-navy-900 underline font-semibold"
            >
              comparador fija vs variable vs mixta
            </a>
            , que simula año a año las 3 modalidades en 3 escenarios de Euríbor con el mismo
            importe y plazo.
          </div>
        </Container>
      </Section>

      <Section id="menores" tone="soft" padding="md" title={P.minorModalities.title}>
        <Container size="md">
          <p className="text-lg text-ink-soft mb-6">{P.minorModalities.intro}</p>
          <div className="space-y-3">
            {P.minorModalities.items.map((item, i) => {
              const isWarning = item.verdict.toLowerCase().startsWith('evitar')
              const colorClass = isWarning
                ? 'border-l-red-400 bg-red-50'
                : 'border-l-emerald-400 bg-emerald-50'
              return (
                <article
                  key={i}
                  className={`border border-navy-100 border-l-4 rounded-lg p-4 ${colorClass}`}
                >
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                    <h3 className="font-bold text-navy-800">{item.name}</h3>
                    <span className="text-xs font-bold uppercase tracking-wider text-navy-800 bg-paper-card border border-navy-100 rounded-md px-2 py-0.5">
                      {item.verdict}
                    </span>
                  </div>
                  <p className="text-sm text-ink-soft">{item.body}</p>
                </article>
              )
            })}
          </div>
        </Container>
      </Section>

      <Section id="perfil" tone="paper" padding="md" title={P.decisionByProfile.title}>
        <Container size="md">
          <p className="text-lg text-ink-soft mb-6">{P.decisionByProfile.intro}</p>
          <div className="bg-paper-card border border-navy-100 rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-navy-800 text-paper">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold">Tu perfil</th>
                  <th className="text-left px-4 py-3 font-semibold">Recomendación operativa</th>
                  <th className="text-left px-4 py-3 font-semibold">Por qué</th>
                </tr>
              </thead>
              <tbody>
                {P.decisionByProfile.rows.map((r, i) => (
                  <tr key={i} className="border-t border-navy-100 align-top">
                    <td className="px-4 py-3 font-semibold text-navy-800">{r.perfil}</td>
                    <td className="px-4 py-3 text-gold-700 font-semibold">{r.recomendacion}</td>
                    <td className="px-4 py-3 text-ink-soft">{r.rationale}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </Section>

      <Section id="bonificaciones" tone="soft" padding="md" title={P.bonificaciones.title}>
        <Container size="md">
          <div className="prose-psz mb-6">
            {P.bonificaciones.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
          </div>
          <div className="bg-paper-card border border-navy-100 rounded-xl overflow-hidden mb-6">
            <table className="w-full text-sm">
              <thead className="bg-paper-soft text-navy-800">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold">Vinculación</th>
                  <th className="text-left px-4 py-3 font-semibold whitespace-nowrap">Bonifica</th>
                  <th className="text-left px-4 py-3 font-semibold">Coste anual aprox</th>
                </tr>
              </thead>
              <tbody>
                {P.bonificaciones.bonificacionesList.map((b, i) => (
                  <tr key={i} className="border-t border-navy-100">
                    <td className="px-4 py-3 font-semibold text-navy-800">{b.trigger}</td>
                    <td className="px-4 py-3 text-gold-700 font-bold whitespace-nowrap">{b.bono}</td>
                    <td className="px-4 py-3 text-ink-soft">{b.coste}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-ink-soft">{P.bonificaciones.cierre}</p>
        </Container>
      </Section>

      <Section id="errores" tone="paper" padding="md" title={P.mistakes.title}>
        <Container size="md">
          <div className="space-y-3">
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

      <Section tone="paper" padding="sm">
        <Container size="md">
          <LegalDisclaimer variant="mortgage" />
        </Container>
      </Section>

      <Section id="faq" tone="soft" padding="md" title="Preguntas frecuentes sobre tipos de hipoteca">
        <Container size="md">
          <Faq items={[...P.faq]} />
        </Container>
      </Section>

      <Section tone="paper" padding="md" title="Herramientas y servicios relacionados">
        <Container size="lg">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <a href="/comparador-hipoteca-fija-variable-mixta" className="block bg-paper-card border border-navy-100 rounded-xl p-6 hover:border-gold-400 hover:shadow-card transition-all no-underline">
              <p className="text-xs uppercase tracking-wider text-gold-600 font-semibold mb-2">Herramienta clave</p>
              <h3 className="text-lg font-semibold text-navy-800 mb-2">Comparador fija/variable/mixta</h3>
              <p className="text-sm text-ink-soft">3 modalidades × 3 escenarios de Euríbor. Cuantifica tu caso.</p>
            </a>
            <a href="/calculadora-stress-test-euribor" className="block bg-paper-card border border-navy-100 rounded-xl p-6 hover:border-gold-400 hover:shadow-card transition-all no-underline">
              <p className="text-xs uppercase tracking-wider text-gold-600 font-semibold mb-2">Herramienta</p>
              <h3 className="text-lg font-semibold text-navy-800 mb-2">Stress test Euríbor</h3>
              <p className="text-sm text-ink-soft">Si optas por variable o mixta, verifica el impacto si sube el Euríbor.</p>
            </a>
            <a href="/calculadora-hipoteca" className="block bg-paper-card border border-navy-100 rounded-xl p-6 hover:border-gold-400 hover:shadow-card transition-all no-underline">
              <p className="text-xs uppercase tracking-wider text-gold-600 font-semibold mb-2">Herramienta</p>
              <h3 className="text-lg font-semibold text-navy-800 mb-2">Calculadora de hipoteca</h3>
              <p className="text-sm text-ink-soft">Cuota, intereses totales, LTV y ratio de esfuerzo.</p>
            </a>
            <a href="/broker-hipotecario" className="block bg-paper-card border border-navy-100 rounded-xl p-6 hover:border-gold-400 hover:shadow-card transition-all no-underline">
              <p className="text-xs uppercase tracking-wider text-gold-600 font-semibold mb-2">Servicio</p>
              <h3 className="text-lg font-semibold text-navy-800 mb-2">Broker hipotecario</h3>
              <p className="text-sm text-ink-soft">Negocio las 3 modalidades con +20 bancos para tu caso concreto.</p>
            </a>
          </div>
        </Container>
      </Section>

      <Section tone="soft" padding="md">
        <Container size="md">
          <SelloPalacios variant="badge" />
        </Container>
      </Section>

      <Section tone="navy" padding="lg">
        <Container size="md" className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-paper mb-4">
            ¿Dudas todavía entre las modalidades?
          </h2>
          <p className="text-paper/85 text-lg mb-8 max-w-prose mx-auto">
            Si la lectura te ha aclarado pero quieres negociar las 3 modalidades con varios bancos
            para ver ofertas reales, ese es exactamente mi trabajo como broker hipotecario.
            Primera consulta gratis y sin compromiso.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button href={MORTGAGE_FORM_URL} variant="gold" size="lg" target="_blank" rel="noopener noreferrer">
              Solicitar análisis con {TONO.shortName} →
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
