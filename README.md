# SoulSpirit Spa — Website

A Next.js 16 / React / TypeScript / Tailwind / Framer Motion build of the
SoulSpirit Spa website (Hyderabad). See `IMAGE-BRIEF.md` for photography
direction and how to swap in real images.

## Running locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm run start   # production build
```

## What's real vs. placeholder

Nothing here fabricates business information. Everything bracketed like
`[SPA ADDRESS]` is a placeholder and must be replaced before launch.

**Photography:** every image on the site is currently a real, licensed
Unsplash stock photo (curated in `lib/images.ts`, free-to-use, no
attribution required) — chosen and colour-graded to fit the brand rather
than left blank. These are a stand-in for SoulSpirit's own photoshoot, not
the destination. See `IMAGE-BRIEF.md` for the full shot list, which key
fills which slot, and exactly how to swap each one for a real photo later.

**Single source of truth for business info:** `lib/site-config.ts`
Update these fields once and they propagate everywhere (nav, footer,
location section, JSON-LD schema, WhatsApp links):

- `location.addressLine`, `location.lat` / `lng`, `location.mapEmbedUrl`
- `contact.phoneDisplay` / `phoneHref`
- `contact.whatsappNumber` (leave empty and the WhatsApp button/links stay inert until set)
- `contact.email`
- `hours`
- `social.instagram` / `social.facebook`

**Treatment menu:** `lib/treatments-data.ts` — categories and treatment
names follow the structure given in the brief. Every `duration` and
`price` field is a placeholder (`[TREATMENT DURATION]` / `[TREATMENT
PRICE]`) — fill in the real menu here and it updates the homepage,
`/treatments`, and every treatment detail page automatically.

**Testimonials:** `components/Testimonials.tsx` — intentionally empty
(`testimonials: Testimonial[] = []`). No reviews have been fabricated. Add
real, attributable guest quotes to the array, or wire this up to a Google
Business Profile feed, once available.

**Membership:** `components/MembershipSection.tsx` — plan names (Essential
/ Restore / Soul) come from the brief; prices and benefits are
placeholders (`[MEMBERSHIP PRICE]`, `[BENEFIT]`).

**Legal pages:** `app/privacy-policy/page.tsx` and `app/terms/page.tsx` are
stubs — replace with real policies before launch (both are currently
`noindex`'d so they don't get indexed half-finished).

## Booking

`/booking` is a fully working 5-step booking UI (treatment → date → time →
details → confirm) with no backend yet. On "Confirm Booking" it shows a
thank-you screen and hands the guest a **pre-filled WhatsApp message**
containing every detail they entered, plus a call button — so booking
requests convert today, without a reservations system. When a real booking
system is ready, replace the `setSubmitted(true)` call in
`components/BookingFlow.tsx` with the actual API call.

## Structure

```
app/                  routes (App Router)
  page.tsx             homepage
  treatments/          menu + /treatments/[slug] detail pages
  about/ experience/ membership/ contact/ booking/
  sitemap.ts robots.ts
components/           all UI, one component per concern
lib/
  site-config.ts       NAP + WhatsApp helpers (see above)
  treatments-data.ts   treatment menu content
```

## Design system

Defined in `tailwind.config.ts`: the ivory/cream/charcoal/bronze palette,
the Fraunces (heading) + Manrope (body) type pair (loaded via
`next/font/google` in `app/layout.tsx`), display type scale, and the
shared `luxe` easing/duration tokens used for every animation. Shared
button/link/section styles live in `app/globals.css` under `@layer
components` (`.btn-primary`, `.btn-outline`, `.link-underline`, etc.) —
reuse those classes rather than one-off styling.

## CMS recommendation

Nothing here requires a CMS to run, but if the team wants to edit
treatments, prices, gallery images or hours without a code deploy, a
headless CMS (Sanity or Payload are good fits for a Next.js App Router
site like this) can replace `lib/treatments-data.ts` and `lib/site-config.ts`
with fetched content later — the component layer already expects exactly
this shape, so the swap is additive.
