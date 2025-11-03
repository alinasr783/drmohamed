import React from 'react'

export default function AboutMe() {
  return (
    <section id="about" className="section overflow-x-hidden">
      <h2 className="section-title">About Me</h2>
      <div className="container grid md:grid-cols-2 gap-8 items-center">
        <div className="card overflow-hidden">
          <img className="w-full h-94 md:h-[52rem] object-cover" src="https://i.ibb.co/Y4BXpscw/watermarked-07b7478d-3430-4301-8a1d-2063d5fa6410.png" alt="Orthopedic doctor" />
        </div>
        <div className="break-words min-w-0">
          <h3 className="text-2xl font-semibold">Dr. Mohamed Elgawadi</h3>
          <p className="text-slate-700 mt-1">MSc, MD, FRCS (Tr & Orth)</p>
          <p className="text-slate-600">
            Consultant Orthopaedic Surgeon specializing in Joint Surgery, Arthroscopy and Sports injuries.
            Team physician at Al Ahly Football Club.
          </p>
          <ul className="mt-4 space-y-2 text-slate-700">
            <li>• Expertise: Joint Surgery, Arthroscopy, Sports injuries</li>
            <li>• Focus: Trauma, Arthroplasty, Upper & Lower Limb, Ankle & Foot</li>
            <li>• Care: Comprehensive diagnosis and personalized treatment plans</li>
          </ul>

          <div className="mt-4 grid grid-cols-3 gap-3 text-center">
            <div className="card p-3">
              <p className="text-xl font-semibold">16+ yrs</p>
              <p className="text-xs text-slate-600">Experience</p>
            </div>
            <div className="card p-3">
              <p className="text-xl font-semibold">1000+</p>
              <p className="text-xs text-slate-600">Surgeries</p>
            </div>
            <div className="card p-3">
              <p className="text-xl font-semibold">Team</p>
              <p className="text-xs text-slate-600">Al Ahly FC</p>
            </div>
          </div>

          <div className="mt-6">
            <h4 className="font-semibold mb-2">Experience</h4>
            <div className="grid md:grid-cols-2 gap-3 text-sm">
              <div className="card p-4">
                <p className="font-medium">Consultant · Nile Hospital for Health Insurance</p>
              </div>
              <div className="card p-4">
                <p className="font-medium">Orthopaedic Surgery Specialist · DHA</p>
              </div>
              <div className="card p-4">
                <p className="font-medium">Specialist Orthopaedic Surgery · Al Mouwasat Hospital Dammam</p>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h4 className="font-semibold mb-2">Education</h4>
            <ul className="space-y-2 text-sm text-slate-700">
              <li>• Royal College of Surgeons — FRCS Trauma & Orthopaedic</li>
              <li>• Cairo University — Doctor of Medicine (MD), Medicine</li>
            </ul>
          </div>

          <div className="mt-6">
            <h4 className="font-semibold mb-2">Licences</h4>
            <ul className="space-y-2 text-sm text-slate-700">
              <li>• GMC — General Medical Council (UK)</li>
              <li>SCFHS — Saudi Commission for Health Specialties</li>
              <li>• DHA — Dubai Health Authority</li>
              <li>• MOH — Ministry of Health and Prevention (UAE)</li>
            </ul>
          </div>
          <div className="mt-6">
            <h4 className="font-semibold mb-2">Skills</h4>
            <div className="flex flex-wrap gap-2">
              {['Orthopedic Surgery','Arthroscopy','Arthroplasty','Trauma Surgery','Upper limb','Lower limb','Ankle and foot','Clinical Research','Medical Education','Healthcare Management'].map((s) => (
                <span key={s} className="px-2 py-1 text-xs rounded-md bg-brand-50 text-brand-700 ring-1 ring-brand-200">{s}</span>
              ))}
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3 text-brand-700">
            <a className="btn btn-outline whitespace-normal" href="https://www.facebook.com/share/14M2aEM9Q56/" target="_blank" rel="noreferrer"><i className="fa-brands fa-facebook"></i> Facebook</a>
            <a className="btn btn-outline whitespace-normal" href="https://www.instagram.com/the_bone_doctor_?igsh=MXJwem0zejZ3empqOQ==" target="_blank" rel="noreferrer"><i className="fa-brands fa-instagram"></i> Instagram</a>
            <a className="btn btn-outline whitespace-normal" href="https://www.tiktok.com/@mohamedgawadi?_t=ZS-90vbkKQINnz&_r=1" target="_blank" rel="noreferrer"><i className="fa-brands fa-tiktok"></i> TikTok</a>
            <a className="btn btn-outline whitespace-normal" href="https://www.linkedin.com/in/mohamed-elgawadi-58a8bab8?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noreferrer"><i className="fa-brands fa-linkedin"></i> LinkedIn</a>
          </div>
        </div>
      </div>
    </section>
  )
}