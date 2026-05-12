# PSZ Ecosystem

Ecosistema digital de **Toño Palacios** (Antonio Palacios Cambero) — broker hipotecario nº E242 (Banco de España) y presidente de ANICI.

Monorepo Next.js 14 con Turborepo + Payload CMS + Supabase. Aloja:

- **apps/psz** → [psz.es](https://psz.es) (marca personal Toño Palacios)
- **apps/inarpa** → [inarpa.es](https://inarpa.es) (Instituto de Arquitectura Patrimonial)
- **apps/anici** → [anici.es](https://anici.es) (Asociación Nacional de Intermediarios en Crédito Inmobiliario)
- **apps/hipobrokers** → [hipobrokers.com](https://hipobrokers.com) (brokerage hipotecario B2B)
- **apps/admin** → panel multi-site con Payload CMS

## Stack

- **Framework**: Next.js 14 (App Router)
- **Monorepo**: Turborepo + pnpm workspaces
- **CMS**: Payload CMS v3 (embebido en apps/admin)
- **DB**: Supabase (Postgres + Auth + Storage)
- **Hosting**: Vercel
- **Email**: Resend (transactional + broadcasts)
- **Analytics**: PostHog Cloud EU + Google Analytics 4
- **Forms**: native React + webhook Telegram + persistencia Supabase
- **DNS**: Hostinger
- **Styling**: Tailwind CSS

## Estructura

```
apps/
  psz/         → psz.es
  inarpa/      → inarpa.es
  anici/       → anici.es
  hipobrokers/ → hipobrokers.com
  admin/       → panel administración (Payload CMS)

packages/
  ui/             → componentes React compartidos
  design-system/  → tokens, Tailwind config, primitivas
  db/             → cliente Supabase + tipos generados
  cms/            → configuración Payload compartida
  seo/            → generadores schema.org, sitemap, llms.txt
  email/          → plantillas Resend
  config/         → ESLint + TypeScript configs compartidos
```

## Arranque (desarrollo)

```bash
pnpm install
pnpm dev
```

## Scripts disponibles

- `pnpm dev` — arranca todas las apps en desarrollo
- `pnpm build` — build de todas las apps
- `pnpm lint` — lint del monorepo
- `pnpm type-check` — verifica tipos en todo el monorepo
- `pnpm format` — formatea con Prettier
- `pnpm clean` — limpia builds y node_modules

## Propietario

**Inversia Global Digital S.L.** — CIF B75281394
Polígono Alcoz Alto 21, 50410 Cuarte de Huerva, Zaragoza, España

## Plan maestro

El plan completo de fases y tracker vivo está en:
[📋 PSZ Ecosistema — Plan Maestro & Tracker](https://docs.google.com/spreadsheets/d/18iy8SlemNGQRJOqxjXp2qIE72-RJF7bnEmBQr9Rd1vs/edit)
