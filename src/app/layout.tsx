import type { Metadata } from "next";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { CleanLegacyUrlHash } from "@/components/CleanLegacyUrlHash";
import { business, googleSearchConsoleMetaCode, siteUrl } from "@/lib/business";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Sky Skrabers | South Delhi Real Estate Developer",
    template: "%s | Sky Skrabers",
  },
  description:
    "Sky Skrabers is a South Delhi real estate developer and property services company for buying homes, selling property, collaborations, investments, and property development.",
  applicationName: business.name,
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [{ url: "/icon.png", type: "image/png", sizes: "512x512" }],
    apple: [{ url: "/apple-icon.png", sizes: "180x180" }],
  },
  manifest: "/manifest.webmanifest",
  keywords: [
    "Sky Skrabers",
    "South Delhi real estate developer",
    "builder floors South Delhi",
    "buy house South Delhi",
    "sell property South Delhi",
    "property development South Delhi",
    "Lajpat Nagar real estate",
    "Defence Colony luxury homes",
    "Greater Kailash builder floors",
  ],
  openGraph: {
    title: "Sky Skrabers | South Delhi Real Estate Developer",
    description:
      "Premium South Delhi real estate, construction, collaborations, buying support, selling guidance, and ongoing projects by Sky Skrabers.",
    url: siteUrl,
    siteName: business.name,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Sky Skrabers South Delhi real estate developer",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sky Skrabers | South Delhi Real Estate Developer",
    description:
      "Premium South Delhi real estate, construction, collaborations, buying support, selling guidance, and ongoing projects by Sky Skrabers.",
    images: ["/og-image.png"],
  },
  verification: {
    google: googleSearchConsoleMetaCode,
  },
};

const businessSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "RealEstateAgent"],
      "@id": `${siteUrl}/#organization`,
      name: business.name,
      url: siteUrl,
      logo: `${siteUrl}/assets/brand-logo-white.png`,
      image: `${siteUrl}/assets/brand-logo-white.png`,
      description: business.description,
      foundingDate: "2011",
      telephone: business.phoneSchema,
      email: business.email,
      sameAs: [business.instagram],
      address: {
        "@type": "PostalAddress",
        streetAddress: business.streetAddress,
        addressLocality: business.locality,
        addressRegion: business.region,
        postalCode: business.postalCode,
        addressCountry: business.country,
      },
      areaServed: business.serviceAreas.map((area) => ({
        "@type": "Place",
        name: area,
      })),
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: business.phoneSchema,
          contactType: "customer service",
          areaServed: "IN",
          availableLanguage: ["en", "hi"],
        },
        {
          "@type": "ContactPoint",
          telephone: business.whatsappSchema,
          contactType: "WhatsApp enquiries",
          areaServed: "IN",
          availableLanguage: ["en", "hi"],
        },
        {
          "@type": "ContactPoint",
          email: business.email,
          contactType: "technical support",
          areaServed: "IN",
          availableLanguage: ["en", "hi"],
        },
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Sky Skrabers Services",
        itemListElement: business.services.map((service) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: service,
            provider: {
              "@id": `${siteUrl}/#organization`,
            },
            areaServed: business.serviceAreas,
          },
        })),
      },
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      name: business.name,
      url: siteUrl,
      publisher: {
        "@id": `${siteUrl}/#organization`,
      },
      inLanguage: "en-IN",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }} />
        <GoogleAnalytics />
        <CleanLegacyUrlHash />
        {children}
      </body>
    </html>
  );
}
