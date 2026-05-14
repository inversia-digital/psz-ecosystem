import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt =
  'Calculadora de capacidad de endeudamiento · ¿Cuánto te daría el banco? · Toño Palacios broker E242'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, #0F1B2D 0%, #1A2D4A 100%)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '60px 80px',
          fontFamily: 'sans-serif',
          color: '#FFFFFF',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div
            style={{
              padding: '6px 16px',
              background: '#C8A852',
              color: '#0F1B2D',
              fontWeight: 700,
              fontSize: 18,
              borderRadius: 4,
              letterSpacing: 1,
            }}
          >
            HERRAMIENTA · PSZ.ES
          </div>
          <div style={{ fontSize: 18, color: '#C8A852', letterSpacing: 1 }}>
            3 escenarios · Server-side
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div
            style={{
              fontSize: 70,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: -1.2,
            }}
          >
            ¿Cuánto te daría
            <br />
            realmente el banco?
          </div>
          <div
            style={{
              fontSize: 26,
              color: 'rgba(255,255,255,0.78)',
              maxWidth: 1000,
              lineHeight: 1.35,
            }}
          >
            Calculadora de capacidad de endeudamiento hipotecaria · 3 escenarios paralelos según
            ratio de esfuerzo · Avisos sobre scoring bancario real.
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '2px solid rgba(200,168,82,0.4)',
            paddingTop: 24,
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: 24, fontWeight: 700 }}>Toño Palacios</div>
            <div style={{ fontSize: 18, color: 'rgba(255,255,255,0.7)' }}>
              Broker hipotecario nº E242 · Presidente de ANICI
            </div>
          </div>
          <div style={{ fontSize: 22, color: '#C8A852', fontWeight: 600 }}>psz.es</div>
        </div>
      </div>
    ),
    { ...size },
  )
}
