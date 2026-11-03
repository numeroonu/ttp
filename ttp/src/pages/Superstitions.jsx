import { useState } from 'react'
import { Link } from 'react-router-dom'
import Fog from '../components/Fog'
import Candle from '../components/Candle'
import { useLanguage } from '../context/useLanguage'
import './Superstitions.css'

const CATEGORIES = [
  { id: 'all', fil: 'Lahat ng Pamahiin', en: 'All Superstitions' },
  { id: 'protection', fil: 'Mga Sagradong Panlaban (Wards)', en: 'Sacred Wards (Protection)' },
  { id: 'taboos', fil: 'Mga Bawal at Babala (Taboos)', en: 'Taboos & Warnings (Bawal)' },
]

const SUPERSTITIONS = [
  {
    id: 'tabi-tabi-po',
    category: 'protection',
    categoryLabel: 'Spiritual Etiquette · Pre-Colonial Animism',
    categoryLabelFil: 'Banal na Paggalang · Sinaunang Animismo',
    title: 'Tabi-Tabi Po (o Makikiraan Po)',
    baybayin: 'ᜆᜊᜒ ᜆᜊᜒ ᜉᜓ',
    subtitle: 'The Primordial Contract of Respecting Unseen Spirits',
    meaning:
      'A customary phrase uttered aloud with bowed head when walking past termite mounds (punso), centennial balete trees, bamboo thickets, dark trails, or when disposing of water outdoors at twilight.',
    meaningFil:
      'Isang kaugaliang binibigkas nang may bahagyang pagyuko kapag dumaraan sa mga punso, matatandang puno ng balete, kawayanan, madidilim na daan, o kapag nagtatapon ng maruming tubig sa labas tuwing takipsilim.',
    context:
      'In pre-colonial animism, the human world and spirit world occupy the same physical coordinates. Earth belongs to ancestral custodians, nuno sa punso, duwende, and engkanto. Stepping on or disturbing their dwellings without asking permission invites "gaba" or "usog"—mysterious localized swellings, sudden high fevers, or localized paralysis. Uttering "Tabi-tabi po, makikiraan lamang po" honors their sovereignty and guarantees safe passage.',
    contextFil:
      'Sa sinaunang animismo, ang mundo ng tao at ng mga espiritu ay iisa ang tinitirhan. Ang lupa ay pag-aari ng mga nuno, engkanto, at diwata. Ang pag-apak o paggambala sa kanila nang walang paalam ay nagdudulot ng gaba o usog. Ang pagbigkas ng "Tabi-tabi po, makikiraan lamang po" ay pagkilala sa kanilang kapangyarihan upang payagan kang makaraan nang ligtas.',
    remedy:
      'If stricken after forgetting to say tabi-tabi po, consult a traditional healer (albularyo) for a "tawas" diagnostic ritual and offer an "atang" (unsalted boiled chicken, tobacco, basi wine, and coins) at the base of the mound to beg for reconciliation.',
    remedyFil:
      'Kung nagkasakit matapos makalimot magpaalam, sumangguni sa albularyo para sa ritwal ng pagtatawas at mag-alay ng atang (manok na walang asin, tabako, basi, at barya) sa paanan ng punso upang humingi ng tawad.',
    sources: [
      {
        name: 'The Aswang Project: Why We Still Say Tabi-Tabi Po',
        url: 'https://www.aswangproject.com/nuno-sa-punso/',
        note: 'Ethno-historical analysis of the ancient animist reverence for mound-dwelling spirits.',
      },
    ],
  },
  {
    id: 'buntot-pagi',
    category: 'protection',
    categoryLabel: 'Apotropaic Weapon · Visayan Marine Lore',
    categoryLabelFil: 'Sandatang Panlaban · Alamat sa Dagat ng Kabisayaan',
    title: 'Buntot Pagi (Stingray Tail Whip)',
    baybayin: 'ᜊᜓᜈ᜔ᜆᜓᜆ᜔ ᜉᜄᜒ',
    subtitle: 'The Most Feared Weapon Against Shapeshifters & Ghouls',
    meaning:
      'The dried, barbed tail of a stingray cured and fashioned into a whip, traditionally hung above doorways or placed beneath the sleeping mat of an expectant mother.',
    meaningFil:
      'Ang pinatuyong tinikang buntot ng pagi na ginagawang latigo, karaniwang isinasabit sa pintuan o inilalagay sa ilalim ng higaan ng buntis.',
    context:
      'In Philippine folklore, beings of black sorcery and night shapeshifting dread the venomous, oceanic properties of the stingray tail. According to oral history, the sound and strike of a buntot pagi burns the supernatural glamour of the aswang, forcing the creature to scream in agony and reveal its true identity.',
    contextFil:
      'Sa mitolohiyang Pilipino, labis na kinatatakutan ng aswang at mangkukulam ang latigong buntot pagi. Ang hagupit at tunog nito ay sumisira sa engkanto ng halimaw, dahilan upang mapatili ito at magbalik sa tunay nitong anyo.',
    remedy:
      'Hang a cured stingray tail near the bedroom entrance or beneath the bedframe of pregnant mothers to bar nocturnal viscera suckers from entering.',
    remedyFil:
      'Magsabit ng buntot pagi sa may bintana o pinto ng silid ng nagdadalang-tao upang hindi makapasok ang lumilipad na aswang o manananggal.',
    sources: [
      {
        name: 'The Aswang Project: Buntot Pagi in Philippine Folklore',
        url: 'https://www.aswangproject.com/the-aswang-complex-in-philippine-folklore/',
        note: 'Documentation of marine-derived protective artifacts in Visayan oral history.',
      },
    ],
  },
  {
    id: 'pagpag',
    category: 'taboos',
    categoryLabel: 'Funerary Taboo · Bereavement Lore',
    categoryLabelFil: 'Kaugalian sa Patay · Pamahiin sa Pagluluksa',
    title: 'Pagpag (The Post-Wake Detour)',
    baybayin: 'ᜉᜄ᜔ᜉᜄ᜔',
    subtitle: 'Shaking Off the Lingering Spirits of the Dead',
    meaning:
      'The strict cultural taboo forbidding anyone from returning directly to their own home after attending a wake, funeral, or cemetery burial.',
    meaningFil:
      'Ang mahigpit na pagbabawal sa sinumang manggaling sa burol o libingan na dumiretso agad sa sariling tahanan.',
    context:
      'Derived from the Tagalog root "pagpag" (to shake off dust or crumbs), elders warn that lingering souls, cemetery ghouls (like the Busaw), and spirits of the departed linger around mourning sites and can latch onto your clothing or footsteps. Making a mandatory detour at a public convenience store or restaurant "shakes off" the trailing spirit in the crowd.',
    contextFil:
      'Nagmula sa salitang "pagpag" (pagpagin ang alikabok), nagbababala ang matatanda na ang mga ligaw na kaluluwa at halimaw sa libingan ay maaaring sumunod sa iyong likod o damit. Ang pagtigil muna sa mataong tindahan o kainan ay nagwawaksi sa sumusunod na espiritu.',
    remedy:
      'Stop at a 24-hour convenience store, open restaurant, or busy crossroads to eat, wash your hands, and shake off your outerwear before stepping across your family threshold.',
    remedyFil:
      'Huminto muna sa isang 24-oras na tindahan o kainan, maghugas ng kamay, at ipagpag ang damit bago pumasok sa sariling tahanan.',
    sources: [
      {
        name: 'Encyclopedia of Philippine Folk Beliefs – Demetrio (Xavier University)',
        url: 'https://www.aswangproject.com/encyclopedia-of-philippine-folk-beliefs/',
        note: 'Anthropological investigation into bereavement taboos and funeral trailing.',
      },
    ],
  },
  {
    id: 'asin-at-bawang',
    category: 'protection',
    categoryLabel: 'Mineral & Botanical Wards · Domestic Defense',
    categoryLabelFil: 'Banal na Mineral at Halaman · Panlaban sa Bahay',
    title: 'Magaspang na Asin at Katutubong Bawang',
    baybayin: 'ᜀᜐᜒᜈ᜔ ᜀᜆ᜔ ᜊᜏᜅ᜔',
    subtitle: 'Elementary Purity & Pungent Wards of the Household',
    meaning:
      'Placing bowls of coarse unrefined sea salt and crushed native garlic cloves along windowsills, roof eaves, and beneath bamboo floor slats.',
    meaningFil:
      'Paglalagay ng mangkok ng magaspang na asin at dinurog na bawang sa mga bintana, pinto, at ilalim ng sahig ng bahay.',
    context:
      'Salt represents incorruptible preservation and oceanic purity—antithetical to ghouls whose existence thrives on biological decay and necrosis. Crushed native garlic emits pungent sulfuric oils that overwhelm the hyper-attuned olfactory senses of shapeshifting predators.',
    contextFil:
      'Ang asin ay sumasagisag sa kalinisan ng dagat at pumipigil sa pagkabulok—kabaligtaran ng mga aswang na nabubuhay sa nabubulok na laman. Ang masangsang na amoy ng bawang ay sumisira sa matalas na pang-amoy ng mga nilalang sa gabi.',
    remedy:
      'Keep a small pouch of rock salt and a bulb of garlic inside expectant mothers’ pockets when traveling after dark.',
    remedyFil:
      'Maglagay ng maliit na supot ng asin at buong bawang sa bulsa ng buntis kapag kinakailangang lumabas ng gabi.',
    sources: [
      {
        name: 'Maximo Ramos – The Aswang Complex in Philippine Folklore',
        url: 'https://www.aswangproject.com/the-aswang-complex-in-philippine-folklore/',
        note: 'Academic classification of botanical and mineral repellents documented in Visayan folklore.',
      },
    ],
  },
]

