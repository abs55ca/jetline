# Photography manifest

Every image on this site was selected by eye from a larger candidate set, downloaded
under a licence that permits commercial use, graded, and committed to the repository.
Nothing is hotlinked. Regenerate the whole set with `node scripts/build-photos.mjs`.

## Licensing summary

| Source | Licence | Commercial use | Attribution required |
| --- | --- | --- | --- |
| Unsplash | [Unsplash Licence](https://unsplash.com/license) | Yes | No (credited here anyway) |
| Pexels | [Pexels Licence](https://www.pexels.com/license/) | Yes | No (credited here anyway) |

Neither licence requires visible on-page credit, so the design carries none. The credits
below exist so the provenance of every asset stays auditable.

**Unsplash+ / `plus.unsplash.com` assets were excluded deliberately** — those require a
paid subscription and were filtered out of every search.

## The house grade

All photography passes through one shared treatment in `scripts/build-photos.mjs`.
Stock arrives lit every possible way, so a single curve is not enough to make an
overcast frame sit beside a night frame; each image is assigned a tier and, where the
subject occupies a small part of the plate, a pre-crop.

```js
night:  { saturation: 0.62, brightness: 0.96, contrast: 1.08, lift: -14 }
dusk:   { saturation: 0.54, brightness: 0.84, contrast: 1.10, lift: -18 }
day:    { saturation: 0.45, brightness: 0.68, contrast: 1.16, lift: -28 }
bright: { saturation: 0.38, brightness: 0.55, contrast: 1.20, lift: -34 }
```

Saturation drops so the amber signal colour is the only assertive hue on the page;
shadows deepen so light type sits on the image without needing a heavy scrim. This is
what makes sixteen photographs from sixteen photographers read as one commissioned
shoot. Grading happens at build time rather than through CSS filters — filters on
full-bleed images cost real paint time on mobile.

## The set

| Asset | Tier | Used on | Source | Photographer |
| --- | --- | --- | --- | --- |
| `hero-suv-night` | night | Home hero, `/fleet/` hero | [Unsplash](https://images.unsplash.com/photo-1683778547049-8d969766b441) | Franco Debartolo |
| `door-handle-rain` | dusk | Home §02, `/about/` hero | [Pexels](https://images.pexels.com/photos/8425057) | Pavel Danilyuk |
| `aviation-runway` | night | Home §03, `/aviation/` hero | [Unsplash](https://images.unsplash.com/photo-1767053853571-fbc0f931855e) | Eric Wang |
| `crew-captain` | day | Home services panel, `/aviation/` | [Pexels](https://images.pexels.com/photos/28180452) | wx7tech |
| `movement-chevrons` | night | Home services panel, `/airport-transfers/` hero, 404 | [Unsplash](https://images.unsplash.com/photo-1755790974022-fe1c1834418c) | Dohyuk You |
| `executive-sedan` | day | Home services panel, `/corporate/` | [Pexels](https://images.pexels.com/photos/8425380) | Pavel Danilyuk |
| `toronto-skyline` | night | Home §05, `/airport-transfers/` | [Unsplash](https://images.unsplash.com/photo-1750479015832-b33a015d45b1) | Frank Huang |
| `toronto-financial` | night | Home §06, `/corporate/` hero | [Unsplash](https://images.unsplash.com/photo-1628023736581-0af87b146883) | Najib Samatar |
| `sedan-hotel` | bright | Home §06 inset, `/corporate/` | [Pexels](https://images.pexels.com/photos/8425052) | Pavel Danilyuk |
| `interior-detail` | dusk | Home §07, `/about/`, `/fleet/` | [Pexels](https://images.pexels.com/photos/9258341) | introspectivedsgn |
| `fleet-sedan` | night | Home §08, `/fleet/` | [Pexels](https://images.pexels.com/photos/15071553) | Bayram Yalcin |
| `fleet-suv` | dusk | `/fleet/` | [Unsplash](https://images.unsplash.com/photo-1776043677298-5525a774cbf1) | Rana Singh |
| `fleet-van` | bright | `/fleet/` | [Pexels](https://images.pexels.com/photos/19871522) | Eddie Valdes |
| `terminal-window` | dusk | `/aviation/` | [Pexels](https://images.pexels.com/photos/27550030) | jasinto-shabani |
| `rain-crosswalk` | night | Closing band, most pages | [Unsplash](https://images.unsplash.com/photo-1580061022778-70ee6981bbce) | Lotus Raphael |
| `night-road` | night | `/request/` hero, `/fleet/` closing band | [Unsplash](https://images.unsplash.com/photo-1621863413762-5802c6065dfe) | Billy Freeman |

### Pre-crops

`fleet-van` is cropped to `[0.43, 0.35, 0.45, 0.40]` of the source — onto the van's
flank, not its front. Three problems live in the nose of that plate: a manufacturer
badge centred on the grille, a pale building, and a bright concrete apron, none of which
belong in a night set. The shadowed side body solves all three.

An earlier crop centred the vehicle and was recorded here as having removed the badge.
It had not: it enlarged it. The claim was corrected after a screenshot review caught it.

## Rejected, and why

Recording these so the same weak frames do not get re-selected later.

- **Two frames were pulled for third-party airline livery.** `crew-tarmac`
  (Pexels 19567702) put an ANA jet bridge and cargo container in the centre of the
  aviation section, and `tarmac-night` (Unsplash `photo-1757031299897-8014e806a3fb`)
  showed a line of Virgin tails. Both implied airline relationships that do not exist,
  and both were the brightest images in a night set. Replaced by `aviation-runway`,
  which carries no livery at all.
- **A rival operator's branded vehicles.** Pexels `36377043` / `36377051` / `36377058`
  and the rest of the `Charlotte Black Car Service` portfolio — visible "UNITED" front
  plate and staff name badge.
- **Gold-hour Toronto skylines** (`1780886615946`, `1541308383720`, `1617818393409`) —
  saturated orange and purple postcards. The brief rules out tourism copy; it rules out
  tourism photography for the same reason.
- **Sports and tuner cars.** Most "black sedan at night" results are modified Lancers,
  M5s with motorsport banners, and drift shots. The brief rules out sports-car imagery.
- **Retail and civic signage in frame** — "WAREHOUSE LIQUORS" (`1776918777153`),
  "PLANETA OUTLET" (Pexels 5802053), Thai Lion and SWISS liveries.
- **Airline crew in cream and green uniforms** (Pexels 33623992) — unambiguous crew
  imagery, but the uniforms fight the palette and the framing reads as a staged brochure.

## Open issue: manufacturer marks

`hero-suv-night` carries a lit Cadillac crest, and `fleet-suv` a Mercedes star. No
badge-free frames of comparable quality exist under a commercial licence, and removing a
badge convincingly is beyond what a build-time pipeline should attempt. Because
`src/data/site.ts` forbids implying that any specific make or model is owned, the site
footer carries a standing line on **every** page:

> Photography shows representative vehicle classes, not specific vehicles.

It sits in the footer rather than on `/fleet/` alone because the most prominent vehicle
on the site is the homepage hero, and a visitor who never reaches the fleet page would
otherwise never see the caveat.

That is a mitigation, not a fix. The real fix is Jetline's own photography.

## Replace with real material when available

The strongest version of this site uses Jetline's own photography. In priority order:

1. `hero-suv-night` — an actual Jetline vehicle, at night, in Toronto. Removes the
   Cadillac crest problem and the representative-photography caveat in one shot.
2. `fleet-sedan` / `fleet-suv` / `fleet-van` — the real fleet, so the fleet page stops
   being representative and starts being evidence.
3. `crew-captain` — a real crew movement, if a client permits it.
