import React, { useEffect, useState } from 'react'
import { listWorkingHours, insertWorkingHour, updateWorkingHour, deleteWorkingHour, listClinics } from '../../hooks/supabase'

export default function WorkingHoursManager(){
  const [whItems, setWhItems] = useState([])
  const [whEdits, setWhEdits] = useState({})
  const [whNew, setWhNew] = useState({ clinic_id: '', day: '', hours: '' })
  const [cItems, setCItems] = useState([])
  const [whLoading, setWhLoading] = useState(false)
  const [whError, setWhError] = useState('')
  const [cLoading, setCLoading] = useState(false)
  const [cError, setCError] = useState('')

  const fetchWorkingHours = async () => {
    setWhLoading(true); setWhError('')
    try {
      const data = await listWorkingHours()
      setWhItems(Array.isArray(data) ? data : [])
    } catch (e) { console.error(e); setWhError('فشل جلب مواعيد العمل.') }
    finally { setWhLoading(false) }
  }
  const fetchClinics = async () => {
    setCLoading(true); setCError('')
    try {
      const data = await listClinics()
      setCItems(Array.isArray(data) ? data : [])
    } catch (e) { console.error(e); setCError('فشل جلب العيادات.') }
    finally { setCLoading(false) }
  }

  useEffect(()=>{ fetchWorkingHours(); fetchClinics(); }, [])

  const onWhEdit = (id, field, value) => setWhEdits((p)=>({ ...p, [id]: { ...(p[id]||{}), [field]: value } }))
  const onWhSave = async (h) => {
    const e = whEdits[h.id] || {}
    try {
      await updateWorkingHour({ id: h.id, clinic_id: e.clinic_id ?? h.clinic_id, day: e.day ?? h.day, hours: e.hours ?? h.hours })
      setWhEdits((p)=>({ ...p, [h.id]: undefined }))
      await fetchWorkingHours()
    } catch(err){ console.error(err); alert('Failed to save hours') }
  }
  const onWhDelete = async (h) => { if (!confirm('حذف هذا الموعد؟')) return; try { await deleteWorkingHour(h.id); setWhItems((p)=>p.filter(i=>i.id!==h.id)) } catch(err){ console.error(err); alert('Delete failed') } }
  const onWhAdd = async (e) => { e.preventDefault(); try { await insertWorkingHour({ clinic_id: Number(whNew.clinic_id), day: whNew.day, hours: whNew.hours }); setWhNew({ clinic_id:'', day:'', hours:'' }); await fetchWorkingHours() } catch(err){ console.error(err); alert('Failed to add hours') } }

  return (
    <div className="card p-4 mt-6">
      <h2 className="text-lg font-semibold">إدارة مواعيد العمل</h2>
      <form className="mt-3 grid md:grid-cols-2 gap-3" onSubmit={onWhAdd}>
        <select className="input" value={whNew.clinic_id} onChange={(e)=>setWhNew({...whNew, clinic_id:e.target.value})}>
          <option value="">اختر عيادة</option>
          {cLoading && <option>جارٍ تحميل العيادات...</option>}
          {!cLoading && cError && <option>فشل جلب العيادات</option>}
          {!cLoading && !cError && cItems.map((c)=>(<option key={c.id} value={c.id}>{c.name}</option>))}
        </select>
        <input className="input" type="text" placeholder="اليوم" value={whNew.day} onChange={(e)=>setWhNew({...whNew, day:e.target.value})} />
        <input className="input" type="text" placeholder="الساعات" value={whNew.hours} onChange={(e)=>setWhNew({...whNew, hours:e.target.value})} />
        <div>
          <button className="btn btn-primary">إضافة موعد</button>
        </div>
      </form>
      <div className="mt-4">
        {whLoading && <p className="text-slate-600">جارٍ تحميل المواعيد...</p>}
        {whError && (
          <div className="alert alert-error flex items-center gap-3">
            <span>{whError}</span>
            <button className="btn btn-outline" onClick={fetchWorkingHours}>إعادة المحاولة</button>
          </div>
        )}
        {!whLoading && !whError && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {whItems.map((h)=>{
              const e = whEdits[h.id] || {}
              return (
                <div key={h.id} className="card p-3 space-y-2">
                  <select className="input w-full" value={e.clinic_id ?? h.clinic_id} onChange={(ev)=>onWhEdit(h.id,'clinic_id',ev.target.value)}>
                    {!cLoading && !cError && cItems.map((c)=>(<option key={c.id} value={c.id}>{c.name}</option>))}
                  </select>
                  <input className="input w-full" type="text" placeholder="اليوم" value={e.day ?? h.day} onChange={(ev)=>onWhEdit(h.id,'day',ev.target.value)} />
                  <input className="input w-full" type="text" placeholder="الساعات" value={e.hours ?? h.hours} onChange={(ev)=>onWhEdit(h.id,'hours',ev.target.value)} />
                  <div className="flex items-center justify_between pt-2">
                    <button className="btn btn_primary" onClick={()=>onWhSave(h)}>حفظ</button>
                    <button className="btn btn_outline" onClick={()=>onWhDelete(h)}>حذف</button>
                  </div>
                </div>
              )
            })}
            {whItems.length===0 && <p className="text-slate-600">لا توجد مواعيد.</p>}
          </div>
        )}
      </div>
    </div>
  )
}