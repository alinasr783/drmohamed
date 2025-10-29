import React from 'react'

export default function Newsletter() {
  return (
    <section className="section">
      <h2 className="section-title">Subscribe To Our Newsletter</h2>
      <div className="container">
        <div className="card p-4 md:p-6 flex items-center gap-3">
          <div className="flex-1">
            <label htmlFor="email" className="block text-sm text-slate-600 mb-2">Newsletter</label>
            <div className="flex gap-2">
              <input id="email" type="email" placeholder="Enter your email" className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-300" />
              <button className="btn btn-primary">Subscribe</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}