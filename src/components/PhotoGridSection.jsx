import { useState } from 'react'
import { motion } from 'framer-motion'
import { photos } from '../data/photos'

const filters = ['All', 'Women', 'Men', 'Competition', 'Lifestyle']

const gridContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

const imageVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
}

const overlayVariants = {
  rest: { opacity: 0 },
  hover: { opacity: 1, transition: { duration: 0.25 } },
}

function PhotoCard({ photo, height, span }) {
  return (
    <motion.div
      variants={imageVariants}
      style={{
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '4px',
        height: `${height}px`,
        gridRow: span === 'row' ? 'span 2' : undefined,
        gridColumn: span === 'col' ? 'span 2' : undefined,
      }}
    >
      <img src={photo.src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      <motion.div
        initial="rest"
        whileHover="hover"
        variants={overlayVariants}
        style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'flex-end', padding: '20px' }}
      >
        <div>
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: 'rgba(255,255,255,0.9)', lineHeight: 1.4 }}>
            {photo.caption}
          </p>
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', color: '#F4C400', textTransform: 'uppercase', letterSpacing: '1px', marginTop: '4px' }}>
            {photo.service}
          </p>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function PhotoGridSection() {
  const [activeFilter, setActiveFilter] = useState('all')
  const filteredPhotos = activeFilter === 'all' ? photos : photos.filter((p) => p.category === activeFilter)

  return (
    <section style={{ background: '#FFFFFF', padding: '0 0 clamp(80px, 10vw, 120px) 0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 clamp(24px, 4vw, 48px)' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', letterSpacing: '4px', color: '#F4C400', textTransform: 'uppercase', marginBottom: '12px' }}>
            Real People. Real Change.
          </p>
          <h2 style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 700, fontSize: 'clamp(28px, 4vw, 48px)', color: '#0B0B0C', textTransform: 'uppercase' }}>
            What Transformation Looks Like
          </h2>
        </div>

        <div style={{ display: 'flex', gap: '12px', marginBottom: '32px', flexWrap: 'wrap', justifyContent: 'center' }}>
          {filters.map((filter) => {
            const value = filter.toLowerCase()
            const active = activeFilter === value
            return (
              <button
                key={filter}
                onClick={() => setActiveFilter(value)}
                style={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: '13px',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  padding: '10px 20px',
                  borderRadius: '999px',
                  border: active ? '2px solid #F4C400' : '1px solid rgba(0,0,0,0.15)',
                  background: active ? 'rgba(244,196,0,0.12)' : 'transparent',
                  color: active ? '#0B0B0C' : '#666',
                  cursor: 'pointer',
                  transition: 'all 200ms ease',
                }}
              >
                {filter}
              </button>
            )
          })}
        </div>

        {/* Desktop grid: masonry spans only apply when showing everything */}
        <motion.div
          key={`desktop-${activeFilter}`}
          className="hidden md:grid"
          style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}
          variants={gridContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '0px 0px -80px 0px' }}
        >
          {filteredPhotos.map((photo) => (
            <PhotoCard
              key={photo.id}
              photo={photo}
              height={activeFilter === 'all' ? photo.height : 300}
              span={activeFilter === 'all' ? photo.span : null}
            />
          ))}
        </motion.div>

        {/* Mobile grid: always uniform 2-column */}
        <motion.div
          key={`mobile-${activeFilter}`}
          className="grid md:hidden"
          style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}
          variants={gridContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '0px 0px -80px 0px' }}
        >
          {filteredPhotos.map((photo) => (
            <PhotoCard key={photo.id} photo={photo} height={220} span={null} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
