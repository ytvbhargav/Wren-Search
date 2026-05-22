import type { MetadataRoute } from "next";

const SITE_URL = "https://wrensearch.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes = ["", "/about", "/approach", "/industries", "/team", "/contact"];
  return routes.map((r) => ({
    url: `${SITE_URL}${r}`,
    lastModified: now,
    changeFrequency: r === "" ? "weekly" : "monthly",
    priority: r === "" ? 1.0 : 0.8,
  }));
}
