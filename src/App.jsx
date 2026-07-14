import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import StatsStrip from './components/StatsStrip'

export default function App() {
  return (
    <div style={{ background: '#0B0B0C' }}>
      <Navbar />
      <HeroSection />
      <StatsStrip />
    </div>
  )
}
