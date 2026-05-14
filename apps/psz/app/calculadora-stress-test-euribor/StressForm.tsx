'use client'

/**
 * Form del stress test Euríbor.
 *
 * El cliente introduce 4 datos clave de su hipoteca variable actual
 * (capital pendiente, plazo restante, Euríbor actual, diferencial) y
 * un quinto opcional (ingresos netos) para que la calculadora pueda
 * proyectar el ratio de esfuerzo.
 *
 * Devuelve 5 escenarios paralelos: +0, +0.5, +1, +1.5, +2 puntos
 * porcentuales sobre el Euríbor actual.
 */

import { useState } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import {
  calculateStressTest,
  type ActionState,
  type StressScenario,
  type StressWarning,
} from './actions'

const eur = (n: number) =>
  new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(n)

const pct = (n: number) => `${n.toFixed(2).replace('.', ',')}%`

const SEVERITY_STYLE: Record<StressWarning['severity'], { bg: string; border: string; text: string; label: string }> = {
  red: { bg: 'bg-red-50', border: 'border-red-300', text: 'text-red-900', label: 'Aviso crítico' },
  amber: { bg: 'bg-amber-50', border: 'border-amber-300', text: 'text-amber-900', label: 'Atención' },
  green: { bg: 'bg-emerald-50', border: 'border-emerald-300', text: 'text-emerald-900', label: 'Favorable' },
}

const SCENARIO_COLOR = (delta: number): string => {
  if (delta === 0) return 'bg-paper-card border-navy-100'
  if (delta <= 0.5) return 'bg-amber-50 border-amber-200'
  if (delta <= 1) return 'bg-orange-50 border-orange-200'
  if (delta <= 1.5) return 'bg-rose-50 border-rose-200'
  return 'bg-red-50 border-red-300'
}

