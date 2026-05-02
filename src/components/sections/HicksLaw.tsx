import { useRef, useState } from 'react'
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
  const [result, setResult] = useState<{ text: string; success: boolean } | null>(null)
  const startRef = useRef(0)

  function run(n: number) {
    const labels = [...ALL_LABELS].sort(() => Math.random() - 0.5).slice(0, n)
    if (!labels.includes('Settings')) labels[Math.floor(Math.random() * n)] = 'Settings'
    setOptions(labels)
    setResult(null)
    startRef.current = performance.now()
  }

  function handleClick(label: string) {
    const elapsed = Math.round(performance.now() - startRef.current)
    if (label === 'Settings') {
      setResult({ text: `Found Settings among ${options.length} options in ${elapsed} ms`, success: true })
    } else {
      setResult({ text: `That was "${label}" — try again`, success: false })
      startRef.current = performance.now()
    }
  }

  return (
    <div className="section-enter">
      <h2 style={{ fontSize: 32, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 8 }}>
        Hick's Law
      </h2>
      <p style={{ fontSize: 17, color: '#8b919a', marginBottom: 24, maxWidth: '70ch', lineHeight: 1.5 }}>
        <code className="code-inline">T = a + b·log₂(n)</code>. The time it takes to make a
        decision increases logarithmically with the number and complexity of choices.
      </p>
      <p style={{ marginBottom: 14, maxWidth: '70ch' }}>
        More choices = longer reaction time. When users are bombarded with a massive, unorganized
        list of options, they experience choice paralysis. However, Hick's Law doesn't mean you
        should simply hide features. It means you should categorize them. Chunking items into
        categories reduces mental search time dramatically.
      </p>

      <DemoBox label='Find "Settings" as fast as possible'>
        <p style={{ marginBottom: 16, color: '#8b919a', fontSize: 14 }}>
          Try to find and click the "Settings" button. Notice how your search time scales up
          uncomfortably when presented with 20 options compared to 3.
        </p>
        <div style={{ display: 'flex', gap: 10, marginBottom: 16, flexWrap: 'wrap' }}>
          {[3, 8, 20].map(n => (
            <button key={n} className="btn-ghost" onClick={() => run(n)}>{n} options</button>
          ))}
        </div>

        {options.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 8 }}>
            {options.map(label => (
              <button
                key={label}
                onClick={() => handleClick(label)}
                style={{
                  background: '#1c2026', color: '#e6e8eb',
                  border: '1px solid #2a2f37', padding: '8px 14px',
                  borderRadius: 4, cursor: 'pointer', fontSize: 13,
                  fontFamily: 'inherit', transition: 'border-color 0.15s',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#6366f1' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#2a2f37' }}
              >
                {label}
              </button>
            ))}
          </div>
        )}

        {result && (
          <div style={{ marginTop: 14 }}>
            <StatBadge>
              <span style={{ color: result.success ? '#10b981' : '#ef4444' }}>{result.text}</span>
            </StatBadge>
          </div>
        )}
      </DemoBox>

      <Callout>
        Chunking 20 items into 4 groups of 5 is much faster to process than 20 flat items:{' '}
        <code className="code-inline">log₂4 + log₂5 ≪ log₂20</code>. Use progressive disclosure:
        show the most common options first, and hide the rest behind a "More" menu.
      </Callout>
    </div>
  )
}
