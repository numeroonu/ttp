import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

import BaleteTree from '../components/BaleteTree'
import Candle from '../components/Candle'
import CreatureCard from '../components/CreatureCard'
import Eyes from '../components/Eyes'
import Fog from '../components/Fog'
import Reveal from '../components/Reveal'
import Santelmo from '../components/Santelmo'
import { creatures, featuredCreatures } from '../data/creatures'
import './Home.css'

const TITLE = 'Tabi-Tabi Po'

// Eyes hiding in the trees of the hero. They close when your light comes near.
const HERO_EYES = [
  { x: 9, y: 46, size: 0.9, blink: 5.5, delay: 0.4 },
  { x: 17, y: 63, size: 0.6, blink: 7, delay: 1.2 },
  { x: 84, y: 40, size: 1.1, blink: 6.2, delay: 0.8 },
  { x: 91, y: 66, size: 0.7, blink: 4.8, delay: 1.6 },
  { x: 74, y: 78, size: 0.5, blink: 8, delay: 2 },
  { x: 27, y: 82, size: 0.45, blink: 5, delay: 2.4 },
]

const EXPLORE = [
  {
    to: '/map',
    num: 'I',
    title: 'Map of Myths',
    filipino: 'Mapa ng mga Alamat',
    text: 'Find out which creatures haunt Luzon, the Visayas, and Mindanao.',
  },
  {
    to: '/superstitions',
    num: 'II',
    title: 'Protection & Superstitions',
    filipino: 'Mga Pamahiin',
    text: 'Salt, garlic, buntot pagi, and why we still say “tabi-tabi po.”',
  },
  {
    to: '/origins',
    num: 'III',
    title: 'Origins',
    filipino: 'Ang Pinagmulan',
    text: 'From the anito and the babaylan to the stories changed by colonization.',
  },
  {
    to: '/modern-legends',
    num: 'IV',
    title: 'Modern Legends',
    filipino: 'Makabagong Alamat',
    text: 'The White Lady of Balete Drive, haunted schools, and Trese.',
  },
]

