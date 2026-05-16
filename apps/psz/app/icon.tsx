import { ImageResponse } from 'next/og'
import { brandMarkDataUri } from './_components/BrandMark'

export const runtime = 'edge'
export const size = { width: 64, height: 64 }
export const contentType = 'image/png'

/**
 * Favicon — marca maestra P6 sobre navy (T blanca · P oro).
 * Sin registro "Nº E242" (ilegible a tamaño favicon).
 */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0F1B3D',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          width={50}
          height={50}
          src={brandMarkDataUri({ size: 50, bg: 'dark', registry: false })}
          alt="Toño Palacios"
        />
      </div>
    ),
    { ...size },
  )
}
