import { useState, useEffect, useMemo, useRef, useCallback } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import Eyes from '../components/Eyes'
import Candle from '../components/Candle'
import Fog from '../components/Fog'
import { creatures } from '../data/creatures'
import { getLocalizedCreature } from '../data/creatureTranslations'
import { useLanguage } from '../context/useLanguage'
import { startAmbience, stopAmbience } from '../utils/ambience'
import './Creatures.css'

const ISLANDS = [
  { id: 'all', fil: 'Lahat', en: 'All' },
  { id: 'Luzon', fil: 'Luzon', en: 'Luzon' },
  { id: 'Visayas', fil: 'Visayas', en: 'Visayas' },
  { id: 'Mindanao', fil: 'Mindanao', en: 'Mindanao' },
]

const DANGER_LEVELS = [
  { id: 'all', fil: 'Lahat', en: 'All', tone: 'all' },
  { id: 'Mischievous', fil: 'Salbahe', en: 'Mischievous', tone: 'mild' },
  { id: 'High', fil: 'Mapanganib', en: 'High Danger', tone: 'high' },
  { id: 'Lethal', fil: 'Nakamamatay', en: 'Lethal', tone: 'lethal' },
  { id: 'Cataclysmic', fil: 'Mapaminsala', en: 'Cataclysmic', tone: 'cosmic' },
]

// Short label + severity (1-4) per tone, used by the card badge and danger meter
const TONE_META = {
  mild: { level: 1, fil: 'Salbahe', en: 'Mischievous' },
  high: { level: 2, fil: 'Mapanganib', en: 'High Danger' },
  lethal: { level: 3, fil: 'Nakamamatay', en: 'Lethal' },
  cosmic: { level: 4, fil: 'Mapaminsala', en: 'Cataclysmic' },
}

const DANGER_KEYWORDS = {
  Lethal: ['lethal', 'nakamamatay', 'malign', 'hexcraft', 'pangkukulam'],
  High: ['high', 'mapanganib', 'disorienting', 'nagliligaw'],
  Mischievous: [
    'mischievous', 'salbahe', 'mapagbiro', 'spiteful', 'whimsical',
    'sacred', 'banal', 'territorial', 'teritoryal',
  ],
  Cataclysmic: ['cataclysmic', 'mapaminsala', 'kosmiko'],
}

function matchesDanger(creature, filterId) {
  if (filterId === 'all') return true
  const level = (creature.dangerLevel || '').toLowerCase()
  return (DANGER_KEYWORDS[filterId] || []).some((kw) => level.includes(kw))
}

// Maps a creature's danger text to the same tone used by the filter chips
function getDangerTone(creature) {
  if (matchesDanger(creature, 'Lethal')) return 'lethal'
  if (matchesDanger(creature, 'Cataclysmic')) return 'cosmic'
  if (matchesDanger(creature, 'High')) return 'high'
  if (matchesDanger(creature, 'Mischievous')) return 'mild'
  return 'high'
}

