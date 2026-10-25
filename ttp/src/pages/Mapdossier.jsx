import { Link } from 'react-router-dom'
import { useLanguage } from '../context/useLanguage'
import './MapDossier.css'

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
const IconBook = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21.5v-16z" />
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
  </svg>
)
const IconExternal = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M7 17L17 7M9 7h8v8" />
  </svg>
)

/* "Author – Work title" → { author, work } */
function splitSourceTitle(title) {
  const parts = title.split(' – ')
  if (parts.length > 1) return { author: parts[0], work: parts.slice(1).join(' – ') }
  return { author: null, work: title }
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
      aria-label="Regional Details and Historical Archives"
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
      <article className="md-card md-hotspots">
        <header className="md-card__head">
          <h3 className="md-section-title">
            <span aria-hidden="true">✦</span>
            {isFilipino ? 'Makasaysayang Pook ng Katatakutan' : 'Historic Supernatural Hotspots'}
          </h3>
          <span className="md-count">{region.hotspots.length}</span>
        </header>

        <ol className="md-timeline">
          {region.hotspots.map((spot, i) => (
            <li key={spot.title} className="md-spot">
              <span className="md-spot__marker" aria-hidden="true">{i + 1}</span>
              <div className="md-spot__body">
                <h4 className="md-spot__title">{isFilipino ? spot.titleFil : spot.title}</h4>
                <span className="md-spot__prov">
                  <IconPin /> {spot.province}
                </span>
                <p className="md-spot__lore">{isFilipino ? spot.loreFil : spot.lore}</p>
              </div>
            </li>
          ))}
        </ol>
      </article>

      {/* ===================== Verified Academic Sources ===================== */}
      <article className="md-card md-sources">
        <header className="md-card__head">
          <h3 className="md-section-title">
            <span aria-hidden="true">✦</span>
            {isFilipino ? 'Mga Na-verify na Batis at Pag-aaral' : 'Verified Academic Sources'}
          </h3>
          <span className="md-count">{region.sources.length}</span>
        </header>

        <p className="md-sources__note">
          {isFilipino
            ? 'Ang mga datos sa rehiyong ito ay napatunayan batay sa mga nailathalang akademikong batis.'
            : 'Folklore accounts in this region are cross-referenced with published references.'}
        </p>

        <ul className="md-source-list">
          {region.sources.map((src) => {
            const { author, work } = splitSourceTitle(src.title)
            return (
              <li key={src.url}>
                <a
                  href={src.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="md-source"
                  aria-label={`${src.title} (${isFilipino ? 'bubukas sa bagong tab' : 'opens in a new tab'})`}
                >
                  <span className="md-source__icon"><IconBook /></span>
                  <span className="md-source__body">
                    {author && <span className="md-source__author">{author}</span>}
                    <span className="md-source__work">{work}</span>
                    <span className="md-source__note">
                      {isFilipino && src.noteFil ? src.noteFil : src.note}
                    </span>
                  </span>
                  <span className="md-source__go"><IconExternal /></span>
                </a>
              </li>
            )
          })}
        </ul>
      </article>
    </section>
  )
}