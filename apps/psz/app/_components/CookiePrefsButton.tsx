'use client'

import { clearCookieConsent } from './CookieBanner'

export default function CookiePrefsButton() {
  return (
    <button
      type="button"
      onClick={clearCookieConsent}
      className="bg-navy-800 text-paper px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-navy-700 transition-colors"
    >
      Cambiar mis preferencias de cookies
    </button>
  )
}
