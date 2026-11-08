import { useLanguage } from '../context/useLanguage'
import { toggleEncounters, toggleSaved, useFieldNotebook } from '../utils/fieldNotebook'

export function EncounterToggle() {
  const { encounters } = useFieldNotebook()
  const { isFilipino } = useLanguage()
  return <button type="button" className="archive-button" aria-pressed={encounters} onClick={toggleEncounters}
    title={isFilipino ? 'Opsyonal na biglang gulat. Ang tunog ay may hiwalay na kontrol.' : 'Optional sudden scares. Sound is controlled separately.'}>
    <span aria-hidden="true">{encounters ? '◈' : '◇'}</span>{' '}
    {isFilipino ? 'Biglang gulat' : 'Scares'}: {encounters ? (isFilipino ? 'Bukas' : 'On') : (isFilipino ? 'Patay' : 'Off')}
  </button>
}

export function SaveCreature({ creature }) {
  const { saved } = useFieldNotebook()
  const { isFilipino } = useLanguage()
  const isSaved = saved.includes(creature.id)
  return <button type="button" className="archive-button" aria-pressed={isSaved} onClick={() => toggleSaved(creature.id)}>
    <span aria-hidden="true">{isSaved ? '◆' : '◇'}</span>{' '}
    {isSaved ? (isFilipino ? 'Nasa aking kuwaderno' : 'Saved in my notebook') : (isFilipino ? 'Itala sa kuwaderno' : 'Save to notebook')}
    <span className="archive-sr-only">: {creature.name}</span>
  </button>
}
