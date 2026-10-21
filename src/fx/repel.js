// Pointer repulsion shared by the shader and the CPU paths (keep in sync with glRenderer.js).
// radius: falloff in field units; push: fraction of the way each sample is pulled toward the
// pointer (< 1, so samples never cross it and the image never folds); hole: how much the field
// thins right under the pointer.
export const REPEL = { radius: 0.2, push: 0.6, hole: 0.85, ease: 0.12 };

export function repel(x, y, aspect, mouse) {
  if (!mouse || !mouse.s) return { x, y, k: 1 };
  const dx = (x - mouse.x) * aspect;
  const dy = y - mouse.y;
  const d = Math.hypot(dx, dy);
  const f = mouse.s * Math.exp(-(d * d) / (REPEL.radius * REPEL.radius));
  const pull = f * REPEL.push;
  return { x: x - (x - mouse.x) * pull, y: y - (y - mouse.y) * pull, k: 1 - f * REPEL.hole };
}

// Per-frame easing so the field parts smoothly on hover and settles back after.
export function easeStrength(current, target) {
  const next = current + (target - current) * REPEL.ease;
  return Math.abs(next - target) < 1e-3 ? target : next;
}
