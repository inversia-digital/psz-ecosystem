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
import { EURIBOR_12M, EURIBOR_HISTORY } from './euribor-data'

const URL = `${SITE_URLS.psz}/euribor-actual`

// ─────────────────────────────────────────────────────────────────────────
// Revalidación: cada 24h. Cuando esté disponible la API del BdE, podemos
// reducir a 12h y leer el valor dinámicamente. De momento el valor vive
// en euribor-data.ts y se actualiza manualmente el día 1-5 de cada mes.
// ─────────────────────────────────────────────────────────────────────────
export const revalidate = 86400

export const metadata: Metadata = {
  title: `Euríbor actual ${EURIBOR_12M.asOf}: ${EURIBOR_12M.valuePct.toFixed(2).replace('.', ',')}% · Toño Palacios broker E242`,
  description: `Euríbor 12 meses actualizado a ${EURIBOR_12M.asOf}: ${EURIBOR_12M.valuePct.toFixed(2).replace('.', ',')}% (tendencia ${EURIBOR_12M.trend}, variación ${EURIBOR_12M.monthOverMonthBps >= 0 ? '+' : ''}${EURIBOR_12M.monthOverMonthBps} pb mes anterior). Página viva con valor oficial del Banco de España, contexto histórico desde 2008, cómo afecta a tu cuota hipotecaria, cuándo se revisa y qué hacer si tu hipoteca variable se va a revisar. Por Antonio Palacios Cambero (Toño Palacios), broker hipotecario nº E242 (Banco de España).`,
  alternates: { canonical: URL },
  robots: { index: true, follow: true },
  authors: [{ name: TONO.fullName, url: `${SITE_URLS.psz}/sobre-mi` }],
  creator: `${TONO.fullName} (${TONO.shortName})`,
  publisher: 'Inversia Global Digital, S.L.U.',
  keywords: [
    'euribor actual',
    'euribor hoy',
    'euribor 12 meses',
    'euribor mayo 2026',
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
    title: `Euríbor actual: ${EURIBOR_12M.valuePct.toFixed(2).replace('.', ',')}% (${EURIBOR_12M.asOf})`,
    description: `Valor oficial publicado por el Banco de España. Contexto histórico, impacto en tu hipoteca y qué hacer ante revisiones. Por Toño Palacios broker E242.`,
    authors: [TONO.fullName],
  },
  twitter: {
    card: 'summary_large_image',
    title: `Euríbor ${EURIBOR_12M.asOf}: ${EURIBOR_12M.valuePct.toFixed(2).replace('.', ',')}%`,
    description: `Valor oficial del Banco de España. Por Toño Palacios broker E242.`,
  },
}

