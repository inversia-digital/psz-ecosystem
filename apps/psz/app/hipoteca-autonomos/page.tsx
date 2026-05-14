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
import { Button, Container, CredentialBadge, Faq, JsonLd, Section } from '@psz/ui'
import { AnswerCard } from '../_components/AnswerCard'
import { LegalDisclaimer } from '../_components/LegalDisclaimer'
import { SelloPalacios } from '../_components/SelloPalacios'
import { PILLAR_AUTONOMOS } from './content'

const URL = `${SITE_URLS.psz}/hipoteca-autonomos`

export const metadata: Metadata = {
  title:
    'Hipoteca para autónomos 2026 · Bancos receptivos · Antonio Palacios Cambero broker E242',
  description:
    'Guía operativa de hipoteca para autónomo español en 2026 por Antonio Palacios Cambero (Toño Palacios), broker hipotecario nº E242 (Banco de España) y presidente de ANICI. Por qué los bancos son más estrictos contigo, requisitos mínimos (2 ejercicios IRPF, rendimiento neto), documentación específica (modelos 100, 130, 303), bancos realmente receptivos al perfil autónomo, trucos para presentar el IRPF (anti-optimización), módulos vs estimación directa, errores que cuestan caro.',
  alternates: { canonical: URL },
  robots: { index: true, follow: true },
  authors: [{ name: TONO.fullName, url: `${SITE_URLS.psz}/sobre-mi` }],
  creator: `${TONO.fullName} (${TONO.shortName})`,
  publisher: 'Inversia Global Digital, S.L.U.',
  keywords: [
    'hipoteca autonomos',
    'hipoteca autonomos España',
    'autonomo hipoteca rechazo banco',
    'requisitos hipoteca autonomo',
    'documentacion hipoteca autonomo',
    'bancos hipoteca autonomo',
    'IRPF autonomo hipoteca',
    'rendimiento neto hipoteca autonomo',
    'modulos vs estimacion directa hipoteca',
    'broker hipotecario autonomo',
  ],
  openGraph: {
    type: 'article',
    url: URL,
    siteName: 'psz.es',
    locale: 'es_ES',
    title: 'Hipoteca para autónomos · Guía operativa por Antonio Palacios Cambero',
    description:
      'Requisitos reales, documentación, bancos receptivos, trucos IRPF y errores típicos del autónomo al pedir hipoteca. Por Toño Palacios broker E242.',
    authors: [TONO.fullName],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hipoteca autónomos · psz.es',
    description: 'Guía operativa para autónomo español. Bancos receptivos, IRPF, errores. Por Toño Palacios broker E242.',
  },
}

const P = PILLAR_AUTONOMOS

