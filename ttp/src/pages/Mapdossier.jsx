import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../context/useLanguage'
import './Mapdossier.css'

/* ---------- tiny inline icons ---------- */
const IconMountain = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 19l6-11 4 7 2-3 6 7H3z" />
  </svg>
)
const IconCloud = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M7 18a4 4 0 0 1-.5-7.97A5.5 5.5 0 0 1 17 8.5a4.75 4.75 0 0 1 0 9.5H7z" />
  </svg>
)
const IconPin = () => (
  <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z" />
    <circle cx="12" cy="9.5" r="2.5" />
  </svg>
)

/* Hotspot photo. Hides itself if the file is missing, so it is safe to add images gradually. */
function HotspotImage({ src, alt, credit }) {
  const [failed, setFailed] = useState(false)
  if (!src || failed) return null
  return (
    <figure className="md-entry__figure">
      <div className="md-entry__frame">
        <img src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} />
      </div>
      {credit && <figcaption className="md-entry__credit">{credit}</figcaption>}
    </figure>
  )
}

/* "Author – Work title (1889)" → { author, work, year } */
function splitSourceTitle(title) {
  const parts = title.split(' – ')
  const author = parts.length > 1 ? parts[0] : null
  let work = parts.length > 1 ? parts.slice(1).join(' – ') : title
  const yearMatch = work.match(/\s*\((\d{4})\)\s*$/)
  const year = yearMatch ? yearMatch[1] : null
  if (yearMatch) work = work.slice(0, yearMatch.index)
  return { author, work, year }
}

/**
 * Right-hand dossier for the Map of Myths page.
 * Props:
 *   region        – the active REGIONS_DATA entry
 *   selectedPin   – the selected creature pin (or null)
 *   onClearPin    – () => void, clears the selected pin
 */
