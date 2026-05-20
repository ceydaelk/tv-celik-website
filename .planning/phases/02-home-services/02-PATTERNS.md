# Phase 2: Home & Services — Pattern Map

**Mapped:** 2026-05-02
**Files analyzed:** 12 new/modified files
**Analogs found:** 12 / 12

---

## File Classification

| New/Modified File | Role | Data Flow | Closest Analog | Match Quality |
|---|---|---|---|---|
| `src/data/services.ts` | data/model | transform | `src/components/layout/MegaMenu.tsx` (inlined CATEGORIES) | role-match |
| `src/components/home/HeroSection.tsx` | component | request-response | `src/components/common/WhatsAppFAB.tsx` + `src/components/layout/Navbar.tsx` | partial |
| `src/components/home/TrustSignalsBar.tsx` | component | static | `src/components/layout/Footer.tsx` | role-match |
| `src/components/home/ServicesGrid.tsx` | component | transform | `src/components/layout/MegaMenu.tsx` | role-match |
| `src/components/home/ServiceCard.tsx` | component | request-response | `src/components/layout/MegaMenu.tsx` | role-match |
| `src/components/home/FoldableCallout.tsx` | component | static | `src/components/layout/Footer.tsx` | role-match |
| `src/components/home/WhatsAppCTASection.tsx` | component | request-response | `src/components/common/WhatsAppFAB.tsx` | exact |
| `src/components/common/BreadcrumbNav.tsx` | component | transform | `src/components/layout/Navbar.tsx` | role-match |
| `src/components/common/FoldableBadge.tsx` | component | static | `src/components/common/WhatsAppFAB.tsx` | role-match |
| `src/components/services/RelatedServices.tsx` | component | transform | `src/components/layout/MegaMenu.tsx` | role-match |
| `app/page.tsx` | page/route | request-response | `app/layout.tsx` | role-match |
| `app/hizmetler/page.tsx` | page/route | transform | `app/page.tsx` + `src/components/layout/MegaMenu.tsx` | role-match |
| `app/hizmetler/[kategori]/[hizmet]/page.tsx` | page/route (dynamic) | CRUD/static | `app/layout.tsx` | partial |

---

## Pattern Assignments

### `src/data/services.ts` (data model, transform)

**Analog:** `src/components/layout/MegaMenu.tsx` (lines 3–62) — the inlined CATEGORIES const is the direct predecessor of this file.

**Imports pattern** — no imports needed; pure TypeScript data + type exports:
```typescript
// No imports — pure data module
```

**Data structure pattern** (from `src/components/layout/MegaMenu.tsx` lines 3–62):
```typescript
const CATEGORIES = [
  {
    header: "Prefabrik Yapılar",
    slug: "prefabrik-yapilar",
    subcategories: [
      { label: "Tek katlı", slug: "tek-katli" },
      // ...
    ],
  },
  // 4 more categories
] as const;
```

**Phase 2 extension** — each subcategory entry must add `description` and `imagePlaceholder` fields (CONTEXT.md D-12). The extended shape to implement:
```typescript
export interface Subcategory {
  slug: string;
  label: string;
  description: string;
  categorySlug: string;
  imagePlaceholder: string;
}

export interface Category {
  header: string;
  slug: string;
  subcategories: Subcategory[];
}

export const CATEGORIES: Category[] = [ /* ... */ ];

export const SERVICES_MAP: Record<string, Subcategory> = Object.fromEntries(
  CATEGORIES.flatMap(cat => cat.subcategories.map(sub => [sub.slug, sub]))
);
```

**Key rule:** `imagePlaceholder` values follow the pattern `/images/services/{category-slug}/{subcategory-slug}.jpg`. All 5 categories and 28 subcategories must be present — slugs must match EXACTLY what is in `MegaMenu.tsx` and `MobileMenu.tsx` (those files will be updated to import from this module).

**MegaMenu + MobileMenu update** — after `services.ts` is created, replace the inlined CATEGORIES const in both files with:
```typescript
import { CATEGORIES } from "@/data/services";
```
Then delete the local `const CATEGORIES = [ ... ] as const;` blocks entirely (lines 3–62 in MegaMenu.tsx, lines 14–73 in MobileMenu.tsx).

