import './Candle.css'

/**
 * A flickering candle made with pure CSS.
 * size: number that scales the candle (1 = normal)
 * lit: false shows an unlit candle (used for the "ignite" moment)
 */
export default function Candle({ size = 1, lit = true, className = '' }) {
  return (
    <div
      className={`candle ${lit ? 'is-lit' : ''} ${className}`}
      style={{ '--candle-scale': size }}
      aria-hidden="true"
    >
      <div className="candle__glow" />
      <div className="candle__flame">
        <div className="candle__flame-core" />
      </div>
      <div className="candle__wick" />
      <div className="candle__body">
        <span className="candle__drip candle__drip--1" />
        <span className="candle__drip candle__drip--2" />
        <span className="candle__drip candle__drip--3" />
      </div>
      <div className="candle__base" />
    </div>
  )
}
