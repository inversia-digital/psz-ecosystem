import type { Metadata } from 'next'
import {
  MORTGAGE_FORM_URL,
  SITE_URLS,
  TONO,
  articleSchema,
  breadcrumbSchema,
  faqPageSchema,
  howToSchema,
  speakableWebPageSchema,
} from '@psz/seo'
import { Button, Container, CredentialBadge, Faq, JsonLd, Section } from '@psz/ui'
import { AnswerCard } from '../_components/AnswerCard'
import { LegalDisclaimer } from '../_components/LegalDisclaimer'
import { PILLAR_NO_RESIDENTES } from './content'

const URL = `${SITE_URLS.psz}/hipoteca-no-residentes`

// ─────────────────────────────────────────────────────────────────────────
// METADATA
// ─────────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title:
    'Hipoteca no residentes en España 2026 · LTV, NIE, IRNR · Toño Palacios broker E242',
  description:
    'Guía operativa de hipoteca para no residentes en España 2026: LTV reales por país de origen (40-70%, no 80%), trámite del NIE, documentación apostillada y traducción jurada, bancos receptivos al perfil internacional, fiscalidad IRNR + Impuesto Patrimonio, firma a distancia con poder notarial. Por Toño Palacios, broker hipotecario nº E242 (Banco de España) y presidente de ANICI.',
  alternates: { canonical: URL },
  robots: { index: true, follow: true },
  authors: [{ name: TONO.fullName, url: `${SITE_URLS.psz}/sobre-mi` }],
  creator: `${TONO.fullName} (${TONO.shortName})`,
  publisher: 'Inversia Global Digital, S.L.U.',
  keywords: [
    'hipoteca no residentes España',
    'hipoteca extranjero comprar España',
    'mortgage non resident Spain',
    'LTV no residente',
    'NIE extranjero hipoteca',
    'IRNR propietario no residente',
    'documentación apostillada hipoteca España',
    'banco hipoteca extranjero España',
    'firma a distancia hipoteca España',
    'poder notarial apostillado España',
    'comprar vivienda España UK Brexit',
    'comprar vivienda España USA Canadá',
  ],
  openGraph: {
    type: 'article',
    url: URL,
    siteName: 'psz.es',
    locale: 'es_ES',
    title: 'Hipoteca no residentes en España · Guía por Toño Palacios broker E242',
    description:
      'LTV reales por país de origen, NIE, documentación apostillada, bancos receptivos, fiscalidad IRNR. Guía operativa por Toño Palacios broker hipotecario E242.',
    authors: [TONO.fullName],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hipoteca no residentes España · psz.es',
    description:
      'Guía operativa para extranjeros comprando vivienda con hipoteca en España. Por Toño Palacios broker E242.',
  },
}

const P = PILLAR_NO_RESIDENTES

// ─────────────────────────────────────────────────────────────────────────
// Página
// ─────────────────────────────────────────────────────────────────────────

