import PhNav from '@/components/photonica/nav';
import DocsSide from '@/components/photonica/docs-side';
import { byGroup } from '@/lib/photonica/docs';

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  const groups = byGroup().map((g) => ({ group: g.group, docs: g.docs.map((d) => ({ slug: d.slug, title: d.title })) }));
  return <main>
    <PhNav docs />
    <div className="ph-docs">
      <DocsSide groups={groups} />
      {children}
    </div>
    <footer className="ph-foot">
      <span>Photonica is built independently by Chaitanya Saxena.</span>
      <div><a href="/">chaii.wtf</a><a href="/photonica">Overview</a><a href="https://github.com/cxaiiii/photonica" target="_blank">GitHub</a></div>
    </footer>
  </main>;
}
