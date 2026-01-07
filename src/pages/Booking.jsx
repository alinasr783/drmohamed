import React from 'react'
import BookingSection from '../components/ui/BookingSection'

export default function Booking() {
  return (
    <div className="pt-20"> {/* Add padding top to account for fixed header if needed, or just standard spacing */}
      <BookingSection />
    </div>
  )
}