export default function Creatures() {
  const location = useLocation()
  const navigate = useNavigate()
  const { language, isFilipino, t } = useLanguage()

  const [searchQuery, setSearchQuery] = useState('')
  const [islandFilter, setIslandFilter] = useState('all')
  const [dangerFilter, setDangerFilter] = useState('all')
  const [isAudioPlaying, setIsAudioPlaying] = useState(false)
  const modalContentRef = useRef(null)
  const controlsRef = useRef(null)
  const wasStuckRef = useRef(false)
  const [filtersOpen, setFiltersOpen] = useState(true)
  const [isStuck, setIsStuck] = useState(false)

  // Compact the sticky bar once it pins to the top, and fold the filter panel
  // away at that moment so it never covers the cards while browsing.
  useEffect(() => {
    const onScroll = () => {
      const el = controlsRef.current
      if (!el) return
      const stickyTop = parseFloat(getComputedStyle(el).top) || 0
      const stuck = el.getBoundingClientRect().top <= stickyTop + 1
      if (stuck && !wasStuckRef.current) setFiltersOpen(false)
      wasStuckRef.current = stuck
      setIsStuck(stuck)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the dropdown with a click outside it while compact
  useEffect(() => {
    if (!isStuck || !filtersOpen) return
    const onDown = (e) => {
      if (controlsRef.current && !controlsRef.current.contains(e.target)) setFiltersOpen(false)
    }
    document.addEventListener('mousedown', onDown)
    return () => document.removeEventListener('mousedown', onDown)
  }, [isStuck, filtersOpen])

  // Derive active creature directly from URL hash (e.g. #aswang)
  const activeCreatureId = location.hash.replace('#', '')
  const selectedCreatureRaw = useMemo(() => {
    if (!activeCreatureId) return null
    return creatures.find((c) => c.id === activeCreatureId) || null
  }, [activeCreatureId])

  const selectedCreature = useMemo(() => {
    return getLocalizedCreature(selectedCreatureRaw, language)
  }, [selectedCreatureRaw, language])

  const openModal = useCallback(
    (creature) => {
      navigate(`/creatures#${creature.id}`)
    },
    [navigate]
  )

  const closeModal = useCallback(() => {
    navigate('/creatures')
  }, [navigate])

  // Scroll to creature on hash change if present
  useEffect(() => {
    if (activeCreatureId) {
      const el = document.getElementById(activeCreatureId)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    }
  }, [activeCreatureId])

  // Handle ESC key to close modal
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeModal()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [closeModal])

  // Lock body scroll when modal is open and reset modal scroll
  useEffect(() => {
    if (selectedCreature) {
      document.body.style.overflow = 'hidden'
      if (modalContentRef.current) {
        modalContentRef.current.scrollTop = 0
      }
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [selectedCreature])

  const toggleSound = () => {
    if (isAudioPlaying) {
      stopAmbience()
      setIsAudioPlaying(false)
    } else {
      const ok = startAmbience()
      if (ok) setIsAudioPlaying(true)
    }
  }

  // Filtered creatures
  const filteredCreatures = useMemo(() => {
    return creatures
      .map((c) => getLocalizedCreature(c, language))
      .filter((c) => {
        const matchesIsland = islandFilter === 'all' || c.island === islandFilter
        const matchesDangerLevel = matchesDanger(c, dangerFilter)

        const q = searchQuery.toLowerCase().trim()
        const matchesSearch =
          !q ||
          c.name.toLowerCase().includes(q) ||
          c.region.toLowerCase().includes(q) ||
          c.classification.toLowerCase().includes(q) ||
          c.weakness.toLowerCase().includes(q) ||
          c.habitat.toLowerCase().includes(q) ||
          (c.alternateNames && c.alternateNames.some((alt) => alt.toLowerCase().includes(q)))

        return matchesIsland && matchesDangerLevel && matchesSearch
      })
  }, [searchQuery, islandFilter, dangerFilter, language])

  // Counts that respect the *other* active filter, so chips show what you'd get if you clicked them
  const localizedAll = useMemo(
    () => creatures.map((c) => getLocalizedCreature(c, language)),
    [language]
  )

  const islandCounts = useMemo(() => {
    const base = localizedAll.filter((c) => matchesDanger(c, dangerFilter))
    return Object.fromEntries(
      ISLANDS.map((isl) => [
        isl.id,
        isl.id === 'all' ? base.length : base.filter((c) => c.island === isl.id).length,
      ])
    )
  }, [localizedAll, dangerFilter])

  const dangerCounts = useMemo(() => {
    const base = localizedAll.filter((c) => islandFilter === 'all' || c.island === islandFilter)
    return Object.fromEntries(
      DANGER_LEVELS.map((lvl) => [lvl.id, base.filter((c) => matchesDanger(c, lvl.id)).length])
    )
  }, [localizedAll, islandFilter])

  const activeIsland = ISLANDS.find((i) => i.id === islandFilter)
  const activeDanger = DANGER_LEVELS.find((d) => d.id === dangerFilter)
  const hasActiveFilters = Boolean(searchQuery) || islandFilter !== 'all' || dangerFilter !== 'all'

  const activeFilterCount =
    (islandFilter !== 'all' ? 1 : 0) + (dangerFilter !== 'all' ? 1 : 0)

  const resetFilters = () => {
    setSearchQuery('')
    setIslandFilter('all')
    setDangerFilter('all')
  }

  // Navigate next/previous creature in modal
  const currentIndex = selectedCreature
    ? creatures.findIndex((c) => c.id === selectedCreature.id)
    : -1

  const goToPrevious = () => {
    if (currentIndex > 0) {
      openModal(creatures[currentIndex - 1])
    } else {
      openModal(creatures[creatures.length - 1])
    }
  }

  const goToNext = () => {
    if (currentIndex < creatures.length - 1) {
      openModal(creatures[currentIndex + 1])
    } else {
      openModal(creatures[0])
    }
  }

  return (
    <div className="creatures-page">
      <Fog density={0.4} />

      {/* Hero / Header banner */}
      <header className="cr-header">
        <div className="container">
          <div className="cr-header__breadcrumbs">
            <Link to="/">{t('creatures.breadcrumbsRoot')}</Link>
            <span aria-hidden="true">/</span>
            <span className="cr-header__current">{t('creatures.breadcrumbsCurrent')}</span>
          </div>

          <p className="baybayin cr-header__baybayin" aria-hidden="true">
            {t('creatures.baybayinKicker')}
          </p>

          <h1 className="cr-header__title">
            {t('creatures.titleMain')} <em>{t('creatures.titleEm')}</em>
          </h1>
          <p className="cr-header__subtitle">
            {t('creatures.subtitle')}
          </p>

          <p className="cr-header__desc">
            {t('creatures.desc')}
          </p>

          <div className="cr-header__meta">
            <span className="cr-pill">
              <strong>{creatures.length}</strong> {t('creatures.documentedCount')}
            </span>
            <span className="cr-pill">
              <strong>3</strong> {t('creatures.archipelagoCount')}
            </span>
            <button
              type="button"
              className={`cr-audio-toggle ${isAudioPlaying ? 'is-active' : ''}`}
              onClick={toggleSound}
              title={isAudioPlaying ? t('creatures.soundOnLabel') : t('creatures.soundOffLabel')}
            >
              <span className="cr-audio-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                  <path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5a8.5 8.5 0 1 0 11 11z" />
                </svg>
              </span>
              <span className="cr-audio-label">
                {isAudioPlaying ? t('creatures.soundOnLabel') : t('creatures.soundOffLabel')}
              </span>
              <span className="cr-audio-eq" aria-hidden="true">
                <i /><i /><i /><i />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Filter and Search Bar */}
      <section
        ref={controlsRef}
        className={`cr-controls ${isStuck ? 'is-compact' : ''} ${filtersOpen ? 'is-open' : ''}`}
      >
        <div className="container">
          <div className="cr-controls__box">
            <div className="cr-controls__bar">
              <div className="cr-search-wrap">
                <svg className="cr-search-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                  <circle cx="11" cy="11" r="7" />
                  <path d="M20 20l-3.5-3.5" />
                </svg>
                <input
                  type="text"
                  className="cr-search-input"
                  placeholder={t('creatures.searchPlaceholder')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  aria-label={t('creatures.searchAria')}
                />
                {searchQuery && (
                  <button
                    type="button"
                    className="cr-search-clear"
                    onClick={() => setSearchQuery('')}
                    aria-label={t('creatures.clearSearch')}
                  >
                    ✕
                  </button>
                )}
              </div>

              <button
                type="button"
                className={`cr-filter-toggle ${filtersOpen ? 'is-open' : ''}`}
                onClick={() => setFiltersOpen((v) => !v)}
                aria-expanded={filtersOpen}
                aria-controls="cr-filters-panel"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                  <path d="M4 6h16M7 12h10M10 18h4" />
                </svg>
                <span>{isFilipino ? 'Salain' : 'Filters'}</span>
                {activeFilterCount > 0 && <span className="cr-filter-toggle__badge">{activeFilterCount}</span>}
                <svg className="cr-filter-toggle__chev" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
            </div>

            <div id="cr-filters-panel" className="cr-filters-panel">
              <div className="cr-filters-panel__inner">
            <div className="cr-filters">
              {/* Island: segmented control */}
              <div className="cr-filter-group">
                <span className="cr-filter-label">{t('creatures.filterIsland')}</span>
                <div className="cr-segmented" role="radiogroup" aria-label={t('creatures.filterIsland')}>
                  {ISLANDS.map((isl) => {
                    const count = islandCounts[isl.id]
                    const isActive = islandFilter === isl.id
                    return (
                      <button
                        key={isl.id}
                        type="button"
                        role="radio"
                        aria-checked={isActive}
                        disabled={count === 0 && !isActive}
                        className={`cr-seg ${isActive ? 'is-active' : ''}`}
                        onClick={() => setIslandFilter(isl.id)}
                      >
                        <span className="cr-seg__label">{isFilipino ? isl.fil : isl.en}</span>
                        <span className="cr-seg__count">{count}</span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Danger: color-coded chips */}
              <div className="cr-filter-group cr-filter-group--danger">
                <span className="cr-filter-label">{t('creatures.filterDanger')}</span>
                <div className="cr-chips" role="radiogroup" aria-label={t('creatures.filterDanger')}>
                  {DANGER_LEVELS.map((lvl) => {
                    const count = dangerCounts[lvl.id]
                    const isActive = dangerFilter === lvl.id
                    return (
                      <button
                        key={lvl.id}
                        type="button"
                        role="radio"
                        aria-checked={isActive}
                        disabled={count === 0 && !isActive}
                        className={`cr-chip cr-chip--${lvl.tone} ${isActive ? 'is-active' : ''}`}
                        onClick={() => setDangerFilter(lvl.id)}
                      >
                        {lvl.tone !== 'all' && <span className="cr-chip-dot" aria-hidden="true" />}
                        {isFilipino ? lvl.fil : lvl.en}
                        <span className="cr-chip-count">{count}</span>
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
              </div>
            </div>
          </div>

          {/* Results count + active filter tags */}
          <div className="cr-results-meta">
            <div className="cr-results-left">
              <span className="cr-results-count">
                {isFilipino
                  ? <>Ipinapakita ang <strong>{filteredCreatures.length}</strong> sa {creatures.length} na nilalang</>
                  : <>Showing <strong>{filteredCreatures.length}</strong> of {creatures.length} creatures</>}
              </span>

              {hasActiveFilters && (
                <div className="cr-active-tags">
                  {searchQuery && (
                    <button type="button" className="cr-tag" onClick={() => setSearchQuery('')}>
                      “{searchQuery}” <span aria-hidden="true">✕</span>
                      <span className="sr-only">{t('creatures.clearSearch')}</span>
                    </button>
                  )}
                  {islandFilter !== 'all' && activeIsland && (
                    <button type="button" className="cr-tag" onClick={() => setIslandFilter('all')}>
                      🏝 {isFilipino ? activeIsland.fil : activeIsland.en} <span aria-hidden="true">✕</span>
                    </button>
                  )}
                  {dangerFilter !== 'all' && activeDanger && (
                    <button
                      type="button"
                      className={`cr-tag cr-tag--${activeDanger.tone}`}
                      onClick={() => setDangerFilter('all')}
                    >
                      ⚠️ {isFilipino ? activeDanger.fil : activeDanger.en} <span aria-hidden="true">✕</span>
                    </button>
                  )}
                </div>
              )}
            </div>

            {hasActiveFilters && (
              <button type="button" className="cr-reset-filters" onClick={resetFilters}>
                {t('creatures.clearAllFilters')}
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Grid of Creatures */}
      <section className="cr-grid-section">
        <div className="container">
          {filteredCreatures.length === 0 ? (
            <div className="cr-empty">
              <Candle size={0.7} />
              <h3>{t('creatures.noResultsTitle')}</h3>
              <p>{t('creatures.noResultsDesc')}</p>
              <button type="button" className="btn btn--ghost" onClick={resetFilters}>
                {t('creatures.clearAllFilters')}
              </button>
            </div>
          ) : (
            <div className="cr-grid">
              {filteredCreatures.map((creature, idx) => {
                const tone = getDangerTone(creature)
                const toneMeta = TONE_META[tone]
                const toneLabel = isFilipino ? toneMeta.fil : toneMeta.en

                return (
                  <article
                    key={creature.id}
                    id={creature.id}
                    className={`cr-card cr-tone--${tone}`}
                    onClick={() => openModal(creature)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        openModal(creature)
                      }
                    }}
                    aria-label={
                      isFilipino
                        ? `Buksan ang buong tala tungkol sa ${creature.name}`
                        : `Open field notes for ${creature.name}`
                    }
                  >
                    <div className="cr-card__art">
                      {creature.image ? (
                        <img
                          src={creature.image}
                          alt={`Illustration of the ${creature.name}`}
                          className="cr-card__img"
                          loading="lazy"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <div className="cr-card__placeholder">
                          <span className="cr-card__watermark baybayin">{creature.baybayin}</span>
                          <Eyes
                            size={1.3}
                            color={creature.eyes || 'red'}
                            blink={4 + (idx % 4) * 1.2}
                            delay={0.2 + (idx % 3) * 0.3}
                            className="cr-card__eyes"
                          />
                        </div>
                      )}
                      <div className="cr-card__badges">
                        <span className="cr-badge cr-badge--island">{creature.island}</span>
                      </div>
                      <span className="cr-card__index">{String(idx + 1).padStart(2, '0')}</span>
                    </div>

                    <div className="cr-card__content">
                      <p className="baybayin cr-card__baybayin" aria-hidden="true">{creature.baybayin}</p>
                      <h2 className="cr-card__name">{creature.name}</h2>
                      <p className="cr-card__class">{creature.classification}</p>

                      {/* Danger meter: 4 pips, filled by severity, same tone as the filter chips */}
                      <div className="cr-card__danger" title={creature.dangerLevel}>
                        <span
                          className="cr-meter"
                          role="img"
                          aria-label={`${isFilipino ? 'Antas ng panganib' : 'Danger level'}: ${toneLabel} (${toneMeta.level}/4)`}
                        >
                          {[1, 2, 3, 4].map((n) => (
                            <i key={n} className={n <= toneMeta.level ? 'is-on' : ''} />
                          ))}
                        </span>
                        <span className="cr-card__danger-text">{creature.dangerLevel}</span>
                      </div>

                      <p className="cr-card__teaser">{creature.teaser}</p>

                      <div className="cr-card__footer">
                        <span className="cr-card__action">
                          {isFilipino ? 'Buksan ang Tala' : 'Open Field Notes'} <span aria-hidden="true">→</span>
                        </span>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* Modal / Secret Dossier ("Lihim na Tala ng Albularyo") */}
      {selectedCreature && (
        <div className="cr-modal-overlay" onClick={closeModal} role="dialog" aria-modal="true">
          <div
            className={`cr-modal cr-tone--${getDangerTone(selectedCreature)}`}
            onClick={(e) => e.stopPropagation()}
            ref={modalContentRef}
          >
            {/* Modal Top Bar */}
            <div className="cr-modal__nav">
              <div className="cr-modal__pager">
                <button
                  type="button"
                  className="cr-modal__prev"
                  onClick={goToPrevious}
                  title={t('creatures.modalPrev')}
                  aria-label={t('creatures.modalPrev')}
                >
                  ←
                </button>
                <span className="cr-modal__counter">
                  {currentIndex + 1} / {creatures.length}
                </span>
                <button
                  type="button"
                  className="cr-modal__next"
                  onClick={goToNext}
                  title={t('creatures.modalNext')}
                  aria-label={t('creatures.modalNext')}
                >
                  →
                </button>
              </div>

              <button
                type="button"
                className="cr-modal__close"
                onClick={closeModal}
                aria-label={t('creatures.modalClose')}
              >
                ✕ {isFilipino ? 'Isara' : 'Close'}
              </button>
            </div>

            {/* Modal Header */}
            <header className="cr-modal__header">
              <div className="cr-modal__eye-stage">
                {selectedCreature.image ? (
                  <div className="cr-modal__art-banner">
                    <img
                      src={selectedCreature.image}
                      alt={`Artwork of ${selectedCreature.name}`}
                      className="cr-modal__art-img"
                      referrerPolicy="no-referrer"
                    />
                    <div className="cr-modal__art-overlay" />
                  </div>
                ) : (
                  <div className="cr-modal__eye-bg">
                    <span className="cr-modal__watermark baybayin">{selectedCreature.baybayin}</span>
                    <Eyes
                      size={2.2}
                      color={selectedCreature.eyes || 'red'}
                      blink={4}
                      delay={0.1}
                      className="cr-modal__eyes"
                    />
                  </div>
                )}
              </div>

              <div className="cr-modal__title-box">
                <p className="baybayin cr-modal__baybayin">{selectedCreature.baybayin}</p>
                <h2 className="cr-modal__name">{selectedCreature.name}</h2>
                <p className="cr-modal__class-tag">{selectedCreature.classification}</p>

                <div className="cr-modal__tags">
                  <span className="cr-pill-tag cr-pill-tag--island">
                    🏝 {selectedCreature.island}
                  </span>
                  <span
                    className="cr-pill-tag cr-pill-tag--danger"
                    title={isFilipino ? 'Antas ng panganib' : 'Danger level'}
                  >
                    <span className="cr-meter" aria-hidden="true">
                      {[1, 2, 3, 4].map((n) => (
                        <i
                          key={n}
                          className={n <= TONE_META[getDangerTone(selectedCreature)].level ? 'is-on' : ''}
                        />
                      ))}
                    </span>
                    {selectedCreature.dangerLevel}
                  </span>
                </div>

                {selectedCreature.alternateNames && selectedCreature.alternateNames.length > 0 && (
                  <p className="cr-modal__alts">
                    <strong>{isFilipino ? 'Iba pang Tawag:' : 'Alternate Names:'}</strong> {selectedCreature.alternateNames.join(' · ')}
                  </p>
                )}
                <p className="cr-modal__loc">
                  <strong>{isFilipino ? 'Pinagmulang Rehiyon:' : 'Region of Origin:'}</strong> {selectedCreature.region}
                </p>
              </div>
            </header>

            {/* Modal Dossier Content */}
            <div className="cr-modal__body">
              {/* Lore & Appearance */}
              <section className="cr-section">
                <h3 className="cr-section__title">
                  <span className="cr-section__roman">I.</span> {isFilipino ? 'Ang Anyo at Kwento' : 'Appearance, Origin & Lore'}
                  <span className="cr-section__subtitle">{isFilipino ? 'Appearance, Origin & Lore' : 'Pinagmulan at Sinaunang Alamat'}</span>
                </h3>
                <p className="cr-section__text">{selectedCreature.description}</p>
              </section>

              {/* Habitat & Diet */}
              <div className="cr-info-grid">
                <div className="cr-info-card">
                  <h4>🌿 {isFilipino ? 'Tirahan (Habitat)' : 'Known Habitat'}</h4>
                  <p>{selectedCreature.habitat}</p>
                </div>
                <div className="cr-info-card">
                  <h4>🩸 {isFilipino ? 'Biktima at Kinakain (Prey)' : 'Diet & Prey'}</h4>
                  <p>{selectedCreature.dietOrPrey}</p>
                </div>
              </div>

              {/* Behavior & Hunting */}
              {selectedCreature.behavior && (
                <section className="cr-section">
                  <h3 className="cr-section__title">
                    <span className="cr-section__roman">II.</span> {isFilipino ? 'Paraan ng Pag-atake at Gawi' : 'Hunting Method & Nocturnal Behavior'}
                    <span className="cr-section__subtitle">{isFilipino ? 'Hunting Method & Nocturnal Behavior' : 'Paraan ng Pangangaso at Gawi'}</span>
                  </h3>
                  <p className="cr-section__text">{selectedCreature.behavior}</p>
                </section>
              )}

              {/* Signs / Sensory Warnings */}
              <section className="cr-section cr-section--warning">
                <h3 className="cr-section__title">
                  <span className="cr-section__roman">III.</span> {isFilipino ? 'Mga Palatandaan' : 'Sensory Warnings & Omens'}
                  <span className="cr-section__subtitle">{isFilipino ? 'Sensory Warnings & Omens' : 'Mga Babala sa Pandama'}</span>
                </h3>
                <div className="cr-callout cr-callout--signs">
                  <p>{selectedCreature.signs}</p>
                </div>
              </section>

              {/* Countermeasures & Weaknesses */}
              <section className="cr-section cr-section--weakness">
                <h3 className="cr-section__title">
                  <span className="cr-section__roman">IV.</span> {isFilipino ? 'Kahinaan at Panlaban' : 'Countermeasures & Sacred Wards'}
                  <span className="cr-section__subtitle">{isFilipino ? 'Countermeasures & Sacred Wards' : 'Mga Kahinaan at Panlaban'}</span>
                </h3>
                <div className="cr-callout cr-callout--ward">
                  <p>{selectedCreature.weakness}</p>
                </div>
              </section>

              {/* Ancestral Moral & Lesson */}
              <section className="cr-section cr-section--aral">
                <h3 className="cr-section__title">
                  <span className="cr-section__roman">V.</span> {isFilipino ? 'Aral ng mga Ninuno' : 'Ancestral Wisdom & Cultural Value'}
                  <span className="cr-section__subtitle">{isFilipino ? 'Cultural Wisdom & Significance' : 'Kahalagahang Kultural'}</span>
                </h3>
                <blockquote className="cr-quote">
                  “{selectedCreature.aral}”
                </blockquote>
              </section>

              {/* Research Sources & Citations */}
              <section className="cr-section cr-section--sources">
                <h3 className="cr-section__title">
                  <span className="cr-section__roman">VI.</span> {isFilipino ? 'Mga Pinagkunan at Sanggunian' : 'Verified Folklore Bibliography & Studies'}
                  <span className="cr-section__subtitle">{isFilipino ? 'Folklore Bibliography & Verified Studies' : 'Akademikong Tala'}</span>
                </h3>
                <ul className="cr-sources-list">
                  {selectedCreature.sources && selectedCreature.sources.length > 0 ? (
                    selectedCreature.sources.map((src, i) => (
                      <li key={i} className="cr-source-item">
                        <div className="cr-source-meta">
                          <strong className="cr-source-author">{src.author}</strong> ({src.year})
                          <em className="cr-source-book"> — {src.title}</em>
                          {src.publisher && <span className="cr-source-pub"> ({src.publisher})</span>}
                        </div>
                        {src.note && <p className="cr-source-note">{src.note}</p>}
                        {src.url && (
                          <a
                            href={src.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="cr-source-link"
                          >
                            {isFilipino ? 'Tingnan ang Sanggunian (Visit Verified Source) ↗' : 'Visit Verified Source / Archive ↗'}
                          </a>
                        )}
                      </li>
                    ))
                  ) : (
                    <li className="cr-source-item">Oral heritage documented in Philippine folklore archives.</li>
                  )}
                </ul>
              </section>
            </div>

            {/* Modal Bottom Actions */}
            <div className="cr-modal__foot">
              <div className="cr-modal__foot-pager">
                <button
                  type="button"
                  className="cr-foot-btn"
                  onClick={goToPrevious}
                >
                  ← {creatures[(currentIndex - 1 + creatures.length) % creatures.length].name}
                </button>
                <button
                  type="button"
                  className="cr-foot-btn"
                  onClick={goToNext}
                >
                  {creatures[(currentIndex + 1) % creatures.length].name} →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}