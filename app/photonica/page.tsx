import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import ScrollReveal from '@/components/scroll-reveal';
import PhNav from '@/components/photonica/nav';
import PrismHero from '@/components/photonica/prism-hero';
import Clip from '@/components/photonica/clip';
import SpectrumLab from '@/components/photonica/spectrum-lab';

const VERSION = 'v0.2.4';
const download = `https://github.com/cxaiiii/photonica/releases/download/${VERSION}/Photonica-${VERSION}-win64.zip`;
const validation = 'https://github.com/cxaiiii/photonica/blob/main/docs/validation/README.md';
const github = 'https://github.com/cxaiiii/photonica';

export const metadata: Metadata = {
  title: { absolute: 'Photonica — a laboratory for light' },
  alternates: { canonical: '/photonica' },
};

export default function Photonica() {
  return <main>
    <PhNav />

    <header className="ph-hero">
      <PrismHero />
      <div className="ph-hero-inner">
        <span className="ph-kicker">A laboratory for light</span>
        <h1 className="ph-h1">Light, exactly<br />as it <em>behaves.</em></h1>
        <p className="ph-lede">Photonica simulates light the way physics does. Every ray carries its own wavelength, every lens is real glass, every photon arrives exactly when it would. Build any optical experiment you can imagine, measure it like an instrument, design optics you could manufacture, and watch light itself cross the room.</p>
        <div className="ph-cta">
          <a className="ph-btn" href={download}>Download for Windows <small>{VERSION} · 1.4 MB</small></a>
          <Link className="ph-btn ghost" href="/photonica/docs">Read the docs</Link>
        </div>
        <span className="ph-req">Windows 10 / 11 · RTX-class GPU · free</span>
      </div>
      <span className="ph-live"><i />Live · SF11 prism · real Sellmeier dispersion</span>
      <div className="ph-stats ph-glass">
        <div><b>33 / 33</b><span>checks against closed-form physics</span></div>
        <div><b>17</b><span>experiments, ready to open</span></div>
        <div><b>Real time</b><span>ray traced on your GPU</span></div>
        <div><b>MCP</b><span>an AI can run the lab</span></div>
      </div>
    </header>

    <section className="ph-sec">
      <ScrollReveal className="ph-head">
        <span className="ph-kicker">Who it&apos;s for</span>
        <h2 className="ph-h2" data-ab>One lab. <em>Every</em> kind of curious.</h2>
      </ScrollReveal>
      <ScrollReveal className="ph-aud">
        <article className="ph-glass">
          <span className="glyph"><Spark c="#3dffa8" /></span>
          <span className="tag">For students</span>
          <h3>The textbook, running.</h3>
          <p>Snell&apos;s law, lenses, total internal reflection, polarisation, diffraction. Change one number and the physics answers back with a measurement — the same numbers your exam expects, now something you can hold.</p>
          <Link className="ph-link" href="/photonica/docs/light-and-colour">Start with light &amp; colour →</Link>
        </article>
        <article className="ph-glass">
          <span className="glyph"><Spark c="#ffe14d" /></span>
          <span className="tag">For the curious</span>
          <h3>Rainbows, diamonds, and light slowed two billion times.</h3>
          <p>Why a diamond throws fire, how one raindrop makes a rainbow, what a pulse of light looks like halfway across a table. Open a demo, drag a prism, and see it happen.</p>
          <Link className="ph-link" href="/photonica/docs/first-experiment">Your first experiment →</Link>
        </article>
        <article className="ph-glass">
          <span className="glyph"><Spark c="#7cc4ff" /></span>
          <span className="tag">For engineers</span>
          <h3>Design it. Tolerance it. Build it.</h3>
          <p>Real glass catalogues, thin-film coatings, a damped least-squares optimiser, Monte-Carlo tolerancing with yield, Zemax import, and every measurement exported as raw JSON.</p>
          <Link className="ph-link" href="/photonica/docs/lens-design">Lens design →</Link>
        </article>
      </ScrollReveal>
    </section>

    <div className="ph-rule" />

    <section className="ph-sec" id="science">
      <div className="ph-split">
        <ScrollReveal className="ph-head" >
          <span className="ph-kicker">Try it right here</span>
          <h2 className="ph-h2" data-ab>Why white light <em>splits.</em></h2>
          <p className="ph-p">Glass slows light down — but not every colour by the same amount. Violet crawls, red slips through, and so each colour leaves a prism at its own angle. That one fact is behind every rainbow, the fire in a diamond, and the coloured fringes on a cheap lens.</p>
          <p className="ph-p">The slider runs the same dispersion formula Photonica uses for every ray: the Sellmeier equation, with the manufacturer&apos;s coefficients for two real glasses.</p>
          <p className="ph-note-line">n²(λ) = 1 + Σ Bᵢλ² / (λ² − Cᵢ)</p>
        </ScrollReveal>
        <ScrollReveal><SpectrumLab /></ScrollReveal>
      </div>
    </section>

    <div id="lab" />
    <Feature
      kicker="Rays & real glass"
      title={<>Every ray is a <em>real</em> wavelength.</>}
      body="Nothing in Photonica is painted on. White light is dozens of wavelengths travelling together, glasses bend each one by their measured dispersion, and every surface splits the power between reflection and transmission the way Fresnel's equations say it must."
      points={['Manufacturer Sellmeier and Schott data; load any Zemax AGF catalogue', 'Fresnel reflection, total internal reflection, thermal dn/dT', 'Anti-reflection, mirror and dichroic thin-film coatings', 'Lenses, aspheres, prisms, gems, water, mirrors, splitters, gratings', 'Every reflection branch followed — including the ghosts']}
      img="/images/photonica/dsotm.jpg" alt="White light entering a glass prism and leaving as a spectrum, in Photonica"
      float={{ at: 'br', b: '24 λ', s: 'wavelengths in one white beam' }} />
    <section className="ph-feat flip">
      <ScrollReveal className="ph-feat-text">
        <span className="ph-kicker">Time of flight</span>
        <h2 className="ph-h2" data-ab>Light has a speed. <em>Watch</em> it.</h2>
        <p className="ph-p">Every photon carries a real arrival time, slowed by exactly the right amount in every piece of glass it crosses. Slow the clock down billions of times and a pulse of light walks across your bench — and the screens stay dark until it has genuinely arrived.</p>
        <ul className="ph-list">
          <li>Group-delay timing on every path, femtosecond resolution</li>
          <li>Light-in-flight playback with a Blender-style loop range</li>
          <li>Screens that show only light that has already arrived</li>
          <li>A planet-scale calculator: fibre, satellites, the Moon, Mars, Voyager</li>
        </ul>
      </ScrollReveal>
      <div className="ph-media">
        <div className="main ph-glass" data-parallax="0.05">
          <Clip src="/images/photonica/light-in-flight.mp4" poster="/images/photonica/light-in-flight-poster.jpg" alt="A pulse of light crossing a diamond, rendered by Photonica with the slow-down factor burned in" />
        </div>
        <div className="float tl ph-glass" data-parallax="0.1"><b>4.8 billion×</b><span>slower than light</span></div>
      </div>
    </section>
    <Feature
      kicker="Waves & polarisation"
      title={<>Not just rays. <em>Waves.</em></>}
      body="When the geometry runs out, the wave takes over. Photonica sums Huygens wavelets for slits and apertures, sends light through diffraction gratings order by order, and carries a full polarisation state — so a quarter-wave plate really does make circular light."
      points={['Double slits and pinholes as Huygens–Fresnel sums', 'Diffraction gratings with per-order efficiency', 'Jones-vector polarisation and a live Stokes readout', 'Point spread function, Strehl ratio and MTF']}
      img="/images/photonica/double-slit.jpg" alt="Young's double-slit interference fringes on a screen in Photonica"
      float={{ at: 'br', b: 'λL / d', s: 'fringe spacing, measured' }} />
    <Feature flip
      kicker="Lens design"
      title={<>From sketch to <em>something you could build.</em></>}
      body="Describe what a lens should do — a focal length, a spot size, zero colour error — and the optimiser bends the surfaces until it does. Then tolerancing asks the hard question: when real glass is ground slightly wrong, how many of the lenses you make will still work?"
      points={['Damped least-squares optimiser: curvatures, thicknesses, spacings, conics, tilts', 'Operands for spot size, focal length, collimation, chromatic focus', 'Monte-Carlo tolerancing with a refocus compensator and yield', 'Collision checks: unbuildable designs count as failures', 'Import Zemax .zmx lens prescriptions']}
      img="/images/photonica/design.jpg" alt="Photonica's optimiser and tolerancing panel designing an achromatic doublet"
      float={{ at: 'tl', b: '1320×', s: 'merit improvement, 7 iterations' }} />
    <Feature
      kicker="Photoreal & video"
      title={<>Cinematic, <em>when you want it.</em></>}
      body="Press P and the same scene becomes a spectral path-traced photograph: caustics pooling behind glass, beams glowing through haze, bloom around the brightest light. Then set camera keys on a timeline and render it — reel, square, widescreen or 4K."
      points={['Spectral path tracer with caustics, haze, bloom and depth of field', 'Camera timeline with eased keyframes and orbits', 'Reel 9:16, square, 4:5, 16:9, 21:9 and 4K formats', 'Burned-in time-of-flight stats and a watermark, if you want them']}
      img="/images/photonica/render.jpg" alt="Photonica's render timeline preparing a video of light in flight"
      float={{ at: 'br', b: '4K', s: 'straight to mp4' }} />

    <section className="ph-feat flip" id="mcp">
      <ScrollReveal className="ph-feat-text">
        <span className="ph-kicker">AI in the lab</span>
        <h2 className="ph-h2" data-ab>Your assistant can <em>run the bench.</em></h2>
        <p className="ph-p">Photonica speaks MCP, the open protocol AI assistants use to work with tools. Ask Claude to build a telescope, measure its magnification and check it against theory — it places the lenses, reads the numbers, and verifies its own work on your screen. That&apos;s exactly how Photonica&apos;s own validation suite was run.</p>
        <ul className="ph-list">
          <li>28 tools: build, measure, trace a ray, optimise, tolerance, screenshot, render</li>
          <li>Reads polarisation state, arrival times and detector power directly</li>
          <li>Local only: a private pipe on your machine, switchable off in one click</li>
        </ul>
        <Link className="ph-link" href="/photonica/docs/mcp" style={{ justifySelf: 'start' }}>MCP reference →</Link>
      </ScrollReveal>
      <ScrollReveal>
        <div className="ph-term ph-glass" data-parallax="0.06">
          <header><i /><i /><i /></header>
          <pre><span className="c"># connect Claude Code to Photonica</span>{'\n'}<span className="k">claude mcp add</span> photonica -- <span className="s">&quot;…\photonica-mcp.exe&quot;</span>{'\n\n'}<span className="c"># then just ask, in plain words:</span>{'\n'}<span className="s">&quot;Build a Keplerian telescope with a 500 mm objective{'\n'} and a 50 mm eyepiece, find the spacing that{'\n'} collimates the output, and check the angular{'\n'} magnification against −f₁/f₂.&quot;</span></pre>
        </div>
      </ScrollReveal>
    </section>

    <section className="ph-sec">
      <ScrollReveal className="ph-head">
        <span className="ph-kicker">Checked, not claimed</span>
        <h2 className="ph-h2" data-ab>We tested it against <em>the textbook.</em></h2>
        <p className="ph-p">Thirty-three classic experiments — Snell, Fresnel, Brewster, the critical angle, the thick-lens equation, prism dispersion, achromats, Malus&apos;s law, wave plates, gratings, telescopes — each run through Photonica and compared to its closed-form answer. Every number and every method is published.</p>
      </ScrollReveal>
      <ScrollReveal className="ph-proof ph-glass">
        <div><b>33/33</b><span>closed-form checks passed</span></div>
        <div><b>0.02%</b><span>median relative error</span></div>
        <div><b>5</b><span>fields: interfaces, lenses, dispersion, polarisation, waves</span></div>
        <div><b>0</b><span>results hidden or rounded away</span></div>
      </ScrollReveal>
      <p style={{ marginTop: 26 }}><a className="ph-link" href={validation} target="_blank">Read the full validation report ↗</a></p>
    </section>

    <section className="ph-sec" style={{ paddingTop: 30 }}>
      <ScrollReveal className="ph-honest ph-glass">
        <span className="big">DXR</span>
        <div>
          <span className="ph-kicker">The honest bit</span>
          <h2>The only thing we won&apos;t fake is your GPU.</h2>
          <p className="ph-p" style={{ maxWidth: 680 }}>Photonica ray traces every photon in real time, so it needs a DirectX Raytracing 1.1 graphics card — NVIDIA RTX 20-series or newer, AMD RX 6000-series or newer, or Intel Arc. Most laptops without a dedicated GPU can&apos;t run it yet. We&apos;d rather tell you that plainly than ship something that fakes the light to get around it.</p>
        </div>
      </ScrollReveal>
    </section>

    <section className="ph-final">
      <span className="ph-kicker">Photonica {VERSION}</span>
      <h2 className="ph-h2" data-ab>Step into <em>the lab.</em></h2>
      <p className="ph-lede" style={{ textAlign: 'center' }}>Unzip, run, open a demo. Seventeen experiments are waiting, and the docs will take you from your first beam to your first lens design.</p>
      <div className="ph-cta">
        <a className="ph-btn" href={download}>Download for Windows <small>1.4 MB</small></a>
        <Link className="ph-btn ghost" href="/photonica/docs">Documentation</Link>
        <a className="ph-btn ghost" href={github} target="_blank">GitHub</a>
      </div>
    </section>

    <footer className="ph-foot">
      <span>Photonica is built independently by Chaitanya Saxena.</span>
      <div><Link href="/">chaii.wtf</Link><Link href="/photonica/docs">Docs</Link><a href={validation} target="_blank">Validation</a><a href={github} target="_blank">GitHub</a></div>
    </footer>
  </main>;
}

