import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

const release = 'https://github.com/cxaiiii/photonica/releases/latest';
const directDownload = 'https://github.com/cxaiiii/photonica/releases/download/v0.2.4/Photonica-v0.2.4-win64.zip';
const validation = 'https://github.com/cxaiiii/photonica/blob/main/docs/validation/README.md';
const source = 'https://github.com/cxaiiii/photonica';
const docs = '/photonica/docs';

export const metadata: Metadata = {
  title: 'Photonica — a spectral optics bench',
  description: 'Build a laser through glass onto a screen, measure it like an instrument, watch the light actually arrive. Ray traced on the GPU, checked against closed-form optics.',
  alternates: { canonical: '/photonica' },
  openGraph: { title: 'Photonica — see where the light goes', description: 'A spectral optics bench, ray traced on the GPU. Real dispersion, real time of flight, checked against 33 closed-form results.' },
};

export default function Photonica() {
  return <main className="p-page">
    <nav className="p-nav">
      <Link className="wordmark" href="/"><i />CHAI.TXT</Link>
      <div><Link href="/">Portfolio</Link><Link href={docs}>Docs</Link><a href={validation} target="_blank">Validation ↗</a><a className="pill photon" href={release} target="_blank">Download Photonica ↗</a></div>
    </nav>

    <section className="p-hero">
      <div>
        <p className="kicker">Photonica / spectral optics bench</p>
        <Image src="/images/photonica/logo.png" alt="Photonica mark" width={220} height={220} priority className="p-logo" />
        <h1>See where<br />the <em>light</em> goes.</h1>
        <p>Photonica is a native GPU optics bench. Build a laser, drop in real glass, aim it at a screen — every ray carries a wavelength, every measurement is a real number, and the light in flight is slow enough to watch arrive.</p>
        <div className="p-actions">
          <a className="button photon-btn" href={directDownload}>Download for Windows · 1.4 MB ↓</a>
          <a className="text-link" href="#why">What makes it different ↓</a>
        </div>
        <p className="download-note">Windows 10/11 · an RTX-class GPU (DirectX Raytracing 1.1) · free.</p>
      </div>
      <Image className="p-splash" src="/images/photonica/splash.jpg" alt="White light dispersed into a spectrum by a glass prism inside Photonica" width={1400} height={1120} priority />
    </section>

    <section className="p-proof" id="why">
      <p className="kicker">Most optics toys draw pretty rainbows</p>
      <h2>This one gets<br />checked <mark>against physics.</mark></h2>
      <p className="copy">A glass in Photonica isn&apos;t a colour — it&apos;s Sellmeier dispersion data, the same curves a real optics catalogue ships. So we ran 33 textbook experiments through it: Snell&apos;s law, Fresnel reflectance, Brewster&apos;s angle, the lensmaker equation, achromatic doublets, diffraction gratings, telescope magnification — each compared to its closed-form answer, not eyeballed.</p>
      <div className="p-flow">
        <b>33<span>closed-form checks run</span></b>
        <b>33<span>passed, to sub-percent error</span></b>
        <b>0<span>hidden or rounded away</span></b>
        <b>2<span>bugs found — both in our own test, not the app</span></b>
      </div>
      <a className="text-link p-flow-link" href={validation} target="_blank">Read the full validation report ↗</a>
    </section>

    <section className="p-screenshot">
      <Image src="/images/photonica/light-in-flight.jpg" alt="Photonica's light-in-flight mode, showing a pulse of light mid-flight with a slow-down-factor overlay" width={720} height={1280} />
      <div>
        <p className="kicker">Light doesn&apos;t arrive instantly</p>
        <h2>Watch it<br />get there.</h2>
        <p>Every ray carries a real arrival time. Slow the pulse down two billion times and you can watch it cross a prism, refract, and land on a screen — with the screen staying dark until the light has actually reached it, not before.</p>
        <a className="text-link" href={release} target="_blank">See it on a real bench ↗</a>
      </div>
    </section>

    <section className="p-features">
      <article><b>01</b><h3>Rays, waves, polarisation</h3><p>Dispersion, Fresnel reflection, interference, and full Stokes-vector polarisation — not a simplified subset of one.</p></article>
      <article><b>02</b><h3>Design, not just draw</h3><p>A damped least-squares optimiser and Monte-Carlo tolerancing turn a rough lens sketch into a buildable design.</p></article>
      <article><b>03</b><h3>An assistant can run it</h3><p>An MCP interface lets an AI build a bench, take a measurement, and check its own result — the same interface the validation suite used.</p></article>
    </section>

    <section className="p-caveat">
      <p className="kicker">The honest bit</p>
      <h2>The only thing we won&apos;t fake is your GPU.</h2>
      <p>Photonica ray traces every photon in real time, so it needs a DirectX Raytracing 1.1 GPU — RTX-class NVIDIA, AMD RX 6000-series or newer, or Intel Arc. Most laptops without a dedicated GPU can&apos;t run it yet, and we&apos;d rather say that plainly than ship something that fakes the light to get around it. Everything else here — the physics, the tolerancing, where this is going — we&apos;re building for real, not for a demo.</p>
    </section>

    <section className="p-get">
      <p className="kicker">Get Photonica</p>
      <h2>Choose your path.</h2>
      <div>
        <a className="button photon-btn" href={directDownload}>Windows · 1.4 MB ↓</a>
        <a className="button p-get-alt" href={docs}>Read the docs ↗</a>
        <a className="text-link" href={validation} target="_blank">Validation report ↗</a>
        <a className="text-link" href={source} target="_blank">GitHub ↗</a>
      </div>
    </section>

    <footer className="p-footer">
      <Image src="/images/photonica/design.jpg" alt="Photonica's lens optimiser and tolerancing panel" width={1600} height={800} />
      <div><p>Built independently by Chaitanya Saxena.</p><a className="button photon-btn" href={directDownload}>Download Photonica ↓</a></div>
    </footer>
  </main>;
}
