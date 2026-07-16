import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AdminPage from './AdminPage.jsx'
import ErrorBoundary from './ErrorBoundary.jsx'

const isAdmin = window.location.pathname.replace(/\/$/, '') === '/admin'

// Browsers restore the previous scroll position on a normal reload. That
// races with the scroll-triggered reveal animations below the fold: if the
// page loads already scrolled past a section, its IntersectionObserver can
// miss the enter transition entirely, so the section just appears with no
// animation until a hard reload resets scroll to the top. Forcing a
// top-of-page start removes that race.
if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual'
}
window.scrollTo(0, 0)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      {isAdmin ? <AdminPage /> : <App />}
    </ErrorBoundary>
  </StrictMode>,
)
