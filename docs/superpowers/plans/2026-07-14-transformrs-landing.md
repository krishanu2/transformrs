# Team TransformRS Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the Team TransformRS single-page marketing site (Vite + React + Tailwind + Framer Motion) matching `docs/superpowers/specs/2026-07-14-transformrs-landing-design.md` exactly — full-bleed ghost-text hero, alternating dark/white sections, auto-scrolling coach carousel, bento programs grid, glassmorphism testimonials, warm contact form.

**Architecture:** One Vite React app. `App.jsx` composes ten section components from `src/components/`, each self-contained (own styles, own Framer Motion variants). Two static data modules (`src/data/coaches.js`, `src/data/testimonials.js`) feed the Coaches and Testimonials sections. Global fonts/keyframes live in `index.css`; Tailwind supplies only responsive grid/flex breakpoint switching, while exact colors/type sizes/spacing use inline style objects so every pixel value from the spec is reproduced verbatim.

**Tech Stack:** Vite, React 18, Tailwind CSS, Framer Motion, Google Fonts (Oswald, Cormorant Garamond, DM Sans), picsum.photos placeholder images.

## Global Constraints

- Fonts: Oswald 700/600/500/400 for headlines/nav/buttons, Cormorant Garamond 300/400/600 italic for quotes/emotional copy, DM Sans 300/400/500/600 for body/labels/forms. No Inter/Roboto/Arial anywhere.
- Colors: `--black:#0B0B0C`, `--dark:#111111`, `--dark-card:#1A1A1A`, `--white:#FFFFFF`, `--off-white:#F7F5F0`, `--text-dark:#1A1A1A`, `--text-gray:#666666`, `--text-muted:#999999`, `--gold:#F4C400`, `--gold-dark:#D4A800`, `--magenta:#C6417E` (used once, Group Training label only), `--border-light:rgba(0,0,0,0.08)`, `--border-dark:rgba(255,255,255,0.08)`.
- Section order and dark/white rhythm is fixed: Hero(dark) → Stats(dark) → About(white) → PhotoGrid(white) → Coaches(dark) → Programs(off-white) → Testimonials(dark) → Contact(white) → Footer(dark). Do not reorder or change backgrounds.
- Border radius 4–8px everywhere except pill buttons (`border-radius:999px`) and avatar circles.
- Glassmorphism (`backdrop-filter: blur(12px)`, translucent white bg/border) only on Coaches cards and Testimonials cards — nowhere else.
- All images via `https://picsum.photos/{w}/{h}?random={n}` with the exact seeds listed in the spec.
- Second coach's name/bio/badges and footer social links stay as literal placeholders (`"Coach [Name]"`, `href="#"`) — do not invent real content.
- Every button/interactive element needs a hover + active state (scale 1.03 hover / 0.97 active) and, for form inputs, a gold focus ring.

---

### Task 1: Scaffold Vite + React + Tailwind + Framer Motion project

**Files:**
- Create: `package.json`, `vite.config.js`, `tailwind.config.js`, `postcss.config.js`, `index.html`, `src/main.jsx`, `src/App.jsx`, `src/index.css`
- Test: manual — `npm run dev` serves a page

**Interfaces:**
- Produces: a running Vite dev server; `src/App.jsx` default export that later tasks will fill in; `src/index.css` with Tailwind directives + custom keyframes that later tasks rely on (`coaches-scroll-track`/`scrollRTL` keyframe, `pulse` keyframe).

- [ ] **Step 1: Scaffold the Vite React project**

Run:
```bash
npm create vite@latest . -- --template react
```
When prompted about the current directory not being empty, confirm to proceed (only the `docs/` folder and `.git` exist).

- [ ] **Step 2: Install dependencies**

