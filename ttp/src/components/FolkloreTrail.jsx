import { Link, useLocation } from 'react-router-dom'
import { useLanguage } from '../context/useLanguage'

const TRAILS = {
  '/creatures': [['/map', 'Hanapin ang kanilang mga pook', 'Find their places'], ['/superstitions', 'Kilalanin ang mga pananggalang', 'Discover protective customs']],
  '/map': [['/creatures', 'Buksan ang mga tala', 'Open the field journal'], ['/origins', 'Sundan ang pinagmulan', 'Trace the origins']],
  '/superstitions': [['/creatures', 'Kilalanin ang mga nilalang', 'Meet the creatures'], ['/origins', 'Unawain ang pinagmulan', 'Explore the origins']],
  '/origins': [['/modern-legends', 'Mga alamat sa kasalukuyan', 'Legends in the present'], ['/map', 'Lakbayin ang kapuluan', 'Explore the archipelago']],
  '/modern-legends': [['/origins', 'Balikan ang pinagmulan', 'Return to the origins'], ['/podcasts', 'Makinig sa mga salaysay', 'Listen to the stories']],
  '/podcasts': [['/map', 'Tuklasin ang mga pook', 'Discover the places'], ['/notebook', 'Balikan ang kuwaderno', 'Return to your notebook']],
}
export default function FolkloreTrail({ creature }) {
  const { pathname } = useLocation()
  const { isFilipino } = useLanguage()
  const links = creature ? [
    [`/map?region=${creature.island.toLowerCase()}&creature=${encodeURIComponent(creature.id)}`, `Mga pook ng ${creature.name}`, `Places associated with ${creature.name}`],
    ['/superstitions', 'Mga pamahiin at pananggalang', 'Superstitions & protective customs'],
    ['/podcasts', 'Makinig sa mga salaysay', 'Browse folklore listening'],
  ] : TRAILS[pathname === '/stories' ? '/podcasts' : pathname]
  if (!links) return null
  return <nav className={`folklore-trail ${creature ? 'folklore-trail--dossier' : 'container'}`} aria-label={isFilipino ? 'Ipagpatuloy ang pagtuklas' : 'Continue exploring'}>
    <p className="kicker">{isFilipino ? 'Sundan ang alamat' : 'Follow the folklore'}</p>
    <div>{links.map(([to, fil, en], index) => <Link key={to} to={to}>
      <span className="folklore-trail__number" aria-hidden="true">0{index + 1}</span>
      <span>{isFilipino ? fil : en}</span><span aria-hidden="true">↗</span>
    </Link>)}</div>
  </nav>
}
