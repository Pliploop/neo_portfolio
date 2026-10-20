import React from 'react';
import { render, act } from '@testing-library/react';
import DitherField from './DitherField';
import { renderDither } from './glRenderer';

vi.mock('./glRenderer', () => ({ PENDING: 'pending', hasWebGL: () => true, renderDither: vi.fn() }));

test('a static field retries once the shader finishes compiling', async () => {
  vi.useFakeTimers();
  globalThis.__setReducedMotion(true);
  const drawImage = vi.fn();
  const original = HTMLCanvasElement.prototype.getContext;
  HTMLCanvasElement.prototype.getContext = () => ({ drawImage, putImageData() {}, imageSmoothingEnabled: true });
  const glCanvas = {};
  renderDither.mockReturnValueOnce('pending').mockReturnValue(glCanvas);

  render(<DitherField seed={2} />);
  expect(drawImage).not.toHaveBeenCalled();
  await act(async () => { vi.advanceTimersByTime(200); });
  expect(drawImage).toHaveBeenCalledWith(glCanvas, 0, 0);

  HTMLCanvasElement.prototype.getContext = original;
  globalThis.__setReducedMotion(false);
  vi.useRealTimers();
});
