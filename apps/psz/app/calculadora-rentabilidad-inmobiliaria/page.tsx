import type { Metadata } from 'next'
import {
  SITE_URLS,
  TELEGRAM_INVESTORS_URL,
  TONO,
  breadcrumbSchema,
  faqPageSchema,
  howToSchema,
  speakableWebPageSchema,
  webApplicationSchema,
} from '@psz/seo'
import { Button, Container, Faq, JsonLd, Section } from '@psz/ui'
import RoiForm from './RoiForm'

const URL = `${SITE_URLS.psz}/calculadora-rentabilidad-inmobiliaria`

// ─────────────────────────────────────────────────────────────────────────
// METADATA SEO
// Title 50-60 chars, description 150-160 chars, keywords long-tail.
// ─────────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title:
    'Calculadora rentabilidad inmobiliaria 2026 · ITP por CCAA + flujo neto',
  description:
    'Calcula la rentabilidad real y de adquisición de tu inversión inmobiliaria con 3 escenarios, ITP por comunidad autónoma, vacancia opcional, flujo neto mensual, amortización del ITP, payback y comparativa con el bono del estado. PDF descargable. Por Toño Palacios, broker hipotecario nº E242.',
  alternates: { canonical: URL },
  robots: { index: true, follow: true },
  authors: [{ name: TONO.fullName, url: `${SITE_URLS.psz}/sobre-mi` }],
  creator: TONO.fullName,
  publisher: 'Inversia Global Digital, S.L.U.',
  keywords: [
    'calculadora rentabilidad inmobiliaria',
    'calcular rentabilidad alquiler',
    'rentabilidad real vs rentabilidad de adquisición',
    'flujo neto mensual alquiler',
    'cash flow inmobiliario calculadora',
    'ITP comunidad autónoma calculadora',
    'ITP por CCAA tabla',
    'simulador rentabilidad piso',
    'calculadora ROI inmueble',
    'payback inversión inmobiliaria',
    'comparativa bono del estado vs alquiler',
    'amortización ITP años',
    'sensibilidad al precio compra',
    'calculadora vacancia alquiler',
    'rentabilidad bruta vs neta vs real',
  ],
  openGraph: {
    url: URL,
    type: 'website',
    locale: 'es_ES',
    siteName: 'psz.es',
    title:
      'Calculadora rentabilidad inmobiliaria 2026 · ITP por CCAA + flujo neto mensual',
    description:
      'Rentabilidad de adquisición, rentabilidad real, flujo neto mensual y payback en 3 escenarios. Con ITP por comunidad autónoma, comparativa con el bono del estado y PDF descargable.',
  },
  twitter: {
    card: 'summary_large_image',
    title:
      'Calculadora rentabilidad inmobiliaria · ITP por CCAA + flujo neto',
    description:
      '3 escenarios paralelos, ITP por CCAA, vacancia opcional y comparativa con el bono del estado. Por Toño Palacios.',
  },
}

// ─────────────────────────────────────────────────────────────────────────
// FAQ visible (también va a FAQPage schema)
// Preguntas long-tail con respuestas <60 palabras AI-citables.
// ─────────────────────────────────────────────────────────────────────────

