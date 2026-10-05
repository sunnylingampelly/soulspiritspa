import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { blogPosts, getBlogPostMeta } from "@/lib/blog-data";
import { siteConfig } from "@/lib/site-config";
import MassageForDeskWorkersPost from "@/components/blog/MassageForDeskWorkersPost";

type Params = { slug: string };

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostMeta(slug);
  if (!post) return {};
  return {
    // post.seoTitle already includes the "| SoulSpirit Spa" suffix (it's
    // the exact SEO title supplied for this post) — `absolute` bypasses
    // the root layout's title template so it isn't appended a second time.
    title: { absolute: post.seoTitle },
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
  };
}

// Each post is its own hand-written component under components/blog/ —
// the writing includes inline links and citations that don't fit a
// generic markdown/data-driven renderer well at this scale. Add a new
// `case` here (and an entry in lib/blog-data.ts) for each new post.
export default async function BlogPostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = getBlogPostMeta(slug);
  if (!post) notFound();

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    author: { "@type": "Organization", name: post.author },
    publisher: { "@type": "Organization", name: siteConfig.name },
    mainEntityOfPage: `${siteConfig.url}/blog/${post.slug}`,
  };

  switch (slug) {
    case "massage-for-desk-workers-hyderabad":
      return (
        <>
          <script
            type="application/ld+json"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
          />
          <MassageForDeskWorkersPost />
        </>
      );
    default:
      notFound();
  }
}
