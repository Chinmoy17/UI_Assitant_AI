import { useState } from 'react'
import Callout from '../shared/Callout'
import DemoBox from '../shared/DemoBox'

export default function FPattern() {
  const [showHeat, setShowHeat] = useState(false)

  return (
    <div className="section-enter">
      <h2 className="text-[32px] font-bold mb-2 tracking-tight">F-Pattern Scanning</h2>
      <p className="text-[17px] text-text-dim mb-6 max-w-[70ch]">
        Eye-tracking studies by the Nielsen Norman Group consistently show that users don't read web
        pages linearly — they scan in an F-shaped pattern.
      </p>
      <p className="mb-3 max-w-[70ch]">
        The eye starts at the top left, scans horizontally across the top, drops down a bit, scans a
        shorter horizontal line, and then systematically drops down the left edge. Because of this,
        anything buried deep in the middle or bottom-right of a dense paragraph will be ignored.
      </p>

      <DemoBox label="Visualized heat overlay">
        <button
          onClick={() => setShowHeat(h => !h)}
          className="px-4 py-2 rounded-md border border-border text-text-dim text-[14px] hover:bg-surface2 transition-colors cursor-pointer"
        >
          Toggle heatmap
        </button>
        <div
          id="heatmapTarget"
          className={`heatmap relative bg-white text-[#1a1a1a] p-6 rounded-lg mt-4 leading-relaxed ${showHeat ? 'show-heat' : ''}`}
        >
          <h3 className="text-[22px] text-[#111] mb-3">Why developers love TypeScript: a deep dive</h3>
          <p>TypeScript has become the de facto language for building large-scale JavaScript applications. Its type system catches bugs at compile time that would otherwise surface at runtime, dramatically reducing production incidents.</p>
          <p className="mt-3">Beyond bug-prevention, TypeScript serves as living documentation. Types describe intent in a way comments cannot, because they are checked by the compiler.</p>
          <p className="mt-3">However, adoption requires investment. Teams must learn structural typing, generics, and the nuances of inference. The payoff comes after the learning curve flattens.</p>
        </div>
      </DemoBox>

      <Callout>
        <strong>The Takeaway:</strong> Front-load your important words. Start paragraphs with the core
        concept. Left-aligned bullet points and bolded text act as "anchors" to pull the scanning eye
        back into the content.
      </Callout>
    </div>
  )
}
