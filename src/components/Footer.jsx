const links = ['Coaches', 'Programs', 'Transformations', 'Contact']

export default function Footer() {
  return (
    <footer style={{ background: '#0B0B0C', borderTop: '1px solid rgba(255,255,255,0.06)', padding: 'clamp(48px, 6vw, 80px) clamp(24px, 4vw, 96px)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '48px', flexWrap: 'wrap', gap: '24px' }}>
          <div style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 700, fontSize: '24px', color: '#FFFFFF', letterSpacing: '2px' }}>
            TRANSFORM<span style={{ color: '#F4C400' }}>RS</span>
          </div>

          <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
            {links.map((link) => (
              <a key={link} href={`#${link.toLowerCase()}`} style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: 'rgba(255,255,255,0.5)', textDecoration: 'none', letterSpacing: '1px' }}>
                {link}
              </a>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '16px' }}>
            <a href="#" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'DM Sans, sans-serif', fontSize: '13px', textDecoration: 'none' }}>Instagram</a>
            <a href="#" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'DM Sans, sans-serif', fontSize: '13px', textDecoration: 'none' }}>WhatsApp</a>
          </div>
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '32px', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: 'rgba(255,255,255,0.3)' }}>
            © 2026 Team TransformRS. All rights reserved.
          </p>
          <p style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: '15px', color: 'rgba(255,255,255,0.3)' }}>
            Coached by Pros. Built for real life.
          </p>
        </div>
      </div>
    </footer>
  )
}
