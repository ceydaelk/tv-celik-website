# Requirements: TV Çelik A.Ş. Corporate Website

**Defined:** 2026-05-01
**Core Value:** A visitor lands on any page, immediately understands what TV Çelik builds, feels confident in their credibility, and reaches them via WhatsApp in one click.

## v1 Requirements

### Pages & Layout

- [ ] **PAGE-01**: User can view Home page with hero, services overview, foldable/portable differentiator callout, projects preview, and footer
- [ ] **PAGE-02**: User can view Corporate (About) page with company story, values, and facility/team section
- [ ] **PAGE-03**: User can view Services listing page showing all 5 main categories as navigable sections
- [ ] **PAGE-04**: User can view a Service Detail page for each of the 28 subcategories, with description and WhatsApp CTA
- [ ] **PAGE-05**: User can view Projects page with real project cards filterable by service category
- [ ] **PAGE-06**: User can view Contact page with WhatsApp link, phone number, email, and address

### Navigation

- [x] **NAV-01**: User sees a navbar with logo and links (Home, Corporate, Services, Projects, Contact) on every page
- [x] **NAV-02**: Services entry in navbar opens a structured dropdown showing all 5 categories and their subcategories
- [x] **NAV-03**: Navbar collapses to hamburger menu on mobile with full menu functionality

### Services Data & Routing

- [ ] **SVC-01**: Services data model defined in TypeScript (5 categories, 28 subcategories, slugs, descriptions, placeholder images)
- [ ] **SVC-02**: Services listing page renders dynamically from data model — adding a subcategory requires only a data change
- [ ] **SVC-03**: Service Detail pages generated via Next.js dynamic routes from data model (`/hizmetler/[category]/[subcategory]`)
- [ ] **SVC-04**: Foldable / portable structures visually highlighted as a key differentiator on homepage and relevant service pages

### Projects

- [ ] **PROJ-01**: Projects data model defined (title, category slug, image, short description, location)
- [ ] **PROJ-02**: Projects page renders project cards from data model
- [ ] **PROJ-03**: User can filter projects by main service category

### WhatsApp & CTAs

- [ ] **CTA-01**: WhatsApp floating action button visible on every page (fixed position, mobile + desktop)
- [ ] **CTA-02**: WhatsApp CTA button present in homepage hero section
- [ ] **CTA-03**: WhatsApp CTA button present on every Service Detail page
- [ ] **CTA-04**: Contact page includes WhatsApp deep link, phone number, and email

### Design & UI

- [ ] **UI-01**: Base styles set up: color palette and font family configured in Tailwind
- [ ] **UI-02**: All pages fully responsive across mobile (375px), tablet (768px), and desktop (1280px+)
- [ ] **UI-03**: Visual identity feels premium and corporate — strong typographic hierarchy, consistent spacing, quality imagery slots
- [x] **UI-04a**: Shell components built — Navbar, Footer, WhatsAppFAB (Phase 1)
- [ ] **UI-04b**: Content components built — Button, Card, ServiceCard, ProjectCard (Phase 2)

### Performance & SEO

- [ ] **PERF-01**: All images use Next.js `<Image>` component with proper sizing
- [ ] **SEO-01**: Each page has a unique Turkish `<title>` and `<meta name="description">`
- [ ] **SEO-02**: Semantic HTML structure (h1, h2, nav, main, footer) on every page

## v2 Requirements

### Localization

- **I18N-01**: Turkish content served via next-intl locale routing (`/tr/...`)
- **I18N-02**: Full English translations for all pages
- **I18N-03**: Language switcher in navbar (TR / EN)
- **I18N-04**: Proper hreflang tags for TR/EN versions

### CMS / Content Management

- **CMS-01**: Admin interface for adding/editing projects without code changes
- **CMS-02**: Admin interface for editing service descriptions

### Extended Features

- **FEAT-01**: Request a quote form on Service Detail pages (email delivery)
- **FEAT-02**: Structured data (JSON-LD) for organization and services
- **FEAT-03**: Project detail page with full gallery and specs
- **FEAT-04**: PDF catalog download for each service category

## Out of Scope

| Feature | Reason |
|---------|--------|
| E-commerce / ordering | Not a sales platform — contact-driven only |
| User accounts | No need for auth; direct contact via WhatsApp/phone |
| Blog / news | Not in brief; adds maintenance overhead |
| Live chat (non-WhatsApp) | WhatsApp is the defined contact channel |
| CMS admin panel | Static data in TypeScript for v1; CMS deferred to v2 |
| i18n routing (TR/EN) | Turkish only for v1; bilingual deferred to v2 |
| Project detail pages | Gallery cards sufficient for v1 |
| Animations / scroll effects | Can add in v2; keep v1 focused and fast |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| UI-01 | Phase 1 | Pending |
| NAV-01 | Phase 1 | Pending |
| NAV-02 | Phase 1 | Pending |
| NAV-03 | Phase 1 | Pending |
| CTA-01 | Phase 1 | Pending |
| UI-04a | Phase 1 | Pending |
| UI-04b | Phase 2 | Pending |
| SVC-01 | Phase 2 | Pending |
| PAGE-01 | Phase 2 | Pending |
| PAGE-03 | Phase 2 | Pending |
| PAGE-04 | Phase 2 | Pending |
| SVC-02 | Phase 2 | Pending |
| SVC-03 | Phase 2 | Pending |
| SVC-04 | Phase 2 | Pending |
| CTA-02 | Phase 2 | Pending |
| CTA-03 | Phase 2 | Pending |
| UI-03 | Phase 2 | Pending |
| PAGE-02 | Phase 3 | Pending |
| PAGE-05 | Phase 3 | Pending |
| PAGE-06 | Phase 3 | Pending |
| PROJ-01 | Phase 3 | Pending |
| PROJ-02 | Phase 3 | Pending |
| PROJ-03 | Phase 3 | Pending |
| CTA-04 | Phase 3 | Pending |
| UI-02 | Phase 4 | Pending |
| PERF-01 | Phase 4 | Pending |
| SEO-01 | Phase 4 | Pending |
| SEO-02 | Phase 4 | Pending |

**Coverage:**
- v1 requirements: 28 total (UI-04 split into UI-04a/UI-04b)
- Mapped to phases: 28
- Unmapped: 0 ✓

---
*Requirements defined: 2026-05-01*
*Last updated: 2026-05-01 — removed i18n from v1, simplified Phase 1 scope*
