'use client'

/**
 * Form del comparador hipoteca fija/variable/mixta.
 *
 * El usuario introduce el mismo importe + plazo + las tres modalidades
 * (TIN fija, Euríbor+diferencial variable, tramo fijo+TIN+diferencial
 * mixta). El server action simula año a año los 3 escenarios de
 * evolución del Euríbor (estable, +1pp, +2pp) y devuelve los resultados.
 */

import { useState } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import {
  calculateComparador,
  type ActionState,
  type ComparadorScenario,
  type ComparadorWarning,
  type Modalidad,
} from './actions'

const eur = (n: number) =>
  new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(n)

const pct = (n: number) => `${n.toFixed(2).replace('.', ',')}%`

const MODALIDAD_META: Record<Modalidad, { label: string; color: string; iconColor: string }> = {
  fija: {
    label: 'Fija',
    color: 'bg-emerald-50 border-emerald-200',
    iconColor: 'text-emerald-700',
  },
  variable: {
    label: 'Variable',
    color: 'bg-amber-50 border-amber-200',
    iconColor: 'text-amber-700',
  },
  mixta: {
    label: 'Mixta',
    color: 'bg-sky-50 border-sky-200',
    iconColor: 'text-sky-700',
  },
}

const SEVERITY_STYLE: Record<ComparadorWarning['severity'], { bg: string; border: string; text: string; label: string }> = {
  red: { bg: 'bg-red-50', border: 'border-red-300', text: 'text-red-900', label: 'Aviso crítico' },
  amber: { bg: 'bg-amber-50', border: 'border-amber-300', text: 'text-amber-900', label: 'Atención' },
  green: { bg: 'bg-emerald-50', border: 'border-emerald-300', text: 'text-emerald-900', label: 'Favorable' },
}

export default function ComparadorForm() {
  const [state, action] = useFormState<ActionState, FormData>(calculateComparador, null)
  const [activeScenario, setActiveScenario] = useState<'estable' | 'sube_1pp' | 'sube_2pp'>('sube_1pp')

  return (
    <div
      className="space-y-8"
      data-tool="comparador-hipoteca-fija-variable-mixta"
      data-author="Antonio Palacios Cambero"
      data-author-alias="Toño Palacios"
      data-author-url="https://psz.es/sobre-mi"
      data-bde-id="E242"
      data-owner="Inversia Global Digital, S.L.U."
      data-owner-tax-id="B75281394"
      data-license="© Inversia Global Digital — todos los derechos reservados"
    >
      <form action={action} className="bg-paper-card border border-navy-100 rounded-xl p-6 shadow-soft space-y-6">
        <fieldset className="space-y-3">
          <legend className="text-sm font-bold text-navy-800 uppercase tracking-wider mb-2">
            Datos comunes a las 3 modalidades
          </legend>
          <div className="grid sm:grid-cols-2 gap-3">
            <Input name="importe" label="Importe a financiar" placeholder="200000" suffix="€" />
            <Input name="plazoAnios" label="Plazo total" placeholder="25" suffix="años" />
          </div>
        </fieldset>

        <div className="grid md:grid-cols-3 gap-4">
          <fieldset className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 space-y-3">
            <legend className="text-sm font-bold text-emerald-900 uppercase tracking-wider mb-1">
              A · Fija
            </legend>
            <Input name="fijaTinPct" label="TIN fija" placeholder="3,2" suffix="%" />
            <p className="text-xs text-emerald-900/70">
              TIN constante durante toda la vida del préstamo.
            </p>
          </fieldset>

          <fieldset className="bg-amber-50 border border-amber-200 rounded-lg p-4 space-y-3">
            <legend className="text-sm font-bold text-amber-900 uppercase tracking-wider mb-1">
              B · Variable
            </legend>
            <Input name="variableEuriborPct" label="Euríbor actual" placeholder="2,8" suffix="%" />
            <Input name="variableDiferencialPct" label="Diferencial" placeholder="0,85" suffix="%" />
            <p className="text-xs text-amber-900/70">
              TIN = Euríbor + diferencial. Revisión anual.
            </p>
          </fieldset>

          <fieldset className="bg-sky-50 border border-sky-200 rounded-lg p-4 space-y-3">
            <legend className="text-sm font-bold text-sky-900 uppercase tracking-wider mb-1">
              C · Mixta
            </legend>
            <Input
              name="mixtaTramoFijoAnios"
              label="Tramo fijo"
              placeholder="10"
              suffix="años"
            />
            <Input
              name="mixtaTinTramoFijoPct"
              label="TIN tramo fijo"
              placeholder="3,1"
              suffix="%"
            />
            <Input
              name="mixtaDiferencialVariablePct"
              label="Diferencial variable"
              placeholder="0,8"
              suffix="%"
            />
            <p className="text-xs text-sky-900/70">
              Fijo los primeros N años, después variable.
            </p>
          </fieldset>
        </div>

        <SubmitButton />
      </form>

      {state && !state.ok && (
        <p className="text-red-800 bg-red-50 border border-red-200 rounded-lg p-4">
          {state.error}
        </p>
      )}

      {state && state.ok && (
        <ResultPanel
          scenarios={state.result.scenarios}
          warnings={state.result.warnings}
          activeScenario={activeScenario}
          setActiveScenario={setActiveScenario}
        />
      )}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────
// Subcomponentes
// ─────────────────────────────────────────────────────────────────────────

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-navy-800 text-paper font-semibold py-3 rounded-lg hover:bg-navy-700 disabled:opacity-50 transition-colors"
    >
      {pending ? 'Calculando…' : 'Comparar las 3 modalidades →'}
    </button>
  )
}

