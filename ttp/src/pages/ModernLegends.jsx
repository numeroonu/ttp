import { useState } from 'react'
import { Link } from 'react-router-dom'
import Fog from '../components/Fog'
import Candle from '../components/Candle'
import { useLanguage } from '../context/useLanguage'
import './ModernLegends.css'

/* ---------- Custom line icons for the case meta rows ---------- */
const META_ICONS = {
  // map pin
  pin: (
    <>
      <path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z" />
      <circle cx="12" cy="9.5" r="2.4" />
    </>
  ),
  // hourglass
  time: (
    <>
      <path d="M7 3h10M7 21h10" />
      <path d="M8 3c0 5 4 5 4 9s-4 4-4 9M16 3c0 5-4 5-4 9s4 4 4 9" />
    </>
  ),
  // tag
  tag: (
    <>
      <path d="M20.6 13.4l-7.2 7.2a2 2 0 0 1-2.8 0L3 13V4a1 1 0 0 1 1-1h9l7.6 7.6a2 2 0 0 1 0 2.8z" />
      <circle cx="8" cy="8" r="1.3" />
    </>
  ),
}

function MetaIcon({ name }) {
  return (
    <span className="mod-meta-icon" aria-hidden="true">
      <svg
        viewBox="0 0 24 24"
        width="15"
        height="15"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {META_ICONS[name]}
      </svg>
    </span>
  )
}

const ERAS = [
  { id: 'all', fil: 'Lahat ng Kaso', en: 'All Casefiles' },
  { id: 'colonial', fil: 'Panahon ng Kastila at Digmaan', en: 'Spanish Era & Wartime' },
  { id: 'midcentury', fil: 'Ika-20 Siglo (1950s–1990s)', en: '20th Century (1950s–1990s)' },
  { id: 'modern', fil: 'Makabagong Sining at Trese', en: 'Contemporary Art & Trese' },
]

