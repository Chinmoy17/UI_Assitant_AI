import { useState } from 'react'
import DemoBox from '../shared/DemoBox'

export default function VisualHierarchy() {
  const [flat, setFlat] = useState(false)

  return (
    <div className="section-enter">
      <h2 className="text-[32px] font-bold mb-2 tracking-tight">Visual Hierarchy</h2>
      <p className="text-[17px] text-text-dim mb-6 max-w-[70ch]">
        Hierarchy is the deliberate manipulation of pre-attentive features (size, color, contrast,
        spacing) to ensure the brain processes elements in the exact order of their importance.
      </p>
      <p className="mb-3 max-w-[70ch]">
        Without clear hierarchy, everything on the screen screams for attention equally. This results
        in visual white noise, causing anxiety and a spike in cognitive load as the user has to manually
        evaluate what to read first. Good hierarchy acts as a trail of breadcrumbs for the eye.
      </p>

      <DemoBox label="Toggle hierarchy">
        <p className="mb-4">
          Click the button to remove visual hierarchy. It is the exact same text, but notice the
          massive difference in how much cognitive effort is required to parse what this card is about.
        </p>
        <button
          onClick={() => setFlat(f => !f)}
          className="px-4 py-2 rounded-md border border-border text-text-dim text-[14px] hover:bg-surface2 transition-colors cursor-pointer"
        >
          Toggle hierarchy
        </button>
        <div
          id="hierCard"
          className={`hier-card bg-white text-[#1a1a1a] p-6 rounded-lg mt-4 transition-all duration-300 ${flat ? 'flat' : ''}`}
        >
          <div style={{ fontSize: 11, color: '#888', textTransform: 'uppercase', letterSpacing: 1 }}>
            New Release
          </div>
          <h3 style={{ fontSize: 24, margin: '4px 0 8px', color: '#111' }}>Pro Plan</h3>
          <p style={{ color: '#555', marginBottom: 16 }}>Everything you need to ship faster.</p>
          <div style={{ fontSize: 32, fontWeight: 700, color: '#111' }}>
            $29<span style={{ fontSize: 14, color: '#888', fontWeight: 400 }}>/mo</span>
          </div>
          <button
            className="mt-4 bg-accent text-white px-4 py-2.5 rounded-md text-[14px] font-medium hover:bg-accent-h transition-colors cursor-pointer"
          >
            Start free trial
          </button>
        </div>
      </DemoBox>
    </div>
  )
}
