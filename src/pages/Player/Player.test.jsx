import React from 'react';
import { render, screen, act, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Player from './Player';
import { initialPlayerState, playerReducer, formatTime, STEPS } from './playerState';

vi.mock('../../routes', () => ({ preload: () => Promise.resolve(), routes: [] }));

describe('reducer', () => {
  const s0 = initialPlayerState(3);
  test('toggle, next, prev, like', () => {
    let s = playerReducer(s0, { type: 'toggle' });
    expect(s.playing).toBe(true);
    s = playerReducer(s, { type: 'next' });
    expect(s).toMatchObject({ index: 1, playing: false, progress: 0 });
    s = playerReducer(s, { type: 'next' });
    s = playerReducer(s, { type: 'next' });
    expect(s.index).toBe(2);
    s = playerReducer(s, { type: 'like' });
    expect(s.liked).toEqual([false, false, true]);
    s = playerReducer(s, { type: 'prev' });
    expect(s.index).toBe(1);
    expect(s0.liked).toEqual([false, false, false]);
  });
  test('ticks only while playing and ends at STEPS', () => {
    let s = playerReducer(s0, { type: 'tick' });
    expect(s.progress).toBe(0);
    s = playerReducer(s0, { type: 'toggle' });
    for (let i = 0; i < STEPS + 5; i++) s = playerReducer(s, { type: 'tick' });
    expect(s).toMatchObject({ progress: STEPS, ended: true, playing: false });
    expect(playerReducer(s, { type: 'toggle' })).toBe(s);
  });
  test('formatTime', () => {
    expect(formatTime(0)).toBe('0:00');
    expect(formatTime(75.4)).toBe('1:15');
    expect(formatTime(-3)).toBe('0:00');
  });
});

describe('component', () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  function renderPlayer() {
    return render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<Player />} />
          <Route path="/about" element={<h1>About page</h1>} />
        </Routes>
      </MemoryRouter>,
    );
  }

  test('play runs to the end and navigates to /about exactly once', async () => {
    renderPlayer();
    fireEvent.click(screen.getByRole('button', { name: 'Play' }));
    await act(async () => { vi.advanceTimersByTime(2500); });
    await act(async () => { vi.advanceTimersByTime(600); });
    await act(async () => { await Promise.resolve(); await Promise.resolve(); });
    expect(screen.getByText('About page')).toBeInTheDocument();
  });

  test('space toggles play, arrows change line', () => {
    renderPlayer();
    expect(screen.getByText('Hey!')).toBeInTheDocument();
    fireEvent.keyDown(window, { key: 'ArrowRight' });
    expect(screen.getByText('This page is interactive.')).toBeInTheDocument();
    fireEvent.keyDown(window, { key: ' ' });
    expect(screen.getByRole('button', { name: 'Pause' })).toBeInTheDocument();
  });

  test('unmounting mid-playback clears timers', () => {
    const { unmount } = renderPlayer();
    fireEvent.click(screen.getByRole('button', { name: 'Play' }));
    unmount();
    expect(vi.getTimerCount()).toBe(0);
  });
});
