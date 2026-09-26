import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Terms and Conditions for SoulSpirit Spa, Hyderabad.",
  alternates: { canonical: "/terms" },
  robots: { index: false },
};

export default function TermsPage() {
  return (
    <section className="section-pad pt-40 sm:pt-48">
      <div className="container-luxe max-w-prose">
        <h1 className="text-display-sm font-serif">Terms &amp; Conditions</h1>
        <p className="mt-6 text-ink/60">
          [TERMS & CONDITIONS CONTENT] — this page is a placeholder. Replace
          with SoulSpirit Spa&rsquo;s actual booking, cancellation and
          conduct policies before launch.
        </p>
      </div>
    </section>
  );
}
