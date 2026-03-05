# Theme — My Dental Clinic

## Framework
- React 19 + TypeScript
- Vite 7 + @tailwindcss/vite (Tailwind CSS v4)
- Icons: @iconify/react (lucide:* + mdi:* sets)
- No component library — custom components only

## vite.config.ts
```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

## src/index.css (full)
```css
@import "tailwindcss";

@theme {
  --color-primary-dark: #0E2338;
  --color-accent: #A30B37;
  --color-bg-light: #D3E3FD;
  --color-surface: #E6E5EC;
  --color-neutral: #CCCCCC;

  --font-sans: "Libre Franklin", sans-serif;
  --font-heading: "Parkinsans", sans-serif;

  --shadow-subtle: 0 4px 24px rgba(14, 35, 56, 0.08);
  --shadow-hover: 0 12px 40px rgba(14, 35, 56, 0.15);

  --animate-fade-in-up: fadeInUp 0.8s ease-out forwards;
  --animate-fade-in: fadeIn 1s ease-out forwards;
}

@keyframes fadeInUp {
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
}

@keyframes fadeIn {
  0% { opacity: 0; }
  100% { opacity: 1; }
}

* { margin: 0; padding: 0; box-sizing: border-box; }

html { scroll-behavior: smooth; }

body {
  font-family: var(--font-sans);
  color: var(--color-primary-dark);
  background-color: #ffffff;
  -webkit-font-smoothing: antialiased;
}

body ::selection {
  background-color: var(--color-accent);
  color: #ffffff;
}

.delay-100 { animation-delay: 100ms; }
.delay-200 { animation-delay: 200ms; }
.delay-300 { animation-delay: 300ms; }
.delay-400 { animation-delay: 400ms; }
.opacity-0-init { opacity: 0; }

.bg-smile-pattern {
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 100 100"><path d="M20,40 Q50,70 80,40" stroke="%23FFFFFF" stroke-width="6" stroke-linecap="round" fill="transparent"/></svg>');
  background-size: 80px 80px;
}
```

## Color Palette
| Token | Value | Usage |
|---|---|---|
| primary-dark | #0E2338 | Main text, dark backgrounds, navbar dark bg |
| accent | #A30B37 | CTAs, icons, highlights, hover states |
| bg-light | #D3E3FD | Light blue tints, badge bg, image placeholders |
| surface | #E6E5EC | Section bg (Services), card borders |
| neutral | #CCCCCC | Borders, dividers, placeholder text |

## Typography
- **Heading font**: Parkinsans (300, 500, 700) — used with `font-heading` class
- **Body font**: Libre Franklin (400, 500, 700, italic) — default `font-sans`
- Loaded via Google Fonts in index.html

## Spacing & Sizing
- Max content width: `max-w-[1440px]`
- Section padding horizontal: `px-6 md:px-10 lg:px-16`
- Section padding vertical: `py-20 md:py-24`
- Navbar height: `h-20`

## Border Radius
- Cards: `rounded-[16px]`
- Pill buttons: `rounded-[50px]`
- Square buttons: `rounded-[8px]`
- Image/hero: `rounded-[24px]`

## Shadows
- Subtle: `0 4px 24px rgba(14, 35, 56, 0.08)`
- Hover: `0 12px 40px rgba(14, 35, 56, 0.15)`

## Brand Logo SVG (Smile Arc)
```svg
<svg width="32" height="24" viewBox="0 0 40 30" fill="none">
  <path d="M4 8 Q20 28 36 8" stroke="currentColor" stroke-width="6" stroke-linecap="round" fill="transparent"/>
</svg>
```
Color: accent (#A30B37) on white bg, white on dark bg.
