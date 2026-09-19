'use client';
import { useEffect } from 'react';

// One listener for the whole Photonica section:
//  - --ab-x / --ab-y on the root: how far the chromatic fringes on [data-ab] headings split (follows the pointer)
//  - --mx / --my on each .ph-glass: where its spotlight sits
//  - --sy on [data-parallax]: scroll offset for layered imagery
export default function PhotonicaFx() {
  useEffect(() => {
    const root = document.documentElement;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let raf = 0, tx = 0, ty = 0, x = 0, y = 0;

    const onMove = (e: PointerEvent) => {
      tx = (e.clientX / window.innerWidth - 0.5) * 2;
      ty = (e.clientY / window.innerHeight - 0.5) * 2;
      const el = (e.target as Element | null)?.closest?.('.ph-glass') as HTMLElement | null;
      if (el) {
        const r = el.getBoundingClientRect();
        el.style.setProperty('--mx', `${e.clientX - r.left}px`);
        el.style.setProperty('--my', `${e.clientY - r.top}px`);
      }
    };
    const layers = () => Array.from(document.querySelectorAll<HTMLElement>('[data-parallax]'));
    let items = layers();
    const tick = () => {
      raf = requestAnimationFrame(tick);
      x += (tx - x) * 0.08; y += (ty - y) * 0.08;
      root.style.setProperty('--ab-x', `${(x * 3).toFixed(2)}px`);
      root.style.setProperty('--ab-y', `${(y * 2).toFixed(2)}px`);
      const vh = window.innerHeight;
      for (const el of items) {
        const r = el.getBoundingClientRect();
        if (r.bottom < -200 || r.top > vh + 200) continue;
        const k = parseFloat(el.dataset.parallax || '0.1');
        el.style.setProperty('--sy', `${((r.top + r.height / 2 - vh / 2) * -k).toFixed(1)}px`);
      }
    };
    if (!reduced) {
      window.addEventListener('pointermove', onMove, { passive: true });
      raf = requestAnimationFrame(tick);
    }
    const mo = new MutationObserver(() => { items = layers(); });
    mo.observe(document.body, { childList: true, subtree: true });
    return () => { cancelAnimationFrame(raf); window.removeEventListener('pointermove', onMove); mo.disconnect(); };
  }, []);
  return null;
}
