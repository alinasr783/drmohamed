import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Hero from './components/ui/Hero'
import BookingSection from './components/ui/BookingSection'
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
import Articles from './components/ui/Articles'
import Booking from './pages/Booking'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import ArticlesPage from './pages/Articles'
import ArticleDetail from './pages/ArticleDetail'
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
  return (
    <div className="min-h-screen">
      <Header />
      
      <Routes>
        <Route path="/" element={
          <>
            <Hero />
            <AlAhly items={alAhly} />
            <AhlyGallery items={ahlyGallery} />
            <BookingSection />
            <AboutMe />
            <Certificates items={certificates} />
            <Conferences items={conferences} />
            <Services items={services} />
            <Gallery items={gallery} />
            <Videos items={videos} />
            
            <Articles />

            <Contact />
            {/* Place About Me and Patients Testimonial as the last two sections */}

            <Testimonials items={testimonials} />
            <Footer />
            <DeveloperCredit />
          </>
        } />
        
        <Route path="/booking" element={
          <>
            <Booking />
            <Footer />
            <DeveloperCredit />
          </>
        } />
        
        <Route path="/login" element={
          <>
            <Login />
            <Footer />
            <DeveloperCredit />
          </>
        } />
        
        <Route path="/dashboard" element={
          <>
            <Dashboard />
            <Footer />
            <DeveloperCredit />
          </>
        } />
        
        <Route path="/articles" element={
          <>
            <ArticlesPage />
            <Footer />
            <DeveloperCredit />
          </>
        } />
        
        <Route path="/article/:id" element={
          <>
            <ArticleDetail />
            <Footer />
            <DeveloperCredit />
          </>
        } />
      </Routes>
    </div>
  )
}

export default App