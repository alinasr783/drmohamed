import React from 'react'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Hero from './components/ui/Hero'
import Services from './components/ui/Services'
import Testimonials from './components/ui/Testimonials'
import AboutMe from './components/ui/AboutMe'
import Gallery from './components/ui/Gallery'
import Contact from './components/ui/Contact'
import Booking from './pages/Booking'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'

import { services } from './data/services'
import { testimonials } from './data/testimonials'
import { gallery } from './data/gallery'

function App() {
  const pathname = typeof window !== 'undefined' ? window.location.pathname : '/'
  const isBooking = pathname.startsWith('/booking')
  const isLogin = pathname.startsWith('/login')
  const isDashboard = pathname.startsWith('/dashboard')
  return (
    <div className="min-h-screen">
      <Header />
      {isBooking ? (
        <>
          <Booking />
          <Footer />
        </>
      ) : isLogin ? (
        <>
          <Login />
          <Footer />
        </>
      ) : isDashboard ? (
        <>
          <Dashboard />
          <Footer />
        </>
      ) : (
        <>
          <Hero />
          <Services items={services} />
          <Testimonials items={testimonials} />
          <AboutMe />
          <Gallery items={gallery} />
          <Contact />
          <Footer />
        </>
      )}
    </div>
  )
}

export default App
