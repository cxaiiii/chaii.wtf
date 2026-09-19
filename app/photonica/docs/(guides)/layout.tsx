import { Metadata } from 'next';
import Link from 'next/link';
import PhNav from '@/components/photonica/nav';

export const metadata: Metadata = {
  title: {
    template: '%s | Photonica Docs',
    default: 'Photonica Docs',
  },
};

const SIDEBAR_LINKS = [
  {
    section: 'Getting started',
    links: [
      { name: 'First experiment', href: '/photonica/docs/first-experiment' },
      { name: 'Light & colour', href: '/photonica/docs/light-and-colour' },
    ],
  },
  {
    section: 'Going deeper',
    links: [
      { name: 'Lens design', href: '/photonica/docs/lens-design' },
      { name: 'MCP reference', href: '/photonica/docs/mcp' },
    ],
  },
  {
    section: 'Quick ref',
    links: [
      { name: 'Install', href: '/photonica/docs#install' },
      { name: 'Controls', href: '/photonica/docs#controls' },
      { name: 'Demos', href: '/photonica/docs#demos' },
    ],
  },
];

function SidebarContent() {
  return (
    <>
      {SIDEBAR_LINKS.map((group) => (
        <div key={group.section}>
          <h4>{group.section}</h4>
          {group.links.map((link) => (
            <Link key={link.href} href={link.href}>{link.name}</Link>
          ))}
        </div>
      ))}
    </>
  );
}

export default function GuidesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PhNav docs />
      <div className="ph-docs">
        {/* Desktop Sidebar */}
        <div className="ph-side ph-glass">
          <nav>
            <SidebarContent />
          </nav>
        </div>

        {/* Mobile Sidebar */}
        <div className="ph-side-mobile ph-glass">
          <details>
            <summary>Menu</summary>
            <nav>
              <SidebarContent />
            </nav>
          </details>
        </div>

        {/* Main Content */}
        <div className="ph-prose">
          {children}
        </div>
      </div>
    </>
  );
}
