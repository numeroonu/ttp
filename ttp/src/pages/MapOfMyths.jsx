import { useState } from 'react'
import { Link } from 'react-router-dom'
import Fog from '../components/Fog'
import Candle from '../components/Candle'
import { useLanguage } from '../context/useLanguage'
import './MapOfMyths.css'

const REGIONS_DATA = [
  {
    id: 'luzon',
    name: 'Luzon',
    nameFil: 'Luzon',
    baybayin: 'ᜎᜓᜐᜓᜈ᜔',
    tagline: 'Realm of Mountain Giants, Cloud Forests & Earth Elders',
    taglineFil: 'Lupain ng mga Higante sa Bundok, Maulap na Kagubatan at Nuno sa Punso',
    terrain: 'Sierra Madre Ridge · Balete Groves · Volcanic Valleys',
    terrainFil: 'Kabundukan ng Sierra Madre · Puno ng Balete · Lambak ng Bulkan',
    climate: 'Rugged highlands, pine forests, and misty tropical mountain passes',
    climateFil: 'Matatarik na kabundukan, kagubatan ng pino, at maulap na daan',
    overview:
      'Luzon’s immense cordilleras, volcanic peaks (Mt. Makiling and Mt. Mayon), and dense tropical rainforests gave rise to territorial spirits tied to trees and terrain. The Tagalogs, Ilocanos, and Bicolanos shared oral accounts of towering equine tricksters, arboreal giants smoking endless cigars, and chthonic mound elders who enforce environmental etiquette with severe curses.',
    overviewFil:
      'Ang matatayog na kabundukan ng Luzon tulad ng Sierra Madre, Bundok Makiling, at Mayon ay naging kanlungan ng mga espiritung tagapagbantay ng kalikasan. Ang mga Tagalog, Ilocano, at Bicolano ay may mayamang salaysay ukol sa mga Tikbalang na nagliligaw ng manlalakbay, Kapre na humihithit ng tabako sa balete, at Nuno sa Punso na nagpaparusa sa lapastangan.',
    svgPath: 'M140,40 L190,45 L210,95 L230,135 L200,180 L180,210 L160,225 L120,200 L110,140 L130,80 Z',
    color: '#e0a33b',
    pins: [
      { id: 'diwata', name: 'Diwata', type: 'Nature Deity', typeFil: 'Diyosa ng Kalikasan', x: 52, y: 36, territory: 'Mt. Makiling & Arayat' },
      { id: 'tikbalang', name: 'Tikbalang', type: 'Forest Guardian', typeFil: 'Bantay-Gubat', x: 48, y: 32, territory: 'Sierra Madre & Rizal' },
      { id: 'kapre', name: 'Kapre', type: 'Tree Giant', typeFil: 'Higante sa Puno', x: 55, y: 44, territory: 'Balete Groves, Laguna' },
      { id: 'mangkukulam', name: 'Mangkukulam', type: 'Sympathetic Witch', typeFil: 'Manggagaway', x: 36, y: 44, territory: 'Pangasinan & Central Luzon' },
      { id: 'nuno-sa-punso', name: 'Nuno sa Punso', type: 'Mound Ancestor', typeFil: 'Espiritu ng Punso', x: 38, y: 38, territory: 'Central Luzon' },
      { id: 'tiyanak', name: 'Tiyanak', type: 'Deceptive Imp', typeFil: 'Mapanlinlang na Sanggol', x: 42, y: 48, territory: 'Batangas Wilds' },
      { id: 'santelmo', name: 'Santelmo', type: 'Soul Flame', typeFil: 'Apoy ng Kaluluwa', x: 62, y: 56, territory: 'Mindoro & Bicol Coast' },
      { id: 'duwende', name: 'Duwende', type: 'House & Earth Sprite', typeFil: 'Espiritu ng Lupa', x: 46, y: 40, territory: 'Tagalog Rafters' },
    ],
    hotspots: [
      {
        title: 'Sierra Madre Mountain Range',
        titleFil: 'Kabundukan ng Sierra Madre',
        province: 'Rizal · Laguna · Quezon',
        lore: 'The longest unbroken mountain spine in the Philippines. Revered as the sanctuary of the Tikbalang, where dense fog and shifting trails confuse careless travelers.',
        loreFil: 'Ang pinakamahabang kabundukan sa bansa. Itinuturing na sagradong kanlungan ng Tikbalang kung saan ang makapal na hamog ay nagliligaw sa mga nagdaraan.',
      },
      {
        title: 'Mount Makiling',
        titleFil: 'Bundok Makiling',
        province: 'Laguna',
        lore: 'The mythical volcanic dwelling of Maria Makiling and forest guardians. Known for sunshowers marking the mythical Tikbalang weddings ("Kasal ng Tikbalang").',
        loreFil: 'Mahiwagang bundok na tahanan ni Maria Makiling at mga engkantada. Kilala sa ulan sa gitna ng matinding sikat ng araw na tanda ng kasal ng Tikbalang.',
      },
      {
        title: 'Bicol Peninsula',
        titleFil: 'Tangway ng Bikol',
        province: 'Albay · Camarines Sur',
        lore: 'Famous for early Spanish accounts of nocturnal viscera suckers and floating Santelmo fireballs dancing over marshes near Mt. Mayon.',
        loreFil: 'Bantog sa mga sinaunang ulat ng mga bampirang lumilipad at lumulutang na bolang apoy na Santelmo sa mga latian malapit sa Bulkang Mayon.',
      },
    ],
    sources: [
      {
        title: 'Dr. Maximo Ramos – Creatures of Philippine Lower Mythology',
        url: 'https://www.aswangproject.com/creatures-philippine-lower-mythology/',
        note: 'The foundational scientific taxonomy of Luzon’s terrestrial demons, giants, and dwarfs.',
        noteFil: 'Siyentipikong klasipikasyon ng mga nilalang ng Luzon kabilang ang Kapre, Tikbalang, at Nuno.',
      },
      {
        title: 'Isabelo de los Reyes – El Folk-lore Filipino (1889)',
        url: 'https://www.aswangproject.com/isabelo-de-los-reyes-folk-lore-filipino/',
        note: 'Historic primary collection documenting Ilocano and Tagalog animist beliefs.',
        noteFil: 'Makasaysayang unang aklat sa mga katutubong paniniwala ng mga Tagalog at Ilocano.',
      },
    ],
  },
  {
    id: 'visayas',
    name: 'Visayas',
    nameFil: 'Kabisayaan',
    baybayin: 'ᜊᜒᜐᜌᜐ᜔',
    tagline: 'Archipelago of Shapeshifters, Sorcery & Cosmic Serpents',
    taglineFil: 'Kapuluan ng mga Nag-aanyong Halimaw, Pambabarang at Bakunawa',
    terrain: 'Inter-Island Seas · Limestone Caves · Mangrove Swamps',
    terrainFil: 'Karagatan ng mga Pulo · Yungib ng Apog · Bakawanan',
    climate: 'Coastal straits, labyrinthine islets, and dense nipa fringes',
    climateFil: 'Mabatong baybayin, mga sanga-sangang kipot, at masukal na nipa',
    overview:
      'The Visayan archipelago is the historical heartland of the Aswang complex and maritime serpent mythology. Its fragmented geography of sheltered straits and isolated coastal barangays fostered vivid traditions of self-segmenting horrors, shadow-eating cryptids, insect sorcery, and the colossal moon-devouring sea dragon Bakunawa.',
    overviewFil:
      'Ang Kabisayaan ang sentro ng mga kwento ng Aswang, Manananggal, at serpiyente ng dagat. Dahil sa pagkakahiwa-hiwalay ng mga pulo at liblib na baybayin, lumaganap ang mga tradisyon ukol sa mga lumilipad na kalahating-katawan, pambabarang gamit ang mga kulisap, at ang kosmiko dragon na Bakunawa.',
    svgPath: 'M180,240 L240,230 L270,270 L240,310 L200,310 L160,280 Z',
    color: '#8b1e1e',
    pins: [
      { id: 'aswang', name: 'Aswang', type: 'Viscera Sucker', typeFil: 'Bampirang Maninila', x: 44, y: 58, territory: 'Panay & Capiz' },
      { id: 'manananggal', name: 'Manananggal', type: 'Segmenting Terror', typeFil: 'Lumilipad na Hati-Katawan', x: 58, y: 62, territory: 'Central Visayas' },
      { id: 'wakwak', name: 'Wakwak', type: 'Avian Vampire', typeFil: 'Ibong Bampira', x: 72, y: 58, territory: 'Leyte & Samar' },
      { id: 'sigbin', name: 'Sigbin', type: 'Shadow Cryptid', typeFil: 'Mahiwagang Hayop', x: 56, y: 68, territory: 'Cebu & Bohol' },
      { id: 'mambabarang', name: 'Mambabarang', type: 'Insect Hexer', typeFil: 'Manggagaway ng Kulisap', x: 48, y: 72, territory: 'Siquijor Island' },
      { id: 'bakunawa', name: 'Bakunawa', type: 'Celestial Dragon', typeFil: 'Dragon ng Dagat at Buwan', x: 64, y: 52, territory: 'Visayan Sea' },
    ],
    hotspots: [
      {
        title: 'Panay Island & Capiz',
        titleFil: 'Pulo ng Panay at Capiz',
        province: 'Capiz · Iloilo · Antique',
        lore: 'Historically stigmatized by Spanish colonizers as the "epicenter" of the aswang—a deliberate political tactic used to demonize indigenous babaylan matriarchs.',
        loreFil: 'Makasaysayang binansagan ng mga Kastila bilang sentro ng aswang upang siraan ang mga katutubong babaylan at babaylang manggagamot.',
      },
      {
        title: 'Siquijor ("Isla del Fuego")',
        titleFil: 'Siquijor (Isla del Fuego)',
        province: 'Siquijor Island',
        lore: 'A world-famous island of folk healing (mananambal), medicinal potions, and the dreaded entomological sorcery of the mambabarang who brew potions on Good Friday.',
        loreFil: 'Pulo ng mga mananambal, halamang gamot, at pambabarang tuwing Biyernes Santo.',
      },
      {
        title: 'The Visayan Sea & Abyssal Trenches',
        titleFil: 'Dagat ng Kabisayaan at Kailaliman',
        province: 'Inter-island Waters',
        lore: 'Cosmological domain of the Bakunawa dragon. During eclipses, villagers rushed out with copper gongs and pots, shouting "Ibalik ang buwan!" to rescue the light.',
        loreFil: 'Dambuhalang kaharian ng Bakunawa. Tuwing eklipse, nagpapatunog ng mga kaldero at gong ang mga nayon upang ibalik ang liwanag ng buwan.',
      },
    ],
    sources: [
      {
        title: 'Jordan Clark – The Aswang Phenomenon & Visayan Archive',
        url: 'https://www.aswangproject.com/aswang-compendium/',
        note: 'In-depth historical analysis of the demonization of indigenous healers in Panay.',
        noteFil: 'Masusing pagsusuri sa paninira ng mga Kastila sa mga manggagamot sa Panay.',
      },
      {
        title: 'Richard W. Lieban – Cebuano Sorcery (University of California Press)',
        url: 'https://www.aswangproject.com/cebuano-sorcery-richard-lieban/',
        note: 'Pioneering anthropological fieldwork on barang magic and folk medicine.',
        noteFil: 'Pag-aaral sa pambabarang at katutubong mahika sa Cebu.',
      },
    ],
  },
  {
    id: 'mindanao',
    name: 'Mindanao',
    nameFil: 'Mindanao',
    baybayin: 'ᜋᜒᜈ᜔ᜇᜈᜏ᜔',
    tagline: 'Highlands of Sacred Epics, Corpse Ghouls & Ancient Anitos',
    taglineFil: 'Mataas na Lupain ng mga Epiko, Busaw at Sinaunang Anito',
    terrain: 'Mount Apo Highlands · Riverine Basins · Burial Caverns',
    terrainFil: 'Tuktok ng Bundok Apo · Ilog Agusan · Yungib ng Libingan',
    climate: 'Vast river valleys, ancient volcanic soil, and primordial highland rainforests',
    climateFil: 'Malalawak na lambak, matabang lupang bulkan, at sinaunang gubat',
    overview:
      'In the southern island of Mindanao, rich indigenous belief systems preserved by the Bagobo, Mandaya, and Manobo peoples flourished largely insulated from early Spanish missions. Their oral traditions center on fearsome flesh-eating ghouls (Busaw) and ancient spirit pantheons preserved in monumental epics like the Bagobo Tuwaang.',
    overviewFil:
      'Sa malawak na lupain ng Mindanao, ang mga katutubong pamayanan tulad ng mga Bagobo, Mandaya, at Manobo ay nagpanatili ng orihinal nilang kosmolohiya. Nananatili ang mga kwento ukol sa Busaw (kumakain ng bangkay sa libingan) at mga dakilang epiko tulad ng Tuwaang.',
    svgPath: 'M180,330 L270,320 L280,390 L240,420 L170,410 L150,360 Z',
    color: '#b3282d',
    pins: [
      { id: 'busaw', name: 'Busaw / Buso', type: 'Corpse Ghoul', typeFil: 'Halimaw sa Libingan', x: 58, y: 84, territory: 'Davao & Mt. Apo' },
      { id: 'wakwak', name: 'Wakwak', type: 'Avian Predator', typeFil: 'Panggabing Ibong Maninila', x: 68, y: 76, territory: 'Surigao & Agusan' },
    ],
    hotspots: [
      {
        title: 'Mount Apo Highlands',
        titleFil: 'Tuktok ng Bundok Apo',
        province: 'Davao del Sur · Cotabato',
        lore: 'The highest volcanic peak in the country, sacred to the Bagobo people. Graves here are watched with night-long vigils (pagpupuyat) to deter the red-eyed Busaw.',
        loreFil: 'Ang pinakamataas na bundok sa Pilipinas, sagrado sa mga Bagobo. Ang mga libingan dito ay binabantayan upang hindi lapastanganin ng Busaw.',
      },
      {
        title: 'Agusan River Basin & Marshes',
        titleFil: 'Ilog at Latian ng Agusan',
        province: 'Agusan del Sur',
        lore: 'A vast freshwater wetland steeped in Manobo oral histories of giant river serpent guardians and aquatic spirits of the ancient deep.',
        loreFil: 'Malawak na latian na sagana sa kwento ng mga Manobo ukol sa dambuhalang serpiyente ng ilog at tagabantay ng tubig.',
      },
      {
        title: 'Bukidnon Mountain Plateau',
        titleFil: 'Talampas ng Bukidnon',
        province: 'Bukidnon',
        lore: 'Misty highland plateaus where traditional warriors brandished iron blades (karit and bolo) to protect ancestral burial grounds from grave-desecrating ghouls.',
        loreFil: 'Maulap na talampas kung saan ang mga mandirigma ay nagdadala ng bakal na sandata upang bantayan ang lupang ninuno.',
      },
    ],
    sources: [
      {
        title: 'Laura Watson Benedict – Bagobo Ceremonial, Magic and Myth (1916)',
        url: 'https://www.aswangproject.com/bagobo-myths-laura-watson-benedict/',
        note: 'Seminal ethnographic study of Mount Apo indigenous funerary rituals and the Busaw.',
        noteFil: 'Pangunahing pag-aaral sa mga ritwal ng Bagobo sa Bundok Apo at paniniwala sa Busaw.',
      },
      {
        title: 'Dr. F. Landa Jocano – Philippine Mythology & Indigenous Pantheons',
        url: 'https://www.aswangproject.com/f-landa-jocano-philippine-mythology/',
        note: 'Scholarly overview of indigenous southern Philippine cosmological traditions.',
        noteFil: 'Akademikong pagsusuri sa mga sinaunang paniniwala sa katimugang Pilipinas.',
      },
    ],
  },
]

