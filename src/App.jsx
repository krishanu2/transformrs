import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import StatsStrip from './components/StatsStrip'
import AboutSection from './components/AboutSection'
import PhotoGridSection from './components/PhotoGridSection'
import CoachesSection from './components/CoachesSection'
import ProgramsSection from './components/ProgramsSection'
import TestimonialsSection from './components/TestimonialsSection'

export default function App() {
  return (
    <div style={{ background: '#0B0B0C' }}>
      <Navbar />
      <HeroSection />
      <StatsStrip />
      <AboutSection />
      <PhotoGridSection />
      <CoachesSection />
      <ProgramsSection />
      <TestimonialsSection />
    </div>
  )
}