Run:
```bash
npm install
npm install framer-motion
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

- [ ] **Step 3: Configure Tailwind content paths**

Edit `tailwind.config.js`:
```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        black: '#0B0B0C',
        dark: '#111111',
        darkCard: '#1A1A1A',
        offWhite: '#F7F5F0',
        gold: '#F4C400',
        goldDark: '#D4A800',
        magenta: '#C6417E',
      },
      fontFamily: {
        oswald: ['Oswald', 'sans-serif'],
        cormorant: ['"Cormorant Garamond"', 'serif'],
        dmsans: ['"DM Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
```

- [ ] **Step 4: Set up `index.html` with Google Fonts**

Replace `index.html` body/head with:
```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Team TransformRS | Coached by Pros. Built for Real Life.</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet">
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

- [ ] **Step 5: Write `src/index.css`**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  margin: 0;
  background: #0B0B0C;
  font-family: 'DM Sans', sans-serif;
}

@keyframes scrollRTL {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

.coaches-scroll-track {
  animation: scrollRTL 40s linear infinite;
  display: flex;
  width: max-content;
}

.coaches-scroll-track:hover {
  animation-play-state: paused;
}

@media (max-width: 768px) {
  .coaches-scroll-track {
    animation-duration: 50s;
  }
}

@keyframes pulseLine {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}

.scroll-indicator-line {
  animation: pulseLine 2s infinite;
}
```

- [ ] **Step 6: Write placeholder `src/App.jsx` and `src/main.jsx`**

`src/main.jsx`:
```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

`src/App.jsx` (temporary, replaced fully in Task 13):
```jsx
export default function App() {
  return (
    <div style={{ background: '#0B0B0C', color: 'white', minHeight: '100vh' }}>
      <h1>TransformRS scaffold OK</h1>
    </div>
  )
}
```

- [ ] **Step 7: Verify dev server runs**

Run: `npm run dev`
Expected: Vite prints a local URL (e.g. `http://localhost:5173/`); loading it shows "TransformRS scaffold OK" on a black background with no console errors.

- [ ] **Step 8: Commit**

```bash
git add package.json package-lock.json vite.config.js tailwind.config.js postcss.config.js index.html src .gitignore
git commit -m "Scaffold Vite + React + Tailwind + Framer Motion project"
```

---

### Task 2: Data modules — coaches and testimonials

**Files:**
- Create: `src/data/coaches.js`
- Create: `src/data/testimonials.js`

**Interfaces:**
- Produces: `coaches` array of `{ id, name, role, bio, badges: string[], img: string }`; `testimonials` array of `{ id, text, name, result, avatar: string }`. Task 8 (CoachCard/CoachesSection) and Task 10 (TestimonialsSection) consume these exact shapes.

- [ ] **Step 1: Write `src/data/coaches.js`**

```js
export const coaches = [
  {
    id: 20,
    name: 'Rutuja Hegshetye',
    role: "IFBB Pro · Head Coach",
    bio: "Bikini competitor and women's physique specialist. Expert in hormonal health, sustainable fat loss, and contest prep for female athletes.",
    badges: ['IFBB Pro', 'Bikini Prep', "Women's Health"],
    img: 'https://picsum.photos/320/380?random=20',
  },
  {
    id: 21,
    name: 'Coach [Name]',
    role: 'IFBB Pro · Physique Coach',
    bio: "Men's physique competitor and online coaching specialist. Expert in body recomposition, evidence-based programming, and posing.",
    badges: ['IFBB Pro', 'Online Coaching', 'Posing'],
    img: 'https://picsum.photos/320/380?random=21',
  },
  {
    id: 22,
    name: 'Posing Specialist',
    role: 'Posing Coach',
    bio: 'Stage presentation and posing mechanics specialist for all physique categories.',
    badges: ['Posing', 'Stage Ready', 'Competition'],
    img: 'https://picsum.photos/320/380?random=22',
  },
  {
    id: 23,
    name: 'Nutrition Coach',
    role: 'Nutrition Specialist',
    bio: 'Precision nutrition planning. Cultural food fluency — roti, rice, festivals, and real life included.',
    badges: ['Nutrition', 'Reverse Diet', 'Tracking'],
    img: 'https://picsum.photos/320/380?random=23',
  },
]
```

- [ ] **Step 2: Write `src/data/testimonials.js`**

```js
export const testimonials = [
  {
    id: 50,
    text: "They didn't make me feel guilty about eating at Diwali. First coach who actually understood that I have a life outside the gym.",
    name: 'Priya S.',
    result: 'Lost 12kg · 4 months',
    avatar: 'https://picsum.photos/48/48?random=50',
  },
  {
    id: 51,
    text: 'The spreadsheet tracking every week showed me progress even when I couldn\'t see it in the mirror. Changed everything about how I think about training.',
    name: 'Rahul M.',
    result: 'Physique Transformation · 6 months',
    avatar: 'https://picsum.photos/48/48?random=51',
  },
  {
    id: 52,
    text: "Placed 2nd at my first bikini competition. Rutuja's posing coaching made me feel like I belonged on that stage.",
    name: 'Shreya K.',
    result: '🏆 2nd Place — Bikini Open 2024',
    avatar: 'https://picsum.photos/48/48?random=52',
  },
]
```

- [ ] **Step 3: Verify modules import cleanly**

Run: `node -e "console.log(require('fs').existsSync('src/data/coaches.js'), require('fs').existsSync('src/data/testimonials.js'))"`
Expected: `true true`

- [ ] **Step 4: Commit**

```bash
git add src/data/coaches.js src/data/testimonials.js
git commit -m "Add coaches and testimonials data modules"
```

---

### Task 3: Navbar (desktop + mobile drawer)

**Files:**
- Create: `src/components/Navbar.jsx`
- Modify: `src/App.jsx` (render `<Navbar />` at top, temporarily, for visual check)

**Interfaces:**
- Produces: `Navbar` default export, no props (self-contained scroll-state + menu-open-state).

- [ ] **Step 1: Write `src/components/Navbar.jsx`**

```jsx
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const links = ['Home', 'Coaches', 'Programs', 'Transformations', 'Contact']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        padding: '20px 24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: scrolled ? 'rgba(11,11,12,0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
        transition: 'all 300ms ease',
      }}
      className="md:px-12"
    >
      <div style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 700, fontSize: '20px', color: '#FFFFFF', letterSpacing: '1px' }}>
        TRANSFORM<span style={{ color: '#F4C400' }}>RS</span>
      </div>

      <div className="hidden md:flex" style={{ gap: '32px' }}>
        {links.map((link) => (
          <a
            key={link}
            href={`#${link.toLowerCase()}`}
            style={{
              fontFamily: 'DM Sans, sans-serif',
              fontWeight: 500,
              fontSize: '13px',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              color: 'white',
              textDecoration: 'none',
              transition: 'color 200ms ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#F4C400')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'white')}
          >
            {link}
          </a>
        ))}
      </div>

      <button
        className="hidden md:inline-block"
        style={{
          background: '#F4C400',
          color: '#0B0B0C',
          fontFamily: 'Oswald, sans-serif',
          fontWeight: 600,
          fontSize: '13px',
          letterSpacing: '2px',
          textTransform: 'uppercase',
          padding: '12px 28px',
          borderRadius: '999px',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        Start Your Journey
      </button>

      <button
        className="md:hidden"
        aria-label="Toggle menu"
        onClick={() => setOpen(true)}
        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px' }}
      >
        <div style={{ width: '24px', height: '2px', background: '#F4C400', marginBottom: '6px' }} />
        <div style={{ width: '24px', height: '2px', background: '#F4C400', marginBottom: '6px' }} />
        <div style={{ width: '24px', height: '2px', background: '#F4C400' }} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            style={{
              position: 'fixed',
              inset: 0,
              background: '#0B0B0C',
              zIndex: 60,
              display: 'flex',
              flexDirection: 'column',
              padding: '24px',
            }}
          >
            <button
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              style={{ alignSelf: 'flex-end', background: 'none', border: 'none', color: '#F4C400', fontSize: '28px', cursor: 'pointer', minHeight: '56px', minWidth: '56px' }}
            >
              ×
            </button>
            <div style={{ display: 'flex', flexDirection: 'column', marginTop: '24px' }}>
              {links.map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  onClick={() => setOpen(false)}
                  style={{
                    fontFamily: 'Oswald, sans-serif',
                    fontWeight: 700,
                    fontSize: '28px',
                    color: 'white',
                    textDecoration: 'none',
                    textTransform: 'uppercase',
                    minHeight: '56px',
                    display: 'flex',
                    alignItems: 'center',
                    borderBottom: '1px solid rgba(255,255,255,0.06)',
                  }}
                >
                  {link}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
```

- [ ] **Step 2: Render it in `App.jsx` for a visual check**

Temporarily edit `src/App.jsx`:
```jsx
import Navbar from './components/Navbar'

export default function App() {
  return (
    <div style={{ background: '#0B0B0C', minHeight: '150vh' }}>
      <Navbar />
    </div>
  )
}
```

- [ ] **Step 3: Verify in browser**

Run: `npm run dev`, open the local URL.
Expected: transparent navbar over black background; scrolling past 60px gives it a blurred dark background and bottom border; resizing below 768px swaps the center links + CTA for a hamburger button; clicking the hamburger slides in a full-screen black drawer with large nav links and a working close button.

- [ ] **Step 4: Commit**

```bash
git add src/components/Navbar.jsx src/App.jsx
git commit -m "Add Navbar with scroll state and mobile drawer"
```

---

### Task 4: HeroSection with ghost/outline headline

**Files:**
- Create: `src/components/HeroSection.jsx`
- Modify: `src/App.jsx` (add `<HeroSection />` under `<Navbar />`)

**Interfaces:**
- Produces: `HeroSection` default export, no props.
- Consumes: `.scroll-indicator-line` CSS class from `src/index.css` (Task 1).

- [ ] **Step 1: Write `src/components/HeroSection.jsx`**

```jsx
import { motion } from 'framer-motion'

const container = {
  hidden: { opacity: 1 },
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.3 } },
}

const line = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.215, 0.61, 0.355, 1] } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

