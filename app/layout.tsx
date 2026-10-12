import type { Metadata } from "next";
import { Outfit, Playfair_Display } from "next/font/google";
import "./globals.css";

import Preloader from "@/app/components/Preloader";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://ootdaz.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "OOTD",
  description:
    "OOTD by Azfar (Md Azfar Alam) — Your Style, Written In the Stars. An editorial daily luxury menswear platform translating astronomical resonance and planetary palettes into calibrated men's outfits.",
  applicationName: "OOTD by Azfar",
  authors: [
    {
      name: "Md Azfar Alam",
      url: "https://github.com/mdazfar2",
    },
  ],
  generator: "Next.js",
  keywords: [
    "ootd by azfar",
    "ootd azfar",
    "azfar ootd",
    "ootdaz",
    "ootdaz.vercel.app",
    "outfit of the day by azfar",
    "md azfar alam",
    "mdazfar2",
    "azfar alam ootd",
    "azfar fashion",
    "celestial menswear by azfar",
    "men's outfit of the day",
    "men's t-shirt styling",
    "daily men's fashion",
    "planetary colours",
    "the color story ootd",
    "weekly planet palette",
    "what to wear today men",
    "quiet luxury menswear",
    "astronomical fashion guide",
  ],
  creator: "Md Azfar Alam",
  publisher: "Md Azfar Alam",
  alternates: {
    canonical: siteUrl,
  },
  icons: {
    icon: "/Azfar-fevico.webp",
    shortcut: "/Azfar-fevico.webp",
    apple: "/Azfar-fevico.webp",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "OOTD by Azfar",
    title: "OOTD by Azfar — Daily Celestial Men's Outfit & Luxury Style Guide",
    description:
      "Curated by Md Azfar Alam. Daily luxury men's outfit inspiration guided by planetary resonance and astronomical color palettes.",
    images: [
      {
        url: "/OOTD-banner-github.png",
        width: 1200,
        height: 630,
        alt: "OOTD by Azfar — Daily Luxury Men's Outfit of the Day",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OOTD by Azfar — Daily Luxury Men's Outfit & Style Guide",
    description:
      "Curated by Md Azfar Alam. Explore celestial daily menswear, planetary palettes, and editorial quiet-luxury styling.",
    images: ["/OOTD-banner-github.png"],
    creator: "@mdazfar2",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "lifestyle",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Schema.org Structured Data for Google Rich Snippets
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "OOTD by Azfar",
        alternateName: [
          "OOTD Azfar",
          "ootdaz",
          "Outfit of the Day by Azfar",
          "OOTD by Md Azfar Alam",
          "OOTD",
        ],
        description:
          "Daily luxury men's outfit of the day and planetary style curation by Md Azfar Alam.",
        inLanguage: "en-US",
        publisher: {
          "@type": "Person",
          "@id": `${siteUrl}/#author`,
          name: "Md Azfar Alam",
          alternateName: ["Azfar Alam", "Azfar", "mdazfar2"],
          url: "https://github.com/mdazfar2",
          sameAs: ["https://github.com/mdazfar2"],
        },
      },
      {
        "@type": "WebApplication",
        "@id": `${siteUrl}/#app`,
        name: "OOTD by Azfar",
        url: siteUrl,
        applicationCategory: "LifestyleApplication",
        operatingSystem: "All",
        browserRequirements: "Requires WebGL support for 3D celestial visualization",
        creator: {
          "@id": `${siteUrl}/#author`,
        },
      },
    ],
  };

  return (
    <html
      lang="en"
      className={`${outfit.variable} ${playfair.variable} h-full antialiased dark`}
    >
      <head>
        <link rel="icon" href="/Azfar-fevico.webp" type="image/webp" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#07080C] text-[#F3F4F6]">
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
                navigator.serviceWorker.getRegistrations().then(function(regs) {
                  for (var reg of regs) { reg.unregister(); }
                }).catch(function() {});
              }
            `,
          }}
        />
        <Preloader />
        {children}
      </body>
    </html>
  );
}
