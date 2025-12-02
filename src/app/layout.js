import { Outfit, Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const outfit = Outfit({ subsets: ["latin"], variable: '--font-outfit' });
const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: '--font-space' });

export const metadata = {
  metadataBase: new URL('https://appwarstechnologies.com'),
  title: {
    default: 'Developer Mind School - Best IT Training Institute',
    template: '%s | Developer Mind School',
  },
  description: 'Developer Mind School offers industry-leading IT training in Web Development, Data Science, AI/ML, and more with 100% placement assistance.',
  keywords: ['IT Training', 'Web Development', 'Data Science', 'Developer Mind School', 'Coding Courses', 'Placement Assistance', 'Software Training Institute'],
  authors: [{ name: 'Developer Mind School' }],
  creator: 'Developer Mind School',
  publisher: 'Developer Mind School',
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Developer Mind School",
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Developer Mind School - Best IT Training Institute',
    description: 'Master the latest technologies with our industry-expert led courses. 100% Placement Assistance.',
    url: 'https://appwarstechnologies.com',
    siteName: 'Developer Mind School',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Developer Mind School',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Developer Mind School',
    description: 'Best IT Training Institute with 100% Placement Assistance.',
    images: ['/twitter-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: '/',
  },
};

export const viewport = {
  themeColor: "#2563eb",
};

import Navbar from "@/components/Navbar";
import Flyer from "@/components/Flyer";
import Footer from "@/components/Footer";
import ToasterClient from "@/components/ToasterClient";
import GoogleTagManager from "@/components/GoogleTagManager";


export default function RootLayout({ children }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Developer Mind School',
    url: 'https://appwarstechnologies.com',
    logo: 'https://appwarstechnologies.com/logo.png',
    sameAs: [
      'https://www.facebook.com/appwarstechnologies',
      'https://twitter.com/appwarstech',
      'https://www.instagram.com/appwarstechnologies',
      'https://www.linkedin.com/company/appwars-technologies',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+91-9911169001',
      contactType: 'customer service',
      areaServed: 'IN',
      availableLanguage: 'en',
    },
  };

  return (
    <html lang="en">
      <body className={`${outfit.variable} ${inter.variable} ${spaceGrotesk.variable} font-sans`}>
        <GoogleTagManager />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ToasterClient />
        <Flyer />
        <Navbar />
        <main style={{ minHeight: '100vh' }}>
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
