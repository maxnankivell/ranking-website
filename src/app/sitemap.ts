import type { MetadataRoute } from "next";

/** Required with `output: "export"` so the sitemap is emitted at build time. */
export const dynamic = "force-static";

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
