import React, { useEffect, useState } from 'react'

export default function AlAhly({ items = [] }) {
  const [lightbox, setLightbox] = useState({ open: false, index: 0 })

  const openLightbox = (index) => setLightbox({ open: true, index })
  const closeLightbox = () => setLightbox((s) => ({ ...s, open: false }))
  const prev = () => setLightbox((s) => ({ ...s, index: (s.index - 1 + items.length) % items.length }))
  const next = () => setLightbox((s) => ({ ...s, index: (s.index + 1) % items.length }))

  useEffect(() => {
    const onKey = (e) => {
      if (!lightbox.open) return
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightbox.open, items.length])

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
              <img
                src={a.image}
                alt={a.title}
                loading="lazy"
                className="w-full h-auto object-contain cursor-zoom-in"
                onClick={() => openLightbox(i)}
              />
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
                  <a href="https://drapp.app.link/wPZ0NQh17Xb" target="_blank" rel="noreferrer" className="btn btn-outline text-sm">Online consultation</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox.open && items[lightbox.index] && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <div className="relative max-w-[90vw] md:max-w-[70vw] w-full" onClick={(e) => e.stopPropagation()}>
            <button
              className="absolute -top-3 -right-3 h-9 w-9 rounded-full bg-white/90 text-slate-800 ring-1 ring-slate-200 shadow-card hover:bg-white"
              onClick={closeLightbox}
              aria-label="Close"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>

            <div className="relative overflow-hidden rounded-xl bg-white">
              <div className="p-3 md:p-4">
                <img
                  src={items[lightbox.index].image}
                  alt={items[lightbox.index].title || 'Al Ahly work photo'}
                  className="w-full h-auto rounded-xl"
                />
                {items[lightbox.index].title && (
                  <p className="mt-2 text-sm text-slate-700">{items[lightbox.index].title}</p>
                )}
              </div>
              {items.length > 1 && (
                <>
                  <button
                    className="absolute left-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/90 text-slate-800 ring-1 ring-slate-200 shadow-card hover:bg-white"
                    onClick={prev}
                    aria-label="Previous"
                  >
                    <i className="fa-solid fa-chevron-left"></i>
                  </button>
                  <button
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/90 text-slate-800 ring-1 ring-slate-200 shadow-card hover:bg-white"
                    onClick={next}
                    aria-label="Next"
                  >
                    <i className="fa-solid fa-chevron-right"></i>
                  </button>
                </>
              )}
            </div>

            {items.length > 1 && (
              <div className="mt-3 text-center text-xs text-white/90">
                {lightbox.index + 1} / {items.length}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  )
}
