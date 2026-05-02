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
      <p className="mb-4">
        {mode === 'color'
          ? 'Click the red dot as fast as you can. Notice how your eye snaps directly to it without "scanning" the grid.'
          : 'Same task, but the target now differs only by shape. Notice the difference? You are forced to consciously scan element by element.'}
      </p>
      <div className="grid gap-2" style={{ gridTemplateColumns: 'repeat(15, 1fr)' }}>
        {dots.map((dot, i) => (
          <div
            key={i}
            onClick={dot.isTarget ? () => {
              const ms = Math.round(performance.now() - startTime.current)
              setResult(`Found in ${ms} ms`)
            } : undefined}
            className={[
              'w-4 h-4',
              dot.isTarget && mode === 'color' ? 'bg-danger cursor-pointer rounded-full' : '',
              dot.isTarget && mode === 'shape' ? 'bg-[#5b6270] cursor-pointer rounded-none' : '',
              !dot.isTarget ? 'bg-[#5b6270] rounded-full' : '',
            ].join(' ')}
          />
        ))}
      </div>
      {result && (
        <StatBadge className="mt-4">
          Found in <strong className="text-accent">{result.replace('Found in ', '').replace(' ms', '')}</strong> ms
        </StatBadge>
      )}
      <button
        onClick={reset}
        className="mt-3 px-4 py-2 rounded-md border border-border text-text-dim text-[14px] hover:bg-surface2 transition-colors cursor-pointer"
      >
        Reset
      </button>
    </>
  )
}

export default function PreattentiveVision() {
  return (
    <div className="section-enter">
      <h2 className="text-[32px] font-bold mb-2 tracking-tight">Pre-attentive Vision</h2>
      <p className="text-[17px] text-text-dim mb-6 max-w-[70ch]">
        Before conscious thought engages (~200ms), your visual cortex has already processed color, orientation, size, and motion.
      </p>
      <p className="mb-3 max-w-[70ch]">
        Pre-attentive processing is the subconscious accumulation of information from the environment.
        It evolved as a survival mechanism (e.g., spotting a bright red berry in a green bush, or a
        sudden movement in peripheral vision). In UI design, if you want something to stand out
        immediately, you must rely on pre-attentive attributes—most notably color, size, and spatial
        positioning—rather than complex shapes or text that require conscious decoding.
      </p>

      <DemoBox label="Demo: Find the red dot">
        <DotGrid mode="color" />
      </DemoBox>

      <DemoBox label="Demo: Now find the square (shape, not color)">
        <DotGrid mode="shape" />
      </DemoBox>

      <Callout>
        <strong>The Takeaway:</strong> Color is the strongest pre-attentive feature. Your primary
        Call-To-Action (CTA) must differ from secondary buttons by color or high contrast, not just by
        label or a slight shape change. Relying on shape alone forces the user into slow, cognitive scanning.
      </Callout>
    </div>
  )
}
