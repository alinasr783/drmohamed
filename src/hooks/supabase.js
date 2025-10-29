// Simple Supabase REST helper to manage booking rows

const SUPABASE_URL = 'https://pvtzlkghifwckxeypdye.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB2dHpsa2doaWZ3Y2t4ZXlwZHllIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg1MDQ3NzIsImV4cCI6MjA3NDA4MDc3Mn0.dF-xxmkWNijfWlj_NxDAPWrSS5D43YiPUUwKInS1mFo'

const BASE_REST = `${SUPABASE_URL}/rest/v1`
const TABLE = 'drmohamed01_bookings'

export async function insertBooking({ service, date, time, dentist, name, phone, country }) {
  const res = await fetch(`${BASE_REST}/${TABLE}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'apikey': SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      'Prefer': 'return=representation',
    },
    body: JSON.stringify({ service, date, time, dentist, name, phone, country }),
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Supabase insert failed: ${res.status} ${text}`)
  }

  const data = await res.json()
  return data && data[0] ? data[0] : data
}

// Fetch all bookings (latest first)
export async function listBookings() {
  const url = `${BASE_REST}/${TABLE}?select=*&order=created_at.desc`
  const res = await fetch(url, {
    headers: {
      'Accept': 'application/json',
      'apikey': SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
    },
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Supabase list failed: ${res.status} ${text}`)
  }
  return res.json()
}

// Delete a booking by id
export async function deleteBooking(id) {
  const url = `${BASE_REST}/${TABLE}?id=eq.${id}`
  const res = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'apikey': SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
    },
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Supabase delete failed: ${res.status} ${text}`)
  }
  return true
}