import type { Metadata, Viewport } from "next";
import "@fontsource/manrope/latin-400.css";
import "@fontsource/manrope/latin-500.css";
import "@fontsource/manrope/latin-600.css";
import "@fontsource/manrope/latin-700.css";
import "@fontsource/manrope/latin-800.css";
import "./globals.css";
import { company } from "@/data/company";

export const metadata: Metadata = {
  ...(company.siteUrl
    ? { metadataBase: new URL(company.siteUrl), alternates: { canonical: "/" } }
    : {}),
  title: "Gutiérrez Landscaping & More | Lawn Care & Landscaping",
  description:
    "Your Property. Our Pride. Dependable lawn care, landscaping, and property maintenance. Call Darwin Gutierrez for a free estimate. Available seven days a week.",
  openGraph: {
    title: "Gutiérrez Landscaping & More",
    description:
      "Your Property. Our Pride. Professional property care with a clean finish.",
    type: "website",
    locale: "en_US",
    ...(company.siteUrl
      ? {
          url: company.siteUrl,
          images: [
            {
              url: "/opengraph-image",
              width: 1200,
              height: 630,
              alt: company.slogan,
            },
          ],
        }
      : {}),
  },
  twitter: {
    card: "summary_large_image",
    title: company.name,
    description: company.slogan,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#101713",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
