import { ImageResponse } from 'next/og'
import type { NextRequest } from 'next/server'
import { computeAntiHumo, parseEsNumber } from '../../test-anti-humo-inmobiliario/calc'
import { brandMarkDataUri } from '../../_components/BrandMark'

export const runtime = 'edge'

const fmtPct = (n: number) => `${n.toFixed(2).replace('.', ',')}%`
const fmtEur = (n: number) =>
  new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n)

const NAVY = '#0F1B2D'
const GOLD = '#C8A852'
const RED = '#E5484D'

export async function GET(req: NextRequest) {
  const sp = req.nextUrl.searchParams
  const precio = parseEsNumber(sp.get('precio'))
  const alquiler = parseEsNumber(sp.get('alquiler'))

  // Fallback (card genérica) si faltan datos clave
  const ok = Number.isFinite(precio) && precio > 0 && Number.isFinite(alquiler) && alquiler > 0
  const r = ok
    ? computeAntiHumo({
        precio,
        alquiler,
        ccaaCode: sp.get('ccaa') || 'VC',
        reforma: parseEsNumber(sp.get('reforma')) || 0,
        gastosCompra: Number.isFinite(parseEsNumber(sp.get('gc'))) ? parseEsNumber(sp.get('gc')) : undefined,
        honorarios: Number.isFinite(parseEsNumber(sp.get('hon'))) ? parseEsNumber(sp.get('hon')) : 0,
        gastosAnualesPct: Number.isFinite(parseEsNumber(sp.get('gastos'))) ? parseEsNumber(sp.get('gastos')) : undefined,
        anunciada: Number.isFinite(parseEsNumber(sp.get('anunciada'))) ? parseEsNumber(sp.get('anunciada')) : null,
      })
    : null

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: `linear-gradient(135deg, ${NAVY} 0%, #1A2D4A 100%)`,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '54px 70px',
          fontFamily: 'sans-serif',
          color: '#fff',
        }}
      >
        {/* top */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ display: 'flex', padding: '6px 16px', background: GOLD, color: NAVY, fontWeight: 800, fontSize: 18, borderRadius: 4, letterSpacing: 1 }}>
              TEST ANTI-HUMO · PSZ.ES
            </div>
          </div>
          {r && (
            <div style={{ display: 'flex', padding: '6px 16px', background: r.veredicto === 'coherente' ? '#1FA971' : RED, color: '#fff', fontWeight: 800, fontSize: 20, borderRadius: 999 }}>
              {r.veredictoEtiqueta}
            </div>
          )}
        </div>

        {/* center */}
        {r ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {r.anunciada != null ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 18 }}>
                  <div style={{ fontSize: 30, color: 'rgba(255,255,255,0.7)' }}>Te anuncian</div>
                  <div style={{ fontSize: 86, fontWeight: 900, color: RED, textDecoration: 'line-through' }}>{fmtPct(r.anunciada)}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 18 }}>
                  <div style={{ fontSize: 30, color: GOLD }}>Lo que de verdad cobras</div>
                  <div style={{ fontSize: 110, fontWeight: 900, color: '#fff', letterSpacing: -2 }}>{fmtPct(r.netaPct)}</div>
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 24 }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <div style={{ fontSize: 26, color: 'rgba(255,255,255,0.6)' }}>Bruta (la del anuncio)</div>
                  <div style={{ fontSize: 84, fontWeight: 900, color: 'rgba(255,255,255,0.55)' }}>{fmtPct(r.brutaPct)}</div>
                </div>
                <div style={{ fontSize: 60, color: GOLD }}>→</div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <div style={{ fontSize: 26, color: GOLD }}>Neta real (la que cobras)</div>
                  <div style={{ fontSize: 100, fontWeight: 900, color: '#fff' }}>{fmtPct(r.netaPct)}</div>
                </div>
              </div>
            )}
            <div style={{ display: 'flex', marginTop: 10, fontSize: 34, fontWeight: 800, color: GOLD }}>
              Te ocultan {fmtEur(Math.abs(r.gapEurAnio))} al año
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ fontSize: 64, fontWeight: 900, lineHeight: 1.05, letterSpacing: -1 }}>
              El 10% que ves casi
              <br />
              nunca es el 10% que cobras
            </div>
            <div style={{ fontSize: 30, color: GOLD, fontWeight: 700 }}>¿Te dan la bruta como si fuera la neta? Compruébalo.</div>
          </div>
        )}

        {/* bottom */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '2px solid rgba(200,168,82,0.4)', paddingTop: 22 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img width={48} height={48} alt="" src={brandMarkDataUri({ size: 48, bg: 'dark', registry: false })} />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ fontSize: 24, fontWeight: 700 }}>Toño Palacios</div>
              <div style={{ fontSize: 17, color: 'rgba(255,255,255,0.7)' }}>Broker hipotecario nº E242</div>
            </div>
          </div>
          <div style={{ fontSize: 22, color: GOLD, fontWeight: 600 }}>psz.es/test-anti-humo-inmobiliario</div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  )
}