export default function StressForm() {
  const [state, action] = useFormState<ActionState, FormData>(calculateStressTest, null)

  return (
    <div
      className="space-y-8"
      data-tool="calculadora-stress-test-euribor"
      data-author="Antonio Palacios Cambero"
      data-author-alias="Toño Palacios"
      data-author-url="https://psz.es/sobre-mi"
      data-bde-id="E242"
      data-owner="Inversia Global Digital, S.L.U."
      data-owner-tax-id="B75281394"
      data-license="© Inversia Global Digital — todos los derechos reservados"
    >
      <div className="grid lg:grid-cols-2 gap-8">
        {/* FORM */}
        <form
          action={action}
          className="bg-paper-card border border-navy-100 rounded-xl p-6 shadow-soft space-y-5"
        >
          <fieldset className="space-y-3">
            <legend className="text-sm font-bold text-navy-800 uppercase tracking-wider mb-2">
              Tu hipoteca variable actual
            </legend>
            <Input
              name="capitalPendiente"
              label="Capital pendiente"
              placeholder="150000"
              suffix="€"
              help="Lo que aún debes al banco"
            />
            <Input
              name="plazoRestanteAnios"
              label="Plazo restante"
              placeholder="20"
              suffix="años"
              help="Años hasta el último pago"
            />
            <div className="grid grid-cols-2 gap-3">
              <Input
                name="euriborActualPct"
                label="Euríbor actual aplicado"
                placeholder="2,8"
                suffix="%"
                help="El que figura en tu última revisión"
              />
              <Input
                name="diferencialPct"
                label="Diferencial"
                placeholder="0,85"
                suffix="%"
                help="Pactado en escritura"
              />
            </div>
          </fieldset>

          <fieldset>
            <legend className="text-sm font-bold text-navy-800 uppercase tracking-wider mb-2">
              Tus ingresos (opcional)
            </legend>
            <Input
              name="ingresosNetos"
              label="Ingresos netos mensuales (suma del hogar)"
              placeholder="3000"
              suffix="€/mes"
              help="Para calcular el ratio de esfuerzo proyectado"
            />
          </fieldset>

          <SubmitButton />

          <p className="text-xs text-ink-muted leading-relaxed">
            El TIN que se aplica a tu hipoteca es Euríbor + diferencial. La columna +0 del
            resultado debería coincidir con tu cuota real actual; si no, revisa los datos
            introducidos.
          </p>
        </form>

        {/* RESULT */}
        <div className="bg-paper-soft rounded-xl border border-navy-100 p-6 min-h-[500px]">
          {state === null && (
            <div className="h-full flex flex-col items-center justify-center text-center text-ink-muted">
              <p className="text-lg font-semibold text-navy-800 mb-2">
                ¿Y si el Euríbor sube?
              </p>
              <p className="text-sm max-w-md">
                Introduce los datos de tu hipoteca variable. Te devolvemos 5 escenarios paralelos
                con la cuota proyectada si el Euríbor sube 0, 0,5, 1, 1,5 o 2 puntos porcentuales.
              </p>
            </div>
          )}

          {state && !state.ok && (
            <p className="text-red-800 bg-red-50 border border-red-200 rounded-lg p-4">
              {state.error}
            </p>
          )}

          {state && state.ok && (
            <ResultPanel
              scenarios={state.result.scenarios}
              cuotaBase={state.result.cuotaBase}
              tinBasePct={state.result.tinBasePct}
              warnings={state.result.warnings}
              hasIngresos={state.result.inputs.ingresosNetos > 0}
            />
          )}
        </div>
      </div>

      {/* Tabla horizontal con los 5 escenarios — fuera del grid para ancho completo */}
      {state && state.ok && (
        <ScenariosTable
          scenarios={state.result.scenarios}
          hasIngresos={state.result.inputs.ingresosNetos > 0}
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
      {pending ? 'Calculando…' : 'Ejecutar stress test →'}
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
  placeholder: string
  suffix?: string
  help?: string
}) {
  return (
    <label className="block">
      <span className="block text-sm font-semibold text-ink mb-1">{label}</span>
      <span className="relative block">
        <input
          name={name}
          type="text"
          inputMode="decimal"
          placeholder={placeholder}
          className="w-full bg-paper border border-navy-100 rounded-lg px-3 py-2 pr-14 focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-gold-400"
        />
        {suffix && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-ink-muted pointer-events-none">
            {suffix}
          </span>
        )}
      </span>
      {help && <span className="block text-xs text-ink-muted mt-1">{help}</span>}
    </label>
  )
}

function ResultPanel({
  scenarios,
  cuotaBase,
  tinBasePct,
  warnings,
  hasIngresos,
}: {
  scenarios: StressScenario[]
  cuotaBase: number
  tinBasePct: number
  warnings: StressWarning[]
  hasIngresos: boolean
}) {
  const escenarioPlus2 = scenarios[scenarios.length - 1]!

  return (
    <div className="space-y-5">
      <div>
        <p className="text-xs uppercase tracking-wider text-gold-600 font-semibold mb-1">
          Tu situación actual y escenario adverso
        </p>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-paper-card border border-navy-100 rounded-lg p-3">
            <p className="text-[10px] uppercase tracking-wider font-bold text-ink-muted mb-1">
              Cuota actual (TIN {pct(tinBasePct)})
            </p>
            <p className="text-xl font-bold text-navy-800">{eur(cuotaBase)}/mes</p>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-[10px] uppercase tracking-wider font-bold text-red-900 mb-1">
              Si Euríbor +2pp
            </p>
            <p className="text-xl font-bold text-red-900">
              {eur(escenarioPlus2.cuotaMensual)}/mes
            </p>
            <p className="text-xs text-red-800 mt-1">
              +{eur(escenarioPlus2.cuotaIncrementoMensual)} cada mes
            </p>
          </div>
        </div>
      </div>

      <div className="bg-paper-card border border-navy-100 rounded-lg p-4 text-xs text-ink-soft">
        <p className="font-semibold text-navy-800 mb-1">Cómo se lee este stress test</p>
        <p className="leading-relaxed">
          Los 5 escenarios proyectan tu cuota mensual si en la próxima revisión el Euríbor
          subiera 0 / 0,5 / 1 / 1,5 / 2 puntos porcentuales. El TIN cambia, el diferencial
          permanece igual. La banca utiliza este tipo de simulación internamente para estudiar
          viabilidad de operaciones nuevas — aquí lo aplicamos a la tuya actual.
        </p>
      </div>

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

      {!hasIngresos && (
        <div className="bg-paper-card border border-dashed border-navy-200 rounded-lg p-3 text-xs text-ink-muted">
          Si quieres ver además el <strong>ratio de esfuerzo proyectado</strong> en cada
          escenario, rellena el campo "Ingresos netos mensuales" del formulario y recalcula.
        </div>
      )}
    </div>
  )
}

function ScenariosTable({
  scenarios,
  hasIngresos,
}: {
  scenarios: StressScenario[]
  hasIngresos: boolean
}) {
  return (
    <div className="bg-paper-card border border-navy-100 rounded-xl overflow-hidden">
      <p className="px-6 py-3 bg-navy-50 border-b border-navy-100 text-sm font-bold text-navy-800">
        Los 5 escenarios paralelos del stress test
      </p>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-paper-soft text-navy-800">
            <tr>
              <th className="text-left px-3 py-3 font-semibold">Escenario</th>
              <th className="text-right px-3 py-3 font-semibold">TIN aplicado</th>
              <th className="text-right px-3 py-3 font-semibold">Cuota mensual</th>
              <th className="text-right px-3 py-3 font-semibold">Subida vs actual</th>
              <th className="text-right px-3 py-3 font-semibold">Coste anual extra</th>
              {hasIngresos && (
                <th className="text-right px-3 py-3 font-semibold">Ratio esfuerzo</th>
              )}
            </tr>
          </thead>
          <tbody>
            {scenarios.map((sc) => (
              <tr key={sc.delta} className={`border-t border-navy-100 ${SCENARIO_COLOR(sc.delta)}`}>
                <td className="px-3 py-3 font-semibold text-navy-800">
                  Euríbor {sc.delta === 0 ? '(actual)' : `+${sc.delta.toString().replace('.', ',')} pp`}
                </td>
                <td className="px-3 py-3 text-right tabular-nums">{pct(sc.tinNuevoPct)}</td>
                <td className="px-3 py-3 text-right tabular-nums font-bold">{eur(sc.cuotaMensual)}</td>
                <td className="px-3 py-3 text-right tabular-nums">
                  {sc.cuotaIncrementoMensual === 0
                    ? '—'
                    : `+${eur(sc.cuotaIncrementoMensual)}`}
                </td>
                <td className="px-3 py-3 text-right tabular-nums">
                  {sc.cuotaIncrementoAnual === 0 ? '—' : `+${eur(sc.cuotaIncrementoAnual)}`}
                </td>
                {hasIngresos && (
                  <td className="px-3 py-3 text-right tabular-nums">
                    {sc.ratioEsfuerzoPct === null ? '—' : `${sc.ratioEsfuerzoPct.toString().replace('.', ',')}%`}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
