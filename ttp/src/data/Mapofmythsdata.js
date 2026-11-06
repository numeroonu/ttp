/*
 * Coordinates are real latitude / longitude. A site marks the province or
 * landmark where a legend is told, not a recorded sighting, so its location
 * is representative rather than exact.
 */

/** The whole archipelago: the opening view of the Map of Myths. */
export const PHILIPPINES_BOUNDS = [[4.6, 116.9], [19.6, 126.7]]

export const REGIONS_DATA = [
  {
    id: 'luzon',
    name: 'Luzon',
    nameFil: 'Luzon',
    baybayin: 'ᜎᜓᜐᜓᜈ᜔',
    tagline: 'Realm of Mountain Giants, Cloud Forests & Earth Elders',
    taglineFil: 'Lupain ng mga Higante sa Bundok, Maulap na Kagubatan at Nuno sa Punso',
    terrain: 'Sierra Madre Ridge · Balete Groves · Volcanic Valleys',
    terrainFil: 'Kabundukan ng Sierra Madre · Puno ng Balete · Lambak ng Bulkan',
    climate: 'Rugged highlands, pine forests, and misty tropical mountain passes',
    climateFil: 'Matatarik na kabundukan, kagubatan ng pino, at maulap na daan',
    overview:
      'Luzon’s immense cordilleras, volcanic peaks (Mt. Makiling and Mt. Mayon), and dense tropical rainforests gave rise to territorial spirits tied to trees and terrain. The Tagalogs, Ilocanos, and Bicolanos shared oral accounts of towering equine tricksters, arboreal giants smoking endless cigars, and chthonic mound elders who enforce environmental etiquette with severe curses.',
    overviewFil:
      'Ang matatayog na kabundukan ng Luzon tulad ng Sierra Madre, Bundok Makiling, at Mayon ay naging kanlungan ng mga espiritung tagapagbantay ng kalikasan. Ang mga Tagalog, Ilocano, at Bicolano ay may mayamang salaysay ukol sa mga Tikbalang na nagliligaw ng manlalakbay, Kapre na humihithit ng tabako sa balete, at Nuno sa Punso na nagpaparusa sa lapastangan.',
    bounds: [[12.6, 119.6], [18.7, 124.4]],
    center: [16.2, 121.1],
    color: '#e0a33b',
    pins: [
      {
        id: 'diwata', name: 'Diwata', type: 'Nature Deity', typeFil: 'Diyosa ng Kalikasan', territory: 'Mt. Makiling & Arayat',
        sites: [
          { place: 'Mt. Makiling, Laguna', lat: 14.1361, lng: 121.1942 },
          { place: 'Mt. Arayat, Pampanga', lat: 15.2, lng: 120.7417 },
        ],
      },
      {
        id: 'tikbalang', name: 'Tikbalang', type: 'Forest Guardian', typeFil: 'Bantay-Gubat', territory: 'Sierra Madre & Rizal',
        sites: [
          { place: 'Sierra Madre, Rizal', lat: 14.62, lng: 121.42 },
          { place: 'Sierra Madre, Quezon', lat: 14.76, lng: 121.63 },
        ],
      },
      {
        id: 'kapre', name: 'Kapre', type: 'Tree Giant', typeFil: 'Higante sa Puno', territory: 'Balete Groves, Laguna',
        sites: [
          { place: 'Balete groves, Laguna', lat: 14.14, lng: 121.42 },
        ],
      },
      {
        id: 'mangkukulam', name: 'Mangkukulam', type: 'Sympathetic Witch', typeFil: 'Manggagaway', territory: 'Pangasinan & Central Luzon',
        sites: [
          { place: 'Pangasinan', lat: 15.95, lng: 120.35 },
          { place: 'Pampanga, Central Luzon', lat: 15.03, lng: 120.69 },
        ],
      },
      {
        id: 'nuno-sa-punso', name: 'Nuno sa Punso', type: 'Mound Ancestor', typeFil: 'Espiritu ng Punso', territory: 'Central Luzon',
        sites: [
          { place: 'Nueva Ecija, Central Luzon', lat: 15.49, lng: 120.97 },
        ],
      },
      {
        id: 'tiyanak', name: 'Tiyanak', type: 'Deceptive Imp', typeFil: 'Mapanlinlang na Sanggol', territory: 'Batangas Wilds',
        sites: [
          { place: 'Batangas wilds', lat: 13.85, lng: 121.1 },
        ],
      },
      {
        id: 'santelmo', name: 'Santelmo', type: 'Soul Flame', typeFil: 'Apoy ng Kaluluwa', territory: 'Mindoro & Bicol Coast',
        sites: [
          { place: 'Mindoro coast', lat: 13.41, lng: 121.17 },
          { place: 'Bicol coast, Albay', lat: 13.15, lng: 123.74 },
        ],
      },
      {
        id: 'duwende', name: 'Duwende', type: 'House & Earth Sprite', typeFil: 'Espiritu ng Lupa', territory: 'Tagalog Rafters',
        sites: [
          { place: 'Bulacan, Tagalog heartland', lat: 14.84, lng: 120.85 },
        ],
      },
    ],
    hotspots: [
      {
        title: 'Sierra Madre Mountain Range',
        image: '/images/hotspots/sierra-madre.jpg',
        imageCredit: '',
        titleFil: 'Kabundukan ng Sierra Madre',
        province: 'Rizal · Laguna · Quezon',
        lore: 'The longest unbroken mountain spine in the Philippines. Revered as the sanctuary of the Tikbalang, where dense fog and shifting trails confuse careless travelers.',
        loreFil: 'Ang pinakamahabang kabundukan sa bansa. Itinuturing na sagradong kanlungan ng Tikbalang kung saan ang makapal na hamog ay nagliligaw sa mga nagdaraan.',
      },
      {
        title: 'Mount Makiling',
        image: '/images/hotspots/mount-makiling.jpg',
        imageCredit: '',
        titleFil: 'Bundok Makiling',
        province: 'Laguna',
        lore: 'The mythical volcanic dwelling of Maria Makiling and forest guardians. Known for sunshowers marking the mythical Tikbalang weddings ("Kasal ng Tikbalang").',
        loreFil: 'Mahiwagang bundok na tahanan ni Maria Makiling at mga engkantada. Kilala sa ulan sa gitna ng matinding sikat ng araw na tanda ng kasal ng Tikbalang.',
      },
      {
        title: 'Bicol Peninsula',
        image: '/images/hotspots/bicol-peninsula.jpg',
        imageCredit: '',
        titleFil: 'Tangway ng Bikol',
        province: 'Albay · Camarines Sur',
        lore: 'Famous for early Spanish accounts of nocturnal viscera suckers and floating Santelmo fireballs dancing over marshes near Mt. Mayon.',
        loreFil: 'Bantog sa mga sinaunang ulat ng mga bampirang lumilipad at lumulutang na bolang apoy na Santelmo sa mga latian malapit sa Bulkang Mayon.',
      },
    ],
    sources: [
      {
        title: 'Dr. Maximo Ramos – Creatures of Philippine Lower Mythology',
        url: 'https://www.aswangproject.com/creatures-philippine-lower-mythology/',
        note: 'The foundational scientific taxonomy of Luzon’s terrestrial demons, giants, and dwarfs.',
        noteFil: 'Siyentipikong klasipikasyon ng mga nilalang ng Luzon kabilang ang Kapre, Tikbalang, at Nuno.',
      },
      {
        title: 'Isabelo de los Reyes – El Folk-lore Filipino (1889)',
        url: 'https://www.aswangproject.com/isabelo-de-los-reyes-folk-lore-filipino/',
        note: 'Historic primary collection documenting Ilocano and Tagalog animist beliefs.',
        noteFil: 'Makasaysayang unang aklat sa mga katutubong paniniwala ng mga Tagalog at Ilocano.',
      },
    ],
  },
  {
    id: 'visayas',
    name: 'Visayas',
    nameFil: 'Kabisayaan',
    baybayin: 'ᜊᜒᜐᜌᜐ᜔',
    tagline: 'Archipelago of Shapeshifters, Sorcery & Cosmic Serpents',
    taglineFil: 'Kapuluan ng mga Nag-aanyong Halimaw, Pambabarang at Bakunawa',
    terrain: 'Inter-Island Seas · Limestone Caves · Mangrove Swamps',
    terrainFil: 'Karagatan ng mga Pulo · Yungib ng Apog · Bakawanan',
    climate: 'Coastal straits, labyrinthine islets, and dense nipa fringes',
    climateFil: 'Mabatong baybayin, mga sanga-sangang kipot, at masukal na nipa',
    overview:
      'The Visayan archipelago is the historical heartland of the Aswang complex and maritime serpent mythology. Its fragmented geography of sheltered straits and isolated coastal barangays fostered vivid traditions of self-segmenting horrors, shadow-eating cryptids, insect sorcery, and the colossal moon-devouring sea dragon Bakunawa.',
    overviewFil:
      'Ang Kabisayaan ang sentro ng mga kwento ng Aswang, Manananggal, at serpiyente ng dagat. Dahil sa pagkakahiwa-hiwalay ng mga pulo at liblib na baybayin, lumaganap ang mga tradisyon ukol sa mga lumilipad na kalahating-katawan, pambabarang gamit ang mga kulisap, at ang kosmiko dragon na Bakunawa.',
    bounds: [[9.0, 121.8], [12.7, 125.9]],
    center: [10.9, 123.7],
    color: '#8b1e1e',
    pins: [
      {
        id: 'aswang', name: 'Aswang', type: 'Viscera Sucker', typeFil: 'Bampirang Maninila', territory: 'Panay & Capiz',
        sites: [
          { place: 'Capiz, Panay', lat: 11.5, lng: 122.72 },
          { place: 'Iloilo, Panay', lat: 10.85, lng: 122.55 },
        ],
      },
      {
        id: 'manananggal', name: 'Manananggal', type: 'Segmenting Terror', typeFil: 'Lumilipad na Hati-Katawan', territory: 'Central Visayas',
        sites: [
          { place: 'Cebu, Central Visayas', lat: 10.38, lng: 123.68 },
        ],
      },
      {
        id: 'wakwak', name: 'Wakwak', type: 'Avian Vampire', typeFil: 'Ibong Bampira', territory: 'Leyte & Samar',
        sites: [
          { place: 'Leyte', lat: 11.1, lng: 124.75 },
          { place: 'Samar', lat: 11.8, lng: 125.05 },
        ],
      },
      {
        id: 'sigbin', name: 'Sigbin', type: 'Shadow Cryptid', typeFil: 'Mahiwagang Hayop', territory: 'Cebu & Bohol',
        sites: [
          { place: 'Southern Cebu', lat: 9.88, lng: 123.55 },
          { place: 'Bohol', lat: 9.85, lng: 124.17 },
        ],
      },
      {
        id: 'mambabarang', name: 'Mambabarang', type: 'Insect Hexer', typeFil: 'Manggagaway ng Kulisap', territory: 'Siquijor Island',
        sites: [
          { place: 'Siquijor Island', lat: 9.19, lng: 123.57 },
        ],
      },
      {
        id: 'bakunawa', name: 'Bakunawa', type: 'Celestial Dragon', typeFil: 'Dragon ng Dagat at Buwan', territory: 'Visayan Sea',
        sites: [
          { place: 'Visayan Sea', lat: 11.5, lng: 123.65 },
        ],
      },
    ],
    hotspots: [
      {
        title: 'Panay Island & Capiz',
        image: '/images/hotspots/panay-capiz.jpg',
        imageCredit: '',
        titleFil: 'Pulo ng Panay at Capiz',
        province: 'Capiz · Iloilo · Antique',
        lore: 'Historically stigmatized by Spanish colonizers as the "epicenter" of the aswang—a deliberate political tactic used to demonize indigenous babaylan matriarchs.',
        loreFil: 'Makasaysayang binansagan ng mga Kastila bilang sentro ng aswang upang siraan ang mga katutubong babaylan at babaylang manggagamot.',
      },
      {
        title: 'Siquijor ("Isla del Fuego")',
        image: '/images/hotspots/siquijor.jpg',
        imageCredit: '',
        titleFil: 'Siquijor (Isla del Fuego)',
        province: 'Siquijor Island',
        lore: 'A world-famous island of folk healing (mananambal), medicinal potions, and the dreaded entomological sorcery of the mambabarang who brew potions on Good Friday.',
        loreFil: 'Pulo ng mga mananambal, halamang gamot, at pambabarang tuwing Biyernes Santo.',
      },
      {
        title: 'The Visayan Sea & Abyssal Trenches',
        image: '/images/hotspots/visayan-sea.jpg',
        imageCredit: '',
        titleFil: 'Dagat ng Kabisayaan at Kailaliman',
        province: 'Inter-island Waters',
        lore: 'Cosmological domain of the Bakunawa dragon. During eclipses, villagers rushed out with copper gongs and pots, shouting "Ibalik ang buwan!" to rescue the light.',
        loreFil: 'Dambuhalang kaharian ng Bakunawa. Tuwing eklipse, nagpapatunog ng mga kaldero at gong ang mga nayon upang ibalik ang liwanag ng buwan.',
      },
    ],
    sources: [
      {
        title: 'Jordan Clark – The Aswang Phenomenon & Visayan Archive',
        url: 'https://www.aswangproject.com/aswang-compendium/',
        note: 'In-depth historical analysis of the demonization of indigenous healers in Panay.',
        noteFil: 'Masusing pagsusuri sa paninira ng mga Kastila sa mga manggagamot sa Panay.',
      },
      {
        title: 'Richard W. Lieban – Cebuano Sorcery (University of California Press)',
        url: 'https://www.aswangproject.com/cebuano-sorcery-richard-lieban/',
        note: 'Pioneering anthropological fieldwork on barang magic and folk medicine.',
        noteFil: 'Pag-aaral sa pambabarang at katutubong mahika sa Cebu.',
      },
    ],
  },
  {
    id: 'mindanao',
    name: 'Mindanao',
    nameFil: 'Mindanao',
    baybayin: 'ᜋᜒᜈ᜔ᜇᜈᜏ᜔',
    tagline: 'Highlands of Sacred Epics, Corpse Ghouls & Ancient Anitos',
    taglineFil: 'Mataas na Lupain ng mga Epiko, Busaw at Sinaunang Anito',
    terrain: 'Mount Apo Highlands · Riverine Basins · Burial Caverns',
    terrainFil: 'Tuktok ng Bundok Apo · Ilog Agusan · Yungib ng Libingan',
    climate: 'Vast river valleys, ancient volcanic soil, and primordial highland rainforests',
    climateFil: 'Malalawak na lambak, matabang lupang bulkan, at sinaunang gubat',
    overview:
      'In the southern island of Mindanao, rich indigenous belief systems preserved by the Bagobo, Mandaya, and Manobo peoples flourished largely insulated from early Spanish missions. Their oral traditions center on fearsome flesh-eating ghouls (Busaw) and ancient spirit pantheons preserved in monumental epics like the Bagobo Tuwaang.',
    overviewFil:
      'Sa malawak na lupain ng Mindanao, ang mga katutubong pamayanan tulad ng mga Bagobo, Mandaya, at Manobo ay nagpanatili ng orihinal nilang kosmolohiya. Nananatili ang mga kwento ukol sa Busaw (kumakain ng bangkay sa libingan) at mga dakilang epiko tulad ng Tuwaang.',
    bounds: [[5.5, 121.8], [10.0, 126.7]],
    center: [7.9, 124.9],
    color: '#b3282d',
    pins: [
      {
        id: 'busaw', name: 'Busaw / Buso', type: 'Corpse Ghoul', typeFil: 'Halimaw sa Libingan', territory: 'Davao & Mt. Apo',
        sites: [
          { place: 'Mt. Apo, Davao', lat: 6.987, lng: 125.271 },
        ],
      },
      {
        id: 'wakwak', name: 'Wakwak', type: 'Avian Predator', typeFil: 'Panggabing Ibong Maninila', territory: 'Surigao & Agusan',
        sites: [
          { place: 'Surigao', lat: 9.7, lng: 125.55 },
          { place: 'Agusan', lat: 8.75, lng: 125.72 },
        ],
      },
    ],
    hotspots: [
      {
        title: 'Mount Apo Highlands',
        image: '/images/hotspots/mount-apo.jpg',
        imageCredit: '',
        titleFil: 'Tuktok ng Bundok Apo',
        province: 'Davao del Sur · Cotabato',
        lore: 'The highest volcanic peak in the country, sacred to the Bagobo people. Graves here are watched with night-long vigils (pagpupuyat) to deter the red-eyed Busaw.',
        loreFil: 'Ang pinakamataas na bundok sa Pilipinas, sagrado sa mga Bagobo. Ang mga libingan dito ay binabantayan upang hindi lapastanganin ng Busaw.',
      },
      {
        title: 'Agusan River Basin & Marshes',
        image: '/images/hotspots/agusan-marsh.jpg',
        imageCredit: '',
        titleFil: 'Ilog at Latian ng Agusan',
        province: 'Agusan del Sur',
        lore: 'A vast freshwater wetland steeped in Manobo oral histories of giant river serpent guardians and aquatic spirits of the ancient deep.',
        loreFil: 'Malawak na latian na sagana sa kwento ng mga Manobo ukol sa dambuhalang serpiyente ng ilog at tagabantay ng tubig.',
      },
      {
        title: 'Bukidnon Mountain Plateau',
        image: '/images/hotspots/bukidnon-plateau.jpg',
        imageCredit: '',
        titleFil: 'Talampas ng Bukidnon',
        province: 'Bukidnon',
        lore: 'Misty highland plateaus where traditional warriors brandished iron blades (karit and bolo) to protect ancestral burial grounds from grave-desecrating ghouls.',
        loreFil: 'Maulap na talampas kung saan ang mga mandirigma ay nagdadala ng bakal na sandata upang bantayan ang lupang ninuno.',
      },
    ],
    sources: [
      {
        title: 'Laura Watson Benedict – Bagobo Ceremonial, Magic and Myth (1916)',
        url: 'https://www.aswangproject.com/bagobo-myths-laura-watson-benedict/',
        note: 'Seminal ethnographic study of Mount Apo indigenous funerary rituals and the Busaw.',
        noteFil: 'Pangunahing pag-aaral sa mga ritwal ng Bagobo sa Bundok Apo at paniniwala sa Busaw.',
      },
      {
        title: 'Dr. F. Landa Jocano – Philippine Mythology & Indigenous Pantheons',
        url: 'https://www.aswangproject.com/f-landa-jocano-philippine-mythology/',
        note: 'Scholarly overview of indigenous southern Philippine cosmological traditions.',
        noteFil: 'Akademikong pagsusuri sa mga sinaunang paniniwala sa katimugang Pilipinas.',
      },
    ],
  },
]
