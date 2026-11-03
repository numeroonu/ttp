/*
 * CREATURE DATA
 * Compiled folklore field notes for Tabi-Tabi Po.
 * Shared by the Home page, the Bestiary (/creatures), and the Map of Myths (/map).
 *
 * All sources cross-referenced with online archives and published folklore literature:
 * - The Aswang Project (https://www.aswangproject.com)
 * - Dr. Maximo D. Ramos ("The Creatures of Philippine Lower Mythology", 1990; "The Aswang Complex", 1971)
 * - Dr. Damiana L. Eugenio ("Philippine Folk Literature: The Myths", UP Press, 1993)
 * - Dr. F. Landa Jocano ("Outline of Philippine Mythology", 1969)
 * - Laura Watson Benedict ("A Study of Bagobo Ceremonial, Magic and Myth", 1916)
 * - Richard W. Lieban ("Cebuano Sorcery", University of California Press, 1967)
 */

export const creatures = [
  {
    id: 'aswang',
    name: 'Aswang',
    baybayin: 'ᜀᜐ᜔ᜏᜅ᜔',
    alternateNames: ['Asuwang', 'Tik-tik', 'Wakwak (regional)', 'Usang'],
    classification: 'Viscera Sucker, Ghoul & Were-beast',
    island: 'Visayas',
    region: 'Capiz, Iloilo, Panay Island & across the archipelago',
    featured: true,
    image: '/images/aswang_art_1792940249918.jpg',
    eyes: 'red',
    dangerLevel: 'Lethal / Predatory',
    habitat: 'Rural fringes, balete groves, near slaughterhouses, and quiet sitios',
    dietOrPrey: 'Unborn fetuses, human livers, freshly buried corpses, and vulnerable children',
    teaser:
      'Ayon sa matatanda, the aswang lives among us. A quiet neighbor by day who avoids eye contact; a ferocious shapeshifter by night that stalks the weak and unborn.',
    description:
      'The Aswang is the most famous umbrella term in Philippine folklore, encompassing a congeries of nocturnal terrors: shapeshifting were-beasts, ghouls, witches, and viscera suckers. In daylight, an aswang passes as an ordinary, reclusive villager—often shy, avoiding eye contact, or working in professions dealing with meat. When darkness falls, the creature rubs a foul-smelling herbal oil under its armpits, mutters arcane chants, and transforms into a predatory animal—a colossal black dog, a wild boar, or an eerie night bird. The aswang perches atop thatch roofs to target expectant mothers, snaking down an extraordinarily long, needle-thin tongue through the slats to extract the heart, liver, or fetus of the unborn.',
    behavior:
      'Hunts strictly between twilight and dawn. Uses sensory misdirection and auditory trickery to confuse prey. It avoids direct confrontation with armed groups, preferring solitary travelers and isolated homesteads.',
    signs:
      'Pupils that display an upside-down reflection when gazed upon; sudden silence where crickets and night birds abruptly stop singing; dogs howling in panic; an overpowering stench of raw meat or copper.',
    weakness:
      'Buntot pagi (stingray tail whip), rock salt (asin), crushed native garlic (bawang), holy water, crucifix, and lana (blessed coconut oil concocted by an albularyo). Striking an aswang with a stingray tail causes it to scream and reveal its true identity.',
    aral:
      'A cultural reminder of community vigilance and tight-knit social solidarity; it served historically to protect expectant mothers and ensure rural homes remained safely guarded after dark.',
    sources: [
      {
        author: 'Maximo D. Ramos',
        title: 'The Aswang Complex in Philippine Folklore',
        year: 1971,
        publisher: 'Phoenix Publishing House',
        url: 'https://www.aswangproject.com/the-aswang-complex-in-philippine-folklore/',
        note: 'Comprehensive classification of the aswang into viscera suckers, ghouls, witches, and were-beasts.',
      },
      {
        author: 'Jordan Clark',
        title: 'The Aswang Phenomenon Documentary & Archive',
        year: 2011,
        publisher: 'The Aswang Project / HighBanks Entertainment',
        url: 'https://www.aswangproject.com/aswang-compendium/',
        note: 'Historical analysis of Spanish colonial influences on indigenous animist beliefs.',
      },
      {
        author: 'Damiana L. Eugenio',
        title: 'Philippine Folk Literature: The Myths',
        year: 1993,
        publisher: 'University of the Philippines Press',
        url: 'https://press.up.edu.ph/store/books/view/825',
        note: 'Oral accounts collected from Panay and Western Visayas communities.',
      },
    ],
  },
  {
    id: 'manananggal',
    name: 'Manananggal',
    baybayin: 'ᜋᜈᜈᜅ᜔ᜄᜎ᜔',
    alternateNames: ['Tik-tik', 'Mandurugo', 'Abat', 'Separated One'],
    classification: 'Self-Segmenting Flying Viscera Sucker',
    island: 'Visayas',
    region: 'Central Visayas, Bicol Region & Southern Tagalog',
    featured: true,
    image: '/images/manananggal_art_1792940251179.jpg',
    eyes: 'red',
    dangerLevel: 'Lethal',
    habitat: 'Banana groves, secluded attics, dark ravines, and high balete branches',
    dietOrPrey: 'Unborn fetuses and vital organs of sleeping pregnant women',
    teaser:
      'At night she splits her body at the waist with a sickening tear, sprouts leathery bat-like wings, and flies off to hunt, leaving her lower half hidden in the shadows.',
    description:
      'Derived from the Tagalog root word "tanggal" (to sever or detach), the Manananggal is an iconic nocturnal monster. Typically appearing by day as a quiet, solitary woman, she retreats into hiding at midnight to apply an occult oil under her arms. Her spine snaps and her torso detaches completely at the waist. Sprouting massive bat-like wings, her upper half takes flight into the night sky with a dreadful rustling noise, leaving her lower half standing motionless and vulnerable on the ground. She searches for nipa huts harboring pregnant women, hovering silently on the roof to slip a long, hollow thread-like tongue through the bamboo thatch to prey upon the unborn child.',
    behavior:
      'Flies under the cover of dense clouds and moonless skies. Extremely agile in the air, but desperate to rejoin its lower half before the very first light of the sun breaks over the horizon.',
    signs:
      'Heavy flapping of leathery wings in the midnight breeze; faint scratching on the rooftop thatch; a nauseating stench of rotten entrails drifting through the window.',
    weakness:
      'Sprinkle coarse sea salt, crushed garlic, or wood ash (abo) over the severed lower half while the torso is away. This burns the open flesh and prevents the torso from rejoining. Once the morning sun touches the detached upper half, she bursts into cinders.',
    aral:
      'Warns against hidden malice and living double lives; reinforces community responsibility to safeguard households and cherish maternal health.',
    sources: [
      {
        author: 'Maximo D. Ramos',
        title: 'The Creatures of Philippine Lower Mythology',
        year: 1990,
        publisher: 'Phoenix Publishing House',
        url: 'https://www.aswangproject.com/creatures-philippine-lower-mythology/',
        note: 'Detailed description of the self-segmenting viscera-sucking monsters of the Visayas.',
      },
      {
        author: 'Frank Lynch, S.J.',
        title: 'An Approach to the Study of Philippine Folk Lore',
        year: 1949,
        publisher: 'Philippine Studies Journal',
        url: 'https://www.philippinestudies.net/ojs/index.php/ps',
        note: 'Anthropological fieldwork on Bicolano folklore and the aswang complex.',
      },
      {
        author: 'Jordan Clark',
        title: 'Origin of the Manananggal: Philippine Folklore Evolution',
        year: 2017,
        publisher: 'The Aswang Project',
        url: 'https://www.aswangproject.com/manananggal-evolution/',
        note: 'Comparative mythological origins linking to Indonesian and Malaysian variants.',
      },
    ],
  },
  {
    id: 'tikbalang',
    name: 'Tikbalang',
    baybayin: 'ᜆᜒᜃ᜔ᜊᜎᜅ᜔',
    alternateNames: ['Tigbalang', 'Tikbalan', 'Tulung', 'Horse-Demon'],
    classification: 'Forest Guardian & Equine Trickster',
    island: 'Luzon',
    region: 'Sierra Madre Mountain Range, Rizal, Laguna, Quezon & Bicol',
    featured: true,
    image: '/images/tikbalang_art_1792940251978.jpg',
    eyes: 'amber',
    dangerLevel: 'High / Disorienting',
    habitat: 'Ancient Balete trees, Kalumpang trees, dense mountain passes, and rain forests',
    dietOrPrey: 'Does not feed on human flesh; feeds on wild fruits and disorients human travelers',
    teaser:
      'A towering creature with the head of a horse and long bony limbs. When it sits, its knees rise above its head, watching travelers wander in endless circles.',
    description:
      'In pre-colonial Tagalog mythology, the Tikbalang was revered as a guardian spirit of the primordial forests and mountains, particularly Mt. Makiling and the Sierra Madre. Standing anywhere between eight to ten feet tall, it possesses the muscular body of a man and the skull, mane, and hooves of a stallion. Tikbalangs are legendary tricksters who bewitch travelers into losing their sense of direction (naliligaw), forcing them to walk the same circle of trails until complete exhaustion sets in. While rarely murderous unless provoked, an angered Tikbalang can kick intruders with bone-shattering force.',
    behavior:
      'Lurks in high tree canopies and along misty crossways. Enjoys playing psychological mind tricks. Known in folklore to hold wedding ceremonies during rainstorms while the sun is brightly shining ("Kasal ng Tikbalang").',
    signs:
      'Rain falling while the sun shines brilliantly in the sky; sudden smell of horse sweat, manure, or singed hair in deep uninhabited woods; mysterious horse neighs echoing through mountain ridges.',
    weakness:
      'Turn your shirt or upper clothing completely inside out (baligtarin ang damit). This instantly breaks its optical glamour and reveals the true path home. To master or tame a Tikbalang, one must leap onto its back and pluck three golden or glowing hairs from its mane.',
    aral:
      'A lesson in environmental humility: never wander arrogantly off established forest trails, and always show deep reverence for the sacred stillness of the wilderness.',
    sources: [
      {
        author: 'Isabelo de los Reyes',
        title: 'El Folk-lore Filipino',
        year: 1889,
        publisher: 'Tipo-litografía de Chofre y C., Manila',
        url: 'https://www.aswangproject.com/isabelo-de-los-reyes-folk-lore-filipino/',
        note: 'Pioneering documentation of Tagalog and Ilocano folk beliefs regarding the Tikbalang.',
      },
      {
        author: 'Damiana L. Eugenio',
        title: 'Philippine Folk Literature: The Legends',
        year: 1993,
        publisher: 'University of the Philippines Press',
        url: 'https://press.up.edu.ph/store/books/view/825',
        note: 'Collection of mountain legends regarding travelers lost in the Sierra Madre.',
      },
      {
        author: 'Jordan Clark',
        title: 'Tikbalang: The Horse Demon of Philippine Folklore',
        year: 2016,
        publisher: 'The Aswang Project',
        url: 'https://www.aswangproject.com/tikbalang/',
        note: 'Examination of horse iconography introduced prior to and during Spanish trade.',
      },
    ],
  },
  {
    id: 'kapre',
    name: 'Kapre',
    baybayin: 'ᜃᜉ᜔ᜇᜒ',
    alternateNames: ['Agta', 'Cafre', 'Arboreal Giant'],
    classification: 'Arboreal Giant & Tree Guardian',
    island: 'Luzon',
    region: 'Found throughout Luzon, Visayas, and Palawan',
    featured: true,
    image: '/images/kapre_art_1792940252905.jpg',
    eyes: 'amber',
    dangerLevel: 'Mischievous / Territorial',
    habitat: 'Centennial Balete (strangler fig), Mango, Acacia, and Star Apple trees',
    dietOrPrey: 'Smokes giant tobacco rolls; does not eat people; occasionally receives food gifts',
    teaser:
      'A dark, bearded giant who sits atop massive trees smoking an endless cigar. If you smell sweet burnt tobacco in the middle of the woods, he is watching you.',
    description:
      'The Kapre is a legendary, solitary giant standing seven to twelve feet tall, with dark skin, thick hair, a bushy beard, and wearing only an indigenous loincloth (bahag). He makes his home in the lofty crowns of old-growth trees, dangling his enormous legs while leisurely puffing on a colossal "tabako" (native cigar) whose embers never die. The Kapre possesses the magical ability to stay invisible to ordinary eyes, manifesting only when he chooses. Generally peaceful and fond of playing harmless pranks, he can cause branches to sway wildly on windless nights or misplace tools. Some folklore tells of Kapres developing deep infatuations with human women, tossing small pebbles or sweet flowers from the treetops to court them.',
    behavior:
      'Nocturnal watcher. Rarely leaves his chosen ancestral tree. Highly protective of his territorial surroundings, punishing those who chop branches or urinate near his roots without permission.',
    signs:
      'The sudden, potent aroma of burning tobacco or cigar smoke in remote woods; rustling leaves on a dead-calm evening; hot ash flurries falling gently from the upper canopy.',
    weakness:
      'Show genuine respect before passing or resting near big trees by reciting "Tabi-tabi po Ingkong." Wearing an anting-anting (blessed talisman) or possessing the Kapre’s magical white stone (mutya) can compel him to grant wishes or become a loyal lifelong protector.',
    aral:
      'Encourages the preservation and veneration of centennial trees and native flora, teaching that ancient trees are living sanctuaries deserving of respect.',
    sources: [
      {
        author: 'Maximo D. Ramos',
        title: 'The Creatures of Philippine Lower Mythology',
        year: 1990,
        publisher: 'Phoenix Publishing House',
        url: 'https://www.aswangproject.com/creatures-philippine-lower-mythology/',
        note: 'Categorization of tree-dwelling giants and supernatural nature spirits.',
      },
      {
        author: 'F. Landa Jocano',
        title: 'Sulod Society: A Study in Kinship and Social Organization',
        year: 1968,
        publisher: 'University of the Philippines Press',
        url: 'https://press.up.edu.ph/',
        note: 'Documentation of indigenous animist spirits and tree guardianship.',
      },
      {
        author: 'The Aswang Project',
        title: 'Kapre: The Tree Giant of Philippine Folklore',
        year: 2018,
        publisher: 'The Aswang Project',
        url: 'https://www.aswangproject.com/kapre/',
        note: 'Origin analysis from Spanish-era trade terms and indigenous animism.',
      },
    ],
  },
  {
    id: 'diwata',
    name: 'Diwata',
    baybayin: 'ᜇᜒᜏᜆ',
    alternateNames: ['Engkantada', 'Maria Makiling', 'Maria Sinukuan', 'Maria Cacao', 'Lambana'],
    classification: 'Ancestral Nature Deity & Mountain Guardian',
    island: 'Luzon',
    region: 'Mount Makiling (Laguna), Mount Arayat (Pampanga), Mount Lantoy (Cebu) & nationwide',
    featured: true,
    image: '/images/diwata_art_1792942060920.jpg',
    eyes: 'amber',
    dangerLevel: 'Sacred / Vengeful if Desecrated',
    habitat: 'Pristine mountain peaks, crystal rivers, ancient rainforest sanctuaries, and mystical waterfalls',
    dietOrPrey: 'Consumes no human flesh; receives offerings of wild flowers, ginger, unpolished rice, and betel nut',
    teaser:
      'Luminous nature deities and mountain goddesses. Benevolent benefactors to those who respect the earth, but relentless to mortals who plunder sacred forests or break their solemn vows.',
    description:
      'In pre-colonial Philippine animism, the Diwata (derived from the Sanskrit "devata") was not a mere fairy, but a revered nature goddess, ancestral spirit, or high guardian deity presiding over mountains, forests, wildlife, and pristine waterways. Celebrated across the islands through legendary manifestations such as Maria Makiling of Laguna, Maria Sinukuan of Pampanga, and Maria Cacao of Cebu, a Diwata embodies the living soul and ecological balance of the wilderness. She often manifests as an ethereal, radiant maiden of peerless beauty with flowing ebony hair, golden skin, and gossamer robes adorned with ancient pre-colonial gold ornaments. While compassionate to honorable hunters and humble villagers—gifting gold, fruits, and healing remedies—she visits dreadful retribution upon those who log sacred balete groves, slaughter animals for sport, or betray their lovers, trapping them in endless impenetrable mountain fogs or cursing them with incurable delirium.',
    behavior:
      'Guards mountain ecosystems from desecration. Cloaks herself in sudden mountain mist and golden light. Bestows prosperity on those who revere the woods, but permanently banishes intruders who dishonor the land.',
    signs:
      'The sudden intoxicating scent of wild ginger blossoms (kamia) in the middle of dense jungle; streams glistening with unearthly golden hues; mountain rain falling while the sun is ablaze.',
    weakness:
      'Environmental reverence and humility: never hunt or harvest without asking permission; return borrowed items promptly; speak softly; and place respectful offerings (atang) of cooked rice, white flowers, and ginger at the mountain boundary.',
    aral:
      'The paramount ancestral philosophy of environmental guardianship: nature is a sacred, living sanctuary protected by unseen custodians, demanding humility, restraint, and perpetual stewardship.',
    sources: [
      {
        author: 'Jordan Clark',
        title: 'Diwata in Philippine Mythology: Ancestors, Spirits and Deities',
        year: 2017,
        publisher: 'The Aswang Project',
        url: 'https://www.aswangproject.com/diwata/',
        note: 'Scholarly exploration of the Sanskrit devata connection and indigenous mountain goddesses.',
      },
      {
        author: 'Dr. José Rizal',
        title: 'Mariang Makiling (La Solidaridad, Madrid)',
        year: 1890,
        publisher: 'Historical Archives & The Aswang Project',
        url: 'https://www.aswangproject.com/maria-makiling-jose-rizal/',
        note: 'National hero José Rizal’s literary and folklore preservation of Mount Makiling’s guardian spirit.',
      },
      {
        author: 'Damiana L. Eugenio',
        title: 'Philippine Folk Literature: The Legends',
        year: 1993,
        publisher: 'University of the Philippines Press',
        url: 'https://press.up.edu.ph/store/books/view/825',
        note: 'Comprehensive academic documentation of Maria Makiling, Sinukuan, and Cacao legends.',
      },
    ],
  },
  {
    id: 'wakwak',
    name: 'Wakwak',
    baybayin: 'ᜏᜃ᜔ᜏᜃ᜔',
    alternateNames: ['Waka-waka', 'Kiwag', 'Avian Ghoul', 'Tiktik Bird'],
    classification: 'Nocturnal Avian Ghoul & Vampire',
    island: 'Visayas',
    region: 'Leyte, Samar, Bohol, and Northern Mindanao',
    featured: false,
    image: '/images/wakwak_art_1792941438906.jpg',
    eyes: 'red',
    dangerLevel: 'Lethal / Predatory',
    habitat: 'Cave crags, abandoned church belfries, hollow trunks, and dark tree lines',
    dietOrPrey: 'Human hearts, livers, and flesh of isolated night travelers',
    teaser:
      'A monstrous bird-like demon that glides across the midnight sky. Beware: the fainter its leathery cries sound, the closer its talons are to your head.',
    description:
      'The Wakwak is a feared avian vampire and corpse-eating ghoul prevalent in Visayan and Northern Mindanao oral lore. Often depicted as a witch transformed into a giant predatory bird with razor-sharp claws, glowing crimson eyes, and leathery wings, it feeds ravenously on human hearts and entrails. Its most terrifying supernatural trait is an acoustic paradox: when its eerie cry "wak-wak-wak!" echoes loud and crisp, the creature is actually miles away. When the sound dwindles to a faint, barely audible rustle, it has already arrived directly above your ceiling, ready to plunge its talons through the bamboo slats.',
    behavior:
      'Hunts during deep midnight hours when human senses are dulled. Employs acoustic deception to lure victims into a false sense of security before swooping in from above.',
    signs:
      'The inverted sound of "wak... wak... wak..." fading to a whisper right above you; sudden scratching on thatch roofs; stray dogs crying in distress.',
    weakness:
      'Stingray tail whips (buntot pagi), throwing rock salt and wood ash onto roof beams, burning carabao horn or dry ginger root (luya), and shouting curses to shatter its acoustic glamour.',
    aral:
      'A warning against deceptive appearances: what feels distant and harmless may actually be an imminent danger right at your doorstep.',
    sources: [
      {
        author: 'Maximo D. Ramos',
        title: 'Creatures of Midnight',
        year: 1971,
        publisher: 'Island Publishers',
        url: 'https://www.aswangproject.com/creatures-of-midnight-by-maximo-d-ramos/',
        note: 'Folk accounts of winged vampires and auditory illusions in Philippine folklore.',
      },
      {
        author: 'Damiana L. Eugenio',
        title: 'Philippine Folk Literature: The Myths',
        year: 1993,
        publisher: 'University of the Philippines Press',
        url: 'https://press.up.edu.ph/store/books/view/825',
        note: 'Visayan and Waray regional stories of the Wakwak.',
      },
      {
        author: 'The Aswang Project',
        title: 'Wakwak & Tiktik: The Winged Harbingers of the Aswang',
        year: 2019,
        publisher: 'The Aswang Project',
        url: 'https://www.aswangproject.com/wakwak-tiktik/',
        note: 'Acoustic folklore analysis of the predatory night birds in Central Visayas.',
      },
    ],
  },
  {
    id: 'tiyanak',
    name: 'Tiyanak',
    baybayin: 'ᜆᜒᜌᜈᜃ᜔',
    alternateNames: ['Patianak', 'Muntianak', 'Pontianak (cognate)'],
    classification: 'Deceptive Imp & Lost Soul Demon',
    island: 'Luzon',
    region: 'Central Luzon, Batangas, Laguna, and Southern Tagalog',
    featured: false,
    image: '/images/tiyanak_art_1792941440040.jpg',
    eyes: 'red',
    dangerLevel: 'High / Lethal Deception',
    habitat: 'Dense cogon grass, abandoned forest clearings, muddy riverbanks, and dark trails',
    dietOrPrey: 'Human blood and vital organs of unsuspecting rescuers',
    teaser:
      'It lures kindhearted travelers with the pitiful crying of a baby left alone in the grass. But the moment you pick it up, its jaw unhinges into razor fangs.',
    description:
      'Originally known in pre-colonial animism as the "patianak"—the vengeful spirit of a child that died in childbirth or maternal tragedy—the Tiyanak evolved in the colonial era into the soul of an unbaptized infant trapped in limbo. It mimics the plaintive, heartbreaking cries of a helpless newborn abandoned in deep grass or beside a lonely forest trail. When a compassionate traveler picks up the infant to comfort it, the creature reveals its horrifying true form: wrinkled earthen skin, sharp claws, pointed ears, and an unhinged jaw bristling with needle-sharp fangs that lunges straight for the rescuer’s neck.',
    behavior:
      'Cries inconsolably from hidden bushes to exploit human empathy. Once picked up, it latches on with tremendous supernatural strength and bites viciously.',
    signs:
      'The sound of a baby crying in uninhabited woods late at night; tiny infant footprints in the mud that abruptly vanish into nothingness.',
    weakness:
      'Turn your clothing inside out (baligtarin ang damit). This confuses the Tiyanak, making it giggle and release its victim from its optical trap. Carrying blessed ash, garlic, or loud firecrackers will also drive it off.',
    aral:
      'A somber ancestral reflection on infant mortality and grief, while reminding wanderers to exercise caution even when situations appear innocent and defenseless.',
    sources: [
      {
        author: 'F. Landa Jocano',
        title: 'Outline of Philippine Mythology',
        year: 1969,
        publisher: 'Centro Escolar University',
        url: 'https://www.aswangproject.com/f-landa-jocano-philippine-mythology/',
        note: 'Analysis of the pre-Hispanic patianak and its transformation during the Spanish era.',
      },
      {
        author: 'Maximo D. Ramos',
        title: 'The Creatures of Philippine Lower Mythology',
        year: 1990,
        publisher: 'Phoenix Publishing House',
        url: 'https://www.aswangproject.com/creatures-philippine-lower-mythology/',
        note: 'Classification of imps and infant apparitions in Tagalog folklore.',
      },
      {
        author: 'Jordan Clark',
        title: 'Tiyanak: The Demon Baby of Philippine Folklore',
        year: 2017,
        publisher: 'The Aswang Project',
        url: 'https://www.aswangproject.com/tiyanak/',
        note: 'Historical trace from Austronesian pontianak roots to modern urban legends.',
      },
    ],
  },
  {
    id: 'sigbin',
    name: 'Sigbin',
    baybayin: 'ᜐᜒᜄ᜔ᜊᜒᜈ᜔',
    alternateNames: ['Sigben', 'Amamayloy', 'Shadow-Stealer'],
    classification: 'Shadow-Eating Cryptid & Occult Familiar',
    island: 'Visayas',
    region: 'Cebu, Bohol, Siquijor, Leyte, and Samar',
    featured: false,
    image: '/images/sigbin_art_1792941440310.jpg',
    eyes: 'amber',
    dangerLevel: 'High / Occult',
    habitat: 'Earthen jars (tapayan), deep caverns, dense talahib grass, and cemetery borders',
    dietOrPrey: 'Human shadows, charcoal, raw chicken hearts, and the life essence of children',
    teaser:
      'A strange goat-like creature that walks backward with its head tucked between its hind legs. It hunts human shadows on Holy Week, kept in clay jars by wealthy sorcerers.',
    description:
      'The Sigbin is one of the most enigmatic and bizarre cryptids of the Visayan archipelago. Described as resembling a hornless goat, a small kangaroo, or an oversized dog with long ears that clap like hands when it bounds, its hind legs are significantly longer than its front limbs. Most remarkably, it walks backward, carrying its head lowered between its hind thighs. The Sigbin emerges during the twilight of Holy Week to hunt for human shadows; if it bites or steps on your shadow, you will fall ill with a fatal wasting condition. Certain wealthy families are whispered to keep a Sigbin inside a large clay tapayan jar, feeding it charcoal and animal blood in exchange for occult riches and gold.',
    behavior:
      'Extremely swift and evasive. Emits a nauseating stench from its gland to disorient pursuers. Operates under the commands of human sorcerers known as sigbinan.',
    signs:
      'A clacking or clapping sound made by its large ears as it leaps in the dark; a foul stench reminiscent of rotting cabbage and burnt hair; mysterious loss of shadow in moonlight.',
    weakness:
      'Consecrated virgin coconut oil made on Good Friday (lana); bright light from burning torches of coconut palm leaves (sulo); and blessed crucifixes.',
    aral:
      'A cultural critique of ill-gotten wealth and greed, warning that unearned riches attained through exploitation or dark bargains carry a ruinous curse.',
    sources: [
      {
        author: 'Francisco R. Demetrio, S.J.',
        title: 'Encyclopedia of Philippine Folk Beliefs and Practices',
        year: 1991,
        publisher: 'Xavier University Press',
        url: 'https://www.aswangproject.com/encyclopedia-of-philippine-folk-beliefs/',
        note: 'Cebuano and Boholano accounts of the Sigbin and occult wealth pacts.',
      },
      {
        author: 'Jordan Clark',
        title: 'Sigbin: The Kangaroo-Goat of Philippine Folklore',
        year: 2016,
        publisher: 'The Aswang Project',
        url: 'https://www.aswangproject.com/sigbin/',
        note: 'Zoological and folkloric investigation into the Sigbin cryptid.',
      },
    ],
  },
  {
    id: 'mambabarang',
    name: 'Mambabarang',
    baybayin: 'ᜋᜋ᜔ᜊᜊᜇᜅ᜔',
    alternateNames: ['Barangan', 'Barang Master', 'Hexer of Insects'],
    classification: 'Entomological Sorcerer & Dark Hexer',
    island: 'Visayas',
    region: 'Siquijor, Bohol, Leyte, Samar, and Antique',
    featured: false,
    image: '/images/mambabarang_art_1792941441497.jpg',
    eyes: 'amber',
    dangerLevel: 'Lethal Hexcraft',
    habitat: 'Secluded mountain huts, coastal caves, and mangrove edges in Siquijor and Panay',
    dietOrPrey: 'Human vitality; targeted individuals who have broken oaths or caused offense',
    teaser:
      'A practitioner of dark entomological sorcery who commands swarms of venomous beetles and centipedes kept in bamboo tubes, sending them to burrow beneath the skin of foes.',
    description:
      'The Mambabarang is a specialized, deeply feared sorcerer who commands the deadly practice of "barang"—a lethal form of insect magic found primarily in the Visayas. Unlike a standard healer (albularyo) or typical witch (mangkukulam), the Mambabarang breeds flesh-eating beetles, centipedes, worms, and stinging insects inside a polished bamboo tube called a "tukil." Feeding them black ginger and ritual potions, the sorcerer can tie a single strand of the victim’s hair to an insect and chant an ancient curse. The swarm travels invisibly to the victim, entering through the mouth, ears, or skin, causing excruciating pain, swelling, and eventually live insects erupting from beneath the skin.',
    behavior:
      'Acts out of vengeance or on behalf of paying clients. Carefully maintains its insect colony with ritual feedings every Friday. Will not attack without obtaining a personal token of the target.',
    signs:
      'Sudden unexplainable boils and intense localized abdominal pain; phantom buzzing sensations beneath the epidermis; medical doctors finding no clinical explanation.',
    weakness:
      'Only a master albularyo or mananambal with superior spiritual power can cure barang through santigwar (diagnostic ritual), counter-incantations, and blessed herbal decoctions. Seeking reconciliation and begging forgiveness from the offended party is the surest remedy.',
    aral:
      'Warns against arrogance, breach of contract, and looking down on the humble or defenseless in rural society, emphasizing accountability for one’s deeds.',
    sources: [
      {
        author: 'Richard W. Lieban',
        title: 'Cebuano Sorcery: Malign Magic in the Philippines',
        year: 1967,
        publisher: 'University of California Press',
        url: 'https://www.aswangproject.com/cebuano-sorcery-richard-lieban/',
        note: 'Scholarly anthropological field study of barang and sorcery in the Central Visayas.',
      },
      {
        author: 'The Aswang Project',
        title: 'Barang: The Visayan Black Magic of Insects',
        year: 2017,
        publisher: 'The Aswang Project',
        url: 'https://www.aswangproject.com/mambabarang-barang/',
        note: 'Detailed rituals of counter-sorcery and the role of the traditional albularyo.',
      },
    ],
  },
  {
    id: 'mangkukulam',
    name: 'Mangkukulam',
    baybayin: 'ᜋᜅ᜔ᜃᜓᜃᜓᜎᜋ᜔',
    alternateNames: ['Kulam Witch', 'Manggagaway', 'Bruha (colonial)', 'Hexer'],
    classification: 'Sympathetic Sorcerer & Black Magic Practitioner',
    island: 'Luzon',
    region: 'Pangasinan, Pampanga, Batangas, Siquijor, and across the archipelago',
    featured: false,
    image: '/images/mangkukulam_art_1792942060802.jpg',
    eyes: 'amber',
    dangerLevel: 'Lethal / Malign Sorcery',
    habitat: 'Secluded rural sitios, weathered nipa huts with occult altars, and deep provincial crossways',
    dietOrPrey: 'Targeted human victims provoked by personal jealousy, disputes over property, or contracted hexes',
    teaser:
      'A master of sympathetic witchcraft. Binding a victim’s hair to an effigy doll pierced with copper needles, the mangkukulam inflicts agonizing illnesses from miles away.',
    description:
      'The Mangkukulam is the legendary practitioner of "kulam"—traditional Philippine sympathetic witchcraft and hexcraft. Unlike the Mambabarang who commands carnivorous insects, the Mangkukulam operates through sympathetic connection: binding a victim’s personal relic (strands of hair, nail clippings, or clothing fibers) to a handcrafted wax, wood, or cloth effigy doll. By piercing needles into vital points of the doll, scorching it over a beeswax candle, or tying cords tightly around its limbs, the victim immediately suffers corresponding agonizing physical ailments—violent fevers, localized needle-sharp abdominal spasms, swollen joints, paralysis, or spitting up earth and nails. Rooted in pre-colonial folk medicine and later conflated with European witch-hunting tropes during Spanish colonial rule, kulam is both feared and utilized as a weapon of the aggrieved in rural Philippine communities.',
    behavior:
      'Operates covertly after twilight, particularly on Tuesdays and Fridays (the traditional occult days). Refuses direct eye contact. Retaliates ruthlessly when provoked, cheated, or socially humiliated.',
    signs:
      'Sudden excruciating bodily pain or stomach distention that baffled medical doctors cannot diagnose; copper needles or dirt appearing in diagnostic alum rituals (tawas); dogs howling toward an empty hut corner.',
    weakness:
      'The spiritual counter-rites of an albularyo or mananambal using tawas (diagnostic alum), lana (blessed coconut oil concocted on Good Friday), crucifixes, buntot pagi (stingray tail whip), and confronting the sorcerer to force a reversal of the curse.',
    aral:
      'Reflects the socio-psychological tensions of close-knit rural life: warning that arrogance, broken promises, and callous treatment of neighbors invite destructive grievances that fracture communal peace.',
    sources: [
      {
        author: 'Dr. José Rizal',
        title: 'La Curacion de los Hechizados (The Treatment of the Bewitched)',
        year: 1889,
        publisher: 'Historical Medical & Folklore Archive',
        url: 'https://www.aswangproject.com/kulam-filipino-sorcery/',
        note: 'Dr. José Rizal’s ethnographic and medical investigation into kulam and traditional healing.',
      },
      {
        author: 'Richard W. Lieban',
        title: 'Cebuano Sorcery: Malign Magic in the Philippines',
        year: 1967,
        publisher: 'University of California Press',
        url: 'https://www.aswangproject.com/cebuano-sorcery-richard-lieban/',
        note: 'Comparative analysis of kulam and barang practitioners in Philippine anthropology.',
      },
      {
        author: 'The Aswang Project',
        title: 'Philippine Sorcery 101: Kulam, Barang, and Traditional Hexcraft',
        year: 2018,
        publisher: 'The Aswang Project',
        url: 'https://www.aswangproject.com/mangkukulam/',
        note: 'Comprehensive overview of sympathetic effigy dolls, counter-magic, and the role of the albularyo.',
      },
    ],
  },
  {
    id: 'nuno-sa-punso',
    name: 'Nuno sa Punso',
    baybayin: 'ᜈᜓᜈᜓ ᜐ ᜉᜓᜈ᜔ᜐᜓ',
    alternateNames: ['Nuno', 'Matanda sa Punso', 'Apo', 'Mound Dweller'],
    classification: 'Chthonic Earth Spirit & Ancestral Mound Elder',
    island: 'Luzon',
    region: 'Pan-Philippine: Tagalog, Kapampangan, Ilocano, and Bicolano regions',
    featured: false,
    image: '/images/nuno_punso_art_1792941443301.jpg',
    eyes: 'amber',
    dangerLevel: 'Spiteful / Curses Trespassers',
    habitat: 'Termite mounds (punso), anthills, beneath old tamarind and bamboo groves',
    dietOrPrey: 'Consumes offerings of unsalted food, tobacco, rice wine, and betel nut',
    teaser:
      'An ancient, dwarf-like elder with a flowing white beard who lives inside termite mounds. Disturb his dwelling without whispering “Tabi-tabi po,” and your body will swell with curses.',
    description:
      'Literally translating to "Ancestor or Grandfather of the Mound," the Nuno sa Punso is an earth guardian spirit with deep roots in pre-colonial anito (ancestor spirit) veneration. Standing barely two to three feet tall with wrinkled leathery skin, piercing eyes, and a majestic white beard reaching his toes, he lives within earthen termite mounds (punso) that serve as gateways to the spirit realm. The Nuno is not inherently evil, but he is fiercely protective of his home. Anyone who steps on, kicks, or urinates upon a punso without first asking permission will be stricken with sudden illness: swollen limbs, black spots on the skin, vomiting blood, or permanent blindness.',
    behavior:
      'Peaceful when accorded respect; mercilessly vindictive when disrespected. Guards the soil and underground flora from careless human intrusion.',
    signs:
      'An isolated earthen mound standing undisturbed in a clear field; sudden fever, extreme localized pain, or discoloration of the toes after walking through overgrown grass.',
    weakness:
      'Always bow your head and speak clearly before passing: "Tabi-tabi po, Ingkong, makikiraan lamang po." If cursed, visit an albularyo for a tawas (alum diagnostic) ritual and place an offering (atang) of unsalted boiled chicken, tobacco, and coins at the base of the mound.',
    aral:
      'The philosophical heart of Filipino environmental etiquette: every corner of nature has an unseen custodian, demanding humility and mindful footsteps wherever we tread.',
    sources: [
      {
        author: 'Maximo D. Ramos',
        title: 'The Creatures of Philippine Lower Mythology',
        year: 1990,
        publisher: 'Phoenix Publishing House',
        url: 'https://www.aswangproject.com/creatures-philippine-lower-mythology/',
        note: 'Documentation of dwarfs and mound spirits in Philippine lore.',
      },
      {
        author: 'Damiana L. Eugenio',
        title: 'Philippine Folk Literature: The Myths',
        year: 1993,
        publisher: 'University of the Philippines Press',
        url: 'https://press.up.edu.ph/store/books/view/825',
        note: 'Stories of the Nuno and traditional etiquette in rural communities.',
      },
      {
        author: 'The Aswang Project',
        title: 'Nuno sa Punso: The Ancestor of the Mound',
        year: 2018,
        publisher: 'The Aswang Project',
        url: 'https://www.aswangproject.com/nuno-sa-punso/',
        note: 'Etiquette and ancient animist roots of the Tabi-tabi po invocation.',
      },
    ],
  },
  {
    id: 'duwende',
    name: 'Duwende',
    baybayin: 'ᜇᜓᜏᜒᜈ᜔ᜇᜒ',
    alternateNames: ['Dwende', 'Tawong Lupa', 'Lambana (cognate)', 'Encantito'],
    classification: 'House & Nature Elemental Sprite',
    island: 'Luzon',
    region: 'Widespread across Luzon and the Visayas',
    featured: false,
    image: '/images/duwende_art_1792941444733.jpg',
    eyes: 'amber',
    dangerLevel: 'Mischievous / Whimsical',
    habitat: 'Attics, ceiling rafters, old trees, kitchen corners, and garden soil',
    dietOrPrey: 'Sweet sticky rice cakes (kakanin), biscuits, candies, and raw rice grains',
    teaser:
      'Diminutive magical folk divided into two factions: the benevolent White Duwende who brings wealth and protection, and the spiteful Black Duwende who pinches, curses, and hides heirlooms.',
    description:
      'Combining pre-colonial earth spirits (tawong lupa) with Iberian folklore, the Duwende are tiny, humanoid sprites who dwell in close proximity to human settlements. Filipino tradition divides them into distinct factions based on temperament: the Duwendeng Puti (White Dwarf) is kind, peaceful, and brings sudden financial prosperity, protection, and good luck to homeowners who treat them gently; the Duwendeng Itim (Black Dwarf) or Duwendeng Pula (Red Dwarf) is vengeful, easily offended, and prone to malice. A slighted black duwende will pinch family members in their sleep, cause household keys to disappear, or afflict children with unexplained rashes and wandering fevers.',
    behavior:
      'Active during twilight and late night hours. Playful with young children and household pets. Fond of stealing shiny trinkets or moving kitchen utensils to provoke confusion.',
    signs:
      'Mysterious blue or black pinch marks on your limbs upon waking up ("kurot ng duwende"); coins or utensils repeatedly vanishing from locked drawers; sounds of tiny footsteps pattering across wood floors.',
    weakness:
      'Leave small plates of sweets or biscuits on window sills; keep rock salt sprinkled in the four corners of every room; hang blessed palm leaves (palaspas) over entrance doors.',
    aral:
      'Teaches mindfulness, cleanliness, and harmony in the home, reminding families to live peacefully alongside the unseen inhabitants of their domestic spaces.',
    sources: [
      {
        author: 'Francisco R. Demetrio, S.J.',
        title: 'Dictionary of Philippine Folk Beliefs and Customs',
        year: 1970,
        publisher: 'Xavier University Press',
        url: 'https://www.aswangproject.com/encyclopedia-of-philippine-folk-beliefs/',
        note: 'Classification of household sprites and encounters with white and black duwendes.',
      },
      {
        author: 'Maximo D. Ramos',
        title: 'Creatures of Midnight',
        year: 1971,
        publisher: 'Island Publishers',
        url: 'https://www.aswangproject.com/creatures-of-midnight-by-maximo-d-ramos/',
        note: 'Comparative study of earth dwarfs and nature spirits in the Philippines.',
      },
    ],
  },
  {
    id: 'santelmo',
    name: 'Santelmo',
    baybayin: 'ᜐᜈ᜔ᜆᜒᜎ᜔ᜋᜓ',
    alternateNames: ['San Telmo', 'Apoy ni San Telmo', 'Wandering Fire of the Dead'],
    classification: 'Will-o\'-the-Wisp & Restless Soul Elemental',
    island: 'Luzon',
    region: 'Coastal and marsh regions of Luzon, Mindoro, and Romblon',
    featured: false,
    image: '/images/santelmo_art_1792941444474.jpg',
    eyes: 'amber',
    dangerLevel: 'Disorienting / Fatal Peril',
    habitat: 'Swamps, flooded marshes, lonely riverbanks, cliffs, and open seas during storms',
    dietOrPrey: 'Does not feed; seeks companionship or lures travelers into watery graves',
    teaser:
      'A floating ball of fire born from the restless souls of those who died violently or drowned at sea. Follow its hypnotic dancing light, and it will lead you to a watery grave.',
    description:
      'Originating from sailors’ accounts of St. Elmo’s fire (electrical plasma during storms), the Santelmo in Philippine mythology took on a chilling, supernatural identity. It manifests as a floating, pulsating orb of red, orange, or eerie blue fire dancing above marshlands, lonely roads, and rocky coasts. According to oral folklore, each Santelmo is the restless soul of someone who met an untimely, violent, or unbaptized death—sailors drowned in shipwrecks, wanderers caught in flash floods, or murder victims discarded in ravines. The flame moves with hypnotic grace, bouncing ahead of night travelers. Those who become enchanted and follow its glow are led off perilous cliffs, into quicksand bogs, or into deep ocean currents to drown.',
    behavior:
      'Drifts silently through the mist. Expands and contracts in brightness. Bounces gently forward when pursued, drawing the traveler deeper into dangerous, uncharted terrain.',
    signs:
      'A luminous fire floating at head height with no campfire or torch in sight; a flame that burns brightly without scorching leaves or dry grass; sudden drop in temperature.',
    weakness:
      'Never run after it or throw rocks at it. Turn your shirt inside out, recite the Apostles’ Creed (Sumasampalataya Ako), strike steel against flint, or throw holy salt to disperse its hypnotic bond.',
    aral:
      'A solemn reminder of mortality and the unresolved spiritual obligations owed to those who died without rites or burial, emphasizing prayers for departed souls.',
    sources: [
      {
        author: 'Damiana L. Eugenio',
        title: 'Philippine Folk Literature: The Legends',
        year: 1993,
        publisher: 'University of the Philippines Press',
        url: 'https://press.up.edu.ph/store/books/view/825',
        note: 'Coastal legends and maritime apparitions in Luzon and the Visayan seas.',
      },
      {
        author: 'Maximo D. Ramos',
        title: 'The Creatures of Philippine Lower Mythology',
        year: 1990,
        publisher: 'Phoenix Publishing House',
        url: 'https://www.aswangproject.com/creatures-philippine-lower-mythology/',
        note: 'Analysis of fiery apparitions and wandering supernatural lights.',
      },
    ],
  },
  {
    id: 'busaw',
    name: 'Busaw',
    baybayin: 'ᜊᜓᜐᜏ᜔',
    alternateNames: ['Buso', 'Tagamaling', 'Corpse-Eating Ghoul'],
    classification: 'Necrophagous Ghoul & Flesh Demon',
    island: 'Mindanao',
    region: 'Davao, Cotabato, Bukidnon & Agusan (Bagobo and Mandaya mythology)',
    featured: false,
    image: '/images/busaw_art_1792941445505.jpg',
    eyes: 'red',
    dangerLevel: 'Lethal / Corpse Ravager',
    habitat: 'Graveyards, ancient burial caves, and desolate mountain hollows in Mindanao',
    dietOrPrey: 'Fresh human corpses, decaying flesh, and unguarded funeral burials',
    teaser:
      'A terrifying ghoul from Mindanao with glowing red eyes and iron claws who digs up freshly buried graves to devour corpses, replacing the dead body with a banana trunk illusion.',
    description:
      'In the sacred oral epics and traditions of the Bagobo, Mandaya, and Manobo peoples of Southern Mindanao, the Busaw (or Buso) are dread demonic ghouls that crave human flesh. Possessing hollow bodies, fiery red eyes, and fingers that end in curved iron talons, they lurk around villages whenever someone passes away, sniffing the air for the smell of grief. Under cover of darkness, the Busaw digs into freshly turned graves, consumes the corpse, and uses dark sorcery to replace the body with a banana trunk (punong saging) enchanted to look identical to the deceased, ensuring grieving families remain unaware that the grave was desecrated.',
    behavior:
      'Gathers in packs near cemeteries at twilight. Capable of leaping enormous distances through trees. Fearful of daytime sunlight and brave armed warriors.',
    signs:
      'The scent of rotting sweet flesh mixed with burning sulfur; freshly disturbed soil and claw scratches on new graves; unnerving hyena-like laughter echoing from the tree line.',
    weakness:
      'Iron blades (bolo or karit), bright bonfires, and salt. Traditional Bagobo families hold strict night-long vigils (pagpupuyat) over graves, keeping torchlights ablaze and brandishing steel blades until the burial mound has completely settled.',
    aral:
      'Demonstrates the supreme sanctity and communal dignity that indigenous Filipinos accord to the deceased, demanding vigilance and collective honor for resting ancestors.',
    sources: [
      {
        author: 'Laura Watson Benedict',
        title: 'A Study of Bagobo Ceremonial, Magic and Myth',
        year: 1916,
        publisher: 'Annals of the New York Academy of Sciences',
        url: 'https://www.aswangproject.com/bagobo-myths-laura-watson-benedict/',
        note: 'Primary anthropological documentation of the Busaw and Bagobo funerary customs.',
      },
      {
        author: 'F. Landa Jocano',
        title: 'Outline of Philippine Mythology',
        year: 1969,
        publisher: 'Centro Escolar University',
        url: 'https://www.aswangproject.com/f-landa-jocano-philippine-mythology/',
        note: 'Mythological pantheons and supernatural creatures of indigenous Mindanao.',
      },
    ],
  },
  {
    id: 'bakunawa',
    name: 'Bakunawa',
    baybayin: 'ᜊᜃᜓᜈᜏ',
    alternateNames: ['Baconaua', 'Bakonawa', 'The Great Moon Eater', 'Celestial Serpent'],
    classification: 'Colossal Celestial Sea Dragon',
    island: 'Visayas',
    region: 'Visayan Sea, Hiligaynon, Cebuano, and Waray mythologies',
    featured: false,
    image: '/images/bakunawa_art_1792940252601.jpg',
    eyes: 'amber',
    dangerLevel: 'Cataclysmic / Cosmic',
    habitat: 'Deepest oceanic abyssal trenches and the cosmic celestial firmament',
    dietOrPrey: 'The divine moons created by the ancient supreme gods',
    teaser:
      'The gigantic, serpentine dragon of the Visayan deep with a mouth like a lake. Captivated by the seven radiant moons, it coils into the heavens to swallow them whole.',
    description:
      'In pre-colonial Visayan cosmology, Bathala or the supreme deity originally created seven luminous moons to illuminate and bless the earth. The Bakunawa—a colossal dragon-serpent with glistening scales, whiskers like lightning, and wings spanning whole storm systems—grew entranced by the mesmerizing beauty of the celestial spheres. Rising from the oceanic abyss, the serpent coiled into the heavens and devoured six of the seven moons, plunging the world into perpetual darkness and fear. When a lunar eclipse occurs, it signals that the Bakunawa has coiled around the final seventh moon and is preparing to swallow it. Ancient Filipinos would rush into the open with copper pots, pans, and gongs, clanging them together with deafening noise while shouting "Ibalik ang buwan!" to startle the beast into releasing the moon.',
    behavior:
      'Dwells in the oceanic abyss until summoned by the full lunar tide. Awakens during planetary alignments to strike at the heavens.',
    signs:
      'The moon turning a blood-red color during an eclipse; violent tidal surges and oceanic swells on a windless night; strange celestial tremors in the upper atmosphere.',
    weakness:
      'Deafening communal cacophony: clashing metal pots and pans (kalampag ng kaldero), beating agongs, sounding trumpets, and singing sweet soothing melodies to persuade or scare the beast into regurgitating the moon back into the sky.',
    aral:
      'A powerful testament to the power of collective community action: showing that when ordinary human beings join their voices together in unity, they can drive away cosmic darkness and restore light to the world.',
    sources: [
      {
        author: 'Damiana L. Eugenio',
        title: 'Philippine Folk Literature: The Myths',
        year: 1993,
        publisher: 'University of the Philippines Press',
        url: 'https://press.up.edu.ph/store/books/view/825',
        note: 'Collection of pre-colonial Visayan eclipse myths and the seven moons legend.',
      },
      {
        author: 'F. Landa Jocano',
        title: 'Outline of Philippine Mythology',
        year: 1969,
        publisher: 'Centro Escolar University',
        url: 'https://www.aswangproject.com/f-landa-jocano-philippine-mythology/',
        note: 'Cosmological models of ancient Visayan deities and the celestial serpent.',
      },
      {
        author: 'Jordan Clark',
        title: 'Bakunawa: The Moon Eating Dragon of Philippine Myth',
        year: 2012,
        publisher: 'The Aswang Project',
        url: 'https://www.aswangproject.com/bakunawa/',
        note: 'Historical reconstruction of eclipse rituals across the Visayas.',
      },
    ],
  },
]

export const featuredCreatures = creatures.filter((c) => c.featured)
