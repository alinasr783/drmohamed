import React, { useEffect, useState } from 'react'
import { listBookings, deleteBooking, uploadAhlyImage, insertAhlyGallery, listAhlyGallery, updateAhlyGallery, deleteAhlyGallery } from '../hooks/supabase'

export default function Dashboard() {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  // Ahly Gallery state
  const [gCaption, setGCaption] = useState('')
  const [gFile, setGFile] = useState(null)
  const [gUploading, setGUploading] = useState(false)
  const [gError, setGError] = useState('')
  const [gItems, setGItems] = useState([])
  const [gEdits, setGEdits] = useState({})

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

  useEffect(() => {
    // simple auth guard
    if (localStorage.getItem('admin_auth') !== 'true') {
      window.location.href = '/login'
      return
    }
    fetchData()
    fetchGallery()
  }, [])

  const fetchGallery = async () => {
    try {
      const data = await listAhlyGallery()
      setGItems(Array.isArray(data) ? data : [])
    } catch (err) {
      console.error(err)
    }
  }

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

  const onUploadGallery = async (e) => {
    e.preventDefault()
    setGError('')
    if (!gFile) {
      setGError('Please select an image file.')
      return
    }
    setGUploading(true)
    try {
      const { publicUrl } = await uploadAhlyImage(gFile)
      await insertAhlyGallery({ src: publicUrl, caption: gCaption || '' })
      setGCaption('')
      setGFile(null)
      await fetchGallery()
      alert('Image uploaded and saved to gallery.')
    } catch (err) {
      console.error(err)
      setGError('Upload failed. Check storage bucket and policies.')
    } finally {
      setGUploading(false)
    }
  }

  const onEditChange = (id, field, value) => {
    setGEdits((prev) => ({
      ...prev,
      [id]: {
        ...(prev[id] || {}),
        [field]: value,
      },
    }))
  }

  const onSaveGallery = async (item) => {
    const edits = gEdits[item.id] || {}
    const payload = {
      id: item.id,
      caption: typeof edits.caption !== 'undefined' ? edits.caption : item.caption || '',
      src: typeof edits.src !== 'undefined' ? edits.src : item.src,
      tags: typeof edits.tags !== 'undefined' ? edits.tags.split(',').map((t) => t.trim()).filter(Boolean) : (Array.isArray(item.tags) ? item.tags : []),
    }
    try {
      await updateAhlyGallery(payload)
      setGEdits((prev) => ({ ...prev, [item.id]: undefined }))
      await fetchGallery()
    } catch (err) {
      console.error(err)
      alert('Failed to save changes.')
    }
  }

  const onDeleteGallery = async (item) => {
    const ok = confirm('حذف هذه الصورة من المعرض؟')
    if (!ok) return
    try {
      await deleteAhlyGallery(item.id)
      setGItems((prev) => prev.filter((g) => g.id !== item.id))
    } catch (err) {
      console.error(err)
      alert('Failed to delete gallery item.')
    }
  }

  const onMoveGallery = async (item, dir) => {
    const delta = dir === 'up' ? -1 : 1
    const currentOrder = typeof item.sort_order === 'number' ? item.sort_order : 0
    try {
      await updateAhlyGallery({ id: item.id, sort_order: currentOrder + delta })
      await fetchGallery()
    } catch (err) {
      console.error(err)
      alert('Failed to reorder item.')
    }
  }

  return (
    <section className="section">
      <div className="container">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
          <button className="btn btn-outline" onClick={fetchData}>Refresh</button>
        </div>
        <p className="text-slate-600 mt-1">View and manage bookings. Upload and manage Al Ahly Gallery.</p>
        <div className="card p-4 mt-4 overflow-x-auto">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-red-600">{error}</p>
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

        {/* Ahly Gallery Manager */}
        <div className="card p-4 mt-6">
          <h2 className="text-lg font-semibold">إدارة معرض الأهلي</h2>
          <p className="text-slate-600 mt-1">ارفع الصور إلى Supabase واحفظ العنوان والوسوم.</p>
          <form className="mt-3 grid md:grid-cols-[1fr_2fr_auto] gap-3 items-center" onSubmit={onUploadGallery}>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setGFile(e.target.files?.[0] || null)}
              className="input"
            />
            <input
              type="text"
              placeholder="عنوان الصورة (اختياري)"
              value={gCaption}
              onChange={(e) => setGCaption(e.target.value)}
              className="input"
            />
            <button className="btn btn-primary" disabled={gUploading}>
              {gUploading ? 'جاري الرفع…' : 'رفع وحفظ'}
            </button>
          </form>
          {gError && <p className="text-red-600 mt-2">{gError}</p>}

          {/* Gallery list with CRUD */}
          <div className="mt-4 grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {gItems.map((g) => {
              const edit = gEdits[g.id] || {}
              return (
                <div key={g.id} className="card overflow-hidden">
                  <img className="w-full h-40 object-cover" src={edit.src ?? g.src} alt={g.caption || 'Gallery image'} />
                  <div className="p-3 space-y-2">
                    <input
                      className="input w-full"
                      type="text"
                      placeholder="رابط الصورة (src)"
                      value={edit.src ?? g.src}
                      onChange={(e) => onEditChange(g.id, 'src', e.target.value)}
                    />
                    <input
                      className="input w-full"
                      type="text"
                      placeholder="العنوان"
                      value={edit.caption ?? g.caption ?? ''}
                      onChange={(e) => onEditChange(g.id, 'caption', e.target.value)}
                    />
                    <input
                      className="input w-full"
                      type="text"
                      placeholder="وسوم (مفصولة بفواصل)"
                      value={edit.tags ?? (Array.isArray(g.tags) ? g.tags.join(', ') : '')}
                      onChange={(e) => onEditChange(g.id, 'tags', e.target.value)}
                    />
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex gap-2">
                        <button className="btn btn-primary" onClick={() => onSaveGallery(g)}>حفظ</button>
                        <button className="btn btn-outline" onClick={() => onDeleteGallery(g)}>حذف</button>
                      </div>
                      <div className="flex gap-2">
                        <button className="btn btn-outline" title="أعلى" onClick={() => onMoveGallery(g, 'up')}>
                          <i className="fa-solid fa-arrow-up"></i>
                        </button>
                        <button className="btn btn-outline" title="أسفل" onClick={() => onMoveGallery(g, 'down')}>
                          <i className="fa-solid fa-arrow-down"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
            {gItems.length === 0 && <p className="text-slate-600">لا توجد صور في المعرض بعد.</p>}
          </div>
        </div>
      </div>
    </section>
  )
}
