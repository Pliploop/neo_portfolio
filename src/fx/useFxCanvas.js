import { useEffect, useRef } from 'react';
import { subscribe } from './fxLoop';
import { useInView } from '../hooks/useInView';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { useElementSize } from '../hooks/useElementSize';

export function useFxCanvas(ref, draw, { fps = 20, animate = true, active = true, deps = [] } = {}) {
  const inView = useInView(ref);
  const reduced = useReducedMotion();
  const size = useElementSize(ref);
  const drawRef = useRef(draw);
  drawRef.current = draw;
  const lastT = useRef(0);

  const looping = animate && active && !reduced && inView;

  useEffect(() => {
    if (!size.width || !size.height) return undefined;
    if (!looping) {
      drawRef.current(reduced ? 0 : lastT.current, size);
      return undefined;
    }
    return subscribe((t) => {
      lastT.current = t;
      drawRef.current(t, size);
    }, fps);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [looping, reduced, size.width, size.height, fps, ...deps]);
}
