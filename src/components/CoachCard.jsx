export default function CoachCard({ coach, selected, onClick }) {
  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') onClick?.()
      }}
      style={{
        flexShrink: 0,
        width: '280px',
        background: 'rgba(255,255,255,0.04)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: selected ? '2px solid #F4C400' : '1px solid rgba(255,255,255,0.08)',
        borderRadius: '8px',
        overflow: 'hidden',
        transition: 'transform 300ms ease, border-color 300ms ease, box-shadow 300ms ease',
        boxShadow: selected ? '0 0 24px rgba(244,196,0,0.2)' : 'none',
        cursor: 'pointer',
      }}
      className="md:w-[320px]"
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-8px)'
        e.currentTarget.style.borderColor = selected ? '#F4C400' : 'rgba(244,196,0,0.3)'
        e.currentTarget.style.boxShadow = selected ? '0 0 24px rgba(244,196,0,0.2)' : '0 16px 48px rgba(244,196,0,0.12)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.borderColor = selected ? '#F4C400' : 'rgba(255,255,255,0.08)'
        e.currentTarget.style.boxShadow = selected ? '0 0 24px rgba(244,196,0,0.2)' : 'none'
      }}
    >
      <img src={coach.img} alt={coach.name} style={{ width: '100%', height: '380px', objectFit: 'cover' }} />
      <div style={{ padding: '24px' }}>
        <h3 style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 700, fontSize: '22px', color: '#FFFFFF', textTransform: 'uppercase', marginBottom: '4px' }}>
          {coach.name}
        </h3>
        <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', letterSpacing: '2px', color: '#F4C400', textTransform: 'uppercase', marginBottom: '12px' }}>
          {coach.role}
        </p>
        <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>
          {coach.bio}
        </p>
        <div style={{ display: 'flex', gap: '8px', marginTop: '16px', flexWrap: 'wrap' }}>
          {coach.badges.map((badge) => (
            <span
              key={badge}
              style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '11px',
                color: '#F4C400',
                background: 'rgba(244,196,0,0.1)',
                border: '1px solid rgba(244,196,0,0.2)',
                padding: '4px 10px',
                borderRadius: '999px',
                letterSpacing: '1px',
                textTransform: 'uppercase',
              }}
            >
              {badge}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
