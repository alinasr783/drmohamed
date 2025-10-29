import React from 'react'

export default function Articles({ items = [] }) {
  return (
    <section id="articles" className="section">
      <h2 className="section-title">Our Latest Articles</h2>
      <div className="container grid md:grid-cols-3 gap-6">
        <div className="card p-5 md:col-span-2 grid md:grid-cols-2 gap-4 items-center">
          <div className="h-40 rounded-lg bg-brand-700/80" />
          <div>
            <h3 className="font-semibold">Modern Care: Avoid These Stress Triggers</h3>
            <p className="text-sm text-slate-600 mt-1">Learn how to manage daily stress and keep your health on track.</p>
            <a className="btn btn-outline mt-3" href="#">Read more</a>
          </div>
        </div>
          {items.map((a, i) => (
            <div key={i} className="card p-5">
              <div className="h-28 rounded-lg bg-brand-600/20" />
              <h3 className="font-semibold mt-3">{a.title}</h3>
              <p className="text-sm text-slate-600 mt-1">{a.excerpt}</p>
            <a className="btn btn-outline mt-3" href="#">Read more</a>
          </div>
        ))}
      </div>
    </section>
  )
}