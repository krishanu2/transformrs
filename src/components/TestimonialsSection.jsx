import { motion } from 'framer-motion'
import { testimonials } from '../data/testimonials'

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const card = {
  hidden: { opacity: 0, y: 16, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5 } },
}

export default function TestimonialsSection() {
  return (
    <section style={{ background: '#0B0B0C', padding: 'clamp(80px, 10vw, 120px) clamp(24px, 4vw, 96px)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', letterSpacing: '4px', color: '#F4C400', textTransform: 'uppercase', marginBottom: '12px' }}>
            Client Wins
          </p>
          <h2 style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 700, fontSize: 'clamp(28px, 4vw, 52px)', color: '#FFFFFF', textTransform: 'uppercase' }}>
            Real People. Real Results.
          </h2>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3"
          style={{ gap: '24px' }}
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '0px 0px -80px 0px' }}
        >
          {testimonials.map((t) => (
            <motion.div
              key={t.id}
              variants={card}
              style={{ background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '36px' }}
            >
              <p style={{ fontFamily: 'Oswald, sans-serif', fontSize: '52px', color: '#F4C400', lineHeight: 1, marginBottom: '16px' }}>"</p>
              <p style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: '18px', color: 'rgba(255,255,255,0.85)', lineHeight: 1.7, marginBottom: '24px' }}>
                {t.text}
              </p>
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '20px', display: 'flex', alignItems: 'center', gap: '14px' }}>
                <img src={t.avatar} alt={t.name} style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }} />
                <div>
                  <p style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 600, fontSize: '15px', color: '#FFF', textTransform: 'uppercase' }}>{t.name}</p>
                  <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', color: '#F4C400' }}>{t.result}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
