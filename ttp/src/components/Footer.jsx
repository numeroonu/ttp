import { Link } from 'react-router-dom'
import { NAV_LINKS } from '../data/navLinks'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__roots" aria-hidden="true" />
      <div className="container footer__inner">
        <div className="footer__brand">
          <p className="footer__baybayin baybayin" aria-hidden="true">ᜆᜊᜒ ᜆᜊᜒ ᜉᜓ</p>
          <p className="footer__logo">Tabi-Tabi Po</p>
          <p className="footer__tag">Ang Madilim na Alamat ng Pilipinas</p>
        </div>

        <nav className="footer__nav" aria-label="Footer">
          {NAV_LINKS.map((l) => (
            <Link key={l.to} to={l.to}>{l.label}</Link>
          ))}
        </nav>

        <p className="footer__note">
          Folklore is shared heritage, not fact, and never a reason to stereotype any province or its people.
          These stories belong to all of us.
        </p>
      </div>

      <div className="container footer__bottom">
        <span>A Cultural Heritage project by Jhessa &amp; Cyrelle · 2026</span>
        <Link to="/about">Sources &amp; credits</Link>
      </div>
    </footer>
  )
}
