import type { Metadata } from 'next'
import {
  MORTGAGE_FORM_URL,
  SITE_URLS,
  TELEGRAM_INVESTORS_URL,
  TONO,
  breadcrumbSchema,
} from '@psz/seo'
import { Button, Container, CredentialBadge, JsonLd, Section } from '@psz/ui'
import { SOBRE_MI } from './content'

const URL = `${SITE_URLS.psz}/sobre-mi`

export const metadata: Metadata = {
  title: 'Sobre Toño Palacios · Broker hipotecario E242 y presidente de ANICI',
  description:
    'Antonio Palacios Cambero (Toño): broker hipotecario nº E242 en Banco de España, presidente y socio fundador de ANICI, fundador de INARPA. Equipo de brokers asociados en ANICI en toda España.',
  alternates: { canonical: URL },
  openGraph: {
    url: URL,
    title: 'Sobre Toño Palacios · Broker hipotecario E242 y presidente de ANICI',
    description:
      'Antonio Palacios Cambero (Toño): broker hipotecario nº E242, presidente de ANICI, fundador de INARPA. Equipo de brokers en toda España.',
    type: 'profile',
    locale: 'es_ES',
  },
}

export default function SobreMiPage() {
  return (
    <main>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Inicio', url: SITE_URLS.psz },
          { name: 'Sobre mí', url: URL },
        ])}
      />

      {/* HERO */}
      <Section tone="navy" padding="lg">
        <Container size="lg">
          <p className="text-gold-300 text-sm uppercase tracking-wider mb-3">
            {SOBRE_MI.hero.eyebrow}
          </p>
          <h1 className="text-5xl md:text-6xl font-bold text-paper mb-4 leading-tight">
            {SOBRE_MI.hero.h1}
          </h1>
          <p className="text-xl text-gold-300 mb-8 max-w-3xl">{SOBRE_MI.hero.sub}</p>

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

          {/* Retrato institucional */}
          <figure className="bg-navy-800 border border-navy-700 rounded-xl p-3 inline-block shadow-card">
            <div className="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-gold-400/30">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/tono-formal.jpg"
                alt="Antonio (Toño) Palacios Cambero, broker hipotecario nº E242 y presidente de ANICI"
                className="w-full h-full object-cover"
              />
            </div>
          </figure>
        </Container>
      </Section>

      {/* HITOS */}
      <Section tone="paper" padding="md" title="Cinco hitos que definen mi trayectoria">
        <Container size="lg">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {SOBRE_MI.milestones.map((m, i) => (
              <article
                key={i}
                className="bg-paper-card rounded-xl border border-navy-100 p-6 shadow-soft"
              >
                <span className="text-gold-500 font-bold text-3xl block mb-3">{`0${i + 1}`}</span>
                <h3 className="text-lg font-semibold mb-2 text-navy-800">{m.title}</h3>
                <p className="text-ink-soft text-sm">{m.body}</p>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      {/* MANIFIESTO */}
      <Section
        id="manifiesto"
        tone="soft"
        padding="md"
        title={SOBRE_MI.manifesto.title}
      >
        <Container size="md">
          <div className="prose-psz">
            {SOBRE_MI.manifesto.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </Container>
      </Section>

      {/* BIO */}
      <Section id="trayectoria" tone="paper" padding="md" title={SOBRE_MI.bio.title}>
        <Container size="md">
          <div className="prose-psz">
            {SOBRE_MI.bio.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </Container>
      </Section>

      {/* FORMACIÓN */}
      <Section id="formacion" tone="soft" padding="md" title={SOBRE_MI.formation.title}>
        <Container size="md">
          <div className="prose-psz">
            <p>{SOBRE_MI.formation.body}</p>
          </div>
        </Container>
      </Section>

      {/* EQUIPO */}
      <Section id="equipo" tone="paper" padding="md" title={SOBRE_MI.team.title}>
        <Container size="lg">
          <p className="max-w-prose mx-auto text-ink-soft text-center mb-10 text-lg">
            {SOBRE_MI.team.intro}
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {SOBRE_MI.team.members.map((m, i) => {
              const initials = m.name
                .split(' ')
                .map((p) => p[0])
                .slice(0, 2)
                .join('')
                .toUpperCase()
              return (
                <article
                  key={i}
                  className="bg-paper-card rounded-xl border border-navy-100 p-6 shadow-card text-center"
                >
                  <div className="w-28 h-28 mx-auto rounded-full overflow-hidden border-2 border-gold-300/50 mb-4 bg-paper-soft flex items-center justify-center">
                    {m.photo ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={m.photo}
                        alt={`${m.name}, ${m.role}`}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-navy-700 font-bold text-2xl tracking-wider">
                        {initials}
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-semibold mb-1 text-navy-800">{m.name}</h3>
                  <p className="text-sm text-gold-600 mb-3 font-medium">{m.role}</p>
                  <p className="text-ink-soft text-sm">{m.body}</p>
                </article>
              )
            })}
          </div>
        </Container>
      </Section>

      {/* EMPRESAS */}
      <Section id="empresas" tone="soft" padding="md" title={SOBRE_MI.companies.title}>
        <Container size="lg">
          <div className="prose-psz max-w-prose mx-auto mb-10">
            <p>{SOBRE_MI.companies.body}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SOBRE_MI.companies.brands.map((b, i) => (
              <a
                key={i}
                href={b.url}
                target={b.url.startsWith('http') ? '_blank' : undefined}
                rel={b.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="block bg-paper-card border border-navy-100 rounded-lg p-5 hover:border-gold-400 hover:shadow-card transition-all no-underline"
              >
                <h3 className="text-xl font-bold mb-1 text-navy-800">{b.name}</h3>
                <p className="text-xs text-ink-muted">{b.short}</p>
              </a>
            ))}
          </div>
        </Container>
      </Section>

      {/* PODCAST */}
      <Section id="podcast" tone="paper" padding="md" title={SOBRE_MI.podcast.title}>
        <Container size="md">
          <div className="bg-navy-900 text-paper rounded-2xl p-8 md:p-12 text-center shadow-card">
            <p className="text-gold-300 text-sm uppercase tracking-wider mb-4">
              YouTube · Producido y dirigido por Toño
            </p>
            <p className="text-lg leading-relaxed mb-8 text-paper/90 text-left max-w-prose mx-auto">
              {SOBRE_MI.podcast.body}
            </p>
            <Button
              href={SOBRE_MI.podcast.url}
              variant="gold"
              size="lg"
              target="_blank"
              rel="noopener noreferrer"
            >
              {SOBRE_MI.podcast.cta} →
            </Button>
          </div>
        </Container>
      </Section>

      {/* CREDENCIALES */}
      <Section
        id="credenciales"
        tone="soft"
        padding="md"
        title={SOBRE_MI.credentials.title}
        lead={SOBRE_MI.credentials.intro}
      >
        <Container size="lg">
          <div className="grid sm:grid-cols-2 gap-5">
            {SOBRE_MI.credentials.items.map((c, i) => (
              <article
                key={i}
                className="bg-paper-card rounded-xl border border-navy-100 p-6 shadow-soft"
              >
                <p className="text-sm uppercase tracking-wider text-ink-muted mb-2">{c.label}</p>
                <p className="font-semibold text-ink mb-3">{c.value}</p>
                <a
                  href={c.verifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm text-navy-700 hover:text-navy-900 font-medium"
                >
                  {c.verifyText} ↗
                </a>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section tone="navy" padding="lg">
        <Container size="md" className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-paper mb-4">
            ¿Trabajamos juntos?
          </h2>
          <p className="text-paper/80 text-lg mb-8 max-w-prose mx-auto">
            Primera llamada gratis. Si lo prefieres, también puedes unirte primero al canal de
            oportunidades inmobiliarias y conocernos por ahí.
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
            <Button
              href={TELEGRAM_INVESTORS_URL}
              variant="primary"
              size="lg"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-sky-500 text-white border-sky-500 hover:bg-sky-600"
            >
              Canal Telegram inversores
            </Button>
          </div>
        </Container>
      </Section>
    </main>
  )
}
