import { useRef, useState } from 'react'
import Callout from '../shared/Callout'
import DemoBox from '../shared/DemoBox'
import StatBadge from '../shared/StatBadge'

export default function CognitiveLoad() {
  const [phase, setPhase] = useState<'idle' | 'showing' | 'recall'>('idle')
  const [input, setInput] = useState('')
  const [result, setResult] = useState<{ correct: boolean; actual: string; typed: string } | null>(null)
  const seqRef = useRef('')

  function startTest() {
    let seq = ''
    for (let i = 0; i < 7; i++) seq += Math.floor(Math.random() * 10)
    seqRef.current = seq
    setPhase('showing')
    setInput('')
    setResult(null)
    setTimeout(() => setPhase('recall'), 2000)
  }

  function checkMemory() {
    setResult({ correct: input === seqRef.current, actual: seqRef.current, typed: input })
  }

  return (
    <div className="section-enter">
      <h2 style={{ fontSize: 32, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 8 }}>
        Cognitive Load Theory
      </h2>
      <p style={{ fontSize: 17, color: '#8b919a', marginBottom: 24, maxWidth: '70ch', lineHeight: 1.5 }}>
        Working memory holds roughly 4 to 7 chunks of information. Every unexplained icon, complex
        navigation, or disjointed layout spends from this limited budget.
      </p>
      <p style={{ marginBottom: 14, maxWidth: '70ch' }}>
        Developed by John Sweller in 1988, Cognitive Load Theory categorizes mental effort into three
        types: <strong>Intrinsic</strong> (the inherent difficulty of the task),{' '}
        <strong>Extraneous</strong> (unnecessary effort caused by bad design), and{' '}
        <strong>Germane</strong> (effort put into learning and schema formation). Your job as a
        designer is to minimize Extraneous load so the user's brain has enough bandwidth to actually
        accomplish their task.
      </p>

      <DemoBox label="Memory test (7 digits)">
        <p style={{ marginBottom: 16, color: '#8b919a', fontSize: 14 }}>
          A sequence will show for 2 seconds. Try to recall it. This simulates the capacity of your
          short-term working memory.
        </p>

        {phase === 'idle' && (
          <button className="btn-primary" onClick={startTest}>Start test</button>
        )}
        {phase === 'showing' && (
          <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: 28, margin: '16px 0', letterSpacing: 10, minHeight: 36 }}>
            {seqRef.current}
          </div>
        )}
        {phase === 'recall' && (
          <>
            <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: 20, margin: '16px 0', color: '#8b919a', minHeight: 36 }}>
              — recall now —
            </div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <input
                type="text" value={input} onChange={e => setInput(e.target.value)}
                placeholder="Type what you saw"
                className="ctrl-input"
                style={{ fontFamily: 'ui-monospace, monospace' }}
                autoFocus
                onKeyDown={e => e.key === 'Enter' && checkMemory()}
              />
              <button className="btn-ghost" onClick={checkMemory}>Check</button>
            </div>
          </>
        )}

        {result && (
          <div style={{ marginTop: 12 }}>
            {result.correct
              ? <StatBadge className="text-success">✓ Correct! {result.actual}</StatBadge>
              : <StatBadge>You typed <strong style={{ color: '#ef4444' }}>{result.typed}</strong>, actual was <strong>{result.actual}</strong></StatBadge>}
            <button className="btn-ghost" style={{ marginLeft: 8 }} onClick={() => { setPhase('idle'); setResult(null) }}>
              Try again
            </button>
          </div>
        )}
      </DemoBox>

      <Callout>
        Most people fail or struggle at 7+ items (Miller's Law: 7±2). Now imagine your interface
        forces users to remember a verification code, a product ID, or instructions from a previous
        screen while filling out a form. If you exceed their working memory, they will make errors.
      </Callout>
    </div>
  )
}
