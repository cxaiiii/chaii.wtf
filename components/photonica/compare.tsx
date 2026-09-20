'use client';
import { useCallback, useEffect, useId, useRef, useState } from 'react';

// Two renders of the same bench, frame for frame: the fast view and the photoreal path tracer.
// Drag the handle to wipe between them. On a phone they simply sit side by side instead.
export default function Compare({ a, b, posterA, posterB, labelA, labelB }: {
  a: string; b: string; posterA: string; posterB: string; labelA: string; labelB: string;
}) {
  const id = useId();
  const wrap = useRef<HTMLDivElement>(null);
  const va = useRef<HTMLVideoElement>(null);
  const vb = useRef<HTMLVideoElement>(null);
  const pair = useRef<HTMLDivElement>(null);
  const [x, setX] = useState(52);
  const drag = useRef(false);

  // keep both clips on the same frame, and only play them while they are on screen
  useEffect(() => {
    const A = va.current, B = vb.current;
    if (!A || !B) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let raf = 0;
    const sync = () => {
      raf = requestAnimationFrame(sync);
      if (Math.abs(A.currentTime - B.currentTime) > 0.06) B.currentTime = A.currentTime;
    };
    const phone = window.matchMedia('(max-width: 700px)');
    const clips = () => (phone.matches ? Array.from(pair.current?.querySelectorAll('video') ?? []) : [A, B]);
    const io = new IntersectionObserver(([e]) => {
      const vs = clips();
      if (e.isIntersecting && !reduced) {
        vs.forEach((v) => v.play().catch(() => {}));
        if (!phone.matches && !raf) raf = requestAnimationFrame(sync);
      } else {
        vs.forEach((v) => v.pause());
        cancelAnimationFrame(raf); raf = 0;
      }
    }, { threshold: 0.25 });
    io.observe(wrap.current ?? A);
    const vis = () => { if (document.visibilityState === 'visible' && !reduced) clips().forEach((v) => { if (v.getBoundingClientRect().top < innerHeight) v.play().catch(() => {}); }); };
    document.addEventListener('visibilitychange', vis);
    return () => { io.disconnect(); cancelAnimationFrame(raf); document.removeEventListener('visibilitychange', vis); };
  }, []);

  const move = useCallback((clientX: number) => {
    const r = wrap.current?.getBoundingClientRect();
    if (!r) return;
    setX(Math.max(0, Math.min(100, ((clientX - r.left) / r.width) * 100)));
  }, []);

  useEffect(() => {
    const up = () => { drag.current = false; };
    const mv = (e: PointerEvent) => { if (drag.current) move(e.clientX); };
    window.addEventListener('pointermove', mv);
    window.addEventListener('pointerup', up);
    return () => { window.removeEventListener('pointermove', mv); window.removeEventListener('pointerup', up); };
  }, [move]);

  return <div className="ph-cmp">
    <div ref={wrap} className="ph-cmp-stage ph-glass"
      onPointerDown={(e) => { drag.current = true; move(e.clientX); }}>
      <video ref={vb} className="ph-cmp-vid" src={b} poster={posterB} muted loop playsInline preload="metadata" aria-label={labelB} />
      <div className="ph-cmp-top" style={{ clipPath: `inset(0 ${100 - x}% 0 0)` }}>
        <video ref={va} className="ph-cmp-vid" src={a} poster={posterA} muted loop playsInline preload="metadata" aria-label={labelA} />
      </div>
      <span className="ph-cmp-tag left">{labelA}</span>
      <span className="ph-cmp-tag right">{labelB}</span>
      <div className="ph-cmp-handle" style={{ left: `${x}%` }}>
        <button type="button" role="slider" aria-label="Wipe between the fast view and the photoreal render"
          aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(x)} aria-controls={id}
          onKeyDown={(e) => {
            if (e.key === 'ArrowLeft') setX((v) => Math.max(0, v - 4));
            if (e.key === 'ArrowRight') setX((v) => Math.min(100, v + 4));
          }}><i /><i /></button>
      </div>
    </div>
    <div className="ph-cmp-pair" id={id} ref={pair}>
      <figure><video className="ph-cmp-vid" src={a} poster={posterA} muted loop playsInline preload="metadata" /><figcaption>{labelA}</figcaption></figure>
      <figure><video className="ph-cmp-vid" src={b} poster={posterB} muted loop playsInline preload="metadata" /><figcaption>{labelB}</figcaption></figure>
    </div>
  </div>;
}