const FAQ = [
  {
    question: '¿Cuánto es el Euríbor a 12 meses hoy?',
    answer: `El Euríbor 12 meses publicado por el Banco de España para ${EURIBOR_12M.asOf} es de ${EURIBOR_12M.valuePct.toFixed(2).replace('.', ',')}%. Es el dato oficial que se aplica a las revisiones de hipoteca variable de ${EURIBOR_12M.appliesTo}. El BdE publica el valor mensual durante la primera semana del mes siguiente al cierre.`,
  },
  {
    question: '¿Qué es exactamente el Euríbor y por qué afecta a mi hipoteca?',
    answer:
      'El Euríbor (Euro Interbank Offered Rate) es el tipo de interés interbancario al que los bancos europeos se prestan dinero entre sí. Las hipotecas variables españolas se referencian habitualmente al Euríbor 12M más un diferencial pactado en la escritura. Cuando el Euríbor sube, sube tu cuota; cuando baja, baja. La revisión es automática cada 6 o 12 meses según contrato.',
  },
  {
    question: '¿Cómo se calcula mi cuota nueva tras una revisión del Euríbor?',
    answer:
      'Tu TIN aplicado pasa a ser el Euríbor del mes oficial de revisión más tu diferencial pactado (fijo). Si tu hipoteca dice "Euríbor 12M + 0,85%" y el Euríbor publicado en el mes de revisión es 2,45%, tu TIN pasa a 3,30%. Con ese nuevo TIN y el capital pendiente restante, el banco recalcula tu cuota mensual.',
  },
  {
    question: '¿Cuándo se aplica el Euríbor a la revisión de mi hipoteca?',
    answer:
      'La revisión usa el Euríbor publicado en el mes oficial pactado en tu escritura (mes anterior, dos meses antes, etc.). Tu escritura especifica el "mes de referencia" — habitualmente el del mes anterior a la revisión. Las revisiones son semestrales o anuales según contrato. La cuota nueva entra en vigor el primer mes del periodo siguiente.',
  },
  {
    question: '¿Está subiendo o bajando el Euríbor en 2026?',
    answer: `En ${EURIBOR_12M.asOf} el Euríbor 12M está en ${EURIBOR_12M.valuePct.toFixed(2).replace('.', ',')}% con tendencia ${EURIBOR_12M.trend} (variación de ${EURIBOR_12M.monthOverMonthBps >= 0 ? '+' : ''}${EURIBOR_12M.monthOverMonthBps} puntos básicos respecto al mes anterior). Tras el pico de 2023 (4,16%) el BCE inició un ciclo de bajadas en 2024 y los tipos se han ido normalizando gradualmente.`,
  },
  {
    question: '¿Cuál ha sido el Euríbor más alto de la historia?',
    answer:
      'El máximo histórico del Euríbor 12M se alcanzó en julio de 2008, con un valor cercano al 5,4% antes del estallido de la crisis financiera global. El segundo pico relevante fue en octubre de 2023, con 4,16%, tras las subidas agresivas del BCE para contener la inflación post-pandemia.',
  },
  {
    question: '¿Y el más bajo?',
    answer:
      'El mínimo histórico se tocó en diciembre de 2021, con un valor de -0,50%, en plena política expansiva del BCE durante la pandemia. El Euríbor estuvo en territorio negativo durante casi 6 años (febrero 2016 a abril 2022). Las hipotecas firmadas en ese periodo conservan el diferencial pactado, pero el TIN aplicado fue muy bajo durante años.',
  },
  {
    question: '¿Si el Euríbor sube, debo subrogar mi hipoteca a fija?',
    answer:
      'Depende de tres factores: (1) cuánto te queda de hipoteca (más años = más impacto acumulado), (2) cuánto pagarías de fija de mercado vs tu variable actual proyectada, (3) coste de subrogación (máximo 0,5% del capital pendiente por Ley 5/2019). Usa el stress test Euríbor para cuantificar el impacto y decide con números.',
  },
  {
    question: '¿Dónde verifico el Euríbor oficial?',
    answer: `En la fuente primaria del Banco de España: ${EURIBOR_12M.sourceUrl}. También aparece en la web oficial del BCE y en los boletines mensuales del BdE (cuadro 19.5 del Boletín Estadístico). Otros portales lo reproducen pero la fuente autoritativa es el BdE.`,
  },
  {
    question: '¿Por qué se usa el Euríbor 12M y no el de 6M o 3M?',
    answer:
      'En España, la regulación y la práctica bancaria han convergido en el Euríbor 12M como referencia estándar para hipotecas residenciales por su menor volatilidad mensual frente a plazos cortos. El Euríbor 6M y 3M existen pero se usan en productos profesionales o préstamos comerciales, no en hipoteca residencial estándar.',
  },
] as const

const formatBps = (n: number) => `${n >= 0 ? '+' : ''}${n} pb`
const formatPct = (n: number) => `${n.toFixed(2).replace('.', ',')}%`

