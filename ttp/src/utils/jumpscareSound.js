import { duckAmbience } from './ambience'

const decodedSounds = new Map()
let audioContext = null

function playSynthesizedSound(context) {
  const master = context.createGain()
  master.gain.value = 0.45
  master.connect(context.destination)

  const now = context.currentTime
  const impact = context.createOscillator()
  const impactGain = context.createGain()
  const impactFilter = context.createBiquadFilter()
  impact.type = 'sawtooth'
  impact.frequency.setValueAtTime(170, now)
  impact.frequency.exponentialRampToValueAtTime(48, now + 0.48)
  impactFilter.type = 'lowpass'
  impactFilter.frequency.value = 520
  impactGain.gain.setValueAtTime(0.0001, now)
  impactGain.gain.linearRampToValueAtTime(0.55, now + 0.015)
  impactGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.5)
  impact.connect(impactFilter).connect(impactGain).connect(master)
  impact.start(now)
  impact.stop(now + 0.52)

  const noiseBuffer = context.createBuffer(1, context.sampleRate * 0.24, context.sampleRate)
  const noiseData = noiseBuffer.getChannelData(0)
  for (let i = 0; i < noiseData.length; i++) {
    noiseData[i] = Math.random() * 2 - 1
  }

  const burst = context.createBufferSource()
  const burstFilter = context.createBiquadFilter()
  const burstGain = context.createGain()
  burst.buffer = noiseBuffer
  burstFilter.type = 'highpass'
  burstFilter.frequency.value = 900
  burstGain.gain.setValueAtTime(0.38, now)
  burstGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.22)
  burst.connect(burstFilter).connect(burstGain).connect(master)
  burst.start(now)

  return context.resume().catch(() => {}).then(
    () => new Promise((resolve) => window.setTimeout(resolve, 520))
  )
}

function loadSound(context, url) {
  let decoded = decodedSounds.get(url)
  if (!decoded) {
    decoded = Promise.resolve()
      .then(() => fetch(url))
      .then((response) => {
        if (!response.ok) throw new Error(`Failed to load scare sound: ${url}`)
        return response.arrayBuffer()
      })
      .then((buffer) => context.decodeAudioData(buffer))
    decodedSounds.set(url, decoded)
    decoded.catch(() => {
      if (decodedSounds.get(url) === decoded) decodedSounds.delete(url)
    })
  }
  return decoded
}

export function playJumpscareSound(creature) {
  const AudioContext = window.AudioContext || window.webkitAudioContext
  if (!AudioContext) return Promise.resolve()

  if (!audioContext || audioContext.state === 'closed') {
    audioContext = new AudioContext()
  }

  const context = audioContext
  const restoreAmbience = duckAmbience()
  const playback = creature?.scareSound
    ? loadSound(context, creature.scareSound)
    .then((buffer) => {
      const source = context.createBufferSource()
      const gain = context.createGain()
      source.buffer = buffer
      source.connect(gain).connect(context.destination)
      return (context.state === 'suspended' ? context.resume() : Promise.resolve())
        .then(() => {
          const startAt = context.currentTime
          const endAt = startAt + buffer.duration
          gain.gain.setValueAtTime(1, startAt)
          gain.gain.setValueAtTime(1, Math.max(startAt, endAt - 0.5))
          gain.gain.linearRampToValueAtTime(0, endAt)
          return new Promise((resolve) => {
            source.addEventListener('ended', resolve, { once: true })
            source.start(startAt)
          })
        })
    })
    .catch(() => playSynthesizedSound(context))
    : playSynthesizedSound(context)

  return playback.then(restoreAmbience, restoreAmbience)
}
