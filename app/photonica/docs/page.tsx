import type { Metadata } from 'next';
import Link from 'next/link';

const release = 'https://github.com/cxaiiii/photonica/releases/latest';
const directDownload = 'https://github.com/cxaiiii/photonica/releases/download/v0.2.4/Photonica-v0.2.4-win64.zip';
const validation = 'https://github.com/cxaiiii/photonica/blob/main/docs/validation/README.md';
const source = 'https://github.com/cxaiiii/photonica';

export const metadata: Metadata = {
  title: 'Photonica — Docs',
  description: 'Install Photonica, learn the controls, and drive it from an AI assistant over MCP.',
  alternates: { canonical: '/photonica/docs' },
};

const keys: [string, string][] = [
  ['LMB drag', 'move the selected part'],
  ['Shift + drag', 'move along the beam'],
  ['Gizmo arrows / rings', 'move or rotate — G / W toggle them, L switches global / local'],
  ['Q / E', 'yaw · R / T pitch · V / B roll (hold Shift for 0.1°/1 mm steps)'],
  ['Ctrl + click a beam', 'inspect that ray, surface by surface'],
  ['RMB drag', 'orbit the view · MMB drag pans · wheel zooms'],
  ['F', 'autofocus the measured screen'],
  ['Z', 'frame the whole bench'],
  ['P', 'toggle photoreal rendering'],
  ['Ctrl + Z / Ctrl + Y', 'undo / redo'],
  ['Ctrl + S', 'save the bench'],
  ['Del', 'remove the selected part'],
];

const demos = [
  'Chromatic focus', 'Prism', 'Prism and lens', 'Dark Side of the Moon', 'Diamond fire',
  'Rainbow in a drop', "Newton's prisms", 'Ball-lens caustic', 'Beam splitter kit',
  'Achromat (.zmx import)', 'Asphere (.zmx import)', 'Double slit', 'Three polarisers',
  'Grating spectrometer', 'Light in flight', 'Optimise a singlet', 'Design an achromat',
];

const tools: [string, string][] = [
  ['get_state / measure', 'the whole bench, or just the numbers: focus, spots, chromatic shift, detector power'],
  ['add_part / update_part / remove_part', 'lenses, prisms, mirrors, polarisers, gratings — position, curvature, glass, tilt'],
  ['add_screen / update_screen / update_source', 'screens and the light source: type, spectrum, polarisation, beam shape'],
  ['inspect_ray', 'trace one beam line surface by surface — angles, Fresnel R/T, arrival time, the Stokes vector'],
  ['autofocus / optimize / tolerance', 'move a screen or lens to best focus, run the damped least-squares optimiser, run Monte-Carlo tolerancing'],
  ['light_in_flight', 'freeze or play the travelling pulse, and choose what the screens show'],
  ['set_camera / screenshot / render_video', 'frame the viewport, grab a still, or render the timeline to mp4'],
  ['save_project / open_project / undo / redo', 'the usual — plus an assistant can undo its own edits'],
];

export default function PhotonicaDocs() {
  return <main className="p-page">
    <nav className="p-nav">
      <Link className="wordmark" href="/"><i />CHAI.TXT</Link>
      <div><Link href="/photonica">Photonica</Link><a href={validation} target="_blank">Validation ↗</a><a className="pill photon" href={release} target="_blank">Download ↗</a></div>
    </nav>

    <section className="p-doc-hero">
      <p className="kicker">Photonica / docs</p>
      <h1>Get it running,<br />then take it apart.</h1>
      <p>Everything here is the actual manual — install, the controls, every built-in demo, and how an AI assistant drives the bench over MCP.</p>
    </section>

    <section className="p-doc" id="install">
      <p className="kicker">01 / Install</p>
      <h2>Unzip and run.</h2>
      <p>Windows 10 or 11, 64-bit, and a GPU with DirectX Raytracing 1.1 — an RTX-class NVIDIA card, AMD RX 6000-series or newer, or Intel Arc. No installer, no account. Unzip the download and run <code>Photonica.exe</code>. Start from the <b>Demos</b> menu.</p>
      <p>Video export uses <a href="https://ffmpeg.org" target="_blank">ffmpeg</a> if it&apos;s on your PATH (<code>winget install Gyan.FFmpeg</code>); without it, renders come out as image frames instead of an mp4.</p>
      <a className="button photon-btn" href={directDownload}>Download for Windows · 1.4 MB ↓</a>
    </section>

    <section className="p-doc" id="controls">
      <p className="kicker">02 / Controls</p>
      <h2>The bench responds<br />to your hands.</h2>
      <div className="p-doc-table">
        {keys.map(([k, d]) => <div key={k}><code>{k}</code><span>{d}</span></div>)}
      </div>
    </section>

    <section className="p-doc" id="demos">
      <p className="kicker">03 / Demos</p>
      <h2>Seventeen benches, already built.</h2>
      <p>Every demo is a real, working bench — dispersion, diffraction, polarisation, lens design, a Zemax import, a full achromat design walk-through. Open one from the <b>Demos</b> menu and start dragging parts.</p>
      <div className="p-doc-chips">{demos.map((d) => <span key={d}>{d}</span>)}</div>
    </section>

    <section className="p-doc" id="mcp">
      <p className="kicker">04 / Assistant control (MCP)</p>
      <h2>Let an AI<br />hold the tweezers.</h2>
      <p>Photonica ships <code>photonica-mcp.exe</code>, an <a href="https://modelcontextprotocol.io" target="_blank">MCP</a> server that drives the open app — the same interface the <a href={validation} target="_blank">validation suite</a> used to run all 33 checks. It builds benches, reads measurements, traces rays, optimises and tolerances lenses, takes screenshots, and renders video.</p>
      <pre className="p-doc-code">{`# Claude Code
claude mcp add photonica -- "<folder>\\photonica-mcp.exe"`}</pre>
      <pre className="p-doc-code">{`// Claude Desktop — claude_desktop_config.json
"mcpServers": {
  "photonica": { "command": "<folder>\\\\photonica-mcp.exe" }
}`}</pre>
      <p>It works on the bench that&apos;s already open — starting Photonica if it isn&apos;t running — and it&apos;s local to your machine. Switch it off any time under <b>View → Allow assistant control</b>.</p>
      <div className="p-doc-table p-doc-tools">
        {tools.map(([k, d]) => <div key={k}><code>{k}</code><span>{d}</span></div>)}
      </div>
    </section>

    <section className="p-doc" id="community">
      <p className="kicker">05 / Community</p>
      <h2>Share a bench,<br />open one back.</h2>
      <p>A <code>.photonica</code> file is a plain JSON project — parts, glasses, camera, timeline, all of it. <b>Community → Share this bench</b> uploads yours; <b>Community → Browse</b> opens what other people have shared, straight into the app.</p>
    </section>

    <section className="p-get">
      <p className="kicker">Get Photonica</p>
      <h2>Choose your path.</h2>
      <div>
        <a className="button photon-btn" href={directDownload}>Windows · 1.4 MB ↓</a>
        <a className="button p-get-alt" href={validation} target="_blank">Validation report ↗</a>
        <a className="text-link" href={source} target="_blank">GitHub ↗</a>
      </div>
    </section>
  </main>;
}
