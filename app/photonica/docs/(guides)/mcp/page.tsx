import type { Metadata } from 'next';
import { Call, Table, Cards, D } from '@/lib/photonica/docs/ui';
import { VALIDATION, GITHUB } from '@/lib/photonica/site';

export const metadata: Metadata = {
  title: 'MCP reference — Photonica Docs',
  description: 'Reference for Photonica\'s Model Context Protocol (MCP) server that lets AI assistants drive the app.',
};

export default function McpReference() {
  return (
    <>
      <p className="crumb">Docs / MCP reference</p>
      <h1>MCP <em>reference</em></h1>
      <p className="lead">
        Photonica features a built-in <a href="https://modelcontextprotocol.io" target="_blank" rel="noreferrer">Model Context Protocol (MCP)</a> server, allowing AI assistants like Claude to directly control the application, design optical systems, and run simulations.
      </p>

      <h2>Setup</h2>
      <p>
        The MCP server is a standalone executable (<code>photonica-mcp.exe</code>) included with your Photonica installation. It connects locally to the running Photonica instance.
      </p>

      <h3>Claude Code</h3>
      <p>
        To use Photonica with Claude Code, run the following command in your terminal, replacing <code>&lt;folder&gt;</code> with your Photonica installation path:
      </p>
      <pre><code>claude mcp add photonica -- "&lt;folder&gt;\photonica-mcp.exe"</code></pre>

      <h3>Claude Desktop</h3>
      <p>
        To use it with Claude Desktop, add the following to your <code>claude_desktop_config.json</code>:
      </p>
      <pre><code>{`{
  "mcpServers": {
    "photonica": {
      "command": "C:\\\\Path\\\\To\\\\Photonica\\\\photonica-mcp.exe"
    }
  }
}`}</code></pre>

      <Call kind="note">
        <strong>Security:</strong> The MCP server only accepts connections from localhost. You can completely disable assistant control in Photonica under <strong>View → Allow assistant control</strong>.
      </Call>

      <h2>Tools reference</h2>
      <p>
        The MCP server exposes 28 tools organized into several categories, giving the assistant comprehensive control over the simulation.
      </p>

      <Table
        head={['Category', 'Tool', 'Description']}
        rows={[
          ['State & measurement', 'get_state', 'Retrieve the current scene state and part parameters'],
          ['State & measurement', 'measure', 'Measure positions, angles, spot sizes, and optical path lengths'],
          ['Parts', 'add_part', 'Add lenses, mirrors, prisms, or structural parts'],
          ['Parts', 'update_part', 'Modify parameters like radii, materials (Sellmeier), or position'],
          ['Parts', 'remove_part', 'Delete a part from the scene'],
          ['Screens & source', 'add_screen', 'Add a detector screen to measure light distribution'],
          ['Screens & source', 'update_screen', 'Move or resize a screen'],
          ['Screens & source', 'update_source', 'Configure the light source (wavelength, coherence, type)'],
          ['Ray tracing', 'inspect_ray', 'Trace a specific ray and return its intersection sequence and Jones vectors'],
          ['Optimisation', 'autofocus', 'Automatically adjust distances to minimize spot size'],
          ['Optimisation', 'optimize', 'Run damped least-squares optimisation on selected variables'],
          ['Optimisation', 'tolerance', 'Perform Monte-Carlo tolerancing on the design'],
          ['Time of flight', 'light_in_flight', 'Simulate and visualize light travel time'],
          ['Camera & output', 'set_camera', 'Adjust the 3D viewport camera'],
          ['Camera & output', 'screenshot', 'Capture an image of the current viewport'],
          ['Camera & output', 'render_video', 'Render an animation or time-of-flight video'],
          ['Project', 'save_project', 'Save the current scene to disk'],
          ['Project', 'open_project', 'Load a saved scene'],
          ['Project', 'undo', 'Undo the last action'],
          ['Project', 'redo', 'Redo the last undone action'],
        ]}
      />

      <h2>Example prompts</h2>
      <p>
        Try these prompts with your AI assistant to explore its capabilities:
      </p>
      <Call kind="try">
        <ul>
          <li>"Build a Keplerian telescope with a 500 mm objective and 50 mm eyepiece"</li>
          <li>"Measure the chromatic focus shift of this lens"</li>
          <li>"Run tolerancing on this design with ±0.05 mm surface radii"</li>
          <li>"Render a 4K video of light in flight through this prism"</li>
        </ul>
      </Call>

      <h2>Validation suite</h2>
      <p>
        Photonica's validation suite consists of 33 rigorous physical checks. All of these tests were automated and verified entirely through the MCP interface, demonstrating its accuracy and control capabilities. See the <a href={VALIDATION}>validation report</a> for details.
      </p>

      <Cards
        items={[
          { title: 'Validation report', text: 'See the automated physics checks.', href: VALIDATION },
          { title: 'GitHub', text: 'View source and report issues.', href: GITHUB },
        ]}
      />
    </>
  );
}
