import type { Metadata } from 'next'
import {
  MORTGAGE_FORM_URL,
  SITE_URLS,
  TONO,
  breadcrumbSchema,
  speakableWebPageSchema,
  webApplicationSchema,
} from '@psz/seo'
import { Button, Container, JsonLd, Section } from '@psz/ui'
import { LegalDisclaimer } from '../_components/LegalDisclaimer'
import { CanalTelegramBanner } from '../_components/CanalTelegramCTA'
import { SelloPalacios } from '../_components/SelloPalacios'
import SubrogacionForm from './SubrogacionForm'

const URL = `${SITE_URLS.psz}/calculadora-subrogacion-hipoteca`

export const metadata: Metadata = {
  title: 'Calculadora de subrogación de hipoteca 2026 · ¿Me compensa cambiar? · Toño Palacios',
  description:
    '¿Te compensa subrogar o cambiar tu hipoteca a otro banco? Compara los intereses que te quedan con tu TIN actual frente a un TIN nuevo, descuenta los costes del cambio y calcula el ahorro neto, el ahorro mensual y el punto de equilibrio. Por Toño Palacios, broker hipotecario nº E242 (Banco de España). Cálculo server-side, sin registro.',
  alternates: { canonical: URL },
  robots: { index: true, follow: true },
  authors: [{ name: TONO.fullName, url: `${SITE_URLS.psz}/sobre-mi` }],
  creator: `${TONO.fullName} (${TONO.shortName})`,
  publisher: 'Inversia Global Digital, S.L.U.',
  keywords: [
    'calculadora subrogación hipoteca',
    'me compensa cambiar de hipoteca',
    'subrogar hipoteca a otro banco',
    'novación hipoteca calculadora',
    'cambiar hipoteca ahorro',
    'subrogación acreedor calculadora',
    'punto de equilibrio subrogación',
    'bajar tipo hipoteca',
  ],
  openGraph: {
    url: URL,
    type: 'website',
    siteName: 'psz.es',
    locale: 'es_ES',
    title: 'Calculadora de subrogación de hipoteca · ¿Me compensa cambiar? · Toño Palacios',
    description:
      'Compara tu TIN actual vs uno nuevo, descuenta costes y calcula el ahorro neto y el punto de equilibrio. Por Toño Palacios, broker E242.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Calculadora de subrogación de hipoteca · psz.es',
    description: '¿Te compensa cambiar de hipoteca? Ahorro neto, ahorro mensual y punto de equilibrio.',
  },
}

