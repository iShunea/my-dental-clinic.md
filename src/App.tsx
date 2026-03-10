import { useState, useEffect, useCallback, useRef } from 'react'
import { Icon } from '@iconify/react'

// ─── DATA ────────────────────────────────────────────────────────────────────

const OPEN_DAY = {
  date: '19 aprilie 2026',
  dateShort: '19 APR',
  year: '2026',
  time: '09:00 – 18:00',
  address: 'str. Constantin Brâncuși 112, Chișinău',
  phone: '076 588 884',
  spotsLeft: 12,
  // Data evenimentului pentru countdown
  eventDate: new Date('2026-04-19T09:00:00'),
}

const FREE_BENEFITS = [
  { num: '1', title: 'Radiografie panoramică', desc: 'Vedere completă a arcadelor dentare în format digital — inclus gratuit în ziua evenimentului', icon: 'scan-line', img: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=600&q=80' },
  { num: '2', title: 'Consultație stomatologică', desc: 'Examinare completă cu medicul specialist și identificarea problemelor dentare', icon: 'stethoscope', img: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600&q=80' },
  { num: '3', title: 'Plan de tratament', desc: 'Plan personalizat cu priorități clare, fără obligații', icon: 'clipboard-list', img: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&q=80' },
]

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
  { name: 'Maria C., 34 ani', text: 'Am venit cu multă teamă la prima vizită, dar echipa My Dental Clinic m-a făcut să mă simt în siguranță. Acum vin cu plăcere!', source: 'Google' },
  { name: 'Alexandru T., 42 ani', text: 'Cel mai profesionist cabinet din Chișinău. Tehnologie impresionantă și medici cu adevărat empatici. Recomand cu încredere.', source: 'Google' },
  { name: 'Natalia P., mamă', text: 'La Open Day-ul de anul trecut am obținut un plan complet de tratament gratuit. Economie reală și sfaturi extrem de valoroase!', source: 'Facebook' },
  { name: 'Victor M., 51 ani', text: 'Am primit implantul în aceeași zi. Procedura a durat sub o oră și nu am simțit nicio durere. Rezultatul este impecabil.', source: 'Google' },
  { name: 'Elena D., 28 ani', text: 'Aparatele dentare montate de Dr. Ciobanu au schimbat totul. Personal atent, programări rapide, rezultate vizibile din prima lună.', source: 'Google' },
  { name: 'Sergiu B., 45 ani', text: 'Am venit de urgență cu o durere insuportabilă. M-au primit imediat, m-au tratat profesionist și fără stres. Mulțumesc enorm!', source: 'Facebook' },
  { name: 'Irina L., 39 ani', text: 'Fațetele ceramice arată fantastic. Zâmbesc mult mai mult acum și nu îmi vine să cred că a durat doar 2 ședințe.', source: 'Google' },
  { name: 'Dumitru F., 62 ani', text: 'La vârsta mea eram sceptic față de implanturi. Dar Dr. Popescu m-a convins și m-a ghidat pas cu pas. Nu regret deloc.', source: 'Google' },
  { name: 'Ioana M., 31 ani', text: 'Copilul meu de 7 ani a venit zâmbind la vizite datorită Dr. Botnaru. O minune de medic, cu răbdare nesfârșită.', source: 'Facebook' },
  { name: 'Andrei K., 37 ani', text: 'Albirea profesională a depășit toate așteptările. Cabinet modern, personal amabil, echipă dedicată. Revin cu drag.', source: 'Google' },
  { name: 'Valentina G., 55 ani', text: 'Sufer de frică dentară de 20 de ani. Echipa My Dental Clinic este prima cu care m-am simțit cu adevărat relaxată.', source: 'Google' },
  { name: 'Mihai S., 48 ani', text: 'Radiografia panoramică gratuită de la Open Day mi-a arătat 3 probleme pe care nu le știam. Am economisit mult intervenind la timp.', source: 'Facebook' },
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
      className="fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full bg-accent text-white shadow-lg flex items-center justify-center hover:bg-[#8A092E] hover:scale-110 transition-all duration-300"
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
              className={`w-full text-left px-4 py-2.5 text-[14px] transition-colors hover:bg-red-50 hover:text-accent ${value === opt ? 'text-accent font-medium bg-red-50' : 'text-gray-700'}`}
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
        <h3 className="font-heading font-bold text-[22px] text-gray-900 mb-1">Open Day — {OPEN_DAY.date}</h3>
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
          <button type="submit" className="w-full bg-accent text-white font-heading font-medium text-[16px] py-3.5 rounded-[8px] hover:bg-[#8A092E] transition-colors mt-1">
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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 shadow-sm h-20">
      <div className="max-w-[1440px] mx-auto px-6 h-full flex items-center justify-between">
        <a href="#" className="flex items-center gap-3 group">
          <svg width="32" height="24" viewBox="0 0 40 30" fill="none" className="text-accent group-hover:scale-105 transition-transform">
            <path d="M4 8 Q20 28 36 8" stroke="currentColor" strokeWidth="6" strokeLinecap="round" fill="transparent" />
          </svg>
          <span className="font-heading font-bold text-xl tracking-tight text-gray-900 lowercase mt-1">my dental clinic</span>
        </a>
        <div className="hidden md:flex items-center gap-8">
          <a href="#beneficii" className="text-[14px] font-medium text-gray-600 hover:text-accent transition-colors">Beneficii gratuite</a>
          <a href="#checkup" className="text-[14px] font-medium text-gray-600 hover:text-accent transition-colors">Check-up</a>
          <a href="#servicii" className="text-[14px] font-medium text-gray-600 hover:text-accent transition-colors">Servicii</a>
          <a href="#echipa" className="text-[14px] font-medium text-gray-600 hover:text-accent transition-colors">Echipa</a>
          <a href="#contact" className="text-[14px] font-medium text-gray-600 hover:text-accent transition-colors">Contact</a>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={onRegister} className="hidden sm:inline-block bg-accent text-white font-medium text-[14px] px-6 py-2.5 rounded-[8px] hover:bg-[#8A092E] transition-colors shadow-sm">
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
    <div className="flex items-center gap-2">
      {units.map(({ val, label }, i) => (
        <div key={label} className="flex items-center gap-2">
          <div className="flex flex-col items-center">
            <div className="bg-accent text-white font-heading font-bold text-[22px] md:text-[28px] w-[56px] md:w-[68px] h-[52px] md:h-[64px] rounded-[10px] flex items-center justify-center leading-none tabular-nums shadow-md">
              {String(val).padStart(2, '0')}
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mt-1">{label}</span>
          </div>
          {i < 3 && <span className="text-accent font-bold text-[20px] mb-4 leading-none">:</span>}
        </div>
      ))}
    </div>
  )
}

// ─── HERO ─────────────────────────────────────────────────────────────────────

function Hero({ onRegister }: { onRegister: () => void }) {
  return (
    <header className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden bg-white">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-red-50 rounded-full -translate-y-1/3 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-red-50/60 rounded-full translate-y-1/2 -translate-x-1/3 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/3 rounded-full pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left content */}
          <div className="w-full lg:w-[55%] flex flex-col items-start">

            <h1 className="font-heading font-bold text-4xl md:text-[60px] leading-[1.05] text-gray-900 max-w-[580px] mb-4 tracking-tight">
              OPEN WEEK<br />
              <span className="text-accent">My Dental Clinic</span>
            </h1>
            <div className="flex flex-wrap gap-4 mb-6">
              <span className="flex items-center gap-2 text-gray-600 text-[15px]">
                <Icon icon="lucide:map-pin" className="text-accent" /> {OPEN_DAY.address}
              </span>
              <span className="flex items-center gap-2 text-gray-600 text-[15px]">
                <Icon icon="lucide:calendar" className="text-accent" /> {OPEN_DAY.date}
              </span>
              <span className="flex items-center gap-2 text-gray-600 text-[15px]">
                <Icon icon="lucide:clock" className="text-accent" /> {OPEN_DAY.time}
              </span>
            </div>
            <p className="text-[16px] text-gray-500 max-w-[480px] mb-8 leading-relaxed">
              Implanturi · Coroane & Fațete · Tratamente copii · Estetică dentară — toate sub același acoperiș
            </p>

            {/* Free badges */}
            <div className="flex flex-wrap gap-3 mb-6">
              <span className="inline-flex items-center gap-2 bg-red-50 border border-accent/20 text-accent text-[13px] font-medium px-4 py-2 rounded-full">
                <Icon icon="lucide:gift" /> Consultație Gratuită
              </span>
              <span className="inline-flex items-center gap-2 bg-red-50 border border-accent/20 text-accent text-[13px] font-medium px-4 py-2 rounded-full">
                <Icon icon="lucide:gift" /> Radiografie Gratuită
              </span>
              <span className="inline-flex items-center gap-2 bg-red-50 border border-accent/20 text-accent text-[13px] font-medium px-4 py-2 rounded-full">
                <Icon icon="lucide:gift" /> Plan de Tratament Gratuit
              </span>
            </div>

            {/* Countdown */}
            <div className="mb-8">
              <p className="text-[13px] font-bold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Icon icon="lucide:timer" className="text-accent" /> Evenimentul începe în:
              </p>
              <CountdownWidget />
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <button
                onClick={onRegister}
                className="inline-flex justify-center items-center bg-accent text-white font-heading font-bold text-[16px] px-10 py-4 rounded-[50px] hover:bg-[#8A092E] hover:scale-105 hover:shadow-lg transition-all duration-300"
              >
                Înscrie-te GRATUIT <Icon icon="lucide:arrow-right" className="ml-2" />
              </button>
              <a href={`tel:${OPEN_DAY.phone.replace(/\s/g,'')}`} className="text-gray-500 font-medium text-[15px] hover:text-accent transition-all flex items-center gap-2">
                <Icon icon="lucide:phone" className="text-accent" /> {OPEN_DAY.phone}
              </a>
            </div>

            <div className="mt-6 inline-flex items-center gap-2 bg-yellow-50 border border-yellow-300 text-yellow-700 text-[13px] font-bold px-4 py-2 rounded-full">
              <Icon icon="lucide:alert-triangle" /> Locurile sunt limitate! Au mai rămas doar {OPEN_DAY.spotsLeft} locuri
            </div>
          </div>

          {/* Right: calendar card + hero image */}
          <div className="w-full lg:w-[45%] flex flex-col gap-4 items-center">
            <div className="w-full max-w-[420px] h-[220px] rounded-[20px] overflow-hidden shadow-xl relative">
              <img
                src="https://images.unsplash.com/photo-1629909615184-74f495363b67?w=840&q=80"
                alt="My Dental Clinic — cabinet modern"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-4 left-4 text-white text-[13px] font-medium flex items-center gap-2">
                <Icon icon="lucide:sparkles" className="text-accent" /> Cabinet modern · Tehnologie de top
              </div>
            </div>
            <div className="bg-white rounded-[24px] shadow-xl border border-gray-100 overflow-hidden max-w-[420px] w-full">
              {/* Calendar header */}
              <div className="bg-accent px-8 py-5 flex items-center justify-between">
                <span className="text-white/90 font-medium text-[14px] uppercase tracking-wide">Aprilie 2025</span>
                <Icon icon="lucide:calendar" className="text-white text-2xl" />
              </div>
              {/* Date display */}
              <div className="px-8 py-6 flex flex-col items-center border-b border-gray-100">
                <div className="flex items-end gap-2">
                  <div className="font-heading font-bold text-[96px] leading-none text-gray-900">{OPEN_DAY.dateShort.split(' ')[0]}</div>
                  <span className="text-accent font-bold text-[16px] mb-4">{OPEN_DAY.dateShort.split(' ')[1]}</span>
                </div>
                <div className="text-gray-500 text-[14px] font-medium mt-1">{OPEN_DAY.time}</div>
              </div>
              {/* Details */}
              <div className="px-8 py-5 flex flex-col gap-3">
                <div className="flex items-center gap-3 text-[14px] text-gray-700">
                  <Icon icon="lucide:map-pin" className="text-accent flex-shrink-0" />
                  <span>{OPEN_DAY.address}</span>
                </div>
                <div className="flex items-center gap-3 text-[14px] text-gray-700">
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

// ─── STATS BANNER ─────────────────────────────────────────────────────────────

function StatsBanner() {
  const stats = [
    { icon: 'users', val: '35.000+', label: 'Pacienți tratați' },
    { icon: 'building-2', val: '22', label: 'Cabinete' },
    { icon: 'user-check', val: '50', label: 'Medici calificați' },
    { icon: 'calendar', val: '160', label: 'Pacienți/zilnic' },
    { icon: 'hotel', val: '13', label: 'Camere hotel propriu' },
  ]
  return (
    <div className="bg-accent py-6">
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
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="max-w-[600px] mx-auto text-center mb-14">
          <div className="text-accent text-[13px] font-bold uppercase tracking-[2px] mb-3">Ce primești gratuit</div>
          <h2 className="font-heading font-bold text-3xl md:text-[40px] text-gray-900 leading-tight mb-4">3 servicii GRATUITE de Open Week</h2>
          <p className="text-[16px] text-gray-500">CHECK-UP DENTAL COMPLET — oferit gratuit în ziua evenimentului</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {FREE_BENEFITS.map((b) => (
            <div key={b.num} className="bg-white rounded-[20px] overflow-hidden shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
              <div className="relative h-44 overflow-hidden">
                <img src={b.img} alt={b.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <span className="absolute top-3 left-4 font-heading font-bold text-[56px] text-white/20 leading-none select-none">{b.num}</span>
                <div className="absolute bottom-3 left-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white">
                  <Icon icon={`lucide:${b.icon}`} className="text-xl" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-heading font-bold text-[18px] text-gray-900 mb-2">{b.title}</h3>
                <p className="text-[14px] text-gray-500 leading-relaxed">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center">
          <button
            onClick={onRegister}
            className="inline-flex items-center gap-2 bg-accent text-white font-heading font-bold text-[16px] px-12 py-4 rounded-[50px] hover:bg-[#8A092E] hover:scale-105 hover:shadow-lg transition-all duration-300"
          >
            <Icon icon="lucide:phone" /> Sună și PROGRAMEAZĂ-TE! {OPEN_DAY.phone}
          </button>
          <p className="text-[13px] text-gray-400 mt-3">Eveniment: {OPEN_DAY.date} · {OPEN_DAY.time}</p>
        </div>
      </div>
    </section>
  )
}

// ─── CHECKUP SERVICES ─────────────────────────────────────────────────────────

function CheckupServices({ onRegister }: { onRegister: () => void }) {
  return (
    <section id="checkup" className="bg-white py-20 md:py-24 relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute right-0 top-0 w-[300px] h-[300px] bg-red-50 rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute left-0 bottom-0 w-[200px] h-[200px] bg-red-50/60 rounded-full -translate-x-1/2 translate-y-1/2 pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 relative z-10">
        <div className="max-w-[640px] mx-auto text-center mb-14">
          <div className="text-accent text-[13px] font-bold uppercase tracking-[2px] mb-3">Inclus în Open Week</div>
          <h2 className="font-heading font-bold text-3xl md:text-[40px] text-gray-900 leading-tight mb-4">Check-up Dental Complet</h2>
          <p className="text-[16px] text-gray-500">Tot ce ai nevoie pentru a cunoaște starea sănătății tale dentare — într-o singură vizită</p>
        </div>

        {/* Big highlight banner */}
        <div className="bg-accent rounded-[24px] p-8 md:p-12 mb-10 flex flex-col md:flex-row items-center gap-8 shadow-lg">
          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-white/20 border border-white/30 text-white text-[12px] font-bold uppercase tracking-wider px-4 py-1.5 rounded-full mb-4">
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
            <div className="w-[200px] h-[200px] md:w-[240px] md:h-[240px] rounded-full bg-white/10 border-4 border-white/30 flex flex-col items-center justify-center text-center">
              <Icon icon="lucide:shield-check" className="text-white text-[48px] mb-2" />
              <div className="text-white font-heading font-bold text-[16px]">100%</div>
              <div className="text-white/80 text-[13px]">Gratuit</div>
              <div className="text-white/80 text-[13px]">Open Week</div>
            </div>
          </div>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {CHECKUP_SERVICES.map((s) => (
            <div key={s.title} className="bg-gray-50 rounded-[16px] p-6 border border-gray-100 flex items-start gap-4 hover:border-accent/30 hover:shadow-sm transition-all duration-300">
              <div className="w-11 h-11 rounded-[10px] bg-accent/10 text-accent flex items-center justify-center flex-shrink-0">
                <Icon icon={`lucide:${s.icon}`} className="text-xl" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-[15px] text-gray-900 mb-1">{s.title}</h4>
                <p className="text-[13px] text-gray-500 leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
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

const TOMBOLA_PRIZES = [
  { icon: 'sparkles', text: 'Albire profesională' },
  { icon: 'droplets', text: 'Igienizare dentară' },
  { icon: 'smile', text: 'Consultație estetică' },
  { icon: 'gift', text: 'Kit de îngrijire dentară' },
  { icon: 'star', text: 'Reducere la tratament' },
  { icon: 'package', text: 'Surprize speciale' },
]

function TombolaCadouri({ onRegister }: { onRegister: () => void }) {
  return (
    <section className="bg-gray-50 py-20 md:py-24">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="max-w-[700px] mx-auto text-center mb-14">
          <div className="text-accent text-[13px] font-bold uppercase tracking-[2px] mb-3">Nimeni nu face cadouri ca noi</div>
          <h2 className="font-heading font-bold text-3xl md:text-[40px] text-gray-900 leading-tight mb-4">Tombolă & Cadouri de Open Week</h2>
          <p className="text-[16px] text-gray-500">Fiecare participant are șansa să câștige. Cadouri surpriză pentru toți vizitatorii zilei!</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
          {TOMBOLA_PRIZES.map((prize) => (
            <div key={prize.text} className="bg-white border border-gray-100 rounded-[20px] p-6 flex flex-col items-center text-center gap-4 hover:border-accent/30 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
              <div className="w-14 h-14 rounded-full bg-red-50 text-accent flex items-center justify-center">
                <Icon icon={`lucide:${prize.icon}`} className="text-2xl" />
              </div>
              <span className="text-[15px] font-medium text-gray-800 leading-snug">{prize.text}</span>
            </div>
          ))}
        </div>
        <div className="max-w-[600px] mx-auto bg-white border-2 border-accent/20 rounded-[20px] p-8 text-center shadow-sm">
          <div className="w-16 h-16 rounded-full bg-red-50 text-accent flex items-center justify-center mx-auto mb-4">
            <Icon icon="lucide:gift" className="text-3xl" />
          </div>
          <p className="text-gray-900 font-heading font-bold text-[18px] mb-2">Înscrie-te și participi automat la tombolă!</p>
          <p className="text-gray-500 text-[14px] mb-6">Toți participanții înregistrați la Open Week intră în tragerea la sorți pentru cadouri speciale</p>
          <button
            onClick={onRegister}
            className="inline-flex items-center gap-2 bg-accent text-white font-heading font-bold text-[16px] px-10 py-3.5 rounded-[50px] hover:bg-[#8A092E] hover:scale-105 transition-all duration-300"
          >
            Vreau să particip <Icon icon="lucide:arrow-right" className="ml-1" />
          </button>
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
          <h2 className="font-heading font-bold text-3xl md:text-[40px] text-gray-900 leading-tight mb-4">Ce tratamente vei putea discuta la Open Day</h2>
          <p className="text-[16px] text-gray-500">Medicii noștri specialiști vor fi prezenți pentru consultații individuale și răspunsuri la orice întrebare</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {SERVICES_OPENDAY.map((s) => (
            <div key={s.title} className="bg-gray-50 rounded-[20px] p-8 border border-gray-100 hover:border-accent/20 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 rounded-full bg-red-50 text-accent flex items-center justify-center mb-5">
                <Icon icon={`lucide:${s.icon}`} className="text-2xl" />
              </div>
              <h3 className="font-heading font-bold text-[20px] text-gray-900 mb-2">{s.title}</h3>
              <p className="text-[14px] text-gray-500 mb-5">{s.desc}</p>
              <ul className="flex flex-col gap-2.5">
                {s.bullets.map(b => (
                  <li key={b} className="flex items-start gap-2.5 text-[14px] text-gray-700">
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
            className="inline-flex items-center gap-2 bg-accent text-white font-heading font-bold text-[16px] px-12 py-4 rounded-[50px] hover:bg-[#8A092E] hover:scale-105 transition-all duration-300"
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
  return (
    <section id="echipa" className="bg-gray-50 py-20 md:py-24">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="max-w-[600px] mx-auto text-center mb-14">
          <div className="text-accent text-[13px] font-bold uppercase tracking-[2px] mb-3">Echipa noastră</div>
          <h2 className="font-heading font-bold text-3xl md:text-[40px] text-gray-900 leading-tight mb-4">12 Specialiști la Open Week</h2>
          <p className="text-[16px] text-gray-500">Profesioniști certificați, permanent la curent cu tehnicile stomatologice moderne</p>
        </div>
        <div className="relative rounded-[24px] overflow-hidden shadow-xl max-w-[960px] mx-auto border border-gray-100">
          <img
            src="/photo_2026-03-10_16-48-25.jpg"
            alt="Echipa My Dental Clinic"
            className="w-full h-auto object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 flex flex-wrap gap-3">
            {['Stomatologie generală', 'Implanturi', 'Ortodonție', 'Chirurgie orală', 'Pedodonție', 'Estetică dentară'].map(spec => (
              <span key={spec} className="bg-white/20 backdrop-blur-sm border border-white/30 text-white text-[12px] font-medium px-3 py-1.5 rounded-full">
                {spec}
              </span>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 max-w-[960px] mx-auto">
          {[
            { icon: 'lucide:users', val: '12', label: 'Medici la Open Week' },
            { icon: 'lucide:award', val: '15 ani', label: 'Experiență medie' },
            { icon: 'lucide:globe', val: '8 țări', label: 'Training internațional' },
            { icon: 'lucide:graduation-cap', val: '20+', label: 'Certificări obținute' },
          ].map(stat => (
            <div key={stat.label} className="bg-white border border-gray-100 rounded-[16px] p-5 text-center shadow-sm">
              <Icon icon={stat.icon} className="text-accent text-2xl mx-auto mb-2" />
              <div className="font-heading font-bold text-[22px] text-gray-900">{stat.val}</div>
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
          <h2 className="font-heading font-bold text-3xl md:text-[40px] text-gray-900 leading-tight mb-4">
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
            className="inline-flex items-center gap-2 border-2 border-accent text-accent font-heading font-bold text-[15px] px-8 py-3.5 rounded-[50px] hover:bg-accent hover:text-white transition-all duration-300"
          >
            <Icon icon="mdi:instagram" className="text-lg" /> Urmărește pe Instagram
          </a>
          <button
            onClick={onRegister}
            className="inline-flex items-center gap-2 bg-accent text-white font-heading font-bold text-[15px] px-8 py-3.5 rounded-[50px] hover:bg-[#8A092E] hover:scale-105 hover:shadow-lg transition-all duration-300"
          >
            Rezervă loc Open Day <Icon icon="lucide:arrow-right" className="ml-1" />
          </button>
        </div>
      </div>
    </section>
  )
}

// ─── COUNTDOWN BANNER ─────────────────────────────────────────────────────────

function CountdownBanner({ onRegister }: { onRegister: () => void }) {
  return (
    <div className="bg-accent py-10">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <p className="text-white/80 text-[13px] font-bold uppercase tracking-wider mb-1">Timp rămas până la eveniment</p>
          <p className="text-white font-heading font-bold text-[20px]">{OPEN_DAY.date} · {OPEN_DAY.time}</p>
        </div>
        <CountdownWidget />
        <button
          onClick={onRegister}
          className="flex-shrink-0 bg-white text-accent font-heading font-bold text-[15px] px-8 py-3.5 rounded-[50px] hover:bg-gray-50 hover:scale-105 transition-all duration-300 shadow-md"
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
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="max-w-[600px] mx-auto text-center mb-14">
          <div className="text-accent text-[13px] font-bold uppercase tracking-[2px] mb-3">De ce noi</div>
          <h2 className="font-heading font-bold text-3xl md:text-[40px] text-gray-900 leading-tight mb-4">10 motive să alegi My Dental Clinic</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">
          {REASONS.map((r) => (
            <div key={r.text} className="bg-white rounded-[16px] p-5 border border-gray-100 shadow-sm flex flex-col items-center text-center gap-3 hover:border-accent/20 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
              <div className="w-10 h-10 rounded-full bg-red-50 text-accent flex items-center justify-center">
                <Icon icon={`lucide:${r.icon}`} className="text-lg" />
              </div>
              <span className="text-[13px] font-medium text-gray-700 leading-snug">{r.text}</span>
            </div>
          ))}
        </div>
        <div className="text-center">
          <button
            onClick={onRegister}
            className="inline-flex items-center gap-2 bg-accent text-white font-heading font-bold text-[16px] px-12 py-4 rounded-[50px] hover:bg-[#8A092E] hover:scale-105 hover:shadow-lg transition-all duration-300"
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
          <h2 className="font-heading font-bold text-3xl md:text-[38px] text-gray-900 leading-tight mb-4">Povești reale, zâmbete reale</h2>
          <div className="flex items-center justify-center gap-2 text-[15px] text-gray-700 font-medium">
            <div className="flex text-accent">
              {[1,2,3,4,5].map(s => <Icon key={s} icon="lucide:star" className="fill-current" />)}
            </div>
            <span>4.9 din 5 — bazat pe 1.900+ recenzii</span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="bg-gray-50 rounded-[16px] p-6 border border-gray-100 hover:border-accent/20 hover:shadow-md hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
              <div className="absolute -top-4 -left-2 text-[80px] font-heading font-bold text-gray-100 leading-none select-none">"</div>
              <p className="italic text-[14px] text-gray-600 mb-4 leading-relaxed relative z-10">"{t.text}"</p>
              <div className="flex text-accent text-xs mb-3">★ ★ ★ ★ ★</div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-accent shadow-sm">
                    <Icon icon="lucide:user" className="text-lg" />
                  </div>
                  <div>
                    <p className="font-heading font-medium text-[14px] text-gray-800">{t.name}</p>
                    <span className="text-[11px] text-gray-400 flex items-center gap-1">Pacient verificat <Icon icon="lucide:check" className="text-[10px]" /></span>
                  </div>
                </div>
                <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${t.source === 'Google' ? 'bg-blue-50 text-blue-600' : 'bg-blue-100 text-[#1877F2]'}`}>
                  {t.source}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center">
          <button
            onClick={onRegister}
            className="inline-flex items-center gap-2 bg-accent text-white font-heading font-bold text-[16px] px-12 py-4 rounded-[50px] hover:bg-[#8A092E] hover:scale-105 hover:shadow-lg transition-all duration-300"
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
    <section id="contact" className="bg-gray-50 py-20 md:py-24">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="max-w-[600px] mx-auto text-center mb-14">
          <div className="text-accent text-[13px] font-bold uppercase tracking-[2px] mb-3">Locație & Contact</div>
          <h2 className="font-heading font-bold text-3xl md:text-[40px] text-gray-900 leading-tight mb-4">Ne găsești ușor</h2>
        </div>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Map placeholder */}
          <div className="flex-1 min-h-[340px] rounded-[20px] overflow-hidden bg-red-50 border border-accent/10 shadow-sm flex items-center justify-center relative">
            <div className="flex flex-col items-center text-gray-400">
              <Icon icon="lucide:map-pin" className="text-5xl mb-3 text-accent" />
              <span className="font-heading font-medium text-lg text-gray-700">str. Constantin Brâncuși 112</span>
              <span className="text-[14px] text-gray-500">Chișinău, Moldova</span>
            </div>
          </div>
          {/* Info + CTA */}
          <div className="flex-1 flex flex-col gap-6">
            <div className="bg-white rounded-[20px] p-8 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <svg width="28" height="20" viewBox="0 0 40 30" fill="none" className="text-accent">
                  <path d="M4 8 Q20 28 36 8" stroke="currentColor" strokeWidth="6" strokeLinecap="round" fill="transparent" />
                </svg>
                <span className="font-heading font-bold text-lg text-gray-900 lowercase">my dental clinic</span>
              </div>
              <ul className="space-y-3 text-[14px] text-gray-700 mb-6">
                <li className="flex items-start gap-3"><Icon icon="lucide:map-pin" className="text-accent mt-1 flex-shrink-0" /><span>str. Constantin Brâncuși 112, Chișinău MD-2060</span></li>
                <li className="flex items-center gap-3"><Icon icon="lucide:phone" className="text-accent flex-shrink-0" /><a href={`tel:${OPEN_DAY.phone.replace(/\s/g,'')}`} className="hover:text-accent font-medium">{OPEN_DAY.phone}</a></li>
                <li className="flex items-center gap-3"><Icon icon="lucide:mail" className="text-accent flex-shrink-0" /><a href="mailto:contact@mydentalclinic.md" className="hover:text-accent font-medium">contact@mydentalclinic.md</a></li>
              </ul>
              <div className="border-t border-gray-100 pt-5 mb-5">
                <div className="text-[11px] text-gray-400 uppercase tracking-wide font-bold mb-3">Program Open Day</div>
                <div className="flex justify-between text-[14px]">
                  <span className="text-gray-600">{OPEN_DAY.date}</span>
                  <span className="font-bold text-accent">{OPEN_DAY.time}</span>
                </div>
              </div>
              <div className="flex gap-3">
                <a href="#" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-accent hover:text-white transition-colors"><Icon icon="lucide:instagram" /></a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-accent hover:text-white transition-colors"><Icon icon="lucide:facebook" /></a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-accent hover:text-white transition-colors"><Icon icon="mdi:tiktok" /></a>
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
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="max-w-[1440px] mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-[13px] text-gray-500 text-center md:text-left">© 2025 My Dental Clinic · Toate drepturile rezervate</div>
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
        <StatsBanner />
        <FreeBenefits onRegister={openRegister} />
        <CheckupServices onRegister={openRegister} />
        <TombolaCadouri onRegister={openRegister} />
        <CountdownBanner onRegister={openRegister} />
        <ServicesOpenDay onRegister={openRegister} />
        <Doctors />
        <VideoPromo onRegister={openRegister} />
        <Reasons onRegister={openRegister} />
        <Testimonials onRegister={openRegister} />
        <Contact onRegister={openRegister} />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  )
}
