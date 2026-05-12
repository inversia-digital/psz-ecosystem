/**
 * /admin/visitas — Tabla server-side de las últimas visitas.
 *
 * Datos: Supabase tabla `visitor_logs`, vía REST con SERVICE_KEY.
 * Si Supabase no está configurado, muestra fallback con instrucciones.
 *
 * Acceso protegido por middleware (Basic Auth) — ver /apps/psz/middleware.ts.
 */

interface VisitorLog {
  id?: string
  ts: string
  path: string | null
  method: string | null
  ip: string | null
  country: string | null
  region: string | null
  city: string | null
  cf_asn: string | null
  cf_threat_score: string | null
  cf_bot_score: string | null
  referer: string | null
  ua: string | null
  lang: string | null
}

async function fetchLogs(filter: { country?: string; path?: string; refererLike?: string }): Promise<{
  rows: VisitorLog[]
  error: string | null
  configured: boolean
}> {
  const url = process.env.SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_KEY
  if (!url || !key) return { rows: [], error: null, configured: false }

  const qs = new URLSearchParams()
  qs.set('select', 'id,ts,path,method,ip,country,region,city,cf_asn,cf_threat_score,cf_bot_score,referer,ua,lang')
  qs.set('order', 'ts.desc')
  qs.set('limit', '500')
  if (filter.country) qs.append('country', `eq.${filter.country}`)
  if (filter.path) qs.append('path', `like.*${filter.path}*`)
  if (filter.refererLike) qs.append('referer', `ilike.*${filter.refererLike}*`)

  try {
    const res = await fetch(`${url}/rest/v1/visitor_logs?${qs.toString()}`, {
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
      },
      cache: 'no-store',
    })
    if (!res.ok) return { rows: [], error: `Supabase ${res.status}`, configured: true }
    const rows = (await res.json()) as VisitorLog[]
    return { rows, error: null, configured: true }
  } catch (e) {
    return { rows: [], error: String(e), configured: true }
  }
}

