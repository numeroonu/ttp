import { useEffect, useRef, useState } from 'react'
import './Eyes.css'

/**
 * A pair of glowing eyes in the dark.
 * - The pupils follow your cursor.
 * - If shyRadius is set, the eyes close when your light (cursor) gets too close.
 *
 * size: scale of the eyes (1 = normal)
 * delay: seconds before the eyes appear
 * blink: seconds between blinks
 * color: 'red' | 'amber'
 */
export default function Eyes({
  size = 1,
  delay = 0,
  blink = 6,
  color = 'red',
  shyRadius = 0,
  className = '',
  style,
}) {
  const ref = useRef(null)
  const [shy, setShy] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    let raf = 0
    let mx = 0
    let my = 0

    const update = () => {
      raf = 0
      const r = el.getBoundingClientRect()
      const dx = mx - (r.left + r.width / 2)
      const dy = my - (r.top + r.height / 2)
      const dist = Math.hypot(dx, dy) || 1
      const pull = Math.min(1, dist / 220)
      el.style.setProperty('--px', `${((dx / dist) * 3.2 * pull * size).toFixed(2)}px`)
      el.style.setProperty('--py', `${((dy / dist) * 1.2 * pull * size).toFixed(2)}px`)
      if (shyRadius) setShy(dist < shyRadius)
    }

    const onMove = (e) => {
      mx = e.clientX
      my = e.clientY
      if (!raf) raf = requestAnimationFrame(update)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [shyRadius, size])

  return (
    <div
      ref={ref}
      className={`eyes eyes--${color} ${shy ? 'is-shy' : ''} ${className}`}
      style={{ '--s': size, '--d': `${delay}s`, '--blink': `${blink}s`, ...style }}
      aria-hidden="true"
    >
      <div className="eyes__lids">
        <span className="eye"><span className="eye__pupil" /></span>
        <span className="eye"><span className="eye__pupil" /></span>
      </div>
    </div>
  )
}
