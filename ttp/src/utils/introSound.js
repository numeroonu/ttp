// Sound for the "Tabi-tabi po" intro, played with the Web Audio API.
//
// Real recordings are used when they exist in public/sounds/:
//   bats.mp3    wings flapping + bat squeaks (2-3 seconds)
//   whoosh.mp3  one big wing whoosh rushing at you
//   match.mp3   a match strike / candle catching
//   blow.mp3    someone blowing out a candle
//   eerie.mp3   eerie background sound (loops under the words)
// If one of the first four is missing, a sound made with code is played instead.
// The eerie background only plays from eerie.mp3; without it there is none.
//
// Browsers block sound until the visitor clicks or presses a key on the page.
// startIntroSound() tries anyway; unlockIntroSound() is called on the first
// click/key press. Cues that come while sound is still blocked are skipped.

const FILES = ['bats', 'whoosh', 'match', 'blow', 'eerie']
const EERIE_VOLUME = 0.9

let ctx = null
let master = null
let noise = null
let drone = null
let muted = false
const raw = {} // downloaded files, waiting to be decoded
const decoded = {} // promises of the decoded files (null when a file is missing)
const buffers = {} // decoded files, ready to play

// Start downloading the files early so they are ready by the time the intro needs them
export function preloadIntroSounds() {
  for (const name of FILES) {
    if (raw[name]) continue
    raw[name] = fetch(`/sounds/${name}.mp3`)
      .then((res) => (res.ok ? res.arrayBuffer() : null))
      .catch(() => null)
  }
}

// Start downloading as soon as this file loads
preloadIntroSounds()

export function startIntroSound() {
  if (ctx) return
  const AudioCtx = window.AudioContext || window.webkitAudioContext
  if (!AudioCtx) return
  ctx = new AudioCtx()
  master = ctx.createGain()
  master.gain.value = muted ? 0 : 0.9
  master.connect(ctx.destination)

  const length = ctx.sampleRate * 2
  noise = ctx.createBuffer(1, length, ctx.sampleRate)
  const data = noise.getChannelData(0)
  for (let i = 0; i < length; i++) data[i] = Math.random() * 2 - 1

  preloadIntroSounds()
  const c = ctx
  for (const name of FILES) {
    decoded[name] = raw[name]
      // Decode a copy: decoding uses up the data, and the intro may start more than once
      .then((ab) => (ab ? c.decodeAudioData(ab.slice(0)) : null))
      // Not a real audio file (e.g. the dev server's fallback page): keep the code-made sound
      .catch(() => null)
      .then((buf) => {
        if (buf) buffers[name] = buf
        return buf
      })
  }
  // Works only if the browser allows sound without a click.
  // (When it does not, the browser never answers, so nothing may wait on this.)
  ctx.resume().catch(() => {})
}

// Call from a click or key press: that is when the browser allows sound
export function unlockIntroSound() {
  if (ctx) ctx.resume().catch(() => {})
}

// Runs `callback` once, as soon as sound is actually playing
export function whenIntroSoundOn(callback) {
  const c = ctx
  if (!c) return () => {}
  let done = false
  const check = () => {
    if (done || ctx !== c || c.state !== 'running') return
    done = true
    c.removeEventListener('statechange', check)
    callback()
  }
  c.addEventListener('statechange', check)
  check()
  return () => {
    done = true
    c.removeEventListener('statechange', check)
  }
}

export function isIntroSoundOn() {
  return !!ctx && ctx.state === 'running'
}

export function setIntroMuted(value) {
  muted = value
  if (!ctx) return
  master.gain.cancelScheduledValues(ctx.currentTime)
  master.gain.setTargetAtTime(value ? 0 : 0.9, ctx.currentTime, 0.08)
}

export function stopIntroSound(fade = 1.5) {
  if (!ctx) return
  const c = ctx
  const t = c.currentTime
  master.gain.cancelScheduledValues(t)
  master.gain.setValueAtTime(master.gain.value, t)
  master.gain.linearRampToValueAtTime(0, t + fade)
  ctx = null
  drone = null
  setTimeout(() => c.close(), fade * 1000 + 200)
}

/* ---------- small helpers ---------- */

function noiseSource(at, duration) {
  const src = ctx.createBufferSource()
  src.buffer = noise
  src.loop = true
  src.loopStart = Math.random()
  src.start(at, Math.random())
  if (duration) src.stop(at + duration)
  return src
}

