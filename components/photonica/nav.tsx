import Image from 'next/image';
import Link from 'next/link';
import { DOWNLOAD, VALIDATION } from '@/lib/photonica/site';

export default function PhNav({ docs = false }: { docs?: boolean }) {
  return <nav className="ph-nav">
    <Link className="ph-brand" href="/photonica"><Image src="/images/photonica/logo.png" alt="" width={60} height={60} />Photonica{docs && <span className="ph-brand-sub">docs</span>}</Link>
    <div>
      <Link href="/photonica#science">Science</Link>
      <Link href="/photonica#lab">The lab</Link>
      <Link className="keep" href="/photonica/docs">Docs</Link>
      <a href={VALIDATION} target="_blank">Validation</a>
      <a className="ph-btn" href={DOWNLOAD}>Download</a>
    </div>
  </nav>;
}
