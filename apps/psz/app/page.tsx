import {
  INVERSIA,
  MORTGAGE_FORM_URL,
  SITE_URLS,
  SOCIAL_LINKS,
  TELEGRAM_INVESTORS_URL,
  TONO,
} from '@psz/seo'
import { Button, Container, CredentialBadge, Section, SocialIcon } from '@psz/ui'
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
            <Stat value="Gratis" label="Llamada inicial sin compromiso" />
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
                className="bg-paper-card rounded-xl border border-navy-100 border-t-4 border-t-gold-400 p-6 shadow-soft hover:shadow-card transition-shadow"
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
              external
            />
            <ServiceCard
              title="Estructuras societarias"
              description="Diseño de holdings nacionales y estructuras societarias internacionales para integrar tu operativa inmobiliaria con la protección patrimonial."
              cta="Hablamos del tema"
              ctaHref="/contacto"
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

      {/* REDES SOCIALES */}
      <Section
        id="redes"
        tone="paper"
        padding="md"
        eyebrow="Sígueme en redes"
        title="Donde te muevas, ahí estoy"
        lead={
          <span>
            Comparto casos reales, análisis del sector y novedades regulatorias en formato corto.
            Cada red para su momento.
          </span>
        }
      >
        <Container size="lg">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SOCIAL_LINKS.map((s) => (
              <a
                key={s.platform}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block bg-paper-card border border-navy-100 rounded-xl p-6 shadow-soft hover:shadow-card transition-all hover:-translate-y-1 no-underline"
                style={{ borderTopColor: s.brandColor, borderTopWidth: 3 }}
              >
                <div
                  className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-lg group-hover:scale-110 transition-transform"
                  style={{ color: s.brandColor, backgroundColor: `${s.brandColor}12` }}
                >
                  <SocialIcon platform={s.platform} size={28} />
                </div>
                <h3 className="text-lg font-semibold text-navy-800">{s.label}</h3>
                <p className="text-sm text-ink-muted mb-2">{s.handle}</p>
                <p className="text-sm text-ink-soft">{s.description}</p>
              </a>
            ))}
          </div>
        </Container>
      </Section>

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

      {/* FORMACIÓN INARPA */}
      <Section
        id="inarpa"
        tone="paper"
        padding="md"
        eyebrow="Formación · INARPA"
        title="El método de un broker en activo, convertido en programa"
        lead={
          <span>
            Fundé <strong>INARPA</strong> (Instituto de Arquitectura Patrimonial) para que el método con el
            que negocio hipotecas, diseño estructuras societarias y compro inmuebles para clientes pueda
            estudiarse de forma ordenada por inversores, profesionales y curiosos del sector.
          </span>
        }
      >
        <Container size="lg">
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-paper-card rounded-xl border border-navy-100 border-t-4 border-t-gold-400 p-6 shadow-soft">
              <p className="text-3xl font-bold text-navy-800 mb-1">7</p>
              <p className="text-sm text-ink-muted uppercase tracking-wider">Escuelas especializadas</p>
              <p className="text-sm text-ink-soft mt-3">
                Análisis de operación, fiscalidad, estructuras societarias, financiación, PSI, compliance y laboratorio de casos.
              </p>
            </div>
            <div className="bg-paper-card rounded-xl border border-navy-100 border-t-4 border-t-navy-700 p-6 shadow-soft">
              <p className="text-3xl font-bold text-navy-800 mb-1">186</p>
              <p className="text-sm text-ink-muted uppercase tracking-wider">Vídeos · 58 h de contenido</p>
              <p className="text-sm text-ink-soft mt-3">
                Material grabado desde casos reales del despacho, con cifras, contratos y errores documentados.
              </p>
            </div>
            <div className="bg-paper-card rounded-xl border border-navy-100 border-t-4 border-t-gold-500 p-6 shadow-soft">
              <p className="text-3xl font-bold text-navy-800 mb-1">230+</p>
              <p className="text-sm text-ink-muted uppercase tracking-wider">Alumnos activos</p>
              <p className="text-sm text-ink-soft mt-3">
                Inversores, brokers asociados ANICI, asesores fiscales y profesionales inmobiliarios.
              </p>
            </div>
          </div>
          <div className="bg-navy-900 text-paper rounded-2xl p-8 md:p-10 shadow-card flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <p className="text-gold-300 text-sm uppercase tracking-wider mb-2">Próxima cohorte abierta</p>
              <p className="text-2xl md:text-3xl font-bold text-paper mb-2">
                Estudia el método que uso cada día con clientes
              </p>
              <p className="text-paper/70 text-base">
                Acceso inmediato, factura con IVA, contenido actualizado con cada cambio normativo.
              </p>
            </div>
            <Button
              href={SITE_URLS.inarpa}
              variant="gold"
              size="lg"
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0"
            >
              Ir a INARPA →
            </Button>
          </div>
        </Container>
      </Section>

      {/* FOOTER */}
      <footer className="bg-navy-900 text-paper/80 py-12">
        <Container size="xl">
          <div className="grid md:grid-cols-3 gap-8 mb-10">
            <div>
              <p className="text-paper font-semibold mb-2 text-lg">{TONO.shortName}</p>
              <p className="text-sm">Broker hipotecario nº {TONO.credentials.bdeId}</p>
              <p className="text-sm">Presidente de ANICI</p>
              <div className="flex gap-3 mt-5">
                {SOCIAL_LINKS.map((s) => (
                  <a
                    key={s.platform}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="text-paper/60 hover:text-gold-300 transition-colors"
                  >
                    <SocialIcon platform={s.platform} size={22} />
                  </a>
                ))}
              </div>
            </div>

            <div className="text-sm space-y-2">
              <p className="text-paper font-semibold mb-3 uppercase text-xs tracking-wider">
                Servicios
              </p>
              <p>
                <a href="/broker-hipotecario" className="text-paper/70 hover:text-paper no-underline">
                  Broker hipotecario
                </a>
              </p>
              <p>
                <a href="/sobre-mi" className="text-paper/70 hover:text-paper no-underline">
                  Sobre Toño y el equipo
                </a>
              </p>
              <p>
                <a href="/blog" className="text-paper/70 hover:text-paper no-underline">
                  Blog
                </a>
              </p>
              <p>
                <a href="/contacto" className="text-paper/70 hover:text-paper no-underline">
                  Contacto
                </a>
              </p>
              <p>
                <a
                  href={SITE_URLS.anici}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-paper/70 hover:text-paper no-underline"
                >
                  ANICI ↗
                </a>
              </p>
              <p>
                <a
                  href={SITE_URLS.inarpa}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-paper/70 hover:text-paper no-underline"
                >
                  INARPA · Formación ↗
                </a>
              </p>
              <p>
                <a
                  href={SITE_URLS.hipobrokers}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-paper/70 hover:text-paper no-underline"
                >
                  Hipobrokers · Podcast ↗
                </a>
              </p>
            </div>

            <div className="text-sm">
              <p className="text-paper font-semibold mb-3 uppercase text-xs tracking-wider">
                Empresa operativa
              </p>
              <p>{INVERSIA.displayName}</p>
              <p>CIF {INVERSIA.taxId}</p>
              <p>
                {INVERSIA.address.street}
                <br />
                {INVERSIA.address.postalCode} {INVERSIA.address.city}, {INVERSIA.address.region}
              </p>
              <p className="mt-2">
                <a
                  href={`mailto:${INVERSIA.email}`}
                  className="text-paper/70 hover:text-paper no-underline"
                >
                  {INVERSIA.email}
                </a>
              </p>
            </div>
          </div>

          <div className="border-t border-navy-700 pt-6 flex flex-col gap-4 text-sm text-paper/60">
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              <a href="/aviso-legal" className="text-paper/60 hover:text-paper no-underline">
                Aviso legal
              </a>
              <a href="/politica-privacidad" className="text-paper/60 hover:text-paper no-underline">
                Privacidad
              </a>
              <a href="/cookies" className="text-paper/60 hover:text-paper no-underline">
                Cookies
              </a>
              <a href="/terminos" className="text-paper/60 hover:text-paper no-underline">
                Términos
              </a>
              <a href="/tarifas-y-comisiones" className="text-paper/60 hover:text-paper no-underline">
                Tarifas
              </a>
              <a href="/informacion-pre-contractual" className="text-paper/60 hover:text-paper no-underline">
                Info pre-contractual
              </a>
              <a href="/reclamaciones" className="text-paper/60 hover:text-paper no-underline">
                Reclamaciones
              </a>
              <a href="/codigo-de-conducta" className="text-paper/60 hover:text-paper no-underline">
                Código de conducta
              </a>
              <a href="/disclaimer-estructuras-internacionales" className="text-paper/60 hover:text-paper no-underline">
                Aviso estructuras internacionales
              </a>
            </div>
            <p>
              © {new Date().getFullYear()} Inversia Global Digital S.L. Todos los derechos
              reservados.
            </p>
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
  external,
}: {
  title: string
  description: string
  cta: string
  ctaHref: string
  accent: 'primary' | 'gold' | 'secondary'
  external?: boolean
}) {
  const extraProps = external
    ? { target: '_blank', rel: 'noopener noreferrer' as const }
    : {}
  return (
    <article className="bg-paper-card rounded-xl border border-navy-100 p-8 shadow-card hover:shadow-hover transition-shadow">
      <h3 className="text-2xl font-semibold mb-3">{title}</h3>
      <p className="text-ink-soft mb-6">{description}</p>
      <Button href={ctaHref} variant={accent} size="md" {...extraProps}>
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
