'use client'

/**
 * Form de la calculadora de rentabilidad inmobiliaria.
 *
 * Renderiza 3 columnas de resultados (pesimista/probable/optimista) cuando
 * el server action devuelve éxito. Toda la lógica está en actions.ts (server).
 */

import { useState } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import {
  calculateRoi,
  type ActionState,
  type ScenarioResult,
  type RoiWarning,
} from './actions'
import ItpInfoButton from './ItpInfoButton'
import InfoTooltip from './InfoTooltip'

const eur = (n: number) =>
  new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(n)

const eurDec = (n: number) =>
  new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 2,
  }).format(n)

const pct = (n: number) => `${n.toFixed(2).replace('.', ',')}%`

const ESCENARIO_META = {
  pesimista: { label: 'Pesimista', color: 'bg-red-50 border-red-200 text-red-900', kpiClass: 'text-red-900' },
  probable:  { label: 'Probable',  color: 'bg-amber-50 border-amber-200 text-amber-900', kpiClass: 'text-amber-900' },
  optimista: { label: 'Optimista', color: 'bg-emerald-50 border-emerald-200 text-emerald-900', kpiClass: 'text-emerald-900' },
}

export default function RoiForm() {
  const [state, action] = useFormState<ActionState, FormData>(calculateRoi, null)
  const [itpPct, setItpPct] = useState(10)
  const [vacanciaOn, setVacanciaOn] = useState(false)
  const [vacanciaPct, setVacanciaPct] = useState(5)

  return (
    <div className="space-y-8">
      <form action={action} className="bg-paper-card border border-navy-100 rounded-xl p-6 shadow-soft space-y-6">
        {/* Bloque 1 — Inversión */}
        <fieldset>
          <legend className="text-sm font-bold text-navy-800 mb-3 uppercase tracking-wider">
            Inversión total
          </legend>
          <div className="grid md:grid-cols-3 gap-4">
            <Input name="precioCompra" label="Precio de compra" suffix="€" placeholder="180000" required />
            <Input
              name="gastosCierre"
              label="Gastos de cierre"
              suffix="€"
              placeholder="3500"
              help="Notaría, registro, AJD, gestoría. ~2-3% del precio"
            />
            <Input
              name="reformas"
              label="Reformas previstas"
              suffix="€"
              placeholder="0"
              help="Opcional"
            />
          </div>

          {/* Slider ITP con info tooltip */}
          <div className="mt-4 bg-paper-soft border border-navy-100 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <label htmlFor="itpPct" className="text-sm font-semibold text-navy-800">
                ITP (Impuesto sobre Transmisiones Patrimoniales)
              </label>
              <ItpInfoButton />
            </div>
            <div className="flex items-center gap-4">
              <input
                id="itpPct"
                name="itpPct"
                type="range"
                min="4"
                max="20"
                step="0.5"
                value={itpPct}
                onChange={(e) => setItpPct(Number(e.target.value))}
                className="flex-1 accent-gold-500"
              />
              <output
                htmlFor="itpPct"
                className="font-bold text-navy-800 tabular-nums w-16 text-right"
              >
                {itpPct.toString().replace('.', ',')}%
              </output>
            </div>
            <p className="text-xs text-ink-muted mt-2">
              <span className="text-gold-600">*</span> El ITP varía del 4% al 20% según comunidad
              autónoma, tramo, bonificaciones y tipo de inmueble. Pulsa la{' '}
              <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-navy-100 text-navy-700 text-[10px] font-bold align-middle">i</span>{' '}
              para ver la tabla por CCAA actualizada.
            </p>
          </div>
        </fieldset>

        {/* Bloque 2 — Gastos recurrentes */}
        <fieldset>
          <legend className="text-sm font-bold text-navy-800 mb-3 uppercase tracking-wider">
            Gastos recurrentes
          </legend>
          <div className="grid md:grid-cols-3 gap-4">
            <Input
              name="ibiAnual"
              label="IBI anual"
              suffix="€/año"
              placeholder="280"
              help="Se prorratea mensualmente"
            />
            <Input
              name="comunidadMensual"
              label="Comunidad mensual"
              suffix="€/mes"
              placeholder="45"
            />
            <Input
              name="residuosAnual"
              label="Tasa de residuos"
              suffix="€/año"
              placeholder="80"
              help="Opcional, se prorratea"
            />
          </div>
          <p className="text-xs text-ink-muted italic mt-2">
            <span className="text-gold-600">*</span> Los suministros (luz, gas, agua) los paga el inquilino y no entran en este cálculo.
          </p>

          {/* Reserva de vacancia OPCIONAL (opt-in) */}
          <div className="mt-4">
            <button
              type="button"
              onClick={() => setVacanciaOn((p) => !p)}
              className="inline-flex items-center gap-2 text-sm font-semibold text-navy-700 hover:text-navy-900"
              aria-expanded={vacanciaOn}
            >
              <span
                className={`inline-flex items-center justify-center w-5 h-5 rounded-full border transition-colors ${
                  vacanciaOn
                    ? 'bg-gold-400 border-gold-400 text-navy-900'
                    : 'bg-paper-soft border-navy-200 text-ink-muted'
                }`}
              >
                {vacanciaOn ? '✓' : '+'}
              </span>
              <span>Considerar reserva de vacancia entre contratos (opcional)</span>
              <InfoTooltip title="¿Qué es la reserva de vacancia?">
                La vacancia es el porcentaje de meses al año en que el piso no genera renta entre
                contratos. Si tienes inquilinos estables a largo plazo, puede ser 0%. En zonas con
                rotación habitual los inversores prudentes reservan entre un 5% y un 10%. Te lo
                dejo configurable porque tus circunstancias mandan: si tus pisos están al 100% de
                ocupación, déjalo desactivado.
              </InfoTooltip>
            </button>

            {vacanciaOn && (
              <div className="mt-3 bg-paper-soft border border-navy-100 rounded-lg p-4">
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    name="vacanciaPct"
                    min="0"
                    max="15"
                    step="0.5"
                    value={vacanciaPct}
                    onChange={(e) => setVacanciaPct(Number(e.target.value))}
                    className="flex-1 accent-gold-500"
                  />
                  <output className="font-bold text-navy-800 tabular-nums w-16 text-right">
                    {vacanciaPct.toString().replace('.', ',')}%
                  </output>
                </div>
                <p className="text-xs text-ink-muted mt-2">
                  Equivale a aproximadamente{' '}
                  <strong className="text-navy-800">
                    {((vacanciaPct / 100) * 12).toFixed(1).replace('.', ',')} meses al año
                  </strong>{' '}
                  sin cobrar renta.
                </p>
              </div>
            )}
            {!vacanciaOn && (
              <input type="hidden" name="vacanciaPct" value="0" />
            )}
          </div>
        </fieldset>

        {/* Bloque 3 — 3 rentas */}
        <fieldset>
          <legend className="text-sm font-bold text-navy-800 mb-3 uppercase tracking-wider flex items-center gap-2">
            3 escenarios de renta mensual
            <InfoTooltip title="¿Por qué tres escenarios?">
              Calcular con una sola renta es engañarte. El mercado del alquiler oscila — y la
              renta que pone el vendedor o el portal inmobiliario suele ser la optimista. Esta
              calculadora te obliga a pensar qué pasa si el mercado se ablanda (pesimista), si
              encaja con la media de la zona (probable) o si todo sale a tu favor (optimista).
              Toma decisiones con el rango, no con un único número.
            </InfoTooltip>
          </legend>
          <div className="grid md:grid-cols-3 gap-4">
            <Input
              name="rentaPesimista"
              label="Renta pesimista"
              suffix="€/mes"
              placeholder="650"
              help="Lo bajo del rango de mercado"
              required
            />
            <Input
              name="rentaProbable"
              label="Renta probable"
              suffix="€/mes"
              placeholder="750"
              help="Mediana de la zona"
              required
            />
            <Input
              name="rentaOptimista"
              label="Renta optimista"
              suffix="€/mes"
              placeholder="850"
              help="Si todo encaja"
              required
            />
          </div>
        </fieldset>

        <Submit />

        <p className="text-xs text-ink-muted leading-relaxed">
          Cálculo orientativo. No incluye vacancia, mantenimiento ni revalorización del activo.
          No incluye impacto fiscal ni hipoteca (próximamente). Solo orienta la rentabilidad
          operativa pura.
        </p>
      </form>

      {state === null && <EmptyResult />}
      {state && !state.ok && <ErrorBox text={state.error} />}
      {state && state.ok && <Results result={state.result} />}
    </div>
  )
}

