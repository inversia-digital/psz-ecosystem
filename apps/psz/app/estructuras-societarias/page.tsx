import type { Metadata } from 'next'
import {
  INVERSIA,
  MORTGAGE_FORM_URL,
  SITE_URLS,
  TONO,
  breadcrumbSchema,
  faqPageSchema,
} from '@psz/seo'
import { Button, Container, CredentialBadge, Faq, JsonLd, Section } from '@psz/ui'
import { ESTRUCTURAS } from './content'

const URL = `${SITE_URLS.psz}/estructuras-societarias`

export const metadata: Metadata = {
  title: 'Estructuras societarias para inversores · Toño Palacios',
  description:
    'Diseño de holdings nacionales y estructuras societarias internacionales para inversores con patrimonio inmobiliario. Asesoría premium con visión patrimonial integrada.',
  alternates: { canonical: URL },
  openGraph: {
    url: URL,
    title: 'Estructuras societarias para inversores · Toño Palacios',
    description:
      'Diseño de holdings nacionales y estructuras societarias internacionales. Para perfiles con cierto volumen que ya no encajan en operar a título personal.',
    type: 'article',
    locale: 'es_ES',
  },
}

export default function Page() {
  return (
    <main>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Inicio', url: SITE_URLS.psz },
          { name: 'Estructuras societarias', url: URL },
        ])}
      />
      <JsonLd data={faqPageSchema([...ESTRUCTURAS.faq])} />

      {/* HERO */}
      <Section tone="navy" padding="lg">
        <Container size="lg">
          <p className="text-gold-300 text-sm uppercase tracking-wider mb-3">
            {ESTRUCTURAS.hero.eyebrow}
          </p>
          <h1 className="text-4xl md:text-6xl font-bold text-paper leading-tight mb-4">
            {ESTRUCTURAS.hero.h1}
          </h1>
          <p className="text-xl text-paper/80 max-w-3xl mb-8">{ESTRUCTURAS.hero.sub}</p>
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
          <Button
            href={`mailto:${INVERSIA.email}?subject=Consulta%20sobre%20estructuras%20societarias`}
            variant="gold"
            size="lg"
          >
            Pedir primera consulta →
          </Button>
        </Container>
      </Section>

      {/* POR QUÉ IMPORTA */}
      <Section tone="paper" padding="md" title={ESTRUCTURAS.whyMatters.title}>
        <Container size="md">
          <div className="prose-psz">
            {ESTRUCTURAS.whyMatters.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </Container>
      </Section>

      {/* PARA QUIÉN */}
      <Section tone="soft" padding="md" title={ESTRUCTURAS.forWhom.title}>
        <Container size="lg">
          <div className="grid md:grid-cols-2 gap-6">
            {ESTRUCTURAS.forWhom.profiles.map((p, i) => (
              <article
                key={i}
                className="bg-paper-card rounded-xl border border-navy-100 border-t-4 border-t-gold-400 p-6 shadow-soft"
              >
                <h3 className="text-xl font-semibold mb-3 text-navy-800">{p.title}</h3>
                <p className="text-ink-soft">{p.body}</p>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      {/* TRES NIVELES */}
      <Section tone="paper" padding="md" title={ESTRUCTURAS.levels.title}>
        <Container size="lg">
          <div className="space-y-5">
            {ESTRUCTURAS.levels.items.map((l, i) => (
              <article
                key={i}
                className="flex flex-col md:flex-row gap-6 bg-paper-soft p-6 md:p-8 rounded-xl border border-navy-100"
              >
                <div className="text-4xl md:text-5xl font-bold text-gold-500 shrink-0 md:w-16">
                  {l.level}
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-semibold mb-3 text-navy-800">{l.title}</h3>
                  <p className="text-ink-soft">{l.body}</p>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      {/* ESPAÑA VS INTL */}
      <Section tone="soft" padding="md" title={ESTRUCTURAS.spainVsIntl.title}>
        <Container size="md">
          <div className="prose-psz">
            <p className="text-lg">{ESTRUCTURAS.spainVsIntl.body}</p>
          </div>
        </Container>
      </Section>

      {/* PROCESO */}
      <Section tone="paper" padding="md" title={ESTRUCTURAS.process.title}>
        <Container size="lg">
          <ol className="space-y-4">
            {ESTRUCTURAS.process.steps.map((s, i) => (
              <li
                key={i}
                className="flex gap-5 bg-paper-soft p-5 rounded-lg border border-navy-100"
              >
                <span className="text-3xl font-bold text-gold-500 shrink-0 w-12">{s.n}</span>
                <div>
                  <h3 className="text-lg font-semibold mb-1 text-navy-800">{s.title}</h3>
                  <p className="text-ink-soft">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {/* HONORARIOS */}
      <Section tone="soft" padding="md" title={ESTRUCTURAS.fees.title}>
        <Container size="md">
          <div className="prose-psz">
            <p>{ESTRUCTURAS.fees.body}</p>
          </div>
        </Container>
      </Section>

      {/* FAQ */}
      <Section tone="paper" padding="md" title="Preguntas frecuentes">
        <Container size="md">
          <Faq items={[...ESTRUCTURAS.faq]} />
        </Container>
      </Section>

      {/* CTA */}
      <Section tone="navy" padding="lg">
        <Container size="md" className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-paper mb-4">
            ¿Hablamos de tu estructura?
          </h2>
          <p className="text-paper/80 text-lg mb-8 max-w-prose mx-auto">
            Primera consulta gratis por videollamada. Al final tendrás un diagnóstico honesto sobre
            qué tienes hoy, qué te conviene y qué no — aunque la respuesta sea "todavía no".
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button
              href={`mailto:${INVERSIA.email}?subject=Consulta%20sobre%20estructuras%20societarias`}
              variant="gold"
              size="lg"
            >
              Pedir primera consulta →
            </Button>
            <Button
              href={MORTGAGE_FORM_URL}
              variant="primary"
              size="lg"
              target="_blank"
              rel="noopener noreferrer"
            >
              ¿Necesitas hipoteca primero?
            </Button>
          </div>
        </Container>
      </Section>
    </main>
  )
}
