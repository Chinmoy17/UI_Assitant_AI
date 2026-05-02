import { useState } from 'react'
import DemoBox from '../shared/DemoBox'

const FONTS = [
  { label: 'System Sans', value: '-apple-system, sans-serif' },
  { label: 'Georgia (serif)', value: 'Georgia, serif' },
  { label: 'Times New Roman', value: "'Times New Roman', serif" },
  { label: 'Courier (mono)', value: "'Courier New', monospace" },
  { label: 'Comic Sans', value: '"Comic Sans MS", cursive' },
]

export default function Typography() {
  const [fontSize, setFontSize] = useState(16)
  const [lineHeight, setLineHeight] = useState(160)
  const [maxWidth, setMaxWidth] = useState(60)
  const [font, setFont] = useState(FONTS[0].value)

  return (
    <div className="section-enter">
      <h2 className="text-[32px] font-bold mb-2 tracking-tight">Typography as Cognition</h2>
      <p className="text-[17px] text-text-dim mb-6 max-w-[70ch]">
        Typography is the bandwidth between written language and human vision. Good typography removes
        friction; bad typography actively disrupts reading mechanics.
      </p>
      <p className="mb-3 max-w-[70ch]">
        Reading is not a smooth, continuous pan across text. The eye performs "saccades"—rapid jumps
        across words—and pauses on "fixations" every 200–250 milliseconds. We recognize the overall
        shape of a word rather than spelling it out letter-by-letter. If lines are too long, the eye
        struggles to track back to the beginning of the next line. If line height is too tight,
        ascenders and descenders collide, breaking word shapes.
      </p>

      <DemoBox label="Tune the typography">
        <p className="mb-4">
          Adjust the variables below. Notice how extreme line lengths (over 75 characters) make it hard
          to track your place, and how font choice impacts the perceived credibility of the text.
        </p>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-[12px] uppercase tracking-wider text-text-dim mb-1">
              Size: {fontSize}px
            </label>
            <input type="range" min={11} max={28} value={fontSize}
              onChange={e => setFontSize(+e.target.value)} className="w-full" />
          </div>
          <div>
            <label className="block text-[12px] uppercase tracking-wider text-text-dim mb-1">
              Line height: {(lineHeight / 100).toFixed(2)}
            </label>
            <input type="range" min={100} max={220} value={lineHeight}
              onChange={e => setLineHeight(+e.target.value)} className="w-full" />
          </div>
          <div>
            <label className="block text-[12px] uppercase tracking-wider text-text-dim mb-1">
              Width: {maxWidth}ch
            </label>
            <input type="range" min={20} max={120} value={maxWidth}
              onChange={e => setMaxWidth(+e.target.value)} className="w-full" />
          </div>
        </div>

        <label className="block text-[12px] uppercase tracking-wider text-text-dim mb-1">Font</label>
        <select
          value={font}
          onChange={e => setFont(e.target.value)}
          className="bg-surface2 text-text-base border border-border px-3 py-2 rounded mb-4 w-60"
        >
          {FONTS.map(f => (
            <option key={f.label} value={f.value}>{f.label}</option>
          ))}
        </select>

        <div
          className="bg-white text-[#1a1a1a] p-8 rounded-lg transition-all duration-200"
          style={{
            fontSize: fontSize,
            lineHeight: (lineHeight / 100).toFixed(2),
            maxWidth: `${maxWidth}ch`,
            fontFamily: font,
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
