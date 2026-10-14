#!/usr/bin/env python3
"""
Geocode every place the location maps pin, and write src/data/geo-places.ts.

The maps (src/components/LocationMap.astro / .jsx) take coordinates from
src/data/location-maps.ts, which composes its pin lists from the PLACES record
this script generates. Coordinates come from Nominatim (OpenStreetMap), the
same source the AGP starter recommends, so a pin lands on the real town centre
rather than a guessed point.

  python3 scripts/geocode-places.py            # everything (cached)
  python3 scripts/geocode-places.py --force    # ignore the cache
  python3 scripts/geocode-places.py --only lewes-de,milton-de

Nominatim allows one request per second and wants a descriptive User-Agent;
both are respected below. Results are cached in node_modules/.cache/ so
re-runs only hit the network for new or failed keys.

To add a place: add a line to PLACES, run the script, commit the regenerated
src/data/geo-places.ts. Never hand-edit geo-places.ts.
"""
import argparse, json, sys, time, urllib.parse, urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "src" / "data" / "geo-places.ts"
CACHE = ROOT / "node_modules" / ".cache" / "geocode-places.json"
UA = "tidewater-website-maps/1.0 (geocoding for tidewaterproperty.com; dev@alloygp.com)"

# key: (display name, Nominatim query[, pick]). Keys are stable identifiers used
# by src/data/location-maps.ts — renaming one is a code change there too. The
# optional `pick` is a substring of the wanted result's display name, for the
# few queries where Nominatim ranks a street or lookalike above the place.
PLACES = {
    # ── Offices (street-level; Nominatim ignores suite numbers) ─────────────
    "office-owings-mills": ("Owings Mills headquarters", "3600 Crondall Lane, Owings Mills, MD 21117"),
    "office-ocean-city":   ("Ocean City office",         "8101 Coastal Highway, Ocean City, MD 21842"),
    # Nominatim has no entry for #20375; the block is the 20600s on the same highway.
    "office-lewes":        ("Lewes office",              "John J Williams Highway, Lewes, Delaware", "John J Williams Highway"),

    # ── Maryland: Anne Arundel County ───────────────────────────────────────
    "annapolis-md":     ("Annapolis",     "Annapolis, Anne Arundel County, Maryland"),
    "severna-park-md":  ("Severna Park",  "Severna Park, Anne Arundel County, Maryland"),
    "crofton-md":       ("Crofton",       "Crofton, Anne Arundel County, Maryland"),
    "pasadena-md":      ("Pasadena",      "Pasadena, Anne Arundel County, Maryland"),
    "glen-burnie-md":   ("Glen Burnie",   "Glen Burnie, Anne Arundel County, Maryland"),
    "odenton-md":       ("Odenton",       "Odenton, Anne Arundel County, Maryland"),
    "arnold-md":        ("Arnold",        "Arnold, Anne Arundel County, Maryland"),
    "edgewater-md":     ("Edgewater",     "Edgewater, Anne Arundel County, Maryland"),
    "linthicum-md":     ("Linthicum",     "Linthicum, Anne Arundel County, Maryland"),
    "mayo-md":          ("Mayo",          "Mayo, Anne Arundel County, Maryland"),
    "davidsonville-md": ("Davidsonville", "Davidsonville, Anne Arundel County, Maryland"),
    "shady-side-md":    ("Shady Side",    "Shady Side, Anne Arundel County, Maryland"),

    # ── Maryland: Baltimore County + City ───────────────────────────────────
    "towson-md":        ("Towson",        "Towson, Baltimore County, Maryland"),
    "owings-mills-md":  ("Owings Mills",  "Owings Mills, Baltimore County, Maryland"),
    "pikesville-md":    ("Pikesville",    "Pikesville, Baltimore County, Maryland"),
    "catonsville-md":   ("Catonsville",   "Catonsville, Baltimore County, Maryland"),
    "cockeysville-md":  ("Cockeysville",  "Cockeysville, Baltimore County, Maryland"),
    "timonium-md":      ("Timonium",      "Timonium, Baltimore County, Maryland"),
    "white-marsh-md":   ("White Marsh",   "White Marsh, Baltimore County, Maryland"),
    "perry-hall-md":    ("Perry Hall",    "Perry Hall, Baltimore County, Maryland"),
    "reisterstown-md":  ("Reisterstown",  "Reisterstown, Baltimore County, Maryland"),
    "essex-md":         ("Essex",         "Essex, Baltimore County, Maryland"),
    "dundalk-md":       ("Dundalk",       "Dundalk, Baltimore County, Maryland"),
    "baltimore-md":     ("Baltimore",     "Baltimore, Maryland"),

    # ── Maryland: Carroll County ────────────────────────────────────────────
    "westminster-md":   ("Westminster",   "Westminster, Carroll County, Maryland"),
    "eldersburg-md":    ("Eldersburg",    "Eldersburg, Carroll County, Maryland"),
    "sykesville-md":    ("Sykesville",    "Sykesville, Carroll County, Maryland"),
    "mount-airy-md":    ("Mount Airy",    "Mount Airy, Maryland"),
    "hampstead-md":     ("Hampstead",     "Hampstead, Carroll County, Maryland"),
    "taneytown-md":     ("Taneytown",     "Taneytown, Carroll County, Maryland"),
    "manchester-md":    ("Manchester",    "Manchester, Carroll County, Maryland"),

    # ── Maryland: Cecil County ──────────────────────────────────────────────
    "elkton-md":          ("Elkton",          "Elkton, Cecil County, Maryland"),
    "north-east-md":      ("North East",      "North East, Cecil County, Maryland"),
    "perryville-md":      ("Perryville",      "Perryville, Cecil County, Maryland"),
    "chesapeake-city-md": ("Chesapeake City", "Chesapeake City, Cecil County, Maryland"),
    "rising-sun-md":      ("Rising Sun",      "Rising Sun, Cecil County, Maryland"),
    "port-deposit-md":    ("Port Deposit",    "Port Deposit, Cecil County, Maryland"),

    # ── Maryland: Frederick County ──────────────────────────────────────────
    "frederick-md":     ("Frederick",    "Frederick, Frederick County, Maryland"),
    "urbana-md":        ("Urbana",       "Urbana, Frederick County, Maryland"),
    "middletown-md":    ("Middletown",   "Middletown, Frederick County, Maryland"),
    "walkersville-md":  ("Walkersville", "Walkersville, Frederick County, Maryland"),
    "brunswick-md":     ("Brunswick",    "Brunswick, Frederick County, Maryland"),
    "new-market-md":    ("New Market",   "New Market, Frederick County, Maryland"),

    # ── Maryland: Howard County ─────────────────────────────────────────────
    "columbia-md":      ("Columbia",      "Columbia, Howard County, Maryland"),
    "ellicott-city-md": ("Ellicott City", "Ellicott City, Howard County, Maryland"),
    "elkridge-md":      ("Elkridge",      "Elkridge, Howard County, Maryland"),
    "fulton-md":        ("Fulton",        "Fulton, Howard County, Maryland"),
    "clarksville-md":   ("Clarksville",   "Clarksville, Howard County, Maryland"),
    "jessup-md":        ("Jessup",        "Jessup, Howard County, Maryland"),
    "laurel-md":        ("Laurel",        "Laurel, Prince George's County, Maryland"),
    "savage-md":        ("Savage",        "Savage, Howard County, Maryland"),
    "glenelg-md":       ("Glenelg",       "Glenelg, Howard County, Maryland"),
    "glenwood-md":      ("Glenwood",      "Glenwood, Howard County, Maryland"),

    # ── Maryland: Kent County ───────────────────────────────────────────────
    "chestertown-md":   ("Chestertown",  "Chestertown, Kent County, Maryland"),
    "rock-hall-md":     ("Rock Hall",    "Rock Hall, Kent County, Maryland"),
    "betterton-md":     ("Betterton",    "Betterton, Kent County, Maryland"),
    "galena-md":        ("Galena",       "Galena, Kent County, Maryland"),
    "millington-md":    ("Millington",   "Millington, Kent County, Maryland"),

    # ── Maryland: Montgomery County ─────────────────────────────────────────
    "rockville-md":     ("Rockville",     "Rockville, Montgomery County, Maryland"),
    "silver-spring-md": ("Silver Spring", "Silver Spring, Montgomery County, Maryland"),
    "bethesda-md":      ("Bethesda",      "Bethesda, Montgomery County, Maryland"),
    "gaithersburg-md":  ("Gaithersburg",  "Gaithersburg, Montgomery County, Maryland"),
    "germantown-md":    ("Germantown",    "Germantown, Montgomery County, Maryland"),
    "chevy-chase-md":   ("Chevy Chase",   "Chevy Chase, Montgomery County, Maryland"),
    "wheaton-md":       ("Wheaton",       "Wheaton, Montgomery County, Maryland"),
    "olney-md":         ("Olney",         "Olney, Montgomery County, Maryland"),
    "potomac-md":       ("Potomac",       "Potomac, Montgomery County, Maryland"),
    "four-corners-md":  ("Four Corners",  "Four Corners, Silver Spring, Maryland"),
    "forest-glen-md":   ("Forest Glen",   "Forest Glen, Silver Spring, Maryland"),
    "takoma-park-md":   ("Takoma Park",   "Takoma Park, Montgomery County, Maryland"),
    "aspen-hill-md":    ("Aspen Hill",    "Aspen Hill, Montgomery County, Maryland"),

    # ── Maryland: Prince George's County ────────────────────────────────────
    "bowie-md":           ("Bowie",           "Bowie, Prince George's County, Maryland"),
    "upper-marlboro-md":  ("Upper Marlboro",  "Upper Marlboro, Prince George's County, Maryland"),
    "largo-md":           ("Largo",           "Largo, Prince George's County, Maryland"),
    "greenbelt-md":       ("Greenbelt",       "Greenbelt, Prince George's County, Maryland"),
    "hyattsville-md":     ("Hyattsville",     "Hyattsville, Prince George's County, Maryland"),
    "accokeek-md":        ("Accokeek",        "Accokeek, Prince George's County, Maryland"),
    "fort-washington-md": ("Fort Washington", "Fort Washington, Prince George's County, Maryland"),
    "college-park-md":    ("College Park",    "College Park, Prince George's County, Maryland"),

    # ── Maryland: Queen Anne's County ───────────────────────────────────────
    "stevensville-md":  ("Stevensville", "Stevensville, Queen Anne's County, Maryland"),
    "chester-md":       ("Chester",      "Chester, Queen Anne's County, Maryland"),
    "grasonville-md":   ("Grasonville",  "Grasonville, Queen Anne's County, Maryland"),
    "centreville-md":   ("Centreville",  "Centreville, Queen Anne's County, Maryland"),
    "queenstown-md":    ("Queenstown",   "Queenstown, Queen Anne's County, Maryland"),
    "church-hill-md":   ("Church Hill",  "Church Hill, Queen Anne's County, Maryland"),

    # ── Maryland: other served county seats (state hub + service-areas) ─────
    "bel-air-md":       ("Bel Air",      "Bel Air, Harford County, Maryland"),
    "easton-md":        ("Easton",       "Easton, Talbot County, Maryland"),
    "cambridge-md":     ("Cambridge",    "Cambridge, Dorchester County, Maryland"),
    "salisbury-md":     ("Salisbury",    "Salisbury, Wicomico County, Maryland"),
    "snow-hill-md":     ("Snow Hill",    "Snow Hill, Worcester County, Maryland"),

    # ── Maryland: Ocean City ────────────────────────────────────────────────
    "ocean-city-md":        ("Downtown Ocean City", "Ocean City, Worcester County, Maryland"),
    "ocean-city-midtown":   ("Midtown",             "45th Street, Ocean City, Maryland"),
    "ocean-city-north":     ("North Ocean City",    "94th Street, Ocean City, Maryland"),
    "ocean-city-uptown":    ("Uptown / 145th",      "145th Street, Ocean City, Maryland"),
    "west-ocean-city-md":   ("West Ocean City",     "West Ocean City, Worcester County, Maryland"),
    "ocean-pines-md":       ("Ocean Pines",         "Ocean Pines, Worcester County, Maryland"),
    "berlin-md":            ("Berlin",              "Berlin, Worcester County, Maryland"),

    # ── Delaware ────────────────────────────────────────────────────────────
    "lewes-de":           ("Lewes",            "Lewes, Sussex County, Delaware"),
    "cape-henlopen-de":   ("Cape Henlopen",    "Cape Henlopen State Park, Lewes, Delaware"),
    "pilottown-de":       ("Pilottown",        "Pilottown Road, Lewes, Delaware"),
    "henlopen-acres-de":  ("Henlopen Acres",   "Henlopen Acres, Sussex County, Delaware"),
    "long-neck-de":       ("Long Neck",        "Long Neck, Sussex County, Delaware"),
    "milton-de":          ("Milton",           "Milton, Sussex County, Delaware"),
    "rehoboth-beach-de":  ("Rehoboth Beach",   "Rehoboth Beach, Sussex County, Delaware"),
    "north-shores-de":    ("North Shores",     "North Shores, Sussex County, Delaware", "North Shores, Sussex County, Delaware, 197"),
    "silver-lake-de":     ("Silver Lake",      "Silver Lake, Rehoboth Beach, Delaware"),
    "dewey-beach-de":     ("Dewey Beach",      "Dewey Beach, Sussex County, Delaware"),
    "rehoboth-ycc-de":    ("Rehoboth Beach Yacht & CC", "Rehoboth Beach Country Club, Delaware", "Rehoboth Beach Yacht & Country Club"),
    "bethany-beach-de":   ("Bethany Beach",    "Bethany Beach, Sussex County, Delaware"),
    "sea-colony-de":      ("Sea Colony",       "Sea Colony, Bethany Beach, Delaware"),
    "bethany-west-de":    ("Bethany West",     "Bethany West, Bethany Beach, Delaware"),
    "south-bethany-de":   ("South Bethany",    "South Bethany, Sussex County, Delaware"),
    "ocean-view-de":      ("Ocean View",       "Ocean View, Sussex County, Delaware"),
    "millville-de":       ("Millville",        "Millville, Sussex County, Delaware"),
    "fenwick-island-de":  ("Fenwick Island",   "Fenwick Island, Sussex County, Delaware"),
    "bayside-de":         ("Bayside",          "Bayside, Selbyville, Delaware"),
    "selbyville-de":      ("Selbyville",       "Selbyville, Sussex County, Delaware"),
    "route-54-de":        ("Route 54 corridor","Lighthouse Road, Selbyville, Delaware"),
    "georgetown-de":      ("Georgetown",       "Georgetown, Sussex County, Delaware"),
    "dover-de":           ("Dover",            "Dover, Kent County, Delaware"),
    "wilmington-de":      ("Wilmington",       "Wilmington, New Castle County, Delaware"),

    # ── Washington, DC ──────────────────────────────────────────────────────
    "dc-northwest":    ("Northwest DC",        "Dupont Circle, Washington, DC"),
    "dc-capitol-hill": ("Capitol Hill",        "Capitol Hill, Washington, DC"),
    "dc-navy-yard":    ("Navy Yard",           "Navy Yard, Washington, DC"),
    "dc-southwest":    ("Southwest Waterfront","Southwest Waterfront, Washington, DC"),
    "dc-northeast":    ("Northeast DC",        "Brookland, Washington, DC"),
    "dc-u-street":     ("U Street corridor",   "U Street Corridor, Washington, DC"),

    # ── Virginia ────────────────────────────────────────────────────────────
    "fairfax-va":     ("Fairfax",     "Fairfax, Virginia"),
    "leesburg-va":    ("Leesburg",    "Leesburg, Loudoun County, Virginia"),
    "arlington-va":   ("Arlington",   "Arlington, Virginia"),
    "alexandria-va":  ("Alexandria",  "Alexandria, Virginia"),
    "manassas-va":    ("Manassas",    "Manassas, Virginia"),

    # ── Pennsylvania ────────────────────────────────────────────────────────
    "west-chester-pa": ("West Chester", "West Chester, Chester County, Pennsylvania"),
    "lancaster-pa":    ("Lancaster",    "Lancaster, Pennsylvania"),
    "york-pa":         ("York",         "York, Pennsylvania"),
    "gettysburg-pa":   ("Gettysburg",   "Gettysburg, Adams County, Pennsylvania"),

    # ── West Virginia ───────────────────────────────────────────────────────
    "martinsburg-wv":      ("Martinsburg",      "Martinsburg, Berkeley County, West Virginia"),
    "charles-town-wv":     ("Charles Town",     "Charles Town, Jefferson County, West Virginia"),
    "berkeley-springs-wv": ("Berkeley Springs", "Berkeley Springs, Morgan County, West Virginia"),
}


