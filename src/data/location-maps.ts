// ─────────────────────────────────────────────────────────────
// LOCATION MAP CONFIGS — one pin list per location page.
//
// Read by LocationMap.astro / LocationMap.jsx (engine: src/lib/location-map.ts).
// Coordinates come from src/data/geo-places.ts, which scripts/geocode-places.py
// generates from Nominatim — add a place there, never type a lat/lng here.
//
// Pin kinds: city (teal dot) · seat (gold dot: county seat / anchor market) ·
// office (gold teardrop with address + directions popup). Notes are the short
// context the SVG schematics used to carry ("County seat", "Townhome HOAs ·
// BWI corridor"); they surface as the pin tooltip / popup.
//
// Every name here already appears on the page the map sits on. No claims are
// introduced by the maps: a pin says "we cover this place", nothing more.
// ─────────────────────────────────────────────────────────────
import { PLACES, type PlaceKey } from './geo-places';
import type { MapPin, LocationMapConfig } from '../lib/location-map';

const at = (key: PlaceKey, extra: Partial<MapPin> = {}): MapPin => {
  const p = PLACES[key];
  return { name: p.name, lat: p.lat, lng: p.lng, ...extra };
};
const seat = (key: PlaceKey, note = 'County seat') => at(key, { kind: 'seat', note });

/** The three offices. Address strings match the NAP on the office pages. */
export const OFFICES = {
  'owings-mills': at('office-owings-mills', {
    kind: 'office', name: 'Headquarters · Owings Mills',
    address: '3600 Crondall Lane, Suite 100, Owings Mills, MD 21117',
    phone: '(855) 876-5500', href: '/locations/maryland/owings-mills',
  }),
  'ocean-city': at('office-ocean-city', {
    kind: 'office', name: 'Ocean City office',
    address: '8101 Coastal Hwy, Ste 5, Ocean City, MD 21842',
    phone: '(855) 876-5500', href: '/locations/maryland/ocean-city',
  }),
  'lewes': at('office-lewes', {
    kind: 'office', name: 'Lewes office',
    address: '20375 John J Williams Hwy, Lewes, DE 19958',
    phone: '(302) 260-9595', href: '/locations/delaware/lewes',
  }),
} satisfies Record<string, MapPin>;

/** Lat/lng for LocalBusiness.geo on the office pages. */
export const OFFICE_GEO = {
  'owings-mills': { latitude: OFFICES['owings-mills'].lat, longitude: OFFICES['owings-mills'].lng },
  'ocean-city':   { latitude: OFFICES['ocean-city'].lat,   longitude: OFFICES['ocean-city'].lng },
  'lewes':        { latitude: OFFICES['lewes'].lat,        longitude: OFFICES['lewes'].lng },
};

// ── Office / location pages (light theme, on a linen section) ────────────────
export const OFFICE_MAPS: Record<string, LocationMapConfig> = {
  'owings-mills': { theme: 'light', maxZoom: 11.5, pins: [
    OFFICES['owings-mills'],
    at('towson-md', { note: 'County seat' }),
    at('pikesville-md'), at('reisterstown-md'),
    at('baltimore-md', { note: 'Baltimore City' }),
  ]},
  'ocean-city': { theme: 'light', maxZoom: 12, pins: [
    OFFICES['ocean-city'],
    at('ocean-city-md', { name: 'Downtown Ocean City' }),
    at('west-ocean-city-md'), at('ocean-pines-md'), at('berlin-md'),
  ]},
  'lewes': { theme: 'light', maxZoom: 12, pins: [
    OFFICES['lewes'],
    at('lewes-de', { note: 'Historic Lewes' }),
    at('rehoboth-beach-de'), at('milton-de'), at('dewey-beach-de'),
  ]},
};