export default function HeroSection() {
  return (
    <section style={{ position: 'relative', width: '100%', height: '100vh', minHeight: '600px', overflow: 'hidden', background: '#0B0B0C' }}>
      <img
        src="https://picsum.photos/1400/900?random=1"
        alt="Team TransformRS"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', filter: 'brightness(0.5)' }}
      />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(11,11,12,0.2) 0%, rgba(11,11,12,0.1) 50%, rgba(11,11,12,0.8) 100%)' }} />

      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 24px' }}
      >
        <h1
          style={{
            fontFamily: 'Oswald, sans-serif',
            fontWeight: 700,
            fontSize: 'clamp(40px, 10vw, 140px)',
            lineHeight: 1.0,
            letterSpacing: '-0.02em',
            textTransform: 'uppercase',
            marginBottom: '24px',
          }}
        >
          <motion.span variants={line} style={{ display: 'block', color: 'transparent', WebkitTextStroke: 'clamp(1.5px, 0.2vw, 2px) rgba(255,255,255,0.9)' }}>
            NOT YOUR
          </motion.span>
          <motion.span variants={line} style={{ display: 'block', color: 'transparent', WebkitTextStroke: 'clamp(1.5px, 0.2vw, 2px) #F4C400' }}>
            TYPICAL
          </motion.span>
          <motion.span variants={line} style={{ display: 'block', color: 'transparent', WebkitTextStroke: 'clamp(1.5px, 0.2vw, 2px) rgba(255,255,255,0.9)' }}>
            FITNESS
          </motion.span>
        </h1>

        <motion.p
          variants={fadeUp}
          style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: 'clamp(16px, 2.5vw, 22px)', color: 'rgba(255,255,255,0.85)', letterSpacing: '0.05em', marginBottom: '40px', maxWidth: '600px' }}
        >
          Two IFBB Pro coaches. One mission. Real transformation without the guilt.
        </motion.p>

        <motion.div variants={fadeUp} className="flex-col md:flex-row" style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center', width: '100%' }}>
          <button
            className="w-full md:w-auto"
            style={{ background: '#F4C400', color: '#0B0B0C', fontFamily: 'Oswald, sans-serif', fontWeight: 600, fontSize: '14px', letterSpacing: '2px', textTransform: 'uppercase', padding: '16px 40px', borderRadius: '999px', border: 'none', cursor: 'pointer', minHeight: '52px', transition: 'transform 200ms ease' }}
            onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.97)')}
            onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            Start Your Transformation
          </button>
          <button
            className="w-full md:w-auto"
            style={{ background: 'transparent', color: 'white', fontFamily: 'Oswald, sans-serif', fontWeight: 500, fontSize: '14px', letterSpacing: '2px', textTransform: 'uppercase', padding: '16px 40px', borderRadius: '999px', border: '1px solid rgba(255,255,255,0.5)', cursor: 'pointer', minHeight: '52px', transition: 'transform 200ms ease' }}
            onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.97)')}
            onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1.03)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            Meet the Coaches
          </button>
        </motion.div>
      </motion.div>

      <div style={{ position: 'absolute', bottom: '32px', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <span style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'DM Sans, sans-serif', fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase' }}>
          Scroll
        </span>
        <div className="scroll-indicator-line" style={{ width: '1px', height: '48px', background: 'linear-gradient(to bottom, rgba(244,196,0,0.8), transparent)' }} />
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Add to `App.jsx`**

```jsx
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'

export default function App() {
  return (
    <div style={{ background: '#0B0B0C' }}>
      <Navbar />
      <HeroSection />
    </div>
  )
}
```

- [ ] **Step 3: Verify in browser**

Expected: full-viewport dark hero with the duo photo, "NOT YOUR / TYPICAL (gold outline) / FITNESS" ghost-stroked headline staggering in on load, italic subheadline and two buttons appearing after, pulsing scroll indicator at the bottom. At <768px width, buttons stack full-width and the headline shrinks per `clamp()` without wrapping oddly.

- [ ] **Step 4: Commit**

```bash
git add src/components/HeroSection.jsx src/App.jsx
git commit -m "Add HeroSection with ghost-text headline and stagger animation"
```

---

### Task 5: StatsStrip with count-up

**Files:**
- Create: `src/components/StatsStrip.jsx`
- Modify: `src/App.jsx` (add `<StatsStrip />` after `<HeroSection />`)

**Interfaces:**
- Produces: `StatsStrip` default export, no props.

- [ ] **Step 1: Write `src/components/StatsStrip.jsx`**

```jsx
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
```

- [ ] **Step 2: Add to `App.jsx`** (insert `<StatsStrip />` between `HeroSection` and the closing div, with matching import)

- [ ] **Step 3: Verify in browser**

Expected: dark strip below the hero; scrolling it into view triggers each number counting up from 0 to its target over ~2.5s; 2×2 grid on mobile with no dividers, 4-column row with thin left dividers (except the first) at ≥768px.

- [ ] **Step 4: Commit**

```bash
git add src/components/StatsStrip.jsx src/App.jsx
git commit -m "Add StatsStrip with scroll-triggered count-up"
```

---

### Task 6: AboutSection

**Files:**
- Create: `src/components/AboutSection.jsx`
- Modify: `src/App.jsx`

**Interfaces:**
- Produces: `AboutSection` default export, no props.

- [ ] **Step 1: Write `src/components/AboutSection.jsx`**

```jsx
import { motion } from 'framer-motion'

const reveal = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

const bullets = [
  'No fear-based or shame-based methods',
  'No starvation — sustainability over restriction',
  'You build independence, not dependency on us',
  'Weekly data tracking — nothing is guesswork',
]

export default function AboutSection() {
  return (
    <section style={{ background: '#FFFFFF', padding: 'clamp(80px, 10vw, 160px) clamp(24px, 6vw, 96px)' }}>
      <div className="grid grid-cols-1 md:grid-cols-2" style={{ maxWidth: '1200px', margin: '0 auto', gap: '48px', alignItems: 'center' }}>
        <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '0px 0px -80px 0px' }}>
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', letterSpacing: '4px', textTransform: 'uppercase', color: '#F4C400', marginBottom: '16px' }}>
            What We Believe
          </p>
          <h2 style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 700, fontSize: 'clamp(32px, 4vw, 52px)', color: '#0B0B0C', textTransform: 'uppercase', lineHeight: 1.1, marginBottom: '24px' }}>
            Coaching That Doesn't<br />
            <span style={{ color: '#F4C400' }}>Cost You Yourself</span>
          </h2>
          <p style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: '22px', lineHeight: 1.6, color: '#333', marginBottom: '24px', borderLeft: '3px solid #F4C400', paddingLeft: '24px' }}>
            "We don't believe in starving clients, shaming bodies, or creating dependency. We believe in building athletes who can eventually coach themselves."
          </p>
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '16px', lineHeight: 1.8, color: '#666', marginBottom: '40px' }}>
            Real transformation happens when your plan fits your real life — festivals, family meals, work travel, and all. We combine IFBB Pro competitive expertise with a coaching philosophy built on sustainability, data, and respect.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {bullets.map((item) => (
              <div key={item} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <span style={{ color: '#F4C400', fontSize: '18px', marginTop: '2px' }}>✓</span>
                <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '15px', color: '#444' }}>{item}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '0px 0px -80px 0px' }}
          style={{ position: 'relative' }}
        >
          <img
            src="https://picsum.photos/600/700?random=5"
            alt="Team TransformRS"
            style={{ width: '100%', height: '600px', objectFit: 'cover', borderRadius: '4px' }}
          />
          <div
            className="hidden md:block"
            style={{ position: 'absolute', top: '24px', right: '-24px', width: '100%', height: '100%', border: '2px solid #F4C400', borderRadius: '4px', zIndex: -1 }}
          />
        </motion.div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Add to `App.jsx`**

- [ ] **Step 3: Verify in browser**

Expected: white section, two columns at ≥768px (text left, image with gold offset border box behind it on the right), single column stacked (no offset box) below 768px; header block fades/slides up on scroll into view.

- [ ] **Step 4: Commit**

```bash
git add src/components/AboutSection.jsx src/App.jsx
git commit -m "Add AboutSection with philosophy copy and offset-border image"
```

---

### Task 7: PhotoGridSection

**Files:**
- Create: `src/components/PhotoGridSection.jsx`
- Modify: `src/App.jsx`

**Interfaces:**
- Produces: `PhotoGridSection` default export, no props.

- [ ] **Step 1: Write `src/components/PhotoGridSection.jsx`**

```jsx
const imgStyle = { width: '100%', objectFit: 'cover', borderRadius: '4px', display: 'block' }

export default function PhotoGridSection() {
  return (
    <section style={{ background: '#FFFFFF', padding: '0 0 clamp(80px, 10vw, 120px) 0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 clamp(24px, 4vw, 48px)' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', letterSpacing: '4px', color: '#F4C400', textTransform: 'uppercase', marginBottom: '12px' }}>
            Real People. Real Change.
          </p>
          <h2 style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 700, fontSize: 'clamp(28px, 4vw, 48px)', color: '#0B0B0C', textTransform: 'uppercase' }}>
            What Transformation Looks Like
          </h2>
        </div>

        {/* Desktop masonry grid */}
        <div className="hidden md:grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
          <img src="https://picsum.photos/400/350?random=10" alt="" style={{ ...imgStyle, height: '350px' }} />
          <img src="https://picsum.photos/400/500?random=11" alt="" style={{ ...imgStyle, height: '500px', gridRow: 'span 2' }} />
          <img src="https://picsum.photos/400/350?random=12" alt="" style={{ ...imgStyle, height: '350px' }} />
          <img src="https://picsum.photos/400/250?random=13" alt="" style={{ ...imgStyle, height: '250px' }} />
          <img src="https://picsum.photos/400/250?random=14" alt="" style={{ ...imgStyle, height: '250px' }} />
          <img src="https://picsum.photos/800/300?random=15" alt="" style={{ ...imgStyle, height: '300px', gridColumn: 'span 2' }} />
          <img src="https://picsum.photos/400/300?random=16" alt="" style={{ ...imgStyle, height: '300px' }} />
        </div>

        {/* Mobile uniform grid */}
        <div className="grid md:hidden" style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
          {[10, 11, 12, 13, 14, 15, 16].map((n) => (
            <img key={n} src={`https://picsum.photos/400/300?random=${n}`} alt="" style={{ ...imgStyle, height: '220px' }} />
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Add to `App.jsx`**

- [ ] **Step 3: Verify in browser**

Expected: white section, irregular 3-column masonry grid on desktop (one tall image spanning two rows, one wide image spanning two columns), uniform 2-column 220px-tall grid on mobile.

- [ ] **Step 4: Commit**

```bash
git add src/components/PhotoGridSection.jsx src/App.jsx
git commit -m "Add PhotoGridSection with desktop masonry and mobile uniform grid"
```

---

### Task 8: CoachCard + CoachesSection (horizontal auto-scroll)

**Files:**
- Create: `src/components/CoachCard.jsx`
- Create: `src/components/CoachesSection.jsx`
- Modify: `src/App.jsx`

**Interfaces:**
- Consumes: `coaches` array from `src/data/coaches.js` (Task 2), shape `{ id, name, role, bio, badges, img }`.
- Consumes: `.coaches-scroll-track` CSS class from `src/index.css` (Task 1).
- Produces: `CoachCard` default export with prop `{ coach }`; `CoachesSection` default export, no props.

- [ ] **Step 1: Write `src/components/CoachCard.jsx`**

```jsx
export default function CoachCard({ coach }) {
  return (
    <div
      style={{
        flexShrink: 0,
        width: '280px',
        background: 'rgba(255,255,255,0.04)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '8px',
        overflow: 'hidden',
        transition: 'transform 300ms ease',
        cursor: 'pointer',
      }}
      className="md:w-[320px]"
      onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-6px)')}
      onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
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
```

- [ ] **Step 2: Write `src/components/CoachesSection.jsx`**

```jsx
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
```

- [ ] **Step 3: Add to `App.jsx`**

- [ ] **Step 4: Verify in browser**

Expected: dark section, header block, below it a row of glassmorphism coach cards continuously scrolling right-to-left (40s loop desktop, 50s mobile), looping seamlessly since the array is duplicated; hovering the track pauses the scroll; hovering an individual card lifts it slightly.

- [ ] **Step 5: Commit**

```bash
git add src/components/CoachCard.jsx src/components/CoachesSection.jsx src/App.jsx
git commit -m "Add CoachesSection with glassmorphism auto-scroll carousel"
```

---

### Task 9: ProgramsSection (bento grid)

**Files:**
- Create: `src/components/ProgramsSection.jsx`
- Modify: `src/App.jsx`

**Interfaces:**
- Produces: `ProgramsSection` default export, no props.

- [ ] **Step 1: Write `src/components/ProgramsSection.jsx`**

```jsx
const btnBase = {
  fontFamily: 'Oswald, sans-serif',
  fontWeight: 600,
  fontSize: '13px',
  letterSpacing: '2px',
  textTransform: 'uppercase',
  padding: '14px 32px',
  borderRadius: '999px',
  border: 'none',
  cursor: 'pointer',
  alignSelf: 'flex-start',
  marginTop: 'auto',
}

export default function ProgramsSection() {
  return (
    <section style={{ background: '#F7F5F0', padding: 'clamp(80px, 10vw, 120px) clamp(24px, 4vw, 96px)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ marginBottom: '48px' }}>
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', letterSpacing: '4px', color: '#F4C400', textTransform: 'uppercase', marginBottom: '12px' }}>
            Your Path Forward
          </p>
          <h2 style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 700, fontSize: 'clamp(28px, 4vw, 48px)', color: '#0B0B0C', textTransform: 'uppercase' }}>
            Choose Your Journey
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: '16px' }}>
          <div className="md:col-span-2" style={{ background: '#0B0B0C', borderRadius: '8px', padding: '48px', borderTop: '3px solid #F4C400', display: 'flex', flexDirection: 'column', gap: '16px', minHeight: '280px' }}>
            <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', letterSpacing: '3px', color: '#F4C400', textTransform: 'uppercase' }}>Most Popular</span>
            <h3 style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 700, fontSize: '32px', color: '#FFF', textTransform: 'uppercase' }}>Lifestyle Coaching</h3>
            <p style={{ fontFamily: 'DM Sans, sans-serif', color: 'rgba(255,255,255,0.6)', fontSize: '15px', lineHeight: 1.7 }}>
              Science-backed body transformation for real life. Training + nutrition that works around festivals, family, and everything in between.
            </p>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '8px', listStyle: 'none', padding: 0 }}>
              {['Weekly check-ins & adjustments', 'Spreadsheet-based progress tracking', 'WhatsApp coaching support', 'Custom meal + training plan'].map((f) => (
                <li key={f} style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '14px', color: 'rgba(255,255,255,0.7)', display: 'flex', gap: '10px' }}>
                  <span style={{ color: '#F4C400' }}>→</span> {f}
                </li>
              ))}
            </ul>
            <button style={{ ...btnBase, background: '#F4C400', color: '#0B0B0C' }}>Apply Now</button>
          </div>

          <div style={{ background: '#F4C400', borderRadius: '8px', padding: '40px 32px', display: 'flex', flexDirection: 'column', gap: '12px', minHeight: '280px' }}>
            <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', letterSpacing: '3px', color: 'rgba(0,0,0,0.5)', textTransform: 'uppercase' }}>For Competitors</span>
            <h3 style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 700, fontSize: '28px', color: '#0B0B0C', textTransform: 'uppercase', lineHeight: 1.1 }}>Contest Prep Coaching</h3>
            <p style={{ fontFamily: 'DM Sans, sans-serif', color: 'rgba(0,0,0,0.7)', fontSize: '14px', lineHeight: 1.6 }}>
              Full-cycle prep from off-season to stage day. Peak week, tanning, pump-up — we've done it ourselves.
            </p>
            <button style={{ ...btnBase, background: '#0B0B0C', color: '#F4C400', padding: '12px 24px' }}>Learn More</button>
          </div>

          <div style={{ background: '#FFFFFF', border: '1px solid rgba(0,0,0,0.08)', borderRadius: '8px', padding: '40px 32px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', letterSpacing: '3px', color: '#F4C400', textTransform: 'uppercase' }}>Add-On Service</span>
            <h3 style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 700, fontSize: '24px', color: '#0B0B0C', textTransform: 'uppercase' }}>Posing Coaching</h3>
            <p style={{ fontFamily: 'DM Sans, sans-serif', color: '#666', fontSize: '14px', lineHeight: 1.6 }}>Stage presence from IFBB Pros. All categories. Online or in-person.</p>
            <button style={{ ...btnBase, background: 'transparent', color: '#0B0B0C', border: '1.5px solid #0B0B0C', padding: '12px 24px' }}>Book Session</button>
          </div>

          <div style={{ background: '#FFFFFF', border: '1px solid rgba(0,0,0,0.08)', borderRadius: '8px', padding: '40px 32px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '11px', letterSpacing: '3px', color: '#C6417E', textTransform: 'uppercase' }}>In-Person</span>
            <h3 style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 700, fontSize: '24px', color: '#0B0B0C', textTransform: 'uppercase' }}>Group Training</h3>
            <p style={{ fontFamily: 'DM Sans, sans-serif', color: '#666', fontSize: '14px', lineHeight: 1.6 }}>Hands-on sessions at our partner gym. Community energy, professional guidance.</p>
            <button style={{ ...btnBase, background: 'transparent', color: '#0B0B0C', border: '1.5px solid #0B0B0C', padding: '12px 24px' }}>Join Us</button>
          </div>

          <div style={{ background: '#1A1A1A', borderRadius: '8px', padding: '40px 32px', display: 'flex', flexDirection: 'column', gap: '12px', justifyContent: 'center' }}>
            <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: '26px', color: '#FFF', lineHeight: 1.3 }}>Not sure which program is right for you?</h3>
            <p style={{ fontFamily: 'DM Sans, sans-serif', color: 'rgba(255,255,255,0.5)', fontSize: '14px' }}>Book a free 15-min discovery call. We'll figure it out together.</p>
            <button style={{ ...btnBase, background: 'transparent', color: '#F4C400', border: '1.5px solid #F4C400', padding: '12px 24px', marginTop: '8px' }}>Talk to Us</button>
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Add to `App.jsx`**

- [ ] **Step 3: Verify in browser**

Expected: off-white section; desktop shows a bento grid (2-col-span dark featured card, gold card, two white bordered cards, one dark CTA card — 5 cards total across 3 columns with the first spanning 2); mobile stacks every card full-width single column; Group Training's magenta label is the only magenta anywhere on the page.

- [ ] **Step 4: Commit**

```bash
git add src/components/ProgramsSection.jsx src/App.jsx
git commit -m "Add ProgramsSection bento grid"
```

---

### Task 10: TestimonialsSection

**Files:**
- Create: `src/components/TestimonialsSection.jsx`
- Modify: `src/App.jsx`

**Interfaces:**
- Consumes: `testimonials` array from `src/data/testimonials.js` (Task 2), shape `{ id, text, name, result, avatar }`.
- Produces: `TestimonialsSection` default export, no props.

- [ ] **Step 1: Write `src/components/TestimonialsSection.jsx`**

```jsx
import { motion } from 'framer-motion'
import { testimonials } from '../data/testimonials'

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const card = {
  hidden: { opacity: 0, y: 16, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5 } },
}

export default function TestimonialsSection() {
  return (
    <section style={{ background: '#0B0B0C', padding: 'clamp(80px, 10vw, 120px) clamp(24px, 4vw, 96px)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', letterSpacing: '4px', color: '#F4C400', textTransform: 'uppercase', marginBottom: '12px' }}>
            Client Wins
          </p>
          <h2 style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 700, fontSize: 'clamp(28px, 4vw, 52px)', color: '#FFFFFF', textTransform: 'uppercase' }}>
            Real People. Real Results.
          </h2>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3"
          style={{ gap: '24px' }}
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '0px 0px -80px 0px' }}
        >
          {testimonials.map((t) => (
            <motion.div
              key={t.id}
              variants={card}
              style={{ background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '36px' }}
            >
              <p style={{ fontFamily: 'Oswald, sans-serif', fontSize: '52px', color: '#F4C400', lineHeight: 1, marginBottom: '16px' }}>"</p>
              <p style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: '18px', color: 'rgba(255,255,255,0.85)', lineHeight: 1.7, marginBottom: '24px' }}>
                {t.text}
              </p>
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '20px', display: 'flex', alignItems: 'center', gap: '14px' }}>
                <img src={t.avatar} alt={t.name} style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }} />
                <div>
                  <p style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 600, fontSize: '15px', color: '#FFF', textTransform: 'uppercase' }}>{t.name}</p>
                  <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', color: '#F4C400' }}>{t.result}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Add to `App.jsx`**

