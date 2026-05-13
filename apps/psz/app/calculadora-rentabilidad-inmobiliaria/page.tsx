import type { Metadata } from 'next'
import {
  SITE_URLS,
  TELEGRAM_INVESTORS_URL,
  TONO,
  breadcrumbSchema,
  speakableWebPageSchema,
} from '@psz/seo'
import { Button, Container, JsonLd, Section } from '@psz/ui'
import RoiForm from './RoiForm'

const URL = `${SITE_URLS.psz}/calculadora-rentabilidad-inmobiliaria`

export const metadata: Metadata = {
  title: 'Calculadora de rentabilidad inmobiliaria — 3 escenarios (pesimista, probable, optimista)',
  description:
    'Calcula la rentabilidad bruta, neta y flujo neto mensual de tu inversión inmobiliaria con 3 escenarios paralelos de renta. Incluye IBI prorrateado, comunidad y tasa de residuos. Avisos automáticos sobre rangos críticos del mercado. Herramienta de Toño Palacios, Personal Shopper Inmobiliario.',
  alternates: { canonical: URL },
  robots: { index: true, follow: true },
  keywords: [
    'calculadora rentabilidad inmobiliaria',
    'rentabilidad bruta vs neta',
    'flujo neto mensual alquiler',
    'rentabilidad inversión piso',
    'calcular ROI inmueble',
    'simulador rentabilidad alquiler',
    'cash flow inmobiliario',
  ],
  openGraph: {
    url: URL,
    title: 'Calculadora de rentabilidad inmobiliaria · 3 escenarios',
    description: 'Bruta, neta, flujo neto mensual y payback en escenarios pesimista, probable y optimista.',
    locale: 'es_ES',
  },
}