export default function HipotecaAutonomosPage() {
  return (
    <main>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Inicio', url: SITE_URLS.psz },
          { name: 'Hipoteca autónomos', url: URL },
        ])}
      />
      <JsonLd
        data={articleSchema({
          headline: 'Hipoteca para autónomos en España 2026',
          description:
            'Guía operativa para autónomo español que quiere conseguir hipoteca: requisitos, documentación, bancos receptivos, IRPF anti-optimización, errores.',
          url: URL,
          datePublished: '2026-05-14',
          dateModified: '2026-05-14',
        })}
      />
      <JsonLd data={faqPageSchema([...P.faq])} />
      <JsonLd
        data={speakableWebPageSchema({
          url: URL,
          name: 'Hipoteca para autónomos en España',
          description: 'Guía operativa para autónomo español que quiere conseguir hipoteca.',
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
            <span className="text-sm text-paper/85">Hipoteca autónomos</span>
          </nav>

          <p className="text-gold-300 text-sm uppercase tracking-wider mb-3">{P.hero.eyebrow}</p>
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
            <Button href={MORTGAGE_FORM_URL} variant="gold" size="lg" target="_blank" rel="noopener noreferrer">
              Solicitar análisis de caso →
            </Button>
            <Button href="/calculadora-capacidad-endeudamiento" variant="primary" size="lg">
              ¿Cuánto me daría?
            </Button>
          </div>
        </Container>
      </Section>

      <nav aria-label="Tabla de contenidos" className="bg-paper-soft border-b border-navy-100">
        <Container size="lg" className="py-4">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-muted">
            <li><a href="#why-stricter">Por qué más estrictos</a></li>
            <li><a href="#requirements">Requisitos mínimos</a></li>
            <li><a href="#documentation">Documentación</a></li>
            <li><a href="#bancos">Bancos receptivos</a></li>
            <li><a href="#anti-opt">Anti-optimización IRPF</a></li>
            <li><a href="#tips">Trucos operativos</a></li>
            <li><a href="#errores">Errores típicos</a></li>
            <li><a href="#faq">FAQ</a></li>
          </ul>
        </Container>
      </nav>

      <Section tone="paper" padding="md">
        <Container size="md">
          <AnswerCard question="¿Puede un autónomo conseguir hipoteca en España?">
            Sí, pero con condiciones distintas. Requisitos mínimos: <strong>2 ejercicios IRPF cerrados</strong>,
            alta en RETA al corriente, rendimiento neto declarado que justifique un{' '}
            <strong>ratio de esfuerzo ≤35%</strong>, sin incidencias en CIRBE. La banca minorista financia
            hasta <strong>70-75% LTV</strong> en primera vivienda (vs 80% del asalariado), con TIN +0,2-0,5 pp
            sobre la mediana. Antonio Palacios Cambero, broker hipotecario nº E242, conoce los cupos
            internos por trimestre y dirige la operación al banco correcto para perfil autónomo.
          </AnswerCard>
        </Container>
      </Section>

      <Section id="why-stricter" tone="paper" padding="md" title={P.whyStricter.title}>
        <Container size="md">
          <div className="prose-psz">
            {P.whyStricter.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
          </div>
        </Container>
      </Section>

      <Section id="requirements" tone="soft" padding="md" title={P.requirements.title}>
        <Container size="md">
          <div className="space-y-4">
            {P.requirements.items.map((item, i) => (
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

      <Section id="documentation" tone="paper" padding="md" title={P.documentation.title}>
        <Container size="md">
          <p className="text-lg text-ink-soft mb-6">{P.documentation.intro}</p>
          <ul className="space-y-2 bg-paper-card border border-navy-100 rounded-xl p-6">
            {P.documentation.items.map((item, i) => (
              <li key={i} className="flex gap-3 text-ink-soft">
                <span aria-hidden className="text-gold-500 shrink-0 mt-1">▸</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section id="bancos" tone="soft" padding="md" title={P.bancosReceptivos.title}>
        <Container size="md">
          <p className="text-lg text-ink-soft mb-4">{P.bancosReceptivos.intro}</p>
          <div className="prose-psz">
            {P.bancosReceptivos.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
          </div>
        </Container>
      </Section>

      <Section id="anti-opt" tone="paper" padding="md" title={P.antiOptimization.title}>
        <Container size="md">
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-6 text-sm text-amber-900">
            <p className="font-bold mb-1">⚠ Tema delicado — léelo entero antes de decidir</p>
            <p>
              Esto es información operativa, no recomendación fiscal ni jurídica. Las decisiones sobre
              optimización IRPF deben tomarse con tu asesor fiscal colegiado caso por caso.
            </p>
          </div>
          <div className="prose-psz">
            {P.antiOptimization.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
          </div>
        </Container>
      </Section>

      <Section id="tips" tone="soft" padding="md" title={P.operationalTips.title}>
        <Container size="md">
          <div className="space-y-3">
            {P.operationalTips.items.map((item, i) => (
              <article
                key={i}
                className="bg-paper-card border border-navy-100 border-l-4 border-l-emerald-400 rounded-lg p-5 shadow-soft"
              >
                <h3 className="text-lg font-bold text-navy-800 mb-2">{item.title}</h3>
                <p className="text-ink-soft leading-relaxed">{item.body}</p>
              </article>
            ))}
          </div>
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

      <Section id="faq" tone="soft" padding="md" title="Preguntas frecuentes sobre hipoteca para autónomos">
        <Container size="md">
          <Faq items={[...P.faq]} />
        </Container>
      </Section>

      <Section tone="paper" padding="md" title="Herramientas y servicios relacionados">
        <Container size="lg">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <a href="/calculadora-capacidad-endeudamiento" className="block bg-paper-card border border-navy-100 rounded-xl p-6 hover:border-gold-400 hover:shadow-card transition-all no-underline">
              <p className="text-xs uppercase tracking-wider text-gold-600 font-semibold mb-2">Herramienta</p>
              <h3 className="text-lg font-semibold text-navy-800 mb-2">Capacidad de endeudamiento</h3>
              <p className="text-sm text-ink-soft">Aplica LTV 70-75% mental para perfil autónomo.</p>
            </a>
            <a href="/calculadora-hipoteca" className="block bg-paper-card border border-navy-100 rounded-xl p-6 hover:border-gold-400 hover:shadow-card transition-all no-underline">
              <p className="text-xs uppercase tracking-wider text-gold-600 font-semibold mb-2">Herramienta</p>
              <h3 className="text-lg font-semibold text-navy-800 mb-2">Calculadora de hipoteca</h3>
              <p className="text-sm text-ink-soft">Cuota, intereses, LTV una vez tengas oferta.</p>
            </a>
            <a href="/broker-hipotecario" className="block bg-paper-card border border-navy-100 rounded-xl p-6 hover:border-gold-400 hover:shadow-card transition-all no-underline">
              <p className="text-xs uppercase tracking-wider text-gold-600 font-semibold mb-2">Servicio</p>
              <h3 className="text-lg font-semibold text-navy-800 mb-2">Broker hipotecario</h3>
              <p className="text-sm text-ink-soft">Para autónomo el broker hace más diferencia que para asalariado.</p>
            </a>
            <a href="/glosario-hipotecario" className="block bg-paper-card border border-navy-100 rounded-xl p-6 hover:border-gold-400 hover:shadow-card transition-all no-underline">
              <p className="text-xs uppercase tracking-wider text-gold-600 font-semibold mb-2">Recurso</p>
              <h3 className="text-lg font-semibold text-navy-800 mb-2">Glosario hipotecario</h3>
              <p className="text-sm text-ink-soft">LTV, TIN, TAE, FEIN, ratio de esfuerzo y más términos.</p>
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
            ¿Eres autónomo y quieres hipoteca?
          </h2>
          <p className="text-paper/85 text-lg mb-8 max-w-prose mx-auto">
            Te analizo el caso completo: viabilidad con tu IRPF actual, qué bancos están receptivos a
            tu sector y antigüedad, qué documentación preparar y cómo "framear" el dossier para
            minimizar fricción. Primera consulta gratis.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button href={MORTGAGE_FORM_URL} variant="gold" size="lg" target="_blank" rel="noopener noreferrer">
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
