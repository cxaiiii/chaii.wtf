import Link from 'next/link';
import DraggableOrbit from '@/components/draggable-orbit';
import WritingNotes from '@/components/writing-notes';
import ScrollReveal from '@/components/scroll-reveal';

const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ? `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}` : undefined;
const notepadDownload = 'https://github.com/cxaiiii/notepadai/releases/latest/download/NotepadAI-1.0.0-win-x64.exe';

export default function Home() {
  return <main>
    <nav><Link className="wordmark" href="/"><i />CHAI.TXT</Link><div><Link href="/vasudha">Vasudha</Link><a href="https://medium.com/@cxaiiii" target="_blank">Notes ↗</a><a href="https://github.com/cxaiiii" target="_blank">GitHub ↗</a>{whatsapp ? <a className="pill" href={whatsapp} target="_blank">WhatsApp ↗</a> : <a className="pill" href="mailto:hello@chaii.wtf">Start a conversation ↗</a>}</div></nav>
    <section className="hero">
      <p className="kicker hero-intro">Creative technologist · Bareilly, India</p>
      <h1 className="hero-title">Making ideas<br /><em>useful in the real world.</em></h1>
      <p className="lede hero-lede">Chaitanya Saxena is a product builder working across design, software, AI, and hardware. Meaning should survive the network; intelligence should survive without one.</p>
      <a className="button hero-action" href="#work">Selected work <span>↓</span></a><DraggableOrbit />
    </section>
    <section className="work" id="work"><ScrollReveal><p className="kicker">01 / Selected work</p><h2>Useful, weird,<br />technically inconvenient.</h2></ScrollReveal><ScrollReveal className="reveal-delay"><div className="project-grid">
      <Link className="project vasudha" href="/vasudha"><small>01 / Local AI · now available</small><h3>Vasudha</h3><p>A 4B offline engineering assistant that computes answers instead of guessing them.</p><span>Explore the project ↗</span></Link>
      <a className="project notepad" href={notepadDownload}><small>02 / Desktop tool · Windows download</small><h3>NotepadAI</h3><p>AI editing where it belongs: directly inside the selected text, with a real terminal below.</p><span>Download for Windows ↓</span></a>
      <Link className="project photonica" href="/photonica"><small>03 / GPU optics bench · Windows download</small><h3>Photonica</h3><p>A spectral optics bench, ray traced on the GPU — checked against 33 closed-form results.</p><span>Explore the project ↗</span></Link>
      <article className="project"><small>04 / ML systems · 0.8B param · multimodal · offline</small><h3>Parag</h3><p>A research-to-product experiment in semantic compression and client-side chat models.</p><span>Coming soon</span></article>
      <article className="project"><small>05 / Edge systems</small><h3>Sanketa</h3><p>Semantic and lossless compression toward a physical off-grid mesh messenger.</p><span>Research in progress</span></article>
    </div></ScrollReveal></section>
    <section className="statement"><ScrollReveal><p className="kicker">How I work</p><h2>Build before you understand.<br />Let failure <mark>teach you what’s next.</mark></h2><p>You learn by building, not by waiting for complete understanding. Each failure is information: it points to the next thing worth learning. Perfection usually comes from removal — knowing what’s enough, then leaving the rest out.</p></ScrollReveal></section>
    <WritingNotes /><footer><p>© 2026 Chaitanya Saxena</p><p>chaii.wtf</p><a href="https://github.com/cxaiiii" target="_blank">github.com/cxaiiii ↗</a></footer>
  </main>;
}
