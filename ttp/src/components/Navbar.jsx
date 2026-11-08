import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { getLocalizedNavLinks } from '../data/navLinks'
import { useLanguage } from '../context/useLanguage'
import LanguageToggle from './LanguageToggle'
import { toggleSound, useFieldNotebook } from '../utils/fieldNotebook'
import { EncounterToggle } from './ArchiveTools'
import './Navbar.css'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(() => window.scrollY > 40)
  const [open, setOpen] = useState(false)
  const { sound } = useFieldNotebook()
  const [collapsed, setCollapsed] = useState(false)
  const navRef = useRef(null)
  const innerRef = useRef(null)
  const logoRef = useRef(null)
  const linksRef = useRef(null)
  const actionsRef = useRef(null)
  const { language, t } = useLanguage()

  const navLinks = getLocalizedNavLinks(language)

  // Collapse into the burger menu only when the links genuinely don't fit.
  // Works for any language: Filipino labels are longer than English ones.
  useLayoutEffect(() => {
    const measure = () => {
      const inner = innerRef.current
      const logo = logoRef.current
      const links = linksRef.current
      const actions = actionsRef.current
      if (!inner || !logo || !links || !actions) return

      const style = window.getComputedStyle(inner)
      const available =
        inner.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight)
      const gap = parseFloat(style.columnGap) || 28
      const burgerAllowance = 60 // divider / burger width difference + breathing room
      const needed =
        logo.offsetWidth + links.scrollWidth + actions.offsetWidth + gap * 2 + burgerAllowance

      setCollapsed(needed > available)
      if (needed <= available) setOpen(false)
    }

    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(innerRef.current)
    document.fonts?.ready.then(measure)
    return () => ro.disconnect()
  }, [language])

  // Scrolled state + reading progress (drives the ember line under the bar)
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40)
      const max = document.documentElement.scrollHeight - window.innerHeight
      const progress = max > 0 ? Math.min(window.scrollY / max, 1) : 0
      navRef.current?.style.setProperty('--progress', progress.toFixed(4))
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  // Mobile menu: lock page scroll, close on Escape, close when resized to desktop
  useEffect(() => {
    if (!open) return undefined
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)

    return () => {
      document.body.style.overflow = previous
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <header
      ref={navRef}
      className={`nav ${scrolled ? 'is-scrolled' : ''} ${open ? 'is-open' : ''} ${
        collapsed ? 'is-collapsed' : ''
      }`}
    >
      <div className="nav__inner" ref={innerRef}>
        <Link
          to="/"
          ref={logoRef}
          className="nav__logo"
          aria-label="Tabi-Tabi Po home"
          onClick={() => setOpen(false)}
        >
          <span className="nav__logo-flame" aria-hidden="true" />
          <span className="nav__logo-text">
            <span className="nav__logo-baybayin baybayin" aria-hidden="true">ᜆᜊᜒ ᜆᜊᜒ ᜉᜓ</span>
            Tabi-Tabi Po
          </span>
        </Link>

        <nav className="nav__links" aria-label="Main" ref={linksRef}>
          {navLinks.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.to === '/'} className="nav__link">
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="nav__actions" ref={actionsRef}>
          <LanguageToggle compact={false} />
          <EncounterToggle />

          <button
            type="button"
            className={`nav__sound ${sound ? 'is-on' : ''}`}
            onClick={toggleSound}
            aria-pressed={sound}
            aria-label={sound ? t('nav.soundOff') : t('nav.soundOn')}
            title={sound ? t('nav.soundOff') : t('nav.soundOn')}
          >
            <svg
              className="nav__sound-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M4 9.5v5h3.5L12 18.5v-13L7.5 9.5H4z" fill="currentColor" fillOpacity="0.15" />
              <path className="nav__sound-wave nav__sound-wave--1" d="M15.5 9.5a3.5 3.5 0 0 1 0 5" />
              <path className="nav__sound-wave nav__sound-wave--2" d="M18.2 7a7 7 0 0 1 0 10" />
              <path className="nav__sound-mute" d="M16 9.5l4.5 5M20.5 9.5l-4.5 5" />
            </svg>
          </button>

          <button
            type="button"
            className="nav__burger"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t('nav.closeMenu') : t('nav.openMenu')}
          >
            <span /><span />
          </button>
        </div>
      </div>

      <div id="mobile-menu" className="nav__mobile" hidden={!open}>
        <EncounterToggle />
        <div className="nav__mobile-lang-wrap">
          <span className="nav__mobile-lang-label">
            {language === 'fil' ? 'Piliin ang Wika' : 'Language'}
          </span>
          <LanguageToggle />
        </div>

        {navLinks.map((link, i) => (
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
