import { useState, useEffect, useCallback, useRef } from 'react'
import { Icon } from '@iconify/react'

// ─── DATA ────────────────────────────────────────────────────────────────────

const OPEN_DAY = {
  date: '19 aprilie 2025',
  dateShort: '19 APR',
  year: '2025',
  time: '09:00 – 18:00',
  address: 'str. Constantin Brâncuși 112, Chișinău',
  phone: '076 588 884',
  spotsLeft: 12,
}

const FREE_BENEFITS = [
  { num: '1', title: 'Radiografie panoramică', desc: 'Vedere completă a arcadelor dentare în format digital, în valoare de 350 MDL', icon: 'scan-line' },
  { num: '2', title: 'Consultație stomatologică', desc: 'Examinare completă cu medicul specialist și identificarea problemelor dentare', icon: 'stethoscope' },
  { num: '3', title: 'Plan de tratament', desc: 'Plan personalizat cu priorități și estimare de costuri, fără obligații', icon: 'clipboard-list' },
]

const SERVICES_OPENDAY = [
  {
    icon: 'anchor',
    title: 'Implanturi Dentare',
    desc: 'Soluția permanentă pentru dinți lipsă',
    bullets: ['Titan medical de calitate superioară', 'Procedură minim invazivă', 'Durată de viață: toată viața', 'Planificare 3D pre-operatorie'],
  },
  {
    icon: 'sparkles',
    title: 'Coroane & Fațete',
    desc: 'Zâmbetul perfect cu estetică avansată',
    bullets: ['Ceramică E.max — rezistență maximă', 'Culoare identică cu dinții naturali', 'Simulare digitală înainte de procedură', 'Finalizare în 5-7 zile'],
  },
  {
    icon: 'baby',
    title: 'Pedodonție (Copii)',
    desc: 'Îngrijire dentară prietenoasă pentru copii',
    bullets: ['Cabinet dedicat copiilor 3–18 ani', 'Medici cu formare în psihologia pediatrică', 'Sigilări preventive gratuite', 'Prima vizită — o aventură pozitivă'],
  },
]

const DOCTORS = [
  { name: 'Dr. Ana Rusu', specialty: 'Stomatologie generală & Estetică', exp: '12 ani experiență', bio: 'Specializată în estetică dentară la clinici din Italia și Germania. Expertă în fațete ceramice și albire profesională.', initials: 'AR' },
  { name: 'Dr. Ion Popescu', specialty: 'Chirurgie orală & Implanturi', exp: '18 ani experiență', bio: 'Chirurg cu 2.000+ implanturi montate. Fellow al Asociației Europene de Implantologie. Conferențiar la congrese internaționale.', initials: 'IP' },
  { name: 'Dr. Maria Ciobanu', specialty: 'Ortodonție', exp: '10 ani experiență', bio: 'Certificată Invisalign și 3M Unitek. Tratamente ortodontice pentru copii și adulți cu aparate metalice, ceramice și alinere.', initials: 'MC' },
  { name: 'Dr. Vasile Grigore', specialty: 'Endodonție', exp: '15 ani experiență', bio: 'Endodontist cu microscop Carl Zeiss. Specialist în retreatamente și canale calcifiate cu rata de succes de 97%.', initials: 'VG' },
  { name: 'Dr. Elena Botnaru', specialty: 'Pedodonție', exp: '8 ani experiență', bio: 'Medic stomatolog pediatric cu training în Franța. Abordare bazată pe joc și empatie pentru cele mai mici vârste.', initials: 'EB' },
  { name: 'Dr. Andrei Lungu', specialty: 'Parodontologie', exp: '11 ani experiență', bio: 'Parodontolog cu formare la Universitatea din Viena. Specialist în tratamente non-chirurgicale și chirurgie parodontală avansată.', initials: 'AL' },
]