const FAQ = [
  {
    question: '¿Qué diferencia hay entre rentabilidad de adquisición y rentabilidad real?',
    answer:
      'La rentabilidad de adquisición se calcula sobre la inversión total que pagas en el momento de comprar, incluyendo el ITP. La rentabilidad real se calcula sobre la inversión "operativa" (precio + cierre + reformas, sin ITP), porque el ITP es un sunk cost que queda amortizado tras los primeros años. La rentabilidad real refleja el rendimiento del activo a largo plazo.',
  },
  {
    question: '¿Por qué hablamos de rentabilidad real en vez de rentabilidad bruta?',
    answer:
      'La rentabilidad bruta (renta anual / precio) es un número de manual sin valor operativo: ignora gastos recurrentes y costes de compra. La rentabilidad real es la que de verdad obtienes a largo plazo. Es el número que diferencia una inversión real de una promesa.',
  },
  {
    question: '¿Qué ITP se paga en cada comunidad autónoma en 2026?',
    answer:
      'El ITP varía del 4% en País Vasco al 13% en tramos altos de Cataluña. Madrid 6%, Andalucía 7%, La Rioja 7%, Canarias 6,5%, Comunidad Valenciana 10% hasta junio 2026 y 9% desde entonces, Cataluña progresivo 10-13%, Baleares 8-13%. Tabla detallada disponible pulsando el "i" del campo ITP en la calculadora.',
  },
  {
    question: '¿Qué es el flujo neto mensual de un alquiler?',
    answer:
      'Es la renta mensual menos los gastos recurrentes prorrateados a mes: comunidad mensual, IBI/12 y tasa de residuos/12. No incluye suministros (luz, gas, agua) porque los paga el inquilino. Si te sale negativo, la operación te saca dinero cada mes.',
  },
  {
    question: '¿Cuál es una buena rentabilidad real para un piso en 2026?',
    answer:
      'Como referencia: por debajo del bono español a 10 años (~3,5%) no compensa el riesgo. Entre 4% y 5,5% es zona aceptable. Por encima del 6% es zona buena. Por encima del 8% es excelente, siempre que la renta sea sostenible. La prima sobre el bono debería ser al menos 2-3 puntos porcentuales.',
  },
  {
    question: '¿Debo restar el IRPF de mi rentabilidad?',
    answer:
      'Para una comparativa rápida, esta calculadora trabaja con rentabilidad antes de IRPF. El IRPF efectivo depende de tu tramo personal y de si el inmueble es vivienda habitual del inquilino (reducción específica vigente). Consulta con tu asesor fiscal para el cálculo post-IRPF en tu caso concreto.',
  },
  {
    question: '¿Por qué la calculadora no incluye hipoteca todavía?',
    answer:
      'La versión actual trabaja con la rentabilidad operativa pura del activo, sin efecto palanca financiero. La hipoteca cambia el cálculo (cash-on-cash, ROE apalancado, amortización mensual) y se añadirá en una segunda iteración. Para calcular tu hipoteca por separado puedes usar nuestra calculadora de hipoteca.',
  },
  {
    question: '¿Cómo aplica la reserva de vacancia?',
    answer:
      'La reserva de vacancia es un porcentaje opcional que reduce la renta anual efectiva, simulando los meses al año sin inquilino entre contratos. Por defecto está desactivada (asume 100% de ocupación). Algunos inversores reservan 5-10% en zonas con rotación habitual. Si tienes inquilinos estables a largo plazo, déjala en 0%.',
  },
  {
    question: '¿Qué es la amortización del ITP en años?',
    answer:
      'Es cuántos años de flujo neto necesitas para recuperar el importe pagado en ITP. Si el ITP fue 18.000 € y tu flujo neto anual es 3.600 €, la amortización del ITP es 5 años. A partir de ese momento, el activo trabaja sobre su capital "operativo" y la rentabilidad real refleja el rendimiento estable.',
  },
  {
    question: '¿Para qué sirve la sensibilidad al precio?',
    answer:
      'Te dice cuánto deberías pagar como máximo por el inmueble para obtener una rentabilidad real objetivo concreta. Útil para no enamorarte de un precio y mantener disciplina en la negociación. Si el precio de venta supera tu precio máximo, la operación no encaja con tu target.',
  },
] as const

// ─────────────────────────────────────────────────────────────────────────
// Bloques educativos en acordeón ("Cómo lee un inversor profesional…")
// Se renderizan con el mismo componente <Faq> que las FAQ — mismo accordion
// nativo <details>/<summary> que usamos en el resto del sitio.
// ─────────────────────────────────────────────────────────────────────────

