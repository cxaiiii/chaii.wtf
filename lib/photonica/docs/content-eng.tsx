import Link from 'next/link';
import { Call, D, Eq, Fig, K, Table } from './ui';
import { COMMUNITY, VALIDATION } from '../site';
import type { Doc } from './types';

export const ENG: Doc[] = [
  {
    slug: 'lens-design', group: 'Engineering', title: 'Lens design & the optimiser',
    summary: 'Damped least squares: pick what can change, state what you want, and let it solve.',
    body: () => <>
      <p className="lead">Designing a lens is choosing surfaces that satisfy several demands at once. Photonica does it the way commercial design codes do: a merit function, and damped least squares to minimise it.</p>

      <Fig src="/images/photonica/design.jpg" alt="The Optimise and tolerance panel mid-design" caption="Demo 16, 'Design an achromat': three operands, five variables, converged in seven iterations." />

      <h2 id="how">How it works</h2>
      <p>You give the optimiser two lists. <b>Variables</b> are the things it may change. <b>Operands</b> are the things you want to be true. Every operand contributes <code>weight × (value − target)</code> to the merit function; spot-size operands add one residual per traced ray. The solver then walks downhill until it cannot improve further.</p>

      <h3>Variables</h3>
      <Table head={['Variable', 'Changes']} rows={[
        ['curv1 / curv2', 'The curvature (1/R) of the front or back surface. Bounded so the surface still covers the aperture'],
        ['thickness', 'Centre thickness, keeping the front vertex fixed'],
        ['axial', 'Position along the part’s own optical axis'],
        ['conic1 / conic2', 'Conic constant of a surface — how aspheric it is'],
        ['a4_1 / a4_2', 'The fourth-order aspheric term'],
        ['tilt / pitch', 'Yaw and pitch of the element'],
        ['screen_axial', 'Where the screen sits — the classic refocus compensator'],
      ]} />

      <h3>Operands</h3>
      <Table head={['Operand', 'Targets']} rows={[
        ['spot_screen', 'RMS spot size on a screen. Target 0 for the sharpest possible image'],
        ['spot_best_focus', 'RMS spot at the system’s own best focus, ignoring where the screen is'],
        ['efl', 'Effective focal length in mm'],
        ['collimation', 'Spread of the outgoing ray angles — target 0 for a perfectly parallel output'],
        ['width_ratio', 'Output beam width ÷ input width, for beam expanders'],
        ['beam_deviation', 'How far the beam has been turned, in degrees'],
        ['chromatic_focus', 'Blue-minus-red focal shift. Target 0 to make an achromat'],
      ]} />

      <h2 id="workflow">A worked example</h2>
      <p>To build an achromatic doublet — a lens with a chosen focal length and no first-order colour error:</p>
      <ol>
        <li>Put a positive crown-glass lens and a negative flint-glass lens close together on the beam.</li>
        <li>Add variables: <code>curv1</code> and <code>curv2</code> on both elements.</li>
        <li>Add operands: <code>efl</code> with your target focal length, <code>chromatic_focus</code> targeting 0, and <code>spot_best_focus</code> targeting 0 to keep it sharp.</li>
        <li>Give the focal length a low weight (0.05 is enough — it is easy to hit) and the others 1.</li>
        <li>Press <b>OPTIMISE</b>.</li>
      </ol>
      <p>The merit log shows the value falling per iteration. Demo 16 does exactly this and improves the merit by a factor of 1320 in seven iterations. <b>Undo</b> puts the design back if you do not like where it went.</p>

      <Call kind="eng" title="Rays and wavelengths">
        <p><b>rays</b> sets how many pupil samples each wavelength gets — a Vogel spiral across the aperture, so more rays means a better estimate of the true spot. A white-light source optimises at the F, d and C lines (486 / 588 / 656 nm); a mono source optimises at its own wavelength.</p>
      </Call>

      <Call kind="warn" title="Physically impossible designs">
        <p>The optimiser checks whether elements intersect each other. A design where two lenses interpenetrate is unbuildable, and it is scored as a failure rather than quietly accepted.</p>
      </Call>
    </>,
  },
  {
    slug: 'tolerancing', group: 'Engineering', title: 'Tolerancing & yield',
    summary: 'A perfect design is useless if it cannot be manufactured. Monte-Carlo says how many will work.',
    body: () => <>
      <p className="lead">Every real lens is ground slightly wrong. Tolerancing asks the only question that matters commercially: if you build a hundred of these, how many meet spec?</p>

      <h2 id="tols">Setting tolerances</h2>
      <p>Each part gets five manufacturing tolerances. <b>Set tolerances on every part</b> fills in a sensible starting set:</p>
      <Table head={['Tolerance', 'Represents']} rows={[
        ['radius %', 'How far a ground radius may stray from nominal'],
        ['thickness mm', 'Centre thickness error'],
        ['decenter mm', 'The element sitting off-axis in its mount'],
        ['tilt deg', 'The element tipped in its mount'],
        ['axial mm', 'Spacing error along the beam'],
      ]} />

      <h2 id="run">Running the analysis</h2>
      <Table head={['Setting', 'Means']} rows={[
        ['criterion', 'Which operand decides pass or fail — usually RMS spot on the screen'],
        ['refocus', 'Judge every perturbed build at its own best focus, as if the screen were refocused during assembly. This is the standard compensator and it matters enormously'],
        ['trials', 'How many random builds to simulate (300 by default)'],
        ['Uniform / Gaussian', 'Errors spread evenly within ±tol, or normally with sigma = tol/2 clipped at ±tol'],
        ['spec', 'The value a build must beat to count as good'],
      ]} />

      <h2 id="read">Reading the result</h2>
      <ul>
        <li><b>Nominal</b> — the criterion for the perfect design.</li>
        <li><b>RSS estimate</b> — the quick root-sum-square prediction from the sensitivity table.</li>
        <li><b>Monte-Carlo mean and sigma</b> — what actually happened across the trials.</li>
        <li><b>Percentiles</b> — &quot;50% of builds ≤ x, 90% ≤ y, 98% ≤ z&quot;. This is the honest picture of your production run.</li>
        <li><b>Yield</b> — the share of builds that beat your spec.</li>
        <li><b>Unbuildable builds</b> — perturbations that made parts collide, and builds where the beam was lost entirely. Both count as failures, because both are.</li>
      </ul>

      <h2 id="offenders">Worst offenders</h2>
      <p>The sensitivity table lists every tolerance item with how much the criterion changes at +tol and −tol. Sort by that and you know exactly which surface to specify more tightly — and, just as usefully, which ones you can loosen to save money.</p>

      <Call kind="eng">
        <p>A design that looks better on paper but tolerances worse is a worse design. Run tolerancing before you celebrate an optimisation result; the two views often disagree.</p>
      </Call>
    </>,
  },
  {
    slug: 'zemax-import', group: 'Engineering', title: 'Importing .zmx lenses',
    summary: 'Bring a real lens prescription in from Zemax — what maps across and what does not.',
    body: () => <>
      <p className="lead"><b>File → Import .zmx lens…</b> reads a Zemax prescription file and builds it on the bench, with a screen placed on the image surface.</p>

      <h2 id="supported">What comes across</h2>
      <Table head={['Zemax', 'Becomes']} rows={[
        ['STANDARD surfaces', 'Spherical or conic surfaces, with CURV and CONI'],
        ['EVENASPH surfaces', 'Aspheric terms (ρ⁴ … ρ¹⁰). The ρ² term is not used and is reported'],
        ['DISZ', 'Spacing between surfaces'],
        ['DIAM', 'Aperture. Missing diameters default to 25.4 mm and are logged'],
        ['GLAS', 'Matched to a built-in glass, to a loaded catalogue, or approximated from the nd/Vd on the line'],
        ['Units', 'Converted to millimetres automatically'],
      ]} />

      <h2 id="limits">What does not</h2>
      <ul>
        <li><b>Mirror surfaces</b> are skipped — the importer builds refractive elements only.</li>
        <li><b>Cemented doublets</b> are modelled with a 10 µm air gap between the elements rather than a true cement layer.</li>
        <li>Surface types other than STANDARD and EVENASPH are imported as STANDARD, and you are told which.</li>
        <li>An unknown glass with no nd/Vd on its line falls back to BK7, and says so.</li>
      </ul>
      <p>Every substitution and assumption appears in an import log, so you always know what was interpreted rather than read.</p>

      <Call kind="eng" title="Get the dispersion exact">
        <p>If your prescription uses a catalogue glass, load that catalogue&apos;s <code>.agf</code> first (<Link href={D('materials')}>materials → Load AGF</Link>). The importer will then use the manufacturer&apos;s real coefficients instead of approximating from nd and Vd — which matters as soon as you care about chromatic performance.</p>
      </Call>
      <p>Two demos — <b>Achromat</b> and <b>Asphere</b> — are built from the sample <code>.zmx</code> files in the <code>samples</code> folder, so you can see what a clean import looks like.</p>
    </>,
  },
  {
    slug: 'projects', group: 'Engineering', title: 'Projects & community',
    summary: 'The .photonica file format, saving, sharing, and opening someone else’s bench.',
    body: () => <>
      <p className="lead">A bench is a file. It is plain JSON, it is small, and it opens on anyone else&apos;s machine exactly as you left it.</p>

      <h2 id="format">The .photonica file</h2>
      <p>One JSON document holding the source, every part with all of its fields, the screens, the camera, the view settings, the design setup and the render timeline. It is readable, diffable, and safe: <b>nothing in a project file executes</b>. It is data describing optics, not a script.</p>
      <p>Saving puts the file in <code>Documents\Photonica</code> by default. You can also drag a <code>.photonica</code> file straight onto the window to open it.</p>

      <h2 id="links">Opening from a link</h2>
      <p><b>File → Open from link…</b> takes an https URL to a project file and loads it directly — handy for sharing a bench in a message or a lesson plan.</p>

      <h2 id="community">Community</h2>
      <p><b>Community → Browse</b> lists the benches people have shared and opens any of them in one click. <b>Community → Share this bench</b> saves your project, shows it in Explorer, and opens the upload page on GitHub, where you drag the file in and propose it. A free GitHub account is enough — GitHub raises the pull request for you.</p>
      <p>The collection lives <a href={COMMUNITY} target="_blank">in the public repository</a>, so you can also browse it in a web browser.</p>

      <Call kind="try">
        <p>Give your bench a title, author and description under <b>File → Project info</b> before sharing. Those fields are what appear in the community list.</p>
      </Call>
    </>,
  },
  {
    slug: 'mcp', group: 'Engineering', title: 'Assistant control (MCP)',
    summary: 'Let an AI drive the bench: setup, the 28 tools, conventions and gotchas.',
    body: () => <>
      <p className="lead">Photonica ships an <a href="https://modelcontextprotocol.io" target="_blank">MCP</a> server, so an AI assistant can build benches, take measurements, run the optimiser and look at the result — on the copy of Photonica running in front of you.</p>

      <h2 id="setup">Setup</h2>
      <p>Point your assistant at <code>photonica-mcp.exe</code> from the unzipped folder.</p>
      <pre><code>{`# Claude Code
claude mcp add photonica -- "C:\\path\\to\\Photonica\\photonica-mcp.exe"`}</code></pre>
      <pre><code>{`// Claude Desktop — claude_desktop_config.json
"mcpServers": {
  "photonica": { "command": "C:\\\\path\\\\to\\\\Photonica\\\\photonica-mcp.exe" }
}`}</code></pre>
      <p>The bridge talks to a Photonica window that is already open, and starts one if it is not. Set <code>PHOTONICA_EXE</code> to point at a particular build if you keep more than one.</p>

      <Call kind="note" title="It is local, and you can switch it off">
        <p>The connection is a named pipe on your own machine, owner-only, with remote clients rejected — nothing is reachable from the network. The status bar shows when an assistant is connected, and <b>View → Allow assistant control</b> turns it off at any moment.</p>
      </Call>

      <h2 id="conventions">Conventions an assistant needs</h2>
      <ul>
        <li>Millimetres and degrees throughout. The source is at x = 0 firing along +x, the beam height is y = 100, z is sideways.</li>
        <li>A part&apos;s optical axis is its local +x. <code>yaw_deg</code> turns about vertical, <code>pitch_deg</code> tips the axis up, <code>roll_deg</code> spins it.</li>
        <li><code>R1</code>/<code>R2</code>: 0 is flat, positive means the centre of curvature lies toward +x.</li>
        <li>Focus distances are reported from the last lens&apos;s own position.</li>
      </ul>

      <h2 id="tools">The tools</h2>
      <Table head={['Tool', 'Does']} rows={[
        [<code>get_state</code>, 'The whole bench plus current measurements. Call it first, and after changes'],
        [<code>measure</code>, 'Just the numbers: focus per colour, spots, chromatic shift, detector'],
        [<code>get_report</code>, 'The full raw JSON report including traced ray paths and Monte-Carlo statistics'],
        [<code>load_demo</code>, 'Open one of the 17 demos by index or name'],
        [<code>new_bench</code>, 'Start empty'],
        [<code>add_part</code>, 'Add a lens, prism, mirror, polariser, grating… and set any of its fields'],
        [<><code>update_part</code> + <code>remove_part</code></>, 'Change or delete a part by index'],
        [<code>add_screen</code>, <><code>update_screen</code>, <code>remove_screen</code> — up to four screens</>],
        [<code>update_source</code>, 'Type, spectrum, wavelength, beam width, power, polarisation, placement'],
        [<><code>set_camera</code> / <code>set_view</code></>, 'Frame the viewport; toggle photo mode, haze, exposure, wave screens, panels'],
        [<code>light_in_flight</code>, 'Freeze or play the pulse, and choose what the screens show'],
        [<code>inspect_ray</code>, 'One ray, surface by surface: angles, Fresnel R/T, timing, Stokes vector'],
        [<code>autofocus</code>, 'Move the screen (or a lens) to best focus'],
        [<code>optimize</code>, 'Run damped least squares with your variables and operands'],
        [<code>tolerance</code>, 'Monte-Carlo tolerancing with yield and worst offenders'],
        [<code>screenshot</code>, 'Look at the bench — returns an image'],
        [<code>render_video</code>, 'Render the timeline to mp4'],
        [<><code>add_key</code> / <code>clear_keys</code></>, 'Camera keyframes'],
        [<><code>save_project</code> / <code>open_project</code> / <code>set_bench</code></>, 'Files and whole-bench replacement'],
        [<><code>undo</code> / <code>redo</code></>, 'Step the assistant’s own edits back and forward'],
      ]} />

      <h2 id="gotchas">Gotchas worth knowing</h2>
      <ul>
        <li><b>Angle conventions differ by element.</b> A source&apos;s <code>polarisation_deg</code> is from horizontal; a polariser&apos;s or wave plate&apos;s <code>axis_deg</code> is from vertical.</li>
        <li><b><code>inspect_ray</code> angles are relative to the local surface normal</b>, which tilts on a curved surface. Do not read an exit angle as an angle to the optical axis.</li>
        <li><b>The detector block disappears when almost no light lands</b> (fewer than 50 photons). That is the correct answer for crossed polarisers, not a bug.</li>
        <li><b>Posts are solid.</b> A part lifted high above the beam will be blocked by its own mounting post.</li>
      </ul>

      <Call kind="try" title="Try asking for this">
        <p>&quot;Build a Keplerian telescope with a 500 mm objective and a 50 mm eyepiece, find the spacing that collimates the output, then check the angular magnification against −f₁/f₂.&quot; That is a real exercise from <a href={VALIDATION} target="_blank">the validation suite</a>, and the assistant can do the whole thing itself.</p>
      </Call>
    </>,
  },
  {
    slug: 'validation', group: 'Engineering', title: 'Validation',
    summary: 'Thirty-three closed-form checks, the method behind them, and where the numbers live.',
    body: () => <>
      <p className="lead">&quot;Physically accurate&quot; is easy to claim. Photonica was checked against textbook optics, experiment by experiment, and the whole run is published.</p>

      <h2 id="method">The method</h2>
      <p>Every test is driven through the same <Link href={D('mcp')}>MCP interface</Link> an assistant uses: build a bench, read the measurements back, and compare against an independently computed reference. Where a reference needs a refractive index, it is computed from the exact Sellmeier coefficients Photonica itself reports for that glass — so the test checks the ray tracing and the measurement geometry, not whether two implementations agree about what BK7 is.</p>
      <p>Tolerances are set per test and published with the results. Anything outside tolerance is reported as a failure, not rounded away.</p>

      <h2 id="covered">What was covered</h2>
      <Table head={['Area', 'Checks']} rows={[
        ['Interfaces', "Snell's law at four angles, Fresnel reflectance at normal and 40°, Brewster's angle, the critical angle for TIR, the law of reflection at three angles"],
        ['Lenses', 'Thin and thick biconvex, plano-convex, biconcave, and a two-lens system against the system-matrix back focal length'],
        ['Dispersion', 'Prism minimum deviation, the thin-prism approximation, angular dispersion between the C and F lines, longitudinal chromatic aberration, an achromatic doublet'],
        ['Polarisation', "Malus's law at six angles, a quarter-wave plate producing circular light, a half-wave plate rotating linear light"],
        ['Diffraction & systems', 'The grating equation at two orders, Keplerian telescope magnification, the spherical-aberration cube law'],
      ]} />

      <h2 id="results">The result</h2>
      <p><b>33 of 33 passed</b>, with a median relative error of about 0.02%. Snell&apos;s law lands within 0.02°, Fresnel reflectance within 0.003%, the critical angle within 0.03°, chromatic aberration within 0.008%, and the telescope&apos;s magnification within 0.33%.</p>
      <p>Two bugs surfaced during the work — both in the test harness, not the application: the two angle conventions described above, and the local-normal reference for curved-surface angles. One further check, a numerical-aperture measurement, was withdrawn rather than published with a reference that could not be pinned down. All of that is written up in the report.</p>

      <p><a className="ph-btn" href={VALIDATION} target="_blank">Read the full validation report ↗</a></p>
    </>,
  },
  {
    slug: 'faq', group: 'Engineering', title: 'FAQ & troubleshooting',
    summary: 'Common questions, common surprises, and what to do about them.',
    body: () => <>
      <h2 id="running">It will not run</h2>
      <p><b>&quot;No GPU with DXR 1.1 found.&quot;</b> The graphics card cannot ray trace. If the machine has both integrated and discrete graphics, force Photonica onto the discrete one in Windows&apos; <b>Graphics settings</b>.</p>
      <p><b>A <code>CreateComputePipelineState … 0x8007000E</code> error.</b> The GPU is out of memory — close other 3D applications, or other copies of Photonica, and restart.</p>
      <p><b>SmartScreen warns about the download.</b> The build is not code-signed yet. <b>More info → Run anyway</b>, or check the file against the release page if you prefer.</p>

      <h2 id="measure">The numbers look wrong</h2>
      <p><b>Focus rows show &quot;–&quot; or &quot;collimated&quot;.</b> The beam is parallel on the way out, so there is no focus to report. That is an answer, not an error.</p>
      <p><b>The detector section is missing.</b> Fewer than 50 photons reached the screen. Check that the beam actually lands on it, that an iris is not closed, and that polarisers are not crossed.</p>
      <p><b>Measurements changed when I switched to white light.</b> Several readouts trace at the source&apos;s own wavelength when the spectrum is mono, and at 532 nm otherwise. For a measurement at a specific wavelength, use a mono source.</p>
      <p><b>A tilted part blocks its own beam.</b> Posts are solid geometry. Lift a part well above the beam height and its mounting post will get in the way — which is also true on a real bench.</p>

      <h2 id="looks">The render looks wrong</h2>
      <p><b>The beams are invisible.</b> Raise <b>Haze</b> in the Photo panel — with no particles in the air there is nothing to scatter light toward the camera, exactly as in a clean room.</p>
      <p><b>Beams fade out over distance.</b> They should. Haze both scatters light toward you and removes it from the beam, so a beam dims and softens as it travels — that is Beer–Lambert extinction, not a rendering fault.</p>
      <p><b>The image is noisy.</b> Photo mode accumulates. Stop moving the camera and it cleans up; raise photons per frame for a faster convergence.</p>

      <h2 id="general">General</h2>
      <p><b>Is it free?</b> Yes, and there is no account.</p>
      <p><b>Mac or Linux?</b> Not yet. The renderer is built directly on DirectX 12 ray tracing.</p>
      <p><b>Can I use it in teaching?</b> Please do. Share benches as <code>.photonica</code> files or through <Link href={D('projects')}>the community collection</Link>.</p>
      <p><b>How do I report a bug?</b> Open an issue on <a href="https://github.com/cxaiiii/photonica/issues" target="_blank">GitHub</a>. Attaching the JSON report (Ctrl + Shift + C) makes it reproducible immediately.</p>
    </>,
  },
];
