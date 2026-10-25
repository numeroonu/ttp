import { seededRandom } from '../utils/random'
import BaleteSilhouette from './BaleteSilhouette'
import './Bats.css'

/**
 * A swarm of bats bursting out of a balete tree, all flying straight at
 * the viewer and swooping past on every side.
 *
 * delay: seconds before the swarm appears
 */

function makeBats(count) {
  const rand = seededRandom(17)
  const bats = []
  for (let i = 0; i < count; i++) {
    // Start inside the tree's crown, then fan out as they get closer
    const angle = (i / count) * Math.PI * 2 + rand() * 0.5
    const spread = 2 + rand() * 9
    const x = Math.cos(angle) * spread
    const y = Math.sin(angle) * spread * 0.7
    bats.push({
      x,
      y,
      dx: x * 7,
      dy: y * 7,
      delay: rand() * 0.6,
      duration: 1.6 + rand() * 0.3,
      flap: 0.13 + rand() * 0.06,
      tilt: (rand() - 0.5) * 30,
    })
  }
  return bats
}

const BATS = makeBats(24)

const WING = 'M50 22 C40 10 25 6 3 13 C11 17 13 23 11 30 C18 25 24 27 28 34 C32 28 40 28 47 31 Z'

// Each wing is its own layer so the browser can flap it without redrawing
function BatShape() {
  return (
    <div className="bat__body">
      <svg className="bat__wing" viewBox="0 0 100 50">
        <path d={WING} />
      </svg>
      <svg className="bat__wing" viewBox="0 0 100 50">
        <path d={WING} transform="translate(100 0) scale(-1 1)" />
      </svg>
      <svg viewBox="0 0 100 50">
        <ellipse cx="50" cy="27" rx="5" ry="10" />
        <path d="M46 19 L45 12 L49 17 L51 17 L55 12 L54 19 Z" />
      </svg>
    </div>
  )
}

export default function Bats({ delay = 0, className = '' }) {
  return (
    <div className={`bats ${className}`} style={{ '--delay': `${delay}s` }} aria-hidden="true">
      <div className="bats__glow" />
      {/* In front of the red glow so it shows as a dark shape; gone at the black cut */}
      <BaleteSilhouette className="bats__tree" color="#0a0507" />
      {BATS.map((b, i) => (
        <div
          key={i}
          className="bat"
          style={{
            '--x': `${b.x}vw`,
            '--y': `${b.y}vh`,
            '--dx': `${b.dx}vw`,
            '--dy': `${b.dy}vh`,
            '--bat-delay': `${b.delay}s`,
            '--dur': `${b.duration}s`,
            '--flap': `${b.flap}s`,
            '--tilt': `${b.tilt}deg`,
          }}
        >
          <BatShape />
        </div>
      ))}

      {/* The last bat flies right into your face and swallows the whole screen */}
      <div className="bat bat--final">
        <BatShape />
      </div>
      <div className="bats__blackout" />
    </div>
  )
}
