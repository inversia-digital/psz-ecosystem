import type { Metadata } from 'next'
import {
  MORTGAGE_FORM_URL,
  SITE_URLS,
  SOCIAL_LINKS,
  TELEGRAM_INVESTORS_URL,
  TONO,
  faqPageSchema,
  organizationSchema,
  personSchema,
  speakableWebPageSchema,
  websiteSchema,
} from '@psz/seo'
import { Button, Container, CredentialBadge, Faq, JsonLd, Section, SocialIcon } from '@psz/ui'
import { WHY_TONO_BULLETS } from './_data/whyTono'

const PODCAST_URL = 'https://www.youtube.com/@hipobrokers'

/**
 * FAQ curada para la HOME — selección corta (7 Q&As) que cubre los intents
 * más buscados y deja respuestas <40 palabras citables para AI Overviews.
 * El hub completo está en /preguntas-frecuentes.
 */
const HOME_FAQ = [
  {
    question: '¿Quién es Toño Palacios, el broker hipotecario?',
    answer:
      'Toño Palacios es el nombre profesional de Antonio Palacios Cambero, broker hipotecario en España registrado en el Banco de España con el número E242 y presidente de ANICI (Asociación Nacional de Intermediarios en Crédito Inmobiliario, asociado fundador ANICI-001). Fundador del instituto INARPA. Su actividad profesional es exclusivamente la intermediación de crédito inmobiliario regulada por la Ley 5/2019.',
  },
  {
    question: '¿Qué hace un broker hipotecario?',
    answer:
      'Un broker hipotecario o intermediario de crédito inmobiliario negocia con varios bancos en nombre del cliente para conseguir las mejores condiciones de hipoteca. En España la actividad está regulada por la Ley 5/2019 y supervisada por el Banco de España.',
  },
  {
    question: '¿Cuánto cobra Toño Palacios?',
    answer:
      'Reserva inicial de 600 € al firmar el contrato de intermediación y honorarios a éxito de entre tres mil y cuatro mil quinientos euros al cierre, según complejidad. Tarifa pública en psz.es/tarifas-y-comisiones, conforme a Orden EHA/2899/2011.',
  },
  {
    question: '¿Cómo verifico que Toño Palacios está registrado en el Banco de España?',
    answer:
      'En la consulta pública oficial app.bde.es/rbe_spa buscando por código "E242", por CIF "B75281394" o por razón social "INVERSIA GLOBAL DIGITAL". La consulta es gratuita y sin registro.',
  },
  {
    question: '¿Dónde opera Toño Palacios?',
    answer:
      'En toda España. Oficina legal en Cuarte de Huerva (Zaragoza), servicio 100% digital salvo la firma en notaría, a la que se acompaña al cliente si lo solicita. Clientes en Madrid, Barcelona, Valencia, Sevilla y resto del país.',
  },
  {
    question: '¿Cómo elijo un buen broker hipotecario?',
    answer:
      'Verifica tres cosas: (1) número de registro en el Banco de España, público y consultable; (2) honorarios por escrito antes de empezar; (3) negociación simultánea con varias entidades, no en exclusiva con una. Toño Palacios (E242) cumple los tres criterios.',
  },
  {
    question: '¿Qué servicios ofrece Toño Palacios además de broker hipotecario?',
    answer:
      'Tres servicios complementarios: broker hipotecario (negociación con +20 entidades), Personal Shopper Inmobiliario (operaciones de inversión no públicas) y diseño de estructuras societarias. Adicionalmente formación a través del instituto INARPA que también fundó.',
  },
] as const