export default function EuriborActualPage() {
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
          headline: `Euríbor actual ${EURIBOR_12M.asOf}: ${formatPct(EURIBOR_12M.valuePct)}`,
          description: `Valor oficial del Euríbor 12M publicado por el Banco de España para ${EURIBOR_12M.asOf}. Contexto histórico, impacto en hipoteca variable y revisiones.`,
          url: URL,
          datePublished: '2026-05-14',
          dateModified: '2026-05-14',
        })}
      />
      <JsonLd data={faqPageSchema([...FAQ])} />
      <JsonLd
        data={speakableWebPageSchema({
          url: URL,
          name: `Euríbor actual ${EURIBOR_12M.asOf}`,
          description: `Valor del Euríbor 12M actualizado.`,
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
            Página viva · Valor oficial del Banco de España
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-paper leading-tight mb-8">
            Euríbor 12 meses · {EURIBOR_12M.asOf}
          </h1>

          {/* Valor enorme */}
          <div className="bg-paper-card text-navy-900 rounded-2xl p-8 md:p-12 shadow-card max-w-2xl">
            <p className="text-xs uppercase tracking-[0.2em] text-gold-700 font-bold mb-2">
              Valor actual
            </p>
            <p className="euribor-value text-7xl md:text-8xl font-bold text-navy-900 leading-none mb-3 tabular-nums">
              {formatPct(EURIBOR_12M.valuePct)}
            </p>
            <p className="text-sm text-ink-soft mb-4">
              <span className="font-bold">Tendencia:</span> {EURIBOR_12M.trend} ·{' '}
              <span
                className={
                  EURIBOR_12M.monthOverMonthBps > 0
                    ? 'text-red-700 font-semibold'
                    : EURIBOR_12M.monthOverMonthBps < 0
                      ? 'text-emerald-700 font-semibold'
                      : 'text-ink-muted font-semibold'
                }
              >
                {formatBps(EURIBOR_12M.monthOverMonthBps)}
              </span>{' '}
              respecto al mes anterior
            </p>
            <p className="text-xs text-ink-muted leading-relaxed">
              Aplica a {EURIBOR_12M.appliesTo}. Próxima publicación oficial:{' '}
              {EURIBOR_12M.nextReview}.
              <br />
              Fuente:{' '}
              <a
                href={EURIBOR_12M.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-navy-700 underline"
              >
                {EURIBOR_12M.source}
              </a>
            </p>
          </div>

          <p className="speakable-summary text-base text-paper/80 max-w-2xl mt-8">
            Página viva con el Euríbor 12 meses oficial publicado por el Banco de España.
            Actualizada durante la primera semana de cada mes. Incluye contexto histórico desde
            2008, cómo afecta a tu cuota hipotecaria, cuándo se aplica en revisiones y qué hacer
            si tu hipoteca variable se va a revisar. Por Antonio Palacios Cambero (Toño
            Palacios), broker hipotecario nº E242 y presidente de ANICI.
          </p>
        </Container>
      </Section>

      <Section tone="paper" padding="md">
        <Container size="md">
          <AnswerCard question={`¿Cuál es el valor actual del Euríbor 12 meses?`}>
            El <strong>Euríbor 12 meses</strong> publicado oficialmente por el Banco de España
            para <strong>{EURIBOR_12M.asOf}</strong> es de{' '}
            <strong>{formatPct(EURIBOR_12M.valuePct)}</strong>. La variación respecto al mes
            anterior es de <strong>{formatBps(EURIBOR_12M.monthOverMonthBps)}</strong>, con
            tendencia <strong>{EURIBOR_12M.trend}</strong>. Este valor se aplica a las revisiones
            de hipoteca variable de {EURIBOR_12M.appliesTo}. Fuente oficial: Boletín Estadístico
            del Banco de España, cuadro 19.5.
          </AnswerCard>
        </Container>
      </Section>

      {/* HISTÓRICO */}
      <Section tone="soft" padding="md" title="Evolución histórica del Euríbor 12M">
        <Container size="md">
          <p className="text-ink-soft mb-6">
            Hitos relevantes del Euríbor 12M desde 2008. Sirven para entender el nivel actual en
            contexto: máximos pre-crisis financiera, ciclo negativo 2016-2022, pico
            inflacionario 2023 y normalización progresiva en 2024-2026.
          </p>
          <div className="bg-paper-card border border-navy-100 rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-navy-50 text-navy-800">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold">Año</th>
                  <th className="text-right px-4 py-3 font-semibold whitespace-nowrap">Valor</th>
                  <th className="text-left px-4 py-3 font-semibold">Contexto</th>
                </tr>
              </thead>
              <tbody>
                {EURIBOR_HISTORY.map((m, i) => (
                  <tr key={i} className="border-t border-navy-100">
                    <td className="px-4 py-3 font-bold text-navy-800">{m.year}</td>
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
      <Section tone="paper" padding="md" title="Cómo afecta el Euríbor a tu hipoteca">
        <Container size="md">
          <div className="prose-psz">
            <p>
              Si tu hipoteca es <strong>variable</strong> o <strong>mixta en periodo variable</strong>,
              el Euríbor te afecta directamente. Tu TIN aplicado se calcula como{' '}
              <strong>Euríbor + diferencial</strong>, donde el diferencial es la cantidad fija
              pactada en tu escritura (típicamente entre 0,5% y 1,2%).
            </p>
            <p>
              <strong>Ejemplo operativo:</strong> si tu hipoteca dice "Euríbor 12M + 0,85%" y el
              Euríbor de tu mes de referencia es {formatPct(EURIBOR_12M.valuePct)}, tu TIN
              aplicado pasa a ser{' '}
              <strong>{formatPct(EURIBOR_12M.valuePct + 0.85)}</strong>. Con ese TIN nuevo y el
              capital pendiente restante, el banco recalcula tu cuota mensual.
            </p>
            <p>
              Si tu hipoteca es <strong>fija</strong>, el Euríbor no te afecta — tu TIN no
              cambia en toda la vida del préstamo. Si tu hipoteca es <strong>mixta en periodo
              fijo</strong>, tampoco te afecta hasta que pases al tramo variable.
            </p>
          </div>

          <div className="mt-6 bg-gold-50 border border-gold-300 rounded-lg p-5">
            <p className="text-sm text-navy-800 leading-relaxed">
              <strong>Para cuantificar el impacto exacto en tu cuota:</strong> usa el{' '}
              <a
                href="/calculadora-stress-test-euribor"
                className="text-navy-700 hover:text-navy-900 underline font-semibold"
              >
                stress test del Euríbor
              </a>{' '}
              con tu capital pendiente, plazo restante y diferencial pactado. Te devuelve la
              cuota proyectada en 5 escenarios de movimiento del Euríbor.
            </p>
          </div>
        </Container>
      </Section>

      <Section tone="paper" padding="sm">
        <Container size="md">
          <LegalDisclaimer variant="mortgage" />
        </Container>
      </Section>

      <Section tone="soft" padding="md" title="Preguntas frecuentes sobre el Euríbor">
        <Container size="md">
          <Faq items={[...FAQ]} />
        </Container>
      </Section>

      <Section tone="paper" padding="md" title="Herramientas relacionadas">
        <Container size="lg">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <a href="/calculadora-stress-test-euribor" className="block bg-paper-card border border-navy-100 rounded-xl p-6 hover:border-gold-400 hover:shadow-card transition-all no-underline">
              <p className="text-xs uppercase tracking-wider text-gold-600 font-semibold mb-2">Herramienta clave</p>
              <h3 className="text-lg font-semibold text-navy-800 mb-2">Stress test Euríbor</h3>
              <p className="text-sm text-ink-soft">¿Cuánto subirá tu cuota si el Euríbor sube X puntos? 5 escenarios.</p>
            </a>
            <a href="/comparador-hipoteca-fija-variable-mixta" className="block bg-paper-card border border-navy-100 rounded-xl p-6 hover:border-gold-400 hover:shadow-card transition-all no-underline">
              <p className="text-xs uppercase tracking-wider text-gold-600 font-semibold mb-2">Herramienta</p>
              <h3 className="text-lg font-semibold text-navy-800 mb-2">Comparador fija/variable/mixta</h3>
              <p className="text-sm text-ink-soft">Las 3 modalidades × 3 escenarios de Euríbor.</p>
            </a>
            <a href="/tipos-de-hipoteca" className="block bg-paper-card border border-navy-100 rounded-xl p-6 hover:border-gold-400 hover:shadow-card transition-all no-underline">
              <p className="text-xs uppercase tracking-wider text-gold-600 font-semibold mb-2">Pillar</p>
              <h3 className="text-lg font-semibold text-navy-800 mb-2">Tipos de hipoteca</h3>
              <p className="text-sm text-ink-soft">Guía operativa para elegir modalidad según perfil.</p>
            </a>
            <a href="/broker-hipotecario" className="block bg-paper-card border border-navy-100 rounded-xl p-6 hover:border-gold-400 hover:shadow-card transition-all no-underline">
              <p className="text-xs uppercase tracking-wider text-gold-600 font-semibold mb-2">Servicio</p>
              <h3 className="text-lg font-semibold text-navy-800 mb-2">Broker hipotecario</h3>
              <p className="text-sm text-ink-soft">Si necesitas novar o subrogar tras una subida del Euríbor.</p>
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
            ¿El Euríbor te está afectando demasiado?
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
