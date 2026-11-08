import { lazy, Suspense, useCallback, useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'

import LoadingScreen from './components/LoadingScreen'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Placeholder from './pages/Placeholder'
import FolkloreTrail from './components/FolkloreTrail'
import { useLanguage } from './context/useLanguage'
// Keep page styles in the initial stylesheet so their cascade remains stable
// when route code arrives later (particularly the shared archive refinements).
import './pages/Creatures.css'
import './pages/MapOfMyths.css'
import './pages/Mapdossier.css'
import './pages/Superstitions.css'
import './pages/Origins.css'
import './pages/ModernLegends.css'
import './pages/Podcasts.css'
import './pages/About.css'
import './archive.css'

const Creatures = lazy(() => import('./pages/Creatures'))
const MapOfMyths = lazy(() => import('./pages/MapOfMyths'))
const Superstitions = lazy(() => import('./pages/Superstitions'))
const Origins = lazy(() => import('./pages/Origins'))
const ModernLegends = lazy(() => import('./pages/ModernLegends'))
const Podcasts = lazy(() => import('./pages/Podcasts'))
const About = lazy(() => import('./pages/About'))
const Notebook = lazy(() => import('./pages/Notebook'))

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
  const location = useLocation()
  const { isFilipino } = useLanguage()
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
        <Suspense fallback={
          <div className="archive-page-loading container" role="status">
            {isFilipino ? 'Binubuksan ang mga tala…' : 'Opening the field notes…'}
          </div>
        }>
        <Routes>
          <Route path="/" element={<Home ready={!showIntro} />} />
          <Route path="/creatures" element={<Creatures />} />
          <Route path="/map" element={<MapOfMyths />} />
          <Route path="/superstitions" element={<Superstitions />} />
          <Route path="/origins" element={<Origins />} />
          <Route path="/modern-legends" element={<ModernLegends />} />
          <Route path="/podcasts" element={<Podcasts />} />
          <Route path="/stories" element={<Podcasts />} />
          <Route path="/notebook" element={<Notebook />} />
          <Route path="/about" element={<About />} />
          <Route
            path="*"
            element={<Placeholder title="Naligaw ka." filipino="You got lost" owner={null} lost />}
          />
        </Routes>
        <FolkloreTrail />
        </Suspense>
      </main>

      <Footer />

      {/* The intro sits on top of the Home page and reveals it when it finishes */}
      {showIntro && <LoadingScreen onFinish={finishIntro} />}
    </>
  )
}
