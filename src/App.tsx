import { useState, useEffect, useCallback, useRef } from 'react'
import { Icon } from '@iconify/react'

// ─── DATA ────────────────────────────────────────────────────────────────────

const OPEN_DAY = {
  date: '6 aprilie 2026',
  dateRange: '6 – 11 Aprilie 2026',
  dateShort: '6 APR',
  year: '2026',
  time: '09:00 – 18:00',
  address: 'str. Constantin Brâncuși 112, Chișinău',
  phone: '076 588 884',
  spotsLeft: 12,
  eventDate: new Date('2026-04-06T09:00:00'),
}


const CHECKUP_SERVICES = [
  { icon: 'scan-line', title: 'Radiografie panoramică', desc: 'Imagine digitală completă a dinților și maxilarelor' },
  { icon: 'stethoscope', title: 'Consultație generală', desc: 'Examinare clinică detaliată cu medicul specialist' },
  { icon: 'activity', title: 'Evaluare parodontală', desc: 'Verificarea sănătății gingiilor și osului alveolar' },
  { icon: 'search', title: 'Detectare carii', desc: 'Identificarea cariilor incipiente cu instrumente moderne' },
  { icon: 'clipboard-list', title: 'Plan de tratament', desc: 'Recomandări personalizate și prioritizate' },
  { icon: 'smile', title: 'Consultație estetică', desc: 'Analiză smile design și opțiuni de estetică dentară' },
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
  {
    icon: 'cpu',
    title: 'Scanare Intraorală',
    desc: 'Tehnologie digitală de ultimă generație',
    bullets: ['Imagine 3D completă a cavității orale', 'Fără amprente clasice inconfortabile', 'Precizie superioară pentru proteze și aparate', 'Rezultate instant pe ecran'],
  },
]

const REASONS = [
  { icon: 'award', text: '10+ ani de activitate' },
  { icon: 'users', text: '1.000+ pacienți tratați' },
  { icon: 'star', text: '1.900+ recenzii pozitive' },
  { icon: 'building-2', text: '2 filiale în Chișinău' },
  { icon: 'cpu', text: 'Laborator propriu dentar' },
  { icon: 'shield-check', text: 'Garanție pe toate lucrările' },
  { icon: 'wifi', text: '100% digitalizat' },
  { icon: 'heart-pulse', text: 'Anestezie generală disponibilă' },
  { icon: 'microscope', text: 'Planmeca · Dentsply · EMS' },
  { icon: 'clock', text: 'Programare online 24/7' },
]

const TOMBOLA_PRIZES = [
  { icon: 'anchor', text: 'Implant dentar', highlight: true },
  { icon: 'sparkles', text: 'Albire dentară gratuită', highlight: false },
  { icon: 'droplets', text: 'Igienizare profesională gratuită', highlight: false },
]

const GALLERY_PHOTOS = [
  '/Poze landing/Poze landing/871A3835.jpg',
  '/Poze landing/Poze landing/IMG_7725.jpg',
  '/Poze landing/Poze landing/IMG_7944.jpg',
  '/Poze landing/Poze landing/871A3847.jpg',
  '/Poze landing/Poze landing/IMG_8050.jpg',
  '/Poze landing/Poze landing/IMG_7574.jpg',
  '/Poze landing/Poze landing/871A4475.jpg',
  '/Poze landing/Poze landing/IMG_7972.jpg',
  '/Poze landing/Poze landing/IMG_7512.jpg',
  '/Poze landing/Poze landing/871A3844.jpg',
  '/Poze landing/Poze landing/IMG_8465.jpg',
  '/Poze landing/Poze landing/IMG_7932.jpg',
]

const TEAM_PHOTOS = [
  '/POZE ECHIPA/871A4555.jpg',
  '/POZE ECHIPA/871A4560.jpg',
  '/POZE ECHIPA/871A4586.jpg',
  '/POZE ECHIPA/871A4590.jpg',
  '/POZE ECHIPA/871A4597.jpg',
  '/POZE ECHIPA/871A4598.jpg',
  '/POZE ECHIPA/871A4602.jpg',
  '/POZE ECHIPA/871A4646.jpg',
  '/POZE ECHIPA/871A4649.jpg',
  '/POZE ECHIPA/viber_image_2026-03-12_11-16-13-185.jpg',
]

// ─── COUNTDOWN HOOK ──────────────────────────────────────────────────────────