const REASONS = [
  { icon: 'award', text: '10+ ani de activitate' },
  { icon: 'users', text: '35.000+ pacienți tratați' },
  { icon: 'star', text: '1.900+ recenzii pozitive' },
  { icon: 'building-2', text: '2 filiale în Chișinău' },
  { icon: 'cpu', text: 'Laborator propriu dentar' },
  { icon: 'shield-check', text: 'Garanție pe toate lucrările' },
  { icon: 'wifi', text: '100% digitalizat' },
  { icon: 'heart-pulse', text: 'Anestezie generală disponibilă' },
  { icon: 'microscope', text: 'Planmeca · Dentsply · EMS' },
  { icon: 'clock', text: 'Programare online 24/7' },
]

const TESTIMONIALS = [
  { name: 'Maria C., 34 ani', text: 'Am venit cu multă teamă la prima vizită, dar echipa My Dental Clinic m-a făcut să mă simt în siguranță. Acum vin cu plăcere!' },
  { name: 'Alexandru T., 42 ani', text: 'Cel mai profesionist cabinet din Chișinău. Tehnologie impresionantă și medici cu adevărat empatici. Recomand cu încredere.' },
  { name: 'Natalia P., mamă', text: 'La Open Day-ul de anul trecut am obținut un plan complet de tratament gratuit. Economie reală și sfaturi extrem de valoroase!' },
  { name: 'Victor M., 51 ani', text: 'Am primit implantul în aceeași zi. Procedura a durat sub o oră și nu am simțit nicio durere. Rezultatul este impecabil.' },
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
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className={`w-full bg-white border text-[14px] px-4 py-3 rounded-[8px] flex items-center justify-between transition-colors ${open ? 'border-accent ring-1 ring-accent' : 'border-neutral/60'}`}
      >
        <span className={value ? 'text-primary-dark' : 'text-primary-dark/40'}>{value || placeholder}</span>
        <Icon icon={open ? 'lucide:chevron-up' : 'lucide:chevron-down'} className="text-primary-dark/40 text-sm ml-2 flex-shrink-0" />
      </button>
      {open && (
        <div className="absolute z-50 top-full left-0 right-0 mt-1 bg-white border border-surface rounded-[10px] shadow-hover overflow-y-auto max-h-[200px]">
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

// ─── REGISTER MODAL ──────────────────────────────────────────────────────────

function RegisterModal({ onClose }: { onClose: () => void }) {
  const [selectedService, setSelectedService] = useState('')
  const [selectedTime, setSelectedTime] = useState('')

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
      <div className="absolute inset-0 bg-primary-dark/70 backdrop-blur-sm" />
      <div
        className="relative bg-white rounded-[20px] shadow-hover max-w-[480px] w-full p-8 animate-fade-in"
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-surface flex items-center justify-center text-primary-dark hover:bg-accent hover:text-white transition-colors">
          <Icon icon="lucide:x" className="text-sm" />
        </button>
        <div className="text-accent text-[12px] font-bold uppercase tracking-[1px] mb-2">Înregistrare gratuită</div>
        <h3 className="font-heading font-bold text-[22px] text-primary-dark mb-1">Open Day — {OPEN_DAY.date}</h3>
        <p className="text-[13px] text-primary-dark/60 mb-6">Completează formularul și te sunam noi pentru confirmare.</p>
        <form className="flex flex-col gap-3" onSubmit={e => e.preventDefault()}>
          <input type="text" placeholder="Nume și prenume" className="w-full bg-white border border-neutral/60 text-primary-dark text-[14px] px-4 py-3 rounded-[8px] focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent" />
          <input type="tel" placeholder="Telefon" className="w-full bg-white border border-neutral/60 text-primary-dark text-[14px] px-4 py-3 rounded-[8px] focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent" />
          <CustomSelect
            value={selectedService}
            onChange={setSelectedService}
            options={SERVICES_OPENDAY.map(s => s.title)}
            placeholder="Serviciu de interes"
          />
          <CustomSelect
            value={selectedTime}
            onChange={setSelectedTime}
            options={['09:00','09:30','10:00','10:30','11:00','11:30','12:00','12:30','13:00','13:30','14:00','14:30','15:00','15:30','16:00','16:30','17:00','17:30','18:00']}
            placeholder="Ora preferată"
          />
          <button type="submit" className="w-full bg-accent text-white font-heading font-medium text-[16px] py-3.5 rounded-[8px] hover:bg-[#8A092E] transition-colors mt-1">
            Solicită apel de confirmare →
          </button>
        </form>
        <p className="text-center text-[12px] text-primary-dark/40 mt-3">Sau sună direct: <a href={`tel:${OPEN_DAY.phone.replace(/\s/g,'')}`} className="text-accent font-medium">{OPEN_DAY.phone}</a></p>
      </div>
    </div>
  )
}

// ─── NAVBAR ───────────────────────────────────────────────────────────────────

function Navbar({ onRegister }: { onRegister: () => void }) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-subtle h-20">
      <div className="max-w-[1440px] mx-auto px-6 h-full flex items-center justify-between">
        <a href="#" className="flex items-center gap-3 group">
          <svg width="32" height="24" viewBox="0 0 40 30" fill="none" className="text-accent group-hover:scale-105 transition-transform">
            <path d="M4 8 Q20 28 36 8" stroke="currentColor" strokeWidth="6" strokeLinecap="round" fill="transparent" />
          </svg>
          <span className="font-heading font-bold text-xl tracking-tight text-primary-dark lowercase mt-1">my dental clinic</span>
        </a>
        <div className="hidden md:flex items-center gap-8">
          <a href="#beneficii" className="text-[14px] font-medium text-primary-dark hover:text-accent transition-colors">Beneficii gratuite</a>
          <a href="#servicii" className="text-[14px] font-medium text-primary-dark hover:text-accent transition-colors">Servicii</a>
          <a href="#echipa" className="text-[14px] font-medium text-primary-dark hover:text-accent transition-colors">Echipa</a>
          <a href="#contact" className="text-[14px] font-medium text-primary-dark hover:text-accent transition-colors">Contact</a>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={onRegister} className="hidden sm:inline-block bg-accent text-white font-medium text-[14px] px-6 py-2.5 rounded-[8px] hover:bg-[#8A092E] transition-colors shadow-sm">
            Înscrie-te gratuit
          </button>
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-primary-dark p-2" aria-label="Menu">
            <Icon icon={`lucide:${isOpen ? 'x' : 'menu'}`} className="text-2xl" />
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-white border-t border-surface px-6 py-4 flex flex-col gap-4 animate-fade-in">
          <a href="#beneficii" onClick={() => setIsOpen(false)} className="text-[15px] font-medium text-primary-dark">Beneficii gratuite</a>
          <a href="#servicii" onClick={() => setIsOpen(false)} className="text-[15px] font-medium text-primary-dark">Servicii</a>
          <a href="#echipa" onClick={() => setIsOpen(false)} className="text-[15px] font-medium text-primary-dark">Echipa</a>
          <a href="#contact" onClick={() => setIsOpen(false)} className="text-[15px] font-medium text-primary-dark">Contact</a>
          <button onClick={() => { onRegister(); setIsOpen(false) }} className="bg-accent text-white font-medium text-[14px] px-6 py-2.5 rounded-[8px] text-center">Înscrie-te gratuit</button>
        </div>
      )}
    </nav>
  )
}

