import { useState } from 'react'
import Callout from '../shared/Callout'
import DemoBox from '../shared/DemoBox'

export default function SquintTest() {
  const [blurred, setBlurred] = useState(false)

  return (
    <div className="section-enter">
      <h2 className="text-[32px] font-bold mb-2 tracking-tight">The Squint Test</h2>
      <p className="text-[17px] text-text-dim mb-6 max-w-[70ch]">
        Squint until details blur. The blobs that remain are your actual visual hierarchy.
      </p>
      <p className="mb-3 max-w-[70ch]">
        The "Squint Test" (or blur test) is a practical heuristic for evaluating hierarchy. By blurring
        the screen, you strip away the semantic meaning of the words and the intricate details of the
        icons. You are left only with the pre-attentive features: high-contrast shapes, large text blocks,
        and colored buttons. If the most important action isn't glaringly obvious when blurred, your
        hierarchy is broken.
      </p>

      <DemoBox label="Squint mode">
        <button
          onClick={() => setBlurred(b => !b)}
          className="px-4 py-2 rounded-md border border-border text-text-dim text-[14px] hover:bg-surface2 transition-colors cursor-pointer"
        >
          Toggle squint
        </button>
        <div
          className={`squint-target bg-white text-[#111] p-8 rounded-lg mt-4 transition-all duration-300 ${blurred ? 'blur' : ''}`}
        >
          <div className="flex justify-between items-center mb-6">
            <strong className="text-[18px]">Acme</strong>
            <div className="flex gap-4 text-[13px] text-[#555]">
              <span>Features</span><span>Pricing</span><span>Docs</span><span>Sign in</span>
            </div>
          </div>
          <h2 className="text-[36px] text-[#111] mb-3">Build interfaces faster.</h2>
          <p className="text-[#555] max-w-[60ch] mb-6">A component library for serious teams.</p>
          <button className="bg-accent text-white px-7 py-3.5 rounded-md text-[15px] font-medium hover:bg-accent-h transition-colors cursor-pointer">
            Get started free →
          </button>
          <span className="ml-3 text-[#888] text-[13px]">No credit card required</span>
        </div>
      </DemoBox>

      <Callout>
        When blurred, the primary Call-To-Action (the button) and the main headline should be the only
        distinct elements remaining. That confirms your layout is successfully directing the user's attention.
      </Callout>
    </div>
  )
}
