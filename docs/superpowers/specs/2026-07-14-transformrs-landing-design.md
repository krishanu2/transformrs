# Team TransformRS Landing Page — Design Spec

Date: 2026-07-14

## Purpose

Build a single-page, production-grade marketing site for Team TransformRS, a
boutique two-coach IFBB Pro coaching team. The design is inspired by a GYM
Figma reference: full-bleed duo hero photo, ghost/outline typography overlay,
alternating dark/white sections, masonry photo grid, and a horizontal
auto-scrolling coach carousel. The site must read as premium, editorial, and
human — not a generic gym template — and must visually reinforce that this is
a *team of two* coaches.

## Stack

- **Vite + React** (functional components, hooks only)
- **Tailwind CSS** for layout/spacing utilities
- **Framer Motion** for all animation (load-in stagger, scroll reveals,
  count-up stats, hover/press states)
- **Google Fonts**: Oswald (400/500/600/700), Cormorant Garamond
  (300/400/600, incl. italic), DM Sans (300/400/500/600) — loaded via
  `<link>` in `index.html`
- **picsum.photos** for all placeholder imagery (exact URLs/random seeds as
  listed in the original prompt)

No other fonts, no purple/rainbow gradients, no lime green. Color system is
gold (`#F4C400`) + black (`#0B0B0C`) + white/off-white, with magenta
(`#C6417E`) used once as a rare accent (Group Training label only).

## Project Structure

```
src/
  main.jsx
  App.jsx
  index.css                 (Tailwind directives + custom keyframes)
  components/
    Navbar.jsx
    HeroSection.jsx
    StatsStrip.jsx
    AboutSection.jsx
    PhotoGridSection.jsx
    CoachesSection.jsx
    CoachCard.jsx
    ProgramsSection.jsx
    TestimonialsSection.jsx
    ContactSection.jsx
    Footer.jsx
  data/
    coaches.js
    testimonials.js
```

Each section is its own component (spec calls for "a single React app" from
the user's point of view — that's satisfied by `App.jsx` composing all
sections into one page/route; splitting into files keeps each section
independently reasoned-about and testable, matching the reference prompt's
own componentized breakdown).

## Section Rhythm (non-negotiable)

1. Navbar — fixed, transparent → blurred dark on scroll
2. Hero — **dark**, full-bleed duo photo, ghost/outline headline
3. Stats strip — **dark**, count-up on scroll-into-view
4. About ("Our Approach") — **white**, two-column philosophy + offset-border image
5. Photo grid — **white**, masonry/irregular spans
6. Coaches — **dark**, horizontal auto-scroll (pauses on hover), glassmorphism cards
7. Programs — **off-white** bento grid (sharp corners, no glassmorphism)
8. Testimonials — **dark**, glassmorphism cards
9. Contact — **white**, two-column warm intake form
10. Footer — **dark**

4 dark sections / 4 white-or-off-white sections, alternating as listed. This
alternation is a hard constraint from the source prompt.

## Component Behavior Notes

- **Hero**: ghost/outline text via `WebkitTextStroke`, no fill. "TYPICAL" line
  stroked in gold, rest in white. Headline lines stagger up + fade in
  (Framer Motion, 0.15s stagger, starting 0.3s after mount); subheadline and
  CTAs follow 0.3s after headline completes. Bottom scroll indicator with a
  pulsing gradient line.
- **Stats strip**: 4 stats, gold numbers count up via `useMotionValue` +
  `animate` triggered on `whileInView`, 2.5s easeOut. 2×2 grid on mobile, no
  dividers.
- **About**: two-column desktop (text left, image right with a gold offset
  border box behind it); stacks single-column on mobile, offset box removed.
- **Photo grid**: irregular `gridColumn`/`gridRow` spans on desktop (per
  reference layout); collapses to a uniform 2-column grid at 220px row
  height on mobile.
- **Coaches**: horizontal flex track, `coaches` array duplicated ×2 for a
  seamless CSS `translateX(-50%)` loop, 40s linear infinite desktop / 50s
  mobile, `animation-play-state: paused` on hover. Cards are glass
  (`backdrop-filter: blur(12px)`, translucent white border).
- **Programs**: bento grid — one 2-col-span featured dark card (Lifestyle
  Coaching), one gold card (Contest Prep), two white bordered cards (Posing,
  Group Training — magenta accent label here only), one dark "not sure"
  CTA card. Single column on mobile.
- **Testimonials**: 3-column glass cards desktop, single column mobile.
- **Contact**: two-column (copy + benefits list left, form right on
  off-white card background); form stacks below copy on mobile. Gold focus
  ring on inputs (to be added via Tailwind `focus:` utilities since it's not
  spelled out inline in the source styles).
- **Footer**: logo + nav links + social links row, divider, copyright +
  tagline row.

## Data / Content

- `coaches.js` holds the 4 coach entries exactly as specified, including the
  literal placeholder for the second head coach: name `"Coach [Name]"`,
  role `"IFBB Pro · Physique Coach"`, and its bio/badges as given. This is
  intentional — real content for the second coach is supplied later by the
  client, not fabricated here.
- `testimonials.js` holds the 3 testimonials verbatim from the source prompt.
- Social links in the footer (Instagram, WhatsApp) stay as `href="#"`
  placeholders, matching the "keep placeholders" decision — no invented
  handles or numbers.
- All imagery uses the exact `picsum.photos` URLs/seeds listed in the source
  prompt (hero `?random=1`, about `?random=5`, grid `?random=10-16`, coaches
  `?random=20-23`, testimonial avatars `?random=50-52`).

## Responsive Rules

Mobile (<768px): hero ghost text `clamp(40px,12vw,80px)` with 1.5px stroke,
full-width stacked CTAs, single-column About/Programs/Testimonials/Contact,
2-col photo grid, hamburger nav with full-screen drawer, sticky full-width
gold footer CTA bar. Tablet (768–1024px): 2-column About with tighter gap,
2-column Programs, 2-col+1 testimonials. Desktop (1025px+): full layout as
specified above.

## Explicit Non-Goals (from source prompt's "what not to do")

No Inter/Roboto/Arial fonts. No all-dark site — white sections are load-
bearing for the brand's warmth. No pill-shaped cards outside of buttons —
cards use 4–8px radius. No glassmorphism outside Coaches/Testimonials. No
gradients beyond the specified hero dark-fade overlay. No "beast mode" /
aggressive copy — tone stays warm and ethical throughout.

## Testing / Verification

No backend, no automated test framework requested. Verification is visual:
run the Vite dev server, check each section renders per spec at mobile
(375px), tablet (768px), and desktop (1440px) widths, confirm animations
(hero stagger, count-up, coach auto-scroll pause-on-hover, section reveals)
fire correctly, and confirm dark/white alternation and gold/black/white-only
palette hold throughout.
