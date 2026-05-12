import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin · PSZ',
  robots: { index: false, follow: false, nocache: true },
}

export const dynamic = 'force-dynamic'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-paper-soft">
      <header className="border-b border-navy-100 bg-paper">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/admin" className="font-bold text-navy-800 no-underline">
            PSZ · Admin
          </a>
          <nav className="flex gap-4 text-sm">
            <a href="/admin/visitas" className="text-navy-700 hover:text-navy-900">Visitas</a>
            <a href="/" className="text-ink-muted hover:text-navy-700">Salir a la web</a>
          </nav>
        </div>
      </header>
      <div className="max-w-7xl mx-auto px-6 py-8">{children}</div>
    </main>
  )
}
