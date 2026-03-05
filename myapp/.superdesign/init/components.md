# Components — My Dental Clinic

No shared UI primitive library (no shadcn, no MUI). All components are page-section components.

## Hero
**File**: `src/components/sections/Hero.tsx`

```tsx
import { Icon } from '@iconify/react'

export default function Hero() {
  return (
    <header className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden"
      style={{ background: 'linear-gradient(to right, #ffffff, rgba(211,227,253,0.8))' }}>
      <div className="absolute bottom-0 right-0 w-[120px] h-[120px] bg-[#D3E3FD]/60 rounded-tl-full z-0" />
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
          <div className="w-full md:w-[55%] flex flex-col items-start">
            <div className="inline-flex items-center gap-2 bg-[#D3E3FD] text-[#0E2338] px-4 py-1.5 rounded-full text-[12px] font-medium mb-6 opacity-0-init animate-fade-in-up">
              <Icon icon="lucide:award" className="text-[#A30B37]" />
              Cea mai mare clinică stomatologică din Moldova
            </div>
            <h1 className="font-heading font-bold text-4xl md:text-[56px] leading-[1.1] text-[#0E2338] max-w-[520px] mb-6 tracking-tight opacity-0-init animate-fade-in-up delay-100">
              Zâmbetul tău,<br />grija noastră
            </h1>
            <p className="text-[16px] md:text-[18px] text-[#0E2338]/70 max-w-[480px] mb-10 leading-relaxed opacity-0-init animate-fade-in-up delay-200">
              22 de scaune stomatologice · 160+ pacienți zilnic · Tehnologie Planmeca & Dentsply · Estetică facială
            </p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 opacity-0-init animate-fade-in-up delay-300">
              <a href="#programare" className="inline-flex justify-center items-center bg-[#A30B37] text-white font-heading font-medium text-[16px] px-10 py-4 rounded-[50px] hover:scale-105 hover:shadow-lg transition-all duration-300">
                Programează-te acum <Icon icon="lucide:arrow-right" className="ml-2" />
              </a>
              <a href="tel:076588884" className="text-[#A30B37] font-medium text-[16px] hover:underline underline-offset-4 flex items-center gap-2">
                <Icon icon="lucide:phone" /> sau sună: 076 588 884
              </a>
            </div>
            <div className="mt-12 flex flex-wrap items-center gap-4 text-[13px] md:text-[14px] text-[#0E2338]/60 font-medium opacity-0-init animate-fade-in-up delay-400">
              <span className="flex items-center gap-1"><span className="text-[#A30B37]">★</span> 4.9/5 Google Reviews</span>
              <span className="hidden sm:inline text-[#CCCCCC]">|</span>
              <span className="flex items-center gap-1"><Icon icon="lucide:check-circle" className="text-[#A30B37]" /> 100% Digitalizat</span>
              <span className="hidden sm:inline text-[#CCCCCC]">|</span>
              <span className="flex items-center gap-1"><Icon icon="lucide:heart" className="text-[#A30B37]" /> 10.000+ Pacienți</span>
            </div>
          </div>
          <div className="w-full md:w-[45%] opacity-0-init animate-fade-in delay-300">
            <div className="relative w-full aspect-[4/5] max-w-[520px] mx-auto md:mr-0 md:h-[580px] rounded-[24px] overflow-hidden bg-gradient-to-br from-[#E6E5EC] to-[#D3E3FD] shadow-2xl">
              <div className="absolute inset-0 flex flex-col items-center justify-center text-[#0E2338]/30">
                <Icon icon="lucide:camera" className="text-5xl mb-4" />
                <span className="font-heading font-medium">Imagine Clinică / Pacient</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0E2338]/60 via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-white/90 text-sm font-medium drop-shadow-md flex items-center gap-2">
                  <Icon icon="lucide:sparkles" className="text-[#D3E3FD]" /> Tehnologie de top & Confort garantat
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
```

## StatsBar
**File**: `src/components/sections/StatsBar.tsx`
Dark bg bar with 5 stats and smile SVG decorators.

