import React from 'react'

export default function Footer() {
  return (
    <footer id="footer" className="bg-slate-50 border-t border-slate-100 mt-16">
      <div className="container section">
        <div className="grid md:grid-cols-4 gap-8 items-start">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="h-8 w-8 rounded-full bg-brand-600 flex items-center justify-center text-white">
                <i className="fa-solid fa-bone"></i>
              </div>
              <span className="font-semibold">Elgawadi</span>
            </div>
            <p className="text-sm text-slate-600">
              Comprehensive care, modern equipment, and personalized treatment plans.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="text-slate-700 hover:text-brand-700">Home</a></li>
              <li><a href="/booking" className="text-slate-700 hover:text-brand-700">Booking</a></li>
              <li><a href="/#about" className="text-slate-700 hover:text-brand-700">About</a></li>
              <li><a href="/#gallery" className="text-slate-700 hover:text-brand-700">Gallery</a></li>
              <li><a href="/#contact" className="text-slate-700 hover:text-brand-700">Contact</a></li>
              <li><a href="/login" className="text-slate-700 hover:text-brand-700">Are you the admin?</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Contact</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><i className="fa-solid fa-location-dot mr-2 text-brand-600"></i>New Cairo, Egypt</li>
              <li><i className="fa-solid fa-phone mr-2 text-brand-600"></i>+20 111 222 333</li>
              <li><i className="fa-solid fa-envelope mr-2 text-brand-600"></i>info@elgawadiclinic.com</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Follow</h4>
            <div className="flex gap-3 text-brand-700">
              <a href="https://www.facebook.com/share/14M2aEM9Q56/" target="_blank" rel="noreferrer" aria-label="Facebook"><i className="fa-brands fa-facebook"></i></a>
              <a href="https://www.instagram.com/the_bone_doctor_?igsh=MXJwem0zejZ3empqOQ==" target="_blank" rel="noreferrer" aria-label="Instagram"><i className="fa-brands fa-instagram"></i></a>
              <a href="https://www.tiktok.com/@mohamedgawadi?_t=ZS-90vbkKQINnz&_r=1" target="_blank" rel="noreferrer" aria-label="TikTok"><i className="fa-brands fa-tiktok"></i></a>
              <a href="https://www.linkedin.com/in/mohamed-elgawadi-58a8bab8?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noreferrer" aria-label="LinkedIn"><i className="fa-brands fa-linkedin"></i></a>
            </div>
          </div>
        </div>
        <div className="text-xs text-slate-500 mt-8">© {new Date().getFullYear()} Mohamed Elgawadi · All rights reserved</div>
      </div>
    </footer>
  )
}