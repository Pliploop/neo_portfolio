import React from 'react';
import { render } from '@testing-library/react';
import Twinkle from './Twinkle';
import * as loop from '../fx/fxLoop';
import { twinkleFrame, TWINKLE_PEAK } from '../fx/twinkle';
import { __resetMotion } from '../hooks/useMotion';

afterEach(() => { vi.restoreAllMocks(); localStorage.clear(); __resetMotion(); });

test('is decorative, starts on its brightest frame and joins the shared loop', () => {
  const spy = vi.spyOn(loop, 'subscribe').mockImplementation(() => () => {});
  const { container } = render(<><Twinkle size="md" /><Twinkle /></>);
  const [a, b] = container.querySelectorAll('[data-twinkle]');
  expect(a).toHaveAttribute('aria-hidden', 'true');
  expect(a.textContent).toBe(twinkleFrame('md', TWINKLE_PEAK));
  expect(b.textContent).toBe(twinkleFrame('sm', TWINKLE_PEAK));
  expect(spy).toHaveBeenCalledTimes(1);
});

test('stays still when motion is paused', () => {
  localStorage.setItem('motion', 'paused');
  __resetMotion();
  const spy = vi.spyOn(loop, 'subscribe');
  render(<Twinkle />);
  expect(spy).not.toHaveBeenCalled();
});
