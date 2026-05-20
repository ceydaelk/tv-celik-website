# Phase 2: Home & Services — Context

**Gathered:** 2026-05-02
**Status:** Ready for planning

<domain>
## Phase Boundary

Deliver the commercial core of the site: a TypeScript services data model, the homepage (hero + trust signals + services grid + foldable callout + WhatsApp CTA), the services listing page showing all 28 subcategories, and 28 dynamic service detail pages. No projects page (Phase 3). No real images — all image slots use Next.js `<Image>` with placeholder dimensions.

</domain>

<decisions>
## Implementation Decisions

### Hero Section

- **D-01:** Height: Large fixed height — approximately 600–700px (`min-h-[600px]` or `h-[700px]`). NOT full viewport height. Hint of content below the fold.
- **D-02:** Background: Dark charcoal overlay over a background image. Use `relative` container with `<Image fill objectFit="cover" className="opacity-30"` behind the content, or a CSS `bg-cover` div with a dark overlay. Placeholder image for now — real photo slot clearly marked. The effect: charcoal tones with a faint structural/steel texture visible.
- **D-03:** Headline tone: Strength and capability. Example: `"Türkiye'nin Önde Gelen Prefabrik ve Çelik Yapı Üreticisi"` — authoritative, positions the company. Subheadline: one line about scope (prefabrik, hafif çelik, konteyner sistemleri).
- **D-04:** CTAs: Two buttons. Primary: WhatsApp (green, `"WhatsApp'tan Yazın"` with MessageCircle icon). Secondary: scroll-to-services anchor (`"Hizmetlerimizi Keşfedin"` with ChevronDown icon, links to `#hizmetler` section id). Secondary button style: outline/ghost, white border on dark background.

### Homepage Sections (order)

- **D-05:** Section order: `Hero` → `Trust Signals Bar` → `Services Grid` → `Foldable/Portable Callout` → `Bottom WhatsApp CTA` → `Footer`
- **D-06:** No projects preview on homepage — omit entirely for Phase 2. (Projects section lives on its own page in Phase 3.)
- **D-07:** Trust signals bar: compact horizontal strip with 3–4 stats (e.g. years in business, project count, cities served, service count). Warm white or light stone background. Placeholder numbers for now.
- **D-08:** Services grid: 5 large image cards in a grid layout. Each card: background image slot (placeholder), category title overlay, short description, link to `/hizmetler/{slug}`. Dark overlay on card image. Copper accent on hover border or category label.
- **D-09:** Foldable/portable callout: dedicated section (dark charcoal background or strong accent band) highlighting "Katlanır / Taşınabilir" structures as a key differentiator. Strong headline about portability + short copy + WhatsApp CTA. Relevant for: Katlanır / taşınabilir (Hafif Çelik) and Katlanır konteyner (Konteyner Sistemleri).
- **D-10:** Bottom WhatsApp CTA: full-width section (`"Projenizi Konuşalım"` headline + short copy + large WhatsApp button). Dark charcoal background. Placed just before footer.

### Services Data Model (`src/data/services.ts`)

- **D-11:** Single source of truth for all service data. Replaces the inlined CATEGORIES arrays in MegaMenu.tsx and MobileMenu.tsx (those files should import from services.ts in Phase 2 execution).
- **D-12:** Each subcategory entry: `{ slug: string, label: string, description: string, categorySlug: string, imagePlaceholder: string }`. Description: 1–2 sentences about that specific service. Placeholder image path: `/images/services/{category-slug}/{subcategory-slug}.jpg` — file doesn't need to exist, just the path.
- **D-13:** Export structure: `CATEGORIES` array (same structure as current MegaMenu/MobileMenu arrays, extended with descriptions and image paths) + a `SERVICES_MAP` helper (flat Record keyed by slug for O(1) lookup in dynamic routes).

### Services Listing Page (`/hizmetler`)

- **D-14:** Layout: One section per category, each with an `<h2>` category heading, optional short category description, then a card grid of its subcategories. All 5 categories in one page — user scrolls through all 28. No tabs, no filtering (just anchor links per category if needed).
- **D-15:** Subcategory card: image slot (placeholder), service title, one-line description, link to detail page. Hover: copper accent border or subtle lift.

### Service Detail Pages (`/hizmetler/[kategori]/[hizmet]`)

- **D-16:** Route: Next.js App Router dynamic route at `app/hizmetler/[kategori]/[hizmet]/page.tsx`. `generateStaticParams` from CATEGORIES data to pre-render all 28 pages at build.
- **D-17:** Page sections (in order):
  1. Breadcrumb: `Ana Sayfa > Hizmetler > [Category] > [Service]`
  2. Page header: `<h1>` service title + 1–2 sentence intro from data
  3. Image slot: single large placeholder image (`<Image>` with explicit width/height)
  4. Features list: 3–6 bullet points (placeholder content per service — Claude generates plausible Turkish feature bullets)
  5. WhatsApp CTA block: `"Bu hizmet hakkında bilgi almak için"` + WhatsApp button (CTA-03)
  6. Related services: heading `"Aynı Kategorideki Diğer Hizmetler"` + 3–4 sibling subcategory links
