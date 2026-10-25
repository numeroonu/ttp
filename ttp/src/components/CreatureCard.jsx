import { useRef } from 'react'
import { Link } from 'react-router-dom'
import Eyes from './Eyes'
import { useLanguage } from '../context/useLanguage'
import { getLocalizedCreature } from '../data/creatureTranslations'
import './CreatureCard.css'

/**
 * Creature preview card.
 * - Tilts in 3D toward your cursor
 * - A candle-light glow follows your cursor inside the card
 * - On hover the eyes open wider and the weakness is revealed
 */
export default function CreatureCard({ creature, index = 0 }) {
  const ref = useRef(null)
  const { language, isFilipino } = useLanguage()

  const localized = getLocalizedCreature(creature, language)

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
      <Link
        to={`/creatures#${localized.id}`}
        className="ccard__link"
        aria-label={isFilipino ? `Basahin ang tungkol sa ${localized.name}` : `Read about the ${localized.name}`}
      >
        <div className="ccard__art">
          {localized.image ? (
            <img
              src={localized.image}
              alt={`Illustration of the ${localized.name}`}
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="ccard__placeholder" aria-hidden="true">
              <span className="ccard__watermark baybayin">{localized.baybayin}</span>
              <Eyes
                size={1.5}
                color={localized.eyes}
                blink={4 + index * 1.3}
                delay={0.3 + index * 0.2}
                className="ccard__eyes"
              />
            </div>
          )}
          <span className="ccard__num">{String(index + 1).padStart(2, '0')}</span>
        </div>

        <div className="ccard__body">
          <p className="ccard__baybayin baybayin" aria-hidden="true">{localized.baybayin}</p>
          <h3 className="ccard__name">{localized.name}</h3>
          <p className="ccard__region">{localized.region}</p>
          <p className="ccard__teaser">{localized.teaser}</p>

          <div className="ccard__reveal">
            <p className="ccard__weak">
              <span>{isFilipino ? 'Kahinaan' : 'Weakness'}</span>
              {localized.weakness}
            </p>
            <span className="ccard__more">
              {isFilipino ? 'Basahin ang tala' : 'Read field notes'} <span aria-hidden="true">→</span>
            </span>
          </div>
        </div>
      </Link>
    </article>
  )
}