export default function CalculadoraSubrogacionPage() {
  return (
    <main>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Inicio', url: SITE_URLS.psz },
          { name: 'Herramientas', url: `${SITE_URLS.psz}/herramientas` },
          { name: 'Calculadora de subrogación', url: URL },
        ])}
      />
      <JsonLd
        data={speakableWebPageSchema({
          url: URL,
          name: 'Calculadora de subrogación de hipoteca',
          description: 'Calcula si te compensa cambiar tu hipoteca de banco: ahorro neto y punto de equilibrio.',
          cssSelectors: ['h1', '.speakable-summary'],
        })}
      />
      <JsonLd
        data={webApplicationSchema({
          url: URL,
          name: 'Calculadora de subrogación de hipoteca',
          description:
            'Calculadora de subrogación/cambio de hipoteca por Toño Palacios, broker hipotecario nº E242. Compara los intereses restantes con el TIN actual frente a un TIN nuevo (amortización francesa sobre el capital pendiente), descuenta los costes del cambio y calcula ahorro neto, ahorro mensual y punto de equilibrio.',
          category: 'FinanceApplication',
          features: [
            'Comparación de intereses restantes (TIN actual vs nuevo)',
            'Ahorro neto tras descontar costes del cambio',
            'Ahorro en la cuota mensual',
            'Punto de equilibrio (meses para recuperar costes)',
            'Avisos sobre subrogación, novación y límites Ley 5/2019',
            'Cálculo server-side, sin registro',
          ],
        })}
      />

      {/* HERO */}
      <Section tone="navy" padding="lg">
        <Container size="lg">
          <nav aria-label="Migas de pan" className="mb-6">
            <a href="/" className="inline-flex items-center gap-1.5 text-sm text-paper/65 hover:text-gold-300 no-underline transition-colors">
              <span aria-hidden>←</span> Inicio
            </a>
            <span className="text-paper/30 mx-2" aria-hidden>›</span>
            <a href="/herramientas" className="text-sm text-paper/65 hover:text-gold-300 no-underline transition-colors">Herramientas</a>
            <span className="text-paper/30 mx-2" aria-hidden>›</span>
            <span className="text-sm text-paper/85">Subrogación</span>
          </nav>

          <p className="text-gold-300 text-sm uppercase tracking-wider mb-3">
            Herramienta propietaria con El Sello Palacios · Cálculo server-side
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-paper leading-tight mb-4">
            ¿Me compensa cambiar de hipoteca?
          </h1>
          <p className="speakable-summary text-lg text-paper/80 max-w-3xl">
            Compara los intereses que te quedan por pagar con tu tipo actual frente a un tipo nuevo,
            descuenta los costes de cambiar y descubre el ahorro neto real, cuánto bajaría tu cuota y
            en cuántos meses recuperas los gastos del cambio.
          </p>
        </Container>
      </Section>

      {/* CALCULADORA */}
      <Section tone="paper" padding="md">
        <Container size="xl">
          <SubrogacionForm />
        </Container>
      </Section>

      {/* ADVERTENCIA LEGAL */}
      <Section tone="paper" padding="sm">
        <Container size="md">
          <LegalDisclaimer variant="mortgage" />
        </Container>
      </Section>

      {/* AVISO LEGAL */}
      <Section tone="paper" padding="md">
        <Container size="md">
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 text-sm leading-relaxed text-amber-900">
            <p className="font-bold text-amber-950 mb-2">Aviso legal — léelo antes de tomar decisiones</p>
            <p className="mb-2">
              Calculadora <strong>orientativa</strong>. No constituye oferta vinculante ni asesoramiento.
              Usa la amortización francesa sobre el capital pendiente y el plazo restante, sin tener en
              cuenta vinculaciones, bonificaciones ni comisiones de apertura del nuevo préstamo.
            </p>
            <p className="mb-2">
              Las comisiones por amortización anticipada, subrogación o novación están reguladas por la
              <strong> Ley 5/2019</strong> y dependen de tu escritura y del tipo de interés (fijo o
              variable). Revisa tu contrato y la FEIN del nuevo banco antes de decidir.
            </p>
            <p>
              El ahorro real puede diferir del mostrado. La decisión final debe basarse en la oferta
              vinculante (FEIN) de la entidad.
            </p>
          </div>
        </Container>
      </Section>

      {/* EXPLICACIÓN */}
      <Section tone="soft" padding="md" title="¿Cuándo compensa subrogar la hipoteca?">
        <Container size="md">
          <div className="prose-psz">
            <p>
              Cambiar la hipoteca de banco (subrogación) o renegociarla con el tuyo (novación) puede
              ahorrarte miles de euros… o no compensar nada. Depende de tres cosas:{' '}
              <strong>cuánto baja el tipo</strong>, <strong>cuánto te queda de hipoteca</strong> y{' '}
              <strong>cuánto cuesta el cambio</strong>.
            </p>
            <p>
              Esta calculadora compara los intereses que pagarías con tu tipo actual frente al nuevo, le
              resta los costes (comisión, tasación, gestoría) y te da el <strong>ahorro neto</strong> y
              el <strong>punto de equilibrio</strong>: cuántos meses tardas en recuperar lo que cuesta
              cambiar. Si quedan pocos años, ojo: en el sistema francés ya has pagado el grueso de
              intereses, y el margen es pequeño.
            </p>
            <p>
              Si los números salen, el siguiente paso es conseguir esa oferta nueva al mejor precio —
              eso es lo que hago como broker, negociando con más de 20 entidades.
            </p>
          </div>
        </Container>
      </Section>

      {/* INTERNAL LINKING */}
      <Section tone="paper" padding="md" title="También te puede interesar">
        <Container size="lg">
          <div className="grid md:grid-cols-3 gap-4">
            <a href="/calculadora-stress-test-euribor" className="block bg-paper-card border border-navy-100 rounded-xl p-6 hover:border-gold-400 hover:shadow-card transition-all no-underline">
              <p className="text-xs uppercase tracking-wider text-gold-600 font-semibold mb-2">Otra herramienta</p>
              <h3 className="text-lg font-semibold text-navy-800 mb-2">Stress test Euríbor</h3>
              <p className="text-sm text-ink-soft">Si tu hipoteca es variable, mira cuánto subiría tu cuota si el Euríbor sube.</p>
            </a>
            <a href="/comparador-hipoteca-fija-variable-mixta" className="block bg-paper-card border border-navy-100 rounded-xl p-6 hover:border-gold-400 hover:shadow-card transition-all no-underline">
              <p className="text-xs uppercase tracking-wider text-gold-600 font-semibold mb-2">Otra herramienta</p>
              <h3 className="text-lg font-semibold text-navy-800 mb-2">Fija vs variable vs mixta</h3>
              <p className="text-sm text-ink-soft">Si vas a cambiar, decide la modalidad con números en 3 escenarios de Euríbor.</p>
            </a>
            <a href="/broker-hipotecario" className="block bg-paper-card border border-navy-100 rounded-xl p-6 hover:border-gold-400 hover:shadow-card transition-all no-underline">
              <p className="text-xs uppercase tracking-wider text-gold-600 font-semibold mb-2">Servicio</p>
              <h3 className="text-lg font-semibold text-navy-800 mb-2">Servicio de broker hipotecario</h3>
              <p className="text-sm text-ink-soft">Consigo la oferta de subrogación al mejor precio. +20 entidades.</p>
            </a>
          </div>
        </Container>
      </Section>

      {/* AUTORÍA */}
      <Section tone="soft" padding="md">
        <Container size="md">
          <div className="bg-paper-card border border-navy-100 rounded-xl p-6 md:p-8">
            <div className="mb-4"><SelloPalacios variant="inline" /></div>
            <h2 className="text-2xl font-bold text-navy-800 mb-3">
              Diseñada por Antonio Palacios Cambero (Toño Palacios)
            </h2>
            <p className="text-navy-700 leading-relaxed mb-0">
              Saber si compensa cambiar de hipoteca no es solo restar tipos: hay que pesar comisiones,
              años restantes y el momento del cuadro de amortización. Esta calculadora aplica ese
              criterio. Si los números salen,{' '}
              <a href="/broker-hipotecario" className="text-navy-700 hover:text-navy-900 underline font-semibold">
                consigo la subrogación al mejor precio como broker
              </a>.
            </p>
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section tone="navy" padding="md">
        <Container size="md" className="text-center">
          <h2 className="text-3xl font-bold text-paper mb-4">¿Los números salen a favor de cambiar?</h2>
          <p className="text-paper/80 text-lg mb-8 max-w-prose mx-auto">
            Llámame antes de firmar la subrogación. Negocio con +20 entidades para que el tipo nuevo sea
            de verdad el mejor de mercado, no solo mejor que el que tienes.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button href={MORTGAGE_FORM_URL} variant="gold" size="lg" target="_blank" rel="noopener noreferrer">
              Solicitar con {TONO.shortName} →
            </Button>
            <Button href="/broker-hipotecario" variant="primary" size="lg">
              Ver mi servicio de broker
            </Button>
          </div>
        </Container>
      </Section>
      <CanalTelegramBanner />
    </main>
  )
}
