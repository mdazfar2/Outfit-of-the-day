import type { Metadata } from "next";
import { Outfit, Playfair_Display } from "next/font/google";
import "./globals.css";

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

export const metadata: Metadata = {
  title: "OOTD",
  description:
    "Your Style, Written In the Stars. Daily luxury men's T-shirt inspiration curated through the celestial colors and alignments of the cosmos.",
  icons: {
    icon: "/Azfar-fevico.webp",
    shortcut: "/Azfar-fevico.webp",
    apple: "/Azfar-fevico.webp",
  },
  keywords: [
    "OOTD",
    "men's outfit of the day",
    "men's t-shirt styling",
    "daily men's fashion",
    "planetary colours",
    "what to wear today men",
  ],
  openGraph: {
    title: "OOTD",
    description:
      "Your Style, Written In the Stars. Daily luxury men's T-shirt inspiration through the colors of the cosmos.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${playfair.variable} h-full antialiased dark`}
    >
      <head>
        <link rel="icon" href="/Azfar-fevico.webp" type="image/webp" />
      </head>
      <body className="min-h-full flex flex-col bg-[#07080C] text-[#F3F4F6]">
        {children}
      </body>
    </html>
  );
}
