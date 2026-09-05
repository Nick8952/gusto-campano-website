import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

const ROUTES = [
  { path: "/", priority: 1 },
  { path: "/speisekarte/", priority: 0.9 },
  { path: "/ueber-uns/", priority: 0.7 },
  { path: "/galerie/", priority: 0.6 },
  { path: "/reservieren/", priority: 0.9 },
  { path: "/impressum/", priority: 0.2 },
  { path: "/datenschutz/", priority: 0.2 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return ROUTES.map((r) => ({
    url: `${SITE_URL}${r.path}`,
    lastModified: now,
    priority: r.priority,
  }));
}