function Submit() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full md:w-auto bg-gold-400 hover:bg-gold-300 disabled:bg-gold-200 text-navy-900 font-bold py-3 px-8 rounded-lg transition-colors"
    >
      {pending ? 'Calculando…' : 'Calcular rentabilidad →'}
    </button>
  )
}

function Input({
  name,
  label,
  suffix,
  placeholder,
  help,
  required,
}: {
  name: string
  label: string
  suffix?: string
  placeholder?: string
  help?: string
  required?: boolean
}) {
  return (
    <label className="block">
      <span className="block text-sm font-semibold text-navy-800 mb-1">
        {label}
        {required && <span className="text-red-600 ml-0.5" aria-label="requerido">*</span>}
      </span>
      <div className="relative">
        <input
          name={name}
          type="text"
          inputMode="decimal"
          placeholder={placeholder}
          required={required}
          className="w-full bg-paper-soft border border-navy-200 rounded-lg px-3 py-2.5 pr-20 text-base focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400/30"
        />
        {suffix && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-ink-muted pointer-events-none">
            {suffix}
          </span>
        )}
      </div>
      {help && <span className="block text-xs text-ink-muted mt-1">{help}</span>}
    </label>
  )
}

function EmptyResult() {
  return (
    <div className="bg-paper-soft border border-dashed border-navy-200 rounded-xl p-10 text-center">
      <p className="text-5xl mb-3">🏠</p>
      <p className="text-navy-800 font-semibold mb-1">Los 3 escenarios aparecerán aquí</p>
      <p className="text-sm text-ink-muted max-w-md mx-auto">
        Rellena los datos y pulsa Calcular. Los cálculos se hacen en el servidor — la lógica de
        rangos críticos no se ejecuta en tu navegador.
      </p>
    </div>
  )
}

