import { Link } from 'react-router-dom'
import { creatures } from '../data/creatures'
import { getLocalizedCreature } from '../data/creatureTranslations'
import { useLanguage } from '../context/useLanguage'
import { useFieldNotebook } from '../utils/fieldNotebook'
import { SaveCreature } from '../components/ArchiveTools'
import CreatureArtwork from '../components/CreatureArtwork'

export default function Notebook() {
  const { language, isFilipino } = useLanguage()
  const { saved, persistent } = useFieldNotebook()
  const entries = creatures.filter((creature) => saved.includes(creature.id))
    .map((creature) => getLocalizedCreature(creature, language))
  return <div className="notebook-page container">
    <header className="notebook-header">
      <p className="kicker">{isFilipino ? 'Mga personal na tala' : 'Personal field notes'}</p>
      <h1>{isFilipino ? 'Aking Kuwaderno' : 'My Notebook'}</h1>
      <p>{isFilipino ? 'Mga alamat na nais mong balikan. Nakaimbak lamang sa browser na ito.' : 'Legends to return to. Your collection stays in this browser.'}</p>
      <div className="notebook-stamps" aria-label={isFilipino ? 'Mga rehiyon sa iyong koleksyon' : 'Regions in your collection'}>
        {['Luzon', 'Visayas', 'Mindanao'].map((island) => {
          const count = entries.filter((creature) => creature.island === island).length
          return <span className={`notebook-stamp ${count ? 'is-collected' : ''}`} key={island}>
            {island}<small>{count} {isFilipino ? 'tala' : 'saved'}</small>
          </span>
        })}
      </div>
      <p role="status">{entries.length} {isFilipino ? 'tala sa iyong kuwaderno' : 'entries in your notebook'}</p>
      {!persistent && <p role="status">{isFilipino ? 'Hindi magamit ang imbakan ng browser. Mananatili ang mga tala habang bukas ang pahina.' : 'Browser storage is unavailable. Notes will stay for this page session.'}</p>}
    </header>
    {entries.length ? <div className="notebook-grid">{entries.map((creature) => <article className="notebook-entry" key={creature.id}>
      <Link to={`/creatures#${creature.id}`} className="notebook-entry__link">
        <CreatureArtwork creature={creature} />
        <span className="kicker">{creature.island}</span>
        <h2>{creature.name}</h2><p>{creature.teaser}</p>
        <span className="notebook-entry__read">{isFilipino ? 'Balikan ang tala' : 'Revisit field notes'} →</span>
      </Link>
      <SaveCreature creature={creature} />
    </article>)}</div> : <section className="notebook-empty">
      <h2>{isFilipino ? 'Dito nagsisimula ang iyong koleksyon.' : 'Your collection begins here.'}</h2>
      <p>{isFilipino ? 'Buksan ang tala ng isang nilalang at piliin ang “Itala sa kuwaderno”.' : 'Open a creature’s field notes and choose “Save to notebook”.'}</p>
      <Link className="btn" to="/creatures">{isFilipino ? 'Tuklasin ang mga nilalang' : 'Explore creatures'} →</Link>
    </section>}
  </div>
}
