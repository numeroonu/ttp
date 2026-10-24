import { useMemo } from 'react'
import { seededRandom } from '../utils/random'
import './Santelmo.css'

/**
 * Floating balls of light. In folklore, the santelmo is a fireball
 * said to be a wandering soul.
 */
export default function Santelmo({ count = 10, seed = 3 }) {
  const orbs = useMemo(() => {
    const r = seededRandom(seed)
    return Array.from({ length: count }, () => ({
      left: `${5 + r() * 90}%`,
      top: `${25 + r() * 65}%`,
      size: 3 + r() * 6,
      dur: 9 + r() * 12,
      delay: -r() * 20,
      dx: `${(r() - 0.5) * 160}px`,
      dy: `${-40 - r() * 140}px`,
      red: r() > 0.75,
    }))
  }, [count, seed])

  return (
    <div className="santelmo" aria-hidden="true">
      {orbs.map((o, i) => (
        <span
          key={i}
          className={`santelmo__orb ${o.red ? 'is-red' : ''}`}
          style={{
            left: o.left,
            top: o.top,
            width: o.size,
            height: o.size,
            animationDuration: `${o.dur}s`,
            animationDelay: `${o.delay}s`,
            '--dx': o.dx,
            '--dy': o.dy,
          }}
        />
      ))}
    </div>
  )
}
