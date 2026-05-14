/**
 * Footer global de psz.es.
 *
 * Aparece en TODAS las páginas (inyectado desde app/layout.tsx)
 * excepto /admin/* (que tiene su propio layout).
 *
 * Estructura:
 * - 3 columnas superiores: identidad + servicios + empresa operativa
 * - Sección legal organizada en 3 GRUPOS semánticos (no fila plana):
 *     · General (LSSI + RGPD)
 *     · Actividad regulada (Ley 5/2019)
 *     · Otros servicios (estructuras + INARPA)
 * - Copyright
 */

import { INVERSIA, SITE_URLS, SOCIAL_LINKS, TONO } from '@psz/seo'
import { Container, SocialIcon } from '@psz/ui'
import { HERRAMIENTAS_LIVE } from '../_data/herramientas'

const LEGAL_GROUPS: Array<{ title: string; links: Array<{ label: string; href: string }> }> = [
  {
    title: 'Legal general',
    links: [
      { label: 'Aviso legal',          href: '/aviso-legal' },
      { label: 'Política de privacidad', href: '/politica-privacidad' },
      { label: 'Política de cookies',  href: '/cookies' },
      { label: 'Términos y condiciones', href: '/terminos' },
    ],
  },
  {
    title: 'Actividad regulada (Ley 5/2019)',
    links: [
      { label: 'Tarifas y comisiones',     href: '/tarifas-y-comisiones' },
      { label: 'Información pre-contractual', href: '/informacion-pre-contractual' },
      { label: 'Reclamaciones',            href: '/reclamaciones' },
      { label: 'Código de conducta',       href: '/codigo-de-conducta' },
    ],
  },
  {
    title: 'Otros servicios',
    links: [
      { label: 'Aviso estructuras internacionales', href: '/disclaimer-estructuras-internacionales' },
      { label: 'Condiciones INARPA (formación)',    href: '/condiciones-inarpa' },
    ],
  },
]

