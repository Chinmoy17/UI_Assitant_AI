import Callout from '../shared/Callout'
import DemoBox from '../shared/DemoBox'

export default function Affordance() {
  return (
    <div className="section-enter">
      <h2 className="text-[32px] font-bold mb-2 tracking-tight">Affordance &amp; Signifiers</h2>
      <p className="text-[17px] text-text-dim mb-6 max-w-[70ch]">
        An affordance is what an object can do. A signifier is the visual cue that communicates that
        affordance to the user.
      </p>
      <p className="mb-3 max-w-[70ch]">
        Coined by Don Norman in his seminal book "The Design of Everyday Things," affordances define
        interactions. A door with a flat plate affords pushing; a door with a handle affords pulling.
        In digital design, a button affords clicking. However, if the button is perfectly flat text,
        it lacks a <em>signifier</em>. The user has to guess or hover to find out if it's interactive.
        Shadows, gradients, and borders are digital signifiers derived from the physical world.
      </p>

      <DemoBox label="Which feels more clickable?">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <p className="mb-4 text-text-dim text-[13px]">Flat (no signifiers)</p>
            <button
              className="cursor-pointer"
              style={{
                background: '#6366f1',
                color: '#fff',
                padding: '12px 20px',
                border: 'none',
                fontSize: 14,
              }}
            >
              Submit
            </button>
          </div>
          <div className="text-center">
            <p className="mb-4 text-text-dim text-[13px]">Depth signifiers (gradient, shadow, radius)</p>
            <button
              style={{
                background: 'linear-gradient(180deg,#7c7ff5,#4f52d8)',
                color: '#fff',
                padding: '12px 20px',
                border: 'none',
                borderRadius: 6,
                fontSize: 14,
                cursor: 'pointer',
                boxShadow: '0 1px 0 rgba(255,255,255,.2) inset, 0 2px 4px rgba(0,0,0,.3)',
              }}
              onMouseDown={e => (e.currentTarget.style.transform = 'translateY(1px)')}
              onMouseUp={e => (e.currentTarget.style.transform = '')}
            >
              Submit
            </button>
          </div>
        </div>
      </DemoBox>

      <Callout>
        Both are functional <code className="font-mono bg-surface2 px-1.5 py-0.5 rounded text-[0.9em]">&lt;button&gt;</code> elements. But the second explicitly{' '}
        <em>signals</em> clickability through 3D depth cues that your visual system evolved to
        understand intuitively. Beware of "false affordances" where things look clickable but aren't.
      </Callout>
    </div>
  )
}
