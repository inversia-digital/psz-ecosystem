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
import ViabilidadForm from './ViabilidadForm'

const URL = `${SITE_URLS.psz}/test-viabilidad-hipotecaria`

export const metadata: Metadata = {
  title: 'Test de viabilidad hipotecaria 2026 · ¿Te daría el banco la hipoteca? · Toño Palacios',
  description:
    '¿Pasaría tu operación el filtro del banco? Con tus ingresos, deudas, precio, ahorro, plazo, edad y tipo de contrato, calcula la cuota, el ratio de esfuerzo, el LTV y la edad al vencimiento, y obtén un veredicto VIABLE / AJUSTADA / DIFÍCIL con los motivos. Por Toño Palacios, broker hipotecario nº E242 (Banco de España). Cálculo server-side, sin registro.',
  alternates: { canonical: URL },
  robots: { index: true, follow: true },
  authors: [{ name: TONO.fullName, url: `${SITE_URLS.psz}/sobre-mi` }],
  creator: `${TONO.fullName} (${TONO.shortName})`,
  publisher: 'Inversia Global Digital, S.L.U.',
  keywords: [
    'test viabilidad hipoteca',
    'me darian la hipoteca',
    'puedo pedir una hipoteca',
    'cuanto me da el banco hipoteca',
    'ratio de esfuerzo hipoteca',
    'requisitos hipoteca scoring',
    'viabilidad hipotecaria calculadora',
    'simulador concesion hipoteca',
  ],
  openGraph: {
    url: URL,
    type: 'website',
    siteName: 'psz.es',
    locale: 'es_ES',
    title: 'Test de viabilidad hipotecaria · ¿Te daría el banco la hipoteca? · Toño Palacios',
    description:
      'Veredicto VIABLE / AJUSTADA / DIFÍCIL con ratio de esfuerzo, LTV y edad al vencimiento. Por Toño Palacios, broker E242.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Test de viabilidad hipotecaria · psz.es',
    description: '¿Pasaría tu operación el filtro del banco? Veredicto y motivos en segundos.',
  },
}