---

### `src/components/home/HeroSection.tsx` (component, request-response)

**Analogs:**
- `src/components/common/WhatsAppFAB.tsx` — WhatsApp `<a>` tag pattern with `target="_blank" rel="noopener noreferrer"`
- `src/components/layout/Navbar.tsx` — `"use client"` directive, lucide-react imports, Tailwind color literal usage

**Directive:** This component uses `<Image>` with `fill` and client-side interaction is minimal — can be a **server component** (no `"use client"` needed) unless scroll behavior requires JS.

**Imports pattern** (copy from `src/components/layout/Navbar.tsx` lines 1–7 as reference):
```typescript
import Image from "next/image";
import { MessageCircle, ChevronDown } from "lucide-react";
```

**WhatsApp button pattern** (copy from `src/components/layout/Navbar.tsx` lines 72–79):
```typescript
<a
  href="https://wa.me/90XXXXXXXXXX?text=Merhaba%2C%20bilgi%20almak%20istiyorum."
  target="_blank"
  rel="noopener noreferrer"
  className="flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-base font-bold text-white transition-colors duration-150 hover:bg-[#1da851] active:scale-95 focus:outline-2 focus:outline-white"
>
  <MessageCircle size={18} />
  WhatsApp&apos;tan Yazın
</a>
```

**Background image pattern** — `<Image>` with `fill` used in the codebase via Next.js conventions. The parent must be `position: relative`:
```typescript
<section className="relative min-h-[600px] max-h-[700px] flex items-center bg-[#1C1C1C]">
  <Image
    src="/images/hero-placeholder.jpg"
    alt=""
    fill
    className="object-cover opacity-30 select-none"
    priority
  />
  <div className="absolute inset-0 bg-[#1C1C1C]/65" />
  <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 w-full">
    {/* content */}
  </div>
</section>
```

**Tailwind color literals in use** (from `src/components/layout/Navbar.tsx`):
- Charcoal background: `bg-[#1C1C1C]`
- WhatsApp green: `bg-[#25D366]`, hover `hover:bg-[#1da851]`
- Copper accent: `text-[#9D7C64]`
- Focus outline: `focus:outline-2 focus:outline-[#9D7C64]` (on copper elements) or `focus:outline-2 focus:outline-white` (on dark bg)
- Active scale: `active:scale-95`

**Export pattern** (from `src/components/layout/Footer.tsx` line 22):
```typescript
export default function HeroSection() { ... }
```
All Phase 2 components use `export default function`.

---

### `src/components/home/TrustSignalsBar.tsx` (component, static)

**Analog:** `src/components/layout/Footer.tsx` — server component, static data, no props.

**Directive:** Server component — no `"use client"`. Pure render.

**Imports pattern** (no icons needed):
```typescript
// No imports beyond JSX — pure static server component
```

**Static data pattern** (copy from `src/components/layout/Footer.tsx` lines 4–17 as reference — local const arrays at top of file):
```typescript
const STATS = [
  { number: "15+", label: "Yıllık Deneyim" },
  { number: "500+", label: "Tamamlanan Proje" },
  { number: "30+", label: "Hizmet Verilen Şehir" },
  { number: "5", label: "Yapı Kategorisi" },
] as const;
```

**Color pattern:**
- Section bg: `bg-[#F3F2EF]`
- Number text: `text-[#1C1C1C]`
- Label text: `text-[#8A8680]`
- Section border: `border-y border-[#DDDBD6]`

**Export pattern** (server component, no directive):
```typescript
export default function TrustSignalsBar() { ... }
```

---

### `src/components/home/ServicesGrid.tsx` (component, transform)

**Analog:** `src/components/layout/MegaMenu.tsx` — iterates over CATEGORIES, renders link grids.

**Directive:** Server component — no `"use client"`. Imports data and renders cards.

