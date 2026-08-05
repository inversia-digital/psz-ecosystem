import type { Metadata } from 'next'
import {
  SITE_URLS,
  TONO,
  breadcrumbSchema,
  faqPageSchema,
} from '@psz/seo'
import { Button, Container, CredentialBadge, Faq, JsonLd, Section } from '@psz/ui'

const URL = `${SITE_URLS.psz}/canal-telegram-inversion-inmobiliaria`
/** Enlace de invitación trackeado (origen WEB psz.es). */
const CANAL = 'https://t.me/+WXV4l2QyCLUzZmM6'

export const metadata: Metadata = {
  title: 'Canal de Telegram de inversión inmobiliaria · PSZ 360 (Toño Palacios, broker E242)',
  description:
    'Canal de Telegram donde publico oportunidades de inversión inmobiliaria en España con las 3 rentabilidades netas de cada operación (pesimista, realista y optimista), la financiación y la reforma. Gratis, sin humo y con los números por delante. Por Toño Palacios, broker hipotecario nº E242 del Banco de España.',
  alternates: { canonical: URL },
  robots: { index: true, follow: true },
  authors: [{ name: TONO.fullName, url: `${SITE_URLS.psz}/sobre-mi` }],
  creator: `${TONO.fullName} (${TONO.shortName})`,
  publisher: 'Inversia Global Digital, S.L.U.',
  keywords: [
    'canal de telegram inversion inmobiliaria',
    'canal telegram inmobiliario',
    'grupo telegram inversion inmobiliaria',
    'canales de telegram para invertir en pisos',
    'oportunidades de inversion inmobiliaria',
    'inversion inmobiliaria espana',
    'pisos rentables telegram',
    'rentabilidad neta alquiler',
  ],
  openGraph: {
    type: 'website',
    url: URL,
    siteName: 'psz.es',
    locale: 'es_ES',
    title: 'Canal de Telegram de inversión inmobiliaria — PSZ 360',
    description:
      'Oportunidades con las 3 rentabilidades netas de cada operación (pesimista · realista · optimista). Por Toño Palacios, broker E242.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Canal de Telegram de inversión inmobiliaria · PSZ 360',
    description: 'Cada operación con sus 3 rentabilidades netas. Por Toño Palacios, broker E242.',
  },
}

const FAQ = [
  {
    question: '¿Qué se publica en el canal?',
    answer:
      'Oportunidades de inversión inmobiliaria en España que he analizado personalmente, con el precio, la inversión real total (impuestos y gastos incluidos), la reforma si la necesita y las tres rentabilidades netas del escenario pesimista, realista y optimista. También análisis de operaciones que he descartado y por qué, que suele enseñar más que las que salen bien.',
  },
  {
    question: '¿Cuesta algo entrar?',
    answer:
      'No. El canal es gratuito y puedes salirte cuando quieras. Mis honorarios los cobro cuando acompaño una operación concreta como broker o personal shopper inmobiliario, no por publicar análisis.',
  },
  {
    question: '¿Es un canal de "chollos"?',
    answer:
      'No. La mayoría de lo que se anuncia como chollo no aguanta el cálculo cuando le restas ITP, notaría, registro, reforma, seguros, comunidad, IBI y periodos sin inquilino. En el canal verás la rentabilidad neta después de todo eso, que casi siempre es varios puntos inferior a la bruta del anuncio.',
  },
  {
    question: '¿Puedo escribir o preguntar?',
    answer:
      'El canal es de publicación, así que no es un grupo de chat: evita el ruido y las respuestas de gente que no conoces sobre tu dinero. Si una operación te encaja, escribes directamente y la estudiamos.',
  },
  {
    question: '¿Quién publica?',
    answer: `${TONO.fullName}, intermediario de crédito inmobiliario registrado en el Banco de España con el número ${TONO.credentials.bdeId}. Puedes comprobarlo en el registro oficial del Banco de España antes de hacerme caso en nada.`,
  },
  {
    question: '¿Recibiré muchos mensajes?',
    answer:
      'No. Publico cuando hay algo que merece la pena: una operación analizada o un análisis útil. Prefiero un canal que se lee a uno que se silencia.',
  },
]

