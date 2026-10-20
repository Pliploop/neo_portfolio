import { renderHook, act } from '@testing-library/react';
import { useMotion, __resetMotion } from './useMotion';

beforeEach(() => {
  localStorage.clear();
  document.documentElement.classList.remove('motion-paused');
  __resetMotion();
});
afterEach(() => globalThis.__setReducedMotion(false));

test('plays by default, even when the OS asks for reduced motion (calm mode)', () => {
  globalThis.__setReducedMotion(true);
  const { result } = renderHook(() => useMotion());
  expect(result.current.paused).toBe(false);
  expect(result.current.calm).toBe(true);
});

test('pause is shared, persisted and reflected on <html>', () => {
  const a = renderHook(() => useMotion());
  const b = renderHook(() => useMotion());
  act(() => a.result.current.togglePaused());
  expect(b.result.current.paused).toBe(true);
  expect(localStorage.getItem('motion')).toBe('paused');
  expect(document.documentElement).toHaveClass('motion-paused');
  act(() => a.result.current.togglePaused());
  expect(b.result.current.paused).toBe(false);
  expect(localStorage.getItem('motion')).toBe('on');
});

test('restores a stored pause', () => {
  localStorage.setItem('motion', 'paused');
  __resetMotion();
  const { result } = renderHook(() => useMotion());
  expect(result.current.paused).toBe(true);
});
