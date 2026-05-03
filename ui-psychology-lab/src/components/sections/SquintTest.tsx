import { useState } from 'react'
import Callout from '../shared/Callout'
import DemoBox from '../shared/DemoBox'

export default function SquintTest() {
  const [blurred, setBlurred] = useState(false)

  return (
    <div className="section-enter">
      <h2 style={{ fontSize: 32, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 8 }}>
        The Squint Test
      </h2>
      <p style={{ fontSize: 17, color: '#8b919a', marginBottom: 24, maxWidth: '70ch', lineHeight: 1.5 }}>
        Squint until details blur. The blobs that remain are your actual visual hierarchy.
      </p>
      <p style={{ marginBottom: 14, maxWidth: '70ch' }}>
        The "Squint Test" (or blur test) is a practical heuristic for evaluating hierarchy. By
        blurring the screen, you strip away the semantic meaning of words and intricate icon details.
        You're left only with the pre-attentive features: high-contrast shapes, large text blocks, and
        colored buttons. If the most important action isn't glaringly obvious when blurred, your
        hierarchy is broken.
      </p>

      <DemoBox label="Squint mode">
        <button className="btn-ghost" onClick={() => setBlurred(b => !b)}>
          {blurred ? 'Clear squint' : 'Toggle squint'}
        </button>
        <div
          className={`squint-target${blurred ? ' blur' : ''}`}
          style={{ background: '#fff', color: '#111', padding: 32, borderRadius: 8, marginTop: 16, transition: 'filter 0.3s' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
            <strong style={{ fontSize: 18 }}>Acme</strong>
            <div style={{ display: 'flex', gap: 16, fontSize: 13, color: '#555' }}>
              <span>Features</span><span>Pricing</span><span>Docs</span><span>Sign in</span>
            </div>
          </div>
          <h2 style={{ fontSize: 36, color: '#111', marginBottom: 12, fontWeight: 700 }}>
            Build interfaces faster.
          </h2>
          <p style={{ color: '#555', maxWidth: '60ch', marginBottom: 24 }}>
            A component library for serious teams.
          </p>
          <button className="btn-primary" style={{ padding: '14px 28px', fontSize: 15 }}>
            Get started free →
          </button>
          <span style={{ marginLeft: 12, color: '#888', fontSize: 13 }}>No credit card required</span>
        </div>
      </DemoBox>

      <Callout>
        When blurred, the primary Call-To-Action (the button) and the main headline should be the only
        distinct elements remaining. That confirms your layout is successfully directing the user's
        attention.
      </Callout>
    </div>
  )
}
