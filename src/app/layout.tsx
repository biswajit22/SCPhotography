import type { Metadata } from "next";
import { Playfair_Display, Poppins } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "SC Photography | Luxury Wedding & Event Photographer Kolkata",
  description: "Preserving your precious memories forever. SC Photography by Shayani Chakraborty offers premium, emotional, and storytelling wedding and event photography in Kolkata, West Bengal.",
  keywords: "Wedding Photographer Kolkata, Best Wedding Photographer Kolkata, Professional Photographer Kolkata, Bengali Wedding Photographer, Birthday Photographer Kolkata, Pre Wedding Photographer Kolkata, Candid Wedding Photography",
  openGraph: {
    title: "SC Photography | Luxury Wedding Photographer Kolkata",
    description: "Preserving your precious memories forever. Premium and emotional wedding photography in Kolkata.",
    url: "https://scphotography.in",
    siteName: "SC Photography",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Schema.org structured data for local SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "PhotographyStore",
    "name": "SC Photography",
    "image": "/images/hero_1.png",
    "@id": "https://scphotography.in",
    "url": "https://scphotography.in",
    "telephone": "+918910739773",
    "priceRange": "$$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Kolkata",
      "addressLocality": "Kolkata",
      "addressRegion": "West Bengal",
      "postalCode": "700001",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 22.5726,
      "longitude": 88.3639
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      "opens": "00:00",
      "closes": "23:59"
    },
    "sameAs": [
      "https://facebook.com/SCPhotography",
      "https://www.youtube.com/@photographywithshayani"
    ]
  };

  return (
    <html lang="en" className={`${playfair.variable} ${poppins.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased min-h-screen bg-[#0F0F10] text-[#FFFFFF] font-body selection:bg-[#D4AF37] selection:text-[#0F0F10]">
        {children}
      </body>
    </html>
  );
}