```tsx
const stats = [
  { value: '22', label: 'scaune stomatologice', border: true },
  { value: '160+', label: 'pacienți zilnic', border: true },
  { value: '3', label: 'cabinete estetică facială', border: true },
  { value: '100%', label: 'digitalizat', border: true },
  { value: '10+', label: 'specialități medicale', border: false, spanMobile: true },
]

export default function StatsBar() {
  return (
    <section className="bg-[#0E2338] w-full">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 py-10 md:py-12">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-8 md:gap-0">
          {stats.map((stat) => (
            <div key={stat.value} className={`flex flex-col items-center text-center ${stat.border ? 'lg:border-r border-white/20' : ''} ${stat.spanMobile ? 'col-span-2 lg:col-span-1' : ''}`}>
              <svg width="20" height="12" viewBox="0 0 40 30" fill="none" className="text-[#A30B37] mb-2">
                <path d="M4 8 Q20 28 36 8" stroke="currentColor" strokeWidth="6" strokeLinecap="round" fill="transparent"/>
              </svg>
              <div className="font-heading font-bold text-4xl md:text-[48px] text-white leading-none mb-1 tracking-tight">{stat.value}</div>
              <div className="text-[13px] md:text-[14px] text-white/60 font-medium uppercase tracking-wide">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

## Services
**File**: `src/components/sections/Services.tsx`
Surface bg section with 3x3 grid of service cards. Cards have hover border-top accent.

```tsx
const services = [
  { icon: 'lucide:stethoscope', title: 'Stomatologie generală', desc: 'Consultații, obturații, tratamente de rutină' },
  { icon: 'lucide:microscope', title: 'Endodonție', desc: 'Tratamente de canal cu tehnologie modernă' },
  { icon: 'lucide:smile', title: 'Ortodonție', desc: 'Aparate dentare metalice și estetice' },
  { icon: 'lucide:scissors', title: 'Chirurgie orală', desc: 'Extracții, implanturi, intervenții complexe' },
  { icon: 'lucide:activity', title: 'Parodontologie', desc: 'Tratamentul bolilor gingivale' },
  { icon: 'lucide:baby', title: 'Pedodonție', desc: 'Stomatologie pentru copii și adolescenți' },
  { icon: 'lucide:sparkles', title: 'Estetică dentară', desc: 'Albire, fațete, remodelări estetice' },
  { icon: 'lucide:syringe', title: 'Anestezie generală', desc: 'Tratamente fără anxietate sau durere' },
  { icon: 'lucide:flower-2', title: 'Estetică facială', desc: '3 cabinete dedicate — botox, filere, tratamente' },
]
// Card: bg-white rounded-[16px] p-7, border-t-[3px] border-transparent hover:border-[#A30B37]
// Icon container: w-10 h-10 rounded-full bg-[#D3E3FD] text-[#A30B37]
// CTA bottom: border-2 border-[#A30B37] text-[#A30B37] rounded-[8px]
```

## WhyUs
**File**: `src/components/sections/WhyUs.tsx`
White bg. 2-col: image left (45%) + benefits list right (55%). Badge overlay on image.

```tsx
// Left: rounded-[20px] image placeholder with dark "Cea mai mare clinică din Moldova 🏆" badge
// Right: eyebrow "De ce noi" + h2 + 5 benefit items with accent circle checkmark + CTA pill button
// Benefit item: flex gap-4, w-6 h-6 rounded-full bg-[#A30B37] check icon, border-b border-[#CCCCCC]/40
```

## Testimonials
**File**: `src/components/sections/Testimonials.tsx`
Gradient bg (bg-light/60 → white). 3 cards with decorative quote mark, stars, avatar placeholder.

## CtaBanner
**File**: `src/components/sections/CtaBanner.tsx`
Dark bg-primary-dark with bg-smile-pattern. Centered text + 2 CTA buttons side by side.

## Contact
**File**: `src/components/sections/Contact.tsx`
White bg. 3 columns: contact info + social icons | schedule (dark card) | contact form.
