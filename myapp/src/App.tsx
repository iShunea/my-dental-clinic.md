import { useState, useEffect, useCallback } from 'react'
import { Icon } from '@iconify/react'

// ─── DATA ────────────────────────────────────────────────────────────────────

const SERVICES = [
  {
    icon: 'stethoscope',
    title: 'Stomatologie generală',
    desc: 'Consultații, obturații, tratamente de rutină',
    details: 'Oferim consultații complete, detartraj, obturații estetice și tratamente de rutină pentru menținerea sănătății orale. Folosim materiale de calitate superioară și tehnici moderne pentru rezultate durabile. Prețuri transparente, fără costuri ascunse.',
    duration: '30–60 min',
    price: 'de la 200 MDL',
  },
  {
    icon: 'microscope',
    title: 'Endodonție',
    desc: 'Tratamente de canal cu tehnologie modernă',
    details: 'Tratamentele de canal sunt realizate cu apex-locatoare digitale și fișiere rotative Dentsply pentru precizie maximă. Eliminăm infecțiile radiculare și salvăm dinții în locul extracției. Sedare disponibilă pentru pacienți anxioși.',
    duration: '60–120 min',
    price: 'de la 800 MDL',
  },
  {
    icon: 'smile',
    title: 'Ortodonție',
    desc: 'Aparate dentare metalice și estetice',
    details: 'Corectăm malocluziile cu aparate metalice clasice, aparate estetice ceramice sau transparent (alinieri). Tratament personalizat pentru copii și adulți. Consultație inițială gratuită cu scanare 3D a arcadei dentare.',
    duration: '12–24 luni',
    price: 'de la 15.000 MDL',
  },
  {
    icon: 'scissors',
    title: 'Chirurgie orală',
    desc: 'Extracții, implanturi, intervenții complexe',
    details: 'Chirurgie orală cu echipamente moderne: extracții simple și complicate, implanturi dentare titanium, rezecții apicale. Chirurgi cu experiență de 15+ ani. Posibilitate de intervenție sub anestezie generală.',
    duration: '30–180 min',
    price: 'de la 500 MDL',
  },
  {
    icon: 'activity',
    title: 'Parodontologie',
    desc: 'Tratamentul bolilor gingivale',
    details: 'Diagnosticăm și tratăm gingivita și parodontita cu tehnici non-chirurgicale și chirurgicale. Curățare subgingivală cu ultrasonografie EMS, aplicare antibiotice locale. Program de mentenanță periodontală personalizat.',
    duration: '45–90 min',
    price: 'de la 400 MDL',
  },
  {
    icon: 'baby',
    title: 'Pedodonție',
    desc: 'Stomatologie pentru copii și adolescenți',
    details: 'Cabinet dedicat copiilor cu atmosferă prietenoasă și medici specializați în stomatologie pediatrică. Tratamente preventive, sigilări, obturații și ortodonție pentru copii 3–18 ani. Prima vizită transformată într-o experiență pozitivă.',
    duration: '30–45 min',
    price: 'de la 150 MDL',
  },
  {
    icon: 'sparkles',
    title: 'Estetică dentară',
    desc: 'Albire, fațete, remodelări estetice',
    details: 'Servicii de estetică dentară completă: albire profesională în cabinet (Philips Zoom), fațete ceramice sau compozite, bonding dentar, remodelări estetice cu rășini compozite. Consultație estetică cu simulare digitală a rezultatelor.',
    duration: '60–180 min',
    price: 'de la 1.200 MDL',
  },
  {
    icon: 'syringe',
    title: 'Anestezie generală',
    desc: 'Tratamente fără anxietate sau durere',
    details: 'Sală operatorie dotată complet și medici ATI pentru pacienți cu fobie dentară sau pentru intervenții complexe simultane. Monitorizare continuă a parametrilor vitali. Posibilitate de realizare a mai multor tratamente într-o singură ședință.',
    duration: '90–240 min',
    price: 'consultație obligatorie',
  },
  {
    icon: 'flower-2',
    title: 'Estetică facială',
    desc: '3 cabinete dedicate — botox, filere, tratamente',
    details: '3 cabinete de estetică facială cu medici dermatologi și chirurgi plasticieni: injecții botox, filere cu acid hialuronic, mezoterapie, tratamente anti-aging, skinbooster. Consultație personalizată și plan de tratament adaptat fiecărui pacient.',
    duration: '30–90 min',
    price: 'de la 2.000 MDL',
  },
]