export default function CanalTelegramPage() {
  return (
    <main>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Inicio', url: SITE_URLS.psz },
          { name: 'Canal de Telegram', url: URL },
        ])}
      />
      <JsonLd data={faqPageSchema(FAQ)} />

      {/* HERO */}
      <Section tone="navy" padding="lg">
        <Container size="lg">
          <nav aria-label="Migas de pan" className="mb-6">
            <a
              href="/"
              className="inline-flex items-center gap-1.5 text-sm text-paper/65 hover:text-gold-300 no-underline transition-colors"
            >
              <span aria-hidden>←</span> Inicio
            </a>
            <span className="text-paper/30 mx-2" aria-hidden>
              ›
            </span>
            <span className="text-sm text-paper/85">Canal de Telegram</span>
          </nav>

          <p className="text-gold-300 text-sm uppercase tracking-wider mb-3">
            Canal gratuito · publicación, no chat
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-paper leading-tight mb-4">
            Canal de Telegram de inversión inmobiliaria
          </h1>
          <p className="speakable-summary text-lg text-paper/85 max-w-3xl mb-6">
            Publico las oportunidades que analizo en España con las <strong>tres rentabilidades
            netas</strong> de cada operación —pesimista, realista y optimista—, la financiación que
            admite y la reforma que necesita. Sin porcentajes redondos y sin la palabra chollo.
          </p>

          <div className="flex flex-wrap gap-3 mb-8">
            <CredentialBadge
              label="BdE nº"
              value={TONO.credentials.bdeId}
              href={TONO.credentials.bdeUrl}
              hint="verificable"
              className="border-navy-700 bg-navy-800 text-paper"
            />
            <CredentialBadge
              label="Canal"
              value="PSZ 360"
              hint="gratuito"
              className="border-navy-700 bg-navy-800 text-paper"
            />
          </div>

          <div className="flex flex-wrap gap-4">
            <Button href={CANAL} variant="gold" size="lg" target="_blank" rel="noopener noreferrer">
              Entrar en el canal →
            </Button>
            <Button href="/test-anti-humo-inmobiliario" variant="primary" size="lg">
              Probar antes el test anti-humo
            </Button>
          </div>
        </Container>
      </Section>

      {/* QUÉ VAS A VER */}
      <Section padding="lg" title="Qué vas a ver dentro">
        <Container size="md">
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                t: 'Operaciones con los números completos',
                d: 'Precio, ITP de la comunidad, notaría, registro, gestoría, reforma y honorarios. La inversión real total, no el precio del anuncio.',
              },
              {
                t: 'Tres escenarios, siempre netos',
                d: 'Pesimista, realista y optimista. Si solo te enseñan un número, te están enseñando el que mejor queda.',
              },
              {
                t: 'La financiación, resuelta',
                d: 'Qué LTV admite la operación, qué banco suele entrar y cuánto dinero tienes que poner de verdad.',
              },
              {
                t: 'Las que descarto y por qué',
                d: 'Los análisis de lo que NO compro enseñan más que los de lo que compro. Ahí está el criterio.',
              },
            ].map((x) => (
              <div
                key={x.t}
                className="rounded-xl border border-navy-100 bg-paper-soft p-5"
              >
                <h3 className="font-bold text-navy-900 mb-1.5">{x.t}</h3>
                <p className="text-sm text-ink-soft leading-relaxed">{x.d}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* FAQ */}
      <Section tone="soft" padding="md" title="Preguntas frecuentes">
        <Container size="md">
          <Faq items={FAQ} />
        </Container>
      </Section>

      {/* CTA final */}
      <Section tone="navy" padding="lg">
        <Container size="md" className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-paper mb-4">
            Entra y júzgalo por los números
          </h2>
          <p className="text-paper/80 text-lg mb-8 max-w-prose mx-auto">
            Si en dos semanas no te aporta nada, te sales y ya está. Lo que no vas a encontrar es
            una rentabilidad redonda sin el desglose que la sostiene.
          </p>
          <Button href={CANAL} variant="gold" size="lg" target="_blank" rel="noopener noreferrer">
            Unirme al canal PSZ 360 →
          </Button>
          <p className="text-paper/55 text-xs mt-6 max-w-prose mx-auto leading-relaxed">
            El contenido del canal es informativo y no constituye asesoramiento de inversión
            personalizado ni recomendación de compra. Cada operación exige su propio análisis.
          </p>
        </Container>
      </Section>
    </main>
  )
}
