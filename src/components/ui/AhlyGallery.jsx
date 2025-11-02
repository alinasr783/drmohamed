import React, { useMemo, useState, useEffect, useRef } from 'react'

export default function AhlyGallery({ items = [] }) {
  const [activeTag, setActiveTag] = useState('All')
  const [lightbox, setLightbox] = useState({ open: false, index: 0 })
  const sliderRef = useRef(null)

  const tags = useMemo(() => {
    const t = new Set(['All'])
    items.forEach((i) => (i.tags || []).forEach((tag) => t.add(tag)))
    return Array.from(t)
  }, [items])

  const filtered = useMemo(() => {
    if (activeTag === 'All') return items
    return items.filter((i) => (i.tags || []).includes(activeTag))
  }, [items, activeTag])

  const openLightbox = (index) => setLightbox({ open: true, index })
  const closeLightbox = () => setLightbox((s) => ({ ...s, open: false }))
  const prev = () => setLightbox((s) => ({ ...s, index: (s.index - 1 + filtered.length) % filtered.length }))
  const next = () => setLightbox((s) => ({ ...s, index: (s.index + 1) % filtered.length }))

  const scrollByDir = (dir) => {
    const el = sliderRef.current
    if (!el) return
    const amount = Math.min(400, el.clientWidth * 0.8) * dir
    el.scrollBy({ left: amount, behavior: 'smooth' })
  }

  useEffect(() => {
    const onKey = (e) => {
      if (!lightbox.open) return
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightbox.open, filtered.length])

  return (
    <section id="ahly-gallery" className="section">
      <h2 className="section-title">Al Ahly Gallery</h2>
      <div className="container">
        

        {/* Single-row horizontal scroll */}
        <div className="relative">
          <div ref={sliderRef} className="overflow-x-auto snap-x snap-mandatory px-1">
            <div className="flex gap-4 md:gap-6">
              {filtered.map((g, i) => (
                <figure
                  key={i}
                  className="group snap-center md:snap-start relative w-[16rem] md:w-[20rem] shrink-0 rounded-xl overflow-hidden bg-white ring-1 ring-slate-200 ring-offset-1 ring-offset-white shadow-card transition hover:shadow-soft hover:-translate-y-0.5"
                  onClick={() => openLightbox(i)}
                >
                  <img
                    className="h-40 w-full object-cover cursor-zoom-in"
                    src={g.src}
                    alt={g.caption || 'Al Ahly photo'}
                    loading="lazy"
                  />
                  <figcaption className="p-3 text-sm text-slate-700">
                    {g.caption}
                  </figcaption>
                  {/* overlay glow */}
                  <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition duration-300">
                    <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-brand-300/30 blur-2xl" />
                  </div>
                </figure>
              ))}
            </div>
          </div>
          {/* nav arrows */}
          <button
            className="absolute left-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/90 text-slate-800 ring-1 ring-slate-200 shadow-card hover:bg-white"
            onClick={() => scrollByDir(-1)}
            aria-label="Scroll left"
          >
            <i className="fa-solid fa-chevron-left"></i>
          </button>
          <button
            className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/90 text-slate-800 ring-1 ring-slate-200 shadow-card hover:bg-white"
            onClick={() => scrollByDir(1)}
            aria-label="Scroll right"
          >
            <i className="fa-solid fa-chevron-right"></i>
          </button>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox.open && filtered[lightbox.index] && (
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
                  src={filtered[lightbox.index].src}
                  alt={filtered[lightbox.index].caption || 'Al Ahly photo'}
                  className="w-full h-auto rounded-xl"
                />
                {filtered[lightbox.index].caption && (
                  <p className="mt-2 text-sm text-slate-700">{filtered[lightbox.index].caption}</p>
                )}
              </div>
              {/* nav */}
              {filtered.length > 1 && (
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

            {/* counter */}
            {filtered.length > 1 && (
              <div className="mt-3 text-center text-xs text-white/90">
                {lightbox.index + 1} / {filtered.length}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  )
}
