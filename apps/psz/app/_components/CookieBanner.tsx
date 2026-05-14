'use client'

/**
 * Cookie banner con wiring a Google Consent Mode v2.
 *
 * Cumple los requisitos de la AEPD para consentimiento de cookies:
 *  - Tres opciones claras: aceptar todas / rechazar todas / configurar
 *  - Panel granular por categoría (técnicas + analíticas + publicidad)
 *  - Cookies técnicas siempre activas e inmodificables
 *  - Resto por defecto en denegado (sin casillas premarcadas)
 *  - Consentimiento persistido en cookie con 365 días
 *  - Posibilidad de modificar/retirar desde /cookies
 *
 * Comportamiento:
 * 1. Al cargar, lee la cookie `psz_cc`. Si existe, re-aplica decisión
 *    previa al dataLayer (redundancia explícita aunque Consent Mode ya
 *    persiste su propio storage).
 * 2. Si no existe, muestra el banner.
 * 3. "Aceptar todas": granted en todas las signals.
 * 4. "Solo necesarias": denied en todas las opcionales.
 * 5. "Configurar": panel con toggles por categoría.
 */

import { useEffect, useState } from 'react'

const COOKIE_NAME = 'psz_cc'
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365 // 365 días

type Decision = 'accept-all' | 'reject-all' | 'custom'

interface CategoryConsent {
  analytics: boolean
  advertising: boolean
  personalization: boolean
}

const DEFAULT_CUSTOM: CategoryConsent = {
  analytics: false,
  advertising: false,
  personalization: false,
}

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

function applyConsent(consent: CategoryConsent, decision: Decision) {
  gtag('consent', 'update', {
    ad_storage: consent.advertising ? 'granted' : 'denied',
    ad_user_data: consent.advertising ? 'granted' : 'denied',
    ad_personalization: consent.advertising ? 'granted' : 'denied',
    analytics_storage: consent.analytics ? 'granted' : 'denied',
    personalization_storage: consent.personalization ? 'granted' : 'denied',
  })
  const payload = JSON.stringify({ d: decision, c: consent })
  writeCookie(COOKIE_NAME, payload)
}

