# AFS website: Claude Code Project Guide

Shared rules for the website of the Association Française de Slackline (AFS): an Astro static site
in French and English, built with the same stack as the Slack'icîmes website.
Personal preferences belong in `~/.claude/CLAUDE.md`; this file wins on any conflict.

## General

- Write code, comments and chat in English. Site copy is French (reference) and English.
- Never generate `.md` files (summaries, quick references, solution docs) unless explicitly asked.
  Page content files under `src/content/` are not concerned.
- Update `README.md` only when adding a feature or a shared component.
- Match existing structure and conventions before changing code.
- Be critical, neutral and objective. Do not affirm the user is right by default.

## Writing style

Never use arrows (`→`) or dashes (`—`, `-`) as punctuation in prose, comments, docs or site copy
you author. Use colons (`:`), or rephrase with periods, commas, or parentheses. Markdown list
bullets and table separators are fine.

## Clean code

### Naming

- Names must be self-explanatory. If you need a comment to explain a variable, rename it.
- Zero tolerance for magic numbers. Every numeric literal (except `0`, `1`, `-1`, and `2` for
  halving or doubling) must be a named constant or derived from one. Applies to assignments,
  arguments, conditions, indices, arithmetic. UI dimensions use the design tokens (see Tokens and
  responsive).
- Variable names must reflect what they actually hold (e.g. `canonicalUrl`, not `url`, when other
  URLs are in scope). Misleading names are worse than bad names.
- Extract complex boolean conditions into well-named variables or functions so logic reads like
  plain English.
- No abbreviations like `dr`, `dc`, `idx`. Prefer `rowOffset`, `pointIndex`, `squaredDistance`.

### Functions

- One function = one task. Split functions that do two things.
- Keep functions short. A function that scrolls is too long.
- Keep cognitive complexity at or below 15. Extract helpers to flatten nested logic.
- Limit positional parameters to 3. Group related parameters into an object. Component props are
  exempt, but a long props list still hints that the component does too much.
- Single level of abstraction per function or component. Pages and sections must not contain
  low-level details (regex patterns, URL building, JSON-LD construction). Extract them to `lib/`.
- No side effects. A function named `buildCanonicalUrl` must not also register a redirect.
- Never return a manually counted value that must stay in sync with another part of the same
  function. Compute it from the source of truth.

### Comments

Default: no comment. Write self-explanatory names instead.

- Only allowed: one sentence explaining a non-obvious WHY (SEO constraint, browser quirk, hosting
  behavior) that a reader would otherwise break.
- Never: what the code does, name restatements, step narration, fix/task/prompt/review history,
  design descriptions, multi-line JSDoc on obvious APIs.
- When tempted to comment, refactor first (extract a variable, rename, extract a function).
- Delete dead or outdated comments immediately.

### Principles

Apply KISS, YAGNI, SRP, Open/Closed, and Dependency Inversion. DRY with nuance: three similar lines
are fine, three identical blocks are not. YAGNI unless the change is already planned.

### Conditionals and errors

- Use guard clauses (early returns) to eliminate nesting.
- Prefer exceptions over error codes. Provide precise, actionable error messages; a broken build
  beats a silently broken page.
- Replace deep `if/else` chains with lookup maps or discriminated unions when applicable.

### Strings and hygiene

- Prefer template literals (`` `${origin}${path}` ``) over concatenation.
- Remove dead code (unused vars, unreachable branches, commented-out blocks). Version control is
  the archive.
- Write testable code. If it is hard to test, the design needs rethinking.
- Let Prettier and ESLint handle spacing, indentation, line length.
- TypeScript in strict mode. No `any`; no non-null assertions without a guard.

## Stack

| Need                       | Choice                                                     |
| :------------------------- | :--------------------------------------------------------- |
| Framework                  | Astro (static output) + Tailwind CSS                       |
| Hosting                    | GitHub Pages, deployed by GitHub Actions on push to `main` |
| Registrations and payments | HelloAsso, linked or embedded                              |
| Tests                      | Vitest                                                     |

No server, no database, no client side framework. JavaScript ships only where a component truly
needs it.

## Project layout

Run `ls` for the live tree. Tests live under `tests/`, mirroring `src/`.

