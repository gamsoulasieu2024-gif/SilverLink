# SilverLink

A calm, accessible web app where people—especially older adults—can **browse tech questions**, **ask for help**, and use **safety tools** like a scam checker. The UI favors clear typography, simple navigation, and optional “comfort” settings (larger text, calmer or more vivid backgrounds).

## Stack

- **React 18** + **TypeScript** + **Vite**
- **React Router** for pages
- **Tailwind CSS** + **shadcn/ui**-style components
- **Supabase** (optional): sign-in and cloud features when `VITE_SUPABASE_URL` / `VITE_SUPABASE_PUBLISHABLE_KEY` are set; the app can run as a static site without them

## Scripts

| Command            | Description                                      |
| ------------------ | ------------------------------------------------ |
| `npm run dev`      | Local dev server (default port **8080**)         |
| `npm run build`    | Production build, RSS generation, `404.html` copy |
| `npm run preview`  | Preview the production build locally             |
| `npm run deploy:pages` | Build and deploy `dist/` with **gh-pages**   |
| `npm run lint`     | ESLint                                           |
| `npm test`         | Vitest                                           |

## Deploy notes

- Production builds use base path `/SilverLink/` for GitHub Pages project sites (`https://<user>.github.io/SilverLink/`). Change `repoBase` in `vite.config.ts` if your repo URL differs.

## License

Private project unless you add a license file.
