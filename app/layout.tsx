import type { Metadata, Viewport } from "next";
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import OfferBanner from "@/components/OfferBanner";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";
import FloatingDirections from "@/components/FloatingDirections";
import MobileActionBar from "@/components/MobileActionBar";
import PromoPopup from "@/components/PromoPopup";
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
    default: "SoulSpirit Spa Khairatabad | Massage Spa Near Somajiguda",
    template: "%s | SoulSpirit Spa",
  },
  description:
    "Visit SoulSpirit Spa in Khairatabad, Hyderabad, near Somajiguda and Lakdikapul. Explore Thai, Swedish, Deep Tissue and other massage therapies. Call or WhatsApp to book.",
  keywords: [
    "spa near me",
    "spa in Khairatabad",
    "spa Somajiguda",
    "spa near Lakdikapul",
    "massage spa near me",
    "Thai massage near me",
    "deep tissue massage near me",
    "full body massage near me",
    "massage in Khairatabad",
    "spa in Hyderabad",
    "wellness spa Hyderabad",
    "couples spa Hyderabad",
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
  other: {
    "p:domain_verify": "1e21d65defbe50a742a5b3711f2a96f5",
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
    // Real, nearby neighbourhoods the spa actually serves — not an
    // invented service radius.
    areaServed: siteConfig.nearbyAreas.map((area) => ({
      "@type": "Place",
      name: area,
    })),
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
      <head>
        {/* Google Tag Manager */}
        <script
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-WLJ7PWPD');`,
          }}
        />
        {/* End Google Tag Manager */}
      </head>
      <body className="pb-[calc(60px+env(safe-area-inset-bottom))] lg:pb-0">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WLJ7PWPD"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <OfferBanner />
        <Nav />
        <main>{children}</main>
        <Footer />
        <FloatingContact />
        <FloatingDirections />
        <MobileActionBar />
        <PromoPopup />
      </body>
    </html>
  );
}
