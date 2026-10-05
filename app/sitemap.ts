import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { treatments } from "@/lib/treatments-data";
import { blogPosts } from "@/lib/blog-data";

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
    "/blog",
  ].map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  const legalRoutes = ["/privacy-policy", "/terms"].map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
    changeFrequency: "yearly" as const,
    priority: 0.3,
  }));

  const treatmentRoutes = treatments.map((t) => ({
    url: `${siteConfig.url}/treatments/${t.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const blogRoutes = blogPosts.map((p) => ({
    url: `${siteConfig.url}/blog/${p.slug}`,
    lastModified: new Date(p.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...legalRoutes, ...treatmentRoutes, ...blogRoutes];
}