const COMO_LEE_INVERSOR = [
  {
    question: 'Rentabilidad de adquisición vs rentabilidad real',
    answer:
      'Las calculadoras del mercado suelen hablar de rentabilidad bruta y rentabilidad neta. Estos conceptos no captan lo que de verdad importa para un inversor. Esta herramienta introduce dos métricas más útiles.\n\nRentabilidad de adquisición es lo que rinde tu dinero en el momento de comprar, sobre la inversión total incluyendo el ITP. Es el número honesto: lo que ganas el primer año, sin maquillar. Si el ITP de tu comunidad es alto (10-13%), esta rentabilidad baja de forma significativa frente a la "bruta" tradicional.\n\nRentabilidad real es lo que el activo rinde a largo plazo, una vez asumido que el ITP es un gasto puntual de compra no recuperable vía alquiler — un sunk cost que queda amortizado a lo largo de los primeros años. A partir de ese punto, lo que rinde el dinero "operativo" (precio + gastos de cierre + reformas, sin ITP) es lo que de verdad capta el inversor con horizonte largo.\n\nLa diferencia entre ambas la marca el ITP. En Madrid (6% ITP) las dos rentabilidades quedan muy cerca; en Cataluña o Cantabria (10-13% ITP) la diferencia es notable.',
  },
  {
    question: 'Comparativa con el bono del estado',
    answer:
      'El bono español a 10 años es la inversión libre de riesgo de referencia para un residente español. La calculadora calcula la prima sobre ese bono (en puntos porcentuales). Una operación inmobiliaria razonable debería pagar al menos 2-3 puntos por encima del bono para compensar el riesgo añadido: vacancia, ciclo del mercado, gestión, derramas, mantenimiento. Si la prima es negativa, la operación no compensa.',
  },
  {
    question: 'Amortización del ITP',
    answer:
      'Una métrica que no verás en otras calculadoras: cuántos años de flujo neto necesitas para recuperar lo pagado en ITP. Te da la perspectiva temporal de cuándo deja tu inversión de cargar con ese sunk cost. Habitualmente entre 5 y 12 años en operaciones razonables.',
  },
  {
    question: 'Flujo neto mensual',
    answer:
      'La pregunta operativa: cada mes, ¿esta operación te pone dinero en el bolsillo o te lo saca? Es la métrica que separa una inversión que se gestiona sola de una que te exige aportar capital constantemente. No incluye suministros (luz, gas, agua) porque se ponen a nombre del inquilino. Lo que sí entra: comunidad, IBI y tasa de residuos.',
  },
  {
    question: 'Sensibilidad al precio',
    answer:
      'La calculadora inversa: dado un target de rentabilidad real, ¿qué precio máximo deberías pagar por el inmueble? Útil para no enamorarte de un precio y mantener disciplina en la negociación.',
  },
] as const

// ─────────────────────────────────────────────────────────────────────────
// HowTo (steps de uso) — alimenta el rich snippet de Google
// ─────────────────────────────────────────────────────────────────────────

