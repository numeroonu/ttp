import { useCallback, useEffect, useRef, useState } from 'react'
import Bats from './Bats'
import Candle from './Candle'
import Eyes from './Eyes'
import {
  darkenDrone,
  playBats,
  playBlow,
  playDrone,
  playMatch,
  playWhoosh,
  setIntroMuted,
  startIntroSound,
  stopIntroSound,
  unlockIntroSound,
  whenIntroSoundOn,
} from '../utils/introSound'
import './LoadingScreen.css'

/*
 * The "Tabi-tabi po" intro.
 *
 * Browsers block sound until the visitor clicks or presses a key, so the
 * sound starts on the first click/key press and joins in wherever the intro is.
 *
 * Timeline (phase numbers):
 *  0  total darkness, a swarm of bats flies at the screen and the last one swallows it
 *  1  the candle lights itself
 *  2  Baybayin "ᜆᜊᜒ ᜆᜊᜒ ᜉᜓ" appears
 *  3  "Tabi-tabi po…" writes itself, letter by letter
 *  4  "Makikiraan po kami."
 *  5  the candle is blown out, darkness falls
 *  6  eyes open in the dark
 *  7  the scene ends and the intro enters automatically
 *
 * When the visitor clicks, the eyes shut, the candle relights and flares,
 * and the light swallows the screen to reveal the Home page.
 */

const PHASE_TIMES = [3800, 4700, 5500, 7000, 8500, 10500, 11800]
const LAST_PHASE = PHASE_TIMES.length
const EXIT_DURATION = 1800
const AUTO_ENTER_DELAY = 1200

const TITLE = 'Tabi-tabi po…'
// Baybayin for "ta-bi ta-bi po"
const BAYBAYIN = ['ᜆ', 'ᜊᜒ', ' ', 'ᜆ', 'ᜊᜒ', ' ', 'ᜉᜓ']

// Where the eyes appear around the screen (percent of screen)
const EYE_SPOTS = [
  { x: 9, y: 20, size: 1.6, delay: 0, blink: 3.2, double: true },
  { x: 84, y: 26, size: 2, delay: 0.5, blink: 4.5 },
  { x: 18, y: 74, size: 0.65, delay: 1.1, blink: 2.6 },
  { x: 76, y: 80, size: 1.5, delay: 1.6, blink: 3.8, double: true },
  { x: 47, y: 9, size: 0.5, delay: 2.2, blink: 5.5 },
  { x: 94, y: 58, size: 0.55, delay: 0.8, blink: 2.9 },
  { x: 4, y: 50, size: 0.7, delay: 1.9, blink: 4.2, double: true },
  { x: 64, y: 14, size: 0.45, delay: 2.7, blink: 3.4 },
  { x: 30, y: 12, size: 0.6, delay: 1.4, blink: 2.4 },
  { x: 72, y: 46, size: 0.4, delay: 3.1, blink: 3.6, double: true },
  { x: 26, y: 44, size: 0.45, delay: 2.5, blink: 5 },
  { x: 8, y: 88, size: 1.3, delay: 1.2, blink: 3, double: true },
  { x: 38, y: 92, size: 0.5, delay: 3.4, blink: 4.4 },
  { x: 91, y: 90, size: 0.6, delay: 2, blink: 2.7 },
]

