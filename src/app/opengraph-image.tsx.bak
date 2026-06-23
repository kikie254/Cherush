import { ImageResponse } from 'next/og'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #1D2A22, #C9A96E)',
          color: 'white',
          padding: '72px'
        }}
      >
        <div style={{ fontSize: 28, letterSpacing: 6, textTransform: 'uppercase', opacity: 0.8 }}>Cherush Stay Iten</div>
        <div style={{ marginTop: 28, fontSize: 84, lineHeight: 1 }}>Train. Recover. Belong.</div>
        <div style={{ marginTop: 20, fontSize: 30, opacity: 0.85 }}>Boutique hospitality in Iten, Kenya</div>
      </div>
    ),
    size
  )
}
