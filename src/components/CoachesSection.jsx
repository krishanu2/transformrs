import { motion } from 'framer-motion'
import { coaches } from '../data/coaches'

const rowContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
}

const photoVariants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: [0.215, 0.61, 0.355, 1] } },
}

const contentVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

function CoachRow({ coach, index, selected, onSelect }) {
  const num = String(index + 1).padStart(2, '0')
  const firstName = coach.name.split(' ')[0]
  const imageFirst = index % 2 === 0

  return (
    <motion.div
      variants={rowContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '0px 0px -100px 0px' }}
      className="grid grid-cols-1 md:grid-cols-2"
      style={{ gap: 'clamp(32px, 6vw, 64px)', alignItems: 'center' }}
    >
      <motion.div
        variants={photoVariants}
        className={imageFirst ? 'md:order-1' : 'md:order-2'}
        style={{ position: 'relative', zIndex: 0 }}
      >
        <div
          onClick={onSelect}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') onSelect()
          }}
          style={{
            position: 'relative',
            borderRadius: '8px',
            overflow: 'hidden',
            cursor: 'pointer',
            border: selected ? '2px solid #F4C400' : '2px solid transparent',
            boxShadow: selected ? '0 0 32px rgba(244,196,0,0.25)' : 'none',
            transition: 'border-color 300ms ease, box-shadow 300ms ease',
            background: '#151515',
          }}
          onMouseEnter={(e) => {
            const img = e.currentTarget.querySelector('img')
            if (img) img.style.transform = 'scale(1.05)'
          }}
          onMouseLeave={(e) => {
            const img = e.currentTarget.querySelector('img')
            if (img) img.style.transform = 'scale(1)'
          }}
        >
          <img
            src={coach.img}
            alt={coach.name}
            style={{ width: '100%', height: 'clamp(340px, 42vw, 500px)', objectFit: coach.imgFit || 'cover', objectPosition: coach.imgPosition || 'center', display: 'block', transition: 'transform 500ms ease' }}
          />
        </div>
        <div
          className="hidden md:block"
          style={{
            position: 'absolute',
            top: '20px',
            [imageFirst ? 'right' : 'left']: '-20px',
            width: '100%',
            height: '100%',
            border: '2px solid #F4C400',
            borderRadius: '8px',
            zIndex: -1,
          }}
        />
      </motion.div>

      <motion.div variants={contentVariants} className={imageFirst ? 'md:order-2' : 'md:order-1'}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <span style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 700, fontSize: '20px', color: '#F4C400' }}>{num}</span>
          <span style={{ width: '28px', height: '1px', background: 'rgba(255,255,255,0.3)' }} />
          <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', letterSpacing: '3px', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase' }}>
            {coach.role}
          </span>
        </div>

        <h3 style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 700, fontSize: 'clamp(32px, 4vw, 48px)', color: '#FFFFFF', textTransform: 'uppercase', lineHeight: 1.05, marginBottom: '16px' }}>
          {coach.name}
        </h3>

        <p style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: '20px', lineHeight: 1.5, color: '#F4C400', marginBottom: '20px', maxWidth: '440px' }}>
          “{coach.tagline}”
        </p>

        <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '15px', lineHeight: 1.8, color: 'rgba(255,255,255,0.65)', marginBottom: '24px', maxWidth: '460px' }}>
          {coach.bio}
        </p>

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '28px' }}>
          {coach.badges.map((badge) => (
            <span
              key={badge}
              style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '11px',
                color: '#F4C400',
                background: 'rgba(244,196,0,0.1)',
                border: '1px solid rgba(244,196,0,0.2)',
                padding: '5px 12px',
                borderRadius: '999px',
                letterSpacing: '1px',
                textTransform: 'uppercase',
              }}
            >
              {badge}
            </span>
          ))}
        </div>

        <button
          onClick={onSelect}
          style={{
            fontFamily: 'Oswald, sans-serif',
            fontWeight: 600,
            fontSize: '13px',
            letterSpacing: '1.5px',
            textTransform: 'uppercase',
            color: '#F4C400',
            background: 'transparent',
            border: '1.5px solid rgba(244,196,0,0.4)',
            borderRadius: '999px',
            padding: '12px 24px',
            cursor: 'pointer',
            transition: 'all 200ms ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(244,196,0,0.1)'
            e.currentTarget.style.borderColor = '#F4C400'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent'
            e.currentTarget.style.borderColor = 'rgba(244,196,0,0.4)'
          }}
        >
          See {firstName}'s Client Results →
        </button>
      </motion.div>
    </motion.div>
  )
}

export default function CoachesSection({ selectedCoachId, onSelectCoach }) {
  return (
    <section id="coaches" style={{ background: '#0B0B0C', padding: 'clamp(80px, 10vw, 120px) clamp(24px, 4vw, 96px)' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ marginBottom: 'clamp(64px, 9vw, 110px)' }}>
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', letterSpacing: '4px', color: '#F4C400', textTransform: 'uppercase', marginBottom: '12px' }}>
            The Team
          </p>
          <h2 style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 700, fontSize: 'clamp(32px, 5vw, 64px)', color: '#FFFFFF', textTransform: 'uppercase', lineHeight: 1.0 }}>
            TEAM OF EXPERT<br />
            <span style={{ color: '#F4C400' }}>COACHES</span>
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(72px, 11vw, 140px)' }}>
          {coaches.map((coach, i) => (
            <CoachRow
              key={coach.id}
              coach={coach}
              index={i}
              selected={coach.id === selectedCoachId}
              onSelect={() => onSelectCoach?.(coach.id)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
