import React, { useEffect, useState } from 'react';
import { render, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Layout from './Layout';

function LatePage() {
  const [ready, setReady] = useState(false);
  useEffect(() => { const id = setTimeout(() => setReady(true), 300); return () => clearTimeout(id); }, []);
  return ready ? <section id="contact">contact</section> : <p>loading</p>;
}

test('scrolls to a hash target that only appears after the page mounts', async () => {
  vi.useFakeTimers();
  const scroll = vi.fn();
  Element.prototype.scrollIntoView = scroll;
  render(<MemoryRouter initialEntries={['/about#contact']}><Layout><LatePage /></Layout></MemoryRouter>);
  expect(scroll).not.toHaveBeenCalled();
  await act(async () => { vi.advanceTimersByTime(350); });
  await act(async () => { vi.advanceTimersByTime(300); });
  expect(scroll).toHaveBeenCalledTimes(1);
  vi.useRealTimers();
});
