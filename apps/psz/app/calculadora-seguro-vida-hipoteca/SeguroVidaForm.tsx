'use client'

/**
 * Form de la calculadora de seguro de vida vinculado a hipoteca.
 *
 * Dos niveles de uso:
 *  1. Básico: edad + capital (+ fumador / invalidez) → banda de prima de
 *     mercado estimada vs referencia típica de póliza bancaria.
 *  2. Completo: añade tu prima actual y la bonificación de TIN que te da
 *     el banco por el seguro → veredicto de si compensa desvincular.
 */

import { useFormState, useFormStatus } from 'react-dom'
import {
  calculateSeguroVida,
  type ActionState,
  type SeguroResult,
  type SeguroWarning,
} from './actions'

const eur = (n: number) =>
  new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(n)

const SEVERITY_STYLE: Record<SeguroWarning['severity'], { bg: string; border: string; text: string; label: string }> = {
  red: { bg: 'bg-red-50', border: 'border-red-300', text: 'text-red-900', label: 'Aviso crítico' },
  amber: { bg: 'bg-amber-50', border: 'border-amber-300', text: 'text-amber-900', label: 'Atención' },
  green: { bg: 'bg-emerald-50', border: 'border-emerald-300', text: 'text-emerald-900', label: 'Favorable' },
}