const CASEFILES = [
  {
    id: 'balete-drive',
    era: 'midcentury',
    caseNum: 'CASE-01',
    title: 'The White Lady of Balete Drive',
    titleFil: 'Ang White Lady ng Balete Drive',
    baybayin: 'ᜏᜌ᜔ᜆ᜔ ᜎᜒᜌ᜔ᜇᜒ ᜈ᜔ᜄ ᜊᜎᜒᜆᜒ ᜇ᜔ᜇᜌ᜔ᜊ᜔',
    locale: 'New Manila, Quezon City',
    timeline: 'Circa 1950s – Kasalukuyan',
    classification: 'Urban Phantom · Animist Tree Lore',
    classificationFil: 'Multo sa Lungsod · Paniniwala sa Balete',
    synopsis:
      'Balete Drive was historically canopied by enormous strangler fig (balete) trees and bounded by high Spanish-style residential walls. Since the mid-20th century, late-night taxi drivers have reported encountering a solitary woman draped in a flowing white gown.',
    synopsisFil:
      'Ang Balete Drive ay napalilibutan noon ng matatayog na puno ng balete at matataas na bakod. Mula noong dekada 1950, maraming tsuper ng taxi ang nag-uulat ng babaeng nakaputing bestida na pumapara sa hatinggabi.',
    chronicle:
      'Motorists recount flagging her down at midnight, only to look into their rearview mirror and find a bloodied, featureless face or an empty backseat before reaching the intersection of E. Rodriguez Avenue. In pre-colonial animism, Balete trees were revered as spirit portals; modern asphalt and streetlights simply overlaid human traffic atop an ancient, disturbed sanctuary.',
    chronicleFil:
      'Isinasalaysay ng mga drayber na pagsakay niya, pagtingin sa rearview mirror ay may duguan siyang mukha o biglang nawawala bago makarating sa E. Rodriguez Avenue. Sa sinaunang animismo, ang puno ng balete ay lagusan ng mga espiritu; ang modernong kalsada ay itinayo sa ibabaw ng banal na pook ng kalikasan.',
    adaptation:
      'Reimagined as the foundational case in Budjette Tan and Kajo Baldisimo’s graphic novel "Trese: Murder on Balete Drive" (Volume 1), where occult detective Alexandra Trese mediates between Manila’s supernatural syndicates and human crimes.',
    adaptationFil:
      'Naging tampok na kaso sa "Trese: Murder on Balete Drive" nina Budjette Tan at Kajo Baldisimo, kung saan ang detektib na si Alexandra Trese ay namamagitan sa mga engkanto at tao sa Maynila.',
    sources: [
      {
        name: 'Inquirer.net: The True Story Behind Balete Drive',
        url: 'https://www.aswangproject.com/creatures-philippine-lower-mythology/',
        note: 'Historical overview of New Manila development and folklore origin.',
      },
    ],
  },
  {
    id: 'headless-priest',
    era: 'colonial',
    caseNum: 'CASE-02',
    title: 'Ang Pugot na Pari (The Headless Priest)',
    titleFil: 'Ang Pugot na Pari',
    baybayin: 'ᜉᜓᜄᜓᜆ᜔ ᜈ ᜉᜇᜒ',
    locale: 'Intramuros, UST & San Beda University',
    timeline: '1896 Rebolusyon – WWII',
    classification: 'Colonial Apparition · Unconsecrated Soul',
    classificationFil: 'Aparisyon ng Panahon ng Digmaan',
    synopsis:
      'One of the oldest urban ghost legends in Metro Manila: a Catholic friar draped in a brown Franciscan or white Dominican habit, roaming nocturnal campus cloisters and church belfries carrying his own severed head in his hands.',
    synopsisFil:
      'Isa sa pinakamatandang kwento sa Maynila: isang prayleng nakasuot ng abito na naglalakad sa mga pasilyo ng lumang unibersidad at simbahan hawak ang kanyang sariling pugot na ulo.',
    chronicle:
      'Historical archives substantiate that numerous Spanish priests and missionaries were decapitated during the 1896 Philippine Revolution by Katipuneros, and later during the brutal Japanese Occupation of Manila in World War II. According to paranormal lore, their restless spirits wander cloistered hallways unable to find peace because their heads were never properly consecrated and buried alongside their bodies.',
    chronicleFil:
      'Pinatutunayan ng kasaysayan na maraming prayle ang napugutan noong Rebolusyong 1896 at noong Ikalawang Digmaang Pandaigdig. Ayon sa kwento, hindi mapakali ang kanilang kaluluwa dahil hindi naiburol ang ulo kasama ng katawan.',
    adaptation:
      'A permanent staple of campus folklore across university campuses, celebrated in television specials like "Magandang Gabi, Bayan" and contemporary Filipino gothic anthologies.',
    adaptationFil:
      'Pangunahing kwento sa mga unibersidad sa Maynila, madalas itampok sa "Magandang Gabi, Bayan" at mga antolohiya ng katatakutan.',
    sources: [
      {
        name: 'National Historical Commission: The Clergy Casualties of 1896',
        url: 'https://www.aswangproject.com/encyclopedia-of-philippine-folk-beliefs/',
        note: 'Historical documentation of clergy casualties during the Philippine Revolution.',
      },
    ],
  },
  {
    id: 'diplomat-hotel',
    era: 'colonial',
    caseNum: 'CASE-03',
    title: 'The Haunting of Diplomat Hotel & Baguio City',
    titleFil: 'Ang Diplomat Hotel ng Baguio',
    baybayin: 'ᜇᜒᜉ᜔ᜎᜓᜋᜆ᜔ ᜑᜓᜆᜒᜎ᜔ ᜊᜄᜒᜌᜓ',
    locale: 'Dominican Hill, Baguio City, Benguet',
    timeline: '1911 – Kasalukuyan',
    classification: 'Historical Landmark Apparition',
    classificationFil: 'Mahiwagang Makasaysayang Pook',
    synopsis:
      'Constructed in 1911 as a hilltop Dominican retreat house, this massive stone structure became the scene of brutal wartime executions during the Japanese occupation in World War II.',
    synopsisFil:
      'Itinayo noong 1911 bilang bahay-pahingahan ng mga Dominikano, ang gusaling ito ay naging saksi sa marahas na labanan at pagbitay noong Ikalawang Digmaang Pandaigdig.',
    chronicle:
      'Later converted in the 1970s into a hotel managed by faith healer Tony Agpaoa, the building became infamous for nocturnal cries, headless apparitions walking the central courtyard, and heavy footsteps on the roof. Today, preserved as a heritage park, the structure attracts thousands of cultural tourists and paranormal investigators fascinated by Baguio’s misty wartime past.',
    chronicleFil:
      'Naging hotel noong dekada 1970 sa ilalim ng faith healer na si Tony Agpaoa. Kilala ito sa mga yabag sa bubong, iyak sa gabi, at anino sa looban. Ngayon ay isa itong heritage park na binibisita ng mga turista.',
    adaptation:
      'Featured prominently in Philippine horror cinema, regional television documentaries, and national historical ghost tours.',
    adaptationFil:
      'Naitampok sa mga pelikulang Pilipino, dokumentaryo sa telebisyon, at mga historical ghost tour sa Baguio.',
    sources: [
      {
        name: 'Baguio Heritage Foundation: History of Dominican Hill',
        url: 'https://www.aswangproject.com/creatures-philippine-lower-mythology/',
        note: 'Historical records of the 1911 Dominican construction and wartime defense.',
      },
    ],
  },
  {
    id: 'trese-renaissance',
    era: 'modern',
    caseNum: 'CASE-04',
    title: 'The Contemporary Renaissance: Trese & Beyond',
    titleFil: 'Makabagong Sining: Si Trese at ang Bagong Alamat',
    baybayin: 'ᜆ᜔ᜇᜒᜐᜒ ᜀᜆ᜔ ᜋᜓᜇᜒᜇ᜔ᜈᜓᜅ᜔ ᜐᜒᜈᜒ',
    locale: 'Metro Manila & Global Screen',
    timeline: '2005 – Kasalukuyan',
    classification: 'Cultural Resurgence · Urban Graphic Noir',
    classificationFil: 'Makabagong Sining at Komiks',
    synopsis:
      'In 2005, writer Budjette Tan and artist Kajo Baldisimo created "Trese"—a breakthrough graphic novel following detective Alexandra Trese as she solves occult crimes across the neon-lit streets of modern Manila.',
    synopsisFil:
      'Noong 2005, nilikha nina Budjette Tan at Kajo Baldisimo ang "Trese"—isang nobelang grapiko tungkol sa detektib na si Alexandra Trese na lumulutas sa mga kababalaghan sa Maynila.',
    chronicle:
      'Rather than treating creatures as shameful superstitions, the modern cultural renaissance brought mythological beings—Aswang crime syndicates, Tikbalang illegal drag racers, Nuno sa Punso living under street manholes, and Santelmo cellular spirits—into gripping urban fantasy. Adapted by Netflix into a worldwide anime series in 2021, it sparked a global awakening to the literary depth of Philippine folklore.',
    chronicleFil:
      'Sa halip na ikahiya ang mga alamat, ipinakita ng makabagong sining ang mga nilalang sa modernong konteksto: mga aswang sa sindikato, mga tikbalang sa karera ng kotse, at nuno sa ilalim ng manhole. Ang adaptasyon sa Netflix noong 2021 ay nagbigay-daan upang makilala sa buong mundo ang ganda ng mitolohiyang Pilipino.',
    adaptation:
      'Catalyzed a national resurgence of Philippine mythological fantasy novels, comic conventions, and indie video games (like "Nightfall" and "Gumamela").',
    adaptationFil:
      'Nagbigay-sigla sa pagdami ng mga aklat, komiks, at video game na batay sa mitolohiyang Pilipino sa loob at labas ng bansa.',
    sources: [
      {
        name: 'Budjette Tan & Kajo Baldisimo – Trese (Ablaze Publishing)',
        url: 'https://www.aswangproject.com/trese-philippine-mythology/',
        note: 'The seminal graphic novel series bridging traditional folklore with modern detective noir.',
      },
    ],
  },
]

