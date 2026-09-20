'use client';
import { useEffect, useRef } from 'react';

// A looping clip rendered by Photonica itself. Holds on the poster frame for anyone who asked
// their system not to animate things.
export default function Clip({ src, poster, alt }: { src: string; poster: string; alt: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { v.pause(); return; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) v.play().catch(() => {}); else v.pause(); }, { threshold: 0.2 });
    io.observe(v);
    return () => io.disconnect();
  }, []);
  return <video ref={ref} className="ph-clip" src={src} poster={poster} aria-label={alt} muted loop playsInline preload="metadata" />;
}
