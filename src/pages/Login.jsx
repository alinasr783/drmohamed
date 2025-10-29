import React, { useState } from 'react'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()
    setError('')
    if (email === 'admin@clinic.com' && password === 'admin123') {
      localStorage.setItem('admin_auth', 'true')
      window.location.href = '/dashboard'
    } else {
      setError('Invalid credentials. Please try again.')
    }
  }

  return (
    <section className="section">
      <div className="container max-w-md">
        <div className="card p-6">
          <h1 className="text-2xl font-semibold text-center">Admin Login</h1>
          <p className="text-slate-600 text-center mt-1">Enter the credentials to access the dashboard.</p>
          <form className="mt-4" onSubmit={onSubmit}>
            <label className="block text-sm text-slate-600 mb-1">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@clinic.com" className="w-full border rounded-lg px-3 py-2" />
            <label className="block text-sm text-slate-600 mt-4 mb-1">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="w-full border rounded-lg px-3 py-2" />
            <button type="submit" className="btn btn-primary w-full mt-4">Login</button>
            {error && <p className="text-sm text-red-600 mt-2">{error}</p>}
          </form>
        </div>
      </div>
    </section>
  )
}