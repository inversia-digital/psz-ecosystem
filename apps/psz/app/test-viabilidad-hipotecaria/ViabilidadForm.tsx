'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { calculateViabilidad, type ActionState, type ViabResult, type ViabFactor } from './actions'

const eur = (n: number) =>
  new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n)
const eurDec = (n: number) =>
  new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 2 }).format(n)
const pct = (n: number) => `${n.toFixed(1).replace('.', ',')}%`

export default function ViabilidadForm() {
  const [state, action] = useFormState<ActionState, FormData>(calculateViabilidad, null)

  return (
    <div
      className="grid lg:grid-cols-2 gap-8"
      data-tool="test-viabilidad-hipotecaria"
      data-author="Antonio Palacios Cambero"
      data-author-alias="Toño Palacios"
      data-author-url="https://psz.es/sobre-mi"
      data-bde-id="E242"
      data-owner="Inversia Global Digital, S.L.U."
      data-owner-tax-id="B75281394"
      data-license="© Inversia Global Digital — todos los derechos reservados"
    >
      <form action={action} className="bg-paper-card border border-navy-100 rounded-xl p-6 shadow-soft space-y-4">
        <Input name="ingresos" label="Ingresos netos del hogar" placeholder="3000" suffix="€/mes" help="Suma de nóminas netas o ingresos demostrables" />
        <Input name="otrasCuotas" label="Otras cuotas mensuales" placeholder="0" suffix="€/mes" help="Préstamos, coche, tarjetas… (deja 0 si no tienes)" required={false} />
        <Input name="precio" label="Precio de la vivienda" placeholder="200000" suffix="€" />
        <Input name="ahorro" label="Ahorro disponible" placeholder="50000" suffix="€" help="Para entrada + gastos" />
        <div className="grid grid-cols-2 gap-3">
          <Input name="plazoAnios" label="Plazo deseado" placeholder="30" suffix="años" />
          <Input name="edad" label="Edad" placeholder="35" suffix="años" />
        </div>
        <label className="block">
          <span className="block text-sm font-semibold text-navy-800 mb-1">Tipo de contrato</span>
          <select name="tipoContrato" defaultValue="indefinido"
            className="w-full bg-paper-soft border border-navy-200 rounded-lg px-3 py-2.5 text-base focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400/30">
            <option value="indefinido">Indefinido</option>
            <option value="temporal">Temporal</option>
            <option value="autonomo">Autónomo</option>
          </select>
        </label>
        <Submit />
        <p className="text-xs text-ink-muted leading-relaxed mt-2">
          Orientativo. Estima la cuota con un TIN de referencia del 3% y los gastos en ~12% del precio.
          No es una concesión: la decisión final la toma el banco tras estudiar el expediente.
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
    <button type="submit" disabled={pending}
      className="w-full bg-gold-400 hover:bg-gold-300 disabled:bg-gold-200 text-navy-900 font-bold py-3 px-5 rounded-lg transition-colors">
      {pending ? 'Analizando…' : 'Ver si es viable →'}
    </button>
  )
}

function Input({ name, label, placeholder, suffix, help, required = true }: {
  name: string; label: string; placeholder?: string; suffix?: string; help?: string; required?: boolean
}) {
  return (
    <label className="block">
      <span className="block text-sm font-semibold text-navy-800 mb-1">{label}</span>
      <div className="relative">
        <input name={name} type="text" inputMode="decimal" placeholder={placeholder} required={required}
          className="w-full bg-paper-soft border border-navy-200 rounded-lg px-3 py-2.5 pr-16 text-base focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400/30" />
        {suffix && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-ink-muted pointer-events-none">{suffix}</span>}
      </div>
      {help && <span className="block text-xs text-ink-muted mt-1">{help}</span>}
    </label>
  )
}

function EmptyResult() {
  return (
    <div className="bg-paper-soft border border-dashed border-navy-200 rounded-xl p-8 text-center h-full flex flex-col justify-center min-h-[400px]">
      <p className="text-5xl mb-3">🚦</p>
      <p className="text-navy-800 font-semibold mb-1">Tu veredicto aparecerá aquí</p>
      <p className="text-sm text-ink-muted">Rellena los datos y pulsa el botón. El análisis se hace en el servidor.</p>
    </div>
  )
}

function ErrorBox({ text }: { text: string }) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-xl p-6">
      <p className="text-red-900 font-semibold mb-1">No se pudo analizar</p>
      <p className="text-sm text-red-800">{text}</p>
    </div>
  )
}

