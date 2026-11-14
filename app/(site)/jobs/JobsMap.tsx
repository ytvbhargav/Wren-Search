"use client";

import Link from "next/link";
import { Map, Overlay, ZoomControl, type Bounds, type TileComponent } from "pigeon-maps";
import { useEffect, useMemo, useRef, useState } from "react";
import type { JobCard } from "@/src/lib/jobs";

// OpenStreetMap tiles by default. Set NEXT_PUBLIC_MAP_TILE_URL (with {z}/{x}/{y})
// to switch to another raster tile provider.
const TILE_URL =
  process.env.NEXT_PUBLIC_MAP_TILE_URL || "https://tile.openstreetmap.org/{z}/{x}/{y}.png";

const provider = (x: number, y: number, z: number) =>
  TILE_URL.replace("{z}", String(z)).replace("{x}", String(x)).replace("{y}", String(y));

// Soft, warm grey tiles so the orange pins stand out (like a light map style).
const GreyTile: TileComponent = ({ tile, tileLoaded }) => (
  // eslint-disable-next-line @next/next/no-img-element
  <img
    src={tile.url}
    srcSet={tile.srcSet}
    width={tile.width}
    height={tile.height}
    loading="lazy"
    onLoad={tileLoaded}
    alt=""
    style={{
      position: "absolute",
      left: tile.left,
      top: tile.top,
      willChange: "transform",
      transformOrigin: "top left",
      opacity: 1,
      filter: "grayscale(1) sepia(0.12) brightness(1.06) contrast(0.88)",
    }}
  />
);

type Pin = { key: string; lat: number; lng: number; jobs: JobCard[] };

/** Jobs at the same spot share one pin. */
function groupPins(jobs: JobCard[]): Pin[] {
  const pins: Record<string, Pin> = {};
  for (const j of jobs) {
    if (j.lat == null || j.lng == null) continue;
    const key = `${j.lat.toFixed(4)},${j.lng.toFixed(4)}`;
    (pins[key] ??= { key, lat: j.lat, lng: j.lng, jobs: [] }).jobs.push(j);
  }
  return Object.values(pins);
}

type Cluster = { key: string; lat: number; lng: number; pins: Pin[]; jobs: JobCard[] };

/** Position in world pixels at a zoom level (Web Mercator). */
function toPixel(lat: number, lng: number, zoom: number): [number, number] {
  const scale = 256 * 2 ** zoom;
  const s = Math.sin((lat * Math.PI) / 180);
  return [((lng + 180) / 360) * scale, (0.5 - Math.log((1 + s) / (1 - s)) / (4 * Math.PI)) * scale];
}

/** Merge pins whose labels would overlap at this zoom into one cluster pin. */
function clusterPins(pins: Pin[], zoom: number): Cluster[] {
  const clusters: (Cluster & { px: [number, number] })[] = [];
  for (const pin of pins) {
    const px = toPixel(pin.lat, pin.lng, zoom);
    const near = clusters.find((c) => Math.abs(c.px[0] - px[0]) < 140 && Math.abs(c.px[1] - px[1]) < 40);
    if (near) {
      near.pins.push(pin);
      near.jobs.push(...pin.jobs);
    } else {
      clusters.push({ key: pin.key, lat: pin.lat, lng: pin.lng, pins: [pin], jobs: [...pin.jobs], px });
    }
  }
  return clusters;
}

/** Center and zoom that fit every point inside a box of the given pixel size. */
function fitView(
  points: { lat: number; lng: number }[],
  width: number,
  height: number,
): { center: [number, number]; zoom: number } {
  if (points.length === 0) return { center: [39.5, -96], zoom: 4 }; // continental U.S.
  if (points.length === 1) return { center: [points[0].lat, points[0].lng], zoom: 10 };

  const mx = (lng: number) => (lng + 180) / 360;
  const my = (lat: number) => {
    const s = Math.sin((lat * Math.PI) / 180);
    return 0.5 - Math.log((1 + s) / (1 - s)) / (4 * Math.PI);
  };
  const xs = points.map((p) => mx(p.lng));
  const ys = points.map((p) => my(p.lat));
  const [minX, maxX, minY, maxY] = [Math.min(...xs), Math.max(...xs), Math.min(...ys), Math.max(...ys)];

  const pad = 0.75; // leave room around the outer pins
  const zx = Math.log2((width * pad) / (256 * Math.max(maxX - minX, 1e-9)));
  const zy = Math.log2((height * pad) / (256 * Math.max(maxY - minY, 1e-9)));
  const zoom = Math.max(3, Math.min(11, Math.floor(Math.min(zx, zy))));

  const cx = (minX + maxX) / 2;
  const cy = (minY + maxY) / 2;
  const lng = cx * 360 - 180;
  const lat = (Math.atan(Math.sinh(Math.PI * (1 - 2 * cy))) * 180) / Math.PI;
  return { center: [lat, lng], zoom };
}

