import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link, useNavigate } from 'react-router-dom'
import CreatureArtwork from './CreatureArtwork'
import { useFieldNotebook } from '../utils/fieldNotebook'
import { useLanguage } from '../context/useLanguage'
import { getLocalizedCreature } from '../data/creatureTranslations'
import { playJumpscareSound } from '../utils/jumpscareSound'
import { getJumpscareProfile } from '../utils/jumpscareProfile'
import './CreatureCard.css'

/**
 * Creature preview card.
 * - Tilts in 3D toward your cursor
 * - A candle-light glow follows your cursor inside the card
 * - On hover the eyes open wider and the weakness is revealed
 */
export default function CreatureCard({ creature, index = 0 }) {
  const ref = useRef(null)
  const jumpscareTimeoutRef = useRef(null)
  const [isJumpScaring, setIsJumpScaring] = useState(false)
  const [isJumpScareFading, setIsJumpScareFading] = useState(false)
  const navigate = useNavigate()
  const { language, isFilipino } = useLanguage()

  const { encounters, sound } = useFieldNotebook()
  const localized = getLocalizedCreature(creature, language)

  useEffect(() => () => {
    if (jumpscareTimeoutRef.current) clearTimeout(jumpscareTimeoutRef.current)
  }, [])

  const onCardClick = (event) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    event.preventDefault()
    if (jumpscareTimeoutRef.current) return

    const destination = `/creatures#${localized.id}`
    if (!encounters || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      navigate(destination)
      return
    }

    const soundPlayback = sound ? playJumpscareSound(creature) : Promise.resolve()
    const profile = getJumpscareProfile(creature)
    let soundFinished = !sound
    let minimumVisualTimeElapsed = false
    const startFadeIfReady = () => {
      if (soundFinished && minimumVisualTimeElapsed) setIsJumpScareFading(true)
    }
    soundPlayback.then(() => {
      soundFinished = true
      startFadeIfReady()
    })
    setIsJumpScareFading(false)
    setIsJumpScaring(true)
    jumpscareTimeoutRef.current = window.setTimeout(() => {
      minimumVisualTimeElapsed = true
      startFadeIfReady()
    }, profile.duration - profile.fade)
  }

  const finishJumpscare = (event) => {
    if (
      event.target !== event.currentTarget ||
      event.pseudoElement ||
      !isJumpScareFading ||
      !jumpscareTimeoutRef.current
    ) return
    clearTimeout(jumpscareTimeoutRef.current)
    jumpscareTimeoutRef.current = null
    setIsJumpScaring(false)
    setIsJumpScareFading(false)
    navigate(`/creatures#${localized.id}`)
  }

  const onMove = (e) => {
    const el = ref.current
    if (!el || e.pointerType === 'touch' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
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
    <>
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
        onClick={onCardClick}
        aria-label={isFilipino ? `Basahin ang tungkol sa ${localized.name}` : `Read about the ${localized.name}`}
      >
        <div className="ccard__art">
          <CreatureArtwork creature={localized} />
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
    {isJumpScaring && createPortal(
      <div
        className={[
          'ccard__jumpscare',
          `ccard__jumpscare--${getJumpscareProfile(localized).tone}`,
          `ccard__jumpscare--${localized.id}`,
          isJumpScareFading ? 'is-fading' : '',
        ].filter(Boolean).join(' ')}
        onAnimationEnd={finishJumpscare}
        aria-hidden="true"
      >
        {localized.image ? (
          <img src={localized.image} alt="" className="ccard__jumpscare-image" />
        ) : (
          <span className="ccard__jumpscare-fallback baybayin">{localized.baybayin}</span>
        )}
      </div>,
      document.body
    )}
    </>
  )
}
