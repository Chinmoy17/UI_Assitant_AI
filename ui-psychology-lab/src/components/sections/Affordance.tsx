import Callout from '../shared/Callout'
import DemoBox from '../shared/DemoBox'

export default function Affordance() {
  return (
    <div className="section-enter">
      <h2 style={{ fontSize: 32, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 8 }}>
        Affordance &amp; Signifiers
      </h2>
      <p style={{ fontSize: 17, color: '#8b919a', marginBottom: 24, maxWidth: '70ch', lineHeight: 1.5 }}>
        An affordance is what an object can do. A signifier is the visual cue that communicates
        that affordance to the user.
      </p>
      <p style={{ marginBottom: 14, maxWidth: '70ch' }}>
        Coined by Don Norman in "The Design of Everyday Things," affordances define interactions.
        A door with a flat plate affords pushing; a door with a handle affords pulling. In digital
        design, a button affords clicking. However, if the button is perfectly flat text, it lacks
        a <em>signifier</em>. Shadows, gradients, and borders are digital signifiers derived from
        the physical world.
      </p>

      <DemoBox label="Which feels more clickable?">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          <div style={{ textAlign: 'center' }}>
            <p style={{ marginBottom: 16, color: '#8b919a', fontSize: 13 }}>Flat (no signifiers)</p>
            <button style={{
              background: '#6366f1', color: '#fff', padding: '12px 20px',
              border: 'none', fontSize: 14, cursor: 'pointer', fontFamily: 'inherit',
            }}>
              Submit
            </button>
          </div>
          <div style={{ textAlign: 'center' }}>
            <p style={{ marginBottom: 16, color: '#8b919a', fontSize: 13 }}>Depth signifiers (gradient, shadow, radius)</p>
            <button
              style={{
                background: 'linear-gradient(180deg,#7c7ff5,#4f52d8)', color: '#fff',
                padding: '12px 20px', border: 'none', borderRadius: 6, fontSize: 14,
                cursor: 'pointer', fontFamily: 'inherit',
                boxShadow: '0 1px 0 rgba(255,255,255,.2) inset, 0 2px 4px rgba(0,0,0,.35)',
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
        Both are functional <code className="code-inline">&lt;button&gt;</code> elements. But the
        second explicitly <em>signals</em> clickability through 3D depth cues that your visual system
        evolved to understand intuitively. Beware of "false affordances" where things look clickable
        but aren't.
      </Callout>
    </div>
  )
}
