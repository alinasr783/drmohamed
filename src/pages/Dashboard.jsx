import React, { useEffect } from 'react'
import BookingManager from '../components/admin/BookingManager'
import AhlyGalleryManager from '../components/admin/AhlyGalleryManager'
import VideosManager from '../components/admin/VideosManager'
import TestimonialsManager from '../components/admin/TestimonialsManager'
import ServicesManager from '../components/admin/ServicesManager'
import ClinicsManager from '../components/admin/ClinicsManager'
import WorkingHoursManager from '../components/admin/WorkingHoursManager'
import ConferencesManager from '../components/admin/ConferencesManager'

export default function Dashboard() {
  useEffect(() => {
    if (localStorage.getItem('admin_auth') !== 'true') {
      window.location.href = '/login'
    }
  }, [])

  return (
    <section className="section">
      <div className="container">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
        </div>
        <p className="text-slate-600 mt-1">View and manage bookings. Upload and manage Al Ahly Gallery.</p>

        {/* Bookings */}
        <BookingManager />

        {/* Ahly Gallery */}
        <AhlyGalleryManager />

        {/* Videos */}
        <VideosManager />

        {/* Testimonials */}
        <TestimonialsManager />

        {/* Services */}
        <ServicesManager />

        {/* Clinics */}
        <ClinicsManager />

        {/* Working Hours */}
        <WorkingHoursManager />

        {/* Conferences */}
        <ConferencesManager />
      </div>
    </section>
  )
}