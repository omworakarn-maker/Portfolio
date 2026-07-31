import type { Metadata } from "next";
import "./globals.css";
import "./overrides.css";

export const metadata: Metadata = {
  title: "Lumen Studio — Ideas with more light",
  description: "An interactive creative-studio showcase prototype.",
  openGraph: {
    title: "Lumen Studio — Ideas with more light",
    description: "An interactive creative-studio showcase prototype.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Lumen Studio" }],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
