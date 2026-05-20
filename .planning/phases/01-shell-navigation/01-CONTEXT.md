# Phase 1: Shell & Navigation — Context

**Gathered:** 2026-05-01
**Status:** Ready for planning

<domain>
## Phase Boundary

Deliver a working app skeleton: Tailwind base styles (colors + font) configured in `globals.css`, a sticky solid dark navbar with mega-menu for services and a WhatsApp button, a footer, and a persistent WhatsApp floating action button — all wired into the root layout. No page content yet. Everything built in phases 2–4 drops into this shell.

</domain>

<decisions>
## Implementation Decisions

### Navbar

- **D-01:** Always solid background — no transparency, no scroll transition. Solid from the top, no JavaScript scroll events needed.
- **D-02:** Sticky — `position: sticky; top: 0` — navbar stays visible at all times as the user scrolls.
- **D-03:** WhatsApp button directly in the navbar, right side. Green button, visible on all screen sizes. This is a conversion anchor, not just a decoration.
- **D-04:** Dark navy background (`#0f172a` or similar deep navy). White text and logo. Strong contrast, premium feel.

### Services Mega-Menu

- **D-05:** Mega-menu on desktop — full-width dropdown panel below the navbar. All 5 categories shown side-by-side in a grid (e.g., 5 columns or 3+2 layout), with subcategories listed under each category header. Not a nested/flyout pattern.
- **D-06:** Triggered by hover on the "Hizmetler" nav link. Closes when the mouse leaves the menu.
- **D-07:** Mobile: accordion inside the hamburger menu. Tapping "Hizmetler" expands the category list; tapping a category expands its subcategories inline. Standard accordion pattern — no separate screen navigation.

### Color Palette

- **D-08:** Overall direction — clean corporate white + steel blue. White backgrounds dominate; steel blue as the primary brand color for CTAs, headings, and accents.
- **D-09:** Section alternation — white sections alternate with a very light steel blue tint (`#f0f7ff` or similar) to create visual rhythm without heavy color contrast.
- **D-10:** Navbar is the exception — deep navy (`#0f172a`) as navbar background. This creates a strong top anchor and separates the chrome from the content.
- **D-11:** Primary CTA color (buttons, links, accents) — steel blue (`#1e5fa8` or `#2563eb` range). WhatsApp button stays green (`#25D366`) regardless of palette.

### Claude's Discretion

- **Typography:** Not discussed. Claude should choose a font that feels clean, modern, and corporate. Geist Sans is already loaded and is acceptable; Inter is also a strong choice for this type of site. Avoid overly decorative or startup-feeling fonts. Headline weight should be bold (700+) for impact.
- **Footer structure:** Not specified. Claude decides the layout — typically: logo + tagline, quick links, services links, contact info (WhatsApp, phone, address). Keep it clean.
- **WhatsApp FAB styling:** Fixed bottom-right corner, `z-50`. Green (`#25D366`), circular, with the WhatsApp icon. Standard implementation.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Project Context
- `.planning/PROJECT.md` — project overview, service categories table (5 cats, 28 subcats), core value, brand constraints
- `.planning/REQUIREMENTS.md` — Phase 1 requirements: NAV-01, NAV-02, NAV-03, CTA-01, UI-01, UI-04

### Phase Plan Source
- `.planning/ROADMAP.md` §Phase 1 — goal, plans, and success criteria for this phase

### No external specs
No external ADRs or design specs exist yet — all decisions are captured in this file.

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- None yet — project is a fresh Next.js scaffold. No existing components to inherit.

### Established Patterns
- **Tailwind CSS 4 configuration** is done in `app/globals.css` via `@theme inline { }` — NOT via `tailwind.config.ts` (there isn't one). All custom colors, fonts, and tokens go in the `@theme inline` block.
- **Font loading** uses Next.js `next/font/google` in `app/layout.tsx`. Geist Sans is currently loaded as `--font-geist-sans`. To change the font, update the import in `app/layout.tsx` and the variable in the `@theme inline` block.
- **Root layout** at `app/layout.tsx` renders `<html lang="en">` with `<body className="min-h-full flex flex-col">`. This is where Navbar and Footer should be inserted as siblings of `{children}`.

### Integration Points
- `app/layout.tsx` — Navbar goes above `{children}`, Footer below, WhatsApp FAB inside `<body>` (absolute stacking). Update `lang="en"` to `lang="tr"` here.
- `app/globals.css` — All brand tokens (colors, font) added here in the `@theme inline` block.

</code_context>

<specifics>
## Specific Ideas

- Reference sites (do NOT copy, extract premium patterns only): zmtprefabrik.com, demonteprefabrik.com, prefabrikyapi.com, karmod.com
- The site serves a Turkish audience — all text content in Turkish. Update `lang="tr"` on the `<html>` element.
- Foldable / portable structures should eventually get a visual badge/highlight in the mega-menu. Noted for Phase 3 when the data model exists — not in scope for Phase 1.

</specifics>

<deferred>
## Deferred Ideas

- Typography deep-dive — user opted to let Claude decide. If a specific font preference emerges during Phase 2, it can be changed in `app/layout.tsx` and `globals.css` at low cost.
- Mobile WhatsApp FAB behavior (hide/show on scroll) — can be added as a polish step in Phase 4.
- Hover animation on mega-menu (fade vs. slide) — Phase 1 ships a working mega-menu; animation polish is Phase 4 scope.

</deferred>

---

*Phase: 1-Shell & Navigation*
*Context gathered: 2026-05-01*
