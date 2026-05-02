import { useRef, useState } from 'react'
import Callout from '../shared/Callout'
import DemoBox from '../shared/DemoBox'

const BUTTONS = [
  { label: '0ms (instant)',   delay: 0,    spinner: false },
  { label: '300ms',           delay: 300,  spinner: false },
  { label: '1s',              delay: 1000, spinner: false },
  { label: '3s (no spinner)', delay: 3000, spinner: false },
  { label: '3s (with spinner)', delay: 3000, spinner: true },
]

export default function FeedbackLatency() {
  const [status, setStatus]   = useState('')
  const [loading, setLoading] = useState<string | null>(null)
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])

  function feedbackTest(delay: number, spinner: boolean, label: string) {
    timers.current.forEach(clearTimeout)
    timers.current = []

    if (delay === 0) {
      setStatus("✓ Done instantly. Felt like nothing happened? That's the point.")
      setLoading(null)
      return
    }

    setLoading(spinner ? label : null)
    setStatus(spinner ? 'Spinner shown — waiting feels manageable.' : "No feedback. Are you wondering if it's working?")

    const t = setTimeout(() => {
      setLoading(null)
      setStatus(`✓ Completed after ${delay}ms ${spinner ? '(with spinner)' : '(no spinner — felt longer, right?)'}`)
    }, delay)
    timers.current.push(t)
  }

  return (
    <div className="section-enter">
      <h2 style={{ fontSize: 32, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 8 }}>
        Feedback Latency
      </h2>
      <p style={{ fontSize: 17, color: '#8b919a', marginBottom: 24, maxWidth: '70ch', lineHeight: 1.5 }}>
        Every action must produce a reaction. Without immediate feedback, users assume failure,
        experience anxiety, and begin clicking frantically.
      </p>
      <p style={{ marginBottom: 14, maxWidth: '70ch' }}>
        The Doherty Threshold states that productivity soars when a computer and its users interact
        at a pace (&lt;400ms) that ensures neither has to wait on the other. According to Jakob Nielsen:
        0.1 seconds feels instantaneous, 1.0 second keeps the user's flow of thought seamless, and
        10 seconds is the absolute limit for keeping attention.
      </p>

      <DemoBox label="Click each — feel the difference">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 16 }}>
          {BUTTONS.map(b => (
            <button
              key={b.label}
              className="btn-primary"
              disabled={loading !== null}
              onClick={() => feedbackTest(b.delay, b.spinner, b.label)}
            >
              {loading === b.label ? 'Loading…' : b.label}
            </button>
          ))}
        </div>
        <div style={{ minHeight: 20, fontSize: 13, color: '#8b919a' }}>{status}</div>
      </DemoBox>

      <Callout>
        Waiting 3 seconds with no visual change feels broken. Adding a spinner for that exact same
        3-second wait changes the user's emotional state entirely, converting <em>uncertainty</em>{' '}
        into <em>patience</em>. Provide immediate optimistic feedback whenever possible.
      </Callout>
    </div>
  )
}
