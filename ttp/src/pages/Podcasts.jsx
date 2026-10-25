import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Fog from '../components/Fog'
import Candle from '../components/Candle'
import {
  PODCASTS_DATA,
  PODCAST_GENRES,
  PODCAST_LANGUAGES,
} from '../data/podcastsData'
import { useLanguage } from '../context/useLanguage'
import './Podcasts.css'

const SPOTIFY_PATH =
  'M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.503 17.307c-.216.353-.674.468-1.026.252-2.813-1.718-6.354-2.106-10.526-1.153-.402.091-.801-.157-.893-.56-.091-.403.158-.802.56-.893 4.568-1.044 8.49-.607 11.632 1.328.353.216.467.674.253 1.026zm1.47-3.264c-.272.441-.85.58-1.291.308-3.22-1.979-8.128-2.552-11.936-1.396-.498.151-1.028-.135-1.18-.633-.15-.498.136-1.028.634-1.179 4.356-1.322 9.776-.682 13.465 1.609.442.271.58.85.308 1.291zm.126-3.41c-3.86-2.293-10.228-2.505-13.916-1.385-.593.18-1.223-.158-1.403-.751-.18-.593.158-1.224.751-1.404 4.242-1.288 11.272-1.042 15.708 1.591.533.316.708 1.006.392 1.54-.316.533-1.006.708-1.54.392z'

function SpotifyIcon({ size = 14 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true">
      <path d={SPOTIFY_PATH} />
    </svg>
  )
}

// Two-letter monogram for the cover tile, skipping leading articles
function monogram(title) {
  const words = title
    .replace(/[^\p{L}\p{N}\s]/gu, '')
    .split(/\s+/)
    .filter((w) => w && !/^(the|ang|ng|mga|of|at|and)$/i.test(w))
  return (words[0]?.[0] || '') + (words[1]?.[0] || '')
}

