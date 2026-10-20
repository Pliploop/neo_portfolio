import React from 'react';
import { render } from '@testing-library/react';
import AsciiField from './AsciiField';
import Grain from './Grain';

function fake2d() {
  return {
    setTransform: vi.fn(), clearRect: vi.fn(), fillText: vi.fn(),
    measureText: () => ({ width: 7 }), font: '', fillStyle: '', textBaseline: '',
  };
}

test('draws one fillText per row', () => {
  globalThis.__setReducedMotion(true);
  const ctx = fake2d();
  const original = HTMLCanvasElement.prototype.getContext;
  HTMLCanvasElement.prototype.getContext = () => ctx;
  render(<AsciiField mode="wave" fontSize={10} />);
  const rows = Math.floor(160 / (10 * 1.15));
  expect(ctx.fillText).toHaveBeenCalledTimes(rows);
  HTMLCanvasElement.prototype.getContext = original;
  globalThis.__setReducedMotion(false);
});

test('ascii canvas is decorative', () => {
  const { container } = render(<AsciiField />);
  expect(container.querySelector('canvas')).toHaveAttribute('aria-hidden', 'true');
});

test('grain renders nothing when canvas is unavailable', () => {
  const { container } = render(<Grain />);
  expect(container.querySelector('[data-grain]')).toBeNull();
});
