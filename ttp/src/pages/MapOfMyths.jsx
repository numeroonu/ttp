import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Fog from '../components/Fog'
import Candle from '../components/Candle'
import MapDossier from './Mapdossier'
import { useLanguage } from '../context/useLanguage'
import { REGIONS_DATA, OTHER_LAND } from '../data/Mapofmythsdata'
import './MapOfMyths.css'

const MAP_W = 340
const MAP_H = 460
const DEFAULT_REGION_ID = 'visayas'

/** Enter / Space activate an SVG element that acts as a button. */
const onActivateKey = (handler) => (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault()
    handler()
  }
}

export default function MapOfMyths() {
  const [selectedRegionId, setSelectedRegionId] = useState(DEFAULT_REGION_ID)
  const [selectedPin, setSelectedPin] = useState(null)
  const dossierRef = useRef(null)
  const { isFilipino, t } = useLanguage()

  const currentRegion =
    REGIONS_DATA.find((r) => r.id === selectedRegionId) ||
    REGIONS_DATA.find((r) => r.id === DEFAULT_REGION_ID)

  const regionName = isFilipino ? currentRegion.nameFil : currentRegion.name

  const selectRegion = useCallback((id) => {
    setSelectedRegionId(id)
    setSelectedPin(null)
  }, [])

  const clearPin = useCallback(() => setSelectedPin(null), [])

  // On stacked (tablet / phone) layouts the dossier sits below the map, so
  // bring the new focus card into view when a creature is picked.
  const selectPin = useCallback((pin) => {
    setSelectedPin(pin)
    if (typeof window !== 'undefined' && window.matchMedia('(max-width: 1024px)').matches) {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      requestAnimationFrame(() => {
        dossierRef.current?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
      })
    }
  }, [])

  // Esc closes the focus card.
  useEffect(() => {
    if (!selectedPin) return undefined
    const onKey = (e) => {
      if (e.key === 'Escape') setSelectedPin(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [selectedPin])

  return (
    <div className="map-page">
      <Fog density={0.3} />

      {/* Header */}
      <header className="map-hero">
        <div className="container map-hero__inner">
          <p className="kicker">{t('map.kicker')}</p>
          <p className="baybayin map-hero__baybayin" aria-hidden="true">ᜋᜉ ᜈ᜔ᜄ ᜋᜅ ᜀᜎᜋᜆ᜔</p>
          <h1 className="map-hero__title">
            {t('map.title')} <em>{t('map.titleEm')}</em>
          </h1>
          <p className="map-hero__subtitle">{t('map.subtitle')}</p>
          <p className="map-hero__lead">{t('map.desc')}</p>

          {/* Segmented region selector */}
          <nav className="map-selector" aria-label={t('map.switchRegion')}>
            {REGIONS_DATA.map((region) => {
              const isActive = region.id === selectedRegionId
              return (
                <button
                  key={region.id}
                  type="button"
                  className={`map-selector__btn ${isActive ? 'is-active' : ''}`}
                  aria-pressed={isActive}
                  onClick={() => selectRegion(region.id)}
                >
                  <span className="baybayin map-selector__baybayin" aria-hidden="true">{region.baybayin}</span>
                  <span className="map-selector__name">{isFilipino ? region.nameFil : region.name}</span>
                  <span className="map-selector__count">
                    {region.pins.length} {isFilipino ? 'Nilalang' : 'Spirits'}
                  </span>
                </button>
              )
            })}
          </nav>
        </div>
      </header>

      {/* Main explorer */}
      <main className="container map-explorer">
        {/* Left: interactive map */}
        <section className="map-canvas-card" aria-label={isFilipino ? 'Interaktibong Mapa ng Kwentong-bayan' : 'Interactive Folklore Map'}>
          <div className="map-canvas-card__header">
            <div>
              <span className="map-canvas__kicker">
                {isFilipino ? `${currentRegion.nameFil} Teritoryo` : `${currentRegion.name} Territory`}
              </span>
              <h2 className="map-canvas__title">
                {isFilipino ? currentRegion.taglineFil : currentRegion.tagline}
              </h2>
            </div>
            <span className="map-canvas__hint">
              {isFilipino
                ? 'I-click ang mga pulo o nilalang para sa buong detalye'
                : 'Select an island, then a creature pin, for field notes'}
            </span>
          </div>

          <div className="map-stage">
            <svg
              viewBox={`0 0 ${MAP_W} ${MAP_H}`}
              className="map-stage__svg"
              role="group"
              aria-label={isFilipino ? `Mapa ng ${regionName}` : `Map of ${regionName}`}
            >
              <defs>
                <pattern id="seaGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(138, 133, 144, 0.05)" strokeWidth="0.5" />
                </pattern>
                <radialGradient id="mapGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="rgba(224, 163, 59, 0.15)" />
                  <stop offset="100%" stopColor="transparent" />
                </radialGradient>
              </defs>

              <rect width="100%" height="100%" fill="url(#seaGrid)" />
              <circle cx="170" cy="230" r="160" fill="url(#mapGlow)" pointerEvents="none" />

              {/* Compass rose */}
              <g className="map-compass" transform="translate(300 52)" aria-hidden="true">
                <circle r="13" />
                <path className="map-compass__needle" d="M0,-11 L3,0 L0,11 L-3,0 Z" />
                <text y="-17" textAnchor="middle">N</text>
              </g>

              {/* Decorative island */}
              <path d={OTHER_LAND.landPath} className="map-land map-land--static is-dim-land" aria-hidden="true" />
              <text
                x={OTHER_LAND.label.x}
                y={OTHER_LAND.label.y}
                textAnchor={OTHER_LAND.label.anchor}
                className="map-region-label"
                aria-hidden="true"
              >
                {OTHER_LAND.name}
              </text>

              {/* Selectable regions */}
              {REGIONS_DATA.map((region) => {
                const isActive = region.id === selectedRegionId
                const name = isFilipino ? region.nameFil : region.name
                return (
                  <g key={region.id}>
                    <path
                      d={region.landPath}
                      pathLength={1}
                      className={`map-land ${isActive ? 'is-active-land' : 'is-dim-land'}`}
                      role="button"
                      tabIndex={0}
                      aria-pressed={isActive}
                      aria-label={isFilipino ? `Piliin ang ${name}` : `Select ${name}`}
                      onClick={() => selectRegion(region.id)}
                      onKeyDown={onActivateKey(() => selectRegion(region.id))}
                    />
                    <text
                      x={region.label.x}
                      y={region.label.y}
                      textAnchor={region.label.anchor}
                      className={`map-region-label ${isActive ? 'is-active' : ''}`}
                      aria-hidden="true"
                    >
                      {name}
                    </text>
                  </g>
                )
              })}

              {/* Creature pins for the active region */}
              {currentRegion.pins.map((pin) => {
                const isSelected = selectedPin?.id === pin.id
                const cx = (pin.x / 100) * MAP_W
                const cy = (pin.y / 100) * MAP_H
                return (
                  <g
                    key={pin.id}
                    className={`map-pin-group ${isSelected ? 'is-selected-pin' : ''}`}
                    role="button"
                    tabIndex={0}
                    aria-pressed={isSelected}
                    aria-label={`${pin.name}, ${isFilipino ? pin.typeFil : pin.type}`}
                    onClick={(e) => {
                      e.stopPropagation()
                      selectPin(pin)
                    }}
                    onKeyDown={onActivateKey(() => selectPin(pin))}
                  >
                    <circle cx={cx} cy={cy} r="14" className="map-pin-pulse" />
                    <circle cx={cx} cy={cy} r="6" className="map-pin-dot" />
                    <circle cx={cx} cy={cy} r="2.5" className="map-pin-core" />
                    <text x={cx + 10} y={cy + 4} className="map-pin-text">
                      {pin.name}
                    </text>
                  </g>
                )
              })}
            </svg>
          </div>

          {/* Creature chips under the map */}
          <div className="map-pin-list">
            <span className="map-pin-list__label">
              {isFilipino ? `Mga Nilalang sa ${currentRegion.nameFil}:` : `Documented Spirits in ${currentRegion.name}:`}
            </span>
            <div className="map-pin-chips">
              {currentRegion.pins.map((pin) => {
                const isSelected = selectedPin?.id === pin.id
                return (
                  <button
                    key={pin.id}
                    type="button"
                    className={`map-pin-chip ${isSelected ? 'is-active' : ''}`}
                    aria-pressed={isSelected}
                    onClick={() => selectPin(pin)}
                  >
                    <span className="map-pin-chip__dot" aria-hidden="true" />
                    <span className="map-pin-chip__name">{pin.name}</span>
                    <span className="map-pin-chip__type">{isFilipino ? pin.typeFil : pin.type}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </section>

        {/* Right: regional dossier (own component) */}
        <div className="map-dossier-wrap" ref={dossierRef} key={selectedRegionId}>
          <MapDossier region={currentRegion} selectedPin={selectedPin} onClearPin={clearPin} />
        </div>
      </main>

      {/* Cultural context footer */}
      <footer className="container map-footer-callout">
        <Candle size={0.7} />
        <div className="map-footer-callout__text">
          <h3>
            {isFilipino ? 'Bakit Iba-iba ang Kwento sa Bawat Pulo?' : 'Why Do Legends Differ Across the Islands?'}
          </h3>
          <p>
            {isFilipino
              ? 'Ang 7,641 na pulo ng Pilipinas ay pinaghiwalay ng malalawak na dagat at matatayog na kabundukan. Dahil dito, ang bawat pangkat-etniko ay nakabuo ng sariling kwento ukol sa mga espiritu ng kanilang kalikasan. Ang mga kwentong ito ay hindi lamang panakot—ito ang paraan ng ating mga ninuno upang igalang ang kapaligiran at itaguyod ang pagkakaisa.'
              : 'Separated by deep oceanic channels and rugged volcanic mountain chains, each ethnic group throughout the 7,641 islands evolved distinct animist cosmologies. These oral traditions were ecological contracts—teaching reverence for old-growth trees, deep waters, and mutual community vigilance.'}
          </p>
          <div className="map-footer-callout__actions">
            <Link to="/creatures" className="btn">
              {isFilipino ? 'Tingnan ang Lahat ng Nilalang' : 'Explore All Creatures'} <span className="btn__arrow">→</span>
            </Link>
            <Link to="/origins" className="btn btn--ghost">
              {isFilipino ? 'Basahin ang Pinagmulan' : 'Read Historical Origins'}
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}