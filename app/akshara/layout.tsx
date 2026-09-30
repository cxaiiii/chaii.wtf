import type { Metadata } from 'next';
import { Anton, Geist, Noto_Sans_Arabic, Noto_Sans_Bengali, Noto_Sans_Devanagari, Noto_Sans_Tamil } from 'next/font/google';
import './akshara.css';

const display = Anton({ subsets: ['latin'], weight: '400', variable: '--ak-display', display: 'swap' });
const sans = Geist({ subsets: ['latin'], variable: '--ak-sans', display: 'swap' });
const deva = Noto_Sans_Devanagari({ subsets: ['devanagari'], weight: ['700', '900'], variable: '--ak-deva', display: 'swap', preload: false });
const beng = Noto_Sans_Bengali({ subsets: ['bengali'], weight: ['700', '900'], variable: '--ak-beng', display: 'swap', preload: false });
const taml = Noto_Sans_Tamil({ subsets: ['tamil'], weight: ['700', '900'], variable: '--ak-taml', display: 'swap', preload: false });
const arab = Noto_Sans_Arabic({ subsets: ['arabic'], weight: ['700', '900'], variable: '--ak-arab', display: 'swap', preload: false });

export const metadata: Metadata = {
  title: { default: 'Akshara — kinetic captions for every script', template: '%s — Akshara' },
  description: 'Word-accurate animated captions in 99 languages, text behind the subject, and GPU export — on your own computer. Free alpha for Windows and macOS.',
  openGraph: { siteName: 'Akshara', title: 'Akshara — kinetic captions for every script', description: 'Every word you say becomes motion. In Hindi, Tamil, Arabic, Japanese, Bengali, English and 90+ more.' },
};

export default function AksharaLayout({ children }: { children: React.ReactNode }) {
  return <div className={`ak ${display.variable} ${sans.variable} ${deva.variable} ${beng.variable} ${taml.variable} ${arab.variable}`}>{children}</div>;
}
