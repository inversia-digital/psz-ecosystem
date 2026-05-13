import type { Metadata } from 'next'
import {
  ANICI,
  INVERSIA,
  SITE_URLS,
  TONO,
  breadcrumbSchema,
  faqPageSchema,
  howToSchema,
  speakableWebPageSchema,
} from '@psz/seo'
import { Button, Container, JsonLd, Section } from '@psz/ui'
import { AnswerCard } from '../_components/AnswerCard'
import { ALTA_ICI } from './content'

const URL = `${SITE_URLS.psz}/alta-ici-banco-espana`

export const metadata: Metadata = {
  title: 'Alta de sociedad como Intermediario de Crédito Inmobiliario (ICI) en Banco de España',
  description:
    `Acompañamiento integral para registrar tu sociedad o holding como ICI en el Banco de España conforme a la Ley 5/2019. Servicio prestado por ${TONO.shortName} (broker E242, presidente de ANICI), especialista por experiencia propia. Para holdings inmobiliarios, family offices, inmobiliarias, fintech y brokers que constituyen sociedad.`,
  alternates: { canonical: URL },
  robots: { index: true, follow: true },
  keywords: [
    'alta ICI Banco de España',
    'registrar sociedad como intermediario crédito inmobiliario',
    'inscripción ICI persona jurídica',
    'convertir inmobiliaria en ICI',
    'ICI holding patrimonial',
    'constituir intermediario crédito inmobiliario',
    'Ley 5/2019 alta sociedad',
    'Real Decreto 309/2019 ICI',
  ],
  openGraph: {
    url: URL,
    type: 'article',
    locale: 'es_ES',
    title: 'Alta de sociedad como ICI en Banco de España',
    description: 'Servicio de inscripción de sociedades y holdings como Intermediario de Crédito Inmobiliario.',
    authors: [TONO.fullName],
  },
}

