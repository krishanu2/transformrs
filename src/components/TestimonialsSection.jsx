import { useEffect, useRef, useState } from 'react'
import { testimonials } from '../data/testimonials'
import { coaches } from '../data/coaches'

const GAP = 20

function coachName(coachId) {
  return coaches.find((c) => c.id === coachId)?.name
}

function TestimonialCard({ t }) {
  const names = (t.coachIds || []).map(coachName).filter(Boolean)
  const attribution = names.length ? names.join(' & ') : 'Team TransformRS'

  return (
    <div
      className="w-[280px] md:w-[380px]"
      style={{
        flexShrink: 0,
        background: 'rgba(255,255,255,0.04)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '8px',
        padding: '32px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <p style={{ fontFamily: 'Oswald, sans-serif', fontSize: '44px', color: '#F4C400', lineHeight: 1, marginBottom: '10px' }}>"</p>
      <p
        style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontStyle: 'italic',
          fontSize: '16px',
          color: 'rgba(255,255,255,0.85)',
          lineHeight: 1.6,
          marginBottom: '14px',
          flex: 1,
        }}
      >
        {t.text}
      </p>
      <span
        style={{
          fontFamily: 'DM Sans, sans-serif',
          fontSize: '11px',
          background: 'rgba(244,196,0,0.1)',
          color: '#F4C400',
          padding: '4px 8px',
          borderRadius: '4px',
          textTransform: 'uppercase',
          letterSpacing: '1px',
          alignSelf: 'flex-start',
        }}
      >
        Coached by {attribution}
      </span>
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '14px', marginTop: '14px', display: 'flex', alignItems: 'center', gap: '14px' }}>
        <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(244,196,0,0.12)', border: '1px solid rgba(244,196,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <span style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 700, fontSize: '16px', color: '#F4C400' }}>{t.name.charAt(0)}</span>
        </div>
        <div>
          <p style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 600, fontSize: '14px', color: '#FFF', textTransform: 'uppercase' }}>{t.name}</p>
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', color: '#F4C400' }}>{t.result}</p>
        </div>
      </div>
    </div>
  )
}

export default function TestimonialsSection({ selectedCoachId, onClearCoach }) {
  const selectedCoach = selectedCoachId ? coaches.find((c) => c.id === selectedCoachId) : null
  const filtered = selectedCoachId ? testimonials.filter((t) => (t.coachIds || []).includes(selectedCoachId)) : testimonials
  const loopTestimonials = filtered.length > 1 ? [...filtered, ...filtered] : filtered

  const [activeIndex, setActiveIndex] = useState(0)
  const trackRef = useRef(null)
  const pausedRef = useRef(false)
  const activeIndexRef = useRef(0)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    track.scrollLeft = 0
    activeIndexRef.current = 0
    setActiveIndex(0)

    if (filtered.length <= 1) return

    let raf
    const step = () => {
      if (!pausedRef.current) {
        const half = track.scrollWidth / 2
        track.scrollLeft += 0.5
        if (track.scrollLeft >= half) {
          track.scrollLeft -= half
        }
        const cardWidth = track.children[0]?.offsetWidth ?? 380
        const idx = Math.round(track.scrollLeft / (cardWidth + GAP)) % filtered.length
        if (idx !== activeIndexRef.current) {
          activeIndexRef.current = idx
          setActiveIndex(idx)
        }
      }
      raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [filtered.length, selectedCoachId])

  const scrollToCard = (index) => {
    const track = trackRef.current
    const card = track?.children[index]
    if (card) {
      track.scrollTo({ left: card.offsetLeft - 24, behavior: 'smooth' })
    }
  }

  return (
    <section id="testimonials" style={{ background: '#0B0B0C', padding: 'clamp(80px, 10vw, 120px) 0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 clamp(24px, 4vw, 96px)' }}>
        <div style={{ textAlign: 'center', marginBottom: selectedCoach ? '24px' : '48px' }}>
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', letterSpacing: '4px', color: '#F4C400', textTransform: 'uppercase', marginBottom: '12px' }}>
            Client Wins
          </p>
          <h2 style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 700, fontSize: 'clamp(28px, 4vw, 52px)', color: '#FFFFFF', textTransform: 'uppercase' }}>
            Real People. Real Results.
          </h2>
        </div>

        {selectedCoach && (
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
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
      </div>

      {filtered.length === 0 ? (
        <p style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: '20px', color: 'rgba(255,255,255,0.5)', textAlign: 'center' }}>
          No client stories yet for this coach — check back soon.
        </p>
      ) : (
        <>
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
              {loopTestimonials.map((t, i) => (
                <TestimonialCard key={`${t.id}-${i}`} t={t} />
              ))}
            </div>
          </div>

          {filtered.length > 1 && (
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginTop: '28px' }}>
              {filtered.map((t, i) => (
                <button
                  key={t.id}
                  aria-label={`Go to story ${i + 1}`}
                  onClick={() => scrollToCard(i)}
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: i === activeIndex ? '#F4C400' : 'rgba(255,255,255,0.15)',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 200ms ease',
                    padding: 0,
                  }}
                />
              ))}
            </div>
          )}
        </>
      )}
    </section>
  )
}
