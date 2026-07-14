import { useEffect, useRef, useState } from 'react'
import { useInView, animate } from 'framer-motion'

const stats = [
  { value: 200, suffix: '+', label: 'Clients Transformed' },
  { value: 2, suffix: 'x', label: 'IFBB Pro Card Holders' },
  { value: 5, suffix: '+', label: 'Years Coaching' },
  { value: 3, suffix: '', label: 'Services · Online · Prep · Posing' },
]

function Counter({ value, suffix }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -80px 0px' })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    const controls = animate(0, value, {
      duration: 2.5,
      ease: 'easeOut',
      onUpdate: (v) => setDisplay(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, value])

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  )
}

export default function StatsStrip() {
  return (
    <div style={{ background: '#111111', padding: '32px 24px', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="grid grid-cols-2 md:grid-cols-4" style={{ maxWidth: '1200px', margin: '0 auto', gap: '24px' }}>
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className={i !== 0 ? 'md:border-l md:border-white/10' : ''}
            style={{ textAlign: 'center', padding: '0 16px' }}
          >
            <div style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 700, fontSize: '44px', color: '#F4C400' }}>
              <Counter value={stat.value} suffix={stat.suffix} />
            </div>
            <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', color: '#999999', textTransform: 'uppercase', letterSpacing: '1px', marginTop: '8px' }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
