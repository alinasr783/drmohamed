import React, { useEffect, useState } from 'react'
import { listVideos, insertVideo, updateVideo, deleteVideo, uploadVideoThumb } from '../../hooks/supabase'

export default function VideosManager(){
  const [vItems, setVItems] = useState([])
  const [vEdits, setVEdits] = useState({})
  const [vThumbFile, setVThumbFile] = useState(null)
  const [vNew, setVNew] = useState({ title: '', type: 'youtube', videoUrl: '', thumbnail: '', year: '', tags: '' })
  const [vLoading, setVLoading] = useState(false)
  const [vError, setVError] = useState('')

  const fetchVideos = async () => {
    setVLoading(true)
    setVError('')
    try {
      const data = await listVideos()
      setVItems(Array.isArray(data) ? data : [])
    } catch (e) {
      console.error(e)
      setVError('فشل تحميل الفيديوهات من Supabase')
    } finally {
      setVLoading(false)
    }
  }

  useEffect(()=>{ fetchVideos() }, [])

  const onVideoEdit = (id, field, value) => setVEdits((p) => ({ ...p, [id]: { ...(p[id] || {}), [field]: value } }))
  const onVideoSave = async (v) => {
    const e = vEdits[v.id] || {}
    try {
      await updateVideo({ id: v.id, title: e.title ?? v.title, type: e.type ?? v.type, videoUrl: e.videoUrl ?? v.videoUrl, thumbnail: e.thumbnail ?? v.thumbnail, year: e.year ?? v.year, tags: typeof e.tags !== 'undefined' ? e.tags.split(',').map(t=>t.trim()).filter(Boolean) : v.tags, sort_order: typeof e.sort_order !== 'undefined' ? Number(e.sort_order) : v.sort_order })
      setVEdits((p) => ({ ...p, [v.id]: undefined }))
      await fetchVideos()
    } catch (err) { console.error(err); alert('Failed to save video') }
  }
  const onVideoDelete = async (v) => { if (!confirm('حذف هذا الفيديو؟')) return; try { await deleteVideo(v.id); setVItems((p)=>p.filter(i=>i.id!==v.id)) } catch(err){ console.error(err); alert('Delete failed') } }
  const onVideoAdd = async (e) => {
    e.preventDefault()
    try {
      let thumbUrl = vNew.thumbnail
      if (vThumbFile) {
        const { publicUrl } = await uploadVideoThumb(vThumbFile)
        thumbUrl = publicUrl
      }
      await insertVideo({ ...vNew, thumbnail: thumbUrl, tags: vNew.tags })
      setVNew({ title: '', type: 'youtube', videoUrl: '', thumbnail: '', year: '', tags: '' })
      setVThumbFile(null)
      await fetchVideos()
    } catch (err) { console.error(err); alert('Failed to add video') }
  }

  return (
    <div className="card p-4 mt-6">
      <h2 className="text-lg font-semibold">إدارة الفيديوهات</h2>
      <form className="mt-3 grid md:grid-cols-2 gap-3" onSubmit={onVideoAdd}>
        <input className="input" type="text" placeholder="عنوان الفيديو" value={vNew.title} onChange={(e)=>setVNew({...vNew, title:e.target.value})} />
        <select className="input" value={vNew.type} onChange={(e)=>setVNew({...vNew, type:e.target.value})}>
          <option value="youtube">YouTube</option>
          <option value="vimeo">Vimeo</option>
          <option value="file">ملف</option>
        </select>
        <input className="input" type="url" placeholder="رابط الفيديو" value={vNew.videoUrl} onChange={(e)=>setVNew({...vNew, videoUrl:e.target.value})} />
        <input className="input" type="text" placeholder="السنة" value={vNew.year} onChange={(e)=>setVNew({...vNew, year:e.target.value})} />
        <input className="input" type="text" placeholder="وسوم (مفصولة بفواصل)" value={vNew.tags} onChange={(e)=>setVNew({...vNew, tags:e.target.value})} />
        <div className="flex items-center gap-3">
          <input className="input" type="file" accept="image/*" onChange={(e)=>setVThumbFile(e.target.files?.[0]||null)} />
          <button className="btn btn-primary">إضافة فيديو</button>
        </div>
      </form>

      {vLoading ? (
        <p className="mt-3">جارِ التحميل…</p>
      ) : vError ? (
        <div className="mt-3 flex items-center gap-3">
          <p className="text-red-600">{vError}</p>
          <button className="btn btn-outline" onClick={fetchVideos}>إعادة المحاولة</button>
        </div>
      ) : (
        <div className="mt-4 grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {vItems.map((v)=>{
            const e = vEdits[v.id] || {}
            return (
              <div key={v.id} className="card overflow-hidden">
                <img className="w-full h-40 object-cover" src={e.thumbnail ?? v.thumbnail} alt={v.title} />
                <div className="p-3 space-y-2">
                  <input className="input w-full" type="text" placeholder="العنوان" value={e.title ?? v.title} onChange={(ev)=>onVideoEdit(v.id,'title',ev.target.value)} />
                  <input className="input w-full" type="text" placeholder="النوع" value={e.type ?? v.type} onChange={(ev)=>onVideoEdit(v.id,'type',ev.target.value)} />
                  <input className="input w-full" type="url" placeholder="رابط الفيديو" value={e.videoUrl ?? v.videoUrl} onChange={(ev)=>onVideoEdit(v.id,'videoUrl',ev.target.value)} />
                  <input className="input w-full" type="text" placeholder="السنة" value={e.year ?? v.year ?? ''} onChange={(ev)=>onVideoEdit(v.id,'year',ev.target.value)} />
                  <input className="input w-full" type="text" placeholder="وسوم" value={typeof e.tags !== 'undefined' ? e.tags : (Array.isArray(v.tags)?v.tags.join(', '):'')} onChange={(ev)=>onVideoEdit(v.id,'tags',ev.target.value)} />
                  <input className="input w-full" type="text" placeholder="الترتيب" value={e.sort_order ?? (v.sort_order ?? '')} onChange={(ev)=>onVideoEdit(v.id,'sort_order',ev.target.value)} />
                  <div className="flex items-center justify-between pt-2">
                    <button className="btn btn-primary" onClick={()=>onVideoSave(v)}>حفظ</button>
                    <button className="btn btn-outline" onClick={()=>onVideoDelete(v)}>حذف</button>
                  </div>
                </div>
              </div>
            )
          })}
          {vItems.length===0 && <p className="text-slate-600">لا توجد فيديوهات.</p>}
        </div>
      )}
    </div>
  )
}