**Imports pattern:**
```typescript
import { CATEGORIES } from "@/data/services";
import ServiceCard from "@/components/home/ServiceCard";
```

**Data iteration pattern** (from `src/components/layout/MegaMenu.tsx` lines 79–100):
```typescript
{CATEGORIES.map((cat) => (
  <div key={cat.slug}>
    {/* render per category */}
  </div>
))}
```

**Section id pattern** — section must have `id="hizmetler"` so the Hero secondary CTA anchor `#hizmetler` resolves:
```typescript
<section id="hizmetler" className="bg-[#FAFAF9] py-16">
```

**Export pattern:**
```typescript
export default function ServicesGrid() { ... }
```

---

### `src/components/home/ServiceCard.tsx` (component, request-response)

**Analog:** `src/components/layout/MegaMenu.tsx` — link items with hover state and copper accent.

**Directive:** Server component — no `"use client"`. Receives props, renders `<a>` or `<Link>`.

**Props interface pattern** (copy from `src/components/layout/MegaMenu.tsx` lines 64–67):
```typescript
interface MegaMenuProps {
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}
```
Adapt to:
```typescript
interface ServiceCardProps {
  slug: string;
  categorySlug: string;
  label: string;
  description: string;
  imagePlaceholder: string;
  variant: "homepage" | "listing";
  isFoldable?: boolean;
}
```

**Hover copper accent pattern** (from `src/components/layout/MegaMenu.tsx` line 83):
```typescript
className="... text-[#9D7C64] hover:text-[#866A56]"
```

**Link pattern** (from `src/components/layout/MegaMenu.tsx` line 91):
```typescript
import Link from "next/link";
// ...
<Link href={`/hizmetler/${cat.slug}/${sub.slug}`} ...>
```

**Image with fill pattern** (Next.js convention for card images — parent must be relative + sized):
```typescript
import Image from "next/image";
// ...
<div className="relative h-72 overflow-hidden">
  <Image
    src={imagePlaceholder}
    alt={label}
    fill
    className="object-cover transition-transform duration-300 group-hover:scale-105"
  />
</div>
```

**Group hover pattern** (for overlay + image scale):
```typescript
<a href="..." className="group block relative ...">
  {/* items inside use group-hover:* */}
```

**Export pattern:**
```typescript
export default function ServiceCard({ ... }: ServiceCardProps) { ... }
```

---

### `src/components/home/FoldableCallout.tsx` (component, static)

**Analog:** `src/components/layout/Footer.tsx` — dark charcoal background static section, no client state.

**Directive:** Server component — no `"use client"`.

**Imports pattern:**
```typescript
import Link from "next/link";
```

**Dark section color pattern** (from `src/components/layout/Footer.tsx` line 24):
```typescript
<footer className="bg-[#1C1C1C] text-white">
```
Adapt to:
```typescript
<section className="bg-[#1C1C1C] py-24">
```

**Copper accent stripe pattern** — left border copper accent used in this section (no direct analog in codebase; use inline style from UI-SPEC):
```typescript
<div className="border-l-4 border-[#9D7C64] pl-8">
```

**Copper button pattern** (variant of WhatsApp button but copper — from `src/components/layout/Navbar.tsx` lines 72–79 as structural reference):
```typescript
<Link
  href="/hizmetler/hafif-celik-yapilar/katlanir-tasinabilir"
  className="inline-flex items-center gap-2 rounded-full bg-[#9D7C64] px-6 py-3 text-base font-bold text-white transition-colors duration-150 hover:bg-[#866A56] active:scale-95 focus:outline-2 focus:outline-[#9D7C64]"
>
  Daha Fazla Bilgi Al
</Link>
```

**Export pattern:**
```typescript
export default function FoldableCallout() { ... }
```

---

### `src/components/home/WhatsAppCTASection.tsx` (component, request-response)

**Analog:** `src/components/common/WhatsAppFAB.tsx` — identical WhatsApp button pattern; `src/components/layout/Navbar.tsx` lines 72–79 for the button shape.

**Directive:** Server component — no `"use client"`.

**Imports pattern:**
```typescript
import { MessageCircle } from "lucide-react";
```

