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

  function moveTarget(s: number) {
    if (!areaRef.current) return
    const maxX = areaRef.current.clientWidth - s
    const maxY = areaRef.current.clientHeight - s
    setPos({ x: Math.random() * maxX, y: Math.random() * maxY })
  }

  useEffect(() => { moveTarget(size) }, [])

  function handleHit() {
    const now = performance.now()
    if (lastClick.current !== null) setTimes(t => [...t, now - lastClick.current!])
    lastClick.current = now
    const next = hits + 1
    setHits(next)
    if (next >= 10) { setDone(true); return }
    moveTarget(size)
  }

  function reset() {
    setHits(0); setTimes([]); lastClick.current = null; setDone(false)
    moveTarget(size)
  }

  const avg = times.length ? Math.round(times.reduce((a, b) => a + b, 0) / times.length) : null

  return (
    <div className="section-enter">
      <h2 style={{ fontSize: 32, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 8 }}>
        Fitts's Law
      </h2>
      <p style={{ fontSize: 17, color: '#8b919a', marginBottom: 24, maxWidth: '70ch', lineHeight: 1.5 }}>
        <code className="code-inline">T = a + b·log₂(D/W + 1)</code>. The time required to rapidly
        move to a target is a function of the ratio between the distance to the target and its width.
      </p>
      <p style={{ marginBottom: 14, maxWidth: '70ch' }}>
        Proposed by Paul Fitts in 1954, this law dictates that bigger targets located closer to the
        cursor (or finger) are exponentially faster to hit. This is why mobile primary actions are
        huge, and why desktop operating systems place crucial menus at the extreme edges of the screen
        (an edge has infinite width because the mouse cannot move past it).
      </p>

      <DemoBox label="Click as fast as you can — 10 hits">
        <p style={{ marginBottom: 16, color: '#8b919a', fontSize: 14 }}>
          Adjust the target size. Try 20px, then 100px. Notice how much physical and mental strain
          is removed when the target is large.
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <label style={{ fontSize: 12, color: '#8b919a', textTransform: 'uppercase', letterSpacing: '0.5px', whiteSpace: 'nowrap' }}>
            Size:
          </label>
          <input type="range" min={20} max={120} value={size}
            onChange={e => { const s = +e.target.value; setSize(s); moveTarget(s) }}
            style={{ width: 200 }} />
          <StatBadge>{size}px</StatBadge>
        </div>

        <div ref={areaRef} style={{ position: 'relative', height: 240, background: '#1c2026', borderRadius: 6, overflow: 'hidden' }}>
          <button
            onClick={done ? undefined : handleHit}
            style={{
              position: 'absolute', width: size, height: size,
              left: pos.x, top: pos.y,
              background: '#6366f1', color: '#fff', border: 'none', borderRadius: 4,
              cursor: done ? 'default' : 'pointer', fontWeight: 500,
              fontSize: size > 40 ? 14 : 11, fontFamily: 'inherit',
              transition: 'background 0.1s',
            }}
            onMouseEnter={e => { if (!done) e.currentTarget.style.background = '#7c7ff5' }}
            onMouseLeave={e => { e.currentTarget.style.background = '#6366f1' }}
          >
            {done ? 'Done!' : 'Click'}
          </button>
        </div>

        <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          <StatBadge>Hits: <strong style={{ color: '#6366f1' }}>{hits}</strong>/10</StatBadge>
          <StatBadge>Avg: <strong style={{ color: '#6366f1' }}>{avg ?? '—'}</strong> ms</StatBadge>
          <button className="btn-ghost" onClick={reset}>Reset</button>
        </div>
      </DemoBox>

      <Callout>
        <strong>The Takeaway:</strong> Make clickable areas larger than their visual bounds, especially
        on mobile to accommodate "fat fingers." Never place destructive actions (like "Delete")
        physically close to frequent actions (like "Save").
      </Callout>
    </div>
  )
}
