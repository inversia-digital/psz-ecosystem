import {
  MORTGAGE_FORM_URL,
  SITE_URLS,
  TONO,
  breadcrumbSchema,
  faqPageSchema,
  localFinancialServiceSchema,
} from '@psz/seo'
import { Button, Container, CredentialBadge, Faq, JsonLd, Section } from '@psz/ui'
import { WHY_TONO_BULLETS } from '../_data/whyTono'
import type { CityData } from '../_data/cities'

/**
 * Template compartido para los 5 pillars locales /broker-hipotecario-[ciudad].
 * Cada page concreto importa este componente y le pasa la data de la ciudad.
 * Garantiza coherencia + facilita mantenimiento.
 */
export function LocalPillar({ city }: { city: CityData }) {
  const url = `${SITE_URLS.psz}/broker-hipotecario-${city.slug}`

  return (
    <main>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Inicio', url: SITE_URLS.psz },
          { name: 'Broker hipotecario', url: `${SITE_URLS.psz}/broker-hipotecario` },
          { name: city.name, url },
        ])}
      />
      <JsonLd
        data={localFinancialServiceSchema({
          cityName: city.name,
          region: city.region,
          latitude: city.geo.lat,
          longitude: city.geo.lng,
          url,
        })}
      />
      <JsonLd data={faqPageSchema([...city.faq])} />

      {/* HERO */}
      <Section tone="navy" padding="lg">
        <Container size="lg">
          <p className="text-gold-300 text-sm uppercase tracking-wider mb-3">
            Broker hipotecario · {city.region}
          </p>
          <h1 className="text-4xl md:text-6xl font-bold text-paper leading-tight mb-4">
            Broker hipotecario en {city.name}
          </h1>
          <p className="text-xl text-paper/80 max-w-2xl mb-8">{city.angle}</p>
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
          <Button
            href={MORTGAGE_FORM_URL}
            variant="gold"
            size="lg"
            target="_blank"
            rel="noopener noreferrer"
          >
            Solicitar mi hipoteca en {city.name} →
          </Button>
        </Container>
      </Section>

      {/* MI ENFOQUE EN LA CIUDAD */}
      <Section
        tone="paper"
        padding="md"
        title={`Mi enfoque en ${city.name}`}
      >
        <Container size="md">
          <div className="prose-psz">
            <p className="text-lg">{city.intro}</p>
            <p className="text-ink-muted text-sm mt-6">
              <strong>Modalidad de trabajo:</strong> {city.workMode}
            </p>
          </div>
        </Container>
      </Section>

      {/* MERCADO LOCAL */}
      <Section tone="soft" padding="md" title={`El mercado de ${city.name}`}>
        <Container size="lg">
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <article className="bg-paper-card rounded-xl border border-navy-100 p-6 shadow-soft">
              <h3 className="text-xl font-semibold mb-3 text-navy-800">Panorama del mercado</h3>
              <p className="text-ink-soft mb-4">{city.marketSummary}</p>
              <p className="text-sm text-ink-muted">
                <strong>Precio medio:</strong> {city.pricePerSqm}
              </p>
            </article>
            <article className="bg-paper-card rounded-xl border border-navy-100 p-6 shadow-soft">
              <h3 className="text-xl font-semibold mb-3 text-navy-800">Bancos especialmente activos</h3>
              <ul className="text-ink-soft space-y-2">
                {city.banksActive.map((b) => (
                  <li key={b} className="flex gap-2">
                    <span className="text-gold-500">▸</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </article>
            <article className="bg-paper-card rounded-xl border border-navy-100 p-6 shadow-soft md:col-span-2">
              <h3 className="text-xl font-semibold mb-3 text-navy-800">
                Perfiles que más trabajo en {city.name}
              </h3>
              <ul className="text-ink-soft space-y-2">
                {city.clientProfiles.map((p) => (
                  <li key={p} className="flex gap-2">
                    <span className="text-gold-500">▸</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </Container>
      </Section>

      {/* POR QUÉ TOÑO (reutiliza WHY_TONO_BULLETS) */}
      <Section tone="paper" padding="md" title="Por qué Toño Palacios y no otro broker">
        <Container size="lg">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHY_TONO_BULLETS.map((b, i) => (
              <article
                key={i}
                className="bg-paper-card rounded-xl border border-navy-100 border-t-4 border-t-gold-400 p-6 shadow-soft hover:shadow-card transition-shadow"
              >
                <h3 className="text-xl font-semibold mb-3 text-navy-800">{b.title}</h3>
                <p className="text-ink-soft text-sm">{b.body}</p>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      {/* CASO TÍPICO LOCAL */}
      <Section tone="soft" padding="md" title={`Un caso real en ${city.name}`}>
        <Container size="md">
          <article className="bg-paper-card rounded-xl border border-navy-100 border-t-4 border-t-gold-400 p-8 shadow-card">
            <h3 className="text-2xl font-semibold mb-4 text-navy-800">{city.typicalCase.title}</h3>
            <p className="text-ink-soft">{city.typicalCase.body}</p>
            <p className="text-sm text-ink-muted mt-4 italic">
              Caso anonimizado representativo. Cada operación es distinta — habla conmigo y vemos la tuya.
            </p>
          </article>
        </Container>
      </Section>

      {/* FAQ LOCAL */}
      <Section tone="paper" padding="md" title="Preguntas frecuentes">
        <Container size="md">
          <Faq items={[...city.faq]} />
        </Container>
      </Section>

      {/* CTA */}
      <Section tone="navy" padding="lg">
        <Container size="md" className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-paper mb-4">
            ¿Hablamos de tu hipoteca en {city.name}?
          </h2>
          <p className="text-paper/80 text-lg mb-8 max-w-prose mx-auto">
            Primera llamada gratis. Te digo si tu caso es viable y a qué bancos podemos
            presentarlo. Sin compromiso, sin coste, sin presión.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button
              href={MORTGAGE_FORM_URL}
              variant="gold"
              size="lg"
              target="_blank"
              rel="noopener noreferrer"
            >
              Solicitar mi hipoteca →
            </Button>
            <Button href="/broker-hipotecario" variant="primary" size="lg">
              Ver guía completa
            </Button>
          </div>
        </Container>
      </Section>
    </main>
  )
}
