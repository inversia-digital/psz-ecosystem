import {
  TONO,
  SITE_URLS,
  MORTGAGE_FORM_URL,
  TELEGRAM_INVESTORS_URL,
} from '@psz/seo'
import { Button, Container, CredentialBadge } from '@psz/ui'

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
              <span className="text-gold-400">broker hipotecario</span>
              <br />
              en Zaragoza
            </h1>

            <p className="max-w-2xl text-xl text-paper/80">
              Registrado en Banco de España con el número {TONO.credentials.bdeId}.
              Presidente de ANICI. <strong className="text-paper">Las hipotecas que tu banco no te cuenta.</strong>
            </p>

            <div className="flex flex-wrap gap-4">
              <Button href={MORTGAGE_FORM_URL} variant="gold" size="lg">
                Quiero mi hipoteca →
              </Button>
              <Button
                href={TELEGRAM_INVESTORS_URL}
                variant="secondary"
                size="lg"
                className="bg-navy-800 text-paper border-navy-600 hover:bg-navy-700"
              >
                Canal Telegram inversores
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* SERVICIOS */}
      <section className="bg-paper py-20">
        <Container size="lg">
          <h2 className="text-4xl font-bold mb-12 text-center">Qué hago</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <ServiceCard
              title="Broker hipotecario"
              description="Negocio tu hipoteca con +20 bancos. Acceso a productos que no son públicos. Tarifa transparente."
              cta="Solicitar hipoteca"
              ctaHref={MORTGAGE_FORM_URL}
              accent="primary"
            />
            <ServiceCard
              title="Personal Shopper Inmobiliario"
              description="Localizo oportunidades de inversión no públicas en Zaragoza. Análisis de rentabilidad y negociación."
              cta="Ver oportunidades"
              ctaHref={TELEGRAM_INVESTORS_URL}
              accent="gold"
            />
            <ServiceCard
              title="Formación INARPA"
              description="Instituto propio de formación en inversión patrimonial. 8 escuelas, casos reales, mentorías."
              cta="Ir a INARPA"
              ctaHref={SITE_URLS.inarpa}
              accent="secondary"
            />
          </div>
        </Container>
      </section>

      {/* PROOF / AUTORIDAD */}
      <section className="bg-paper-soft py-20">
        <Container size="md">
          <div className="text-center">
            <p className="text-sm uppercase tracking-wider text-ink-muted mb-4">
              Autoridad verificable
            </p>
            <h2 className="text-4xl font-bold mb-6">
              El único broker hipotecario en Zaragoza
              <br />
              <span className="text-navy-700">que es presidente de la asociación nacional</span>
            </h2>
            <p className="text-lg text-ink-soft mb-8">
              Toño Palacios es presidente de <strong>ANICI</strong> (Asociación Nacional de Intermediarios
              en Crédito Inmobiliario) y asociado fundador {TONO.credentials.aniciId}. Esto es
              comprobable en {' '}
              <a href={SITE_URLS.anici} target="_blank" rel="noopener noreferrer">
                anici.es
              </a>
              {' '}y en el {' '}
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
