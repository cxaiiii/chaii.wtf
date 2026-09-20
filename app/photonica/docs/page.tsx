import type { Metadata } from 'next';
import Link from 'next/link';
import { DOCS, findDoc } from '@/lib/photonica/docs';

export const metadata: Metadata = {
  title: 'Documentation',
  description: 'Install Photonica, learn the optics, and drive the bench — from a first beam to lens design and assistant control.',
  alternates: { canonical: '/photonica/docs' },
};

export default function DocsIndex() {
  const doc = findDoc('introduction')!;
  const next = DOCS[1];
  return <article className="ph-prose">
    <p className="crumb">Documentation</p>
    <h1>{doc.title}</h1>
    {doc.body()}
    <div className="ph-pager">
      <span />
      <Link className="ph-glass next" href={`/photonica/docs/${next.slug}`}><small>Next</small><b>{next.title}</b></Link>
    </div>
  </article>;
}
