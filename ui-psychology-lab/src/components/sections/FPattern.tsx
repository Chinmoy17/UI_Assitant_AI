import { useState } from 'react'
import Callout from '../shared/Callout'
import DemoBox from '../shared/DemoBox'

export default function FPattern() {
  const [showHeat, setShowHeat] = useState(false)

  return (
    <div className="section-enter">
      <h2 style={{ fontSize: 32, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 8 }}>
        F-Pattern Scanning
      </h2>
      <p style={{ fontSize: 17, color: '#8b919a', marginBottom: 24, maxWidth: '70ch', lineHeight: 1.5 }}>
        Eye-tracking studies by the Nielsen Norman Group consistently show that users don't read web
        pages linearly — they scan in an F-shaped pattern.
      </p>
      <p style={{ marginBottom: 14, maxWidth: '70ch' }}>
        The eye starts at the top left, scans horizontally across the top, drops down a bit, scans a
        shorter horizontal line, and then systematically drops down the left edge. Anything buried
        deep in the middle or bottom-right of a dense paragraph will be ignored.
      </p>

      <DemoBox label="Visualized heat overlay">
        <button className="btn-ghost" onClick={() => setShowHeat(h => !h)}>
          {showHeat ? 'Hide heatmap' : 'Show heatmap'}
        </button>
        <div
          id="heatmapTarget"
          className={`heatmap${showHeat ? ' show-heat' : ''}`}
          style={{ position: 'relative', background: '#fff', color: '#1a1a1a', padding: 24, borderRadius: 8, marginTop: 16, lineHeight: 1.6 }}
        >
          <h3 style={{ fontSize: 22, color: '#111', marginBottom: 12 }}>
            Why developers love TypeScript: a deep dive
          </h3>
          <p>TypeScript has become the de facto language for building large-scale JavaScript applications. Its type system catches bugs at compile time that would otherwise surface at runtime, dramatically reducing production incidents.</p>
          <p style={{ marginTop: 12 }}>Beyond bug-prevention, TypeScript serves as living documentation. Types describe intent in a way comments cannot, because they are checked by the compiler.</p>
          <p style={{ marginTop: 12 }}>However, adoption requires investment. Teams must learn structural typing, generics, and the nuances of inference. The payoff comes after the learning curve flattens.</p>
        </div>
      </DemoBox>

      <Callout>
        <strong>The Takeaway:</strong> Front-load your important words. Start paragraphs with the
        core concept. Left-aligned bullet points and bolded text act as "anchors" to pull the
        scanning eye back into the content.
      </Callout>
    </div>
  )
}
