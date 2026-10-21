import { easeStrength } from './repel';

// Advances the eased repulsion strength stored in a usePointerField ref and returns the mouse
// uniform for this frame (null when the field is at rest).
export function nextMouse(pointer) {
  const p = pointer.current;
  const s = easeStrength(p.s, p.target);
  pointer.current = { ...p, s };
  return s > 0 ? { x: p.x, y: p.y, s } : null;
}
