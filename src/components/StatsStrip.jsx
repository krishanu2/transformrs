import { useEffect, useRef, useState } from 'react'
import { useInView, animate } from 'framer-motion'

const stats = [
  { value: 200, suffix: '+', label: 'Clients Transformed' },
  { value: 2, suffix: 'x', label: 'IFBB Pro Card Holders' },
  { value: 5, suffix: '+', label: 'Years Coaching' },
  { value: 3, suffix: '', label: 'Services · Online · Prep · Posing' },
]

function StatCard({ value, suffix, label }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.3, margin: '0px 0px -80px 0px' })
  const [display, setDisplay] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!inView) return
    const countControls = animate(0, value, {
      duration: 2.5,
      ease: 'easeOut',
      onUpdate: (v) => setDisplay(Math.round(v)),
    })
    const progressControls = animate(0, 100, {
      duration: 2.5,
      ease: 'easeOut',
      onUpdate: (v) => setProgress(v),
    })
    return () => {
      countControls.stop()
      progressControls.stop()
    }
  }, [inView, value])

  return (
    <div ref={ref} style={{ textAlign: 'center', padding: '0 16px' }}>
      <div style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 700, fontSize: '44px', color: '#F4C400' }}>
        {display}
        {suffix}
      </div>
      <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '999px', overflow: 'hidden', marginTop: '12px' }}>
        <div style={{ width: `${progress}%`, height: '100%', background: '#F4C400', borderRadius: '999px' }} />
      </div>
      <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', color: '#999999', textTransform: 'uppercase', letterSpacing: '1px', marginTop: '12px' }}>
        {label}
      </div>
    </div>
  )
}

export default function StatsStrip() {
  return (
    <div style={{ background: '#111111', padding: '32px 24px', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="grid grid-cols-2 md:grid-cols-4" style={{ maxWidth: '1200px', margin: '0 auto', gap: '24px' }}>
        {stats.map((stat, i) => (
          <div key={stat.label} className={i !== 0 ? 'md:border-l md:border-white/10' : ''}>
            <StatCard value={stat.value} suffix={stat.suffix} label={stat.label} />
          </div>
        ))}
      </div>
    </div>
  )
}