export default function MapOfMyths() {
  const [selectedRegionId, setSelectedRegionId] = useState('visayas')
  const [selectedPin, setSelectedPin] = useState(null)
  const { isFilipino, t } = useLanguage()

  const currentRegion = REGIONS_DATA.find((r) => r.id === selectedRegionId) || REGIONS_DATA[1]

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
          <p className="map-hero__subtitle">
            {t('map.subtitle')}
          </p>
          <p className="map-hero__lead">
            {t('map.desc')}
          </p>

          {/* Clean Segmented Region Selector */}
          <nav className="map-selector" aria-label={t('map.switchRegion')}>
            {REGIONS_DATA.map((region) => {
              const isActive = region.id === selectedRegionId
              return (
                <button
                  key={region.id}
                  type="button"
                  className={`map-selector__btn ${isActive ? 'is-active' : ''}`}
                  onClick={() => {
                    setSelectedRegionId(region.id)
                    setSelectedPin(null)
                  }}
                >
                  <span className="baybayin map-selector__baybayin">{region.baybayin}</span>
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

      {/* Main Map Explorer Layout */}
      <main className="container map-explorer">
        {/* Left Side: Visual Interactive Map Canvas */}
        <section className="map-canvas-card" aria-label="Interactive Folklore Map">
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
              {isFilipino ? 'I-click ang mga nilalang para sa buong detalye' : 'Click creature pins for field notes'}
            </span>
          </div>

          {/* SVG Map Stage */}
          <div className="map-stage">
            <svg
              viewBox="0 0 340 460"
              className="map-stage__svg"
              aria-label={`Interactive map of ${currentRegion.name}`}
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

              {/* Luzon */}
              <path
                d="M130,30 C150,20 185,25 195,50 C205,75 225,95 235,125 C245,150 215,175 190,195 C175,208 150,215 135,190 C120,165 110,120 120,70 Z"
                className={`map-land ${selectedRegionId === 'luzon' ? 'is-active-land' : 'is-dim-land'}`}
                onClick={() => {
                  setSelectedRegionId('luzon')
                  setSelectedPin(null)
                }}
              />
              {/* Visayas cluster */}
              <path
                d="M145,235 C175,225 210,230 230,245 C250,260 265,285 245,305 C220,315 190,305 165,295 C145,280 135,250 145,235 Z"
                className={`map-land ${selectedRegionId === 'visayas' ? 'is-active-land' : 'is-dim-land'}`}
                onClick={() => {
                  setSelectedRegionId('visayas')
                  setSelectedPin(null)
                }}
              />
              {/* Palawan */}
              <path
                d="M80,210 C90,230 75,270 60,310 C50,330 45,340 40,335 C42,310 65,250 80,210 Z"
                className="map-land is-dim-land"
              />
              {/* Mindanao */}
              <path
                d="M165,325 C205,315 255,310 275,340 C290,365 285,410 250,425 C215,435 175,420 155,395 C140,370 145,340 165,325 Z"
                className={`map-land ${selectedRegionId === 'mindanao' ? 'is-active-land' : 'is-dim-land'}`}
                onClick={() => {
                  setSelectedRegionId('mindanao')
                  setSelectedPin(null)
                }}
              />

              {/* Active Region Creature Pins */}
              {currentRegion.pins.map((pin) => {
                const isSelected = selectedPin?.id === pin.id
                const cx = (pin.x / 100) * 340
                const cy = (pin.y / 100) * 460
                return (
                  <g
                    key={pin.id}
                    className={`map-pin-group ${isSelected ? 'is-selected-pin' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation()
                      setSelectedPin(pin)
                    }}
                    role="button"
                    tabIndex={0}
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

          {/* Creature Territory Badges Under Map */}
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
                    onClick={() => setSelectedPin(pin)}
                  >
                    <span className="map-pin-chip__dot" />
                    <span className="map-pin-chip__name">{pin.name}</span>
                    <span className="map-pin-chip__type">{isFilipino ? pin.typeFil : pin.type}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </section>

        {/* Right Side: Editorial Regional Field Dossier */}
        <section className="map-dossier" aria-label="Regional Details and Historical Archives">
          {/* Active Pin Focus Card */}
          {selectedPin ? (
            <div className="map-focus-card">
              <div className="map-focus-card__top">
                <span className="map-focus-kicker">
                  {isFilipino ? 'Tampok na Teritoryo' : 'Territory Focus'}
                </span>
                <button
                  type="button"
                  className="map-focus-close"
                  onClick={() => setSelectedPin(null)}
                  aria-label={t('common.close')}
                >
                  ✕
                </button>
              </div>
              <h3 className="map-focus-title">{selectedPin.name}</h3>
              <p className="map-focus-type">{isFilipino ? selectedPin.typeFil : selectedPin.type}</p>
              <p className="map-focus-locale">
                <strong>{isFilipino ? 'Pangunahing Tirahan (Habitat):' : 'Primary Habitat & Territory:'}</strong> {selectedPin.territory}
              </p>
              <div className="map-focus-actions">
                <Link to={`/creatures#${selectedPin.id}`} className="btn btn--sm">
                  {isFilipino ? 'Buksan ang Buong Tala sa Talaarawan' : 'Open Field Notes in Bestiary'} <span className="btn__arrow">→</span>
                </Link>
              </div>
            </div>
          ) : (
            <div className="map-overview-card">
              <span className="map-overview-kicker">
                {isFilipino ? 'Pangkalahatang Pananaw' : 'Regional Overview'}
              </span>
              <h3 className="map-overview-title">
                {isFilipino ? 'Likas na Katangian at Kalupaan' : 'Topography & Natural Realm'}
              </h3>
              <p className="map-overview-text">
                {isFilipino ? currentRegion.overviewFil : currentRegion.overview}
              </p>
              <div className="map-overview-meta">
                <div>
                  <strong>{isFilipino ? 'Pangunahing Kalupaan:' : 'Terrain:'}</strong>{' '}
                  {isFilipino ? currentRegion.terrainFil : currentRegion.terrain}
                </div>
                <div>
                  <strong>{isFilipino ? 'Klima at Kagubatan:' : 'Climate:'}</strong>{' '}
                  {isFilipino ? currentRegion.climateFil : currentRegion.climate}
                </div>
              </div>
            </div>
          )}

          {/* Regional Hotspots */}
          <div className="map-hotspots-card">
            <h3 className="map-section-head">
              <span>✦</span> {isFilipino ? 'Makasaysayang Pook ng Katatakutan' : 'Historic Supernatural Hotspots'}
            </h3>
            <div className="map-hotspots-list">
              {currentRegion.hotspots.map((spot, i) => (
                <div key={i} className="map-hotspot-row">
                  <div className="map-hotspot-row__head">
                    <strong className="map-hotspot-row__title">
                      {isFilipino ? spot.titleFil : spot.title}
                    </strong>
                    <span className="map-hotspot-row__prov">{spot.province}</span>
                  </div>
                  <p className="map-hotspot-row__lore">
                    {isFilipino ? spot.loreFil : spot.lore}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Verified Scholarly Sources */}
          <div className="map-sources-card">
            <h3 className="map-section-head">
              <span>✦</span> {isFilipino ? 'Mga Na-verify na Batis at Pag-aaral' : 'Verified Academic Sources'}
            </h3>
            <p className="map-sources-note">
              {isFilipino
                ? 'Ang mga datos sa rehiyong ito ay napatunayan batay sa mga nailathalang akademikong batis:'
                : 'Folklore accounts in this region are cross-referenced with verified published references:'}
            </p>
            <div className="map-sources-list">
              {currentRegion.sources.map((src, i) => (
                <div key={i} className="map-source-row">
                  <div className="map-source-row__info">
                    <strong className="map-source-row__title">{src.title}</strong>
                    <p className="map-source-row__note">
                      {isFilipino && src.noteFil ? src.noteFil : src.note}
                    </p>
                  </div>
                  <a
                    href={src.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="map-source-row__link"
                  >
                    {isFilipino ? 'Suriin ang Batis (Visit Source) ↗' : 'Visit Verified Source ↗'}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Cultural Context Footer Banner */}
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
