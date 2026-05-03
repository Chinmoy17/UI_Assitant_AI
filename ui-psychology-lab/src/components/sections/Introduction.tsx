import Callout from '../shared/Callout'

export default function Introduction() {
  return (
    <div className="section-enter">
      <h2 style={{ fontSize: 32, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 8 }}>
        The Psychology of UI
      </h2>
      <p style={{ fontSize: 17, color: '#8b919a', marginBottom: 24, maxWidth: '70ch', lineHeight: 1.5 }}>
        An interactive lab where you don't just read about cognitive principles — you experience them
        directly on your own brain.
      </p>

      <h3 style={{ fontSize: 18, fontWeight: 600, marginTop: 32, marginBottom: 12 }}>Core thesis</h3>
      <p style={{ marginBottom: 14, maxWidth: '70ch' }}>
        A UI is not merely a visual artifact or a canvas for artistic expression. It's fundamentally a{' '}
        <strong>cognitive prosthetic</strong>. Every pixel, margin, and color choice you make either
        reduces or increases the mental workload of your users.
      </p>
      <p style={{ marginBottom: 14, maxWidth: '70ch' }}>
        The human brain is an incredibly powerful but highly optimized machine. It operates as a fast,
        lazy, biased pattern-matcher with a strictly limited working memory (roughly 4–7 items at a
        time) and is governed by 200-millisecond reflex loops. Because thinking burns calories, our
        brains have evolved to avoid deep analytical thought whenever possible, relying instead on
        heuristics and visual shortcuts.
      </p>
      <p style={{ marginBottom: 14, maxWidth: '70ch' }}>
        Your interface either cooperates with this biological reality, making tasks feel frictionless
        and intuitive, or it fights it, causing frustration, fatigue, and abandonment.
      </p>

      <Callout>
        <strong>How to use this lab:</strong> Navigate via the sidebar on the left. Each section
        contains a brief explanation and a live demo. The goal is to prove these principles viscerally
        — experiencing the friction or ease firsthand is when abstract theory becomes intuitive design
        sense.
      </Callout>
    </div>
  )
}
