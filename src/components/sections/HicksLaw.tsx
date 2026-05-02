import { useState } from 'react'
import Callout from '../shared/Callout'
import DemoBox from '../shared/DemoBox'
import StatBadge from '../shared/StatBadge'

const ALL_LABELS = [
  'Home','Profile','Inbox','Settings','Logout','Help','Search','Files',
  'Calendar','Notes','Tasks','Tags','Trash','Drafts','Archive','Reports',
  'Billing','Team','Integrations','API',
]

export default function HicksLaw() {
  const [options, setOptions] = useState<string[]>([])
  const [result, setResult] = useState<string | null>(null)
  const startRef = { current: 0 }

  function run(n: number) {
    const labels = [...ALL_LABELS].sort(() => Math.random() - 0.5).slice(0, n)
    if (!labels.includes('Settings')) labels[Math.floor(Math.random() * n)] = 'Settings'
    setOptions(labels)
    setResult(null)
    startRef.current = performance.now()
  }

  function handleClick(label: string, n: number) {
    const elapsed = Math.round(performance.now() - startRef.current)
    if (label === 'Settings') {
      setResult(`Found Settings among ${n} options in ${elapsed} ms`)
    } else {
      setResult(`That was "${label}" — try again`)
    }
  }

  return (
    <div className="section-enter">
      <h2 className="text-[32px] font-bold mb-2 tracking-tight">Hick's Law</h2>
      <p className="text-[17px] text-text-dim mb-6 max-w-[70ch]">
        <code className="font-mono bg-surface2 px-1.5 py-0.5 rounded text-[0.9em]">T = a + b·log₂(n)</code>. The time it takes to make a decision increases logarithmically with
        the number and complexity of choices.
      </p>
      <p className="mb-3 max-w-[70ch]">
        More choices = longer reaction time. When users are bombarded with a massive, unorganized list
        of options, they experience choice paralysis. However, Hick's Law doesn't mean you should simply
        hide features. It means you should categorize them. Chunking items into categories reduces the
        mental search time dramatically.
      </p>

      <DemoBox label='Find "Settings" as fast as possible'>
        <p className="mb-4">
          Try to find and click the "Settings" button. Notice how your search time scales up
          uncomfortably when presented with 20 options compared to 3.
        </p>
        <div className="flex gap-3 mb-4 flex-wrap">
          {[3, 8, 20].map(n => (
            <button
              key={n}
              onClick={() => run(n)}
              className="px-4 py-2 rounded-md border border-border text-text-dim text-[14px] hover:bg-surface2 transition-colors cursor-pointer"
            >
              {n} options
            </button>
          ))}
        </div>
        {options.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {options.map(label => (
              <button
                key={label}
                onClick={() => handleClick(label, options.length)}
                className="bg-surface2 text-text-base border border-border px-3.5 py-2 rounded text-[13px] hover:border-accent cursor-pointer transition-colors"
              >
                {label}
              </button>
            ))}
          </div>
        )}
        {result && (
          <div className="mt-4">
            <StatBadge className={result.includes('try again') ? 'text-danger' : ''}>
              {result}
            </StatBadge>
          </div>
        )}
      </DemoBox>

      <Callout>
        Chunking 20 items into 4 groups of 5 is much faster to process than 20 flat items:{' '}
        <code className="font-mono bg-surface2 px-1.5 py-0.5 rounded text-[0.9em]">log₂4 + log₂5 ≪ log₂20</code>. Use progressive disclosure: show the most common options first,
        and hide the rest behind a "More" menu.
      </Callout>
    </div>
  )
}