- [ ] **Step 3: Verify in browser**

Expected: dark section, 3-column glassmorphism testimonial cards on desktop that stagger in on scroll, single column on mobile.

- [ ] **Step 4: Commit**

```bash
git add src/components/TestimonialsSection.jsx src/App.jsx
git commit -m "Add TestimonialsSection with staggered glassmorphism cards"
```

---

### Task 11: ContactSection

**Files:**
- Create: `src/components/ContactSection.jsx`
- Modify: `src/App.jsx`

**Interfaces:**
- Produces: `ContactSection` default export, no props.

- [ ] **Step 1: Write `src/components/ContactSection.jsx`**

```jsx
import { useState } from 'react'

const inputStyle = {
  width: '100%',
  background: '#FFF',
  border: '1px solid rgba(0,0,0,0.12)',
  borderRadius: '6px',
  padding: '14px 16px',
  fontFamily: 'DM Sans, sans-serif',
  fontSize: '15px',
  color: '#1A1A1A',
  outline: 'none',
  boxSizing: 'border-box',
  transition: 'border-color 200ms ease',
}

const labelStyle = {
  fontFamily: 'DM Sans, sans-serif',
  fontSize: '12px',
  letterSpacing: '2px',
  color: '#666',
  textTransform: 'uppercase',
  display: 'block',
  marginBottom: '8px',
}

function goldFocus(e) {
  e.currentTarget.style.borderColor = '#F4C400'
}
function clearFocus(e) {
  e.currentTarget.style.borderColor = 'rgba(0,0,0,0.12)'
}

const benefits = [
  'Personalized training + nutrition plan',
  'Weekly check-ins and data-driven adjustments',
  'WhatsApp access to your coach',
  'Competition prep available on request',
  'Festival and real-life eating accommodated',
]

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section style={{ background: '#FFFFFF', padding: 'clamp(80px, 10vw, 120px) clamp(24px, 4vw, 96px)' }}>
      <div className="grid grid-cols-1 md:grid-cols-2" style={{ maxWidth: '1200px', margin: '0 auto', gap: '48px', alignItems: 'start' }}>
        <div>
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', letterSpacing: '4px', color: '#F4C400', textTransform: 'uppercase', marginBottom: '16px' }}>
            Begin the Conversation
          </p>
          <h2 style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 700, fontSize: 'clamp(28px, 4vw, 52px)', color: '#0B0B0C', textTransform: 'uppercase', marginBottom: '24px' }}>
            See If We're<br /><span style={{ color: '#F4C400' }}>A Good Fit</span>
          </h2>
          <p style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: '20px', color: '#444', lineHeight: 1.7, marginBottom: '32px' }}>
            We personally review every application. Expect to hear back within 48 hours.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {benefits.map((text) => (
              <div key={text} style={{ display: 'flex', gap: '14px' }}>
                <span style={{ color: '#F4C400', fontSize: '18px' }}>✓</span>
                <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '15px', color: '#444' }}>{text}</span>
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} style={{ background: '#F7F5F0', borderRadius: '8px', padding: '48px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {['Full Name', 'Email Address', 'WhatsApp Number'].map((label) => (
            <div key={label}>
              <label style={labelStyle}>{label}</label>
              <input
                required
                type={label.includes('Email') ? 'email' : label.includes('Number') ? 'tel' : 'text'}
                style={inputStyle}
                onFocus={goldFocus}
                onBlur={clearFocus}
              />
            </div>
          ))}

          <div>
            <label style={labelStyle}>Your Goal</label>
            <select required style={{ ...inputStyle, appearance: 'none' }} onFocus={goldFocus} onBlur={clearFocus} defaultValue="">
              <option value="" disabled>Select your goal</option>
              <option>Sustainable fat loss / body recomposition</option>
              <option>Contest / bikini prep</option>
              <option>Posing coaching only</option>
              <option>Group training</option>
              <option>Not sure yet</option>
            </select>
          </div>

          <div>
            <label style={labelStyle}>Tell Us About Your Goals</label>
            <textarea rows={4} style={{ ...inputStyle, resize: 'vertical' }} onFocus={goldFocus} onBlur={clearFocus} />
          </div>

          <button
            type="submit"
            style={{ background: '#F4C400', color: '#0B0B0C', fontFamily: 'Oswald, sans-serif', fontWeight: 600, fontSize: '14px', letterSpacing: '2px', textTransform: 'uppercase', padding: '18px', borderRadius: '999px', border: 'none', cursor: 'pointer', width: '100%', minHeight: '52px' }}
          >
            {submitted ? 'Application Received' : 'Start My Transformation'}
          </button>

          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '12px', color: '#999', textAlign: 'center' }}>
            We personally review every application and respond within 48 hours.
          </p>
        </form>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Add to `App.jsx`**

- [ ] **Step 3: Verify in browser**

Expected: white section, two columns (benefits copy left, off-white form card right) on desktop, single column stacked on mobile; focusing any input/select/textarea turns its border gold; submitting (with required fields filled) swaps the button label to "Application Received".

- [ ] **Step 4: Commit**

```bash
git add src/components/ContactSection.jsx src/App.jsx
git commit -m "Add ContactSection with intake form and gold focus states"
```

---

### Task 12: Footer

**Files:**
- Create: `src/components/Footer.jsx`
- Modify: `src/App.jsx`

**Interfaces:**
- Produces: `Footer` default export, no props.

- [ ] **Step 1: Write `src/components/Footer.jsx`**

```jsx
const links = ['Coaches', 'Programs', 'Transformations', 'Contact']

