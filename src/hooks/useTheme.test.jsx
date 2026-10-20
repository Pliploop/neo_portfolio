import { renderHook, act } from '@testing-library/react';
import { useTheme, initialTheme } from './useTheme';

beforeEach(() => {
  localStorage.clear();
  document.documentElement.classList.remove('dark');
});

test('defaults to light when nothing stored and system is light', () => {
  expect(initialTheme()).toBe('light');
});

test('uses stored theme', () => {
  localStorage.setItem('theme', 'dark');
  expect(initialTheme()).toBe('dark');
});

test('toggle flips html class and persists', () => {
  const { result } = renderHook(() => useTheme());
  act(() => result.current.toggle());
  expect(result.current.isDark).toBe(true);
  expect(document.documentElement).toHaveClass('dark');
  expect(localStorage.getItem('theme')).toBe('dark');
  act(() => result.current.toggle());
  expect(document.documentElement).not.toHaveClass('dark');
  expect(localStorage.getItem('theme')).toBe('light');
});

test('survives localStorage throwing', () => {
  const get = vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => { throw new Error('blocked'); });
  const set = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => { throw new Error('blocked'); });
  const { result } = renderHook(() => useTheme());
  expect(result.current.theme).toBe('light');
  act(() => result.current.toggle());
  expect(document.documentElement).toHaveClass('dark');
  get.mockRestore();
  set.mockRestore();
});
