import { useEffect, useRef, useState } from 'react'
import Callout from '../shared/Callout'
import DemoBox from '../shared/DemoBox'
import StatBadge from '../shared/StatBadge'

type DotMode = 'color' | 'shape'

function DotGrid({ mode }: { mode: DotMode }) {
  const [result, setResult] = useState<string | null>(null)
  const [dots, setDots] = useState<{ isTarget: boolean }[]>([])
  const startTime = useRef<number>(0)

  function reset() {
    setResult(null)
    const total = 90
    const targetIdx = Math.floor(Math.random() * total)
    setDots(Array.from({ length: total }, (_, i) => ({ isTarget: i === targetIdx })))
    startTime.current = performance.now()
  }

  useEffect(() => { reset() }, [])

  return (
    <>
      <p style={{ marginBottom: 16, color: '#8b919a', fontSize: 14 }}>
        {mode === 'color'
          ? 'Click the red dot as fast as you can. Notice how your eye snaps directly to it without "scanning" the grid.'
          : 'Same task, but the target now differs only by shape. Notice the difference? You are forced to consciously scan element by element.'}
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(15, 1fr)', gap: 8 }}>
        {dots.map((dot, i) => (
          <div
            key={i}
            onClick={dot.isTarget ? () => {
              setResult(`${Math.round(performance.now() - startTime.current)}`)
              reset()
            } : undefined}
            style={{
              width: 16, height: 16,
              borderRadius: dot.isTarget && mode === 'shape' ? 2 : '50%',
              background: dot.isTarget && mode === 'color' ? '#ef4444' : '#5b6270',
              cursor: dot.isTarget ? 'pointer' : 'default',
            }}
          />
        ))}
      </div>
      <div style={{ marginTop: 14, display: 'flex', alignItems: 'center', gap: 10 }}>
        {result && <StatBadge>Found in <strong style={{ color: '#6366f1' }}>{result}</strong> ms</StatBadge>}
        <button className="btn-ghost" onClick={reset}>Reset</button>
      </div>
    </>
  )
}

export default function PreattentiveVision() {
  return (
    <div className="section-enter">
      <h2 style={{ fontSize: 32, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 8 }}>
        Pre-attentive Vision
      </h2>
      <p style={{ fontSize: 17, color: '#8b919a', marginBottom: 24, maxWidth: '70ch', lineHeight: 1.5 }}>
        Before conscious thought engages (~200ms), your visual cortex has already processed color,
        orientation, size, and motion.
      </p>
      <p style={{ marginBottom: 14, maxWidth: '70ch' }}>
        Pre-attentive processing is the subconscious accumulation of information from the environment.
        It evolved as a survival mechanism (e.g., spotting a bright red berry in a green bush, or a
        sudden movement in peripheral vision). In UI design, if you want something to stand out
        immediately, you must rely on pre-attentive attributes — most notably color, size, and spatial
        positioning — rather than complex shapes or text that require conscious decoding.
      </p>

      <DemoBox label="Demo: Find the red dot">
        <DotGrid mode="color" />
      </DemoBox>

      <DemoBox label="Demo: Now find the square (shape, not color)">
        <DotGrid mode="shape" />
      </DemoBox>

      <Callout>
        <strong>The Takeaway:</strong> Color is the strongest pre-attentive feature. Your primary
        Call-To-Action (CTA) must differ from secondary buttons by color or high contrast, not just
        by label or a slight shape change. Relying on shape alone forces the user into slow, cognitive
        scanning.
      </Callout>
    </div>
  )
}
