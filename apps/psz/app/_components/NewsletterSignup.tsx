'use client'

/**
 * Alta al boletín de Toño Palacios — el formulario vive en el pie de TODAS
 * las páginas (el boletín antiguo captó 21 altas sin promoción alguna; el
 * rediseño lo dejó sin formulario y esto lo repone).
 *
 * Una sola newsletter para todo el ecosistema: preparación de financiación +
 * inversión con números netos. Consentimiento explícito con casilla (sin
 * casilla no hay base jurídica) y honeypot contra bots.
 */
import { useState } from 'react'

export default function NewsletterSignup({ origen = 'psz.es' }: { origen?: string }) {
  const [email, setEmail] = useState('')
  const [acepto, setAcepto] = useState(false)
  const [estado, setEstado] = useState<'idle' | 'sending' | 'ok' | 'error'>('idle')

  async function enviar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!acepto || estado === 'sending') return
    setEstado('sending')
    try {
      const hp = (e.currentTarget.elements.namedItem('web') as HTMLInputElement | null)?.value ?? ''
      const r = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, acepto, origen, web: hp }),
      })
      const j = (await r.json().catch(() => ({}))) as { ok?: boolean }
      setEstado(j?.ok ? 'ok' : 'error')
    } catch {
      setEstado('error')
    }
  }

  if (estado === 'ok') {
    return (
      <p className="text-paper text-sm">
        <span aria-hidden>✓</span> Apuntado. Te escribo pronto — y solo cuando haya algo que valga
        la pena.
      </p>
    )
  }

  return (
    <form onSubmit={enviar} className="space-y-3">
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="email"
          required
          maxLength={160}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="tu@correo.com"
          aria-label="Tu correo electrónico"
          className="flex-1 rounded-lg border border-paper/25 bg-navy-800 px-4 py-2.5 text-sm text-paper placeholder:text-paper/40 focus:border-gold-400 focus:outline-none"
        />
        {/* honeypot: invisible para personas, irresistible para bots */}
        <input
          type="text"
          name="web"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="hidden"
        />
        <button
          type="submit"
          disabled={!acepto || estado === 'sending'}
          className="rounded-lg bg-gold-400 px-5 py-2.5 text-sm font-semibold text-navy-900 transition hover:bg-gold-300 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {estado === 'sending' ? 'Un segundo…' : 'Suscribirme'}
        </button>
      </div>
      <label className="flex items-start gap-2 text-xs text-paper/60">
        <input
          type="checkbox"
          checked={acepto}
          onChange={(e) => setAcepto(e.target.checked)}
          className="mt-0.5 accent-gold-400"
        />
        <span>
          He leído y acepto la{' '}
          <a href="/politica-privacidad" className="underline hover:text-paper">
            política de privacidad
          </a>
          . Podrás darte de baja con un clic en cada correo.
        </span>
      </label>
      {estado === 'error' && (
        <p className="text-xs text-red-300">
          No se pudo guardar el alta. Prueba otra vez, o escríbeme a info@psz.es.
        </p>
      )}
    </form>
  )
}
