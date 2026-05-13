'use client'

/**
 * Cookie banner mínimo con wiring a Google Consent Mode v2.
 *
 * Comportamiento:
 * 1. Al cargar, lee la cookie `psz_cc`. Si existe (accept-all/reject-all),
 *    el banner no se muestra y NO se vuelve a llamar a gtag (ya lo hizo
 *    cuando el usuario decidió por primera vez — el storage de GTM persiste
 *    su propio estado).
 * 2. Si no existe, se muestra el banner en la parte inferior del viewport.
 * 3. Aceptar todo: gtag('consent','update', {todas las signals granted})
 *    + cookie `psz_cc=accept-all` por 365 días.
 * 4. Rechazar todo: gtag('consent','update', {mantienen denied salvo
 *    functionality+security}) + cookie `psz_cc=reject-all` por 365 días.
 * 5. Botón "Más info" → /cookies
 *
 * Re-apertura: desde /cookies se puede borrar la cookie `psz_cc` y reload
 * para volver a ver el banner (ver botón en /cookies).
 *
 * No bloquea el contenido. No tiene focus trap (decisión consciente: el
 * usuario puede ignorar el banner sin penalización legal porque los
 * defaults de Consent Mode v2 ya son DENIED — no se trackea hasta accept).
 */

import { useEffect, useState } from 'react'

const COOKIE_NAME = 'psz_cc'
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365 // 365 días

type Decision = 'accept-all' | 'reject-all'

// `window.dataLayer` ya está declarado por @next/third-parties/google.
// Aquí evitamos redeclarar el tipo y accedemos vía cast puntual.
function gtag(..._args: unknown[]) {
  if (typeof window === 'undefined') return
  const w = window as unknown as { dataLayer?: unknown[] }
  if (!w.dataLayer) w.dataLayer = []
  // eslint-disable-next-line prefer-rest-params
  w.dataLayer.push(arguments as unknown)
}

function readCookie(name: string): string | null {
  if (typeof document === 'undefined') return null
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`))
  if (!match || !match[1]) return null
  return decodeURIComponent(match[1])
}

function writeCookie(name: string, value: string) {
  if (typeof document === 'undefined') return
  const secure = location.protocol === 'https:' ? '; Secure' : ''
  document.cookie = `${name}=${encodeURIComponent(value)}; Path=/; Max-Age=${COOKIE_MAX_AGE}; SameSite=Lax${secure}`
}

function applyConsent(decision: Decision) {
  if (decision === 'accept-all') {
    gtag('consent', 'update', {
      ad_storage: 'granted',
      ad_user_data: 'granted',
      ad_personalization: 'granted',
      analytics_storage: 'granted',
      personalization_storage: 'granted',
    })
  } else {
    gtag('consent', 'update', {
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      analytics_storage: 'denied',
      personalization_storage: 'denied',
    })
  }
  writeCookie(COOKIE_NAME, decision)
}

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const existing = readCookie(COOKIE_NAME) as Decision | null
    if (existing) {
      // Re-aplicar la decisión previa en cada visita (por si el dataLayer
      // se reinició — Consent Mode persiste su propio storage pero esto
      // es redundancia explícita)
      applyConsent(existing)
      return
    }
    setVisible(true)
  }, [])

  function handleDecision(decision: Decision) {
    applyConsent(decision)
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Aviso de cookies"
      className="fixed bottom-0 left-0 right-0 z-50 bg-navy-900 text-paper border-t-2 border-gold-400 shadow-card"
    >
      <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
        <div className="flex-1">
          <p className="font-semibold text-paper mb-1">Cookies en psz.es</p>
          <p className="text-sm text-paper/75 leading-relaxed">
            Usamos cookies técnicas (siempre activas) y, con tu consentimiento, de análisis para
            mejorar el sitio. No usamos cookies publicitarias.{' '}
            <a
              href="/cookies"
              className="text-gold-300 hover:text-gold-200 underline underline-offset-2"
            >
              Más información
            </a>
            .
          </p>
        </div>
        <div className="flex flex-wrap gap-2 shrink-0">
          <button
            type="button"
            onClick={() => handleDecision('reject-all')}
            className="px-5 py-2.5 text-sm font-semibold bg-navy-700 hover:bg-navy-600 text-paper rounded-lg border border-navy-600 transition-colors"
          >
            Solo necesarias
          </button>
          <button
            type="button"
            onClick={() => handleDecision('accept-all')}
            className="px-5 py-2.5 text-sm font-bold bg-gold-400 hover:bg-gold-300 text-navy-900 rounded-lg transition-colors"
          >
            Aceptar todas
          </button>
        </div>
      </div>
    </div>
  )
}

/**
 * Borra la cookie de consentimiento — para reabrir el banner desde /cookies.
 * Llamar desde un onClick: `import { clearCookieConsent } from '...'`
 */
export function clearCookieConsent() {
  if (typeof document === 'undefined') return
  document.cookie = `${COOKIE_NAME}=; Path=/; Max-Age=0; SameSite=Lax`
  location.reload()
}
