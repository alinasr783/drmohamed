import React, { useState, useEffect } from 'react'

function VideoFrame({ item }) {
  const { type, videoUrl } = item
  if (type === 'youtube' || type === 'iframe') {
    return (
      <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
        <iframe
          src={videoUrl}
          title={item.title}
          className="absolute inset-0 w-full h-full rounded-xl"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
    )
  }
  // default: mp4
  return (
    <video
      src={videoUrl}
      controls
      playsInline
      className="w-full rounded-xl"
    />
  )
}

export default function Videos({ items = [] }) {
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
    <section id="videos" className="section">
      <h2 className="section-title">Career Highlights Videos</h2>
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {items.map((v, i) => (
            <div
              key={i}
              className="group relative rounded-xl overflow-hidden bg-white ring-1 ring-slate-200 ring-offset-1 ring-offset-white shadow-card"
            >
              {/* thumbnail */}
              <div className="relative">
                {v.thumbnail ? (
                  <img
                    src={v.thumbnail}
                    alt={v.title}
                    loading="lazy"
                    sizes="(max-width: 768px) 90vw, 400px"
                    className="h-56 md:h-64 lg:h-72 w-full object-cover object-top"
                  />
                ) : (
                  <div className="h-40 w-full bg-gradient-to-br from-slate-100 to-slate-200" />
                )}
                <button
                  onClick={() => openLightbox(i)}
                  className="absolute inset-0 flex items-center justify-center"
                  aria-label={`Play ${v.title}`}
                >
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white ring-1 ring-white/60 group-hover:bg-black/70 transition">
                    <i className="fa-solid fa-play"></i>
                  </span>
                </button>
              </div>

              {/* content */}
              <div className="p-4">
                <p className="font-semibold truncate">{v.title}</p>
                <p className="text-xs text-slate-600 mt-0.5">
                  {v.year} {v.location ? `• ${v.location}` : ''}
                </p>
                {v.tags?.length ? (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {v.tags.map((t, j) => (
                      <span key={j} className="text-xs px-2 py-1 rounded-md bg-brand-50 text-brand-700 ring-1 ring-brand-200">
                        {t}
                      </span>
                    ))}
                  </div>
                ) : null}
                <div className="mt-3 flex items-center gap-2">
                  <a
                    href={v.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-slate-50 text-slate-700 ring-1 ring-slate-200 hover:bg-slate-100"
                  >
                    <i className="fa-solid fa-arrow-up-right-from-square"></i>
                    Open source
                  </a>
                  <button
                    onClick={() => openLightbox(i)}
                    className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-brand-50 text-brand-700 ring-1 ring-brand-200 hover:bg-brand-100"
                  >
                    <i className="fa-solid fa-play"></i>
                    Play here
                  </button>
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
          <div
            className="relative max-w-[90vw] md:max-w-[70vw] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute -top-3 -right-3 h-9 w-9 rounded-full bg-white/90 text-slate-800 ring-1 ring-slate-200 shadow-card hover:bg-white"
              onClick={closeLightbox}
              aria-label="Close"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>

            <div className="relative overflow-hidden rounded-xl bg-white">
              <div className="p-3 md:p-4">
                <VideoFrame item={items[lightbox.index]} />
              </div>

              {/* nav */}
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

            {/* counter */}
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

