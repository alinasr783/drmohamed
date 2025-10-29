import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// Smoothly scroll to hash targets on load and when hash changes
function scrollToHash() {
  const hash = window.location.hash
  if (!hash) return
  const id = decodeURIComponent(hash.replace('#', ''))
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

window.addEventListener('load', () => {
  // delay to ensure home sections are rendered
  setTimeout(scrollToHash, 50)
})
window.addEventListener('hashchange', scrollToHash)