export default function CalculadoraRentabilidadPage() {
  return (
    <main>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Inicio', url: SITE_URLS.psz },
          { name: 'Calculadora de rentabilidad inmobiliaria', url: URL },
        ])}
      />
      <JsonLd
        data={speakableWebPageSchema({
          url: URL,
          name: 'Calculadora de rentabilidad inmobiliaria',
          description:
            'Rentabilidad bruta, neta y flujo neto mensual en 3 escenarios de renta paralelos.',
          cssSelectors: ['h1', '.speakable-summary'],
        })}
      />

      <Section tone="navy" padding="lg">
        <Container size="lg">
          {/* Breadcrumb visible */}
          <nav aria-label="Migas de pan" className="mb-6">
            <a
              href="/"
              className="inline-flex items-center gap-1.5 text-sm text-paper/65 hover:text-gold-300 no-underline transition-colors"
            >
              <span aria-hidden>←</span> Inicio
            </a>
            <span className="text-paper/30 mx-2" aria-hidden>›</span>
            <span className="text-sm text-paper/85">Calculadora rentabilidad</span>
          </nav>

          <p className="text-gold-300 text-sm uppercase tracking-wider mb-3">
            Herramienta propietaria · 3 escenarios paralelos
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-paper leading-tight mb-4">
            Calculadora de rentabilidad inmobiliaria
          </h1>
          <p className="speakable-summary text-lg text-paper/80 max-w-3xl">
            Rentabilidad bruta, neta, flujo neto mensual y payback en tres escenarios paralelos:
            pesimista, probable y optimista. Para no enamorarte de la renta del anuncio y tomar
            decisiones de inversión con el rango de mercado real.
          </p>
        </Container>
      </Section>

      <Section tone="paper" padding="md">
        <Container size="xl">
          <RoiForm />
        </Container>
      </Section>

      <Section tone="soft" padding="md" title="Cómo lee un inversor profesional este resultado">
        <Container size="md">
          <div className="prose-psz">
            <p>
              El error más común al evaluar una inversión inmobiliaria es enamorarse de la renta
              del anuncio. La renta optimista que pone el vendedor o el portal inmobiliario es el
              techo, no el suelo. Por eso esta calculadora exige los tres escenarios: te obliga a
              pensar qué pasa si el mercado se ablanda, si tu inquilino pide rebaja, si tienes
              1-2 meses entre contratos.
            </p>

            <h3>Rentabilidad de adquisición vs rentabilidad real</h3>
            <p>
              Las calculadoras de mercado suelen hablar de <em>rentabilidad bruta</em> y{' '}
              <em>rentabilidad neta</em>. A mí no me parece útil — no captan lo importante.
              Esta calculadora introduce dos conceptos que sí miran al inversor real:
            </p>
            <p>
              <strong>Rentabilidad de adquisición</strong> es lo que rinde tu dinero{' '}
              <em>en el momento de comprar</em>, sobre la inversión total incluyendo el ITP. Es
              el número honesto: lo que ganas el primer año, sin maquillar. Si el ITP de tu
              comunidad es alto (10-13%), esta rentabilidad baja de forma significativa frente a
              la "bruta" que verías sin contarlo.
            </p>
            <p>
              <strong>Rentabilidad real</strong> es lo que el activo rinde{' '}
              <em>a largo plazo</em>, una vez asumido que el ITP es un gasto puntual de compra
              no recuperable vía alquiler — un sunk cost que queda amortizado a lo largo de los
              primeros años. A partir de ese punto, lo que rinde el dinero "operativo" (precio +
              gastos de cierre + reformas, sin ITP) es lo que verdaderamente capta el inversor
              que tiene horizonte largo.
            </p>
            <p>
              La diferencia entre ambas la marca el ITP. En Madrid (6% ITP) las dos
              rentabilidades quedan muy cerca; en Cataluña o Cantabria (10-13% ITP) la diferencia
              es notable.
            </p>

            <h3>Amortización del ITP</h3>
            <p>
              Una métrica que no verás en otras calculadoras: cuántos años de flujo neto necesitas
              para "recuperar" lo pagado en ITP. Te da la perspectiva temporal de cuándo deja
              tu inversión de cargar con ese sunk cost. Habitualmente entre 5 y 12 años en
              operaciones razonables.
            </p>

            <h3>Flujo neto mensual</h3>
            <p>
              La pregunta operativa: cada mes, ¿esta operación te pone dinero en el bolsillo o te
              lo saca? Es la métrica que separa una inversión que se gestiona sola de una que te
              exige aportar capital constantemente. No incluye suministros (luz, gas, agua) porque
              se ponen a nombre del inquilino. Lo que sí entra: comunidad, IBI y tasa de residuos.
            </p>

            <h3>Payback total</h3>
            <p>
              Cuántos años necesitas para recuperar toda la inversión (precio + ITP + gastos) solo
              con las rentas. Si te sale superior a 25 años, la operación depende íntegramente de
              la revalorización del activo al vender — lo cual introduce riesgo de ciclo
              inmobiliario.
            </p>
          </div>
        </Container>
      </Section>

      <Section tone="paper" padding="md" title="Qué NO calcula esta herramienta (todavía)">
        <Container size="md">
          <div className="prose-psz">
            <ul>
              <li>
                <strong>Hipoteca</strong> — la versión actual no aplica el efecto palanca. Se
                añadirá en una segunda iteración.
              </li>
              <li>
                <strong>Vacancia entre contratos</strong> — asumimos 12 meses cobrados. En la
                práctica conviene reservar 1-2 meses al año para periodos sin inquilino entre
                contratos, especialmente en zonas con rotación alta.
              </li>
              <li>
                <strong>Mantenimiento y reformas posteriores</strong> — pintura, electrodomésticos,
                fontanería. Reserva un 5-10% de la renta anual para esto.
              </li>
              <li>
                <strong>Impacto fiscal</strong> — el alquiler tributa en IRPF (rendimientos del
                capital inmobiliario) con reducciones aplicables según ley vigente cuando es
                vivienda habitual del inquilino. La fiscalidad ajusta significativamente el
                resultado y se analiza caso por caso.
              </li>
              <li>
                <strong>Revalorización del activo</strong> — si compras barato y la zona sube, el
                capital gain compensa rentabilidades bajas. Pero solo se realiza al vender, no en
                el día a día.
              </li>
            </ul>
          </div>
        </Container>
      </Section>

      {/* AVISO LEGAL */}
      <Section tone="paper" padding="md">
        <Container size="md">
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 text-sm leading-relaxed text-amber-900">
            <p className="font-bold text-amber-950 mb-2">Aviso legal — léelo antes de tomar decisiones de inversión</p>
            <p className="mb-2">
              Esta herramienta es una calculadora orientativa de rentabilidad operativa
              bruta y neta de un activo inmobiliario en arrendamiento. <strong>No constituye
              asesoramiento financiero, fiscal ni de inversión personalizado</strong>, ni
              recomendación de compra o venta de activos.
            </p>
            <p className="mb-2">
              Los resultados son aproximaciones basadas exclusivamente en los datos introducidos
              por el usuario. No se tienen en cuenta: impacto fiscal en IRPF o IS, riesgo de
              morosidad, riesgo de vacancia, mantenimiento ordinario, derramas extraordinarias de
              comunidad, revalorización o depreciación del activo, costes de gestión, ni cualquier
              otro factor que pueda afectar a la rentabilidad real.
            </p>
            <p className="mb-2">
              Los avisos automáticos sobre rangos críticos (rentabilidad bruta, neta, payback,
              ratio de gastos) son orientativos, basados en la práctica habitual del mercado
              inmobiliario español, y no implican recomendación de operar o no operar en una
              inversión concreta.
            </p>
            <p>
              Antes de adoptar una decisión de inversión inmobiliaria, recomendamos consultar con
              un asesor fiscal colegiado y, cuando proceda, con un profesional regulado en
              servicios de inversión.
            </p>
          </div>
        </Container>
      </Section>

      <Section tone="navy" padding="md">
        <Container size="md" className="text-center">
          <h2 className="text-3xl font-bold text-paper mb-4">
            ¿La operación te sale a cuenta? Vamos a buscar una mejor.
          </h2>
          <p className="text-paper/80 text-lg mb-8 max-w-prose mx-auto">
            Tengo red propia de inversores con operaciones no públicas en toda España. Si encajas
            con el perfil, te aviso de las que se ajustan a tu rango de rentabilidad y ubicación.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button href={TELEGRAM_INVESTORS_URL} variant="gold" size="lg" target="_blank" rel="noopener noreferrer">
              Canal Telegram de inversores →
            </Button>
            <Button href="/personal-shopper-inmobiliario-zaragoza" variant="primary" size="lg">
              Ver mi servicio PSI
            </Button>
          </div>
        </Container>
      </Section>
    </main>
  )
}
