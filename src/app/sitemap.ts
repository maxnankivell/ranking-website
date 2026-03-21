import type { MetadataRoute } from "next";

const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL ??
  "https://objectiverankings.maxnankivell.com";

export default function sitemap(): MetadataRoute.Sitemap {
  // Intentionally only the canonical homepage — inner routes are excluded from the sitemap by policy.
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
