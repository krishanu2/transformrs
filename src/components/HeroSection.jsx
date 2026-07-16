import { motion, useScroll, useTransform } from 'framer-motion'
import { useMediaQuery } from '../hooks/useMediaQuery'

const container = {
  hidden: { opacity: 1 },
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
}

const line = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.215, 0.61, 0.355, 1] } },
}

const subheadline = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.3, ease: 'easeOut' } },
}

const buttonsVariant = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, delay: 0.45, ease: 'easeOut' } },
}

export default function HeroSection() {
  const { scrollY } = useScroll()
  const isDesktop = useMediaQuery('(min-width: 1025px)')
  const parallaxY = useTransform(scrollY, [0, 600], [0, isDesktop ? 180 : 0], { clamp: true })

  return (
    <section id="home" style={{ position: 'relative', width: '100%', minHeight: '100vh', overflow: 'hidden', background: '#0B0B0C' }}>
      <motion.img
        src="/images/hero-coaches.jpg"
        alt="Team TransformRS coaches training together"
        fetchPriority="high"
        decoding="async"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 25%', filter: 'brightness(0.5)', y: parallaxY }}
      />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(11,11,12,0.2) 0%, rgba(11,11,12,0.1) 50%, rgba(11,11,12,0.8) 100%)' }} />

      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        style={{
          position: 'relative',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '0 24px',
          paddingTop: 'clamp(90px, 11vh, 150px)',
          paddingBottom: '80px',
          boxSizing: 'border-box',
        }}
      >
        <h1
          style={{
            fontFamily: 'Oswald, sans-serif',
            fontWeight: 700,
            fontSize: 'clamp(32px, min(8vw, 11vh), 108px)',
            lineHeight: 1.0,
            letterSpacing: '-0.02em',
            textTransform: 'uppercase',
            marginBottom: '24px',
          }}
        >
          <motion.span variants={line} style={{ display: 'block', color: 'transparent', WebkitTextStroke: 'clamp(1.5px, 0.2vw, 2px) rgba(255,255,255,0.9)' }}>
            YOU DON'T NEED
          </motion.span>
          <motion.span variants={line} style={{ display: 'block', color: 'transparent', WebkitTextStroke: 'clamp(1.5px, 0.2vw, 2px) rgba(255,255,255,0.9)' }}>
            MORE MOTIVATION
          </motion.span>
          <motion.span variants={line} style={{ display: 'block', color: 'transparent', WebkitTextStroke: 'clamp(1.5px, 0.2vw, 2px) #F4C400' }}>
            YOU NEED A SYSTEM
          </motion.span>
        </h1>

        <motion.p
          variants={subheadline}
          style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: 'clamp(16px, 2.5vw, 22px)', color: 'rgba(255,255,255,0.85)', letterSpacing: '0.05em', marginBottom: '40px', maxWidth: '600px' }}
        >
          That works for you, not against you.
        </motion.p>

        <motion.div variants={buttonsVariant} className="flex-col md:flex-row" style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center', width: '100%' }}>
          <a
            href="#contact"
            className="w-full md:w-auto"
            style={{ display: 'inline-block', textAlign: 'center', textDecoration: 'none', background: '#F4C400', color: '#0B0B0C', fontFamily: 'Oswald, sans-serif', fontWeight: 600, fontSize: '14px', letterSpacing: '2px', textTransform: 'uppercase', padding: '16px 40px', borderRadius: '999px', border: 'none', cursor: 'pointer', minHeight: '52px', lineHeight: '20px', transition: 'transform 200ms ease' }}
            onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.97)')}
            onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            Book a Call
          </a>
          <a
            href="#coaches"
            className="w-full md:w-auto"
            style={{ display: 'inline-block', textAlign: 'center', textDecoration: 'none', background: 'transparent', color: 'white', fontFamily: 'Oswald, sans-serif', fontWeight: 500, fontSize: '14px', letterSpacing: '2px', textTransform: 'uppercase', padding: '16px 40px', borderRadius: '999px', border: '1px solid rgba(255,255,255,0.5)', cursor: 'pointer', minHeight: '52px', lineHeight: '20px', transition: 'transform 200ms ease' }}
            onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.97)')}
            onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            Meet the Coaches
          </a>
        </motion.div>
      </motion.div>

      <div style={{ position: 'absolute', bottom: '32px', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <span style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'DM Sans, sans-serif', fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase' }}>
          Scroll
        </span>
        <div className="scroll-indicator-line" style={{ width: '1px', height: '48px', background: 'linear-gradient(to bottom, rgba(244,196,0,0.8), transparent)' }} />
      </div>
    </section>
  )
}
