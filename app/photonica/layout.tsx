import type { Metadata } from 'next';
import { Geist, Geist_Mono, Instrument_Serif } from 'next/font/google';
import PhotonicaFx from '@/components/photonica/fx';
import './photonica.css';

const sans = Geist({ subsets: ['latin'], variable: '--ph-sans', display: 'swap' });
const mono = Geist_Mono({ subsets: ['latin'], variable: '--ph-mono', display: 'swap' });
const serif = Instrument_Serif({ subsets: ['latin'], weight: '400', style: ['normal', 'italic'], variable: '--ph-serif', display: 'swap' });

export const metadata: Metadata = {
  title: { default: 'Photonica — a laboratory for light', template: '%s — Photonica' },
  description: 'Photonica simulates light the way physics does: every ray a real wavelength, every lens real glass, every photon arriving on time. Experiment, measure, design and film it — on your GPU.',
  openGraph: { siteName: 'Photonica', title: 'Photonica — a laboratory for light', description: 'Light, exactly as it behaves. Real dispersion, real polarisation, real time of flight — validated against 33 closed-form results.' },
};

export default function PhotonicaLayout({ children }: { children: React.ReactNode }) {
  return <div className={`ph ${sans.variable} ${mono.variable} ${serif.variable}`}>
    <div className="ph-aurora" aria-hidden="true"><i /><i /><i /></div>
    <div className="ph-grain" aria-hidden="true" />
    <PhotonicaFx />
    {children}
  </div>;
}