**WhatsApp link pattern** (copy exactly from `src/components/common/WhatsAppFAB.tsx` lines 17–26):
```typescript
<a
  href="https://wa.me/90XXXXXXXXXX?text=Merhaba%2C%20proje%20g%C3%B6r%C3%BC%C5%9Fmesi%20yapmak%20istiyorum."
  target="_blank"
  rel="noopener noreferrer"
  className="inline-flex items-center gap-3 rounded-full bg-[#25D366] px-8 py-4 text-base font-bold text-white transition-colors duration-150 hover:bg-[#1da851] active:scale-95 focus:outline-2 focus:outline-white"
>
  <MessageCircle size={20} />
  WhatsApp&apos;tan Yazın
</a>
```

**Separator from FoldableCallout** — add `border-t border-[#9D7C64]/30` on this section's outer element (both sections are `bg-[#1C1C1C]`):
```typescript
<section className="bg-[#1C1C1C] py-24 border-t border-[#9D7C64]/30">
```

**Export pattern:**
```typescript
export default function WhatsAppCTASection() { ... }
```

---

### `src/components/common/BreadcrumbNav.tsx` (component, transform)

**Analog:** `src/components/layout/Navbar.tsx` — link rendering with focus outline pattern; `src/components/layout/Footer.tsx` — link list rendering.

**Directive:** Server component — no `"use client"`. Receives props, pure render.

**Imports pattern:**
```typescript
import Link from "next/link";
import { ChevronRight } from "lucide-react";
```

**Props interface pattern** (from UI-SPEC §8):
```typescript
interface BreadcrumbNavProps {
  items: Array<{ label: string; href?: string }>;
}
```

**Link focus pattern** (from `src/components/layout/Navbar.tsx` line 41):
```typescript
className="... focus:outline-2 focus:outline-[#9D7C64]"
```

**Muted + copper text pattern** (from `src/components/layout/Footer.tsx` lines 19–20):
```typescript
// Muted default:  text-[#8A8680]
// Current page:   text-[#9D7C64] font-bold
// Hover on links: hover:text-[#9D7C64]
// Separator:      text-[#DDDBD6]
```

**Export pattern:**
```typescript
export default function BreadcrumbNav({ items }: BreadcrumbNavProps) { ... }
```

---

### `src/components/common/FoldableBadge.tsx` (component, static)

**Analog:** `src/components/common/WhatsAppFAB.tsx` — inline icon + text span pattern.

**Directive:** Server component — no `"use client"`.

**Imports pattern:**
```typescript
import { Star } from "lucide-react";
```

**Icon + text inline span pattern** (from `src/components/common/WhatsAppFAB.tsx` lines 10–14 — span with icon):
```typescript
<span
  className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wide bg-[#9D7C64] text-white px-2 py-0.5 rounded-sm"
>
  <Star size={10} />
  Öne Çıkan
</span>
```

**Export pattern:**
```typescript
export default function FoldableBadge() { ... }
```

**Foldable slugs** — render this badge when `slug === "katlanir-tasinabilir"` (Hafif Çelik) or `slug === "katlanir-konteyner"` (Konteyner Sistemleri). The check lives in the parent component (ServiceCard or ServiceDetailPage), not inside FoldableBadge.

---

### `src/components/services/RelatedServices.tsx` (component, transform)

**Analog:** `src/components/layout/MegaMenu.tsx` lines 87–99 — renders a filtered subcategory link list.

**Directive:** Server component — no `"use client"`.

**Imports pattern:**
```typescript
import Link from "next/link";
import { CATEGORIES } from "@/data/services";
```

**Props interface pattern:**
```typescript
interface RelatedServicesProps {
  currentSlug: string;
  categorySlug: string;
}
```

**Filtered iteration pattern** (from `src/components/layout/MegaMenu.tsx` lines 87–99 as reference):
```typescript
// Find category, filter out current, slice to 4
const category = CATEGORIES.find(c => c.slug === categorySlug);
const siblings = category?.subcategories.filter(s => s.slug !== currentSlug).slice(0, 4) ?? [];
```

