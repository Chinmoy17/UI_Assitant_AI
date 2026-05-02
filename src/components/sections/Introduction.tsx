import Callout from '../shared/Callout'

export default function Introduction() {
  return (
    <div className="section-enter">
      <h2 className="text-[32px] font-bold mb-2 tracking-tight">The Psychology of UI</h2>
      <p className="text-[17px] text-text-dim mb-6 max-w-[70ch]">
        An interactive lab where you don't just read about cognitive principles — you experience them directly on your own brain.
      </p>

      <h3 className="text-[18px] font-semibold mt-8 mb-3">Core thesis</h3>
      <p className="mb-3 max-w-[70ch]">
        A UI is not merely a visual artifact or a canvas for artistic expression. It's fundamentally a{' '}
        <strong>cognitive prosthetic</strong>. Every pixel, margin, and color choice you make either reduces
        or increases the mental workload of your users.
      </p>
      <p className="mb-3 max-w-[70ch]">
        The human brain is an incredibly powerful but highly optimized machine. It operates as a fast,
        lazy, biased pattern-matcher with a strictly limited working memory (roughly 4–7 items at a time)
        and is governed by 200-millisecond reflex loops. Because thinking burns calories, our brains have
        evolved to avoid deep analytical thought whenever possible, relying instead on heuristics and
        visual shortcuts.
      </p>
      <p className="mb-3 max-w-[70ch]">
        Your interface either cooperates with this biological reality, making tasks feel frictionless and
        intuitive, or it fights it, causing frustration, fatigue, and abandonment.
      </p>

      <Callout>
        <strong>How to use this lab:</strong> Navigate via the sidebar on the left. Each section contains
        a brief explanation and a live demo. The goal is to prove these principles viscerally — experiencing
        the friction or ease firsthand is when abstract theory becomes intuitive design sense.
      </Callout>
    </div>
  )
}
