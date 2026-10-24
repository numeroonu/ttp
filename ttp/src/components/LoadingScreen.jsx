import { useCallback, useEffect, useRef, useState } from 'react'
import Candle from './Candle'
import Eyes from './Eyes'
import Fog from './Fog'
import './LoadingScreen.css'

/*
 * The "Tabi-tabi po" intro.
 *
 * Timeline (phase numbers):
 *  0  total darkness
 *  1  the candle lights itself
 *  2  Baybayin "ᜆᜊᜒ ᜆᜊᜒ ᜉᜓ" appears
 *  3  "Tabi-tabi po…" writes itself, letter by letter
 *  4  "Makikiraan po kami." + eyes open in the dark
 *  5  the "ask permission" button appears
 *
 * When the visitor clicks, the eyes shut, the flame flares,
 * and the light swallows the screen to reveal the Home page.
 */

const PHASE_TIMES = [500, 1500, 2500, 4300, 5600]
const EXIT_DURATION = 2300

const TITLE = 'Tabi-tabi po…'
// Baybayin for "ta-bi ta-bi po"
const BAYBAYIN = ['ᜆ', 'ᜊᜒ', ' ', 'ᜆ', 'ᜊᜒ', ' ', 'ᜉᜓ']

// Where the eyes appear around the screen (percent of screen)
const EYE_SPOTS = [
  { x: 9, y: 20, size: 0.9, delay: 0, blink: 5 },
  { x: 86, y: 26, size: 1.15, delay: 0.5, blink: 7 },
  { x: 18, y: 74, size: 0.65, delay: 1.1, blink: 4.5 },
  { x: 78, y: 80, size: 0.8, delay: 1.6, blink: 6.5 },
  { x: 47, y: 9, size: 0.5, delay: 2.2, blink: 5.5 },
  { x: 94, y: 58, size: 0.55, delay: 0.8, blink: 8 },
  { x: 4, y: 50, size: 0.7, delay: 1.9, blink: 6 },
  { x: 64, y: 14, size: 0.45, delay: 2.7, blink: 4 },
]

export default function LoadingScreen({ onFinish }) {
  const [phase, setPhase] = useState(0)
  const [leaving, setLeaving] = useState(false)

  // Step through the timeline
  useEffect(() => {
    const timers = PHASE_TIMES.map((t, i) => setTimeout(() => setPhase(i + 1), t))
    return () => timers.forEach(clearTimeout)
  }, [])

  // Lock page scrolling while the intro is on screen
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [])

  // Exit animation, then tell App we're done
  useEffect(() => {
    if (!leaving) return
    const t = setTimeout(onFinish, EXIT_DURATION)
    return () => clearTimeout(t)
  }, [leaving, onFinish])

  const rootRef = useRef(null)

  const enter = useCallback(() => {
    // Center the "hole of light" exactly on the candle flame
    const root = rootRef.current
    const flame = root?.querySelector('.candle__flame')
    if (root && flame) {
      const r = flame.getBoundingClientRect()
      root.style.setProperty('--hx', `${r.left + r.width / 2}px`)
      root.style.setProperty('--hy', `${r.top + r.height / 2}px`)
    }
    setPhase(5)
    setLeaving(true)
  }, [])

  // Press Enter or Space to go in too
  useEffect(() => {
    const onKey = (e) => {
      if (phase >= 5 && !leaving && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault()
        enter()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [phase, leaving, enter])

  const on = (n) => (phase >= n ? 'is-on' : '')

  return (
    <div
      ref={rootRef}
      className={`loader ${leaving ? 'is-leaving' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label="Tabi-tabi po. Ask permission to enter the site."
    >
      <div className="loader__vignette" />
      <Fog density={0.7} className={`loader__fog ${on(1)}`} />

      {/* Eyes watching from the dark */}
      <div className={`loader__eyes ${on(4)}`}>
        {phase >= 4 &&
          EYE_SPOTS.map((e, i) => (
            <Eyes
              key={i}
              size={e.size}
              delay={e.delay}
              blink={e.blink}
              style={{ left: `${e.x}%`, top: `${e.y}%` }}
            />
          ))}
      </div>

      <button type="button" className="loader__skip" onClick={enter}>
        Laktawan <span aria-hidden="true">→</span>
      </button>

      <div className="loader__stage">
        <div className={`loader__candle ${on(1)}`}>
          <Candle size={1.15} lit={phase >= 1} />
        </div>

        <div className="loader__text">
          <p className={`loader__baybayin baybayin ${on(2)}`} aria-hidden="true">
            {BAYBAYIN.map((ch, i) => (
              <span key={i} style={{ '--i': i }}>
                {ch === ' ' ? ' ' : ch}
              </span>
            ))}
          </p>

          <h1 className={`loader__title ${on(3)}`} aria-label={TITLE}>
            {[...TITLE].map((ch, i) => (
              <span key={i} style={{ '--i': i }} aria-hidden="true">
                {ch === ' ' ? ' ' : ch}
              </span>
            ))}
          </h1>

          <p className={`loader__sub ${on(4)}`}>
            Makikiraan po kami.
            <span>Excuse us, we are only passing through.</span>
          </p>

          <div className={`loader__progress ${on(3)}`} aria-hidden="true">
            <span className="loader__progress-line" />
            <span className="loader__progress-label">
              {phase < 5 ? 'Humihingi ng pahintulot sa mga hindi nakikita…' : 'Pinahintulutan ka na.'}
            </span>
          </div>

          <button
            type="button"
            className={`btn loader__enter ${on(5)}`}
            onClick={enter}
            tabIndex={phase >= 5 ? 0 : -1}
          >
            Magpaalam at Pumasok
            <span className="btn__arrow" aria-hidden="true">→</span>
          </button>
          <p className={`loader__hint ${on(5)}`}>Ask permission to enter</p>
        </div>
      </div>
    </div>
  )
}