function ErrorBox({ text }: { text: string }) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-xl p-6">
      <p className="text-red-900 font-semibold mb-1">No se pudo calcular</p>
      <p className="text-sm text-red-800">{text}</p>
    </div>
  )
}

function DownloadPdfButton({ result }: { result: import('./actions').RoiResult }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleDownload() {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/pdf/rentabilidad', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ result }),
      })
      if (!res.ok) {
        throw new Error(`Servidor devolvió ${res.status}`)
      }
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      const today = new Date().toISOString().slice(0, 10)
      a.download = `analisis-rentabilidad-psz-${today}.pdf`
      document.body.appendChild(a)
      a.click()
      a.remove()
      URL.revokeObjectURL(url)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error desconocido')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3 bg-navy-900 text-paper rounded-xl p-4">
      <div className="flex-1">
        <p className="font-bold text-paper">Descargar este análisis en PDF</p>
        <p className="text-sm text-paper/70">
          Incluye los 3 escenarios, los avisos y tu marca de referencia. Útil para llevártelo a la
          negociación, al asesor fiscal o a tu socio.
        </p>
      </div>
      <button
        type="button"
        onClick={handleDownload}
        disabled={loading}
        className="bg-gold-400 hover:bg-gold-300 disabled:bg-gold-200 text-navy-900 font-bold px-5 py-2.5 rounded-lg text-sm whitespace-nowrap"
      >
        {loading ? 'Generando…' : 'Descargar PDF →'}
      </button>
      {error && (
        <p className="text-xs text-red-200 sm:ml-3">No se pudo generar: {error}</p>
      )}
    </div>
  )
}

