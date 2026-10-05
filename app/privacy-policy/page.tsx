import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for SoulSpirit Spa, Hyderabad.",
  alternates: { canonical: "/privacy-policy" },
};

// Describes what this website actually does — no data collection, cookie
// use or third-party service is mentioned here that isn't genuinely
// implemented in the codebase (booking/promo forms, WhatsApp links,
// sessionStorage, and Google Ads conversion tracking once configured).
const LAST_UPDATED = "5 October 2026";

export default function PrivacyPolicyPage() {
  return (
    <section className="section-pad pt-40 sm:pt-48">
      <div className="container-luxe max-w-prose">
        <h1 className="text-display-sm font-serif">Privacy Policy</h1>
        <p className="mt-4 text-sm text-ink/50">Last updated: {LAST_UPDATED}</p>

        <p className="mt-8 leading-relaxed text-ink/70">
          This policy explains what information {siteConfig.name} collects
          through this website ({siteConfig.url}), how it is used, and how
          you can ask us to remove it. {siteConfig.name} is a spa located at{" "}
          {siteConfig.location.addressLine}, {siteConfig.location.city},{" "}
          {siteConfig.location.region} {siteConfig.location.postalCode}.
        </p>

        <h2 className="mt-12 font-serif text-2xl">Information we collect</h2>
        <p className="mt-4 leading-relaxed text-ink/70">
          We only collect information you choose to give us, through:
        </p>
        <ul className="mt-4 space-y-3 text-ink/70">
          <li className="flex gap-3">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-bronze" />
            The booking request and offer forms on this site, which ask for
            your name and phone number so our team can confirm an
            appointment or a discount with you.
          </li>
          <li className="flex gap-3">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-bronze" />
            Messages you send us directly, by phone, WhatsApp, or email —
            these are handled through WhatsApp and our phone/email
            provider, not stored on our own servers.
          </li>
        </ul>
        <p className="mt-4 leading-relaxed text-ink/70">
          We do not ask for payment details anywhere on this site — all
          treatments are paid for in person at the spa.
        </p>

        <h2 className="mt-12 font-serif text-2xl">How we use it</h2>
        <p className="mt-4 leading-relaxed text-ink/70">
          We use the information you provide solely to respond to your
          enquiry, confirm an appointment, or apply an offer you&rsquo;ve
          asked about. We do not sell, rent, or share your personal
          information with third parties for marketing purposes.
        </p>

        <h2 className="mt-12 font-serif text-2xl">Cookies and similar technology</h2>
        <p className="mt-4 leading-relaxed text-ink/70">
          This site uses your browser&rsquo;s local session storage for
          small, non-identifying preferences — for example, remembering
          that you&rsquo;ve already seen our offer popup, so it doesn&rsquo;t
          repeat during the same visit. This stays on your device and is
          never sent to us.
        </p>
        <p className="mt-4 leading-relaxed text-ink/70">
          If we are running Google Ads, this site may load Google&rsquo;s
          advertising tag to measure which calls, WhatsApp messages, and
          directions requests came from an ad. No advertising or
          analytics cookies are set until you&rsquo;ve interacted with the
          site, and by default we signal to Google that ad personalisation
          and storage consent is denied, consistent with Google&rsquo;s
          Consent Mode.
        </p>

        <h2 className="mt-12 font-serif text-2xl">How long we keep it</h2>
        <p className="mt-4 leading-relaxed text-ink/70">
          We keep enquiry details only for as long as needed to respond to
          you and manage your booking, and delete or anonymise them once
          they&rsquo;re no longer needed for that purpose.
        </p>

        <h2 className="mt-12 font-serif text-2xl">Your choices</h2>
        <p className="mt-4 leading-relaxed text-ink/70">
          You can ask us what information we hold about you, or ask us to
          correct or delete it, at any time by emailing{" "}
          <a
            href={`mailto:${siteConfig.contact.email}`}
            className="link-underline"
          >
            {siteConfig.contact.email}
          </a>{" "}
          or calling{" "}
          <a href={siteConfig.contact.phoneHref} className="link-underline">
            {siteConfig.contact.phoneDisplay}
          </a>
          .
        </p>

        <h2 className="mt-12 font-serif text-2xl">Children</h2>
        <p className="mt-4 leading-relaxed text-ink/70">
          This website is not directed at children, and we do not knowingly
          collect information from anyone under 18.
        </p>

        <h2 className="mt-12 font-serif text-2xl">Changes to this policy</h2>
        <p className="mt-4 leading-relaxed text-ink/70">
          We may update this policy from time to time to reflect changes to
          the site or the law. The date at the top shows when it was last
          revised.
        </p>

        <h2 className="mt-12 font-serif text-2xl">Contact us</h2>
        <p className="mt-4 leading-relaxed text-ink/70">
          Questions about this policy can be sent to{" "}
          <a
            href={`mailto:${siteConfig.contact.email}`}
            className="link-underline"
          >
            {siteConfig.contact.email}
          </a>{" "}
          or {siteConfig.location.addressLine}, {siteConfig.location.city},{" "}
          {siteConfig.location.region} {siteConfig.location.postalCode}.
        </p>
      </div>
    </section>
  );
}
