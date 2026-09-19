import type { Metadata } from 'next';
import { Call, Cards, K, D } from '@/lib/photonica/docs/ui';

export const metadata: Metadata = {
  title: 'Your first experiment',
  description: 'A hands-on getting-started guide to your first time using Photonica.',
};

export default function FirstExperiment() {
  return (
    <>
      <p className="crumb">Docs / First experiment</p>
      <h1>Your first <em>experiment</em></h1>
      <p className="lead">
        Welcome to Photonica! In this guide, we'll walk you through your very first optical experiment. We'll explore the interface, play with a prism, and focus light with a lens.
      </p>

      <h2>Opening Photonica</h2>
      <p>
        When you first launch the app, you'll see a clean slate: the optical bench. By default, there's a light source emitting a beam and a screen to catch the light. This is your playground.
      </p>

      <h2>Your first demo</h2>
      <p>
        Instead of building from scratch right away, let's look at one of the built-in experiments.
      </p>
      <Call kind="try">
        Open the <strong>Demos</strong> menu at the top and select <strong>Prism</strong>.
      </Call>
      <p>
        You'll see a triangular glass prism sitting in the path of white light. The light enters the glass, bends (refracts), and splits into a beautiful spectrum of colours on the screen. This happens because Photonica uses real glass dispersion physics!
      </p>

      <h2>Moving things around</h2>
      <p>
        Navigating the 3D space is intuitive.
      </p>
      <ul>
        <li><strong>Pan & Move:</strong> Left-click (<K>LMB</K>) and drag to move parts around on the bench.</li>
        <li><strong>Orbit:</strong> Right-click (<K>RMB</K>) and drag to rotate your camera view around the scene.</li>
        <li><strong>Zoom:</strong> Use the scroll wheel to zoom in and out.</li>
      </ul>
      <Call kind="try">
        Try looking at the prism from different angles. Press <K>F</K> with the prism selected to automatically autofocus your view on it.
      </Call>

      <h2>Reading the measurements</h2>
      <p>
        The screen isn't just for show; it's a scientific instrument. It shows exactly where the photons land.
      </p>
      <p>
        Look at the readout panel on the right side of the window. When you select the screen, this panel displays real-time data: the focus quality, the spot size (RMS radius), and the total optical power hitting the surface.
      </p>

      <h2>Changing a parameter</h2>
      <p>
        Let's tweak the experiment and see how the light reacts.
      </p>
      <Call kind="try">
        Select the prism by clicking on it. In the properties panel, try changing the <strong>Glass Type</strong> (e.g., from N-BK7 to F2) or adjusting its <strong>Rotation</strong>.
      </Call>
      <p>
        Watch as the spectrum on the screen shifts instantly. Different glasses disperse light differently, and changing the angle of incidence alters the refraction.
      </p>

      <h2>Adding a lens</h2>
      <p>
        Now let's add a new component to control our spectrum.
      </p>
      <Call kind="try">
        Open the parts panel on the left, click <strong>Lens</strong>, and place it on the bench just after the prism.
      </Call>
      <p>
        Drag the lens so the dispersed light passes through it. You'll see the lens focus the spreading colours into tighter spots on the screen. You're designing optics!
      </p>

      <h2>Saving your work</h2>
      <p>
        Don't lose your masterpiece!
      </p>
      <Call kind="try">
        Press <K>Ctrl</K>+<K>S</K> to save your experiment.
      </Call>
      <Call kind="note">
        Photonica files (<code>.photonica</code>) are just plain JSON. You can open them in any text editor, check them into version control, or share them easily with others.
      </Call>

      <h2>What's next?</h2>
      <p>
        You've mastered the basics! Now you're ready to dive deeper into the physics of light or learn how to design more complex optical systems.
      </p>

      <Cards
        items={[
          {
            title: 'Light & colour',
            text: 'Understand how Photonica simulates wavelengths, spectra, and polarisation.',
            href: D('light-and-colour'),
          },
          {
            title: 'Lens design',
            text: 'Learn the principles of imaging, focal lengths, and aberrations.',
            href: D('lens-design'),
          }
        ]}
      />
    </>
  );
}
