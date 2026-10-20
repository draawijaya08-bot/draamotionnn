import type { Metadata, Viewport } from "next";
import { Inter, Syne } from "next/font/google";
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

export const metadata: Metadata = {
  title: "INDRA WIJAYA — Motion Designer & Art Director",
  description: "Sculpting Kinetic Rhythm & High-Voltage Motion for Bold Brands and Visionary Creators.",
  openGraph: {
    title: "INDRA WIJAYA — Motion Designer & Art Director",
    description: "Sculpting Kinetic Rhythm & High-Voltage Motion for Bold Brands and Visionary Creators.",
    type: "website",
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
    <html lang="en" className={`${inter.variable} ${syne.variable} dark`}>
      <body className="min-h-screen bg-[#080808] text-[#f5f5f7] antialiased selection:bg-white selection:text-black">
        {children}
      </body>
    </html>
  );
}
