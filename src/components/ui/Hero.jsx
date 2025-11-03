import React from 'react'

export default function Hero() {
  return (
    <section className="section">
      <div className="container grid md:grid-cols-[1.1fr_0.9fr] gap-10 items-center mt-2.5">
        <div>
          <p className="text-brand-700 font-semibold flex items-center gap-2 text-2xl md:text-3xl">
            <span>Dr. Mohamed Hamdi Elgawadi</span>
            <span className="text-slate-400">|</span>
            <span dir="rtl">د. محمد حمدي الجوادي</span>
          </p>
          <h1 className="text-2xl md:text-3xl font-bold mt-2">
            Joint Surgery, Arthroscopy & Sports Injuries
          </h1>
          <p className="text-slate-600 mt-4 max-w-xl">
            Trusted specialized care with expertise in joint surgery, arthroscopy, and sports injuries.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 md:gap-4">
            <a href="/booking" className="btn btn-primary">Book Appointment</a>
            <a href="/#contact" className="btn btn-outline">Contact Us</a>
          </div>
        </div>
        <div className="relative">
          <div className="absolute -top-6 -right-6 h-48 w-48 rounded-full bg-brand-200 blur-2xl" />
          <div className="card p-0 overflow-hidden relative">
            <img className="w-full h-96 md:h-[34rem] object-cover" src="https://i.ibb.co/8LybyhH5/0bd53afc-2467-4ed9-b652-bcaab70c78e3.jpg" alt="Doctor" />
            <div className="absolute bottom-4 left-4 bg-white rounded-lg px-3 py-2 shadow-card">
              <span className="text-sm font-medium">Next available appointment today</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
