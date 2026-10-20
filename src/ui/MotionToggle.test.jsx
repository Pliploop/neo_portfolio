import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MotionToggle from './MotionToggle';
import { __resetMotion } from '../hooks/useMotion';

beforeEach(() => { localStorage.clear(); __resetMotion(); });

test('pauses and resumes all animation', async () => {
  render(<MotionToggle />);
  const btn = screen.getByRole('button', { name: 'Pause animations' });
  expect(btn).toHaveAttribute('aria-pressed', 'false');
  await userEvent.click(btn);
  expect(screen.getByRole('button', { name: 'Play animations' })).toHaveAttribute('aria-pressed', 'true');
  expect(document.documentElement).toHaveClass('motion-paused');
});