export default function Superstitions() {
  const [activeCategory, setActiveCategory] = useState('all')
  const { isFilipino, t } = useLanguage()

  const filteredItems =
    activeCategory === 'all'
      ? SUPERSTITIONS
      : SUPERSTITIONS.filter((item) => item.category === activeCategory)

  return (
    <div className="sup-page">
      <Fog density={0.35} />

      {/* Header */}
      <header className="sup-hero">
        <div className="container sup-hero__inner">
          <p className="kicker">{t('superstitions.kicker')}</p>
          <p className="baybayin sup-hero__baybayin" aria-hidden="true">
            ᜋᜅ ᜉᜋᜑᜒᜁᜈ᜔ ᜀᜆ᜔ ᜉᜈ᜔ᜎᜊᜈ᜔
          </p>
          <h1 className="sup-hero__title">
            {t('superstitions.title')} <em>{t('superstitions.titleEm')}</em>
          </h1>
          <p className="sup-hero__subtitle">
            {t('superstitions.subtitle')}
          </p>
          <p className="sup-hero__lead">
            {t('superstitions.desc')}
          </p>

          {/* Category Tabs */}
          <div className="sup-tabs" role="tablist" aria-label="Kategorya ng Pamahiin">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={activeCategory === cat.id}
                className={`sup-tab ${activeCategory === cat.id ? 'is-active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                {isFilipino ? cat.fil : cat.en}
                <span className="sup-tab__count">
                  {cat.id === 'all'
                    ? SUPERSTITIONS.length
                    : SUPERSTITIONS.filter((s) => s.category === cat.id).length}
                </span>
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Featured Callout: The Core Rule of Tabi-Tabi Po */}
      <section className="container sup-axiom-section">
        <div className="sup-axiom-card">
          <div className="sup-axiom-card__aside">
            <Candle size={0.9} />
            <span className="sup-axiom-baybayin baybayin">ᜆᜊᜒ ᜆᜊᜒ ᜉᜓ</span>
          </div>
          <div className="sup-axiom-card__content">
            <span className="sup-axiom-kicker">
              {isFilipino ? 'Ang Pangunahing Batas (The Fundamental Law)' : 'The Fundamental Axiom'}
            </span>
            <h2 className="sup-axiom-title">
              {isFilipino ? 'Bakit Natin Sinasabi ang “Tabi-Tabi Po”?' : 'Why Do We Still Whisper “Tabi-Tabi Po”?'}
            </h2>
            <p className="sup-axiom-p">
              {isFilipino
                ? 'Bago dumating ang modernong syudad, ang bawat lupain—mula sa punso ng nuno hanggang sa mga baging ng balete—ay may kinikilalang unseen guardians. Ang pagbigkas ng “tabi-tabi po” ay hindi tanda ng takot; ito ay tanda ng pagpapakumbaba. Ipinapaalala nito sa tao na hindi tayo ang sentro ng mundo, at may mga kapwa nilalang tayo na nararapat igalang ang katahimikan.'
                : 'Long before streetlights swept across the archipelago, our animist forebears understood that the visible and invisible worlds inhabit the same soil. Uttering “tabi-tabi po” is not an expression of cowardice—it is an act of ecological humility. It acknowledges that human beings are guests in a sacred natural sanctuary shared with ancient unseen custodians.'}
            </p>
            <div className="sup-axiom-meta">
              <span>{isFilipino ? 'Etika ng Ninuno' : 'Ancestral Ethics'}</span>
              <span aria-hidden="true">·</span>
              <span>{isFilipino ? 'Pangangalaga sa Kalikasan' : 'Ecological Custodianship'}</span>
              <span aria-hidden="true">·</span>
              <span>{isFilipino ? 'Proteksyon sa Karamdaman' : 'Spiritual Equilibrium'}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Cards Grid */}
      <main className="container sup-grid-section">
        <div className="sup-list" role="tabpanel" aria-live="polite">
          {filteredItems.map((item) => (
            <article key={item.id} className={`sup-card sup-card--${item.category} sup-card--tremble`}>
              <div className="sup-card__head">
                <span className="sup-card__tag">
                  {item.category === 'taboos'
                    ? isFilipino ? 'Bawal' : 'Taboo'
                    : isFilipino ? 'Panlaban' : 'Ward'}
                </span>
                <span className="baybayin sup-card__baybayin" aria-hidden="true">{item.baybayin}</span>
                <h2 className="sup-card__title">{item.title}</h2>
                <p className="sup-card__subtitle">{item.subtitle}</p>
                <p className="sup-card__label">
                  {isFilipino ? item.categoryLabelFil : item.categoryLabel}
                </p>
              </div>

              <div className="sup-card__body">
              <div className="sup-card__block">
                <h3 className="sup-block-head">
                  {isFilipino ? 'Ang Paniniwala (The Tradition)' : 'Cultural Meaning & Practice'}
                </h3>
                <p className="sup-block-text">{isFilipino ? item.meaningFil : item.meaning}</p>
              </div>

              <div className="sup-card__block">
                <h3 className="sup-block-head">
                  {isFilipino ? 'Kahalagahan at Pinagmulan (Cultural Context)' : 'Ancestral Context & Lore'}
                </h3>
                <p className="sup-block-text">{isFilipino ? item.contextFil : item.context}</p>
              </div>

              <div className="sup-card__block sup-card__block--remedy">
                <h3 className="sup-block-head sup-block-head--remedy">
                  {isFilipino ? 'Payo ng Matatanda (Ancestral Remedy)' : 'Albularyo Remedy & Guidance'}
                </h3>
                <p className="sup-block-text">{isFilipino ? item.remedyFil : item.remedy}</p>
              </div>

              {/* Verified Sources */}
              {item.sources && item.sources.length > 0 && (
                <div className="sup-card__sources">
                  <span className="sup-sources-label">
                    {isFilipino ? 'Na-verify na Sanggunian:' : 'Verified Sources:'}
                  </span>
                  {item.sources.map((src, i) => (
                    <div key={i} className="sup-source-item">
                      <p className="sup-source-note">{src.note}</p>
                      <a
                        href={src.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="sup-source-link"
                      >
                        {src.name} ↗
                      </a>
                    </div>
                  ))}
                </div>
              )}
              </div>
            </article>
          ))}
        </div>

        {/* Bottom Banner */}
        <section className="sup-footer-banner">
          <Candle size={0.7} />
          <div className="sup-footer-banner__text">
            <h3>{isFilipino ? 'Ang Karunungan ng mga Matatanda' : 'Wisdom of the Elders'}</h3>
            <p>
              {isFilipino
                ? '“Ang mga pamahiin ay hindi sumpa; ito ay paalala na may mga bagay sa mundong ito na mas dakila kaysa sa atin. Ang pagiging magalang sa kalikasan at sa kapwa ang tunay na pinakamabisang panangga sa anumang kadiliman.”'
                : '“Superstitions are not chains of irrational fear—they are living covenants reminding us that nature commands respect. Humility toward the land and compassion for our neighbors remain the strongest protection against any midnight dark.”'}
            </p>
            <div className="sup-footer-banner__actions">
              <Link to="/creatures" className="btn">
                {isFilipino ? 'Harapin ang mga Nilalang' : 'Confront the Creatures'} <span className="btn__arrow">→</span>
              </Link>
              <Link to="/origins" className="btn btn--ghost">
                {isFilipino ? 'Tuklasin ang Pinagmulan' : 'Explore Historical Origins'}
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}