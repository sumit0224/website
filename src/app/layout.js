import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata = {
  metadataBase: new URL('https://appwarstechnologies.com'),
  title: {
    default: 'Appwars Technologies - Best IT Training Institute',
    template: '%s | Appwars Technologies',
  },
  description: 'Appwars Technologies offers industry-leading IT training in Web Development, Data Science, AI/ML, and more with 100% placement assistance.',
  keywords: ['IT Training', 'Web Development', 'Data Science', 'Appwars Technologies', 'Coding Courses', 'Placement Assistance', 'Software Training Institute'],
  authors: [{ name: 'Appwars Technologies' }],
  creator: 'Appwars Technologies',
  publisher: 'Appwars Technologies',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Appwars Technologies - Best IT Training Institute',
    description: 'Master the latest technologies with our industry-expert led courses. 100% Placement Assistance.',
    url: 'https://appwarstechnologies.com',
    siteName: 'Appwars Technologies',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg', // Ensure this image exists or is added later
        width: 1200,
        height: 630,
        alt: 'Appwars Technologies',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Appwars Technologies',
    description: 'Best IT Training Institute with 100% Placement Assistance.',
    images: ['/twitter-image.jpg'], // Ensure this image exists or is added later
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

import Navbar from "@/components/Navbar";
import Flyer from "@/components/Flyer";
import Footer from "@/components/Footer";
import ToasterClient from "@/components/ToasterClient";
import GoogleTagManager from "@/components/GoogleTagManager";

export default function RootLayout({ children }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Appwars Technologies',
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
      <body className={outfit.className}>
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
