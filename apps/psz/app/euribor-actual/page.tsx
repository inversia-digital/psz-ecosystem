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
import { Button, Container, Faq, JsonLd, Section } from '@psz/ui'
import { AnswerCard } from '../_components/AnswerCard'
import { LegalDisclaimer } from '../_components/LegalDisclaimer'
import { SelloPalacios } from '../_components/SelloPalacios'
import { EURIBOR_REVALIDATE_SECONDS, getEuribor } from './euribor-bde'
import {
  BDE_PAGE_URL,
  BDE_SOURCE_LABEL,
  EURIBOR_HISTORY,
  MONTHS_ES,
  dateLabel,
  dateShort,
  formatBps,
  formatPct,
  monthLabel,
  nextMonth,
  type EuriborSnapshot,
} from './euribor-data'

const URL = `${SITE_URLS.psz}/euribor-actual`

// ─────────────────────────────────────────────────────────────────────────
// Página viva: el dato se lee del CSV diario del Banco de España en servidor
// (euribor-bde.ts) y se regenera cada 12 h. Si el BdE falla, se usa el
// respaldo de euribor-data.ts. Ver la cabecera de euribor-data.ts.
// ─────────────────────────────────────────────────────────────────────────
export const revalidate = EURIBOR_REVALIDATE_SECONDS

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

export async function generateMetadata(): Promise<Metadata> {
  const e = await getEuribor()
  const hoy = formatPct(e.daily.valuePct)
  const mes = formatPct(e.closed.valuePct)
  return {
    title: `Euríbor hoy: ${hoy} (${dateShort(e.daily.date)}) · media ${MONTHS_ES[e.closed.month - 1]} ${mes}`,
    description: `Euríbor a 12 meses del Banco de España: ${hoy} el ${dateLabel(e.daily.date)}; media de ${monthLabel(e.closed)} ${mes} (${formatBps(e.monthOverMonthBps)} respecto a ${monthLabel(e.previous)}, tendencia ${e.trend}). Página viva que se actualiza sola con el dato oficial: qué revisiones usan cada valor, histórico desde 2008 y cómo afecta a tu cuota. Por Toño Palacios, broker hipotecario nº E242 (Banco de España).`,
    alternates: { canonical: URL },
    robots: { index: true, follow: true },
    authors: [{ name: TONO.fullName, url: `${SITE_URLS.psz}/sobre-mi` }],
    creator: `${TONO.fullName} (${TONO.shortName})`,
    publisher: 'Inversia Global Digital, S.L.U.',
    keywords: [
      'euribor actual',
      'euribor hoy',
      'euribor 12 meses',
      `euribor ${monthLabel(e.closed)}`,
      ...(e.current ? [`euribor ${monthLabel(e.current)}`] : []),
      'cuanto es el euribor',
      'euribor banco de España',
      'evolucion euribor historico',
      'euribor revision hipoteca',
      'cuanto sube mi cuota euribor',
    ],
    openGraph: {
      type: 'article',
      url: URL,
      siteName: 'psz.es',
      locale: 'es_ES',
      title: `Euríbor hoy: ${hoy} · media de ${monthLabel(e.closed)}: ${mes}`,
      description: `Dato oficial del Banco de España, actualizado cada día hábil. Histórico, impacto en tu hipoteca y qué hacer ante una revisión. Por Toño Palacios, broker E242.`,
      authors: [TONO.fullName],
    },
    twitter: {
      card: 'summary_large_image',
      title: `Euríbor hoy: ${hoy} (${dateShort(e.daily.date)})`,
      description: `Dato oficial del Banco de España. Por Toño Palacios, broker E242.`,
    },
  }
}