function useCountdown(target: Date) {
  const calc = () => {
    const diff = target.getTime() - Date.now()
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }
    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000),
    }
  }
  const [time, setTime] = useState(calc)
  useEffect(() => {
    const id = setInterval(() => setTime(calc()), 1000)
    return () => clearInterval(id)
  }, [])
  return time
}

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
      className="fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full bg-accent text-white shadow-lg flex items-center justify-center hover:bg-[#A30B37] hover:scale-110 transition-all duration-300"
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
        className={`w-full bg-white border text-[14px] px-4 py-3 rounded-[8px] flex items-center justify-between transition-colors ${open ? 'border-accent ring-1 ring-accent' : 'border-gray-200'}`}
      >
        <span className={value ? 'text-gray-800' : 'text-gray-400'}>{value || placeholder}</span>
        <Icon icon={open ? 'lucide:chevron-up' : 'lucide:chevron-down'} className="text-gray-400 text-sm ml-2 flex-shrink-0" />
      </button>
      {open && (
        <div className="absolute z-50 top-full left-0 right-0 mt-1 bg-white border border-gray-100 rounded-[10px] shadow-lg overflow-y-auto max-h-[200px]">
          {options.map(opt => (
            <button
              key={opt}
              type="button"
              onClick={() => { onChange(opt); setOpen(false) }}
              className={`w-full text-left px-4 py-2.5 text-[14px] transition-colors hover:bg-[#E6E5EC] hover:text-accent ${value === opt ? 'text-accent font-medium bg-[#E6E5EC]' : 'text-gray-700'}`}
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
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div
        className="relative bg-white rounded-[20px] shadow-2xl max-w-[480px] w-full p-8 animate-fade-in"
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-accent hover:text-white transition-colors">
          <Icon icon="lucide:x" className="text-sm" />
        </button>
        <div className="text-accent text-[12px] font-bold uppercase tracking-[1px] mb-2">Înregistrare gratuită</div>
        <h3 className="font-heading font-bold text-[22px] text-[#0E2338] mb-1">Open Week — {OPEN_DAY.dateRange}</h3>
        <p className="text-[13px] text-gray-500 mb-6">Completează formularul și te sunam noi pentru confirmare.</p>
        <form className="flex flex-col gap-3" onSubmit={e => e.preventDefault()}>
          <input type="text" placeholder="Nume și prenume" className="w-full bg-white border border-gray-200 text-gray-800 text-[14px] px-4 py-3 rounded-[8px] focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent" />
          <input type="tel" placeholder="Telefon" className="w-full bg-white border border-gray-200 text-gray-800 text-[14px] px-4 py-3 rounded-[8px] focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent" />
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
          <button type="submit" className="w-full bg-accent text-white font-heading font-medium text-[16px] py-3.5 rounded-[8px] hover:bg-[#A30B37] transition-colors mt-1">
            Solicită apel de confirmare →
          </button>
        </form>
        <p className="text-center text-[12px] text-gray-400 mt-3">Sau sună direct: <a href={`tel:${OPEN_DAY.phone.replace(/\s/g,'')}`} className="text-accent font-medium">{OPEN_DAY.phone}</a></p>
      </div>
    </div>
  )
}

// ─── NAVBAR ───────────────────────────────────────────────────────────────────

function Navbar({ onRegister }: { onRegister: () => void }) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 shadow-sm h-[100px]">
      <div className="max-w-[1440px] mx-auto px-6 h-full flex items-center justify-between">
        <a href="#" className="flex items-center group">
          <img
            src="/logo orizontal 1-01 (1).svg"
            alt="MY DENTAL CLINIC"
            className="h-[92px] w-auto group-hover:scale-105 transition-transform"
          />
        </a>
        <div className="hidden md:flex items-center gap-8">
          <a href="#beneficii" className="text-[14px] font-medium text-gray-600 hover:text-accent transition-colors">Beneficii gratuite</a>
          <a href="#checkup" className="text-[14px] font-medium text-gray-600 hover:text-accent transition-colors">Check-up</a>
          <a href="#servicii" className="text-[14px] font-medium text-gray-600 hover:text-accent transition-colors">Servicii</a>
          <a href="#echipa" className="text-[14px] font-medium text-gray-600 hover:text-accent transition-colors">Echipa</a>
          <a href="#contact" className="text-[14px] font-medium text-gray-600 hover:text-accent transition-colors">Contact</a>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={onRegister} className="hidden sm:inline-block bg-accent text-white font-medium text-[14px] px-6 py-2.5 rounded-[8px] hover:bg-[#A30B37] transition-colors shadow-sm">
            Înscrie-te gratuit
          </button>
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-gray-700 p-2" aria-label="Menu">
            <Icon icon={`lucide:${isOpen ? 'x' : 'menu'}`} className="text-2xl" />
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 flex flex-col gap-4 animate-fade-in">
          <a href="#beneficii" onClick={() => setIsOpen(false)} className="text-[15px] font-medium text-gray-700">Beneficii gratuite</a>
          <a href="#checkup" onClick={() => setIsOpen(false)} className="text-[15px] font-medium text-gray-700">Check-up</a>
          <a href="#servicii" onClick={() => setIsOpen(false)} className="text-[15px] font-medium text-gray-700">Servicii</a>
          <a href="#echipa" onClick={() => setIsOpen(false)} className="text-[15px] font-medium text-gray-700">Echipa</a>
          <a href="#contact" onClick={() => setIsOpen(false)} className="text-[15px] font-medium text-gray-700">Contact</a>
          <button onClick={() => { onRegister(); setIsOpen(false) }} className="bg-accent text-white font-medium text-[14px] px-6 py-2.5 rounded-[8px] text-center">Înscrie-te gratuit</button>
        </div>
      )}
    </nav>
  )
}

// ─── COUNTDOWN WIDGET ────────────────────────────────────────────────────────

function CountdownWidget() {
  const { days, hours, minutes, seconds } = useCountdown(OPEN_DAY.eventDate)
  const units = [
    { val: days, label: 'Zile' },
    { val: hours, label: 'Ore' },
    { val: minutes, label: 'Min' },
    { val: seconds, label: 'Sec' },
  ]
  return (
    <div className="flex items-center gap-3">
      {units.map(({ val, label }, i) => (
        <div key={label} className="flex items-center gap-3">
          <div className="flex flex-col items-center">
            <div className="bg-accent text-white font-heading font-bold text-[32px] w-[72px] h-[72px] rounded-[14px] flex items-center justify-center leading-none tabular-nums shadow-lg">
              {String(val).padStart(2, '0')}
            </div>
            <span className="text-[11px] font-bold uppercase tracking-[1.5px] text-white/70 mt-2">{label}</span>
          </div>
          {i < 3 && <span className="text-white/40 font-bold text-[28px] mb-5 leading-none">:</span>}
        </div>
      ))}
    </div>
  )
}

// ─── HERO ─────────────────────────────────────────────────────────────────────

