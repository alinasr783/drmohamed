import React, { useEffect, useState } from 'react'

const nav = [
  { label: 'Home', href: '/' },
  { label: 'Booking', href: '/booking' },
  { label: 'About', href: '/#about' },
  { label: 'Gallery', href: '/#gallery' },
  { label: 'Contact', href: '/#contact' },
  { label: 'Dashboard', href: '/dashboard' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 4)
    }
    window.addEventListener('scroll', onScroll)
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const frameBase = 'flex w-full items-center justify-between rounded-xl transition-all duration-300 ease-out transform-gpu'
  const framePadding = scrolled ? 'px-2 md:px-3 py-1' : 'px-3 md:px-4 py-2'
  const frameStyle = scrolled
    ? 'bg-white/80 backdrop-blur shadow-soft ring-1 ring-slate-200 ring-offset-1 ring-offset-white'
    : 'bg-white/70 backdrop-blur'

  return (
    <header className={`fixed md:sticky z-40 left-0 right-0 ${scrolled ? 'top-[10px]' : 'top-0'}`}>
      <div className="container">
        <div className={`${frameBase} ${frameStyle} ${scrolled ? 'max-w-[calc(100%-2rem)] md:max-w-[calc(100%-4rem)] mx-auto' : ''} ${framePadding}`}>
          <div className={`flex items-center ${scrolled ? 'gap-1' : 'gap-2'}`}>
            <div className="h-8 w-8 rounded-full bg-brand-600 flex items-center justify-center text-white">
              <i className="fa-solid fa-bone"></i>
            </div>
            <span className="font-semibold">Elgawadi</span>
          </div>
          <nav className={`hidden md:flex items-center ${scrolled ? 'gap-4' : 'gap-6'} text-sm`}>
            {nav.map((n) => (
              <a key={n.href} href={n.href} className="text-slate-700 hover:text-brand-700">
                {n.label}
              </a>
            ))}
          </nav>
          <div className={`flex items-center ${scrolled ? 'gap-1' : 'gap-2'}`}>
            <a href="/booking" className="btn btn-primary">Booking</a>
            <button
              className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-700 hover:bg-slate-100"
              aria-label="Toggle navigation"
              aria-expanded={open}
              onClick={() => setOpen((o) => !o)}
            >
              <i className="fa-solid fa-bars"></i>
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {open && (
          <div className="md:hidden mt-2 mx-2 rounded-xl bg-white shadow-card ring-1 ring-slate-200">
            <nav className="grid gap-1 p-2 text-sm">
              
              <a
                href="/booking"
                className="px-3 py-2 rounded-lg bg-brand-600 text-white hover:bg-brand-700"
                onClick={() => setOpen(false)}
              >
                Book Appointment
              </a>
              {nav.map((n) => (
                <a
                  key={`m-${n.href}`}
                  href={n.href}
                  className="px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-50 hover:text-brand-700"
                  onClick={() => setOpen(false)}
                >
                  {n.label}
                </a>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
