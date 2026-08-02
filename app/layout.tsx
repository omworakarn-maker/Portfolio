import type { Metadata } from "next";
import "./globals.css";
import "./overrides.css";

export const metadata: Metadata = {
  title: "Worakan - Portfolio",
  description: "This is my website",
  openGraph: {
    title: "Worakan - Portfolio",
    description: "This is my website",
    images: [{ url: "/IMG_1816-removebg-preview-3.png", width: 1200, height: 630, alt: "Worakan" }],
  },
  icons: {
    icon: [
      { url: "/icon.png?v=2", type: "image/png" },
    ],
    shortcut: ["/favicon.ico?v=2"],
    apple: ["/icon.png?v=2"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/icon.png?v=2" type="image/png" />
        <link rel="shortcut icon" href="/favicon.ico?v=2" type="image/png" />
        <link rel="apple-touch-icon" href="/icon.png?v=2" />
      </head>
      <body>{children}</body>
    </html>
  );
}
