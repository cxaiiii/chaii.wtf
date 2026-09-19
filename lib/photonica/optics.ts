// The same dispersion data Photonica itself uses (Schott Sellmeier coefficients, x = wavelength in µm).
export type Glass = { name: string; B: [number, number, number]; C: [number, number, number] };

export const BK7: Glass = { name: 'BK7', B: [1.03961212, 0.231792344, 1.01046945], C: [0.00600069867, 0.0200179144, 103.560653] };
export const SF11: Glass = { name: 'SF11', B: [1.73759695, 0.313747346, 1.89878101], C: [0.013188707, 0.0623068142, 155.23629] };

export function ior(g: Glass, nm: number): number {
  const x = (nm / 1000) ** 2;
  let n2 = 1;
  for (let i = 0; i < 3; i++) n2 += (g.B[i] * x) / (x - g.C[i]);
  return Math.sqrt(n2);
}

// Minimum deviation of a prism with apex angle A (degrees): 2·asin(n·sin(A/2)) − A.
export function minDeviation(n: number, apexDeg: number): number {
  const A = (apexDeg * Math.PI) / 180;
  return ((2 * Math.asin(Math.min(1, n * Math.sin(A / 2))) - A) * 180) / Math.PI;
}

// Visible wavelength -> sRGB (after Dan Bruton), intensity falls off at the ends of the eye's range.
export function wavelengthRGB(nm: number): [number, number, number] {
  let r = 0, g = 0, b = 0;
  if (nm >= 380 && nm < 440) { r = -(nm - 440) / 60; b = 1; }
  else if (nm < 490) { g = (nm - 440) / 50; b = 1; }
  else if (nm < 510) { g = 1; b = -(nm - 510) / 20; }
  else if (nm < 580) { r = (nm - 510) / 70; g = 1; }
  else if (nm < 645) { r = 1; g = -(nm - 645) / 65; }
  else if (nm <= 780) { r = 1; }
  let f = 1;
  if (nm < 420) f = 0.3 + (0.7 * (nm - 380)) / 40;
  else if (nm > 700) f = 0.3 + (0.7 * (780 - nm)) / 80;
  const c = (v: number) => Math.round(255 * Math.pow(Math.max(0, v * f), 0.8));
  return [c(r), c(g), c(b)];
}

export const C_KM_S = 299792.458;
