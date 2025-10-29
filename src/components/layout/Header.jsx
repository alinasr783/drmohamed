import React from 'react'

const nav = [
  { label: 'Home', href: '/' },
  { label: 'Booking', href: '/booking' },
  { label: 'Payment', href: '/payment' },
  { label: 'About', href: '/#about' },
  { label: 'Gallery', href: '/#gallery' },
  { label: 'Contact', href: '/#contact' },
  { label: 'Dashboard', href: '/dashboard' },
]

export default function Header() {
  return (
    <header className="sticky top-0 z-30 bg-white/70 backdrop-blur border-b border-slate-100">
      <div className="container flex w-full items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-brand-600 flex items-center justify-center text-white">
            <i className="fa-solid fa-bone"></i>
          </div>
          <span className="font-semibold">Elgawadi</span>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          {nav.map((n) => (
            <a key={n.href} href={n.href} className="text-slate-700 hover:text-brand-700">
              {n.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a href="/booking" className="btn btn-primary">Book Appointment</a>
        </div>
      </div>
    </header>
  )
}