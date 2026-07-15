import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import StatsStrip from './components/StatsStrip'
import AboutSection from './components/AboutSection'
import PhotoGridSection from './components/PhotoGridSection'
import CoachesSection from './components/CoachesSection'
import ProgramsSection from './components/ProgramsSection'
import TestimonialsSection from './components/TestimonialsSection'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'

export default function App() {
  const [selectedCoachId, setSelectedCoachId] = useState(null)
  const [showStickyCTA, setShowStickyCTA] = useState(true)

  const handleSelectCoach = (coachId) => {
    setSelectedCoachId(coachId)
    document.getElementById('testimonials')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  useEffect(() => {
    const onScroll = () => {
      const contactTop = document.getElementById('contact')?.offsetTop ?? Infinity
      setShowStickyCTA(window.scrollY + window.innerHeight < contactTop)
    }
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div style={{ background: '#0B0B0C' }}>
      <Navbar />
      <HeroSection />
      <StatsStrip />
      <AboutSection />
      <CoachesSection selectedCoachId={selectedCoachId} onSelectCoach={handleSelectCoach} />
      <ProgramsSection />
      <PhotoGridSection />
      <TestimonialsSection selectedCoachId={selectedCoachId} onClearCoach={() => setSelectedCoachId(null)} />
      <ContactSection />
      <Footer />

      {/* Mobile sticky footer CTA — hidden once the contact form is in view */}
      {showStickyCTA && (
        <div
          className="md:hidden"
          style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 40, padding: '12px 16px', background: '#0B0B0C', borderTop: '1px solid rgba(255,255,255,0.08)' }}
        >
          <a
            href="#contact"
            style={{
              display: 'block',
              textAlign: 'center',
              background: '#F4C400',
              color: '#0B0B0C',
              fontFamily: 'Oswald, sans-serif',
              fontWeight: 600,
              fontSize: '14px',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              padding: '16px',
              borderRadius: '999px',
              textDecoration: 'none',
              minHeight: '56px',
              lineHeight: '24px',
            }}
          >
            Start My Transformation
          </a>
        </div>
      )}
      {showStickyCTA && <div className="md:hidden" style={{ height: '80px' }} />}
    </div>
  )
}