export default function Footer() {
  return (
    <footer style={{ background: '#0B0B0C', borderTop: '1px solid rgba(255,255,255,0.06)', padding: 'clamp(48px, 6vw, 80px) clamp(24px, 4vw, 96px)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '48px', flexWrap: 'wrap', gap: '24px' }}>
          <div style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 700, fontSize: '24px', color: '#FFFFFF', letterSpacing: '2px' }}>
            TRANSFORM<span style={{ color: '#F4C400' }}>RS</span>
          </div>

          <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
            {links.map((link) => (
              <a key={link} href={`#${link.toLowerCase()}`} style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: 'rgba(255,255,255,0.5)', textDecoration: 'none', letterSpacing: '1px' }}>
                {link}
              </a>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '16px' }}>
            <a href="#" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'DM Sans, sans-serif', fontSize: '13px', textDecoration: 'none' }}>Instagram</a>
            <a href="#" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'DM Sans, sans-serif', fontSize: '13px', textDecoration: 'none' }}>WhatsApp</a>
          </div>
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '32px', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '13px', color: 'rgba(255,255,255,0.3)' }}>
            © 2026 Team TransformRS. All rights reserved.
          </p>
          <p style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: '15px', color: 'rgba(255,255,255,0.3)' }}>
            Coached by Pros. Built for real life.
          </p>
        </div>
      </div>
    </footer>
  )
}
```

- [ ] **Step 2: Add to `App.jsx`**

- [ ] **Step 3: Verify in browser**

Expected: dark footer, logo/nav-links/social row wrapping cleanly on narrow widths, divider, copyright + italic tagline row below.

- [ ] **Step 4: Commit**

```bash
git add src/components/Footer.jsx src/App.jsx
git commit -m "Add Footer"
```

---

### Task 13: Final App.jsx assembly + mobile sticky CTA

**Files:**
- Modify: `src/App.jsx` (final version, all sections in spec order)

**Interfaces:**
- Consumes: all section components from Tasks 3–12.

- [ ] **Step 1: Write the final `src/App.jsx`**

```jsx
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
      <ContactSection />
      <Footer />

      {/* Mobile sticky footer CTA */}
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
      <div className="md:hidden" style={{ height: '80px' }} />
    </div>
  )
}
```

- [ ] **Step 2: Full-page visual verification at desktop width (1440px)**

Run: `npm run dev`, open in browser at ≥1440px width.
Expected checklist:
- Section order top-to-bottom matches: Navbar → Hero(dark) → Stats(dark) → About(white) → PhotoGrid(white) → Coaches(dark) → Programs(off-white) → Testimonials(dark) → Contact(white) → Footer(dark).
- Only gold/black/white/off-white/magenta(1 spot) colors appear anywhere.
- Only Oswald/Cormorant Garamond/DM Sans fonts render (check via devtools computed font-family).
- No horizontal scrollbar.

- [ ] **Step 3: Full-page visual verification at mobile width (375px)**

Resize devtools to 375px width.
Expected: hamburger nav works, hero text readable and not clipped, all multi-column sections collapse to single/2-column per spec, sticky gold "Start My Transformation" bar pinned to the bottom of the viewport with page content never hidden behind it (the trailing 80px spacer prevents overlap), coach carousel still scrolls.

- [ ] **Step 4: Commit**

```bash
git add src/App.jsx
git commit -m "Assemble full landing page with mobile sticky CTA"
```

---

### Task 14: Cross-browser/perf sanity pass

**Files:**
- No new files; verification-only task, may produce small fixes to any component file from Tasks 3–12 if issues are found.

- [ ] **Step 1: Check console for errors/warnings**

Run: `npm run dev`, open browser devtools console, click through the whole page (scroll top to bottom, open/close mobile menu, submit the contact form).
Expected: zero console errors; React key-prop warnings (if any) traced back to the offending `.map()` and fixed by giving it a stable unique key.

- [ ] **Step 2: Verify animations don't jank on scroll**

Scroll the full page slowly at 1440px and at 375px widths.
Expected: no layout shift when images load (all images have explicit `height` styles), scroll-triggered reveals fire once and don't re-trigger repeatedly, coach carousel keeps a steady frame rate.

- [ ] **Step 3: Run a production build**

Run: `npm run build`
Expected: build completes with no errors; note any bundle-size warnings but no failures.

- [ ] **Step 4: Commit any fixes found in Steps 1–2**

```bash
git add -A
git commit -m "Fix issues found in cross-browser/perf sanity pass"
```

(Skip this commit if Steps 1–3 found nothing to fix.)

---

## Self-Review Notes

- **Spec coverage:** Every section in the design spec (Navbar, Hero, Stats, About, PhotoGrid, Coaches, Programs, Testimonials, Contact, Footer) has a task. Global constraints (fonts, colors, section rhythm, glassmorphism scope, radius rule, placeholder content, picsum seeds) are called out in the Global Constraints block and reflected in each task's code.
- **Placeholder scan:** No TBD/TODO steps; the one intentional placeholder (`"Coach [Name]"`, footer `href="#"` social links) is a deliberate spec requirement, not a plan gap.
- **Type/interface consistency:** `coaches` (`id,name,role,bio,badges,img`) and `testimonials` (`id,text,name,result,avatar`) shapes defined in Task 2 are consumed with matching field names in Task 8 (`CoachCard`/`CoachesSection`) and Task 10 (`TestimonialsSection`) respectively.
