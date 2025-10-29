import React, { useState } from 'react'

export default function Payment() {
  const [name, setName] = useState('')
  const [card, setCard] = useState('')
  const [expiry, setExpiry] = useState('')
  const [cvv, setCvv] = useState('')
  const [country, setCountry] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')

  const payEnabled = name && email && card && expiry && cvv

  const onPay = () => {
    if (!payEnabled) return
    alert('Payment submitted (demo). This page uses the same color theme.')
  }

  return (
    <section id="payment" className="section">
      <div className="container">
        <h1 className="text-3xl md:text-4xl font-bold">Checkout</h1>
        <p className="text-slate-600 mt-2">Complete your payment securely.</p>

        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <div className="card p-6">
            <h3 className="font-semibold mb-4">Billing Details</h3>
            <label className="block text-sm text-slate-600 mb-1">Full Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your full name" className="w-full border rounded-lg px-3 py-2" />

            <label className="block text-sm text-slate-600 mt-4 mb-1">Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="you@example.com" className="w-full border rounded-lg px-3 py-2" />

            <label className="block text-sm text-slate-600 mt-4 mb-1">Country</label>
            <input value={country} onChange={(e) => setCountry(e.target.value)} placeholder="Country" className="w-full border rounded-lg px-3 py-2" />

            <label className="block text-sm text-slate-600 mt-4 mb-1">Address</label>
            <input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Street, City" className="w-full border rounded-lg px-3 py-2" />
          </div>

          <div className="card p-6">
            <h3 className="font-semibold mb-4">Payment Method</h3>
            <label className="block text-sm text-slate-600 mb-1">Card Number</label>
            <input value={card} onChange={(e) => setCard(e.target.value)} placeholder="1234 5678 9012 3456" className="w-full border rounded-lg px-3 py-2" />

            <div className="grid grid-cols-2 gap-3 mt-4">
              <div>
                <label className="block text-sm text-slate-600 mb-1">Expiry</label>
                <input value={expiry} onChange={(e) => setExpiry(e.target.value)} placeholder="MM/YY" className="w-full border rounded-lg px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm text-slate-600 mb-1">CVV</label>
                <input value={cvv} onChange={(e) => setCvv(e.target.value)} placeholder="***" className="w-full border rounded-lg px-3 py-2" />
              </div>
            </div>
          </div>
        </div>

        <div className="card p-6 mt-6">
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold mb-2">Order Summary</h4>
              <ul className="text-sm text-slate-700 space-y-1">
                <li><span className="font-medium">Name:</span> {name || '—'}</li>
                <li><span className="font-medium">Email:</span> {email || '—'}</li>
                <li><span className="font-medium">Country:</span> {country || '—'}</li>
                <li><span className="font-medium">Address:</span> {address || '—'}</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Payment</h4>
              <p className="text-sm text-slate-600">All transactions are simulated for demo purposes.</p>
            </div>
            <div className="flex items-end justify-end">
              <button
                className={`btn btn-primary ${payEnabled ? '' : 'opacity-60 cursor-not-allowed'}`}
                onClick={onPay}
                disabled={!payEnabled}
              >
                Pay Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}