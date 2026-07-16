import { motion } from 'framer-motion'

const benefits = [
  'Personalized training + nutrition plan',
  'Weekly check-ins and data-driven adjustments',
  'WhatsApp access to your coach',
  'Competition prep available on request',
  'Festival and real-life eating accommodated',
]

const fieldItem = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

const CALENDLY_URL = 'https://calendly.com/rutujahegshetye5/1---1-consultation-call'

export default function ContactSection() {
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
            Pick a time that works for you, and let's talk through your goals on a free call.
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

        <div style={{ background: '#F7F5F0', borderRadius: '8px', padding: '48px', minHeight: '360px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '0px 0px -80px 0px' }}
            variants={fieldItem}
          >
            <h3 style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 700, fontSize: '24px', color: '#0B0B0C', marginBottom: '12px', textTransform: 'uppercase' }}>
              Ready When You Are
            </h3>
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '15px', color: '#666', marginBottom: '32px', maxWidth: '340px' }}>
              Book a free 1-on-1 consultation call directly on our calendar — pick whatever slot suits you.
            </p>
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-block',
                background: '#F4C400',
                color: '#0B0B0C',
                fontFamily: 'Oswald, sans-serif',
                fontWeight: 600,
                fontSize: '14px',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                padding: '18px 48px',
                borderRadius: '999px',
                textDecoration: 'none',
                minHeight: '52px',
                lineHeight: '20px',
                transition: 'transform 200ms ease',
              }}
              onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.97)')}
              onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            >
              Book a Call
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
