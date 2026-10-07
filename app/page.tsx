import type { Metadata } from "next";
import Hero from "@/components/Hero";
import TrustStrip from "@/components/TrustStrip";
import SignatureTreatments from "@/components/SignatureTreatments";
import LocalMassageServices from "@/components/LocalMassageServices";
import BrandIntro from "@/components/BrandIntro";
import SpecialOffers from "@/components/SpecialOffers";
import WhySoulSpirit from "@/components/WhySoulSpirit";
import SpaceGallery from "@/components/SpaceGallery";
import MembershipSection from "@/components/MembershipSection";
import LocationSection from "@/components/LocationSection";
import FAQSection from "@/components/FAQSection";
import FinalCTA from "@/components/FinalCTA";

export const metadata: Metadata = {
  description:
    "Visit SoulSpirit Spa in Khairatabad, Hyderabad, near Somajiguda and Lakdikapul. Explore Thai, Swedish, Deep Tissue and other massage therapies. Call or WhatsApp to book.",
  alternates: { canonical: "/" },
};

// Kept deliberately lean: services come right after the hero, and the
// storytelling sections that used to repeat here (the guided journey, the
// four principles, the single-treatment spotlight) now live on their own
// pages (/experience, /about, /treatments) instead of being duplicated on
// the homepage too. SpaceGallery is the exception — real photos of the
// actual rooms a guest walks into, reusing them here on purpose.
// LocalMassageServices carries the Khairatabad/Somajiguda/Lakdikapul local
// SEO content and per-service cards for the Google Ads campaign.
export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <SignatureTreatments />
      <LocalMassageServices />
      <BrandIntro />
      <SpecialOffers />
      <WhySoulSpirit />
      <SpaceGallery />
      {/* Testimonials hidden for now, at the client's request, until real
          reviews are available — see components/Testimonials.tsx. */}
      <MembershipSection />
      <LocationSection />
      <FAQSection />
      <FinalCTA />
    </>
  );
}
