import { useEffect, useState, type FormEvent } from 'react'
import { ArrowRight, ArrowUpRight } from 'lucide-react'

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

function Logo() {
  return (
    <a href="#top">
      {/* 135×42 PNG from ffg.tj; replace with the SVG when the client sends it. */}
      <img src="/logo.png" width={135} height={42} alt="FIFTYFIVE GROUP" />
    </a>
  )
}

function Header() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll() // the page can open mid-scroll (reload, #about link), where a transparent header would vanish
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`fixed inset-x-0 top-0 z-50 border-b transition-colors ${scrolled ? 'border-line bg-navy-950' : 'border-transparent'}`}>
      <div className="container-x flex items-center justify-between py-4">
        <Logo />
        <nav className="flex items-center gap-5 sm:gap-8">
          <a href="#about" className="link text-sm">About Us</a>
          <a href="#contact" className="btn btn-ghost max-sm:px-4 max-sm:py-2.5">Contact Us</a>
        </nav>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section id="top" className="relative flex min-h-svh flex-col items-center justify-end overflow-hidden bg-navy-950 px-4 pt-28 pb-[8svh] text-center sm:justify-start sm:pt-[24svh] sm:pb-16">
      {/* Doha West Bay at night — Jimmy Hu, Unsplash License (unsplash.com/photos/LIuY3-Mwc_k). */}
      <img src="/doha.jpg" alt="" className="absolute inset-0 size-full object-cover object-[50%_65%]" />
      {/* Darkens the photo so the heading stays readable and the bottom blends into the page. */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-950/85 via-navy-950/35 to-navy-950" />
      <h1 className="heading relative text-[clamp(44px,7vw,104px)] leading-none">FIFTYFIVE QATAR</h1>
      <p className="relative mt-5 text-lg text-muted">The Qatar office of FIFTYFIVE GROUP</p>
      <a href="#contact" className="btn btn-gold relative mt-10">Contact Us <ArrowRight size={16} /></a>
    </section>
  )
}

// Facts from ffg.tj only; do not add claims the client has not confirmed.
function About() {
  return (
    <section id="about" className="bg-paper text-navy-950">
      <div className="container-x section grid gap-12 lg:grid-cols-2 lg:gap-16">
        <h2 className="heading text-[clamp(34px,4.4vw,60px)] leading-[1.05]">Investment and management company, founded in 2015.</h2>
        <div className="space-y-5 text-lg leading-relaxed text-navy-800">
          <p>
            For ten years FIFTYFIVE GROUP has been creating and managing businesses in Tajikistan, Uzbekistan, Kazakhstan,
            Russia, China and the United Arab Emirates.
          </p>
          <p>FIFTYFIVE QATAR represents the Group in the State of Qatar.</p>
          <a href="https://ffg.tj/" target="_blank" rel="noopener" className="btn mt-4 bg-navy-950 text-paper hover:bg-navy-800">
            Visit ffg.tj <ArrowUpRight size={16} />
          </a>
        </div>
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

  const field = 'w-full border-b border-paper/25 bg-transparent py-3 outline-none transition-colors focus:border-gold'
  const label = 'text-xs uppercase tracking-[0.18em] text-muted'

  return (
    <section id="contact" className="bg-navy-900">
      <div className="container-x section grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <h2 className="heading text-[clamp(34px,4.4vw,60px)] leading-[1.05]">
            Contact <span className="whitespace-nowrap">FIFTYFIVE QATAR</span>
          </h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">
            Write to{' '}
            <a href="mailto:info@ffg.qa" className="text-paper underline decoration-gold underline-offset-4 hover:text-gold">info@ffg.qa</a>{' '}
            or send a message using the form.
          </p>
        </div>

        <form onSubmit={submit} className="grid gap-6 sm:grid-cols-2">
          <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />
          <label className="block">
            <span className={label}>Name *</span>
            <input name="name" required maxLength={100} autoComplete="name" className={field} />
          </label>
          <label className="block">
            <span className={label}>Email *</span>
            <input name="email" type="email" required maxLength={150} autoComplete="email" className={field} />
          </label>
          <label className="block sm:col-span-2">
            <span className={label}>Company</span>
            <input name="company" maxLength={150} autoComplete="organization" className={field} />
          </label>
          <label className="block sm:col-span-2">
            <span className={label}>Message *</span>
            <textarea name="message" required rows={4} maxLength={3000} className={`${field} resize-none`} />
          </label>
          <div className="flex flex-wrap items-center gap-5 sm:col-span-2">
            <button type="submit" disabled={status === 'sending'} className="btn btn-gold disabled:cursor-wait disabled:opacity-60">
              {status === 'sending' ? 'Sending…' : 'Send message'} <ArrowRight size={16} />
            </button>
            <p role="status" className={`text-sm ${status === 'error' ? 'text-red-300' : 'text-paper'}`}>
              {status === 'sent' && 'Thank you, your message has been sent.'}
              {status === 'error' && 'The message was not sent. Please try again or email info@ffg.qa.'}
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
      <div className="container-x flex flex-col gap-6 py-10 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <Logo />
        <a href="mailto:info@ffg.qa" className="link">info@ffg.qa</a>
        <a href="https://ffg.tj/" target="_blank" rel="noopener" className="link">Main website: ffg.tj</a>
        <p>© {new Date().getFullYear()} FIFTYFIVE QATAR</p>
      </div>
    </footer>
  )
}
