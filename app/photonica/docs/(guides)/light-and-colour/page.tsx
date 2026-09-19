import type { Metadata } from 'next';
import { Call, Eq, Table, Cards, D } from '@/lib/photonica/docs/ui';

export const metadata: Metadata = {
  title: 'Light & colour',
  description: 'Learn the physics of light, how wavelengths map to colour, and how glass bends and separates the spectrum.',
};

export default function LightAndColour() {
  return (
    <>
      <p className="crumb">Docs / Light & colour</p>
      <h1>Light & <em>colour</em></h1>
      <p className="lead">
        What is light? How does a prism create a rainbow? To use an optics simulator effectively, we first need to understand the physical nature of light and how it interacts with the matter it passes through.
      </p>

      <h2>The nature of light</h2>
      <p>
        Light is an electromagnetic wave—oscillating electric and magnetic fields traveling through space. The distance between the peaks of these waves is called the <strong>wavelength</strong>. 
      </p>
      <p>
        The human eye is only sensitive to a very narrow band of electromagnetic waves, roughly between <strong>380 nanometers (nm)</strong> and <strong>780 nm</strong>. We call this narrow band the <em>visible spectrum</em>. Other parts of the electromagnetic spectrum include radio waves, microwaves, infrared, ultraviolet, X-rays, and gamma rays.
      </p>

      <Call kind="try" title="Wavelengths in Photonica">
        In Photonica, light sources emit rays with specific wavelengths. Open the <strong>Visible Spectrum</strong> demo to see lasers configured across the 380–780nm range. Notice how the simulation colours the rays based on their wavelength!
      </Call>

      <h3>Wavelength and perceived colour</h3>
      <p>
        When light enters our eyes, specialized cells called cones detect it. We have three types of cones, roughly sensitive to red, green, and blue light. Our brain interprets the combination of signals from these cones as colour.
      </p>
      <ul>
        <li><strong>~380–450 nm:</strong> Violet</li>
        <li><strong>~450–495 nm:</strong> Blue</li>
        <li><strong>~495–570 nm:</strong> Green</li>
        <li><strong>~570–590 nm:</strong> Yellow</li>
        <li><strong>~590–620 nm:</strong> Orange</li>
        <li><strong>~620–780 nm:</strong> Red</li>
      </ul>
      <p>
        "White" light, like sunlight or the light from a typical LED bulb, isn't a single wavelength. It is a mixture of many different wavelengths (colours) combined together.
      </p>

      <h2>Refraction: How glass bends light</h2>
      <p>
        Light travels in a vacuum at exactly <em>c</em> (approx. 300,000 km/s). But when light enters a dense transparent material, like water or glass, it slows down. This slowing down is quantified by the material&apos;s <strong>refractive index</strong> (<em>n</em>).
      </p>
      
      <Call kind="math" title="Refractive Index">
        <Eq>n = c / v</Eq>
        Where <em>c</em> is the speed of light in a vacuum, and <em>v</em> is the speed of light in the material. Since light always slows down in matter, <em>n</em> ≥ 1. For air, <em>n</em> ≈ 1.0003 (usually approximated as 1). For typical crown glass, <em>n</em> ≈ 1.5.
      </Call>

      <p>
        When a ray of light hits the boundary between two materials (like air and glass) at an angle, the change in speed causes the ray to bend. This bending is called <strong>refraction</strong>. The exact angle of bending is described by <strong>Snell's Law</strong>.
      </p>

      <Eq>{'n₁ sin(θ₁) = n₂ sin(θ₂)'}</Eq>

      <p>
        Where <em>n₁</em>, <em>n₂</em> are the refractive indices of the two materials, and <em>θ₁</em>, <em>θ₂</em> are the angles the light ray makes with the <em>normal</em> (a line perpendicular to the surface).
      </p>

      <Call kind="try" title="Snell's Law Explorer">
        Open the <strong>Refraction &amp; Reflection</strong> demo in Photonica. You can drag the light source to change the incident angle (<em>θ₁</em>) and watch how the refracted angle (<em>θ₂</em>) updates in real-time according to Snell&apos;s Law.
      </Call>

      <h2>Dispersion: Separating the spectrum</h2>
      <p>
        Here is where optics gets really interesting: the refractive index of a material isn't just one fixed number. It actually varies slightly depending on the wavelength of the light! 
      </p>
      <p>
        In general, glass bends blue light (shorter wavelengths) slightly more than it bends red light (longer wavelengths). This wavelength-dependent bending is called <strong>dispersion</strong>.
      </p>
      
      <Call kind="math" title="The Sellmeier Equation">
        <p>Instead of a single <em>n</em>, optical engineers use the Sellmeier equation to calculate the exact refractive index for any wavelength <em>λ</em>.</p>
        <Eq>{'n²(λ) = 1 + Σ Bᵢλ² / (λ² − Cᵢ)'}</Eq>
        <p>Photonica uses real manufacturer Sellmeier coefficients to simulate true, physically-accurate dispersion for all glass types.</p>
      </Call>

      <p>
        Because of dispersion, when a beam of white light enters a glass prism at an angle, the different colours bend by different amounts. The red light bends the least, and the violet light bends the most. This causes the beam to fan out into a rainbow spectrum—a phenomenon famously demonstrated by Isaac Newton.
      </p>

      <Call kind="try" title="Newton's Prism">
        Load the <strong>Dispersion Prism</strong> demo. You'll see a white light source hitting a triangular prism. Turn on the "Rays" view to see how the single white beam is calculated as multiple separate wavelengths, spreading out into a beautiful spectrum!
      </Call>

      <h2>Total Internal Reflection</h2>
      <p>
        When light travels from a dense material (like glass) back into a less dense material (like air), it bends <em>away</em> from the normal. If the incident angle inside the glass is steep enough, the calculated exit angle reaches 90° (running parallel to the surface).
      </p>
      <p>
        Any angle steeper than this <strong>critical angle</strong> cannot exit the glass at all. Instead, 100% of the light bounces back inside. This is called <strong>Total Internal Reflection (TIR)</strong>.
      </p>

      <Eq>{'θc = arcsin(n₂ / n₁)'}</Eq>

      <p>
        TIR is the magical principle behind fiber optic cables, which trap light inside a flexible glass core, allowing data to travel across oceans without leaking out.
      </p>

      <Call kind="try" title="Fibre Optics">
        Open the <strong>Fibre Optic Cable</strong> demo to see TIR in action. Watch how rays bounce perfectly off the inner walls of the curved glass pipe, never escaping until they reach the end!
      </Call>

      <h2>Common Optical Materials</h2>
      <p>
        Here is a quick look at the refractive indices (measured at the green 587.6 nm wavelength, known as <em>n</em><sub>d</sub>) of some common materials you&apos;ll find in Photonica&apos;s material library:
      </p>

      <Table
        head={['Material', 'Refractive Index (nᵈ)', 'Abbe Number (Vᵈ)']}
        rows={[
          ['Vacuum', '1.0000', 'Infinite'],
          ['Air', '1.0003', '~89'],
          ['Water', '1.333', '55.3'],
          ['N-BK7 (Crown Glass)', '1.5168', '64.17'],
          ['SF11 (Dense Flint Glass)', '1.7847', '25.76'],
          ['Diamond', '2.417', '55.3'],
        ]}
      />

      <Cards items={[
        { title: 'Your first experiment', text: 'A hands-on guide to the interface and controls.', href: D('first-experiment') },
        { title: 'Lens design', text: 'Design, optimise, and tolerance optical systems.', href: D('lens-design') },
      ]} />
    </>
  );
}