function Spark({ c }: { c: string }) {
  return <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true"><path d="M10 1.5 11.8 8.2 18.5 10 11.8 11.8 10 18.5 8.2 11.8 1.5 10 8.2 8.2Z" fill={c} style={{ filter: `drop-shadow(0 0 6px ${c})` }} /></svg>;
}

function Feature({ kicker, title, body, points, img, alt, float, flip, tall }: {
  kicker: string; title: React.ReactNode; body: string; points: string[]; img: string; alt: string;
  float: { at: 'tl' | 'br'; b: string; s: string }; flip?: boolean; tall?: boolean;
}) {
  return <section className={`ph-feat${flip ? ' flip' : ''}`}>
    <ScrollReveal className="ph-feat-text">
      <span className="ph-kicker">{kicker}</span>
      <h2 className="ph-h2" data-ab>{title}</h2>
      <p className="ph-p">{body}</p>
      <ul className="ph-list">{points.map((p) => <li key={p}>{p}</li>)}</ul>
    </ScrollReveal>
    <div className={`ph-media${tall ? ' tall' : ''}`}>
      <div className="main ph-glass" data-parallax="0.05"><Image src={img} alt={alt} width={1600} height={tall ? 2840 : 880} sizes="(max-width: 960px) 100vw, 640px" /></div>
      <div className={`float ${float.at} ph-glass`} data-parallax="0.1"><b>{float.b}</b><span>{float.s}</span></div>
    </div>
  </section>;
}
