import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Fog from '../components/Fog'
import Candle from '../components/Candle'
import { useLanguage } from '../context/useLanguage'
import './Origins.css'

const EPOCHS = [
  {
    num: '01',
    roman: 'I',
    title: 'Pre-Colonial Animism: Ang Pananampalataya sa Anito at Diwata',
    titleEn: 'Pre-Colonial Animism: Reverence for Anito & Diwata',
    baybayin: 'ᜀᜈᜒᜆᜓ ᜀᜆ᜔ ᜇᜒᜏᜆ',
    subtitle: 'Cosmology, Creation & Sacred Equilibrium (Pre-1521)',
    subtitleFil: 'Kosmolohiya, Paglikha at Banal na Balanse (Bago ang 1521)',
    lead:
      'Long before foreign ships crossed our seas, ancient Filipinos practiced animism—a holistic philosophy asserting that every tree, river, mountain, animal, and human ancestor possessed a sacred living essence (dungan).',
    leadFil:
      'Bago pa sumapit ang mga banyagang barko, ang ating mga ninuno ay namumuhay sa animismo—paniniwalang ang bawat puno, ilog, bundok, hayop, at kaluluwa ng ninuno ay nagtataglay ng dungan o banal na buhay.',
    paragraphs: [
      'The cosmic firmament was governed by supreme creator deities: Bathala (or Maykapal) among the Tagalogs, Kan-Laon among the Visayans, and Kabunian in the Cordilleras. Beneath them were celestial guardians: Mayari (goddess of the moon and beauty), Apolaki (god of the sun and war), Tala (the morning star), and Idianale (goddess of agriculture and labor).',
      'Humans did not view nature as wild territory to conquer, but as an inhabited sanctuary shared with the Anito (ancestor spirits) and Diwata (elemental custodians). To fell a giant balete tree or cross a mountain ridge required solemn prayers, offerings, and permission—the spiritual origin of uttering "tabi-tabi po."',
    ],
    paragraphsFil: [
      'Ang kalangitan ay pinamamahalaan ng kataas-taasang Lumikha: si Bathala (o Maykapal) sa mga Tagalog, si Kan-Laon sa mga Bisaya, at si Kabunian sa Cordillera. Katuwang nila ang mga bathalang tagapangalaga tulad nina Mayari (diyosa ng buwan at kagandahan), Apolaki (diyos ng araw at digmaan), Tala (bituin sa umaga), at Idianale (diyosa ng paggawa at pagsasaka).',
      'Hindi tiningnan ng mga ninuno ang kalikasan bilang teritoryong dapat sakupin, kundi bilang banal na tahanang pinagsasaluhan kasama ang mga Anito at Diwata. Ang pagputol ng balete o pagtawid sa bundok ay nangangailangan ng taimtim na panalangin at alay—ang tunay na pinagmulan ng pagbigkas ng "tabi-tabi po."',
    ],
    pantheon: [
      { name: 'Bathala / Maykapal', role: 'Supreme Creator of the Universe', roleFil: 'Kataas-taasang Lumikha ng Sansinukob', domain: 'Heavens & Cosmos', domainFil: 'Kalangitan at Daigdig' },
      { name: 'Mayari', role: 'Goddess of the Moon & Beauty', roleFil: 'Diyosa ng Buwan at Kagandahan', domain: 'Nocturnal Sky', domainFil: 'Gabi at Kalangitan' },
      { name: 'Apolaki', role: 'God of the Sun & Martial Valor', roleFil: 'Diyos ng Araw at Katapangan', domain: 'Daylight & War', domainFil: 'Araw at Digmaan' },
      { name: 'Idianale', role: 'Goddess of Labor & Good Deeds', roleFil: 'Diyosa ng Pagsasaka at Paggawa', domain: 'Earth & Harvest', domainFil: 'Lupa at Ani' },
    ],
    sources: [
      {
        name: 'Dr. F. Landa Jocano – Outline of Philippine Mythology',
        url: 'https://www.aswangproject.com/f-landa-jocano-philippine-mythology/',
        note: 'Comprehensive academic study on pre-colonial creation lore and pantheons.',
      },
      {
        name: 'Dr. Damiana L. Eugenio – Philippine Folk Literature: The Myths (UP Press)',
        url: 'https://press.up.edu.ph/store/books/view/825',
        note: 'National anthology documenting indigenous creation stories across 140 language groups.',
      },
    ],
  },
  {
    num: '02',
    roman: 'II',
    title: 'Ang Babaylan: Guardians of Medicine, Astronomy & Soul',
    titleEn: 'The Babaylan: Guardians of Medicine, Astronomy & Community',
    baybayin: 'ᜊᜊᜌ᜔ᜎᜈ᜔',
    subtitle: 'Matriarchal Authority & Indigenous Healing',
    subtitleFil: 'Awtoridad ng Kababaihan at Katutubong Panggagamot',
    lead:
      'In pre-colonial barangays, the most revered spiritual leadership belonged to the Babaylan (in the Visayas) or Katalonan (among the Tagalogs)—predominantly women or feminized shamans (asog / bayog) who served as healers, philosophers, and community seers.',
    leadFil:
      'Sa sinaunang barangay, ang pinakaginagalang na gabay sa espiritu ay ang mga Babaylan (sa Kabisayaan) o Katalonan (sa Katagalugan)—mga kababaihan o asog na nagsilbing manggagamot, pilosopo, at tagapamagitan sa mga anito.',
    paragraphs: [
      'While the Datu held political authority, the Babaylan commanded spiritual equilibrium. She negotiated directly with the anitos, tracked agricultural cycles using constellations, practiced advanced herbal pharmacology, and performed sacred chants to guide souls into the afterlife.',
      'The Babaylan embodied feminine autonomy, land stewardship, and intellectual leadership. When European colonizers arrived, they found this matriarchal structure intolerable to their patriarchal religious hierarchy.',
    ],
    paragraphsFil: [
      'Habang ang Datu ang may hawak sa kapangyarihang pampulitika, ang Babaylan ang may hawak sa kaluluwa ng pamayanan. Siya ang nakikipag-usap sa mga anito, sumusubaybay sa mga bituin para sa pagtatanim, dalubhasa sa halamang-gamot, at umaawit sa paglalakbay ng kaluluwa.',
      'Kinatawan ng Babaylan ang kalayaan ng kababaihan at pangangalaga sa kalikasan. Nang dumating ang mga dayuhang mananakop, itinuring nilang banta ang makapangyarihang pamumunong ito ng kababaihan.',
    ],
    pantheon: null,
    sources: [
      {
        name: 'The Aswang Project: The Demonization of the Babaylan',
        url: 'https://www.aswangproject.com/aswang-compendium/',
        note: 'Historical reconstruction of how indigenous female shamans were systematically branded as monsters.',
      },
      {
        name: 'Ateneo de Manila – Philippine Studies Journal',
        url: 'https://www.philippinestudies.net/ojs/index.php/ps',
        note: 'Historical and feminist analyses on pre-colonial shamans and indigenous resistance.',
      },
    ],
  },
  {
    num: '03',
    roman: 'III',
    title: 'The Spanish Conquest & The Demonization Campaign',
    titleEn: 'The Spanish Conquest & The Demonization Campaign',
    baybayin: 'ᜉᜈᜈᜃᜓᜉ᜔ ᜈ᜔ᜄ ᜃᜐ᜔ᜆᜒᜎ',
    subtitle: 'Weaponizing Folklore for Religious Conversion (1565–1898)',
    subtitleFil: 'Paggamit sa Alamat Para sa Pagsupil at Pagbibinyag (1565–1898)',
    lead:
      'To enforce conversion to Catholicism and crush indigenous resistance, Spanish friars launched systematic campaigns to demonize native spiritual practices, recasting sacred nature guardians into diabolical monsters.',
    leadFil:
      'Upang ipatupad ang binyag at pigilan ang pag-aalsa, sistematikong binansagan ng mga prayleng Kastila ang mga banal na anito at diwata bilang mga "demonyo" at "halimaw ng impiyerno."',
    paragraphs: [
      'The Babaylan were officially branded as bruhas (witches), sorceresses, and aswangs. Ancient forest custodians like the Tikbalang, Kapre, and Patianak were stripped of their guardian roles and labeled as literal demons of the Christian Devil.',
      'Colonial authorities deliberately stoked hysteria surrounding the Aswang to keep native villagers within earshot and sight of the church bells ("Bajo de las Campanas"). Fear of nocturnal monsters discouraged villagers from escaping to the mountains or gathering secretly at night for rebellion.',
    ],
    paragraphsFil: [
      'Ang mga Babaylan ay tinawag na bruha, mangkukulam, at aswang. Ang mga bantay-gubat tulad ng Tikbalang at Kapre ay inalisan ng kanilang banal na katangian at ginawang halimaw.',
      'Sadyang pinalaganap ang takot sa aswang upang manatili ang mga katutubo sa ilalim ng batingaw ng simbahan (Bajo de las Campanas). Ang takot sa gabi ang pumigil sa kanila na tumakas patungong kabundukan o magdaos ng lihim na pag-aalsa.',
    ],
    pantheon: null,
    sources: [
      {
        name: 'The Aswang Phenomenon – Historical & Theological Analysis',
        url: 'https://www.aswangproject.com/the-aswang-complex-in-philippine-folklore/',
        note: 'Jordan Clark’s research into Spanish friar chronicles and the social weaponization of monsters.',
      },
      {
        name: 'Isabelo de los Reyes – El Folk-lore Filipino (1889)',
        url: 'https://www.aswangproject.com/isabelo-de-los-reyes-folk-lore-filipino/',
        note: 'Primary historical document of pre-colonial beliefs surviving under Spanish rule.',
      },
    ],
  },
  {
    num: '04',
    roman: 'IV',
    title: 'Dr. Maximo Ramos & The Lower Mythology Taxonomy',
    titleEn: 'Dr. Maximo Ramos & The Lower Mythology Taxonomy',
    baybayin: 'ᜋᜃ᜔ᜐᜒᜋᜓ ᜇᜋᜓᜐ᜔',
    subtitle: 'The Scientific Classification of Philippine Monsters (1971)',
    subtitleFil: 'Ang Siyentipikong Klasipikasyon ng mga Nilalang (1971)',
    lead:
      'In 1971, folklorist Dr. Maximo D. Ramos published "The Creatures of Philippine Lower Mythology"—a landmark doctoral thesis establishing the first rigorous academic taxonomy of Philippine folklore.',
    leadFil:
      'Noong 1971, inilathala ng dalubhasang si Dr. Maximo D. Ramos ang "The Creatures of Philippine Lower Mythology"—ang kauna-unahang komprehensibong siyentipikong taxonomy ng mitolohiyang Pilipino.',
    paragraphs: [
      'Ramos introduced a crucial distinction between "Upper Mythology" (creator deities like Bathala) and "Lower Mythology" (terrestrial spirits, ghouls, and shape-shifters dwelling in close proximity to everyday human villages).',
      'His taxonomy categorized Philippine supernatural entities into fundamental classes, providing a permanent scientific foundation that prevented oral lore from being lost to time.',
    ],
    paragraphsFil: [
      'Ipinaliwanag ni Ramos ang pagkakaiba ng "Mataas na Mitolohiya" (mga bathala tulad ni Bathala) at "Mababang Mitolohiya" (mga espiritung naninirahan malapit sa araw-araw na pamumuhay ng tao tulad ng duwende, tiyanak, at kapre).',
      'Ang kanyang pag-uuri ay nagbigay ng permanenteng batayang pang-akademiko upang hindi maglaho ang ating pamanang salaysay.',
    ],
    taxonomy: [
      { category: 'Deities & Nature Spirits', categoryFil: 'Mga Diwata at Espiritu', examples: 'Diwata (Maria Makiling)', desc: 'Luminous mountain guardians and ancestral protectors.', descFil: 'Banal na tagapangalaga ng kabundukan at kagubatan.' },
      { category: 'Demons & Tricksters', categoryFil: 'Mga Demonyo at Bantay-Gubat', examples: 'Tikbalang · Kapre', desc: 'Equine disorienters and arboreal giants guarding trails.', descFil: 'Nagliligaw ng manlalakbay at higante sa puno ng balete.' },
      { category: 'Witches & Sorcerers', categoryFil: 'Mga Mangkukulam at Mambabarang', examples: 'Mangkukulam · Mambabarang', desc: 'Human practitioners of sympathetic hexes and insect curses.', descFil: 'Gumagamit ng manika o kulisap para sa pangkukulam.' },
      { category: 'Dragons', categoryFil: 'Mga Dragon at Serpiyente', examples: 'Bakunawa', desc: 'Colossal cosmic serpents residing in deep ocean abysses.', descFil: 'Dambuhalang lumulunok sa buwan mula sa karagatan.' },
      { category: 'Dwarfs & Elves', categoryFil: 'Mga Nuno at Duwende', examples: 'Nuno sa Punso · Duwende', desc: 'Chthonic earth spirits and subterranean house occupants.', descFil: 'Maliit na espiritu ng punso at tahanan.' },
      { category: 'Ghouls & Were-Beasts', categoryFil: 'Mga Halimaw at Aswang', examples: 'Aswang · Busaw', desc: 'Nocturnal were-animals and cemetery corpse-eaters.', descFil: 'Kumakain ng bangkay at nag-aanyong hayop sa gabi.' },
      { category: 'Viscera Suckers', categoryFil: 'Sumisipsip ng Lamang-Loob', examples: 'Manananggal · Wakwak', desc: 'Winged self-segmenting entities hunting with elongated tongues.', descFil: 'Lumilipad na hati ang katawan at humihigop ng sanggol.' },
    ],
    sources: [
      {
        name: 'The Aswang Project: Maximo Ramos Archive',
        url: 'https://www.aswangproject.com/creatures-philippine-lower-mythology/',
        note: 'Digital repository and overview of Dr. Maximo Ramos’ lifetime folklore contributions.',
      },
    ],
  },
]

