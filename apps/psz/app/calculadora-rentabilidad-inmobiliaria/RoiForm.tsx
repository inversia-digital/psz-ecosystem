'use client'

/**
 * Form de la calculadora de rentabilidad inmobiliaria.
 *
 * Renderiza 3 columnas de resultados (pesimista/probable/optimista) cuando
 * el server action devuelve éxito. Toda la lógica está en actions.ts (server).
 */

import { useFormState, useFormStatus } from 'react-dom'
import {
  calculateRoi,
  type ActionState,
  type ScenarioResult,
  type RoiWarning,
} from './actions'

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
              placeholder="22000"
              help="Notaría, registro, AJD/ITP, gestoría. ~10-12% del precio"
            />
            <Input
              name="reformas"
              label="Reformas previstas"
              suffix="€"
              placeholder="0"
              help="Opcional"
            />
          </div>
        </fieldset>

        {/* Bloque 2 — Gastos recurrentes */}
        <fieldset>
          <legend className="text-sm font-bold text-navy-800 mb-3 uppercase tracking-wider">
            Gastos recurrentes (no incluyen luz/gas/agua — a nombre del inquilino)
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
        </fieldset>

        {/* Bloque 3 — 3 rentas */}
        <fieldset>
          <legend className="text-sm font-bold text-navy-800 mb-3 uppercase tracking-wider">
            3 escenarios de renta mensual
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
          Cálculo orientativo. No incluye morosidad, vacancia, mantenimiento ni revalorización del
          activo. No incluye impacto fiscal ni hipoteca (próximamente). Solo orienta la rentabilidad
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

function Results({ result }: { result: import('./actions').RoiResult }) {
  return (
    <div className="space-y-6">
      {/* Resumen de inversión */}
      <div className="bg-navy-900 text-paper rounded-xl p-6 shadow-card">
        <p className="text-xs uppercase tracking-wider text-gold-300 mb-2">Inversión total considerada</p>
        <p className="text-3xl font-bold text-paper mb-3 select-none" data-protected>
          {eurDec(result.inputs.inversionTotal)}
        </p>
        <p className="text-sm text-paper/70">
          {eur(result.inputs.precioCompra)} compra
          {result.inputs.gastosCierre > 0 && ` + ${eur(result.inputs.gastosCierre)} cierre`}
          {result.inputs.reformas > 0 && ` + ${eur(result.inputs.reformas)} reformas`}
        </p>
      </div>

      {/* 3 escenarios en columnas */}
      <div className="grid md:grid-cols-3 gap-4">
        {result.escenarios.map((e) => (
          <ScenarioCard key={e.name} e={e} />
        ))}
      </div>

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
        <Row label="Rentabilidad bruta" value={pct(e.rentabilidadBrutaPct)} />
        <Row label="Rentabilidad neta"  value={pct(e.rentabilidadNetaPct)} bold />
        <Row
          label="Flujo neto mensual"
          value={eurDec(e.flujoNetoMensual)}
          valueClass={`font-bold ${flujoColor}`}
          help="Renta − gastos prorrateados (sin luz/gas/agua)"
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
          label="Payback (años)"
          value={e.paybackAnios === Infinity ? '∞' : e.paybackAnios.toFixed(1).replace('.', ',')}
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
