import React, { useState } from 'react'
import bookingData from '../data/booking.json'
import { insertBooking } from '../hooks/supabase'

export default function Booking() {
  const { doctor, services, times } = bookingData

  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [service, setService] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [country, setCountry] = useState('')
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState('')

  const confirmEnabled = fullName && phone && service && date && time

  const handleConfirm = async () => {
    if (!confirmEnabled || loading) return
    setLoading(true)
    setStatus('')
    try {
      const row = await insertBooking({
        service,
        date,
        time,
        dentist: doctor.name,
        name: fullName,
        phone,
        country,
      })
      setStatus('Appointment confirmed and saved successfully.')
      alert(`Appointment confirmed!\n\nName: ${fullName}\nPhone: ${phone}\nService: ${service}\nDate: ${date}\nTime: ${time}\nDoctor: ${doctor.name}`)
    } catch (err) {
      console.error(err)
      setStatus('Error submitting to Supabase. Please try again.')
      alert('Error submitting booking. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="booking" className="section">
      <div className="container">
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold">Schedule Your Appointment</h1>
          <p className="text-slate-600 mt-2">Quickly and easily book your next visit with us.</p>
          <div className="mt-4 inline-flex items-center gap-2 text-xs text-slate-600">
            <span className="px-2 py-1 rounded-md bg-brand-50 text-brand-700 ring-1 ring-brand-200">Step 1: Info</span>
            <span className="px-2 py-1 rounded-md bg-brand-50 text-brand-700 ring-1 ring-brand-200">Step 2: Time</span>
            <span className="px-2 py-1 rounded-md bg-brand-50 text-brand-700 ring-1 ring-brand-200">Step 3: Review</span>
          </div>
        </div>

        <div className="mt-6 grid md:grid-cols-2 gap-6">
          {/* Personal Information */}
          <div className="card p-6">
            <h3 className="font-semibold mb-4">Personal Information</h3>
            <label className="block text-sm text-slate-600 mb-1">Full Name *</label>
            <input value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Enter your full name" className="w-full border rounded-lg px-3 py-2" />

            <label className="block text-sm text-slate-600 mt-4 mb-1">Phone Number *</label>
            <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Enter your phone number (e.g., +201234567890)" className="w-full border rounded-lg px-3 py-2" />

            <label className="block text-sm text-slate-600 mt-4 mb-1">Country</label>
            <input value={country} onChange={(e) => setCountry(e.target.value)} placeholder="Enter your country" className="w-full border rounded-lg px-3 py-2" />

            <label className="block text-sm text-slate-600 mt-4 mb-1">Select a Service *</label>
            <select value={service} onChange={(e) => setService(e.target.value)} className="w-full border rounded-lg px-3 py-2">
              <option value="">Please select a service</option>
              {services.map((s) => (
                <option key={s.id} value={s.title}>{s.title}</option>
              ))}
            </select>
          </div>

          {/* Available Times */}
          <div className="card p-6">
            <h3 className="font-semibold mb-4">Available Times</h3>
            <div className="grid gap-3">
              {times.map((t) => (
                <button
                  key={t}
                  className={`text-left w-full rounded-lg px-4 py-3 border transition ${time === t ? 'bg-brand-600 text-white border-brand-600 shadow-soft' : 'bg-white text-slate-800 border-slate-200 hover:bg-slate-50'}`}
                  onClick={() => setTime(t)}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Lower grid: date & summary */}
        <div className="mt-6 grid md:grid-cols-2 gap-6 items-start">
          <div className="card p-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-brand-100 flex items-center justify-center text-brand-700">
                <i className="fa-solid fa-user-doctor"></i>
              </div>
              <div>
                <p className="font-semibold">{doctor.name}</p>
                <p className="text-sm text-slate-600">{doctor.speciality}</p>
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm text-slate-600 mb-1">Select a Date *</label>
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full border rounded-lg px-3 py-2" />
            </div>
          </div>

          <div className="card p-6">
            <h3 className="font-semibold mb-4">Your Appointment</h3>
            <ul className="space-y-2 text-sm text-slate-700">
              <li><span className="font-medium">Country:</span> {country || 'No country selected'}</li>
              <li><span className="font-medium">Service:</span> {service || 'No service selected'}</li>
              <li><span className="font-medium">Date:</span> {date || 'Select a date'}</li>
              <li><span className="font-medium">Time:</span> {time || 'Select a time'}</li>
              <li><span className="font-medium">Doctor:</span> {doctor.name}</li>
            </ul>
            <button
              className={`btn btn-primary mt-4 ${confirmEnabled ? '' : 'opacity-60 cursor-not-allowed'} ${loading ? 'opacity-60 cursor-wait' : ''}`}
              onClick={handleConfirm}
              disabled={!confirmEnabled || loading}
            >
              {loading ? 'Saving...' : 'Confirm Appointment'}
            </button>
            {status && <p className="text-sm text-slate-600 mt-2">{status}</p>}
          </div>
        </div>
      </div>
    </section>
  )
}