// ─── HERO ─────────────────────────────────────────────────────────────────────

function Hero({ onRegister }: { onRegister: () => void }) {
  return (
    <header className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden bg-gradient-to-br from-primary-dark via-[#112040] to-[#0a1830]">
      {/* Background decorative */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-accent/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-bg-light/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left content */}
          <div className="w-full lg:w-[55%] flex flex-col items-start">
            <div className="inline-flex items-center gap-2 bg-accent/20 text-accent border border-accent/40 px-4 py-1.5 rounded-full text-[12px] font-bold uppercase tracking-[1px] mb-6 animate-fade-in-up">
              <Icon icon="lucide:calendar-check" /> Doar o dată pe an
            </div>
            <h1 className="font-heading font-bold text-4xl md:text-[60px] leading-[1.05] text-white max-w-[580px] mb-4 tracking-tight animate-fade-in-up delay-100">
              OPEN DAY<br />
              <span className="text-accent">My Dental Clinic</span>
            </h1>
            <div className="flex flex-wrap gap-4 mb-6 animate-fade-in-up delay-200">
              <span className="flex items-center gap-2 text-white/80 text-[15px]">
                <Icon icon="lucide:map-pin" className="text-accent" /> {OPEN_DAY.address}
              </span>
              <span className="flex items-center gap-2 text-white/80 text-[15px]">
                <Icon icon="lucide:calendar" className="text-accent" /> {OPEN_DAY.date}
              </span>
              <span className="flex items-center gap-2 text-white/80 text-[15px]">
                <Icon icon="lucide:clock" className="text-accent" /> {OPEN_DAY.time}
              </span>
            </div>
            <p className="text-[16px] text-white/60 max-w-[480px] mb-8 leading-relaxed animate-fade-in-up delay-200">
              Implanturi · Coroane & Fațete · Tratamente copii · Estetică dentară — toate sub același acoperiș
            </p>

            {/* Free badges */}
            <div className="flex flex-wrap gap-3 mb-8 animate-fade-in-up delay-300">
              <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white text-[13px] font-medium px-4 py-2 rounded-full">
                <Icon icon="lucide:gift" className="text-accent" /> Consultație Gratuită
              </span>
              <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white text-[13px] font-medium px-4 py-2 rounded-full">
                <Icon icon="lucide:gift" className="text-accent" /> Radiografie Gratuită
              </span>
              <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white text-[13px] font-medium px-4 py-2 rounded-full">
                <Icon icon="lucide:gift" className="text-accent" /> Plan de Tratament Gratuit
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 animate-fade-in-up delay-300">
              <button
                onClick={onRegister}
                className="inline-flex justify-center items-center bg-accent text-white font-heading font-bold text-[16px] px-10 py-4 rounded-[50px] hover:scale-105 hover:shadow-lg transition-all duration-300"
              >
                Înscrie-te GRATUIT <Icon icon="lucide:arrow-right" className="ml-2" />
              </button>
              <a href={`tel:${OPEN_DAY.phone.replace(/\s/g,'')}`} className="text-white/70 font-medium text-[15px] hover:text-white transition-all flex items-center gap-2">
                <Icon icon="lucide:phone" className="text-accent" /> {OPEN_DAY.phone}
              </a>
            </div>

            <div className="mt-6 inline-flex items-center gap-2 bg-yellow-400/20 border border-yellow-400/40 text-yellow-300 text-[13px] font-bold px-4 py-2 rounded-full animate-fade-in-up delay-400">
              <Icon icon="lucide:alert-triangle" /> Locurile sunt limitate! Au mai rămas doar {OPEN_DAY.spotsLeft} locuri
            </div>
          </div>

          {/* Right: calendar card */}
          <div className="w-full lg:w-[45%] animate-fade-in delay-300 flex justify-center">
            <div className="bg-white rounded-[24px] shadow-2xl overflow-hidden max-w-[360px] w-full">
              {/* Calendar header */}
              <div className="bg-accent px-8 py-5 flex items-center justify-between">
                <span className="text-white/80 font-medium text-[14px] uppercase tracking-wide">Aprilie 2025</span>
                <Icon icon="lucide:calendar" className="text-white text-2xl" />
              </div>
              {/* Date display */}
              <div className="px-8 py-6 flex flex-col items-center border-b border-surface">
                <div className="relative">
                  <div className="font-heading font-bold text-[96px] leading-none text-primary-dark">{OPEN_DAY.dateShort.split(' ')[0]}</div>
                  <div className="absolute -top-2 -right-8 w-14 h-14 rounded-full border-[3px] border-accent flex items-center justify-center">
                    <span className="text-accent font-bold text-[13px]">{OPEN_DAY.dateShort.split(' ')[1]}</span>
                  </div>
                </div>
                <div className="text-primary-dark/60 text-[14px] font-medium mt-1">{OPEN_DAY.time}</div>
              </div>
              {/* Details */}
              <div className="px-8 py-5 flex flex-col gap-3">
                <div className="flex items-center gap-3 text-[14px] text-primary-dark">
                  <Icon icon="lucide:map-pin" className="text-accent flex-shrink-0" />
                  <span>{OPEN_DAY.address}</span>
                </div>
                <div className="flex items-center gap-3 text-[14px] text-primary-dark">
                  <Icon icon="lucide:phone" className="text-accent flex-shrink-0" />
                  <span>{OPEN_DAY.phone}</span>
                </div>
                <button
                  onClick={onRegister}
                  className="mt-2 w-full bg-accent text-white font-heading font-bold text-[15px] py-3.5 rounded-[50px] hover:bg-[#8A092E] transition-colors"
                >
                  Rezervă locul tău →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

// ─── FREE BENEFITS ────────────────────────────────────────────────────────────

function FreeBenefits({ onRegister }: { onRegister: () => void }) {
  return (
    <section id="beneficii" className="bg-surface py-20 md:py-24">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="max-w-[600px] mx-auto text-center mb-14">
          <div className="text-accent text-[13px] font-bold uppercase tracking-[2px] mb-3">Ce primești gratuit</div>
          <h2 className="font-heading font-bold text-3xl md:text-[40px] text-primary-dark leading-tight mb-4">3 servicii GRATUITE de Open Day</h2>
          <p className="text-[16px] text-primary-dark/65">Valoare totală: <span className="font-bold text-primary-dark">1.200+ MDL</span> — oferit complet gratuit în ziua evenimentului</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {FREE_BENEFITS.map((b) => (
            <div key={b.num} className="bg-white rounded-[20px] overflow-hidden shadow-subtle hover:shadow-hover hover:-translate-y-1 transition-all duration-300">
              <div className="bg-gradient-to-br from-surface to-bg-light/60 h-36 flex items-center justify-center relative">
                <span className="absolute top-4 left-4 font-heading font-bold text-[64px] text-primary-dark/8 leading-none select-none">{b.num}</span>
                <div className="w-16 h-16 rounded-full bg-white shadow-md flex items-center justify-center text-accent relative z-10">
                  <Icon icon={`lucide:${b.icon}`} className="text-3xl" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-heading font-bold text-[18px] text-primary-dark mb-2">{b.title}</h3>
                <p className="text-[14px] text-primary-dark/60 leading-relaxed">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center">
          <button
            onClick={onRegister}
            className="inline-flex items-center gap-2 bg-accent text-white font-heading font-bold text-[16px] px-12 py-4 rounded-[50px] hover:scale-105 hover:shadow-lg transition-all duration-300"
          >
            <Icon icon="lucide:phone" /> Sună și PROGRAMEAZĂ-TE! {OPEN_DAY.phone}
          </button>
          <p className="text-[13px] text-primary-dark/50 mt-3">Eveniment: {OPEN_DAY.date} · {OPEN_DAY.time}</p>
        </div>
      </div>
    </section>
  )
}

// ─── SERVICES OPEN DAY ───────────────────────────────────────────────────────

function ServicesOpenDay({ onRegister }: { onRegister: () => void }) {
  return (
    <section id="servicii" className="bg-white py-20 md:py-24">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="max-w-[640px] mx-auto text-center mb-14">
          <div className="text-accent text-[13px] font-bold uppercase tracking-[2px] mb-3">Servicii prezentate</div>
          <h2 className="font-heading font-bold text-3xl md:text-[40px] text-primary-dark leading-tight mb-4">Ce tratamente vei putea discuta la Open Day</h2>
          <p className="text-[16px] text-primary-dark/65">Medicii noștri specialiști vor fi prezenți pentru consultații individuale și răspunsuri la orice întrebare</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {SERVICES_OPENDAY.map((s) => (
            <div key={s.title} className="bg-surface rounded-[20px] p-8 hover:shadow-hover hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 rounded-full bg-accent/10 text-accent flex items-center justify-center mb-5">
                <Icon icon={`lucide:${s.icon}`} className="text-2xl" />
              </div>
              <h3 className="font-heading font-bold text-[20px] text-primary-dark mb-2">{s.title}</h3>
              <p className="text-[14px] text-primary-dark/60 mb-5">{s.desc}</p>
              <ul className="flex flex-col gap-2.5">
                {s.bullets.map(b => (
                  <li key={b} className="flex items-start gap-2.5 text-[14px] text-primary-dark">
                    <Icon icon="lucide:check-circle" className="text-accent flex-shrink-0 mt-0.5" /> {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="text-center">
          <button
            onClick={onRegister}
            className="inline-flex items-center gap-2 bg-primary-dark text-white font-heading font-bold text-[16px] px-12 py-4 rounded-[50px] hover:bg-[#0a1830] hover:scale-105 transition-all duration-300"
          >
            Vreau să mă înscriu la Open Day <Icon icon="lucide:arrow-right" className="ml-1" />
          </button>
        </div>
      </div>
    </section>
  )
}

// ─── DOCTORS ──────────────────────────────────────────────────────────────────

function Doctors() {
  const [idx, setIdx] = useState(0)
  const visible = 3
  const max = DOCTORS.length - visible
  const prev = () => setIdx(i => Math.max(0, i - 1))
  const next = () => setIdx(i => Math.min(max, i + 1))

  return (
    <section id="echipa" className="bg-primary-dark py-20 md:py-24">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="max-w-[600px] mx-auto text-center mb-14">
          <div className="text-accent text-[13px] font-bold uppercase tracking-[2px] mb-3">Medicii noștri</div>
          <h2 className="font-heading font-bold text-3xl md:text-[40px] text-white leading-tight mb-4">Specialiști cu experiență și dedicație</h2>
          <p className="text-[16px] text-white/60">Profesioniști certificați, permanent la curent cu tehnicile stomatologice moderne</p>
        </div>

        <div className="relative">
          <div className="hidden md:block overflow-hidden">
            <div
              className="flex gap-6 transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(calc(-${idx} * (100% / ${visible} + 8px)))` }}
            >
              {DOCTORS.map((doc) => (
                <div key={doc.name} className="flex-shrink-0 w-[calc(33.333%-16px)] bg-white/5 border border-white/10 rounded-[20px] p-7 hover:bg-white/10 transition-all duration-300 flex flex-col items-center text-center">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-accent/30 to-bg-light/20 flex items-center justify-center text-white font-heading font-bold text-xl mb-4 border-2 border-white/20">
                    {doc.initials}
                  </div>
                  <h3 className="font-heading font-bold text-[17px] text-white mb-1">{doc.name}</h3>
                  <p className="text-[13px] text-accent font-medium mb-2">{doc.specialty}</p>
                  <p className="text-[12px] text-white/50 flex items-center gap-1 mb-4">
                    <Icon icon="lucide:briefcase" className="text-xs" /> {doc.exp}
                  </p>
                  <p className="text-[13px] text-white/60 leading-relaxed">{doc.bio}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="md:hidden grid grid-cols-1 gap-4">
            {DOCTORS.map((doc) => (
              <div key={doc.name} className="bg-white/5 border border-white/10 rounded-[16px] p-5 flex items-start gap-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-accent/30 to-bg-light/20 flex items-center justify-center text-white font-heading font-bold flex-shrink-0">
                  {doc.initials}
                </div>
                <div>
                  <h3 className="font-heading font-bold text-[15px] text-white">{doc.name}</h3>
                  <p className="text-[13px] text-accent font-medium">{doc.specialty}</p>
                  <p className="text-[12px] text-white/50">{doc.exp}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="hidden md:flex items-center justify-center gap-3 mt-8">
            <button onClick={prev} disabled={idx === 0} className="w-10 h-10 rounded-full border-2 border-white/20 flex items-center justify-center text-white hover:border-accent hover:text-accent transition-colors disabled:opacity-30 disabled:cursor-not-allowed">
              <Icon icon="lucide:chevron-left" />
            </button>
            <div className="flex gap-2">
              {Array.from({ length: max + 1 }).map((_, i) => (
                <button key={i} onClick={() => setIdx(i)} className={`w-2 h-2 rounded-full transition-all ${i === idx ? 'bg-accent w-5' : 'bg-white/20'}`} />
              ))}
            </div>
            <button onClick={next} disabled={idx === max} className="w-10 h-10 rounded-full border-2 border-white/20 flex items-center justify-center text-white hover:border-accent hover:text-accent transition-colors disabled:opacity-30 disabled:cursor-not-allowed">
              <Icon icon="lucide:chevron-right" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── 10 REASONS ───────────────────────────────────────────────────────────────

function Reasons({ onRegister }: { onRegister: () => void }) {
  return (
    <section className="bg-surface py-20 md:py-24">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="max-w-[600px] mx-auto text-center mb-14">
          <div className="text-accent text-[13px] font-bold uppercase tracking-[2px] mb-3">De ce noi</div>
          <h2 className="font-heading font-bold text-3xl md:text-[40px] text-primary-dark leading-tight mb-4">10 motive să alegi My Dental Clinic</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">
          {REASONS.map((r) => (
            <div key={r.text} className="bg-white rounded-[16px] p-5 shadow-subtle flex flex-col items-center text-center gap-3 hover:shadow-hover hover:-translate-y-1 transition-all duration-300">
              <div className="w-10 h-10 rounded-full bg-accent/10 text-accent flex items-center justify-center">
                <Icon icon={`lucide:${r.icon}`} className="text-lg" />
              </div>
              <span className="text-[13px] font-medium text-primary-dark leading-snug">{r.text}</span>
            </div>
          ))}
        </div>
        <div className="text-center">
          <button
            onClick={onRegister}
            className="inline-flex items-center gap-2 bg-accent text-white font-heading font-bold text-[16px] px-12 py-4 rounded-[50px] hover:scale-105 hover:shadow-lg transition-all duration-300"
          >
            Vreau la Open Day <Icon icon="lucide:arrow-right" className="ml-1" />
          </button>
        </div>
      </div>
    </section>
  )
}

// ─── TESTIMONIALS ─────────────────────────────────────────────────────────────

function Testimonials({ onRegister }: { onRegister: () => void }) {
  return (
    <section className="bg-white py-20 md:py-24">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="max-w-[600px] mx-auto text-center mb-14">
          <div className="text-accent text-[13px] font-bold uppercase tracking-[2px] mb-3">Recenziile pacienților</div>
          <h2 className="font-heading font-bold text-3xl md:text-[38px] text-primary-dark leading-tight mb-4">Povești reale, zâmbete reale</h2>
          <div className="flex items-center justify-center gap-2 text-[15px] text-primary-dark font-medium">
            <div className="flex text-accent">
              {[1,2,3,4,5].map(s => <Icon key={s} icon="lucide:star" className="fill-current" />)}
            </div>
            <span>4.9 din 5 — bazat pe 1.900+ recenzii</span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="bg-surface rounded-[16px] p-6 hover:shadow-hover hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
              <div className="absolute -top-4 -left-2 text-[80px] font-heading font-bold text-primary-dark/5 leading-none select-none">"</div>
              <p className="italic text-[14px] text-primary-dark/80 mb-4 leading-relaxed relative z-10">"{t.text}"</p>
              <div className="flex text-accent text-xs mb-3">★ ★ ★ ★ ★</div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-neutral/60 shadow-sm">
                  <Icon icon="lucide:user" className="text-lg" />
                </div>
                <div>
                  <p className="font-heading font-medium text-[14px] text-primary-dark">{t.name}</p>
                  <span className="text-[11px] text-primary-dark/50 flex items-center gap-1">Pacient verificat <Icon icon="lucide:check" className="text-[10px]" /></span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center">
          <button
            onClick={onRegister}
            className="inline-flex items-center gap-2 bg-accent text-white font-heading font-bold text-[16px] px-12 py-4 rounded-[50px] hover:scale-105 hover:shadow-lg transition-all duration-300"
          >
            Vreau să mă înscriu la Open Day <Icon icon="lucide:arrow-right" className="ml-1" />
          </button>
        </div>
      </div>
    </section>
  )
}

// ─── CONTACT & MAP ────────────────────────────────────────────────────────────

function Contact({ onRegister }: { onRegister: () => void }) {
  return (
    <section id="contact" className="bg-surface py-20 md:py-24">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="max-w-[600px] mx-auto text-center mb-14">
          <div className="text-accent text-[13px] font-bold uppercase tracking-[2px] mb-3">Locație & Contact</div>
          <h2 className="font-heading font-bold text-3xl md:text-[40px] text-primary-dark leading-tight mb-4">Ne găsești ușor</h2>
        </div>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Map placeholder */}
          <div className="flex-1 min-h-[340px] rounded-[20px] overflow-hidden bg-gradient-to-br from-surface to-neutral/20 shadow-subtle flex items-center justify-center relative">
            <div className="flex flex-col items-center text-primary-dark/40">
              <Icon icon="lucide:map-pin" className="text-5xl mb-3 text-accent" />
              <span className="font-heading font-medium text-lg">str. Constantin Brâncuși 112</span>
              <span className="text-[14px]">Chișinău, Moldova</span>
            </div>
          </div>
          {/* Info + CTA */}
          <div className="flex-1 flex flex-col gap-6">
            <div className="bg-white rounded-[20px] p-8 shadow-subtle">
              <div className="flex items-center gap-3 mb-6">
                <svg width="28" height="20" viewBox="0 0 40 30" fill="none" className="text-accent">
                  <path d="M4 8 Q20 28 36 8" stroke="currentColor" strokeWidth="6" strokeLinecap="round" fill="transparent" />
                </svg>
                <span className="font-heading font-bold text-lg text-primary-dark lowercase">my dental clinic</span>
              </div>
              <ul className="space-y-3 text-[14px] text-primary-dark mb-6">
                <li className="flex items-start gap-3"><Icon icon="lucide:map-pin" className="text-accent mt-1 flex-shrink-0" /><span>str. Constantin Brâncuși 112, Chișinău MD-2060</span></li>
                <li className="flex items-center gap-3"><Icon icon="lucide:phone" className="text-accent flex-shrink-0" /><a href={`tel:${OPEN_DAY.phone.replace(/\s/g,'')}`} className="hover:text-accent font-medium">{OPEN_DAY.phone}</a></li>
                <li className="flex items-center gap-3"><Icon icon="lucide:mail" className="text-accent flex-shrink-0" /><a href="mailto:contact@mydentalclinic.md" className="hover:text-accent font-medium">contact@mydentalclinic.md</a></li>
              </ul>
              <div className="border-t border-surface pt-5 mb-5">
                <div className="text-[11px] text-primary-dark/50 uppercase tracking-wide font-bold mb-3">Program Open Day</div>
                <div className="flex justify-between text-[14px]">
                  <span className="text-primary-dark/70">{OPEN_DAY.date}</span>
                  <span className="font-bold text-accent">{OPEN_DAY.time}</span>
                </div>
              </div>
              <div className="flex gap-3">
                <a href="#" className="w-10 h-10 rounded-full bg-surface flex items-center justify-center text-primary-dark hover:bg-primary-dark hover:text-white transition-colors"><Icon icon="lucide:instagram" /></a>
                <a href="#" className="w-10 h-10 rounded-full bg-surface flex items-center justify-center text-primary-dark hover:bg-primary-dark hover:text-white transition-colors"><Icon icon="lucide:facebook" /></a>
                <a href="#" className="w-10 h-10 rounded-full bg-surface flex items-center justify-center text-primary-dark hover:bg-primary-dark hover:text-white transition-colors"><Icon icon="mdi:tiktok" /></a>
              </div>
            </div>
            <button
              onClick={onRegister}
              className="w-full bg-accent text-white font-heading font-bold text-[16px] py-4 rounded-[16px] hover:bg-[#8A092E] hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Icon icon="lucide:calendar-check" /> Înscrie-te la Open Day — {OPEN_DAY.date}
            </button>
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
            <a href="#" className="hover:text-white transition-all">Politica de confidențialitate</a>
            <a href="#" className="hover:text-white transition-all">GDPR</a>
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
  const [showModal, setShowModal] = useState(false)
  const openRegister = useCallback(() => setShowModal(true), [])
  const closeRegister = useCallback(() => setShowModal(false), [])

  return (
    <div className="min-h-screen font-sans text-primary-dark bg-white">
      {showModal && <RegisterModal onClose={closeRegister} />}
      <Navbar onRegister={openRegister} />
      <main>
        <Hero onRegister={openRegister} />
        <FreeBenefits onRegister={openRegister} />
        <ServicesOpenDay onRegister={openRegister} />
        <Doctors />
        <Reasons onRegister={openRegister} />
        <Testimonials onRegister={openRegister} />
        <Contact onRegister={openRegister} />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  )
}
