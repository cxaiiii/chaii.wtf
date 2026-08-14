import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://chaii.wtf'),
  title: { default: 'Chaitanya Saxena — Creative Technologist', template: '%s — Chaitanya Saxena' },
  description: 'Meaning should survive the network. Intelligence should survive without one. Chaitanya Saxena builds products across design, software, AI and hardware.',
  keywords: ['Chaitanya Saxena', 'creative technologist', 'AI developer', 'product builder', 'Vasudha', 'Bareilly'],
  authors: [{ name: 'Chaitanya Saxena', url: 'https://chaii.wtf' }],
  openGraph: { type: 'website', locale: 'en_IN', url: 'https://chaii.wtf', siteName: 'chaii.wtf', title: 'Chaitanya Saxena — Creative Technologist', description: 'Meaning should survive the network. Intelligence should survive without one.' },
  twitter: { card: 'summary_large_image', title: 'Chaitanya Saxena — Creative Technologist', description: 'I build things that shouldn’t exist yet.' },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html>; }
