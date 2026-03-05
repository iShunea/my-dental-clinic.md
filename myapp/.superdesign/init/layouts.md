# Layouts — My Dental Clinic

## Navbar
**File**: `src/components/layout/Navbar.tsx`
Fixed top navigation. White/95 bg with backdrop blur. Logo left, nav links center, CTA button right. Mobile hamburger menu.

```tsx
import { useState } from 'react'
import { Icon } from '@iconify/react'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm transition-all duration-300"
      style={{ boxShadow: '0 4px 24px rgba(14, 35, 56, 0.08)' }}>
      <div className="max-w-[1440px] mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <svg width="32" height="24" viewBox="0 0 40 30" fill="none" xmlns="http://www.w3.org/2000/svg"
            className="text-[#A30B37] group-hover:scale-105 transition-transform">
            <path d="M4 8 Q20 28 36 8" stroke="currentColor" strokeWidth="6" strokeLinecap="round" fill="transparent"/>
          </svg>
          <span className="font-heading font-bold text-xl tracking-tight text-[#0E2338] lowercase mt-1">my dental clinic</span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#servicii" className="text-[14px] font-medium text-[#0E2338] hover:text-[#A30B37] transition-colors">Servicii</a>
          <a href="#despre" className="text-[14px] font-medium text-[#0E2338] hover:text-[#A30B37] transition-colors">Despre noi</a>
          <a href="#echipa" className="text-[14px] font-medium text-[#0E2338] hover:text-[#A30B37] transition-colors">Echipa</a>
          <a href="#contact" className="text-[14px] font-medium text-[#0E2338] hover:text-[#A30B37] transition-colors">Contact</a>
        </div>

        {/* Right CTA */}
        <div className="flex items-center gap-4">
          <a href="#programare"
            className="hidden sm:inline-block bg-[#A30B37] text-white font-medium text-[14px] px-6 py-2.5 rounded-[8px] hover:bg-[#8A092E] transition-colors shadow-sm">
            Programare online
          </a>
          <button className="md:hidden text-[#0E2338] p-2" aria-label="Menu" onClick={() => setMenuOpen(v => !v)}>
            <Icon icon={menuOpen ? 'lucide:x' : 'lucide:menu'} className="text-2xl" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-[#E6E5EC] px-6 py-4 flex flex-col gap-4">
          <a href="#servicii" onClick={() => setMenuOpen(false)} className="text-[15px] font-medium text-[#0E2338] hover:text-[#A30B37] transition-colors">Servicii</a>
          <a href="#despre" onClick={() => setMenuOpen(false)} className="text-[15px] font-medium text-[#0E2338] hover:text-[#A30B37] transition-colors">Despre noi</a>
          <a href="#echipa" onClick={() => setMenuOpen(false)} className="text-[15px] font-medium text-[#0E2338] hover:text-[#A30B37] transition-colors">Echipa</a>
          <a href="#contact" onClick={() => setMenuOpen(false)} className="text-[15px] font-medium text-[#0E2338] hover:text-[#A30B37] transition-colors">Contact</a>
          <a href="#programare" onClick={() => setMenuOpen(false)}
            className="bg-[#A30B37] text-white font-medium text-[14px] px-6 py-2.5 rounded-[8px] text-center hover:bg-[#8A092E] transition-colors">
            Programare online
          </a>
        </div>
      )}
    </nav>
  )
}
```

## Footer
**File**: `src/components/layout/Footer.tsx`
Dark background footer. Copyright left, GDPR links right.

```tsx
export default function Footer() {
  return (
    <footer className="bg-[#0E2338] border-t border-white/10">
      <div className="max-w-[1440px] mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-[13px] text-white/50 text-center md:text-left">
          &copy; 2025 My Dental Clinic &middot; Toate drepturile rezervate
        </div>
        <div className="flex gap-6 text-[12px] text-white/50">
          <a href="#" className="hover:text-white hover:underline transition-all">Politica de confidențialitate</a>
          <a href="#" className="hover:text-white hover:underline transition-all">GDPR</a>
        </div>
      </div>
    </footer>
  )
}
```

## App Shell
**File**: `src/App.tsx`
Single-page layout: Navbar → main (all sections) → Footer.

```tsx
function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <StatsBar />
        <Services />
        <WhyUs />
        <Testimonials />
        <CtaBanner />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
```
