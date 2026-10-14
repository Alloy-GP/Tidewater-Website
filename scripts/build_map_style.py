#!/usr/bin/env python3
"""
Build the brand map styles for the location maps.

Takes MapTiler's stock Positron style, recolours every layer from a palette,
and writes one style file per theme:

  src/data/map-style-light.json   "Tidewater Paper" — maps on cream/linen sections
  src/data/map-style-dark.json    "Tidewater Tide"  — maps inside the dark geo hero

The MapTiler key in the style's tile/font URLs is replaced with the
__MAPTILER_KEY__ placeholder; src/lib/location-map.ts injects the real
PUBLIC_MAPTILER_KEY at runtime, so no key is committed.

Run once and again whenever a palette changes:

  python3 scripts/build_map_style.py --key "$PUBLIC_MAPTILER_KEY" --origin https://tidewaterproperty.com
  python3 scripts/build_map_style.py --base path/to/positron-style.json   # offline, from a saved base

--origin must be one of the key's Allowed HTTP Origins (MapTiler checks it on
the style download too). Nothing is configured in the MapTiler dashboard
beyond the key. The recolour() logic is the AGP starter's (canonical); the
PALETTES block is per-site.
"""
import argparse, json, re, sys, urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT_DIR = ROOT / "src" / "data"

# ── Palettes — per-site, from design-system/colors_and_type.css ──────────────
# Light: land a touch off the page cream (#FEFCF8) / linen (#F1EEEA), water in
# the teal family, town labels in the brand dark. Dark: land one step up from
# the geo-hero background (#172325), labels cream, state labels gold, water a
# deep teal so the Chesapeake still reads as water on a dark panel.
PALETTES = {
    "light": {
        "name":             "Tidewater Paper",
        "land":             "#F3F0EA",
        "park":             "#E6E9E0",
        "residential":      "#EEEBE5",
        "wood":             "#E0E4DA",
        "water":            "#C9DDE2",
        "water_line":       "#B9D1D7",
        "building":         "#E8E4DD",
        "building_outline": "#DED8CF",
        "road_casing":      "#DAD4CB",
        "road_inner":       "#FFFFFF",
        "road_minor":       "#E9E4DC",
        "road_path":        "#ECE8E1",
        "road_subtle":      "rgba(218,212,203,0.70)",
        "tunnel_inner":     "#F1EDE6",
        "rail":             "#DCD6CD",
        "rail_dash":        "#FBF9F4",
        "boundary":         "#C4BCB0",
        "boundary_state":   "#B9AFA2",
        "label_city":       "#172325",   # cities, towns, capitals
        "label_village":    "#3A3733",
        "label_minor":      "#5C5751",   # suburbs, hamlets, other
        "label_state":      "#5C5751",
        "label_country":    "#3A3733",
        "label_water":      "#2F7C8E",
        "label_road":       "#9A948B",
        "label_motorway":   "#5C5751",
        "halo":             "#F3F0EA",   # label halo = land, so text sits cleanly
    },
    "dark": {
        "name":             "Tidewater Tide",
        "land":             "#1E2C2E",
        "park":             "#213133",
        "residential":      "#203031",
        "wood":             "#1C2D2E",
        "water":            "#152E33",
        "water_line":       "#1C3D44",
        "building":         "#253638",
        "building_outline": "#2B3E40",
        "road_casing":      "#192527",
        "road_inner":       "#3A4C4E",
        "road_minor":       "#2E3F41",
        "road_path":        "#2A3B3D",
        "road_subtle":      "rgba(58,76,78,0.60)",
        "tunnel_inner":     "#2A3B3D",
        "rail":             "#30423F",
        "rail_dash":        "#1E2C2E",
        "boundary":         "#55707A",
        "boundary_state":   "#6A8790",
        "label_city":       "#FEFCF8",
        "label_village":    "#D8D4CB",
        "label_minor":      "#A8B3B1",
        "label_state":      "#BFAC5F",
        "label_country":    "#D8D4CB",
        "label_water":      "#62A9B6",
        "label_road":       "#76878A",
        "label_motorway":   "#A8B3B1",
        "halo":             "#1E2C2E",
    },
}

