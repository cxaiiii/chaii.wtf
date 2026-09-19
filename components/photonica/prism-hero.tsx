'use client';
import { useEffect, useRef } from 'react';
import { ior, SF11, wavelengthRGB } from '@/lib/photonica/optics';

type V = { x: number; y: number };
const sub = (a: V, b: V): V => ({ x: a.x - b.x, y: a.y - b.y });
const add = (a: V, b: V): V => ({ x: a.x + b.x, y: a.y + b.y });
const mul = (a: V, s: number): V => ({ x: a.x * s, y: a.y * s });
const dot = (a: V, b: V) => a.x * b.x + a.y * b.y;
const len = (a: V) => Math.hypot(a.x, a.y);
const norm = (a: V): V => mul(a, 1 / (len(a) || 1));

// Snell refraction of unit direction d at a surface with unit normal n facing the incoming ray.
function refract(d: V, n: V, eta: number): V | null {
  const cosi = -dot(n, d);
  const k = 1 - eta * eta * (1 - cosi * cosi);
  if (k < 0) return null; // total internal reflection
  return norm(add(mul(d, eta), mul(n, eta * cosi - Math.sqrt(k))));
}
const reflect = (d: V, n: V): V => sub(d, mul(n, 2 * dot(d, n)));

// Ray / segment intersection: returns distance along the ray, or Infinity.
function hitSeg(o: V, d: V, a: V, b: V): number {
  const e = sub(b, a), den = d.x * e.y - d.y * e.x;
  if (Math.abs(den) < 1e-9) return Infinity;
  const w = sub(a, o);
  const t = (w.x * e.y - w.y * e.x) / den, u = (w.x * d.y - w.y * d.x) / den;
  return t > 1e-6 && u >= 0 && u <= 1 ? t : Infinity;
}

const LAMBDAS = Array.from({ length: 48 }, (_, i) => 400 + (300 * i) / 47);
const N = LAMBDAS.map((l) => ior(SF11, l));
const RGB = LAMBDAS.map((l) => wavelengthRGB(l));

type Path = { pts: V[]; seg: number[]; n: number[] }; // polyline, segment lengths, index per segment

