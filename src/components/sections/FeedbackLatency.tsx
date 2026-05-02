import { useRef, useState } from 'react'
import Callout from '../shared/Callout'
import DemoBox from '../shared/DemoBox'

export default function FeedbackLatency() {
  const [status, setStatus] = useState('')
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])

  function feedbackTest(delay: number, spinner: boolean) {
    timers.current.forEach(clearTimeout)
    timers.current = []

    if (delay === 0) {
      setStatus("✓ Done instantly. Felt like nothing happened? That's the point.")
      return
    }
    if (spinner) {
      setStatus('Spinner shown — waiting feels manageable.')
    } else {
      setStatus("No feedback. Are you wondering if it's working?")
    }
    const t = setTimeout(() => {
      setStatus(`✓ Completed after ${delay}ms ${spinner ? '(with spinner)' : '(no spinner — felt longer, right?)'}`)
    }, delay)
    timers.current.push(t)
  }

  const buttons = [
    { label: '0ms (instant)', delay: 0, spinner: false },
    { label: '300ms', delay: 300, spinner: false },
    { label: '1s', delay: 1000, spinner: false },
    { label: '3s (no spinner)', delay: 3000, spinner: false },
    { label: '3s (with spinner)', delay: 3000, spinner: true },
  ]

  return (
    <div className="section-enter">
      <h2 className="text-[32px] font-bold mb-2 tracking-tight">Feedback Latency</h2>
      <p className="text-[17px] text-text-dim mb-6 max-w-[70ch]">
        Every action must produce a reaction. Without immediate feedback, users assume failure,
        experience anxiety, and begin clicking frantically.
      </p>
      <p className="mb-3 max-w-[70ch]">
        The Doherty Threshold states that productivity soars when a computer and its users interact at
        a pace (&lt;400ms) that ensures neither has to wait on the other. According to Jakob Nielsen:
        0.1 seconds feels instantaneous, 1.0 second keeps the user's flow of thought seamless, and
        10 seconds is the absolute limit for keeping a user's attention.
      </p>

      <DemoBox label="Click each — feel the difference">
        <div className="flex flex-wrap gap-2 mb-3">
          {buttons.map(b => (
            <button
              key={b.label}
              onClick={() => feedbackTest(b.delay, b.spinner)}
              className="bg-accent text-white px-4 py-2.5 rounded-md text-[14px] font-medium hover:bg-accent-h transition-colors cursor-pointer"
            >
              {b.label}
            </button>
          ))}
        </div>
        <div className="mt-3 min-h-5 text-[13px] text-text-dim">{status}</div>
      </DemoBox>

      <Callout>
        Waiting 3 seconds with no visual change feels broken. Adding a spinner for that exact same
        3-second wait changes the user's emotional state entirely, converting <em>uncertainty</em>{' '}
        into <em>patience</em>. Provide immediate optimistic feedback whenever possible.
      </Callout>
    </div>
  )
}
