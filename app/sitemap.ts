import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { treatments } from "@/lib/treatments-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/treatments",
    "/about",
    "/experience",
    "/membership",
    "/contact",
    "/booking",
    "/spa-khairatabad",
  ].map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  const treatmentRoutes = treatments.map((t) => ({
    url: `${siteConfig.url}/treatments/${t.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...treatmentRoutes];
}
