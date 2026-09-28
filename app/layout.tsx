import type { Metadata, Viewport } from "next";
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";
import MobileActionBar from "@/components/MobileActionBar";
import PromoPopup from "@/components/PromoPopup";
import CallBot from "@/components/CallBot";
import { siteConfig, openingHoursSpecification } from "@/lib/site-config";

const heading = Fraunces({
  subsets: ["latin"],
  variable: "--font-heading",
  style: ["normal", "italic"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const body = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "SoulSpirit Spa | Luxury Spa in Khairatabad, Hyderabad",
    template: "%s | SoulSpirit Spa",
  },
  description:
    "SoulSpirit Spa is a refined massage sanctuary in Khairatabad, Hyderabad, offering Thai, Swedish, Balinese, Deep Tissue and more in a calm, private setting. Rest. Reconnect. Renew.",
  keywords: [
    "spa in Hyderabad",
    "spa in Khairatabad",
    "spa near Khairatabad",
    "massage in Khairatabad Hyderabad",
    "luxury spa in Hyderabad",
    "wellness spa Hyderabad",
    "massage spa Hyderabad",
    "premium spa Hyderabad",
    "couples spa Hyderabad",
    "spa near Taj Enclave Khairatabad",
  ],
  openGraph: {
    title: "SoulSpirit Spa | Luxury Spa in Khairatabad, Hyderabad",
    description:
      "A sanctuary for stillness, restoration and mindful wellness in Khairatabad, Hyderabad.",
    url: siteConfig.url,
    siteName: "SoulSpirit Spa",
    locale: "en_IN",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "SoulSpirit Spa" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "SoulSpirit Spa | Luxury Spa in Khairatabad, Hyderabad",
    description:
      "A sanctuary for stillness, restoration and mindful wellness in Khairatabad, Hyderabad.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "SoulSpirit",
  },
};

export const viewport: Viewport = {
  themeColor: "#F7F3EC",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "DaySpa",
    name: siteConfig.name,
    image: `${siteConfig.url}/og-image.jpg`,
    "@id": siteConfig.url,
    url: siteConfig.url,
    telephone: siteConfig.contact.phoneHref.replace("tel:", ""),
    priceRange: "₹₹₹",
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.location.addressLine,
      addressLocality: siteConfig.location.city,
      addressRegion: siteConfig.location.region,
      postalCode: siteConfig.location.postalCode,
      addressCountry: "IN",
    },
    email: siteConfig.contact.email,
    ...(siteConfig.location.lat && siteConfig.location.lng
      ? {
          geo: {
            "@type": "GeoCoordinates",
            latitude: siteConfig.location.lat,
            longitude: siteConfig.location.lng,
          },
        }
      : {}),
    ...(openingHoursSpecification().length > 0
      ? { openingHoursSpecification: openingHoursSpecification() }
      : {}),
    sameAs: [siteConfig.social.instagram, siteConfig.social.facebook].filter(
      Boolean
    ),
  };

  return (
    <html lang="en" className={`${heading.variable} ${body.variable}`}>
      <body className="pb-[calc(60px+env(safe-area-inset-bottom))] lg:pb-0">
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Nav />
        <main>{children}</main>
        <Footer />
        <FloatingContact />
        <MobileActionBar />
        <CallBot />
        <PromoPopup />
      </body>
    </html>
  );
}