function Results({ result }: { result: import('./actions').RoiResult }) {
  return (
    <div className="space-y-6">
      {/* Resumen de inversión */}
      <div className="bg-navy-900 text-paper rounded-xl p-6 shadow-card">
        <p className="text-xs uppercase tracking-wider text-gold-300 mb-2">
          Inversión total de adquisición (precio + ITP + cierre + reformas)
        </p>
        <p className="text-3xl font-bold text-paper mb-3 select-none" data-protected>
          {eurDec(result.inputs.inversionTotalAdquisicion)}
        </p>
        <div className="text-sm text-paper/75 space-y-1">
          <p>
            {eur(result.inputs.precioCompra)} precio
            {' + '}
            {eur(result.inputs.itpImporte)} ITP ({result.inputs.itpPct.toString().replace('.', ',')}%)
            {result.inputs.gastosCierre > 0 && ` + ${eur(result.inputs.gastosCierre)} cierre`}
            {result.inputs.reformas > 0 && ` + ${eur(result.inputs.reformas)} reformas`}
          </p>
          <p className="text-paper/55 text-xs pt-1">
            Inversión operativa (sin ITP, base de la rentabilidad real):{' '}
            <span className="text-paper/90 font-semibold">
              {eur(result.inputs.inversionOperativa)}
            </span>
          </p>
          <p className="text-paper/55 text-xs pt-2 border-t border-paper/10 mt-3">
            Benchmark de referencia:{' '}
            <span className="text-paper/90 font-semibold">
              bono español 10y al {result.benchmark.bono10yPct.toFixed(2).replace('.', ',')}%
            </span>{' '}
            ({result.benchmark.bono10yAsOf}). Tu rentabilidad real debe estar claramente por
            encima para compensar el riesgo del ladrillo.
          </p>
          {result.inputs.vacanciaPct > 0 && (
            <p className="text-paper/55 text-xs pt-2">
              Vacancia aplicada:{' '}
              <span className="text-paper/90 font-semibold">
                {result.inputs.vacanciaPct.toString().replace('.', ',')}%
              </span>{' '}
              (~{((result.inputs.vacanciaPct / 100) * 12).toFixed(1).replace('.', ',')} meses/año
              sin renta)
            </p>
          )}
        </div>
      </div>

      {/* 3 escenarios en columnas */}
      <div className="grid md:grid-cols-3 gap-4">
        {result.escenarios.map((e) => (
          <ScenarioCard key={e.name} e={e} />
        ))}
      </div>

      {/* Sensibilidad al precio — calculadora inversa */}
      <SensibilidadPrecio result={result} />

      {/* Descarga PDF con marca propia */}
      <DownloadPdfButton result={result} />

      <p className="text-xs text-ink-muted italic leading-relaxed">
        © Inversia Global Digital S.L. — Los rangos críticos, las interpretaciones de mercado y los
        avisos que dispara esta herramienta son trabajo propietario. Uso personal autorizado,
        prohibida reproducción.
      </p>
    </div>
  )
}