export default function Home({ ready = true }) {
  const heroRef = useRef(null)

  // Scroll position -> CSS variable (drives parallax and the moon eclipse)
  useEffect(() => {
    const hero = heroRef.current
    if (!hero) return
    let raf = 0
    const update = () => {
      raf = 0
      const y = Math.min(window.scrollY, window.innerHeight * 1.5)
      hero.style.setProperty('--scroll', y.toFixed(1))
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  // Cursor position -> CSS variables (drives the candle light and mouse parallax)
  const onHeroMove = (e) => {
    const hero = heroRef.current
    if (!hero) return
    const r = hero.getBoundingClientRect()
    const x = e.clientX - r.left
    const y = e.clientY - r.top
    hero.style.setProperty('--mx', `${x}px`)
    hero.style.setProperty('--my', `${y}px`)
    hero.style.setProperty('--nx', ((x / r.width) * 2 - 1).toFixed(3))
    hero.style.setProperty('--ny', ((y / r.height) * 2 - 1).toFixed(3))
    hero.classList.add('has-light')
  }

  const scrollToIntro = () => {
    document.getElementById('kababalaghan')?.scrollIntoView({ behavior: 'smooth' })
  }

  const marqueeItems = creatures.map((c) => c.name)

  return (
    <div className={`home ${ready ? 'is-ready' : ''}`}>
      {/* =================== HERO =================== */}
      <section className="hero" ref={heroRef} onPointerMove={onHeroMove}>
        <div className="hero__sky" aria-hidden="true">
          <div className="hero__stars" />
        </div>

        {/* Moon, slowly swallowed by the Bakunawa as you scroll */}
        <div className="hero__moon-wrap layer" aria-hidden="true">
          <div className="hero__moon">
            <div className="hero__moon-shadow" />
          </div>
          <p className="hero__moon-note">
            Ginigising ang Bakunawa…
            <span>the moon-eating serpent stirs</span>
          </p>
        </div>

        <div className="hero__trees hero__trees--back layer" aria-hidden="true">
          <BaleteTree seed={21} color="#17131a" className="tree tree--back-l" />
          <BaleteTree seed={8} color="#17131a" className="tree tree--back-r" />
        </div>

        <Fog density={0.9} />
        <Santelmo count={12} seed={5} />

        <div className="hero__trees hero__trees--front layer" aria-hidden="true">
          <BaleteTree seed={4} color="#050406" className="tree tree--front-l" />
          <BaleteTree seed={13} color="#050406" className="tree tree--front-r" />
        </div>

        {/* Nuno sa punso: a small anthill mound with tiny eyes */}
        <div className="hero__punso" aria-hidden="true">
          <Eyes size={0.35} color="amber" blink={3.5} delay={2.5} shyRadius={90} className="hero__punso-eyes" />
          <span className="hero__punso-note">tabi-tabi po…</span>
        </div>

        {/* Darkness with a candle-light hole that follows your cursor */}
        <div className="hero__darkness" aria-hidden="true" />

        <div className="hero__eyes" aria-hidden="true">
          {HERO_EYES.map((e, i) => (
            <Eyes
              key={i}
              size={e.size}
              blink={e.blink}
              delay={e.delay}
              shyRadius={170}
              style={{ left: `${e.x}%`, top: `${e.y}%` }}
            />
          ))}
        </div>

        <div className="hero__content layer">
          <p className="hero__baybayin baybayin" aria-hidden="true">ᜆᜊᜒ ᜆᜊᜒ ᜉᜓ</p>

          <h1 className="hero__title" aria-label={TITLE}>
            {[...TITLE].map((ch, i) => (
              <span
                key={i}
                aria-hidden="true"
                className={i === 2 || i === 9 ? 'is-dying' : ''}
                style={{ '--i': i }}
              >
                {ch === ' ' ? ' ' : ch}
              </span>
            ))}
          </h1>

          <p className="hero__subtitle">
            Ang Madilim na Alamat ng Pilipinas
            <span>The Dark Folklore of the Philippines</span>
          </p>

          <p className="hero__tagline">
            Bago ka pumasok, magpaalam ka muna.
          </p>

          <div className="hero__actions">
            <Link to="/creatures" className="btn">
              Enter if you dare <span className="btn__arrow" aria-hidden="true">→</span>
            </Link>
            <button type="button" className="btn btn--ghost" onClick={scrollToIntro}>
              Alamin ang Kwento
            </button>
          </div>
        </div>

        <button type="button" className="hero__scroll" onClick={scrollToIntro}>
          <span className="hero__scroll-line" aria-hidden="true" />
          Mag-scroll kung may lakas ng loob
        </button>

        <div className="hero__ground" aria-hidden="true" />
      </section>

      {/* =================== INTRO =================== */}
      <section className="intro" id="kababalaghan">
        <div className="container intro__grid">
          <div className="intro__text">
            <Reveal><p className="kicker">Ang Simula</p></Reveal>
            <Reveal delay={0.1}>
              <h2 className="section-title">
                Ano ang <em>Kababalaghan?</em>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="intro__lead">
                Long before electric lights reached the provinces, Filipinos told stories by the gasera: of
                shapeshifters who walk among us by day, of giants smoking in old trees, of spirits you must greet
                before you pass.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <p className="intro__body">
                These stories are more than scares. They are oral heritage, passed down from our ancestors and
                carrying their beliefs, their fears, and their values. This site is an albularyo’s journal of those
                stories: where they come from, what they warn us about, and why so many of us still whisper
                “tabi-tabi po” today.
              </p>
            </Reveal>

            <Reveal delay={0.4} className="intro__stats">
              <div>
                <strong>{creatures.length}</strong>
                <span>Nilalang</span>
              </div>
              <div>
                <strong>3</strong>
                <span>Kapuluan</span>
              </div>
              <div>
                <strong>∞</strong>
                <span>Kwento</span>
              </div>
            </Reveal>
          </div>

          <div className="intro__notes">
            <Reveal delay={0.2} className="note note--1">
              <span className="note__pin" aria-hidden="true" />
              <p className="note__word">Tabi-tabi po</p>
              <p className="note__def">
                A phrase of respect, like “excuse me, may I pass?” Said when walking past anthills, big trees, or
                dark places, so unseen spirits like the nuno sa punso are not offended.
              </p>
            </Reveal>
            <Reveal delay={0.4} className="note note--2">
              <span className="note__pin" aria-hidden="true" />
              <p className="note__word">Kababalaghan</p>
              <p className="note__def">
                Things strange, wondrous, or supernatural. Events that cannot be explained.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* =================== MARQUEE =================== */}
      <div className="marquee" aria-hidden="true">
        <div className="marquee__track">
          {[0, 1].map((copy) => (
            <div className="marquee__group" key={copy}>
              {marqueeItems.map((name, i) => (
                <span key={`${copy}-${i}`} className={i % 3 === 1 ? 'is-red' : ''}>
                  {name}
                  <i>✦</i>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* =================== FEATURED CREATURES =================== */}
      <section className="featured">
        <div className="container">
          <div className="featured__head">
            <div>
              <Reveal><p className="kicker">Mga Nilalang ng Gabi</p></Reveal>
              <Reveal delay={0.1}>
                <h2 className="section-title">
                  Those Who Wait <em>in the Dark</em>
                </h2>
              </Reveal>
            </div>
            <Reveal delay={0.2}>
              <p className="featured__intro">
                Four of the most feared creatures in Philippine folklore. Hover over them, if you dare, to learn how
                our elders kept them away.
              </p>
            </Reveal>
          </div>

          <div className="featured__grid">
            {featuredCreatures.map((c, i) => (
              <Reveal key={c.id} delay={0.12 * i}>
                <CreatureCard creature={c} index={i} />
              </Reveal>
            ))}
          </div>

          <Reveal className="featured__all">
            <Link to="/creatures" className="btn btn--ghost">
              Buksan ang Talaarawan <span className="btn__arrow" aria-hidden="true">→</span>
            </Link>
            <span>Open the albularyo’s journal to meet all {creatures.length} creatures</span>
          </Reveal>
        </div>
      </section>

      {/* =================== EXPLORE =================== */}
      <section className="explore">
        <div className="container">
          <Reveal><p className="kicker">Galugarin</p></Reveal>
          <Reveal delay={0.1}>
            <h2 className="section-title">
              Go Deeper <em>Into the Dark</em>
            </h2>
          </Reveal>

          <div className="explore__grid">
            {EXPLORE.map((item, i) => (
              <Reveal key={item.to} delay={0.1 * i}>
                <Link
                  to={item.to}
                  className="explore__tile"
                  onPointerMove={(e) => {
                    const r = e.currentTarget.getBoundingClientRect()
                    e.currentTarget.style.setProperty('--tx', `${e.clientX - r.left}px`)
                    e.currentTarget.style.setProperty('--ty', `${e.clientY - r.top}px`)
                  }}
                >
                  <span className="explore__num">{item.num}</span>
                  <span className="explore__fil">{item.filipino}</span>
                  <h3 className="explore__title">{item.title}</h3>
                  <p className="explore__text">{item.text}</p>
                  <span className="explore__arrow" aria-hidden="true">→</span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* =================== FINAL CALL =================== */}
      <section className="finale">
        <Fog density={0.6} />
        <div className="finale__inner">
          <Reveal>
            <Candle size={1} />
          </Reveal>
          <Reveal delay={0.15}>
            <h2 className="finale__title">Handa ka na ba?</h2>
          </Reveal>
          <Reveal delay={0.25}>
            <p className="finale__text">
              The creatures are waiting in the albularyo’s journal. Just remember to ask permission first.
            </p>
          </Reveal>
          <Reveal delay={0.35}>
            <Link to="/creatures" className="btn">
              Enter if you dare <span className="btn__arrow" aria-hidden="true">→</span>
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