export default function ModernLegends() {
  const [activeEra, setActiveEra] = useState('all')
  const { isFilipino, t } = useLanguage()

  const filteredCases =
    activeEra === 'all'
      ? CASEFILES
      : CASEFILES.filter((c) => c.era === activeEra)

  return (
    <div className="mod-page">
      <Fog density={0.3} />

      {/* Hero */}
      <header className="mod-hero">
        <div className="container mod-hero__inner">
          <p className="kicker">{t('modernLegends.kicker')}</p>
          <p className="baybayin mod-hero__baybayin" aria-hidden="true">ᜋᜅ ᜋᜃᜊᜄᜓᜅ᜔ ᜀᜎᜋᜆ᜔</p>
          <h1 className="mod-hero__title">
            {t('modernLegends.title')} <em>{t('modernLegends.titleEm')}</em>
          </h1>
          <p className="mod-hero__subtitle">
            {t('modernLegends.subtitle')}
          </p>
          <p className="mod-hero__lead">
            {t('modernLegends.desc')}
          </p>

          {/* Clean Segmented Filter */}
          <nav className="mod-selector" aria-label="Filter casefiles by era">
            {ERAS.map((era) => (
              <button
                key={era.id}
                type="button"
                className={`mod-selector__btn ${activeEra === era.id ? 'is-active' : ''}`}
                onClick={() => setActiveEra(era.id)}
              >
                {isFilipino ? era.fil : era.en}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Casefiles Cards Grid */}
      <main className="container mod-cases-section">
        <div className="mod-cases-grid">
          {filteredCases.map((c) => (
            <article key={`${activeEra}-${c.id}`} className="mod-case-card mod-case-card--stamp">
              <div className="mod-case-card__header">
                <span className="mod-case-num">{c.caseNum}</span>
                <span className="baybayin mod-case-baybayin" aria-hidden="true">{c.baybayin}</span>
              </div>

              <h2 className="mod-case-title">{isFilipino ? c.titleFil : c.title}</h2>

              <div className="mod-case-meta">
                <span className="mod-meta-item">
                  <strong><MetaIcon name="pin" />{t('modernLegends.localeLabel')}</strong> {c.locale}
                </span>
                <span className="mod-meta-item">
                  <strong><MetaIcon name="time" />{t('modernLegends.timelineLabel')}</strong> {c.timeline}
                </span>
                <span className="mod-meta-item mod-meta-item--class">
                  <strong><MetaIcon name="tag" />{t('modernLegends.classificationLabel')}</strong> {isFilipino ? c.classificationFil : c.classification}
                </span>
              </div>

              <div className="mod-case-block">
                <h3 className="mod-block-head">{t('modernLegends.synopsisHeading')}</h3>
                <p className="mod-block-text">{isFilipino ? c.synopsisFil : c.synopsis}</p>
              </div>

              <div className="mod-case-block">
                <h3 className="mod-block-head">{t('modernLegends.chronicleHeading')}</h3>
                <p className="mod-block-text">{isFilipino ? c.chronicleFil : c.chronicle}</p>
              </div>

              <div className="mod-case-block mod-case-block--adapt">
                <h3 className="mod-block-head mod-block-head--adapt">
                  {t('modernLegends.adaptationHeading')}
                </h3>
                <p className="mod-block-text">{isFilipino ? c.adaptationFil : c.adaptation}</p>
              </div>

              {/* Verified Sources */}
              {c.sources && c.sources.length > 0 && (
                <div className="mod-case-sources">
                  <span className="mod-sources-label">{t('modernLegends.sourcesHeading')}:</span>
                  {c.sources.map((src, i) => (
                    <div key={i} className="mod-source-item">
                      <p className="mod-source-note">{src.note}</p>
                      <a
                        href={src.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mod-source-link"
                      >
                        {src.name} ↗
                      </a>
                    </div>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>

        {/* Footer Link Callout */}
        <footer className="mod-footer-cta">
          <Candle size={0.7} />
          <div className="mod-footer-cta__text">
            <h3>{isFilipino ? 'Gusto Mo Bang Tuklasin ang Lahat ng Nilalang?' : 'Ready to Explore the Creatures?'}</h3>
            <p>
              {isFilipino
                ? 'Mula sa mga Sinaunang Anito hanggang sa mga Multo ng Lungsod, galugarin ang buong talaarawan ng albularyo.'
                : 'From ancient animist entities to metropolitan apparitions, discover all documented creatures in the bestiary.'}
            </p>
            <div className="mod-footer-cta__actions">
              <Link to="/creatures" className="btn">
                {isFilipino ? 'Buksan ang Bestiyaryo' : 'Open the Bestiary'} <span className="btn__arrow">→</span>
              </Link>
              <Link to="/podcasts" className="btn btn--ghost">
                {isFilipino ? 'Makinig sa mga Podcast' : 'Listen to Podcasts & Stories'}
              </Link>
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
}