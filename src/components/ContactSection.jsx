import { useState } from 'react'

const inputStyle = {
  width: '100%',
  background: '#FFF',
  border: '1px solid rgba(0,0,0,0.12)',
  borderRadius: '6px',
  padding: '14px 16px',
  fontFamily: 'DM Sans, sans-serif',
  fontSize: '15px',
  color: '#1A1A1A',
  outline: 'none',
  boxSizing: 'border-box',
  transition: 'border-color 200ms ease',
}

const labelStyle = {
  fontFamily: 'DM Sans, sans-serif',
  fontSize: '12px',
  letterSpacing: '2px',
  color: '#666',
  textTransform: 'uppercase',
  display: 'block',
  marginBottom: '8px',
}

function goldFocus(e) {
  e.currentTarget.style.borderColor = '#F4C400'
}
function clearFocus(e) {
  e.currentTarget.style.borderColor = 'rgba(0,0,0,0.12)'
}

const benefits = [
  'Personalized training + nutrition plan',
  'Weekly check-ins and data-driven adjustments',
  'WhatsApp access to your coach',
  'Competition prep available on request',
  'Festival and real-life eating accommodated',
]

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section style={{ background: '#FFFFFF', padding: 'clamp(80px, 10vw, 120px) clamp(24px, 4vw, 96px)' }}>
      <div className="grid grid-cols-1 md:grid-cols-2" style={{ maxWidth: '1200px', margin: '0 auto', gap: '48px', alignItems: 'start' }}>
        <div>
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', letterSpacing: '4px', color: '#F4C400', textTransform: 'uppercase', marginBottom: '16px' }}>
            Begin the Conversation
          </p>
          <h2 style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 700, fontSize: 'clamp(28px, 4vw, 52px)', color: '#0B0B0C', textTransform: 'uppercase', marginBottom: '24px' }}>
            See If We're<br /><span style={{ color: '#F4C400' }}>A Good Fit</span>
          </h2>
          <p style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: '20px', color: '#444', lineHeight: 1.7, marginBottom: '32px' }}>
            We personally review every application. Expect to hear back within 48 hours.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {benefits.map((text) => (
              <div key={text} style={{ display: 'flex', gap: '14px' }}>
                <span style={{ color: '#F4C400', fontSize: '18px' }}>✓</span>
                <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '15px', color: '#444' }}>{text}</span>
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} style={{ background: '#F7F5F0', borderRadius: '8px', padding: '48px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {['Full Name', 'Email Address', 'WhatsApp Number'].map((label) => (
            <div key={label}>
              <label style={labelStyle}>{label}</label>
              <input
                required
                type={label.includes('Email') ? 'email' : label.includes('Number') ? 'tel' : 'text'}
                style={inputStyle}
                onFocus={goldFocus}
                onBlur={clearFocus}
              />
            </div>
          ))}

          <div>
            <label style={labelStyle}>Your Goal</label>
            <select required style={{ ...inputStyle, appearance: 'none' }} onFocus={goldFocus} onBlur={clearFocus} defaultValue="">
              <option value="" disabled>Select your goal</option>
              <option>Sustainable fat loss / body recomposition</option>
              <option>Contest / bikini prep</option>
              <option>Posing coaching only</option>
              <option>Group training</option>
              <option>Not sure yet</option>
            </select>
          </div>

          <div>
            <label style={labelStyle}>Tell Us About Your Goals</label>
            <textarea rows={4} style={{ ...inputStyle, resize: 'vertical' }} onFocus={goldFocus} onBlur={clearFocus} />
          </div>

          <button
            type="submit"
            style={{ background: '#F4C400', color: '#0B0B0C', fontFamily: 'Oswald, sans-serif', fontWeight: 600, fontSize: '14px', letterSpacing: '2px', textTransform: 'uppercase', padding: '18px', borderRadius: '999px', border: 'none', cursor: 'pointer', width: '100%', minHeight: '52px' }}
          >
            {submitted ? 'Application Received' : 'Start My Transformation'}
          </button>

          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', color: '#999', textAlign: 'center' }}>
            We personally review every application and respond within 48 hours.
          </p>
        </form>
      </div>
    </section>
  )
}
