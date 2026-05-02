import { useState } from 'react'
import DemoBox from '../shared/DemoBox'

export default function VisualHierarchy() {
  const [flat, setFlat] = useState(false)

  return (
    <div className="section-enter">
      <h2 style={{ fontSize: 32, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 8 }}>
        Visual Hierarchy
      </h2>
      <p style={{ fontSize: 17, color: '#8b919a', marginBottom: 24, maxWidth: '70ch', lineHeight: 1.5 }}>
        Hierarchy is the deliberate manipulation of pre-attentive features (size, color, contrast,
        spacing) to ensure the brain processes elements in the exact order of their importance.
      </p>
      <p style={{ marginBottom: 14, maxWidth: '70ch' }}>
        Without clear hierarchy, everything on the screen screams for attention equally. This results
        in visual white noise, causing anxiety and a spike in cognitive load as the user has to
        manually evaluate what to read first. Good hierarchy acts as a trail of breadcrumbs for the eye.
      </p>

      <DemoBox label="Toggle hierarchy">
        <p style={{ marginBottom: 16, color: '#8b919a', fontSize: 14 }}>
          Click the button to remove visual hierarchy. Same text, but notice the massive difference
          in how much cognitive effort is required to parse what this card is about.
        </p>
        <button className="btn-ghost" onClick={() => setFlat(f => !f)}>
          {flat ? 'Restore hierarchy' : 'Remove hierarchy'}
        </button>
        <div
          id="hierCard"
          className={`hier-card${flat ? ' flat' : ''}`}
          style={{ background: '#fff', color: '#1a1a1a', padding: 24, borderRadius: 8, marginTop: 16, transition: 'all 0.3s' }}
        >
          <div style={{ fontSize: 11, color: '#888', textTransform: 'uppercase', letterSpacing: 1 }}>New Release</div>
          <h3 style={{ fontSize: 24, margin: '4px 0 8px', color: '#111', fontWeight: 700 }}>Pro Plan</h3>
          <p style={{ color: '#555', marginBottom: 16 }}>Everything you need to ship faster.</p>
          <div style={{ fontSize: 32, fontWeight: 700, color: '#111' }}>
            $29<span style={{ fontSize: 14, color: '#888', fontWeight: 400 }}>/mo</span>
          </div>
          <button className="btn-primary" style={{ marginTop: 16 }}>Start free trial</button>
        </div>
      </DemoBox>
    </div>
  )
}
