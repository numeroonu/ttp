import { Link } from 'react-router-dom'
import Fog from '../components/Fog'
import Candle from '../components/Candle'
import { useLanguage } from '../context/useLanguage'
import './About.css'

const AUTHORS = [
  'Ochoa, Cyrelle Shane B.',
  'Rosas, Khristine L.',
  'Silverio, Cristina B.',
  'Teves, Jhessa Mae C.',
]

const DIRECTORY = [
  {
    category: 'Primary Digital Archive',
    categoryFil: 'Pangunahing Digital Archive',
    title: 'The Aswang Project',
    author: 'Jordan Clark & Contributing Cultural Researchers',
    desc: 'Widely recognized as the premier educational archive and documentary resource for Philippine mythology, folklore, and lower-mythology creatures. Features hundreds of peer-reviewed articles, regional translations, and academic papers.',
    descFil: 'Pangunahing pang-edukasyong archive at dokumentaryo para sa mitolohiya, alamat, at mga nilalang sa Pilipinas. Naglalaman ng daan-daang artikulo, salin, at akademikong pag-aaral.',
    url: 'https://www.aswangproject.com/',
  },
  {
    category: 'Foundational Academic Taxonomy',
    categoryFil: 'Sinaunang Akademikong Klasipikasyon',
    title: 'The Creatures of Philippine Lower Mythology',
    author: 'Dr. Maximo D. Ramos (Ph.D.)',
    desc: 'Published in 1971 / 1990 by Phoenix Publishing House. The seminal scientific taxonomy classifying Philippine supernatural creatures into demons, dragons, dwarfs, elves, ghouls, giants, and vampires.',
    descFil: 'Inilathala noong 1971 / 1990. Ang batayang siyentipikong taxonomy na nag-uuri sa mga nilalang ng mitolohiyang Pilipino sa mga demonyo, dragon, duwende, higante, at bampira.',
    url: 'https://www.aswangproject.com/creatures-philippine-lower-mythology/',
  },
  {
    category: 'National Folklore Anthology',
    categoryFil: 'Pambansang Antolohiya ng Alamat',
    title: 'Philippine Folk Literature Series',
    author: 'Dr. Damiana L. Eugenio (University of the Philippines Press)',
    desc: 'The multi-volume national monument of oral literature compiled by the "Mother of Philippine Folklore." Includes The Myths (Vol. II) and The Legends (Vol. III).',
    descFil: 'Ang pambansang bantayog ng panitikang-bayan na tinipon ng "Ina ng Katutubong Panitikan ng Pilipinas" mula sa University of the Philippines Press.',
    url: 'https://press.up.edu.ph/store/books/view/825',
  },
  {
    category: 'Anthropology & Sulod Cosmology',
    categoryFil: 'Antropolohiya at Kosmolohiyang Sulod',
    title: 'Outline of Philippine Mythology & Sulod Society',
    author: 'Dr. F. Landa Jocano (UP Diliman / Asian Center)',
    desc: 'Foundational anthropological texts detailing indigenous animist pantheons, folk medicine, and the social organization of mountain peoples.',
    descFil: 'Mahalagang akda sa antropolohiya na naglalarawan sa mga katutubong anito, panggagamot, at pamumuhay ng mga pamayanan sa kabundukan.',
    url: 'https://www.aswangproject.com/f-landa-jocano-philippine-mythology/',
  },
  {
    category: 'Historic 19th-Century Documentation',
    categoryFil: 'Makasaysayang Tala noong Ika-19 Siglo',
    title: 'El Folk-lore Filipino (1889)',
    author: 'Isabelo de los Reyes',
    desc: 'The pioneering 1889 compilation by the "Father of Philippine Folklore" and national labor leader Isabelo de los Reyes, documenting Ilocano and Tagalog beliefs.',
    descFil: 'Ang unang komprehensibong aklat sa alamat na sinulat ng "Ama ng Katutubong Kaalaman sa Pilipinas" na si Isabelo de los Reyes.',
    url: 'https://www.aswangproject.com/isabelo-de-los-reyes-folk-lore-filipino/',
  },
  {
    category: 'Mindanao Ethnography',
    categoryFil: 'Etnograpiya ng Mindanao',
    title: 'A Study of Bagobo Ceremonial, Magic and Myth (1916)',
    author: 'Laura Watson Benedict (Annals of the New York Academy of Sciences)',
    desc: 'Rigorous primary ethnographic documentation of the Bagobo people around Mount Apo, recording the myths of the Busaw and ancient funeral vigils.',
    descFil: 'Masusing etnograpikong tala sa pamayanang Bagobo sa paligid ng Bundok Apo, nagtatala ng mga alamat ukol sa Busaw at ritwal sa libing.',
    url: 'https://www.aswangproject.com/bagobo-myths-laura-watson-benedict/',
  },
  {
    category: 'Sorcery & Traditional Healing Studies',
    categoryFil: 'Pangungulam at Katutubong Panggagamot',
    title: 'Cebuano Sorcery: Malign Magic in the Philippines (1967)',
    author: 'Richard W. Lieban (University of California Press)',
    desc: 'The definitive anthropological field study investigating the practices of the mambabarang, mangkukulam, and the protective rites of the albularyo in Cebu.',
    descFil: 'Ang masusing antropolohikal na pag-aaral sa gawi ng mambabarang, mangkukulam, at pananggalang ng albularyo sa Cebu at Visayas.',
    url: 'https://www.aswangproject.com/cebuano-sorcery-richard-lieban/',
  },
  {
    category: 'Modern Urban Fantasy Renaissance',
    categoryFil: 'Makabagong Komiks at Sining',
    title: 'Trese: Graphic Novel Series',
    author: 'Budjette Tan & Kajo Baldisimo (Ablaze Publishing)',
    desc: 'The award-winning graphic novel series that spearheaded the modern resurgence of Philippine mythology, bringing ancient spirits into contemporary Metro Manila.',
    descFil: 'Ang nagwaging serye ng nobelang grapiko na nagbigay ng bagong buhay sa mitolohiyang Pilipino sa modernong lungsod ng Maynila.',
    url: 'https://www.aswangproject.com/trese-philippine-mythology/',
  },
]