// ── HOA county pages: /hoa-management/maryland/<county> (dark, hero aside) ───
export const COUNTY_MAPS: Record<string, LocationMapConfig> = {
  'anne-arundel-county': { pins: [
    seat('annapolis-md', 'County seat · waterfront condo · historic district'),
    at('severna-park-md', { note: 'Single-family · the Ritchie Highway corridor' }),
    at('crofton-md', { note: 'Master-planned · sub-associations' }),
    at('pasadena-md', { note: 'Mixed townhome & single-family' }),
    at('glen-burnie-md', { note: 'Townhome-dense · BWI corridor' }),
    at('odenton-md', { note: 'New-build master-planned · Fort Meade' }),
    at('arnold-md', { note: 'Single-family' }),
    at('edgewater-md', { note: 'Waterfront' }),
    at('linthicum-md', { note: 'Transit hub' }),
    at('mayo-md', { note: 'Waterfront' }),
    at('davidsonville-md', { note: 'Rural HOA' }),
    at('shady-side-md', { note: 'Waterfront · seasonal' }),
  ]},
  'baltimore-county': { pins: [
    seat('towson-md', 'County seat · condo · single-family · university-adjacent'),
    at('owings-mills-md', { kind: 'seat', note: 'Headquarters · townhome · condo' }),
    at('pikesville-md', { note: 'Established single-family · mature infrastructure' }),
    at('catonsville-md', { note: 'Single-family · townhome · older stock' }),
    at('cockeysville-md', { note: 'Townhome · condo · Hunt Valley corridor' }),
    at('timonium-md', { note: 'Mixed · I-83 corridor' }),
    at('white-marsh-md', { note: 'Townhome HOA · east-county new build' }),
    at('perry-hall-md', { note: 'Single-family HOA · northeast county' }),
    at('reisterstown-md', { note: 'Single-family · townhome · northwest county' }),
    at('essex-md', { note: 'Mixed · small associations · waterfront adjacency' }),
  ]},
  'carroll-county': { pins: [
    seat('westminster-md', 'County seat · town-center condo · historic single-family'),
    at('eldersburg-md', { note: 'Largest market · townhome HOA · private roads' }),
    at('sykesville-md', { note: 'Small-lot single-family · shared-amenity HOAs' }),
    at('mount-airy-md', { note: 'Split-county · newer construction' }),
    at('hampstead-md', { note: 'Small single-family HOAs · well & septic' }),
    at('taneytown-md', { note: 'Rural HOA · minimal common area' }),
    at('manchester-md', { note: 'Small association · volunteer-heavy boards' }),
  ]},
  'cecil-county': { pins: [
    seat('elkton-md', 'County seat · townhome · single-family'),
    at('north-east-md', { note: 'Waterfront · single-family · head of the bay' }),
    at('perryville-md', { note: 'Single-family HOA · Susquehanna adjacency' }),
    at('chesapeake-city-md', { note: 'Small association · C&D Canal · historic' }),
    at('rising-sun-md', { note: 'Single-family HOA · Pennsylvania line' }),
    at('port-deposit-md', { note: 'Small association · riverfront' }),
  ]},
  'frederick-county': { pins: [
    seat('frederick-md', 'County seat · condo · single-family · historic district'),
    at('urbana-md', { note: 'Master-planned HOA · growth corridor' }),
    at('middletown-md', { note: 'Single-family HOA · western county' }),
    at('mount-airy-md', { note: 'Single-family HOA · Carroll County line' }),
    at('walkersville-md', { note: 'Townhome · single-family · north of the city' }),
    at('brunswick-md', { note: 'Single-family HOA · Potomac-adjacent' }),
    at('new-market-md', { note: 'Single-family HOA · east-county growth' }),
  ]},
  'howard-county': { pins: [
    seat('ellicott-city-md', 'County seat · historic-district review · stormwater reserves'),
    at('columbia-md', { note: 'Largest market · village associations · CA-layered governance' }),
    at('elkridge-md', { note: 'Townhome HOAs · BWI corridor' }),
    at('fulton-md', { note: 'New build · developer transition' }),
    at('clarksville-md', { note: 'Large-lot single-family · private roads' }),
    at('jessup-md', { note: 'Townhome & garden condo' }),
    at('laurel-md', { note: 'Garden-style condo · PG County line' }),
    at('savage-md', { note: 'Historic mill district · small associations' }),
    at('glenelg-md', { note: 'Rural HOA · well & septic' }),
  ]},
  'kent-county': { pins: [
    seat('chestertown-md', 'County seat · small association · condo · historic district'),
    at('rock-hall-md', { note: 'Waterfront association · marina-adjacent' }),
    at('betterton-md', { note: 'Small association · bay beach community' }),
    at('galena-md', { note: 'Single-family HOA · north county' }),
    at('millington-md', { note: 'Single-family HOA · east county' }),
  ]},
  'montgomery-county': { pins: [
    seat('rockville-md', 'County seat · condo · single-family · mixed stock'),
    at('silver-spring-md', { kind: 'seat', note: 'Our Columbia Pike office · high-rise condo · townhome' }),
    at('bethesda-md', { note: 'High-rise condo · established single-family' }),
    at('gaithersburg-md', { note: 'Master-planned HOA · larger communities' }),
    at('germantown-md', { note: 'Townhome HOA · upcounty new build' }),
    at('chevy-chase-md', { note: 'Single-family · condo · close-in' }),
    at('wheaton-md', { note: 'Condo · townhome · transit corridor' }),
    at('olney-md', { note: 'Single-family HOA · upcounty' }),
  ]},
  'prince-georges-county': { pins: [
    seat('upper-marlboro-md', 'County seat · single-family HOA · southern county'),
    at('bowie-md', { note: 'Largest municipality · master-planned HOA' }),
    at('laurel-md', { note: 'Garden condo · townhome · Howard County line' }),
    at('largo-md', { note: 'Condo · townhome · Metro-adjacent' }),
    at('greenbelt-md', { note: 'Historic planned community · co-op · condo' }),
    at('hyattsville-md', { note: 'Condo · townhome · inside the Beltway' }),
    at('accokeek-md', { note: 'Single-family HOA · southern county' }),
    at('fort-washington-md', { note: 'Single-family · townhome · Potomac-adjacent' }),
  ]},
  'queen-annes-county': { pins: [
    seat('centreville-md', 'County seat · single-family HOA · inland'),
    at('stevensville-md', { note: 'Condo · townhome · Kent Island, bridge-adjacent' }),
    at('chester-md', { note: 'Single-family · condo · Kent Island' }),
    at('grasonville-md', { note: 'Waterfront association · marina communities' }),
    at('queenstown-md', { note: 'Single-family HOA · Route 50 corridor' }),
    at('church-hill-md', { note: 'Small association · north county' }),
  ]},
};

