# Design System — My Dental Clinic Landing Page

## Product Context
Medical/dental clinic landing page for "My Dental Clinic" (mydentalclinic.md) — the largest dental clinic in Moldova, Chișinău. Single-page marketing site targeting patients. Goal: build trust, showcase services, drive appointment bookings.

Key pages: Hero, Stats bar, Services (9 categories), Why Us, Testimonials, CTA Banner, Contact + Form, Footer.

## Brand Identity
- **Brand name**: my dental clinic (lowercase stylized)
- **Brand symbol**: Smile arc SVG — `<path d="M4 8 Q20 28 36 8">` in accent color
- **Tagline**: "Zâmbetul tău, grija noastră" (Your smile, our care)
- **Tone**: Professional, warm, trustworthy, modern

## Color System
```
Primary Dark:  #0E2338  — main text, navbars, dark sections, dark cards
Accent:        #A30B37  — CTAs, icons, highlights, hover borders, checkmarks
Accent Dark:   #8A092E  — hover state of accent buttons
Bg Light:      #D3E3FD  — light blue tint, badge bg, icon circles bg, hero gradient
Surface:       #E6E5EC  — section backgrounds (services), card borders, dividers
Neutral:       #CCCCCC  — borders, separators, placeholder text, avatar bg
White:         #FFFFFF  — card backgrounds, main page bg
```

## Typography
```
Heading font: "Parkinsans" (weights: 300, 500, 700) — class: font-heading
Body font:    "Libre Franklin" (weights: 400, 500, 700 + italic) — class: font-sans (default)
```

### Type Scale
| Role | Size | Weight | Class |
|---|---|---|---|
| H1 (hero) | 56px desktop / 4xl mobile | 700 | font-heading |
| H2 (section) | 38-40px desktop / 3xl mobile | 700 | font-heading |
| H3 (card) | 17-18px | 500-600 | font-heading |
| Body large | 16-18px | 400 | font-sans |
| Body | 14-15px | 400 | font-sans |
| Caption | 12-13px | 500 | font-sans |
| Eyebrow | 12-13px | 700 uppercase tracking-[2px] | font-sans text-accent |

## Spacing
- Max content width: `max-w-[1440px] mx-auto`
- Horizontal padding: `px-6 md:px-10 lg:px-16`
- Section vertical padding: `py-20 md:py-24`
- Navbar height: `h-20` (80px)
- Card internal padding: `p-7` or `p-8`
- Gap between cards: `gap-6 md:gap-8`

## Border Radius
- Service/testimonial cards: `rounded-[16px]`
- Image containers: `rounded-[24px]` or `rounded-[20px]`
- Pill CTA buttons (primary): `rounded-[50px]`
- Square CTA buttons (secondary): `rounded-[8px]`
- Icon circles: `rounded-full`
- Badges: `rounded-full` or `rounded-[8px]`

## Shadows
- Subtle (default card): `box-shadow: 0 4px 24px rgba(14, 35, 56, 0.08)`
- Hover (elevated card): `box-shadow: 0 12px 40px rgba(14, 35, 56, 0.15)`
- Navbar: same as subtle

## Button Styles
### Primary CTA (pill)
```
bg-[#A30B37] text-white font-heading font-medium text-[16px] px-10 py-4 rounded-[50px]
hover: scale-105 + shadow-lg
```

### Secondary CTA (pill outline)
```
border-2 border-white text-white px-10 py-3.5 rounded-[50px]
hover: bg-white text-[#0E2338]
```

### Nav CTA (rect)
```
bg-[#A30B37] text-white font-medium text-[14px] px-6 py-2.5 rounded-[8px]
hover: bg-[#8A092E]
```

### Ghost CTA (rect outline)
```
border-2 border-[#A30B37] text-[#A30B37] px-10 py-3 rounded-[8px]
hover: bg-[#A30B37] text-white
```

## Animations
```css
fadeInUp: 0% {opacity:0, translateY(20px)} → 100% {opacity:1, translateY(0)} — 0.8s ease-out
fadeIn: 0% {opacity:0} → 100% {opacity:1} — 1s ease-out
Delays: .delay-100 / .delay-200 / .delay-300 / .delay-400
Entry: .opacity-0-init class (opacity:0) + animation class
```

## Section Backgrounds
| Section | Background |
|---|---|
| Navbar | white/95 + backdrop-blur |
| Hero | gradient: white → bg-light/80 (left to right) |
| StatsBar | primary-dark (#0E2338) solid |
| Services | surface (#E6E5EC) |
| WhyUs | white |
| Testimonials | gradient: bg-light/60 → white (top to bottom) |
| CTA Banner | primary-dark + bg-smile-pattern |
| Contact | white |
| Footer | primary-dark |

## Layout Patterns
- Two-column: `flex flex-col lg:flex-row` with `items-center gap-12 lg:gap-16`
- Grid 3x3: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8`
- Grid 5-stats: `grid grid-cols-2 lg:grid-cols-5` with vertical dividers

## Icon Usage
- Library: Iconify React (`@iconify/react`) with `lucide:*` icon set
- Icon size in circles: `text-xl` (20px)
- Icon circles: `w-10 h-10 rounded-full bg-[#D3E3FD] text-[#A30B37]`
- Checkmark circles: `w-6 h-6 rounded-full bg-[#A30B37] text-white`

## Decorative Elements
- Smile arc SVG: `<path d="M4 8 Q20 28 36 8" stroke-width="6" stroke-linecap="round">`
- Quarter circle decorative: `absolute bottom-0 right-0 w-[120px] h-[120px] bg-[#D3E3FD]/60 rounded-tl-full`
- Smile background pattern: repeating SVG smile arcs in white, 80px size
- Large decorative quote: `text-[80px] text-[#D3E3FD] opacity-40 font-heading`