export const metadata: Metadata = {
  title: 'Toño Palacios — Broker hipotecario nº E242 (BdE) · Presidente de ANICI',
  description:
    'Broker hipotecario en toda España. Registrado en el Banco de España con el número E242 y presidente de ANICI. Más de 100 operaciones cerradas en 2025. Acceso a +20 entidades y a productos no públicos. Las hipotecas que tu banco no te cuenta.',
  alternates: { canonical: SITE_URLS.psz },
  robots: { index: true, follow: true },
  authors: [{ name: TONO.fullName, url: `${SITE_URLS.psz}/sobre-mi` }],
  creator: TONO.fullName,
  publisher: 'Inversia Global Digital, S.L.U.',
  keywords: [
    'broker hipotecario',
    'broker hipotecario España',
    'Toño Palacios',
    'intermediario crédito inmobiliario',
    'E242 Banco de España',
    'presidente ANICI',
    'Antonio Palacios Cambero',
    'hipoteca para autónomos',
    'hipoteca no residentes',
    'Personal Shopper Inmobiliario',
  ],
  openGraph: {
    type: 'website',
    url: SITE_URLS.psz,
    siteName: 'psz.es',
    title: 'Toño Palacios — Broker hipotecario nº E242 y presidente de ANICI',
    description:
      'Broker hipotecario en toda España. Acceso a +20 entidades y productos no públicos. Las hipotecas que tu banco no te cuenta.',
    locale: 'es_ES',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Toño Palacios — Broker hipotecario nº E242',
    description: 'Broker hipotecario en toda España. Presidente de ANICI. Las hipotecas que tu banco no te cuenta.',
  },
}

