import { ImageResponse } from 'next/og'
import { brandMarkDataUri } from './_components/BrandMark'

export const runtime = 'edge'
export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

/**
 * Apple touch icon — marca maestra P6 sobre navy, con respiración.
 */
export default function AppleIcon() {
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
          width={132}
          height={132}
          src={brandMarkDataUri({ size: 132, bg: 'dark', registry: false })}
          alt="Toño Palacios"
        />
      </div>
    ),
    { ...size },
  )
}
