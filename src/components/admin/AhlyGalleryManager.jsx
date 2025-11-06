import React, { useEffect, useState } from 'react'
import { uploadAhlyImage, insertAhlyGallery, listAhlyGallery, updateAhlyGallery, deleteAhlyGallery } from '../../hooks/supabase'

export default function AhlyGalleryManager() {
  const [gCaption, setGCaption] = useState('')
  const [gFile, setGFile] = useState(null)
  const [gUploading, setGUploading] = useState(false)
  const [gError, setGError] = useState('')
  const [gItems, setGItems] = useState([])
  const [gEdits, setGEdits] = useState({})
  const [gFetchError, setGFetchError] = useState('')
  const [gLoading, setGLoading] = useState(false)

  const fetchGallery = async () => {
    setGLoading(true)
    setGFetchError('')
    try {
      const data = await listAhlyGallery()
      setGItems(Array.isArray(data) ? data : [])
    } catch (err) {
      console.error(err)
      setGFetchError('فشل تحميل بيانات المعرض من Supabase')
    } finally {
      setGLoading(false)
    }
  }

  useEffect(() => { fetchGallery() }, [])

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
      [id]: { ...(prev[id] || {}), [field]: value },
    }))
  }

  const onSaveGallery = async (item) => {
    const edits = gEdits[item.id] || {}
    const payload = {
      id: item.id,
      caption: typeof edits.caption !== 'undefined' ? edits.caption : item.caption || '',
      src: typeof edits.src !== 'undefined' ? edits.src : item.src,
      tags: typeof edits.tags !== 'undefined' ? edits.tags.split(',').map((t) => t.trim()).filter(Boolean) : (Array.isArray(item.tags) ? item.tags : []),
      sort_order: typeof edits.sort_order !== 'undefined' ? Number(edits.sort_order) : item.sort_order,
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
    <div className="card p-4 mt-6">
      <h2 className="text-lg font-semibold">إدارة معرض الأهلي</h2>
      <p className="text-slate-600 mt-1">ارفع الصور إلى Supabase واحفظ العنوان والوسوم.</p>
      <form className="mt-3 grid md:grid-cols-[1fr_2fr_auto] gap-3 items-center" onSubmit={onUploadGallery}>
        <input type="file" accept="image/*" onChange={(e) => setGFile(e.target.files?.[0] || null)} className="input" />
        <input type="text" placeholder="عنوان الصورة (اختياري)" value={gCaption} onChange={(e) => setGCaption(e.target.value)} className="input" />
        <button className="btn btn-primary" disabled={gUploading}>{gUploading ? 'جاري الرفع…' : 'رفع وحفظ'}</button>
      </form>
      {gError && <p className="text-red-600 mt-2">{gError}</p>}

      {gLoading ? (
        <p className="mt-3">جارِ التحميل…</p>
      ) : gFetchError ? (
        <div className="mt-3 flex items-center gap-3">
          <p className="text-red-600">{gFetchError}</p>
          <button className="btn btn-outline" onClick={fetchGallery}>إعادة المحاولة</button>
        </div>
      ) : (
        <div className="mt-4 grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {gItems.map((g) => {
            const edit = gEdits[g.id] || {}
            return (
              <div key={g.id} className="card overflow-hidden">
                <img className="w-full h-40 object-cover" src={edit.src ?? g.src} alt={g.caption || 'Gallery image'} />
                <div className="p-3 space-y-2">
                  <input className="input w-full" type="text" placeholder="رابط الصورة (src)" value={edit.src ?? g.src} onChange={(e) => onEditChange(g.id, 'src', e.target.value)} />
                  <input className="input w-full" type="text" placeholder="العنوان" value={edit.caption ?? g.caption ?? ''} onChange={(e) => onEditChange(g.id, 'caption', e.target.value)} />
                  <input className="input w-full" type="text" placeholder="وسوم" value={typeof edit.tags !== 'undefined' ? edit.tags : (Array.isArray(g.tags) ? g.tags.join(', ') : '')} onChange={(e) => onEditChange(g.id, 'tags', e.target.value)} />
                  <input className="input w-full" type="text" placeholder="الترتيب" value={edit.sort_order ?? (g.sort_order ?? '')} onChange={(e) => onEditChange(g.id, 'sort_order', e.target.value)} />
                  <div className="flex items-center justify-between pt-2">
                    <button className="btn btn-primary" onClick={() => onSaveGallery(g)}>حفظ</button>
                    <div className="flex items-center gap-2">
                      <button className="btn btn-outline" title="أعلى" onClick={() => onMoveGallery(g, 'up')}>
                        <i className="fa-solid fa-arrow-up"></i>
                      </button>
                      <button className="btn btn-outline" title="أسفل" onClick={() => onMoveGallery(g, 'down')}>
                        <i className="fa-solid fa-arrow-down"></i>
                      </button>
                      <button className="btn btn-outline" onClick={() => onDeleteGallery(g)}>حذف</button>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
          {gItems.length === 0 && <p className="text-slate-600">لا توجد صور في المعرض بعد.</p>}
        </div>
      )}
    </div>
  )
}