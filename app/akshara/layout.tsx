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
  title: { default: 'Akshara — captions that make people stop scrolling', template: '%s — Akshara' },
  description: 'Animated captions that pop, bounce and glow with every word you say — in 99 languages, in minutes. Dubbing, text behind you and 3D titles. Free early access on Android, Windows, Mac and the web.',
  openGraph: { siteName: 'Akshara', title: 'Akshara — captions that make people stop scrolling', description: 'The captions top creators pay editors for, done in minutes. In Hindi, Tamil, Arabic, English and 95 more.' },
};

export default function AksharaLayout({ children }: { children: React.ReactNode }) {
  return <div className={`ak ${display.variable} ${sans.variable} ${deva.variable} ${beng.variable} ${taml.variable} ${arab.variable}`}>{children}</div>;
}
