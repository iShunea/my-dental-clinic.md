# Extractable Components — My Dental Clinic

## Layout Components

### Navbar
- Source: `src/components/layout/Navbar.tsx`
- Category: layout
- Description: Fixed top nav with logo, desktop links, mobile hamburger + CTA button
- Extractable props: (none — static landing page, no active state needed)
- Hardcoded: Logo smile SVG, nav link labels, CTA text, all CSS

### Footer
- Source: `src/components/layout/Footer.tsx`
- Category: layout
- Description: Dark footer with copyright and GDPR links
- Extractable props: (none)
- Hardcoded: Copyright text, link labels, all CSS

## Basic Components

### ServiceCard
- Source: `src/components/sections/Services.tsx` (inline card pattern)
- Category: basic
- Description: White card with icon circle, title, description, "Află mai mult" link
- Extractable props: icon (string), title (string), desc (string)
- Hardcoded: Card styling, hover effects, border-radius, colors

### TestimonialCard
- Source: `src/components/sections/Testimonials.tsx` (inline card pattern)
- Category: basic
- Description: White card with quote, stars, avatar placeholder, patient name
- Extractable props: text (string), name (string)
- Hardcoded: Card styling, decorative quote mark, star display, avatar placeholder

### BenefitItem
- Source: `src/components/sections/WhyUs.tsx` (inline list item)
- Category: basic
- Description: Flex row with accent circle checkmark, title and description text
- Extractable props: title (string), desc (string), showBorder (boolean)
- Hardcoded: Icon, circle styling, colors