function Hero({ onRegister }: { onRegister: () => void }) {
  return (
    <header className="relative pt-[120px] pb-16 md:pt-[140px] md:pb-24 overflow-hidden bg-white">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#E6E5EC] rounded-full -translate-y-1/3 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#E6E5EC]/60 rounded-full translate-y-1/2 -translate-x-1/3 pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left content */}
          <div className="w-full lg:w-[55%] flex flex-col items-start">
            <div className="inline-flex items-center gap-2 bg-accent/10 text-accent text-[13px] font-bold px-4 py-2 rounded-full mb-4">
              <Icon icon="lucide:calendar-range" /> Pentru prima dată în Moldova · 6 zile
            </div>

            <h1 className="font-heading font-bold text-4xl md:text-[58px] leading-[1.05] text-[#0E2338] max-w-[580px] mb-3 tracking-tight">
              OPEN WEEK<br />
              <span className="text-accent">6–11 APRILIE</span>
            </h1>

            <p className="text-[17px] text-[#0E2338] font-semibold max-w-[500px] mb-3 leading-relaxed">
              6 zile de consultații stomatologice GRATUITE
            </p>
            <p className="text-[15px] text-gray-500 max-w-[500px] mb-6 leading-relaxed">
              În cadrul Open Week, îți poți verifica sănătatea dinților și poți primi recomandări de la medicii noștri specialiști.
            </p>

            {/* Checkmarks */}
            <ul className="flex flex-col gap-3 mb-5">
              {['Consultație gratuită', 'Tomografie dentară gratuită', 'Plan de tratament personalizat'].map(item => (
                <li key={item} className="flex items-center gap-3 text-[15px] text-[#0E2338]">
                  <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                    <Icon icon="lucide:check" className="text-white text-xs" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>

            {/* Warning */}
            <div className="flex items-center gap-2 bg-[#D3E3FD] text-[#0E2338] text-[13px] font-bold px-4 py-2.5 rounded-[10px] mb-6">
              <Icon icon="lucide:alert-triangle" className="text-accent flex-shrink-0" />
              Locurile sunt limitate. Rezervă-ți locul acum.
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4">
              <button
                onClick={onRegister}
                className="inline-flex justify-center items-center bg-accent text-white font-heading font-bold text-[16px] px-10 py-4 rounded-[50px] hover:bg-[#A30B37] hover:scale-105 hover:shadow-lg transition-all duration-300"
              >
                Programează-te acum <Icon icon="lucide:arrow-right" className="ml-2" />
              </button>
              <a href={`tel:${OPEN_DAY.phone.replace(/\s/g,'')}`} className="text-gray-500 font-medium text-[15px] hover:text-accent transition-all flex items-center gap-2">
                <Icon icon="lucide:phone" className="text-accent" /> +373 {OPEN_DAY.phone}
              </a>
            </div>

          </div>

          {/* Right: poster + countdown */}
          <div className="w-full lg:w-[45%] flex flex-col items-center gap-4">
            <div className="w-full max-w-[420px] rounded-[20px] overflow-hidden shadow-xl">
              <img
                src="/Banere prin site/open-week-1.png"
                alt="Open Week MY DENTAL CLINIC — poster oficial"
                className="w-full h-auto"
              />
            </div>
            {/* Countdown sub poster */}
            <div className="w-full max-w-[420px] bg-[#0E2338] rounded-[18px] px-6 py-5 flex flex-col gap-2 shadow-lg">
              <p className="text-[11px] font-bold text-white/60 uppercase tracking-[2px] flex items-center gap-2">
                <Icon icon="lucide:timer" className="text-accent text-[14px]" /> Evenimentul începe în:
              </p>
              <div className="flex justify-center">
                <CountdownWidget />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

// ─── DESPRE EVENIMENT ─────────────────────────────────────────────────────────

function DespreEveniment() {
  return (
    <section className="bg-white py-16 md:py-24 border-t border-gray-100">
      <div className="max-w-[1100px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="flex flex-col lg:flex-row gap-14 items-start">

          {/* Stânga — text despre eveniment */}
          <div className="flex-1">
            <div className="text-accent text-[13px] font-bold uppercase tracking-[2px] mb-3">Despre eveniment</div>
            <h2 className="font-heading font-bold text-3xl md:text-[40px] text-[#0E2338] leading-tight mb-8">Ce este Open Week?</h2>
            <div className="flex flex-col gap-5 text-[16px] text-[#0E2338] leading-relaxed">
              <p>
                <strong>Open Week</strong> este un eveniment special dedicat sănătății dentare, organizat <strong>pentru prima dată în Moldova</strong> și care acoperă <strong>toate direcțiile stomatologice</strong>.
              </p>
              <p>
                Timp de <strong>6 zile</strong>, pacienții pot beneficia <strong>gratuit</strong> de consultații și investigații stomatologice pentru a afla starea reală a dinților și pentru a primi <strong>recomandări corecte de tratament</strong>.
              </p>
              <p>
                Este ocazia perfectă să îți verifici <strong>sănătatea dentară</strong> și să discuți cu specialiștii <strong>MY DENTAL CLINIC</strong> despre <strong>cele mai potrivite soluții pentru zâmbetul tău</strong>.
              </p>
            </div>
            {/* Echipamente */}
            <div className="mt-8 flex items-start gap-3 bg-gray-50 rounded-[16px] p-5">
              <Icon icon="lucide:microscope" className="text-accent text-2xl flex-shrink-0 mt-0.5" />
              <p className="text-[14px] text-[#0E2338] leading-relaxed">
                Clinica este dotată cu <strong>echipamente de ultimă generație</strong> — microscop dentar și laser. Toate consultațiile sunt realizate de <strong>medici stomatologi specializați</strong>.
              </p>
            </div>
          </div>

          {/* Dreapta — serviciile incluse ca grid */}
          <div className="lg:w-[420px] flex-shrink-0">
            <div className="bg-[#0E2338] rounded-[24px] p-7">
              <div className="text-accent font-bold text-[12px] uppercase tracking-[2px] mb-2">Serviciile incluse</div>
              <p className="text-white font-heading font-bold text-[18px] mb-6">În cadrul Open Week poți beneficia de consultații pentru:</p>
              <div className="flex flex-col gap-3">
                {[
                  { icon: 'anchor', title: 'Implantologie', desc: 'soluții moderne pentru înlocuirea dinților lipsă' },
                  { icon: 'smile', title: 'Ortodonție', desc: 'corectarea poziției dinților (brackets, alignere)' },
                  { icon: 'crown', title: 'Protezare dentară', desc: 'coroane, punți și restaurări dentare' },
                  { icon: 'heart-pulse', title: 'Terapie dentară', desc: 'tratarea cariilor și a problemelor dentare' },
                  { icon: 'sparkles', title: 'Stomatologie estetică', desc: 'pentru un zâmbet mai alb și mai armonios' },
                  { icon: 'baby', title: 'Stomatologie copii', desc: 'consultații special dedicate celor mici' },
                ].map(s => (
                  <div key={s.title} className="flex items-center gap-3 bg-white/5 rounded-[12px] px-4 py-3 hover:bg-white/10 transition-colors">
                    <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                      <Icon icon={`lucide:${s.icon}`} className="text-accent text-sm" />
                    </div>
                    <div>
                      <span className="font-bold text-white text-[13px]">{s.title}</span>
                      <span className="text-white/50 text-[12px]"> — {s.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

// ─── STATS BANNER ─────────────────────────────────────────────────────────────

function StatsBanner() {
  const stats = [
    { icon: 'users', val: '1.000+', label: 'Pacienți tratați' },
    { icon: 'building-2', val: '22', label: 'Cabinete' },
    { icon: 'user-check', val: '50', label: 'Medici calificați' },
    { icon: 'calendar', val: '160', label: 'Pacienți/zilnic' },
    { icon: 'hotel', val: '13', label: 'Camere hotel propriu' },
  ]
  return (
    <div className="bg-[#0E2338] py-6">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-0 md:divide-x md:divide-white/20">
          {stats.map(s => (
            <div key={s.label} className="flex flex-col items-center text-center py-2">
              <Icon icon={`lucide:${s.icon}`} className="text-white/70 text-xl mb-1" />
              <div className="font-heading font-bold text-[24px] text-white leading-none">{s.val}</div>
              <div className="text-[12px] text-white/70 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── FREE BENEFITS ────────────────────────────────────────────────────────────

function FreeBenefits({ onRegister }: { onRegister: () => void }) {
  return (
    <section id="beneficii" className="bg-gray-50 py-20 md:py-24">
      <div className="max-w-[1100px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Header */}
        <div className="mb-12">
          <div className="text-accent text-[13px] font-bold uppercase tracking-[2px] mb-3">Ce primești gratuit</div>
          <h2 className="font-heading font-bold text-3xl md:text-[42px] text-[#0E2338] leading-tight">
            Participând la Open Week beneficiezi <span className="text-accent">GRATUIT</span> de:
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-stretch">
          {/* Stânga — 3 carduri checkmark */}
          <div className="flex-1 flex flex-col gap-4">
            {[
              { icon: 'stethoscope', title: 'Consultație stomatologică completă', desc: 'Examinare cu medicul specialist — inclus gratuit' },
              { icon: 'scan-line', title: 'Tomografie dentară', desc: 'Imagine digitală completă a arcadelor dentare' },
              { icon: 'clipboard-list', title: 'Plan de tratament personalizat', desc: 'Recomandări clare și priorități de tratament' },
            ].map(item => (
              <div key={item.title} className="bg-white rounded-[18px] p-5 flex items-center gap-4 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                  <Icon icon={`lucide:${item.icon}`} className="text-white text-xl" />
                </div>
                <div>
                  <p className="font-heading font-bold text-[16px] text-[#0E2338]">{item.title}</p>
                  <p className="text-[13px] text-gray-500 mt-0.5">{item.desc}</p>
                </div>
                <Icon icon="lucide:check-circle" className="text-accent text-xl ml-auto flex-shrink-0" />
              </div>
            ))}

            {/* Fără costuri */}
            <div className="bg-accent/10 rounded-[18px] p-5 flex items-center gap-3">
              <Icon icon="lucide:shield-check" className="text-accent text-2xl flex-shrink-0" />
              <p className="text-[15px] text-[#0E2338]">
                Toate acestea <strong>fără costuri</strong> adiționale pe tot parcursul evenimentului.
              </p>
            </div>
          </div>

          {/* Dreapta — card bleumarin cu lista medicilor + CTA */}
          <div className="lg:w-[340px] bg-[#0E2338] rounded-[24px] p-8 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center mb-5">
                <Icon icon="lucide:user-round-check" className="text-white text-xl" />
              </div>
              <p className="font-heading font-bold text-white text-[20px] mb-5">Medicii noștri îți vor explica clar:</p>
              <ul className="flex flex-col gap-4">
                {[
                  { icon: 'activity', text: 'starea actuală a dinților tăi' },
                  { icon: 'clipboard-plus', text: 'ce tratamente sunt necesare' },
                  { icon: 'smile', text: 'ce opțiuni ai pentru un zâmbet sănătos' },
                ].map(item => (
                  <li key={item.text} className="flex items-center gap-3 text-[14px] text-white/80">
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                      <Icon icon={`lucide:${item.icon}`} className="text-accent text-base" />
                    </div>
                    {item.text}
                  </li>
                ))}
              </ul>
            </div>
            <button
              onClick={onRegister}
              className="mt-8 w-full inline-flex justify-center items-center gap-2 bg-accent text-white font-heading font-bold text-[15px] px-8 py-4 rounded-[50px] hover:bg-[#A30B37] hover:scale-105 transition-all duration-300 shadow-lg"
            >
              Rezervă locul gratuit <Icon icon="lucide:arrow-right" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── CHECKUP SERVICES ─────────────────────────────────────────────────────────

function CheckupServices({ onRegister }: { onRegister: () => void }) {
  return (
    <section id="checkup" className="bg-white py-20 md:py-24 relative overflow-hidden">
      <div className="absolute right-0 top-0 w-[300px] h-[300px] bg-[#E6E5EC] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute left-0 bottom-0 w-[200px] h-[200px] bg-[#E6E5EC]/60 rounded-full -translate-x-1/2 translate-y-1/2 pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 relative z-10">
        <div className="max-w-[640px] mx-auto text-center mb-14">
          <div className="text-accent text-[13px] font-bold uppercase tracking-[2px] mb-3">Inclus în Open Week</div>
          <h2 className="font-heading font-bold text-3xl md:text-[40px] text-[#0E2338] leading-tight mb-4">Check-up Dental Complet</h2>
          <p className="text-[16px] text-gray-500">Tot ce ai nevoie pentru a cunoaște starea sănătății tale dentare — într-o singură vizită</p>
        </div>

        <div className="bg-accent rounded-[24px] p-8 md:p-12 mb-10 flex flex-col md:flex-row items-center gap-8 shadow-lg">
          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-white/20 text-white text-[12px] font-bold uppercase tracking-wider px-4 py-1.5 rounded-full mb-4">
              <Icon icon="lucide:star" /> Cel mai solicitat serviciu
            </div>
            <h3 className="font-heading font-bold text-[28px] md:text-[36px] text-white leading-tight mb-3">
              CHECK-UP DENTAL<br />GRATUIT
            </h3>
            <p className="text-white/80 text-[16px] mb-6 max-w-[400px]">Consultații de toate tipurile, radiografie și plan de tratament personalizat — totul gratuit pentru participanții Open Week</p>
            <button
              onClick={onRegister}
              className="inline-flex items-center gap-2 bg-white text-accent font-heading font-bold text-[15px] px-8 py-3.5 rounded-[50px] hover:bg-gray-50 hover:scale-105 transition-all duration-300 shadow-md"
            >
              Rezervă acum <Icon icon="lucide:arrow-right" />
            </button>
          </div>
          <div className="flex-shrink-0">
            <div className="w-[200px] h-[200px] md:w-[260px] md:h-[260px] rounded-[20px] overflow-hidden shadow-2xl relative">
              <img
                src="/Poze landing/Poze landing/871A3847.jpg"
                alt="MY DENTAL CLINIC — pacient zâmbind"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-3 left-3 right-3 bg-white/20 backdrop-blur-sm rounded-[10px] px-3 py-2 flex items-center gap-2">
                <Icon icon="lucide:shield-check" className="text-white text-lg flex-shrink-0" />
                <span className="text-white font-bold text-[13px]">100% Gratuit · Open Week</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {CHECKUP_SERVICES.map((s) => (
            <div key={s.title} className="bg-gray-50 rounded-[16px] p-6 flex items-start gap-4 hover:shadow-sm transition-all duration-300">
              <div className="w-11 h-11 rounded-[10px] bg-accent/10 text-accent flex items-center justify-center flex-shrink-0">
                <Icon icon={`lucide:${s.icon}`} className="text-xl" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-[15px] text-[#0E2338] mb-1">{s.title}</h4>
                <p className="text-[13px] text-gray-500 leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <p className="text-[14px] text-gray-500 flex items-center justify-center gap-2">
            <Icon icon="lucide:info" className="text-accent" />
            Dacă în urma consultației dorești albire sau igienizare — le putem efectua imediat, cu plată în ziua evenimentului
          </p>
        </div>
      </div>
    </section>
  )
}

// ─── TOMBOLA & CADOURI ────────────────────────────────────────────────────────

function TombolaCadouri({ onRegister }: { onRegister: () => void }) {
  return (
    <section className="bg-gray-50 py-20 md:py-24">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="max-w-[700px] mx-auto text-center mb-14">
          <div className="text-accent text-[13px] font-bold uppercase tracking-[2px] mb-3">Participi automat la tombolă</div>
          <h2 className="font-heading font-bold text-3xl md:text-[40px] text-[#0E2338] leading-tight mb-4">Tombolă & Surprize pentru Copii</h2>
          <p className="text-[16px] text-gray-500">Toți pacienții care participă la Open Week intră automat în tombola specială</p>
        </div>
        <div className="flex flex-col lg:flex-row gap-10 items-start">
          <div className="flex-1">
            {/* Premii tombola */}
            <div className="mb-6">
              <p className="text-[13px] font-bold uppercase tracking-[2px] text-gray-400 mb-4">Poți câștiga:</p>
              <div className="flex flex-col gap-4">
                {TOMBOLA_PRIZES.map((prize) => (
                  <div key={prize.text} className={`rounded-[16px] p-5 flex items-center gap-4 ${prize.highlight ? 'bg-[#0E2338] shadow-lg' : 'bg-white shadow-sm'}`}>
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${prize.highlight ? 'bg-accent' : 'bg-[#E6E5EC]'}`}>
                      <Icon icon={`lucide:${prize.icon}`} className={`text-xl ${prize.highlight ? 'text-white' : 'text-accent'}`} />
                    </div>
                    <span className={`font-heading font-bold text-[17px] ${prize.highlight ? 'text-white' : 'text-[#0E2338]'}`}>{prize.text}</span>
                    {prize.highlight && <span className="ml-auto text-[11px] bg-accent/30 text-white font-bold px-2 py-0.5 rounded-full">MARELE PREMIU</span>}
                  </div>
                ))}
              </div>
            </div>
            {/* Copii */}
            <div className="bg-[#0E2338] rounded-[20px] p-6 flex items-start gap-4 mb-8">
              <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                <Icon icon="lucide:gift" className="text-white text-2xl" />
              </div>
              <div>
                <p className="font-heading font-bold text-[18px] text-white mb-1">Surprize pentru copii</p>
                <p className="text-[14px] text-white/70 leading-relaxed">Toți copiii care vin la consultație în perioada Open Week vor primi <strong className="text-white">cadouri speciale</strong> după vizită.</p>
              </div>
            </div>
            <div className="bg-[#0E2338] rounded-[20px] p-7 text-center">
              <p className="text-white font-heading font-bold text-[18px] mb-2">Înscrie-te și participi automat!</p>
              <p className="text-white/60 text-[14px] mb-5">Este șansa ta să câștigi un tratament stomatologic important pentru zâmbetul tău</p>
              <button
                onClick={onRegister}
                className="inline-flex items-center gap-2 bg-accent text-white font-heading font-bold text-[16px] px-10 py-3.5 rounded-[50px] hover:bg-[#A30B37] hover:scale-105 transition-all duration-300"
              >
                Vreau să particip <Icon icon="lucide:arrow-right" className="ml-1" />
              </button>
            </div>
          </div>
          <div className="lg:w-[380px] flex-shrink-0">
            <img
              src="/open-week-macheta-4-copii.png"
              alt="Open Week MY DENTAL CLINIC — Tombolă & Copii"
              className="w-full rounded-[24px] shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── PROMO GALLERY — 3 machete side by side ──────────────────────────────────

function PromoGallery() {
  const posters = [
    { src: '/open-week-macheta3-fata.png', alt: 'Open Week — check-up gratuit', label: 'Check-up & Beneficii' },
    { src: '/open-week-macheta2.png', alt: 'Open Week — servicii stomatologice', label: 'Toate Serviciile' },
    { src: '/open-week-macheta-4-copii.png', alt: 'Open Week — tombolă copii', label: 'Tombolă & Copii' },
  ]
  return (
    <section className="bg-[#0E2338] py-16 md:py-20">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="text-center mb-10">
          <div className="text-accent text-[13px] font-bold uppercase tracking-[2px] mb-3">Evenimentul lunii</div>
          <h2 className="font-heading font-bold text-2xl md:text-[32px] text-white leading-tight">Open Week · {OPEN_DAY.dateRange}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[960px] mx-auto">
          {posters.map((p) => (
            <div key={p.src} className="group relative rounded-[20px] overflow-hidden shadow-xl">
              <img
                src={p.src}
                alt={p.alt}
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <span className="absolute bottom-4 left-0 right-0 text-white text-[14px] font-bold text-center px-3">{p.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── SERVICES OPEN DAY ───────────────────────────────────────────────────────

function ServicesOpenDay({ onRegister }: { onRegister: () => void }) {
  const reasons = [
    { icon: 'stethoscope', text: 'Consultație gratuită cu medic specialist' },
    { icon: 'scan-line', text: 'Tomografie dentară gratuită' },
    { icon: 'clipboard-list', text: 'Plan de tratament personalizat' },
    { icon: 'trophy', text: 'Posibilitatea de a câștiga premii' },
    { icon: 'gift', text: 'Cadouri pentru copii' },
    { icon: 'clock', text: 'Locuri limitate – eveniment organizat pentru o perioadă scurtă' },
  ]
  return (
    <section id="servicii" className="bg-white py-20 md:py-24">
      <div className="max-w-[1100px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Stânga — De ce să participi */}
          <div className="flex-1">
            <div className="text-accent text-[13px] font-bold uppercase tracking-[2px] mb-3">De ce să participi</div>
            <h2 className="font-heading font-bold text-3xl md:text-[40px] text-[#0E2338] leading-tight mb-8">
              De ce merită să vii la Open Week
            </h2>
            <div className="flex flex-col gap-4 mb-10">
              {reasons.map((r) => (
                <div key={r.text} className="flex items-center gap-4 bg-gray-50 rounded-[14px] px-5 py-4 hover:shadow-sm transition-all duration-300">
                  <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                    <Icon icon={`lucide:${r.icon}`} className="text-white text-base" />
                  </div>
                  <span className="text-[15px] font-medium text-[#0E2338]">{r.text}</span>
                </div>
              ))}
            </div>
            <button
              onClick={onRegister}
              className="inline-flex items-center gap-2 bg-accent text-white font-heading font-bold text-[16px] px-12 py-4 rounded-[50px] hover:bg-[#A30B37] hover:scale-105 transition-all duration-300 shadow-lg"
            >
              Vreau să mă înscriu la Open Week <Icon icon="lucide:arrow-right" className="ml-1" />
            </button>
          </div>
          {/* Dreapta — macheta */}
          <div className="lg:w-[460px] flex-shrink-0 rounded-[20px] overflow-hidden shadow-xl sticky top-[110px]">
            <img
              src="/open-week-macheta2.png"
              alt="Open Week MY DENTAL CLINIC — toate serviciile stomatologice"
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── DOCTORS — galerie masonry ────────────────────────────────────────────────

function Doctors() {
  const [lightbox, setLightbox] = useState<string | null>(null)
  return (
    <section id="echipa" className="bg-gray-50 py-20 md:py-24">
      {lightbox && (
        <div
          className="fixed inset-0 z-[300] flex items-center justify-center bg-black/85 backdrop-blur-sm p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/40 transition-colors"
            onClick={() => setLightbox(null)}
          >
            <Icon icon="lucide:x" className="text-xl" />
          </button>
          <img
            src={lightbox}
            alt="Echipa MY DENTAL CLINIC"
            className="max-w-full max-h-[90vh] rounded-[16px] object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="max-w-[600px] mx-auto text-center mb-14">
          <div className="text-accent text-[13px] font-bold uppercase tracking-[2px] mb-3">Echipa noastră</div>
          <h2 className="font-heading font-bold text-3xl md:text-[40px] text-[#0E2338] leading-tight mb-4">Specialiștii tăi la Open Week</h2>
          <p className="text-[16px] text-gray-500">Profesioniști certificați, permanent la curent cu tehnicile stomatologice moderne</p>
        </div>
        <div className="columns-2 md:columns-3 lg:columns-4 gap-3 md:gap-4 mb-12">
          {TEAM_PHOTOS.map((src, i) => (
            <div
              key={i}
              onClick={() => setLightbox(src)}
              className="group relative mb-3 md:mb-4 overflow-hidden rounded-[12px] cursor-pointer break-inside-avoid"
            >
              <img
                src={src}
                alt={`Specialist MY DENTAL CLINIC ${i + 1}`}
                loading="lazy"
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                <Icon icon="lucide:zoom-in" className="text-white text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-[960px] mx-auto">
          {[
            { icon: 'lucide:users', val: '12', label: 'Medici la Open Week' },
            { icon: 'lucide:award', val: '15 ani', label: 'Experiență medie' },
            { icon: 'lucide:globe', val: '8 țări', label: 'Training internațional' },
            { icon: 'lucide:graduation-cap', val: '20+', label: 'Certificări obținute' },
          ].map(stat => (
            <div key={stat.label} className="bg-white rounded-[16px] p-5 text-center shadow-sm">
              <Icon icon={stat.icon} className="text-accent text-2xl mx-auto mb-2" />
              <div className="font-heading font-bold text-[22px] text-[#0E2338]">{stat.val}</div>
              <div className="text-[12px] text-gray-400 mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── VIDEO PROMO ──────────────────────────────────────────────────────────────

function VideoPromo({ onRegister }: { onRegister: () => void }) {
  const REELS = [
    'https://www.instagram.com/reel/DVjLdTlAaMo/',
    'https://www.instagram.com/reel/DVjLdTlAaMo/',
    'https://www.instagram.com/reel/DVjLdTlAaMo/',
  ]

  useEffect(() => {
    const existingScript = document.querySelector('script[src*="instagram.com/embed"]')
    if (!existingScript) {
      const script = document.createElement('script')
      script.src = 'https://www.instagram.com/embed.js'
      script.async = true
      script.onload = () => {
        if ((window as any).instgrm?.Embeds?.process) (window as any).instgrm.Embeds.process()
      }
      document.body.appendChild(script)
    } else {
      setTimeout(() => {
        if ((window as any).instgrm?.Embeds?.process) (window as any).instgrm.Embeds.process()
      }, 300)
    }
  }, [])

  return (
    <section className="bg-white py-20 md:py-24">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="max-w-[600px] mx-auto text-center mb-14">
          <div className="text-accent text-[13px] font-bold uppercase tracking-[2px] mb-3">Pe Instagram</div>
          <h2 className="font-heading font-bold text-3xl md:text-[40px] text-[#0E2338] leading-tight mb-4">
            Descoperă clinica din interior
          </h2>
          <p className="text-[16px] text-gray-500">Urmărește-ne pentru a vedea atmosfera, procedurile și echipa noastră</p>
        </div>
        <div className="flex flex-col md:flex-row gap-6 justify-center items-start max-w-[1100px] mx-auto">
          {REELS.map((url, i) => (
            <div key={i} className="flex-1 min-w-0 max-w-[340px] mx-auto w-full">
              <blockquote
                className="instagram-media"
                data-instgrm-permalink={url}
                data-instgrm-version="14"
                style={{ background: '#FFF', border: '0', borderRadius: '20px', boxShadow: '0 4px 24px rgba(0,0,0,0.08)', margin: '0', maxWidth: '100%', minWidth: '100%', padding: '0', width: '100%' }}
              >
                <div className="flex flex-col items-center justify-center h-[500px] gap-3 bg-gray-50 rounded-[20px]">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#f09433] via-[#dc2743] to-[#bc1888] flex items-center justify-center">
                    <Icon icon="mdi:instagram" className="text-white text-3xl" />
                  </div>
                  <p className="text-[14px] text-gray-400 font-medium animate-pulse">Se încarcă reelul…</p>
                </div>
              </blockquote>
            </div>
          ))}
        </div>
        <div className="text-center mt-10 flex flex-wrap justify-center gap-4">
          <a
            href="https://www.instagram.com/mydentalclinic.md/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#E6E5EC] text-[#0E2338] font-heading font-bold text-[15px] px-8 py-3.5 rounded-[50px] hover:bg-[#CCCCCC] transition-all duration-300"
          >
            <Icon icon="mdi:instagram" className="text-lg" /> Urmărește pe Instagram
          </a>
          <button
            onClick={onRegister}
            className="inline-flex items-center gap-2 bg-accent text-white font-heading font-bold text-[15px] px-8 py-3.5 rounded-[50px] hover:bg-[#A30B37] hover:scale-105 hover:shadow-lg transition-all duration-300"
          >
            Rezervă loc Open Week <Icon icon="lucide:arrow-right" className="ml-1" />
          </button>
        </div>
      </div>
    </section>
  )
}

// ─── COUNTDOWN BANNER ─────────────────────────────────────────────────────────

function CountdownBanner({ onRegister }: { onRegister: () => void }) {
  return (
    <div className="bg-[#0E2338] border-y border-white/10 py-10">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 bg-accent/20 text-accent text-[12px] font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-2">
            <Icon icon="lucide:timer" /> Locuri limitate
          </div>
          <p className="text-white font-heading font-bold text-[20px]">{OPEN_DAY.dateRange} · {OPEN_DAY.time}</p>
          <p className="text-white/50 text-[13px] mt-0.5">{OPEN_DAY.address}</p>
        </div>
        <CountdownWidget />
        <button
          onClick={onRegister}
          className="flex-shrink-0 bg-accent text-white font-heading font-bold text-[15px] px-8 py-3.5 rounded-[50px] hover:bg-[#A30B37] hover:scale-105 transition-all duration-300 shadow-md"
        >
          Rezervă locul →
        </button>
      </div>
    </div>
  )
}

// ─── 10 REASONS ───────────────────────────────────────────────────────────────

function Reasons({ onRegister }: { onRegister: () => void }) {
  return (
    <section className="bg-gray-50 py-20 md:py-24">
      <div className="max-w-[1100px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="text-center mb-10">
          <div className="text-accent text-[13px] font-bold uppercase tracking-[2px] mb-3">De ce noi</div>
          <h2 className="font-heading font-bold text-3xl md:text-[40px] text-[#0E2338] leading-tight">
            10 motive să alegi MY DENTAL CLINIC
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-2 gap-3 mb-10">
          {REASONS.map((r) => (
            <div key={r.text} className="bg-white rounded-[14px] p-4 shadow-sm flex items-center gap-3 hover:shadow-md transition-all duration-300">
              <div className="w-9 h-9 rounded-full bg-[#E6E5EC] text-accent flex items-center justify-center flex-shrink-0">
                <Icon icon={`lucide:${r.icon}`} className="text-base" />
              </div>
              <span className="text-[13px] font-medium text-[#0E2338] leading-snug">{r.text}</span>
            </div>
          ))}
        </div>
        <div className="flex justify-center">
          <button
            onClick={onRegister}
            className="inline-flex items-center gap-2 bg-accent text-white font-heading font-bold text-[16px] px-12 py-4 rounded-[50px] hover:bg-[#A30B37] hover:scale-105 hover:shadow-lg transition-all duration-300"
          >
            Vreau la Open Week <Icon icon="lucide:arrow-right" className="ml-1" />
          </button>
        </div>
      </div>
    </section>
  )
}

// ─── GALERIE ATMOSFERA ────────────────────────────────────────────────────────

function GalerieAtmosfera({ onRegister }: { onRegister: () => void }) {
  const [lightbox, setLightbox] = useState<string | null>(null)
  return (
    <section className="bg-white py-20 md:py-24">
      {lightbox && (
        <div
          className="fixed inset-0 z-[300] flex items-center justify-center bg-black/85 backdrop-blur-sm p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/40 transition-colors"
            onClick={() => setLightbox(null)}
          >
            <Icon icon="lucide:x" className="text-xl" />
          </button>
          <img
            src={lightbox}
            alt="Fotografie MY DENTAL CLINIC"
            className="max-w-full max-h-[90vh] rounded-[16px] object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="max-w-[600px] mx-auto text-center mb-14">
          <div className="text-accent text-[13px] font-bold uppercase tracking-[2px] mb-3">Din cabinet</div>
          <h2 className="font-heading font-bold text-3xl md:text-[38px] text-[#0E2338] leading-tight mb-4">Atmosfera MY DENTAL CLINIC</h2>
          <p className="text-[15px] text-gray-500">Echipamente moderne, spații prietenoase, medici dedicați</p>
        </div>
        <div className="columns-2 md:columns-3 lg:columns-4 gap-3 md:gap-4 mb-12">
          {GALLERY_PHOTOS.map((src, i) => (
            <div
              key={i}
              onClick={() => setLightbox(src)}
              className="group relative mb-3 md:mb-4 overflow-hidden rounded-[12px] cursor-pointer break-inside-avoid"
            >
              <img
                src={src}
                alt={`MY DENTAL CLINIC — fotografie ${i + 1}`}
                loading="lazy"
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                <Icon icon="lucide:zoom-in" className="text-white text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
          ))}
        </div>
        <div className="text-center">
          <button
            onClick={onRegister}
            className="inline-flex items-center gap-2 bg-accent text-white font-heading font-bold text-[16px] px-12 py-4 rounded-[50px] hover:bg-[#A30B37] hover:scale-105 hover:shadow-lg transition-all duration-300"
          >
            Vreau să mă înscriu la Open Week <Icon icon="lucide:arrow-right" className="ml-1" />
          </button>
        </div>
      </div>
    </section>
  )
}

// ─── CONTACT & MAP ────────────────────────────────────────────────────────────

function Contact({ onRegister }: { onRegister: () => void }) {
  return (
    <section id="contact" className="bg-gray-50 py-20 md:py-24">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="max-w-[600px] mx-auto text-center mb-14">
          <div className="text-accent text-[13px] font-bold uppercase tracking-[2px] mb-3">Locație & Contact</div>
          <h2 className="font-heading font-bold text-3xl md:text-[40px] text-[#0E2338] leading-tight mb-4">Ne găsești ușor</h2>
        </div>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Google Maps embed — MY DENTAL CLINIC */}
          <div className="flex-1 min-h-[400px] rounded-[20px] overflow-hidden shadow-sm">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2720.5!2d28.8449!3d47.0245!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x1cf6134fc8b26b72!2sMy%20Dental%20Clinic!5e0!3m2!1sro!2smd!4v1710000000000!5m2!1sro!2smd"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '400px' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="MY DENTAL CLINIC — Google Maps"
            />
          </div>
          {/* Info + CTA */}
          <div className="flex-1 flex flex-col gap-6">
            <div className="bg-white rounded-[20px] p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <img src="/logo orizontal 1-01 (1).svg" alt="MY DENTAL CLINIC" className="h-[92px] w-auto" />
              </div>
              <ul className="space-y-3 text-[14px] text-[#0E2338] mb-6">
                <li className="flex items-start gap-3"><Icon icon="lucide:map-pin" className="text-accent mt-1 flex-shrink-0" /><span>str. Constantin Brâncuși 112, Chișinău MD-2060</span></li>
                <li className="flex items-center gap-3"><Icon icon="lucide:phone" className="text-accent flex-shrink-0" /><a href={`tel:${OPEN_DAY.phone.replace(/\s/g,'')}`} className="hover:text-accent font-medium">+373 {OPEN_DAY.phone}</a></li>
                <li className="flex items-center gap-3"><Icon icon="lucide:mail" className="text-accent flex-shrink-0" /><a href="mailto:contact@mydentalclinic.md" className="hover:text-accent font-medium">contact@mydentalclinic.md</a></li>
              </ul>
              <div className="border-t border-gray-100 pt-5 mb-5">
                <div className="text-[11px] text-gray-400 uppercase tracking-wide font-bold mb-3">Program Open Week</div>
                <div className="flex justify-between text-[14px]">
                  <span className="text-[#0E2338]">{OPEN_DAY.dateRange}</span>
                  <span className="font-bold text-accent">{OPEN_DAY.time}</span>
                </div>
              </div>
              <div className="flex gap-3">
                <a href="https://www.instagram.com/mydentalclinic.md/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-accent hover:text-white transition-colors"><Icon icon="lucide:instagram" /></a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-accent hover:text-white transition-colors"><Icon icon="lucide:facebook" /></a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-accent hover:text-white transition-colors"><Icon icon="simple-icons:tiktok" /></a>
              </div>
            </div>
            <button
              onClick={onRegister}
              className="w-full bg-accent text-white font-heading font-bold text-[16px] py-4 rounded-[16px] hover:bg-[#A30B37] hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Icon icon="lucide:calendar-check" /> Înscrie-te la Open Week — {OPEN_DAY.dateRange}
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
    <footer className="bg-[#0E2338]">
      <div className="max-w-[1440px] mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <img src="/logo orizontal 1-01 (1).svg" alt="MY DENTAL CLINIC" className="h-[92px] w-auto brightness-0 invert opacity-90" />
          <div className="text-[13px] text-gray-500 text-center md:text-left">© 2026 MY DENTAL CLINIC · Toate drepturile rezervate</div>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-[12px] text-gray-500">
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-all">Politica de confidențialitate</a>
            <a href="#" className="hover:text-white transition-all">GDPR</a>
          </div>
          <a href="https://business.easyreserv.io" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
            Dezvoltat de <span className="text-gray-300 font-medium hover:text-white">EasyReserv.io</span>
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
    <div className="min-h-screen font-sans text-gray-800 bg-white">
      {showModal && <RegisterModal onClose={closeRegister} />}
      <Navbar onRegister={openRegister} />
      <main>
        <Hero onRegister={openRegister} />
        <DespreEveniment />
        <StatsBanner />
        <FreeBenefits onRegister={openRegister} />
        <CheckupServices onRegister={openRegister} />
        <TombolaCadouri onRegister={openRegister} />
        <PromoGallery />
        <CountdownBanner onRegister={openRegister} />
        <ServicesOpenDay onRegister={openRegister} />
        <Doctors />
        <VideoPromo onRegister={openRegister} />
        <Reasons onRegister={openRegister} />
        <GalerieAtmosfera onRegister={openRegister} />
        <Contact onRegister={openRegister} />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  )
}