export default function LoadingScreen({ onFinish }) {
  const [phase, setPhase] = useState(0)
  const [leaving, setLeaving] = useState(false)
  const [soundOn, setSoundOn] = useState(false)
  const [muted, setMuted] = useState(false)
  const phaseRef = useRef(0)
  const soundStartedAt = useRef(0)
  useEffect(() => {
    phaseRef.current = phase
  }, [phase])

  // Step through the timeline, and try to start the sound right away
  useEffect(() => {
    startIntroSound()
    const t0 = performance.now()
    let alive = true

    // Once sound is allowed, join in wherever the intro is
    const joinIn = () => {
      if (!alive) return
      removeUnlock()
      soundStartedAt.current = performance.now()
      setSoundOn(true)
      const elapsed = (performance.now() - t0) / 1000
      // The swarm, and the last bat rushing in; both cut dead at the black screen
      if (elapsed < 4.4) {
        playBats(Math.max(0, 0.3 - elapsed), 4.6 - elapsed)
        if (elapsed < 4) playWhoosh(Math.max(0, 3.4 - elapsed), 4.6 - elapsed)
      }
      if (phaseRef.current >= 2) playDrone()
      if (phaseRef.current >= 6) darkenDrone()
    }

    // The first click, tap or key press turns the sound on
    const events = ['pointerdown', 'touchend', 'keydown']
    const removeUnlock = () => events.forEach((e) => window.removeEventListener(e, unlockIntroSound))
    events.forEach((e) => window.addEventListener(e, unlockIntroSound))
    const stopWaiting = whenIntroSoundOn(joinIn)

    const timers = PHASE_TIMES.map((t, i) => setTimeout(() => setPhase(i + 1), t))
    return () => {
      alive = false
      timers.forEach(clearTimeout)
      stopWaiting()
      removeUnlock()
      stopIntroSound(0.3)
    }
  }, [])

  // Sound for each moment of the timeline
  useEffect(() => {
    if (leaving) return
    if (phase === 1) playMatch()
    if (phase === 2) playDrone()
    if (phase === 5) playBlow()
    if (phase === 6) darkenDrone()
  }, [phase, leaving])

  // Sound is on by default. While the browser still blocks it, a click on the
  // button only lets the sound start (it does not mute)
  const toggleMute = () => {
    if (!soundOn || performance.now() - soundStartedAt.current < 600) return
    setIntroMuted(!muted)
    setMuted(!muted)
  }

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
    // Center the "hole of light" on the flame, just above the wick
    // (the flame itself may be shrunk to nothing after the candle went out)
    const root = rootRef.current
    const wick = root?.querySelector('.candle__wick')
    if (root && wick) {
      const r = wick.getBoundingClientRect()
      root.style.setProperty('--hx', `${r.left + r.width / 2}px`)
      root.style.setProperty('--hy', `${r.top - r.height * 1.8}px`)
    }
    playMatch()
    stopIntroSound(2)
    setPhase(LAST_PHASE)
    setLeaving(true)
  }, [])

  useEffect(() => {
    if (phase < LAST_PHASE || leaving) return
    const timer = setTimeout(enter, AUTO_ENTER_DELAY)
    return () => clearTimeout(timer)
  }, [phase, leaving, enter])

  // Press Enter or Space to go in too
  useEffect(() => {
    const onKey = (e) => {
      if (phase >= LAST_PHASE && !leaving && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault()
        enter()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [phase, leaving, enter])

  const on = (n) => (phase >= n ? 'is-on' : '')
  const dark = phase >= 5 && !leaving

  return (
    <div
      ref={rootRef}
      className={`loader ${dark ? 'is-dark' : ''} ${leaving ? 'is-leaving' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label="Tabi-tabi po intro"
    >
      <div className="loader__vignette" />
      {/* Darkness that follows the candle light when it is blown out */}
      <div className="loader__shade" />


      {/* Bats bursting out of the balete tree */}
      {phase < 3 && !leaving && <Bats delay={0.3} />}

      {/* Eyes watching from the dark */}
      <div className={`loader__eyes ${on(6)}`}>
        {phase >= 6 &&
          EYE_SPOTS.map((e, i) => (
            <Eyes
              key={i}
              size={e.size}
              delay={e.delay}
              blink={e.blink}
              double={e.double}
              style={{ left: `${e.x}%`, top: `${e.y}%` }}
            />
          ))}
      </div>

      <button
        type="button"
        className="loader__mute"
        onClick={toggleMute}
        aria-pressed={!muted}
        aria-label={muted ? 'Turn sound on' : 'Turn sound off'}
      >
        {muted ? 'Tunog: off' : 'Tunog: on'}
      </button>

      <button type="button" className="loader__skip" onClick={enter}>
        Laktawan <span aria-hidden="true">→</span>
      </button>

      <div className="loader__stage">
        <div className={`loader__candle ${on(1)}`}>
          <Candle size={1.15} lit={phase >= 1 && !dark} out={dark} />
        </div>

        <div className="loader__text">
          <div className="loader__words">
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
                {phase < LAST_PHASE ? 'Humihingi ng pahintulot sa mga hindi nakikita…' : 'Pinahintulutan ka na.'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
