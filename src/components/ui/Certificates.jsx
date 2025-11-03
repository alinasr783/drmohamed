import React, { useEffect, useState } from 'react'

export default function Certificates({ items = [] }) {
  const list = Array.isArray(items) ? items.filter((i) => i && i.src) : []
  const [lightbox, setLightbox] = useState({ open: false, index: 0 })
  const openLightbox = (index) => setLightbox({ open: true, index })
  const closeLightbox = () => setLightbox((s) => ({ ...s, open: false }))

  useEffect(() => {
    const onKey = (e) => {
      if (!lightbox.open) return
      if (e.key === 'Escape') closeLightbox()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightbox.open])
  return (
    <section id="certificates" className="section">
      <h2 className="section-title">Certificates</h2>
      <div className="container">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {list.map((c, i) => (
            <figure
              key={i}
              className="card overflow-hidden bg-white ring-1 ring-slate-200 shadow-card cursor-zoom-in"
              onClick={() => openLightbox(i)}
            >
              <img
                className="w-full h-56 object-cover"
                src={c.src}
                alt={c.caption || 'Certificate'}
                loading="lazy"
              />
            </figure>
          ))}
        </div>
      </div>

      {lightbox.open && list[lightbox.index] && (
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
                  src={list[lightbox.index].src}
                  alt={list[lightbox.index].caption || 'Certificate'}
                  className="w-full h-auto rounded-xl"
                />
                {list[lightbox.index].caption && (
                  <p className="mt-2 text-sm text-slate-700">{list[lightbox.index].caption}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
