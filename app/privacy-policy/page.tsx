import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for SoulSpirit Spa, Hyderabad.",
  alternates: { canonical: "/privacy-policy" },
  robots: { index: false },
};

export default function PrivacyPolicyPage() {
  return (
    <section className="section-pad pt-40 sm:pt-48">
      <div className="container-luxe max-w-prose">
        <h1 className="text-display-sm font-serif">Privacy Policy</h1>
        <p className="mt-6 text-ink/60">
          [PRIVACY POLICY CONTENT] — this page is a placeholder. Replace with
          SoulSpirit Spa&rsquo;s actual privacy policy, covering what
          information is collected via this website (such as booking
          enquiries), how it is used and stored, and how guests can request
          its removal.
        </p>
      </div>
    </section>
  );
}
