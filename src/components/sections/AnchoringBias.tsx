import DemoBox from '../shared/DemoBox'

function PriceTier({
  name, price, desc, featured = false, badge,
}: {
  name: string; price: string; desc: string; featured?: boolean; badge?: string
}) {
  return (
    <div
      className={[
        'bg-surface2 p-5 rounded-md border-2 text-center',
        featured ? 'border-accent scale-105' : 'border-border',
      ].join(' ')}
    >
      {badge && (
        <span className="text-[10px] bg-accent text-white px-2 py-0.5 rounded-full inline-block mb-1">
          {badge}
        </span>
      )}
      <div className="text-text-dim text-[13px] uppercase tracking-widest">{name}</div>
      <div className="text-[28px] font-bold my-2">{price}</div>
      <div className="text-text-dim text-[13px]">{desc}</div>
    </div>
  )
}

export default function AnchoringBias() {
  return (
    <div className="section-enter">
      <h2 className="text-[32px] font-bold mb-2 tracking-tight">Anchoring Bias</h2>
      <p className="text-[17px] text-text-dim mb-6 max-w-[70ch]">
        The first piece of information you see acts as an "anchor," calibrating how you perceive every
        subsequent piece of information.
      </p>
      <p className="mb-3 max-w-[70ch]">
        Pioneered by psychologists Amos Tversky and Daniel Kahneman, anchoring is a cognitive bias
        heavily used in pricing and negotiations. If you see a $2,000 watch, a $400 watch suddenly
        feels like a bargain. Without the $2,000 anchor, the $400 watch might feel outrageously
        expensive. This is also linked to the "Decoy Effect," where an intentionally unappealing option
        is added to make the target option look better.
      </p>

      <DemoBox label="Pricing without anchoring">
        <div className="grid grid-cols-3 gap-3">
          <PriceTier name="Basic" price="$29" desc="For individuals" />
          <PriceTier name="Pro" price="$59" desc="For teams" />
          <PriceTier name="Business" price="$99" desc="For companies" />
        </div>
      </DemoBox>

      <DemoBox label="Same prices, anchored + featured tier">
        <div className="grid grid-cols-3 gap-3">
          <PriceTier name="Basic" price="$29" desc="For individuals" />
          <PriceTier name="Pro" price="$59" desc="For teams" featured badge="MOST POPULAR" />
          <PriceTier name="Business" price="$99" desc="For companies" />
        </div>
        <p className="mt-4 text-[13px] text-text-dim">
          Notice how the $99 tier anchors the $59 tier as "reasonable." Combined with visual
          highlighting, the Pro tier becomes the path of least resistance.
        </p>
      </DemoBox>
    </div>
  )
}