// ── Maryland HOA hub: served counties, pinned at their seats ─────────────────
export const MARYLAND_HUB_MAP: LocationMapConfig = { maxZoom: 8, labelMinZoom: 7.6, padding: 36, pins: [
  OFFICES['owings-mills'],
  at('annapolis-md', { note: 'Anne Arundel County', href: '/hoa-management/maryland/anne-arundel-county' }),
  at('towson-md', { note: 'Baltimore County', href: '/hoa-management/maryland/baltimore-county' }),
  at('baltimore-md', { note: 'Baltimore City' }),
  at('ellicott-city-md', { note: 'Howard County', href: '/hoa-management/maryland/howard-county' }),
  at('rockville-md', { note: 'Montgomery County', href: '/hoa-management/maryland/montgomery-county' }),
  at('upper-marlboro-md', { note: 'Prince George’s County', href: '/hoa-management/maryland/prince-georges-county' }),
  at('frederick-md', { note: 'Frederick County', href: '/hoa-management/maryland/frederick-county' }),
  at('westminster-md', { note: 'Carroll County', href: '/hoa-management/maryland/carroll-county' }),
  at('bel-air-md', { note: 'Harford County' }),
  at('elkton-md', { note: 'Cecil County', href: '/hoa-management/maryland/cecil-county' }),
  at('chestertown-md', { note: 'Kent County', href: '/hoa-management/maryland/kent-county' }),
  at('centreville-md', { note: 'Queen Anne’s County', href: '/hoa-management/maryland/queen-annes-county' }),
  at('easton-md', { note: 'Talbot County' }),
  at('cambridge-md', { note: 'Dorchester County' }),
  at('salisbury-md', { note: 'Wicomico County' }),
]};

