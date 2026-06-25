'use client'

/**
 * Form de "El test anti-humo inmobiliario".
 * 3 inputs (precio, alquiler, "lo que te anuncian") + CCAA + avanzado colapsado.
 * El server action (actions.ts) calcula bruta/neta y devuelve el VEREDICTO.
 *
 * Viral: si llega con datos por la URL (enlace compartido), auto-calcula al
 * abrir y muestra el veredicto directamente. Los botones de compartir
 * construyen el enlace CON el resultado → la previsualización social destapa
 * el caso concreto (la imagen la genera /api/og-antihumo).
 */

import { useEffect } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import { testAntiHumo, type ActionState, type AntiHumoResult, type Veredicto } from './actions'
import { ITP_TABLE } from '../calculadora-rentabilidad-inmobiliaria/itpData'

const eur = (n: number) =>
  new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n)
const pct = (n: number) => `${n.toFixed(2).replace('.', ',')} %`

const VERDICT_STYLE: Record<Veredicto, { box: string; chip: string }> = {
  bruta: { box: 'bg-red-50 border-red-300', chip: 'bg-red-600' },
  inflada: { box: 'bg-red-50 border-red-300', chip: 'bg-red-600' },
  intermedia: { box: 'bg-amber-50 border-amber-300', chip: 'bg-amber-500' },
  coherente: { box: 'bg-emerald-50 border-emerald-300', chip: 'bg-emerald-600' },
  sin_anunciada: { box: 'bg-navy-50 border-navy-200', chip: 'bg-navy-700' },
}

export type FormInitial = {
  precio?: string
  alquiler?: string
  anunciada?: string
  ccaa?: string
  reforma?: string
  gastos?: string
  gc?: string
  hon?: string
}

export default function AntiHumoForm({ initial }: { initial?: FormInitial } = {}) {
  const [state, action] = useFormState<ActionState, FormData>(testAntiHumo, null)
  const hasInitial = !!(initial?.precio && initial?.alquiler)

  // Llega por enlace compartido → auto-calcula al abrir.
  useEffect(() => {
    if (!hasInitial) return
    const fd = new FormData()
    fd.set('precio', initial!.precio!)
    fd.set('alquiler', initial!.alquiler!)
    if (initial!.anunciada) fd.set('anunciada', initial!.anunciada)
    fd.set('ccaa', initial!.ccaa || 'VC')
    if (initial!.reforma) fd.set('reforma', initial!.reforma)
    if (initial!.gc) fd.set('gastosCompra', initial!.gc)
    if (initial!.hon) fd.set('honorarios', initial!.hon)
    if (initial!.gastos) fd.set('gastosAnualesEur', initial!.gastos)
    action(fd)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div
      className="grid lg:grid-cols-2 gap-8"
      data-tool="test-anti-humo-inmobiliario"
      data-author="Antonio Palacios Cambero"
      data-bde-id="E242"
      data-owner="Inversia Global Digital, S.L.U."
    >
      <form action={action} className="bg-paper-card border border-navy-100 rounded-xl p-6 shadow-soft space-y-4">
        <Input name="precio" label="Precio de compra" suffix="€" placeholder="120000" help="Lo que cuesta el piso" defaultValue={initial?.precio} required />
        <Input name="alquiler" label="Alquiler mensual" suffix="€" placeholder="650" help="Lo que se cobra al mes" defaultValue={initial?.alquiler} required />
        <Input
          name="anunciada"
          label="Rentabilidad que te anuncian (opcional)"
          suffix="%"
          placeholder="10"
          help="El % que pone el anuncio o el comercial. Es lo que dispara el veredicto."
          defaultValue={initial?.anunciada}
        />
        <label className="block">
          <span className="block text-sm font-semibold text-navy-800 mb-1">Comunidad autónoma (ITP)</span>
          <select
            name="ccaa"
            defaultValue={initial?.ccaa || 'VC'}
            className="w-full bg-paper-soft border border-navy-200 rounded-lg px-3 py-2.5 text-base focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400/30"
          >
            {ITP_TABLE.map((c) => (
              <option key={c.code} value={c.code}>
                {c.name} · ITP {c.rate.toString().replace('.', ',')}%
              </option>
            ))}
          </select>
          <span className="block text-xs text-ink-muted mt-1">El ITP es un coste real de compra que la rentabilidad bruta ignora.</span>
        </label>

        <details
          className="rounded-lg bg-paper-soft border border-navy-100 p-3"
          open={!!(initial?.reforma || initial?.gastos || initial?.gc || initial?.hon)}
        >
          <summary className="cursor-pointer text-sm font-semibold text-navy-700">Ajustar supuestos (transparencia total)</summary>
          <div className="grid grid-cols-2 gap-3 mt-3">
            <Input
              name="gastosCompra"
              label="Gastos de compra"
              suffix="€"
              placeholder="1300"
              help="Notaría + registro + gestoría, fijo (~1.300 € fuera de Madrid/Barcelona)."
              defaultValue={initial?.gc}
            />
            <Input
              name="honorarios"
              label="Honorarios agencia / PSI"
              suffix="€"
              placeholder="0"
              help="Si compras a través de una agencia o un personal shopper, sus honorarios. Es un coste real de la operación que también baja la rentabilidad — el número honesto lo cuenta desde el principio."
              defaultValue={initial?.hon}
            />
            <Input name="reforma" label="Reforma" suffix="€" placeholder="0" defaultValue={initial?.reforma} />
            <Input
              name="gastosAnualesEur"
              label="Gastos anuales (€/año)"
              suffix="€"
              placeholder="Vacío = estimar"
              help="Suma tu cifra real: IBI (~200) + comunidad (~300) + seguro + mantenimiento + vacíos + gestión. Si lo dejas vacío, estimamos ~28% de la renta."
              defaultValue={initial?.gastos}
            />
          </div>
        </details>

        <Submit />
        <p className="text-xs text-ink-muted leading-relaxed">
          Cálculo orientativo y con los supuestos a la vista (lo contrario de lo que hace el humo). No es asesoramiento.
        </p>
      </form>

      <div>
        {state == null && (hasInitial ? <Loading /> : <Empty />)}
        {state && !state.ok && <ErrorBox text={state.error} />}
        {state && state.ok && <Result r={state.result} />}
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
      {pending ? 'Analizando…' : 'Pasar el test anti-humo →'}
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
  defaultValue,
}: {
  name: string
  label: string
  suffix?: string
  placeholder?: string
  help?: string
  required?: boolean
  defaultValue?: string
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
          defaultValue={defaultValue || ''}
          required={required}
          className="w-full bg-paper-soft border border-navy-200 rounded-lg px-3 py-2.5 pr-12 text-base focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400/30"
        />
        {suffix && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-ink-muted pointer-events-none">{suffix}</span>
        )}
      </div>
      {help && <span className="block text-xs text-ink-muted mt-1">{help}</span>}
    </label>
  )
}

