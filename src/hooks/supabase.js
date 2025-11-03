// Simple Supabase REST helper to manage booking rows

const SUPABASE_URL = 'https://oghuhszmbwihbgwhttpj.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9naHVoc3ptYndpaGJnd2h0dHBqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIxMzMxNDksImV4cCI6MjA3NzcwOTE0OX0.p8qLWNF0R35qXXQV0-GftMoDXM4LKcmWlvL5B1bnrYc'

const BASE_REST = `${SUPABASE_URL}/rest/v1`
const TABLE = 'drmohamed01_bookings'
// Ahly Gallery
const GALLERY_TABLE = 'drmohamed01_ahly_gallery'
const GALLERY_BUCKET = 'drmohamed01-ahly-gallery'

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

// Upload an image file to Supabase Storage (public bucket) and return the public URL
export async function uploadAhlyImage(file) {
  if (!file) throw new Error('No file provided')
  const safeName = file.name.replace(/\s+/g, '_')
  const objectPath = `${Date.now()}_${safeName}`
  const url = `${SUPABASE_URL}/storage/v1/object/${GALLERY_BUCKET}/${objectPath}`
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': file.type || 'application/octet-stream',
      'apikey': SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
    },
    body: file,
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Supabase storage upload failed: ${res.status} ${text}`)
  }
  // Build public URL (bucket must be public)
  const publicUrl = `${SUPABASE_URL}/storage/v1/object/public/${GALLERY_BUCKET}/${objectPath}`
  return { publicUrl, objectPath }
}

// Insert a gallery row (src + caption)
export async function insertAhlyGallery({ src, caption }) {
  const res = await fetch(`${BASE_REST}/${GALLERY_TABLE}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'apikey': SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      'Prefer': 'return=representation',
    },
    body: JSON.stringify({ src, caption }),
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Supabase insert (gallery) failed: ${res.status} ${text}`)
  }
  const data = await res.json()
  return data && data[0] ? data[0] : data
}

// Fetch all gallery images (latest first)
export async function listAhlyGallery() {
  const url = `${BASE_REST}/${GALLERY_TABLE}?select=*&order=sort_order.asc.nullslast,created_at.desc`
  const res = await fetch(url, {
    headers: {
      'Accept': 'application/json',
      'apikey': SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
    },
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Supabase list (gallery) failed: ${res.status} ${text}`)
  }
  return res.json()
}

// Update a gallery row by id (supports caption, tags, src, sort_order)
export async function updateAhlyGallery({ id, caption, tags, src, sort_order }) {
  if (!id) throw new Error('Missing id for update')
  const url = `${BASE_REST}/${GALLERY_TABLE}?id=eq.${id}`
  const payload = {}
  if (typeof caption !== 'undefined') payload.caption = caption
  if (typeof src !== 'undefined') payload.src = src
  if (typeof sort_order !== 'undefined') payload.sort_order = sort_order
  if (typeof tags !== 'undefined') payload.tags = Array.isArray(tags) ? tags : []

  const res = await fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'apikey': SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      'Prefer': 'return=representation',
    },
    body: JSON.stringify(payload),
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Supabase update (gallery) failed: ${res.status} ${text}`)
  }
  const data = await res.json()
  return data && data[0] ? data[0] : data
}

// Delete a gallery row by id
export async function deleteAhlyGallery(id) {
  if (!id) throw new Error('Missing id for delete')
  const url = `${BASE_REST}/${GALLERY_TABLE}?id=eq.${id}`
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
    throw new Error(`Supabase delete (gallery) failed: ${res.status} ${text}`)
  }
  return true
}
