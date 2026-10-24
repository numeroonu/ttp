import { useRef } from 'react'
import { Link } from 'react-router-dom'
import Eyes from './Eyes'
import './CreatureCard.css'

/**
 * Creature preview card.
 * - Tilts in 3D toward your cursor
 * - A candle-light glow follows your cursor inside the card
 * - On hover the eyes open wider and the weakness is revealed
 */
export default function CreatureCard({ creature, index = 0 }) {
  const ref = useRef(null)

  const onMove = (e) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width
    const y = (e.clientY - r.top) / r.height
    el.style.setProperty('--rx', `${((0.5 - y) * 10).toFixed(2)}deg`)
    el.style.setProperty('--ry', `${((x - 0.5) * 12).toFixed(2)}deg`)
    el.style.setProperty('--gx', `${(x * 100).toFixed(1)}%`)
    el.style.setProperty('--gy', `${(y * 100).toFixed(1)}%`)
  }

  const onLeave = () => {
    const el = ref.current
    if (!el) return
    el.style.setProperty('--rx', '0deg')
    el.style.setProperty('--ry', '0deg')
  }

  return (
    <article
      ref={ref}
      className="ccard"
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ '--i': index }}
    >
      <Link to={`/creatures#${creature.id}`} className="ccard__link" aria-label={`Read about the ${creature.name}`}>
        <div className="ccard__art">
          {creature.image ? (
            <img src={creature.image} alt={`Illustration of the ${creature.name}`} loading="lazy" />
          ) : (
            <div className="ccard__placeholder" aria-hidden="true">
              <span className="ccard__watermark baybayin">{creature.baybayin}</span>
              <Eyes
                size={1.5}
                color={creature.eyes}
                blink={4 + index * 1.3}
                delay={0.3 + index * 0.2}
                className="ccard__eyes"
              />
            </div>
          )}
          <span className="ccard__num">{String(index + 1).padStart(2, '0')}</span>
        </div>

        <div className="ccard__body">
          <p className="ccard__baybayin baybayin" aria-hidden="true">{creature.baybayin}</p>
          <h3 className="ccard__name">{creature.name}</h3>
          <p className="ccard__region">{creature.region}</p>
          <p className="ccard__teaser">{creature.teaser}</p>

          <div className="ccard__reveal">
            <p className="ccard__weak">
              <span>Kahinaan</span>
              {creature.weakness}
            </p>
            <span className="ccard__more">
              Basahin ang kwento <span aria-hidden="true">→</span>
            </span>
          </div>
        </div>
      </Link>
    </article>
  )
}