function Empty() {
  return (
    <div className="bg-paper-soft border border-dashed border-navy-200 rounded-xl p-8 text-center h-full flex flex-col justify-center min-h-[420px]">
      <p className="text-5xl mb-3">🕵️</p>
      <p className="text-navy-800 font-semibold mb-1">Tu veredicto aparecerá aquí</p>
      <p className="text-sm text-ink-muted">
        El 10% que ves en muchos anuncios casi nunca es el 10% que cobras. Mete los datos y lo comprobamos.
      </p>
    </div>
  )
}

function Loading() {
  return (
    <div className="bg-paper-soft border border-dashed border-navy-200 rounded-xl p-8 text-center h-full flex flex-col justify-center min-h-[420px]">
      <p className="text-5xl mb-3 animate-pulse">🕵️</p>
      <p className="text-navy-800 font-semibold">Pasando el test anti-humo…</p>
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

function resultUrl(r: AntiHumoResult): string {
  const q = new URLSearchParams()
  q.set('precio', String(r.precio))
  q.set('alquiler', String(r.alquilerMensual))
  if (r.anunciada != null) q.set('anunciada', String(r.anunciada))
  q.set('ccaa', r.ccaaCode)
  if (r.reforma > 0) q.set('reforma', String(r.reforma))
  q.set('gc', String(r.gastosCompraEur))
  if (r.honorarios > 0) q.set('hon', String(r.honorarios))
  q.set('gastos', String(Math.round(r.gastosAnualesEur)))
  return `https://psz.es/test-anti-humo-inmobiliario?${q.toString()}`
}

function Result({ r }: { r: AntiHumoResult }) {
  const s = VERDICT_STYLE[r.veredicto]
  const url = resultUrl(r)
  const shareText =
    r.anunciada != null
      ? `Me querían colar un ${pct(r.anunciada)} de rentabilidad. La REAL es ${pct(r.netaPct)} → me ocultaban ${eur(
          Math.abs(r.gapEurAnio),
        )} al año. Pásalo por el test anti-humo de Toño Palacios 👇`
      : `Bruta ${pct(r.brutaPct)} vs neta real ${pct(r.netaPct)}: lo que te enseñan en los anuncios NO es lo que cobras. Test anti-humo inmobiliario 👇`

  return (
    <div className="space-y-4">
      {/* Veredicto */}
      <div className={`rounded-xl border-2 ${s.box} p-5`}>
        <span className={`inline-block ${s.chip} text-white text-xs font-bold uppercase tracking-wider rounded-full px-3 py-1 mb-3`}>
          {r.veredictoEtiqueta}
        </span>
        <h3 className="text-2xl font-extrabold text-navy-900 mb-2 leading-tight">{r.veredictoTitulo}</h3>
        <p className="text-sm text-navy-900/85 leading-relaxed">{r.veredictoCuerpo}</p>
      </div>

      {/* Bruta vs Neta */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-paper-card border border-navy-100 rounded-xl p-4 text-center">
          <p className="text-xs uppercase tracking-wider text-ink-muted">Bruta (la del anuncio)</p>
          <p className="text-3xl font-extrabold text-navy-400 line-through decoration-2">{pct(r.brutaPct)}</p>
        </div>
        <div className="bg-navy-900 rounded-xl p-4 text-center">
          <p className="text-xs uppercase tracking-wider text-gold-300">Neta real (la que cobras)</p>
          <p className="text-3xl font-extrabold text-paper">{pct(r.netaPct)}</p>
        </div>
      </div>

      {/* El desfase */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
        <p className="text-sm text-amber-900">
          Diferencia que {r.anunciada != null ? 'el anuncio' : 'la rentabilidad bruta'} ignora:{' '}
          <strong>{pct(Math.abs(r.gapPuntos))}</strong> menos ={' '}
          <strong>{eur(Math.abs(r.gapEurAnio))}/año</strong> sobre tu inversión real de {eur(r.inversionReal)}.
        </p>
      </div>

      {/* Compartir — el corazón viral */}
      <div className="rounded-xl border-2 border-gold-300 bg-gold-50 p-4">
        <p className="text-sm font-bold text-navy-900 mb-2">📣 Comparte tu veredicto (y destapa el humo)</p>
        <div className="flex flex-wrap gap-2">
          <a
            href={`https://wa.me/?text=${encodeURIComponent(shareText + ' ' + url)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold px-4 py-2 no-underline"
          >
            WhatsApp
          </a>
          <CopyButton text={`${shareText} ${url}`} />
        </div>
        <p className="text-xs text-navy-900/60 mt-2">Al compartir, la previsualización muestra tu caso: “te anuncian {r.anunciada != null ? pct(r.anunciada) : pct(r.brutaPct)}, real {pct(r.netaPct)}”.</p>
      </div>

      {/* Supuestos a la vista */}
      <details className="bg-paper-soft border border-navy-100 rounded-xl p-4 text-sm">
        <summary className="cursor-pointer font-semibold text-navy-800">Cómo sale (supuestos a la vista)</summary>
        <div className="mt-3 space-y-1 text-ink-soft">
          <Row label={`ITP ${r.ccaaName}`} value={`${pct(r.itpPct)} · ${eur(r.itpEur)}`} />
          <Row label="Gastos de compra (notaría, registro, gestoría)" value={`${eur(r.gastosCompraEur)}`} />
          {r.reforma > 0 && <Row label="Reforma" value={eur(r.reforma)} />}
          {r.honorarios > 0 && <Row label="Honorarios agencia / PSI" value={eur(r.honorarios)} />}
          <Row label="Inversión real total" value={eur(r.inversionReal)} />
          <Row label={r.gastosAnualesEstimado ? 'Gastos anuales (estimados ~28% renta)' : 'Gastos anuales'} value={`${eur(r.gastosAnualesEur)}/año`} />
          <Row label="Renta neta anual" value={`${eur(r.rentaNetaAnual)}/año`} />
        </div>
      </details>

      {/* Cross-link a la calc seria */}
      <a
        href="/calculadora-rentabilidad-inmobiliaria"
        className="block rounded-xl border border-navy-200 bg-paper-soft p-4 text-center hover:border-gold-400 transition-colors no-underline"
      >
        <span className="block text-sm font-semibold text-navy-800">¿Quieres el análisis completo de la operación?</span>
        <span className="block text-xs text-ink-muted mt-0.5">
          Mi calculadora de rentabilidad con 3 escenarios, ITP por CCAA, flujo mensual y PDF →
        </span>
      </a>

      <p className="text-xs text-ink-muted italic leading-relaxed">
        © Inversia Global Digital S.L. — Test propietario. La fórmula es pública; el criterio sobre qué enseñar (y qué esconden otros) es trabajo del broker.
      </p>
    </div>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-3">
      <span>{label}</span>
      <span className="font-semibold text-navy-800 text-right">{value}</span>
    </div>
  )
}

function CopyButton({ text }: { text: string }) {
  return (
    <button
      type="button"
      onClick={(e) => {
        navigator.clipboard?.writeText(text).then(
          () => {
            const el = e.currentTarget
            const prev = el.textContent
            el.textContent = '¡Copiado!'
            setTimeout(() => {
              el.textContent = prev
            }, 1800)
          },
          () => {},
        )
      }}
      className="rounded-lg bg-gold-400 hover:bg-gold-300 text-navy-900 text-sm font-semibold px-4 py-2"
    >
      Copiar enlace
    </button>
  )
}
