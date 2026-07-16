import { Component } from 'react'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    console.error('Uncaught error:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '24px',
            background: '#0B0B0C',
            fontFamily: 'DM Sans, sans-serif',
          }}
        >
          <p style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 700, fontSize: '24px', color: '#FFFFFF', textTransform: 'uppercase', marginBottom: '12px' }}>
            Something went wrong
          </p>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '15px', marginBottom: '28px', maxWidth: '400px' }}>
            Sorry about that — please refresh the page. If it keeps happening, get in touch with us directly.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              background: '#F4C400',
              color: '#0B0B0C',
              fontFamily: 'Oswald, sans-serif',
              fontWeight: 600,
              fontSize: '13px',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              padding: '14px 32px',
              borderRadius: '999px',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Reload Page
          </button>
        </div>
      )
    }

    return this.props.children
  }
}
