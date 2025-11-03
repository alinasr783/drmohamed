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
            <p className="text-slate-600 mt-1">Direct booking or emergency assistance. No form — instant reply.</p>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <a className="btn btn-primary flex items-center justify-center" href="tel:+201008821107"><i className="fa-solid fa-phone mr-2"></i>Call Booking</a>
              <a className="btn btn-outline flex items-center justify-center" href="tel:+201095758087"><i className="fa-solid fa-truck-medical mr-2"></i>Emergency</a>
              <a className="btn btn-outline flex items-center justify-center" href="https://wa.me/201008821107" target="_blank" rel="noreferrer"><i className="fa-brands fa-whatsapp mr-2"></i>WhatsApp Booking</a>
              <a className="btn btn-outline flex items-center justify-center" href="https://goo.gl/maps/r7CjYDxgbyxtSgUD7?g_st=aw" target="_blank" rel="noreferrer"><i className="fa-solid fa-map mr-2"></i>Private Clinic Map</a>
            </div>

            <div className="mt-6">
              <h3 className="font-semibold">Private Clinic Hours</h3>
              <ul className="mt-2 text-sm text-slate-700 space-y-1">
                <li>Monday: 5:00 PM</li>
                <li>Wednesday: 7:00 PM</li>
                <li>(Consultation by prior booking)</li>
              </ul>
              <div className="mt-3 text-sm text-slate-700">
                <p className="flex items-start"><i className="fa-solid fa-location-dot text-brand-700 mr-2 mt-0.5"></i>9 Mohamed Al-Gohary St., extension of Gamal Hamdan St., next to Carrefour — Zahraa Nasr City</p>
                <p className="mt-1"><a className="text-brand-700 hover:underline" href="https://goo.gl/maps/r7CjYDxgbyxtSgUD7?g_st=aw" target="_blank" rel="noreferrer">Open location</a></p>
                <p className="mt-2">Booking: <a className="text-brand-700 hover:underline" href="tel:+201008821107">01008821107</a> · Emergency: <a className="text-brand-700 hover:underline" href="tel:+201095758087">01095758087</a></p>
              </div>
            </div>
          </div>

          {/* Contact details */}
          <div className="card p-6">

            <h3 className="font-semibold">Locations & Schedules</h3>
            <div className="space-y-4 mt-3 text-sm">
              {/* Nasayem Clinics */}
              <div className="rounded-lg ring-1 ring-slate-200 p-3">
                <p className="font-medium flex items-center"><i className="fa-solid fa-hospital text-brand-700 mr-2"></i>Nasaem Clinics</p>
                <p className="mt-1">Hotline: <a className="text-brand-700 hover:underline" href="tel:16522">16522</a></p>
                <p className="mt-1 font-medium">Nasayem Al-Rehab</p>
                <p className="mt-1"><a className="text-brand-700 hover:underline" target="_blank" rel="noreferrer" href="https://www.google.com/maps/search/?api=1&query=Nasayem%20Clinics%2C%20Al%20Rehab%2C%20New%20Cairo">View on Google Maps</a></p>
                <ul className="mt-1 space-y-1">
                  <li>Monday: 8:00–10:00 PM</li>
                  <li>Tuesday: 8:00–10:00 PM</li>
                  <li>Friday: 2:00–4:00 PM</li>
                </ul>
              </div>

              {/* Andalusia New Cairo Hospital */}
              <div className="rounded-lg ring-1 ring-slate-200 p-3">
                <p className="font-medium flex items-center"><i className="fa-solid fa-hospital text-brand-700 mr-2"></i>Seachell Hospital</p>
                <ul className="mt-1 space-y-1">
                  <li>Saturday: 2:00–4:00 PM</li>
                  <li>Tuesday: 12:00–2:00 PM</li>
                  <li>Thursday: 8:00–10:00 PM</li>
                </ul>
                <p className="mt-1">Hotline: <a className="text-brand-700 hover:underline" href="tel:19569">19569</a></p>
                <p className="mt-1">Address: Andalusia District, Third Settlement, New Cairo</p>
                <p className="mt-1"><a className="text-brand-700 hover:underline" target="_blank" rel="noreferrer" href="https://www.google.com/maps/search/?api=1&query=Andalusia%20New%20Cairo%20Hospital%2C%20Third%20Settlement%2C%20New%20Cairo">View on Google Maps</a></p>
              </div>

              {/* Dar El Seha Hospital */}
              <div className="rounded-lg ring-1 ring-slate-200 p-3">
                <p className="font-medium flex items-center"><i className="fa-solid fa-hospital text-brand-700 mr-2"></i>Dar Alseha Hospital</p>
                <p>Address: Diplomats Compound — Gamal Abdel Nasser Axis — Fifth Settlement</p>
                <p>Phone: <a className="text-brand-700 hover:underline" href="tel:+201115722200">01115722200</a></p>
                <p className="mt-1"><a className="text-brand-700 hover:underline" target="_blank" rel="noreferrer" href="https://www.google.com/maps/search/?api=1&query=Dar%20El%20Seha%20Hospital%2C%20Fifth%20Settlement%2C%20New%20Cairo">View on Google Maps</a></p>
                <ul className="mt-1 space-y-1">
                  <li>Saturday: 5:00 PM</li>
                  <li>Tuesday: 5:00 PM</li>
                </ul>
              </div>

              {/* Al Taysir Medical Center */}
              <div className="rounded-lg ring-1 ring-slate-200 p-3">
                <p className="font-medium flex items-center"><i className="fa-solid fa-clinic-medical text-brand-700 mr-2"></i>Al Tayseer clinics</p>
                <p>Phones: <a className="text-brand-700 hover:underline" href="tel:+20223498651">23498651</a> · <a className="text-brand-700 hover:underline" href="tel:+201116663993">01116663993</a> · <a className="text-brand-700 hover:underline" href="tel:+20221294050">21294050</a></p>
                <p className="mt-1"><a className="text-brand-700 hover:underline" target="_blank" rel="noreferrer" href="https://www.google.com/maps/search/?api=1&query=Al%20Taysir%20Medical%20Center%2C%20Hassan%20El%20Maamoun%2C%20Nasr%20City">View on Google Maps</a></p>
                <ul className="mt-1 space-y-1">
                  <li>Wednesday: 8:00–11:00 PM</li>
                </ul>
              </div>

              {/* Bedaya Hospital */}
              <div className="rounded-lg ring-1 ring-slate-200 p-3">
                <p className="font-medium flex items-center"><i className="fa-solid fa-hospital text-brand-700 mr-2"></i>Bedayat hospital</p>
                <p>Phones: <a className="text-brand-700 hover:underline" href="tel:+20223498882">23498882</a>/<a className="text-brand-700 hover:underline" href="tel:+20223498883">3</a>/<a className="text-brand-700 hover:underline" href="tel:+20223498884">4</a> · <a className="text-brand-700 hover:underline" href="tel:+201000551675">01000551675</a> · <a className="text-brand-700 hover:underline" href="tel:+20115397778">0115397778</a></p>
                <p className="mt-1"><a className="text-brand-700 hover:underline" target="_blank" rel="noreferrer" href="https://www.google.com/maps/search/?api=1&query=Bedaya%20Hospital%2C%20Hassan%20El%20Maamoun%2C%20Nasr%20City">View on Google Maps</a></p>
                <ul className="mt-1 space-y-1">
                  <li>Monday: 3:00–5:00 PM</li>
                  <li>Thursday: 4:00–6:00 PM</li>
                </ul>
              </div>

              {/* El Khulafaa El Rashideen Hospital */}
              <div className="rounded-lg ring-1 ring-slate-200 p-3">
                <p className="font-medium flex items-center"><i className="fa-solid fa-hospital text-brand-700 mr-2"></i>El Khulafaa El Rashideen Hospital — Heliopolis</p>
                <p>Phone: <a className="text-brand-700 hover:underline" href="tel:+201144566758">01144566758</a></p>
                <p className="mt-1"><a className="text-brand-700 hover:underline" target="_blank" rel="noreferrer" href="https://www.google.com/maps/search/?api=1&query=El%20Khulafaa%20El%20Rashideen%20Hospital%2C%20Heliopolis">View on Google Maps</a></p>
                <ul className="mt-1 space-y-1">
                  <li>Thursday: 6:00–8:00 PM</li>
                </ul>
              </div>

              {/* Nile Hospital — Shubra El Kheima (Nasser) */}
              <div className="rounded-lg ring-1 ring-slate-200 p-3">
                <p className="font-medium flex items-center"><i className="fa-solid fa-hospital text-brand-700 mr-2"></i>Seachell Hospital</p>
                <p className="mt-1"><a className="text-brand-700 hover:underline" target="_blank" rel="noreferrer" href="https://www.google.com/maps/search/?api=1&query=Nile%20Hospital%2C%20Shubra%20El%20Kheima%20Nasser">View on Google Maps</a></p>
                <ul className="mt-1 space-y-1">
                  <li>Tuesday: 10:00 AM</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
