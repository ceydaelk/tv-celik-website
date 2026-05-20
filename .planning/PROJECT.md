# TV Çelik A.Ş. — Corporate Website

## What This Is

A bilingual (Turkish + English) corporate website for TV Çelik A.Ş., a Turkish manufacturer of prefabricated structures, light steel structures, container systems, and industrial steel structures. The site presents five service categories (28 subcategories), builds trust with potential B2B and B2C clients, and drives inquiries primarily through WhatsApp.

## Core Value

A visitor lands on any page and immediately understands what TV Çelik builds, feels confident in their credibility, and can reach them via WhatsApp in one click.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] Home page with hero, services overview, key differentiators (foldable/portable highlighted), and projects preview
- [ ] Corporate (About) page presenting company history, values, and team/facility
- [ ] Services listing page — 5 main categories with clear navigation
- [ ] Service Detail pages — one per subcategory (28 total), each with description and CTA
- [ ] Projects page — real project cards filterable by category
- [ ] Contact page with WhatsApp, phone, email, and map/address
- [ ] Bilingual support (Turkish + English) with language switcher in navbar
- [ ] WhatsApp floating button persistent across all pages
- [ ] Mega-menu or structured dropdown navbar covering all service categories
- [ ] Responsive design — mobile, tablet, desktop
- [ ] Premium, corporate visual identity (not generic template)
- [ ] Foldable / portable structures highlighted as key differentiator throughout
- [ ] Modular, scalable codebase (new services/pages can be added easily)

### Out of Scope

- E-commerce / online ordering — not a sales platform
- User accounts / authentication — contact is direct (WhatsApp/phone)
- Blog/news section — not in v1 scope
- Live chat beyond WhatsApp — unnecessary complexity
- CMS / admin panel — static data managed in code for v1

## Context

- **Stack**: Next.js 16.2.4, React 19.2.4, TypeScript, Tailwind CSS 4 — already scaffolded in repo
- **Language**: Turkish primary, English secondary — bilingual from day one with i18n routing
- **Brand assets**: None yet — logo, colors, and project photos are placeholders; design must be production-ready when assets arrive
- **CTA priority**: WhatsApp is the primary conversion point; phone is secondary
- **Reference sites analyzed**: zmtprefabrik.com, demonteprefabrik.com, prefabrikyapi.com, karmod.com — extract premium patterns, don't copy

**Service structure (5 categories, 28 subcategories):**

| Category | Subcategories |
|----------|--------------|
| Prefabricated Structures | Single-storey, Two-storey, Villas, Construction site, Office & admin, Social facilities, Education & healthcare |
| Light Steel Structures | Light steel houses, Villa projects, Tiny house, Modular housing systems, **Foldable / portable** ← key differentiator |
| Container Systems | Living, Office, Construction site, Tiny house, **Foldable**, Custom design |
| Industrial Steel Structures | Steel hangars, Factory buildings, Warehouses, Animal shelters, Agricultural structures |
| Structural Components / Production | Steel profiles, Chassis systems, Roof & steel sheet, Panel & cladding, Custom production |

## Constraints

- **Tech**: Next.js App Router with file-based routing — already chosen
- **i18n**: Bilingual routing from day one (e.g. `/tr/...` and `/en/...` or `next-intl`)
- **Brand**: No final brand assets — design with placeholder-ready slots for logo, colors, real photos
- **Performance**: Corporate credibility requires fast load — no heavy unoptimized assets
- **Scale**: 28 service subcategories today, potentially more — routing and data model must handle this

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Next.js App Router | Already scaffolded, best for file-based routing at this scale | — Pending |
| Bilingual from day one | TR+EN required; retrofitting i18n later is painful | — Pending |
| WhatsApp as primary CTA | User instruction: WhatsApp first everywhere | — Pending |
| Static data for v1 | No CMS needed yet; services/projects as TypeScript data files | — Pending |
| Foldable/portable as differentiator | Explicitly requested to be highlighted throughout site | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-05-01 after initialization*
