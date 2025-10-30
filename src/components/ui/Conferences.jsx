import React, { useRef, useState, useEffect } from 'react'

export default function Conferences({ items = [] }) {
  const sliderRef = useRef(null)
  const [lightbox, setLightbox] = useState({ open: false, confIndex: 0, photoIndex: 0 })

  const openLightbox = (confIndex, photoIndex = 0) => {
    setLightbox({ open: true, confIndex, photoIndex })
  }
  const closeLightbox = () => setLightbox((s) => ({ ...s, open: false }))
  const prevPhoto = () => setLightbox((s) => {
    const imgs = Array.isArray(items[s.confIndex]?.images) ? items[s.confIndex].images : [items[s.confIndex]?.image]
    const next = (s.photoIndex - 1 + imgs.length) % imgs.length
    return { ...s, photoIndex: next }
  })
  const nextPhoto = () => setLightbox((s) => {
    const imgs = Array.isArray(items[s.confIndex]?.images) ? items[s.confIndex].images : [items[s.confIndex]?.image]
    const next = (s.photoIndex + 1) % imgs.length
    return { ...s, photoIndex: next }
  })

  useEffect(() => {
    const onKey = (e) => {
      if (!lightbox.open) return
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowLeft') prevPhoto()
      if (e.key === 'ArrowRight') nextPhoto()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightbox.open])

  const scrollBy = (delta) => {
    const el = sliderRef.current
    if (!el) return
    el.scrollBy({ left: delta, behavior: 'smooth' })
  }
  return (
    <section id="conferences" className="section">
      <h2 className="section-title">Conferences & Participation</h2>
      <div className="container">
        <div className="relative">
          {/* controls */}
          <button
            aria-label="Scroll left"
            onClick={() => scrollBy(-340)}
            className="absolute -left-2 top-1/2 -translate-y-1/2 z-10 h-9 w-9 rounded-full bg-white shadow-card ring-1 ring-slate-200 text-slate-700 hover:bg-slate-50 hidden md:inline-flex items-center justify-center"
          >
            <i className="fa-solid fa-chevron-left"></i>
          </button>
          <button
            aria-label="Scroll right"
            onClick={() => scrollBy(340)}
            className="absolute -right-2 top-1/2 -translate-y-1/2 z-10 h-9 w-9 rounded-full bg-white shadow-card ring-1 ring-slate-200 text-slate-700 hover:bg-slate-50 hidden md:inline-flex items-center justify-center"
          >
            <i className="fa-solid fa-chevron-right"></i>
          </button>

          {/* gradient edges */}
          <div className="pointer-events-none absolute left-0 top-0 h-full w-10 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 h-full w-10 bg-gradient-to-l from-white to-transparent" />

          {/* Horizontal modern slider */}
          <div ref={sliderRef} className="overflow-x-auto snap-x snap-mandatory -mx-4 px-4 md:-mx-8 md:px-8">
            <div className="flex gap-4 md:gap-6">
              {items.map((c, i) => (
                <div
                  key={i}
                  className="group snap-start relative w-[16rem] md:w-[20rem] shrink-0 rounded-xl overflow-hidden bg-white ring-1 ring-slate-200 ring-offset-1 ring-offset-white shadow-card transition-transform duration-300 ease-out hover:shadow-soft hover:-translate-y-0.5"
                >
                  {/* Image */}
                  <img
                    src={Array.isArray(c.images) && c.images.length ? c.images[0] : c.image}
                    alt={c.title}
                    loading="lazy"
                    className="h-40 w-full object-cover cursor-zoom-in"
                    onClick={() => openLightbox(i, 0)}
                  />

                  {/* Glow overlay on hover */}
                  <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition duration-300">
                    <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-brand-300/30 blur-2xl" />
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <p className="font-semibold truncate">{c.title}</p>
                    <p className="text-xs text-slate-600 mt-0.5">
                      {c.location} • {c.year}
                    </p>
                    {/* images count */}
                    <div className="mt-2 flex items-center gap-2 text-xs text-slate-600">
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-slate-50 ring-1 ring-slate-200">
                        <i className="fa-solid fa-camera"></i>
                        {Array.isArray(c.images) ? `${c.images.length} photos` : '1 photo'}
                      </span>
                      <button
                        className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-brand-50 text-brand-700 ring-1 ring-brand-200 hover:bg-brand-100"
                        onClick={() => openLightbox(i, 0)}
                        aria-label="View full gallery"
                      >
                        <i className="fa-regular fa-images"></i>
                        View full gallery
                      </button>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {(c.tags || []).map((t, j) => (
                        <span
                          key={j}
                          className="text-xs px-2 py-1 rounded-md bg-brand-50 text-brand-700 ring-1 ring-brand-200"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    {/* thumbnails */}
                    {Array.isArray(c.images) && c.images.length > 1 && (
                      <div className="mt-2 flex items-center gap-2">
                        {c.images.slice(0, 3).map((src, k) => (
                          <img
                            key={k}
                            src={src}
                            alt="thumb"
                            loading="lazy"
                            className="h-8 w-8 rounded-md object-cover ring-1 ring-slate-200 cursor-pointer"
                            onClick={() => openLightbox(i, k)}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox overlay */}
      {lightbox.open && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <div
            className="relative max-w-[90vw] md:max-w-[70vw] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute -top-3 -right-3 h-9 w-9 rounded-full bg-white/90 text-slate-800 ring-1 ring-slate-200 shadow-card hover:bg-white"
              onClick={closeLightbox}
              aria-label="Close lightbox"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>

            <div className="relative overflow-hidden rounded-xl bg-white">
              <img
                src={Array.isArray(items[lightbox.confIndex]?.images) && items[lightbox.confIndex].images.length
                  ? items[lightbox.confIndex].images[lightbox.photoIndex]
                  : items[lightbox.confIndex]?.image}
                alt={items[lightbox.confIndex]?.title || 'Conference photo'}
                className="w-full max-h-[80vh] object-contain"
              />

              {/* nav */}
              <button
                className="absolute left-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/90 text-slate-800 ring-1 ring-slate-200 shadow-card hover:bg-white"
                onClick={prevPhoto}
                aria-label="Previous photo"
              >
                <i className="fa-solid fa-chevron-left"></i>
              </button>
              <button
                className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/90 text-slate-800 ring-1 ring-slate-200 shadow-card hover:bg-white"
                onClick={nextPhoto}
                aria-label="Next photo"
              >
                <i className="fa-solid fa-chevron-right"></i>
              </button>

              {/* counter */}
              <div className="absolute bottom-2 right-2 px-2 py-1 rounded-md bg-black/60 text-white text-xs">
                {(() => {
                  const imgs = Array.isArray(items[lightbox.confIndex]?.images)
                    ? items[lightbox.confIndex].images
                    : [items[lightbox.confIndex]?.image].filter(Boolean)
                  return `${lightbox.photoIndex + 1} / ${imgs.length}`
                })()}
              </div>
            </div>
            {/* thumbnails bar */}
            {Array.isArray(items[lightbox.confIndex]?.images) && items[lightbox.confIndex].images.length > 1 && (
              <div className="mt-3 flex flex-wrap gap-2 justify-center">
                {items[lightbox.confIndex].images.map((src, k) => (
                  <img
                    key={k}
                    src={src}
                    alt="thumb"
                    loading="lazy"
                    className={`h-12 w-12 rounded-md object-cover ring-2 ${lightbox.photoIndex === k ? 'ring-brand-400' : 'ring-slate-200'} cursor-pointer`}
                    onClick={() => setLightbox((s) => ({ ...s, photoIndex: k }))}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  )
}