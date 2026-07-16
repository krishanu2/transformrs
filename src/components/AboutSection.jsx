import { motion } from 'framer-motion'
import { coaches } from '../data/coaches'

const reveal = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

const bullets = [
  'No fear-based or shame-based methods',
  'No starvation — sustainability over restriction',
  'You build independence, not dependency on us',
  'Weekly data tracking — nothing is guesswork',
]

export default function AboutSection() {
  return (
    <section style={{ background: '#FFFFFF', padding: 'clamp(80px, 10vw, 160px) clamp(24px, 6vw, 96px)' }}>
      <div className="grid grid-cols-1 md:grid-cols-2" style={{ maxWidth: '1200px', margin: '0 auto', gap: '48px', alignItems: 'center' }}>
        <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '0px 0px -80px 0px' }}>
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', letterSpacing: '4px', textTransform: 'uppercase', color: '#F4C400', marginBottom: '16px' }}>
            What We Believe
          </p>
          <h2 style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 700, fontSize: 'clamp(32px, 4vw, 52px)', color: '#0B0B0C', textTransform: 'uppercase', lineHeight: 1.1, marginBottom: '24px' }}>
            Coaching That Doesn't<br />
            <span style={{ color: '#F4C400' }}>Cost You Yourself</span>
          </h2>
          <p style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: '22px', lineHeight: 1.6, color: '#333', marginBottom: '24px', borderLeft: '3px solid #F4C400', paddingLeft: '24px' }}>
            “We don't believe in starving clients, shaming bodies, or creating dependency. We believe in building bodies, transformation, and sustainability.”
          </p>
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '16px', lineHeight: 1.8, color: '#666', marginBottom: '40px' }}>
            Real transformation happens when your plan fits your real life — festivals, family meals, work travel, and all. We combine IFBB Pro competitive expertise with a coaching philosophy built on sustainability, data, and respect.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {bullets.map((item) => (
              <div key={item} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <span style={{ color: '#F4C400', fontSize: '18px', marginTop: '2px' }}>✓</span>
                <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '15px', color: '#444' }}>{item}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '0px 0px -80px 0px' }}>
          <div className="grid grid-cols-2" style={{ gap: '12px' }}>
            {coaches.map((coach) => (
              <div key={coach.id} className="h-[320px] md:h-[560px]" style={{ position: 'relative', borderRadius: '4px', overflow: 'hidden' }}>
                <img
                  src={coach.img}
                  alt={coach.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(11,11,12,0.75) 0%, transparent 45%)' }} />
                <div style={{ position: 'absolute', bottom: '16px', left: '16px', right: '16px' }}>
                  <p style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 700, fontSize: 'clamp(13px, 1.5vw, 16px)', color: '#FFF', textTransform: 'uppercase', letterSpacing: '0.5px', lineHeight: 1.2 }}>
                    {coach.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ height: '2px', width: '64px', background: '#F4C400', marginTop: '20px' }} />
        </motion.div>
      </div>
    </section>
  )
}
