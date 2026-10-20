import React from 'react';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { AppRoutes } from './App';
import { preload } from './routes';

async function renderAt(path) {
  await act(async () => { await preload(path); });
  render(<MemoryRouter initialEntries={[path]}><AppRoutes /></MemoryRouter>);
}

test('about page renders nav with current page marked', async () => {
  await renderAt('/about');
  expect(screen.getByRole('heading', { level: 1, name: 'About' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'About' })).toHaveAttribute('aria-current', 'page');
  expect(screen.queryByRole('link', { name: 'Projects' })).toBeNull();
});

test('nav link navigates without full reload', async () => {
  await renderAt('/about');
  await act(async () => { await preload('/academia'); });
  await userEvent.click(screen.getByRole('link', { name: 'Research' }));
  expect(await screen.findByRole('heading', { level: 1, name: 'Research' })).toBeInTheDocument();
});

test('player route hides nav and footer', async () => {
  await renderAt('/');
  expect(screen.queryByRole('navigation', { name: 'Main' })).toBeNull();
  expect(screen.queryByRole('contentinfo')).toBeNull();
});

test('unknown route falls back to about', async () => {
  await act(async () => { await preload('/about'); });
  render(<MemoryRouter initialEntries={['/nope']}><AppRoutes /></MemoryRouter>);
  expect(await screen.findByRole('heading', { level: 1, name: 'About' })).toBeInTheDocument();
});
