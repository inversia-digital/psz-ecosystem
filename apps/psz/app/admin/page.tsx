export default function AdminHome() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-navy-800 mb-2">Panel de administración</h1>
      <p className="text-ink-soft mb-8">
        Solo accesible con credenciales Basic Auth (ADMIN_USER / ADMIN_PASS).
        No indexable. No enlazado desde la web pública.
      </p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <a
          href="/admin/visitas"
          className="block bg-paper-card border border-navy-100 rounded-xl p-6 hover:border-gold-400 hover:shadow-card transition-all no-underline"
        >
          <h2 className="text-xl font-semibold text-navy-800 mb-1">Visitas</h2>
          <p className="text-sm text-ink-muted">
            Log server-side de cada request a la web. IP, país, ASN, UA, referer, path.
          </p>
        </a>
      </div>
    </div>
  )
}
