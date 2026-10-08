import type { Metadata } from "next";
import Hero from "@/components/Hero";
import TrustStrip from "@/components/TrustStrip";
import SignatureTreatments from "@/components/SignatureTreatments";
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

// Mobile shows only what a visitor is looking for: the hero, treatments,
// photos of the space and how to get there. Desktop keeps the fuller page —
// the sections wrapped in DesktopOnly are hidden below the `sm` breakpoint.
function DesktopOnly({ children }: { children: React.ReactNode }) {
  return <div className="hidden sm:block">{children}</div>;
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <DesktopOnly>
        <TrustStrip />
      </DesktopOnly>
      <SignatureTreatments />
      <DesktopOnly>
        <BrandIntro />
        <SpecialOffers />
        <WhySoulSpirit />
      </DesktopOnly>
      <SpaceGallery />
      {/* Testimonials hidden for now, at the client's request, until real
          reviews are available — see components/Testimonials.tsx. */}
      <DesktopOnly>
        <MembershipSection />
      </DesktopOnly>
      <LocationSection />
      <DesktopOnly>
        <FAQSection />
        <FinalCTA />
      </DesktopOnly>
    </>
  );
}
