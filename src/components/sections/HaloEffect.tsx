import Callout from '../shared/Callout'
import DemoBox from '../shared/DemoBox'

export default function HaloEffect() {
  return (
    <div className="section-enter">
      <h2 className="text-[32px] font-bold mb-2 tracking-tight">The Halo Effect (Aesthetic-Usability Effect)</h2>
      <p className="text-[17px] text-text-dim mb-6 max-w-[70ch]">
        A single positive trait (like looking beautiful) colors the user's perception of unrelated
        traits (like functionality, security, or value).
      </p>
      <p className="mb-3 max-w-[70ch]">
        Coined in 1920 by Edward Thorndike, the Halo Effect explains why we assume attractive people
        are smarter. In UI, it manifests as the Aesthetic-Usability Effect (studied by Kurosu and
        Kashimura in 1995). Users consistently rate visually appealing interfaces as more usable, more
        trustworthy, and higher quality — even if the underlying code is identical. Sloppy spacing
        doesn't just look bad; it erodes trust in the product's core competence.
      </p>

      <DemoBox label="Same content, different polish">
        <p className="mb-4">
          Which of these applications would you trust with your social security number or credit card?
        </p>
        <div className="grid grid-cols-2 gap-4">
          {/* Bad version */}
          <div
            style={{
              fontFamily: '"Comic Sans MS", cursive',
              background: '#ffeb3b',
              border: '3px dashed red',
              padding: 15,
              borderRadius: 0,
              color: '#111',
            }}
          >
            <h4 style={{ color: 'blue', textDecoration: 'underline' }}>SecureBank!!!</h4>
            <p>Welcome to the safest online bank ever!!! Your money is 100% protected!</p>
            <button style={{ background: 'lime', color: 'red', padding: 5, border: '2px ridge purple', marginTop: 8 }}>
              DEPOSIT NOW
            </button>
          </div>

          {/* Good version */}
          <div className="bg-white text-[#111] p-5 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 bg-accent rounded-md" />
              <strong>SecureBank</strong>
            </div>
            <h4 className="text-[18px] mb-2">Banking, secured.</h4>
            <p className="text-[#555] text-[14px] mb-4">256-bit encryption. FDIC insured. Trusted by 2M+ customers.</p>
            <button className="bg-accent text-white px-4 py-2.5 rounded-md text-[14px] font-medium hover:bg-accent-h transition-colors cursor-pointer">
              Open an account →
            </button>
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
