import React, { useEffect, useState } from 'react'
import { listServices, insertService, updateService, deleteService, uploadServiceImage } from '../../hooks/supabase'

export default function ServicesManager(){
  const [sItems, setSItems] = useState([])
  const [sEdits, setSEdits] = useState({})
  const [sImageFile, setSImageFile] = useState(null)
  const [sNew, setSNew] = useState({ title: '', subtitle: '', icon: '', image: '' })
  const [sLoading, setSLoading] = useState(false)
  const [sError, setSError] = useState('')

  const fetchServices = async () => {
    setSLoading(true)
    setSError('')
    try {
      const data = await listServices()
      setSItems(Array.isArray(data) ? data : [])
    } catch (e) { console.error(e); setSError('فشل تحميل الخدمات من Supabase') }
    finally { setSLoading(false) }
  }

  useEffect(()=>{ fetchServices() }, [])

  const onServiceEdit = (id, field, value) => setSEdits((p)=>({ ...p, [id]: { ...(p[id]||{}), [field]: value } }))
  const onServiceSave = async (s) => {
    const e = sEdits[s.id] || {}
    try {
      await updateService({ id: s.id, title: e.title ?? s.title, subtitle: e.subtitle ?? s.subtitle, icon: e.icon ?? s.icon, image: e.image ?? s.image, sort_order: typeof e.sort_order !== 'undefined' ? Number(e.sort_order) : s.sort_order })
      setSEdits((p)=>({ ...p, [s.id]: undefined }))
      await fetchServices()
    } catch(err){ console.error(err); alert('Failed to save service') }
  }
  const onServiceDelete = async (s) => { if (!confirm('حذف هذه الخدمة؟')) return; try { await deleteService(s.id); setSItems((p)=>p.filter(i=>i.id!==s.id)) } catch(err){ console.error(err); alert('Delete failed') } }
  const onServiceAdd = async (e) => {
    e.preventDefault()
    try {
      let imgUrl = sNew.image
      if (sImageFile) {
        const { publicUrl } = await uploadServiceImage(sImageFile)
        imgUrl = publicUrl
      }
      await insertService({ ...sNew, image: imgUrl })
      setSNew({ title:'', subtitle:'', icon:'', image:'' })
      setSImageFile(null)
      await fetchServices()
    } catch(err){ console.error(err); alert('Failed to add service') }
  }

  return (
    <div className="card p-4 mt-6">
      <h2 className="text-lg font-semibold">إدارة الخدمات</h2>
      <form className="mt-3 grid md:grid-cols-2 gap-3" onSubmit={onServiceAdd}>
        <input className="input" type="text" placeholder="العنوان" value={sNew.title} onChange={(e)=>setSNew({...sNew, title:e.target.value})} />
        <input className="input" type="text" placeholder="وصف مختصر" value={sNew.subtitle} onChange={(e)=>setSNew({...sNew, subtitle:e.target.value})} />
        <input className="input" type="text" placeholder="أيقونة (اختياري)" value={sNew.icon} onChange={(e)=>setSNew({...sNew, icon:e.target.value})} />
        <div className="flex items-center gap-3">
          <input className="input" type="file" accept="image/*" onChange={(e)=>setSImageFile(e.target.files?.[0]||null)} />
          <button className="btn btn-primary">إضافة خدمة</button>
        </div>
      </form>

      {sLoading ? (
        <p className="mt-3">جارِ التحميل…</p>
      ) : sError ? (
        <div className="mt-3 flex items-center gap-3">
          <p className="text-red-600">{sError}</p>
          <button className="btn btn-outline" onClick={fetchServices}>إعادة المحاولة</button>
        </div>
      ) : (
        <div className="mt-4 grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {sItems.map((s)=>{
            const e = sEdits[s.id] || {}
            return (
              <div key={s.id} className="card overflow-hidden">
                <img className="w-full h-40 object-cover" src={e.image ?? s.image} alt={s.title} />
                <div className="p-3 space-y-2">
                  <input className="input w-full" type="text" placeholder="العنوان" value={e.title ?? s.title} onChange={(ev)=>onServiceEdit(s.id,'title',ev.target.value)} />
                  <input className="input w-full" type="text" placeholder="الوصف" value={e.subtitle ?? s.subtitle} onChange={(ev)=>onServiceEdit(s.id,'subtitle',ev.target.value)} />
                  <input className="input w-full" type="text" placeholder="أيقونة" value={e.icon ?? s.icon ?? ''} onChange={(ev)=>onServiceEdit(s.id,'icon',ev.target.value)} />
                  <input className="input w-full" type="text" placeholder="صورة" value={e.image ?? s.image ?? ''} onChange={(ev)=>onServiceEdit(s.id,'image',ev.target.value)} />
                  <input className="input w-full" type="text" placeholder="الترتيب" value={e.sort_order ?? (s.sort_order ?? '')} onChange={(ev)=>onServiceEdit(s.id,'sort_order',ev.target.value)} />
                  <div className="flex items-center justify-between pt-2">
                    <button className="btn btn-primary" onClick={()=>onServiceSave(s)}>حفظ</button>
                    <button className="btn btn-outline" onClick={()=>onServiceDelete(s)}>حذف</button>
                  </div>
                </div>
              </div>
            )
          })}
          {sItems.length===0 && <p className="text-slate-600">لا توجد خدمات.</p>}
        </div>
      )}
    </div>
  )
}