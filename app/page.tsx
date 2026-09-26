import type { Metadata } from "next";
import Hero from "@/components/Hero";
import TrustStrip from "@/components/TrustStrip";
import SignatureTreatments from "@/components/SignatureTreatments";
import BrandIntro from "@/components/BrandIntro";
import SpecialOffers from "@/components/SpecialOffers";
import WhySoulSpirit from "@/components/WhySoulSpirit";
import MembershipSection from "@/components/MembershipSection";
import LocationSection from "@/components/LocationSection";
import FAQSection from "@/components/FAQSection";
import FinalCTA from "@/components/FinalCTA";

export const metadata: Metadata = {
  description:
    "A refined escape from the noise of everyday life. Explore the massage menu at SoulSpirit Spa, Hyderabad.",
  alternates: { canonical: "/" },
};

// Kept deliberately lean: services come right after the hero, and the
// storytelling sections that used to repeat here (the guided journey, the
// four principles, the interior gallery, the single-treatment spotlight)
// now live on their own pages (/experience, /about, /treatments) instead of
// being duplicated on the homepage too.
export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <SignatureTreatments />
      <BrandIntro />
      <SpecialOffers />
      <WhySoulSpirit />
      {/* Testimonials hidden for now, at the client's request, until real
          reviews are available — see components/Testimonials.tsx. */}
      <MembershipSection />
      <LocationSection />
      <FAQSection />
      <FinalCTA />
    </>
  );
}
