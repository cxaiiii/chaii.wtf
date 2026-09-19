'use client';
import { useId, useState } from 'react';
import { BK7, C_KM_S, ior, minDeviation, SF11, wavelengthRGB } from '@/lib/photonica/optics';

// A tiny slice of Photonica, running in the page: pick a wavelength, get the real refractive index of two
// glasses and how far a 60° prism bends that colour.
const TRACK = `linear-gradient(90deg,${Array.from({ length: 16 }, (_, i) => { const c = wavelengthRGB(400 + i * 20); return `rgb(${c[0]},${c[1]},${c[2]})`; }).join(',')})`;

export default function SpectrumLab() {
  const id = useId();
  const [nm, setNm] = useState(532);
  const [r, g, b] = wavelengthRGB(nm);
  const col = `rgb(${r},${g},${b})`;
  const nB = ior(BK7, nm), nS = ior(SF11, nm);
  const dev = minDeviation(nS, 60);
  const devRed = minDeviation(ior(SF11, 700), 60), devBlue = minDeviation(ior(SF11, 400), 60);
  // outgoing ray angle in the little diagram: spread 400..700 nm across the fan
  const t = (dev - devRed) / (devBlue - devRed);
  const ang = 8 + t * 26; // degrees below horizontal, exaggerated only in this sketch for legibility

  return (
    <div className="ph-lab ph-glass">
      <svg className="ph-lab-svg" viewBox="0 0 520 260" role="img" aria-label={`A ${nm} nm ray bending through a 60 degree SF11 prism`}>
        <defs>
          <linearGradient id={`${id}-glass`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="rgba(190,215,255,.16)" /><stop offset="1" stopColor="rgba(255,255,255,.03)" />
          </linearGradient>
          <filter id={`${id}-glow`} x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="3" /></filter>
        </defs>
        <line x1="0" y1="196" x2="202" y2="138" stroke="#fff" strokeWidth="2.2" opacity=".9" />
        <line x1="202" y1="138" x2="298" y2="138" stroke="#fff" strokeWidth="1.2" opacity=".35" />
        {[0, 1].map((k) => (
          <line key={k} x1="298" y1="138" x2={298 + 230 * Math.cos((ang * Math.PI) / 180)} y2={138 + 230 * Math.sin((ang * Math.PI) / 180)}
            stroke={col} strokeWidth={k ? 2.4 : 9} opacity={k ? 1 : 0.35} filter={k ? undefined : `url(#${id}-glow)`} />
        ))}
        <polygon points="250,52 176,188 324,188" fill={`url(#${id}-glass)`} stroke="rgba(230,240,255,.6)" strokeWidth="1.2" />
        <text x="250" y="224" textAnchor="middle" className="ph-lab-cap">SF11 · 60° apex</text>
      </svg>
      <div className="ph-lab-body">
        <div className="ph-lab-top">
          <span className="ph-lab-swatch" style={{ background: col, boxShadow: `0 0 28px ${col}` }} />
          <div><b>{nm.toFixed(0)} nm</b><small>{nm < 450 ? 'violet' : nm < 495 ? 'blue' : nm < 570 ? 'green' : nm < 590 ? 'yellow' : nm < 620 ? 'orange' : 'red'}</small></div>
        </div>
        <label htmlFor={`${id}-r`} className="ph-sr">Wavelength</label>
        <input id={`${id}-r`} className="ph-lab-range" type="range" min={400} max={700} step={1} value={nm} style={{ background: TRACK }} onChange={(e) => setNm(+e.target.value)} />
        <dl className="ph-lab-read">
          <div><dt>n, BK7 crown</dt><dd>{nB.toFixed(5)}</dd></div>
          <div><dt>n, SF11 flint</dt><dd>{nS.toFixed(5)}</dd></div>
          <div><dt>bent by the prism</dt><dd>{dev.toFixed(2)}°</dd></div>
          <div><dt>speed inside SF11</dt><dd>{Math.round(C_KM_S / nS).toLocaleString('en-US')} km/s</dd></div>
        </dl>
      </div>
    </div>
  );
}
