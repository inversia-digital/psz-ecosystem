'use client'

import { type FormEvent, useState } from 'react'

type Need = {
  value: string
  label: string
  desc: string
}

const NEEDS: Need[] = [
  { value: 'vivienda_habitual', label: 'Vivienda habitual', desc: 'Compro mi casa para vivir' },
  { value: 'segunda_residencia', label: 'Segunda residencia', desc: 'Playa, montaña, pueblo…' },
  { value: 'inversion', label: 'Vivienda de inversión', desc: 'Para alquilar o revender' },
  { value: 'subrogacion', label: 'Cambiar mi hipoteca', desc: 'Subrogación: mejorar condiciones' },
  { value: 'eliminar_avalistas', label: 'Eliminar avalistas', desc: 'Sacar a un avalista del préstamo' },
  { value: 'extincion_condominio', label: 'Extinción de condominio', desc: 'Quedarme la vivienda compartida' },
  { value: 'local', label: 'Local comercial', desc: 'Financiar un local' },
  { value: 'empresas', label: 'Hipoteca para empresas', desc: 'Financiación para sociedades' },
]

type FormState = {
  tipo_operacion: string
  ubicacion: string
  precio: string
  financiacion: string
  situacion_laboral: string
  ingresos: string
  deudas: string
  ahorros: string
  edad: string
  bancos: string
  pignorables: boolean
  no_residente: boolean
  vivienda_libre: boolean
  nombre: string
  email: string
  telefono: string
  mensaje: string
  acepto: boolean
  /** de qué herramienta llega el lead (tracking del embudo) */
  origen: string
}

const EMPTY: FormState = {
  tipo_operacion: '',
  ubicacion: '',
  precio: '',
  financiacion: '',
  situacion_laboral: '',
  ingresos: '',
  deudas: '',
  ahorros: '',
  edad: '',
  bancos: '',
  pignorables: false,
  no_residente: false,
  vivienda_libre: false,
  nombre: '',
  email: '',
  telefono: '',
  mensaje: '',
  acepto: false,
  origen: '',
}

/** Prefill que llega por la URL desde las herramientas (calculadora, etc.). */
export type FunnelPrefill = {
  tipo_operacion?: string
  precio?: string
  financiacion?: string
  ingresos?: string
  plazo?: string
  tin?: string
  origen?: string
}

function seedFromPrefill(initial?: FunnelPrefill): FormState {
  const base: FormState = { ...EMPTY }
  if (!initial) return base
  const NEED_VALUES = new Set(NEEDS.map((n) => n.value))
  if (initial.tipo_operacion && NEED_VALUES.has(initial.tipo_operacion)) base.tipo_operacion = initial.tipo_operacion
  if (initial.precio) base.precio = initial.precio
  if (initial.financiacion) base.financiacion = initial.financiacion
  if (initial.ingresos) base.ingresos = initial.ingresos
  if (initial.origen) base.origen = initial.origen
  const extras: string[] = []
  if (initial.plazo) extras.push(`plazo ${initial.plazo} años`)
  if (initial.tin) extras.push(`TIN ${initial.tin}%`)
  if (extras.length) base.mensaje = `Vengo de la calculadora de hipoteca (${extras.join(', ')}).`
  return base
}

const labelCls = 'block text-sm font-semibold text-navy-800 mb-1'
const inputCls =
  'w-full rounded-md border border-navy-200 bg-paper px-3 py-2.5 text-ink outline-none focus:border-gold-400 focus:ring-2 focus:ring-gold-300/50'
const helpCls = 'text-xs text-ink-muted mt-1'

function Info({ text }: { text: string }) {
  return (
    <span
      tabIndex={0}
      title={text}
      aria-label={text}
      className="ml-1 inline-flex h-4 w-4 cursor-help items-center justify-center rounded-full bg-navy-100 text-[10px] font-bold text-navy-700 align-middle"
    >
      i
    </span>
  )
}

