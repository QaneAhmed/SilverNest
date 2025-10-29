import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'SilverNest | Mature Dater Profile Builder',
  description:
    'Craft a warm, confident dating profile tailored for modern platforms with the help of AI tuned for mature daters.',
  metadataBase: new URL('https://silvernest.example.com'),
  openGraph: {
    title: 'SilverNest | Mature Dater Profile Builder',
    description:
      'Generate a polished dating profile, thoughtful prompt answers, and authentic first messages designed for mature daters.',
    url: 'https://silvernest.example.com',
    siteName: 'SilverNest',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SilverNest | Mature Dater Profile Builder',
    description:
      'Write a dating profile that sounds like you — designed for mature daters on modern platforms.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-gradient-to-b from-stone-50 via-stone-50 to-white font-sans">
        {children}
      </body>
    </html>
  );
}
