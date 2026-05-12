import type { Metadata } from 'next'
import {
  MORTGAGE_FORM_URL,
  SITE_URLS,
  TONO,
  breadcrumbSchema,
  faqPageSchema,
} from '@psz/seo'
import { Button, Container, CredentialBadge, Faq, JsonLd, Section } from '@psz/ui'
import { WHY_TONO_BULLETS } from '../_data/whyTono'
import { PILLAR_BROKER } from './content'

const URL = `${SITE_URLS.psz}/broker-hipotecario`

export const metadata: Metadata = {
  title: 'Broker hipotecario · Toño Palacios nº E242',
  description:
    'Broker hipotecario registrado en Banco de España (E242) y presidente de ANICI. Negocio tu hipoteca con +20 bancos en toda España. Honorarios a éxito y transparentes.',
  alternates: { canonical: URL },
  openGraph: {
    url: URL,
    title: 'Broker hipotecario en España · Toño Palacios nº E242',
    description:
      'Broker hipotecario registrado en Banco de España (E242) y presidente de ANICI. Negocio tu hipoteca con +20 bancos en toda España.',
    type: 'article',
    locale: 'es_ES',
  },
}

export default function BrokerHipotecarioPage() {
  return (
    <main>
      {/* Schemas: BreadcrumbList + FAQPage */}
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Inicio', url: SITE_URLS.psz },
          { name: 'Broker hipotecario', url: URL },
        ])}
      />
      <JsonLd data={faqPageSchema([...PILLAR_BROKER.faq])} />

      {/* HERO */}
      <Section tone="navy" padding="lg">
        <Container size="lg">
          <p className="text-gold-300 text-sm uppercase tracking-wider mb-4">
            {PILLAR_BROKER.hero.eyebrow}
          </p>
          <h1 className="text-5xl md:text-6xl font-bold text-paper mb-6 leading-tight">
            {PILLAR_BROKER.hero.h1}
          </h1>
          <p className="max-w-2xl text-xl text-paper/80 mb-8">{PILLAR_BROKER.hero.sub}</p>

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
              Solicitar mi hipoteca →
            </Button>
            <Button href="#proceso" variant="ghost" size="lg" className="text-paper hover:bg-navy-800">
              Ver cómo trabajo
            </Button>
          </div>
        </Container>
      </Section>

      {/* TOC */}
      <nav aria-label="Tabla de contenidos" className="bg-paper-soft border-b border-navy-100">
        <Container size="lg" className="py-4">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-muted">
            <li><a href="#que-es">¿Qué hace?</a></li>
            <li><a href="#por-que">Por qué Toño</a></li>
            <li><a href="#diferencias">Diferencias</a></li>
            <li><a href="#nacional">Cobertura</a></li>
            <li><a href="#tipos">Tipos de hipoteca</a></li>
            <li><a href="#honorarios">Honorarios</a></li>
            <li><a href="#proceso">Proceso</a></li>
            <li><a href="#casos">Casos reales</a></li>
            <li><a href="#faq">FAQ</a></li>
          </ul>
        </Container>
      </nav>

      {/* QUÉ HACE */}
      <Section id="que-es" tone="paper" padding="md" title={PILLAR_BROKER.whatIsIt.title}>
        <Container size="md">
          <div className="prose-psz">
            {PILLAR_BROKER.whatIsIt.paragraphs.map((p, i) => (
              <p
                key={i}
                dangerouslySetInnerHTML={{
                  __html: p.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>'),
                }}
              />
            ))}
          </div>
        </Container>
      </Section>

      {/* POR QUÉ TOÑO */}
      <Section id="por-que" tone="soft" padding="md" title={PILLAR_BROKER.whyTono.title}>
        <Container size="lg">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHY_TONO_BULLETS.map((b, i) => (
              <article key={i} className="bg-paper-card rounded-xl border border-navy-100 p-6 shadow-soft">
                <h3 className="text-xl font-semibold mb-3 text-navy-800">{b.title}</h3>
                <p className="text-ink-soft">{b.body}</p>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      {/* DIFERENCIAS */}
      <Section id="diferencias" tone="paper" padding="md" title={PILLAR_BROKER.differences.title}>
        <Container size="lg">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b-2 border-navy-200">
                  <th className="py-3 pr-4">Figura</th>
                  <th className="py-3 pr-4">Trabaja para</th>
                  <th className="py-3 pr-4">Productos</th>
                  <th className="py-3 pr-4">Coste</th>
                  <th className="py-3">Regulación</th>
                </tr>
              </thead>
              <tbody>
                {PILLAR_BROKER.differences.rows.map((r, i) => (
                  <tr key={i} className="border-b border-navy-100 align-top">
                    <td className="py-3 pr-4 font-semibold">{r.actor}</td>
                    <td className="py-3 pr-4">{r.works_for}</td>
                    <td className="py-3 pr-4">{r.products}</td>
                    <td className="py-3 pr-4">{r.cost}</td>
                    <td className="py-3">{r.regulated_by}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </Section>

      {/* SERVICIO NACIONAL */}
      <Section id="nacional" tone="soft" padding="md" title={PILLAR_BROKER.national.title}>
        <Container size="md">
          <div className="prose-psz">
            {PILLAR_BROKER.national.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </Container>
      </Section>

      {/* TIPOS DE HIPOTECA */}
      <Section id="tipos" tone="paper" padding="md" title={PILLAR_BROKER.mortgageTypes.title}>
        <Container size="lg">
          <div className="grid md:grid-cols-2 gap-4">
            {PILLAR_BROKER.mortgageTypes.items.map((m, i) => (
              <article key={i} className="bg-paper-soft rounded-lg p-5 border border-navy-100">
                <h3 className="text-lg font-semibold mb-2">{m.name}</h3>
                <p className="text-ink-soft text-sm">{m.body}</p>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      {/* HONORARIOS */}
      <Section id="honorarios" tone="soft" padding="md" title={PILLAR_BROKER.fees.title}>
        <Container size="md">
          <div className="prose-psz">
            {PILLAR_BROKER.fees.paragraphs.map((p, i) => (
              <p
                key={i}
                dangerouslySetInnerHTML={{
                  __html: p.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>'),
                }}
              />
            ))}
          </div>
        </Container>
      </Section>

      {/* PROCESO */}
      <Section id="proceso" tone="paper" padding="md" title={PILLAR_BROKER.process.title}>
        <Container size="lg">
          <ol className="space-y-4">
            {PILLAR_BROKER.process.steps.map((s, i) => (
              <li key={i} className="flex gap-5 bg-paper-soft p-5 rounded-lg border border-navy-100">
                <span className="text-3xl font-bold text-gold-500 shrink-0 w-12">{s.n}</span>
                <div>
                  <h3 className="text-lg font-semibold mb-1">{s.title}</h3>
                  <p className="text-ink-soft">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {/* CASOS REALES */}
      <Section id="casos" tone="soft" padding="md" title={PILLAR_BROKER.cases.title}>
        <Container size="lg">
          <p className="text-center text-ink-muted mb-8 max-w-prose mx-auto">
            Casos reales de clientes anonimizados. Si quieres ver casos con nombre y firma real,
            puedo facilitarte contactos directos con clientes (con su permiso).
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {PILLAR_BROKER.cases.items.map((c, i) => (
              <article key={i} className="bg-paper-card rounded-xl p-6 border border-navy-100 shadow-card">
                <h3 className="text-xl font-semibold mb-3 text-navy-800">{c.title}</h3>
                <p className="text-ink-soft">{c.body}</p>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      {/* FAQ */}
      <Section id="faq" tone="paper" padding="md" title="Preguntas frecuentes">
        <Container size="md">
          <Faq items={[...PILLAR_BROKER.faq]} />
        </Container>
      </Section>

      {/* CTA FINAL */}
      <Section tone="navy" padding="lg">
        <Container size="md" className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-paper mb-4">
            ¿Hablamos de tu hipoteca?
          </h2>
          <p className="text-paper/80 text-lg mb-8 max-w-prose mx-auto">
            Primera llamada gratis. Te digo en 30 minutos si tu caso es viable y a qué bancos podemos
            presentarlo. Sin compromiso, sin coste, sin presión.
          </p>
          <Button
            href={MORTGAGE_FORM_URL}
            variant="gold"
            size="lg"
            target="_blank"
            rel="noopener noreferrer"
          >
            Solicitar mi hipoteca →
          </Button>
        </Container>
      </Section>
    </main>
  )
}
