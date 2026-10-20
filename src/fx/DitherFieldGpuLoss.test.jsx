import React from 'react';
import { render, act } from '@testing-library/react';
import DitherField from './DitherField';
import * as loop from './fxLoop';

vi.mock('./glRenderer', () => ({ PENDING: 'pending', hasWebGL: () => true, renderDither: () => null }));

test('stops animating and draws a static CPU frame when the GPU stops rendering', async () => {
  const putImageData = vi.fn();
  const original = HTMLCanvasElement.prototype.getContext;
  HTMLCanvasElement.prototype.getContext = () => ({ putImageData, drawImage() {}, imageSmoothingEnabled: true });
  globalThis.ImageData = class { constructor(d, w, h) { this.data = d; this.width = w; this.height = h; } };
  const unsubscribe = vi.fn();
  let frame;
  vi.spyOn(loop, 'subscribe').mockImplementation((fn) => { frame = fn; return unsubscribe; });

  render(<DitherField seed={2} />);
  await act(async () => { frame(1); });

  expect(putImageData).toHaveBeenCalled();
  expect(unsubscribe).toHaveBeenCalled();
  HTMLCanvasElement.prototype.getContext = original;
});
