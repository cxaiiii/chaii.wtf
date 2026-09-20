'use client';
import { useEffect } from 'react';

// One listener set for the whole Photonica section:
//  - --ab-x / --ab-y on the root: how far the chromatic fringes on [data-ab] headings split
//  - --mx / --my on a .ph-glass under the pointer: where its spotlight sits
//  - --sy on [data-parallax]: scroll offset for layered imagery
// Nothing runs on idle: the loop starts on pointer or scroll input and stops once it settles,
// and element positions are cached so a scroll frame never forces layout.
export default function PhotonicaFx() {
  useEffect(() => {
    const nav = navigator as Navigator & { deviceMemory?: number };
    const weak = (nav.hardwareConcurrency ?? 8) <= 4 || (nav.deviceMemory ?? 8) <= 4;
    if (weak || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const root = document.documentElement;
    let raf = 0, idle = 0;
    let tx = 0, ty = 0, x = 0, y = 0;
    let layers: { el: HTMLElement; mid: number; k: number }[] = [];

    // measured once per layout change, not per frame
    const measure = () => {
      layers = Array.from(document.querySelectorAll<HTMLElement>('[data-parallax]')).map((el) => {
        const r = el.getBoundingClientRect();
        return { el, mid: r.top + window.scrollY + r.height / 2, k: parseFloat(el.dataset.parallax || '0.1') };
      });
      apply();
    };

    const apply = () => {
      const vh = window.innerHeight, mid = window.scrollY + vh / 2;
      for (const l of layers) {
        const d = l.mid - mid;
        if (Math.abs(d) > vh * 1.2) continue;      // far off screen: leave it alone
        l.el.style.setProperty('--sy', `${(-d * l.k).toFixed(1)}px`);
      }
    };

    const tick = () => {
      x += (tx - x) * 0.1; y += (ty - y) * 0.1;
      root.style.setProperty('--ab-x', `${(x * 3).toFixed(2)}px`);
      root.style.setProperty('--ab-y', `${(y * 2).toFixed(2)}px`);
      apply();
      const settled = Math.abs(tx - x) < 0.002 && Math.abs(ty - y) < 0.002;
      if (settled && ++idle > 12) { raf = 0; return; }   // stop until something happens again
      if (!settled) idle = 0;
      raf = requestAnimationFrame(tick);
    };
    const wake = () => { idle = 0; if (!raf) raf = requestAnimationFrame(tick); };

    const onMove = (e: PointerEvent) => {
      tx = (e.clientX / window.innerWidth - 0.5) * 2;
      ty = (e.clientY / window.innerHeight - 0.5) * 2;
      const el = (e.target as Element | null)?.closest?.('.ph-glass') as HTMLElement | null;
      if (el) {
        const r = el.getBoundingClientRect();
        el.style.setProperty('--mx', `${e.clientX - r.left}px`);
        el.style.setProperty('--my', `${e.clientY - r.top}px`);
      }
      wake();
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('scroll', wake, { passive: true });
    window.addEventListener('resize', measure, { passive: true });
    measure();

    // images and videos change the page height as they load: re-measure when it settles
    let t = 0;
    const ro = new ResizeObserver(() => { clearTimeout(t); t = window.setTimeout(measure, 150); });
    ro.observe(document.body);

    return () => {
      cancelAnimationFrame(raf); clearTimeout(t); ro.disconnect();
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('scroll', wake);
      window.removeEventListener('resize', measure);
    };
  }, []);
  return null;
}