export default function About() {
  const { isFilipino, t } = useLanguage()

  return (
    <div className="about-page">
      <Fog density={0.35} />

      {/* Header */}
      <header className="about-header">
        <div className="container">
          <p className="kicker">{t('about.kicker')}</p>
          <p className="baybayin about-header__baybayin" aria-hidden="true">
            ᜆᜓᜅ᜔ᜃᜓᜎ᜔ ᜐ ᜀᜋᜒᜈ᜔
          </p>
          <h1 className="about-header__title">
            {t('about.title')} <em>{t('about.titleEm')}</em>
          </h1>
          <p className="about-header__subtitle">
            {t('about.subtitle')}
          </p>
          <p className="about-header__desc">
            {t('about.desc')}
          </p>
        </div>
      </header>

      {/* Content */}
      <main className="container about-main">
        {/* Mission Statement & Authors */}
        <section className="about-card about-card--mission">
          <div className="about-mission__text">
            <h2>{t('about.missionTitle')}</h2>
            <p>{t('about.missionP1')}</p>
            <p>{t('about.missionP2')}</p>
          </div>
          <div className="about-card__aside">
            <Candle size={0.75} />
            <div className="about-creators">
              <span className="about-creators__label">{t('about.authorsLabel')}</span>
              <ul className="about-creators__list">
                {AUTHORS.map((author) => (
                  <li key={author}>
                    <strong>{author}</strong>
                  </li>
                ))}
              </ul>
              <small className="about-creators__note">{t('about.researchTag')}</small>
            </div>
          </div>
        </section>

        {/* Anti-Stereotyping Ethics Disclaimer */}
        <section className="about-card about-card--ethics">
          <div className="about-ethics__head">
            <span className="about-ethics-badge">
              <span aria-hidden="true">⚖️</span> {t('about.ethicsTitle')}
            </span>
            <h3>{t('about.ethicsSubtitle')}</h3>
          </div>
          <div className="about-ethics__body">
            <p>{t('about.ethicsP1')}</p>
            <p>{t('about.ethicsP2')}</p>
          </div>
        </section>

        {/* Comprehensive Bibliography / Verified Links Directory */}
        <section className="about-directory">
          <div className="about-directory__head">
            <p className="kicker">{isFilipino ? 'Bibliograpiya at mga Archive' : 'Bibliography & Archives'}</p>
            <h2>{t('about.bibTitle')}</h2>
            <p>{t('about.bibDesc')}</p>
          </div>

          <div className="about-sources-grid">
            {DIRECTORY.map((item) => (
              <article key={item.url} className="about-source-card">
                <div className="about-source-card__meta">
                  <span className="about-source-cat">{isFilipino ? item.categoryFil : item.category}</span>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="about-source-link"
                  >
                    {t('about.visitArchive')} ↗
                  </a>
                </div>
                <div className="about-source-card__body">
                  <h3 className="about-source-title">{item.title}</h3>
                  <p className="about-source-author">
                    {isFilipino ? 'May-akda / Mananaliksik:' : 'Author / Researcher:'} <strong>{item.author}</strong>
                  </p>
                  <p className="about-source-desc">{isFilipino ? item.descFil : item.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Navigation Actions */}
        <section className="about-nav-cta">
          <Link to="/creatures" className="btn">
            {isFilipino ? 'Buksan ang Bestiyaryo' : 'Explore the Bestiary'} <span className="btn__arrow" aria-hidden="true">→</span>
          </Link>
          <Link to="/podcasts" className="btn btn--ghost">
            {isFilipino ? 'Makinig sa mga Podcast' : 'Listen to Podcasts & Stories'}
          </Link>
          <Link to="/" className="btn btn--ghost">
            {isFilipino ? 'Bumalik sa Simula' : 'Return to Home'}
          </Link>
        </section>
      </main>
    </div>
  )
}