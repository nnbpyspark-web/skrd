import type { Metadata, Viewport } from "next";
import { Poppins, Lato, Cinzel_Decorative, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout";
import PWAProvider from "@/components/PWAProvider";
import { GoogleAnalytics } from "@next/third-parties/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-heading",
  display: "swap",
  preload: true,
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-body",
  display: "swap",
  preload: true,
});

const cinzel = Cinzel_Decorative({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-display",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  variable: "--font-serif",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#ff8811",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://kanugondatemple.com"),
  title: {
    default: "Sri Kanugonda Raya Swami Temple | Ancient Hindu Temple in Andhra Pradesh",
    template: "%s | Sri Kanugonda Raya Swami Temple",
  },
  description:
    "Visit Sri Kanugonda Raya Swami Temple - an ancient Hindu temple in Kanugonda, Andhra Pradesh. View darshan timings, festival schedule, gallery, and contact information.",
  keywords: [
    "Kanugonda temple",
    "Raya Swami temple",
    "Hindu temple Andhra Pradesh",
    "darshan timings",
    "temple gallery",
    "festivals",
    "sevas",
    "Kanugonda Raya Swami",
    "Telugu temple",
  ],
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "KRS Temple",
  },
  formatDetection: {
    telephone: true,
    address: true,
    email: true,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://kanugondatemple.com",
    siteName: "Sri Kanugonda Raya Swami Temple",
    title: "Sri Kanugonda Raya Swami Temple",
    description:
      "Ancient Hindu temple dedicated to Lord Raya Swami in Kanugonda, Andhra Pradesh. Discover darshan timings, festivals, and plan your visit.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Sri Kanugonda Raya Swami Temple",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sri Kanugonda Raya Swami Temple",
    description:
      "Ancient Hindu temple in Kanugonda, Andhra Pradesh. View darshan timings, gallery, and plan your visit.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

// JSON-LD Structured Data
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["HinduTemple", "TouristAttraction", "Place"],
      "@id": "https://kanugondatemple.com/#temple",
      "name": "Sri Kanugonda Raya Swami Temple",
      "alternateName": ["Kanugonda Temple", "KRS Temple"],
      "description":
        "Ancient Hindu temple dedicated to Sri Raya Swami located in Kanugonda village, Andhra Pradesh, India.",
      "url": "https://kanugondatemple.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://kanugondatemple.com/icons/icon.svg",
      },
      "image": "https://kanugondatemple.com/images/og-image.jpg",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Kanugonda Village",
        "addressLocality": "Kanugonda",
        "addressRegion": "Andhra Pradesh",
        "addressCountry": "IN",
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "16.5062",
        "longitude": "80.6480",
      },
      "telephone": "+91-XXXXXXXXXX",
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": [
            "Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"
          ],
          "opens": "05:30",
          "closes": "12:00",
        },
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": [
            "Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"
          ],
          "opens": "16:00",
          "closes": "20:30",
        },
      ],
      "hasMap": "https://maps.google.com/?q=Kanugonda+Temple+Andhra+Pradesh",
      "publicAccess": true,
      "isAccessibleForFree": true,
    },
    {
      "@type": "WebSite",
      "@id": "https://kanugondatemple.com/#website",
      "url": "https://kanugondatemple.com",
      "name": "Sri Kanugonda Raya Swami Temple",
      "description": "Official website for Sri Kanugonda Raya Swami Temple",
      "inLanguage": ["en", "te"],
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://kanugondatemple.com/?q={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://kanugondatemple.com/#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://kanugondatemple.com/",
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Darshan Timings",
          "item": "https://kanugondatemple.com/timings/",
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "About",
          "item": "https://kanugondatemple.com/about/",
        },
        {
          "@type": "ListItem",
          "position": 4,
          "name": "Gallery",
          "item": "https://kanugondatemple.com/gallery/",
        },
        {
          "@type": "ListItem",
          "position": 5,
          "name": "Sevas",
          "item": "https://kanugondatemple.com/sevas/",
        },
        {
          "@type": "ListItem",
          "position": 6,
          "name": "Contact",
          "item": "https://kanugondatemple.com/contact/",
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} ${lato.variable} ${cinzel.variable} ${cormorant.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icons/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="KRS Temple" />
        <meta name="application-name" content="KRS Temple" />
        <meta name="msapplication-TileColor" content="#ff8811" />
        <meta name="msapplication-tap-highlight" content="no" />
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">
        <ClientLayout>{children}</ClientLayout>
        <PWAProvider />
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
        )}
      </body>
    </html>
  );
}