**Link hover border pattern** (matches listing variant card — no direct analog, follows copper accent convention):
```typescript
className="block p-4 border border-[#DDDBD6] rounded-lg text-sm font-normal text-[#1C1C1C] hover:border-[#9D7C64] hover:text-[#9D7C64] transition-colors focus:outline-2 focus:outline-[#9D7C64] rounded-lg"
```

**Export pattern:**
```typescript
export default function RelatedServices({ currentSlug, categorySlug }: RelatedServicesProps) { ... }
```

---

### `app/page.tsx` (page, request-response)

**Analog:** `app/layout.tsx` — shows the server component composition pattern.

**Directive:** Server component — no `"use client"`. All sections are server components so no wrapper directive needed.

**Imports pattern** (copy from `app/layout.tsx` lines 1–6 as structural reference):
```typescript
import HeroSection from "@/components/home/HeroSection";
import TrustSignalsBar from "@/components/home/TrustSignalsBar";
import ServicesGrid from "@/components/home/ServicesGrid";
import FoldableCallout from "@/components/home/FoldableCallout";
import WhatsAppCTASection from "@/components/home/WhatsAppCTASection";
```

**Metadata pattern** (from `app/layout.tsx` lines 14–17):
```typescript
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TV Çelik A.Ş. — Prefabrik ve Çelik Yapı Sistemleri",
  description: "Türkiye'nin önde gelen prefabrik, hafif çelik ve konteyner yapı üreticisi.",
};
```

**Page composition pattern** (from `app/layout.tsx` lines 19–34):
```typescript
export default function Home() {
  return (
    <>
      <HeroSection />
      <TrustSignalsBar />
      <ServicesGrid />
      <FoldableCallout />
      <WhatsAppCTASection />
    </>
  );
}
```
Note: `<main>` wrapper is provided by `app/layout.tsx` — do NOT add another `<main>` in `app/page.tsx`.

---

### `app/hizmetler/page.tsx` (page, transform)

**Analog:** `src/components/layout/MegaMenu.tsx` — iterates CATEGORIES + subcategories; `app/page.tsx` pattern for page metadata.

**Directive:** Server component — no `"use client"`.

**Imports pattern:**
```typescript
import type { Metadata } from "next";
import { CATEGORIES } from "@/data/services";
import ServiceCard from "@/components/home/ServiceCard";
import BreadcrumbNav from "@/components/common/BreadcrumbNav";
```

**Metadata pattern** (from `app/layout.tsx` lines 14–17):
```typescript
export const metadata: Metadata = {
  title: "Hizmetlerimiz — TV Çelik A.Ş.",
  description: "Prefabrik yapılar, hafif çelik sistemler, konteyner çözümleri ve daha fazlası.",
};
```

**Category section id pattern** — anchors must match MegaMenu href targets exactly:
```typescript
<section id={category.slug} className="py-16 border-t border-[#DDDBD6] first:border-t-0">
```

**Export pattern:**
```typescript
export default function HizmetlerPage() { ... }
```

---

### `app/hizmetler/[kategori]/[hizmet]/page.tsx` (page, dynamic/static)

**Analog:** `app/layout.tsx` + `src/components/layout/MegaMenu.tsx` (CATEGORIES structure for `generateStaticParams`).

**Directive:** Server component — no `"use client"`. Uses App Router `generateStaticParams`.

**Imports pattern:**
```typescript
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { CheckCircle, MessageCircle } from "lucide-react";
import { CATEGORIES, SERVICES_MAP } from "@/data/services";
import BreadcrumbNav from "@/components/common/BreadcrumbNav";
import FoldableBadge from "@/components/common/FoldableBadge";
import RelatedServices from "@/components/services/RelatedServices";
```

**generateStaticParams pattern** — iterates CATEGORIES exactly as MegaMenu does:
```typescript
export function generateStaticParams() {
  return CATEGORIES.flatMap(cat =>
    cat.subcategories.map(sub => ({
      kategori: cat.slug,
      hizmet: sub.slug,
    }))
  );
}
```