// ── State hubs: /hoa-management/<state> (dark, hero aside) ───────────────────
// State maps fit to a wide area; labels stay on down to zoom 6.5 since there are
// only a handful of pins per state.
export const STATE_MAPS: Record<string, LocationMapConfig> = {
  'washington-dc': { maxZoom: 12, pins: [
    at('dc-northwest', { kind: 'seat', note: 'Mid-rise and high-rise condominium associations' }),
    at('dc-capitol-hill', { note: 'Historic rowhouse conversions and small associations' }),
    at('dc-navy-yard', { note: 'Newer construction, developer transition' }),
    at('dc-southwest', { note: 'Newer construction, developer transition' }),
    at('dc-northeast', { note: 'Mixed condo and townhome associations' }),
    at('dc-u-street', { note: 'Mid-rise condominium associations' }),
  ]},
  'virginia': { maxZoom: 9.5, labelMinZoom: 6.5, pins: [
    at('fairfax-va', { kind: 'seat', note: 'Northern Virginia · DC commuter ring' }),
    at('arlington-va', { note: 'Condominium and townhome associations' }),
    at('alexandria-va', { note: 'Condominium and townhome associations' }),
    at('leesburg-va', { note: 'Loudoun County · single-family HOAs' }),
    at('manassas-va', { note: 'Prince William County · single-family HOAs' }),
  ]},
  'pennsylvania': { maxZoom: 8.5, labelMinZoom: 6.5, pins: [
    at('lancaster-pa', { kind: 'seat', note: 'South-central PA · planned communities' }),
    at('york-pa', { note: 'Planned communities and condominium associations' }),
    at('west-chester-pa', { note: 'Chester County · townhome & single-family HOAs' }),
    at('gettysburg-pa', { note: 'Adams County · along the Maryland line' }),
  ]},
  'delaware': { maxZoom: 9, labelMinZoom: 6.5, pins: [
    OFFICES['lewes'],
    at('rehoboth-beach-de', { note: 'Coastal condominium and single-family associations' }),
    at('bethany-beach-de', { note: 'Coastal condominium and single-family associations' }),
    at('georgetown-de', { note: 'Sussex County seat · year-round and seasonal communities' }),
    at('dover-de', { note: 'Kent County · inland townhome and single-family HOAs' }),
    at('wilmington-de', { note: 'New Castle County · inland HOAs' }),
  ]},
  'west-virginia': { maxZoom: 9.5, labelMinZoom: 6.5, pins: [
    at('martinsburg-wv', { kind: 'seat', note: 'Berkeley County · Eastern Panhandle' }),
    at('charles-town-wv', { note: 'Jefferson County · DC commuter ring' }),
    at('berkeley-springs-wv', { note: 'Morgan County' }),
  ]},
};

