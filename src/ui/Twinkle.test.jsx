import React from 'react';
import { render } from '@testing-library/react';
import Twinkle, { STAR_SIZES } from './Twinkle';
import * as loop from '../fx/fxLoop';
import { __resetMotion } from '../hooks/useMotion';

afterEach(() => { vi.restoreAllMocks(); localStorage.clear(); __resetMotion(); });

test('is an ASCII-only star: one animated canvas, no outline, no mask', () => {
  const spy = vi.spyOn(loop, 'subscribe').mockImplementation(() => () => {});
  const { container } = render(<Twinkle size="md" />);
  const star = container.querySelector('[data-twinkle]');
  expect(star).toHaveAttribute('aria-hidden', 'true');
  expect(star.style.width).toBe(`${STAR_SIZES.md}px`);
  expect(star.querySelectorAll('canvas')).toHaveLength(1);
  expect(star.querySelector('svg')).toBeNull();
  expect(star.querySelector('[style*="mask"]')).toBeNull();
  expect(spy).toHaveBeenCalled();
});

test('sizes grow from badge to hero', () => {
  expect(STAR_SIZES.xs).toBeLessThan(STAR_SIZES.sm);
  expect(STAR_SIZES.sm).toBeLessThan(STAR_SIZES.md);
});

test('stays still when motion is paused', () => {
  localStorage.setItem('motion', 'paused');
  __resetMotion();
  const spy = vi.spyOn(loop, 'subscribe');
  render(<Twinkle />);
  expect(spy).not.toHaveBeenCalled();
});

test('can be absolutely positioned by its parent (no competing position class)', () => {
  vi.spyOn(loop, 'subscribe').mockImplementation(() => () => {});
  const { container } = render(<Twinkle className="absolute top-2 right-2" />);
  const cls = container.querySelector('[data-twinkle]').className.split(/\s+/);
  expect(cls).toContain('absolute');
  expect(cls).not.toContain('relative');
});
