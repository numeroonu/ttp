import { Link } from 'react-router-dom'
import { getLocalizedNavLinks } from '../data/navLinks'
import { useLanguage } from '../context/useLanguage'
import './Footer.css'

export default function Footer() {
  const { language, t } = useLanguage()
  const navLinks = getLocalizedNavLinks(language)

  return (
    <footer className="footer">
      <div className="footer__roots" aria-hidden="true" />
      <div className="container footer__inner">
        <div className="footer__brand">
          <p className="footer__baybayin baybayin" aria-hidden="true">ᜆᜊᜒ ᜆᜊᜒ ᜉᜓ</p>
          <p className="footer__logo">Tabi-Tabi Po</p>
          <p className="footer__tag">{t('footer.tag')}</p>
        </div>

        <nav className="footer__nav" aria-label="Footer">
          {navLinks.map((l) => (
            <Link key={l.to} to={l.to}>{l.label}</Link>
          ))}
        </nav>

        <p className="footer__note">
          {t('footer.note')}
        </p>
      </div>

      <div className="container footer__bottom">
        <span>{t('footer.credits')}</span>
        <Link to="/about">{t('footer.sourcesLink')}</Link>
      </div>
    </footer>
  )
}
