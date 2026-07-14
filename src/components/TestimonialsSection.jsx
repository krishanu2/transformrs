import { motion } from 'framer-motion'
import { testimonials } from '../data/testimonials'
import { coaches } from '../data/coaches'
import { useMediaQuery } from '../hooks/useMediaQuery'

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}

const card = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: 'easeOut' } },
}

function coachName(coachId) {
  return coaches.find((c) => c.id === coachId)?.name
}

function TestimonialCard({ t, style }) {
  return (
    <motion.div
      variants={card}
      style={{ background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '36px', ...style }}
    >
      <p style={{ fontFamily: 'Oswald, sans-serif', fontSize: '52px', color: '#F4C400', lineHeight: 1, marginBottom: '16px' }}>"</p>
      <p style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: '18px', color: 'rgba(255,255,255,0.85)', lineHeight: 1.7, marginBottom: '20px' }}>
        {t.text}
      </p>
      <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', background: 'rgba(244,196,0,0.1)', color: '#F4C400', padding: '4px 8px', borderRadius: '4px', textTransform: 'uppercase', letterSpacing: '1px' }}>
        Coached by {coachName(t.coachId)}
      </span>
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '20px', marginTop: '20px', display: 'flex', alignItems: 'center', gap: '14px' }}>
        <img src={t.avatar} alt={t.name} style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }} />
        <div>
          <p style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 600, fontSize: '15px', color: '#FFF', textTransform: 'uppercase' }}>{t.name}</p>
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', color: '#F4C400' }}>{t.result}</p>
        </div>
      </div>
    </motion.div>
  )
}

export default function TestimonialsSection({ selectedCoachId, onClearCoach }) {
  const isMobile = useMediaQuery('(max-width: 767px)')
  const selectedCoach = selectedCoachId ? coaches.find((c) => c.id === selectedCoachId) : null
  const filtered = selectedCoachId ? testimonials.filter((t) => t.coachId === selectedCoachId) : testimonials

  return (
    <section id="testimonials" style={{ background: '#0B0B0C', padding: 'clamp(80px, 10vw, 120px) clamp(24px, 4vw, 96px)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: selectedCoach ? '24px' : '64px' }}>
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', letterSpacing: '4px', color: '#F4C400', textTransform: 'uppercase', marginBottom: '12px' }}>
            Client Wins
          </p>
          <h2 style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 700, fontSize: 'clamp(28px, 4vw, 52px)', color: '#FFFFFF', textTransform: 'uppercase' }}>
            Real People. Real Results.
          </h2>
        </div>

        {selectedCoach && (
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: 'rgba(255,255,255,0.6)' }}>
              Showing stories coached by {selectedCoach.name}
            </span>
            <button
              onClick={onClearCoach}
              style={{ marginLeft: '12px', background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: '#F4C400', fontFamily: 'DM Sans, sans-serif', fontSize: '12px', letterSpacing: '1px', textTransform: 'uppercase', padding: '6px 14px', borderRadius: '999px', cursor: 'pointer' }}
            >
              Show all stories ×
            </button>
          </div>
        )}

        {filtered.length === 0 ? (
          <p style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: '20px', color: 'rgba(255,255,255,0.5)', textAlign: 'center' }}>
            No client stories yet for this coach — check back soon.
          </p>
        ) : isMobile ? (
          <motion.div
            className="no-scrollbar"
            style={{ display: 'flex', gap: '16px', overflowX: 'auto', scrollSnapType: 'x proximity', WebkitOverflowScrolling: 'touch' }}
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '0px 0px -80px 0px' }}
          >
            {filtered.map((t) => (
              <TestimonialCard key={t.id} t={t} style={{ flex: '0 0 calc(100vw - 64px)', minWidth: '260px', scrollSnapAlign: 'start' }} />
            ))}
          </motion.div>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3"
            style={{ gap: '24px' }}
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '0px 0px -80px 0px' }}
          >
            {filtered.map((t) => (
              <TestimonialCard key={t.id} t={t} />
            ))}
          </motion.div>
        )}
      </div>
    </section>
  )
}