const DOCTORS = [
  { name: 'Dr. Ana Rusu', specialty: 'Stomatologie generală & Estetică', exp: '12 ani experiență', initials: 'AR' },
  { name: 'Dr. Ion Popescu', specialty: 'Chirurgie orală & Implanturi', exp: '18 ani experiență', initials: 'IP' },
  { name: 'Dr. Maria Ciobanu', specialty: 'Ortodonție', exp: '10 ani experiență', initials: 'MC' },
  { name: 'Dr. Vasile Grigore', specialty: 'Endodonție', exp: '15 ani experiență', initials: 'VG' },
  { name: 'Dr. Elena Botnaru', specialty: 'Pedodonție', exp: '8 ani experiență', initials: 'EB' },
  { name: 'Dr. Andrei Lungu', specialty: 'Parodontologie', exp: '11 ani experiență', initials: 'AL' },
]

// ─── SCROLL TO TOP ────────────────────────────────────────────────────────────

function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollUp = useCallback(() => window.scrollTo({ top: 0, behavior: 'smooth' }), [])

  if (!visible) return null
  return (
    <button
      onClick={scrollUp}
      className="fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full bg-accent text-white shadow-hover flex items-center justify-center hover:bg-[#8A092E] hover:scale-110 transition-all duration-300"
      aria-label="Înapoi sus"
    >
      <Icon icon="lucide:chevron-up" className="text-xl" />
    </button>
  )
}

// ─── CUSTOM SELECT ───────────────────────────────────────────────────────────

