import React from 'react'

export default function Services({ items = [] }) {
  return (
    <section id="services" className="section">
      <h2 className="section-title">Our Medical Services</h2>
      <div className="container grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {items.map((s, i) => (
          <div key={i} className="card p-5 text-center transition hover:shadow-soft hover:-translate-y-0.5">
            <div className="mx-auto mb-3 h-12 w-12 rounded-xl bg-brand-50 flex items-center justify-center text-brand-700 ring-1 ring-brand-200">
              <i className={s.icon}></i>
            </div>
            <p className="font-semibold">{s.title}</p>
            <p className="text-xs text-slate-500 mt-1">{s.subtitle}</p>
          </div>
        ))}
      </div>
    </section>
  )
}