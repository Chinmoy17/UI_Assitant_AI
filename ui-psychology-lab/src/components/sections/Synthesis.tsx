import Callout from '../shared/Callout'

export default function Synthesis() {
  return (
    <div className="section-enter">
      <h2 style={{ fontSize: 32, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 8 }}>
        Synthesis
      </h2>
      <p style={{ fontSize: 17, color: '#8b919a', marginBottom: 24, maxWidth: '70ch', lineHeight: 1.5 }}>
        Now that you've felt the principles, you possess the operating system for making rational
        UI decisions.
      </p>

      <h3 style={{ fontSize: 18, fontWeight: 600, marginTop: 32, marginBottom: 12 }}>
        The Three Questions Test
      </h3>
      <p style={{ marginBottom: 16, maxWidth: '70ch' }}>
        Every screen you design must answer three questions in under 5 seconds, without requiring
        the user to scroll or think deeply:
      </p>
      <ul style={{ marginLeft: 20, marginBottom: 20, lineHeight: 2 }}>
        <li><strong>Where am I?</strong> — Clear navigation, active states, page titles</li>
        <li><strong>What can I do here?</strong> — Clear affordances, recognizable patterns, legible typography</li>
        <li><strong>What should I do next?</strong> — Strong visual hierarchy, obvious primary CTA</li>
      </ul>

      <h3 style={{ fontSize: 18, fontWeight: 600, marginTop: 32, marginBottom: 12 }}>
        The "Why?" Stack
      </h3>
      <p style={{ marginBottom: 14, maxWidth: '70ch' }}>
        For every design decision — a border, a shadow, a color shift — ask "why?" If the answer is
        "because it looks cool," reconsider it. If the answer is "to group related elements to reduce
        cognitive load" or "to provide a larger target area according to Fitts's Law," keep it.
      </p>

      <Callout>
        Remember: The user's brain is a fast, lazy, biased pattern-matcher with a 4-slot working
        memory operating on 200ms reflexes. Empathy in design doesn't just mean understanding their
        feelings; it means understanding their biology. Every principle in this lab is a tool for
        cooperating with that biology.
      </Callout>

      <footer style={{ paddingTop: 32, marginTop: 64, color: '#8b919a', fontSize: 13, borderTop: '1px solid #2a2f37' }}>
        UI Psychology Lab · Enhanced Edition · A meta-demonstration of its own principles.
      </footer>
    </div>
  )
}
