import type { Metadata } from 'next'
import {
  INVERSIA,
  MORTGAGE_FORM_URL,
  SITE_URLS,
  TELEGRAM_INVESTORS_URL,
  TONO,
  breadcrumbSchema,
} from '@psz/seo'
import { Button, Container, JsonLd, Section } from '@psz/ui'

const URL = `${SITE_URLS.psz}/contacto`

export const metadata: Metadata = {
  title: 'Contacto · Toño Palacios broker hipotecario',
  description:
    'Habla con Toño Palacios, broker hipotecario nº E242 y presidente de ANICI. Asesoría hipotecaria en toda España. Solicita tu hipoteca, infórmate sobre inversión inmobiliaria o únete al canal Telegram.',
  alternates: { canonical: URL },
  openGraph: {
    url: URL,
    title: 'Contacto · Toño Palacios broker hipotecario E242',
    description:
      'Habla con Toño Palacios, broker hipotecario nº E242 y presidente de ANICI. Asesoría hipotecaria en toda España.',
    locale: 'es_ES',
  },
}

export default function ContactoPage() {
  return (
    <main>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Inicio', url: SITE_URLS.psz },
          { name: 'Contacto', url: URL },
        ])}
      />

      {/* HERO */}
      <Section tone="navy" padding="lg">
        <Container size="md">
          <p className="text-gold-300 text-sm uppercase tracking-wider mb-3">Contacto</p>
          <h1 className="text-4xl md:text-5xl font-bold text-paper mb-6">¿Hablamos?</h1>
          <p className="text-xl text-paper/80 max-w-2xl">
            Elige la vía que mejor encaje con lo que necesitas. Atiendo en toda España de forma
            digital, y en persona desde Zaragoza para clientes que lo prefieran.
          </p>
        </Container>
      </Section>

      {/* TRES VÍAS */}
      <Section tone="paper" padding="md">
        <Container size="lg">
          <div className="grid md:grid-cols-3 gap-6">
            <article className="bg-paper-card rounded-xl border-2 border-gold-300 p-6 shadow-card flex flex-col">
              <p className="text-xs uppercase tracking-wider text-gold-600 mb-2 font-semibold">
                Si quieres una hipoteca
              </p>
              <h2 className="text-2xl font-bold mb-3 text-navy-800">Solicita tu hipoteca</h2>
              <p className="text-ink-soft mb-6 flex-1">
                Rellena el formulario del CRM de Hipobrokers. Te llamo en menos de 24 horas
                laborables para una primera evaluación gratuita y sin compromiso.
              </p>
              <Button href={MORTGAGE_FORM_URL} variant="gold" size="md">
                Ir al formulario →
              </Button>
            </article>

            <article className="bg-paper-card rounded-xl border border-navy-100 p-6 shadow-soft flex flex-col">
              <p className="text-xs uppercase tracking-wider text-ink-muted mb-2 font-semibold">
                Si te interesa invertir
              </p>
              <h2 className="text-2xl font-bold mb-3 text-navy-800">Canal Telegram inversores</h2>
              <p className="text-ink-soft mb-6 flex-1">
                Comparto oportunidades inmobiliarias seleccionadas y análisis del mercado. Acceso
                libre, contenido depurado, cero spam.
              </p>
              <Button href={TELEGRAM_INVESTORS_URL} variant="primary" size="md">
                Unirme al canal →
              </Button>
            </article>

            <article className="bg-paper-card rounded-xl border border-navy-100 p-6 shadow-soft flex flex-col">
              <p className="text-xs uppercase tracking-wider text-ink-muted mb-2 font-semibold">
                Si prefieres email directo
              </p>
              <h2 className="text-2xl font-bold mb-3 text-navy-800">Escríbeme</h2>
              <p className="text-ink-soft mb-6 flex-1">
                Email general para consultas profesionales, formación, prensa, colaboraciones o
                cualquier asunto que no encaje en las dos opciones anteriores.
              </p>
              <Button
                href={`mailto:${INVERSIA.email}?subject=Consulta%20desde%20psz.es`}
                variant="secondary"
                size="md"
              >
                {INVERSIA.email}
              </Button>
            </article>
          </div>
        </Container>
      </Section>

      {/* DATOS LEGALES */}
      <Section tone="soft" padding="md" title="Datos de contacto">
        <Container size="md">
          <div className="bg-paper-card rounded-xl border border-navy-100 p-6 md:p-8">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm uppercase tracking-wider text-ink-muted mb-2">Empresa operativa</p>
                <p className="font-semibold text-ink">{INVERSIA.displayName}</p>
                <p className="text-ink-soft text-sm mt-1">CIF {INVERSIA.taxId}</p>
                <p className="text-ink-soft text-sm">
                  Banco de España nº {TONO.credentials.bdeId}
                </p>
              </div>
              <div>
                <p className="text-sm uppercase tracking-wider text-ink-muted mb-2">Dirección y teléfono</p>
                <p className="text-ink-soft">
                  {INVERSIA.address.street}
                  <br />
                  {INVERSIA.address.postalCode} {INVERSIA.address.city}, {INVERSIA.address.region}
                  <br />
                  España
                </p>
                <p className="text-ink-soft mt-2">
                  Tel.{' '}
                  <a href={`tel:${INVERSIA.phone}`} className="font-medium">
                    {INVERSIA.phone}
                  </a>
                  <br />
                  Email{' '}
                  <a href={`mailto:${INVERSIA.email}`} className="font-medium">
                    {INVERSIA.email}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  )
}