export function MortgageFunnel({ initial }: { initial?: FunnelPrefill } = {}) {
  // Si llega un tipo de operación válido por la URL, saltamos el paso 0.
  const startStep = initial?.tipo_operacion && NEEDS.some((n) => n.value === initial.tipo_operacion) ? 1 : 0
  const [step, setStep] = useState(startStep) // 0,1,2
  const [f, setF] = useState<FormState>(() => seedFromPrefill(initial))
  const [sending, setSending] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const set = <K extends keyof FormState>(k: K, v: FormState[K]) => setF((s) => ({ ...s, [k]: v }))

  const pickNeed = (value: string) => {
    set('tipo_operacion', value)
    setStep(1)
  }

  const contactOk = f.nombre.trim() && /\S+@\S+\.\S+/.test(f.email) && f.telefono.trim() && f.acepto

  async function submit(e: FormEvent) {
    e.preventDefault()
    if (!contactOk || sending) return
    setSending(true)
    setError(null)
    try {
      const res = await fetch('/api/solicitar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(f),
      })
      const j = await res.json().catch(() => ({}))
      if (res.ok && j?.ok) {
        setDone(true)
      } else {
        setError('No hemos podido enviar tu solicitud. Inténtalo de nuevo o escríbenos a info@inversiadigital.es.')
      }
    } catch {
      setError('Problema de conexión. Inténtalo de nuevo en unos minutos.')
    } finally {
      setSending(false)
    }
  }

  if (done) {
    return (
      <div className="mx-auto max-w-xl rounded-2xl border border-gold-300 bg-paper-card p-8 text-center shadow-card">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gold-100 text-2xl text-gold-600">
          ✓
        </div>
        <h2 className="mb-2 text-2xl font-bold text-navy-800">¡Gracias! Hemos recibido tu solicitud</h2>
        <p className="text-ink-soft">
          Reviso tu caso personalmente y te contacto en menos de 24&nbsp;horas laborables para una primera
          evaluación gratuita y sin compromiso.
        </p>
        <p className="mt-3 text-sm text-ink-muted">Si es urgente, escríbeme a info@inversiadigital.es</p>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl">
      {/* Progreso */}
      <div className="mb-6 flex items-center gap-2">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full ${i <= step ? 'bg-gold-400' : 'bg-navy-100'}`}
          />
        ))}
      </div>

      {/* PASO 1 — ¿Qué necesitas? */}
      {step === 0 && (
        <div>
          <h2 className="mb-1 text-2xl font-bold text-navy-800">¿Qué necesitas?</h2>
          <p className="mb-5 text-ink-soft">Elige la opción que mejor describe tu caso.</p>
          <div className="grid gap-3 sm:grid-cols-2">
            {NEEDS.map((n) => (
              <button
                key={n.value}
                type="button"
                onClick={() => pickNeed(n.value)}
                className={`rounded-xl border p-4 text-left transition-colors hover:border-gold-400 hover:bg-gold-50 ${
                  f.tipo_operacion === n.value ? 'border-gold-400 bg-gold-50' : 'border-navy-200 bg-paper-card'
                }`}
              >
                <span className="block font-semibold text-navy-800">{n.label}</span>
                <span className="mt-0.5 block text-sm text-ink-muted">{n.desc}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* PASO 2 — Tu caso */}
      {step === 1 && (
        <div>
          <h2 className="mb-1 text-2xl font-bold text-navy-800">Cuéntame tu caso</h2>
          <p className="mb-5 text-ink-soft">Cuanto más sepa, mejor podré estudiar tu viabilidad. Solo el contacto es obligatorio.</p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className={labelCls}>¿Dónde está el inmueble?</label>
              <input
                className={inputCls}
                value={f.ubicacion}
                onChange={(e) => set('ubicacion', e.target.value)}
                placeholder="Ciudad o provincia"
              />
            </div>
            <div>
              <label className={labelCls}>Precio o valor del inmueble (€)</label>
              <input type="number" min={0} className={inputCls} value={f.precio} onChange={(e) => set('precio', e.target.value)} />
            </div>
            <div>
              <label className={labelCls}>¿Cuánto necesitas financiar? (€)</label>
              <input type="number" min={0} className={inputCls} value={f.financiacion} onChange={(e) => set('financiacion', e.target.value)} />
            </div>
            <div>
              <label className={labelCls}>Situación laboral</label>
              <select className={inputCls} value={f.situacion_laboral} onChange={(e) => set('situacion_laboral', e.target.value)}>
                <option value="">Selecciona…</option>
                <option value="asalariado">Asalariado/a</option>
                <option value="autonomo">Autónomo/a</option>
                <option value="funcionario">Funcionario/a</option>
                <option value="pensionista">Pensionista</option>
                <option value="otro">Otra</option>
              </select>
            </div>
            <div>
              <label className={labelCls}>Edad</label>
              <input type="number" min={18} max={99} className={inputCls} value={f.edad} onChange={(e) => set('edad', e.target.value)} />
            </div>
            <div>
              <label className={labelCls}>
                Ingresos netos mensuales (€)
                <Info text="Suma los ingresos netos de todos los titulares, incluidas rentas de alquiler u otros ingresos recurrentes." />
              </label>
              <input type="number" min={0} className={inputCls} value={f.ingresos} onChange={(e) => set('ingresos', e.target.value)} />
              <p className={helpCls}>Suma de todos los titulares, incluidas rentas de alquiler.</p>
            </div>
            <div>
              <label className={labelCls}>
                Otras cuotas al mes (€)
                <Info text="Cuotas mensuales de préstamos, hipotecas o financiaciones en vigor (incluye las superiores a 1.000 € al mes)." />
              </label>
              <input type="number" min={0} className={inputCls} value={f.deudas} onChange={(e) => set('deudas', e.target.value)} />
              <p className={helpCls}>Préstamos, hipotecas o financiaciones que ya pagas.</p>
            </div>
            <div>
              <label className={labelCls}>Ahorros disponibles (€)</label>
              <input type="number" min={0} className={inputCls} value={f.ahorros} onChange={(e) => set('ahorros', e.target.value)} />
            </div>
            <div className="sm:col-span-2">
              <label className={labelCls}>¿Con qué bancos trabajas o tienes cuentas?</label>
              <input className={inputCls} value={f.bancos} onChange={(e) => set('bancos', e.target.value)} placeholder="Ej.: BBVA, Santander, ING…" />
            </div>
            <div className="sm:col-span-2 space-y-2 pt-1">
              <label className="flex items-start gap-2 text-sm text-ink">
                <input type="checkbox" className="mt-0.5" checked={f.pignorables} onChange={(e) => set('pignorables', e.target.checked)} />
                <span>
                  Tengo fondos o productos pignorables
                  <Info text="La pignoración es usar un producto (fondo de inversión, plan, depósito…) como garantía adicional sin venderlo, lo que puede mejorar las condiciones de tu hipoteca." />
                </span>
              </label>
              <label className="flex items-start gap-2 text-sm text-ink">
                <input type="checkbox" className="mt-0.5" checked={f.no_residente} onChange={(e) => set('no_residente', e.target.checked)} />
                <span>Resido fuera de España</span>
              </label>
              <label className="flex items-start gap-2 text-sm text-ink">
                <input type="checkbox" className="mt-0.5" checked={f.vivienda_libre} onChange={(e) => set('vivienda_libre', e.target.checked)} />
                <span>Tengo una vivienda libre de cargas</span>
              </label>
            </div>
          </div>
          <div className="mt-6 flex justify-between">
            <button type="button" onClick={() => setStep(0)} className="px-4 py-2 text-sm font-medium text-ink-muted hover:text-ink">
              ← Atrás
            </button>
            <button
              type="button"
              onClick={() => setStep(2)}
              className="rounded-md bg-navy-800 px-6 py-3 font-medium text-paper hover:bg-navy-700"
            >
              Continuar →
            </button>
          </div>
        </div>
      )}

      {/* PASO 3 — Contacto */}
      {step === 2 && (
        <form onSubmit={submit}>
          <h2 className="mb-1 text-2xl font-bold text-navy-800">¿Cómo te contacto?</h2>
          <p className="mb-5 text-ink-soft">Te llamo en menos de 24&nbsp;horas laborables, sin compromiso.</p>
          <div className="grid gap-4">
            <div>
              <label className={labelCls}>Nombre y apellidos *</label>
              <input className={inputCls} value={f.nombre} onChange={(e) => set('nombre', e.target.value)} required />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className={labelCls}>Email *</label>
                <input type="email" className={inputCls} value={f.email} onChange={(e) => set('email', e.target.value)} required />
              </div>
              <div>
                <label className={labelCls}>Teléfono *</label>
                <input type="tel" className={inputCls} value={f.telefono} onChange={(e) => set('telefono', e.target.value)} required />
              </div>
            </div>
            <div>
              <label className={labelCls}>Mensaje (opcional)</label>
              <textarea className={inputCls} rows={3} value={f.mensaje} onChange={(e) => set('mensaje', e.target.value)} />
            </div>
            <label className="flex items-start gap-2 text-sm text-ink-soft">
              <input type="checkbox" className="mt-0.5" checked={f.acepto} onChange={(e) => set('acepto', e.target.checked)} required />
              <span>
                He leído y acepto la{' '}
                <a href="/politica-privacidad" target="_blank" rel="noopener noreferrer" className="font-medium text-gold-600 underline">
                  política de privacidad
                </a>{' '}
                y el tratamiento de mis datos para gestionar mi solicitud, incluida su tramitación
                por uno de los intermediarios colaboradores registrados que trabajan por cuenta de
                PSZ cuando la operación corresponda a su zona o especialidad.
              </span>
            </label>
          </div>

          {error && <p className="mt-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

          <div className="mt-6 flex items-center justify-between">
            <button type="button" onClick={() => setStep(1)} className="px-4 py-2 text-sm font-medium text-ink-muted hover:text-ink">
              ← Atrás
            </button>
            <button
              type="submit"
              disabled={!contactOk || sending}
              className="rounded-md bg-gold-400 px-6 py-3 font-semibold text-navy-900 hover:bg-gold-500 disabled:opacity-50"
            >
              {sending ? 'Enviando…' : 'Enviar solicitud'}
            </button>
          </div>
        </form>
      )}
    </div>
  )
}
