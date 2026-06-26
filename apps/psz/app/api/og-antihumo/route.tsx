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
const GREEN = '#1FA971'

const BAR_TRACK = 700 // px del carril común sobre el que se comparan las barras
const BAR_MIN = 70 // px mínimos de relleno para que un valor pequeño siga viéndose

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
        gastosAnualesEur: Number.isFinite(parseEsNumber(sp.get('gastos'))) ? parseEsNumber(sp.get('gastos')) : undefined,
        anunciada: Number.isFinite(parseEsNumber(sp.get('anunciada'))) ? parseEsNumber(sp.get('anunciada')) : null,
      })
    : null

  const honesto = r?.veredicto === 'coherente'

  // Arriba la cifra que te "venden" (anunciada o, si no, la bruta); abajo la neta
  // real. Ambas sobre el mismo carril → la diferencia de relleno cuenta la historia.
  const topVal = r ? (r.anunciada != null ? r.anunciada : r.brutaPct) : 0
  const topLabel = r ? (r.anunciada != null ? 'TE ANUNCIAN' : 'RENTABILIDAD BRUTA') : ''
  const realVal = r ? r.netaPct : 0
  const scaleMax = Math.max(topVal, realVal, 0.1)
  const wTop = Math.max(BAR_MIN, Math.round((topVal / scaleMax) * BAR_TRACK))
  const wReal = Math.max(BAR_MIN, Math.round((realVal / scaleMax) * BAR_TRACK))

  const trackStyle = {
    display: 'flex',
    width: BAR_TRACK,
    height: 52,
    borderRadius: 9,
    background: 'rgba(255,255,255,0.07)',
    border: '1px solid rgba(255,255,255,0.10)',
    flexShrink: 0,
  } as const

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: `linear-gradient(140deg, #0B1422 0%, ${NAVY} 45%, #1A2D4A 100%)`,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '44px 60px',
          fontFamily: 'sans-serif',
          color: '#fff',
          position: 'relative',
        }}
      >
        {/* glow decorativo esquina */}
        <div
          style={{
            position: 'absolute',
            top: -160,
            right: -120,
            width: 460,
            height: 460,
            borderRadius: 999,
            display: 'flex',
            background: honesto
              ? 'radial-gradient(closest-side, rgba(31,169,113,0.30), rgba(31,169,113,0))'
              : 'radial-gradient(closest-side, rgba(229,72,77,0.28), rgba(229,72,77,0))',
          }}
        />

        {/* top */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', padding: '7px 18px', background: GOLD, color: NAVY, fontWeight: 800, fontSize: 19, borderRadius: 6, letterSpacing: 1 }}>
            TEST ANTI-HUMO · PSZ.ES
          </div>
          {r && (
            <div
              style={{
                display: 'flex',
                padding: '8px 22px',
                background: honesto ? GREEN : RED,
                color: '#fff',
                fontWeight: 800,
                fontSize: 22,
                borderRadius: 999,
                boxShadow: `0 8px 24px ${honesto ? 'rgba(31,169,113,0.45)' : 'rgba(229,72,77,0.45)'}`,
              }}
            >
              {r.veredictoEtiqueta}
            </div>
          )}
        </div>

        {/* center */}
        {r ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
            {/* barra: lo que te venden */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ display: 'flex', fontSize: 21, fontWeight: 700, letterSpacing: 2, color: 'rgba(255,255,255,0.55)' }}>
                {topLabel}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
                <div style={trackStyle}>
                  <div style={{ display: 'flex', width: wTop, height: '100%', borderRadius: 9, background: 'linear-gradient(90deg, #E5484D 0%, #F4756F 100%)' }} />
                </div>
                <div style={{ display: 'flex', fontSize: 52, fontWeight: 900, color: RED, textDecoration: honesto ? 'none' : 'line-through' }}>
                  {fmtPct(topVal)}
                </div>
              </div>
            </div>

            {/* barra: lo que cobras de verdad */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ display: 'flex', fontSize: 21, fontWeight: 800, letterSpacing: 2, color: GOLD }}>
                LO QUE COBRAS DE VERDAD
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
                <div style={trackStyle}>
                  <div style={{ display: 'flex', width: wReal, height: '100%', borderRadius: 9, background: `linear-gradient(90deg, #C8A852 0%, #E6C875 100%)`, boxShadow: '0 8px 26px rgba(200,168,82,0.45)' }} />
                </div>
                <div style={{ display: 'flex', fontSize: 92, fontWeight: 900, color: '#fff', letterSpacing: -2, lineHeight: 1 }}>
                  {fmtPct(realVal)}
                </div>
              </div>
            </div>

            {/* bloque alarma / dinero */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                alignSelf: 'flex-start',
                gap: 16,
                marginTop: 4,
                padding: '13px 26px',
                borderRadius: 14,
                background: honesto ? 'rgba(31,169,113,0.16)' : 'rgba(229,72,77,0.16)',
                border: `2px solid ${honesto ? GREEN : RED}`,
              }}
            >
              <div style={{ display: 'flex', fontSize: 24, fontWeight: 800, letterSpacing: 1, color: '#fff' }}>
                {honesto ? 'CUADRA CON LO REAL ·' : 'TE OCULTAN'}
              </div>
              {!honesto && (
                <div style={{ display: 'flex', fontSize: 46, fontWeight: 900, color: RED }}>
                  {fmtEur(Math.abs(r.gapEurAnio))}
                </div>
              )}
              <div style={{ display: 'flex', fontSize: 23, color: 'rgba(255,255,255,0.78)' }}>
                {honesto ? 'aquí sí cuentan los gastos' : 'al año'}
              </div>
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <div style={{ display: 'flex', fontSize: 66, fontWeight: 900, lineHeight: 1.08, letterSpacing: -1 }}>El 10% que ves</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 20, fontSize: 66, fontWeight: 900, lineHeight: 1.08, letterSpacing: -1 }}>
                <div style={{ display: 'flex' }}>casi nunca es el que</div>
                <div style={{ display: 'flex', color: GOLD }}>cobras</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignSelf: 'flex-start', padding: '12px 24px', borderRadius: 12, background: 'rgba(200,168,82,0.16)', border: `2px solid ${GOLD}`, fontSize: 27, color: GOLD, fontWeight: 800 }}>
              Pon tus números y mira el de verdad
            </div>
          </div>
        )}

        {/* bottom */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '2px solid rgba(200,168,82,0.4)', paddingTop: 18 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img width={48} height={48} alt="" src={brandMarkDataUri({ size: 48, bg: 'dark', registry: false })} />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', fontSize: 24, fontWeight: 700 }}>Toño Palacios</div>
              <div style={{ display: 'flex', fontSize: 17, color: 'rgba(255,255,255,0.7)' }}>Broker hipotecario nº E242</div>
            </div>
          </div>
          <div style={{ display: 'flex', fontSize: 22, color: GOLD, fontWeight: 600 }}>psz.es/test-anti-humo-inmobiliario</div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  )
}