export default function HipotecaNoResidentesPage() {
  return (
    <main>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Inicio', url: SITE_URLS.psz },
          { name: 'Hipoteca no residentes', url: URL },
        ])}
      />
      <JsonLd
        data={articleSchema({
          headline: 'Hipoteca para no residentes en España 2026',
          description:
            'Guía operativa para extranjeros o residentes fiscales fuera de España comprando vivienda con financiación bancaria: LTV reales, documentación, NIE, IRNR y proceso.',
          url: URL,
          datePublished: '2026-05-14',
          dateModified: '2026-05-14',
        })}
      />
      <JsonLd data={faqPageSchema([...P.faq])} />
      <JsonLd
        data={howToSchema({
          name: 'Cómo conseguir una hipoteca en España siendo no residente',
          description:
            'Proceso operativo paso a paso desde la obtención del NIE hasta la firma en notaría con poder notarial apostillado.',
          url: URL,
          totalTime: 'P12W',
          estimatedCost: { currency: 'EUR', value: 0 },
          steps: P.proceso.map((s) => ({ name: s.title, text: s.body })),
        })}
      />
      <JsonLd
        data={speakableWebPageSchema({
          url: URL,
          name: 'Hipoteca no residentes en España',
          description: 'Guía operativa de hipoteca para comprador extranjero en España.',
          cssSelectors: ['h1', '.speakable-summary', 'summary'],
        })}
      />

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
            <span className="text-paper/30 mx-2" aria-hidden>›</span>
            <span className="text-sm text-paper/85">Hipoteca no residentes</span>
          </nav>

          <p className="text-gold-300 text-sm uppercase tracking-wider mb-3">
            {P.hero.eyebrow}
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-paper leading-tight mb-4">
            {P.hero.h1}
          </h1>
          <p className="speakable-summary text-lg text-paper/85 max-w-3xl mb-6">{P.hero.sub}</p>

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
              Solicitar análisis del caso →
            </Button>
            <Button href="/broker-hipotecario" variant="primary" size="lg">
              Servicio de broker
            </Button>
          </div>
        </Container>
      </Section>

      {/* TOC */}
      <nav aria-label="Tabla de contenidos" className="bg-paper-soft border-b border-navy-100">
        <Container size="lg" className="py-4">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-muted">
            <li><a href="#diferencias">Vs residente</a></li>
            <li><a href="#ltvs">LTVs por origen</a></li>
            <li><a href="#documentacion">Documentación</a></li>
            <li><a href="#bancos">Bancos receptivos</a></li>
            <li><a href="#fiscalidad">Fiscalidad</a></li>
            <li><a href="#proceso">Proceso paso a paso</a></li>
            <li><a href="#errores">Errores típicos</a></li>
            <li><a href="#faq">FAQ</a></li>
          </ul>
        </Container>
      </nav>

      {/* ANSWER CARD */}
      <Section tone="paper" padding="md">
        <Container size="md">
          <AnswerCard question="¿Puedo conseguir hipoteca en España siendo no residente?">
            Sí, pero con condiciones distintas al residente. La banca minorista española financia
            entre el <strong>40% y el 70% LTV</strong> según país de origen (vs 80% para
            residentes), con plazos máximos de 20-25 años y TIN +0,5-1 pp sobre la mediana de
            residentes. Necesitas <strong>NIE</strong>, documentación apostillada y traducida, y
            poder notarial si firmas a distancia. Toño Palacios, broker hipotecario nº E242
            (Banco de España), opera con clientes no residentes de UE, UK, EEUU y Latinoamérica.
          </AnswerCard>
        </Container>
      </Section>

      {/* DIFERENCIAS */}
      <Section id="diferencias" tone="paper" padding="md" title={P.diferencias.title}>
        <Container size="md">
          <p className="text-lg text-ink-soft mb-6">{P.diferencias.intro}</p>
          <div className="bg-paper-card border border-navy-100 rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-navy-800 text-paper">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold">Criterio</th>
                  <th className="text-left px-4 py-3 font-semibold">Residente</th>
                  <th className="text-left px-4 py-3 font-semibold">No residente</th>
                </tr>
              </thead>
              <tbody>
                {P.diferencias.rows.map((r, i) => (
                  <tr key={i} className="border-t border-navy-100 align-top">
                    <td className="px-4 py-3 font-semibold text-navy-800">{r.criterio}</td>
                    <td className="px-4 py-3 text-ink-soft">{r.residente}</td>
                    <td className="px-4 py-3 text-ink-soft">{r.noResidente}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </Section>

      {/* LTVs POR ORIGEN */}
      <Section id="ltvs" tone="soft" padding="md" title={P.ltvsPorOrigen.title}>
        <Container size="md">
          <p className="text-lg text-ink-soft mb-6">{P.ltvsPorOrigen.intro}</p>
          <div className="bg-paper-card border border-navy-100 rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-navy-50 text-navy-800">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold">Zona de residencia fiscal</th>
                  <th className="text-left px-4 py-3 font-semibold whitespace-nowrap">LTV típico</th>
                  <th className="text-left px-4 py-3 font-semibold">Notas operativas</th>
                </tr>
              </thead>
              <tbody>
                {P.ltvsPorOrigen.rows.map((r, i) => (
                  <tr key={i} className="border-t border-navy-100 align-top">
                    <td className="px-4 py-3 font-semibold text-navy-800">{r.zona}</td>
                    <td className="px-4 py-3 text-gold-700 font-bold whitespace-nowrap">{r.ltv}</td>
                    <td className="px-4 py-3 text-ink-soft">{r.notas}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-ink-muted mt-4">
            Datos orientativos basados en la práctica habitual de la banca minorista española a fecha
            de mayo 2026. La oferta real varía por banco, importe, perfil y ciclo del mercado.
          </p>
        </Container>
      </Section>

      {/* DOCUMENTACIÓN */}
      <Section id="documentacion" tone="paper" padding="md" title={P.documentacion.title}>
        <Container size="md">
          <p className="text-lg text-ink-soft mb-6">{P.documentacion.intro}</p>
          <div className="grid md:grid-cols-2 gap-4">
            {P.documentacion.bloques.map((bloque, i) => (
              <article
                key={i}
                className="bg-paper-card border border-navy-100 border-t-4 border-t-gold-400 rounded-lg p-5 shadow-soft"
              >
                <h3 className="text-lg font-bold text-navy-800 mb-3">{bloque.title}</h3>
                <ul className="space-y-2 text-sm text-ink-soft">
                  {bloque.items.map((item, j) => (
                    <li key={j} className="flex gap-2">
                      <span aria-hidden className="text-gold-500 shrink-0">▸</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      {/* BANCOS */}
      <Section id="bancos" tone="soft" padding="md" title={P.bancosReceptivos.title}>
        <Container size="md">
          <p className="text-lg text-ink-soft mb-4">{P.bancosReceptivos.intro}</p>
          <div className="prose-psz">
            {P.bancosReceptivos.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </Container>
      </Section>

      {/* FISCALIDAD */}
      <Section id="fiscalidad" tone="paper" padding="md" title={P.fiscalidad.title}>
        <Container size="md">
          <p className="text-lg text-ink-soft mb-6">{P.fiscalidad.intro}</p>
          <div className="space-y-4">
            {P.fiscalidad.items.map((item, i) => (
              <article
                key={i}
                className="bg-paper-card border border-navy-100 border-l-4 border-l-purple-400 rounded-lg p-5 shadow-soft"
              >
                <h3 className="text-lg font-bold text-navy-800 mb-2">{item.title}</h3>
                <p className="text-ink-soft leading-relaxed">{item.body}</p>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      {/* PROCESO */}
      <Section
        id="proceso"
        tone="soft"
        padding="md"
        title="Proceso paso a paso (~8-14 semanas)"
      >
        <Container size="md">
          <ol className="space-y-4">
            {P.proceso.map((s) => (
              <li
                key={s.n}
                className="flex gap-5 bg-paper-card p-5 rounded-lg border border-navy-100"
              >
                <span className="text-3xl font-bold text-gold-500 shrink-0 w-12 text-center">
                  {s.n}
                </span>
                <div>
                  <h3 className="text-lg font-bold text-navy-800 mb-1">{s.title}</h3>
                  <p className="text-ink-soft leading-relaxed">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {/* ERRORES */}
      <Section id="errores" tone="paper" padding="md" title={P.mistakes.title}>
        <Container size="md">
          <div className="space-y-4">
            {P.mistakes.items.map((item, i) => (
              <article
                key={i}
                className="bg-paper-card border border-navy-100 border-l-4 border-l-red-400 rounded-lg p-5 shadow-soft"
              >
                <h3 className="text-lg font-bold text-navy-800 mb-2">
                  <span className="text-red-500 mr-2">{i + 1}.</span>
                  {item.title}
                </h3>
                <p className="text-ink-soft leading-relaxed">{item.body}</p>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      {/* ADVERTENCIA LEGAL */}
      <Section tone="paper" padding="sm">
        <Container size="md">
          <LegalDisclaimer variant="mortgage" />
        </Container>
      </Section>

      {/* FAQ */}
      <Section id="faq" tone="soft" padding="md" title="Preguntas frecuentes">
        <Container size="md">
          <Faq items={[...P.faq]} />
        </Container>
      </Section>

      {/* INTERNAL LINKING */}
      <Section tone="paper" padding="md" title="Herramientas y servicios relacionados">
        <Container size="lg">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <a
              href="/calculadora-capacidad-endeudamiento"
              className="block bg-paper-card border border-navy-100 rounded-xl p-6 hover:border-gold-400 hover:shadow-card transition-all no-underline"
            >
              <p className="text-xs uppercase tracking-wider text-gold-600 font-semibold mb-2">
                Herramienta
              </p>
              <h3 className="text-lg font-semibold text-navy-800 mb-2">
                Capacidad de endeudamiento
              </h3>
              <p className="text-sm text-ink-soft">
                Ajusta el LTV mentalmente al 50-65% para simular tu caso como no residente.
              </p>
            </a>
            <a
              href="/comparador-hipoteca-fija-variable-mixta"
              className="block bg-paper-card border border-navy-100 rounded-xl p-6 hover:border-gold-400 hover:shadow-card transition-all no-underline"
            >
              <p className="text-xs uppercase tracking-wider text-gold-600 font-semibold mb-2">
                Herramienta
              </p>
              <h3 className="text-lg font-semibold text-navy-800 mb-2">
                Comparador fija/variable/mixta
              </h3>
              <p className="text-sm text-ink-soft">
                Para no residentes la fija suele compensar por la previsibilidad.
              </p>
            </a>
            <a
              href="/broker-hipotecario"
              className="block bg-paper-card border border-navy-100 rounded-xl p-6 hover:border-gold-400 hover:shadow-card transition-all no-underline"
            >
              <p className="text-xs uppercase tracking-wider text-gold-600 font-semibold mb-2">
                Servicio
              </p>
              <h3 className="text-lg font-semibold text-navy-800 mb-2">Broker hipotecario</h3>
              <p className="text-sm text-ink-soft">
                Para no residentes el broker hace MÁS diferencia que para residentes.
              </p>
            </a>
            <a
              href="/glosario-hipotecario"
              className="block bg-paper-card border border-navy-100 rounded-xl p-6 hover:border-gold-400 hover:shadow-card transition-all no-underline"
            >
              <p className="text-xs uppercase tracking-wider text-gold-600 font-semibold mb-2">
                Recurso
              </p>
              <h3 className="text-lg font-semibold text-navy-800 mb-2">Glosario hipotecario</h3>
              <p className="text-sm text-ink-soft">
                LTV, TIN, TAE, FEIN, ITP, AJD — la jerga española traducida.
              </p>
            </a>
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section tone="navy" padding="lg">
        <Container size="md" className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-paper mb-4">
            ¿Vamos con tu hipoteca como no residente?
          </h2>
          <p className="text-paper/85 text-lg mb-8 max-w-prose mx-auto">
            Si vives fuera de España y quieres comprar aquí con hipoteca, te analizo el caso
            completo: qué bancos van a tu perfil, qué LTV razonable esperar, qué documentación
            apostillada tienes que preparar y cómo orquestar la firma a distancia. Primera
            consulta gratis y sin compromiso.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button
              href={MORTGAGE_FORM_URL}
              variant="gold"
              size="lg"
              target="_blank"
              rel="noopener noreferrer"
            >
              Solicitar análisis →
            </Button>
            <Button href="/broker-hipotecario" variant="primary" size="lg">
              Ver servicio de broker
            </Button>
          </div>
        </Container>
      </Section>
    </main>
  )
}
