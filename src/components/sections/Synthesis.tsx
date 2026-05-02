import Callout from '../shared/Callout'

export default function Synthesis() {
  return (
    <div className="section-enter">
      <h2 className="text-[32px] font-bold mb-2 tracking-tight">Synthesis</h2>
      <p className="text-[17px] text-text-dim mb-6 max-w-[70ch]">
        Now that you've felt the principles, you possess the operating system for making rational UI decisions.
      </p>

      <h3 className="text-[18px] font-semibold mt-8 mb-3">The Three Questions Test</h3>
      <p className="mb-5 max-w-[70ch]">
        Every screen you design must answer three questions in under 5 seconds, without requiring the
        user to scroll or think deeply:
      </p>
      <ul className="list-disc ml-5 mb-5 space-y-1 max-w-[70ch]">
        <li><strong>Where am I?</strong> (Clear navigation, active states, page titles)</li>
        <li><strong>What can I do here?</strong> (Clear affordances, recognizable patterns, legible typography)</li>
        <li><strong>What should I do next?</strong> (Strong visual hierarchy, obvious primary CTA)</li>
      </ul>

      <h3 className="text-[18px] font-semibold mt-8 mb-3">The "Why?" Stack</h3>
      <p className="mb-3 max-w-[70ch]">
        For every design decision — a border, a shadow, a color shift — ask "why?" If the answer is
        "because it looks cool," reconsider it. If the answer is "to group related elements to reduce
        cognitive load" or "to provide a larger target area according to Fitts's Law," keep it.
      </p>

      <Callout>
        Remember: The user's brain is a fast, lazy, biased pattern-matcher with a 4-slot working memory
        operating on 200ms reflexes. Empathy in design doesn't just mean understanding their feelings;
        it means understanding their biology. Every principle in this lab is a tool for cooperating with
        that biology.
      </Callout>

      <footer className="pt-8 mt-16 text-text-dim text-[13px] border-t border-border">
        UI Psychology Lab · Enhanced Edition · A meta-demonstration of its own principles.
      </footer>
    </div>
  )
}
