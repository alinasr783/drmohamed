import React from 'react'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Hero from './components/ui/Hero'
import Services from './components/ui/Services'
import Testimonials from './components/ui/Testimonials'
import AboutMe from './components/ui/AboutMe'
import Gallery from './components/ui/Gallery'
import Videos from './components/ui/Videos'
import Conferences from './components/ui/Conferences'
import AlAhly from './components/ui/AlAhly'
import AhlyGallery from './components/ui/AhlyGallery'
import Certificates from './components/ui/Certificates'
import Contact from './components/ui/Contact'
import Booking from './pages/Booking'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import { DeveloperCredit } from './components/shared/DeveloperCredit'

import { services } from './data/services'
import { testimonials } from './data/testimonials'
import { gallery } from './data/gallery'
import { videos } from './data/videos'
import { conferences } from './data/conferences'
import { alAhly } from './data/alAhly'
import { ahlyGallery } from './data/ahlyGallery'
import { certificates } from './data/certificates'

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
          <DeveloperCredit />
        </>
      ) : isLogin ? (
        <>
          <Login />
          <Footer />
          <DeveloperCredit />
        </>
      ) : isDashboard ? (
        <>
          <Dashboard />
          <Footer />
          <DeveloperCredit />
        </>
      ) : (
        <> 
          <Hero />
          <AboutMe />
          <Certificates items={certificates} />
          <Conferences items={conferences} />
          <Services items={services} />
          <Gallery items={gallery} />
          <Videos items={videos} />
  
          <AlAhly items={alAhly} />
          <AhlyGallery items={ahlyGallery} />

          <Contact />
          {/* Place About Me and Patients Testimonial as the last two sections */}

          <Testimonials items={testimonials} />
          <Footer />
          <DeveloperCredit />
        </>
      )}
    </div>
  )
}

export default App