| Artifact       | Location                   | Notes                                               |
| :------------- | :------------------------- | :-------------------------------------------------- |
| Routes         | `src/pages/[...locale]/`   | thin files: pick content, compose sections          |
| Layouts        | `src/layouts/`             | `BaseLayout.astro` owns `<head>` and SEO tags       |
| UI components  | `src/components/ui/`       | presentational building blocks                      |
| Sections       | `src/components/sections/` | page sections composed from ui components           |
| Content        | `src/content/`             | collections with Zod schemas, one entry per locale  |
| Localization   | `src/i18n/`                | locales, UI strings, route mapping                  |
| Pure logic     | `src/lib/`                 | SEO, structured data, URL helpers                   |
| Site constants | `src/lib/site.ts`          | origin, organization data, social links             |
| Design tokens  | `src/styles/global.css`    | Tailwind `@theme` block                             |
| Images         | `src/assets/images/`       | optimized at build through `astro:assets`           |
| Static files   | `public/`                  | `robots.txt`, favicons: files that need a fixed URL |
| Photo library  | `assets/`                  | raw originals, git ignored, never imported directly |

Dependencies point inward: pages use layouts, sections and content; sections use ui components;
everything may use `lib/` and `i18n/`; `lib/` imports nothing from the rest of the project.
Content never contains layout; components never hardcode copy.

## SEO and URLs

- URLs end with a slash (`/agenda/`, `/en/agenda/`), matching how GitHub Pages serves folders.
  Build them with `localizedPath`, never by hand.
- A published URL is permanent. Renaming or removing one needs an explicit decision from the user
  and a redirect pointing straight at its final target, never a chain.
- Slugs are French, short, lowercase, words separated by hyphens. The English page uses the same
  slug under `/en`.
- Every page renders through `BaseLayout` with a unique title and meta description per locale.
- Exactly one `<h1>` per page.
- Every content image has a meaningful `alt` in the page's language; decorative images use
  `alt=""`.
- `hreflang` alternates (`fr-fr`, `en-us`, `x-default` to French) come from the route mapping in
  `src/i18n/`, never hand written per page.
- Structured data is built by `lib/` functions and rendered by the layout, never inlined in pages.
- Pages are `noindex` unless the build runs with `SITE_INDEXABLE=true`, which CI sets only on
  `main` when the repository variable `SITE_INDEXABLE` is `true`.
- No client JavaScript by default. A `client:*` directive needs a reason the reviewer can see in
  the component's purpose (a form, a carousel, a filter); static HTML is always the first option.

## Images and assets

- `assets/` at the repository root is the raw photo library (full size originals, git ignored).
  Never import from it. To use a photo, copy a resized version (2400px on the long side at most)
  into `src/assets/images/photos/` under a descriptive kebab-case name, then register it in
  `src/content/photos.yaml` with its photographer, title and alt text in both locales. Pages use
  photos by their id; the Crédits photo page is built from that registry.
- Never reference images in `src/assets/` as raw string paths. Import them and render with
  `<Image>` or `<Picture>` from `astro:assets`, with explicit `widths`/`sizes` for responsive
  images.
- Credit the photographer of every photo shown (the library folders and file names carry the
  name). Photographers live in `src/content/photographers.yaml`; never write a credit in a
  component. Never publish a credit whose author is not confirmed by the user.
- `public/` is only for files that must keep a fixed URL. Do not put content images there.

## Design system: AFS

