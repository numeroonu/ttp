# Tabi-Tabi Po: The Dark Folklore of the Philippines

A Cultural Heritage website built with React + Vite. No backend.

## Run it

```bash
npm install     # first time only
npm run dev     # open the link it prints (usually http://localhost:5173)
```

## Build for hosting

```bash
npm run build   # creates the /dist folder you can upload to Netlify, Vercel or GitHub Pages
```

## Where things are

| Folder / file | What it is |
|---|---|
| `src/App.jsx` | Pages (routes) and the intro screen |
| `src/pages/Home.jsx` | Home page (Jhessa) |
| `src/pages/Placeholder.jsx` | Temporary page for unfinished sections |
| `src/components/` | Reusable pieces: LoadingScreen, Navbar, Footer, Candle, Eyes, Fog, BaleteTree, Santelmo, CreatureCard, Reveal |
| `src/data/creatures.js` | All creature info, shared by Home, Bestiary and Map |
| `src/data/navLinks.js` | The list of pages in the menu |
| `src/index.css` | Colors, fonts, buttons, global styles |
| `public/creatures/` | Put creature illustrations here |

## Tips

- Intro plays once per browser tab. To see it on every refresh, set
  `SHOW_INTRO_ONCE_PER_VISIT = false` in `src/App.jsx`.
- To add a creature picture: save it as `public/creatures/aswang.png`, then set
  `image: '/creatures/aswang.png'` for that creature in `src/data/creatures.js`.
- To build a new page, make a file in `src/pages/`, then swap its `<Placeholder ... />`
  route in `src/App.jsx` for your new component.
