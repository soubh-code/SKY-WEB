import type { Metadata } from "next";
import Script from "next/script";
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

const siteUrl = "https://skyskrabers.in";
const googleAnalyticsId = process.env.NEXT_PUBLIC_GA_ID;
const googleSiteVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Sky Skrabers | Built Spaces. Real Legacies.",
  description:
    "A cinematic luxury real-estate experience for Sky Skrabers, premium residences and builder floors in South Delhi.",
  applicationName: "Sky Skrabers",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.webmanifest",
  openGraph: {
    title: "Sky Skrabers | Built Spaces. Real Legacies.",
    description:
      "Premium South Delhi real estate, construction, collaborations, and ongoing projects by Sky Skrabers.",
    url: siteUrl,
    siteName: "Sky Skrabers",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Sky Skrabers - Built Spaces. Real Legacies.",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sky Skrabers | Built Spaces. Real Legacies.",
    description:
      "Premium South Delhi real estate, construction, collaborations, and ongoing projects by Sky Skrabers.",
    images: ["/og-image.png"],
  },
  ...(googleSiteVerification
    ? {
        verification: {
          google: googleSiteVerification,
        },
      }
    : {}),
};

const businessSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "RealEstateAgent"],
      "@id": `${siteUrl}/#organization`,
      name: "Sky Skrabers",
      url: siteUrl,
      logo: `${siteUrl}/assets/brand-logo-white.png`,
      image: `${siteUrl}/assets/brand-logo-white.png`,
      description:
        "Sky Skrabers is a Delhi-based real estate enterprise focused on premium residences, builder floors, construction, property selling support, collaborations, and ongoing projects across South Delhi.",
      foundingDate: "2011",
      telephone: "+91 99999 97327",
      email: "hello@skyskrabers.com",
      sameAs: ["https://www.instagram.com/sky.skrabers/"],
      address: {
        "@type": "PostalAddress",
        streetAddress: "C-132, Lajpat Nagar 2",
        addressLocality: "New Delhi",
        addressRegion: "Delhi",
        postalCode: "110024",
        addressCountry: "IN",
      },
      areaServed: [
        "South Delhi",
        "Lajpat Nagar",
        "South Extension",
        "East Of Kailash",
        "Defence Colony",
        "Hauz Khas",
      ],
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: "+91 99999 97327",
          contactType: "customer service",
          areaServed: "IN",
          availableLanguage: ["en", "hi"],
        },
        {
          "@type": "ContactPoint",
          email: "help@skyskrabers.in",
          contactType: "technical support",
          areaServed: "IN",
          availableLanguage: ["en", "hi"],
        },
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Sky Skrabers Services",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Construction",
              serviceType: "Real estate construction and property transformation",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Buy New Home",
              serviceType: "Premium South Delhi residence discovery",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Sell Property",
              serviceType: "Property selling and valuation support",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Collaboration",
              serviceType: "Real estate collaboration and redevelopment planning",
            },
          },
        ],
      },
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      name: "Sky Skrabers",
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
        {googleAnalyticsId ? (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`} strategy="afterInteractive" />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${googleAnalyticsId}');
              `}
            </Script>
          </>
        ) : null}
        {children}
      </body>
    </html>
  );
}
