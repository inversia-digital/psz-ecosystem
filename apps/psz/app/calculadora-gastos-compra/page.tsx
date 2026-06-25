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
import { SelloPalacios } from '../_components/SelloPalacios'
import GastosForm from './GastosForm'

const URL = `${SITE_URLS.psz}/calculadora-gastos-compra`

export const metadata: Metadata = {
  title: 'Calculadora de gastos de compra de vivienda 2026 · ¿Cuánto necesito ahorrado? · Toño Palacios',
  description:
    'Calcula los gastos de comprar una vivienda en España por Comunidad Autónoma: ITP (segunda mano) o IVA + AJD (obra nueva), notaría, registro, gestoría y tasación. Descubre el ahorro real que necesitas (entrada + gastos), no solo el precio. Por Toño Palacios, broker hipotecario nº E242 (Banco de España). Cálculo server-side, sin registro.',
  alternates: { canonical: URL },
  robots: { index: true, follow: true },
  authors: [{ name: TONO.fullName, url: `${SITE_URLS.psz}/sobre-mi` }],
  creator: `${TONO.fullName} (${TONO.shortName})`,
  publisher: 'Inversia Global Digital, S.L.U.',
  keywords: [
    'gastos de compra vivienda',
    'calculadora gastos compra casa',
    'cuánto necesito ahorrado para comprar casa',
    'gastos hipoteca 2026',
    'ITP por comunidad autónoma',
    'IVA AJD obra nueva',
    'gastos notaría registro compraventa',
    'entrada vivienda calculadora',
    'gastos comprar piso España',
  ],
  openGraph: {
    url: URL,
    type: 'website',
    siteName: 'psz.es',
    locale: 'es_ES',
    title: 'Calculadora de gastos de compra · ¿Cuánto necesito ahorrado? · Toño Palacios',
    description:
      'ITP/IVA+AJD por comunidad, notaría, registro, gestoría y tasación. Te dice el ahorro real que necesitas. Por Toño Palacios, broker E242.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Calculadora de gastos de compra de vivienda · psz.es',
    description: '¿Cuánto necesitas ahorrado de verdad? ITP/IVA+AJD por CCAA + notaría, registro, gestoría y tasación.',
  },
}

