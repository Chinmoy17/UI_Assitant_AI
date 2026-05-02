import { useState } from 'react'
import Callout from '../shared/Callout'
import DemoBox from '../shared/DemoBox'
import StatBadge from '../shared/StatBadge'

function lum(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16) / 255
  const g = parseInt(hex.slice(3, 5), 16) / 255
  const b = parseInt(hex.slice(5, 7), 16) / 255
  const c = [r, g, b].map(v => (v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)))
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]
}

function contrastRatio(hex1: string, hex2: string) {
  const L1 = lum(hex1), L2 = lum(hex2)
  return (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05)
}

export default function ColorContrast() {
  const [bg, setBg] = useState('#ffffff')
  const [fg, setFg] = useState('#777777')

  const ratio = contrastRatio(bg, fg)
  let grade = 'Fail', gradeColor = 'text-danger'
  if (ratio >= 7) { grade = 'AAA'; gradeColor = 'text-success' }
  else if (ratio >= 4.5) { grade = 'AA'; gradeColor = 'text-success' }
  else if (ratio >= 3) { grade = 'AA Large'; gradeColor = 'text-warning' }

  return (
    <div className="section-enter">
      <h2 className="text-[32px] font-bold mb-2 tracking-tight">Color &amp; Contrast</h2>
      <p className="text-[17px] text-text-dim mb-6 max-w-[70ch]">
        Luminance contrast matters far more than hue contrast. Pure color differences without lightness
        differences are invisible to the colorblind and hard to read for everyone.
      </p>
      <p className="mb-3 max-w-[70ch]">
        The Web Content Accessibility Guidelines (WCAG) measure contrast ratios to ensure text remains
        legible across various screens, lighting conditions, and visual impairments (like red-green
        colorblindness). "Designer gray" (light gray text on a white background) is a common
        anti-pattern that sacrifices usability for an illusion of cleanliness.
      </p>

      <DemoBox label="WCAG contrast checker">
        <div className="flex flex-wrap gap-4 items-center mb-4">
          <label className="flex items-center gap-2 text-[14px]">
            BG:
            <input type="color" value={bg} onChange={e => setBg(e.target.value)}
              className="w-14 h-9 border border-border rounded cursor-pointer bg-transparent" />
          </label>
          <label className="flex items-center gap-2 text-[14px]">
            Text:
            <input type="color" value={fg} onChange={e => setFg(e.target.value)}
              className="w-14 h-9 border border-border rounded cursor-pointer bg-transparent" />
          </label>
          <StatBadge>Ratio: <strong className="text-accent">{ratio.toFixed(2)}:1</strong></StatBadge>
          <StatBadge className={gradeColor}>{grade}</StatBadge>
        </div>
        <div
          className="p-6 rounded-md transition-all duration-200"
          style={{ background: bg, color: fg }}
        >
          <h3 className="text-[18px] mb-2">Sample heading</h3>
          <p>The quick brown fox jumps over the lazy dog. Read this paragraph and notice how easy or hard it is on your eyes.</p>
        </div>
      </DemoBox>

      <Callout>
        Aim for WCAG AA standard: a 4.5:1 ratio for normal body text, and 3:1 for large text.
        Try <code className="font-mono bg-surface2 px-1.5 py-0.5 rounded text-[0.9em]">#999999</code> text on a white background — it fails accessibility standards.
      </Callout>
    </div>
  )
}
