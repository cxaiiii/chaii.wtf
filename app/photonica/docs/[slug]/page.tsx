import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { DOCS, docIndex, findDoc } from '@/lib/photonica/docs';

export function generateStaticParams() {
  return DOCS.filter((d) => d.slug !== 'introduction').map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const doc = findDoc(slug);
  if (!doc) return {};
  return {
    title: doc.title,
    description: doc.summary,
    alternates: { canonical: `/photonica/docs/${doc.slug}` },
    openGraph: { title: `${doc.title} — Photonica docs`, description: doc.summary },
  };
}

export default async function DocPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doc = findDoc(slug);
  if (!doc) notFound();
  const i = docIndex(slug);
  const prev = i > 0 ? DOCS[i - 1] : null;
  const next = i < DOCS.length - 1 ? DOCS[i + 1] : null;

  return <article className="ph-prose">
    <p className="crumb">{doc.group}</p>
    <h1>{doc.title}</h1>
    {doc.body()}
    <div className="ph-pager">
      {prev && <Link className="ph-glass" href={`/photonica/docs/${prev.slug}`}><small>Previous</small><b>{prev.title}</b></Link>}
      {next && <Link className="ph-glass next" href={`/photonica/docs/${next.slug}`}><small>Next</small><b>{next.title}</b></Link>}
    </div>
  </article>;
}
