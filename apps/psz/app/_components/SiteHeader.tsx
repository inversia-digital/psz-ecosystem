'use client'

/**
 * Navbar global de psz.es.
 *
 * Aparece en TODAS las páginas (inyectado desde app/layout.tsx)
 * excepto /admin/* (que tiene su propio layout).
 *
 * - Logo + nombre a la izquierda → home
 * - Enlaces principales en desktop
 * - Hamburger en mobile con menú overlay
 * - CTA primario "Solicitar hipoteca" siempre visible (mobile y desktop)
 */

import { useEffect, useState } from 'react'
import { MORTGAGE_FORM_URL, TONO } from '@psz/seo'
import { BrandMark } from './BrandMark'

const NAV_LINKS = [
  { label: 'Broker hipotecario', href: '/broker-hipotecario' },
  { label: 'Herramientas', href: '/herramientas' },
  { label: 'Sobre mí', href: '/sobre-mi' },
  { label: 'Blog', href: '/blog' },
  { label: 'FAQ', href: '/preguntas-frecuentes' },
  { label: 'Contacto', href: '/contacto' },
]

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 12)
    fn()
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  // Cerrar mobile menu al cambiar de página (Next App Router no recarga la SPA por completo)
  useEffect(() => {
    if (!mobileOpen) return
    const close = () => setMobileOpen(false)
    window.addEventListener('hashchange', close)
    return () => window.removeEventListener('hashchange', close)
  }, [mobileOpen])

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-colors ${
          scrolled ? 'bg-navy-900/95 backdrop-blur-md border-b border-navy-700' : 'bg-navy-900'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <a
            href="/"
            className="flex items-center gap-2.5 text-paper no-underline"
            aria-label={`${TONO.shortName} — inicio`}
          >
            <BrandMark size={38} bg="dark" registry={false} title={null} className="shrink-0" />
            <span className="flex flex-col leading-none">
              <span className="font-bold tracking-tight text-lg">
                <span className="text-gold-400">{TONO.shortName.split(' ')[0]}</span>{' '}
                <span>{TONO.shortName.split(' ')[1]}</span>
              </span>
              <span className="text-[10px] uppercase tracking-[0.18em] text-paper/55 mt-0.5">
                Broker hipotecario · Nº E242
              </span>
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-7">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-paper/75 hover:text-paper text-sm font-medium no-underline transition-colors"
              >
                {l.label}
              </a>
            ))}
            <a
              href={MORTGAGE_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gold-400 hover:bg-gold-300 text-navy-900 px-4 py-2 rounded-lg text-sm font-bold no-underline transition-colors"
            >
              Solicitar hipoteca
            </a>
          </nav>

          {/* Mobile burger */}
          <button
            type="button"
            aria-label="Abrir menú"
            aria-expanded={mobileOpen}
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMobileOpen((p) => !p)}
          >
            <span className={`w-6 h-0.5 bg-paper transition-transform ${mobileOpen ? 'translate-y-2 rotate-45' : ''}`} />
            <span className={`w-6 h-0.5 bg-paper transition-opacity ${mobileOpen ? 'opacity-0' : ''}`} />
            <span className={`w-6 h-0.5 bg-paper transition-transform ${mobileOpen ? '-translate-y-2 -rotate-45' : ''}`} />
          </button>
        </div>
      </header>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-x-0 top-16 z-30 bg-navy-900 border-b border-navy-700 px-6 py-6"
          role="dialog"
          aria-label="Menú de navegación"
        >
          <nav className="flex flex-col gap-4">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-paper/85 hover:text-paper text-base font-medium no-underline py-2"
                onClick={() => setMobileOpen(false)}
              >
                {l.label}
              </a>
            ))}
            <a
              href={MORTGAGE_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gold-400 hover:bg-gold-300 text-navy-900 px-4 py-3 rounded-lg text-base font-bold no-underline text-center mt-2"
              onClick={() => setMobileOpen(false)}
            >
              Solicitar hipoteca
            </a>
          </nav>
        </div>
      )}
    </>
  )
}
