import { coaches } from '../data/coaches'
import CoachCard from './CoachCard'

export default function CoachesSection() {
  return (
    <section style={{ background: '#0B0B0C', padding: 'clamp(80px, 10vw, 120px) 0', overflow: 'hidden' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 clamp(24px, 4vw, 48px)', marginBottom: '48px' }}>
        <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', letterSpacing: '4px', color: '#F4C400', textTransform: 'uppercase', marginBottom: '12px' }}>
          The Team
        </p>
        <h2 style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 700, fontSize: 'clamp(32px, 5vw, 64px)', color: '#FFFFFF', textTransform: 'uppercase', lineHeight: 1.0 }}>
          TEAM OF EXPERT<br />
          <span style={{ color: '#F4C400' }}>COACHES</span>
        </h2>
      </div>

      <div style={{ overflow: 'hidden', position: 'relative' }}>
        <div className="coaches-scroll-track" style={{ gap: '24px' }}>
          {[...coaches, ...coaches].map((coach, i) => (
            <CoachCard key={`${coach.id}-${i}`} coach={coach} />
          ))}
        </div>
      </div>
    </section>
  )
}