function CustomSelect({ value, onChange, options, placeholder }: {
  value: string
  onChange: (v: string) => void
  options: string[]
  placeholder: string
}) {
  const [open, setOpen] = useState(false)
  const ref = { current: null as HTMLDivElement | null }

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div className="relative" ref={(el) => { ref.current = el }}>
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className={`w-full bg-white border text-[14px] px-4 py-3 rounded-[8px] flex items-center justify-between transition-colors ${open ? 'border-accent ring-1 ring-accent' : 'border-neutral/60'}`}
      >
        <span className={value ? 'text-primary-dark' : 'text-primary-dark/40'}>{value || placeholder}</span>
        <Icon icon={open ? 'lucide:chevron-up' : 'lucide:chevron-down'} className="text-primary-dark/40 text-sm ml-2 flex-shrink-0" />
      </button>
      {open && (
        <div className="absolute z-50 top-full left-0 right-0 mt-1 bg-white border border-surface rounded-[10px] shadow-hover overflow-hidden">
          {options.map(opt => (
            <button
              key={opt}
              type="button"
              onClick={() => { onChange(opt); setOpen(false) }}
              className={`w-full text-left px-4 py-2.5 text-[14px] transition-colors hover:bg-bg-light hover:text-accent ${value === opt ? 'text-accent font-medium bg-bg-light/60' : 'text-primary-dark'}`}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

// ─── SERVICE MODAL ────────────────────────────────────────────────────────────

function ServiceModal({ service, onClose }: { service: typeof SERVICES[0]; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-primary-dark/60 backdrop-blur-sm" />
      <div
        className="relative bg-white rounded-[20px] shadow-hover max-w-[520px] w-full p-8 animate-fade-in"
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-surface flex items-center justify-center text-primary-dark hover:bg-accent hover:text-white transition-colors">
          <Icon icon="lucide:x" className="text-sm" />
        </button>
        <div className="w-12 h-12 rounded-full bg-bg-light text-accent flex items-center justify-center mb-5">
          <Icon icon={`lucide:${service.icon}`} className="text-2xl" />
        </div>
        <div className="text-accent text-[12px] font-bold uppercase tracking-[1px] mb-2">Detalii serviciu</div>
        <h3 className="font-heading font-bold text-[22px] text-primary-dark mb-4">{service.title}</h3>
        <p className="text-[15px] text-primary-dark/70 leading-relaxed mb-6">{service.details}</p>
        <div className="flex gap-4 mb-6">
          <div className="flex-1 bg-surface rounded-[12px] p-4">
            <div className="text-[11px] text-primary-dark/50 uppercase tracking-wide font-bold mb-1">Durată</div>
            <div className="text-[14px] font-medium text-primary-dark flex items-center gap-1.5">
              <Icon icon="lucide:clock" className="text-accent text-sm" /> {service.duration}
            </div>
          </div>
          <div className="flex-1 bg-surface rounded-[12px] p-4">
            <div className="text-[11px] text-primary-dark/50 uppercase tracking-wide font-bold mb-1">Preț</div>
            <div className="text-[14px] font-medium text-primary-dark flex items-center gap-1.5">
              <Icon icon="lucide:tag" className="text-accent text-sm" /> {service.price}
            </div>
          </div>
        </div>
        <a
          href="#programare-form"
          onClick={onClose}
          className="w-full inline-flex justify-center items-center bg-accent text-white font-heading font-medium text-[15px] py-3.5 rounded-[50px] hover:bg-[#8A092E] transition-colors"
        >
          Programează-te <Icon icon="lucide:arrow-right" className="ml-2" />
        </a>
      </div>
    </div>
  )
}

// ─── NAVBAR ───────────────────────────────────────────────────────────────────

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-subtle transition-all duration-300 h-20">
      <div className="max-w-[1440px] mx-auto px-6 h-full flex items-center justify-between">
        <a href="#" className="flex items-center gap-3 group">
          <svg width="32" height="24" viewBox="0 0 40 30" fill="none" className="text-accent group-hover:scale-105 transition-transform">
            <path d="M4 8 Q20 28 36 8" stroke="currentColor" strokeWidth="6" strokeLinecap="round" fill="transparent" />
          </svg>
          <span className="font-heading font-bold text-xl tracking-tight text-primary-dark lowercase mt-1">my dental clinic</span>
        </a>
        <div className="hidden md:flex items-center gap-8">
          <a href="#servicii" className="text-[14px] font-medium text-primary-dark hover:text-accent transition-colors">Servicii</a>
          <a href="#despre" className="text-[14px] font-medium text-primary-dark hover:text-accent transition-colors">Despre noi</a>
          <a href="#echipa" className="text-[14px] font-medium text-primary-dark hover:text-accent transition-colors">Echipa</a>
          <a href="#contact" className="text-[14px] font-medium text-primary-dark hover:text-accent transition-colors">Contact</a>
        </div>
        <div className="flex items-center gap-4">
          <a href="#programare-form" className="hidden sm:inline-block bg-accent text-white font-medium text-[14px] px-6 py-2.5 rounded-[8px] hover:bg-[#8A092E] transition-colors shadow-sm">Programare online</a>
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-primary-dark p-2" aria-label="Menu">
            <Icon icon={`lucide:${isOpen ? 'x' : 'menu'}`} className="text-2xl" />
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-white border-t border-surface px-6 py-4 flex flex-col gap-4 animate-fade-in">
          <a href="#servicii" onClick={() => setIsOpen(false)} className="text-[15px] font-medium text-primary-dark">Servicii</a>
          <a href="#despre" onClick={() => setIsOpen(false)} className="text-[15px] font-medium text-primary-dark">Despre noi</a>
          <a href="#contact" onClick={() => setIsOpen(false)} className="text-[15px] font-medium text-primary-dark">Contact</a>
          <a href="#programare-form" onClick={() => setIsOpen(false)} className="bg-accent text-white font-medium text-[14px] px-6 py-2.5 rounded-[8px] text-center">Programare online</a>
        </div>
      )}
    </nav>
  )
}

// ─── HERO ─────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <header className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden bg-gradient-to-r from-white to-bg-light/80">
      <div className="absolute bottom-0 right-0 w-[120px] h-[120px] bg-bg-light/60 rounded-tl-full z-0"></div>
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
          <div className="w-full md:w-[55%] flex flex-col items-start">
            <div className="inline-flex items-center gap-2 bg-bg-light text-primary-dark px-4 py-1.5 rounded-full text-[12px] font-medium mb-6 animate-fade-in-up">
              <Icon icon="lucide:award" className="text-accent" />
              Cea mai mare clinică stomatologică din Moldova
            </div>
            <h1 className="font-heading font-bold text-4xl md:text-[56px] leading-[1.1] text-primary-dark max-w-[520px] mb-6 tracking-tight animate-fade-in-up delay-100">
              Zâmbetul tău,<br />grija noastră
            </h1>
            <p className="text-[16px] md:text-[18px] text-primary-dark/70 max-w-[480px] mb-10 leading-relaxed animate-fade-in-up delay-200">
              Cea mai mare clinică stomatologică din Republica Moldova — 22 scaune · 160+ pacienți zilnic · Planmeca & Dentsply · Estetică facială
            </p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 animate-fade-in-up delay-300">
              <a href="#programare-form" className="inline-flex justify-center items-center bg-accent text-white font-heading font-medium text-[16px] px-10 py-4 rounded-[50px] hover:scale-105 hover:shadow-lg transition-all duration-300">
                Programează-te acum <Icon icon="lucide:arrow-right" className="ml-2" />
              </a>
              <a href="tel:076588884" className="text-accent font-medium text-[16px] hover:underline underline-offset-4 transition-all flex items-center gap-2">
                <Icon icon="lucide:phone" /> sau sună: 076 588 884
              </a>
            </div>
            <div className="mt-12 flex flex-wrap items-center gap-4 text-[13px] md:text-[14px] text-primary-dark/60 font-medium animate-fade-in-up delay-400">
              <span className="flex items-center gap-1"><span className="text-accent">★</span> 4.9/5 Google Reviews</span>
              <span className="hidden sm:inline text-neutral">|</span>
              <span className="flex items-center gap-1"><Icon icon="lucide:check-circle" className="text-accent" /> 100% Digitalizat</span>
              <span className="hidden sm:inline text-neutral">|</span>
              <span className="flex items-center gap-1"><Icon icon="lucide:heart" className="text-accent" /> 10.000+ Pacienți</span>
            </div>
          </div>
          <div className="w-full md:w-[45%] animate-fade-in delay-300">
            <div className="relative w-full aspect-[4/5] max-w-[520px] mx-auto md:mr-0 md:h-[580px] rounded-[24px] overflow-hidden bg-gradient-to-br from-surface to-bg-light shadow-2xl">
              <div className="absolute inset-0 flex flex-col items-center justify-center text-primary-dark/30">
                <Icon icon="lucide:camera" className="text-5xl mb-4" />
                <span className="font-heading font-medium">Imagine Clinică / Pacient</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/60 via-transparent to-transparent opacity-80"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-white/90 text-sm font-medium drop-shadow-md flex items-center gap-2">
                  <Icon icon="lucide:sparkles" className="text-bg-light" /> Tehnologie de top & Confort garantat
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

// ─── STATS ────────────────────────────────────────────────────────────────────

function StatsBar() {
  const stats = [
    { value: '22', label: 'scaune stomatologice' },
    { value: '160+', label: 'pacienți zilnic' },
    { value: '3', label: 'cabinete estetică facială' },
    { value: '100%', label: 'digitalizat' },
    { value: '10+', label: 'specialități medicale' },
  ]
  return (
    <section className="bg-primary-dark w-full">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 py-10 md:py-12">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-8 md:gap-0">
          {stats.map((s, i) => (
            <div key={i} className={`flex flex-col items-center text-center ${i < 4 ? 'lg:border-r border-white/20' : ''}`}>
              <svg width="20" height="12" viewBox="0 0 40 30" fill="none" className="text-accent mb-2">
                <path d="M4 8 Q20 28 36 8" stroke="currentColor" strokeWidth="6" strokeLinecap="round" fill="transparent" />
              </svg>
              <div className="font-heading font-bold text-4xl md:text-[48px] text-white leading-none mb-1 tracking-tight">{s.value}</div>
              <div className="text-[13px] md:text-[14px] text-white/60 font-medium uppercase tracking-wide">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── SERVICES ─────────────────────────────────────────────────────────────────

function Services() {
  const [activeModal, setActiveModal] = useState<typeof SERVICES[0] | null>(null)
  return (
    <>
      {activeModal && <ServiceModal service={activeModal} onClose={() => setActiveModal(null)} />}
      <section id="servicii" className="bg-surface py-20 md:py-24">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
          <div className="max-w-[600px] mx-auto text-center mb-16">
            <div className="text-accent text-[13px] font-bold uppercase tracking-[2px] mb-3">Ce oferim</div>
            <h2 className="font-heading font-bold text-3xl md:text-[40px] text-primary-dark leading-tight mb-5">Servicii complete sub același acoperiș</h2>
            <p className="text-[16px] text-primary-dark/65">De la profilaxie la intervenții complexe — totul într-un singur loc</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {SERVICES.map((it, i) => (
              <div key={it.title} className="group bg-white rounded-[16px] p-7 shadow-subtle hover:shadow-hover hover:-translate-y-1 transition-all duration-300 border-t-[3px] border-transparent hover:border-accent flex flex-col items-start cursor-pointer">
                <div className="w-10 h-10 rounded-full bg-bg-light text-accent flex items-center justify-center mb-5">
                  <Icon icon={`lucide:${it.icon}`} className="text-xl" />
                </div>
                <h3 className="font-heading font-medium text-[17px] text-primary-dark mb-2">{it.title}</h3>
                <p className="text-[14px] text-primary-dark/60 mb-4 flex-grow">{it.desc}</p>
                <button
                  onClick={() => setActiveModal(it)}
                  className="text-accent font-medium text-[14px] flex items-center gap-1 group-hover:underline underline-offset-4"
                >
                  Află mai mult <Icon icon="lucide:arrow-right" className="text-xs" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

// ─── WHY US ───────────────────────────────────────────────────────────────────

function WhyUs() {
  const benefits = [
    { title: 'Planmeca · Dentsply · EMS Airflow', desc: 'Echipamente stomatologice premium pentru precizie maximă, igienizare profesională și confort garantat.' },
    { title: 'Sistem 100% digitalizat', desc: 'Programări online, dosare pacienți digitale și planuri de tratament în format complet electronic.' },
    { title: 'Prețuri oneste și transparente', desc: 'Planuri de tratament clare de la bun început, fără surprize sau costuri ascunse.' },
    { title: 'Anestezie generală + recuperare post-op', desc: 'Zone dedicate pentru anestezie generală și recuperare post-operatorie, cu medici ATI specializați.' },
    { title: 'Echipă empatică și dedicată', desc: 'Fiecare pacient este ascultat și îngrijit ca o persoană, nu doar ca un dosar medical.' },
  ]
  return (
    <section id="despre" className="bg-white py-20 md:py-24">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          <div className="w-full lg:w-[45%] relative">
            <div className="w-full aspect-[4/5] md:h-[600px] rounded-[20px] overflow-hidden bg-gradient-to-br from-surface to-neutral/30 shadow-lg relative">
              <div className="absolute inset-0 flex flex-col items-center justify-center text-primary-dark/40">
                <Icon icon="lucide:image" className="text-6xl mb-4" />
                <span className="font-heading font-medium text-lg">Imagine Interior Clinică</span>
              </div>
            </div>
            <div className="absolute -bottom-5 -left-2 md:-left-6 bg-primary-dark text-white text-[13px] md:text-[14px] font-medium px-5 py-3 rounded-full shadow-lg border-4 border-white flex items-center gap-2">
              Cea mai mare clinică din Moldova <span className="text-lg leading-none">🏆</span>
            </div>
          </div>
          <div className="w-full lg:w-[55%] flex flex-col items-start mt-8 lg:mt-0">
            <div className="text-accent text-[12px] font-bold uppercase tracking-[1px] mb-3">De ce noi</div>
            <h2 className="font-heading font-bold text-3xl md:text-[36px] text-primary-dark leading-[1.2] mb-5">Îngrijire completă, tehnologie avansată, oameni adevărați</h2>
            <p className="text-[15px] text-primary-dark/65 mb-10">Atingem excelența clinică cu o grijă personală autentică în fiecare etapă a tratamentului tău.</p>
            <div className="flex flex-col gap-6 w-full">
              {benefits.map((b, i) => (
                <div key={b.title} className={`flex items-start gap-4 pb-6 ${i < 4 ? 'border-b border-neutral/40' : 'pb-2'}`}>
                  <div className="w-6 h-6 rounded-full bg-accent text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon icon="lucide:check" className="text-sm" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[16px] text-primary-dark mb-1">{b.title}</h4>
                    <p className="text-[14px] text-primary-dark/60">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-10 flex flex-col items-start gap-4">
              <a href="#programare-form" className="inline-flex justify-center items-center bg-accent text-white font-medium text-[14px] px-8 py-3.5 rounded-[50px] hover:bg-[#8A092E] transition-colors shadow-sm">
                Programează consultația
              </a>
              <p className="text-primary-dark/70 text-[14px]">sau sună acum: <a href="tel:076588884" className="text-accent font-medium hover:underline">076 588 884</a></p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── DOCTORS CAROUSEL ─────────────────────────────────────────────────────────

function Doctors() {
  const [idx, setIdx] = useState(0)
  const visible = 3
  const max = DOCTORS.length - visible

  const prev = () => setIdx(i => Math.max(0, i - 1))
  const next = () => setIdx(i => Math.min(max, i + 1))

  return (
    <section id="echipa" className="bg-surface py-20 md:py-24">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="max-w-[600px] mx-auto text-center mb-16">
          <div className="text-accent text-[13px] font-bold uppercase tracking-[2px] mb-3">Echipa noastră</div>
          <h2 className="font-heading font-bold text-3xl md:text-[40px] text-primary-dark leading-tight mb-5">Medici cu experiență și dedicație</h2>
          <p className="text-[16px] text-primary-dark/65">Profesioniști certificați, permanent la curent cu tehnicile stomatologice moderne</p>
        </div>

        <div className="relative">
          {/* Desktop: sliding carousel */}
          <div className="hidden md:block overflow-hidden">
            <div
              className="flex gap-6 transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(calc(-${idx} * (100% / ${visible} + 8px)))` }}
            >
              {DOCTORS.map((doc) => (
                <div key={doc.name} className="flex-shrink-0 w-[calc(33.333%-16px)] bg-white rounded-[16px] p-7 shadow-subtle hover:shadow-hover transition-all duration-300 flex flex-col items-center text-center">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-bg-light to-surface flex items-center justify-center text-primary-dark font-heading font-bold text-xl mb-4 border-2 border-white shadow-md">
                    {doc.initials}
                  </div>
                  <h3 className="font-heading font-bold text-[16px] text-primary-dark mb-1">{doc.name}</h3>
                  <p className="text-[13px] text-accent font-medium mb-2">{doc.specialty}</p>
                  <p className="text-[12px] text-primary-dark/50 flex items-center gap-1">
                    <Icon icon="lucide:briefcase" className="text-xs" /> {doc.exp}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile: stack */}
          <div className="md:hidden grid grid-cols-1 gap-4">
            {DOCTORS.map((doc) => (
              <div key={doc.name} className="bg-white rounded-[16px] p-6 shadow-subtle flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-bg-light to-surface flex items-center justify-center text-primary-dark font-heading font-bold flex-shrink-0">
                  {doc.initials}
                </div>
                <div>
                  <h3 className="font-heading font-bold text-[15px] text-primary-dark">{doc.name}</h3>
                  <p className="text-[13px] text-accent font-medium">{doc.specialty}</p>
                  <p className="text-[12px] text-primary-dark/50">{doc.exp}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Arrows */}
          <div className="hidden md:flex items-center justify-center gap-3 mt-8">
            <button
              onClick={prev}
              disabled={idx === 0}
              className="w-10 h-10 rounded-full border-2 border-primary-dark/20 flex items-center justify-center text-primary-dark hover:border-accent hover:text-accent transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <Icon icon="lucide:chevron-left" />
            </button>
            <div className="flex gap-2">
              {Array.from({ length: max + 1 }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIdx(i)}
                  className={`w-2 h-2 rounded-full transition-all ${i === idx ? 'bg-accent w-5' : 'bg-primary-dark/20'}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              disabled={idx === max}
              className="w-10 h-10 rounded-full border-2 border-primary-dark/20 flex items-center justify-center text-primary-dark hover:border-accent hover:text-accent transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <Icon icon="lucide:chevron-right" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── TESTIMONIALS ─────────────────────────────────────────────────────────────

function Testimonials() {
  const items = [
    { name: 'Maria C., 34 ani', text: 'Am venit cu multă teamă la prima vizită, dar echipa My Dental Clinic m-a făcut să mă simt în siguranță. Acum vin cu plăcere!' },
    { name: 'Alexandru T., 42 ani', text: 'Cel mai profesionist cabinet din Chișinău. Tehnologie impresionantă și medici cu adevărat empatici. Recomand cu încredere.' },
    { name: 'Natalia P., mamă', text: 'Pentru copilul meu a fost o experiență minunată. A ieșit cu diploma de merit și un zâmbet de la ureche la ureche!' },
  ]
  return (
    <section className="bg-gradient-to-b from-bg-light/60 to-white py-20 md:py-24 relative overflow-hidden">
      <div className="absolute top-10 right-0 w-[200px] h-[200px] bg-bg-light/40 rounded-l-full -mr-10 z-0 hidden lg:block"></div>
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 relative z-10">
        <div className="max-w-[600px] mx-auto text-center mb-16">
          <div className="text-accent text-[13px] font-bold uppercase tracking-[1px] mb-3">Ce spun pacienții noștri</div>
          <h2 className="font-heading font-bold text-3xl md:text-[38px] text-primary-dark leading-tight mb-4">Povești reale, zâmbete reale</h2>
          <div className="flex items-center justify-center gap-2 text-[15px] text-primary-dark font-medium">
            <div className="flex text-accent">
              {[1,2,3,4,5].map(s => <Icon key={s} icon="lucide:star" className="fill-current" />)}
            </div>
            <span>4.9 din 5 — bazat pe 500+ recenzii Google</span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((t, i) => (
            <div key={i} className="bg-white rounded-[16px] p-8 shadow-subtle hover:shadow-hover hover:-translate-y-1 transition-all duration-300 relative overflow-hidden z-10">
              <div className="absolute -top-4 -left-2 text-[80px] font-heading font-bold text-bg-light opacity-40 leading-none z-0 select-none">"</div>
              <div className="relative z-10">
                <p className="italic text-[15px] text-primary-dark/80 mb-5 leading-relaxed min-h-[80px]">"{t.text}"</p>
                <div className="flex text-accent text-sm mb-4">★ ★ ★ ★ ★</div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-surface flex items-center justify-center text-neutral overflow-hidden">
                    <Icon icon="lucide:user" className="text-xl" />
                  </div>
                  <div>
                    <h4 className="font-heading font-medium text-[15px] text-primary-dark">{t.name}</h4>
                    <span className="text-[12px] text-primary-dark/50 flex items-center gap-1 mt-0.5">Pacient verificat <Icon icon="lucide:check" className="text-[10px]" /></span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── CTA BANNER ───────────────────────────────────────────────────────────────

function CtaBanner() {
  return (
    <section className="bg-primary-dark py-16 md:py-20">
      <div className="max-w-[700px] mx-auto px-6 text-center relative z-10">
        <h2 className="font-heading font-bold text-3xl md:text-[40px] text-white mb-4 leading-tight">Începe cu un zâmbet sănătos</h2>
        <p className="text-[16px] text-white/70 mb-10">Programează consultația ta gratuită astăzi și descoperă diferența.</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5">
          <a href="#programare-form" className="w-full sm:w-auto text-center bg-accent text-white font-heading font-medium text-[16px] px-10 py-4 rounded-[50px] hover:scale-105 hover:shadow-lg transition-transform duration-300">Programează acum</a>
          <a href="tel:076588884" className="w-full sm:w-auto text-center border-2 border-white text-white font-medium text-[16px] px-10 py-3.5 rounded-[50px] hover:bg-white hover:text-primary-dark transition-colors duration-300">Sună: 076 588 884</a>
        </div>
      </div>
    </section>
  )
}

// ─── CONTACT ──────────────────────────────────────────────────────────────────

function Contact() {
  const [selectedService, setSelectedService] = useState('')
  return (
    <section id="contact" className="bg-white py-20 md:py-24">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          <div className="flex-1 flex flex-col">
            <div className="flex items-center gap-3 mb-8">
              <svg width="32" height="24" viewBox="0 0 40 30" fill="none" className="text-accent">
                <path d="M4 8 Q20 28 36 8" stroke="currentColor" strokeWidth="6" strokeLinecap="round" fill="transparent" />
              </svg>
              <span className="font-heading font-bold text-xl tracking-tight text-primary-dark lowercase mt-1 leading-none">my dental<br />clinic</span>
            </div>
            <ul className="space-y-4 text-[14px] text-primary-dark mb-8">
              <li className="flex items-start gap-3"><Icon icon="lucide:map-pin" className="text-accent mt-1 text-lg flex-shrink-0" /><span>str. Constantin Brâncuși 112,<br />MD-2060, Chișinău</span></li>
              <li className="flex items-center gap-3"><Icon icon="lucide:phone" className="text-accent text-lg flex-shrink-0" /><a href="tel:076588884" className="hover:text-accent font-medium transition-colors">076 588 884</a></li>
              <li className="flex items-center gap-3"><Icon icon="lucide:mail" className="text-accent text-lg flex-shrink-0" /><a href="mailto:contact@mydentalclinic.md" className="hover:text-accent font-medium transition-colors">contact@mydentalclinic.md</a></li>
              <li className="flex items-center gap-3"><Icon icon="lucide:globe" className="text-accent text-lg flex-shrink-0" /><a href="https://www.mydentalclinic.md" target="_blank" rel="noopener noreferrer" className="hover:text-accent font-medium transition-colors">www.mydentalclinic.md</a></li>
            </ul>
            <div className="border-t border-surface pt-6 mb-6">
              <div className="text-[11px] text-primary-dark/50 uppercase tracking-wide font-bold mb-3">Persoane de contact</div>
              <div className="space-y-3">
                <div className="flex flex-col gap-0.5">
                  <span className="text-[14px] font-medium text-primary-dark">Borozan Tatiana</span>
                  <span className="text-[12px] text-primary-dark/50">Director Executiv</span>
                  <a href="tel:+37379298888" className="text-[13px] text-accent hover:underline">+373 792 98 888</a>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[14px] font-medium text-primary-dark">Țurcan Viorica</span>
                  <span className="text-[12px] text-primary-dark/50">Director Comercial</span>
                  <a href="tel:+37369189939" className="text-[13px] text-accent hover:underline">+373 691 89 939</a>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 rounded-full bg-bg-light flex items-center justify-center text-primary-dark hover:bg-primary-dark hover:text-white transition-colors"><Icon icon="lucide:instagram" className="text-lg" /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-bg-light flex items-center justify-center text-primary-dark hover:bg-primary-dark hover:text-white transition-colors"><Icon icon="lucide:facebook" className="text-lg" /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-bg-light flex items-center justify-center text-primary-dark hover:bg-primary-dark hover:text-white transition-colors"><Icon icon="mdi:tiktok" className="text-lg" /></a>
            </div>
          </div>
          <div className="flex-1">
            <div className="bg-primary-dark rounded-[16px] p-8 h-full flex flex-col justify-center">
              <svg width="24" height="18" viewBox="0 0 40 30" fill="none" className="text-white mb-6">
                <path d="M4 8 Q20 28 36 8" stroke="currentColor" strokeWidth="6" strokeLinecap="round" fill="transparent" />
              </svg>
              <h3 className="font-heading font-bold text-[14px] text-white tracking-[1px] uppercase mb-6">Program de lucru</h3>
              <ul className="text-[14px] text-white space-y-3 leading-[1.8]">
                <li className="flex justify-between border-b border-white/10 pb-2"><span className="opacity-80">Luni - Vineri:</span> <span className="font-medium">09:00 - 19:00</span></li>
                <li className="flex justify-between border-b border-white/10 pb-2"><span className="opacity-80">Sâmbătă:</span> <span className="font-medium">09:00 - 14:00</span></li>
                <li className="flex justify-between pt-1"><span className="opacity-80">Duminică:</span> <span className="font-medium text-accent bg-white/10 px-2 rounded text-xs py-1">Zi liberă</span></li>
              </ul>
            </div>
          </div>
          <div className="flex-1" id="programare-form">
            <div className="bg-white rounded-[16px] p-8 shadow-subtle border border-surface">
              <h3 className="font-heading font-medium text-[18px] text-primary-dark mb-6">Trimite un mesaj</h3>
              <form className="flex flex-col gap-4">
                <input type="text" placeholder="Nume complet" className="w-full bg-white border border-neutral/60 text-primary-dark text-[14px] px-4 py-3 rounded-[8px] focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent" />
                <input type="tel" placeholder="Telefon" className="w-full bg-white border border-neutral/60 text-primary-dark text-[14px] px-4 py-3 rounded-[8px] focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent" />
                <CustomSelect
                  value={selectedService}
                  onChange={setSelectedService}
                  options={SERVICES.map(s => s.title)}
                  placeholder="Selectează serviciu"
                />
                <div className="grid grid-cols-2 gap-3">
                  <div className="relative">
                    <input
                      type="date"
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full bg-white border border-neutral/60 text-primary-dark text-[14px] px-4 py-3 rounded-[8px] focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent appearance-none [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                      style={{ colorScheme: 'light' }}
                    />
                    <Icon icon="lucide:calendar" className="absolute right-3 top-1/2 -translate-y-1/2 text-primary-dark/40 text-sm pointer-events-none" />
                  </div>
                  <CustomSelect
                    value={''}
                    onChange={() => {}}
                    options={['09:00','09:30','10:00','10:30','11:00','11:30','12:00','12:30','13:00','13:30','14:00','14:30','15:00','15:30','16:00','16:30','17:00','17:30','18:00','18:30']}
                    placeholder="Ora dorită"
                  />
                </div>
                <textarea placeholder="Mesaj (opțional)" rows={3} className="w-full bg-white border border-neutral/60 text-primary-dark text-[14px] px-4 py-3 rounded-[8px] focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent resize-none" />
                <button type="submit" className="w-full bg-accent text-white font-heading font-medium text-[16px] py-3.5 rounded-[8px] hover:bg-[#8A092E] transition-colors mt-2">Trimite →</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="bg-primary-dark border-t border-white/10">
      <div className="max-w-[1440px] mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-[13px] text-white/50 text-center md:text-left">© 2025 My Dental Clinic · Toate drepturile rezervate</div>
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-[12px] text-white/50">
          <div className="flex gap-6">
            <a href="#" className="hover:text-white hover:underline transition-all">Politica de confidențialitate</a>
            <a href="#" className="hover:text-white hover:underline transition-all">GDPR</a>
          </div>
          <a href="https://business.easyreserv.io" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
            Dezvoltat de <span className="text-white/70 font-medium hover:text-white">EasyReserv.io</span>
          </a>
        </div>
      </div>
    </footer>
  )
}

// ─── APP ──────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <div className="min-h-screen font-sans text-primary-dark bg-white">
      <Navbar />
      <main>
        <Hero />
        <StatsBar />
        <Services />
        <WhyUs />
        <Doctors />
        <Testimonials />
        <CtaBanner />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  )
}
