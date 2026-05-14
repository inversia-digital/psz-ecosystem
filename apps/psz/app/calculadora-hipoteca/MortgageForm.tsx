'use client'

/**
 * Form de la calculadora de hipoteca.
 *
 * Este es el ÚNICO código que llega al navegador. La lógica de cálculo
 * y los rangos críticos están en actions.ts (server-only).
 *
 * useFormState orquesta el ciclo:
 *   user submit form → server action calcula → server action devuelve resultado
 *   → useFormState hace re-render del componente con el nuevo state
 *   → renderizamos los resultados o el error
 */

import { useFormState, useFormStatus } from 'react-dom'
import { calculateMortgage, type ActionState, type MortgageWarning } from './actions'

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

export default function MortgageForm() {
  const [state, action] = useFormState<ActionState, FormData>(calculateMortgage, null)

  return (
    <div
      className="grid lg:grid-cols-2 gap-8"
      data-tool="calculadora-hipoteca"
      data-author="Antonio Palacios Cambero"
      data-author-alias="Toño Palacios"
      data-author-url="https://psz.es/sobre-mi"
      data-bde-id="E242"
      data-owner="Inversia Global Digital, S.L.U."
      data-owner-tax-id="B75281394"
      data-license="© Inversia Global Digital — todos los derechos reservados"
    >
      <form action={action} className="bg-paper-card border border-navy-100 rounded-xl p-6 shadow-soft space-y-4">
        <Input
          name="precioInmueble"
          label="Precio del inmueble"
          placeholder="200000"
          suffix="€"
          help="Precio total de compra"
        />
        <Input
          name="importeFinanciar"
          label="Importe a financiar"
          placeholder="160000"
          suffix="€"
          help="Capital que pides al banco"
        />
        <div className="grid grid-cols-2 gap-3">
          <Input
            name="plazoAnios"
            label="Plazo"
            placeholder="25"
            suffix="años"
          />
          <Input
            name="tinPct"
            label="TIN"
            placeholder="3,25"
            suffix="%"
          />
        </div>
        <Input
          name="ingresosNetosMensuales"
          label="Ingresos netos mensuales del hogar"
          placeholder="3500"
          suffix="€/mes"
          help="Suma de nóminas netas o ingresos demostrables"
        />
        <Submit />
        <p className="text-xs text-ink-muted leading-relaxed mt-2">
          Cálculo estimativo orientativo. No constituye oferta vinculante. La cuota real depende
          de comisiones, vinculaciones y FEIN del banco.
        </p>
      </form>

      <div>
        {state === null && <EmptyResult />}
        {state && !state.ok && <ErrorBox text={state.error} />}
        {state && state.ok && <Results r={state.result} />}
      </div>
    </div>
  )
}

function Submit() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-gold-400 hover:bg-gold-300 disabled:bg-gold-200 text-navy-900 font-bold py-3 px-5 rounded-lg transition-colors"
    >
      {pending ? 'Calculando…' : 'Calcular cuota →'}
    </button>
  )
}

function Input({
  name,
  label,
  placeholder,
  suffix,
  help,
}: {
  name: string
  label: string
  placeholder?: string
  suffix?: string
  help?: string
}) {
  return (
    <label className="block">
      <span className="block text-sm font-semibold text-navy-800 mb-1">{label}</span>
      <div className="relative">
        <input
          name={name}
          type="text"
          inputMode="decimal"
          placeholder={placeholder}
          className="w-full bg-paper-soft border border-navy-200 rounded-lg px-3 py-2.5 pr-16 text-base focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400/30"
          required
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
    <div className="bg-paper-soft border border-dashed border-navy-200 rounded-xl p-8 text-center h-full flex flex-col justify-center min-h-[400px]">
      <p className="text-5xl mb-3">📊</p>
      <p className="text-navy-800 font-semibold mb-1">El resultado aparecerá aquí</p>
      <p className="text-sm text-ink-muted">
        Rellena los datos y pulsa Calcular. Los cálculos se hacen en el servidor — la lógica no se
        ejecuta en tu navegador.
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

function Results({ r }: { r: import('./actions').MortgageResult }) {
  return (
    <div className="space-y-4">
      {/* KPIs principales */}
      <div className="bg-navy-900 text-paper rounded-xl p-6 shadow-card">
        <p className="text-xs uppercase tracking-wider text-gold-300 mb-2">Cuota mensual estimada</p>
        <p className="text-4xl font-bold text-paper mb-4 select-none" data-protected>
          {eurDec(r.cuotaMensual)}
        </p>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <Kpi label="Intereses totales" value={eur(r.totalIntereses)} />
          <Kpi label="Coste total hipoteca" value={eur(r.costeTotal)} />
          <Kpi label="LTV" value={pct(r.ltvPct)} />
          <Kpi label="Ratio de esfuerzo" value={pct(r.ratioEsfuerzoPct)} />
        </div>
      </div>

      {/* Warnings */}
      {r.warnings.length > 0 && (
        <div className="space-y-2">
          {r.warnings.map((w, i) => (
            <WarningCard key={i} w={w} />
          ))}
        </div>
      )}

      {r.warnings.length === 0 && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 text-sm text-emerald-900">
          Tu operación entra dentro de los rangos sanos. Lo siguiente es buscar el mejor banco
          para tu perfil — para eso está el broker.
        </div>
      )}

      <p className="text-xs text-ink-muted italic leading-relaxed">
        © Inversia Global Digital S.L. — Calculadora propietaria. Los rangos críticos y las
        interpretaciones que disparan los avisos son trabajo de años de práctica del broker. Uso
        personal autorizado, prohibida reproducción.
      </p>
    </div>
  )
}

function Kpi({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-paper/60 uppercase tracking-wider">{label}</p>
      <p className="text-lg font-semibold text-paper select-none" data-protected>{value}</p>
    </div>
  )
}

function WarningCard({ w }: { w: MortgageWarning }) {
  const styles = {
    info:    'bg-navy-50 border-navy-200 text-navy-900',
    warning: 'bg-amber-50 border-amber-200 text-amber-900',
    danger:  'bg-red-50 border-red-200 text-red-900',
    success: 'bg-emerald-50 border-emerald-200 text-emerald-900',
  }[w.severity]
  const icon = {
    info:    'ℹ',
    warning: '⚠',
    danger:  '✕',
    success: '✓',
  }[w.severity]
  return (
    <div className={`border rounded-lg p-4 ${styles}`}>
      <div className="flex gap-3">
        <span className="text-lg font-bold shrink-0" aria-hidden>
          {icon}
        </span>
        <div>
          <p className="font-semibold text-sm mb-1">{w.title}</p>
          <p className="text-sm leading-relaxed">{w.body}</p>
        </div>
      </div>
    </div>
  )
}
