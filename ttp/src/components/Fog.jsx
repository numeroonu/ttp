import './Fog.css'

/**
 * Layers of drifting fog. Each layer moves at its own speed.
 * density: 0 to 1, how thick the fog is
 */
export default function Fog({ density = 1, className = '' }) {
  return (
    <div className={`fog ${className}`} style={{ '--fog': density }} aria-hidden="true">
      <div className="fog__layer fog__layer--1" />
      <div className="fog__layer fog__layer--2" />
      <div className="fog__layer fog__layer--3" />
    </div>
  )
}
