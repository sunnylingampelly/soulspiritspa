# SoulSpirit Spa — Photography Reference

> Last verified against the live code on 2026-09-15. If you edit
> `lib/images.ts` or change which component uses which key, update the
> tables below in the same change — this file is a map of the *actual*
> site, not an aspirational plan.

Every photo on the site is now real SoulSpirit photography, supplied
directly by the client into `public/gallery/`. There is no stock imagery
and no external image host anywhere on the site — every `<img>` is served
from a local file, so there's nothing to license, watermark-check, or
worry about going down with a third party.

## The 13 source files (`public/gallery/`)

| File | Shows | Native size |
|---|---|---|
| `hero-web.webp` | Wide shot of a private treatment suite — water feature, plants, styled bed | 1672×941 |
| `hero-mobile.webp` | Portrait crop of the same suite | 853×1844 |
| `mobile-hero.webp` | A real therapist performing a herbal compress massage (the only shot with an identifiable face) | 941×1672 |
| `gallery-01.png` | Foot reflexology, close-up, candlelit | 400×400 |
| `gallery-02.png` | Herbal compress balls, oils and a plumeria flower, styled on a woven mat | 400×400 |
| `gallery-03.png` | Therapist performing a foot massage, oils and towel visible | 400×400 |
| `gallery-04.png` | Rolled towels, amber oil bottles, plumeria, candle on marble | 400×400 |
| `gallery-05.png` | Foot massage with a wooden tool, close-up | 400×400 |
| `gallery-06.png` | Hands on a shoulder/upper back, close crop | 400×400 |
| `gallery-07.png` | Herbal compress ball massage on a guest's back | 400×400 |
| `gallery-08.png` | Guest receiving a back/shoulder massage on the treatment table | 400×400 |
| `gallery-09.jpg` | Facial/head massage by candlelight | 564×564 |
| `gallery-10.jpg` | Back massage, a flower in the guest's hair, candles and petals in the foreground | 800×600 |

`hero-web.webp` and `hero-mobile.webp` are the only two large enough for
full-bleed hero use. `gallery-10.jpg` is the next best resolution and is
reserved for the one large "hero-style" slot outside the hero itself
(the Gallery mosaic's big cell). Everything else is 400×400–564×564 —
plenty for cards, grid cells and detail shots, but not for a full-width
background.

## `lib/images.ts` → `siteImages` keys

| Key | File |
|---|---|
| `heroDesktop` | `hero-web.webp` |
| `heroMobile` | `hero-mobile.webp` |
| `compressTherapist` | `mobile-hero.webp` |
| `footReflexology` | `gallery-01.png` |
| `ritualFlatlay` | `gallery-02.png` |
| `footMassageTherapist` | `gallery-03.png` |
| `toweledSetup` | `gallery-04.png` |
| `woodToolFootMassage` | `gallery-05.png` |
| `shoulderHandsCloseup` | `gallery-06.png` |
| `compressBackMassage` | `gallery-07.png` |
| `backMassageTable` | `gallery-08.png` |
| `facialCandle` | `gallery-09.jpg` |
| `backMassageFlower` | `gallery-10.jpg` |

## Where each one is used

| Section | File | Key(s) |
|---|---|---|
| Hero — desktop/tablet background | `components/Hero.tsx` | `heroDesktop` |
| Hero — mobile video poster frame | `components/Hero.tsx` | `heroMobile` (mobile itself still shows `/soul-video.mp4`) |
| Brand Intro | `components/BrandIntro.tsx` | `shoulderHandsCloseup` |
| Journey — Arrive | `components/JourneySection.tsx` | `facialCandle` |
| Journey — Unwind | `components/JourneySection.tsx` | `heroMobile` |
| Journey — Restore | `components/JourneySection.tsx` | `compressTherapist` |
| Journey — Renew | `components/JourneySection.tsx` | `backMassageTable` |
| Gallery (large cell) | `components/Gallery.tsx` | `backMassageFlower` |
| Gallery (other cells) | `components/Gallery.tsx` | `footReflexology`, `toweledSetup`, `ritualFlatlay`, `compressBackMassage`, `shoulderHandsCloseup` |
| Signature Ritual spotlight | `components/TreatmentSpotlight.tsx` | `ritualFlatlay` |
| Final CTA (background) | `components/FinalCTA.tsx` | `facialCandle` |
| About — main shot | `app/about/page.tsx` | `backMassageTable` |
| About — hands shot | `app/about/page.tsx` | `shoulderHandsCloseup` |
| Experience page — wide shot | `app/experience/page.tsx` | `heroDesktop` |
| Location | `components/LocationSection.tsx` | *(none — Google Maps embed once the address is confirmed)* |

Rotating placements (cycle through all 8 "detail" keys via `treatmentImageAt()`
in `lib/images.ts`, one distinct photo per treatment — 8 keys, 8 treatments,
no repeats within the rotation itself):

| Section | File |
|---|---|
| Signature Treatments (homepage preview cards) | `components/SignatureTreatments.tsx` → `components/TreatmentGrid.tsx` |
| Treatments listing (all 8 menu cards) | `app/treatments/page.tsx` → `components/TreatmentGrid.tsx` |
| Treatment detail hero image | `app/treatments/[slug]/page.tsx` |
| "You Might Also Like" related cards | `app/treatments/[slug]/page.tsx` |

**Important — look up treatments by `slug`, not array position or object
identity.** `treatmentImageAt()` is driven by an index found with
`allTreatments.findIndex((x) => x.slug === t.slug)`, deliberately, not
`.indexOf(t)`. When a subset of treatments is built in a Server Component
(e.g. `SignatureTreatments.tsx`'s `featured` array) and passed as a prop
into a Client Component (`TreatmentGrid.tsx`), React serializes those
objects across the boundary into new copies — so `.indexOf(t)` silently
returns `-1` for every item, `-1 % 8` stays `-1` in JS, and every image on
that subset quietly falls back to the gradient placeholder with no error
anywhere. This was a real, previously-undiscovered bug and very likely a
contributor to earlier "images aren't showing" reports on the homepage.
If you add a new place that looks up a treatment's image, match by `slug`.

## Adding more real photography later

Drop the new file into `public/gallery/`, add a key to `siteImages` in
`lib/images.ts` pointing at `/gallery/<file>`, and reference it via
`src={siteImages.<key>}` — `ImagePlaceholder` handles local paths exactly
like any other `src`, through the same `.photo-grade` colour treatment
(`app/globals.css`) that keeps everything reading as one consistent shoot.

## Alt text

Every `label` prop above doubles as the image's `alt` text — keep it
accurate to what the photo actually shows; it matters for SEO and screen
readers alike.
