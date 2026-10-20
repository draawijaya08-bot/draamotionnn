import type { Metadata, Viewport } from "next";
import { Inter, Syne, Playfair_Display } from "next/font/google";
import { SmoothScrollProvider } from "@/components/layout/SmoothScrollProvider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "700", "800"],
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  style: ["italic", "normal"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "INDRA WIJAYA — Motion Designer & Art Director",
  description: "Sculpting Kinetic Rhythm, High-Voltage Commercial Motion & AI Creative Pipelines for Bold Brands.",
  keywords: [
    "Indra Wijaya",
    "Motion Designer",
    "Art Director",
    "After Effects",
    "Premiere Pro",
    "Photoshop",
    "Illustrator",
    "AI Creative Pipeline",
    "Midjourney",
    "Commercial Animation",
  ],
  authors: [{ name: "Indra Wijaya" }],
  creator: "Indra Wijaya",
  metadataBase: new URL("https://indrawijaya.motion"),
  openGraph: {
    title: "INDRA WIJAYA — Motion Designer & Art Director",
    description: "Sculpting Kinetic Rhythm, High-Voltage Commercial Motion & AI Creative Pipelines for Bold Brands.",
    url: "https://indrawijaya.motion",
    siteName: "INDRA WIJAYA Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "INDRA WIJAYA — Motion Designer & Art Director",
    description: "Sculpting Kinetic Rhythm, High-Voltage Commercial Motion & AI Creative Pipelines for Bold Brands.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#080808",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${syne.variable} ${playfair.variable} dark`}>
      <body className="min-h-screen bg-[#050608] text-[#f5f5f7] antialiased selection:bg-amber-400 selection:text-black">
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