function ScenarioCard({ e }: { e: ScenarioResult }) {
  const meta = ESCENARIO_META[e.name]
  const flujoColor =
    e.flujoNetoMensual < 0 ? 'text-red-700' : e.flujoNetoMensual > 200 ? 'text-emerald-700' : 'text-navy-800'

  return (
    <div className={`border rounded-xl p-5 ${meta.color}`}>
      <p className="text-xs uppercase tracking-wider font-bold mb-3">Escenario {meta.label}</p>
      <p className={`text-2xl font-bold ${meta.kpiClass} mb-1 select-none`} data-protected>
        {eurDec(e.rentaMensual)}<span className="text-sm font-normal opacity-70">/mes</span>
      </p>

      <hr className="my-4 border-current/15" />

      <dl className="space-y-2 text-sm">
        <Row
          label="Rentabilidad de adquisición"
          value={pct(e.rentabilidadAdquisicionPct)}
          help="Sobre la inversión total incluyendo ITP"
        />
        <Row
          label="Rentabilidad real"
          value={pct(e.rentabilidadRealPct)}
          bold
          help="A largo plazo, una vez el ITP queda amortizado"
        />
        <Row
          label="Prima sobre bono 10y"
          value={
            e.primaSobreBonoPp >= 0
              ? `+${e.primaSobreBonoPp.toFixed(2).replace('.', ',')}pp`
              : `${e.primaSobreBonoPp.toFixed(2).replace('.', ',')}pp`
          }
          valueClass={
            e.primaSobreBonoPp < 0
              ? 'font-bold text-red-700'
              : e.primaSobreBonoPp >= 3
                ? 'font-bold text-emerald-700'
                : 'font-semibold'
          }
          help="Rentabilidad real menos el bono español a 10 años"
        />
        <Row
          label="Flujo neto mensual"
          value={eurDec(e.flujoNetoMensual)}
          valueClass={`font-bold ${flujoColor}`}
          help="Renta menos gastos prorrateados (sin suministros)"
        />
        <Row
          label="Flujo neto anual"
          value={eur(e.flujoNetoAnual)}
        />
        <Row
          label="Gastos mensuales"
          value={eurDec(e.gastosMensualesProrrateados)}
          help="IBI/12 + comunidad + residuos/12"
        />
        <Row
          label="Amortización del ITP"
          value={
            e.amortizacionItpAnios === 0
              ? '—'
              : `${e.amortizacionItpAnios.toFixed(1).replace('.', ',')} años`
          }
          help="Años de flujo neto necesarios para recuperar el ITP"
        />
        <Row
          label="Payback total (años)"
          value={e.paybackAnios === Infinity ? '∞' : e.paybackAnios.toFixed(1).replace('.', ',')}
          help="Incluye precio + ITP + gastos"
        />
      </dl>

      {e.warnings.length > 0 && (
        <div className="mt-4 space-y-2">
          {e.warnings.map((w, i) => (
            <Warning key={i} w={w} />
          ))}
        </div>
      )}
    </div>
  )
}

function Row({
  label,
  value,
  bold,
  valueClass,
  help,
}: {
  label: string
  value: string
  bold?: boolean
  valueClass?: string
  help?: string
}) {
  return (
    <div className="flex justify-between gap-2 text-current">
      <div>
        <dt className="opacity-80">{label}</dt>
        {help && <dd className="text-xs opacity-60 italic">{help}</dd>}
      </div>
      <dd
        className={`select-none ${valueClass ?? (bold ? 'font-bold' : 'font-semibold')}`}
        data-protected
      >
        {value}
      </dd>
    </div>
  )
}

/**
 * Calculadora inversa: dado un target de rentabilidad real, calcula el
 * precio máximo de compra. El cálculo es client-side porque la fórmula
 * es aritmética inversa simple, sin rangos críticos propietarios.
 */
