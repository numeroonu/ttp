import { useSyncExternalStore } from 'react'
import { startAmbience, stopAmbience } from './ambience'

const KEY = 'ttp-field-notebook-v1'
const listeners = new Set()
function readNotebook() {
  try {
    const value = JSON.parse(localStorage.getItem(KEY))
    return {
      saved: Array.isArray(value?.saved) ? [...new Set(value.saved.filter((id) => typeof id === 'string'))] : [],
      encounters: value?.encounters === true,
    }
  } catch {
    return { saved: [], encounters: false }
  }
}
let state = { ...readNotebook(), sound: false, persistent: true }
function emit() { listeners.forEach((listener) => listener()) }
function update(patch) {
  state = { ...state, ...patch }
  try {
    localStorage.setItem(KEY, JSON.stringify({ saved: state.saved, encounters: state.encounters }))
    state = { ...state, persistent: true }
  } catch {
    state = { ...state, persistent: false }
  }
  emit()
}
export function toggleSaved(id) {
  update({ saved: state.saved.includes(id) ? state.saved.filter((item) => item !== id) : [...state.saved, id] })
}
export function toggleEncounters() { update({ encounters: !state.encounters }) }
export function toggleSound() {
  if (state.sound) stopAmbience()
  const sound = state.sound ? false : startAmbience()
  state = { ...state, sound }
  emit()
}
function subscribe(listener) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}
export function useFieldNotebook() {
  return useSyncExternalStore(subscribe, () => state)
}
window.addEventListener('storage', (event) => {
  if (event.key === KEY || event.key === null) {
    state = { ...state, ...readNotebook() }
    emit()
  }
})
document.addEventListener('visibilitychange', () => {
  if (document.hidden && state.sound) {
    stopAmbience()
    state = { ...state, sound: false }
    emit()
  }
})
