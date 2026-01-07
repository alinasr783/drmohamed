import React from 'react'

export default function BookingSection() {
  return (
    <section id="booking" className="section bg-slate-50">
      <div className="container">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold">Book Your Appointment</h2>
          <p className="text-slate-600 mt-2">Schedule your visit with Dr. Mohamed Hamdi Elgawadi easily.</p>
        </div>
        <div className="card p-0 overflow-hidden bg-white shadow-lg">
          <iframe 
            src="https://tabibi.site/booking/e063eed3-abe7-4a37-b1cf-80d4c9f52f88" 
            width="100%" 
            height="1200" 
            frameBorder="0"
            scrolling="no"
            title="Booking Frame"
          ></iframe>
        </div>
      </div>
    </section>
  )
}
