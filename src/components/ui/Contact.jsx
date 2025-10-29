import React from 'react'

export default function Contact() {
  // No form required – provide direct contact options only
  
  return (
    <section id="contact" className="section">
      <div className="container">
        <div className="grid md:grid-cols-[1.1fr_0.9fr] gap-8 items-start">
          {/* Direct contact options (no form) */}
          <div className="card p-6">
            <h2 className="text-2xl font-semibold">Get In Touch</h2>
            <p className="text-slate-600 mt-1">Reach us directly via phone, WhatsApp or email. No form — instant reply.</p>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <a className="btn btn-primary flex items-center justify-center" href="tel:+20111222333"><i className="fa-solid fa-phone mr-2"></i>Call Now</a>
              <a className="btn btn-outline flex items-center justify-center" href="https://wa.me/20111222333" target="_blank" rel="noreferrer"><i className="fa-brands fa-whatsapp mr-2"></i>WhatsApp</a>
              <a className="btn btn-outline flex items-center justify-center" href="mailto:info@elgawadiclinic.com"><i className="fa-solid fa-envelope mr-2"></i>Email</a>
              <a className="btn btn-outline flex items-center justify-center" href="https://maps.google.com/?q=New+Cairo+Egypt" target="_blank" rel="noreferrer"><i className="fa-solid fa-map mr-2"></i>Open Maps</a>
            </div>

            <div className="mt-6">
              <h3 className="font-semibold">Working Hours</h3>
              <ul className="mt-2 text-sm text-slate-700 space-y-1">
                <li>Sat–Thu: 10:00 AM – 8:00 PM</li>
                <li>Fri: Closed</li>
              </ul>
            </div>
          </div>

          {/* Contact details */}
          <div className="card p-6">
            <h3 className="font-semibold">Clinic Details</h3>
            <ul className="space-y-3 mt-3 text-sm">
              <li className="flex items-center"><i className="fa-solid fa-location-dot text-brand-700 mr-2"></i>New Cairo, Egypt</li>
              <li className="flex items-center"><i className="fa-solid fa-phone text-brand-700 mr-2"></i><a href="tel:+20111222333">+20 111 222 333</a></li>
              <li className="flex items-center"><i className="fa-brands fa-whatsapp text-brand-700 mr-2"></i><a href="https://wa.me/20111222333" target="_blank" rel="noreferrer">Chat on WhatsApp</a></li>
              <li className="flex items-center"><i className="fa-solid fa-envelope text-brand-700 mr-2"></i><a href="mailto:info@elgawadiclinic.com">info@elgawadiclinic.com</a></li>
            </ul>

            <div className="mt-4">
              <a className="btn btn-outline" href="https://maps.google.com/?q=New+Cairo+Egypt" target="_blank" rel="noreferrer"><i className="fa-solid fa-map mr-2"></i>Open on Maps</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}