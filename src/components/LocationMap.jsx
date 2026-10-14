// Location map (React) — the same map as LocationMap.astro, for use inside the
// rental islands (RentalGeo.jsx, RentalMaryland.jsx, RentalDelaware.jsx) which
// render client-side. Engine: src/lib/location-map.ts. Pins: src/data/location-maps.ts.
//
//   <LocationMap theme="dark" pins={geo.map.pins} ariaLabel="Map of Lewes, Delaware" height={300} />
import { useEffect, useRef } from 'react';
import 'maplibre-gl/dist/maplibre-gl.css';
import '../styles/location-map.css';

export default function LocationMap({ ariaLabel, height, className = '', ...cfg }) {
  const ref = useRef(null);
  const theme = cfg.theme || 'dark';
  const pins = cfg.pins || [];

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    let destroy = null;
    import('../lib/location-map').then((m) => {
      if (!el.isConnected) return;
      m.observeLocationMap(el, { ...cfg, pins });
      destroy = () => m.destroyLocationMap(el);
    });
    return () => { if (destroy) destroy(); };
    // The config is static per page; re-mounting on prop changes is not needed.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const offices = pins.filter((p) => p.kind === 'office');
  const places = pins.filter((p) => p.kind !== 'office').map((p) => p.name);

  return (
    <div
      ref={ref}
      className={`tw-lmap tw-lmap-${theme} ${className}`.trim()}
      style={height ? { '--tw-lmap-h': `${height}px` } : undefined}
      role="application"
      aria-label={ariaLabel}
    >
      <noscript>
        <div className="tw-lmap-noscript">
          {offices.map((o) => (
            <p key={o.name}><strong>{o.name}</strong>{o.address && <><br />{o.address}</>}</p>
          ))}
          {places.length > 0 && <p>Serving {places.join(', ')}.</p>}
        </div>
      </noscript>
    </div>
  );
}
