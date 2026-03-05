# Pages — My Dental Clinic

## / (Landing Page — only page)
Entry: `src/App.tsx`

Dependencies:
- `src/components/layout/Navbar.tsx`
- `src/components/layout/Footer.tsx`
- `src/components/sections/Hero.tsx`
  - @iconify/react (Icon)
- `src/components/sections/StatsBar.tsx`
- `src/components/sections/Services.tsx`
  - @iconify/react (Icon)
- `src/components/sections/WhyUs.tsx`
  - @iconify/react (Icon)
- `src/components/sections/Testimonials.tsx`
  - @iconify/react (Icon)
- `src/components/sections/CtaBanner.tsx`
- `src/components/sections/Contact.tsx`
  - @iconify/react (Icon)
  - react (useState)

Styling:
- `src/index.css` (Tailwind v4 @theme tokens, animations, custom utilities)
- Google Fonts: Parkinsans + Libre Franklin (loaded in index.html)

## Context files needed for full page design:
```
--context-file .superdesign/design-system.md
--context-file src/index.css
--context-file src/App.tsx
--context-file src/components/layout/Navbar.tsx
--context-file src/components/layout/Footer.tsx
--context-file src/components/sections/Hero.tsx
--context-file src/components/sections/StatsBar.tsx
--context-file src/components/sections/Services.tsx
--context-file src/components/sections/WhyUs.tsx
--context-file src/components/sections/Testimonials.tsx
--context-file src/components/sections/CtaBanner.tsx
--context-file src/components/sections/Contact.tsx
```