export default function PrismHero() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current!;
    const ctx = cv.getContext('2d')!;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let w = 0, h = 0, dpr = 1, raf = 0, visible = true, last = performance.now();
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
    const photons: { k: number; s: number }[] = [];

    const resize = () => {
      const r = cv.getBoundingClientRect();
      dpr = Math.min(2, window.devicePixelRatio || 1);
      w = r.width; h = r.height;
      cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr);
    };
    resize();
    const ro = new ResizeObserver(resize); ro.observe(cv);
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; }); io.observe(cv);
    const onMove = (e: PointerEvent) => { pointer.tx = (e.clientX / window.innerWidth) * 2 - 1; pointer.ty = (e.clientY / window.innerHeight) * 2 - 1; };
    window.addEventListener('pointermove', onMove, { passive: true });

    const trace = (tri: V[], o: V, d: V, n: number): Path => {
      const pts = [o], seg: number[] = [], idx: number[] = [];
      let inside = false;
      for (let bounce = 0; bounce < 5; bounce++) {
        let best = Infinity, face = -1;
        for (let i = 0; i < 3; i++) { const t = hitSeg(o, d, tri[i], tri[(i + 1) % 3]); if (t < best) { best = t; face = i; } }
        if (face < 0) break;
        const p = add(o, mul(d, best));
        pts.push(p); seg.push(best); idx.push(inside ? n : 1);
        const e = sub(tri[(face + 1) % 3], tri[face]);
        let nrm = norm({ x: e.y, y: -e.x });
        if (dot(nrm, d) > 0) nrm = mul(nrm, -1);
        const nd = refract(d, nrm, inside ? n : 1 / n);
        if (nd) { d = nd; inside = !inside; } else d = reflect(d, nrm);
        o = p;
        if (!inside) break;
      }
      const far = Math.max(w, h) * 2;
      pts.push(add(o, mul(d, far))); seg.push(far); idx.push(1);
      return { pts, seg, n: idx };
    };

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      if (!visible && !reduced) return;
      const dt = Math.min(0.05, (now - last) / 1000); last = now;
      pointer.x += (pointer.tx - pointer.x) * Math.min(1, dt * 3);
      pointer.y += (pointer.ty - pointer.y) * Math.min(1, dt * 3);

      const narrow = w < 760;
      const s = Math.min(w, h) * (narrow ? 0.34 : 0.3);
      const c: V = { x: w * (narrow ? 0.5 : 0.6), y: h * (narrow ? 0.7 : 0.5) };
      const rot = (reduced ? 0 : Math.sin(now / 5200) * 0.05) + pointer.x * 0.07;
      const R = s / Math.sqrt(3);
      const tri: V[] = [0, 1, 2].map((k) => {
        const a = rot - Math.PI / 2 + (k * 2 * Math.PI) / 3;
        return { x: c.x + R * Math.cos(a), y: c.y + R * Math.sin(a) };
      });
      // aim the beam at the left face near minimum deviation (d-line), nudged by the pointer
      const [apex, , left] = tri;
      const faceMid = add(mul(apex, 0.45), mul(left, 0.55));
      const e = sub(apex, left);
      let inN = norm({ x: e.y, y: -e.x });
      if (dot(inN, sub(c, faceMid)) < 0) inN = mul(inN, -1);
      const inc = (Math.asin(1.7847 * Math.sin(Math.PI / 6)) + pointer.y * 0.05) * -1;
      const d0 = norm({ x: inN.x * Math.cos(inc) - inN.y * Math.sin(inc), y: inN.x * Math.sin(inc) + inN.y * Math.cos(inc) });
      const src = sub(faceMid, mul(d0, Math.max(w, h) * 1.5));

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.globalCompositeOperation = 'source-over';
      ctx.clearRect(0, 0, w, h);

      // optical-table breadboard: a 25 mm hole grid, as on Photonica's bench
      ctx.fillStyle = 'rgba(255,255,255,0.045)';
      const g = 26, ox = (pointer.x * -6) % g, oy = (pointer.y * -6) % g;
      for (let y = oy; y < h; y += g) for (let x = ox; x < w; x += g) { ctx.beginPath(); ctx.arc(x, y, 1.1, 0, 6.283); ctx.fill(); }

      const paths = N.map((n) => trace(tri, src, d0, n));
      ctx.globalCompositeOperation = 'lighter';
      ctx.lineCap = 'round';

      // incoming white beam, emerging from the dark so it never competes with the text
      const p0 = paths[0].pts;
      const fadeFrom = add(p0[1], mul(d0, -Math.min(w * 0.42, 560)));
      for (const [lw, a] of [[18, 0.03], [8, 0.07], [3, 0.35], [1.4, 0.9]] as const) {
        const gr = ctx.createLinearGradient(fadeFrom.x, fadeFrom.y, p0[1].x, p0[1].y);
        gr.addColorStop(0, 'rgba(255,255,255,0)'); gr.addColorStop(1, `rgba(255,255,255,${a})`);
        ctx.strokeStyle = gr; ctx.lineWidth = lw;
        ctx.beginPath(); ctx.moveTo(fadeFrom.x, fadeFrom.y); ctx.lineTo(p0[1].x, p0[1].y); ctx.stroke();
      }
      // inside the glass and the dispersed fan
      paths.forEach((p, i) => {
        const [r, gg, b] = RGB[i];
        for (let k = 1; k < p.pts.length - 1; k++) {
          const last = k === p.pts.length - 2;
          const col = last ? `${r},${gg},${b}` : '255,255,255';
          for (const [lw, a] of (last ? [[14, 0.018], [5, 0.05], [1.6, 0.34]] : [[2, 0.05]]) as [number, number][]) {
            ctx.strokeStyle = `rgba(${col},${a})`; ctx.lineWidth = lw;
            ctx.beginPath(); ctx.moveTo(p.pts[k].x, p.pts[k].y); ctx.lineTo(p.pts[k + 1].x, p.pts[k + 1].y); ctx.stroke();
          }
        }
      });

      // photons: light slows to c/n inside the glass, exactly as in Photonica's time-of-flight mode
      if (!reduced) {
        while (photons.length < 70) photons.push({ k: Math.floor(Math.random() * N.length), s: Math.random() * 2400 });
        const speed = 520;
        for (const ph of photons) {
          const p = paths[ph.k];
          let s = ph.s, i = 0;
          while (i < p.seg.length && s > p.seg[i]) { s -= p.seg[i]; i++; }
          const n = p.n[Math.min(i, p.n.length - 1)];
          ph.s += (speed / n) * dt;
          if (i >= p.seg.length || ph.s > 3200) { ph.s = 0; ph.k = Math.floor(Math.random() * N.length); continue; }
          const a = p.pts[i], b = p.pts[i + 1];
          const q = add(a, mul(norm(sub(b, a)), s));
          const col = i >= p.pts.length - 2 ? RGB[ph.k].join(',') : '255,255,255';
          const fade = i === 0 ? Math.max(0, Math.min(1, 1 - len(sub(p.pts[1], q)) / Math.min(w * 0.42, 560))) : 1;
          if (fade <= 0) continue;
          const grd = ctx.createRadialGradient(q.x, q.y, 0, q.x, q.y, 7);
          grd.addColorStop(0, `rgba(${col},${0.9 * fade})`); grd.addColorStop(1, `rgba(${col},0)`);
          ctx.fillStyle = grd; ctx.beginPath(); ctx.arc(q.x, q.y, 7, 0, 6.283); ctx.fill();
        }
      }

      // the prism itself: glass body, bright edges, a sliver of specular
      ctx.globalCompositeOperation = 'source-over';
      const body = ctx.createLinearGradient(tri[2].x, tri[2].y, tri[1].x, tri[0].y);
      body.addColorStop(0, 'rgba(180,210,255,0.10)'); body.addColorStop(1, 'rgba(255,255,255,0.03)');
      ctx.fillStyle = body; ctx.strokeStyle = 'rgba(230,240,255,0.55)'; ctx.lineWidth = 1.2; ctx.lineJoin = 'round';
      ctx.beginPath(); ctx.moveTo(tri[0].x, tri[0].y); ctx.lineTo(tri[1].x, tri[1].y); ctx.lineTo(tri[2].x, tri[2].y); ctx.closePath(); ctx.fill(); ctx.stroke();
      ctx.strokeStyle = 'rgba(255,255,255,0.8)'; ctx.lineWidth = 1.6;
      ctx.beginPath(); ctx.moveTo(tri[0].x, tri[0].y); ctx.lineTo(add(tri[0], mul(sub(tri[2], tri[0]), 0.35)).x, add(tri[0], mul(sub(tri[2], tri[0]), 0.35)).y); ctx.stroke();

      if (reduced) cancelAnimationFrame(raf);
    };
    raf = requestAnimationFrame(frame);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); window.removeEventListener('pointermove', onMove); };
  }, []);

  return <canvas ref={ref} className="ph-hero-canvas" aria-hidden="true" />;
}
