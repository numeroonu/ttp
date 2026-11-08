export function playJumpscareSound() {
  const AudioContext = window.AudioContext || window.webkitAudioContext
  if (!AudioContext) return

  const context = new AudioContext()
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

  context.resume().catch(() => {})
  window.setTimeout(() => context.close(), 700)
}
