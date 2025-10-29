import React from 'react'

export default function Testimonials({ items = [] }) {
  return (
    <section className="section">
      <h2 className="section-title">Patients Testimonial</h2>
      <div className="container grid md:grid-cols-3 gap-6 items-stretch">
        {items.map((t, i) => (
          <div key={i} className="card p-5 transition hover:shadow-soft">
            <div className="flex items-start gap-3">
              <div className="h-8 w-8 rounded-full bg-brand-100 flex items-center justify-center text-brand-700">
                <i className="fa-solid fa-quote-left"></i>
              </div>
              <div>
                <p className="font-medium">{t.name}</p>
                <p className="text-sm text-slate-600 mt-1 italic">{t.message}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}