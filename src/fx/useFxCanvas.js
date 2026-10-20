import { useEffect, useRef } from 'react';
import { subscribe } from './fxLoop';
import { useInView } from '../hooks/useInView';
import { useElementSize } from '../hooks/useElementSize';
import { useMotion } from '../hooks/useMotion';

// Reduced-motion visitors get the same effects, slower and at a lower frame rate.
const CALM_SPEED = 0.4;
const CALM_FPS_FACTOR = 0.5;

export function useFxCanvas(ref, draw, { fps = 20, animate = true, active = true, deps = [] } = {}) {
  const inView = useInView(ref);
  const { paused, calm } = useMotion();
  const size = useElementSize(ref);
  const drawRef = useRef(draw);
  drawRef.current = draw;
  const lastT = useRef(0);

  const looping = animate && active && !paused && inView;
  const speed = calm ? CALM_SPEED : 1;
  const rate = Math.max(1, Math.round(calm ? fps * CALM_FPS_FACTOR : fps));

  useEffect(() => {
    if (!size.width || !size.height) return undefined;
    if (!looping) {
      drawRef.current(paused ? 0 : lastT.current, size);
      return undefined;
    }
    return subscribe((t) => {
      lastT.current = t * speed;
      drawRef.current(lastT.current, size);
    }, rate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [looping, paused, speed, rate, size.width, size.height, ...deps]);
}