function out(pan = 0) {
  if (!ctx.createStereoPanner) return master
  const p = ctx.createStereoPanner()
  p.pan.value = pan
  p.connect(master)
  return p
}

// Play a recording (from `offset` seconds in); with endGain it swells to that level and is cut dead at cutAt
function playFile(name, at, gainValue, cutAt, endGain = gainValue, offset = 0) {
  const src = ctx.createBufferSource()
  src.buffer = buffers[name]
  const g = ctx.createGain()
  g.gain.setValueAtTime(gainValue, at)
  src.connect(g).connect(master)
  src.start(at, offset)
  if (cutAt) {
    g.gain.linearRampToValueAtTime(endGain, cutAt - 0.03)
    g.gain.linearRampToValueAtTime(0, cutAt)
    src.stop(cutAt + 0.05)
  }
}

/* ---------- the cues ---------- */

// The swarm: flapping and squeaks growing louder, cut dead when the last bat covers the screen
export function playBats(delay, cutAfter) {
  if (!isIntroSoundOn()) return
  const t = ctx.currentTime + delay
  const cut = ctx.currentTime + cutAfter

  // Use the recording; if it is still loading, wait for it and join in at the right point
  const c = ctx
  decoded.bats.then((buf) => {
    if (ctx !== c) return
    if (buf) {
      const now = Math.max(t, c.currentTime)
      // Skip the quiet first moment of the recording
      if (now < cut - 0.2) playFile('bats', now, 0.6, cut, 1.2, 0.3 + (now - t))
    } else {
      makeBats(t, cut)
    }
  })
}

function makeBats(t, cut) {
  // Several flocks of wings, each beating at its own speed, spread left to right
  for (let i = 0; i < 6; i++) {
    const src = noiseSource(t, cut - t + 0.1)
    const band = ctx.createBiquadFilter()
    band.type = 'bandpass'
    band.frequency.value = 700 + i * 260
    band.Q.value = 1.2
    // Gain swings between 0 and 1: one wing beat per cycle
    const flap = ctx.createGain()
    flap.gain.value = 0.5
    const lfo = ctx.createOscillator()
    lfo.type = 'square'
    lfo.frequency.value = 9 + i * 1.7
    const depth = ctx.createGain()
    depth.gain.value = 0.5
    lfo.connect(depth).connect(flap.gain)
    lfo.start(t)
    lfo.stop(cut + 0.1)
    const g = ctx.createGain()
    g.gain.setValueAtTime(0.02, t)
    g.gain.exponentialRampToValueAtTime(0.5, cut - 0.05)
    g.gain.linearRampToValueAtTime(0, cut)
    src.connect(band).connect(flap).connect(g).connect(out(i / 2.5 - 1))
  }
  // High squeaks
  for (let i = 0; i < 16; i++) {
    const at = t + Math.random() * (cut - t - 0.15)
    const osc = ctx.createOscillator()
    osc.frequency.setValueAtTime(7000 + Math.random() * 2500, at)
    osc.frequency.exponentialRampToValueAtTime(3500 + Math.random() * 1500, at + 0.06)
    const g = ctx.createGain()
    const loud = 0.02 + ((at - t) / (cut - t)) * 0.05
    g.gain.setValueAtTime(0, at)
    g.gain.linearRampToValueAtTime(loud, at + 0.01)
    g.gain.exponentialRampToValueAtTime(0.0001, at + 0.07)
    osc.connect(g).connect(out(Math.random() * 1.6 - 0.8))
    osc.start(at)
    osc.stop(at + 0.08)
  }
}

// The last bat rushing into your face, cut to silence at the black screen
export function playWhoosh(delay, cutAfter) {
  if (!isIntroSoundOn()) return
  const t = ctx.currentTime + delay
  const cut = ctx.currentTime + cutAfter

  if (buffers.whoosh) {
    playFile('whoosh', t, 1, cut)
    return
  }
  const src = noiseSource(t, cutAfter - delay + 0.1)
  const lp = ctx.createBiquadFilter()
  lp.type = 'lowpass'
  lp.frequency.setValueAtTime(250, t)
  lp.frequency.exponentialRampToValueAtTime(4000, cut)
  const g = ctx.createGain()
  g.gain.setValueAtTime(0.001, t)
  g.gain.exponentialRampToValueAtTime(0.9, cut - 0.03)
  g.gain.linearRampToValueAtTime(0, cut)
  src.connect(lp).connect(g).connect(master)
}

