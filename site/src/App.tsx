import { useEffect, useState, type FormEvent } from 'react'
import { ArrowRight, Dumbbell, Landmark, Mail, Menu, Plane, Rocket, Shirt, UtensilsCrossed, X } from 'lucide-react'

// All company facts below come from ffg.tj; do not add claims the client has not confirmed.
const nav = [
  ['About', '#about'],
  ['Business', '#business'],
  ['Qatar', '#qatar'],
  ['Contact', '#contact'],
]

const business = [
  { icon: Landmark, title: 'Finance', text: 'Eight years of experience in finance and insurance, including Vasl Bank, which develops a cashless economy in Tajikistan.' },
  { icon: UtensilsCrossed, title: 'Food', text: 'Production, distribution and catering, including Community, a restaurant, banquet hall and event venue.' },
  { icon: Shirt, title: 'Clothing', text: 'The iamfighter clothing brand, launched by the Group in 2017.' },
  { icon: Plane, title: 'Aviation & Tourism', text: 'In-house airline ticketing software sold across the CIS, and Fly.tj online air ticket sales.' },
  { icon: Dumbbell, title: 'Sport', text: 'Ten years in sport and a network of gyms, including UFC GYM Tajikistan and the Juventus Academy in Dushanbe.' },
  { icon: Rocket, title: 'Startups', text: 'Support for early-stage innovative projects such as LakLak Market and UYSOT.' },
]

const values = [
  ['Innovation', 'Continuous development and adoption of new technologies.'],
  ['Professionalism', 'High competence and quality in everything we do.'],
  ['Responsibility', 'Full accountability for our work and its results.'],
]

const countries = ['Qatar', 'UAE', 'China', 'Russia', 'Tajikistan', 'Kazakhstan', 'Uzbekistan', 'Georgia']

const emails = ['Aziz@ffg.qa', 'Begarys@ffg.qa', 'Info@ffg.qa']

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)

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
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <main>
        <Hero />
        <About />
        <Business />
        <Qatar />
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

function Header({ menuOpen, setMenuOpen }: { menuOpen: boolean; setMenuOpen: (v: boolean) => void }) {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-colors ${scrolled || menuOpen ? 'bg-navy-950/90 backdrop-blur' : ''}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-8">
        <Logo />
        <nav className="hidden gap-9 text-sm text-muted md:flex">
          {nav.map(([label, href]) => (
            <a key={href} href={href} className="transition-colors hover:text-paper">{label}</a>
          ))}
        </nav>
        <a href="#contact" className="btn btn-gold hidden md:inline-flex">Contact Us</a>
        <button
          className="grid size-10 place-items-center border border-paper/25 md:hidden"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {menuOpen && (
        <nav className="flex flex-col border-t border-line px-4 pb-6 md:hidden">
          {nav.map(([label, href]) => (
            <a key={href} href={href} onClick={() => setMenuOpen(false)} className="border-b border-line py-4 font-display text-2xl">
              {label}
            </a>
          ))}
        </nav>
      )}
    </header>
  )
}

