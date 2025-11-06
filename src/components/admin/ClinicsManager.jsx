import React, { useEffect, useState } from 'react'
import { listClinics, insertClinic, updateClinic, deleteClinic } from '../../hooks/supabase'

export default function ClinicsManager(){
  const [cItems, setCItems] = useState([])
  const [cEdits, setCEdits] = useState({})
  const [cNew, setCNew] = useState({ name: '', address_en: '', address_ar: '', phone: '', map_url: '' })
  const [cLoading, setCLoading] = useState(false)
  const [cError, setCError] = useState('')

  const fetchClinics = async () => {
    setCLoading(true); setCError('')
    try {
      const data = await listClinics()
      setCItems(Array.isArray(data) ? data : [])
    } catch (e) { console.error(e); setCError('فشل جلب بيانات العيادات.') }
    finally { setCLoading(false) }
  }
  useEffect(()=>{ fetchClinics() }, [])

  const onClinicEdit = (id, field, value) => setCEdits((p)=>({ ...p, [id]: { ...(p[id]||{}), [field]: value } }))
  const onClinicSave = async (c) => {
    const e = cEdits[c.id] || {}
    try {
      await updateClinic({ id: c.id, name: e.name ?? c.name, address_en: e.address_en ?? c.address_en, address_ar: e.address_ar ?? c.address_ar, phone: e.phone ?? c.phone, map_url: e.map_url ?? c.map_url, sort_order: typeof e.sort_order !== 'undefined' ? Number(e.sort_order) : c.sort_order })
      setCEdits((p)=>({ ...p, [c.id]: undefined }))
      await fetchClinics()
    } catch(err){ console.error(err); alert('Failed to save clinic') }
  }
  const onClinicDelete = async (c) => { if (!confirm('حذف هذه العيادة؟')) return; try { await deleteClinic(c.id); setCItems((p)=>p.filter(i=>i.id!==c.id)) } catch(err){ console.error(err); alert('Delete failed') } }
  const onClinicAdd = async (e) => { e.preventDefault(); try { await insertClinic(cNew); setCNew({ name:'', address_en:'', address_ar:'', phone:'', map_url:'' }); await fetchClinics() } catch(err){ console.error(err); alert('Failed to add clinic') } }

  return (
    <div className="card p-4 mt-6">
      <h2 className="text-lg font-semibold">إدارة العيادات</h2>
      <form className="mt-3 grid md:grid-cols-2 gap-3" onSubmit={onClinicAdd}>
        <input className="input" type="text" placeholder="اسم العيادة" value={cNew.name} onChange={(e)=>setCNew({...cNew, name:e.target.value})} />
        <input className="input" type="text" placeholder="العنوان (عربي)" value={cNew.address_ar} onChange={(e)=>setCNew({...cNew, address_ar:e.target.value})} />
        <input className="input" type="text" placeholder="العنوان (إنجليزي)" value={cNew.address_en} onChange={(e)=>setCNew({...cNew, address_en:e.target.value})} />
        <input className="input" type="text" placeholder="رقم الهاتف" value={cNew.phone} onChange={(e)=>setCNew({...cNew, phone:e.target.value})} />
        <input className="input" type="url" placeholder="رابط الخريطة" value={cNew.map_url} onChange={(e)=>setCNew({...cNew, map_url:e.target.value})} />
        <div>
          <button className="btn btn-primary">إضافة عيادة</button>
        </div>
      </form>
      <div className="mt-4">
        {cLoading && <p className="text-slate-600">جارٍ تحميل العيادات...</p>}
        {cError && (
          <div className="alert alert-error flex items-center gap-3">
            <span>{cError}</span>
            <button className="btn btn-outline" onClick={fetchClinics}>إعادة المحاولة</button>
          </div>
        )}
        {!cLoading && !cError && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {cItems.map((c)=>{
              const e = cEdits[c.id] || {}
              return (
                <div key={c.id} className="card p-3 space-y-2">
                  <input className="input w-full" type="text" placeholder="الاسم" value={e.name ?? c.name} onChange={(ev)=>onClinicEdit(c.id,'name',ev.target.value)} />
                  <input className="input w-full" type="text" placeholder="العنوان (عربي)" value={e.address_ar ?? c.address_ar ?? ''} onChange={(ev)=>onClinicEdit(c.id,'address_ar',ev.target.value)} />
                  <input className="input w-full" type="text" placeholder="العنوان (إنجليزي)" value={e.address_en ?? c.address_en ?? ''} onChange={(ev)=>onClinicEdit(c.id,'address_en',ev.target.value)} />
                  <input className="input w-full" type="text" placeholder="رقم الهاتف" value={e.phone ?? c.phone ?? ''} onChange={(ev)=>onClinicEdit(c.id,'phone',ev.target.value)} />
                  <input className="input w-full" type="url" placeholder="رابط الخريطة" value={e.map_url ?? c.map_url ?? ''} onChange={(ev)=>onClinicEdit(c.id,'map_url',ev.target.value)} />
                  <input className="input w-full" type="text" placeholder="الترتيب" value={e.sort_order ?? (c.sort_order ?? '')} onChange={(ev)=>onClinicEdit(c.id,'sort_order',ev.target.value)} />
                  <div className="flex items-center justify-between pt-2">
                    <button className="btn btn-primary" onClick={()=>onClinicSave(c)}>حفظ</button>
                    <button className="btn btn-outline" onClick={()=>onClinicDelete(c)}>حذف</button>
                  </div>
                </div>
              )
            })}
            {cItems.length===0 && <p className="text-slate-600">لا توجد عيادات.</p>}
          </div>
        )}
      </div>
    </div>
  )
}