export default function JobsMap({
  jobs,
  activeId,
  onActivate,
  onBoundsChange,
  fallbackCenter,
}: {
  jobs: JobCard[];
  activeId: string | null;
  onActivate: (id: string | null) => void;
  onBoundsChange?: (bounds: Bounds, byUser: boolean) => void;
  fallbackCenter?: { lat: number; lng: number } | null;
}) {
  const boxRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState<{ w: number; h: number } | null>(null);
  const [view, setView] = useState<{ center: [number, number]; zoom: number } | null>(null);
  const [openPin, setOpenPin] = useState<string | null>(null);
  // True while the map is moving because the code set the view, not the user.
  const programmatic = useRef(true);

  const pins = useMemo(() => groupPins(jobs), [jobs]);
  const fitKey = jobs.map((j) => j.id).join("|");

  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) =>
      setSize({ w: e.contentRect.width, h: e.contentRect.height }),
    );
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Re-fit whenever the set of jobs (the filter results) changes.
  useEffect(() => {
    if (!size) return;
    programmatic.current = true;
    const pts = pins.length ? pins : fallbackCenter ? [fallbackCenter] : [];
    setView(fitView(pts, size.w, size.h));
    setOpenPin(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fitKey, size?.w, size?.h, fallbackCenter?.lat, fallbackCenter?.lng]);

  return (
    <div
      ref={boxRef}
      // Lets the map handle the mouse wheel instead of the page's smooth scroll.
      data-lenis-prevent
      className="relative h-full w-full overflow-hidden bg-[#ecebe6]"
    >
      {size && view && (
        <Map
          width={size.w}
          height={size.h}
          center={view.center}
          zoom={view.zoom}
          provider={provider}
          tileComponent={GreyTile}
          minZoom={3}
          maxZoom={16}
          attributionPrefix={false}
          attribution={
            <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">
              © OpenStreetMap contributors
            </a>
          }
          onClick={() => {
            setOpenPin(null);
            onActivate(null);
          }}
          onBoundsChanged={({ center, zoom, bounds }) => {
            const byUser = !programmatic.current;
            programmatic.current = false;
            setView({ center, zoom });
            onBoundsChange?.(bounds, byUser);
          }}
        >
          <ZoomControl
            style={{ top: 16, left: "auto", right: 16, zIndex: 20 }}
            buttonStyle={{ background: "#fafaf5", color: "#383026", borderRadius: 4 }}
          />
          {clusterPins(pins, Math.round(view.zoom)).map((pin) => {
            const isActive = pin.jobs.some((j) => j.id === activeId) || openPin === pin.key;
            const label = pin.jobs.length > 1 ? `${pin.jobs.length} roles` : pin.jobs[0].title;
            const spread = pin.pins.length > 1; // jobs in several nearby places
            return (
              <Overlay key={pin.key} anchor={[pin.lat, pin.lng]} style={{ zIndex: isActive ? 30 : 10 }}>
                <div className="-translate-x-1/2 -translate-y-1/2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (spread && size) {
                        // Zoom in until the nearby places separate.
                        const fit = fitView(pin.pins, size.w, size.h);
                        programmatic.current = true;
                        setOpenPin(null);
                        setView({ center: fit.center, zoom: Math.max(fit.zoom, Math.round(view.zoom) + 2) });
                        return;
                      }
                      setOpenPin(openPin === pin.key ? null : pin.key);
                      onActivate(pin.jobs[0].id);
                    }}
                    onMouseDown={(e) => e.stopPropagation()}
                    className={`flex items-center gap-2 whitespace-nowrap rounded-full border pl-1 pr-3.5 py-1 text-[13px] shadow-md transition-colors duration-300 ${
                      isActive
                        ? "bg-brown text-eggshell border-brown"
                        : "bg-eggshell text-brown border-brown/15 hover:border-orange"
                    }`}
                  >
                    <span
                      className={`flex h-6 min-w-6 items-center justify-center rounded-full px-1 text-[11px] font-semibold ${
                        isActive ? "bg-orange text-eggshell" : "bg-orange/90 text-eggshell"
                      }`}
                    >
                      {pin.jobs.length}
                    </span>
                    <span className="max-w-[11rem] truncate font-medium">{label}</span>
                  </button>

                  {openPin === pin.key && (
                    <div
                      className="absolute left-1/2 top-full mt-2 w-72 -translate-x-1/2 rounded-sm border border-brown/10 bg-eggshell p-2 text-left shadow-xl"
                      onMouseDown={(e) => e.stopPropagation()}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div
                        className="px-2 pt-1 pb-2 text-[10px] uppercase text-brown/55"
                        style={{ letterSpacing: "0.2em" }}
                      >
                        {pin.jobs[0].location}
                      </div>
                      <ul className="max-h-60 overflow-y-auto">
                        {pin.jobs.map((j) => (
                          <li key={j.id}>
                            <Link
                              href={`/jobs/${j.slug}`}
                              className="block rounded-sm px-2 py-2 hover:bg-tan/40 transition-colors"
                            >
                              <div className="text-sm font-medium text-brown">{j.title}</div>
                              <div className="text-xs text-brown/60">
                                {j.jobTypeLabel} · {j.industryLabel}
                              </div>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </Overlay>
            );
          })}
        </Map>
      )}
    </div>
  );
}