**notFound pattern** (App Router convention):
```typescript
const service = SERVICES_MAP[params.hizmet];
if (!service || service.categorySlug !== params.kategori) {
  notFound();
}
```

**Dynamic metadata pattern:**
```typescript
export function generateMetadata({ params }: { params: { kategori: string; hizmet: string } }): Metadata {
  const service = SERVICES_MAP[params.hizmet];
  return {
    title: service ? `${service.label} — TV Çelik A.Ş.` : "Hizmet",
  };
}
```

**Foldable badge condition:**
```typescript
const FOLDABLE_SLUGS = ["katlanir-tasinabilir", "katlanir-konteyner"] as const;
const isFoldable = FOLDABLE_SLUGS.includes(params.hizmet as typeof FOLDABLE_SLUGS[number]);
```

**Export pattern:**
```typescript
export default function HizmetDetayPage({ params }: { params: { kategori: string; hizmet: string } }) { ... }
```

---

## Shared Patterns

### "use client" directive rule
**Source:** `src/components/layout/Navbar.tsx` line 1, `src/components/layout/MobileMenu.tsx` line 1
**Apply to:** Only components that use React hooks (`useState`, `useEffect`) or browser event handlers.
**Do NOT apply to:** HeroSection, TrustSignalsBar, ServicesGrid, ServiceCard, FoldableCallout, WhatsAppCTASection, BreadcrumbNav, FoldableBadge, RelatedServices, all page files — these are all server components.
```typescript
"use client";  // ONLY add this when hooks are needed
```

### Export pattern
**Source:** `src/components/layout/Footer.tsx` line 22, `src/components/layout/MegaMenu.tsx` line 69
**Apply to:** All new component and page files.
```typescript
export default function ComponentName() { ... }
// Named export ONLY for WhatsAppFAB (existing exception) — all new files use default export
```

### Tailwind CSS 4 color literals (MANDATORY)
**Source:** `app/globals.css` lines 3–16 (token definitions), `src/components/layout/Navbar.tsx` (usage)
**Apply to:** Every new TSX file. Use hex literals — NOT token names.
```typescript
// CORRECT — hex literal:
className="bg-[#1C1C1C] text-[#9D7C64] hover:text-[#866A56]"

// WRONG — do NOT use token names:
className="bg-charcoal text-accent hover:text-accent-hover"
```
Full color reference:
- `bg-[#1C1C1C]` — charcoal backgrounds (Navbar, Footer, Hero, FoldableCallout, WhatsAppCTASection)
- `bg-[#FAFAF9]` — warm white page background (ServicesGrid, listing page, detail page)
- `bg-[#F3F2EF]` — surface tint (TrustSignalsBar, card image placeholders, features block)
- `text-[#9D7C64]` — copper accent (category labels, h2 headings, current breadcrumb, badge bg)
- `hover:text-[#866A56]` — copper accent hover
- `text-[#8A8680]` — muted text (descriptions, stat labels, breadcrumb default)
- `border-[#DDDBD6]` — borders (card borders, section dividers)
- `bg-[#25D366]` — WhatsApp green (buttons only)
- `hover:bg-[#1da851]` — WhatsApp green hover
- `bg-[#9D7C64]` — copper button background (FoldableCallout CTA)
- `hover:bg-[#866A56]` — copper button hover

### Typography (MANDATORY — two weights only)
**Source:** `app/layout.tsx` lines 8–12 (Inter loaded with `weight: ["400", "700"]` only)
**Apply to:** Every new TSX file.
```typescript
// Allowed:
className="font-normal"  // weight 400
className="font-bold"    // weight 700

// FORBIDDEN — Inter only has 400 and 700 loaded:
className="font-medium"   // NOT loaded
className="font-semibold" // NOT loaded
className="font-light"    // NOT loaded
```