export default async function VisitasPage({
  searchParams,
}: {
  searchParams: { country?: string; path?: string; ref?: string }
}) {
  const { rows, error, configured } = await fetchLogs({
    country: searchParams.country,
    path: searchParams.path,
    refererLike: searchParams.ref,
  })

  if (!configured) {
    return (
      <div>
        <h1 className="text-3xl font-bold text-navy-800 mb-2">Visitas</h1>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mt-6">
          <h2 className="text-lg font-semibold text-amber-900 mb-3">⚠ Persistencia Supabase no configurada</h2>
          <p className="text-amber-800 mb-4">
            El middleware ya está capturando cada visita y volcándola como JSON estructurado a los logs de Vercel.
            Puedes consultarlas ahora mismo en:
          </p>
          <a
            href="https://vercel.com/dashboard"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-amber-900 text-amber-50 px-4 py-2 rounded-lg font-semibold no-underline"
          >
            Vercel Dashboard → tu proyecto psz-ecosystem-psz → Logs ↗
          </a>
          <p className="text-amber-800 mt-4 mb-2">
            Para tener una tabla integrada con filtros (este panel), configura Supabase:
          </p>
          <ol className="list-decimal pl-6 text-sm text-amber-900 space-y-2">
            <li>Crea proyecto en <code>supabase.com</code> (free tier basta)</li>
            <li>Ejecuta el SQL del archivo <code>apps/psz/sql/visitor_logs.sql</code> en el SQL Editor</li>
            <li>Copia URL y service_role key</li>
            <li>En Vercel → Project Settings → Environment Variables añade:
              <pre className="bg-amber-100 p-2 rounded mt-1 text-xs">
SUPABASE_URL=https://xxx.supabase.co{'\n'}
SUPABASE_SERVICE_KEY=eyJhbGc...{'\n'}
VISITS_INGEST_URL=https://psz.es/api/visits/log{'\n'}
VISITS_INGEST_SECRET=&lt;genera uno random largo&gt;
              </pre>
            </li>
            <li>Redeploy</li>
          </ol>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div>
        <h1 className="text-3xl font-bold text-navy-800 mb-2">Visitas</h1>
        <div className="bg-red-50 border border-red-200 text-red-900 rounded-xl p-6">
          Error: {error}
        </div>
      </div>
    )
  }

  // Aggregations
  const last24h = rows.filter((r) => new Date(r.ts).getTime() > Date.now() - 86400000)
  const uniqueIps = new Set(rows.map((r) => r.ip).filter(Boolean)).size
  const topCountries = aggregate(rows, (r) => r.country || '?', 5)
  const aiReferrers = rows.filter((r) =>
    /openai|perplexity|anthropic|gemini|chatgpt|claude/i.test(r.referer || '')
  )

  return (
    <div>
      <div className="flex items-baseline justify-between mb-6">
        <h1 className="text-3xl font-bold text-navy-800">Visitas</h1>
        <p className="text-sm text-ink-muted">Últimas {rows.length} · Supabase OK</p>
      </div>

      {/* KPI strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Kpi label="Últimas 24h" value={last24h.length} />
        <Kpi label="IPs únicas" value={uniqueIps} />
        <Kpi label="Países top" value={topCountries.map((t) => t.key).join(' · ') || '—'} small />
        <Kpi label="Tráfico desde IA" value={aiReferrers.length} hint="OpenAI / Perplexity / Claude / Gemini" />
      </div>

      {/* Filtros */}
      <form className="bg-paper-card border border-navy-100 rounded-xl p-4 mb-6 flex flex-wrap gap-3 items-end">
        <div>
          <label className="block text-xs uppercase tracking-wider text-ink-muted mb-1">País (ISO2)</label>
          <input name="country" defaultValue={searchParams.country || ''} placeholder="ES, US, ..." className="border border-navy-200 rounded-lg px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-wider text-ink-muted mb-1">Path contiene</label>
          <input name="path" defaultValue={searchParams.path || ''} placeholder="/broker..." className="border border-navy-200 rounded-lg px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-wider text-ink-muted mb-1">Referer contiene</label>
          <input name="ref" defaultValue={searchParams.ref || ''} placeholder="google, openai, ..." className="border border-navy-200 rounded-lg px-3 py-2 text-sm" />
        </div>
        <button type="submit" className="bg-navy-800 text-paper rounded-lg px-4 py-2 text-sm font-semibold">Filtrar</button>
        <a href="/admin/visitas" className="text-ink-muted text-sm hover:text-navy-700 no-underline">Reset</a>
      </form>

      {/* Tabla */}
      <div className="overflow-x-auto bg-paper-card border border-navy-100 rounded-xl">
        <table className="min-w-full text-xs">
          <thead className="bg-paper-soft border-b border-navy-100">
            <tr className="text-left">
              <Th>Cuándo</Th>
              <Th>País</Th>
              <Th>Ciudad</Th>
              <Th>ASN</Th>
              <Th>IP</Th>
              <Th>Método</Th>
              <Th>Path</Th>
              <Th>Referer</Th>
              <Th>UA</Th>
              <Th>Lang</Th>
              <Th>Bot</Th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && (
              <tr>
                <td colSpan={11} className="text-center text-ink-muted py-12">Sin visitas que coincidan.</td>
              </tr>
            )}
            {rows.map((r, i) => (
              <tr key={r.id || i} className="border-b border-navy-50 hover:bg-paper-soft">
                <Td>{formatTs(r.ts)}</Td>
                <Td>{r.country || '?'}</Td>
                <Td>{r.city || '?'}</Td>
                <Td>{r.cf_asn || '—'}</Td>
                <Td className="font-mono">{r.ip}</Td>
                <Td>{r.method}</Td>
                <Td className="font-mono">{r.path}</Td>
                <Td className="max-w-xs truncate" title={r.referer || ''}>{r.referer || '—'}</Td>
                <Td className="max-w-xs truncate" title={r.ua || ''}>{shortUa(r.ua)}</Td>
                <Td>{r.lang}</Td>
                <Td>{r.cf_bot_score || '—'}</Td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function Kpi({ label, value, hint, small }: { label: string; value: number | string; hint?: string; small?: boolean }) {
  return (
    <div className="bg-paper-card border border-navy-100 rounded-xl p-4">
      <p className="text-xs uppercase tracking-wider text-ink-muted">{label}</p>
      <p className={small ? 'text-lg font-bold text-navy-800 mt-1' : 'text-3xl font-bold text-navy-800 mt-1'}>{value}</p>
      {hint && <p className="text-xs text-ink-muted mt-1">{hint}</p>}
    </div>
  )
}

function Th({ children }: { children: React.ReactNode }) {
  return <th className="px-3 py-2 text-xs uppercase tracking-wider text-ink-muted">{children}</th>
}

function Td({ children, className = '', title }: { children: React.ReactNode; className?: string; title?: string }) {
  return <td className={`px-3 py-2 ${className}`} title={title}>{children}</td>
}

function aggregate<T>(rows: T[], keyFn: (r: T) => string, top = 5) {
  const counts = new Map<string, number>()
  for (const r of rows) {
    const k = keyFn(r)
    counts.set(k, (counts.get(k) || 0) + 1)
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, top)
    .map(([key, count]) => ({ key, count }))
}

function formatTs(ts: string) {
  const d = new Date(ts)
  return d.toLocaleString('es-ES', { dateStyle: 'short', timeStyle: 'medium' })
}

function shortUa(ua: string | null) {
  if (!ua) return '—'
  if (/bot|crawler|spider/i.test(ua)) {
    const m = ua.match(/([A-Za-z]+(?:bot|crawler|spider))/i)
    return m ? m[1] : 'bot'
  }
  if (/iPhone|iPad/.test(ua)) return 'iOS'
  if (/Android/.test(ua)) return 'Android'
  if (/Macintosh/.test(ua)) return 'macOS'
  if (/Windows/.test(ua)) return 'Windows'
  if (/Linux/.test(ua)) return 'Linux'
  return ua.slice(0, 40)
}
