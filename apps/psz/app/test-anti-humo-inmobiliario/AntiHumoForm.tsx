'use client'

/**
 * Form de "El test anti-humo inmobiliario".
 * 3 inputs (precio, alquiler, "lo que te anuncian") + CCAA + avanzado colapsado.
 * El server action (actions.ts) calcula bruta/neta y devuelve el VEREDICTO.
 * Tarjeta de resultado compartible (WhatsApp / X / copiar).
 */

import { useState } from 'react'
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

export default function AntiHumoForm() {
  const [state, action] = useFormState<ActionState, FormData>(testAntiHumo, null)
  const [adv, setAdv] = useState(false)

  return (
    <div
      className="grid lg:grid-cols-2 gap-8"
      data-tool="test-anti-humo-inmobiliario"
      data-author="Antonio Palacios Cambero"
      data-author-alias="Toño Palacios"
      data-bde-id="E242"
      data-owner="Inversia Global Digital, S.L.U."
    >
      <form action={action} className="bg-paper-card border border-navy-100 rounded-xl p-6 shadow-soft space-y-4">
        <Input name="precio" label="Precio de compra" suffix="€" placeholder="120000" help="Lo que cuesta el piso" required />
        <Input name="alquiler" label="Alquiler mensual" suffix="€" placeholder="650" help="Lo que se cobra al mes" required />
        <Input
          name="anunciada"
          label="Rentabilidad que te anuncian (opcional)"
          suffix="%"
          placeholder="10"
          help="El % que pone el anuncio o el comercial. Es lo que dispara el veredicto."
        />
        <label className="block">
          <span className="block text-sm font-semibold text-navy-800 mb-1">Comunidad autónoma (ITP)</span>
          <select
            name="ccaa"
            defaultValue="VC"
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

        <button
          type="button"
          onClick={() => setAdv((v) => !v)}
          className="text-sm font-semibold text-navy-700 hover:text-navy-900"
        >
          {adv ? '− Ocultar supuestos' : '+ Ajustar supuestos (transparencia total)'}
        </button>
        {adv && (
          <div className="grid grid-cols-2 gap-3 rounded-lg bg-paper-soft border border-navy-100 p-3">
            <Input name="reforma" label="Reforma" suffix="€" placeholder="0" />
            <Input name="gastosAnualesPct" label="Gastos anuales" suffix="%" placeholder="28" help="% sobre la renta (IBI, comunidad, seguro, mantenimiento, vacíos, gestión)" />
          </div>
        )}

        <Submit />
        <p className="text-xs text-ink-muted leading-relaxed">
          Cálculo orientativo y con los supuestos a la vista (lo contrario de lo que hace el humo). No es asesoramiento.
        </p>
      </form>

      <div>
        {state == null && <Empty />}
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
}: {
  name: string
  label: string
  suffix?: string
  placeholder?: string
  help?: string
  required?: boolean
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

function ErrorBox({ text }: { text: string }) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-xl p-6">
      <p className="text-red-900 font-semibold mb-1">No se pudo analizar</p>
      <p className="text-sm text-red-800">{text}</p>
    </div>
  )
}

function Result({ r }: { r: AntiHumoResult }) {
  const s = VERDICT_STYLE[r.veredicto]
  const shareText =
    r.anunciada != null
      ? `Me anunciaban un ${pct(r.anunciada)} de rentabilidad, pero la NETA real es ${pct(r.netaPct)}. El test anti-humo inmobiliario de Toño Palacios lo deja claro 👇`
      : `Rentabilidad bruta ${pct(r.brutaPct)} vs neta real ${pct(r.netaPct)}: lo que te enseñan en los anuncios no es lo que cobras. Test anti-humo inmobiliario 👇`
  const url = 'https://psz.es/test-anti-humo-inmobiliario'

  return (
    <div className="space-y-4">
      {/* Veredicto */}
      <div className={`rounded-xl border-2 ${s.box} p-5`}>
        <span className={`inline-block ${s.chip} text-white text-xs font-bold uppercase tracking-wider rounded-full px-3 py-1 mb-3`}>
          Veredicto
        </span>
        <h3 className="text-xl font-extrabold text-navy-900 mb-2 leading-snug">{r.veredictoTitulo}</h3>
        <p className="text-sm text-navy-900/85 leading-relaxed">{r.veredictoCuerpo}</p>
      </div>

      {/* Bruta vs Neta */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-paper-card border border-navy-100 rounded-xl p-4 text-center">
          <p className="text-xs uppercase tracking-wider text-ink-muted">Bruta (la del anuncio)</p>
          <p className="text-3xl font-extrabold text-navy-800">{pct(r.brutaPct)}</p>
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
          <strong>{pct(Math.abs(r.gapPuntos))}</strong> menos de rentabilidad ={' '}
          <strong>{eur(Math.abs(r.gapEurAnio))}/año</strong> sobre tu inversión real de {eur(r.inversionReal)}.
        </p>
      </div>

      {/* Supuestos a la vista */}
      <details className="bg-paper-soft border border-navy-100 rounded-xl p-4 text-sm">
        <summary className="cursor-pointer font-semibold text-navy-800">Cómo sale (supuestos a la vista)</summary>
        <div className="mt-3 space-y-1 text-ink-soft">
          <Row label={`ITP ${r.ccaaName}`} value={`${pct(r.itpPct)} · ${eur(r.itpEur)}`} />
          <Row label="Gastos de compra (notaría, registro, AJD, gestoría)" value={`${eur(r.gastosCompraEur)}`} />
          {r.reforma > 0 && <Row label="Reforma" value={eur(r.reforma)} />}
          <Row label="Inversión real total" value={eur(r.inversionReal)} />
          <Row label={`Gastos anuales (${r.gastosAnualesPct}% de la renta)`} value={`${eur(r.gastosAnualesEur)}/año`} />
          <Row label="Renta neta anual" value={`${eur(r.rentaNetaAnual)}/año`} />
        </div>
      </details>

      {/* Compartir */}
      <div className="rounded-xl border border-navy-100 bg-paper-card p-4">
        <p className="text-sm font-semibold text-navy-800 mb-2">Comparte tu veredicto</p>
        <div className="flex flex-wrap gap-2">
          <a
            href={`https://wa.me/?text=${encodeURIComponent(shareText + ' ' + url)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold px-4 py-2"
          >
            WhatsApp
          </a>
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(url)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-navy-800 hover:bg-navy-900 text-white text-sm font-semibold px-4 py-2"
          >
            X / Twitter
          </a>
          <CopyButton text={`${shareText} ${url}`} />
        </div>
      </div>

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
  const [done, setDone] = useState(false)
  return (
    <button
      type="button"
      onClick={() => {
        navigator.clipboard?.writeText(text).then(
          () => {
            setDone(true)
            setTimeout(() => setDone(false), 1800)
          },
          () => {},
        )
      }}
      className="rounded-lg bg-gold-400 hover:bg-gold-300 text-navy-900 text-sm font-semibold px-4 py-2"
    >
      {done ? '¡Copiado!' : 'Copiar'}
    </button>
  )
}
