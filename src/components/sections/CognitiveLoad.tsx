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
      <h2 className="text-[32px] font-bold mb-2 tracking-tight">Cognitive Load Theory</h2>
      <p className="text-[17px] text-text-dim mb-6 max-w-[70ch]">
        Working memory holds roughly 4 to 7 chunks of information. Every unexplained icon, complex
        navigation, or disjointed layout spends from this limited budget.
      </p>
      <p className="mb-3 max-w-[70ch]">
        Developed by John Sweller in 1988, Cognitive Load Theory categorizes mental effort into three
        types: <strong>Intrinsic</strong> (the inherent difficulty of the task),{' '}
        <strong>Extraneous</strong> (unnecessary effort caused by bad design), and{' '}
        <strong>Germane</strong> (effort put into learning and schema formation). Your job as a designer
        is to minimize Extraneous load so the user's brain has enough bandwidth left to actually
        accomplish their task.
      </p>

      <DemoBox label="Memory test (7 digits)">
        <p className="mb-4">
          A sequence will show for 2 seconds. Try to recall it. This simulates the capacity of your
          short-term working memory.
        </p>
        {phase === 'idle' && (
          <button
            onClick={startTest}
            className="bg-accent text-white px-4 py-2.5 rounded-md text-[14px] font-medium hover:bg-accent-h transition-colors cursor-pointer"
          >
            Start test
          </button>
        )}
        {phase === 'showing' && (
          <div className="font-mono text-[24px] my-4 min-h-8 tracking-[8px]">
            {seqRef.current}
          </div>
        )}
        {phase === 'recall' && (
          <>
            <div className="font-mono text-[24px] my-4 min-h-8 text-text-dim">— recall now —</div>
            <div className="flex gap-2 items-center">
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Type what you saw"
                className="bg-surface2 text-text-base border border-border px-3 py-2 rounded font-mono"
                autoFocus
              />
              <button
                onClick={checkMemory}
                className="px-4 py-2 rounded-md border border-border text-text-dim text-[14px] hover:bg-surface2 transition-colors cursor-pointer"
              >
                Check
              </button>
            </div>
          </>
        )}
        {result && (
          <div className="mt-3">
            {result.correct ? (
              <StatBadge className="text-success">Correct! {result.actual}</StatBadge>
            ) : (
              <StatBadge className="text-danger">
                You typed {result.typed}, actual was {result.actual}
              </StatBadge>
            )}
          </div>
        )}
        {phase !== 'idle' && (
          <button
            onClick={() => { setPhase('idle'); setResult(null) }}
            className="mt-3 text-[13px] text-text-dim hover:text-text-base cursor-pointer underline"
          >
            Try again
          </button>
        )}
      </DemoBox>

      <Callout>
        Most people fail or struggle at 7+ items (Miller's Law: 7±2). Now imagine your interface forces
        users to remember a verification code, a product ID, or instructions from a previous screen while
        filling out a form. If you exceed their working memory, they will make errors.
      </Callout>
    </div>
  )
}
