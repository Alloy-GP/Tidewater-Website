# Location maps — MapLibre on MapTiler tiles

Every map on the site is one component, `src/components/LocationMap.astro`
(or `LocationMap.jsx` inside the React rental islands): **MapLibre GL** drawing
**MapTiler vector tiles** with a brand style file that lives in this repo. It is
the AGP starter's map stack (`agp-astro-starter` → `ServiceAreaMap.astro`),
generalised so each location page passes its own pins. No Google embeds, no
keyless tile servers as the primary map (CARTO's free Positron tiles were
withdrawn in 2026-09 and blanked every site that used them).

## Where maps appear

| Page | Config (`src/data/location-maps.ts`) | Theme |
|---|---|---|
| `/hoa-management/maryland/<county>` (10 hand-built pages + `CountyPage.astro`) | `COUNTY_MAPS[slug]` | dark (hero aside) |
| `/hoa-management/maryland` | `MARYLAND_HUB_MAP` | dark |
| `/hoa-management/<state>` (DC, VA, PA, DE, WV via `StateHub.astro`) | `STATE_MAPS[slug]` | dark |
| `/rental-management/<state>/<place>` (11 `RentalGeo` pages) | `RENTAL_MAPS[key]`, passed as the `map` prop | dark |
| `/rental-management/maryland`, `/rental-management/delaware` | `RENTAL_MARYLAND_MAP`, `RENTAL_DELAWARE_MAP` | dark |
| `/locations/<state>/<office>` (3 office pages) | `OFFICE_MAPS[key]` (+ `OFFICE_GEO` for `LocalBusiness.geo`) | light |
| `/service-areas` | `SERVICE_AREA_MAP` | dark |

## The pieces

- `src/lib/location-map.ts` — the engine. Loads MapLibre and the style on
  demand (within 300px of the viewport), injects the key, draws the pins, fits
  the view to them. Scroll-zoom stays off until the map is clicked.
- `src/data/geo-places.ts` — **generated**, every coordinate the maps use.
  Produced by `scripts/geocode-places.py` from Nominatim (OpenStreetMap).
- `src/data/location-maps.ts` — per-page pin lists, composed from `PLACES`.
  Pin kinds: `city` (teal dot), `seat` (gold dot — county seat / anchor),
  `office` (gold teardrop with address, phone and a directions link).
- `src/data/map-style-light.json`, `map-style-dark.json` — the brand styles,
  **generated** by `scripts/build_map_style.py` (edit the `PALETTES` block, not
  the JSON). Light = "Tidewater Paper" for cream/linen sections; dark =
  "Tidewater Tide" for the geo hero panels.
- `src/styles/location-map.css` — pins, popups, MapLibre chrome, legend.

## Setup (one dashboard step)

1. **Key.** MapTiler Cloud (AGP Flex account) → API keys → New key named
   `tidewaterproperty.com`. Allowed HTTP Origins: `https://tidewaterproperty.com`,
   `https://www.tidewaterproperty.com`, plus the stg / Vercel preview domains.
2. **Vercel.** Set `PUBLIC_MAPTILER_KEY` on the production **and** the stg /
   preview environments. It is a public, publishable value that ships in client
   JS; the origin restriction is what protects it.
3. Without the key the maps still render — on keyless OpenStreetMap raster
   tiles, retoned by CSS, with a console warning. That is fine for a preview and
   never launch-ready.

## Adding a map or a pin

1. Add the place to `PLACES` in `scripts/geocode-places.py`
   (`"town-md": ("Town", "Town, Such County, Maryland")`) and run
   `python3 scripts/geocode-places.py`. Commit the regenerated
   `src/data/geo-places.ts`. Never hand-type a lat/lng.
2. Reference it from the right config in `src/data/location-maps.ts`
   (`at('town-md', { note: 'Townhome HOAs · I-95 corridor' })`).
3. For a new page, drop the component in:
   ```astro
   <LocationMap theme="dark" {...COUNTY_MAPS['new-county']} ariaLabel="Map of New County, Maryland" height={300} />
   ```
   Inside a React island use `LocationMap.jsx` with the same props.

A pin says "we cover this place" and nothing more — every name on a map
already appears in that page's copy. Don't add a place the page doesn't claim.

## Regenerating the styles

```bash
python3 scripts/build_map_style.py --key "$PUBLIC_MAPTILER_KEY" --origin https://tidewaterproperty.com
```

The key is used only to download MapTiler's base Positron style and is
replaced by `__MAPTILER_KEY__` in the output. Offline, `--base <positron.json>`
recolours a saved copy instead.