// ── Rental geo pages: /rental-management/<state>/<place> (React islands) ─────
export const RENTAL_MAPS: Record<string, LocationMapConfig> = {
  'anne-arundel': { pins: [
    seat('annapolis-md', 'County seat'),
    at('glen-burnie-md'), at('pasadena-md'), at('severna-park-md'), at('crofton-md'), at('odenton-md'),
  ]},
  'silver-spring': { maxZoom: 12.5, pins: [
    at('silver-spring-md', { kind: 'seat', name: 'Downtown', note: 'Metro hub' }),
    at('four-corners-md'), at('forest-glen-md'),
    at('wheaton-md', { name: 'Wheaton border' }),
    at('takoma-park-md', { name: 'Takoma Park edge' }),
    at('aspen-hill-md'),
  ]},
  'baltimore-county': { pins: [
    OFFICES['owings-mills'],
    at('towson-md', { note: 'County seat' }), at('cockeysville-md'), at('pikesville-md'),
    at('catonsville-md'), at('white-marsh-md'), at('dundalk-md'),
  ]},
  'howard-county': { pins: [
    seat('ellicott-city-md', 'County seat'),
    at('columbia-md'), at('elkridge-md'), at('clarksville-md'), at('fulton-md'), at('glenwood-md'),
  ]},
  'montgomery-county': { pins: [
    seat('rockville-md', 'County seat'),
    at('bethesda-md'), at('gaithersburg-md'), at('germantown-md'), at('silver-spring-md'), at('wheaton-md'), at('potomac-md'),
  ]},
  'prince-georges-county': { pins: [
    seat('upper-marlboro-md', 'County seat'),
    at('bowie-md'), at('largo-md'), at('greenbelt-md'), at('hyattsville-md'), at('college-park-md'), at('laurel-md'),
  ]},
  'ocean-city': { maxZoom: 12, pins: [
    OFFICES['ocean-city'],
    at('ocean-city-uptown', { name: 'Uptown / 145th' }),
    at('ocean-city-north', { name: 'North OC' }),
    at('ocean-city-midtown', { name: 'Midtown' }),
    at('ocean-city-md', { name: 'Downtown OC' }),
    at('west-ocean-city-md', { name: 'West OC' }),
    at('ocean-pines-md'), at('berlin-md'),
  ]},
  'lewes': { maxZoom: 12.5, pins: [
    OFFICES['lewes'],
    at('lewes-de', { kind: 'seat', name: 'Old Town Lewes' }),
    at('cape-henlopen-de'), at('pilottown-de'), at('henlopen-acres-de'), at('long-neck-de'), at('milton-de'),
  ]},
  'rehoboth': { maxZoom: 12.5, pins: [
    OFFICES['lewes'],
    at('rehoboth-beach-de', { kind: 'seat', name: 'Downtown Rehoboth' }),
    at('north-shores-de'), at('henlopen-acres-de'), at('silver-lake-de'), at('dewey-beach-de'),
    at('rehoboth-ycc-de', { name: 'Rehoboth Y&CC' }),
  ]},
  'bethany': { maxZoom: 12.5, pins: [
    at('bethany-beach-de', { kind: 'seat', name: 'Downtown Bethany' }),
    at('sea-colony-de'), at('bethany-west-de'), at('south-bethany-de'), at('ocean-view-de'), at('millville-de'),
  ]},
  'fenwick': { maxZoom: 12.5, pins: [
    at('fenwick-island-de', { kind: 'seat' }),
    at('bayside-de'), at('selbyville-de'),
    at('route-54-de', { name: 'Route 54' }),
    at('south-bethany-de'),
  ]},
};

/** Rental Maryland hub: the 10 served counties + Baltimore City, pinned at their seats. */
export const RENTAL_MARYLAND_MAP: LocationMapConfig = { maxZoom: 8.3, labelMinZoom: 7.6, padding: 36, pins: [
  OFFICES['owings-mills'],
  at('annapolis-md', { kind: 'seat', note: 'Anne Arundel County', href: '/rental-management/maryland/anne-arundel-county' }),
  at('towson-md', { note: 'Baltimore County', href: '/rental-management/maryland/baltimore-county' }),
  at('baltimore-md', { note: 'Baltimore City' }),
  at('ellicott-city-md', { note: 'Howard County', href: '/rental-management/maryland/howard-county' }),
  at('rockville-md', { note: 'Montgomery County', href: '/rental-management/maryland/montgomery-county' }),
  at('silver-spring-md', { note: 'Silver Spring', href: '/rental-management/maryland/silver-spring' }),
  at('upper-marlboro-md', { note: 'Prince George’s County', href: '/rental-management/maryland/prince-georges-county' }),
  at('frederick-md', { note: 'Frederick County' }),
  at('westminster-md', { note: 'Carroll County' }),
  at('bel-air-md', { note: 'Harford County' }),
  at('easton-md', { note: 'Talbot County' }),
  at('ocean-city-md', { name: 'Ocean City', note: 'Worcester County', href: '/rental-management/maryland/ocean-city' }),
]};

