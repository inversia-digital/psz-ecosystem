import {
  TONO,
  SITE_URLS,
  MORTGAGE_FORM_URL,
  TELEGRAM_INVESTORS_URL,
} from '@psz/seo'
import { Button, Container, CredentialBadge, Section } from '@psz/ui'
import { WHY_TONO_BULLETS } from './_data/whyTono'

const PODCAST_URL = 'https://www.youtube.com/@hipobrokers'

export default function HomePage() {
  return (
    <main>
      {/* HERO */}
      <section className="relative overflow-hidden bg-navy-900 text-paper">
        <Container size="lg" className="py-20 md:py-28">
          <div className="flex flex-col items-start gap-8">
            <div className="flex flex-wrap gap-3">
              <CredentialBadge
                label="Registro BdE"
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
              <CredentialBadge
                label="Asociado nº"
                value={TONO.credentials.aniciId}
                hint="miembro fundador"
                className="border-navy-700 bg-navy-800 text-paper"
              />
            </div>

            <h1 className="text-5xl md:text-7xl font-bold leading-tight text-paper">
              {TONO.shortName},
              <br />
              <span className="text-gold-400">tu broker hipotecario</span>
            </h1>

            <p className="max-w-2xl text-xl text-paper/80">
              Asesoría hipotecaria en toda España. Registrado en Banco de España con el número{' '}
              {TONO.credentials.bdeId}. Presidente de ANICI.{' '}
              <strong className="text-paper">Las hipotecas que tu banco no te cuenta.</strong>
            </p>

            <div className="flex flex-wrap gap-4">
              <Button
                href={MORTGAGE_FORM_URL}
                variant="gold"
                size="lg"
                target="_blank"
                rel="noopener noreferrer"
              >
                Quiero mi hipoteca →
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
          </div>
        </Container>
      </section>

      {/* STAT STRIP */}
      <section className="bg-paper-soft border-y border-navy-100 py-8">
        <Container size="lg">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <Stat value="+100" label="Operaciones cerradas en 2025" />
            <Stat value="+20" label="Bancos negociados" />
            <Stat value="100%" label="Cobertura nacional" />
            <Stat value="0 €" label="Si no firmamos hipoteca" />
          </div>
        </Container>
      </section>

      {/* POR QUÉ TOÑO */}
      <Section
        id="por-que"
        tone="paper"
        padding="md"
        title="Por qué Toño Palacios y no otro broker"
      >
        <Container size="lg">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHY_TONO_BULLETS.map((b, i) => (
              <article
                key={i}
                className="bg-paper-card rounded-xl border border-navy-100 p-6 shadow-soft"
              >
                <h3 className="text-xl font-semibold mb-3 text-navy-800">{b.title}</h3>
                <p className="text-ink-soft text-sm">{b.body}</p>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      {/* SERVICIOS */}
      <Section id="servicios" tone="soft" padding="md" title="Qué hago">
        <Container size="lg">
          <div className="grid md:grid-cols-3 gap-6">
            <ServiceCard
              title="Broker hipotecario"
              description="Negocio tu hipoteca con +20 bancos en toda España. Acceso a productos que no son públicos. Tarifa transparente."
              cta="Solicitar hipoteca"
              ctaHref={MORTGAGE_FORM_URL}
              accent="primary"
            />
            <ServiceCard
              title="Personal Shopper Inmobiliario"
              description="Localizo oportunidades de inversión no públicas. Análisis de rentabilidad y negociación de la operación completa."
              cta="Ver oportunidades"
              ctaHref={TELEGRAM_INVESTORS_URL}
              accent="gold"
            />
            <ServiceCard
              title="Pillar broker hipotecario"
              description="¿Qué hace un broker, en qué se diferencia de un comparador o un banco, comisiones, proceso paso a paso, FAQ y casos."
              cta="Leer la guía completa"
              ctaHref="/broker-hipotecario"
              accent="secondary"
            />
          </div>
        </Container>
      </Section>

      {/* PROOF / AUTORIDAD */}
      <section className="bg-paper py-20">
        <Container size="md">
          <div className="text-center">
            <p className="text-sm uppercase tracking-wider text-ink-muted mb-4">
              Autoridad verificable
            </p>
            <h2 className="text-4xl font-bold mb-6">
              El único broker hipotecario
              <br />
              <span className="text-navy-700">que es presidente de la asociación nacional</span>
            </h2>
            <p className="text-lg text-ink-soft mb-8">
              Toño Palacios es presidente de <strong>ANICI</strong> (Asociación Nacional de Intermediarios
              en Crédito Inmobiliario) y asociado fundador {TONO.credentials.aniciId}. Esto es
              comprobable en{' '}
              <a href={SITE_URLS.anici} target="_blank" rel="noopener noreferrer">
                anici.es
              </a>
              {' '}y en el{' '}
              <a href={TONO.credentials.bdeUrl} target="_blank" rel="noopener noreferrer">
                registro oficial del Banco de España
              </a>
              {' '}(buscando "{TONO.credentials.bdeId}").
            </p>
            <Button href="/sobre-mi" variant="primary" size="lg">
              Conoce mi historia
            </Button>
          </div>
        </Container>
      </section>

      {/* PODCAST */}
      <Section id="podcast" tone="soft" padding="md">
        <Container size="md">
          <div className="bg-navy-900 text-paper rounded-2xl p-8 md:p-12 shadow-card">
            <p className="text-gold-300 text-sm uppercase tracking-wider mb-3">
              Podcast Hipobrokers · YouTube
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-paper">
              La voz del intermediario también necesita altavoz
            </h2>
            <p className="text-paper/80 text-lg leading-relaxed mb-6 max-w-prose">
              Dirijo y produzco el podcast Hipobrokers, donde abordamos casos reales del sector
              hipotecario, regulación, conversaciones con notarios, asesores fiscales y otros
              brokers asociados en ANICI.
            </p>
            <Button
              href={PODCAST_URL}
              variant="gold"
              size="lg"
              target="_blank"
              rel="noopener noreferrer"
            >
              Ver en YouTube →
            </Button>
          </div>
        </Container>
      </Section>

      {/* FOOTER provisional */}
      <footer className="bg-navy-900 text-paper/80 py-12">
        <Container size="xl">
          <div className="flex flex-col md:flex-row justify-between gap-8">
            <div>
              <p className="text-paper font-semibold mb-2">{TONO.shortName}</p>
              <p className="text-sm">Broker hipotecario nº {TONO.credentials.bdeId}</p>
              <p className="text-sm">Presidente de ANICI · Asociado {TONO.credentials.aniciId}</p>
            </div>
            <div className="text-sm">
              <p>Inversia Global Digital S.L. · CIF B75281394</p>
              <p>Polígono Alcoz Alto 21, 50410 Cuarte de Huerva, Zaragoza</p>
              <p>+34 876 280 545 · info@inversiadigital.es</p>
            </div>
          </div>
          <div className="border-t border-navy-700 mt-8 pt-6 text-sm text-paper/60">
            © {new Date().getFullYear()} Inversia Global Digital S.L. Todos los derechos reservados.
          </div>
        </Container>
      </footer>
    </main>
  )
}

function ServiceCard({
  title,
  description,
  cta,
  ctaHref,
  accent,
}: {
  title: string
  description: string
  cta: string
  ctaHref: string
  accent: 'primary' | 'gold' | 'secondary'
}) {
  return (
    <article className="bg-paper-card rounded-xl border border-navy-100 p-8 shadow-card hover:shadow-hover transition-shadow">
      <h3 className="text-2xl font-semibold mb-3">{title}</h3>
      <p className="text-ink-soft mb-6">{description}</p>
      <Button href={ctaHref} variant={accent} size="md">
        {cta} →
      </Button>
    </article>
  )
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="text-3xl md:text-4xl font-bold text-navy-800 leading-tight">{value}</p>
      <p className="text-xs md:text-sm text-ink-muted mt-1">{label}</p>
    </div>
  )
}
