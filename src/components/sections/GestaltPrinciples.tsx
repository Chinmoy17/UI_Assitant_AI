import { useState } from 'react'
import Callout from '../shared/Callout'
import DemoBox from '../shared/DemoBox'

function ProximityDemo() {
  const [gap, setGap] = useState(8)
  const rows = [0, 1, 2]
  const cols = [0, 1, 2, 3, 4, 5, 6, 7]

  return (
    <>
      <p className="mb-4">
        Elements close to each other are perceived as a single group. Move the slider below to change
        the horizontal gap. Notice how your brain instantly switches from seeing "columns" to seeing
        "rows" purely based on whitespace.
      </p>
      <label className="block text-[12px] uppercase tracking-wider text-text-dim mb-1">
        Horizontal gap: <span>{gap}</span>px
      </label>
      <input
        type="range" min={2} max={60} value={gap}
        onChange={e => setGap(+e.target.value)}
        className="w-full"
      />
      <div className="mt-6 flex flex-col gap-3">
        {rows.map(r => (
          <div key={r} className="flex" style={{ gap: `${gap}px` }}>
            {cols.map(c => (
              <div key={c} className="w-3.5 h-3.5 bg-accent rounded-full" />
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
      <p className="mb-4">
        Elements that look similar are perceived to have the same function. Toggle similarity below.
        With identical colors, it's just a 4×4 grid. When colored by columns, the brain groups them
        vertically, ignoring the equal spacing.
      </p>
      <button
        onClick={() => setSimilar(s => !s)}
        className="px-4 py-2 rounded-md border border-border text-text-dim text-[14px] hover:bg-surface2 transition-colors cursor-pointer"
      >
        Toggle similarity
      </button>
      <div className="mt-6 grid gap-2" style={{ gridTemplateColumns: 'repeat(4, 24px)' }}>
        {Array.from({ length: 16 }, (_, i) => (
          <div
            key={i}
            className="w-3.5 h-3.5 rounded-full"
            style={{ background: similar ? colors[i % 4] : '#6366f1' }}
          />
        ))}
      </div>
    </>
  )
}

export default function GestaltPrinciples() {
  return (
    <div className="section-enter">
      <h2 className="text-[32px] font-bold mb-2 tracking-tight">Gestalt Principles</h2>
      <p className="text-[17px] text-text-dim mb-6 max-w-[70ch]">
        The brain perceives wholes before parts. Founded by the Berlin School of experimental psychology
        in the 1920s, Gestalt theory explains how we group disparate elements.
      </p>
      <p className="mb-3 max-w-[70ch]">
        The human mind seeks order in chaos. Instead of processing every individual element on a screen,
        it groups them into larger logical chunks. This chunking is automatic and highly predictable based
        on physical properties like distance and appearance.
      </p>

      <DemoBox label="Law of Proximity">
        <ProximityDemo />
      </DemoBox>

      <DemoBox label="Law of Similarity">
        <SimilarityDemo />
      </DemoBox>

      <Callout>
        <strong>The Takeaway:</strong> White space is not empty space; it is a structural tool. Form
        labels must hug their inputs (proximity) tighter than the gap to the next field. Same-colored
        buttons across an app feel like they do the same thing (similarity). If two things are
        conceptually related, they must be visually grouped.
      </Callout>
    </div>
  )
}
