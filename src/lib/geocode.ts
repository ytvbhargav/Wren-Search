// Turns a free-text place ("Grand Rapids, MI", "60654", "Ontario") into
// coordinates using Photon (https://photon.komoot.io), the free open-source
// geocoder built on OpenStreetMap data. No API key needed.
//
// Results are limited to North America, since Wren serves the U.S. and Canada.

const PHOTON_URL = "https://photon.komoot.io/api/";
const NORTH_AMERICA_BBOX = "-170,15,-50,75";

export type GeocodeResult = {
  lat: number;
  lng: number;
  label: string;
};

export async function geocode(query: string): Promise<GeocodeResult | null> {
  const q = query.trim();
  if (!q) return null;

  const url = `${PHOTON_URL}?q=${encodeURIComponent(q)}&limit=1&bbox=${NORTH_AMERICA_BBOX}`;

  // The free service occasionally rate-limits or times out, so retry briefly.
  for (let attempt = 1; attempt <= 3; attempt++) {
    const result = await geocodeOnce(url, q);
    if (result !== "retry") return result;
    if (attempt < 3) await new Promise((r) => setTimeout(r, 1000 * attempt));
  }
  return null;
}

async function geocodeOnce(url: string, q: string): Promise<GeocodeResult | null | "retry"> {
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "jobs-map/1.0" },
      // The same search is answered from cache for a day.
      next: { revalidate: 60 * 60 * 24 },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) {
      console.warn(`Geocoding "${q}" failed: HTTP ${res.status}`);
      return res.status === 429 || res.status >= 500 ? "retry" : null;
    }

    const data = (await res.json()) as {
      features?: {
        geometry?: { coordinates?: [number, number] };
        properties?: { name?: string; city?: string; state?: string };
      }[];
    };

    const feature = data.features?.[0];
    const coords = feature?.geometry?.coordinates;
    if (!coords) return null;

    const p = feature.properties ?? {};
    const label = [p.name, p.city !== p.name ? p.city : undefined, p.state !== p.name ? p.state : undefined]
      .filter(Boolean)
      .join(", ");

    return { lng: coords[0], lat: coords[1], label: label || q };
  } catch (err) {
    console.warn(`Geocoding "${q}" failed:`, err instanceof Error ? err.message : err);
    return "retry";
  }
}

/** Great-circle distance between two points, in miles. */
export function distanceMiles(
  a: { lat: number; lng: number },
  b: { lat: number; lng: number },
): number {
  const R = 3958.8;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}