// The candle catching
export function playMatch() {
  if (!isIntroSoundOn()) return
  const t = ctx.currentTime + 0.05
  if (buffers.match) {
    playFile('match', t, 0.8)
    return
  }
  // Scratch
  const scratch = noiseSource(t, 0.12)
  const hp = ctx.createBiquadFilter()
  hp.type = 'highpass'
  hp.frequency.value = 2500
  const g1 = ctx.createGain()
  g1.gain.setValueAtTime(0.25, t)
  g1.gain.exponentialRampToValueAtTime(0.001, t + 0.12)
  scratch.connect(hp).connect(g1).connect(master)
  // Flame catching: a soft "fff"
  const flame = noiseSource(t + 0.08, 0.9)
  const lp = ctx.createBiquadFilter()
  lp.type = 'lowpass'
  lp.frequency.value = 900
  const g2 = ctx.createGain()
  g2.gain.setValueAtTime(0, t + 0.08)
  g2.gain.linearRampToValueAtTime(0.18, t + 0.2)
  g2.gain.exponentialRampToValueAtTime(0.001, t + 0.95)
  flame.connect(lp).connect(g2).connect(master)
}

// The eerie recording, looping and fading in under the words
export function playDrone() {
  if (!isIntroSoundOn() || drone) return
  const filter = ctx.createBiquadFilter()
  filter.type = 'lowpass'
  filter.frequency.value = 18000
  const g = ctx.createGain()
  g.gain.value = 0
  filter.connect(g).connect(master)
  drone = { filter, gain: g }

  // Wait for the file if it is still loading
  const c = ctx
  decoded.eerie.then((buf) => {
    if (!buf || ctx !== c) return
    const src = c.createBufferSource()
    src.buffer = buf
    src.loop = true
    src.connect(filter)
    src.start()
    // The recording swells in and out by itself; kept low so it stays in the background
    g.gain.value = EERIE_VOLUME
  })
}

// The candle blown out; a weaker puff as the small flame dies
export function playBlow() {
  if (!isIntroSoundOn()) return
  const t = ctx.currentTime
  // Let the blow stand out: the eerie sound dips for a moment
  if (drone) {
    const g = drone.gain.gain
    g.cancelScheduledValues(t)
    g.setValueAtTime(g.value, t)
    g.linearRampToValueAtTime(EERIE_VOLUME * 0.35, t + 0.1)
    g.setValueAtTime(EERIE_VOLUME * 0.35, t + 2)
    g.linearRampToValueAtTime(EERIE_VOLUME, t + 3.5)
  }
  const puff = (at, loud, length) => {
    if (buffers.blow) {
      playFile('blow', at, loud)
      return
    }
    const src = noiseSource(at, length + 0.1)
    const band = ctx.createBiquadFilter()
    band.type = 'bandpass'
    band.frequency.setValueAtTime(900, at)
    band.frequency.exponentialRampToValueAtTime(400, at + length)
    band.Q.value = 0.8
    const g = ctx.createGain()
    g.gain.setValueAtTime(0, at)
    g.gain.linearRampToValueAtTime(loud, at + 0.06)
    g.gain.exponentialRampToValueAtTime(0.001, at + length)
    src.connect(band).connect(g).connect(master)
  }
  puff(t, 0.8, 0.6)
  // The little flame sputtering in the air
  for (let i = 0; i < 6; i++) {
    const at = t + 0.85 + i * 0.13 + Math.random() * 0.06
    const crack = noiseSource(at, 0.03)
    const hp = ctx.createBiquadFilter()
    hp.type = 'highpass'
    hp.frequency.value = 1800
    const g = ctx.createGain()
    g.gain.setValueAtTime(0.08, at)
    g.gain.exponentialRampToValueAtTime(0.001, at + 0.03)
    crack.connect(hp).connect(g).connect(master)
  }
  puff(t + 1.55, 0.2, 0.4)
}

// Eyes opening: the eerie sound turns a little muffled and darker
export function darkenDrone() {
  if (!isIntroSoundOn() || !drone) return
  drone.filter.frequency.setTargetAtTime(1400, ctx.currentTime, 1.5)
}
