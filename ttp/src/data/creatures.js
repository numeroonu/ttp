/*
 * CREATURE DATA
 * One list that the Home page, the Bestiary, and the Map of Myths can all share.
 *
 * featured: true  -> shows on the Home page (keep it to 4)
 * image           -> put a picture in /public/creatures/ and write its path here,
 *                    e.g. image: '/creatures/aswang.png'. Leave it null to show
 *                    the glowing-eyes placeholder.
 *
 * RESEARCH NOTE: The text below is starter content. Double-check every detail
 * against at least two sources (see our doc) and add them to `sources`.
 * Entries marked todo: true still need full research.
 */

export const creatures = [
  {
    id: 'aswang',
    name: 'Aswang',
    baybayin: 'ᜀᜐ᜔ᜏᜅ᜔',
    island: 'Visayas',
    region: 'Visayas · told across the islands',
    featured: true,
    image: null,
    eyes: 'red',
    teaser:
      'Ayon sa matatanda, the aswang lives among us. A quiet neighbor by day, a shapeshifter by night that hunts in the dark.',
    weakness: 'Garlic, salt, holy water, and the buntot pagi (stingray tail).',
    aral: 'Be careful whom you trust, and stay home after dark.',
    sources: [],
  },
  {
    id: 'manananggal',
    name: 'Manananggal',
    baybayin: 'ᜋᜈᜈᜅ᜔ᜄᜎ᜔',
    island: 'Visayas',
    region: 'Visayas',
    featured: true,
    image: null,
    eyes: 'red',
    teaser:
      'At night she splits her body at the waist, sprouts bat-like wings, and flies off, leaving her lower half hidden behind.',
    weakness: 'Sprinkle salt, ash, or crushed garlic on the lower half so she cannot rejoin it before sunrise.',
    aral: 'Every hidden secret has a weakness.',
    sources: [],
  },
  {
    id: 'tikbalang',
    name: 'Tikbalang',
    baybayin: 'ᜆᜒᜃ᜔ᜊᜎᜅ᜔',
    island: 'Luzon',
    region: 'Luzon · Tagalog regions',
    featured: true,
    image: null,
    eyes: 'amber',
    teaser:
      'A towering creature with the head of a horse and very long limbs, it plays tricks on travelers until they lose their way.',
    weakness: 'Turn your shirt inside out to break its spell and find the path again.',
    aral: 'Respect the forest and never wander off the path.',
    sources: [],
  },
  {
    id: 'kapre',
    name: 'Kapre',
    baybayin: 'ᜃᜉ᜔ᜇᜒ',
    island: 'Luzon',
    region: 'Found across the islands',
    featured: true,
    image: null,
    eyes: 'amber',
    teaser:
      'A dark giant who sits in big old trees like the balete, smoking a huge cigar. Smell tobacco in the woods? He is near.',
    weakness: 'Usually not evil. Show respect and he may leave you alone or even befriend you.',
    aral: 'Old trees have guardians. Ask permission before you disturb them.',
    sources: [],
  },

  // ---- Still to research (for the Bestiary and the Map) ----
  { id: 'wakwak', name: 'Wakwak', island: 'Visayas', todo: true },
  { id: 'tiyanak', name: 'Tiyanak', island: 'Luzon', todo: true },
  { id: 'sigbin', name: 'Sigbin', island: 'Visayas', todo: true },
  { id: 'mambabarang', name: 'Mambabarang', island: 'Visayas', todo: true },
  { id: 'nuno-sa-punso', name: 'Nuno sa Punso', island: 'Luzon', todo: true },
  { id: 'duwende', name: 'Duwende', island: 'Luzon', todo: true },
  { id: 'santelmo', name: 'Santelmo', island: 'Luzon', todo: true },
  { id: 'busaw', name: 'Busaw', island: 'Mindanao', todo: true },
  { id: 'bakunawa', name: 'Bakunawa', island: 'Visayas', todo: true },
]

export const featuredCreatures = creatures.filter((c) => c.featured)
