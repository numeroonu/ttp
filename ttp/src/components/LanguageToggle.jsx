import { useLanguage } from '../context/useLanguage'
import './LanguageToggle.css'

export default function LanguageToggle({ className = '', compact = false }) {
  const { language, setLanguage } = useLanguage()

  return (
    <div
      className={`lang-toggle ${compact ? 'lang-toggle--compact' : ''} ${className}`}
      role="group"
      aria-label="Language selection / Pagpili ng wika"
      data-active={language}
    >
      {/* Sliding highlight – position is driven by data-active in the CSS */}
      <span className="lang-toggle__thumb" aria-hidden="true" />

      <button
        type="button"
        className={`lang-toggle__btn ${language === 'fil' ? 'is-active' : ''}`}
        onClick={() => setLanguage('fil')}
        aria-pressed={language === 'fil'}
        aria-label="Palitan sa Filipino"
        title="Filipino / Tagalog (Wika ng Bayan)"
        lang="fil"
      >
        FIL
      </button>

      <button
        type="button"
        className={`lang-toggle__btn ${language === 'en' ? 'is-active' : ''}`}
        onClick={() => setLanguage('en')}
        aria-pressed={language === 'en'}
        aria-label="Switch to English"
        title="English (International)"
        lang="en"
      >
        ENG
      </button>
    </div>
  )
}