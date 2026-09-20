'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function DocsSide({ groups }: { groups: { group: string; docs: { slug: string; title: string }[] }[] }) {
  const path = usePathname();
  const nav = <nav className="ph-side ph-glass">
    {groups.map((g) => <div key={g.group}>
      <h4>{g.group}</h4>
      {g.docs.map((d) => {
        const href = `/photonica/docs/${d.slug}`;
        const active = path === href || (d.slug === 'introduction' && path === '/photonica/docs');
        return <Link key={d.slug} href={href} aria-current={active ? 'page' : undefined}>{d.title}</Link>;
      })}
    </div>)}
  </nav>;

  return <>
    {nav}
    <details className="ph-side-mobile ph-glass"><summary>Documentation</summary>{nav}</details>
  </>;
}
