import type { Metadata, Viewport } from "next";
import "./globals.css";
import { GameProvider } from "@/components/GameContext";

const BASE_URL = "https://devlakshay.dev";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "DEV LAKSHAY — Designer, Developer & Digital Storyteller",
    template: "%s | DEV LAKSHAY",
  },
  description:
    "Lakshay Jain is a designer, developer, and digital storyteller creating beautiful, functional, and immersive digital experiences. Specializing in UI/UX, Web Development, 3D Art, and Branding.",
  keywords: [
    "Lakshay Jain",
    "portfolio",
    "UI/UX Designer",
    "Web Developer",
    "3D Artist",
    "Brand Designer",
    "React Developer",
    "Figma Designer",
    "Framer",
    "Blender",
    "creative designer",
    "digital storyteller",
  ],
  authors: [{ name: "Lakshay Jain", url: BASE_URL }],
  creator: "Lakshay Jain",
  publisher: "DEV LAKSHAY",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "DEV LAKSHAY Portfolio",
    title: "DEV LAKSHAY — Designer, Developer & Digital Storyteller",
    description:
      "Portfolio of Lakshay Jain - creating beautiful, functional, and immersive digital experiences.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "DEV LAKSHAY Portfolio Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DEV LAKSHAY — Designer, Developer & Digital Storyteller",
    description:
      "Portfolio of Lakshay Jain - creating beautiful, functional, and immersive digital experiences.",
    images: ["/og-image.png"],
    creator: "@lakshayjain986",
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
  alternates: {
    canonical: BASE_URL,
  },
  category: "Portfolio",
  classification: "Personal Website",
  other: {
    "geo.region": "IN",
    "geo.placename": "India",
    "ICBM": "28.6139, 77.2090",
  },
};

export const viewport: Viewport = {
  themeColor: "#5C94FC",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body>
        <GameProvider>{children}</GameProvider>
        <SchemaMarkup />
      </body>
    </html>
  );
}

function SchemaMarkup() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Lakshay Jain",
    alternateName: "DEV LAKSHAY",
    url: "https://devlakshay.dev",
    image: "https://devlakshay.dev/og-image.png",
    description:
      "Designer, developer, and digital storyteller creating beautiful, functional, and immersive digital experiences.",
    email: "lakshayjain326@gmail.com",
    telephone: "+91-63781-46202",
    address: {
      "@type": "PostalAddress",
      addressCountry: "IN",
    },
    sameAs: [
      "https://www.instagram.com/lakshayjain986/",
      "https://dribbble.com/Lakshay123X",
      "https://www.linkedin.com/in/lakshay-jain-723152319/",
    ],
    jobTitle: "Designer & Developer",
    worksFor: {
      "@type": "Organization",
      name: "Freelance",
    },
    knowsAbout: [
      "UI/UX Design",
      "Web Development",
      "3D Art",
      "Branding",
      "AR/XR Design",
      "Video Editing",
    ],
    alumniOf: {
      "@type": "Organization",
      name: "Self-taught",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
