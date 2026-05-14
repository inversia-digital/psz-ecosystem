'use client'

/**
 * Form de la calculadora de capacidad de endeudamiento.
 *
 * Pregunta inversa a la de cuota: dado mi sueldo y mi situación,
 * ¿hasta cuánto me darían los bancos? Tres escenarios paralelos
 * conservador / estándar / agresivo según el ratio de esfuerzo
 * que el cliente esté dispuesto a asumir.
 *
 * La lógica de cálculo vive en actions.ts (server-only). El cliente
 * solo recibe el resultado serializado y lo renderiza.
 */

import { useState } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import {
  calculateCapacidad,
  type ActionState,
  type CapacidadScenario,
  type CapacidadWarning,
  type EscenarioKey,
} from './actions'

const eur = (n: number) =>
  new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(n)

const pct = (n: number) => `${n.toFixed(1).replace('.', ',')}%`

const ESCENARIO_STYLE: Record<EscenarioKey, { color: string; kpiClass: string }> = {
  conservador: { color: 'bg-emerald-50 border-emerald-200', kpiClass: 'text-emerald-900' },
  estandar: { color: 'bg-amber-50 border-amber-200', kpiClass: 'text-amber-900' },
  agresivo: { color: 'bg-red-50 border-red-200', kpiClass: 'text-red-900' },
}

const SEVERITY_STYLE: Record<CapacidadWarning['severity'], { bg: string; border: string; text: string; label: string }> = {
  red: { bg: 'bg-red-50', border: 'border-red-300', text: 'text-red-900', label: 'Aviso crítico' },
  amber: { bg: 'bg-amber-50', border: 'border-amber-300', text: 'text-amber-900', label: 'Atención' },
  green: { bg: 'bg-emerald-50', border: 'border-emerald-300', text: 'text-emerald-900', label: 'Favorable' },
}