export default function CalculadoraGastosCompraPage() {
  return (
    <main>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Inicio', url: SITE_URLS.psz },
          { name: 'Herramientas', url: `${SITE_URLS.psz}/herramientas` },
          { name: 'Calculadora de gastos de compra', url: URL },
        ])}
      />
      <JsonLd
        data={speakableWebPageSchema({
          url: URL,
          name: 'Calculadora de gastos de compra de vivienda',
          description: 'Calcula impuestos y gastos de compra por comunidad autónoma y el ahorro necesario.',
          cssSelectors: ['h1', '.speakable-summary'],
        })}
      />
      <JsonLd
        data={webApplicationSchema({
          url: URL,
          name: 'Calculadora de gastos de compra de vivienda',
          description:
            'Calculadora de gastos de compra de vivienda en España por Toño Palacios, broker hipotecario nº E242. Calcula ITP (segunda mano) o IVA + AJD (obra nueva) por comunidad autónoma, más notaría, registro, gestoría y tasación, y el ahorro real necesario (entrada + gastos).',
          category: 'FinanceApplication',
          features: [
            'Cálculo de ITP por comunidad autónoma (segunda mano)',
            'Cálculo de IVA + AJD (obra nueva)',
            'Estimación de notaría, registro, gestoría y tasación',
            'Cálculo del ahorro necesario (entrada + gastos)',
            'Avisos sobre bonificaciones autonómicas y regla del 10-12%',
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
            <span className="text-sm text-paper/85">Gastos de compra</span>
          </nav>

          <p className="text-gold-300 text-sm uppercase tracking-wider mb-3">
            Herramienta propietaria con El Sello Palacios · Cálculo server-side
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-paper leading-tight mb-4">
            Calculadora de gastos de compra
          </h1>
          <p className="speakable-summary text-lg text-paper/80 max-w-3xl">
            ¿Cuánto necesitas ahorrado de verdad para comprar? Calcula los impuestos (ITP por
            comunidad en segunda mano, o IVA + AJD en obra nueva), la notaría, el registro, la
            gestoría y la tasación — y el ahorro total que tienes que tener, no solo el precio.
          </p>
        </Container>
      </Section>

      {/* CALCULADORA */}
      <Section tone="paper" padding="md">
        <Container size="xl">
          <GastosForm />
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
              Esta herramienta es una calculadora <strong>orientativa</strong> y no constituye
              asesoramiento fiscal ni oferta vinculante. Los impuestos (ITP, IVA, AJD) dependen del
              <strong> valor de referencia catastral</strong>, de los tramos y de las
              <strong> bonificaciones autonómicas</strong> vigentes (vivienda habitual, edad, familia
              numerosa, discapacidad, zonas despobladas, VPO), que pueden reducir el importe.
            </p>
            <p className="mb-2">
              Los importes de notaría, registro, gestoría y tasación son <strong>estimaciones</strong>
              {' '}basadas en aranceles y práctica habitual; el coste real lo fija cada profesional y el
              valor de la operación.
            </p>
            <p>
              Verifica siempre el impuesto aplicable con la Hacienda autonómica correspondiente o con
              un asesor fiscal antes de cerrar la compra.
            </p>
          </div>
        </Container>
      </Section>

      {/* EXPLICACIÓN */}
      <Section tone="soft" padding="md" title="¿Por qué importa saber esto antes de comprar?">
        <Container size="md">
          <div className="prose-psz">
            <p>
              El error más común al comprar vivienda es presupuestar solo la entrada y olvidar los
              gastos. <strong>El banco financia la vivienda, casi nunca los gastos</strong>: ese
              10-12% (segunda mano) o 11-13% (obra nueva) tiene que salir de tu bolsillo, además de la
              entrada que el banco no cubre.
            </p>
            <p>
              Esta calculadora separa las dos cosas: lo que pagas en impuestos y trámites, y el
              <strong> ahorro total que necesitas tener disponible</strong> para llegar a la firma sin
              sustos. El impuesto cambia mucho según tu comunidad — y según si hay bonificaciones que
              te apliquen.
            </p>
            <p>
              Si vas a financiar, antes de comprar conviene saber cuánto te daría el banco y si tu
              caso es viable. Para eso están las otras herramientas — y el broker.
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
              <p className="text-sm text-ink-soft">¿Cuánto te daría realmente el banco? 3 escenarios según ratio de esfuerzo.</p>
            </a>
            <a href="/calculadora-hipoteca" className="block bg-paper-card border border-navy-100 rounded-xl p-6 hover:border-gold-400 hover:shadow-card transition-all no-underline">
              <p className="text-xs uppercase tracking-wider text-gold-600 font-semibold mb-2">Otra herramienta</p>
              <h3 className="text-lg font-semibold text-navy-800 mb-2">Calculadora de hipoteca</h3>
              <p className="text-sm text-ink-soft">Cuota mensual, intereses, LTV y ratio de esfuerzo con avisos de scoring.</p>
            </a>
            <a href="/broker-hipotecario" className="block bg-paper-card border border-navy-100 rounded-xl p-6 hover:border-gold-400 hover:shadow-card transition-all no-underline">
              <p className="text-xs uppercase tracking-wider text-gold-600 font-semibold mb-2">Servicio</p>
              <h3 className="text-lg font-semibold text-navy-800 mb-2">Servicio de broker hipotecario</h3>
              <p className="text-sm text-ink-soft">+20 entidades, criterios reales de scoring. La hipoteca que tu banco no te cuenta.</p>
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
              Los impuestos de compra y la regla práctica del ahorro necesario varían por comunidad y
              por el perfil del comprador. Esta calculadora reúne los criterios que aplico al preparar
              cada operación. Si vas a comprar con hipoteca,{' '}
              <a href="/broker-hipotecario" className="text-navy-700 hover:text-navy-900 underline font-semibold">
                trabajemos juntos como broker hipotecario
              </a>.
            </p>
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section tone="navy" padding="md">
        <Container size="md" className="text-center">
          <h2 className="text-3xl font-bold text-paper mb-4">¿Vas a comprar con hipoteca?</h2>
          <p className="text-paper/80 text-lg mb-8 max-w-prose mx-auto">
            Antes de firmar nada, hablemos. Te digo qué bancos encajan con tu caso y cómo llegar a la
            compra con los números claros.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button href={`${MORTGAGE_FORM_URL}?origen=gastos-compra`} variant="gold" size="lg" target="_blank" rel="noopener noreferrer">
              Solicitar mi hipoteca con {TONO.shortName} →
            </Button>
            <Button href="/broker-hipotecario" variant="primary" size="lg">
              Ver mi servicio de broker
            </Button>
          </div>
        </Container>
      </Section>
    </main>
  )
}
