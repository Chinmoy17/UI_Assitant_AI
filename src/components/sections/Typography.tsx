import { useState } from 'react'
import DemoBox from '../shared/DemoBox'

const FONTS = [
  { label: 'System Sans',     value: '-apple-system, sans-serif' },
  { label: 'Georgia (serif)', value: 'Georgia, serif' },
  { label: 'Times New Roman', value: "'Times New Roman', serif" },
  { label: 'Courier (mono)',  value: "'Courier New', monospace" },
  { label: 'Comic Sans',      value: '"Comic Sans MS", cursive' },
]

export default function Typography() {
  const [fontSize,   setFontSize]   = useState(16)
  const [lineHeight, setLineHeight] = useState(160)
  const [maxWidth,   setMaxWidth]   = useState(60)
  const [font,       setFont]       = useState(FONTS[0].value)

  return (
    <div className="section-enter">
      <h2 style={{ fontSize: 32, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 8 }}>
        Typography as Cognition
      </h2>
      <p style={{ fontSize: 17, color: '#8b919a', marginBottom: 24, maxWidth: '70ch', lineHeight: 1.5 }}>
        Typography is the bandwidth between written language and human vision. Good typography removes
        friction; bad typography actively disrupts reading mechanics.
      </p>
      <p style={{ marginBottom: 14, maxWidth: '70ch' }}>
        Reading is not a smooth, continuous pan across text. The eye performs "saccades" — rapid jumps
        across words — and pauses on "fixations" every 200–250 milliseconds. We recognize the overall
        shape of a word rather than spelling it out letter-by-letter. If lines are too long, the eye
        struggles to track back to the beginning of the next line.
      </p>

      <DemoBox label="Tune the typography">
        <p style={{ marginBottom: 16, color: '#8b919a', fontSize: 14 }}>
          Adjust the variables below. Notice how extreme line lengths (over 75 characters) make it
          hard to track your place, and how font choice impacts perceived credibility.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 16 }}>
          {[
            { label: `Size: ${fontSize}px`,       min: 11, max: 28, val: fontSize,    set: setFontSize },
            { label: `Line height: ${(lineHeight/100).toFixed(2)}`, min: 100, max: 220, val: lineHeight, set: setLineHeight },
            { label: `Width: ${maxWidth}ch`,       min: 20, max: 120, val: maxWidth,   set: setMaxWidth },
          ].map(ctrl => (
            <div key={ctrl.label}>
              <label style={{ display: 'block', fontSize: 12, color: '#8b919a', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 4 }}>
                {ctrl.label}
              </label>
              <input type="range" min={ctrl.min} max={ctrl.max} value={ctrl.val}
                onChange={e => ctrl.set(+e.target.value)} style={{ width: '100%' }} />
            </div>
          ))}
        </div>

        <label style={{ display: 'block', fontSize: 12, color: '#8b919a', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 6 }}>
          Font
        </label>
        <select
          value={font} onChange={e => setFont(e.target.value)}
          className="ctrl-select"
          style={{ width: 240, marginBottom: 16 }}
        >
          {FONTS.map(f => <option key={f.label} value={f.value}>{f.label}</option>)}
        </select>

        <div
          style={{
            background: '#fff', color: '#1a1a1a', padding: 32, borderRadius: 8,
            fontSize, lineHeight: (lineHeight / 100).toFixed(2),
            maxWidth: `${maxWidth}ch`, fontFamily: font, transition: 'all 0.2s',
          }}
        >
          <h3 style={{ fontSize: '1.6em', marginBottom: '0.5em', color: '#111' }}>
            The mechanics of reading
          </h3>
          <p style={{ color: '#333' }}>
            Reading isn't linear scanning of letters. The eye performs saccades — rapid jumps —
            pausing on fixations every 200–250ms, recognizing word shapes more than individual
            characters. When line length exceeds about 75 characters, the eye loses its place
            returning to the next line.
          </p>
          <p style={{ color: '#333', marginTop: '1em' }}>
            Try Comic Sans. The same content suddenly feels less credible — the Baskerville Effect
            in reverse. Typography signals authority before content is read.
          </p>
        </div>
      </DemoBox>
    </div>
  )
}
