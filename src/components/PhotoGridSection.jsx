import { useEffect, useRef, useState } from 'react'
import { photos as fallbackPhotos } from '../data/photos'

const GAP = 16

function PhotoCard({ photo }) {
  return (
    <div
      className="w-[280px] h-[280px] md:w-[360px] md:h-[360px]"
      style={{ position: 'relative', flexShrink: 0, borderRadius: '8px', overflow: 'hidden', transition: 'transform 300ms ease, box-shadow 300ms ease' }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-6px)'
        e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.18)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      <img src={photo.src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(11,11,12,0.85) 0%, rgba(11,11,12,0.4) 45%, transparent 65%)' }} />
      <div style={{ position: 'absolute', bottom: '16px', left: '16px', right: '16px' }}>
        <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: 'rgba(255,255,255,0.95)', lineHeight: 1.4 }}>
          {photo.caption}
        </p>
        <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', color: '#F4C400', textTransform: 'uppercase', letterSpacing: '1px', marginTop: '4px' }}>
          {photo.service}
        </p>
        {photo.detail && (
          <p style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: '12px', color: 'rgba(255,255,255,0.6)', marginTop: '6px', lineHeight: 1.4 }}>
            {photo.detail}
          </p>
        )}
      </div>
    </div>
  )
}

export default function PhotoGridSection() {
  const [photos, setPhotos] = useState(fallbackPhotos)
  const [activeIndex, setActiveIndex] = useState(0)
  const loopPhotos = [...photos, ...photos]

  const trackRef = useRef(null)
  const pausedRef = useRef(false)
  const activeIndexRef = useRef(0)

  useEffect(() => {
    fetch('/api/gallery')
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((rows) => {
        if (Array.isArray(rows) && rows.length > 0) {
          setPhotos(rows.map((r) => ({ id: r.id, src: r.image_data, caption: r.caption, service: r.service, detail: r.detail })))
        }
      })
      .catch(() => {
        // keep the fallback photos already in state
      })
  }, [])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    track.scrollLeft = 0
    activeIndexRef.current = 0
    setActiveIndex(0)

    let raf
    const step = () => {
      if (!pausedRef.current && photos.length > 1) {
        const half = track.scrollWidth / 2
        track.scrollLeft += 0.5
        if (track.scrollLeft >= half) {
          track.scrollLeft -= half
        }
        const cardWidth = track.children[0]?.offsetWidth ?? 300
        const idx = Math.round(track.scrollLeft / (cardWidth + GAP)) % photos.length
        if (idx !== activeIndexRef.current) {
          activeIndexRef.current = idx
          setActiveIndex(idx)
        }
      }
      raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [photos])

  const scrollToPhoto = (index) => {
    const track = trackRef.current
    const card = track?.children[index]
    if (card) {
      track.scrollTo({ left: card.offsetLeft - 24, behavior: 'smooth' })
    }
  }

  return (
    <section id="transformations" style={{ background: '#FFFFFF', padding: 'clamp(80px, 10vw, 120px) 0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 clamp(24px, 4vw, 48px)', marginBottom: '32px', textAlign: 'center' }}>
        <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', letterSpacing: '4px', color: '#F4C400', textTransform: 'uppercase', marginBottom: '12px' }}>
          Real People. Real Change.
        </p>
        <h2 style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 700, fontSize: 'clamp(28px, 4vw, 48px)', color: '#0B0B0C', textTransform: 'uppercase' }}>
          What Transformation Looks Like
        </h2>
      </div>

      <div style={{ overflow: 'hidden', position: 'relative' }}>
        <div
          ref={trackRef}
          className="no-scrollbar px-6 md:px-12"
          onMouseEnter={() => (pausedRef.current = true)}
          onMouseLeave={() => (pausedRef.current = false)}
          onTouchStart={() => (pausedRef.current = true)}
          onTouchEnd={() => {
            setTimeout(() => (pausedRef.current = false), 3000)
          }}
          style={{ display: 'flex', gap: `${GAP}px`, overflowX: 'auto', WebkitOverflowScrolling: 'touch', paddingBottom: '8px' }}
        >
          {loopPhotos.map((photo, i) => (
            <PhotoCard key={`${photo.id}-${i}`} photo={photo} />
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginTop: '24px' }}>
        {photos.map((photo, i) => (
          <button
            key={photo.id}
            aria-label={`Go to photo ${i + 1}`}
            onClick={() => scrollToPhoto(i)}
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: i === activeIndex ? '#F4C400' : 'rgba(0,0,0,0.15)',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 200ms ease',
              padding: 0,
            }}
          />
        ))}
      </div>
    </section>
  )
}
