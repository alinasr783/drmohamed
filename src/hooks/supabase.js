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

// Generic REST helpers and additional content tables
const VIDEOS_TABLE = 'drmohamed01_videos'
const VIDEOS_BUCKET = 'drmohamed01-videos-thumbs'
const TESTIMONIALS_TABLE = 'drmohamed01_testimonials'
const SERVICES_TABLE = 'drmohamed01_services'
const SERVICES_BUCKET = 'drmohamed01-services-images'
const CLINICS_TABLE = 'drmohamed01_clinics'
const CLINIC_IMAGES_BUCKET = 'drmohamed01-clinics-images'
const WORKING_HOURS_TABLE = 'drmohamed01_working_hours'
const CONFERENCES_TABLE = 'drmohamed01_conferences'
const CONFERENCES_BUCKET = 'drmohamed01-conferences-images'

async function restInsert(table, data) {
  const res = await fetch(`${BASE_REST}/${table}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'apikey': SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      'Prefer': 'return=representation',
    },
    body: JSON.stringify(data),
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Supabase insert (${table}) failed: ${res.status} ${text}`)
  }
  const json = await res.json()
  return json && json[0] ? json[0] : json
}

async function restList(table, order = 'created_at.desc') {
  const url = `${BASE_REST}/${table}?select=*&order=${encodeURIComponent(order)}`
  const res = await fetch(url, {
    headers: {
      'Accept': 'application/json',
      'apikey': SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
    },
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Supabase list (${table}) failed: ${res.status} ${text}`)
  }
  return res.json()
}

async function restUpdate(table, id, payload) {
  if (!id) throw new Error('Missing id for update')
  const url = `${BASE_REST}/${table}?id=eq.${id}`
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
    throw new Error(`Supabase update (${table}) failed: ${res.status} ${text}`)
  }
  const json = await res.json()
  return json && json[0] ? json[0] : json
}

async function restDelete(table, id) {
  if (!id) throw new Error('Missing id for delete')
  const url = `${BASE_REST}/${table}?id=eq.${id}`
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
    throw new Error(`Supabase delete (${table}) failed: ${res.status} ${text}`)
  }
  return true
}

export async function uploadToBucket(bucket, file) {
  if (!file) throw new Error('No file provided')
  const safeName = file.name.replace(/\s+/g, '_')
  const objectPath = `${Date.now()}_${safeName}`
  const url = `${SUPABASE_URL}/storage/v1/object/${bucket}/${objectPath}`
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
  const publicUrl = `${SUPABASE_URL}/storage/v1/object/public/${bucket}/${objectPath}`
  return { publicUrl, objectPath }
}

// Videos
export async function listVideos() {
  return restList(VIDEOS_TABLE, 'sort_order.asc.nullslast,created_at.desc')
}
export async function insertVideo({ title, type, videoUrl, thumbnail, year, tags }) {
  const payload = { title, type, videoUrl, thumbnail, year, tags: Array.isArray(tags) ? tags : (typeof tags === 'string' && tags ? tags.split(',').map(t => t.trim()).filter(Boolean) : []) }
  return restInsert(VIDEOS_TABLE, payload)
}
export async function updateVideo({ id, title, type, videoUrl, thumbnail, year, tags, sort_order }) {
  const payload = {}
  if (typeof title !== 'undefined') payload.title = title
  if (typeof type !== 'undefined') payload.type = type
  if (typeof videoUrl !== 'undefined') payload.videoUrl = videoUrl
  if (typeof thumbnail !== 'undefined') payload.thumbnail = thumbnail
  if (typeof year !== 'undefined') payload.year = year
  if (typeof sort_order !== 'undefined') payload.sort_order = sort_order
  if (typeof tags !== 'undefined') payload.tags = Array.isArray(tags) ? tags : []
  return restUpdate(VIDEOS_TABLE, id, payload)
}
export async function deleteVideo(id) { return restDelete(VIDEOS_TABLE, id) }
export async function uploadVideoThumb(file) { return uploadToBucket(VIDEOS_BUCKET, file) }

// Testimonials
export async function listTestimonials() { return restList(TESTIMONIALS_TABLE, 'sort_order.asc.nullslast,created_at.desc') }
export async function insertTestimonial({ name, message }) { return restInsert(TESTIMONIALS_TABLE, { name, message }) }
export async function updateTestimonial({ id, name, message, sort_order }) {
  const payload = {}
  if (typeof name !== 'undefined') payload.name = name
  if (typeof message !== 'undefined') payload.message = message
  if (typeof sort_order !== 'undefined') payload.sort_order = sort_order
  return restUpdate(TESTIMONIALS_TABLE, id, payload)
}
export async function deleteTestimonial(id) { return restDelete(TESTIMONIALS_TABLE, id) }

// Services
export async function listServices() { return restList(SERVICES_TABLE, 'sort_order.asc.nullslast,created_at.desc') }
export async function insertService({ title, subtitle, icon, image }) { return restInsert(SERVICES_TABLE, { title, subtitle, icon, image }) }
export async function updateService({ id, title, subtitle, icon, image, sort_order }) {
  const payload = {}
  if (typeof title !== 'undefined') payload.title = title
  if (typeof subtitle !== 'undefined') payload.subtitle = subtitle
  if (typeof icon !== 'undefined') payload.icon = icon
  if (typeof image !== 'undefined') payload.image = image
  if (typeof sort_order !== 'undefined') payload.sort_order = sort_order
  return restUpdate(SERVICES_TABLE, id, payload)
}
export async function deleteService(id) { return restDelete(SERVICES_TABLE, id) }
export async function uploadServiceImage(file) { return uploadToBucket(SERVICES_BUCKET, file) }

// Clinics
export async function listClinics() { return restList(CLINICS_TABLE, 'sort_order.asc.nullslast,created_at.desc') }
export async function insertClinic({ name, address_en, address_ar, phone, map_url }) { return restInsert(CLINICS_TABLE, { name, address_en, address_ar, phone, map_url }) }
export async function updateClinic({ id, name, address_en, address_ar, phone, map_url, sort_order }) {
  const payload = {}
  if (typeof name !== 'undefined') payload.name = name
  if (typeof address_en !== 'undefined') payload.address_en = address_en
  if (typeof address_ar !== 'undefined') payload.address_ar = address_ar
  if (typeof phone !== 'undefined') payload.phone = phone
  if (typeof map_url !== 'undefined') payload.map_url = map_url
  if (typeof sort_order !== 'undefined') payload.sort_order = sort_order
  return restUpdate(CLINICS_TABLE, id, payload)
}
export async function deleteClinic(id) { return restDelete(CLINICS_TABLE, id) }
export async function uploadClinicImage(file) { return uploadToBucket(CLINIC_IMAGES_BUCKET, file) }

// Working Hours
export async function listWorkingHours() { return restList(WORKING_HOURS_TABLE, 'clinic_id.asc,day.asc') }
export async function insertWorkingHour({ clinic_id, day, hours }) { return restInsert(WORKING_HOURS_TABLE, { clinic_id, day, hours }) }
export async function updateWorkingHour({ id, clinic_id, day, hours }) {
  const payload = {}
  if (typeof clinic_id !== 'undefined') payload.clinic_id = clinic_id
  if (typeof day !== 'undefined') payload.day = day
  if (typeof hours !== 'undefined') payload.hours = hours
  return restUpdate(WORKING_HOURS_TABLE, id, payload)
}
export async function deleteWorkingHour(id) { return restDelete(WORKING_HOURS_TABLE, id) }

// Conferences
export async function listConferences() { return restList(CONFERENCES_TABLE, 'sort_order.asc.nullslast,created_at.desc') }
export async function insertConference({ title, location, year, image, images, tags }) {
  const payload = {
    title,
    location,
    year,
    image,
    images: Array.isArray(images) ? images : (typeof images === 'string' && images ? images.split(',').map(s => s.trim()).filter(Boolean) : []),
    tags: Array.isArray(tags) ? tags : (typeof tags === 'string' && tags ? tags.split(',').map(s => s.trim()).filter(Boolean) : [])
  }
  return restInsert(CONFERENCES_TABLE, payload)
}
export async function updateConference({ id, title, location, year, image, images, tags, sort_order }) {
  const payload = {}
  if (typeof title !== 'undefined') payload.title = title
  if (typeof location !== 'undefined') payload.location = location
  if (typeof year !== 'undefined') payload.year = year
  if (typeof image !== 'undefined') payload.image = image
  if (typeof images !== 'undefined') payload.images = Array.isArray(images) ? images : []
  if (typeof tags !== 'undefined') payload.tags = Array.isArray(tags) ? tags : []
  if (typeof sort_order !== 'undefined') payload.sort_order = sort_order
  return restUpdate(CONFERENCES_TABLE, id, payload)
}
export async function deleteConference(id) { return restDelete(CONFERENCES_TABLE, id) }
export async function uploadConferenceImage(file) { return uploadToBucket(CONFERENCES_BUCKET, file) }
