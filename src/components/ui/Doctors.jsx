import React from 'react'

export default function Doctors({ items = [] }) {
  return (
    <section id="doctors" className="section">
      <h2 className="section-title">Meet our Doctors</h2>
      <div className="container grid md:grid-cols-3 gap-6">
        {items.map((d, i) => (
          <div key={i} className="card p-5">
            <img className="h-40 w-full object-cover rounded-lg" src={d.photo} alt={d.name} />
            <div className="mt-3">
              <p className="font-semibold">{d.name}</p>
              <p className="text-sm text-slate-600">{d.speciality}</p>
              <div className="mt-3 flex items-center justify-between">
                <a href="/booking" className="btn btn-outline text-sm">Book Appointment</a>
                <div className="text-xs text-slate-500">⭐ {d.rating}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="container grid md:grid-cols-3 gap-6 mt-6">
        {items.slice(3, 6).map((d, i) => (
          <div key={`row2-${i}`} className="card p-5">
            <img className="h-40 w-full object-cover rounded-lg" src={d.photo} alt={d.name} />
            <div className="mt-3">
              <p className="font-semibold">{d.name}</p>
              <p className="text-sm text-slate-600">{d.speciality}</p>
              <div className="mt-3 flex items-center justify-between">
                <button className="btn btn-outline text-sm">Book Appointment</button>
                <div className="text-xs text-slate-500">⭐ {d.rating}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}