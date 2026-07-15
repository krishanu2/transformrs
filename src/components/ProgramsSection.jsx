const btnBase = {
  fontFamily: 'Oswald, sans-serif',
  fontWeight: 600,
  fontSize: '13px',
  letterSpacing: '2px',
  textTransform: 'uppercase',
  padding: '14px 32px',
  borderRadius: '999px',
  border: 'none',
  cursor: 'pointer',
  alignSelf: 'flex-start',
  marginTop: 'auto',
}

function cardHover(gold) {
  return {
    onMouseEnter: (e) => {
      e.currentTarget.style.transform = 'translateY(-8px)'
      e.currentTarget.style.boxShadow = gold
        ? '0 0 24px rgba(244,196,0,0.25), 0 16px 48px rgba(0,0,0,0.2)'
        : '0 16px 48px rgba(0,0,0,0.2)'
    },
    onMouseLeave: (e) => {
      e.currentTarget.style.transform = 'translateY(0)'
      e.currentTarget.style.boxShadow = 'none'
    },
  }
}

const cardTransition = { transition: 'transform 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94)' }

const lifestyleItems = [
  'Customised meal plan (macros & micros)',
  'Customised training plan',
  'Weekly check-ins & adjustments',
  'Bio-feedback tracking',
  'Spreadsheet-based progress tracking',
  'WhatsApp coaching support',
  'Supplement plan',
]

const contestPrepItems = ['Everything in Lifestyle Coaching', 'Backstage support on show day', 'Individualised off-season & contest-prep approach']

export default function ProgramsSection() {
  return (
    <section id="programs" style={{ background: '#F7F5F0', padding: 'clamp(80px, 10vw, 120px) clamp(24px, 4vw, 96px)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ marginBottom: '48px' }}>
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', letterSpacing: '4px', color: '#F4C400', textTransform: 'uppercase', marginBottom: '12px' }}>
            Your Path Forward
          </p>
          <h2 style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 700, fontSize: 'clamp(28px, 4vw, 48px)', color: '#0B0B0C', textTransform: 'uppercase' }}>
            Choose Your Journey
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: '16px', alignItems: 'stretch' }}>
          <div style={{ background: '#0B0B0C', borderRadius: '8px', padding: '40px 32px', borderTop: '3px solid #F4C400', display: 'flex', flexDirection: 'column', gap: '16px', ...cardTransition }} {...cardHover(false)}>
            <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', letterSpacing: '3px', color: '#F4C400', textTransform: 'uppercase' }}>Most Popular</span>
            <h3 style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 700, fontSize: '28px', color: '#FFF', textTransform: 'uppercase' }}>Lifestyle Coaching</h3>
            <p style={{ fontFamily: 'DM Sans, sans-serif', color: 'rgba(255,255,255,0.6)', fontSize: '14px', lineHeight: 1.6 }}>
              Science-backed body transformation for real life — training and nutrition that works around festivals, family, and everything in between.
            </p>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '8px', listStyle: 'none', padding: 0 }}>
              {lifestyleItems.map((f) => (
                <li key={f} style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: 'rgba(255,255,255,0.7)', display: 'flex', gap: '10px' }}>
                  <span style={{ color: '#F4C400', flexShrink: 0 }}>→</span> {f}
                </li>
              ))}
            </ul>
            <button style={{ ...btnBase, background: '#F4C400', color: '#0B0B0C' }}>Apply Now</button>
          </div>

          <div style={{ background: '#F4C400', borderRadius: '8px', padding: '40px 32px', display: 'flex', flexDirection: 'column', gap: '16px', ...cardTransition }} {...cardHover(true)}>
            <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', letterSpacing: '3px', color: 'rgba(0,0,0,0.5)', textTransform: 'uppercase' }}>For Competitors</span>
            <h3 style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 700, fontSize: '28px', color: '#0B0B0C', textTransform: 'uppercase', lineHeight: 1.1 }}>Contest Prep Coaching</h3>
            <p style={{ fontFamily: 'DM Sans, sans-serif', color: 'rgba(0,0,0,0.7)', fontSize: '14px', lineHeight: 1.6 }}>
              Full-cycle prep from off-season to stage day. Peak week, tanning, pump-up — we've done it ourselves.
            </p>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '8px', listStyle: 'none', padding: 0 }}>
              {contestPrepItems.map((f) => (
                <li key={f} style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: 'rgba(0,0,0,0.75)', display: 'flex', gap: '10px' }}>
                  <span style={{ color: '#0B0B0C', flexShrink: 0 }}>→</span> {f}
                </li>
              ))}
            </ul>
            <button style={{ ...btnBase, background: '#0B0B0C', color: '#F4C400' }}>Learn More</button>
          </div>

          <div style={{ background: '#FFFFFF', border: '1px solid rgba(0,0,0,0.08)', borderRadius: '8px', padding: '40px 32px', display: 'flex', flexDirection: 'column', gap: '16px', ...cardTransition }} {...cardHover(false)}>
            <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', letterSpacing: '3px', color: '#F4C400', textTransform: 'uppercase' }}>Add-On Service</span>
            <h3 style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 700, fontSize: '28px', color: '#0B0B0C', textTransform: 'uppercase' }}>Posing Coaching</h3>
            <p style={{ fontFamily: 'DM Sans, sans-serif', color: '#666', fontSize: '14px', lineHeight: 1.6 }}>
              Online posing sessions for any category — stage presence from an IFBB Pro.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0', marginTop: '4px', border: '1px solid rgba(0,0,0,0.08)', borderRadius: '6px', overflow: 'hidden' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 16px' }}>
                <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', color: '#444' }}>20 min session</span>
                <span style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 700, fontSize: '18px', color: '#0B0B0C' }}>₹1,500</span>
              </div>
              <div style={{ height: '1px', background: 'rgba(0,0,0,0.08)' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 16px' }}>
                <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', color: '#444' }}>40 min session</span>
                <span style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 700, fontSize: '18px', color: '#0B0B0C' }}>₹2,100</span>
              </div>
            </div>
            <button style={{ ...btnBase, background: 'transparent', color: '#0B0B0C', border: '1.5px solid #0B0B0C' }}>Book Session</button>
          </div>
        </div>
      </div>
    </section>
  )
}
