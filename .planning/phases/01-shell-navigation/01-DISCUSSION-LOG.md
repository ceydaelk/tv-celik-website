# Phase 1: Shell & Navigation — Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in 01-CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-05-01
**Phase:** 1-Shell & Navigation
**Areas discussed:** Navbar behavior, Services menu type, Color palette

---

## Navbar Behavior

### Q1: How should the navbar behave on page load?

| Option | Description | Selected |
|--------|-------------|----------|
| Always solid | Dark background from the very top — clear, authoritative | ✓ |
| Transparent → solid on scroll | Starts clear over hero, becomes solid on scroll | |
| Sticky with blur | Frosted glass blur effect, stays at top | |

**User's choice:** Always solid
**Notes:** —

### Q2: Should the navbar stick on scroll?

| Option | Description | Selected |
|--------|-------------|----------|
| Sticky | Stays visible at all times | ✓ |
| Static | Scrolls away with the page | |

**User's choice:** Sticky
**Notes:** —

### Q3: Should the navbar contain a WhatsApp button or phone number?

| Option | Description | Selected |
|--------|-------------|----------|
| WhatsApp button in navbar | Green button on right side — turns nav into a CTA | ✓ |
| Phone number in navbar | Phone link, traditional corporate | |
| Neither — FAB only | Cleaner navbar, WhatsApp only in floating button | |

**User's choice:** WhatsApp button in navbar
**Notes:** —

---

## Services Menu Type

### Q1: How should the Services entry reveal categories and subcategories?

| Option | Description | Selected |
|--------|-------------|----------|
| Mega-menu | Full-width panel, all 5 categories side-by-side | ✓ |
| Hover flyout | Nested hover — category then subcategories | |
| Click dropdown | Click to expand, click category to see subcats | |

**User's choice:** Mega-menu
**Notes:** —

### Q2: How should Services appear in the mobile hamburger menu?

| Option | Description | Selected |
|--------|-------------|----------|
| Accordion | Tap to expand categories, tap category for subcats | ✓ |
| Separate screen | Full-screen service category slide | |
| Flat list | All categories as links, subcats only on services page | |

**User's choice:** Accordion
**Notes:** —

### Q3: Should the mega-menu be triggered by hover or click on desktop?

| Option | Description | Selected |
|--------|-------------|----------|
| Hover | Faster, expected on corporate desktop sites | ✓ |
| Click | More accessible, no accidental opens | |

**User's choice:** Hover
**Notes:** —

---

## Color Palette

### Q1: What overall color direction?

| Option | Description | Selected |
|--------|-------------|----------|
| Dark & industrial | Navy/charcoal primary, steel grey, white text | |
| Clean corporate white + steel blue | White backgrounds, steel blue accent | ✓ |
| White + navy + gold | White base, dark navy, gold accent | |

**User's choice:** Clean corporate white + steel blue
**Notes:** —

### Q2: Navbar background?

| Option | Description | Selected |
|--------|-------------|----------|
| Deep navy / dark | Dark bg, white text — strong contrast, premium | ✓ |
| White with border | Clean but may blend with page | |
| Steel blue | Branded but limits use of blue elsewhere | |

**User's choice:** Deep navy / dark
**Notes:** —

### Q3: Section background alternation?

| Option | Description | Selected |
|--------|-------------|----------|
| White ↔ light grey | Standard corporate alternation | |
| White ↔ very light steel blue tint | Subtle brand color reinforcement | ✓ |
| White only | Maximum cleanliness, spacing-based separation | |

**User's choice:** White ↔ very light steel blue tint
**Notes:** —

---

## Claude's Discretion

- **Typography:** Not discussed — Claude to select a corporate-appropriate font (Geist Sans or Inter, bold headings)
- **Footer layout:** Not specified — Claude decides structure (logo, links, contact)
- **WhatsApp FAB styling:** Standard fixed bottom-right, green circle

## Deferred Ideas

- Mobile FAB scroll behavior (Phase 4 polish)
- Mega-menu hover animations (Phase 4 polish)
- Foldable/portable badge in mega-menu (Phase 3, when data model exists)