export default function TestViabilidadPage() {
  return (
    <main>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Inicio', url: SITE_URLS.psz },
          { name: 'Herramientas', url: `${SITE_URLS.psz}/herramientas` },
          { name: 'Test de viabilidad hipotecaria', url: URL },
        ])}
      />
      <JsonLd
        data={speakableWebPageSchema({
          url: URL,
          name: 'Test de viabilidad hipotecaria',
          description: 'Comprueba si tu operación hipotecaria es viable: veredicto y motivos según los criterios del banco.',
          cssSelectors: ['h1', '.speakable-summary'],
        })}
      />
      <JsonLd
        data={webApplicationSchema({
          url: URL,
          name: 'Test de viabilidad hipotecaria',
          description:
            'Test de viabilidad hipotecaria por Toño Palacios, broker hipotecario nº E242. A partir de ingresos, deudas, precio, ahorro, plazo, edad y tipo de contrato estima cuota, ratio de esfuerzo, LTV y edad al vencimiento, y devuelve un veredicto VIABLE / AJUSTADA / DIFÍCIL con los motivos de cada factor.',
          category: 'FinanceApplication',
          features: [
            'Veredicto VIABLE / AJUSTADA / DIFÍCIL',
            'Ratio de esfuerzo financiero',
            'LTV (loan-to-value) sobre el precio',
            'Edad al vencimiento del préstamo',
            'Cuota estimada con TIN de referencia',
            'Motivos detallados de cada factor',
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
            <span className="text-sm text-paper/85">Test de viabilidad</span>
          </nav>

          <p className="text-gold-300 text-sm uppercase tracking-wider mb-3">
            Herramienta propietaria con El Sello Palacios · Cálculo server-side
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-paper leading-tight mb-4">
            ¿Te daría el banco la hipoteca?
          </h1>
          <p className="speakable-summary text-lg text-paper/80 max-w-3xl">
            Antes de enamorarte de un piso, comprueba si tu operación pasaría el filtro del banco.
            Este test cruza tus ingresos, deudas, ahorro, plazo, edad y tipo de contrato con los
            mismos rangos que mira una mesa de riesgos y te da un veredicto claro:{' '}
            <strong>viable, ajustada o difícil</strong>, con los motivos.
          </p>
        </Container>
      </Section>

      {/* TEST */}
      <Section tone="paper" padding="md">
        <Container size="xl">
          <ViabilidadForm />
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
              Test <strong>orientativo</strong>. No es una concesión ni una oferta vinculante, ni
              sustituye al estudio que hace el banco. Estima la cuota con un TIN de referencia del 3%
              y los gastos de compra en ~12% del precio; tu caso real puede variar.
            </p>
            <p className="mb-2">
              El veredicto se basa en rangos habituales del scoring bancario (ratio de esfuerzo, LTV,
              edad al vencimiento, estabilidad de ingresos). Cada entidad aplica su propia política y
              puede aceptar o rechazar operaciones fuera de estos rangos.
            </p>
            <p>
              La decisión final depende del banco tras analizar el expediente completo (vida laboral,
              CIRBE, historial, garantías). Un «ajustada» o incluso un «difícil» pueden salir adelante
              con el expediente bien presentado.
            </p>
          </div>
        </Container>
      </Section>

      {/* EXPLICACIÓN */}
      <Section tone="soft" padding="md" title="¿Qué mira el banco para concederte la hipoteca?">
        <Container size="md">
          <div className="prose-psz">
            <p>
              No basta con «ganar bien». El banco cruza varios filtros a la vez, y basta que uno falle
              para que el scoring diga que no. Los cuatro grandes son:
            </p>
            <ul>
              <li>
                <strong>Ratio de esfuerzo</strong>: qué porcentaje de tus ingresos se va en cuotas
                (la nueva más las que ya tengas). El límite sano ronda el 35%; por encima del 40% la
                mayoría dice que no.
              </li>
              <li>
                <strong>LTV</strong> (cuánto financias sobre el valor): lo estándar es hasta el 80%.
                Por encima hace falta avalista, doble garantía o seguro de prima única.
              </li>
              <li>
                <strong>Edad al vencimiento</strong>: la suma de tu edad más el plazo no suele poder
                pasar de 75-80 años.
              </li>
              <li>
                <strong>Estabilidad de ingresos</strong>: indefinido, temporal o autónomo cambia
                mucho la exigencia documental.
              </li>
            </ul>
            <p>
              Este test te dice, en segundos, en cuáles encajas y en cuáles no. Y si alguno está
              ajustado, ahí es donde un broker marca la diferencia: presentando tu caso al banco
              adecuado y reforzando lo que haga falta.
            </p>
          </div>
        </Container>
      </Section>

      {/* INTERNAL LINKING */}
      <Section tone="paper" padding="md" title="También te puede interesar">
        <Container size="lg">
          <div className="grid md:grid-cols-3 gap-4">
            <a href="/calculadora-capacidad-endeudamiento" className="block bg-paper-card border border-navy-100 rounded-xl p-6 hover:border-gold-400 hover:shadow-card transition-all no-underline">
              <p className="text-xs uppercase tracking-wider text-gold-600 font-semibold mb-2">Otra herramienta</p>
              <h3 className="text-lg font-semibold text-navy-800 mb-2">Capacidad de endeudamiento</h3>
              <p className="text-sm text-ink-soft">¿Cuánto te daría el banco? Importe y precio máximos en 3 escenarios.</p>
            </a>
            <a href="/calculadora-gastos-compra" className="block bg-paper-card border border-navy-100 rounded-xl p-6 hover:border-gold-400 hover:shadow-card transition-all no-underline">
              <p className="text-xs uppercase tracking-wider text-gold-600 font-semibold mb-2">Otra herramienta</p>
              <h3 className="text-lg font-semibold text-navy-800 mb-2">Gastos de compra</h3>
              <p className="text-sm text-ink-soft">El ahorro real que necesitas: impuestos, notaría, registro y gestoría.</p>
            </a>
            <a href="/broker-hipotecario" className="block bg-paper-card border border-navy-100 rounded-xl p-6 hover:border-gold-400 hover:shadow-card transition-all no-underline">
              <p className="text-xs uppercase tracking-wider text-gold-600 font-semibold mb-2">Servicio</p>
              <h3 className="text-lg font-semibold text-navy-800 mb-2">Servicio de broker hipotecario</h3>
              <p className="text-sm text-ink-soft">Si tu caso está ajustado, lo presento al banco adecuado. +20 entidades.</p>
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
              Diseñado por Antonio Palacios Cambero (Toño Palacios)
            </h2>
            <p className="text-navy-700 leading-relaxed mb-0">
              Los umbrales de este test no son fórmulas de manual: son los rangos con los que de verdad
              trabaja una mesa de riesgos. Si tu resultado sale «ajustada» o «difícil»,{' '}
              <a href="/broker-hipotecario" className="text-navy-700 hover:text-navy-900 underline font-semibold">
                como broker sé a qué banco presentarlo y cómo reforzarlo
              </a>.
            </p>
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section tone="navy" padding="md">
        <Container size="md" className="text-center">
          <h2 className="text-3xl font-bold text-paper mb-4">¿Tu test salió ajustado o difícil?</h2>
          <p className="text-paper/80 text-lg mb-8 max-w-prose mx-auto">
            No te quedes con el «no» de la app. Cuéntame tu caso: muchas operaciones que un banco
            rechaza salen adelante en otro, bien presentadas. Trabajo con +20 entidades.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button href={MORTGAGE_FORM_URL} variant="gold" size="lg" target="_blank" rel="noopener noreferrer">
              Estudiar mi caso con {TONO.shortName} →
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