export default function HomePage() {
  return (
    <main>
      {/* JSON-LD — home como nodo central del knowledge graph */}
      <JsonLd data={websiteSchema()} />
      <JsonLd data={organizationSchema()} />
      <JsonLd data={personSchema()} />
      <JsonLd data={faqPageSchema([...HOME_FAQ])} />
      <JsonLd
        data={speakableWebPageSchema({
          url: SITE_URLS.psz,
          name: 'Toño Palacios — Broker hipotecario nº E242 y presidente de ANICI',
          description:
            'Broker hipotecario en toda España. Más de 100 operaciones cerradas en 2025, acceso a +20 entidades y productos no públicos.',
          cssSelectors: ['h1', '.speakable-summary', 'summary'],
        })}
      />

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

            <p className="speakable-summary max-w-2xl text-xl text-paper/80">
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

      {/* FAQ ESENCIAL — versión corta citable. Hub completo en /preguntas-frecuentes */}
      <Section
        id="faq"
        tone="paper"
        padding="md"
        eyebrow="Preguntas frecuentes · Respuestas verificadas"
        title="Lo que la gente pregunta antes de contratar"
        lead={
          <span>
            Estas 7 preguntas concentran el 80% de las dudas que recibo. Si tienes alguna más,
            está respondida en{' '}
            <a href="/preguntas-frecuentes" className="text-navy-700 underline hover:text-navy-900">
              el hub de preguntas frecuentes
            </a>
            .
          </span>
        }
      >
        <Container size="md">
          <Faq items={[...HOME_FAQ]} />
          <div className="mt-8 grid sm:grid-cols-2 gap-3 max-w-xl mx-auto">
            <a
              href="/preguntas-frecuentes"
              className="block bg-paper-soft border border-navy-100 rounded-lg p-4 text-center hover:border-gold-400 hover:shadow-card transition-all no-underline"
            >
              <p className="text-sm font-bold text-navy-800">Hub completo</p>
              <p className="text-xs text-ink-muted">53+ preguntas verificadas</p>
            </a>
            <a
              href="/hipoteca-primera-vivienda"
              className="block bg-paper-soft border border-navy-100 rounded-lg p-4 text-center hover:border-gold-400 hover:shadow-card transition-all no-underline"
            >
              <p className="text-sm font-bold text-navy-800">¿Es tu primera hipoteca?</p>
              <p className="text-xs text-ink-muted">Guía completa del comprador primerizo</p>
            </a>
          </div>
        </Container>
      </Section>

      {/* HERRAMIENTAS GRATIS — value-give entre Proof y Redes */}
      <Section
        id="herramientas"
        tone="soft"
        padding="md"
        eyebrow="Herramientas gratis · Usa sin compromiso"
        title="Calcula antes de hablar conmigo"
        lead={
          <span>
            Tres herramientas propietarias para que entiendas tu operación antes de que hablemos.
            La lógica corre en servidor — los rangos críticos que dispara son trabajo de años de
            práctica del despacho, no un script genérico.{' '}
            <a href="/herramientas" className="text-navy-700 underline hover:text-navy-900 font-semibold">
              Ver catálogo completo →
            </a>
          </span>
        }
      >
        <Container size="lg">
          <div className="grid md:grid-cols-3 gap-6">
            <ToolCard
              icon="🏠"
              title="Calculadora de hipoteca"
              description="Cuota mensual, intereses totales, LTV y ratio de esfuerzo. Avisos automáticos sobre rangos que afectarían al scoring bancario."
              href="/calculadora-hipoteca"
              cta="Calcular cuota"
              ribeteClass="bg-gold-400"
            />
            <ToolCard
              icon="🧮"
              title="Capacidad de endeudamiento"
              description="¿Cuánto te daría realmente el banco? 3 escenarios paralelos según ratio de esfuerzo (30%, 35%, 40%) con avisos sobre scoring bancario."
              href="/calculadora-capacidad-endeudamiento"
              cta="Ver mi capacidad"
              ribeteClass="bg-emerald-500"
            />
            <ToolCard
              icon="📈"
              title="Rentabilidad inmobiliaria"
              description="Rentabilidad de adquisición, real, flujo neto mensual y amortización del ITP en 3 escenarios paralelos. Para no enamorarte de la renta del anuncio."
              href="/calculadora-rentabilidad-inmobiliaria"
              cta="Calcular rentabilidad"
              ribeteClass="bg-sky-500"
            />
          </div>
        </Container>
      </Section>

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
              <p className="text-3xl font-bold text-navy-800 mb-1">4</p>
              <p className="text-sm text-ink-muted uppercase tracking-wider">Rutas de aprendizaje</p>
              <p className="text-sm text-ink-soft mt-3">
                Pensadas para perfiles distintos: inversor, broker hipotecario, profesional inmobiliario y asesor patrimonial. Cohorte fundadora con plazas limitadas.
              </p>
            </div>
          </div>
          <div className="bg-navy-900 text-paper rounded-2xl p-8 md:p-10 shadow-card flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <p className="text-gold-300 text-sm uppercase tracking-wider mb-2">Cohorte fundadora · Inscripción abierta</p>
              <p className="text-2xl md:text-3xl font-bold text-paper mb-2">
                Estudia el método que uso cada día con clientes
              </p>
              <p className="text-paper/70 text-base">
                Plazas limitadas en la primera cohorte. Factura con IVA. Contenido actualizado con cada cambio normativo.
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

      {/* Footer global gestionado desde app/layout.tsx — aparece en todas las páginas */}
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

function ToolCard({
  icon,
  title,
  description,
  href,
  cta,
  ribeteClass,
}: {
  icon: string
  title: string
  description: string
  href: string
  cta: string
  /** Tailwind bg-* class para el ribete superior de color de la card */
  ribeteClass: string
}) {
  return (
    <a
      href={href}
      className="group relative block bg-paper-card rounded-xl border border-navy-100 p-8 pt-9 shadow-soft hover:shadow-card hover:border-navy-200 transition-all no-underline overflow-hidden"
    >
      {/* Ribete superior de color */}
      <span
        aria-hidden
        className={`absolute top-0 left-0 right-0 h-1.5 ${ribeteClass}`}
      />
      <div
        aria-hidden
        className="text-2xl mb-4 inline-flex items-center justify-center w-12 h-12 rounded-lg bg-paper-soft border border-navy-100"
      >
        {icon}
      </div>
      <h3 className="text-2xl font-semibold mb-3 text-navy-800">{title}</h3>
      <p className="text-ink-soft mb-6 leading-relaxed">{description}</p>
      <span className="inline-flex items-center gap-1 text-gold-700 group-hover:text-gold-600 font-bold text-sm">
        {cta}
        <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
      </span>
    </a>
  )
}
