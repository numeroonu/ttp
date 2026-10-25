import { useMemo } from 'react'
import { seededRandom } from '../utils/random'

/**
 * A full balete tree as a solid silhouette: a wide dome crown, a thick
 * trunk of braided roots with a flared base, and aerial roots hanging
 * from the branches to the ground. Used inside the blood moon of the intro.
 *
 * seed: change it to get a differently shaped tree
 * color: fill color of the silhouette
 */
export default function BaleteSilhouette({ seed = 5, color = '#000', className = '', style }) {
  const shape = useMemo(() => {
    const r = seededRandom(seed)

    // Dome crown: big leaf clusters, higher in the middle
    const blobs = []
    for (let i = 0; i < 110; i++) {
      const x = 40 + r() * 520
      const t = (x - 300) / 260
      const top = 75 + t * t * 110
      blobs.push({
        x,
        y: top + r() * (215 - top + Math.abs(t) * 25),
        rad: 22 + r() * 30 * (1 - Math.abs(t) * 0.3),
      })
    }

    // Small leaf clumps around every cluster so the edge looks leafy
    for (const b of blobs.slice()) {
      const clumps = 6 + Math.floor(r() * 5)
      for (let k = 0; k < clumps; k++) {
        const a = r() * Math.PI * 2
        blobs.push({
          x: b.x + Math.cos(a) * b.rad * 0.95,
          y: b.y + Math.sin(a) * b.rad * 0.95,
          rad: 3 + r() * 8,
        })
      }
    }

    // Branches spreading from the trunk into the crown
    const branches = []
    for (let i = 0; i < 10; i++) {
      const side = i % 2 === 0 ? -1 : 1
      const reach = 80 + r() * 170
      const y = 230 + r() * 30
      branches.push({
        d: `M${300 + side * 12} ${y + 80} Q ${300 + side * reach * 0.5} ${y + 20}, ${300 + side * reach} ${y - 20 - r() * 40}`,
        w: 7 + r() * 11,
      })
    }

    // Trunk: many root strands braiding down and flaring out at the bottom
    const strands = []
    for (let i = 0; i < 18; i++) {
      const xTop = 262 + r() * 76
      const xBottom = 205 + r() * 190
      const twist = (r() - 0.5) * 40
      strands.push({
        d: `M${xTop} 235 C ${xTop + twist} 360, ${300 + (xBottom - 300) * 0.35 - twist} 460, ${xBottom} 556`,
        w: 5 + r() * 11,
      })
    }

    // Buttress roots creeping over the ground
    const spurs = []
    for (let i = 0; i < 12; i++) {
      const side = i % 2 === 0 ? -1 : 1
      const x0 = 300 + side * (30 + r() * 50)
      const x1 = 300 + side * (100 + r() * 130)
      spurs.push({
        d: `M${x0} ${500 + r() * 25} Q ${(x0 + x1) / 2 - side * 10} ${548 + r() * 6}, ${x1} ${558 + r() * 3}`,
        w: 3 + r() * 6,
      })
    }

    // Aerial roots hanging straight down from the crown
    const roots = []
    for (let i = 0; i < 60; i++) {
      const x = 80 + r() * 440
      const y0 = 215 + r() * 40
      const wiggle = (r() - 0.5) * 14
      const reachesGround = Math.abs(x - 300) < 150 || r() > 0.55
      const y1 = reachesGround ? 562 : y0 + 80 + r() * 160
      roots.push({
        d: `M${x.toFixed(1)} ${y0.toFixed(1)} C ${(x + wiggle).toFixed(1)} ${(y0 + (y1 - y0) * 0.4).toFixed(1)}, ${(x - wiggle).toFixed(1)} ${(y0 + (y1 - y0) * 0.7).toFixed(1)}, ${x.toFixed(1)} ${y1.toFixed(1)}`,
        w: 0.8 + r() * 2.6,
      })
    }

    return { blobs, branches, strands, spurs, roots }
  }, [seed])

  return (
    <svg className={className} style={style} viewBox="0 0 600 600" aria-hidden="true" focusable="false">
      <g fill={color}>
        {shape.blobs.map((b, i) => (
          <circle key={i} cx={b.x} cy={b.y} r={b.rad} />
        ))}
        {/* Solid core of the trunk so it reads as thick */}
        <path d="M272 230 C 270 350, 264 440, 238 530 Q 300 548 362 530 C 336 440, 330 350, 328 230 Z" />
        <ellipse cx="300" cy="559" rx="200" ry="4" />
      </g>
      <g stroke={color} fill="none" strokeLinecap="round">
        {[...shape.branches, ...shape.strands, ...shape.spurs, ...shape.roots].map((p, i) => (
          <path key={i} d={p.d} strokeWidth={p.w} />
        ))}
      </g>
    </svg>
  )
}