function parseStoredConsent(raw: string | null): { decision: Decision; consent: CategoryConsent } | null {
  if (!raw) return null
  // Backward-compat con cookies antiguas de 1 string ("accept-all" / "reject-all")
  if (raw === 'accept-all') {
    return { decision: 'accept-all', consent: { analytics: true, advertising: true, personalization: true } }
  }
  if (raw === 'reject-all') {
    return { decision: 'reject-all', consent: { analytics: false, advertising: false, personalization: false } }
  }
  try {
    const obj = JSON.parse(raw)
    if (obj && typeof obj === 'object' && obj.d && obj.c) {
      return { decision: obj.d as Decision, consent: obj.c as CategoryConsent }
    }
  } catch {
    /* ignore */
  }
  return null
}

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)
  const [configOpen, setConfigOpen] = useState(false)
  const [custom, setCustom] = useState<CategoryConsent>(DEFAULT_CUSTOM)

  useEffect(() => {
    const stored = parseStoredConsent(readCookie(COOKIE_NAME))
    if (stored) {
      // Re-aplicar decisión previa
      applyConsent(stored.consent, stored.decision)
      return
    }
    setVisible(true)
  }, [])

  function handleAcceptAll() {
    applyConsent({ analytics: true, advertising: true, personalization: true }, 'accept-all')
    setVisible(false)
  }

  function handleRejectAll() {
    applyConsent({ analytics: false, advertising: false, personalization: false }, 'reject-all')
    setVisible(false)
  }

  function handleSaveCustom() {
    applyConsent(custom, 'custom')
    setVisible(false)
    setConfigOpen(false)
  }

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Aviso de cookies"
      className="fixed bottom-0 left-0 right-0 z-50 bg-navy-900 text-paper border-t-2 border-gold-400 shadow-card"
    >
      <div className="max-w-7xl mx-auto px-6 py-5">
        {/* Mensaje principal */}
        <div className="flex flex-col md:flex-row gap-4 md:items-start md:justify-between">
          <div className="flex-1">
            <p className="font-semibold text-paper mb-1">Cookies en psz.es</p>
            <p className="text-sm text-paper/75 leading-relaxed">
              Utilizamos cookies propias y de terceros para garantizar el funcionamiento de la
              web, analizar el uso del sitio y mejorar nuestros servicios. Las cookies técnicas
              son obligatorias para el funcionamiento. Las demás categorías son opcionales y
              están desactivadas por defecto.{' '}
              <a
                href="/cookies"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold-300 hover:text-gold-200 underline underline-offset-2"
              >
                Más información ↗
              </a>
            </p>
          </div>
          <div className="flex flex-wrap gap-2 shrink-0">
            <button
              type="button"
              onClick={handleRejectAll}
              className="px-4 py-2.5 text-sm font-semibold bg-navy-700 hover:bg-navy-600 text-paper rounded-lg border border-navy-600 transition-colors"
            >
              Rechazar
            </button>
            <button
              type="button"
              onClick={() => setConfigOpen((v) => !v)}
              aria-expanded={configOpen}
              className="px-4 py-2.5 text-sm font-semibold bg-navy-700 hover:bg-navy-600 text-paper rounded-lg border border-navy-600 transition-colors"
            >
              {configOpen ? 'Ocultar ajustes' : 'Configurar'}
            </button>
            <button
              type="button"
              onClick={handleAcceptAll}
              className="px-5 py-2.5 text-sm font-bold bg-gold-400 hover:bg-gold-300 text-navy-900 rounded-lg transition-colors"
            >
              Aceptar todas
            </button>
          </div>
        </div>

        {/* Panel de configuración granular */}
        {configOpen && (
          <div className="mt-5 pt-5 border-t border-navy-700">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
              <article className="bg-navy-800 rounded-lg p-4">
                <p className="font-bold text-paper text-sm mb-2">Técnicas</p>
                <p className="text-xs text-paper/65 leading-relaxed mb-3">
                  Necesarias para el funcionamiento. Siempre activas.
                </p>
                <p className="text-xs text-gold-300 font-semibold">Siempre activas</p>
              </article>

              <ConsentToggle
                label="Analíticas"
                description="Google Analytics y similares para medir uso del sitio."
                checked={custom.analytics}
                onChange={(v) => setCustom((c) => ({ ...c, analytics: v }))}
              />
              <ConsentToggle
                label="Publicidad"
                description="Personalización de anuncios. Ahora mismo no usamos."
                checked={custom.advertising}
                onChange={(v) => setCustom((c) => ({ ...c, advertising: v }))}
              />
              <ConsentToggle
                label="Personalización"
                description="Recordar preferencias entre visitas."
                checked={custom.personalization}
                onChange={(v) => setCustom((c) => ({ ...c, personalization: v }))}
              />
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleSaveCustom}
                className="px-5 py-2.5 text-sm font-bold bg-gold-400 hover:bg-gold-300 text-navy-900 rounded-lg transition-colors"
              >
                Guardar mis preferencias
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function ConsentToggle({
  label,
  description,
  checked,
  onChange,
}: {
  label: string
  description: string
  checked: boolean
  onChange: (v: boolean) => void
}) {
  return (
    <article className="bg-navy-800 rounded-lg p-4">
      <div className="flex items-start justify-between gap-2 mb-2">
        <p className="font-bold text-paper text-sm">{label}</p>
        <label className="relative inline-flex items-center cursor-pointer shrink-0">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}
          />
          <span className="w-9 h-5 bg-navy-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-gold-400 rounded-full peer peer-checked:bg-gold-500 transition-colors" />
          <span className="absolute left-0.5 top-0.5 w-4 h-4 bg-paper rounded-full transition-transform peer-checked:translate-x-4" />
        </label>
      </div>
      <p className="text-xs text-paper/65 leading-relaxed">{description}</p>
    </article>
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
