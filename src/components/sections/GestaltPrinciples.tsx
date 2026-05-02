import { useState } from 'react'
import Callout from '../shared/Callout'
import DemoBox from '../shared/DemoBox'

function ProximityDemo() {
  const [gap, setGap] = useState(8)
  return (
    <>
      <p style={{ marginBottom: 16, color: '#8b919a', fontSize: 14 }}>
        Elements close to each other are perceived as a single group. Move the slider to change
        the horizontal gap. Notice how your brain switches from seeing "columns" to "rows" purely
        based on whitespace.
      </p>
      <label style={{ display: 'block', fontSize: 12, color: '#8b919a', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 4 }}>
        Horizontal gap: {gap}px
      </label>
      <input type="range" min={2} max={60} value={gap}
        onChange={e => setGap(+e.target.value)} style={{ width: '100%' }} />
      <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
        {[0, 1, 2].map(r => (
          <div key={r} style={{ display: 'flex', gap: `${gap}px` }}>
            {Array.from({ length: 8 }).map((_, c) => (
              <div key={c} style={{ width: 14, height: 14, background: '#6366f1', borderRadius: '50%' }} />
            ))}
          </div>
        ))}
      </div>
    </>
  )
}

function SimilarityDemo() {
  const [similar, setSimilar] = useState(false)
  const colors = ['#6366f1', '#10b981', '#f59e0b', '#ef4444']
  return (
    <>
      <p style={{ marginBottom: 16, color: '#8b919a', fontSize: 14 }}>
        Elements that look similar are perceived to have the same function. Toggle similarity below.
        With identical colors it's just a 4×4 grid; when colored by columns the brain groups them
        vertically, ignoring the equal spacing.
      </p>
      <button className="btn-ghost" onClick={() => setSimilar(s => !s)}>Toggle similarity</button>
      <div style={{ marginTop: 20, display: 'grid', gridTemplateColumns: 'repeat(4, 24px)', gap: 8 }}>
        {Array.from({ length: 16 }, (_, i) => (
          <div key={i} style={{ width: 14, height: 14, borderRadius: '50%',
            background: similar ? colors[i % 4] : '#6366f1' }} />
        ))}
      </div>
    </>
  )
}

export default function GestaltPrinciples() {
  return (
    <div className="section-enter">
      <h2 style={{ fontSize: 32, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 8 }}>
        Gestalt Principles
      </h2>
      <p style={{ fontSize: 17, color: '#8b919a', marginBottom: 24, maxWidth: '70ch', lineHeight: 1.5 }}>
        The brain perceives wholes before parts. Founded by the Berlin School of experimental
        psychology in the 1920s, Gestalt theory explains how we group disparate elements.
      </p>
      <p style={{ marginBottom: 14, maxWidth: '70ch' }}>
        The human mind seeks order in chaos. Instead of processing every individual element on a
        screen, it groups them into larger logical chunks. This chunking is automatic and highly
        predictable based on physical properties like distance and appearance.
      </p>

      <DemoBox label="Law of Proximity">
        <ProximityDemo />
      </DemoBox>

      <DemoBox label="Law of Similarity">
        <SimilarityDemo />
      </DemoBox>

      <Callout>
        <strong>The Takeaway:</strong> White space is not empty space; it is a structural tool.
        Form labels must hug their inputs (proximity) tighter than the gap to the next field.
        Same-colored buttons across an app feel like they do the same thing (similarity). If two
        things are conceptually related, they must be visually grouped.
      </Callout>
    </div>
  )
}