function buildFaq(e: EuriborSnapshot) {
  const hoy = formatPct(e.daily.valuePct)
  const mes = formatPct(e.closed.valuePct)
  const siguiente = nextMonth(e.closed)
  return [
    {
      question: '¿Cuánto es el euríbor a 12 meses hoy?',
      answer: `El último dato diario publicado por el Banco de España es ${hoy}, correspondiente al ${dateLabel(e.daily.date)}. Para las revisiones de hipoteca no se usa el dato de un día concreto, sino la media mensual: la de ${monthLabel(e.closed)}, ya cerrada, es ${mes}.${e.current ? ` La media provisional de ${monthLabel(e.current)}, con ${e.current.days} días hábiles, va por ${formatPct(e.current.valuePct)}.` : ''}`,
    },
    {
      question: '¿Qué euríbor se aplica a la revisión de mi hipoteca?',
      answer: `El del mes de referencia que fija tu escritura, normalmente el mes anterior o dos meses antes de la fecha de revisión. Ese valor es la media aritmética de los datos diarios del mes, que el Banco de España publica en los primeros días del mes siguiente. La media de ${monthLabel(e.closed)} (${mes}) es la que usan las revisiones con ese mes de referencia, en la práctica las que se calculan en ${MONTHS_ES[siguiente.month - 1]} o en el mes siguiente. Las revisiones son semestrales o anuales según contrato y la cuota nueva entra en vigor en el periodo siguiente.`,
    },
    {
      question: '¿Qué es exactamente el euríbor y por qué afecta a mi hipoteca?',
      answer:
        'El euríbor (Euro Interbank Offered Rate) es el tipo de interés al que los bancos europeos se prestan dinero entre sí. Las hipotecas variables españolas se referencian habitualmente al euríbor a 12 meses más un diferencial pactado en la escritura. Cuando el euríbor sube, sube tu cuota; cuando baja, baja. La revisión es automática cada 6 o 12 meses según contrato.',
    },
    {
      question: '¿Cómo se calcula mi cuota nueva tras una revisión?',
      answer: `Tu tipo de interés nominal pasa a ser el euríbor del mes de referencia más tu diferencial pactado, que es fijo. Si tu hipoteca dice «euríbor 12M + 0,85%» y el euríbor de tu mes de referencia es ${mes}, tu tipo pasa a ${formatPct(e.closed.valuePct + 0.85)}. Con ese tipo nuevo y el capital pendiente, el banco recalcula la cuota para el plazo que queda.`,
    },
    {
      question: `¿Está subiendo o bajando el euríbor en ${e.closed.year}?`,
      answer: `La media de ${monthLabel(e.closed)} es ${mes}, ${formatBps(e.monthOverMonthBps)} respecto a ${monthLabel(e.previous)} (${formatPct(e.previous.valuePct)}): tendencia ${e.trend}. En 2026 el euríbor a 12 meses ha pasado de una media de 2,221% en febrero a 3,247% en septiembre, y volvió a superar el 3% por primera vez desde agosto de 2024. Esta página no hace previsiones: muestra el dato oficial y lo que ya ha pasado.`,
    },
    {
      question: '¿Cuál ha sido el euríbor más alto de la historia?',
      answer:
        'El máximo histórico del euríbor a 12 meses es la media de julio de 2008, 5,393%, justo antes del estallido de la crisis financiera. El segundo pico relevante es octubre de 2023, con 4,160%, tras las subidas de tipos del BCE para contener la inflación.',
    },
    {
      question: '¿Y el más bajo?',
      answer:
        'El mínimo histórico es la media de enero de 2021, -0,505%, durante la política expansiva del BCE en la pandemia. El euríbor a 12 meses estuvo en negativo seis años seguidos, de febrero de 2016 a marzo de 2022. Las hipotecas firmadas en ese periodo conservan su diferencial, pero el tipo aplicado fue mínimo durante años.',
    },
    {
      question: 'Si el euríbor sube, ¿me interesa pasar la hipoteca a tipo fijo?',
      answer:
        'Depende de tres factores: cuántos años te quedan (más años, más impacto acumulado), qué tipo fijo te ofrece hoy el mercado frente a tu variable, y lo que cuesta el cambio. Pasar de variable a fijo, por novación o subrogación, tiene la compensación limitada por la Ley 5/2019 (art. 23.6) al 0,05% del capital pendiente durante los tres primeros años del préstamo y a nada después. Usa el stress test del euríbor para cuantificar el impacto y decide con números.',
    },
    {
      question: '¿Dónde verifico el euríbor oficial?',
      answer: `En la fuente primaria, el Banco de España: ${BDE_PAGE_URL} (tipos de interés, cuadro 1.7, euríbor a 12 meses). Esta página lee ese mismo dato y lo actualiza sola cada día hábil. Otros portales lo reproducen, pero la fuente autoritativa es el BdE.`,
    },
    {
      question: '¿Por qué se usa el euríbor a 12 meses y no el de 6 o 3 meses?',
      answer:
        'En España la práctica bancaria ha convergido en el euríbor a 12 meses como referencia estándar de las hipotecas residenciales, por su menor volatilidad frente a los plazos cortos. El euríbor a 6 y 3 meses existe, pero se usa en productos profesionales o préstamos comerciales, no en la hipoteca residencial habitual.',
    },
  ]
}

