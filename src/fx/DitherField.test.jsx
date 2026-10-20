import React from 'react';
import { render } from '@testing-library/react';
import DitherField from './DitherField';
import { renderDither } from './glRenderer';
import { __resetMotion } from '../hooks/useMotion';

function pauseMotion() { localStorage.setItem('motion', 'paused'); __resetMotion(); }
afterEach(() => { localStorage.clear(); __resetMotion(); });

test('renderDither returns null when WebGL is unavailable', () => {
  expect(renderDither({ width: 10, height: 10, mode: 'blobs', positions: [], aspect: 1, fg: [0, 0, 0], bg: [255, 255, 255] })).toBeNull();
});

test('DitherField renders a decorative canvas without throwing when no context exists', () => {
  const { container } = render(<DitherField seed={3} />);
  const canvas = container.querySelector('canvas');
  expect(canvas).toHaveAttribute('aria-hidden', 'true');
});

test('DitherField falls back to the CPU path when WebGL is missing', () => {
  const putImageData = vi.fn();
  const original = HTMLCanvasElement.prototype.getContext;
  HTMLCanvasElement.prototype.getContext = function getContext(type) {
    if (type === '2d') return { putImageData, imageSmoothingEnabled: true };
    return null;
  };
  globalThis.ImageData = class { constructor(data, w, h) { this.data = data; this.width = w; this.height = h; } };
  pauseMotion();
  render(<DitherField seed={3} cell={4} />);
  expect(putImageData).toHaveBeenCalled();
  HTMLCanvasElement.prototype.getContext = original;
});

test('gain scales the field: gain 0 draws only the background colour', () => {
  let pixels;
  const original = HTMLCanvasElement.prototype.getContext;
  HTMLCanvasElement.prototype.getContext = function getContext(type) {
    if (type === '2d') return { putImageData: (img) => { pixels = img.data; }, imageSmoothingEnabled: true };
    return null;
  };
  globalThis.ImageData = class { constructor(data, w, h) { this.data = data; this.width = w; this.height = h; } };
  document.documentElement.style.setProperty('--accent', '255 74 28');
  document.documentElement.style.setProperty('--paper', '239 235 227');
  pauseMotion();
  render(<DitherField seed={3} cell={2} gain={0} />);
  const reds = [];
  for (let i = 0; i < pixels.length; i += 4) reds.push(pixels[i]);
  expect(new Set(reds)).toEqual(new Set([239]));
  HTMLCanvasElement.prototype.getContext = original;
});
