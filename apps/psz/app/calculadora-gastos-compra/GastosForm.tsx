'use client'

import { useState } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import { calculateGastosCompra, type ActionState, type GastosResult, type GastosWarning } from './actions'
import { ITP_TABLE } from '../calculadora-rentabilidad-inmobiliaria/itpData'

const eur = (n: number) =>
  new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n)

export default function GastosForm() {
  const [state, action] = useFormState<ActionState, FormData>(calculateGastosCompra, null)
  const [financia, setFinancia] = useState(true)

  return (
    <div
      className="grid lg:grid-cols-2 gap-8"
      data-tool="calculadora-gastos-compra"
      data-author="Antonio Palacios Cambero"
      data-author-alias="Toño Palacios"
      data-author-url="https://psz.es/sobre-mi"
      data-bde-id="E242"
      data-owner="Inversia Global Digital, S.L.U."
      data-owner-tax-id="B75281394"
      data-license="© Inversia Global Digital — todos los derechos reservados"
    >
      <form action={action} className="bg-paper-card border border-navy-100 rounded-xl p-6 shadow-soft space-y-4">
        <Input name="precio" label="Precio de compra" placeholder="200000" suffix="€" help="Precio de la vivienda" />

        <label className="block">
          <span className="block text-sm font-semibold text-navy-800 mb-1">Comunidad Autónoma</span>
          <select
            name="ccaa"
            defaultValue=""
            required
            className="w-full bg-paper-soft border border-navy-200 rounded-lg px-3 py-2.5 text-base focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400/30"
          >
            <option value="" disabled>Selecciona tu comunidad…</option>
            {[...ITP_TABLE].sort((a, b) => a.name.localeCompare(b.name)).map((c) => (
              <option key={c.code} value={c.code}>{c.name}</option>
            ))}
          </select>
          <span className="block text-xs text-ink-muted mt-1">El impuesto de compra depende de la comunidad.</span>
        </label>

        <label className="block">
          <span className="block text-sm font-semibold text-navy-800 mb-1">Tipo de vivienda</span>
          <select
            name="tipoVivienda"
            defaultValue="segunda_mano"
            className="w-full bg-paper-soft border border-navy-200 rounded-lg px-3 py-2.5 text-base focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400/30"
          >
            <option value="segunda_mano">Segunda mano (paga ITP)</option>
            <option value="obra_nueva">Obra nueva (paga IVA + AJD)</option>
          </select>
        </label>

        <label className="block">
          <span className="block text-sm font-semibold text-navy-800 mb-1">¿Cómo la pagas?</span>
          <select
            name="financia"
            defaultValue="si"
            onChange={(e) => setFinancia(e.target.value !== 'no')}
            className="w-full bg-paper-soft border border-navy-200 rounded-lg px-3 py-2.5 text-base focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400/30"
          >
            <option value="si">Con hipoteca</option>
            <option value="no">Al contado</option>
          </select>
        </label>

        {financia && (
          <Input
            name="importeHipoteca"
            label="Importe que pides al banco"
            placeholder="160000"
            suffix="€"
            help="Lo que financias. El resto (entrada) sale de tu bolsillo."
            required={false}
          />
        )}

        <Submit />
        <p className="text-xs text-ink-muted leading-relaxed mt-2">
          Cálculo orientativo. Impuestos, notaría y registro dependen del valor de referencia, tramos
          y bonificaciones autonómicas. No constituye asesoramiento fiscal.
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
      {pending ? 'Calculando…' : 'Calcular gastos →'}
    </button>
  )
}

function Input({
  name, label, placeholder, suffix, help, required = true,
}: {
  name: string; label: string; placeholder?: string; suffix?: string; help?: string; required?: boolean
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
          required={required}
          className="w-full bg-paper-soft border border-navy-200 rounded-lg px-3 py-2.5 pr-16 text-base focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400/30"
        />
        {suffix && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-ink-muted pointer-events-none">{suffix}</span>
        )}
      </div>
      {help && <span className="block text-xs text-ink-muted mt-1">{help}</span>}
    </label>
  )
}

function EmptyResult() {
  return (
    <div className="bg-paper-soft border border-dashed border-navy-200 rounded-xl p-8 text-center h-full flex flex-col justify-center min-h-[400px]">
      <p className="text-5xl mb-3">🧾</p>
      <p className="text-navy-800 font-semibold mb-1">El desglose aparecerá aquí</p>
      <p className="text-sm text-ink-muted">
        Rellena los datos y pulsa Calcular. Los cálculos se hacen en el servidor.
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

function Results({ r }: { r: GastosResult }) {
  return (
    <div className="space-y-4">
      <div className="bg-navy-900 text-paper rounded-xl p-6 shadow-card">
        <p className="text-xs uppercase tracking-wider text-gold-300 mb-2">Ahorro necesario para comprar</p>
        <p className="text-4xl font-bold text-paper mb-1 select-none" data-protected>{eur(r.ahorroNecesario)}</p>
        <p className="text-sm text-paper/60 mb-4">
          ≈ {r.ahorroPctSobrePrecio.toFixed(1).replace('.', ',')}% del precio
          {r.inputs.financia ? ' · entrada + gastos' : ' · precio + gastos'}
        </p>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <Kpi label={r.inputs.financia ? 'Entrada (no financiada)' : 'Precio'} value={eur(r.entrada)} />
          <Kpi label="Gastos e impuestos" value={eur(r.totalGastos)} />
        </div>
      </div>

      {/* Desglose */}
      <div className="bg-paper-card border border-navy-100 rounded-xl p-5">
        <p className="text-sm font-semibold text-navy-800 mb-3">Desglose de gastos e impuestos</p>
        <ul className="space-y-2">
          {r.lineas.map((l, i) => (
            <li key={i} className="flex justify-between items-baseline gap-3 border-b border-navy-50 pb-2 last:border-0">
              <span className="text-sm text-navy-700">{l.concepto}</span>
              <span className="text-sm font-semibold text-navy-900 whitespace-nowrap select-none" data-protected>{eur(l.importe)}</span>
            </li>
          ))}
          <li className="flex justify-between items-baseline gap-3 pt-1">
            <span className="text-sm font-bold text-navy-900">Total gastos</span>
            <span className="text-sm font-bold text-navy-900 whitespace-nowrap">{eur(r.totalGastos)}</span>
          </li>
        </ul>
      </div>

      {r.warnings.length > 0 && (
        <div className="space-y-2">
          {r.warnings.map((w, i) => (
            <WarningCard key={i} w={w} />
          ))}
        </div>
      )}

      <p className="text-xs text-ink-muted italic leading-relaxed">
        © Inversia Global Digital S.L. — Calculadora propietaria. Importes orientativos; verifica el
        impuesto con la Hacienda autonómica antes de cerrar la operación.
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

function WarningCard({ w }: { w: GastosWarning }) {
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
