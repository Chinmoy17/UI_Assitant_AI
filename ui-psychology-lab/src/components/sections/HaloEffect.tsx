import Callout from '../shared/Callout'
import DemoBox from '../shared/DemoBox'

export default function HaloEffect() {
  return (
    <div className="section-enter">
      <h2 style={{ fontSize: 32, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 8 }}>
        The Halo Effect (Aesthetic-Usability Effect)
      </h2>
      <p style={{ fontSize: 17, color: '#8b919a', marginBottom: 24, maxWidth: '70ch', lineHeight: 1.5 }}>
        A single positive trait (like looking beautiful) colors the user's perception of unrelated
        traits (like functionality, security, or value).
      </p>
      <p style={{ marginBottom: 14, maxWidth: '70ch' }}>
        Coined in 1920 by Edward Thorndike, the Halo Effect explains why we assume attractive people
        are smarter. In UI, it manifests as the Aesthetic-Usability Effect (studied by Kurosu and
        Kashimura in 1995). Users consistently rate visually appealing interfaces as more usable,
        more trustworthy, and higher quality — even if the underlying code is identical. Sloppy
        spacing doesn't just look bad; it erodes trust in the product's core competence.
      </p>

      <DemoBox label="Same content, different polish">
        <p style={{ marginBottom: 20, color: '#8b919a', fontSize: 14 }}>
          Which of these applications would you trust with your social security number or credit card?
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          {/* Bad version */}
          <div style={{
            fontFamily: '"Comic Sans MS", cursive',
            background: '#ffeb3b', border: '3px dashed red',
            padding: 15, color: '#111',
          }}>
            <h4 style={{ color: 'blue', textDecoration: 'underline', marginBottom: 8 }}>SecureBank!!!</h4>
            <p style={{ marginBottom: 12 }}>Welcome to the safest online bank ever!!! Your money is 100% protected!</p>
            <button style={{ background: 'lime', color: 'red', padding: '5px 8px', border: '2px ridge purple', cursor: 'pointer', fontFamily: 'inherit' }}>
              DEPOSIT NOW
            </button>
          </div>

          {/* Good version */}
          <div style={{ background: '#fff', color: '#111', padding: 20, borderRadius: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <div style={{ width: 24, height: 24, background: '#6366f1', borderRadius: 6 }} />
              <strong style={{ fontSize: 15 }}>SecureBank</strong>
            </div>
            <h4 style={{ fontSize: 18, marginBottom: 8, fontWeight: 600 }}>Banking, secured.</h4>
            <p style={{ color: '#555', fontSize: 14, marginBottom: 16 }}>
              256-bit encryption. FDIC insured. Trusted by 2M+ customers.
            </p>
            <button className="btn-primary">Open an account →</button>
          </div>
        </div>
      </DemoBox>

      <Callout>
        The promises are identical, but the perceived reality is wildly different. Poor typography
        and harsh colors in the first card trigger a visceral sense of "scam." Good design is the
        fastest way to manufacture trust.
      </Callout>
    </div>
  )
}
