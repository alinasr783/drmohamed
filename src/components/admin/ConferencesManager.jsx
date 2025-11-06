import React, { useEffect, useState } from 'react'
import { listConferences, insertConference, updateConference, deleteConference, uploadConferenceImage } from '../../hooks/supabase'

export default function ConferencesManager(){
  const [confItems, setConfItems] = useState([])
  const [confEdits, setConfEdits] = useState({})
  const [confNew, setConfNew] = useState({ title: '', location: '', year: '', image: '', images: '', tags: '' })
  const [confImageFile, setConfImageFile] = useState(null)
  const [confLoading, setConfLoading] = useState(false)
  const [confError, setConfError] = useState('')

  const fetchConferences = async () => {
    setConfLoading(true); setConfError('')
    try {
      const data = await listConferences()
      setConfItems(Array.isArray(data) ? data : [])
    } catch (e) { console.error(e); setConfError('فشل جلب المؤتمرات.') }
    finally { setConfLoading(false) }
  }

  useEffect(()=>{ fetchConferences() }, [])

  const onConfEdit = (id, field, value) => setConfEdits((p)=>({ ...p, [id]: { ...(p[id]||{}), [field]: value } }))
  const onConfSave = async (c) => {
    const e = confEdits[c.id] || {}
    try {
      await updateConference({ id: c.id, title: e.title ?? c.title, location: e.location ?? c.location, year: typeof (e.year ?? c.year) !== 'undefined' ? Number(e.year ?? c.year) : c.year, image: e.image ?? c.image, images: typeof e.images !== 'undefined' ? e.images.split(',').map(s=>s.trim()).filter(Boolean) : c.images, tags: typeof e.tags !== 'undefined' ? e.tags.split(',').map(s=>s.trim()).filter(Boolean) : c.tags, sort_order: typeof e.sort_order !== 'undefined' ? Number(e.sort_order) : c.sort_order })
      setConfEdits((p)=>({ ...p, [c.id]: undefined }))
      await fetchConferences()
    } catch(err){ console.error(err); alert('Failed to save conference') }
  }
  const onConfDelete = async (c) => { if (!confirm('حذف هذا المؤتمر؟')) return; try { await deleteConference(c.id); setConfItems((p)=>p.filter(i=>i.id!==c.id)) } catch(err){ console.error(err); alert('Delete failed') } }
  const onConfAdd = async (e) => {
    e.preventDefault()
    try {
      let mainImageUrl = confNew.image
      if (confImageFile) {
        const { publicUrl } = await uploadConferenceImage(confImageFile)
        mainImageUrl = publicUrl
      }
      await insertConference({ ...confNew, image: mainImageUrl, year: confNew.year ? Number(confNew.year) : null })
      setConfNew({ title:'', location:'', year:'', image:'', images:'', tags:'' })
      setConfImageFile(null)
      await fetchConferences()
    } catch(err){ console.error(err); alert('Failed to add conference') }
  }

  return (
    <div className="card p-4 mt-6">
      <h2 className="text-lg font-semibold">إدارة المؤتمرات</h2>
      <form className="mt-3 grid md:grid-cols-2 gap-3" onSubmit={onConfAdd}>
        <input className="input" type="text" placeholder="العنوان" value={confNew.title} onChange={(e)=>setConfNew({...confNew, title:e.target.value})} />
        <input className="input" type="text" placeholder="المكان" value={confNew.location} onChange={(e)=>setConfNew({...confNew, location:e.target.value})} />
        <input className="input" type="text" placeholder="السنة" value={confNew.year} onChange={(e)=>setConfNew({...confNew, year:e.target.value})} />
        <input className="input" type="text" placeholder="وسوم (مفصولة بفواصل)" value={confNew.tags} onChange={(e)=>setConfNew({...confNew, tags:e.target.value})} />
        <input className="input" type="text" placeholder="صور إضافية (روابط مفصولة بفواصل)" value={confNew.images} onChange={(e)=>setConfNew({...confNew, images:e.target.value})} />
        <div className="flex items-center gap-3">
          <input className="input" type="file" accept="image/*" onChange={(e)=>setConfImageFile(e.target.files?.[0]||null)} />
          <button className="btn btn-primary">إضافة مؤتمر</button>
        </div>
      </form>
      <div className="mt-4 grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {confItems.map((c)=>{
          const e = confEdits[c.id] || {}
          return (
            <div key={c.id} className="card overflow-hidden">
              <img className="w-full h-40 object-cover" src={e.image ?? c.image} alt={c.title} />
              <div className="p-3 space-y-2">
                <input className="input w-full" type="text" placeholder="العنوان" value={e.title ?? c.title} onChange={(ev)=>onConfEdit(c.id,'title',ev.target.value)} />
                <input className="input w-full" type="text" placeholder="المكان" value={e.location ?? c.location} onChange={(ev)=>onConfEdit(c.id,'location',ev.target.value)} />
                <input className="input w-full" type="text" placeholder="السنة" value={e.year ?? c.year ?? ''} onChange={(ev)=>onConfEdit(c.id,'year',ev.target.value)} />
                <input className="input w-full" type="text" placeholder="الصورة الرئيسية" value={e.image ?? c.image ?? ''} onChange={(ev)=>onConfEdit(c.id,'image',ev.target.value)} />
                <input className="input w-full" type="text" placeholder="صور إضافية" value={typeof e.images !== 'undefined' ? e.images : (Array.isArray(c.images)?c.images.join(', '):'')} onChange={(ev)=>onConfEdit(c.id,'images',ev.target.value)} />
                <input className="input w_full" type="text" placeholder="وسوم" value={typeof e.tags !== 'undefined' ? e.tags : (Array.isArray(c.tags)?c.tags.join(', '):'')} onChange={(ev)=>onConfEdit(c.id,'tags',ev.target.value)} />
                <input className="input w_full" type="text" placeholder="الترتيب" value={e.sort_order ?? (c.sort_order ?? '')} onChange={(ev)=>onConfEdit(c.id,'sort_order',ev.target.value)} />
                <div className="flex items-center justify-between pt-2">
                  <button className="btn btn-primary" onClick={()=>onConfSave(c)}>حفظ</button>
                  <button className="btn btn-outline" onClick={()=>onConfDelete(c)}>حذف</button>
                </div>
              </div>
            </div>
          )
        })}
        {confItems.length===0 && <p className="text-slate-600">لا توجد مؤتمرات.</p>}
      </div>
    </div>
  )
}