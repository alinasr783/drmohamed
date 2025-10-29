import React from 'react'

export default function Services({ items = [] }) {
  return (
    <section id="services" className="section">
      <h2 className="section-title">Our Medical Services</h2>
      <div className="container grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {items.map((s, i) => (
          <div key={i} className="card overflow-hidden transition hover:shadow-soft hover:-translate-y-0.5 relative">
            {s.image ? (
              <>
                <img src={s.image} alt={s.title} loading="lazy" className="w-full h-28 md:h-32 object-cover" />
                <div className="absolute top-2 left-2 h-9 w-9 rounded-lg bg-white/80 backdrop-blur flex items-center justify-center text-brand-700 ring-1 ring-brand-200">
                  <i className={s.icon}></i>
                </div>
                <div className="p-4 min-w-0">
                  <p className="font-semibold truncate">{s.title}</p>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">{s.subtitle}</p>
                </div>
              </>
            ) : (
              <div className="p-5 text-center">
                <div className="mx-auto mb-3 h-12 w-12 rounded-xl bg-brand-50 flex items-center justify-center text-brand-700 ring-1 ring-brand-200">
                  <i className={s.icon}></i>
                </div>
                <p className="font-semibold">{s.title}</p>
                <p className="text-xs text-slate-500 mt-1">{s.subtitle}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}