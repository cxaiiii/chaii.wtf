import Link from 'next/link';
import { Call, D, Eq, Fig, K, Table } from './ui';
import type { Doc } from './types';

export const USING: Doc[] = [
  {
    slug: 'parts', group: 'Using the bench', title: 'Parts reference',
    summary: 'Every optical component, what it does, and the fields that control it.',
    body: () => <>
      <p className="lead">Everything in the <b>Add optics</b> list, with its defaults. Parts are placed on the beam where there is room, and you can move, rotate and duplicate any of them.</p>

      <h2 id="lenses">Lenses</h2>
      <Table head={['Part', 'Defaults', 'Key fields']} rows={[
        [<b>Convex lens</b>, 'R 100 / −100, t 8 mm, ⌀40', 'R1, R2, centre thickness, diameter, conic, aspheric terms'],
        [<b>Concave lens</b>, 'R −100 / 100, t 3 mm, ⌀40', 'Same; gives a virtual focus'],
        [<b>Plano-convex</b>, 'R 60 / flat, t 8 mm, ⌀40', 'R2 = 0 means a flat face'],
        [<b>Custom lens</b>, 'R 80 / 200, t 7 mm, ⌀40', 'A meniscus — both surfaces curve the same way'],
        [<b>Cylindrical lens</b>, 'R 60 / flat, t 6, 40 × 30 mm', 'Cylinder axis: 0 focuses in the table plane, 1 vertically'],
      ]} />
      <p>A radius of <b>0 means flat</b>. Positive R puts the centre of curvature downstream (toward +x). Selecting a lens shows its paraxial focal length for red, green and blue right in the panel.</p>

      <h3>Aspheric surfaces</h3>
      <p>Each surface takes a <b>conic constant</b> k and polynomial terms A4–A10. k = 0 is a sphere, −1 a paraboloid, below −1 a hyperboloid. Setting k = −n² on the curved face of a plano-convex lens removes spherical aberration completely — the panel offers this as <b>Perfect focus</b>.</p>

      <h2 id="glass">Solid glass</h2>
      <Table head={['Part', 'Defaults', 'Notes']} rows={[
        [<b>Glass slab</b>, '20 × 50 × 50 mm', 'Parallel faces: shifts a beam sideways without changing its direction'],
        [<b>Prism</b>, '60° apex, 40 mm sides, flint glass', 'Apex angle, side, height. The classic dispersion demonstration'],
        [<b>Water block</b>, '80 × 50 × 50 mm, water', 'A tank — refraction and dispersion in a liquid'],
        [<b>Ball lens</b>, 'radius 15 mm', 'A sphere; strong spherical aberration and a tight caustic'],
        [<b>Brilliant gem</b>, 'radius 12 mm, diamond', 'A cut brilliant: total internal reflection and fire'],
      ]} />

      <h2 id="mirrors">Mirrors, apertures and splitters</h2>
      <Table head={['Part', 'Defaults', 'Notes']} rows={[
        [<b>Mirror</b>, '⌀40, 95% reflective, yaw 45°', 'Reflectivity is a straight fraction of the power'],
        [<b>Beam splitter</b>, '⌀40, 50% , yaw 45°', 'Splits the path in two; both arms are traced'],
        [<b>Iris</b>, '2 × 60 × 60 mm plate, 10 mm hole', 'Stops down a beam; also the aperture for wave-mode diffraction'],
        [<b>Slit mask</b>, '2 slits, 0.05 mm wide, 0.25 mm apart', 'Slits, slit width a, spacing d, slit height'],
      ]} />

      <h2 id="pol">Polarisation and diffraction</h2>
      <Table head={['Part', 'Defaults', 'Notes']} rows={[
        [<b>Polarizer</b>, '⌀30, axis 0°', <>Transmission axis measured <b>from vertical</b> — see <Link href={D('polarisation')}>polarisation</Link></>],
        [<b>Waveplate</b>, '⌀30, axis 45°, 0.25 waves', 'Retardance in waves: 0.25 = quarter-wave, 0.5 = half-wave'],
        [<b>Diffraction grating</b>, '600 lines/mm, phase depth 1.84, order 1', 'Transmission or reflective; choose which order the measurements follow'],
      ]} />

      <h2 id="screens">Screens</h2>
      <p>A screen catches light and becomes a detector. You can have up to <b>four</b>. Each has a position, rotation, width and height; the receiving face is the one light travels into. The Measure panel reports on whichever screen is selected, or the last one you touched.</p>

      <Call kind="try">
        <p>Select any part and press <K>Del</K> to remove it, or use <b>Duplicate</b> in the Build panel to copy it in place — handy for building a two-lens system where both elements start identical.</p>
      </Call>
    </>,
  },
  {
    slug: 'light-sources', group: 'Using the bench', title: 'The light source',
    summary: 'Lasers, area sources and point sources — spectrum, power, polarisation and beam shape.',
    body: () => <>
      <p className="lead">Every bench has exactly one source. Everything downstream depends on how you set it up, so it is worth knowing all of it.</p>

      <h2 id="type">Type</h2>
      <Table head={['Type', 'Emits', 'Use for']} rows={[
        [<b>Laser</b>, 'A perfectly collimated beam of a set width', 'Almost everything — lenses, prisms, interference'],
        [<b>Area</b>, 'A collimated beam from a finite-sized emitter', 'Extended sources, softer illumination'],
        [<b>Point</b>, 'A diverging cone of a set half-angle', 'Imaging, projection, anything where light spreads from a point'],
      ]} />

      <h2 id="spectrum">Spectrum and wavelength</h2>
      <p><b>Mono</b> traces one wavelength you pick; <b>RGB</b> traces 640, 532 and 450 nm; <b>White</b> traces 24 wavelengths across the visible band. More wavelengths cost more compute but give real dispersion.</p>

      <Call kind="warn" title="Choose mono for precise measurements">
        <p>Some readouts — the afocal width ratio, output ray spread and beam deviation — are traced at the source&apos;s own wavelength when the spectrum is mono, and at 532 nm otherwise. If you are checking a design at a specific wavelength, set the source to mono at that wavelength so every number refers to it.</p>
      </Call>

      <h2 id="beam">Beam shape</h2>
      <Table head={['Field', 'Means']} rows={[
        ['Beam width', 'Diameter of the collimated beam, in mm (laser and area)'],
        ['Cone half-angle', 'How fast a point source diverges, in degrees'],
        ['Beam lines', 'How many rays are drawn across the beam. More lines means a smoother-looking fan; it does not change the physics'],
      ]} />

      <h2 id="power">Power and brightness</h2>
      <p><b>Power</b> in mW is the physical quantity: it sets what the detector reports in milliwatts and W/cm². <b>Brightness</b> only affects how bright the beam looks on screen. Changing brightness never changes a measurement.</p>

      <h2 id="pol">Polarisation</h2>
      <p>Unpolarised, linear (with an angle measured <b>from horizontal</b>), or right/left circular. Rolling the source with <K>V</K> / <K>B</K> rotates its linear polarisation with it, exactly as turning a real laser on its mount would.</p>

      <h2 id="place">Placing it</h2>
      <p>The source starts at x = 0, beam height y = 100 mm, firing along +x. Move and rotate it like any other part — pitch it up with <K>R</K> and the whole experiment tilts with it, because new parts and auto-placed screens follow the beam.</p>
    </>,
  },
  {
    slug: 'measurement', group: 'Using the bench', title: 'Measurement & detectors',
    summary: 'Every number in the Measure panel and what it physically means.',
    body: () => <>
      <p className="lead">This is the panel that makes Photonica an instrument rather than a picture. Every row is a real measurement of the bench as it stands.</p>

      <h2 id="focus">Focus</h2>
      <Table head={['Row', 'Means']} rows={[
        ['Beam angle', 'How far the main beam has been deviated from the direction it started in'],
        ['Focal distance', 'Distance from the last lens to best focus for the whole spectrum'],
        ['Red / green / blue focus', 'The same, at 640, 532 and 450 nm. The grey number beside it is the paraxial prediction'],
        ['Best-focus spot', 'RMS radius of the smallest spot the system can form, in mm'],
        ['RGB separation', 'A visual bar showing how far apart the three colours focus'],
        ['Blue − red focus', 'Longitudinal chromatic aberration, in mm. Negative means blue focuses closer'],
      ]} />
      <p>A focus marked <b>virtual</b> is behind the optics — a diverging system, where the light only appears to come from that point.</p>

      <h2 id="screen">On the screen</h2>
      <Table head={['Row', 'Means']} rows={[
        ['Screen distance', 'From the last lens to the screen face'],
        ['Green spot', 'RMS spot radius at 532 nm where the light lands'],
        ['Spot (all colours)', 'The same including every wavelength — bigger, because colour spreads it'],
        ['R−B lateral', 'Sideways colour separation on the screen (lateral chromatic aberration)'],
      ]} />

      <h2 id="detector">Detector</h2>
      <p>Below that, the screen is treated as a real photodetector. These numbers come from a Monte-Carlo run of 200,000 photons following every reflection branch, so they include ghosts, splitter arms and losses.</p>
      <Table head={['Row', 'Means']} rows={[
        ['Power', 'Milliwatts actually landing on the screen'],
        ['Peak irradiance', 'W/cm² at the brightest point'],
        ['FWHM u × v', 'Width of the spot at half its peak, in two directions'],
        ['Spot RMS', 'Root-mean-square radius of the energy distribution'],
        ['Centroid', 'Where the middle of the light actually is on the screen'],
        ['Spectral peak', 'The strongest wavelength arriving, or "broadband"'],
        ['Pulse arrival', 'Mean time of flight in picoseconds, with the earliest arrival and the spread'],
        ['Blue − red delay', 'How much later one colour arrives than the other, from dispersion'],
        ['Polarisation', 'Degree of polarisation and the Stokes vector'],
      ]} />

      <Call kind="warn" title="If the detector rows vanish">
        <p>The detector needs at least 50 photons to land before it reports anything. Crossed polarisers, a closed iris or a beam that misses the screen will make it disappear entirely — which is itself the correct answer: no light arrived.</p>
      </Call>

      <h2 id="mc">All light paths</h2>
      <p>The Monte-Carlo section breaks the arriving light down by how many bounces it took — direct, one bounce, two, three or more. It is the honest accounting of where the light in your system actually goes.</p>
      <p>For gems there is a second readout: <b>light return</b> within 30° of the source direction, which is the &quot;face-up brightness&quot; gem graders measure, plus how much escapes out the back.</p>

      <h2 id="auto">Autofocus and export</h2>
      <ul>
        <li><b>AUTO FOCUS: screen</b> (or <K>F</K>) slides the measured screen to best focus.</li>
        <li><b>AUTO FOCUS: lens</b> moves the selected lens instead, to make the smallest spot on a fixed screen.</li>
        <li><b>Copy raw data</b> (Ctrl + Shift + C) puts the entire report on your clipboard as JSON — every property, measurement and traced ray path. Paste it into a notebook or hand it to an assistant.</li>
      </ul>
    </>,
  },
  {
    slug: 'materials', group: 'Using the bench', title: 'Glass & materials',
    summary: 'Built-in glasses, Zemax catalogues, coloured filters, temperature and coatings.',
    body: () => <>
      <p className="lead">A material in Photonica is a dispersion curve, not a colour. That is what makes the measurements mean anything.</p>

      <h2 id="presets">Built-in materials</h2>
      <p>Eighteen presets ship with the app, each with real published dispersion data:</p>
      <Table head={['Group', 'Materials']} rows={[
        ['Common glass', 'BK7, Crown Glass, Flint Glass, Dense Flint SF11, Fused Silica'],
        ['Crystals & exotics', 'Fluorite CaF₂, Sapphire, Diamond, Moissanite, Cubic Zirconia, Rutile'],
        ['Everyday', 'Water, Ice, Acrylic, Air'],
        ['Coloured filters', 'Ruby, Emerald, Cobalt blue — absorbing glass that passes a band'],
      ]} />
      <p>Select a part and the Build panel shows its index at 532 nm, its Abbe number, and n at 450 and 640 nm — enough to judge a glass at a glance.</p>

      <h2 id="agf">Loading a real catalogue</h2>
      <p><b>Load AGF…</b> imports any Zemax glass catalogue (<code>.agf</code>) — the same files Schott, Ohara and Hoya publish. Every glass in it becomes selectable with its exact Sellmeier or Schott coefficients. A sample catalogue sits in the <code>catalogs</code> folder next to the executable.</p>

      <h2 id="custom">Custom material fields</h2>
      <Table head={['Field', 'Means']} rows={[
        ['IOR (nd)', 'Index at the 587.6 nm d line'],
        ['Dispersion', 'n_F − n_C, the spread between 486 and 656 nm. Abbe number = (nd−1)/dispersion'],
        ['Absorption', 'Per-mm loss inside the glass — how dark a thick piece gets'],
        ['Roughness', 'Surface scatter; 0 is optically polished'],
        ['Transmission', 'A flat transmission factor per surface'],
        ['Filter centre / width', 'Coloured glass: absorption is suppressed in a band around this wavelength'],
      ]} />

      <h2 id="temp">Temperature</h2>
      <p>Glasses with thermal data carried in their catalogue respond to the <b>Temperature</b> field via dn/dT: the index shifts, and so does your focus. If a glass has no thermal data the panel says so plainly rather than pretending.</p>

      <h2 id="coatings">Coatings</h2>
      <p>Any part can carry a thin-film coating on all its surfaces. Pick a preset — single-layer MgF₂ AR, broadband AR, a dielectric high-reflector, a dichroic — or build a custom stack layer by layer, air side first, choosing each layer&apos;s index and thickness in nanometres. The panel then shows the resulting reflectance at 450, 550 and 650 nm.</p>

      <Call kind="eng">
        <p>Coatings are computed as a proper multilayer, so the wavelength and angle dependence is real: tilt a dichroic and watch its cut-off shift, exactly as it does on a bench.</p>
      </Call>
    </>,
  },
  {
    slug: 'ray-inspector', group: 'Using the bench', title: 'The ray inspector',
    summary: 'Follow one ray, surface by surface: angles, Fresnel splits, path length, timing and polarisation.',
    body: () => <>
      <p className="lead">When a measurement surprises you, this is how you find out why. The inspector follows a single ray through the whole bench and lists everything that happens to it.</p>

      <h2 id="open">Opening it</h2>
      <p><b>Ctrl + click</b> any beam in the viewport — including a faint ghost reflection — and the inspector opens on that exact path. Or open it from <b>View → Ray inspector</b> and choose a beam line and wavelength by hand.</p>

      <h2 id="branches">Branches</h2>
      <p>Light splits. A beam splitter creates two paths, total internal reflection folds one back, a grating sends orders in different directions. Each of those is a <b>branch</b>, listed with the share of the original power it carries and where it ends up — a screen, out of the scene, or absorbed.</p>
      <p>Turn on <b>ghost reflections</b> to include the faint Fresnel reflections that bounce between surfaces. These are the ghosts that show up as flare in real photographs.</p>

      <h2 id="events">The event table</h2>
      <Table head={['Column', 'Means']} rows={[
        ['At', 'Which part, and what happened: refract, TIR, mirror, split, polariser, wave plate, grating, screen'],
        ['n in / n out', 'Refractive index before and after — the exact numbers Snell was applied with'],
        ['Incidence / exit', 'Angles to the surface normal, in degrees'],
        ['R / T', 'The Fresnel split at that surface, as percentages'],
        ['Segment', 'Geometric length of the leg that ended here, and its optical path (n × length)'],
        ['Power', 'Fraction of the launch power still left'],
        ['Time', 'Arrival time at this event, in picoseconds since leaving the source'],
        ['Polarisation', 'The Stokes vector after the event'],
      ]} />

      <Call kind="warn" title="Angles are measured from the local surface normal">
        <p>On a curved surface hit off-axis, that normal is tilted relative to the optical axis. So an exit angle of 3.3° on a lens is 3.3° <em>from that point&apos;s normal</em>, not from the axis. For flat surfaces the two coincide; for lenses they do not.</p>
      </Call>

      <p>At the top of each branch you also get its total optical path, geometric length and time of flight — the fastest way to compare two arms of an interferometer.</p>
    </>,
  },
  {
    slug: 'photo-mode', group: 'Using the bench', title: 'Photoreal mode',
    summary: 'Turn the bench into a spectral path-traced photograph: caustics, haze, bloom and depth of field.',
    body: () => <>
      <p className="lead">Press <K>P</K>. The same physics, rendered as a photograph instead of a diagram — caustics where the light piles up, glow where it passes through haze, and colour that comes from wavelengths rather than paint.</p>

      <Fig src="/images/photonica/dsotm.jpg" alt="A photoreal render of white light dispersing through a prism" caption="Photo mode accumulates samples over time: leave it still and it keeps cleaning itself up." />

      <h2 id="settings">The Photo panel</h2>
      <Table head={['Setting', 'Does']} rows={[
        ['Exposure', 'Overall image brightness, like a camera'],
        ['Haze', <>Scattering density of the air: makes the beams visible. Also dims and softens a beam with distance, the way real haze does — see <Link href={D('faq')}>the note on haze</Link></>],
        ['Laser power', 'Display gain for the beams themselves (not the physical mW)'],
        ['Key light', 'The hard light that casts shadows across the table'],
        ['Studio lights', 'Soft ambient fill'],
        ['Bloom', 'Glow around the brightest highlights'],
        ['Aperture / Focus distance', 'Camera depth of field — open the aperture to throw the background out of focus'],
        ['Screen exposure', 'Brightness of the pattern on the screens alone'],
        ['Beam glow / Beam lines', 'Whether the schematic ray lines are drawn on top'],
        ['Photons / frame, Caustic photons', 'How much light is traced per frame. Higher is cleaner and slower'],
        ['Denoise', 'Smooths the remaining noise while the image converges'],
      ]} />

      <h2 id="converge">Converging</h2>
      <p>Photo mode accumulates: every frame adds more light paths, and the status bar tells you how many million photons have landed and whether the screen has converged. Stop moving the camera and the picture cleans itself up. Moving anything starts the accumulation again.</p>

      <Call kind="try">
        <p><b>Demos → Diamond fire</b> and <b>Dark Side of the Moon</b> are both tuned for photo mode. Open one, press <K>P</K>, and leave it alone for ten seconds.</p>
      </Call>
    </>,
  },
  {
    slug: 'video', group: 'Using the bench', title: 'Rendering video',
    summary: 'Camera keyframes, formats from reel to 4K, burned-in stats, and mp4 export.',
    body: () => <>
      <p className="lead">The Render panel turns a bench into a film: set camera keys along a timeline, choose a shape, and render straight to mp4.</p>

      <Fig src="/images/photonica/render.jpg" alt="Photonica's render timeline with keyframes and format options" caption="The yellow frame in the viewport is exactly what will be rendered." />

      <h2 id="keys">Camera keys</h2>
      <ol>
        <li>Frame a shot in the viewport — the yellow guide shows the crop for your chosen format.</li>
        <li>Move the playhead, frame a different shot, and press <K>K</K> (or <b>Add key here</b>).</li>
        <li>Repeat. The camera interpolates smoothly between keys, with optional <b>ease in/out</b> at the ends.</li>
      </ol>
      <p>With no keys at all, the render is simply the current view for the whole duration. <b>Orbit…</b> replaces the keys with a circular move around the current view — the quickest way to get a presentable clip.</p>
      <p>Keys can also carry the <b>light-in-flight clock</b> and the <b>wavelength</b>, so a pulse can cross the bench or the colour can sweep across the spectrum while the camera moves.</p>

      <h2 id="formats">Formats</h2>
      <Table head={['Format', 'Pixels']} rows={[
        ['Horizontal 16:9', '1920 × 1080'],
        ['Reel 9:16', '1080 × 1920 — phone-shaped, for social'],
        ['Square 1:1', '1080 × 1080'],
        ['Portrait 4:5', '1080 × 1350'],
        ['Cinema 21:9', 'Ultra-wide'],
        ['4K 16:9', '3840 × 2160'],
        ['Custom', 'Any width × height you type'],
      ]} />

      <h2 id="quality">Quality</h2>
      <p><b>Samples per frame</b> is how many passes are accumulated before each frame is written. In photo mode, 32–256 looks clean; in the fast view, 1–8 is plenty. <b>fps</b>, <b>duration</b> and the H.264 quality (CRF) are all set here too.</p>

      <h2 id="overlay">Burned-in overlay</h2>
      <p>Optionally the video can carry:</p>
      <ul>
        <li><b>Stats</b> — the light-in-flight time, the slow-down factor, and the apparent speed of light on screen. Position and text size are yours.</li>
        <li><b>Watermark</b> — the Photonica mark in a corner, at a size you set.</li>
      </ul>

      <Call kind="note" title="mp4 needs ffmpeg">
        <p>If <code>ffmpeg</code> is on your PATH, Photonica pipes frames straight into H.264 and writes an mp4. Without it, you get numbered image frames in the output folder instead — still usable, just an extra step. Install it with <code>winget install Gyan.FFmpeg</code>.</p>
      </Call>
      <p>Press <K>Esc</K> to cancel a render in progress. Rendering resizes the internal buffer to the output resolution, so the preview will look different while it runs.</p>
    </>,
  },
];
