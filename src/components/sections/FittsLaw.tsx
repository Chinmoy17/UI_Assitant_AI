import { useEffect, useRef, useState } from 'react'
import Callout from '../shared/Callout'
import DemoBox from '../shared/DemoBox'
import StatBadge from '../shared/StatBadge'

export default function FittsLaw() {
  const [size, setSize] = useState(40)
  const [hits, setHits] = useState(0)
  const [times, setTimes] = useState<number[]>([])
  const [pos, setPos] = useState({ x: 50, y: 50 })
  const [done, setDone] = useState(false)
  const lastClick = useRef<number | null>(null)
  const areaRef = useRef<HTMLDivElement>(null)

  function moveTarget(currentSize: number) {
    if (!areaRef.current) return
    const maxX = areaRef.current.clientWidth - currentSize
    const maxY = areaRef.current.clientHeight - currentSize
    setPos({ x: Math.random() * maxX, y: Math.random() * maxY })
  }

  useEffect(() => { moveTarget(size) }, [])

  function handleHit() {
    const now = performance.now()
    if (lastClick.current !== null) {
      setTimes(t => [...t, now - lastClick.current!])
    }
    lastClick.current = now
    const nextHits = hits + 1
    setHits(nextHits)
    if (nextHits >= 10) { setDone(true); return }
    moveTarget(size)
  }

  function reset() {
    setHits(0)
    setTimes([])
    lastClick.current = null
    setDone(false)
    moveTarget(size)
  }

  const avg = times.length
    ? Math.round(times.reduce((a, b) => a + b, 0) / times.length)
    : null

  return (
    <div className="section-enter">
      <h2 className="text-[32px] font-bold mb-2 tracking-tight">Fitts's Law</h2>
      <p className="text-[17px] text-text-dim mb-6 max-w-[70ch]">
        <code className="font-mono bg-surface2 px-1.5 py-0.5 rounded text-[0.9em]">T = a + b·log₂(D/W + 1)</code>. The time required to rapidly move to a target area is a
        function of the ratio between the distance to the target and the width of the target.
      </p>
      <p className="mb-3 max-w-[70ch]">
        Proposed by Paul Fitts in 1954, this law dictates that bigger targets located closer to the
        cursor (or finger) are exponentially faster to hit. This is why mobile primary actions are huge,
        and why desktop operating systems place crucial menus at the extreme edges of the screen.
      </p>

      <DemoBox label="Click as fast as you can — 10 hits">
        <p className="mb-4">
          Adjust the size of the target. Try it at 20px, then try it at 100px. Notice how much physical
          and mental strain is removed when the target is large.
        </p>
        <div className="flex items-center gap-3 mb-4">
          <label className="text-[12px] uppercase tracking-wider text-text-dim">Size:</label>
          <input
            type="range" min={20} max={120} value={size}
            onChange={e => { const s = +e.target.value; setSize(s); moveTarget(s) }}
            className="w-48"
          />
          <StatBadge>{size}px</StatBadge>
        </div>

        <div
          ref={areaRef}
          className="relative h-60 bg-surface2 rounded-md overflow-hidden"
        >
          <button
            onClick={done ? undefined : handleHit}
            style={{ width: size, height: size, left: pos.x, top: pos.y, fontSize: size > 40 ? 14 : 11 }}
            className="absolute bg-accent text-white rounded border-none cursor-pointer font-medium hover:bg-accent-h transition-colors"
          >
            {done ? 'Done!' : 'Click'}
          </button>
        </div>

        <div className="mt-3 flex gap-2 flex-wrap items-center">
          <StatBadge>Hits: <strong className="text-accent">{hits}</strong>/10</StatBadge>
          <StatBadge>Avg: <strong className="text-accent">{avg ?? '—'}</strong> ms</StatBadge>
          <button
            onClick={reset}
            className="px-4 py-2 rounded-md border border-border text-text-dim text-[14px] hover:bg-surface2 transition-colors cursor-pointer"
          >
            Reset
          </button>
        </div>
      </DemoBox>

      <Callout>
        <strong>The Takeaway:</strong> Make clickable areas larger than their visual bounds, especially on
        mobile devices to accommodate "fat fingers." Never place destructive actions (like "Delete")
        physically close to frequent actions (like "Save").
      </Callout>
    </div>
  )
}
