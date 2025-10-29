import React from 'react'

export default function Gallery({ items = [] }) {
  return (
    <section id="gallery" className="section">
      <h2 className="section-title">Cases Gallery</h2>
      <div className="container grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        {items.map((g, i) => (
          <figure key={i} className="card overflow-hidden">
            <img className="w-full h-48 object-cover" src={g.src} alt={g.caption} />
            <figcaption className="p-3 text-sm text-slate-700">{g.caption}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}