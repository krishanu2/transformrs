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

export default function ProgramsSection() {
  return (
    <section style={{ background: '#F7F5F0', padding: 'clamp(80px, 10vw, 120px) clamp(24px, 4vw, 96px)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ marginBottom: '48px' }}>
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', letterSpacing: '4px', color: '#F4C400', textTransform: 'uppercase', marginBottom: '12px' }}>
            Your Path Forward
          </p>
          <h2 style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 700, fontSize: 'clamp(28px, 4vw, 48px)', color: '#0B0B0C', textTransform: 'uppercase' }}>
            Choose Your Journey
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: '16px' }}>
          <div className="md:col-span-2" style={{ background: '#0B0B0C', borderRadius: '8px', padding: '48px', borderTop: '3px solid #F4C400', display: 'flex', flexDirection: 'column', gap: '16px', minHeight: '280px', ...cardTransition }} {...cardHover(false)}>
            <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', letterSpacing: '3px', color: '#F4C400', textTransform: 'uppercase' }}>Most Popular</span>
            <h3 style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 700, fontSize: '32px', color: '#FFF', textTransform: 'uppercase' }}>Lifestyle Coaching</h3>
            <p style={{ fontFamily: 'DM Sans, sans-serif', color: 'rgba(255,255,255,0.6)', fontSize: '15px', lineHeight: 1.7 }}>
              Science-backed body transformation for real life. Training + nutrition that works around festivals, family, and everything in between.
            </p>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '8px', listStyle: 'none', padding: 0 }}>
              {['Weekly check-ins & adjustments', 'Spreadsheet-based progress tracking', 'WhatsApp coaching support', 'Custom meal + training plan'].map((f) => (
                <li key={f} style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', color: 'rgba(255,255,255,0.7)', display: 'flex', gap: '10px' }}>
                  <span style={{ color: '#F4C400' }}>→</span> {f}
                </li>
              ))}
            </ul>
            <button style={{ ...btnBase, background: '#F4C400', color: '#0B0B0C' }}>Apply Now</button>
          </div>

          <div style={{ background: '#F4C400', borderRadius: '8px', padding: '40px 32px', display: 'flex', flexDirection: 'column', gap: '12px', minHeight: '280px', ...cardTransition }} {...cardHover(true)}>
            <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', letterSpacing: '3px', color: 'rgba(0,0,0,0.5)', textTransform: 'uppercase' }}>For Competitors</span>
            <h3 style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 700, fontSize: '28px', color: '#0B0B0C', textTransform: 'uppercase', lineHeight: 1.1 }}>Contest Prep Coaching</h3>
            <p style={{ fontFamily: 'DM Sans, sans-serif', color: 'rgba(0,0,0,0.7)', fontSize: '14px', lineHeight: 1.6 }}>
              Full-cycle prep from off-season to stage day. Peak week, tanning, pump-up — we've done it ourselves.
            </p>
            <button style={{ ...btnBase, background: '#0B0B0C', color: '#F4C400', padding: '12px 24px' }}>Learn More</button>
          </div>

          <div style={{ background: '#FFFFFF', border: '1px solid rgba(0,0,0,0.08)', borderRadius: '8px', padding: '40px 32px', display: 'flex', flexDirection: 'column', gap: '12px', ...cardTransition }} {...cardHover(false)}>
            <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', letterSpacing: '3px', color: '#F4C400', textTransform: 'uppercase' }}>Add-On Service</span>
            <h3 style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 700, fontSize: '24px', color: '#0B0B0C', textTransform: 'uppercase' }}>Posing Coaching</h3>
            <p style={{ fontFamily: 'DM Sans, sans-serif', color: '#666', fontSize: '14px', lineHeight: 1.6 }}>Stage presence from IFBB Pros. All categories. Online or in-person.</p>
            <button style={{ ...btnBase, background: 'transparent', color: '#0B0B0C', border: '1.5px solid #0B0B0C', padding: '12px 24px' }}>Book Session</button>
          </div>

          <div style={{ background: '#FFFFFF', border: '1px solid rgba(0,0,0,0.08)', borderRadius: '8px', padding: '40px 32px', display: 'flex', flexDirection: 'column', gap: '12px', ...cardTransition }} {...cardHover(false)}>
            <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', letterSpacing: '3px', color: '#C6417E', textTransform: 'uppercase' }}>In-Person</span>
            <h3 style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 700, fontSize: '24px', color: '#0B0B0C', textTransform: 'uppercase' }}>Group Training</h3>
            <p style={{ fontFamily: 'DM Sans, sans-serif', color: '#666', fontSize: '14px', lineHeight: 1.6 }}>Hands-on sessions at our partner gym. Community energy, professional guidance.</p>
            <button style={{ ...btnBase, background: 'transparent', color: '#0B0B0C', border: '1.5px solid #0B0B0C', padding: '12px 24px' }}>Join Us</button>
          </div>

          <div style={{ background: '#1A1A1A', borderRadius: '8px', padding: '40px 32px', display: 'flex', flexDirection: 'column', gap: '12px', justifyContent: 'center', ...cardTransition }} {...cardHover(false)}>
            <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: '26px', color: '#FFF', lineHeight: 1.3 }}>Not sure which program is right for you?</h3>
            <p style={{ fontFamily: 'DM Sans, sans-serif', color: 'rgba(255,255,255,0.5)', fontSize: '14px' }}>Book a free 15-min discovery call. We'll figure it out together.</p>
            <button style={{ ...btnBase, background: 'transparent', color: '#F4C400', border: '1.5px solid #F4C400', padding: '12px 24px', marginTop: '8px' }}>Talk to Us</button>
          </div>
        </div>
      </div>
    </section>
  )
}
