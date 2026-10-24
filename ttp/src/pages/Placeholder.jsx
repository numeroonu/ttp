import { Link } from 'react-router-dom'
import Candle from '../components/Candle'
import Fog from '../components/Fog'
import './Placeholder.css'

/**
 * Temporary page for sections that are not built yet.
 * Replace each route in App.jsx with the real page when it's ready.
 */
export default function Placeholder({ title, filipino, owner, lost = false }) {
  return (
    <section className="ph">
      <Fog density={0.6} />
      <div className="ph__inner">
        <Candle size={0.8} />
        <p className="kicker">{filipino}</p>
        <h1 className="ph__title">{title}</h1>
        <p className="ph__text">
          {lost
            ? 'Mukhang nilinlang ka ng tikbalang. This page does not exist. Try turning your shirt inside out… or just go home.'
            : 'Paparating pa ang pahinang ito. This page is still being written in the albularyo’s journal.'}
        </p>
        {owner && <p className="ph__owner">Page by {owner}</p>}
        <Link to="/" className="btn btn--ghost">
          <span className="btn__arrow" aria-hidden="true">←</span> Bumalik sa Simula
        </Link>
      </div>
    </section>
  )
}
