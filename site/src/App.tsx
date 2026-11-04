import { useEffect, useState, type FormEvent } from 'react'
import { ArrowRight, Mail } from 'lucide-react'

const emails = ['Aziz@ffg.qa', 'Begarys@ffg.qa', 'Info@ffg.qa']

export default function App() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && (e.target.classList.add('in'), io.unobserve(e.target))),
      { threshold: 0.15 },
    )
    document.querySelectorAll('.reveal').forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

function Logo() {
  return (
    <a href="#top" className="flex items-center gap-3 text-[13px] font-semibold tracking-[0.22em]">
      <span className="grid size-10 place-items-center border border-gold font-display text-xl tracking-normal text-gold">55</span>
      <span>
        FIFTYFIVE
        <small className="mt-0.5 block text-[10px] font-medium tracking-[0.32em] text-gold">QATAR</small>
      </span>
    </a>
  )
}

function Header() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-colors ${scrolled ? 'bg-navy-950/90 backdrop-blur' : ''}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-8">
        <Logo />
        <a href="#contact" className="btn btn-gold max-sm:px-4 max-sm:py-2.5">Contact Us</a>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-4 pt-28 pb-16 text-center"
      style={{
        background:
          'radial-gradient(1200px 600px at 50% 0%, rgb(201 164 92 / .16), transparent 60%), radial-gradient(900px 700px at 10% 110%, rgb(17 38 74 / .9), transparent 70%), linear-gradient(180deg, #0a1a30, #060f1d)',
      }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{ backgroundImage: 'linear-gradient(to right, rgb(255 255 255 / .035) 1px, transparent 1px)', backgroundSize: 'calc(100% / 6) 100%' }}
      />
      <Skyline />
      <p className="eyebrow reveal relative mt-10 justify-center">State of Qatar</p>
      <h1 className="reveal relative mt-5 font-display text-[clamp(44px,7vw,104px)] font-medium leading-none">FIFTYFIVE QATAR</h1>
      <a href="#contact" className="btn btn-gold reveal relative mt-10">Contact Us <ArrowRight size={16} /></a>
    </section>
  )
}

// Stylised West Bay skyline; swap for a licensed Doha photo when the client provides one.
function Skyline() {
  return (
    <svg className="skyline relative max-h-[46svh] w-full max-w-3xl" viewBox="0 0 560 420" aria-hidden="true">
      <defs>
        <linearGradient id="tower" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#c9a45c" stopOpacity=".22" />
          <stop offset="1" stopColor="#c9a45c" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path className="fill" d="M250 360 L250 120 Q262 60 274 120 L274 360 Z" />
      <path d="M250 360 L250 120 Q262 60 274 120 L274 360" />
      <line x1="262" y1="88" x2="262" y2="40" />
      <path d="M300 360 L300 170 L318 150 L336 170 L336 360" />
      <path d="M200 360 L200 190 Q214 150 228 190 L228 360" />
      <path d="M350 360 L350 210 L390 210 L390 360" />
      <path d="M150 360 L150 240 L184 225 L184 360" />
      <path d="M404 360 L404 150 C404 120 436 120 436 150 L436 360" />
      <path d="M450 360 L450 260 L486 260 L486 360" />
      <path d="M100 360 L100 280 L130 280 L130 360" />
      <path d="M60 360 L60 300 L86 290 L86 360" />
      <path d="M498 360 L498 300 L530 300 L530 360" />
      <line x1="20" y1="360" x2="540" y2="360" />
      <line className="sea" x1="60" y1="378" x2="500" y2="378" />
      <line className="sea" x1="120" y1="394" x2="440" y2="394" />
      <line className="sea" x1="190" y1="408" x2="370" y2="408" />
    </svg>
  )
}

function Contact() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const key = import.meta.env.VITE_WEB3FORMS_KEY
    if (!key) {
      // Without a form key (local preview) fall back to the visitor's mail app.
      const body = `${data.get('message')}\n\n${data.get('name')}, ${data.get('company') || ''} ${data.get('email')}`
      location.href = `mailto:info@ffg.qa?subject=${encodeURIComponent('Website enquiry')}&body=${encodeURIComponent(body)}`
      return
    }
    data.append('access_key', key)
    data.append('subject', 'New enquiry from ffg.qa')
    setStatus('sending')
    try {
      const res = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: data })
      const ok = res.ok && (await res.json()).success === true
      setStatus(ok ? 'sent' : 'error')
      if (ok) form.reset()
    } catch {
      setStatus('error')
    }
  }

  const field = 'w-full border-b border-paper/20 bg-transparent py-3 outline-none transition-colors placeholder:text-muted/60 focus:border-gold'

  return (
    <section id="contact" className="bg-navy-900">
      <div className="mx-auto grid max-w-7xl gap-16 px-4 py-24 sm:px-8 lg:grid-cols-[.9fr_1.1fr] lg:py-32">
        <div>
          <div className="reveal mb-14">
            <p className="eyebrow">Contact</p>
            <h2 className="mt-5 font-display text-[clamp(34px,4.4vw,60px)] font-medium leading-[1.05]">Let's talk.</h2>
          </div>
          <ul className="reveal space-y-4">
            {emails.map((m) => (
              <li key={m}>
                <a href={`mailto:${m.toLowerCase()}`} className="group flex items-center gap-4 text-lg">
                  <Mail size={18} className="text-gold" />
                  <span className="border-b border-transparent transition-colors group-hover:border-gold">{m}</span>
                </a>
              </li>
            ))}
          </ul>
          <p className="reveal mt-8 text-muted">State of Qatar</p>
        </div>

        <form onSubmit={submit} className="reveal grid gap-6 sm:grid-cols-2">
          <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />
          <label className="block">
            <span className="text-xs uppercase tracking-[0.18em] text-muted">Name *</span>
            <input name="name" required maxLength={100} autoComplete="name" className={field} />
          </label>
          <label className="block">
            <span className="text-xs uppercase tracking-[0.18em] text-muted">Email *</span>
            <input name="email" type="email" required maxLength={150} autoComplete="email" className={field} />
          </label>
          <label className="block sm:col-span-2">
            <span className="text-xs uppercase tracking-[0.18em] text-muted">Company</span>
            <input name="company" maxLength={150} autoComplete="organization" className={field} />
          </label>
          <label className="block sm:col-span-2">
            <span className="text-xs uppercase tracking-[0.18em] text-muted">Message *</span>
            <textarea name="message" required rows={4} maxLength={3000} className={`${field} resize-none`} />
          </label>
          <div className="flex flex-wrap items-center gap-5 sm:col-span-2">
            <button type="submit" disabled={status === 'sending'} className="btn btn-gold disabled:opacity-60">
              {status === 'sending' ? 'Sending…' : 'Send message'} <ArrowRight size={16} />
            </button>
            <p role="status" className="text-sm text-muted">
              {status === 'sent' && 'Thank you. We will get back to you shortly.'}
              {status === 'error' && 'Something went wrong. Please email info@ffg.qa.'}
            </p>
          </div>
        </form>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="border-t border-line bg-navy-950">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <Logo />
        <a href="mailto:info@ffg.qa" className="hover:text-gold">Info@ffg.qa</a>
        <p>© {new Date().getFullYear()} FIFTYFIVE QATAR</p>
      </div>
    </footer>
  )
}
