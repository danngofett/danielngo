# Accessibility audit

Date: 2026-11-17. Target: WCAG 2.2 AA.

**Method:** manual read of the layouts, components, global CSS and pages, plus calculated colour contrast for the Tailwind colour pairs in use. I did **not** run axe/Lighthouse or test with a screen reader, so treat this as a code review. Please verify the fixes in a browser and with VoiceOver.

## Status: all issues above fixed (2026-11-17)

All 10 non-compliant items and the nice-to-haves were addressed, and print styles were added (`@media print` in `src/styles/global.css`). Still worth doing: run axe/Lighthouse and a VoiceOver pass, and add a captions track if `BaseVideo` is ever used.

## Done in this change

- Theme toggle now has a hover/focus tooltip ("Switch to dark theme" / "Switch to light theme"), which also updates the button's `aria-label` (previously a static sr-only "Dark theme" that never reflected state). The tooltip is hoverable, dismissible with Escape (WCAG 1.4.13), and the icons are `aria-hidden`. See `src/components/ThemeToggle.astro`.

## Non-compliant (should fix)

| # | Issue | WCAG | Where | Fix |
|---|-------|------|-------|-----|
| 1 | **Mobile menu buttons have no accessible name.** The button only contains an SVG. It also uses `aria-pressed` but not `aria-expanded`/`aria-controls`. | 4.1.2, 1.1.1 | `NavToggle.astro` | Add `aria-label` ("Open menu"/"Close menu"), `aria-expanded`, `aria-controls` pointing at the drawer; `aria-hidden` on the SVG. |
| 2 | **Closed nav drawer is still focusable.** It's off-canvas via `-translate-x-full`, so keyboard users tab into invisible links. | 2.4.3, 2.4.7 | `NavDrawer.astro` | Add `inert` (or `visibility:hidden` when closed) and toggle it from `NavToggle`. Move focus into the drawer on open, return it on close. |
| 3 | **Buttons have no visible focus indicator.** `Button.astro` uses `focus:outline-none` plus a `focus-ring` class that isn't defined anywhere. The footer GitHub link also uses `focus:outline-none` with an undefined `text-team-current` colour. | 2.4.7, 2.4.11 | `Button.astro`, `Footer.astro` | Define a real `:focus-visible` style (e.g. `focus-visible:outline-2 focus-visible:outline-offset-2`) and drop `outline-none`. |
| 4 | **Auto-rotating hero text has no pause control.** Cycles forever (only disabled under reduced-motion). | 2.2.2 | `TextReveal.tsx` | Add a pause/play button, or stop after one cycle. Also consider an `aria-live="off"` wrapper and a static sr-only list of the focus areas so screen readers don't get partial text. |
| 5 | **No `<main>` landmark** on the home page and CV page. | 1.3.1, 2.4.1 | `pages/index.astro`, `pages/cv.astro` | Wrap content in `<main>`. |
| 6 | **No "skip to content" link.** | 2.4.1 | all layouts | Add a visually hidden, focusable first link to `#main`. |
| 7 | **Low contrast text.** `text-slate-500` on the `bg-gray-100` cards is **4.32:1** (needs 4.5). In dark mode the footer copyright line has a typo (`dark:text-grey-300`, should be `gray`), so it stays `gray-500` on slate-900 at **3.69:1**. | 1.4.3 | `Card.astro` (description, "In progress"), `Footer.astro:44` | Use `text-slate-600` on the cards; fix the typo to `dark:text-gray-300`. |
| 8 | **Links open in a new tab with no warning**, and the footer Astro link lacks `rel="noopener noreferrer"`. | 3.2.5 (AAA), best practice | `Footer.astro`, `ProjectPost.astro` | Add "(opens in new tab)" as sr-only text; add `rel`. |
| 9 | **Fixed 3-column grid doesn't reflow** on small screens. | 1.4.10 | `pages/travels/[year]/index.astro` (`grid-cols-3`) | `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`. |
| 10 | **Duplicate / empty `<h1>`.** `LandingPage` renders `<h1>{title}</h1>` (empty on pages that don't pass `title`) alongside the sr-only `<h1>` from `IntroHeader`. | 1.3.1, 2.4.6 | `LandingPage.astro`, `IntroHeader.astro`, `TravelPost.astro` | Render the layout `<h1>` only when `title` is set; one h1 per page. |

## Nice to have

- **`aria-current="page"`** on the active `HeaderLink` (only a CSS class today). Also remove the stray `hover:after:` / `outline-` class fragments there and in `Footer.astro`.
- **Name the `<nav>`** (`aria-label="Main"`) and give the footer link group a label.
- **`BaseVideo.astro`:** the `<video>` has no `controls`, no captions track and no `preload` hint. Not used by pages I found, but it would fail 1.2.x and 2.1.1 if used.
- **Decorative vs. informative images:** `BlogPost.astro` hero uses `alt=""` (fine if decorative); card images fall back to `alt=""` when `featured_image_alt` is missing, which is fine because the link has text. Review travel images in MDX for meaningful alt text.
- **Tag pills** in `ProjectPost.astro` are `span`s in a flex row; use a `<ul>` so the count is announced.
- **Heading order in cards:** cards use `h3` under an sr-only `h2` on home, but on `/projects` the cards sit under no `h2`. Add a section heading.
- **Page `<title>` spacing:** `LandingPage` produces "About |  Daniel Ngo" (double space) and travel year pages use an inconsistent format.
- **`cv.astro` lacks `<!doctype html>`**, which triggers quirks mode.
- **`details`/`summary` on About:** has an `h2` inside `summary`; works, but the chevron icon is not `aria-hidden`. Mark the decorative `Icon` SVGs `aria-hidden="true"` by default in `Icon.astro`.
- **Theme:** respect `prefers-color-scheme` on first visit (currently light unless `localStorage` says dark), and update `<meta name="color-scheme">`.
- **Touch targets:** the theme and nav toggle buttons are ~40px; WCAG 2.2 AA minimum is 24px (OK), the 44px AAA target would be better.
- **Reduced motion:** shimmer, scroll and TextReveal already honour `prefers-reduced-motion`; hover lift on secondary `Button` also does. 👍
- **Already good:** `lang="en"` set, iframe has a `title`, lightbox uses native `<dialog>` with labelled close button, zoom buttons have `aria-label`, TOC is a labelled `nav` with `aria-current`.

## Suggested next step

Run `npx @axe-core/cli` or Lighthouse against `pnpm preview` for each page type (home, about, projects index, project post, travels index/country/day) to catch anything in rendered MDX content that I couldn't see from the source.
