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

export default function ColorContrast() {
  const [bg, setBg] = useState('#ffffff')
  const [fg, setFg] = useState('#777777')

  const L1 = lum(bg), L2 = lum(fg)
  const ratio = (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05)
  const grade = ratio >= 7 ? 'AAA' : ratio >= 4.5 ? 'AA' : ratio >= 3 ? 'AA Large' : 'Fail'
  const gradeColor = ratio >= 4.5 ? '#10b981' : ratio >= 3 ? '#f59e0b' : '#ef4444'

  return (
    <div className="section-enter">
      <h2 style={{ fontSize: 32, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 8 }}>
        Color &amp; Contrast
      </h2>
      <p style={{ fontSize: 17, color: '#8b919a', marginBottom: 24, maxWidth: '70ch', lineHeight: 1.5 }}>
        Luminance contrast matters far more than hue contrast. Pure color differences without lightness
        differences are invisible to the colorblind and hard to read for everyone.
      </p>
      <p style={{ marginBottom: 14, maxWidth: '70ch' }}>
        The Web Content Accessibility Guidelines (WCAG) measure contrast ratios to ensure text remains
        legible across various screens, lighting conditions, and visual impairments. "Designer gray"
        (light gray text on white) is a common anti-pattern that sacrifices usability for an illusion
        of cleanliness.
      </p>

      <DemoBox label="WCAG contrast checker">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center', marginBottom: 16 }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14 }}>
            Background:
            <input type="color" value={bg} onChange={e => setBg(e.target.value)}
              style={{ width: 52, height: 36, border: '1px solid #2a2f37', borderRadius: 4, background: 'none', cursor: 'pointer' }} />
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14 }}>
            Text:
            <input type="color" value={fg} onChange={e => setFg(e.target.value)}
              style={{ width: 52, height: 36, border: '1px solid #2a2f37', borderRadius: 4, background: 'none', cursor: 'pointer' }} />
          </label>
          <StatBadge>Ratio: <strong style={{ color: '#6366f1' }}>{ratio.toFixed(2)}:1</strong></StatBadge>
          <StatBadge><strong style={{ color: gradeColor }}>{grade}</strong></StatBadge>
        </div>
        <div style={{ background: bg, color: fg, padding: 24, borderRadius: 6, transition: 'all 0.2s' }}>
          <h3 style={{ fontSize: 18, marginBottom: 8 }}>Sample heading</h3>
          <p>The quick brown fox jumps over the lazy dog. Read this paragraph and notice how easy or hard it is on your eyes.</p>
        </div>
      </DemoBox>

      <Callout>
        Aim for WCAG AA standard: a 4.5:1 ratio for normal body text, and 3:1 for large text.
        Try <code className="code-inline">#999999</code> text on a white background — it fails
        accessibility standards.
      </Callout>
    </div>
  )
}
