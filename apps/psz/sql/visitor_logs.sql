-- ============================================================================
--  visitor_logs — schema para tracking server-side de psz.es
-- ============================================================================
--
-- Cómo usar:
--   1. Crea (o reutiliza) un proyecto Supabase
--   2. Abre SQL Editor → New Query → pega este archivo entero
--   3. Run
--   4. Copia las credenciales en Vercel → Project Settings → Environment Variables:
--        SUPABASE_URL            = https://<ref>.supabase.co
--        SUPABASE_SERVICE_KEY    = (service_role secret — NO la anon)
--        VISITS_INGEST_URL       = https://psz.es/api/visits/log
--        VISITS_INGEST_SECRET    = (genera uno largo random, mín 32 chars)
--        ADMIN_USER              = admin   (o el que quieras)
--        ADMIN_PASS              = (contraseña fuerte)
--   5. Redeploy en Vercel
--   6. Visita psz.es para generar tu primer log y verifícalo en /admin/visitas
--
-- Base legal del tratamiento (RGPD art 6.1.f — interés legítimo):
--   - Prevención de fraude, abuso, ataques
--   - Auditoría de actividad para seguridad
--   - Aviso ya cubierto en /politica-privacidad sección "Datos de navegación"
-- ============================================================================

create extension if not exists "pgcrypto";

create table if not exists public.visitor_logs (
  id              uuid          primary key default gen_random_uuid(),
  ts              timestamptz   not null default now(),

  -- Request básica
  method          text,
  path            text          not null,
  query           text,
  referer         text,
  ua              text,
  lang            text,

  -- Red / geolocalización (Vercel inyecta país/ciudad sin coste)
  ip              text,
  country         text,         -- ISO2 (Vercel geo)
  region          text,         -- ej. "M" (Madrid)
  city            text,

  -- Cloudflare (cuando esté delante)
  cf_ipcountry        text,
  cf_asn              text,
  cf_threat_score     text,
  cf_bot_score        text,
  cf_ja3              text,

  -- Vercel
  vercel_region       text,

  -- Housekeeping
  created_at      timestamptz   not null default now()
);

-- Índices para queries habituales
create index if not exists idx_visitor_logs_ts_desc       on public.visitor_logs (ts desc);
create index if not exists idx_visitor_logs_country       on public.visitor_logs (country);
create index if not exists idx_visitor_logs_path          on public.visitor_logs (path);
create index if not exists idx_visitor_logs_ip            on public.visitor_logs (ip);
create index if not exists idx_visitor_logs_asn           on public.visitor_logs (cf_asn);
-- Índice para detectar tráfico desde motores IA por referer
create index if not exists idx_visitor_logs_referer_lower on public.visitor_logs (lower(referer));

-- RLS: nadie tiene acceso anónimo. Solo la service_role (que usa el ingest
-- y el panel /admin/visitas) puede leer/escribir.
alter table public.visitor_logs enable row level security;

-- Retención automática: 90 días (modifícalo si quieres más/menos)
-- Crea una función que limpia logs antiguos y un cron job
create or replace function public.cleanup_visitor_logs()
returns void
language sql
security definer
as $$
  delete from public.visitor_logs
   where ts < now() - interval '90 days';
$$;

-- Si tienes la extensión pg_cron disponible (Supabase la tiene en planes con cron):
-- select cron.schedule('cleanup-visitor-logs-daily', '0 3 * * *', 'select public.cleanup_visitor_logs()');

-- Vista útil: bots vs humanos (detección heurística por UA)
create or replace view public.visitor_logs_bots as
  select *,
         case
           when ua ~* '(bot|crawler|spider|crawl|preview|fetch)' then true
           else false
         end as is_bot,
         case
           when ua ~* 'gptbot|ccbot|claude|anthropic|google-extended|bytespider' then 'training-bot'
           when ua ~* 'chatgpt-user|perplexitybot|claude-web|gemini-web|googlebot' then 'retrieval-bot'
           when ua ~* '(bot|crawler|spider)' then 'other-bot'
           else 'human'
         end as bot_class
    from public.visitor_logs;

-- Vista útil: tráfico desde IA generativa por referer
create or replace view public.visitor_logs_from_ai as
  select *
    from public.visitor_logs
   where lower(referer) ~ 'openai|chatgpt|perplexity|anthropic|claude|gemini\.google';

comment on table  public.visitor_logs is 'Logs server-side de cada visita pública a psz.es. RGPD art 6.1.f.';
comment on column public.visitor_logs.ip is 'IP raw. Considerar hash sha256 tras 24h si volumen lo requiere.';