export default function Podcasts() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedGenre, setSelectedGenre] = useState('All Genres')
  const [selectedLanguage, setSelectedLanguage] = useState('All Languages')
  const [activeEmbedId, setActiveEmbedId] = useState(null)
  const [pickOpen, setPickOpen] = useState(false)
  const { isFilipino, t } = useLanguage()

  const filteredPodcasts = useMemo(() => {
    return PODCASTS_DATA.filter((pod) => {
      const matchGenre = selectedGenre === 'All Genres' || pod.category === selectedGenre
      const matchLang = selectedLanguage === 'All Languages' || pod.language === selectedLanguage
      const q = searchQuery.toLowerCase().trim()
      const matchSearch =
        !q ||
        pod.title.toLowerCase().includes(q) ||
        pod.host.toLowerCase().includes(q) ||
        pod.category.toLowerCase().includes(q) ||
        pod.description.toLowerCase().includes(q) ||
        pod.tags.some((tag) => tag.toLowerCase().includes(q))
      return matchGenre && matchLang && matchSearch
    })
  }, [searchQuery, selectedGenre, selectedLanguage])

  const featuredPodcast = PODCASTS_DATA.find((p) => p.featured) || PODCASTS_DATA[0]
  const isFiltered =
    searchQuery || selectedGenre !== 'All Genres' || selectedLanguage !== 'All Languages'

  const toggleEmbed = (id) => setActiveEmbedId((prev) => (prev === id ? null : id))

  const resetFilters = () => {
    setSearchQuery('')
    setSelectedGenre('All Genres')
    setSelectedLanguage('All Languages')
  }

  return (
    <div className="podcasts-page">
      <Fog density={0.35} />

      {/* Header, with a decorative radio dial */}
      <header className="podcasts-header">
        <div className="container">
          <p className="kicker">{t('podcasts.kicker')}</p>
          <p className="baybayin podcasts-header__baybayin" aria-hidden="true">
            ᜃ᜔ᜏᜒᜈ᜔ᜆᜓ ᜐ ᜑᜆᜒᜅ᜔ᜄᜊᜒ
          </p>
          <h1 className="podcasts-header__title">
            {t('podcasts.title')} <em>{t('podcasts.titleEm')}</em>
          </h1>
          <p className="podcasts-header__subtitle">{t('podcasts.subtitle')}</p>
          <p className="podcasts-header__desc">{t('podcasts.desc')}</p>
          <div className="podcasts-dial" aria-hidden="true">
            <span className="podcasts-dial__needle" />
          </div>
        </div>
      </header>

      <main className="container podcasts-main">
        {/* Featured pick: one slim strip, not a hero */}
        {featuredPodcast && (
          <section className="podcasts-pick" aria-label={t('podcasts.spotlightBadge')}>
            <div className="podcasts-pick__row">
              <div className="podcast-cover podcast-cover--lg" aria-hidden="true">
                {monogram(featuredPodcast.title)}
              </div>

              <div className="podcasts-pick__body">
                <p className="podcasts-pick__flag">
                  {t('podcasts.spotlightBadge')}
                  <span className="podcasts-pick__rating">{featuredPodcast.rating}</span>
                </p>
                <h2 className="podcasts-pick__title">{featuredPodcast.title}</h2>
                <p className="podcasts-pick__meta">
                  {isFilipino ? 'Pinapangunahan ni' : 'Hosted by'} <strong>{featuredPodcast.host}</strong>
                  {' · '}
                  {featuredPodcast.category}
                  {' · '}
                  {featuredPodcast.language}
                </p>
                <p className="podcasts-pick__desc">{featuredPodcast.description}</p>
                <p className="podcasts-pick__episode">
                  <span>{isFilipino ? 'Simulan sa:' : 'Start with:'}</span>{' '}
                  <em>“{featuredPodcast.episodeHighlight}”</em>
                </p>
              </div>

              <div className="podcasts-pick__actions">
                <a
                  href={featuredPodcast.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn"
                >
                  {t('podcasts.listenSpotify')} <span className="btn__arrow" aria-hidden="true">↗</span>
                </a>
                <button
                  type="button"
                  className="btn btn--ghost"
                  aria-expanded={pickOpen}
                  onClick={() => setPickOpen((v) => !v)}
                >
                  {pickOpen ? t('podcasts.hideEmbed') : t('podcasts.showEmbed')}
                </button>
              </div>
            </div>

            {pickOpen && (
              <div className="podcasts-embed">
                <iframe
                  title={`${featuredPodcast.title} Spotify Player`}
                  src={`https://open.spotify.com/embed/show/${featuredPodcast.spotifyId}?utm_source=generator&theme=0`}
                  width="100%"
                  height="152"
                  frameBorder="0"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                />
              </div>
            )}
          </section>
        )}

        {/* One-line filter bar */}
        <section className="podcasts-bar" aria-label={isFilipino ? 'Salaan' : 'Filters'}>
          <div className="podcasts-search-box">
            <span className="podcasts-search-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>
            </span>
            <input
              type="search"
              className="podcasts-search-input"
              placeholder={t('podcasts.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search folklore podcasts"
            />
          </div>

          <select
            className="podcasts-select"
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
            aria-label={isFilipino ? 'Kategorya' : 'Genre'}
          >
            {PODCAST_GENRES.map((genre) => (
              <option key={genre} value={genre}>
                {genre === 'All Genres' && isFilipino ? 'Lahat ng Genre' : genre}
              </option>
            ))}
          </select>

          <select
            className="podcasts-select"
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            aria-label={isFilipino ? 'Wika' : 'Language'}
          >
            {PODCAST_LANGUAGES.map((lang) => (
              <option key={lang} value={lang}>
                {lang === 'All Languages' && isFilipino ? 'Lahat ng Wika' : lang}
              </option>
            ))}
          </select>

          <p className="podcasts-meta-count" aria-live="polite">
            {isFilipino
              ? `${filteredPodcasts.length} sa ${PODCASTS_DATA.length} palabas`
              : `${filteredPodcasts.length} of ${PODCASTS_DATA.length} shows`}
            {isFiltered && (
              <button type="button" className="podcasts-reset" onClick={resetFilters}>
                {isFilipino ? 'I-reset' : 'Reset'}
              </button>
            )}
          </p>
        </section>

        {/* Schedule-style list */}
        <section className="podcasts-catalog">
          {filteredPodcasts.length === 0 ? (
            <div className="podcasts-empty">
              <Candle size={0.6} />
              <h3>{isFilipino ? 'Walang Natagpuang Podcast' : 'No podcasts found'}</h3>
              <p>
                {isFilipino
                  ? 'Walang tumugmang palabas. Subukang i-reset ang filter.'
                  : 'Nothing matched. Try a different search or reset the filters.'}
              </p>
              <button type="button" className="btn btn--ghost" onClick={resetFilters}>
                {isFilipino ? 'I-reset ang mga Salaan' : 'Reset filters'}
              </button>
            </div>
          ) : (
            <ul className="podcasts-list">
              {filteredPodcasts.map((podcast) => (
                <li key={podcast.id} className="podcast-row">
                  <div className="podcast-cover" aria-hidden="true">
                    {monogram(podcast.title)}
                  </div>

                  <div className="podcast-row__main">
                    <h3 className="podcast-row__title">{podcast.title}</h3>
                    <p className="podcast-row__meta">
                      <strong>{podcast.host}</strong>
                      <span aria-hidden="true"> · </span>
                      {podcast.category}
                      <span aria-hidden="true"> · </span>
                      {podcast.language}
                      {podcast.rating && (
                        <>
                          <span aria-hidden="true"> · </span>
                          <span className="podcast-row__rating">{podcast.rating}</span>
                        </>
                      )}
                    </p>
                    <p className="podcast-row__desc">{podcast.description}</p>
                    <p className="podcast-row__episode">
                      <span>{isFilipino ? 'Inirerekomenda:' : 'Try:'}</span>{' '}
                      <em>“{podcast.episodeHighlight}”</em>
                    </p>
                    <p className="podcast-row__tags">
                      {podcast.tags.map((tag) => (
                        <span key={tag}>#{tag}</span>
                      ))}
                    </p>
                  </div>

                  <div className="podcast-row__actions">
                    <button
                      type="button"
                      className="podcast-play"
                      aria-expanded={activeEmbedId === podcast.id}
                      aria-label={
                        activeEmbedId === podcast.id
                          ? (isFilipino ? 'Isara ang Player' : 'Hide player')
                          : (isFilipino ? 'Buksan ang Player' : 'Preview player')
                      }
                      onClick={() => toggleEmbed(podcast.id)}
                    >
                      {activeEmbedId === podcast.id ? '✕' : '▶'}
                    </button>
                    <a
                      href={podcast.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="podcast-spotify-link"
                    >
                      <SpotifyIcon />
                      <span>Spotify</span>
                      <span aria-hidden="true">↗</span>
                    </a>
                  </div>

                  {activeEmbedId === podcast.id && (
                    <div className="podcast-row__embed">
                      <iframe
                        title={`${podcast.title} Player`}
                        src={`https://open.spotify.com/embed/show/${podcast.spotifyId}?utm_source=generator&theme=0`}
                        width="100%"
                        height="152"
                        frameBorder="0"
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        loading="lazy"
                      />
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Midnight listening etiquette */}
        <section className="podcasts-etiquette">
          <h3>
            <span aria-hidden="true">🕯️</span>{' '}
            {isFilipino
              ? 'Gabay sa Pakikinig sa Hatinggabi'
              : 'Etiquette for Midnight Listening'}
          </h3>
          <p className="podcasts-etiquette__lead">
            {isFilipino
              ? 'Sa paniniwalang Pilipino, ang pagbanggit sa mga espiritu sa hatinggabi ay gumigising sa kanilang pag-usisa. Kung nakikinig ka pagkatapos ng alas-dose:'
              : 'In Filipino folk tradition, speaking of spirits in the deep of the night summons their curiosity. If you listen past midnight:'}
          </p>
          <ul className="podcasts-etiquette__grid">
            <li>
              <strong>{isFilipino ? 'Huwag sumipol sa dilim' : 'Never whistle in the dark'}</strong>
              <span>
                {isFilipino
                  ? 'Ang pagsipol sa gabi ay gumagaya sa tawag ng Tawong Lupa at nag-aanyaya ng ligaw na engkanto sa iyong silid.'
                  : 'Whistling after twilight mimics the call of the Tawong Lupa and invites wandering elementals into your room.'}
              </span>
            </li>
            <li>
              <strong>{isFilipino ? 'Igalang ang hindi nakikita' : 'Respect the unseen'}</strong>
              <span>
                {isFilipino
                  ? 'Ang alamat ay buhay na alaala ng ating lahi, hindi simpleng panakot. Pakinggan ito nang may paggalang.'
                  : 'Folklore is living ancestral memory, not mere horror fiction. Listen with cultural humility.'}
              </span>
            </li>
            <li>
              <strong>{isFilipino ? 'Magtabi ng asin o bawang' : 'Keep salt or garlic nearby'}</strong>
              <span>
                {isFilipino
                  ? 'Ayon sa albularyo, isang supot ng magaspang na asin o bawang sa tabi ng unan ay nagbibigay ng payapang tulog.'
                  : 'An albularyo’s remedy: a pouch of rock salt or garlic by your bedside ensures restful sleep.'}
              </span>
            </li>
          </ul>
        </section>

        <section className="podcasts-nav-cta">
          <Link to="/creatures" className="btn">
            {isFilipino ? 'Buksan ang Talaarawan ng mga Nilalang' : 'Explore the Bestiary of Creatures'}{' '}
            <span className="btn__arrow" aria-hidden="true">→</span>
          </Link>
          <Link to="/map" className="btn btn--ghost">
            {isFilipino ? 'Tingnan ang Mapa ng Alamat' : 'View the Map of Myths'}
          </Link>
          <Link to="/about" className="btn btn--ghost">
            {isFilipino ? 'Tungkol sa Amin at Mga Batis' : 'About the Project & Bibliography'}
          </Link>
        </section>
      </main>
    </div>
  )
}