import { forwardRef } from 'react'
import { Link } from 'react-router-dom'
import L from 'leaflet'
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { useLanguage } from '../context/useLanguage'
import { creatures } from '../data/creatures'
import { getLocalizedCreature } from '../data/creatureTranslations'
import { PHILIPPINES_BOUNDS, REGIONS_DATA } from '../data/Mapofmythsdata'

/** Below this zoom the map shows island-group badges; at or above it, creature pins. */
export const PIN_ZOOM = 6.5
/** At or above this zoom every pin also shows its creature's name. */
export const LABEL_ZOOM = 8

const MAX_BOUNDS = [[1.5, 111], [23, 133]]
// Keyless dark basemap: land and sea below, place names on top.
const ESRI_TILES = 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas'
const ESRI_ATTRIBUTION = 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ'
const PIN_PATH = 'M13 1C6.6 1 1.5 6 1.5 12.4 1.5 20.6 13 31 13 31s11.5-10.4 11.5-18.6C24.5 6 19.4 1 13 1z'

const SITE_MARKERS = REGIONS_DATA.flatMap((region) =>
  region.pins.flatMap((pin) => pin.sites.map((site) => ({ region, pin, site }))),
)

const escapeHtml = (text) => text.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`)

const pinIcon = (name, isSelected) =>
  L.divIcon({
    className: `map-marker ${isSelected ? 'is-selected' : ''}`,
    iconSize: [0, 0],
    html: `<span class="map-marker__pulse"></span>
      <svg class="map-marker__pin" viewBox="0 0 26 32" aria-hidden="true"><path d="${PIN_PATH}"/><circle cx="13" cy="12.5" r="4"/></svg>
      <span class="map-marker__label">${escapeHtml(name)}</span>`,
  })

const regionIcon = (name, count) =>
  L.divIcon({
    className: 'map-region-marker',
    iconSize: [0, 0],
    html: `<span class="map-region-badge">
      <span class="map-region-badge__name">${escapeHtml(name)}</span>
      <span class="map-region-badge__count">${escapeHtml(count)}</span>
    </span>`,
  })

function MapEvents({ onViewChange, onMapClick }) {
  useMapEvents({
    moveend: (e) => onViewChange(e.target),
    click: onMapClick,
  })
  return null
}

/** What the pin tells you: which creature is said to haunt this place. */
function CreaturePopup({ pin, site, onClose }) {
  const { language, isFilipino, t } = useLanguage()
  const creature = getLocalizedCreature(creatures.find((c) => c.id === pin.id), language)

  return (
    <Popup
      className="map-popup"
      position={[site.lat, site.lng]}
      offset={[0, -28]}
      autoPan={false}
      closeButton={false}
      closeOnClick={false}
      closeOnEscapeKey={false}
    >
      <button type="button" className="map-popup__close" onClick={onClose} aria-label={t('common.close')}>
        ✕
      </button>
      {creature?.image && <img className="map-popup__image" src={creature.image} alt="" />}
      <div className="map-popup__body">
        <span className="map-popup__place">{site.place}</span>
        <h3 className="map-popup__name">{pin.name}</h3>
        <p className="map-popup__type">{isFilipino ? pin.typeFil : pin.type}</p>
        {creature?.teaser && <p className="map-popup__teaser">{creature.teaser}</p>}
        <Link to={`/creatures#${pin.id}`} className="map-popup__link">
          {isFilipino ? 'Buksan ang Buong Tala' : 'Open Field Notes'} →
        </Link>
      </div>
    </Popup>
  )
}

/**
 * Real map of the Philippines. Zoomed out it shows the three island groups;
 * zoomed in, a pinpoint for every place a creature is said to haunt.
 * The forwarded ref is the Leaflet map, which the page flies around.
 */
const PhilippinesMap = forwardRef(function PhilippinesMap(
  { zoom, selectedPin, selectedSite, onSelectRegion, onSelectPin, onClearPin, onViewChange, onReady },
  ref,
) {
  const { isFilipino } = useLanguage()
  const showPins = zoom >= PIN_ZOOM

  return (
    <MapContainer
      ref={ref}
      className="map-leaflet"
      bounds={PHILIPPINES_BOUNDS}
      maxBounds={MAX_BOUNDS}
      maxBoundsViscosity={0.8}
      minZoom={4.5}
      maxZoom={13}
      zoomSnap={0.5}
      whenReady={onReady}
    >
      <TileLayer className="map-tiles" url={`${ESRI_TILES}/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}`} attribution={ESRI_ATTRIBUTION} />
      <TileLayer url={`${ESRI_TILES}/World_Dark_Gray_Reference/MapServer/tile/{z}/{y}/{x}`} zIndex={2} />

      <MapEvents onViewChange={onViewChange} onMapClick={onClearPin} />

      {!showPins &&
        REGIONS_DATA.map((region) => {
          const name = isFilipino ? region.nameFil : region.name
          const count = `${region.pins.length} ${isFilipino ? 'Nilalang' : 'Spirits'}`
          return (
            <Marker
              key={region.id}
              position={region.center}
              icon={regionIcon(name, count)}
              title={isFilipino ? `Lumapit sa ${name}` : `Zoom in on ${name}`}
              alt={`${name}, ${count}`}
              eventHandlers={{ click: () => onSelectRegion(region.id) }}
            />
          )
        })}

      {showPins &&
        SITE_MARKERS.map(({ region, pin, site }) => {
          const isSelected = selectedSite === site
          return (
            <Marker
              key={`${region.id}-${pin.id}-${site.place}`}
              position={[site.lat, site.lng]}
              icon={pinIcon(pin.name, isSelected)}
              title={`${pin.name} · ${site.place}`}
              alt={`${pin.name}, ${site.place}`}
              zIndexOffset={isSelected ? 1000 : 0}
              eventHandlers={{ click: () => onSelectPin(region.id, pin, site) }}
            />
          )
        })}

      {selectedPin && selectedSite && (
        <CreaturePopup pin={selectedPin} site={selectedSite} onClose={onClearPin} />
      )}
    </MapContainer>
  )
})

export default PhilippinesMap
