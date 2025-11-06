import React, { useEffect, useState } from 'react'
import { listBookings, deleteBooking } from '../../hooks/supabase'

export default function BookingManager(){
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchData = async () => {
    setLoading(true)
    setError('')
    try {
      const data = await listBookings()
      setRows(Array.isArray(data) ? data : [])
    } catch (err) {
      console.error(err)
      setError('Failed to fetch bookings from Supabase')
    } finally {
      setLoading(false)
    }
  }

  useEffect(()=>{ fetchData() }, [])

  const onDelete = async (id) => {
    if (!id) return
    const ok = confirm('Delete this booking?')
    if (!ok) return
    try {
      await deleteBooking(id)
      setRows((prev) => prev.filter((r) => r.id !== id))
    } catch (err) {
      console.error(err)
      alert('Failed to delete row.')
    }
  }

  return (
    <div className="card p-4 mt-4 overflow-x-auto">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <div className="flex items-center gap-3">
          <p className="text-red-600">{error}</p>
          <button className="btn btn-outline" onClick={fetchData}>Retry</button>
        </div>
      ) : rows.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left border-b">
              <th className="py-2 pr-3">Name</th>
              <th className="py-2 pr-3">Phone</th>
              <th className="py-2 pr-3">Service</th>
              <th className="py-2 pr-3">Date</th>
              <th className="py-2 pr-3">Time</th>
              <th className="py-2 pr-3">Doctor</th>
              <th className="py-2 pr-3">Country</th>
              <th className="py-2 pr-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-b hover:bg-slate-50">
                <td className="py-2 pr-3">{r.name}</td>
                <td className="py-2 pr-3">{r.phone}</td>
                <td className="py-2 pr-3">{r.service}</td>
                <td className="py-2 pr-3">{r.date}</td>
                <td className="py-2 pr-3">{r.time}</td>
                <td className="py-2 pr-3">{r.dentist}</td>
                <td className="py-2 pr-3">{r.country || '—'}</td>
                <td className="py-2 pr-3">
                  <button className="btn btn-outline" onClick={() => onDelete(r.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}