### Import path alias
**Source:** `tsconfig.json` lines 21–23 (`"@/*": ["./src/*"]`)
**Apply to:** All import statements in component and page files.
```typescript
// CORRECT:
import Navbar from "@/components/layout/Navbar";
import { CATEGORIES } from "@/data/services";

// WRONG — relative imports:
import Navbar from "../../components/layout/Navbar";
```
**Exception:** `app/` files import from `app/` siblings using relative paths if needed (e.g., `"./globals.css"`), but all `src/` imports use `@/`.

### External link safety
**Source:** `src/components/layout/Navbar.tsx` lines 73–76, `src/components/common/WhatsAppFAB.tsx` lines 17–20
**Apply to:** Every `<a>` that opens a new tab (`target="_blank"`).
```typescript
target="_blank"
rel="noopener noreferrer"
```

### Transition classes
**Source:** `src/components/layout/Navbar.tsx` line 76 (`transition-colors duration-150`)
**Apply to:** All hover state transitions on interactive elements.
```typescript
className="... transition-colors duration-150"  // colors only
className="... transition-all duration-300"     // scale/transform (image zoom)
```

### Active scale
**Source:** `src/components/layout/Navbar.tsx` line 76 (`active:scale-95`)
**Apply to:** All CTA buttons (WhatsApp buttons, copper buttons).
```typescript
className="... active:scale-95"
```

### Focus outline
**Source:** `src/components/layout/Navbar.tsx` lines 31, 41, 54
**Apply to:** All interactive elements (links, buttons).
```typescript
// On dark backgrounds (charcoal sections):
className="... focus:outline-2 focus:outline-white"

// On light backgrounds or copper elements:
className="... focus:outline-2 focus:outline-[#9D7C64]"

// On links in lists with border-radius:
className="... focus:rounded focus:outline-2 focus:outline-[#9D7C64]"
```

### Turkish apostrophe escaping
**Source:** `src/components/layout/Navbar.tsx` line 79, `src/components/layout/Footer.tsx` line 79, `src/components/layout/MobileMenu.tsx` line 184
**Apply to:** Any JSX text containing `'` (apostrophe) in a Turkish string.
```typescript
// CORRECT — escaped for JSX:
WhatsApp&apos;tan Yazın

// WRONG — causes JSX parse error:
WhatsApp'tan Yazın
```

### `as const` for static data arrays
**Source:** `src/components/layout/Navbar.tsx` line 14, `src/components/layout/MegaMenu.tsx` line 62, `src/components/layout/Footer.tsx` lines 9, 17
**Apply to:** All local `const` arrays that contain static data.
```typescript
const STATS = [ ... ] as const;
```

### Max-width container pattern
**Source:** `src/components/layout/Navbar.tsx` line 26, `src/components/layout/Footer.tsx` line 25
**Apply to:** All full-width section containers.
```typescript
// Standard layout container (used everywhere):
<div className="max-w-7xl mx-auto px-6">

// Narrow reading container (ServiceDetailPage only):
<div className="max-w-4xl mx-auto px-6">
```

### Page route placement
**Source:** `app/layout.tsx`, `app/page.tsx`
**Apply to:** All new page files.
- Pages live in `app/` — NOT `src/app/`
- `app/page.tsx`, `app/hizmetler/page.tsx`, `app/hizmetler/[kategori]/[hizmet]/page.tsx`
- Components live in `src/components/{category}/{Name}.tsx`
- Data files live in `src/data/{name}.ts`

### WhatsApp phone number placeholder
**Source:** `src/components/common/WhatsAppFAB.tsx` line 18, `src/components/layout/Navbar.tsx` line 17, `src/components/layout/Footer.tsx` line 73
**Apply to:** Every WhatsApp `href` in Phase 2.
```typescript
// Use same placeholder as existing files:
"https://wa.me/90XXXXXXXXXX?text=..."
```

---

## No Analog Found

All files have analogs. No entries.

---

## Metadata

**Analog search scope:** `src/components/layout/`, `src/components/common/`, `app/`
**Files scanned:** 7 (Navbar.tsx, MegaMenu.tsx, MobileMenu.tsx, Footer.tsx, WhatsAppFAB.tsx, layout.tsx, page.tsx)
**Pattern extraction date:** 2026-05-02
