# Roadmap: TV Çelik A.Ş. Corporate Website

**Milestone:** v1.0 — Launch-ready Turkish corporate website
**Phases:** 4 | **Requirements:** 27 | **Coverage:** 100% ✓

---

## Phase Overview

| # | Phase | Goal | Requirements | Plans |
|---|-------|------|--------------|-------|
| 1 | Shell & Navigation | Working app skeleton: navbar, footer, WhatsApp FAB, base styles | NAV-01–03, CTA-01, UI-01, UI-04a | 2 (2 done ✅) |
| 2 | Home & Services | Hero, services listing, 28 dynamic service detail pages | PAGE-01, 03–04, SVC-01–04, CTA-02–03, UI-03, UI-04b | 3 |
| 3 | Core Pages | Corporate (About), Projects (filtered), Contact | PAGE-02, 05–06, PROJ-01–03, CTA-04 | 2 |
| 4 | Polish & SEO | Responsive pass, SEO metadata, image optimization | UI-02, PERF-01, SEO-01–02 | 2 |

---

## Phase 1: Shell & Navigation

**Goal:** Get a working app skeleton on screen fast — Tailwind base styles, layout, navbar with services dropdown, footer, and persistent WhatsApp FAB. Every subsequent phase drops pages into this shell.

**Requirements:** NAV-01, NAV-02, NAV-03, CTA-01, UI-01, UI-04a

**Plans:**
1. **Base setup** — Configure Tailwind with a color palette (primary steel blue/dark, neutral greys, accent gold/orange) and font family (e.g. Inter or similar). Set up root layout with `<html>`, `<body>`, and persistent WhatsApp FAB component (fixed bottom-right, links to wa.me).
2. **Navbar & footer** — Build responsive Navbar: logo slot, nav links (Home, Corporate, Services, Projects, Contact), Services dropdown showing all 5 categories and subcategories, mobile hamburger. Build Footer: company name, quick links, WhatsApp/phone, address.

**Success criteria:**
1. App shell renders at `/` with navbar and footer visible
2. Services dropdown/menu opens and lists all 5 categories with their subcategories
3. Mobile hamburger opens and all links are reachable at 375px
4. WhatsApp FAB is fixed in bottom-right corner on every page
5. Color palette and font are applied consistently across shell

---

## Phase 2: Home & Services

**Goal:** Build the commercial core — the homepage that sells the company, the services listing, and all 28 service detail pages. This is the highest-value content for visitors.

**Requirements:** SVC-01, PAGE-01, PAGE-03, PAGE-04, SVC-02, SVC-03, SVC-04, CTA-02, CTA-03, UI-03, UI-04b

**Plans:** 3 plans

Plans:
- [ ] 02-01-PLAN.md — Services data model: src/data/services.ts (5 categories, 28 subcategories) + update MegaMenu/MobileMenu imports
- [ ] 02-02-PLAN.md — Homepage: HeroSection, TrustSignalsBar, ServicesGrid, ServiceCard, FoldableCallout, WhatsAppCTASection wired into app/page.tsx
- [ ] 02-03-PLAN.md — Services pages: BreadcrumbNav, FoldableBadge, RelatedServices + app/hizmetler/page.tsx + app/hizmetler/[kategori]/[hizmet]/page.tsx (28 static routes)

**Success criteria:**
1. Hero WhatsApp CTA button links to correct wa.me URL
2. Services listing page shows all 5 categories with all 28 subcategory cards
3. All 28 dynamic service detail routes resolve without 404
4. Foldable/portable subcategories have a visual differentiator badge or highlight
5. Every service detail page has a WhatsApp CTA button
6. Home page renders all sections without layout breaks

---

## Phase 3: Core Pages

**Goal:** Build the three remaining pages — Corporate (trust-building), Projects (social proof), Contact (conversion) — to complete the site structure.

**Requirements:** PAGE-02, PAGE-05, PAGE-06, PROJ-01, PROJ-02, PROJ-03, CTA-04

**Plans:**
1. **Corporate & Contact pages** — `/kurumsal` — company story section, values/mission, team or facility image grid, placeholder for certifications. `/iletisim` — WhatsApp button (primary, large), phone number, email address, physical address, optional Google Maps embed.
2. **Projects page** — Define `src/data/projects.ts` (title, category slug, image, description, location). Build `/projeler` with project cards grid and category filter tabs (All + 5 category filters).

**Success criteria:**
1. `/kurumsal` renders all sections with no layout breaks
2. `/iletisim` WhatsApp button opens correct deep link; phone number is visible
3. Projects page renders all cards from data model
4. Category filter tabs correctly show/hide cards by category
5. All three pages are reachable from the navbar

---

## Phase 4: Polish & SEO

**Goal:** Tighten the site before launch — full responsive pass, SEO metadata on every page, and image optimization.

**Requirements:** UI-02, PERF-01, SEO-01, SEO-02

**Plans:**
1. **Responsive pass** — Test and fix all pages at 375px (mobile), 768px (tablet), 1280px (desktop). Fix any overflow, stacking, font size, or spacing issues. Ensure navbar, hero, cards, and forms all work on small screens.
2. **SEO & images** — Add `generateMetadata` with unique Turkish `<title>` and `<meta description>` to every page. Audit all images — replace any raw `<img>` tags with Next.js `<Image>`. Verify semantic HTML: one `<h1>` per page, `<nav>`, `<main>`, `<footer>` landmarks present.

**Success criteria:**
1. No horizontal overflow or broken layouts at 375px on any page
2. Every page has a unique `<title>` containing "TV Çelik" and a Turkish `<meta description>`
3. Zero raw `<img>` tags — all use Next.js `<Image>` with width/height
4. Each page has exactly one `<h1>` and correct landmark structure
5. No console errors in Chrome DevTools on any page

---

## Requirement Coverage

| Requirement | Phase |
|-------------|-------|
| UI-01 | 1 |
| NAV-01 | 1 |
| NAV-02 | 1 |
| NAV-03 | 1 |
| CTA-01 | 1 |
| UI-04a | 1 |
| UI-04b | 2 |
| SVC-01 | 2 |
| PAGE-01 | 2 |
| PAGE-03 | 2 |
| PAGE-04 | 2 |
| SVC-02 | 2 |
| SVC-03 | 2 |
| SVC-04 | 2 |
| CTA-02 | 2 |
| CTA-03 | 2 |
| UI-03 | 2 |
| PAGE-02 | 3 |
| PAGE-05 | 3 |
| PAGE-06 | 3 |
| PROJ-01 | 3 |
| PROJ-02 | 3 |
| PROJ-03 | 3 |
| CTA-04 | 3 |
| UI-02 | 4 |
| PERF-01 | 4 |
| SEO-01 | 4 |
| SEO-02 | 4 |

**Total v1 requirements:** 27
**Mapped:** 27
**Unmapped:** 0 ✓

---
*Roadmap created: 2026-05-01*
*Revised: 2026-05-01 — removed i18n, simplified Phase 1 to shell+nav, faster iteration order*
*Revised: 2026-05-02 — Phase 2 plans listed (02-01, 02-02, 02-03)*