const HOWTO_STEPS = [
  {
    name: 'Introduce el precio de compra del inmueble',
    text:
      'En el primer campo introduce el precio de compraventa que aparece en la escritura o que has acordado con el vendedor. No incluyas todavía gastos ni impuestos.',
  },
  {
    name: 'Selecciona el ITP de tu comunidad autónoma',
    text:
      'Mueve el slider del ITP entre 4% y 20%. Pulsa la "i" para abrir la tabla completa de ITP por CCAA con los tipos vigentes y los cambios próximos.',
  },
  {
    name: 'Añade los gastos de cierre y reformas',
    text:
      'Gastos de cierre típicos: notaría, registro, AJD y gestoría, aproximadamente 2-3% del precio. Si vas a reformar, incluye el presupuesto cerrado.',
  },
  {
    name: 'Configura los gastos recurrentes',
    text:
      'IBI anual, comunidad mensual y tasa de residuos. Los suministros (luz, gas, agua) no se incluyen porque los paga el inquilino.',
  },
  {
    name: 'Activa la reserva de vacancia si procede',
    text:
      'Opcional. Si tienes inquilinos estables, déjala desactivada. En zonas con rotación, considera 5-10% (equivale a 1-2 meses al año sin inquilino).',
  },
  {
    name: 'Introduce los 3 escenarios de renta mensual',
    text:
      'Pesimista (mercado se ablanda), probable (mediana de la zona) y optimista (todo a tu favor). Tomar decisiones con un rango es más prudente que con un solo número.',
  },
  {
    name: 'Calcula y lee los resultados',
    text:
      'Tras pulsar "Calcular", verás 3 columnas con rentabilidad de adquisición, rentabilidad real, prima sobre bono, flujo neto, amortización del ITP y payback. Los avisos te marcan los rangos críticos detectados.',
  },
  {
    name: 'Ajusta el target en la sensibilidad al precio',
    text:
      'Bajo los 3 escenarios, mueve el slider de rentabilidad real objetivo para ver el precio máximo al que deberías comprar para alcanzarla en cada escenario.',
  },
  {
    name: 'Descarga el PDF con el análisis',
    text:
      'Al final del resultado, descarga el PDF con los 3 escenarios, los avisos y la marca para llevártelo a la negociación o al asesor fiscal.',
  },
]

