const imgStyle = { width: '100%', objectFit: 'cover', borderRadius: '4px', display: 'block' }

export default function PhotoGridSection() {
  return (
    <section style={{ background: '#FFFFFF', padding: '0 0 clamp(80px, 10vw, 120px) 0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 clamp(24px, 4vw, 48px)' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', letterSpacing: '4px', color: '#F4C400', textTransform: 'uppercase', marginBottom: '12px' }}>
            Real People. Real Change.
          </p>
          <h2 style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 700, fontSize: 'clamp(28px, 4vw, 48px)', color: '#0B0B0C', textTransform: 'uppercase' }}>
            What Transformation Looks Like
          </h2>
        </div>

        {/* Desktop masonry grid */}
        <div className="hidden md:grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
          <img src="https://picsum.photos/400/350?random=10" alt="" style={{ ...imgStyle, height: '350px' }} />
          <img src="https://picsum.photos/400/500?random=11" alt="" style={{ ...imgStyle, height: '500px', gridRow: 'span 2' }} />
          <img src="https://picsum.photos/400/350?random=12" alt="" style={{ ...imgStyle, height: '350px' }} />
          <img src="https://picsum.photos/400/250?random=13" alt="" style={{ ...imgStyle, height: '250px' }} />
          <img src="https://picsum.photos/400/250?random=14" alt="" style={{ ...imgStyle, height: '250px' }} />
          <img src="https://picsum.photos/800/300?random=15" alt="" style={{ ...imgStyle, height: '300px', gridColumn: 'span 2' }} />
          <img src="https://picsum.photos/400/300?random=16" alt="" style={{ ...imgStyle, height: '300px' }} />
        </div>

        {/* Mobile uniform grid */}
        <div className="grid md:hidden" style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
          {[10, 11, 12, 13, 14, 15, 16].map((n) => (
            <img key={n} src={`https://picsum.photos/400/300?random=${n}`} alt="" style={{ ...imgStyle, height: '220px' }} />
          ))}
        </div>
      </div>
    </section>
  )
}
