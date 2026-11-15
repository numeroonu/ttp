import { useState, useEffect, useCallback, useMemo } from 'react'
import { TRANSLATIONS } from '../data/translations'
import { LanguageContext } from './LanguageContextInstance'

const STORAGE_KEY = 'ttp_language'

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(() => {
    let initialLanguage = 'fil'
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved === 'fil' || saved === 'en') {
        initialLanguage = saved
      }
    } catch {
      // ignore localStorage errors (e.g. incognito restrictions)
    }
    document.documentElement.lang = initialLanguage
    return initialLanguage
  })

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, language)
    } catch {
      // ignore
    }
    // Set document lang attribute
    document.documentElement.lang = language
  }, [language])

  const setLanguage = useCallback((newLang) => {
    if (newLang === 'fil' || newLang === 'en') {
      setLanguageState(newLang)
    }
  }, [])

  const toggleLanguage = useCallback(() => {
    setLanguageState((prev) => (prev === 'fil' ? 'en' : 'fil'))
  }, [])

  // Nested property lookup with fallback
  const t = useCallback(
    (keyPath, fallback = '') => {
      if (!keyPath) return fallback
      const keys = keyPath.split('.')
      let current = TRANSLATIONS[language]

      for (const k of keys) {
        if (current && typeof current === 'object' && k in current) {
          current = current[k]
        } else {
          // Fallback to other language or provided fallback
          let alt = TRANSLATIONS[language === 'fil' ? 'en' : 'fil']
          for (const ak of keys) {
            if (alt && typeof alt === 'object' && ak in alt) {
              alt = alt[ak]
            } else {
              alt = null
              break
            }
          }
          return alt !== null && alt !== undefined ? alt : fallback
        }
      }

      return current !== undefined ? current : fallback
    },
    [language]
  )

  const value = useMemo(
    () => ({
      language,
      isFilipino: language === 'fil',
      isEnglish: language === 'en',
      setLanguage,
      toggleLanguage,
      t,
    }),
    [language, setLanguage, toggleLanguage, t]
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}