export default function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-navy-900 text-paper/80 pt-14 pb-8">
      <Container size="xl">
        {/* Bloque superior: identidad + servicios + recursos + empresa */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-10 mb-12">
          {/* Columna 1 — identidad */}
          <div>
            <p className="text-paper font-bold text-lg mb-2">{TONO.shortName}</p>
            <p className="text-sm">Broker hipotecario nº {TONO.credentials.bdeId}</p>
            <p className="text-sm">Presidente de ANICI</p>
            <div className="flex gap-3 mt-5">
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.platform}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="text-paper/60 hover:text-gold-300 transition-colors"
                >
                  <SocialIcon platform={s.platform} size={22} />
                </a>
              ))}
            </div>
          </div>

          {/* Columna 2 — Servicios (qué vendo + cómo me conoces) */}
          <div className="text-sm space-y-2">
            <p className="text-paper font-semibold mb-3 uppercase text-xs tracking-wider">
              Servicios
            </p>
            <p>
              <a href="/broker-hipotecario" className="text-paper/70 hover:text-paper no-underline">
                Broker hipotecario
              </a>
            </p>
            <p>
              <a href="/alta-ici-banco-espana" className="text-paper/70 hover:text-paper no-underline">
                Alta de sociedad como ICI
              </a>
            </p>
            <p>
              <a href="/estructuras-societarias" className="text-paper/70 hover:text-paper no-underline">
                Estructuras societarias
              </a>
            </p>
            <p>
              <a href="/sobre-mi" className="text-paper/70 hover:text-paper no-underline">
                Sobre Toño y el equipo
              </a>
            </p>
            <p>
              <a href="/contacto" className="text-paper/70 hover:text-paper no-underline">
                Contacto
              </a>
            </p>

            <div className="pt-3">
              <p className="text-paper font-semibold mb-3 uppercase text-xs tracking-wider">
                Herramientas
              </p>
              <p>
                <a
                  href="/herramientas"
                  className="inline-flex items-center gap-1 text-gold-300 hover:text-gold-200 font-semibold no-underline"
                >
                  🧮 Catálogo completo
                </a>
                <span className="block text-xs text-paper/45 mt-0.5">
                  {HERRAMIENTAS_LIVE.length} calculadoras propietarias
                </span>
              </p>
              {HERRAMIENTAS_LIVE.map((h) => (
                <p key={h.slug}>
                  <a href={h.url} className="text-paper/70 hover:text-paper no-underline">
                    {h.icon} {h.shortName}
                  </a>
                </p>
              ))}
            </div>
          </div>

          {/* Columna 3 — Recursos */}
          <div className="text-sm space-y-2">
            <p className="text-paper font-semibold mb-3 uppercase text-xs tracking-wider">
              Recursos
            </p>
            <p>
              <a href="/blog" className="text-paper/70 hover:text-paper no-underline">
                Blog
              </a>
            </p>
            <p>
              <a href="/preguntas-frecuentes" className="text-paper/70 hover:text-paper no-underline">
                Preguntas frecuentes
              </a>
            </p>
            <p>
              <a href="/hipoteca-primera-vivienda" className="text-paper/70 hover:text-paper no-underline">
                Hipoteca primera vivienda
              </a>
            </p>
            <p>
              <a
                href="/glosario-hipotecario"
                className="inline-flex items-center gap-1 text-gold-300 hover:text-gold-200 font-semibold no-underline"
              >
                📖 Glosario hipotecario
              </a>
              <span className="block text-xs text-paper/45 mt-0.5">
                30 términos del sector
              </span>
            </p>

            <div className="pt-3">
              <p className="text-paper font-semibold mb-3 uppercase text-xs tracking-wider">
                Ecosistema
              </p>
              <p>
                <a
                  href={SITE_URLS.anici}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-paper/70 hover:text-paper no-underline"
                >
                  ANICI ↗
                </a>
              </p>
              <p>
                <a
                  href={SITE_URLS.inarpa}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-paper/70 hover:text-paper no-underline"
                >
                  INARPA · Formación ↗
                </a>
              </p>
              <p>
                <a
                  href={SITE_URLS.hipobrokers}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-paper/70 hover:text-paper no-underline"
                >
                  Hipobrokers · Podcast ↗
                </a>
              </p>
            </div>
          </div>

          {/* Columna 3 — empresa operativa */}
          <div className="text-sm">
            <p className="text-paper font-semibold mb-3 uppercase text-xs tracking-wider">
              Empresa operativa
            </p>
            <p>{INVERSIA.displayName}</p>
            <p>CIF {INVERSIA.taxId}</p>
            <p>
              {INVERSIA.address.street}
              <br />
              {INVERSIA.address.postalCode} {INVERSIA.address.city}, {INVERSIA.address.region}
            </p>
            <p className="mt-3">
              <a
                href={`mailto:${INVERSIA.email}`}
                className="text-paper/70 hover:text-paper no-underline"
              >
                {INVERSIA.email}
              </a>
            </p>
          </div>
        </div>

        {/* Bloque legal — organizado en 3 grupos semánticos */}
        <div className="border-t border-navy-700 pt-8 mb-8">
          <p className="text-paper font-semibold mb-5 uppercase text-xs tracking-wider">
            Documentación legal
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6 text-sm">
            {LEGAL_GROUPS.map((g) => (
              <div key={g.title}>
                <p className="text-paper/90 font-medium mb-2.5 text-[13px]">{g.title}</p>
                <ul className="space-y-1.5">
                  {g.links.map((l) => (
                    <li key={l.href}>
                      <a
                        href={l.href}
                        className="text-paper/55 hover:text-paper/90 no-underline text-[13px] transition-colors"
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Disclosure formal regulatorio (LSSI + Ley 5/2019) */}
        <div className="border-t border-navy-700 pt-6 pb-4 text-xs text-paper/65 leading-relaxed">
          <p>
            <strong className="text-paper/85">{INVERSIA.legalName}</strong> — CIF {INVERSIA.taxId} —
            Intermediario de Crédito Inmobiliario inscrito en el Banco de España con número{' '}
            <strong className="text-paper/85">{TONO.credentials.bdeId}</strong>, conforme a la Ley
            5/2019, de 15 de marzo, reguladora de los contratos de crédito inmobiliario. La
            intervención como intermediario no garantiza la aprobación de la financiación, que
            depende del análisis y decisión final de la entidad financiera correspondiente.
          </p>
        </div>

        {/* Copyright */}
        <div className="border-t border-navy-700 pt-6 flex flex-col md:flex-row gap-3 md:items-center md:justify-between text-xs text-paper/55">
          <p>© {year} {INVERSIA.displayName}. Todos los derechos reservados.</p>
          <p>
            <a href="/" className="text-paper/70 hover:text-paper no-underline">
              ↑ Volver al inicio
            </a>
          </p>
        </div>
      </Container>
    </footer>
  )
}
