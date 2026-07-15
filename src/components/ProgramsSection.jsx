import { useEffect, useState } from 'react'

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

// Used only if /api/pricing can't be reached, so pricing never just disappears.
const FALLBACK_TIERS = [
  { id: 'fallback-20', program_key: 'posing', tier_label: '20 min session', original_price_cents: null, price_cents: 150000, is_free: false },
  { id: 'fallback-40', program_key: 'posing', tier_label: '40 min session', original_price_cents: null, price_cents: 210000, is_free: false },
]

function formatRupees(cents) {
  return `₹${Math.round(cents / 100).toLocaleString('en-IN')}`
}

function PriceTable({ tiers, dark }) {
  if (!tiers.length) return null
  const textColor = dark ? '#FFF' : '#0B0B0C'
  const labelColor = dark ? 'rgba(255,255,255,0.7)' : '#444'
  const borderColor = dark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.08)'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', marginTop: '4px', border: `1px solid ${borderColor}`, borderRadius: '6px', overflow: 'hidden' }}>
      {tiers.map((tier, i) => (
        <div key={tier.id}>
          {i > 0 && <div style={{ height: '1px', background: borderColor }} />}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 16px' }}>
            <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', color: labelColor }}>{tier.tier_label}</span>
            <span style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
              {tier.is_free ? (
                <span style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 700, fontSize: '18px', color: '#F4C400' }}>FREE</span>
              ) : (
                <>
                  {tier.original_price_cents != null && (
                    <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: dark ? 'rgba(255,255,255,0.4)' : '#999', textDecoration: 'line-through' }}>
                      {formatRupees(tier.original_price_cents)}
                    </span>
                  )}
                  <span style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 700, fontSize: '18px', color: textColor }}>
                    {tier.price_cents != null ? formatRupees(tier.price_cents) : 'Contact us'}
                  </span>
                </>
              )}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default function ProgramsSection() {
  const [tiers, setTiers] = useState(FALLBACK_TIERS)

  useEffect(() => {
    fetch('/api/pricing')
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data) => {
        if (Array.isArray(data)) setTiers(data)
      })
      .catch(() => {
        // keep the fallback tiers already in state
      })
  }, [])

  const tiersFor = (key) => tiers.filter((t) => t.program_key === key)

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
            <PriceTable tiers={tiersFor('lifestyle')} dark />
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
            <PriceTable tiers={tiersFor('contest_prep')} />
            <button style={{ ...btnBase, background: '#0B0B0C', color: '#F4C400' }}>Learn More</button>
          </div>

          <div style={{ background: '#FFFFFF', border: '1px solid rgba(0,0,0,0.08)', borderRadius: '8px', padding: '40px 32px', display: 'flex', flexDirection: 'column', gap: '16px', ...cardTransition }} {...cardHover(false)}>
            <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', letterSpacing: '3px', color: '#F4C400', textTransform: 'uppercase' }}>Add-On Service</span>
            <h3 style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 700, fontSize: '28px', color: '#0B0B0C', textTransform: 'uppercase' }}>Posing Coaching</h3>
            <p style={{ fontFamily: 'DM Sans, sans-serif', color: '#666', fontSize: '14px', lineHeight: 1.6 }}>
              Online posing sessions for any category — stage presence from an IFBB Pro.
            </p>
            <PriceTable tiers={tiersFor('posing')} />
            <button style={{ ...btnBase, background: 'transparent', color: '#0B0B0C', border: '1.5px solid #0B0B0C' }}>Book Session</button>
          </div>
        </div>
      </div>
    </section>
  )
}