# Positron layer ids → palette slots. Anything not listed falls through to the
# generic rules in recolour() (casing/subtle/railway by id pattern).
FILL = {
    "background": "land", "park": "park", "water": "water",
    "landcover_ice_shelf": "road_inner", "landcover_glacier": "road_inner",
    "landuse_residential": "residential", "landcover_wood": "wood",
    "building": "building", "aeroway-area": "road_inner", "road_area_pier": "land",
}
LINE = {
    "waterway": "water_line", "road_pier": "land", "highway_path": "road_path",
    "highway_minor": "road_minor", "highway_major_inner": "road_inner",
    "highway_motorway_inner": "road_inner", "highway_motorway_bridge_inner": "road_inner",
    "tunnel_motorway_inner": "tunnel_inner", "aeroway-taxiway": "road_minor",
    "aeroway-runway-casing": "road_minor", "aeroway-runway": "road_inner",
    "boundary_state": "boundary_state", "boundary_country_z0-4": "boundary",
    "boundary_country_z5-": "boundary",
}
TEXT = {
    "water_name": "label_water", "highway_name_other": "label_road",
    "highway_name_motorway": "label_motorway",
    "place_other": "label_minor", "place_suburb": "label_minor",
    "place_village": "label_village", "place_town": "label_city",
    "place_city": "label_city", "place_capital": "label_city",
    "place_city_large": "label_city", "place_state": "label_state",
    "place_country_other": "label_country", "place_country_minor": "label_country",
    "place_country_major": "label_country",
}


def recolour(style: dict, p: dict) -> dict:
    for layer in style["layers"]:
        paint = layer.setdefault("paint", {})
        lid, ltype = layer["id"], layer["type"]
        if ltype == "background":
            paint["background-color"] = p["land"]
        elif ltype == "fill" and lid in FILL:
            paint["fill-color"] = p[FILL[lid]]
        if lid == "building":
            paint["fill-outline-color"] = p["building_outline"]
        if ltype == "line":
            if lid in LINE:
                paint["line-color"] = p[LINE[lid]]
            elif "casing" in lid:
                paint["line-color"] = p["road_casing"]
            elif "subtle" in lid:
                paint["line-color"] = p["road_subtle"]
            elif lid.startswith("railway"):
                paint["line-color"] = p["rail_dash"] if "dash" in lid else p["rail"]
        if ltype == "symbol":
            paint["text-halo-color"] = p["halo"]
            if lid in TEXT:
                paint["text-color"] = p[TEXT[lid]]
    style["name"] = p["name"]
    style["id"] = re.sub(r"[^a-z0-9]+", "-", p["name"].lower()).strip("-")
    style.setdefault("metadata", {})["agp:generator"] = "scripts/build_map_style.py (base: MapTiler Positron)"
    return style


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--key", help="PUBLIC_MAPTILER_KEY, used only to download the base style")
    ap.add_argument("--origin", help="One of the key's allowed origins, e.g. https://tidewaterproperty.com")
    ap.add_argument("--base", help="Local Positron style.json to recolour instead of downloading")
    ap.add_argument("--theme", choices=["light", "dark", "all"], default="all")
    a = ap.parse_args()

    if a.base:
        raw = Path(a.base).read_text()
    elif a.key and a.origin:
        req = urllib.request.Request(
            f"https://api.maptiler.com/maps/positron/style.json?key={a.key}",
            headers={"Origin": a.origin, "Referer": a.origin + "/"},
        )
        raw = urllib.request.urlopen(req, timeout=30).read().decode()
    else:
        sys.exit("need --key and --origin (or --base <file>)")

    themes = ["light", "dark"] if a.theme == "all" else [a.theme]
    for theme in themes:
        style = recolour(json.loads(raw), PALETTES[theme])
        text = json.dumps(style, indent=1)
        if a.key:
            text = text.replace(a.key, "__MAPTILER_KEY__")
        if "key=" in text and "__MAPTILER_KEY__" not in text:
            sys.exit("refusing to write: style still contains a key value and no placeholder")
        out = OUT_DIR / f"map-style-{theme}.json"
        out.write_text(text + "\n")
        print(f"wrote {out.relative_to(ROOT)}  ({len(style['layers'])} layers, key → __MAPTILER_KEY__)")


if __name__ == "__main__":
    main()