export default function MapDossier({ region, selectedPin, onClearPin }) {
  const { isFilipino, t } = useLanguage()

  const regionName = isFilipino ? region.nameFil : region.name
  const terrainChips = (isFilipino ? region.terrainFil : region.terrain)
    .split('·')
    .map((s) => s.trim())
    .filter(Boolean)

  return (
    <section
      className="md"
      style={{ '--md-accent': region.color }}
      aria-label={isFilipino ? 'Mga Detalye ng Rehiyon at Makasaysayang Talaan' : 'Regional Details and Historical Archives'}
    >
      {/* ===================== Focus (selected pin) OR Overview ===================== */}
      {selectedPin ? (
        <article className="md-card md-focus">
          <header className="md-card__head">
            <span className="md-kicker">{isFilipino ? 'Tampok na Teritoryo' : 'Territory Focus'}</span>
            <button type="button" className="md-close" onClick={onClearPin} aria-label={t('common.close')}>
              ✕
            </button>
          </header>

          <h3 className="md-focus__name">{selectedPin.name}</h3>
          <p className="md-focus__type">{isFilipino ? selectedPin.typeFil : selectedPin.type}</p>

          <div className="md-focus__territory">
            <span className="md-focus__territory-icon"><IconPin /></span>
            <div>
              <span className="md-label">
                {isFilipino ? 'Pangunahing Tirahan' : 'Primary Territory'}
              </span>
              <p>{selectedPin.territory}</p>
            </div>
          </div>

          <Link to={`/creatures#${selectedPin.id}`} className="btn btn--sm md-focus__cta">
            {isFilipino ? 'Buksan ang Buong Tala' : 'Open Field Notes'} <span className="btn__arrow">→</span>
          </Link>
        </article>
      ) : (
        <article className="md-card md-overview">
          <header className="md-card__head">
            <span className="md-kicker">{isFilipino ? 'Pangkalahatang Pananaw' : 'Regional Overview'}</span>
            <span className="baybayin md-overview__script" aria-hidden="true">{region.baybayin}</span>
          </header>

          <h3 className="md-title">
            {regionName}
            <span className="md-title__sub">
              {isFilipino ? 'Likas na Katangian at Kalupaan' : 'Topography & Natural Realm'}
            </span>
          </h3>

          {/* At-a-glance numbers */}
          <dl className="md-stats">
            <div className="md-stat">
              <dt>{isFilipino ? 'Nilalang' : 'Spirits'}</dt>
              <dd>{region.pins.length}</dd>
            </div>
            <div className="md-stat">
              <dt>{isFilipino ? 'Pook' : 'Hotspots'}</dt>
              <dd>{region.hotspots.length}</dd>
            </div>
            <div className="md-stat">
              <dt>{isFilipino ? 'Batis' : 'Sources'}</dt>
              <dd>{region.sources.length}</dd>
            </div>
          </dl>

          <p className="md-overview__text">{isFilipino ? region.overviewFil : region.overview}</p>

          {/* Terrain + climate as scannable facts */}
          <div className="md-facts">
            <div className="md-fact">
              <span className="md-fact__icon"><IconMountain /></span>
              <div className="md-fact__body">
                <span className="md-label">{isFilipino ? 'Kalupaan' : 'Terrain'}</span>
                <ul className="md-chips">
                  {terrainChips.map((chip) => (
                    <li key={chip} className="md-chip">{chip}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md-fact">
              <span className="md-fact__icon"><IconCloud /></span>
              <div className="md-fact__body">
                <span className="md-label">{isFilipino ? 'Klima at Kagubatan' : 'Climate'}</span>
                <p>{isFilipino ? region.climateFil : region.climate}</p>
              </div>
            </div>
          </div>
        </article>
      )}

      {/* ===================== Historic Supernatural Hotspots ===================== */}
      <article className="md-card md-section md-hotspots">
        <h3 className="md-section-title">
          {isFilipino ? 'Makasaysayang Pook ng Katatakutan' : 'Historic Supernatural Hotspots'}
        </h3>

        <ul className="md-entries">
          {region.hotspots.map((spot) => (
            <li key={spot.title} className="md-entry">
              <div className="md-entry__margin">
                <IconPin />
                <span className="md-entry__places">
                  {spot.province
                    .split('·')
                    .map((p) => p.trim())
                    .filter(Boolean)
                    .map((p) => (
                      <span key={p}>{p}</span>
                    ))}
                </span>
              </div>
              <div className="md-entry__main">
                <HotspotImage
                  src={spot.image}
                  alt={isFilipino ? spot.titleFil : spot.title}
                  credit={spot.imageCredit}
                />
                <h4 className="md-entry__title">{isFilipino ? spot.titleFil : spot.title}</h4>
                <p className="md-entry__lore">{isFilipino ? spot.loreFil : spot.lore}</p>
              </div>
            </li>
          ))}
        </ul>
      </article>

      {/* ===================== Verified Academic Sources ===================== */}
      <article className="md-card md-section md-sources">
        <h3 className="md-section-title">
          {isFilipino ? 'Mga Na-verify na Batis at Pag-aaral' : 'Verified Academic Sources'}
        </h3>

        <p className="md-sources__note">
          {isFilipino
            ? 'Ang mga datos sa rehiyong ito ay napatunayan batay sa mga nailathalang akademikong batis.'
            : 'Folklore accounts in this region are cross-referenced with published references.'}
        </p>

        <ul className="md-refs">
          {region.sources.map((src, i) => {
            const { author, work, year } = splitSourceTitle(src.title)
            const callNo = `${region.id.slice(0, 3).toUpperCase()} · ${String(i + 1).padStart(2, '0')}`
            return (
              <li key={src.url} className="md-ref">
                <span className="md-ref__callno">{callNo}</span>
                {author && <p className="md-ref__author">{author}</p>}
                <p className="md-ref__work">{work}</p>
                <p className="md-ref__note">{isFilipino && src.noteFil ? src.noteFil : src.note}</p>
                <div className="md-ref__foot">
                  <span className="md-ref__year">{year}</span>
                  <a
                    href={src.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="md-ref__link"
                    aria-label={`${src.title} (${isFilipino ? 'bubukas sa bagong tab' : 'opens in a new tab'})`}
                  >
                    {isFilipino ? 'Basahin ang batis' : 'Read source'} <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </li>
            )
          })}
        </ul>
      </article>
    </section>
  )
}