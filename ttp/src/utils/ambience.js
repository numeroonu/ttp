// Night ambience (wind + crickets) generated live with the Web Audio API.
// No audio files needed. Browsers only allow sound after a click, so this
// only starts when the visitor presses the sound button.

let ctx = null
let master = null
let nodes = null
let cricketTimer = null

function makeWind() {
  const length = ctx.sampleRate * 4
  const buffer = ctx.createBuffer(1, length, ctx.sampleRate)
  const data = buffer.getChannelData(0)
  let last = 0
  for (let i = 0; i < length; i++) {
    const white = Math.random() * 2 - 1
    last = (last + 0.02 * white) / 1.02 // "brown" noise sounds like wind
    data[i] = last * 3.5
  }

  const source = ctx.createBufferSource()
  source.buffer = buffer
  source.loop = true

  const filter = ctx.createBiquadFilter()
  filter.type = 'lowpass'
  filter.frequency.value = 420

  // Slowly change the filter so the wind rises and falls
  const lfo = ctx.createOscillator()
  lfo.frequency.value = 0.07
  const lfoDepth = ctx.createGain()
  lfoDepth.gain.value = 260
  lfo.connect(lfoDepth).connect(filter.frequency)

  const gain = ctx.createGain()
  gain.gain.value = 0.45

  source.connect(filter).connect(gain).connect(master)
  source.start()
  lfo.start()
  return { source, lfo }
}

function chirp() {
  const t = ctx.currentTime
  const pitch = 4200 + Math.random() * 400
  const pan = ctx.createStereoPanner ? ctx.createStereoPanner() : null
  if (pan) {
    pan.pan.value = Math.random() * 1.6 - 0.8
    pan.connect(master)
  }
  for (let k = 0; k < 3; k++) {
    const start = t + k * 0.07
    const osc = ctx.createOscillator()
    const g = ctx.createGain()
    osc.frequency.value = pitch
    g.gain.setValueAtTime(0, start)
    g.gain.linearRampToValueAtTime(0.018, start + 0.012)
    g.gain.linearRampToValueAtTime(0, start + 0.05)
    osc.connect(g).connect(pan || master)
    osc.start(start)
    osc.stop(start + 0.06)
  }
  cricketTimer = setTimeout(chirp, 500 + Math.random() * 1600)
}

export function startAmbience() {
  const AudioCtx = window.AudioContext || window.webkitAudioContext
  if (!AudioCtx) return false
  if (!ctx) ctx = new AudioCtx()
  if (ctx.state === 'suspended') ctx.resume()
  if (nodes) return true

  master = ctx.createGain()
  master.gain.setValueAtTime(0, ctx.currentTime)
  master.gain.linearRampToValueAtTime(0.9, ctx.currentTime + 2.5)
  master.connect(ctx.destination)

  nodes = makeWind()
  chirp()
  return true
}

export function stopAmbience() {
  if (!ctx || !nodes) return
  clearTimeout(cricketTimer)
  const oldMaster = master
  const oldNodes = nodes
  nodes = null
  oldMaster.gain.cancelScheduledValues(ctx.currentTime)
  oldMaster.gain.setValueAtTime(oldMaster.gain.value, ctx.currentTime)
  oldMaster.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.8)
  setTimeout(() => {
    oldNodes.source.stop()
    oldNodes.lfo.stop()
    oldMaster.disconnect()
  }, 900)
}

export function duckAmbience() {
  if (!ctx || !nodes || !master) return () => {}

  const activeMaster = master
  const now = ctx.currentTime
  activeMaster.gain.cancelScheduledValues(now)
  activeMaster.gain.setValueAtTime(activeMaster.gain.value, now)
  activeMaster.gain.linearRampToValueAtTime(0.18, now + 0.08)

  let restored = false
  return () => {
    if (restored || master !== activeMaster || !nodes) return
    restored = true
    const restoreAt = ctx.currentTime
    activeMaster.gain.cancelScheduledValues(restoreAt)
    activeMaster.gain.setValueAtTime(activeMaster.gain.value, restoreAt)
    activeMaster.gain.linearRampToValueAtTime(0.9, restoreAt + 1.5)
  }
}
