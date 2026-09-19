import type { Metadata } from 'next';
import { Call, Eq, Table, Cards, D, K } from '@/lib/photonica/docs/ui';

export const metadata: Metadata = {
  title: 'Lens design',
  description: 'Learn how to design, optimise, and tolerance optical systems in Photonica.',
};

export default function LensDesign() {
  return (
    <>
      <p className="crumb">Docs / Lens design</p>
      <h1>Lens <em>design</em></h1>
      <p className="lead">
        Design, optimise, and tolerance optical systems with real glass catalogs and automatic damped least-squares optimisation.
      </p>

      <h2>What is lens design?</h2>
      <p>
        Lens design is the process of choosing the right sequence of surfaces, glasses, and spacings to form a sharp, clear image of an object. In a perfect world, a single thin piece of glass would do this flawlessly. In reality, light of different wavelengths bends differently (dispersion), and spherical surfaces don't bring all rays to the same focus (spherical aberration).
      </p>
      <p>
        In Photonica, you don't just simulate what an existing lens does—you can actively design new ones by defining variables and letting the optimiser find the best parameters to meet your targets.
      </p>

      <h2>The thick-lens equation</h2>
      <p>
        While thin-lens approximations are useful for sketches, Photonica calculates precise ray traces using exact trigonometric ray tracing. However, for initial paraxial setup, the thick lens equation is used to compute focal length and principal planes:
      </p>
      <Eq>{'P = P₁ + P₂ − P₁ P₂ d / n'}</Eq>
      <p>
        Where <strong>P</strong> is the total optical power, <strong>P₁</strong> and <strong>P₂</strong> are the powers of the front and back surfaces, <strong>d</strong> is the center thickness, and <strong>n</strong> is the refractive index of the glass.
      </p>
      <Call kind="math" title="Surface Power">
        <p>The power of a single spherical surface is <strong>P = (n′ − n) / R</strong> where <strong>R</strong> is the radius of curvature.</p>
      </Call>

      <h2>Aberrations</h2>
      <p>
        Aberrations are departures from perfect imaging. Photonica calculates and displays these in real-time.
      </p>
      <ul>
        <li><strong>Spherical Aberration:</strong> Marginal rays focus closer to the lens than paraxial rays.</li>
        <li><strong>Chromatic Aberration:</strong> Different wavelengths (colors) focus at different distances due to dispersion.</li>
        <li><strong>Coma:</strong> Off-axis light rays form a comet-like tail rather than a sharp spot.</li>
      </ul>
      <p>
        The quickest way to evaluate aberrations in Photonica is by looking at the <strong>Spot Diagram</strong>, which traces a grid of rays from a single point source and plots where they intersect the image plane.
      </p>

      <h2>The Optimiser</h2>
      <p>
        Photonica features a built-in damped least-squares (DLS) optimiser. You define a <strong>merit function</strong>—a single number that represents how "bad" the lens is—and the optimiser adjusts variables to minimize it.
      </p>
      <Eq note="Wᵢ = weight, Tᵢ = target, Vᵢ = current value">{'MF = Σ Wᵢ (Tᵢ − Vᵢ)²'}</Eq>

      <h3>Variables and Operands</h3>
      <Table
        head={['Variables', 'Operands (Targets)']}
        rows={[
          ['Radius of curvature / Curvature', 'RMS Spot Size (Radial or X/Y)'],
          ['Thickness / Air spacing', 'Effective Focal Length (EFL)'],
          ['Conic constant (Aspheres)', 'Collimation / Beam divergence'],
          ['Tilt (X, Y)', 'Chromatic focus shift'],
          ['Decenter (X, Y)', 'Magnification'],
        ]}
      />

      <Call kind="eng" title="Damped Least-Squares (DLS)">
        <p>The optimiser uses the Levenberg-Marquardt algorithm. It calculates the Jacobian matrix (the derivative of every operand with respect to every variable) via finite differences. If a step increases the merit function, it increases the damping factor to take a safer, smaller gradient-descent step.</p>
      </Call>

      <h2>Designing an Achromat</h2>
      <p>
        A classic exercise is designing an achromatic doublet—a lens made of two different glasses that brings two wavelengths (usually red and blue) to the same focus, significantly reducing chromatic aberration.
      </p>
      <ol>
        <li><strong>Start with a singlet:</strong> Place a single biconvex lens using N-BK7 glass. Aim for a 100 mm focal length. Look at the spot diagram for white light; you'll see a large chromatic blur.</li>
        <li><strong>Add a second element:</strong> Append a diverging element made of a high-dispersion flint glass, like F2.</li>
        <li><strong>Set variables:</strong> Make the front radius, the cemented radius, and the back radius variable.</li>
        <li><strong>Set operands:</strong> Set a target for an EFL of 100 mm, and target 0 RMS spot size across three wavelengths (486 nm, 587 nm, 656 nm).</li>
        <li><strong>Optimise:</strong> Run the optimiser. The lenses will bend to balance the positive power of the crown glass with the negative power of the flint, correcting the chromatic error.</li>
      </ol>
      <Call kind="try" title="Design an Achromat">
        <p>Load the <code>Design an achromat</code> demo from the Demos menu. Press <K>O</K> to open the Optimiser tab, hit <strong>Start</strong>, and watch the spot diagram shrink in real-time.</p>
      </Call>

      <h2>Tolerancing</h2>
      <p>
        A lens that works in simulation might be impossible to build. Manufacturing always introduces errors. Photonica includes a Monte-Carlo tolerancing engine to predict real-world yield.
      </p>
      <p>
        You specify tolerances for radii, thicknesses, tilts, and decenters. Photonica then generates hundreds of random, perturbed systems. For each system, it can optionally adjust a <em>compensator</em> (like the final detector position, simulating a technician refocusing the lens) before evaluating the final performance.
      </p>
      <Call kind="note" title="Collision Checks">
        <p>During tolerancing and optimisation, Photonica automatically checks for physical impossibilities, such as elements intersecting each other or edge thicknesses becoming negative.</p>
      </Call>

      <h2>Zemax Import</h2>
      <p>
        If you already have designs from industry-standard tools, you don't need to rebuild them from scratch. Photonica supports importing <code>.zmx</code> lens prescriptions.
      </p>
      <p>
        Drag and drop a <code>.zmx</code> file into the window. Photonica will map standard surfaces, glasses, and apertures.
      </p>

      <h2>Next steps</h2>
      <Cards items={[
        { title: 'Light & colour', text: 'Understand dispersion, Sellmeier, and the visible spectrum.', href: D('light-and-colour') },
        { title: 'MCP reference', text: 'Let an AI assistant drive the optimiser for you.', href: D('mcp') },
      ]} />
    </>
  );
}
