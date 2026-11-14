// Shared option lists for the Jobs collection and the /jobs filters.

export const JOB_TYPES = [
  { label: "Full-time", value: "full-time" },
  { label: "Part-time", value: "part-time" },
  { label: "Contract", value: "contract" },
  { label: "Contract to hire", value: "contract-to-hire" },
] as const;

export const WORKPLACES = [
  { label: "On-site", value: "on-site" },
  { label: "Hybrid", value: "hybrid" },
  { label: "Remote", value: "remote" },
] as const;

// Matches the industries listed on the /industries page.
export const INDUSTRIES = [
  { label: "Contract Furniture", value: "contract-furniture" },
  { label: "Residential Furnishings", value: "residential-furnishings" },
  { label: "Commercial Lighting", value: "commercial-lighting" },
  { label: "Architectural Products", value: "architectural-products" },
  { label: "Hospitality Furnishings", value: "hospitality-furnishings" },
  { label: "Architectural & Design Firms", value: "architectural-design-firms" },
] as const;

export const RADIUS_OPTIONS = [25, 50, 100, 250] as const;
export const DEFAULT_RADIUS = 50;

export function labelFor(
  options: readonly { label: string; value: string }[],
  value: string | null | undefined,
): string {
  return options.find((o) => o.value === value)?.label ?? "";
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}
