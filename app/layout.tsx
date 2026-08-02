import type { Metadata } from "next";
import "./globals.css";
import "./overrides.css";

export const metadata: Metadata = {
  title: "Worakan - Creative Developer",
  description: "This is my website",
  openGraph: {
    title: "Worakan - Creative Developer",
    description: "This is my website",
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