The site implements the AFS design system (Claude Design artifact
https://claude.ai/artifact/DQw24SQfFDsB8yAdN4NVuG, its `project/README.md` and component READMEs)
and the page designs of the canvas https://claude.ai/artifact/AZ687Gyz74rcWfZnx8VDPN, page
"V2 · Autour des photos". Its tokens live in `src/styles/global.css`; when the artifact changes,
update the tokens there, never in components. When the artifact and a request disagree, ask.

Binding summary:

- Voice: state facts, no slogans or sales language, address the reader as « vous ». The
  association's Notion wiki is the source for institutional text.
- Color: `paper` and `band` grounds, `blue` for titles and at most one dark panel per page,
  `raspberry` in small frequent touches (main buttons, the strap, markers), never as a large
  surface. Small raspberry text uses `raspberry-deep`.
- Shape: soft corners (`rounded-sm`, `rounded-md`, `rounded-lg`), pills for buttons, fields and
  credit labels. No shadows, no gradients.
- Type: Bricolage Grotesque bold for display (`font-display`), Instrument Sans for text, self
  hosted through the Astro Fonts API.
- Photos: real practice in real places, landscape visible, no stock images. Text sits beside or
  below a photo, never on top. Every photo shows its credit.
- The strap: the raspberry webbing that sags. Once under every page head (`HeadStrap`, following
  the pointer), at most once per page along a cut photo or between two sections.
- No block of plain text longer than three lines: use the containers of the design system (Tile,
  Spec, Points, Levels, Facts, Statement, LinkTile, Rows).

## Tokens and responsive

- Mobile first: base utility classes target phones; `sm:`, `md:`, `lg:` only enlarge. Check every
  change at 375px wide before desktop.
- Colors, fonts, font sizes, spacing, radii and breakpoints are defined once in the `@theme`
  block of `src/styles/global.css`. Never use arbitrary values (`p-[13px]`, `text-[#1a1a1a]`) or
  inline `style` attributes. If no token fits, add one to `@theme`, keeping the existing scale.
- Use the generated utilities (`bg-paper`, `text-ink`), never a hex value in a component.
- Every text color pair passes WCAG AA (4.5:1, 3:1 from 24px). Check new pairs before using them.
- Keyboard focus is visible on every interactive element.
- For links styled as buttons and for actions, use the shared components in
  `src/components/ui/`; never style a raw `<a>` or `<button>` inside a section. If no shared
  component fits, add one there.

## Localization

- Astro i18n routing: French is the default locale at the root, English under `/en`.
- Page copy lives in content collections, one entry per locale. Short UI strings (navigation,
  buttons, form labels) live in `src/i18n/ui.ts`, keyed in `camelCase`, grouped by area.
- Never hardcode user-facing strings in components.
- French is the reference: every key and every content entry exists in both locales. A missing
  translation fails the build, it never falls back silently.

## Forms and third parties

- Registrations, memberships and payments: HelloAsso links or embeds. Never collect payment or
  participant data on the site itself.
- Any third-party script, embed or form service needs explicit approval from the user (privacy and
  performance).

## Testing

- `src/lib/` and `src/i18n/` functions are pure and unit tested with Vitest
  (`tests/**/*.test.ts`).
- `tests/built-pages.test.ts` runs against `dist/` after a build: every published page exists in
  both locales with one `<h1>`, a title, a description and its canonical URL. Add each new page
  slug to `PUBLISHED_PAGE_SLUGS`.

## Git

- `dev` is the integration branch and the base for local work: branch from `dev` and open every
  pull request against `dev`.
- `main` is the release branch (every push deploys): it only receives pull requests from `dev`,
  opened by the user when a release is ready.
- Commit messages and PR titles: `type: Capitalized sentence`, with `fix`, `feat`, `refactor` or
  `chore` (e.g. `feat: Add the agenda page`).

## Agent workflow (reviewers: skip this section)

### Commands

npm scripts only, with the Node version from `.nvmrc`:

- `npm run dev`: local dev server.
- `npm run build`: static build into `dist/`.
- `npm run check`: `astro check` (types and templates).
- `npm run lint` and `npm run format`.
- `npm test`: Vitest, including the built pages test (needs a build first).

### Running and verification

Claude may run the dev server and builds, and look at pages in the browser (prefer the
`agent-browser` skill over raw Playwright). Claude never deploys, never pushes to `main` or `dev`,
never opens a pull request against `main`, and never changes DNS, GitHub Pages settings or
third-party accounts: those belong to the user.

### Definition of done

Before calling a task done:

1. `npm run format`.
2. `npm run lint` and `npm run check`.
3. `npm run build` then `npm test`.
4. New or changed copy exists in both locales (see Localization).
5. Changed pages checked at mobile width (375px) and desktop.
6. No published URL changed without a redirect (see SEO and URLs).
7. `/clean-comments`, when the skill is installed.

### Skills

- Astro and library docs: `context7-auto-research`.
- UI and design: `frontend-design`; review with `web-design-guidelines`.
- Browser checks: `agent-browser`.
- Commit messages and PR descriptions: `/write-summary`.
