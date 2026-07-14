import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

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
  transition: 'border-color 200ms ease, box-shadow 200ms ease',
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
  e.currentTarget.style.boxShadow = '0 0 12px rgba(244,196,0,0.15)'
}
function clearFocus(e) {
  e.currentTarget.style.borderColor = 'rgba(0,0,0,0.12)'
  e.currentTarget.style.boxShadow = 'none'
}

const benefits = [
  'Personalized training + nutrition plan',
  'Weekly check-ins and data-driven adjustments',
  'WhatsApp access to your coach',
  'Competition prep available on request',
  'Festival and real-life eating accommodated',
]

const fieldsContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

const fieldItem = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

export default function ContactSection() {
  const [status, setStatus] = useState('idle') // idle | submitting | success

  function handleSubmit(e) {
    e.preventDefault()
    setStatus('submitting')
    setTimeout(() => setStatus('success'), 900)
  }

  return (
    <section id="contact" style={{ background: '#FFFFFF', padding: 'clamp(80px, 10vw, 120px) clamp(24px, 4vw, 96px)' }}>
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

        <div style={{ background: '#F7F5F0', borderRadius: '8px', padding: '48px', minHeight: '480px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                style={{ textAlign: 'center', padding: '24px 0' }}
              >
                <motion.div
                  initial={{ rotate: -180, scale: 0.5 }}
                  animate={{ rotate: 0, scale: 1 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  style={{ fontSize: '56px', color: '#F4C400', marginBottom: '20px' }}
                >
                  ✓
                </motion.div>
                <h3 style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 700, fontSize: '24px', color: '#0B0B0C', marginBottom: '8px', textTransform: 'uppercase' }}>
                  Application Received
                </h3>
                <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '15px', color: '#666' }}>
                  We personally review every application and respond within 48 hours.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                variants={fieldsContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '0px 0px -80px 0px' }}
                style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
              >
                {['Full Name', 'Email Address', 'WhatsApp Number'].map((label) => (
                  <motion.div variants={fieldItem} key={label}>
                    <label style={labelStyle}>{label}</label>
                    <input
                      required
                      type={label.includes('Email') ? 'email' : label.includes('Number') ? 'tel' : 'text'}
                      style={inputStyle}
                      onFocus={goldFocus}
                      onBlur={clearFocus}
                    />
                  </motion.div>
                ))}

                <motion.div variants={fieldItem}>
                  <label style={labelStyle}>Your Goal</label>
                  <select required style={{ ...inputStyle, appearance: 'none' }} onFocus={goldFocus} onBlur={clearFocus} defaultValue="">
                    <option value="" disabled>Select your goal</option>
                    <option>Sustainable fat loss / body recomposition</option>
                    <option>Contest / bikini prep</option>
                    <option>Posing coaching only</option>
                    <option>Group training</option>
                    <option>Not sure yet</option>
                  </select>
                </motion.div>

                <motion.div variants={fieldItem}>
                  <label style={labelStyle}>Tell Us About Your Goals</label>
                  <textarea rows={4} style={{ ...inputStyle, resize: 'vertical' }} onFocus={goldFocus} onBlur={clearFocus} />
                </motion.div>

                <motion.button
                  variants={fieldItem}
                  type="submit"
                  disabled={status === 'submitting'}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    background: '#F4C400',
                    color: '#0B0B0C',
                    fontFamily: 'Oswald, sans-serif',
                    fontWeight: 600,
                    fontSize: '14px',
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                    padding: '18px',
                    borderRadius: '999px',
                    border: 'none',
                    cursor: status === 'submitting' ? 'not-allowed' : 'pointer',
                    opacity: status === 'submitting' ? 0.7 : 1,
                    width: '100%',
                    minHeight: '52px',
                  }}
                >
                  {status === 'submitting' && (
                    <span
                      style={{
                        display: 'inline-block',
                        width: '14px',
                        height: '14px',
                        border: '2px solid transparent',
                        borderTop: '2px solid #0B0B0C',
                        borderRadius: '50%',
                        animation: 'spin 0.8s linear infinite',
                      }}
                    />
                  )}
                  {status === 'submitting' ? 'Submitting...' : 'Start My Transformation'}
                </motion.button>

                <motion.p variants={fieldItem} style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', color: '#999', textAlign: 'center' }}>
                  We personally review every application and respond within 48 hours.
                </motion.p>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