export default function AltaICIPage() {
  return (
    <main>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Inicio', url: SITE_URLS.psz },
          { name: 'Servicios', url: `${SITE_URLS.psz}/#servicios` },
          { name: 'Alta de sociedad como ICI', url: URL },
        ])}
      />
      <JsonLd data={faqPageSchema([...ALTA_ICI.faq])} />
      <JsonLd
        data={speakableWebPageSchema({
          url: URL,
          name: ALTA_ICI.hero.h1,
          description: 'Servicio de inscripción de sociedades como Intermediario de Crédito Inmobiliario en el Banco de España.',
          cssSelectors: ['h1', '.speakable-summary', 'summary'],
        })}
      />
      <JsonLd
        data={howToSchema({
          name: 'Cómo dar de alta una sociedad como Intermediario de Crédito Inmobiliario en el Banco de España',
          description:
            'Proceso real de inscripción de una persona jurídica como ICI conforme a la Ley 5/2019 y el Real Decreto 309/2019.',
          url: URL,
          totalTime: 'P6M',
          estimatedCost: { currency: 'EUR', value: 5000 },
          steps: ALTA_ICI.proceso.pasos.map((p) => ({
            name: p.title,
            text: p.body,
          })),
        })}
      />

      {/* HERO */}
      <Section tone="navy" padding="lg">
        <Container size="lg">
          <p className="text-gold-300 text-sm uppercase tracking-wider mb-3">
            {ALTA_ICI.hero.eyebrow}
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-paper leading-tight mb-5">
            {ALTA_ICI.hero.h1}
          </h1>
          <p className="speakable-summary text-xl text-paper/80 max-w-3xl mb-8">
            {ALTA_ICI.hero.sub}
          </p>
          <div className="flex flex-wrap gap-4">
            <Button href="/contacto" variant="gold" size="lg">
              Llamada de diagnóstico gratuita →
            </Button>
            <Button href="#proceso" variant="primary" size="lg">
              Ver el proceso paso a paso
            </Button>
          </div>
          <p className="text-sm text-paper/60 mt-8 max-w-2xl">
            Servicio prestado por{' '}
            <a href="/sobre-mi" className="text-gold-300 hover:text-gold-200">
              {TONO.shortName}
            </a>
            , broker hipotecario nº {TONO.credentials.bdeId} y presidente de {ANICI.shortName}. Mi
            propia sociedad ({INVERSIA.legalName}, código E242) está inscrita como ICI — conozco el
            procedimiento desde dentro.
          </p>
        </Container>
      </Section>

      {/* INTRO */}
      <Section tone="paper" padding="md" title={ALTA_ICI.intro.title}>
        <Container size="md">
          <AnswerCard question="¿Cómo se da de alta una sociedad como Intermediario de Crédito Inmobiliario (ICI) en el Banco de España?">
            La inscripción de una persona jurídica como ICI en el Banco de España requiere
            constitución social adecuada, formación específica de administradores, seguro de
            responsabilidad civil profesional, manual de cumplimiento normativo y trámites bajo
            Ley 5/2019 y Real Decreto 309/2019. Plazo medio: 4-6 meses. Toño Palacios acompaña
            todo el proceso desde su propia experiencia inscribiendo Inversia Global Digital (E242).
          </AnswerCard>
          <div className="prose-psz">
            {ALTA_ICI.intro.body.split('\n\n').map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </Container>
      </Section>

      {/* PARA QUIÉN */}
      <Section tone="soft" padding="md" title={ALTA_ICI.paraQuien.title}>
        <Container size="lg">
          <div className="grid md:grid-cols-2 gap-6">
            {ALTA_ICI.paraQuien.items.map((item, i) => (
              <article
                key={i}
                className="bg-paper-card border border-navy-100 border-l-4 border-l-gold-400 rounded-lg p-6 shadow-soft"
              >
                <h3 className="text-lg font-semibold text-navy-800 mb-2">{item.title}</h3>
                <p className="text-ink-soft text-sm leading-relaxed">{item.body}</p>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      {/* PROCESO */}
      <Section
        id="proceso"
        tone="paper"
        padding="md"
        title={ALTA_ICI.proceso.title}
        lead={ALTA_ICI.proceso.intro}
      >
        <Container size="lg">
          <ol className="space-y-4">
            {ALTA_ICI.proceso.pasos.map((p, i) => (
              <li
                key={i}
                className="flex gap-5 bg-paper-soft border border-navy-100 rounded-lg p-5"
              >
                <span className="text-3xl font-bold text-gold-500 shrink-0 w-12">{p.n}</span>
                <div>
                  <h3 className="text-lg font-semibold mb-1">{p.title}</h3>
                  <p className="text-ink-soft text-sm leading-relaxed">{p.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {/* PLAZOS */}
      <Section tone="soft" padding="md" title={ALTA_ICI.plazos.title}>
        <Container size="md">
          <div className="prose-psz">
            {ALTA_ICI.plazos.body.split('\n\n').map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </Container>
      </Section>

      {/* HONORARIOS */}
      <Section tone="paper" padding="md" title={ALTA_ICI.honorarios.title}>
        <Container size="md">
          <div className="prose-psz">
            <p>{ALTA_ICI.honorarios.body}</p>
          </div>
        </Container>
      </Section>

      {/* FAQ */}
      <Section tone="soft" padding="md" title="Preguntas frecuentes sobre alta como ICI">
        <Container size="md">
          <div className="divide-y divide-navy-100">
            {ALTA_ICI.faq.map((q, i) => (
              <article key={i} className="py-6">
                <h3 className="faq-question text-xl font-semibold text-navy-800 mb-3">
                  {q.question}
                </h3>
                <p className="text-ink-soft leading-relaxed">{q.answer}</p>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section tone="navy" padding="md">
        <Container size="md" className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-paper mb-4">
            ¿Quieres dar de alta tu sociedad como ICI?
          </h2>
          <p className="text-paper/80 text-lg mb-8 max-w-prose mx-auto">
            La llamada de diagnóstico inicial es gratuita. En 30 minutos te digo si tu caso es
            viable como está, qué cambios habría que hacer y un presupuesto cerrado para el
            acompañamiento completo.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button href="/contacto" variant="gold" size="lg">
              Solicitar diagnóstico gratuito →
            </Button>
            <Button href="/estructuras-societarias" variant="primary" size="lg">
              Ver también: estructuras societarias
            </Button>
          </div>
        </Container>
      </Section>
    </main>
  )
}
