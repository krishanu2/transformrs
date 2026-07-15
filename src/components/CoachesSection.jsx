import { useEffect, useRef } from 'react'
import { coaches } from '../data/coaches'
import CoachCard from './CoachCard'

const GAP = 24
const loopCoaches = [...coaches, ...coaches]

export default function CoachesSection({ selectedCoachId, onSelectCoach }) {
  const trackRef = useRef(null)
  const pausedRef = useRef(false)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    let raf
    const step = () => {
      if (!pausedRef.current) {
        const half = track.scrollWidth / 2
        track.scrollLeft += 0.6
        if (track.scrollLeft >= half) {
          track.scrollLeft -= half
        }
      }
      raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [])

  const scrollToCoach = (index) => {
    const track = trackRef.current
    const card = track?.children[index]
    if (card) {
      track.scrollTo({ left: card.offsetLeft - 24, behavior: 'smooth' })
    }
  }

  return (
    <section id="coaches" style={{ background: '#0B0B0C', padding: 'clamp(80px, 10vw, 120px) 0', overflow: 'hidden' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 clamp(24px, 4vw, 48px)', marginBottom: '48px' }}>
        <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', letterSpacing: '4px', color: '#F4C400', textTransform: 'uppercase', marginBottom: '12px' }}>
          The Team
        </p>
        <h2 style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 700, fontSize: 'clamp(32px, 5vw, 64px)', color: '#FFFFFF', textTransform: 'uppercase', lineHeight: 1.0 }}>
          TEAM OF EXPERT<br />
          <span style={{ color: '#F4C400' }}>COACHES</span>
        </h2>
        <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: 'rgba(255,255,255,0.4)', marginTop: '12px' }}>
          Tap a coach to see their clients' stories.
        </p>
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
          {loopCoaches.map((coach, i) => (
            <CoachCard
              key={`${coach.id}-${i}`}
              coach={coach}
              selected={coach.id === selectedCoachId}
              onClick={() => onSelectCoach?.(coach.id)}
            />
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginTop: '24px' }}>
        {coaches.map((coach, i) => (
          <button
            key={coach.id}
            aria-label={`Scroll to ${coach.name}`}
            onClick={() => scrollToCoach(i)}
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: coach.id === selectedCoachId ? '#F4C400' : 'rgba(255,255,255,0.2)',
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
