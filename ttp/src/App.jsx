import { useCallback, useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'

import LoadingScreen from './components/LoadingScreen'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
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

      <main>
        <Routes>
          <Route path="/" element={<Home ready={!showIntro} />} />
          <Route
            path="/creatures"
            element={<Placeholder title="The Creatures" filipino="Ang mga Nilalang" owner="Jhessa" />}
          />
          <Route
            path="/map"
            element={<Placeholder title="Map of Myths" filipino="Mapa ng mga Alamat" owner="Jhessa" />}
          />
          <Route
            path="/superstitions"
            element={<Placeholder title="Protection & Superstitions" filipino="Mga Pamahiin" owner="Cyrelle" />}
          />
          <Route
            path="/origins"
            element={<Placeholder title="Origins of Philippine Folklore" filipino="Ang Pinagmulan" owner="Cyrelle" />}
          />
          <Route
            path="/modern-legends"
            element={<Placeholder title="Modern Legends" filipino="Mga Makabagong Alamat" owner="Cyrelle" />}
          />
          <Route
            path="/about"
            element={<Placeholder title="About Us & Sources" filipino="Tungkol sa Amin" owner="Cyrelle" />}
          />
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
