import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Fog from '../components/Fog'
import Candle from '../components/Candle'
import PhilippinesMap, { LABEL_ZOOM, PIN_ZOOM } from '../components/PhilippinesMap'
import MapDossier from './Mapdossier'
import { useLanguage } from '../context/useLanguage'
import { PHILIPPINES_BOUNDS, REGIONS_DATA } from '../data/Mapofmythsdata'
import './MapOfMyths.css'

const DEFAULT_REGION_ID = 'visayas'
/** Closest the opening view may start, so it always shows the island-group badges. */
const OVERVIEW_ZOOM = 6
/** How close a selected pin is framed. */
const PIN_FOCUS_ZOOM = 9
/** Pushes the pin below centre so its popup fits above it. */
const POPUP_ROOM_PX = 130

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

const inBounds = ([[south, west], [north, east]], { lat, lng }) =>
  lat >= south && lat <= north && lng >= west && lng <= east

export default function MapOfMyths() {
  const [selectedRegionId, setSelectedRegionId] = useState(DEFAULT_REGION_ID)
  const [selectedPin, setSelectedPin] = useState(null)
  const [selectedSite, setSelectedSite] = useState(null)
  const [zoom, setZoom] = useState(OVERVIEW_ZOOM)
  const mapRef = useRef(null)
  const { isFilipino, t } = useLanguage()

  const currentRegion =
    REGIONS_DATA.find((r) => r.id === selectedRegionId) ||
    REGIONS_DATA.find((r) => r.id === DEFAULT_REGION_ID)

  const flyTo = useCallback((center, targetZoom) => {
    mapRef.current?.flyTo(center, targetZoom, { animate: !prefersReducedMotion(), duration: 1.2 })
  }, [])

  const clearPin = useCallback(() => {
    setSelectedPin(null)
    setSelectedSite(null)
  }, [])

  const selectRegion = useCallback(
    (id) => {
      setSelectedRegionId(id)
      clearPin()
      const map = mapRef.current
      const region = REGIONS_DATA.find((r) => r.id === id)
      if (!map || !region) return
      // Small screens can't fit a whole region at pin zoom; pins still have to show.
      flyTo(region.center, Math.max(map.getBoundsZoom(region.bounds), PIN_ZOOM))
    },
    [clearPin, flyTo],
  )

  const selectPin = useCallback(
    (regionId, pin, site) => {
      setSelectedRegionId(regionId)
      setSelectedPin(pin)
      setSelectedSite(site)
      const map = mapRef.current
      if (!map) return
      const targetZoom = Math.max(map.getZoom(), PIN_FOCUS_ZOOM)
      const point = map.project([site.lat, site.lng], targetZoom).subtract([0, POPUP_ROOM_PX])
      flyTo(map.unproject(point, targetZoom), targetZoom)
    },
    [flyTo],
  )

  const handleMapReady = useCallback(({ target: map }) => {
    const fitted = Math.min(map.getBoundsZoom(PHILIPPINES_BOUNDS), OVERVIEW_ZOOM)
    map.setView(map.getCenter(), fitted, { animate: false })
    setZoom(fitted)
  }, [])

  // The panel follows the map: panning into another island group switches to it.
  const handleViewChange = useCallback(
    (map) => {
      const nextZoom = map.getZoom()
      const center = map.getCenter()
      setZoom(nextZoom)
      if (nextZoom < PIN_ZOOM) {
        clearPin()
        return
      }
      if (selectedPin) return
      setSelectedRegionId((id) => {
        const current = REGIONS_DATA.find((r) => r.id === id)
        if (current && inBounds(current.bounds, center)) return id
        return REGIONS_DATA.find((r) => inBounds(r.bounds, center))?.id ?? id
      })
    },
    [clearPin, selectedPin],
  )

  // Esc closes the focus card.
  useEffect(() => {
    if (!selectedPin) return undefined
    const onKey = (e) => {
      if (e.key === 'Escape') clearPin()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [selectedPin, clearPin])

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
                ? 'Lumapit sa alinmang lugar para makita ang mga pin, at i-click ang pin para malaman kung anong nilalang ang naroon'
                : 'Zoom in on any place to reveal its pins, then click one to see what creature is there'}
            </span>
          </div>

          <div className={`map-stage ${zoom >= LABEL_ZOOM ? 'is-close' : ''}`}>
            <PhilippinesMap
              ref={mapRef}
              zoom={zoom}
              selectedPin={selectedPin}
              selectedSite={selectedSite}
              onSelectRegion={selectRegion}
              onSelectPin={selectPin}
              onClearPin={clearPin}
              onViewChange={handleViewChange}
              onReady={handleMapReady}
            />
            {zoom < PIN_ZOOM && (
              <p className="map-stage__hint">
                {isFilipino ? 'Lumapit para makita ang mga nilalang' : 'Zoom in to find what lurks there'}
              </p>
            )}
          </div>

          <p className="map-stage-note">
            {isFilipino
              ? 'Ang mga pin ay tumutukoy sa lalawigan o pook kung saan isinasalaysay ang alamat, hindi sa tiyak na lugar ng pagkakita.'
              : 'Pins mark the province or landmark where each legend is told, not exact sightings.'}
          </p>

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
                    onClick={() => selectPin(currentRegion.id, pin, pin.sites[0])}
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
        <div className="map-dossier-wrap" key={selectedRegionId}>
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