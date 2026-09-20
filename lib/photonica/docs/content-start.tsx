import Link from 'next/link';
import { Call, Cards, D, Eq, Fig, K, Table } from './ui';
import { DOWNLOAD, VERSION } from '../site';
import type { Doc } from './types';

export const START: Doc[] = [
  {
    slug: 'introduction', group: 'Start here', title: 'What Photonica is',
    summary: 'A real optics laboratory on your GPU — what it simulates, who it is for, and how to read these docs.',
    body: () => <>
      <p className="lead">Photonica is a laboratory for light. You put a laser, some glass and a screen on a bench, and it works out what the light does — not an animation of what light roughly looks like, but the actual physics, computed for every ray, every wavelength and every surface, thirty times a second.</p>

      <h2 id="what">What it actually computes</h2>
      <p>Most optics software picks one model and stops there. Photonica carries several at once, because real light does:</p>
      <ul>
        <li><b>Rays with a wavelength.</b> A white beam is dozens of separate colours travelling together. Each one bends by its own amount in every glass, because the glass&apos;s refractive index genuinely depends on wavelength.</li>
        <li><b>Energy that adds up.</b> At every surface, Fresnel&apos;s equations decide how much light reflects and how much passes. Nothing is invented, and nothing disappears.</li>
        <li><b>Polarisation.</b> Light carries a full polarisation state through polarisers, wave plates and every reflection, so a quarter-wave plate really does turn linear light into circular light.</li>
        <li><b>Waves.</b> Where geometry stops being enough — slits, pinholes, gratings, the diffraction limit of a lens — Photonica sums Huygens wavelets instead of drawing rays.</li>
        <li><b>Time.</b> Every path carries an arrival time computed from the group index of whatever it travelled through. You can stop the clock and see where the light has got to.</li>
      </ul>

      <Call kind="note" title="How accurate is it?">
        <p>Thirty-three textbook experiments were run through Photonica and compared against their closed-form answers — Snell&apos;s law, Fresnel reflectance, Brewster&apos;s angle, the critical angle, the thick-lens equation, prism dispersion, achromatic doublets, Malus&apos;s law, wave plates, gratings, telescope magnification. All 33 passed, most to better than 0.1%. The method and every number are published in <Link href={D('validation')}>the validation summary</Link>.</p>
      </Call>

      <h2 id="who">Three ways in</h2>
      <p>These docs are written for three different people. Pick the door that fits.</p>
      <Cards items={[
        { href: D('first-experiment'), title: 'I just want to see something', text: 'Install, open a demo, and put your first lens in a beam. Fifteen minutes, no theory.' },
        { href: D('light-and-colour'), title: "I'm studying optics", text: 'Start with light and colour, then work through refraction, lenses, polarisation and diffraction. Every idea has a "try it" bench.' },
        { href: D('lens-design'), title: "I design optics", text: 'Jump to the optimiser, tolerancing and the Zemax importer. The MCP interface scripts the whole thing.' },
      ]} />

      <h2 id="not">What it is not</h2>
      <p>Photonica models sequential and non-sequential ray paths, coherent diffraction at apertures, and polarisation. It does not model nonlinear optics, fluorescence, quantum effects, or thermal lensing under load. Lens design here is real but young: it will happily optimise and tolerance a doublet, and it is not a replacement for a full production tolerance stack with vendor-specific manufacturing data.</p>

      <h2 id="next">Where to go next</h2>
      <Cards items={[
        { href: D('install'), title: 'Install', text: `Requirements, download and first run of ${VERSION}.` },
        { href: D('interface'), title: 'The interface', text: 'Every panel, menu and readout, explained once.' },
      ]} />
    </>,
  },
  {
    slug: 'install', group: 'Start here', title: 'Install & requirements',
    summary: 'What hardware Photonica needs, how to install it, and what to do if it will not start.',
    body: () => <>
      <p className="lead">Photonica is a single Windows application with no installer and no account. Unzip it, run it, and you are in the lab.</p>

      <h2 id="req">Requirements</h2>
      <Table head={['', 'Needs']} rows={[
        ['Operating system', 'Windows 10 or 11, 64-bit'],
        ['Graphics', <>A GPU with <b>DirectX Raytracing 1.1</b>: NVIDIA RTX 20-series or newer, AMD Radeon RX 6000-series or newer, or Intel Arc</>],
        ['Disk', 'About 4 MB unzipped'],
        ['Optional', <>{'ffmpeg on your PATH for mp4 export ('}<code>winget install Gyan.FFmpeg</code>{'). Without it, video renders are written as numbered image frames.'}</>],
      ]} />
      <p>That GPU requirement is real, not a recommendation: the whole simulation runs as inline ray tracing on the graphics card. A laptop with only integrated graphics from before Intel&apos;s Arc line will not be able to start it.</p>

      <h2 id="install">Install</h2>
      <ol>
        <li>Download <a href={DOWNLOAD}>Photonica-{VERSION}-win64.zip</a> (about 1.4 MB).</li>
        <li>Unzip it anywhere — your Desktop is fine. Keep the folder together: the <code>shaders</code>, <code>catalogs</code> and <code>samples</code> folders sit next to the executable and are needed.</li>
        <li>Run <code>Photonica.exe</code>.</li>
      </ol>
      <p>Windows may show a SmartScreen warning the first time, because the build is not code-signed yet. <b>More info → Run anyway</b> if you are happy to.</p>

      <h3>What is in the folder</h3>
      <Table head={['File', 'What it is']} rows={[
        [<code>Photonica.exe</code>, 'The application itself.'],
        [<code>photonica-mcp.exe</code>, <>The bridge that lets an AI assistant drive the app. See <Link href={D('mcp')}>assistant control</Link>.</>],
        [<code>shaders\\</code>, 'Compiled GPU shaders. The app will not start without them.'],
        [<code>catalogs\\</code>, <>A sample Zemax glass catalogue you can load from the material panel.</>],
        [<code>samples\\</code>, <>Sample <code>.zmx</code> lens prescriptions used by two of the demos.</>],
      ]} />

      <h2 id="first">First run</h2>
      <p>Photonica opens on an empty bench: a white laser at the left, a screen to the right, and a beam between them. The fastest way to see what it does is the <b>Demos</b> menu — seventeen finished experiments, from a single prism to a designed achromat.</p>

      <Call kind="warn" title="If it will not start">
        <ul>
          <li><b>&quot;No GPU with DXR 1.1 (inline ray tracing) found.&quot;</b> — the graphics card cannot run Photonica. If you have both integrated and discrete graphics, force Photonica onto the discrete GPU in Windows&apos; <b>Graphics settings</b>, then try again.</li>
          <li><b>&quot;Missing shader&quot;</b> — the <code>shaders</code> folder was left behind when unzipping. Unzip the whole archive again.</li>
          <li><b>A <code>CreateComputePipelineState … 0x8007000E</code> error</b> — the GPU ran out of memory. Close other heavy 3D applications (or other copies of Photonica) and restart.</li>
        </ul>
      </Call>
    </>,
  },
  {
    slug: 'first-experiment', group: 'Start here', title: 'Your first experiment',
    summary: 'Focus a beam, watch colours separate, then send white light through a prism — about fifteen minutes.',
    body: () => <>
      <p className="lead">Nothing here needs any theory. Follow along, and by the end you will have measured chromatic aberration — the reason cheap lenses have coloured edges — on a lens you placed yourself.</p>

      <h2 id="lens">1. Put a lens in the beam</h2>
      <ol>
        <li>Start Photonica. You have a white laser, a beam, and a screen.</li>
        <li>In the <b>Build</b> panel on the left, click <b>Convex lens</b>. It drops into the beam, and the beam immediately pinches together behind it.</li>
        <li>Drag the lens with the left mouse button. Watch the cone of light move with it.</li>
      </ol>
      <p>That pinch point is the focus. The lens is bending every ray towards the axis; they all cross at one place.</p>

      <h2 id="measure">2. Measure it</h2>
      <p>Click the <b>Measure</b> tab at the top right. This is the instrument panel — the same numbers an optics bench would give you:</p>
      <ul>
        <li><b>Focal distance</b> — how far behind the lens the light comes to its tightest point.</li>
        <li><b>Red / green / blue focus</b> — the same measurement, for three separate colours.</li>
        <li><b>Best-focus spot</b> — how small that point actually is, as an RMS radius in millimetres.</li>
      </ul>
      <p>Now press <K>F</K>, or click <b>AUTO FOCUS: screen</b>. The screen slides along the beam to sit exactly at best focus, and the spot on it collapses to a point.</p>

      <Call kind="try" title="The thing to notice">
        <p>Red, green and blue focus at <em>different distances</em>. Glass bends blue light more than red, so blue focuses closer to the lens. That difference is <b>chromatic aberration</b>, and the <b>Blue − red focus</b> row tells you exactly how big it is for your lens. Make the lens fatter (raise <b>R1</b> / lower <b>R2</b> in the Build panel) and watch the gap grow.</p>
      </Call>

      <h2 id="prism">3. Split white light</h2>
      <ol>
        <li>Press <K>Del</K> to remove the lens, then click <b>Prism</b> in the Build panel.</li>
        <li>Rotate it with <K>Q</K> and <K>E</K> until a spectrum fans out of the far side.</li>
        <li>Drag the screen into the fan to catch the rainbow.</li>
      </ol>
      <p>This is the same experiment Newton did in 1666, and the same physics as the cover of <i>The Dark Side of the Moon</i> — which is, in fact, demo 3.</p>

      <h2 id="photo">4. Make it beautiful</h2>
      <p>Press <K>P</K>. The bench switches to a spectral path tracer: caustics pool where the light concentrates, the beam glows through the haze in the air, and the image keeps refining while you leave it alone. Press <K>P</K> again to go back to the fast view.</p>

      <Call kind="try" title="Where to go from here">
        <p>Open <b>Demos → Light in flight</b> and press play to watch a pulse of light physically cross the bench, slowed down about two billion times. Then read <Link href={D('light-and-colour')}>light &amp; colour</Link> to understand what you have been looking at.</p>
      </Call>
    </>,
  },
  {
    slug: 'interface', group: 'Start here', title: 'The interface',
    summary: 'Menus, panels and the viewport — what every part of the window does.',
    body: () => <>
      <p className="lead">Photonica is one window: a 3D bench in the middle, panels you can toggle around it, and a menu bar across the top. Nothing is hidden more than one click deep.</p>

      <Fig src="/images/photonica/gizmo.png" alt="The Photonica window, with the Build panel on the left, Measurement on the right and a lens selected in the viewport" w={1942} h={1102}
        caption="The Build panel (left), Measurement (right), and a selected lens showing its move arrows and rotation rings." />

      <h2 id="menu">The menu bar</h2>
      <Table head={['Menu', 'What is in it']} rows={[
        ['File', 'New bench, open, save, save as, open from a link, import a .zmx lens, copy the raw JSON report.'],
        ['Edit', 'Undo and redo, with a count of what is queued.'],
        ['Demos', 'Seventeen ready-made experiments.'],
        ['View', 'Panel toggles, snap-to-beam, focus on selection, the ray inspector, the planet-scale light calculator, the help overlay, and the switch that allows assistant control.'],
        ['Community', 'Browse benches other people shared, or share your own.'],
        ['Help', 'About, and a link to chaii.wtf.'],
      ]} />

      <h2 id="panels">The panels</h2>
      <p>The tabs on the right of the menu bar switch panels on and off. Any combination can be open at once.</p>
      <Table head={['Panel', 'What it gives you']} rows={[
        [<b>Build</b>, <>Add optics, set the light source, and edit whatever is selected — geometry, glass, coating, rotation. See <Link href={D('parts')}>parts</Link>.</>],
        [<b>Measure</b>, <>The instrument readout: focus per colour, spot sizes, the detector, Monte-Carlo path statistics. See <Link href={D('measurement')}>measurement</Link>.</>],
        [<b>Experiment</b>, 'Five challenges to solve on the bench, with hints.'],
        [<b>Waves</b>, <>Wave mode for the screens, the diffraction limit (PSF, Strehl, MTF), light in flight, and the planet-scale calculator. See <Link href={D('waves')}>waves</Link> and <Link href={D('time-of-flight')}>time of flight</Link>.</>],
        [<b>Design</b>, <>The optimiser and tolerancing. See <Link href={D('lens-design')}>lens design</Link>.</>],
        [<b>Photo</b>, <>Photoreal rendering settings. See <Link href={D('photo-mode')}>photo mode</Link>.</>],
        [<b>Render</b>, <>The camera timeline and video export. See <Link href={D('video')}>rendering video</Link>.</>],
      ]} />

      <h2 id="viewport">The viewport</h2>
      <p>The bench is an optical table with a 25 mm hole grid, exactly like a real one. Parts stand on posts. The beam is drawn as a set of ray lines, one per <b>beam line</b>, coloured by wavelength.</p>
      <p>Select anything by clicking it. A selected part shows a <b>transform gizmo</b>: three arrows to slide it along an axis, and three rings to turn it. The small toolbar above the viewport toggles <b>Move</b> and <b>Rotate</b> handles and switches between <b>Global</b> and <b>Local</b> axes — local means along the part&apos;s own optical axis, which is usually what you want for moving a lens along the beam.</p>

      <h2 id="status">The status bar</h2>
      <p>Along the bottom: the project name, the frame rate, how many million photons per second the screens are collecting, and how far the current screen image has converged. When an assistant is connected over MCP, that is shown here too.</p>
    </>,
  },
  {
    slug: 'controls', group: 'Start here', title: 'Controls & shortcuts',
    summary: 'Every mouse action and keyboard shortcut in one place.',
    body: () => <>
      <p className="lead">Press <K>H</K> at any time for the same list as an overlay on the bench.</p>

      <h2 id="mouse">Mouse</h2>
      <Table head={['Action', 'Does']} rows={[
        ['Left-click', 'Select a part, screen or the light source'],
        ['Left-drag', 'Move the selected part across the table'],
        ['Shift + left-drag', 'Move it along the beam axis only'],
        ['Ctrl + left-click on a beam', 'Open that exact ray in the ray inspector'],
        ['Right-drag', 'Orbit the camera'],
        ['Middle-drag', 'Pan the camera'],
        ['Wheel', 'Zoom'],
        ['Ctrl + wheel', 'Rotate the selected part (yaw)'],
        ['Drag a gizmo arrow', 'Slide the part along X, Y or Z (or its own axes in Local mode)'],
        ['Drag a gizmo ring', 'Turn the part: green is yaw, blue is pitch, red is roll'],
        ['Ctrl while dragging a gizmo', 'Snap to 1 mm and 5°'],
      ]} />

      <h2 id="keys">Keyboard</h2>
      <Table head={['Key', 'Does']} rows={[
        [<><K>Q</K> / <K>E</K></>, 'Yaw the selection (hold Shift for 0.1° steps)'],
        [<><K>R</K> / <K>T</K></>, 'Pitch — tip the optical axis up or down'],
        [<><K>V</K> / <K>B</K></>, 'Roll — spin the part about its own axis'],
        [<K>G</K>, 'Show or hide the move arrows'],
        [<K>W</K>, 'Show or hide the rotation rings'],
        [<K>L</K>, 'Switch the gizmo between global and local axes'],
        [<K>F</K>, 'Autofocus: move the measured screen to best focus'],
        [<K>Z</K>, 'Frame the whole bench in view'],
        [<K>P</K>, 'Toggle photoreal rendering'],
        [<K>K</K>, 'Add a camera key at the playhead (Render panel)'],
        [<K>Space</K>, 'Play or pause the timeline'],
        [<K>Del</K>, 'Remove the selected part'],
        [<K>H</K>, 'Help overlay'],
        [<>Ctrl + <K>Z</K> / Ctrl + <K>Y</K></>, 'Undo / redo'],
        [<>Ctrl + <K>S</K></>, 'Save (Ctrl + Shift + S for Save as)'],
        [<>Ctrl + <K>O</K></>, 'Open a project'],
        [<>Ctrl + <K>N</K></>, 'New bench'],
        [<>Ctrl + Shift + <K>C</K></>, 'Copy the full JSON report to the clipboard'],
        [<K>Esc</K>, 'Cancel a render in progress'],
      ]} />

      <Call kind="note" title="Coordinates">
        <p>The bench uses millimetres. The light source sits at x = 0 shining along +x, the beam runs at a height of y = 100 mm, and z is sideways. A part&apos;s own optical axis is its local +x, so <b>yaw</b> turns it about the vertical, <b>pitch</b> tips that axis up, and <b>roll</b> spins it in place.</p>
      </Call>
      <Eq note="Positive R means the centre of curvature lies toward +x — the standard optics sign convention, with light travelling left to right.">R1 &gt; 0 : front surface bulges toward the light · R2 &lt; 0 : back surface bulges away</Eq>
    </>,
  },
];
