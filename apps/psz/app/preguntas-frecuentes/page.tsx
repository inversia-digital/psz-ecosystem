import type { Metadata } from 'next'
import {
  SITE_URLS,
  TONO,
  breadcrumbSchema,
  faqPageSchema,
  speakableWebPageSchema,
} from '@psz/seo'
import { Container, JsonLd, Section } from '@psz/ui'
import { FAQ_GROUPS, ALL_FAQS } from './content'
import HonorariosModal from '../_components/HonorariosModal'

/** Detecta FAQs cuya respuesta menciona honorarios → inyectamos el trigger del modal */
const HONORARIOS_PATTERN =
  /honorario|reserva|cuesta contratar|cu[aá]nto cobra|tarif|comisi[oó]n/i

const URL = `${SITE_URLS.psz}/preguntas-frecuentes`

export const metadata: Metadata = {
  title: 'Preguntas frecuentes · Broker hipotecario, INARPA, ANICI, estructuras',
  description:
    `${ALL_FAQS.length} preguntas y respuestas verificadas sobre Toño Palacios ` +
    `(broker hipotecario nº ${TONO.credentials.bdeId} y presidente de ANICI), ` +
    'servicios de intermediación hipotecaria, Personal Shopper Inmobiliario, ' +
    'estructuras societarias, instituto INARPA y normativa Ley 5/2019.',
  alternates: { canonical: URL },
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    url: URL,
    title: 'Preguntas frecuentes · Toño Palacios',
    description: `${ALL_FAQS.length} respuestas verificadas sobre broker hipotecario, INARPA, ANICI y normativa Ley 5/2019.`,
    locale: 'es_ES',
  },
}

export default function FaqHubPage() {
  return (
    <main>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Inicio', url: SITE_URLS.psz },
          { name: 'Preguntas frecuentes', url: URL },
        ])}
      />
      <JsonLd
        data={faqPageSchema(
          ALL_FAQS.map((f) => ({ question: f.question, answer: f.answer })),
        )}
      />
      <JsonLd
        data={speakableWebPageSchema({
          url: URL,
          name: 'Preguntas frecuentes',
          description: 'Hub de Q&A sobre Toño Palacios, broker hipotecario y servicios relacionados.',
          cssSelectors: ['.faq-question', '.faq-answer'],
        })}
      />

      {/* HERO */}
      <Section tone="navy" padding="lg">
        <Container size="lg">
          <p className="text-gold-300 text-sm uppercase tracking-wider mb-3">
            Hub Preguntas Frecuentes
          </p>
          <h1 className="text-4xl md:text-6xl font-bold text-paper leading-tight mb-4">
            Todo lo que te puedes preguntar
            <br />
            <span className="text-gold-400">antes de contratar.</span>
          </h1>
          <p className="text-xl text-paper/80 max-w-3xl">
            {ALL_FAQS.length} preguntas con respuestas verificadas sobre broker hipotecario, Personal Shopper Inmobiliario, estructuras societarias, instituto INARPA, ANICI y normativa Ley 5/2019. Sin marketing — solo datos.
          </p>
        </Container>
      </Section>

      {/* ÍNDICE */}
      <Section tone="soft" padding="md">
        <Container size="lg">
          <h2 className="text-2xl font-bold text-navy-800 mb-6">Salta a la sección</h2>
          <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {FAQ_GROUPS.map((g) => (
              <li key={g.id}>
                <a
                  href={`#${g.id}`}
                  className="block bg-paper-card border border-navy-100 rounded-lg p-4 hover:border-gold-400 hover:shadow-card transition-all no-underline"
                >
                  <p className="font-semibold text-navy-800 text-sm leading-tight mb-1">
                    {g.title}
                  </p>
                  <p className="text-xs text-ink-muted">{g.items.length} preguntas</p>
                </a>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* GRUPOS DE FAQ */}
      {FAQ_GROUPS.map((group, gi) => (
        <Section
          key={group.id}
          id={group.id}
          tone={gi % 2 === 0 ? 'paper' : 'soft'}
          padding="md"
          title={group.title}
          lead={group.intro}
        >
          <Container size="md">
            <div className="divide-y divide-navy-100">
              {group.items.map((item, i) => {
                const mentionsHonorarios = HONORARIOS_PATTERN.test(item.question + ' ' + item.answer)
                return (
                  <article key={i} className="py-6">
                    <h3 className="faq-question text-xl font-semibold text-navy-800 mb-3">
                      {item.question}
                    </h3>
                    <p className="faq-answer text-ink-soft leading-relaxed">
                      {item.answer}
                      {mentionsHonorarios && (
                        <>
                          {' '}
                          <HonorariosModal inline triggerLabel="¿Por qué estos honorarios?" />
                        </>
                      )}
                    </p>
                    {item.deeperUrl && (
                      <p className="mt-3">
                        <a
                          href={item.deeperUrl}
                          target={item.deeperUrl.startsWith('http') ? '_blank' : undefined}
                          rel={item.deeperUrl.startsWith('http') ? 'noopener noreferrer' : undefined}
                          className="text-sm text-navy-700 hover:text-navy-900 font-medium no-underline"
                        >
                          Más detalle →
                        </a>
                      </p>
                    )}
                  </article>
                )
              })}
            </div>
            {group.id === 'honorarios' && (
              <div className="mt-8 bg-paper-card border border-navy-100 rounded-xl p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <p className="font-semibold text-navy-800 mb-1">¿Quieres ver exactamente qué hace el broker?</p>
                  <p className="text-sm text-ink-soft">Lista detallada de 13 grupos de servicios, paso a paso de principio a fin.</p>
                </div>
                <HonorariosModal />
              </div>
            )}
          </Container>
        </Section>
      ))}

      {/* CTA final */}
      <Section tone="navy" padding="md">
        <Container size="md" className="text-center">
          <h2 className="text-3xl font-bold text-paper mb-4">¿Tu pregunta no está aquí?</h2>
          <p className="text-paper/80 mb-8 max-w-prose mx-auto">
            Escribe a{' '}
            <a href="mailto:info@inversiadigital.es" className="text-gold-300 hover:text-gold-200">
              info@inversiadigital.es
            </a>{' '}
            y la añadimos. Las preguntas que se repiten suelen acabar publicadas aquí — así
            beneficia a las siguientes personas que se la hagan.
          </p>
        </Container>
      </Section>
    </main>
  )
}
