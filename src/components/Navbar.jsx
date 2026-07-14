import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const links = ['Home', 'Coaches', 'Programs', 'Transformations', 'Contact']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    let lastY = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 60)

      if (window.innerWidth < 768 && !open) {
        setHidden(y > lastY && y > 100)
      } else {
        setHidden(false)
      }
      lastY = y
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [open])

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        padding: '20px 24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: scrolled ? 'rgba(11,11,12,0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
        transform: hidden ? 'translateY(-80px)' : 'translateY(0)',
        transition: 'background 300ms ease, backdrop-filter 300ms ease, border-color 300ms ease, transform 300ms ease',
      }}
      className="md:px-12"
    >
      <div style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 700, fontSize: '20px', color: '#FFFFFF', letterSpacing: '1px' }}>
        TRANSFORM<span style={{ color: '#F4C400' }}>RS</span>
      </div>

      <div className="hidden md:flex" style={{ gap: '32px' }}>
        {links.map((link) => (
          <a
            key={link}
            href={`#${link.toLowerCase()}`}
            style={{
              fontFamily: 'DM Sans, sans-serif',
              fontWeight: 500,
              fontSize: '13px',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              color: 'white',
              textDecoration: 'none',
              transition: 'color 200ms ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#F4C400')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'white')}
          >
            {link}
          </a>
        ))}
      </div>

      <button
        className="hidden md:inline-block"
        style={{
          background: '#F4C400',
          color: '#0B0B0C',
          fontFamily: 'Oswald, sans-serif',
          fontWeight: 600,
          fontSize: '13px',
          letterSpacing: '2px',
          textTransform: 'uppercase',
          padding: '12px 28px',
          borderRadius: '999px',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        Start Your Journey
      </button>

      <button
        className="md:hidden"
        aria-label="Toggle menu"
        onClick={() => setOpen(true)}
        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px' }}
      >
        <div style={{ width: '24px', height: '2px', background: '#F4C400', marginBottom: '6px' }} />
        <div style={{ width: '24px', height: '2px', background: '#F4C400', marginBottom: '6px' }} />
        <div style={{ width: '24px', height: '2px', background: '#F4C400' }} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            style={{
              position: 'fixed',
              inset: 0,
              background: '#0B0B0C',
              zIndex: 60,
              display: 'flex',
              flexDirection: 'column',
              padding: '24px',
            }}
          >
            <button
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              style={{ alignSelf: 'flex-end', background: 'none', border: 'none', color: '#F4C400', fontSize: '28px', cursor: 'pointer', minHeight: '56px', minWidth: '56px' }}
            >
              ×
            </button>
            <div style={{ display: 'flex', flexDirection: 'column', marginTop: '24px' }}>
              {links.map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  onClick={() => setOpen(false)}
                  style={{
                    fontFamily: 'Oswald, sans-serif',
                    fontWeight: 700,
                    fontSize: '28px',
                    color: 'white',
                    textDecoration: 'none',
                    textTransform: 'uppercase',
                    minHeight: '56px',
                    display: 'flex',
                    alignItems: 'center',
                    borderBottom: '1px solid rgba(255,255,255,0.06)',
                  }}
                >
                  {link}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
