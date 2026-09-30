import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import ScrollReveal from '@/components/scroll-reveal';
import { KineticPhone, StyleTile } from '@/components/akshara/kinetic';
import { ISSUES, MAC, RELEASE, VERSION, WIN } from '@/lib/akshara/site';

export const metadata: Metadata = {
  title: { absolute: 'Akshara — kinetic captions for every script' },
  alternates: { canonical: '/akshara' },
};

const STYLES: [string, string][] = [
  ['Hormozi', 'pop'], ['Karaoke', 'karaoke'], ['Typewriter', 'type'], ['Bounce', 'bounce'],
  ['Neon', 'neon'], ['Glitch', 'glitch'], ['Highlight Box', 'box'], ['Beat Pulse', 'pulse'],
];

const SCRIPTS: [string, string, string][] = [
  ['हिन्दी', 'Devanagari', 'deva'], ['বাংলা', 'Bengali', 'beng'], ['தமிழ்', 'Tamil', 'taml'], ['العربية', 'Arabic', 'arab'],
  ['日本語', 'Japanese', ''], ['한국어', 'Korean', ''], ['ไทย', 'Thai', ''], ['English', 'Latin', 'lat'],
];

export default function Akshara() {
  return <main>
    <nav className="ak-nav">
      <Link className="ak-brand" href="/akshara"><Image src="/images/akshara/logo.png" alt="" width={34} height={34} />Akshara<span className="ak-alpha">ALPHA</span></Link>
      <div>
        <a href="#styles">Styles</a>
        <a href="#scripts">Scripts</a>
        <Link href="/">chaii.wtf</Link>
        <a className="ak-btn sm" href="#download">Download</a>
      </div>
    </nav>

    <header className="ak-hero">
      <div className="ak-hero-text">
        <span className="ak-kicker">Kinetic captions · free alpha</span>
        <h1 className="ak-h1">Every word<br />you say becomes <em>motion.</em></h1>
        <p className="ak-lede">Drop in a video. Akshara transcribes it word by word — in Hindi, Tamil, Arabic, Japanese, Bengali, English and 90-odd more — and turns the words into captions that pop, bounce and glow. It runs on your own computer, on your GPU.</p>
        <div className="ak-cta">
          <a className="ak-btn" href={WIN}>Download for Windows <small>190 MB</small></a>
          <a className="ak-btn ghost" href={MAC}>Download for Mac <small>Apple Silicon · 173 MB</small></a>
        </div>
        <span className="ak-req">v{VERSION} · Windows 10/11 · macOS 12+ on M1 or newer · free</span>
      </div>
      <KineticPhone />
    </header>

    <section className="ak-sec" id="styles">
      <ScrollReveal className="ak-head">
        <span className="ak-kicker">18 caption styles</span>
        <h2 className="ak-h2">Pick a look. <em>Every word</em> follows it.</h2>
        <p className="ak-p">Each style animates word by word, timed to the speech. Beat Pulse and Voice Pulse go further and move with the music and the speaker&apos;s voice.</p>
      </ScrollReveal>
      <ScrollReveal className="ak-tiles">
        {STYLES.map(([name, kind]) => <StyleTile key={kind} name={name} kind={kind} />)}
      </ScrollReveal>
    </section>

    <section className="ak-sec ak-behind">
      <ScrollReveal className="ak-head">
        <span className="ak-kicker">Text behind the subject</span>
        <h2 className="ak-h2">Put the title <em>behind</em> the person.</h2>
        <p className="ak-p">One click separates whoever is on screen from the background, and any text layer can sit between them — the look that usually takes a rotoscope pass in After Effects.</p>
      </ScrollReveal>
      <ScrollReveal className="ak-behind-art">
        <div className="ak-behind-frame" aria-hidden="true">
          <span className="ak-behind-word">BACK TO WORK</span>
          <svg viewBox="0 0 200 240" className="ak-person"><defs><linearGradient id="akp" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#2a2238" /><stop offset="1" stopColor="#15111d" /></linearGradient></defs><circle cx="100" cy="70" r="38" fill="url(#akp)" /><path d="M20 240c0-62 36-104 80-104s80 42 80 104z" fill="url(#akp)" /></svg>
        </div>
      </ScrollReveal>
    </section>

    <section className="ak-sec" id="scripts">
      <ScrollReveal className="ak-head">
        <span className="ak-kicker">Every script</span>
        <h2 className="ak-h2">Shaped properly. <em>Not boxes.</em></h2>
        <p className="ak-p">Conjuncts, matras, ligatures and right-to-left text render the way they should, with fonts built for each script. Transcription understands 99 languages, and code-switched speech like Hinglish stays in one script.</p>
      </ScrollReveal>
      <ScrollReveal className="ak-scripts">
        {SCRIPTS.map(([word, name, font]) => <div key={name} className={`ak-script ${font}`}><b>{word}</b><span>{name}</span></div>)}
      </ScrollReveal>
    </section>

    <section className="ak-sec">
      <ScrollReveal className="ak-grid3">
        <article><span className="ak-kicker">On your machine</span><h3>Your GPU does the work.</h3><p>Transcription runs on NVIDIA, AMD, Intel or Apple Silicon graphics, with a CPU fallback. Nothing is uploaded unless you choose the optional cloud extras.</p></article>
        <article><span className="ak-kicker">Export</span><h3>Burned in, or as an overlay.</h3><p>MP4 with hardware encoding, or a transparent ProRes 4444 / VP9 overlay for Premiere Pro, After Effects and DaVinci Resolve. Subtitles export to SRT, VTT and ASS.</p></article>
        <article><span className="ak-kicker">Offline</span><h3>No account. No upload.</h3><p>After the models download once, transcribing, styling and exporting all work without an internet connection.</p></article>
      </ScrollReveal>
    </section>

    <section className="ak-sec ak-download" id="download">
      <ScrollReveal className="ak-head">
        <span className="ak-kicker">Free alpha · v{VERSION}</span>
        <h2 className="ak-h2">Try it. <em>Break it.</em> Tell me.</h2>
      </ScrollReveal>
      <ScrollReveal className="ak-dl">
        <article>
          <h3>Windows</h3>
          <p>Windows 10 or 11, 64-bit. If SmartScreen says “Windows protected your PC”, click <b>More info → Run anyway</b> — alpha builds aren&apos;t signed with a trusted certificate yet.</p>
          <a className="ak-btn" href={WIN}>Download .exe <small>190 MB</small></a>
        </article>
        <article>
          <h3>macOS</h3>
          <p>macOS 12+ on Apple Silicon (M1 or newer). Drag to Applications and open once; on macOS 15, then click <b>Open Anyway</b> in System Settings → Privacy &amp; Security.</p>
          <a className="ak-btn" href={MAC}>Download .dmg <small>173 MB</small></a>
        </article>
      </ScrollReveal>
      <p className="ak-fine">The first run downloads the speech model (~550 MB). Free exports carry a small “Made with Akshara” mark. Found a bug? <a href={ISSUES}>Open an issue</a> with the log file. <a href={RELEASE}>Release notes</a>.</p>
    </section>

    <footer className="ak-foot"><span>Akshara · made by Chaii</span><Link href="/">chaii.wtf ↗</Link></footer>
  </main>;
}
