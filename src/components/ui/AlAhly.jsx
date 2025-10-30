import React from 'react'

export default function AlAhly({ items = [] }) {
  return (
    <section id="alahly" className="section bg-gradient-to-br from-red-700 via-red-700 to-red-900 text-white relative">
      <div className="container">
        {/* Prominent club logo on red background */}
        <div className="flex justify-center mb-6">
          <div className="flex items-center gap-3 bg-white rounded-2xl px-4 py-2 ring-1 ring-red-300 shadow-card">
            <img
              src="https://m.media-amazon.com/images/I/61avIgyk8PL.jpg"
              alt="Al Ahly SC logo"
              className="h-16 w-auto drop-shadow-md"
            />
            <span className="font-semibold text-red-800 hidden sm:inline">Al Ahly SC</span>
          </div>
        </div>
        <h2 className="section-title text-white">Al Ahly Club Work</h2>
        <p className="text-white/85 text-sm mt-1">Medical collaboration and sports medicine support</p>
        <div className="grid md:grid-cols-3 gap-6 mt-4">
          {items.map((a, i) => (
            <div
              key={i}
              className="relative rounded-xl overflow-hidden bg-white ring-1 ring-slate-200 ring-offset-1 ring-offset-white shadow-card transition hover:shadow-soft hover:-translate-y-0.5"
            >
              <img src={a.image} alt={a.title} loading="lazy" className="h-40 w-full object-cover" />
              {/* Small corner logo for brand consistency */}
              <img
                src="https://m.media-amazon.com/images/I/61avIgyk8PL.jpg"
                alt="Al Ahly SC logo"
                className="absolute top-2 left-2 h-8 w-8 rounded-md bg-white/80 p-1 ring-1 ring-red-300"
              />
              {/* Red accent strip */}
              <div className="absolute top-0 left-0 h-1.5 w-full bg-red-700/95" />
              {/* Content */}
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <p className="font-semibold truncate">{a.title}</p>
                  <span className="text-xs px-2 py-1 rounded-md bg-red-100 text-red-800 ring-1 ring-red-300">Al Ahly</span>
                </div>
                <p className="text-xs text-slate-600 mt-1">{a.role}</p>
                <p className="text-xs text-slate-500">{a.years}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {(a.tags || []).map((t, j) => (
                    <span key={j} className="text-xs px-2 py-1 rounded-md bg-red-100 text-red-800 ring-1 ring-red-300">{t}</span>
                  ))}
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <a href="/booking" className="btn btn-primary text-sm">Book an appointment</a>
                  <a href="#contact" className="btn btn-outline text-sm">Contact us</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
