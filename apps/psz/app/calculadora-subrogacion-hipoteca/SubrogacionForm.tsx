'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { calculateSubrogacion, type ActionState, type SubroResult, type SubroWarning } from './actions'

const eur = (n: number) =>
  new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n)
const eurDec = (n: number) =>
  new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 2 }).format(n)

export default function SubrogacionForm() {
  const [state, action] = useFormState<ActionState, FormData>(calculateSubrogacion, null)

  return (
    <div
      className="grid lg:grid-cols-2 gap-8"
      data-tool="calculadora-subrogacion-hipoteca"
      data-author="Antonio Palacios Cambero"
      data-author-alias="Toño Palacios"
      data-author-url="https://psz.es/sobre-mi"
      data-bde-id="E242"
      data-owner="Inversia Global Digital, S.L.U."
      data-owner-tax-id="B75281394"
      data-license="© Inversia Global Digital — todos los derechos reservados"
    >
      <form action={action} className="bg-paper-card border border-navy-100 rounded-xl p-6 shadow-soft space-y-4">
        <Input name="capitalPendiente" label="Capital pendiente" placeholder="150000" suffix="€" help="Lo que te queda por pagar de la hipoteca" />
        <Input name="aniosRestantes" label="Años restantes" placeholder="20" suffix="años" />
        <div className="grid grid-cols-2 gap-3">
          <Input name="tinActual" label="TIN actual" placeholder="3,50" suffix="%" />
          <Input name="tinNuevo" label="TIN nuevo ofertado" placeholder="2,50" suffix="%" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Input name="comisionPct" label="Comisión por cambio" placeholder="0" suffix="%" help="Sobre el capital (mira tu escritura)" required={false} />
          <Input name="costesFijos" label="Tasación + gestoría" placeholder="400" suffix="€" required={false} />
        </div>
        <Submit />
        <p className="text-xs text-ink-muted leading-relaxed mt-2">
          Cálculo orientativo por amortización francesa sobre el capital pendiente. No incluye
          vinculaciones ni bonificaciones; el coste real lo fija la FEIN del banco.
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
      {pending ? 'Calculando…' : '¿Me compensa cambiar? →'}
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
      <p className="text-5xl mb-3">🔄</p>
      <p className="text-navy-800 font-semibold mb-1">El veredicto aparecerá aquí</p>
      <p className="text-sm text-ink-muted">Rellena los datos y pulsa calcular. Los cálculos se hacen en el servidor.</p>
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

function Results({ r }: { r: SubroResult }) {
  const positivo = r.ahorroNeto > 0
  return (
    <div className="space-y-4">
      <div className="bg-navy-900 text-paper rounded-xl p-6 shadow-card">
        <p className="text-xs uppercase tracking-wider text-gold-300 mb-2">Ahorro neto si cambias (vida restante)</p>
        <p className={`text-4xl font-bold mb-1 select-none ${positivo ? 'text-paper' : 'text-red-300'}`} data-protected>
          {positivo ? eur(r.ahorroNeto) : `−${eur(Math.abs(r.ahorroNeto))}`}
        </p>
        <p className="text-sm text-paper/60 mb-4">
          ya descontados los costes del cambio ({eur(r.costeCambio)})
        </p>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <Kpi label="Ahorras al mes" value={r.ahorroCuotaMensual > 0 ? eurDec(r.ahorroCuotaMensual) : '—'} />
          <Kpi label="Punto de equilibrio" value={r.puntoEquilibrioMeses ? `${r.puntoEquilibrioMeses} meses` : '—'} />
          <Kpi label="Cuota actual → nueva" value={`${eur(r.cuotaActual)} → ${eur(r.cuotaNueva)}`} />
          <Kpi label="Ahorro en intereses" value={eur(r.ahorroIntereses)} />
        </div>
      </div>

      {r.warnings.length > 0 && (
        <div className="space-y-2">
          {r.warnings.map((w, i) => <WarningCard key={i} w={w} />)}
        </div>
      )}

      <p className="text-xs text-ink-muted italic leading-relaxed">
        © Inversia Global Digital S.L. — Calculadora propietaria. Estimación orientativa; el ahorro
        real depende de la FEIN, comisiones y vinculaciones de cada banco.
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

function WarningCard({ w }: { w: SubroWarning }) {
  const styles = {
    info: 'bg-navy-50 border-navy-200 text-navy-900',
    warning: 'bg-amber-50 border-amber-200 text-amber-900',
    danger: 'bg-red-50 border-red-200 text-red-900',
    success: 'bg-emerald-50 border-emerald-200 text-emerald-900',
  }[w.severity]
  const icon = { info: 'ℹ', warning: '⚠', danger: '✕', success: '✓' }[w.severity]
  return (
    <div className={`border rounded-lg p-4 ${styles}`}>
      <div className="flex gap-3">
        <span className="text-lg font-bold shrink-0" aria-hidden>{icon}</span>
        <div>
          <p className="font-semibold text-sm mb-1">{w.title}</p>
          <p className="text-sm leading-relaxed">{w.body}</p>
        </div>
      </div>
    </div>
  )
}
