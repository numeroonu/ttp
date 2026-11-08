// Every page of the site. Used by the navbar and the footer.
export const NAV_LINKS = [
  { to: '/', label: 'Home', labelEn: 'Home', labelFil: 'Simula' },
  { to: '/creatures', label: 'Creatures', labelEn: 'Creatures', labelFil: 'Mga Nilalang' },
  { to: '/map', label: 'Map of Myths', labelEn: 'Map of Myths', labelFil: 'Mapa ng Alamat' },
  { to: '/superstitions', label: 'Superstitions', labelEn: 'Superstitions', labelFil: 'Mga Pamahiin' },
  { to: '/origins', label: 'Origins', labelEn: 'Origins', labelFil: 'Pinagmulan' },
  { to: '/modern-legends', label: 'Modern Legends', labelEn: 'Modern Legends', labelFil: 'Makabagong Alamat' },
  { to: '/podcasts', label: 'Podcasts & Stories', labelEn: 'Podcasts & Stories', labelFil: 'Kwento sa Hatinggabi' },
  { to: '/notebook', label: 'My Notebook', labelEn: 'My Notebook', labelFil: 'Aking Kuwaderno' },
  { to: '/about', label: 'About', labelEn: 'About Us', labelFil: 'Tungkol sa Amin' },
]

export function getLocalizedNavLinks(language = 'fil') {
  return NAV_LINKS.map((link) => ({
    ...link,
    label: language === 'fil' ? link.labelFil : link.labelEn,
  }))
}