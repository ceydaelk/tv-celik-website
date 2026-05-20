# Phase 2: Home & Services — Discussion Log

> **Audit trail only.** Decisions are captured in 02-CONTEXT.md.

**Date:** 2026-05-02
**Phase:** 2-Home & Services
**Areas discussed:** Hero section, Homepage services section, Service detail pages

---

## Hero Section

### Q1: Hero height

| Option | Description | Selected |
|--------|-------------|----------|
| Full viewport height | Fills entire screen | |
| Large fixed height (~600–700px) | Tall but not full-screen, hint of content | ✓ |
| Medium (half screen) | Compact hero | |

### Q2: Hero background

| Option | Description | Selected |
|--------|-------------|----------|
| Dark charcoal + background image overlay | Real photo with dark overlay | ✓ |
| Solid charcoal, no image | Text-only, no image dependency | |
| Warm white with large heading | Light editorial hero | |

### Q3: Headline tone

| Option | Description | Selected |
|--------|-------------|----------|
| Strength / capability | "Türkiye'nin Önde Gelen..." — authoritative | ✓ |
| Quality / craftsmanship | Benefit-driven, trust-building | |
| Let Claude decide | | |

### Q4: Hero CTAs

| Option | Description | Selected |
|--------|-------------|----------|
| WhatsApp button only | Single strong CTA | |
| WhatsApp + scroll-to-services | Primary WhatsApp, secondary scroll link | ✓ |
| WhatsApp + phone side by side | Two contact methods | |

---

## Homepage Services Section

### Q1: How are 5 categories presented?

| Option | Description | Selected |
|--------|-------------|----------|
| Large image cards in a grid | 5 cards with image, title, description, link | ✓ |
| Horizontal rows with icon + text | Clean, text-heavy | |
| Numbered full-width sections | Editorial, alternating layout | |

### Q2: What sections besides hero and services grid?

| Option | Description | Selected |
|--------|-------------|----------|
| Foldable / portable callout | Dedicated differentiator section | ✓ |
| Trust signals bar | Stats row (years, projects, cities) | ✓ |
| Projects preview strip | 3–4 project card teasers | |
| Bottom WhatsApp CTA section | Full-width CTA before footer | ✓ |

---

## Service Detail Pages

### Q1: What sections on each detail page?

| Option | Description | Selected |
|--------|-------------|----------|
| Hero / page header | Heading, breadcrumb, intro | ✓ |
| Features list | 3–6 bullet points | ✓ |
| Image slot | Single large placeholder image | ✓ |
| WhatsApp CTA block | Conversion section + WhatsApp button | ✓ |

### Q2: Related services at bottom?

| Option | Description | Selected |
|--------|-------------|----------|
| Show other subcategories in same category | Sibling services | ✓ |
| No related services section | Keep it simple | |
| Let Claude decide | | |

### Q3: Services listing page (/hizmetler) layout

| Option | Description | Selected |
|--------|-------------|----------|
| Category sections with subcategory cards | H2 per category, card grid below | ✓ |
| Category tabs | Click to reveal subcategories | |
| Same as homepage cards | 5 large cards only | |

---

## Claude's Discretion

- Section spacing and vertical rhythm
- Trust signal placeholder numbers
- Feature bullet content per service (Turkish placeholder copy)
- Category-only route (`/hizmetler/[kategori]`) implementation approach

## Deferred Ideas

- Projects preview on homepage (Phase 3)
- Real content and image assets (client to provide)