export default function SeguroVidaForm() {
  const [state, action] = useFormState<ActionState, FormData>(calculateSeguroVida, null)

  return (
    <div
      className="space-y-8"
      data-tool="calculadora-seguro-vida-hipoteca"
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
              Tu perfil y tu cobertura
            </legend>
            <div className="grid grid-cols-2 gap-3">
              <Input name="edad" label="Tu edad" placeholder="38" suffix="años" />
              <Input
                name="capitalAsegurado"
                label="Capital a asegurar"
                placeholder="150000"
                suffix="€"
                help="Lo habitual: el capital pendiente de tu hipoteca"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Select
                name="fumador"
                label="¿Fumas?"
                options={[
                  { value: 'no', label: 'No' },
                  { value: 'si', label: 'Sí' },
                ]}
              />
              <Select
                name="invalidez"
                label="Cobertura de invalidez (IPA)"
                options={[
                  { value: 'si', label: 'Sí, incluirla' },
                  { value: 'no', label: 'No, solo fallecimiento' },
                ]}
                help="La mayoría de pólizas vinculadas la incluyen"
              />
            </div>
          </fieldset>

          <fieldset className="space-y-3">
            <legend className="text-sm font-bold text-navy-800 uppercase tracking-wider mb-2">
              Lo que pagas hoy (opcional, para el veredicto)
            </legend>
            <Input
              name="primaActualAnual"
              label="Prima anual de tu seguro actual"
              placeholder="620"
              suffix="€/año"
              help="La del recibo anual del seguro de vida vinculado"
            />
            <Input
              name="bonificacionPct"
              label="Bonificación de TIN por tener este seguro"
              placeholder="0,10"
              suffix="pp"
              help="En tu escritura u oferta vinculante (típico: 0,10-0,25 pp). Déjalo vacío si no la hay"
            />
          </fieldset>

          <SubmitButton />

          <p className="text-xs text-ink-muted leading-relaxed">
            Estimación orientativa por edad, capital y coberturas: la prima real depende de la
            aseguradora, el cuestionario de salud y la profesión. Esto no es una oferta ni
            mediación de seguros.
          </p>
        </form>

        {/* RESULT */}
        <div className="bg-paper-soft rounded-xl border border-navy-100 p-6 min-h-[500px]">
          {state === null && (
            <div className="h-full flex flex-col items-center justify-center text-center text-ink-muted">
              <p className="text-lg font-semibold text-navy-800 mb-2">
                ¿Pagas de más por el seguro de vida del banco?
              </p>
              <p className="text-sm max-w-md">
                Introduce tu edad y el capital de tu hipoteca. Te devolvemos la banda de mercado
                estimada, la referencia típica de póliza bancaria y — si nos das tu prima y tu
                bonificación — el veredicto de si te compensa desvincular.
              </p>
            </div>
          )}

          {state && !state.ok && (
            <p className="text-red-800 bg-red-50 border border-red-200 rounded-lg p-4">
              {state.error}
            </p>
          )}

          {state && state.ok && <ResultPanel r={state.result} />}
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
      {pending ? 'Calculando…' : 'Calcular mi seguro →'}
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

function Select({
  name,
  label,
  options,
  help,
}: {
  name: string
  label: string
  options: { value: string; label: string }[]
  help?: string
}) {
  return (
    <label className="block">
      <span className="block text-sm font-semibold text-ink mb-1">{label}</span>
      <select
        name={name}
        className="w-full bg-paper border border-navy-100 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-gold-400"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      {help && <span className="block text-xs text-ink-muted mt-1">{help}</span>}
    </label>
  )
}

function ResultPanel({ r }: { r: SeguroResult }) {
  const tienePrima = r.inputs.primaActualAnual > 0
  const tieneBonif = r.inputs.bonificacionPct > 0

  return (
    <div className="space-y-5">
      {/* Banda de mercado */}
      <div>
        <p className="text-xs uppercase tracking-wider text-gold-600 font-semibold mb-1">
          Prima anual estimada para tu perfil ({r.inputs.edad} años
          {r.inputs.fumador ? ', fumador' : ''}
          {r.inputs.invalidez ? ', con IPA' : ', solo fallecimiento'})
        </p>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3">
            <p className="text-[10px] uppercase tracking-wider font-bold text-emerald-900 mb-1">
              Banda de mercado (individual)
            </p>
            <p className="text-xl font-bold text-emerald-900">
              {eur(r.primaMercadoMin)} – {eur(r.primaMercadoMax)}
            </p>
            <p className="text-xs text-emerald-800 mt-1">media estimada {eur(r.primaMercadoMed)}/año</p>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-[10px] uppercase tracking-wider font-bold text-red-900 mb-1">
              Referencia típica póliza bancaria
            </p>
            <p className="text-xl font-bold text-red-900">≈ {eur(r.primaBancoTipica)}/año</p>
            <p className="text-xs text-red-800 mt-1">los estudios del sector sitúan la banca en 2-3× mercado</p>
          </div>
        </div>
      </div>

      {/* Comparativa con su prima */}
      {tienePrima && r.sobreprecioAnual !== null && (
        <div className="bg-paper-card border border-navy-100 rounded-lg p-4">
          <p className="text-xs uppercase tracking-wider text-gold-600 font-semibold mb-2">
            Tu prima actual: {eur(r.inputs.primaActualAnual)}/año
          </p>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-[10px] uppercase tracking-wider font-bold text-ink-muted mb-1">
                Frente a la media de mercado
              </p>
              <p className={`text-lg font-bold ${r.sobreprecioAnual > 0 ? 'text-red-900' : 'text-emerald-900'}`}>
                {r.sobreprecioAnual > 0 ? '+' : ''}
                {eur(r.sobreprecioAnual)}/año
              </p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider font-bold text-ink-muted mb-1">
                Proyección a 10 años
              </p>
              <p className={`text-lg font-bold ${(r.ahorroDecenal ?? 0) > 0 ? 'text-red-900' : 'text-emerald-900'}`}>
                {(r.ahorroDecenal ?? 0) > 0 ? '+' : ''}
                {eur(r.ahorroDecenal ?? 0)}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Módulo bonificación */}
      {tienePrima && tieneBonif && r.costeBonificacionAnual !== null && (
        <div className="bg-navy-50 border border-navy-100 rounded-lg p-4 text-sm">
          <p className="font-semibold text-navy-800 mb-2">
            La cuenta de la bonificación ({r.inputs.bonificacionPct.toString().replace('.', ',')} pp de TIN)
          </p>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-[10px] uppercase tracking-wider font-bold text-ink-muted mb-1">
                Sobreprecio del seguro
              </p>
              <p className="font-bold text-navy-800">{eur(Math.max(0, r.sobreprecioAnual ?? 0))}/año</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider font-bold text-ink-muted mb-1">
                Ahorro por bonificación (1er año)
              </p>
              <p className="font-bold text-navy-800">≈ {eur(r.costeBonificacionAnual)}/año</p>
            </div>
          </div>
          <p className="text-xs text-ink-soft mt-2 leading-relaxed">
            El ahorro de la bonificación decrece cada año (se aplica sobre capital pendiente, que
            baja al amortizar); la prima del seguro sube con la edad. La balanza se mueve sola con
            el tiempo — recalcula en cada renovación.
          </p>
        </div>
      )}

      {/* Avisos */}
      {r.warnings.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-semibold text-navy-800">Avisos del análisis</p>
          {r.warnings.map((w, i) => {
            const s = SEVERITY_STYLE[w.severity]
            return (
              <div key={i} className={`${s.bg} ${s.border} ${s.text} border rounded-lg p-3 text-sm`}>
                <p className="text-[10px] uppercase tracking-wider font-bold opacity-75 mb-1">{s.label}</p>
                <p className="font-bold mb-1">{w.title}</p>
                <p className="leading-relaxed">{w.detail}</p>
              </div>
            )
          })}
        </div>
      )}

      {!tienePrima && (
        <div className="bg-paper-card border border-dashed border-navy-200 rounded-lg p-3 text-xs text-ink-muted">
          Añade la <strong>prima anual que pagas hoy</strong> (y la bonificación de TIN si la hay)
          y te damos el veredicto: ¿compensa desvincular el seguro del banco o no?
        </div>
      )}
    </div>
  )
}