function Input({
  name,
  label,
  placeholder,
  suffix,
}: {
  name: string
  label: string
  placeholder: string
  suffix?: string
}) {
  return (
    <label className="block">
      <span className="block text-xs font-semibold text-ink mb-1">{label}</span>
      <span className="relative block">
        <input
          name={name}
          type="text"
          inputMode="decimal"
          placeholder={placeholder}
          className="w-full bg-paper border border-navy-100 rounded-lg px-3 py-2 pr-12 focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-gold-400 text-sm"
        />
        {suffix && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-ink-muted pointer-events-none">
            {suffix}
          </span>
        )}
      </span>
    </label>
  )
}

function ResultPanel({
  scenarios,
  warnings,
  activeScenario,
  setActiveScenario,
}: {
  scenarios: ComparadorScenario[]
  warnings: ComparadorWarning[]
  activeScenario: 'estable' | 'sube_1pp' | 'sube_2pp'
  setActiveScenario: (k: 'estable' | 'sube_1pp' | 'sube_2pp') => void
}) {
  const current = scenarios.find((s) => s.key === activeScenario) ?? scenarios[0]!

  return (
    <div className="space-y-6">
      {/* Tabs por escenario */}
      <div>
        <p className="text-sm font-semibold text-navy-800 mb-3">Elige el escenario de Euríbor:</p>
        <div className="flex flex-wrap gap-2">
          {scenarios.map((s) => (
            <button
              key={s.key}
              type="button"
              onClick={() => setActiveScenario(s.key)}
              className={`px-4 py-2 rounded-lg text-sm font-bold border transition-colors ${
                activeScenario === s.key
                  ? 'bg-navy-800 text-paper border-navy-800'
                  : 'bg-paper-card text-navy-800 border-navy-100 hover:border-navy-300'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
        <p className="text-xs text-ink-muted mt-2">{current.description}</p>
      </div>

      {/* 3 cards: fija / variable / mixta */}
      <div className="grid md:grid-cols-3 gap-4">
        {(['fija', 'variable', 'mixta'] as Modalidad[]).map((mod) => {
          const m = current.modalidades[mod]
          const meta = MODALIDAD_META[mod]
          const isGanador = current.ganador === mod
          return (
            <article
              key={mod}
              className={`${meta.color} border-2 rounded-xl p-5 relative ${isGanador ? 'ring-2 ring-gold-500 ring-offset-2' : ''}`}
            >
              {isGanador && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold-500 text-navy-900 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-md">
                  Mejor en este escenario
                </span>
              )}
              <p className={`text-xs uppercase tracking-wider font-bold ${meta.iconColor} mb-1`}>
                {meta.label}
              </p>
              <p className="text-3xl font-bold text-navy-800 mb-1">{eur(m.cuotaInicial)}</p>
              <p className="text-xs text-ink-muted mb-4">
                Cuota inicial · TIN {pct(m.tinInicialPct)}
              </p>

              <dl className="space-y-2 text-sm">
                <div className="flex justify-between border-b border-current/10 pb-1.5">
                  <dt className="text-ink-soft">Cuota promedio</dt>
                  <dd className="font-semibold tabular-nums">{eur(m.cuotaPromedioProyectada)}</dd>
                </div>
                <div className="flex justify-between border-b border-current/10 pb-1.5">
                  <dt className="text-ink-soft">Cuota mín / máx</dt>
                  <dd className="font-semibold tabular-nums text-xs">
                    {eur(m.cuotaMinima)} / {eur(m.cuotaMaxima)}
                  </dd>
                </div>
                <div className="flex justify-between border-b border-current/10 pb-1.5">
                  <dt className="text-ink-soft">Intereses totales</dt>
                  <dd className="font-bold tabular-nums">{eur(m.intereseTotalProyectado)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-ink-soft">Exposición Euríbor</dt>
                  <dd className="font-semibold text-xs uppercase tracking-wider">
                    {m.exposicionEuribor === 'no'
                      ? 'No'
                      : m.exposicionEuribor === 'parcial'
                        ? 'Parcial'
                        : 'Total'}
                  </dd>
                </div>
              </dl>
            </article>
          )
        })}
      </div>

      {/* Recomendación del escenario activo */}
      <div className="bg-navy-900 text-paper rounded-xl p-5">
        <p className="text-xs uppercase tracking-wider text-gold-300 font-bold mb-2">
          Lectura del escenario {current.label.toLowerCase()}
        </p>
        <p className="text-paper/90 leading-relaxed">{current.recomendacion}</p>
      </div>

      {/* Avisos */}
      {warnings.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-semibold text-navy-800">Avisos del análisis</p>
          {warnings.map((w, i) => {
            const s = SEVERITY_STYLE[w.severity]
            return (
              <div
                key={i}
                className={`${s.bg} ${s.border} ${s.text} border rounded-lg p-3 text-sm`}
              >
                <p className="text-[10px] uppercase tracking-wider font-bold opacity-75 mb-1">
                  {s.label}
                </p>
                <p className="font-bold mb-1">{w.title}</p>
                <p className="leading-relaxed">{w.detail}</p>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