export default async function EuriborActualPage() {
  const e = await getEuribor()
  const FAQ = buildFaq(e)
  const siguiente = nextMonth(e.closed)
  const history = [
    ...EURIBOR_HISTORY,
    {
      label: cap(monthLabel(e.closed)),
      valuePct: e.closed.valuePct,
      context: 'Último mes cerrado (dato que usan las revisiones)',
    },
  ]

  return (
    <main>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Inicio', url: SITE_URLS.psz },
          { name: 'Euríbor actual', url: URL },
        ])}
      />
      <JsonLd
        data={articleSchema({
          headline: `Euríbor hoy: ${formatPct(e.daily.valuePct)} (${dateLabel(e.daily.date)})`,
          description: `Euríbor a 12 meses del Banco de España: dato diario y media mensual de ${monthLabel(e.closed)} (${formatPct(e.closed.valuePct)}). Histórico, impacto en hipoteca variable y revisiones.`,
          url: URL,
          datePublished: '2026-05-14',
          dateModified: e.fetchedAt,
        })}
      />
      <JsonLd data={faqPageSchema(FAQ)} />
      <JsonLd
        data={speakableWebPageSchema({
          url: URL,
          name: `Euríbor hoy: ${formatPct(e.daily.valuePct)}`,
          description: `Euríbor a 12 meses actualizado con el dato oficial del Banco de España.`,
          cssSelectors: ['h1', '.speakable-summary', '.euribor-value', 'summary'],
        })}
      />

      {/* HERO con valor protagonista */}
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
            <span className="text-sm text-paper/85">Euríbor actual</span>
          </nav>

          <p className="text-gold-300 text-sm uppercase tracking-wider mb-3">
            Página viva · Dato oficial del Banco de España
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-paper leading-tight mb-8">
            Euríbor a 12 meses hoy · {dateLabel(e.daily.date)}
          </h1>

          {/* Valor enorme */}
          <div className="bg-paper-card text-navy-900 rounded-2xl p-8 md:p-12 shadow-card max-w-2xl">
            <p className="text-xs uppercase tracking-[0.2em] text-gold-700 font-bold mb-2">
              Dato diario · {dateLabel(e.daily.date)}
            </p>
            <p className="euribor-value text-7xl md:text-8xl font-bold text-navy-900 leading-none mb-6 tabular-nums">
              {formatPct(e.daily.valuePct)}
            </p>

            <div className="grid sm:grid-cols-2 gap-4 border-t border-navy-100 pt-5">
              <div>
                <p className="text-xs uppercase tracking-wider text-ink-muted font-semibold mb-1">
                  Media de {monthLabel(e.closed)} · cerrada
                </p>
                <p className="text-2xl font-bold text-navy-900 tabular-nums">
                  {formatPct(e.closed.valuePct)}
                </p>
                <p className="text-sm text-ink-soft">
                  <span
                    className={
                      e.monthOverMonthBps > 0
                        ? 'text-red-700 font-semibold'
                        : e.monthOverMonthBps < 0
                          ? 'text-emerald-700 font-semibold'
                          : 'text-ink-muted font-semibold'
                    }
                  >
                    {formatBps(e.monthOverMonthBps)}
                  </span>{' '}
                  respecto a {monthLabel(e.previous)} · tendencia {e.trend}
                </p>
              </div>
              {e.current && (
                <div>
                  <p className="text-xs uppercase tracking-wider text-ink-muted font-semibold mb-1">
                    Media de {monthLabel(e.current)} · provisional
                  </p>
                  <p className="text-2xl font-bold text-navy-900 tabular-nums">
                    {formatPct(e.current.valuePct)}
                  </p>
                  <p className="text-sm text-ink-soft">
                    {e.current.days} días hábiles hasta el {dateLabel(e.daily.date)}
                  </p>
                </div>
              )}
            </div>

            <p className="text-xs text-ink-muted leading-relaxed mt-5">
              La media de {monthLabel(e.closed)} es la que usan las revisiones con ese mes de
              referencia (normalmente las que se calculan en {MONTHS_ES[siguiente.month - 1]}).
              Es la media aritmética de los datos diarios del mes, que coincide con el dato
              mensual oficial del Banco de España.
              <br />
              Fuente:{' '}
              <a
                href={BDE_PAGE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-navy-700 underline"
              >
                {BDE_SOURCE_LABEL}
              </a>
              {e.live
                ? `. Leído el ${dateLabel(e.fetchedAt)}; esta página se actualiza sola cada día hábil.`
                : `. Último dato guardado el ${dateLabel(e.fetchedAt)}; el Banco de España no respondía al generar esta página.`}
            </p>
          </div>

          <p className="speakable-summary text-base text-paper/80 max-w-2xl mt-8">
            Página viva con el euríbor a 12 meses oficial del Banco de España: el dato diario y
            la media mensual que se aplica a las revisiones, actualizados cada día hábil sin
            intervención manual. Incluye el histórico desde 2008, cómo afecta a tu cuota, cuándo
            se aplica en revisiones y qué hacer si tu hipoteca variable se va a revisar. Por
            Antonio Palacios Cambero (Toño Palacios), broker hipotecario nº E242 (Banco de
            España) y presidente de ANICI.
          </p>
        </Container>
      </Section>

      <Section tone="paper" padding="md">
        <Container size="md">
          <AnswerCard question={`¿Cuál es el euríbor a 12 meses actual?`}>
            El <strong>euríbor a 12 meses</strong> publicado por el Banco de España para el{' '}
            <strong>{dateLabel(e.daily.date)}</strong> es <strong>{formatPct(e.daily.valuePct)}</strong>.
            La media de <strong>{monthLabel(e.closed)}</strong>, que es el dato que usan las
            revisiones de hipoteca variable con ese mes de referencia, es{' '}
            <strong>{formatPct(e.closed.valuePct)}</strong>,{' '}
            <strong>{formatBps(e.monthOverMonthBps)}</strong> respecto a {monthLabel(e.previous)},
            con tendencia <strong>{e.trend}</strong>.
            {e.current && (
              <>
                {' '}La media provisional de {monthLabel(e.current)} va por{' '}
                <strong>{formatPct(e.current.valuePct)}</strong> ({e.current.days} días hábiles).
              </>
            )}{' '}
            Fuente: Banco de España, tipos de interés, cuadro 1.7.
          </AnswerCard>
        </Container>
      </Section>

      {/* HISTÓRICO */}
      <Section tone="soft" padding="md" title="Evolución histórica del euríbor a 12 meses">
        <Container size="md">
          <p className="text-ink-soft mb-6">
            Medias mensuales del Banco de España en los meses que marcan un cambio de ciclo: el
            máximo de 2008, los seis años en negativo (2016-2022), el pico de 2023, las bajadas
            de 2024 y 2025 y el repunte de 2026.
          </p>
          <div className="bg-paper-card border border-navy-100 rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-navy-50 text-navy-800">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold">Mes</th>
                  <th className="text-right px-4 py-3 font-semibold whitespace-nowrap">Media</th>
                  <th className="text-left px-4 py-3 font-semibold">Contexto</th>
                </tr>
              </thead>
              <tbody>
                {history.map((m, i) => (
                  <tr key={i} className="border-t border-navy-100">
                    <td className="px-4 py-3 font-bold text-navy-800 whitespace-nowrap">{m.label}</td>
                    <td
                      className={`px-4 py-3 text-right font-bold tabular-nums whitespace-nowrap ${
                        m.valuePct < 0 ? 'text-emerald-700' : 'text-navy-800'
                      }`}
                    >
                      {formatPct(m.valuePct)}
                    </td>
                    <td className="px-4 py-3 text-ink-soft">{m.context}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </Section>

      {/* CÓMO AFECTA */}
      <Section tone="paper" padding="md" title="Cómo afecta el euríbor a tu hipoteca">
        <Container size="md">
          <div className="prose-psz">
            <p>
              Si tu hipoteca es <strong>variable</strong> o <strong>mixta en periodo variable</strong>,
              el euríbor te afecta directamente. Tu tipo de interés se calcula como{' '}
              <strong>euríbor + diferencial</strong>, donde el diferencial es la cantidad fija
              pactada en tu escritura (típicamente entre 0,5% y 1,2%).
            </p>
            <p>
              <strong>Ejemplo operativo:</strong> si tu hipoteca dice «euríbor 12M + 0,85%» y tu
              mes de referencia es {monthLabel(e.closed)} ({formatPct(e.closed.valuePct)}), tu
              tipo pasa a ser <strong>{formatPct(e.closed.valuePct + 0.85)}</strong>. Con ese tipo
              nuevo y el capital pendiente, el banco recalcula tu cuota mensual.
            </p>
            <p>
              Si tu hipoteca es <strong>fija</strong>, el euríbor no te afecta: tu tipo no cambia
              en toda la vida del préstamo. Si es <strong>mixta en periodo fijo</strong>, tampoco
              te afecta hasta que pases al tramo variable.
            </p>
          </div>

          <div className="mt-6 bg-gold-50 border border-gold-300 rounded-lg p-5">
            <p className="text-sm text-navy-800 leading-relaxed">
              <strong>Para cuantificar el impacto exacto en tu cuota:</strong> usa el{' '}
              <a
                href="/calculadora-stress-test-euribor"
                className="text-navy-700 hover:text-navy-900 underline font-semibold"
              >
                stress test del euríbor
              </a>{' '}
              con tu capital pendiente, plazo restante y diferencial pactado. Te devuelve la
              cuota proyectada en 5 escenarios de movimiento del euríbor.
            </p>
          </div>
        </Container>
      </Section>

      <Section tone="paper" padding="sm">
        <Container size="md">
          <LegalDisclaimer variant="mortgage" />
        </Container>
      </Section>

      <Section tone="soft" padding="md" title="Preguntas frecuentes sobre el euríbor">
        <Container size="md">
          <Faq items={FAQ} />
        </Container>
      </Section>

      <Section tone="paper" padding="md" title="Herramientas relacionadas">
        <Container size="lg">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <a href="/calculadora-stress-test-euribor" className="block bg-paper-card border border-navy-100 rounded-xl p-6 hover:border-gold-400 hover:shadow-card transition-all no-underline">
              <p className="text-xs uppercase tracking-wider text-gold-600 font-semibold mb-2">Herramienta clave</p>
              <h3 className="text-lg font-semibold text-navy-800 mb-2">Stress test euríbor</h3>
              <p className="text-sm text-ink-soft">¿Cuánto subirá tu cuota si el euríbor sube X puntos? 5 escenarios.</p>
            </a>
            <a href="/comparador-hipoteca-fija-variable-mixta" className="block bg-paper-card border border-navy-100 rounded-xl p-6 hover:border-gold-400 hover:shadow-card transition-all no-underline">
              <p className="text-xs uppercase tracking-wider text-gold-600 font-semibold mb-2">Herramienta</p>
              <h3 className="text-lg font-semibold text-navy-800 mb-2">Comparador fija/variable/mixta</h3>
              <p className="text-sm text-ink-soft">Las 3 modalidades × 3 escenarios de euríbor.</p>
            </a>
            <a href="/tipos-de-hipoteca" className="block bg-paper-card border border-navy-100 rounded-xl p-6 hover:border-gold-400 hover:shadow-card transition-all no-underline">
              <p className="text-xs uppercase tracking-wider text-gold-600 font-semibold mb-2">Pillar</p>
              <h3 className="text-lg font-semibold text-navy-800 mb-2">Tipos de hipoteca</h3>
              <p className="text-sm text-ink-soft">Guía operativa para elegir modalidad según perfil.</p>
            </a>
            <a href="/broker-hipotecario" className="block bg-paper-card border border-navy-100 rounded-xl p-6 hover:border-gold-400 hover:shadow-card transition-all no-underline">
              <p className="text-xs uppercase tracking-wider text-gold-600 font-semibold mb-2">Servicio</p>
              <h3 className="text-lg font-semibold text-navy-800 mb-2">Broker hipotecario</h3>
              <p className="text-sm text-ink-soft">Si necesitas novar o subrogar tras una subida del euríbor.</p>
            </a>
          </div>
        </Container>
      </Section>

      <Section tone="soft" padding="md">
        <Container size="md">
          <SelloPalacios variant="badge" />
        </Container>
      </Section>

      <Section tone="navy" padding="md">
        <Container size="md" className="text-center">
          <h2 className="text-3xl font-bold text-paper mb-4">
            ¿El euríbor te está afectando demasiado?
          </h2>
          <p className="text-paper/85 text-lg mb-8 max-w-prose mx-auto">
            Si tu hipoteca variable se va a revisar y temes el impacto, podemos analizar tres
            opciones: amortización anticipada, novación interna o subrogación a otra entidad
            con mejor oferta fija. Primera consulta gratis.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button href={MORTGAGE_FORM_URL} variant="gold" size="lg" target="_blank" rel="noopener noreferrer">
              Solicitar análisis con {TONO.shortName} →
            </Button>
            <Button href="/calculadora-stress-test-euribor" variant="primary" size="lg">
              Hacer el stress test
            </Button>
          </div>
        </Container>
      </Section>
    </main>
  )
}
