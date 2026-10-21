import React, { useEffect, useMemo, useRef } from 'react';
import { addTwinkle, twinkleFrame, TWINKLE_PEAK, TWINKLE_STEPS } from '../fx/twinkle';
import { useMotion } from '../hooks/useMotion';
import { useInView } from '../hooks/useInView';

const CALM_SPEED = 0.4;

// Small animated ASCII star. size "sm" is one glyph, "md" a 3x3 cross.
export default function Twinkle({ size = 'sm', phase, speed = 1, className = '' }) {
  const ref = useRef(null);
  const { paused, calm } = useMotion();
  const inView = useInView(ref);
  const offset = useMemo(() => phase ?? Math.floor(Math.random() * TWINKLE_STEPS), [phase]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (paused || !inView) {
      el.textContent = twinkleFrame(size, TWINKLE_PEAK);
      return undefined;
    }
    return addTwinkle({ el, size, phase: offset, speed: calm ? speed * CALM_SPEED : speed });
  }, [paused, calm, inView, size, offset, speed]);

  return (
    <span
      ref={ref}
      data-twinkle
      aria-hidden="true"
      className={`inline-block font-mono whitespace-pre text-accent select-none pointer-events-none ${size === 'md' ? 'text-[11px] leading-[0.95]' : 'text-[13px] leading-none'} ${className}`}
    >
      {twinkleFrame(size, TWINKLE_PEAK)}
    </span>
  );
}