export default function Origins() {
  const { isFilipino, t } = useLanguage()
  const timelineRef = useRef(null)

  useEffect(() => {
    const timeline = timelineRef.current
    if (!timeline) return undefined

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const updateLine = () => {
      if (reduceMotion) {
        timeline.style.setProperty('--orig-line-progress', '100%')
        return
      }
      const bounds = timeline.getBoundingClientRect()
      const progress = Math.min(
        1,
        Math.max(0, (window.innerHeight - bounds.top) / (bounds.height + window.innerHeight)),
      )
      timeline.style.setProperty('--orig-line-progress', `${progress * 100}%`)
    }

    const entries = timeline.querySelectorAll('.orig-epoch')
    if (reduceMotion) {
      entries.forEach((entry) => entry.classList.add('is-visible'))
      updateLine()
      return undefined
    }

    const observer = new IntersectionObserver(
      (observedEntries) => {
        observedEntries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    )
    entries.forEach((entry) => observer.observe(entry))

    updateLine()
    window.addEventListener('scroll', updateLine, { passive: true })
    window.addEventListener('resize', updateLine)
    const resizeObserver = new ResizeObserver(updateLine)
    resizeObserver.observe(timeline)

    return () => {
      observer.disconnect()
      resizeObserver.disconnect()
      window.removeEventListener('scroll', updateLine)
      window.removeEventListener('resize', updateLine)
    }
  }, [])

  return (
    <div className="orig-page">
      <Fog density={0.3} />

      {/* Hero */}
      <header className="orig-hero">
        <div className="container orig-hero__inner">
          <p className="kicker">{t('origins.kicker')}</p>
          <p className="baybayin orig-hero__baybayin" aria-hidden="true">ᜀᜅ᜔ ᜉᜒᜈᜄ᜔ᜋᜓᜎᜈ᜔</p>
          <h1 className="orig-hero__title">
            {t('origins.title')} <em>{t('origins.titleEm')}</em>
          </h1>
          <p className="orig-hero__subtitle">
            {t('origins.subtitle')}
          </p>
          <p className="orig-hero__lead">
            {t('origins.desc')}
          </p>
        </div>
      </header>

      {/* Epochs Timeline */}
      <main className="container orig-timeline" ref={timelineRef}>
        {EPOCHS.map((epoch) => (
          <article key={epoch.num} className="orig-epoch">
            {/* Epoch Marker Head */}
            <div className="orig-epoch__header">
              <span className="orig-epoch__roman">{epoch.roman}</span>
              <div className="orig-epoch__titles">
                <span className="baybayin orig-epoch__baybayin" aria-hidden="true">{epoch.baybayin}</span>
                <h2 className="orig-epoch__title">{isFilipino ? epoch.title : epoch.titleEn}</h2>
                <p className="orig-epoch__sub">{isFilipino ? epoch.subtitleFil : epoch.subtitle}</p>
              </div>
            </div>

            {/* Lead & Narrative */}
            <p className="orig-epoch__lead">{isFilipino ? epoch.leadFil : epoch.lead}</p>
            <div className="orig-epoch__paragraphs">
              {(isFilipino ? epoch.paragraphsFil : epoch.paragraphs).map((p, idx) => (
                <p key={idx} className="orig-epoch__p">{p}</p>
              ))}
            </div>

            {/* Optional Pantheon Grid for Epoch 1 */}
            {epoch.pantheon && (
              <div className="orig-pantheon-box">
                <h3 className="orig-sub-head">{t('origins.pantheonHeading')}</h3>
                <div className="orig-pantheon-grid">
                  {epoch.pantheon.map((d, i) => (
                    <div key={i} className="orig-pantheon-item">
                      <strong className="orig-pantheon-name">{d.name}</strong>
                      <p className="orig-pantheon-role">
                        <strong>{t('origins.colRole')}:</strong> {isFilipino ? d.roleFil : d.role}
                      </p>
                      <p className="orig-pantheon-domain">
                        <strong>{t('origins.colDomain')}:</strong> {isFilipino ? d.domainFil : d.domain}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Optional Taxonomy Grid for Epoch 4 */}
            {epoch.taxonomy && (
              <div className="orig-taxonomy-box">
                <h3 className="orig-sub-head">
                  {isFilipino ? 'Ang Klasipikasyon ni Ramos (Lower Mythology Classes)' : 'Ramos Taxonomy: Lower Mythology Classes'}
                </h3>
                <div className="orig-taxonomy-grid">
                  {epoch.taxonomy.map((item, i) => (
                    <div key={i} className="orig-taxonomy-card">
                      <h4 className="orig-tax-cat">{isFilipino ? item.categoryFil : item.category}</h4>
                      <p className="orig-tax-examples">
                        <strong>{isFilipino ? 'Halimbawa:' : 'Examples:'}</strong> {item.examples}
                      </p>
                      <p className="orig-tax-desc">{isFilipino ? item.descFil : item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Verified Sources */}
            {epoch.sources && epoch.sources.length > 0 && (
              <div className="orig-sources-box">
                <span className="orig-sources-label">{t('origins.sourcesHeading')}:</span>
                <ul className="orig-sources-list">
                  {epoch.sources.map((src, i) => (
                    <li key={i} className="orig-source-item">
                      <a href={src.url} target="_blank" rel="noopener noreferrer" className="orig-source-link">
                        {src.name} ↗
                      </a>
                      <span className="orig-source-note"> — {src.note}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </article>
        ))}

        {/* Footer Actions */}
        <section className="orig-nav-cta">
          <Candle size={0.7} />
          <div className="orig-nav-cta__text">
            <h3>{isFilipino ? 'Gusto Mo Bang Makilala ang mga Nilalang?' : 'Ready to Meet the Creatures?'}</h3>
            <p>
              {isFilipino
                ? 'Mula sa mga Sinaunang Anito hanggang sa mga Halimaw ng Gabi, buksan ang talaarawan ng albularyo.'
                : 'From ancient animist guardians to midnight shapeshifters, discover all entries in the albularyo’s journal.'}
            </p>
            <div className="orig-nav-cta__actions">
              <Link to="/creatures" className="btn">
                {isFilipino ? 'Buksan ang Bestiyaryo' : 'Open the Bestiary'} <span className="btn__arrow">→</span>
              </Link>
              <Link to="/map" className="btn btn--ghost">
                {isFilipino ? 'Tingnan ang Mapa ng Alamat' : 'View the Map of Myths'}
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
