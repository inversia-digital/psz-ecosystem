import type { Metadata } from 'next'
import { SITE_URLS, TONO, breadcrumbSchema } from '@psz/seo'
import { Container, JsonLd, Section } from '@psz/ui'
import { MortgageFunnel } from './MortgageFunnel'

const URL = `${SITE_URLS.psz}/solicitar-hipoteca`

export const metadata: Metadata = {
  title: 'Solicita tu hipoteca · Toño Palacios broker hipotecario',
  description:
    'Cuéntame tu caso en 1 minuto y reviso tu viabilidad personalmente. Primera evaluación gratuita y sin compromiso, en toda España. Toño Palacios, broker hipotecario nº E242.',
  alternates: { canonical: URL },
  openGraph: {
    url: URL,
    title: 'Solicita tu hipoteca · Toño Palacios broker hipotecario E242',
    description:
      'Cuéntame tu caso en 1 minuto y reviso tu viabilidad personalmente. Primera evaluación gratuita y sin compromiso.',
    locale: 'es_ES',
  },
}

export default function SolicitarHipotecaPage({
  searchParams,
}: {
  searchParams?: { [k: string]: string | string[] | undefined }
}) {
  const pick = (k: string) => {
    const v = searchParams?.[k]
    return (Array.isArray(v) ? v[0] : v) ?? ''
  }
  const initial = {
    tipo_operacion: pick('tipo'),
    precio: pick('precio'),
    financiacion: pick('financiacion'),
    ingresos: pick('ingresos'),
    plazo: pick('plazo'),
    tin: pick('tin'),
    origen: pick('origen'),
  }
  return (
    <main>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Inicio', url: SITE_URLS.psz },
          { name: 'Solicita tu hipoteca', url: URL },
        ])}
      />

      <Section tone="navy" padding="lg">
        <Container size="md">
          <p className="text-gold-300 text-sm uppercase tracking-wider mb-3">Estudio gratuito</p>
          <h1 className="text-4xl md:text-5xl font-bold text-paper mb-6">Solicita tu hipoteca</h1>
          <p className="text-xl text-paper/80 max-w-2xl">
            Cuéntame tu caso en un minuto. Lo reviso personalmente y te llamo en menos de 24 horas
            laborables para una primera evaluación gratuita y sin compromiso. Atiendo en toda España.
          </p>
        </Container>
      </Section>

      <Section tone="paper" padding="md">
        <Container size="lg">
          <MortgageFunnel initial={initial} />
          <p className="mx-auto mt-8 max-w-2xl text-center text-xs text-ink-muted">
            {TONO.shortName} · Intermediario de crédito inmobiliario nº {TONO.credentials.bdeId} (Banco de
            España). Tus datos se tratan de forma confidencial y solo para evaluar tu solicitud.
          </p>
        </Container>
      </Section>
    </main>
  )
}