export default function CapacidadForm() {
  const [state, action] = useFormState<ActionState, FormData>(calculateCapacidad, null)
  const [parejaActiva, setParejaActiva] = useState(false)
  const [tinPct, setTinPct] = useState(4.0)

  return (
    <div
      className="space-y-8"
      data-tool="calculadora-capacidad-endeudamiento"
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
              Titular principal
            </legend>
            <div className="grid grid-cols-2 gap-3">
              <Input
                name="ingresosTitular1"
                label="Ingresos netos"
                placeholder="2500"
                suffix="€/mes"
                help="Lo que cobras tras IRPF"
              />
              <Input name="edadTitular1" label="Edad" placeholder="35" suffix="años" />
            </div>
          </fieldset>

          <div>
            <button
              type="button"
              onClick={() => setParejaActiva((v) => !v)}
              className="text-sm font-semibold text-gold-700 hover:text-gold-600"
            >
              {parejaActiva ? '− Quitar co-titular' : '+ Añadir co-titular (pareja)'}
            </button>
          </div>

          {parejaActiva && (
            <fieldset className="space-y-3">
              <legend className="text-sm font-bold text-navy-800 uppercase tracking-wider mb-2">
                Co-titular
              </legend>
              <div className="grid grid-cols-2 gap-3">
                <Input
                  name="ingresosTitular2"
                  label="Ingresos netos"
                  placeholder="1800"
                  suffix="€/mes"
                />
                <Input name="edadTitular2" label="Edad" placeholder="32" suffix="años" />
              </div>
            </fieldset>
          )}

          <fieldset className="space-y-3">
            <legend className="text-sm font-bold text-navy-800 uppercase tracking-wider mb-2">
              Otros datos operativos
            </legend>
            <Input
              name="otrasDeudas"
              label="Otras cuotas mensuales"
              placeholder="0"
              suffix="€/mes"
              help="Préstamos personales, leasing, otras hipotecas..."
            />
            <Input
              name="aportePropio"
              label="Ahorro disponible para la operación"
              placeholder="40000"
              suffix="€"
              help="Lo que tienes para entrada + gastos de cierre"
            />
          </fieldset>

          <div>
            <label className="block text-sm font-semibold text-ink mb-2">
              TIN estimado · {pct(tinPct)}
              <span className="ml-2 text-xs text-ink-muted font-normal">
                (mediana actual del mercado en hipoteca primera vivienda)
              </span>
            </label>
            <input
              type="range"
              name="tinPct"
              min="0.5"
              max="8"
              step="0.1"
              value={tinPct}
              onChange={(e) => setTinPct(parseFloat(e.target.value))}
              className="w-full accent-gold-500"
            />
            <div className="flex justify-between text-xs text-ink-muted mt-1">
              <span>0,5%</span>
              <span>4%</span>
              <span>8%</span>
            </div>
          </div>

          <SubmitButton />
        </form>

        {/* RESULT */}
        <div className="bg-paper-soft rounded-xl border border-navy-100 p-6 min-h-[500px]">
          {state === null && (
            <div className="h-full flex flex-col items-center justify-center text-center text-ink-muted">
              <p className="text-lg font-semibold text-navy-800 mb-2">
                ¿Cuánto te daría el banco?
              </p>
              <p className="text-sm max-w-md">
                Introduce tus datos a la izquierda. Calculamos en servidor (lógica protegida) y
                te devolvemos 3 escenarios paralelos según el ratio de esfuerzo que asumas.
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
              warnings={state.result.warnings}
              edadMaxima={state.result.inputs.edadMaxima}
            />
          )}
        </div>
      </div>
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
      {pending ? 'Calculando…' : 'Calcular mi capacidad →'}
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
  warnings,
  edadMaxima,
}: {
  scenarios: Record<EscenarioKey, CapacidadScenario>
  warnings: CapacidadWarning[]
  edadMaxima: number
}) {
  const order: EscenarioKey[] = ['conservador', 'estandar', 'agresivo']

  return (
    <div className="space-y-5">
      <div>
        <p className="text-xs uppercase tracking-wider text-gold-600 font-semibold mb-1">
          Tu rango realista
        </p>
        <h3 className="text-2xl font-bold text-navy-800 mb-1">
          Entre {eur(scenarios.conservador.importeFinanciableMax)} y{' '}
          {eur(scenarios.agresivo.importeFinanciableMax)}
        </h3>
        <p className="text-sm text-ink-muted">
          Plazo aplicado: {scenarios.estandar.plazoAniosUsado} años · Edad máxima del titular: {edadMaxima} años
        </p>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {order.map((k) => {
          const sc = scenarios[k]
          const style = ESCENARIO_STYLE[k]
          return (
            <article
              key={k}
              className={`${style.color} border rounded-lg p-3 text-center`}
            >
              <p className="text-[10px] uppercase tracking-wider font-bold opacity-70 mb-1">
                {sc.meta.label}
              </p>
              <p className={`text-base font-bold ${style.kpiClass} leading-tight`}>
                {eur(sc.importeFinanciableMax)}
              </p>
              <p className="text-[11px] text-ink-muted mt-1">
                cuota {eur(sc.cuotaMensualMax)}/mes
              </p>
              <p className="text-[11px] text-ink-muted">
                precio máx {eur(sc.precioMaxInmueble)}
              </p>
              <p className="text-[11px] text-ink-muted">
                LTV {pct(sc.ltvImplicito)}
              </p>
            </article>
          )
        })}
      </div>

      <div className="bg-paper-card border border-navy-100 rounded-lg p-4 text-xs text-ink-soft">
        <p className="font-semibold text-navy-800 mb-2">Cómo leer estos escenarios</p>
        <ul className="space-y-1">
          {order.map((k) => (
            <li key={k}>
              <strong>{scenarios[k].meta.label}:</strong> {scenarios[k].meta.description}
            </li>
          ))}
        </ul>
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
    </div>
  )
}