/** Rental Delaware hub: the Sussex coastal corridor. */
export const RENTAL_DELAWARE_MAP: LocationMapConfig = { maxZoom: 10.5, pins: [
  OFFICES['lewes'],
  at('lewes-de', { kind: 'seat', href: '/rental-management/delaware/lewes' }),
  at('rehoboth-beach-de', { href: '/rental-management/delaware/rehoboth-beach' }),
  at('dewey-beach-de'),
  at('bethany-beach-de', { href: '/rental-management/delaware/bethany-beach' }),
  at('fenwick-island-de', { href: '/rental-management/delaware/fenwick-island' }),
  at('milton-de'), at('long-neck-de'), at('millville-de'),
]};

// ── /service-areas: the six-state footprint ──────────────────────────────────
export const SERVICE_AREA_MAP: LocationMapConfig = { maxZoom: 7.2, labelMinZoom: 7.6, padding: 30, pins: [
  OFFICES['owings-mills'], OFFICES['ocean-city'], OFFICES['lewes'],
  // Maryland
  at('annapolis-md', { note: 'Anne Arundel County, MD', href: '/hoa-management/maryland/anne-arundel-county' }),
  at('towson-md', { note: 'Baltimore County, MD', href: '/hoa-management/maryland/baltimore-county' }),
  at('ellicott-city-md', { note: 'Howard County, MD', href: '/hoa-management/maryland/howard-county' }),
  at('rockville-md', { note: 'Montgomery County, MD', href: '/hoa-management/maryland/montgomery-county' }),
  at('upper-marlboro-md', { note: 'Prince George’s County, MD', href: '/hoa-management/maryland/prince-georges-county' }),
  at('frederick-md', { note: 'Frederick County, MD', href: '/hoa-management/maryland/frederick-county' }),
  at('westminster-md', { note: 'Carroll County, MD', href: '/hoa-management/maryland/carroll-county' }),
  at('elkton-md', { note: 'Cecil County, MD', href: '/hoa-management/maryland/cecil-county' }),
  at('chestertown-md', { note: 'Kent County, MD', href: '/hoa-management/maryland/kent-county' }),
  at('centreville-md', { note: 'Queen Anne’s County, MD', href: '/hoa-management/maryland/queen-annes-county' }),
  at('bel-air-md', { note: 'Harford County, MD' }),
  at('easton-md', { note: 'Talbot County, MD' }),
  at('salisbury-md', { note: 'Wicomico County, MD' }),
  // Washington, DC
  at('dc-capitol-hill', { name: 'Washington, DC', note: 'District condo associations', href: '/hoa-management/washington-dc' }),
  // Virginia
  at('fairfax-va', { note: 'Fairfax County, VA', href: '/hoa-management/virginia' }),
  at('leesburg-va', { note: 'Loudoun County, VA', href: '/hoa-management/virginia' }),
  at('arlington-va', { note: 'Arlington, VA', href: '/hoa-management/virginia' }),
  at('alexandria-va', { note: 'Alexandria, VA', href: '/hoa-management/virginia' }),
  at('manassas-va', { note: 'Prince William County, VA', href: '/hoa-management/virginia' }),
  // Pennsylvania
  at('west-chester-pa', { note: 'Chester County, PA', href: '/hoa-management/pennsylvania' }),
  at('lancaster-pa', { note: 'Lancaster County, PA', href: '/hoa-management/pennsylvania' }),
  at('york-pa', { note: 'York County, PA', href: '/hoa-management/pennsylvania' }),
  at('gettysburg-pa', { note: 'Adams County, PA', href: '/hoa-management/pennsylvania' }),
  // Delaware
  at('georgetown-de', { note: 'Sussex County, DE', href: '/hoa-management/delaware' }),
  at('dover-de', { note: 'Kent County, DE', href: '/hoa-management/delaware' }),
  at('wilmington-de', { note: 'New Castle County, DE', href: '/hoa-management/delaware' }),
  // West Virginia
  at('martinsburg-wv', { note: 'Berkeley County, WV', href: '/hoa-management/west-virginia' }),
  at('charles-town-wv', { note: 'Jefferson County, WV', href: '/hoa-management/west-virginia' }),
  at('berkeley-springs-wv', { note: 'Morgan County, WV', href: '/hoa-management/west-virginia' }),
]};
