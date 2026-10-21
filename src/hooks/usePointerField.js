import { useEffect, useRef } from 'react';

// Pointer position over an element, normalised to [0,1], kept in a ref so drawing code can read
// it every frame without re-rendering. target is 1 while the pointer is over the element.
export function usePointerField(ref) {
  const pointer = useRef({ x: 0.5, y: 0.5, target: 0, s: 0 });

  useEffect(() => {
    const onMove = (e) => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      if (!r.width || !r.height) return;
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      const inside = x >= 0 && x <= 1 && y >= 0 && y <= 1;
      pointer.current = { ...pointer.current, x: inside ? x : pointer.current.x, y: inside ? y : pointer.current.y, target: inside ? 1 : 0 };
    };
    const release = () => { pointer.current = { ...pointer.current, target: 0 }; };
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('blur', release);
    document.addEventListener('pointerleave', release);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('blur', release);
      document.removeEventListener('pointerleave', release);
    };
  }, [ref]);

  return pointer;
}
