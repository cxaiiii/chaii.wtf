import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import ScrollReveal from '@/components/scroll-reveal';
import { KineticPhone, StyleTile } from '@/components/akshara/kinetic';
import { ISSUES, MAC, RELEASE, WIN } from '@/lib/akshara/site';

export const metadata: Metadata = {
  title: { absolute: 'Akshara — captions that make people stop scrolling' },
  alternates: { canonical: '/akshara' },
};

const STYLES: [string, string][] = [
  ['Hormozi', 'pop'], ['Karaoke', 'karaoke'], ['Typewriter', 'type'], ['Bounce', 'bounce'],
  ['Neon', 'neon'], ['Glitch', 'glitch'], ['Highlight Box', 'box'], ['Beat Pulse', 'pulse'],
];

const SCRIPTS: [string, string, string][] = [
  ['हिन्दी', 'Hindi', 'deva'], ['বাংলা', 'Bengali', 'beng'], ['தமிழ்', 'Tamil', 'taml'], ['العربية', 'Arabic', 'arab'],
  ['日本語', 'Japanese', ''], ['한국어', 'Korean', ''], ['ไทย', 'Thai', ''], ['English', 'English', 'lat'],
];

export default function Akshara() {
  return <main>
    <nav className="ak-nav">
      <Link className="ak-brand" href="/akshara"><Image src="/images/akshara/logo.png" alt="" width={34} height={34} />Akshara<span className="ak-alpha">ALPHA</span></Link>
      <div>
        <a href="#styles">Styles</a>
        <a href="#languages">Languages</a>
        <Link href="/">chaii.wtf</Link>
        <a className="ak-btn sm" href="#download">Get it free</a>
      </div>
    </nav>

    <header className="ak-hero">
      <div className="ak-hero-text">
        <span className="ak-kicker">For creators who talk to camera</span>
        <h1 className="ak-h1">Captions that make people <em>stop scrolling.</em></h1>
        <p className="ak-lede">Drop in your video and watch every word you say come alive — popping, bouncing and glowing in perfect time with your voice. The look top creators pay editors for, done in minutes. In your language.</p>
        <div className="ak-cta">
          <a className="ak-btn" href={WIN}>Download for Windows <small>Free during alpha</small></a>
          <a className="ak-btn ghost" href={MAC}>Download for Mac <small>Free during alpha</small></a>
        </div>
        <span className="ak-req">No account. No subscription. No editing skills needed.</span>
      </div>
      <KineticPhone />
    </header>

    <section className="ak-sec ak-steps">
      <ScrollReveal className="ak-grid3">
        <article><span className="ak-step">1</span><h3>Drop in your video</h3><p>Reels, Shorts, podcasts, vlogs — anything with someone talking.</p></article>
        <article><span className="ak-step">2</span><h3>Pick a style</h3><p>Every word is caught and timed for you. Tap a look and it&apos;s done.</p></article>
        <article><span className="ak-step">3</span><h3>Post it</h3><p>Export a ready-to-upload video for Instagram, YouTube or TikTok.</p></article>
      </ScrollReveal>
    </section>

    <section className="ak-sec" id="styles">
      <ScrollReveal className="ak-head">
        <span className="ak-kicker">18 styles, one tap each</span>
        <h2 className="ak-h2">The styles you see <em>everywhere.</em> Yours now.</h2>
        <p className="ak-p">From bold Hormozi-style captions to glowing neon and beat-synced text that pulses with your music. Each word lands exactly when you say it.</p>
      </ScrollReveal>
      <ScrollReveal className="ak-tiles">
        {STYLES.map(([name, kind]) => <StyleTile key={kind} name={name} kind={kind} />)}
      </ScrollReveal>
    </section>

    <section className="ak-sec ak-behind">
      <ScrollReveal className="ak-head">
        <span className="ak-kicker">The viral look</span>
        <h2 className="ak-h2">Put your title <em>behind</em> you.</h2>
        <p className="ak-p">That magazine-cover effect where the text sits behind the person? One click. No masking, no rotoscoping, no hours in After Effects.</p>
      </ScrollReveal>
      <ScrollReveal className="ak-behind-art">
        <div className="ak-behind-frame" aria-hidden="true">
          <span className="ak-behind-word">BACK TO WORK</span>
          <svg viewBox="0 0 200 240" className="ak-person"><defs><linearGradient id="akp" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#2a2238" /><stop offset="1" stopColor="#15111d" /></linearGradient></defs><circle cx="100" cy="70" r="38" fill="url(#akp)" /><path d="M20 240c0-62 36-104 80-104s80 42 80 104z" fill="url(#akp)" /></svg>
        </div>
      </ScrollReveal>
    </section>

    <section className="ak-sec" id="languages">
      <ScrollReveal className="ak-head">
        <span className="ak-kicker">99 languages</span>
        <h2 className="ak-h2">Speak <em>your</em> language. Look beautiful in it.</h2>
        <p className="ak-p">Most caption apps mangle Hindi, Tamil or Arabic. Akshara writes every language the way it&apos;s meant to be written — and even keeps Hinglish in one script.</p>
      </ScrollReveal>
      <ScrollReveal className="ak-scripts">
        {SCRIPTS.map(([word, name, font]) => <div key={name} className={`ak-script ${font}`}><b>{word}</b><span>{name}</span></div>)}
      </ScrollReveal>
    </section>

    <section className="ak-sec">
      <ScrollReveal className="ak-grid3">
        <article><span className="ak-kicker">Fast</span><h3>Minutes, not hours.</h3><p>What used to take an afternoon of typing and timing is ready before your coffee cools.</p></article>
        <article><span className="ak-kicker">Private</span><h3>Your videos stay yours.</h3><p>Akshara works on your own computer. Your videos never get uploaded anywhere.</p></article>
        <article><span className="ak-kicker">Yours to keep</span><h3>No subscription.</h3><p>No monthly fee, no account, no credits running out halfway through a project.</p></article>
      </ScrollReveal>
    </section>

    <section className="ak-sec ak-download" id="download">
      <ScrollReveal className="ak-head">
        <span className="ak-kicker">Free early access</span>
        <h2 className="ak-h2">Be one of the <em>first.</em></h2>
        <p className="ak-p">Akshara is in early access and free while it is. Try it on your next video, and tell us what would make it perfect.</p>
      </ScrollReveal>
      <ScrollReveal className="ak-dl">
        <article>
          <h3>Windows</h3>
          <p>Windows 10 or 11. If Windows shows a blue “protected your PC” screen, click <b>More info</b>, then <b>Run anyway</b> — that&apos;s normal for early-access apps.</p>
          <a className="ak-btn" href={WIN}>Download for Windows</a>
        </article>
        <article>
          <h3>Mac</h3>
          <p>Macs from 2020 onwards (M1 or newer). Drag Akshara into Applications and open it. If your Mac asks, go to <b>System Settings → Privacy &amp; Security</b> and click <b>Open Anyway</b>.</p>
          <a className="ak-btn" href={MAC}>Download for Mac</a>
        </article>
      </ScrollReveal>
      <p className="ak-fine">Early-access videos include a small “Made with Akshara” mark. Something not right? <a href={ISSUES}>Tell us</a>. <a href={RELEASE}>What&apos;s new</a>.</p>
    </section>

    <footer className="ak-foot"><span>Akshara · made by Chaii</span><Link href="/">chaii.wtf ↗</Link></footer>
  </main>;
}
