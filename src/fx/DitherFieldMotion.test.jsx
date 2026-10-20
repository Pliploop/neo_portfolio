import React from 'react';
import { render, act } from '@testing-library/react';
import DitherField from './DitherField';
import * as loop from './fxLoop';
import { hasWebGL, renderDither } from './glRenderer';

vi.mock('./glRenderer', () => ({ PENDING: 'pending', hasWebGL: vi.fn(), renderDither: vi.fn() }));

let original;
beforeEach(() => {
  original = HTMLCanvasElement.prototype.getContext;
  HTMLCanvasElement.prototype.getContext = () => ({
    putImageData() {}, drawImage() {}, getImageData: () => ({ data: new Uint8ClampedArray(4 * 400 * 400) }), imageSmoothingEnabled: true,
  });
  globalThis.ImageData = class { constructor(d, w, h) { this.data = d; this.width = w; this.height = h; } };
});
afterEach(() => { HTMLCanvasElement.prototype.getContext = original; vi.restoreAllMocks(); });

test('without a GPU the dither animates once the page is idle, capped at 10 fps', async () => {
  vi.useFakeTimers();
  hasWebGL.mockReturnValue(false);
  const spy = vi.spyOn(loop, 'subscribe').mockImplementation(() => () => {});
  render(<DitherField seed={4} fps={24} />);
  expect(spy).not.toHaveBeenCalled();
  await act(async () => { vi.advanceTimersByTime(2000); });
  expect(spy).toHaveBeenCalledWith(expect.any(Function), 10);
  vi.useRealTimers();
});

test('the CPU animation stops itself when frames are too slow', async () => {
  hasWebGL.mockReturnValue(false);
  const unsubscribe = vi.fn();
  let frame;
  vi.spyOn(loop, 'subscribe').mockImplementation((fn) => { frame = fn; return unsubscribe; });
  let now = 0;
  vi.spyOn(performance, 'now').mockImplementation(() => { now += 30; return now; });
  vi.useFakeTimers();
  render(<DitherField seed={4} />);
  await act(async () => { vi.advanceTimersByTime(2000); });
  vi.useRealTimers();
  await act(async () => { for (let i = 0; i < 4; i++) frame(i); });
  expect(unsubscribe).toHaveBeenCalled();
});

test('the portrait (image mode) animates on the GPU', async () => {
  hasWebGL.mockReturnValue(true);
  renderDither.mockReturnValue({});
  const spy = vi.spyOn(loop, 'subscribe').mockImplementation(() => () => {});
  const OriginalImage = globalThis.Image;
  globalThis.Image = class { set src(v) { this.naturalWidth = 300; this.naturalHeight = 400; setTimeout(() => this.onload(), 0); } };
  render(<DitherField image="/p.jpg" fg="--ink" />);
  await act(async () => { await new Promise((r) => setTimeout(r, 5)); });
  expect(spy).toHaveBeenCalled();
  globalThis.Image = OriginalImage;
});