function SensibilidadPrecio({ result }: { result: import('./actions').RoiResult }) {
  const [targetPct, setTargetPct] = useState(6)

  // Gastos anuales fijos (independientes del precio)
  const gastosAnuales =
    result.inputs.comunidadMensual * 12 +
    result.inputs.ibiAnual +
    result.inputs.residuosAnual

  // Factor ocupación si hay vacancia
  const factorOcupacion = Math.max(0, 1 - (result.inputs.vacanciaPct ?? 0) / 100)

  // Para cada escenario, calcular el precio máximo de compra para sacar
  // target% de rentabilidad real (sobre inversión operativa = precio + cierre + reformas).
  // target/100 = (rentaAnualEfectiva - gastosAnuales) / (precio + cierre + reformas)
  // → precio = (rentaAnualEfectiva - gastosAnuales) / (target/100) - cierre - reformas
  const calcularPrecioMaximo = (rentaMensual: number): number => {
    if (targetPct <= 0) return 0
    const rentaAnualEfectiva = rentaMensual * 12 * factorOcupacion
    const flujoNetoAnual = rentaAnualEfectiva - gastosAnuales
    if (flujoNetoAnual <= 0) return 0
    const inversionOperativaMax = flujoNetoAnual / (targetPct / 100)
    const precioMax = inversionOperativaMax - result.inputs.gastosCierre - result.inputs.reformas
    return Math.max(0, precioMax)
  }

  const eur = (n: number) =>
    new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
    }).format(n)

  return (
    <div className="bg-paper-card border border-navy-100 rounded-xl p-6 shadow-soft">
      <div className="flex items-center gap-2 mb-2">
        <h3 className="text-lg font-bold text-navy-800">
          Sensibilidad al precio · ¿A qué precio máximo deberías comprar?
        </h3>
        <InfoTooltip title="Calculadora inversa">
          A veces lo que necesitas no es saber qué rinde un precio, sino qué precio aceptar para
          rendir lo que quieres. Esta calculadora invierte el cálculo: tú fijas la rentabilidad
          real objetivo, ella te devuelve el precio máximo de compra en cada escenario. Úsalo
          para no enamorarte de un precio y mantener disciplina en la negociación.
        </InfoTooltip>
      </div>
      <p className="text-sm text-ink-soft mb-4 leading-relaxed">
        Fija tu rentabilidad real objetivo a largo plazo y mira cuál es el precio máximo de compra
        que te permite alcanzarla en cada escenario de renta.
      </p>

      <div className="bg-paper-soft border border-navy-100 rounded-lg p-4 mb-5">
        <div className="flex items-center justify-between mb-2">
          <label htmlFor="targetPct" className="text-sm font-semibold text-navy-800">
            Rentabilidad real objetivo
          </label>
          <output htmlFor="targetPct" className="font-bold text-navy-800 tabular-nums">
            {targetPct.toString().replace('.', ',')}%
          </output>
        </div>
        <input
          id="targetPct"
          type="range"
          min="3"
          max="12"
          step="0.5"
          value={targetPct}
          onChange={(e) => setTargetPct(Number(e.target.value))}
          className="w-full accent-gold-500"
        />
      </div>

      <div className="grid md:grid-cols-3 gap-3">
        {result.escenarios.map((e) => {
          const precioMax = calcularPrecioMaximo(e.rentaMensual)
          const meta = ESCENARIO_META[e.name]
          const diff = precioMax - result.inputs.precioCompra
          const isBetter = precioMax >= result.inputs.precioCompra
          return (
            <div key={e.name} className={`border rounded-lg p-4 ${meta.color}`}>
              <p className="text-xs uppercase tracking-wider font-bold mb-1">
                Escenario {meta.label}
              </p>
              <p className="text-xs opacity-80 mb-2">
                Renta {new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(e.rentaMensual)}/mes
              </p>
              <p className="text-xs opacity-80 mb-1">Precio máximo de compra</p>
              <p className={`text-xl font-bold ${meta.kpiClass} mb-1 select-none`} data-protected>
                {precioMax > 0 ? eur(precioMax) : 'No alcanzable'}
              </p>
              {precioMax > 0 && (
                <p className="text-xs opacity-75">
                  {isBetter ? '+' : ''}
                  {eur(diff)} vs tu precio actual
                </p>
              )}
            </div>
          )
        })}
      </div>

      <p className="text-xs text-ink-muted italic mt-4">
        Cálculo inverso a partir de tus gastos recurrentes, ITP y vacancia configurados. Cambia
        el target con el slider para ver cómo se mueve el precio máximo.
      </p>
    </div>
  )
}

function Warning({ w }: { w: RoiWarning }) {
  const styles = {
    info: 'bg-white/60 border-current/20',
    warning: 'bg-white/70 border-amber-400/40',
    danger: 'bg-white/70 border-red-400/40',
    success: 'bg-white/70 border-emerald-400/40',
  }[w.severity]
  const icon = { info: 'ℹ', warning: '⚠', danger: '✕', success: '✓' }[w.severity]
  return (
    <div className={`text-xs border rounded-md p-2.5 ${styles}`}>
      <p className="font-semibold mb-0.5 flex items-center gap-1.5">
        <span aria-hidden>{icon}</span>
        {w.title}
      </p>
      <p className="leading-snug opacity-90">{w.body}</p>
    </div>
  )
}