def geocode(query: str, pick: str = ""):
    url = "https://nominatim.openstreetmap.org/search?" + urllib.parse.urlencode(
        {"format": "jsonv2", "limit": 5 if pick else 1, "countrycodes": "us", "q": query})
    req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept-Language": "en"})
    with urllib.request.urlopen(req, timeout=30) as r:
        rows = json.loads(r.read().decode())
    if pick:
        rows = [r for r in rows if pick.lower() in r.get("display_name", "").lower()]
    if not rows:
        return None
    row = rows[0]
    return {"lat": round(float(row["lat"]), 5), "lng": round(float(row["lon"]), 5),
            "display": row.get("display_name", ""), "type": row.get("type", "")}


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--force", action="store_true", help="ignore the cache")
    ap.add_argument("--only", help="comma-separated keys to (re)geocode")
    a = ap.parse_args()

    cache = {}
    if CACHE.exists() and not a.force:
        cache = json.loads(CACHE.read_text())
    only = set(a.only.split(",")) if a.only else None

    results, failed = {}, []
    for key, spec in PLACES.items():
        name, query, pick = (spec + ("",))[:3]
        hit = cache.get(key)
        if hit and hit.get("query") == query and not (only and key in only):
            results[key] = hit
            continue
        try:
            hit = geocode(query, pick)
        except Exception as e:  # network hiccup: keep going, report at the end
            print(f"  !! {key}: {e}", file=sys.stderr)
            hit = None
        time.sleep(1.1)  # Nominatim usage policy: max 1 request/second
        if not hit:
            failed.append(key)
            print(f"  ?? no result: {key} ({query})", file=sys.stderr)
            continue
        hit["query"] = query
        results[key] = hit
        cache[key] = hit
        CACHE.parent.mkdir(parents=True, exist_ok=True)
        CACHE.write_text(json.dumps(cache, indent=1, sort_keys=True))
        print(f"  ok {key:24s} {hit['lat']:9.5f} {hit['lng']:10.5f}  {hit['display'][:70]}")

    lines = [
        "// GENERATED by scripts/geocode-places.py — do not edit by hand.",
        "// Coordinates from Nominatim (OpenStreetMap). Add places in the script and re-run.",
        "",
        "export interface GeoPlace { name: string; lat: number; lng: number }",
        "",
        "export const PLACES = {",
    ]
    for key, spec in PLACES.items():
        name = spec[0]
        if key not in results:
            continue
        r = results[key]
        safe = name.replace("'", "\\'")
        lines.append(f"  '{key}': {{ name: '{safe}', lat: {r['lat']}, lng: {r['lng']} }},")
    lines += ["} satisfies Record<string, GeoPlace>;", "",
              "export type PlaceKey = keyof typeof PLACES;", ""]
    OUT.write_text("\n".join(lines))
    print(f"wrote {OUT.relative_to(ROOT)} ({len(results)} places, {len(failed)} failed)")
    if failed:
        print("FAILED: " + ", ".join(failed), file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()
