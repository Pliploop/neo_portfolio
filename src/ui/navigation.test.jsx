import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { MemoryRouter, useLocation } from 'react-router-dom';
import { useTransitionNavigate } from './navigation';
import { preload } from '../routes';

vi.mock('../routes', () => ({ preload: vi.fn() }));

function deferred() {
  let resolve; let reject;
  const promise = new Promise((res, rej) => { resolve = res; reject = rej; });
  return { promise, resolve, reject };
}

function setup() {
  const wrapper = ({ children }) => <MemoryRouter initialEntries={['/music']}>{children}</MemoryRouter>;
  return renderHook(() => ({ go: useTransitionNavigate(), loc: useLocation() }), { wrapper });
}

afterEach(() => vi.clearAllMocks());

test('a newer navigation wins even if an older preload resolves later', async () => {
  const about = deferred();
  const research = deferred();
  preload.mockImplementation((p) => (p === '/about' ? about.promise : research.promise));
  const { result } = setup();
  let first; let second;
  act(() => { first = result.current.go('/about'); second = result.current.go('/academia'); });
  await act(async () => { research.resolve(); await second; });
  await act(async () => { about.resolve(); await first; });
  expect(result.current.loc.pathname).toBe('/academia');
});

test('a failed preload falls back to a full page load', async () => {
  preload.mockRejectedValue(new Error('chunk 404'));
  const assign = vi.fn();
  vi.stubGlobal('location', { ...window.location, assign });
  vi.spyOn(console, 'error').mockImplementation(() => {});
  const { result } = setup();
  await act(async () => { await result.current.go('/about'); });
  expect(assign).toHaveBeenCalledWith('/about');
  expect(result.current.loc.pathname).toBe('/music');
  vi.unstubAllGlobals();
});
