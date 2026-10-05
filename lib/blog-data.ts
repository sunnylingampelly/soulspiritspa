// ---------------------------------------------------------------------------
// BLOG INDEX — metadata only. Each post's actual body content is a small
// hand-written component under components/blog/, not generated from this
// file — the writing includes inline links and citations that don't fit a
// generic data-driven renderer well at this scale (one or a few posts).
// This file exists so the index page and sitemap can list posts without
// importing every post component.
// ---------------------------------------------------------------------------

export type BlogPostMeta = {
  slug: string;
  title: string;
  seoTitle: string;
  description: string;
  category: string;
  author: string;
  // ISO date (YYYY-MM-DD) — the real date this post was published here.
  publishedAt: string;
  excerpt: string;
};

export const blogPosts: BlogPostMeta[] = [
  {
    slug: "massage-for-desk-workers-hyderabad",
    title: "Massage for Desk Workers in Hyderabad: Choosing Your Next Spa Session",
    seoTitle: "Massage for Desk Workers in Hyderabad | SoulSpirit Spa",
    description:
      "Long day at your desk? Explore Swedish, Balinese and Deep Tissue massage at SoulSpirit Spa in Khairatabad. Check availability and enjoy 15% off services.",
    category: "Wellness & Massage",
    author: "SoulSpirit Spa Team",
    publishedAt: "2026-10-05",
    excerpt:
      "A day of meetings, laptop work and Hyderabad traffic can leave you wanting a proper pause. Here's how to choose between Swedish, Balinese, Deep Tissue and Hot Stone for your next session.",
  },
];

export function getBlogPostMeta(slug: string) {
  return blogPosts.find((p) => p.slug === slug);
}
