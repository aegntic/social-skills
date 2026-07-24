import type { MetadataRoute } from "next";
import { competitors } from "@/lib/competitors";

const site = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3456";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${site}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${site}/login`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    { url: `${site}/signup`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${site}/compare`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    ...competitors.map((c) => ({
      url: `${site}/compare/${c.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}
