import Link from 'next/link';
import { Call, D, Eq, Fig, K, Table } from './ui';
import type { Doc } from './types';

export const LIGHT: Doc[] = [
  {
    slug: 'light-and-colour', group: 'Understanding light', title: 'Light & colour',
    summary: 'Wavelength, white light, and how Photonica represents colour — the foundation for everything else.',
    body: () => <>
      <p className="lead">Everything in Photonica starts from one idea: light is a wave, and its colour is its wavelength. Get comfortable with that and the rest of optics falls into place.</p>

      <h2 id="wavelength">Colour is a length</h2>
      <p>Visible light is an electromagnetic wave with a wavelength between roughly <b>380 nm</b> (violet) and <b>750 nm</b> (deep red). A nanometre is a millionth of a millimetre, so about two thousand waves of green light fit across a human hair.</p>
      <Table head={['Colour', 'Wavelength', 'Where you meet it']} rows={[
        ['Violet', '380–450 nm', 'The far edge of the rainbow; blacklights sit just beyond'],
        ['Blue', '450–495 nm', 'The sky; the 486 nm hydrogen F line used in lens design'],
        ['Green', '495–570 nm', 'Where your eye is most sensitive; 532 nm laser pointers'],
        ['Yellow', '570–590 nm', 'Sodium street lamps; the 587.6 nm d line, the reference for glass'],
        ['Orange / red', '590–750 nm', 'Sunsets; 632.8 nm helium-neon lasers; the 656 nm C line'],
      ]} />

      <Call kind="note" title="Those three letters — d, F and C">
        <p>Optics quotes glass properties at three specific wavelengths named after dark lines in the Sun&apos;s spectrum: <b>C</b> = 656.3 nm (red), <b>d</b> = 587.6 nm (yellow), <b>F</b> = 486.1 nm (blue). When you see &quot;n<sub>d</sub> = 1.5168&quot; for BK7, that is its refractive index at 587.6 nm. Photonica uses the same convention everywhere.</p>
      </Call>

      <h2 id="white">White is a mixture</h2>
      <p>White is not a wavelength — it is what your eye reports when many wavelengths arrive together. That is why a prism can &quot;split&quot; white light: there was never one colour there to begin with. The light source in Photonica offers three spectra:</p>
      <Table head={['Spectrum', 'What it traces', 'Use it for']} rows={[
        [<b>Mono</b>, 'A single wavelength you choose', 'Lasers, clean measurements, wave experiments'],
        [<b>RGB</b>, 'Three wavelengths: 640, 532 and 450 nm', 'Seeing colour separation quickly and cheaply'],
        [<b>White</b>, '24 wavelengths spread across the visible range', 'Rainbows, dispersion, photoreal renders'],
      ]} />

      <h2 id="drawn">How colour gets drawn</h2>
      <p>Each ray is traced at its own wavelength and then converted to a screen colour for display. A 532 nm ray is drawn green because 532 nm <em>looks</em> green, not because anything in the simulation is labelled &quot;green&quot;. When rays overlap, their light adds — which is why the middle of a dispersed fan goes white again where all the colours still coincide.</p>

      <Call kind="try">
        <p>Open the Build panel, set <b>Spectrum</b> to Mono, and drag the <b>Wavelength</b> slider from 400 to 700 nm. The beam changes colour, and — if a prism or lens is in the way — the bend angle changes with it. That changing bend is the subject of the <Link href={D('refraction')}>next page</Link>.</p>
      </Call>

      <h2 id="power">Brightness versus power</h2>
      <p>Two separate things control how light looks:</p>
      <ul>
        <li><b>Power</b> (mW) is physical. It sets what the detector reads in milliwatts and W/cm², and it is what you change if you care about the measurement.</li>
        <li><b>Brightness</b> and <b>Laser power</b> in the Photo panel are display gains. They change how bright the render looks and nothing else.</li>
      </ul>
    </>,
  },
  {
    slug: 'refraction', group: 'Understanding light', title: 'Refraction & dispersion',
    summary: "Snell's law, refractive index, why glass splits colours, and the Sellmeier equation behind it.",
    body: () => <>
      <p className="lead">Light slows down in glass. That single fact, plus a bit of geometry, explains lenses, prisms, rainbows and the sparkle of a diamond.</p>

      <h2 id="index">Refractive index</h2>
      <p>The <b>refractive index</b> n of a material is how much slower light travels inside it than in vacuum:</p>
      <Eq note="Water is about 1.333, ordinary crown glass 1.52, dense flint 1.785, diamond 2.417.">n = c / v — light at 532 nm inside BK7 (n = 1.519) travels at about 197,000 km/s instead of 299,792 km/s.</Eq>

      <h2 id="snell">Snell&apos;s law</h2>
      <p>When light crosses from one material into another at an angle, it changes direction. The rule, measured from the line perpendicular to the surface (the <b>normal</b>):</p>
      <Eq note="Going into a denser material (n₂ > n₁) bends the ray toward the normal; coming out again bends it away.">n₁ · sin θ₁ = n₂ · sin θ₂</Eq>
      <p>Photonica applies exactly this at every surface, for every wavelength, every frame. You can watch it happen: Ctrl+click any beam to open the <Link href={D('ray-inspector')}>ray inspector</Link>, which lists the incidence and exit angle at each surface along with the indices used.</p>

      <Call kind="try">
        <p>Add a <b>Glass slab</b> and rotate it with <K>Q</K> / <K>E</K>. The beam inside the glass tilts less than the beam outside, and the beam leaving the far side comes out parallel to the one that went in — just shifted sideways. That sideways shift is why a thick window makes things behind it look slightly displaced.</p>
      </Call>

      <h2 id="dispersion">Why colours separate</h2>
      <p>The refractive index is not one number — it depends on wavelength. Blue light is slowed more than red, so it bends more. That dependence is called <b>dispersion</b>, and it is the reason a prism makes a rainbow.</p>
      <p>Photonica stores dispersion the way glass manufacturers publish it, as <b>Sellmeier coefficients</b>:</p>
      <Eq note="λ in micrometres. B and C are measured constants, six numbers per glass. This is the same formula running live on the Photonica home page.">n²(λ) = 1 + Σ Bᵢ λ² / (λ² − Cᵢ)</Eq>

      <h3>The Abbe number</h3>
      <p>One number summarises how strongly a glass disperses:</p>
      <Eq note="High V (crown glass, ~64) disperses weakly. Low V (flint glass, ~25) disperses strongly. The Build panel shows V for whatever glass you select.">V = (n<sub>d</sub> − 1) / (n<sub>F</sub> − n<sub>C</sub>)</Eq>

      <h2 id="prism">Prisms</h2>
      <p>A prism bends light twice — once going in, once coming out — and both bends push the same way, so the total <b>deviation</b> is large. As you rotate a prism, the deviation falls to a minimum and then rises again. At that minimum the light passes symmetrically through the prism, and the angle is:</p>
      <Eq note="A is the apex angle. For a 60° BK7 prism at 587.6 nm this gives 38.6°, which is what Photonica measures to within 0.04°.">δ<sub>min</sub> = 2 · asin( n · sin(A/2) ) − A</Eq>
      <p>For small apex angles the formula simplifies to the one you may have met at school, δ ≈ (n − 1)·A.</p>

      <Call kind="try">
        <p>Open <b>Demos → Prism</b>, select the prism, and rotate it slowly with <K>Q</K> and <K>E</K> while watching <b>Beam angle</b> in the Measure panel. Find the smallest value you can — that is minimum deviation, and you have just performed the standard laboratory method for measuring a glass&apos;s refractive index.</p>
      </Call>

      <Fig src="/images/photonica/dsotm.jpg" alt="White light entering a prism and leaving as a full spectrum" caption="Demo 3: white light dispersed by a prism. Each colour leaves at its own angle because each sees a slightly different refractive index." />
    </>,
  },
  {
    slug: 'reflection', group: 'Understanding light', title: 'Reflection, Fresnel & TIR',
    summary: 'Why every glass surface reflects a little, when it reflects everything, and Brewster’s angle.',
    body: () => <>
      <p className="lead">Light never just passes through a surface. Some of it always bounces — and sometimes all of it does.</p>

      <h2 id="law">The law of reflection</h2>
      <p>A mirror sends light away at the same angle it arrived, measured from the normal: θ<sub>in</sub> = θ<sub>out</sub>. Photonica reproduces this exactly; it is one of the validation checks, and it passes to the last digit.</p>

      <h2 id="fresnel">Fresnel: the 4% you always lose</h2>
      <p>At every boundary between two materials, part of the light reflects even when it could pass straight through. For glass in air at normal incidence:</p>
      <Eq note="For BK7 (n = 1.517) this is 4.2% per surface — so an uncoated lens loses about 8% of the light to reflections alone, and those reflections become the faint 'ghosts' you sometimes see in photographs.">R = ( (n₁ − n₂) / (n₁ + n₂) )²</Eq>
      <p>The fraction climbs steeply as the angle gets shallower, which is why a window looks transparent face-on and mirror-like at a glancing angle. Photonica computes the full Fresnel equations, separately for the two polarisation directions, at every surface.</p>

      <h2 id="brewster">Brewster&apos;s angle</h2>
      <p>At one specific angle, light polarised in the plane of incidence is not reflected at all:</p>
      <Eq note="56.6° for air into BK7. This is exactly how polarising sunglasses kill glare from a wet road: the reflected light is strongly polarised, so a filter can block it.">θ<sub>B</sub> = arctan(n₂ / n₁)</Eq>

      <h2 id="tir">Total internal reflection</h2>
      <p>Going the other way — from glass out into air — there is an angle beyond which light cannot escape at all. It reflects back inside, perfectly, with no loss:</p>
      <Eq note="41.3° for BK7 into air, 24.4° for diamond. Photonica brackets the BK7 transition at 41.25°, within 0.03° of theory.">θ<sub>c</sub> = asin(n₂ / n₁)</Eq>
      <p>Total internal reflection is what carries signals down an optical fibre, what makes the inside of a diamond flash, and what lets a prism turn a beam through 90° more efficiently than any mirror.</p>

      <Call kind="try">
        <p>Add a <b>Prism</b> and rotate it until the beam inside hits the far face at a steep angle. The ray inspector will show the event change from <b>refract</b> to <b>TIR</b>, and the beam will fold back inside the glass instead of leaving. <b>Demos → Diamond fire</b> shows the same effect doing its real job.</p>
      </Call>

      <h2 id="coatings">Coatings</h2>
      <p>Thin films on a surface change these numbers deliberately, by making reflections from the film&apos;s two sides cancel or reinforce. Photonica ships several and lets you stack your own:</p>
      <Table head={['Coating', 'What it does']} rows={[
        ['MgF₂ AR (550 nm)', 'The classic single-layer anti-reflection coat: drops 4% to about 1.3%'],
        ['Broadband AR (QHQ)', 'A three-layer stack that keeps reflection low across the visible range'],
        ['Dielectric mirror (HR 550)', 'Many layers making a near-perfect mirror at one wavelength'],
        ['Dichroic (HR 650)', 'Reflects red, passes the rest — the beam splitter inside a projector'],
      ]} />
      <p>Select a part and the Build panel shows the resulting reflectance per surface at 450, 550 and 650 nm, so you can see a coating work.</p>
    </>,
  },
  {
    slug: 'lenses-and-focus', group: 'Understanding light', title: 'Lenses & focus',
    summary: 'Focal length, the lensmaker equation, and the aberrations that stop a lens being perfect.',
    body: () => <>
      <p className="lead">A lens is just a piece of glass with curved faces. Refraction at those curves is enough to gather a parallel beam into a point — and almost enough to do it perfectly.</p>

      <h2 id="focal">Focal length</h2>
      <p>Parallel light entering a converging lens meets at the <b>focal point</b>. The distance from the lens to that point is the <b>focal length</b> f, and it comes from the glass and the two curvatures:</p>
      <Eq note="The thin-lens form. R is positive when the surface's centre of curvature lies downstream, so a symmetric biconvex lens has R1 > 0 and R2 < 0.">1/f = (n − 1) · ( 1/R₁ − 1/R₂ )</Eq>
      <p>Real lenses have thickness, which moves the focus slightly:</p>
      <Eq note="Photonica shows this value live as 'EFL' in the Build panel when a lens is selected, for red, green and blue separately.">1/f = (n − 1) · [ 1/R₁ − 1/R₂ + (n − 1)·t / (n·R₁·R₂) ]</Eq>

      <Call kind="eng" title="Where the number is measured from">
        <p>The Measure panel reports focus as a distance from the <b>lens&apos;s own position</b> — its geometric centre, with the surfaces at ±t/2. For a thin lens that is effectively the principal plane; for a thick one you need the back focal length plus the half-thickness to compare against textbook figures. The validation suite does exactly this and matches to 0.08%.</p>
      </Call>

      <h2 id="kinds">Converging and diverging</h2>
      <Table head={['Part', 'Shape', 'Does']} rows={[
        ['Convex lens', 'Fat in the middle', 'Converges light to a real focus'],
        ['Concave lens', 'Thin in the middle', 'Diverges light; the focus is virtual, behind the lens'],
        ['Plano-convex', 'One flat face', 'Converges; the cheapest useful lens'],
        ['Custom lens', 'Both radii yours', 'Meniscus shapes, deliberately odd designs'],
        ['Cylindrical lens', 'Curved in one direction only', 'Focuses to a line instead of a point'],
      ]} />
      <p>A diverging lens shows a negative focal distance in the Measure panel, flagged <b>virtual</b>.</p>

      <h2 id="aberrations">Why a single lens is never perfect</h2>
      <h3>Chromatic aberration</h3>
      <p>Because n depends on wavelength, f does too. Blue focuses closer than red. The size of the effect is set by the Abbe number:</p>
      <Eq note="A 100 mm BK7 lens (V = 64) splits its red and blue focus by roughly 1.6 mm. The Measure panel shows this directly as 'Blue − red focus'.">longitudinal colour error ≈ f / V</Eq>
      <p>Fixing it needs two glasses working against each other — see <Link href={D('lens-design')}>lens design</Link> for building an achromat.</p>

      <h3>Spherical aberration</h3>
      <p>A spherical surface is easy to grind but is the wrong shape: rays through the edge of the lens focus closer than rays through the middle. The blur it leaves grows as the <em>cube</em> of the aperture — halve the beam width and the spot shrinks eightfold. (Photonica measures that exponent as 3.06 against a theoretical 3.)</p>
      <p>Two cures: stop the beam down, or change the shape. Setting a surface&apos;s <b>conic constant</b> k turns the sphere into a conic section, and one specific value removes spherical aberration entirely:</p>
      <Eq note="A hyperboloid on the exit face of a plano-convex lens, with the flat face toward the incoming collimated beam. The Build panel offers this as 'Perfect focus'.">k = −n²</Eq>

      <h3>Coma and astigmatism</h3>
      <p>Off-axis light suffers differently: a point source away from the axis smears into a comet shape (coma) or focuses at two different distances in two directions (astigmatism). Tilt a lens with <K>R</K> / <K>T</K> and watch the spot on the screen lose its symmetry.</p>

      <Call kind="try">
        <p><b>Demos → Chromatic focus</b> puts the colour error in front of you. <b>Demos → Optimise a singlet</b> then shows the optimiser reshaping a lens to fight spherical aberration, and <b>Design an achromat</b> kills the colour error with a second glass.</p>
      </Call>
    </>,
  },
  {
    slug: 'polarisation', group: 'Understanding light', title: 'Polarisation',
    summary: 'Linear and circular light, polarisers, wave plates, Malus’s law and the Stokes readout.',
    body: () => <>
      <p className="lead">Light is a wave that shakes sideways. <b>Polarisation</b> describes which way it shakes — and once you can control that, you can build filters, 3D glasses, LCD screens and optical isolators.</p>

      <h2 id="states">The states</h2>
      <Table head={['State', 'What the field does', 'In Photonica']} rows={[
        ['Unpolarised', 'Shakes in every direction at random — ordinary lamplight', 'The default source setting'],
        ['Linear', 'Shakes along one fixed line', 'Set an angle from horizontal'],
        ['Circular', 'The direction rotates steadily, left or right', 'Right or left circular'],
      ]} />

      <h2 id="malus">Polarisers and Malus&apos;s law</h2>
      <p>A polariser passes only the component along its transmission axis. Feed it light already polarised at an angle θ to that axis and the transmitted intensity is:</p>
      <Eq note="Two polarisers at 90° to each other pass nothing at all — 'crossed polarisers'. Photonica matches this curve to within 1% across the whole range.">I = I₀ · cos²θ</Eq>
      <p>Unpolarised light loses exactly half its power passing the first polariser, whatever the angle — there is no preferred direction to keep.</p>

      <h2 id="waveplates">Wave plates</h2>
      <p>A wave plate is a slice of crystal that slows one direction of shaking slightly more than the perpendicular one. The delay is measured in wavelengths:</p>
      <ul>
        <li>A <b>quarter-wave plate</b> at 45° to incoming linear light turns it <b>circular</b>.</li>
        <li>A <b>half-wave plate</b> <b>rotates</b> linear light — by twice the angle between the light and the plate&apos;s fast axis.</li>
      </ul>

      <Call kind="warn" title="Two different angle conventions">
        <p>This trips people up, so it is worth stating plainly. The light source&apos;s <b>polarisation angle is measured from horizontal</b> (0° = in the plane of the table). A polariser&apos;s or wave plate&apos;s <b>axis angle is measured from vertical</b>. So a polariser set to <code>axis 90°</code> is aligned with a source set to <code>polarisation 0°</code>. Both conventions are stated in the app&apos;s own tooltips; they simply differ.</p>
      </Call>

      <h2 id="stokes">Reading the state</h2>
      <p>The Measure panel reports polarisation as a <b>Stokes vector</b> plus a degree of polarisation:</p>
      <Table head={['Value', 'Means']} rows={[
        ['DOP', '1 = fully polarised, 0 = completely unpolarised'],
        ['s₁', '+1 horizontal, −1 vertical'],
        ['s₂', '+1 at +45°, −1 at −45°'],
        ['s₃', '+1 right circular, −1 left circular'],
      ]} />
      <p>The <Link href={D('ray-inspector')}>ray inspector</Link> shows the same four numbers <em>after every surface</em>, so you can watch a reflection or a wave plate change the state step by step.</p>

      <Call kind="try">
        <p><b>Demos → Three polarisers</b> shows the classic paradox: two crossed polarisers pass nothing, but slipping a third one at 45° <em>between</em> them lets light through again. Watch the Stokes readout as you rotate the middle one.</p>
      </Call>
    </>,
  },
  {
    slug: 'waves', group: 'Understanding light', title: 'Waves & diffraction',
    summary: 'Interference, the double slit, gratings, and the diffraction limit of every lens ever made.',
    body: () => <>
      <p className="lead">Rays are a convenient fiction. Send light through something small enough and it stops behaving like a ray and starts behaving like what it is: a wave.</p>

      <h2 id="interference">Interference</h2>
      <p>Two waves arriving at the same place add. If crests line up with crests, you get a bright spot; if crests meet troughs, they cancel into darkness. Photonica computes this properly by summing <b>Huygens wavelets</b> from every point across an aperture, rather than tracing rays.</p>

      <h2 id="double-slit">The double slit</h2>
      <p>Light through two narrow slits produces evenly spaced bright and dark fringes on a screen:</p>
      <Eq note="λ is the wavelength, L the distance to the screen, d the spacing between slits. Wider spacing gives finer fringes.">fringe spacing = λ · L / d</Eq>
      <p>To see it: add a <b>Slit mask</b>, then turn on wave mode for the screen in the <b>Waves</b> panel (&quot;Screen 1 shows the diffraction pattern&quot;). Rays alone will never show you fringes — the screen has to be computed as a coherent sum, which is exactly what that switch does.</p>

      <Fig src="/images/photonica/double-slit.jpg" alt="Interference fringes from a double slit on a Photonica screen" caption="Demo 11: Young's double slit. The fringes are a Huygens–Fresnel sum, not a texture." />

      <h2 id="gratings">Diffraction gratings</h2>
      <p>Thousands of slits instead of two, and the pattern sharpens into distinct beams called <b>orders</b>, each sending a different wavelength a different way:</p>
      <Eq note="d is the spacing between lines (1/600 mm for a 600 lines/mm grating), m the order. This is how a spectrometer separates colours far more sharply than a prism can.">m · λ = d · ( sin θ<sub>in</sub> + sin θ<sub>m</sub> )</Eq>
      <p>Photonica&apos;s grating is a sinusoidal phase grating: order m carries a fraction J<sub>m</sub>(depth)² of the light, and a phase depth of 1.84 radians is the setting that maximises the ±1 orders. Set which order the main measured path follows with <b>Measured order</b>.</p>

      <h2 id="limit">The diffraction limit</h2>
      <p>Even a flawless lens cannot focus light to a true point. The aperture itself diffracts, spreading the focus into an <b>Airy disc</b> whose radius is:</p>
      <Eq note="D is the aperture diameter. This is the hard limit that decides how much detail a telescope or a microscope can ever resolve — no amount of polishing gets past it.">r ≈ 1.22 · λ · f / D</Eq>
      <p>In the <b>Waves</b> panel, <b>Compute PSF at best focus</b> works out the real point spread function of your system and reports:</p>
      <ul>
        <li><b>Strehl ratio</b> — the peak brightness compared to a perfect lens. Above <b>0.8</b> the system counts as diffraction-limited (the Maréchal criterion); below that, aberrations dominate.</li>
        <li><b>MTF</b> — how much contrast survives at each level of fine detail, the standard way lens sharpness is specified.</li>
      </ul>

      <Call kind="try">
        <p>Design a lens in <Link href={D('lens-design')}>the optimiser</Link>, then compute its PSF. Watch the Strehl ratio climb past 0.8 as the design improves — that is the moment the lens stops being limited by your design and starts being limited by physics.</p>
      </Call>
    </>,
  },
  {
    slug: 'time-of-flight', group: 'Understanding light', title: 'Time of flight',
    summary: 'Light has a speed. Photonica tracks it, slows it down, and lets you watch a pulse arrive.',
    body: () => <>
      <p className="lead">Light crosses a 300 mm bench in one nanosecond. Slow that down two billion times and it becomes a thing you can watch travel — which is exactly what Photonica&apos;s light-in-flight mode does.</p>

      <h2 id="speed">How fast, exactly</h2>
      <p>In vacuum, light travels at 299,792,458 m/s — about 300 mm per nanosecond, or 0.3 mm per picosecond. In glass it goes slower, and for a <em>pulse</em> the relevant number is not the plain refractive index but the <b>group index</b> n<sub>g</sub>, which accounts for dispersion:</p>
      <Eq note="Photonica accumulates arrival time using the group index of every medium a path crosses, which is what a real streak camera would measure.">t = Σ ( n<sub>g</sub> · path length ) / c</Eq>

      <h2 id="lif">Light in flight</h2>
      <p>In the <b>Waves</b> panel, turn on <b>Show pulse</b>. A packet of light leaves the source and crawls across the bench. The controls:</p>
      <Table head={['Control', 'Does']} rows={[
        ['Playback speed', 'Picoseconds of simulated time per second of real time — the slow-down factor'],
        ['Pulse length', 'How long the pulse is. Real femtosecond pulses are under a micrometre; a longer one is simply easier to see'],
        ['Screens', <>What the screens show while the pulse runs: <b>everything</b>, <b>arrived so far</b> (a photon counts once its travel time has passed), or <b>only while it hits</b> — like a streak camera</>],
        ['Auto range', 'Loops from zero until the beam reaches its last surface. Turn it off to set the start and end yourself'],
      ]} />

      <Call kind="note" title="Why the screens stay dark">
        <p>Set <b>Screens → arrived so far</b> and a screen shows nothing until the light has genuinely reached it. That is the whole point: the image builds up in the order the physics delivers it, so a longer path really does light up later.</p>
      </Call>

      <h2 id="planet">Beyond the bench</h2>
      <p><b>View → Planet-scale light travel</b> opens a calculator that uses the same arithmetic on much longer distances: between cities on the WGS84 ellipsoid, through optical fibre (n<sub>g</sub> = 1.4682, with a route factor because cables never run straight), via geostationary or low-Earth satellites, and out to the Moon, Mars, Voyager 1 and Proxima Centauri.</p>
      <p>It is the fastest way to feel why a video call to the other side of the planet has a floor on its latency that no amount of engineering can remove.</p>

      <Call kind="try">
        <p><b>Demos → Light in flight</b>, then press play. Watch the pulse slow as it enters the glass — it genuinely does, by the ratio of the group indices — and speed up again on the way out.</p>
      </Call>
    </>,
  },
];
