# AFS website

Source of the website of the Association Française de Slackline (AFS). Built with Astro and Tailwind CSS, in French and English, deployed to GitHub Pages.

## Development

Requires the Node version in `.nvmrc`.

```bash
npm install
npm run dev
```

| Command          | Purpose                                           |
| ---------------- | ------------------------------------------------- |
| `npm run dev`    | Local dev server                                  |
| `npm run build`  | Static build into `dist/`                         |
| `npm test`       | Unit tests and built pages checks (after a build) |
| `npm run lint`   | ESLint                                            |
| `npm run check`  | Astro type checks                                 |
| `npm run format` | Prettier                                          |

Work happens on feature branches created from `dev`, merged back into `dev` through pull requests. `main` is the release branch: every push to `main` is built and deployed by `.github/workflows/deploy.yml` (pull requests and `dev` are built but not deployed).

French pages live at the root and English pages under `/en/`. Page copy lives in `src/content/`, short UI strings in `src/i18n/ui.ts`. The raw photo library sits in `assets/` and is not committed; photos used on the site are resized into `src/assets/images/photos/` and registered in `src/content/photos.yaml` with their photographer (`src/content/photographers.yaml`), which feeds the photo credits page.

Design tokens (colors, type, spacing, radii, breakpoints) are defined once in `src/styles/global.css`. Shared building blocks live in `src/components/ui/` (`Button`, `TextLink`, `Tile`, `SpecRow`, `Shot`, `Credit`, `CutPhoto`, `SectionHeading`, `HeadStrap`) and page sections in `src/components/sections/`.

The home page content is in `src/content/home/<locale>.yaml` and the member associations, with their contact email and map position, in `src/content/associations.yaml`. The agenda is read at build time from the public calendars of the International Slackline Association (`ISA_CALENDAR_FEEDS` in `src/lib/site.ts`): the build needs network access and fails if a calendar cannot be loaded, so the live site keeps its previous version.
