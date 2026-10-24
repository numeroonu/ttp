import { useMemo } from 'react'
import { seededRandom } from '../utils/random'

/**
 * A balete tree silhouette drawn with code (no image needed).
 * The balete is a strangler fig: a wide crown, a trunk made of braided
 * roots, and many thin aerial roots hanging down, where the kapre and
 * other spirits are said to live.
 *
 * seed: change it to get a differently shaped tree
 * color: fill color of the silhouette
 */
export default function BaleteTree({ seed = 7, color = '#050406', className = '', style }) {
  const shape = useMemo(() => {
    const r = seededRandom(seed)

    // Crown: many overlapping leaf clusters
    const blobs = []
    for (let i = 0; i < 46; i++) {
      const x = 20 + r() * 560
      const edge = Math.abs(x - 300) / 300
      blobs.push({
        x,
        y: 70 + r() * 150 + edge * edge * 140,
        rad: 38 + r() * 72 * (1 - edge * 0.45),
      })
    }

    // Small leaf clumps around the edge so the crown doesn't look like smooth bubbles
    const edge = blobs.slice()
    for (const b of edge) {
      const clumps = 4 + Math.floor(r() * 4)
      for (let k = 0; k < clumps; k++) {
        const a = r() * Math.PI * 2
        blobs.push({
          x: b.x + Math.cos(a) * b.rad * 0.92,
          y: b.y + Math.sin(a) * b.rad * 0.92,
          rad: 6 + r() * 16,
        })
      }
    }

    // Trunk: braided strands that twist into one trunk
    const strands = []
    for (let i = 0; i < 9; i++) {
      const top = 255 + r() * 40
      const xTop = 250 + r() * 100
      const xBottom = 205 + r() * 190
      const twist = (r() - 0.5) * 90
      strands.push({
        d: `M${xTop} ${top} C ${xTop + twist} ${top + 220}, ${xBottom - twist} ${top + 430}, ${xBottom} 905`,
        w: 14 + r() * 22,
      })
    }

    // Branches reaching out to the crown
    const branches = []
    for (let i = 0; i < 7; i++) {
      const side = i % 2 === 0 ? -1 : 1
      const len = 110 + r() * 170
      const y = 230 + r() * 70
      branches.push({
        d: `M300 ${y + 40} Q ${300 + side * len * 0.5} ${y + 10 - r() * 50}, ${300 + side * len} ${y - 40 - r() * 60}`,
        w: 6 + r() * 12,
      })
    }

    // Hanging aerial roots
    const roots = []
    for (let i = 0; i < 64; i++) {
      const x = 60 + r() * 480
      const near = 1 - Math.min(1, Math.abs(x - 300) / 260)
      const y0 = 230 + r() * 80
      const len = 160 + r() * (260 + near * 420)
      const sway = (r() - 0.5) * 34
      roots.push({
        d: `M${x.toFixed(1)} ${y0.toFixed(1)} C ${(x + sway).toFixed(1)} ${(y0 + len * 0.35).toFixed(1)}, ${(x - sway).toFixed(1)} ${(y0 + len * 0.7).toFixed(1)}, ${(x + sway * 0.4).toFixed(1)} ${(y0 + len).toFixed(1)}`,
        w: 0.8 + r() * 2.8,
        o: 0.5 + r() * 0.5,
        sway: 2 + r() * 4,
        dur: 5 + r() * 5,
      })
    }

    return { blobs, strands, branches, roots }
  }, [seed])

  return (
    <svg
      className={className}
      style={style}
      viewBox="0 0 600 900"
      preserveAspectRatio="xMidYMax meet"
      aria-hidden="true"
      focusable="false"
    >
      <g fill={color}>
        {shape.blobs.map((b, i) => (
          <circle key={i} cx={b.x} cy={b.y} r={b.rad} />
        ))}
      </g>
      <g stroke={color} fill="none" strokeLinecap="round">
        {shape.branches.map((b, i) => (
          <path key={i} d={b.d} strokeWidth={b.w} />
        ))}
        {shape.strands.map((s, i) => (
          <path key={i} d={s.d} strokeWidth={s.w} />
        ))}
        {shape.roots.map((root, i) => (
          <path
            key={i}
            d={root.d}
            strokeWidth={root.w}
            opacity={root.o}
            className="balete-root"
            style={{ '--sway': `${root.sway}px`, '--dur': `${root.dur}s` }}
          />
        ))}
      </g>
    </svg>
  )
}