// ─────────────────────────────────────────────────────────────────────────
// Página
// ─────────────────────────────────────────────────────────────────────────

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
        data={webApplicationSchema({
          url: URL,
          name: 'Calculadora de rentabilidad inmobiliaria',
          description:
            'Calculadora propietaria para inversores: rentabilidad de adquisición, rentabilidad real, flujo neto mensual, amortización del ITP, payback total, comparativa con el bono del estado y sensibilidad al precio máximo. En 3 escenarios paralelos.',
          category: 'FinanceApplication',
          features: [
            'Rentabilidad de adquisición (sobre inversión total con ITP)',
            'Rentabilidad real (sobre inversión operativa sin ITP, largo plazo)',
            '3 escenarios paralelos: pesimista, probable, optimista',
            'ITP por comunidad autónoma con tabla actualizada y cambios próximos',
            'Flujo neto mensual descontando comunidad, IBI y residuos',
            'Amortización del ITP en años de flujo neto',
            'Payback total de la inversión',
            'Comparativa con el bono español a 10 años (prima sobre el activo libre de riesgo)',
            'Reserva de vacancia configurable y opcional',
            'Sensibilidad al precio: precio máximo de compra según target de rentabilidad real',
            'Avisos automáticos sobre rangos críticos del mercado inmobiliario español',
            'Descarga PDF del análisis con marca propia',
          ],
        })}
      />
      <JsonLd data={faqPageSchema([...FAQ])} />
      <JsonLd
        data={howToSchema({
          name: 'Cómo calcular la rentabilidad de una inversión inmobiliaria',
          description:
            'Procedimiento paso a paso para calcular la rentabilidad real, de adquisición y el flujo neto mensual de un inmueble en alquiler con la calculadora propietaria de psz.es.',
          url: URL,
          totalTime: 'PT5M',
          estimatedCost: { currency: 'EUR', value: 0 },
          steps: HOWTO_STEPS,
        })}
      />
      <JsonLd
        data={speakableWebPageSchema({
          url: URL,
          name: 'Calculadora de rentabilidad inmobiliaria',
          description:
            'Rentabilidad de adquisición, rentabilidad real, flujo neto mensual y payback en 3 escenarios paralelos con ITP por CCAA.',
          cssSelectors: ['h1', '.speakable-summary', 'summary'],
        })}
      />

      {/* HERO */}
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
            Herramienta propietaria · 3 escenarios paralelos · ITP por CCAA · PDF descargable
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-paper leading-tight mb-4">
            Calculadora de rentabilidad inmobiliaria
          </h1>
          <p className="speakable-summary text-lg text-paper/80 max-w-3xl">
            Calcula la <strong>rentabilidad de adquisición</strong>, la{' '}
            <strong>rentabilidad real</strong>, el <strong>flujo neto mensual</strong>, la{' '}
            <strong>amortización del ITP</strong> y el <strong>payback</strong> de tu inversión
            inmobiliaria con tres escenarios paralelos. Con tabla de ITP por comunidad autónoma
            actualizada, comparativa con el bono del estado, vacancia opcional y descarga PDF.
          </p>
        </Container>
      </Section>

      <Section tone="paper" padding="md">
        <Container size="xl">
          <RoiForm />
        </Container>
      </Section>

      {/* SECCIÓN EDUCATIVA — accordion para no apabullar al lector */}
      <Section tone="soft" padding="md" title="Cómo lee un inversor profesional este resultado">
        <Container size="md">
          <p className="text-ink-soft leading-relaxed mb-6">
            El error más común al evaluar una inversión inmobiliaria es enamorarse de la renta del
            anuncio. La renta optimista que pone el vendedor o el portal inmobiliario es el techo,
            no el suelo. Por eso esta calculadora exige los tres escenarios: te obliga a pensar qué
            pasa si el mercado se ablanda, si encaja con la mediana de la zona o si todo sale a tu
            favor. Despliega cada bloque para entender cómo se interpreta cada métrica.
          </p>
          <Faq items={[...COMO_LEE_INVERSOR]} />
        </Container>
      </Section>

      {/* FAQ VISIBLE — alimenta también el FAQPage schema */}
      <Section
        tone="paper"
        padding="md"
        title="Preguntas frecuentes sobre rentabilidad inmobiliaria"
      >
        <Container size="md">
          <Faq items={[...FAQ]} />
        </Container>
      </Section>

      <Section tone="soft" padding="md" title="Qué NO calcula esta herramienta (todavía)">
        <Container size="md">
          <div className="prose-psz">
            <ul>
              <li>
                <strong>Hipoteca</strong> — la versión actual no aplica el efecto palanca. Se
                añadirá en una segunda iteración. Mientras tanto, puedes usar nuestra{' '}
                <a href="/calculadora-hipoteca">calculadora de hipoteca</a> por separado.
              </li>
              <li>
                <strong>Vacancia entre contratos</strong> — asumimos 12 meses cobrados salvo que
                actives expresamente la reserva de vacancia. En la práctica conviene reservar
                entre un 5% y un 10% en zonas con rotación alta.
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

      {/* INTERNAL LINKING — refuerza autoridad temática */}
      <Section tone="paper" padding="md" title="También te puede interesar">
        <Container size="lg">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <a
              href="/calculadora-hipoteca"
              className="block bg-paper-card border border-navy-100 rounded-xl p-6 hover:border-gold-400 hover:shadow-card transition-all no-underline"
            >
              <p className="text-xs uppercase tracking-wider text-gold-600 font-semibold mb-2">
                Otra herramienta
              </p>
              <h3 className="text-lg font-semibold text-navy-800 mb-2">
                Calculadora de hipoteca
              </h3>
              <p className="text-sm text-ink-soft">
                Cuota, intereses, LTV y ratio de esfuerzo con avisos sobre rangos críticos de
                scoring bancario.
              </p>
            </a>

            <a
              href="/calculadora-capacidad-endeudamiento"
              className="block bg-paper-card border border-navy-100 rounded-xl p-6 hover:border-gold-400 hover:shadow-card transition-all no-underline"
            >
              <p className="text-xs uppercase tracking-wider text-gold-600 font-semibold mb-2">
                Otra herramienta
              </p>
              <h3 className="text-lg font-semibold text-navy-800 mb-2">
                Capacidad de endeudamiento
              </h3>
              <p className="text-sm text-ink-soft">
                ¿Cuánto te daría el banco? 3 escenarios paralelos según ratio de esfuerzo con
                avisos sobre criterios reales de scoring.
              </p>
            </a>

            <a
              href="/personal-shopper-inmobiliario-zaragoza"
              className="block bg-paper-card border border-navy-100 rounded-xl p-6 hover:border-gold-400 hover:shadow-card transition-all no-underline"
            >
              <p className="text-xs uppercase tracking-wider text-gold-600 font-semibold mb-2">
                Servicio
              </p>
              <h3 className="text-lg font-semibold text-navy-800 mb-2">
                Personal Shopper Inmobiliario
              </h3>
              <p className="text-sm text-ink-soft">
                Localización y negociación de operaciones de inversión no públicas para
                inversores con perfil definido.
              </p>
            </a>

            <a
              href="/sobre-mi"
              className="block bg-paper-card border border-navy-100 rounded-xl p-6 hover:border-gold-400 hover:shadow-card transition-all no-underline"
            >
              <p className="text-xs uppercase tracking-wider text-gold-600 font-semibold mb-2">
                Quién lo hace
              </p>
              <h3 className="text-lg font-semibold text-navy-800 mb-2">
                {TONO.shortName}
              </h3>
              <p className="text-sm text-ink-soft">
                Broker hipotecario nº E242 (Banco de España), presidente de ANICI y fundador del
                instituto INARPA.
              </p>
            </a>
          </div>
        </Container>
      </Section>

      {/* AUTORÍA — refuerza E-E-A-T sin repetir credenciales (ya están en el resto de la página) */}
      <Section tone="soft" padding="md">
        <Container size="md">
          <div className="bg-paper-card border border-navy-100 rounded-xl p-6 md:p-8">
            <p className="text-xs uppercase tracking-wider text-gold-600 font-semibold mb-3">
              Quién hay detrás de esta herramienta
            </p>
            <h2 className="text-2xl font-bold text-navy-800 mb-3">
              Diseñada por {TONO.shortName}
            </h2>
            <p className="text-ink-soft leading-relaxed mb-3">
              Esta calculadora la he diseñado yo, no una empresa de software inmobiliario genérica.
              La diferencia está en el criterio: años operando como broker hipotecario y como
              Personal Shopper Inmobiliario me han enseñado qué números necesita ver un inversor
              para decidir bien y cuáles son ruido que distrae.
            </p>
            <p className="text-ink-soft leading-relaxed mb-3">
              Por eso entras a tres escenarios paralelos en vez de a uno solo. Por eso separamos
              <strong> rentabilidad de adquisición</strong> y <strong>rentabilidad real</strong>.
              Por eso calculamos la <strong>amortización del ITP</strong>, la <strong>prima sobre
              el bono del estado</strong> y la <strong>sensibilidad al precio</strong>. Y por eso
              NO ves un IRPF estimado: depende de tu tramo personal y mezclarlo con los demás
              números genera más confusión que claridad.
            </p>
            <p className="text-ink-soft leading-relaxed">
              La fórmula matemática es pública. La opinión sobre qué datos enseñar y cuáles dejar
              fuera, no. Si quieres usar ese criterio en una operación real, trabajemos juntos —{' '}
              <a href="/broker-hipotecario" className="text-navy-700 hover:text-navy-900 underline">
                como broker hipotecario
              </a>{' '}
              o{' '}
              <a
                href="/personal-shopper-inmobiliario-zaragoza"
                className="text-navy-700 hover:text-navy-900 underline"
              >
                como Personal Shopper Inmobiliario
              </a>
              .
            </p>
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
              morosidad, riesgo de vacancia salvo configurada expresamente, mantenimiento
              ordinario, derramas extraordinarias de comunidad, revalorización o depreciación
              del activo, costes de gestión, ni cualquier otro factor que pueda afectar a la
              rentabilidad real.
            </p>
            <p className="mb-2">
              Los avisos automáticos sobre rangos críticos (rentabilidad real, rentabilidad de
              adquisición, payback, ratio de gastos, prima sobre bono) son orientativos, basados
              en la práctica habitual del mercado inmobiliario español, y no implican recomendación
              de operar o no operar en una inversión concreta.
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