const VEREDICTO_UI = {
  viable: { label: 'VIABLE', emoji: '✅', cls: 'bg-emerald-600', sub: 'Tu operación entra dentro de los rangos sanos.' },
  ajustada: { label: 'AJUSTADA', emoji: '🟠', cls: 'bg-amber-500', sub: 'Es posible, pero hay que defenderla bien ante el banco adecuado.' },
  dificil: { label: 'DIFÍCIL', emoji: '🔴', cls: 'bg-red-600', sub: 'Tal cual está, el scoring la rechazaría. Hay que reforzarla.' },
} as const

function Results({ r }: { r: ViabResult }) {
  const v = VEREDICTO_UI[r.veredicto]
  return (
    <div className="space-y-4">
      <div className={`${v.cls} text-white rounded-xl p-6 shadow-card`}>
        <p className="text-xs uppercase tracking-wider text-white/80 mb-1">Veredicto</p>
        <p className="text-3xl font-bold mb-1 select-none" data-protected>{v.emoji} {v.label}</p>
        <p className="text-sm text-white/90">{v.sub}</p>
      </div>

      <div className="bg-navy-900 text-paper rounded-xl p-6 shadow-card">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <Kpi label="Cuota estimada" value={eurDec(r.cuotaEstimada)} />
          <Kpi label="Ratio de esfuerzo" value={pct(r.ratioEsfuerzoPct)} />
          <Kpi label="LTV (financiación)" value={pct(r.ltvPct)} />
          <Kpi label="Edad al vencimiento" value={`${r.edadVencimiento} años`} />
          <Kpi label="Hipoteca necesaria" value={eur(r.hipotecaNecesaria)} />
          <Kpi label="Gastos estimados" value={eur(r.gastosEstimados)} />
        </div>
        <p className="text-xs text-paper/50 mt-3">Cuota estimada con un TIN de referencia del {pct(r.tinReferencia)}.</p>
      </div>

      {r.factores.length > 0 && (
        <div className="space-y-2">
          {r.factores.map((f, i) => <FactorCard key={i} f={f} />)}
        </div>
      )}

      <p className="text-xs text-ink-muted italic leading-relaxed">
        © Inversia Global Digital S.L. — Test propietario. Los umbrales que disparan el veredicto son
        criterios reales de mesa de riesgos, no garantía de concesión. La decisión final la toma el banco.
      </p>
    </div>
  )
}

function Kpi({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-paper/60 uppercase tracking-wider">{label}</p>
      <p className="text-base font-semibold text-paper select-none" data-protected>{value}</p>
    </div>
  )
}

function FactorCard({ f }: { f: ViabFactor }) {
  const styles = {
    info: 'bg-navy-50 border-navy-200 text-navy-900',
    warning: 'bg-amber-50 border-amber-200 text-amber-900',
    danger: 'bg-red-50 border-red-200 text-red-900',
    success: 'bg-emerald-50 border-emerald-200 text-emerald-900',
  }[f.severity]
  const icon = { info: 'ℹ', warning: '⚠', danger: '✕', success: '✓' }[f.severity]
  return (
    <div className={`border rounded-lg p-4 ${styles}`}>
      <div className="flex gap-3">
        <span className="text-lg font-bold shrink-0" aria-hidden>{icon}</span>
        <div>
          <p className="font-semibold text-sm mb-1">{f.title}</p>
          <p className="text-sm leading-relaxed">{f.body}</p>
        </div>
      </div>
    </div>
  )
}
