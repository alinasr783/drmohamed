import React, { useEffect, useState } from 'react'
import { listTestimonials, insertTestimonial, updateTestimonial, deleteTestimonial } from '../../hooks/supabase'

export default function TestimonialsManager(){
  const [tItems, settItems] = useState([])
  const [tEdits, setTEdits] = useState({})
  const [tNew, setTNew] = useState({ name: '', message: '' })
  const [tLoading, setTLoading] = useState(false)
  const [tError, setTError] = useState('')

  const fetchTestimonials = async () => {
    setTLoading(true)
    setTError('')
    try {
      const data = await listTestimonials()
      settItems(Array.isArray(data) ? data : [])
    } catch (e) { console.error(e); setTError('فشل تحميل الآراء من Supabase') }
    finally { setTLoading(false) }
  }

  useEffect(()=>{ fetchTestimonials() }, [])

  const onTestEdit = (id, field, value) => setTEdits((p) => ({ ...p, [id]: { ...(p[id] || {}), [field]: value } }))
  const onTestSave = async (t) => {
    const e = tEdits[t.id] || {}
    try {
      await updateTestimonial({ id: t.id, name: e.name ?? t.name, message: e.message ?? t.message, sort_order: typeof e.sort_order !== 'undefined' ? Number(e.sort_order) : t.sort_order })
      setTEdits((p)=>({ ...p, [t.id]: undefined }))
      await fetchTestimonials()
    } catch(err){ console.error(err); alert('Failed to save testimonial') }
  }
  const onTestDelete = async (t) => { if (!confirm('حذف هذا الرأي؟')) return; try { await deleteTestimonial(t.id); settItems((p)=>p.filter(i=>i.id!==t.id)) } catch(err){ console.error(err); alert('Delete failed') } }
  const onTestAdd = async (e) => { e.preventDefault(); try { await insertTestimonial(tNew); setTNew({ name:'', message:'' }); await fetchTestimonials() } catch(err){ console.error(err); alert('Failed to add') } }

  return (
    <div className="card p-4 mt-6">
      <h2 className="text-lg font-semibold">إدارة آراء العملاء</h2>
      <form className="mt-3 grid md:grid-cols-2 gap-3" onSubmit={onTestAdd}>
        <input className="input" type="text" placeholder="الاسم" value={tNew.name} onChange={(e)=>setTNew({...tNew, name:e.target.value})} />
        <input className="input" type="text" placeholder="الرأي" value={tNew.message} onChange={(e)=>setTNew({...tNew, message:e.target.value})} />
        <div>
          <button className="btn btn-primary">إضافة رأي</button>
        </div>
      </form>

      {tLoading ? (
        <p className="mt-3">جارِ التحميل…</p>
      ) : tError ? (
        <div className="mt-3 flex items-center gap-3">
          <p className="text-red-600">{tError}</p>
          <button className="btn btn-outline" onClick={fetchTestimonials}>إعادة المحاولة</button>
        </div>
      ) : (
        <div className="mt-4 grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {tItems.map((t)=>{
            const e = tEdits[t.id] || {}
            return (
              <div key={t.id} className="card p-3 space-y-2">
                <input className="input w-full" type="text" placeholder="الاسم" value={e.name ?? t.name} onChange={(ev)=>onTestEdit(t.id,'name',ev.target.value)} />
                <input className="input w-full" type="text" placeholder="الرأي" value={e.message ?? t.message} onChange={(ev)=>onTestEdit(t.id,'message',ev.target.value)} />
                <input className="input w-full" type="text" placeholder="الترتيب" value={e.sort_order ?? (t.sort_order ?? '')} onChange={(ev)=>onTestEdit(t.id,'sort_order',ev.target.value)} />
                <div className="flex items-center justify-between pt-2">
                  <button className="btn btn-primary" onClick={()=>onTestSave(t)}>حفظ</button>
                  <button className="btn btn-outline" onClick={()=>onTestDelete(t)}>حذف</button>
                </div>
              </div>
            )
          })}
          {tItems.length===0 && <p className="text-slate-600">لا توجد آراء حتى الآن.</p>}
        </div>
      )}
    </div>
  )
}