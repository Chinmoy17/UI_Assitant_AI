import DemoBox from '../shared/DemoBox'

function PriceTier({
  name, price, desc, featured = false, badge,
}: {
  name: string; price: string; desc: string; featured?: boolean; badge?: string
}) {
  return (
    <div style={{
      background: '#1c2026', padding: 20, borderRadius: 6, textAlign: 'center',
      border: `2px solid ${featured ? '#6366f1' : '#2a2f37'}`,
      transform: featured ? 'scale(1.05)' : 'none',
    }}>
      {badge && (
        <span style={{
          fontSize: 10, background: '#6366f1', color: '#fff',
          padding: '2px 10px', borderRadius: 99, display: 'inline-block', marginBottom: 6,
        }}>
          {badge}
        </span>
      )}
      <div style={{ color: '#8b919a', fontSize: 13, textTransform: 'uppercase', letterSpacing: 1 }}>{name}</div>
      <div style={{ fontSize: 28, fontWeight: 700, margin: '8px 0' }}>{price}</div>
      <div style={{ color: '#8b919a', fontSize: 13 }}>{desc}</div>
    </div>
  )
}

export default function AnchoringBias() {
  return (
    <div className="section-enter">
      <h2 style={{ fontSize: 32, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 8 }}>
        Anchoring Bias
      </h2>
      <p style={{ fontSize: 17, color: '#8b919a', marginBottom: 24, maxWidth: '70ch', lineHeight: 1.5 }}>
        The first piece of information you see acts as an "anchor," calibrating how you perceive
        every subsequent piece of information.
      </p>
      <p style={{ marginBottom: 14, maxWidth: '70ch' }}>
        Pioneered by Amos Tversky and Daniel Kahneman, anchoring is a cognitive bias heavily used
        in pricing and negotiations. If you see a $2,000 watch, a $400 watch suddenly feels like
        a bargain. This is also linked to the "Decoy Effect," where an intentionally unappealing
        option is added to make the target option look better.
      </p>

      <DemoBox label="Pricing without anchoring">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          <PriceTier name="Basic"    price="$29" desc="For individuals" />
          <PriceTier name="Pro"      price="$59" desc="For teams" />
          <PriceTier name="Business" price="$99" desc="For companies" />
        </div>
      </DemoBox>

      <DemoBox label="Same prices, anchored + featured tier">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, padding: '8px 0' }}>
          <PriceTier name="Basic"    price="$29" desc="For individuals" />
          <PriceTier name="Pro"      price="$59" desc="For teams" featured badge="MOST POPULAR" />
          <PriceTier name="Business" price="$99" desc="For companies" />
        </div>
        <p style={{ marginTop: 16, fontSize: 13, color: '#8b919a' }}>
          Notice how the $99 tier anchors the $59 tier as "reasonable." Combined with visual
          highlighting, the Pro tier becomes the path of least resistance.
        </p>
      </DemoBox>
    </div>
  )
}
