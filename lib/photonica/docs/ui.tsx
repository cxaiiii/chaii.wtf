import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';

// Building blocks for the Photonica docs. Every page is written with these, so the pages stay consistent.

type Kind = 'try' | 'math' | 'eng' | 'warn' | 'note';
const LABEL: Record<Kind, string> = { try: 'Try it in Photonica', math: 'The maths', eng: 'For engineers', warn: 'Watch out', note: 'Good to know' };

export function Call({ kind = 'note', title, children }: { kind?: Kind; title?: string; children: ReactNode }) {
  return <aside className={`ph-call ${kind}`}><b>{title ?? LABEL[kind]}</b>{children}</aside>;
}

export function Eq({ children, note }: { children: ReactNode; note?: ReactNode }) {
  return <div className="ph-math" role="math">{children}{note && <small>{note}</small>}</div>;
}

export function Fig({ src, alt, caption, w = 1600, h = 880 }: { src: string; alt: string; caption?: ReactNode; w?: number; h?: number }) {
  return <figure><Image src={src} alt={alt} width={w} height={h} sizes="(max-width: 960px) 100vw, 780px" />{caption && <figcaption>{caption}</figcaption>}</figure>;
}

export function Table({ head, rows }: { head: string[]; rows: ReactNode[][] }) {
  return <table className="ph-table"><thead><tr>{head.map((h) => <th key={h}>{h}</th>)}</tr></thead>
    <tbody>{rows.map((r, i) => <tr key={i}>{r.map((c, j) => <td key={j}>{c}</td>)}</tr>)}</tbody></table>;
}

export function Cards({ items }: { items: { href: string; title: string; text: string }[] }) {
  return <div className="ph-cards">{items.map((c) => <Link key={c.href} className="ph-glass" href={c.href}><b>{c.title}</b><span>{c.text}</span></Link>)}</div>;
}

export const K = ({ children }: { children: ReactNode }) => <kbd>{children}</kbd>;
export const D = (slug: string) => `/photonica/docs/${slug}`;
