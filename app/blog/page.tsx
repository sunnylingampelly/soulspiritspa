import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import { blogPosts } from "@/lib/blog-data";
import { siteImages } from "@/lib/images";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Wellness and massage guidance from SoulSpirit Spa in Khairatabad, Hyderabad.",
  alternates: { canonical: "/blog" },
};

export default function BlogIndexPage() {
  return (
    <section className="section-pad pt-40 sm:pt-48">
      <div className="container-luxe">
        <Reveal>
          <p className="eyebrow">Journal</p>
        </Reveal>
        <Reveal delay={0.08}>
          <h1 className="mt-5 max-w-2xl text-display-md font-serif text-balance">
            Wellness notes from SoulSpirit.
          </h1>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post, i) => (
            <Reveal key={post.slug} delay={i * 0.06}>
              <Link href={`/blog/${post.slug}`} className="group block">
                <ImagePlaceholder
                  label={post.title}
                  tone={i % 2 === 0 ? "sand" : "stone"}
                  src={siteImages.shoulderHandsCloseup}
                  className="aspect-[4/3] w-full transition-transform duration-1000 ease-luxe group-hover:scale-[1.03]"
                />
                <p className="mt-4 eyebrow text-ink/40">{post.category}</p>
                <h2 className="mt-2 font-serif text-xl">
                  <span className="link-underline">{post.title}</span>
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-ink/60">
                  {post.excerpt}
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