function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-svh flex-col overflow-hidden pt-24"
      style={{
        background:
          'radial-gradient(1200px 600px at 78% 8%, rgb(201 164 92 / .16), transparent 60%), radial-gradient(900px 700px at 10% 110%, rgb(17 38 74 / .9), transparent 70%), linear-gradient(180deg, #0a1a30, #060f1d)',
      }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{ backgroundImage: 'linear-gradient(to right, rgb(255 255 255 / .035) 1px, transparent 1px)', backgroundSize: 'calc(100% / 6) 100%' }}
      />
      <div className="relative mx-auto grid w-full max-w-7xl flex-1 items-center gap-10 px-4 sm:px-8 lg:grid-cols-[1.1fr_.9fr]">
        <div>
          <p className="eyebrow reveal">FIFTYFIVE GROUP · State of Qatar</p>
          <h1 className="reveal my-7 font-display text-[clamp(44px,6.4vw,96px)] font-medium leading-[.98]">
            Creating and managing <em className="text-gold-soft">business</em> across borders.
          </h1>
          <p className="reveal max-w-xl leading-relaxed text-muted">
            <strong className="font-medium text-paper">FIFTYFIVE QATAR</strong> represents FIFTYFIVE GROUP — an investment and
            management company founded in 2015 — in the State of Qatar.
          </p>
          <div className="reveal mt-10 flex flex-wrap gap-3.5">
            <a href="#contact" className="btn btn-gold">Contact Us <ArrowRight size={16} /></a>
            <a href="#business" className="btn btn-ghost">Our Business</a>
          </div>
        </div>
        <Skyline />
      </div>
      <div className="relative mx-auto mt-12 grid w-full max-w-7xl grid-cols-3 border-t border-line px-4 sm:px-8 lg:grid-cols-[auto_auto_auto_1fr]">
        {[['2015', 'Founded'], ['10', 'Years of work'], ['8', 'Countries']].map(([n, label]) => (
          <div key={label} className="border-r border-line py-6 pr-3 last-of-type:border-r-0 lg:mr-12 lg:pr-12 lg:last-of-type:border-r">
            <b className="block font-display text-4xl font-medium leading-none text-gold lg:text-5xl">{n}</b>
            <span className="mt-2 block text-[10px] uppercase tracking-[0.12em] text-muted sm:text-xs">{label}</span>
          </div>
        ))}
        <ul className="col-span-3 flex flex-wrap gap-x-6 gap-y-2.5 pb-8 text-[13px] text-muted lg:col-span-1 lg:justify-end lg:self-center lg:pb-0">
          {business.map((b) => (
            <li key={b.title} className="flex items-center gap-2.5 before:size-1.5 before:rotate-45 before:bg-gold">{b.title}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}

// Stylised West Bay skyline; swap for a licensed Doha photo when the client provides one.
function Skyline() {
  return (
    <svg className="skyline max-h-56 w-full self-end max-lg:-order-1 lg:max-h-none" viewBox="0 0 560 420" aria-hidden="true">
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

function SectionHead({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="reveal mb-14">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-5 max-w-3xl font-display text-[clamp(34px,4.4vw,60px)] font-medium leading-[1.05]">{title}</h2>
    </div>
  )
}

function About() {
  return (
    <section id="about" className="bg-paper text-navy-950">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-8 lg:py-32">
        <SectionHead eyebrow="About us" title="The Qatar office of FIFTYFIVE GROUP." />
        <div className="grid gap-12 lg:grid-cols-2">
          <div className="reveal space-y-5 text-lg leading-relaxed text-navy-800">
            <p>
              FIFTYFIVE GROUP is an investment and management company, established as a separate enterprise in 2015. For ten
              years the Group has been creating and managing businesses in Tajikistan, Uzbekistan, Kazakhstan, Russia, China and
              the United Arab Emirates.
            </p>
            <p>FIFTYFIVE QATAR represents the Group in the State of Qatar.</p>
          </div>
          <blockquote className="reveal border-l-2 border-gold pl-8 font-display text-3xl italic leading-snug">
            “Our team creates and manages business to develop the economy and society.”
            <footer className="mt-4 font-sans text-xs not-italic uppercase tracking-[0.24em] text-navy-800/70">Our mission</footer>
          </blockquote>
        </div>
        <div className="mt-20 grid border-t border-navy-950/15 sm:grid-cols-3">
          {values.map(([title, text]) => (
            <div key={title} className="reveal border-b border-navy-950/15 py-8 sm:border-r sm:border-b-0 sm:px-8 sm:first:pl-0 sm:last:border-r-0">
              <h3 className="font-display text-2xl font-semibold">{title}</h3>
              <p className="mt-2 text-navy-800/80">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Business() {
  return (
    <section id="business" className="bg-navy-900">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-8 lg:py-32">
        <SectionHead eyebrow="Our business" title="Six business directions of the Group." />
        <div className="grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-3">
          {business.map(({ icon: Icon, title, text }) => (
            <article key={title} className="reveal group bg-navy-900 p-8 transition-colors hover:bg-navy-800 lg:p-10">
              <Icon className="text-gold" size={28} strokeWidth={1.4} />
              <h3 className="mt-8 font-display text-3xl font-medium">{title}</h3>
              <p className="mt-3 leading-relaxed text-muted">{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Qatar() {
  return (
    <section id="qatar" className="bg-navy-950">
      <div className="mx-auto grid max-w-7xl gap-14 px-4 py-24 sm:px-8 lg:grid-cols-2 lg:py-32">
        <div>
          <SectionHead eyebrow="Qatar" title="Part of an international group." />
          <p className="reveal max-w-xl text-lg leading-relaxed text-muted">
            Qatar is one of the eight countries in FIFTYFIVE GROUP's geography. FIFTYFIVE QATAR is the Group's point of contact in
            the State of Qatar for partners, investors and companies interested in its business directions.
          </p>
          <a href="#contact" className="btn btn-ghost reveal mt-10">Get in touch <ArrowRight size={16} /></a>
        </div>
        <ul className="reveal grid grid-cols-2 self-end border-t border-line">
          {countries.map((c) => (
            <li
              key={c}
              className={`border-b border-line py-5 font-display text-2xl odd:pr-4 ${c === 'Qatar' ? 'text-gold' : 'text-paper/80'}`}
            >
              {c}
            </li>
          ))}
        </ul>
      </div>
    </section>
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
          <SectionHead eyebrow="Contact" title="Let's talk." />
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
        <p>
          © {new Date().getFullYear()} FIFTYFIVE QATAR. A member of{' '}
          <a href="https://ffg.tj/" target="_blank" rel="noopener" className="hover:text-gold">FIFTYFIVE GROUP</a>.
        </p>
      </div>
    </footer>
  )
}