- **D-18:** Foldable/portable items (`katlanir-tasinabilir`, `katlanir-konteyner`) get a small visual badge or highlight in their page header — e.g. `"★ Öne Çıkan"` or a copper accent tag.

### Claude's Discretion

- **Section spacing:** Claude decides vertical rhythm between homepage sections — generous spacing (py-16 to py-24) to keep sections breathable.
- **Trust signal numbers:** Claude uses reasonable placeholder values (e.g. "15+ yıl", "500+ proje", "30+ şehir").
- **Feature bullet content:** Claude generates 4–5 plausible Turkish feature bullets per service based on the service name and category. These are placeholder content — real content to be filled in Phase 4 or by the client.
- **Category page routing:** `/hizmetler/[kategori]` (category-only route, e.g. `/hizmetler/prefabrik-yapilar`) — Claude decides whether to implement as a redirect to `/hizmetler#prefabrik-yapilar` or as a separate page showing only that category's subcategories.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Project Context
- `.planning/PROJECT.md` — project overview, service categories, core value
- `.planning/REQUIREMENTS.md` — Phase 2 requirements: SVC-01–04, PAGE-01, PAGE-03–04, CTA-02–03, UI-03, UI-04b

### Phase Plan Source
- `.planning/ROADMAP.md` §Phase 2 — goal, plans, success criteria

### Prior Phase Context
- `.planning/phases/01-shell-navigation/01-CONTEXT.md` — Phase 1 decisions (color palette actuals, typography, component patterns)
- `.planning/phases/01-shell-navigation/01-01-SUMMARY.md` — brand tokens, Inter font, tsconfig @/* alias to src/
- `.planning/phases/01-shell-navigation/01-02-SUMMARY.md` — layout components, CATEGORIES data inlined in MegaMenu + MobileMenu

### No external specs
No external ADRs — all decisions captured in this file.

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `src/components/layout/Navbar.tsx` — already wired; Phase 2 pages inherit the nav automatically
- `src/components/layout/Footer.tsx` — already wired; all pages get footer
- `src/components/common/WhatsAppFAB.tsx` — already wired in root layout; Phase 2 pages inherit it
- `src/components/layout/MegaMenu.tsx` and `MobileMenu.tsx` — contain inlined CATEGORIES arrays that should be replaced with imports from `src/data/services.ts` in Phase 2

### Established Patterns
- **Tailwind CSS 4 tokens in use:** `bg-[#1C1C1C]` (charcoal), `bg-[#FAFAF9]` (warm white), `bg-[#F3F2EF]` (surface tint), `text-[#9D7C64]` (copper accent), `hover:text-[#866A56]`
- **Component path:** `src/components/{category}/{ComponentName}.tsx`, imported via `@/{category}/{ComponentName}`
- **Data path:** new — `src/data/{datafile}.ts`, imported via `@/data/{datafile}`
- **Page routes:** Next.js App Router — new pages at `app/{route}/page.tsx` (no `src/app/` — pages live directly in `app/`)
- **Font weights in use:** 400 (regular) and 700 (bold) only — no font-medium, font-semibold, etc.

### Integration Points
- `app/page.tsx` — currently a minimal placeholder div. Phase 2 replaces this with the full homepage.
- `app/layout.tsx` — wraps all pages in Navbar + main + Footer + WhatsAppFAB. Phase 2 pages slot into `{children}`.
- New route `app/hizmetler/page.tsx` — services listing
- New route `app/hizmetler/[kategori]/[hizmet]/page.tsx` — 28 dynamic detail pages

</code_context>

<specifics>
## Specific Ideas

- Hero image placeholder: use a grey/dark gradient or a construction/steel texture image from a free stock source — Unsplash `site:unsplash.com steel structure` or just a CSS gradient until real photos arrive.
- The trust signals bar sits between hero and services grid — acts as a visual breathing break and establishes credibility before showing services.
- Foldable/portable callout section: think "highlighted feature" — could use the warm stone tint (`#F3F2EF`) or the charcoal (`#1C1C1C`) to make it stand out from the white sections around it.
- Services listing page: add section `id` attributes matching category slugs (e.g. `id="prefabrik-yapilar"`) so the navbar mega-menu links can anchor directly to each category.

</specifics>

<deferred>
## Deferred Ideas

- Projects preview on homepage — deferred to Phase 3 when the projects page is built. User opted not to include it in Phase 2.
- `/hizmetler/[kategori]` category-only pages (e.g. `/hizmetler/prefabrik-yapilar`) — Claude decides whether to implement as redirect or standalone page. Not a user-facing requirement for Phase 2.
- Real content / actual Turkish copy per service — placeholder content for Phase 2; proper content to be provided by client for v1 polish.
- Image assets for services — placeholder dimensions only; real photos to be swapped in when provided.

</deferred>

---

*Phase: 2-Home & Services*
*Context gathered: 2026-05-02*
