import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import ScrollReveal from '@/components/scroll-reveal';
import { KineticPhone, StyleTile } from '@/components/akshara/kinetic';
import { ANDROID, APP, APPLY, ISSUES, MAC, RELEASE, WIN } from '@/lib/akshara/site';

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

const SPARKS = Array.from({ length: 18 }, (_, i) => i);

export default function Akshara() {
  return <main>
    <nav className="ak-nav">
      <Link className="ak-brand" href="/akshara"><Image src="/images/akshara/logo.png" alt="" width={34} height={34} />Akshara<span className="ak-alpha">ALPHA</span></Link>
      <div>
        <a href="#styles">Styles</a>
        <a href="#3d">3D</a>
        <a href="#download">Download</a>
        <Link href="/">chaii.wtf</Link>
        <a className="ak-btn sm" href={APPLY}>Get early access</a>
      </div>
    </nav>

    <header className="ak-hero">
      <div className="ak-hero-text">
        <span className="ak-kicker">For creators who talk to camera</span>
        <h1 className="ak-h1">Captions that make people <em>stop scrolling.</em></h1>
        <p className="ak-lede">Drop in your video and watch every word you say come alive — popping, bouncing and glowing in perfect time with your voice. The look top creators pay editors for, done in minutes. In your language. On your phone, in your browser, or on your computer.</p>
        <div className="ak-cta">
          <a className="ak-btn" href={APPLY}>Get early access <small>Free · invite-only for now</small></a>
          <a className="ak-btn ghost" href="#download">Download <small>Android · Windows · Mac</small></a>
        </div>
        <span className="ak-req">Already in? <a href={APP}>Open Akshara in your browser →</a></span>
      </div>
      <KineticPhone />
    </header>

    <section className="ak-sec ak-steps">
      <ScrollReveal className="ak-grid3">
        <article><span className="ak-step">1</span><h3>Drop in your video</h3><p>Reels, Shorts, podcasts, vlogs — anything with someone talking.</p></article>
        <article><span className="ak-step">2</span><h3>Pick a style</h3><p>Every word is caught and timed for you. Tap a look and it&apos;s done.</p></article>
        <article><span className="ak-step">3</span><h3>Post it</h3><p>Export a ready-to-upload video for Instagram, YouTube or TikTok — straight to your gallery on your phone.</p></article>
      </ScrollReveal>
    </section>

    <section className="ak-sec" id="styles">
      <ScrollReveal className="ak-head">
        <span className="ak-kicker">18 styles, one tap each</span>
        <h2 className="ak-h2">The styles you see <em>everywhere.</em> Yours now.</h2>
        <p className="ak-p">From bold Hormozi-style captions to glowing neon and beat-synced text that pulses with your music. Each word lands exactly when you say it — and every look can be restyled down to a single word.</p>
      </ScrollReveal>
      <ScrollReveal className="ak-tiles">
        {STYLES.map(([name, kind]) => <StyleTile key={kind} name={name} kind={kind} />)}
      </ScrollReveal>
    </section>

    <section className="ak-sec ak-behind">
      <ScrollReveal className="ak-head">
        <span className="ak-kicker">The viral look</span>
        <h2 className="ak-h2">Put your title <em>behind</em> you.</h2>
        <p className="ak-p">That magazine-cover effect where the text sits behind the person? One tap. And not just people — tap any object in your video and it&apos;s cut out through the whole clip, so words can slip behind your coffee cup, your car or your cat. No masking, no hours in After Effects.</p>
      </ScrollReveal>
      <ScrollReveal className="ak-behind-art">
        <div className="ak-behind-frame" aria-hidden="true">
          <span className="ak-behind-word">BACK TO WORK</span>
          <svg viewBox="0 0 200 240" className="ak-person"><defs><linearGradient id="akp" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#2a2238" /><stop offset="1" stopColor="#15111d" /></linearGradient></defs><circle cx="100" cy="70" r="38" fill="url(#akp)" /><path d="M20 240c0-62 36-104 80-104s80 42 80 104z" fill="url(#akp)" /></svg>
        </div>
      </ScrollReveal>
    </section>

    <section className="ak-sec">
      <ScrollReveal className="ak-head">
        <span className="ak-kicker">Dubbing</span>
        <h2 className="ak-h2">Your video, <em>in Hindi.</em> Or Tamil. Or Bengali.</h2>
        <p className="ak-p">One tap and your video speaks another language — in a natural voice, or in your own. Your music stays underneath, the timing follows your video, and fresh captions match the new words. Reach a whole new audience without recording a single line again.</p>
      </ScrollReveal>
      <ScrollReveal className="ak-scripts ak-dub">
        {[['Hindi', 'हिन्दी', 'deva'], ['Tamil', 'தமிழ்', 'taml'], ['Bengali', 'বাংলা', 'beng'], ['Telugu', 'తెలుగు', ''], ['Marathi', 'मराठी', 'deva'], ['Gujarati', 'ગુજરાતી', ''], ['Kannada', 'ಕನ್ನಡ', ''], ['Malayalam', 'മലയാളം', '']].map(([name, word, font]) => <div key={name} className={`ak-script ${font}`}><b>{word}</b><span>{name}</span></div>)}
      </ScrollReveal>
      <p className="ak-fine">11 languages, a choice of voices or your own, and your first 10 minutes are free.</p>
    </section>

    <section className="ak-sec ak-behind">
      <ScrollReveal className="ak-head">
        <span className="ak-kicker">Sound design</span>
        <h2 className="ak-h2">Sound that <em>hits.</em></h2>
        <p className="ak-p">Whooshes as each line flies in, pops on the words that matter, a hit when your title lands — placed for you, in time with every word and every beat. Pick Clean, Punchy or Hype.</p>
      </ScrollReveal>
      <ScrollReveal className="ak-grid3 ak-sfx">
        <article><span className="ak-step">~</span><h3>Clean</h3><p>Soft, subtle, professional.</p></article>
        <article><span className="ak-step">!</span><h3>Punchy</h3><p>The classic creator edit.</p></article>
        <article><span className="ak-step">⚡</span><h3>Hype</h3><p>Everything, on the beat.</p></article>
      </ScrollReveal>
    </section>

    <section className="ak-sec ak-behind" id="3d">
      <ScrollReveal className="ak-head">
        <span className="ak-kicker">New · 3D on Windows &amp; Mac</span>
        <h2 className="ak-h2">Titles that live <em>in your scene.</em></h2>
        <p className="ak-p">Akshara follows how your camera moves, so a 3D title stays standing on the floor, stuck to the wall or sitting on the table as you walk past it. It picks up your video&apos;s light and colour, drops a real shadow, and finds the floors, walls and tables for you. Then have some fun: sparks that pour out of your words, a line that dissolves into dust, confetti that bounces off you.</p>
      </ScrollReveal>
      <ScrollReveal className="ak-3d-art">
        <div className="ak-3d-frame" aria-hidden="true">
          <div className="ak-3d-floor" />
          <span className="ak-3d-word">ON THE FLOOR</span>
          <span className="ak-3d-shadow">ON THE FLOOR</span>
          {SPARKS.map((i) => <i key={i} className="ak-spark" style={{ '--i': i } as React.CSSProperties} />)}
        </div>
      </ScrollReveal>
    </section>

    <section className="ak-sec">
      <ScrollReveal className="ak-grid3">
        <article><span className="ak-kicker">Stays put</span><h3>Pinned to the world.</h3><p>Walk, pan, zoom — your title stays exactly where you put it, like it was really there when you filmed.</p></article>
        <article><span className="ak-kicker">Looks real</span><h3>Film-quality light.</h3><p>Cinematic mode lights every frame with the same renderer Blender uses for films — reflections, soft shadows and all.</p></article>
        <article><span className="ak-kicker">Plays with you</span><h3>Words into particles.</h3><p>Let sparks fly off as each word appears, spell your title out of glitter, or rain confetti that bounces off your shoulders.</p></article>
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

    <section className="ak-sec ak-behind">
      <ScrollReveal className="ak-head">
        <span className="ak-kicker">New · Android app</span>
        <h2 className="ak-h2">Edit where you <em>shoot.</em></h2>
        <p className="ak-p">The whole caption editor on your phone: pick a clip from your gallery, get your captions, style them, cut yourself out, dub it, add the sound. The finished video lands in your gallery with a share button — straight to Instagram or WhatsApp.</p>
        <div className="ak-cta"><a className="ak-btn" href={ANDROID}>Get the Android app <small>Android 7 or newer · free early access</small></a></div>
      </ScrollReveal>
      <ScrollReveal className="ak-grid3 ak-phone-points">
        <article><span className="ak-step">1</span><h3>Your gallery in</h3><p>Pick any video on your phone.</p></article>
        <article><span className="ak-step">2</span><h3>Every tool</h3><p>Captions, looks, cut-outs, dubbing and sound.</p></article>
        <article><span className="ak-step">3</span><h3>Your gallery out</h3><p>Saved in Movies › Akshara, ready to post.</p></article>
      </ScrollReveal>
    </section>

    <section className="ak-sec">
      <ScrollReveal className="ak-grid3">
        <article><span className="ak-kicker">Fast</span><h3>Minutes, not hours.</h3><p>What used to take an afternoon of typing and timing is ready before your coffee cools.</p></article>
        <article><span className="ak-kicker">Private</span><h3>Your videos stay yours.</h3><p>Your video never leaves your device. On your phone and in the browser only the sound is sent, to write the captions; the desktop app writes them right on your computer. Dubbing sends the voice it&apos;s translating.</p></article>
        <article><span className="ak-kicker">Free for now</span><h3>Free in early access.</h3><p>Akshara is free while it&apos;s in early access, with 10 free minutes of dubbing. One account works on your phone, in the browser and on your computer.</p></article>
      </ScrollReveal>
    </section>

    <section className="ak-sec ak-download" id="download">
      <ScrollReveal className="ak-head">
        <span className="ak-kicker">Free early access</span>
        <h2 className="ak-h2">Be one of the <em>first.</em></h2>
        <p className="ak-p">Akshara is invite-only while we let creators in a few at a time. Ask for an invite, set your password, and sign in wherever you like — your phone, your browser or your computer.</p>
        <div className="ak-cta">
          <a className="ak-btn" href={APPLY}>Request an invite <small>Takes a minute</small></a>
          <a className="ak-btn ghost" href={APP}>Open in your browser <small>Chrome or Edge · nothing to install</small></a>
        </div>
      </ScrollReveal>
      <ScrollReveal className="ak-dl">
        <article>
          <h3>Android</h3>
          <p>Android 7 or newer. Open the file on your phone and tap <b>Install</b>. If your phone asks, allow installing apps from Chrome or Files — and if Play Protect doesn&apos;t know the app yet, tap <b>More details</b>, then <b>Install anyway</b>.</p>
          <a className="ak-btn" href={ANDROID}>Download for Android</a>
        </article>
        <article>
          <h3>Windows</h3>
          <p>Windows 10 or 11. If Windows shows a blue “protected your PC” screen, click <b>More info</b>, then <b>Run anyway</b> — that&apos;s normal for early-access apps. Includes the 3D tools.</p>
          <a className="ak-btn" href={WIN}>Download for Windows</a>
        </article>
        <article>
          <h3>Mac</h3>
          <p>Macs from 2020 onwards (M1 or newer). Drag Akshara into Applications and open it. If your Mac asks, go to <b>System Settings → Privacy &amp; Security</b> and click <b>Open Anyway</b>. Includes the 3D tools.</p>
          <a className="ak-btn" href={MAC}>Download for Mac</a>
        </article>
      </ScrollReveal>
      <p className="ak-fine">Early-access videos include a small “Made with Akshara” mark. Something not right? <a href={ISSUES}>Tell us</a>. <a href={RELEASE}>What&apos;s new</a>.</p>
    </section>

    <footer className="ak-foot"><span>Akshara · made by Chaii</span><Link href="/">chaii.wtf ↗</Link></footer>
  </main>;
}
