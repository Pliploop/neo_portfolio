import React, { useRef } from 'react';
import { render, renderHook, act } from '@testing-library/react';
import { useReducedMotion } from './useReducedMotion';
import { useCssColors } from './useCssColors';
import { useFxCanvas } from '../fx/useFxCanvas';
import * as loop from '../fx/fxLoop';
import { __resetMotion } from './useMotion';

afterEach(() => { globalThis.__setReducedMotion(false); vi.restoreAllMocks(); });

test('useReducedMotion follows the media query', () => {
  const { result } = renderHook(() => useReducedMotion());
  expect(result.current).toBe(false);
  act(() => globalThis.__setReducedMotion(true));
  expect(result.current).toBe(true);
});

test('useCssColors re-reads when the html class changes', async () => {
  document.documentElement.style.setProperty('--ink', '20 20 20');
  const { result } = renderHook(() => useCssColors(['--ink']));
  expect(result.current[0]).toEqual([20, 20, 20]);
  document.documentElement.style.setProperty('--ink', '239 235 227');
  await act(async () => {
    document.documentElement.classList.add('dark');
    await Promise.resolve();
  });
  expect(result.current[0]).toEqual([239, 235, 227]);
  document.documentElement.classList.remove('dark');
});

function Probe({ draw, opts }) {
  const ref = useRef(null);
  useFxCanvas(ref, draw, opts);
  return <canvas ref={ref} />;
}

test('useFxCanvas subscribes when animating and in view', () => {
  const spy = vi.spyOn(loop, 'subscribe').mockImplementation(() => () => {});
  render(<Probe draw={() => {}} opts={{ fps: 12 }} />);
  expect(spy).toHaveBeenCalledWith(expect.any(Function), 12);
});

test('useFxCanvas keeps animating under reduced motion, slower (calm mode)', () => {
  globalThis.__setReducedMotion(true);
  let frame;
  const spy = vi.spyOn(loop, 'subscribe').mockImplementation((fn) => { frame = fn; return () => {}; });
  const draw = vi.fn();
  render(<Probe draw={draw} opts={{ fps: 20 }} />);
  expect(spy).toHaveBeenCalledWith(expect.any(Function), 10);
  frame(10);
  expect(draw).toHaveBeenLastCalledWith(4, { width: 320, height: 160 });
});

test('useFxCanvas draws one static frame when the visitor paused motion', () => {
  localStorage.setItem('motion', 'paused');
  __resetMotion();
  const spy = vi.spyOn(loop, 'subscribe');
  const draw = vi.fn();
  render(<Probe draw={draw} opts={{}} />);
  expect(spy).not.toHaveBeenCalled();
  expect(draw).toHaveBeenCalledWith(0, { width: 320, height: 160 });
  localStorage.clear();
  __resetMotion();
});

test('useFxCanvas draws once and does not loop when inactive', () => {
  const spy = vi.spyOn(loop, 'subscribe');
  const draw = vi.fn();
  render(<Probe draw={draw} opts={{ active: false }} />);
  expect(spy).not.toHaveBeenCalled();
  expect(draw).toHaveBeenCalledTimes(1);
});
