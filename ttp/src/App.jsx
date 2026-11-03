import { useCallback, useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'

import LoadingScreen from './components/LoadingScreen'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Creatures from './pages/Creatures'
import MapOfMyths from './pages/MapOfMyths'
import Superstitions from './pages/Superstitions'
import Origins from './pages/Origins'
import ModernLegends from './pages/ModernLegends'
import Podcasts from './pages/Podcasts'
import About from './pages/About'
import Placeholder from './pages/Placeholder'

/*
 * true  = the "Tabi-tabi po" intro plays once per browser tab (best for visitors)
 * false = the intro plays on every page refresh (handy while you are designing it)
 */
const SHOW_INTRO_ONCE_PER_VISIT = true
const INTRO_KEY = 'ttp-intro-seen'

function shouldShowIntro() {
  if (!SHOW_INTRO_ONCE_PER_VISIT) return true
  try {
    return sessionStorage.getItem(INTRO_KEY) !== '1'
  } catch {
    return true
  }
}

// Scrolls back to the top whenever you change pages
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  const [showIntro, setShowIntro] = useState(shouldShowIntro)

  const finishIntro = useCallback(() => {
    try {
      sessionStorage.setItem(INTRO_KEY, '1')
    } catch {
      /* storage blocked: the intro will simply play again next time */
    }
    setShowIntro(false)
  }, [])

  return (
    <>
      <ScrollToTop />
      <Navbar />

      <main key={location.pathname} className="page-transition">
        <Routes>
          <Route path="/" element={<Home ready={!showIntro} />} />
          <Route path="/creatures" element={<Creatures />} />
          <Route path="/map" element={<MapOfMyths />} />
          <Route path="/superstitions" element={<Superstitions />} />
          <Route path="/origins" element={<Origins />} />
          <Route path="/modern-legends" element={<ModernLegends />} />
          <Route path="/podcasts" element={<Podcasts />} />
          <Route path="/stories" element={<Podcasts />} />
          <Route path="/about" element={<About />} />
          <Route
            path="*"
            element={<Placeholder title="Naligaw ka." filipino="You got lost" owner={null} lost />}
          />
        </Routes>
      </main>

      <Footer />

      {/* The intro sits on top of the Home page and reveals it when it finishes */}
      {showIntro && <LoadingScreen onFinish={finishIntro} />}
    </>
  )
}
