import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { NAV_LINKS } from '../data/navLinks'
import { startAmbience, stopAmbience } from '../utils/ambience'
import './Navbar.css'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(() => window.scrollY > 40)
  const [open, setOpen] = useState(false)
  const [sound, setSound] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Stop the sound if the visitor leaves the site open in the background
  useEffect(() => () => stopAmbience(), [])

  const toggleSound = () => {
    if (sound) {
      stopAmbience()
      setSound(false)
    } else if (startAmbience()) {
      setSound(true)
    }
  }

  return (
    <header className={`nav ${scrolled ? 'is-scrolled' : ''} ${open ? 'is-open' : ''}`}>
      <div className="nav__inner">
        <Link to="/" className="nav__logo" aria-label="Tabi-Tabi Po home" onClick={() => setOpen(false)}>
          <span className="nav__logo-flame" aria-hidden="true" />
          <span className="nav__logo-text">
            <span className="nav__logo-baybayin baybayin" aria-hidden="true">ᜆᜊᜒ ᜆᜊᜒ ᜉᜓ</span>
            Tabi-Tabi Po
          </span>
        </Link>

        <nav className="nav__links" aria-label="Main">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.to === '/'} className="nav__link">
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="nav__actions">
          <button
            type="button"
            className={`nav__sound ${sound ? 'is-on' : ''}`}
            onClick={toggleSound}
            aria-pressed={sound}
            aria-label={sound ? 'Turn night sounds off' : 'Turn night sounds on'}
            title={sound ? 'Night sounds: on' : 'Night sounds: off'}
          >
            <span className="nav__sound-bars" aria-hidden="true">
              <span /><span /><span /><span />
            </span>
          </button>

          <button
            type="button"
            className="nav__burger"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            <span /><span />
          </button>
        </div>
      </div>

      <div id="mobile-menu" className="nav__mobile" hidden={!open}>
        {NAV_LINKS.map((link, i) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === '/'}
            className="nav__mobile-link"
            style={{ '--i': i }}
            onClick={() => setOpen(false)}
          >
            <span className="nav__mobile-num">{String(i + 1).padStart(2, '0')}</span>
            {link.label}
          </NavLink>
        ))}
      </div>
    </header>
  )
}
