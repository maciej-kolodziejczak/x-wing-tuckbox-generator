export function mmToPx(v: number): number {
  return v * 3.779527559;
}

export function scale(v: number, s: number): number {
  return mmToPx(v) * s;
}
