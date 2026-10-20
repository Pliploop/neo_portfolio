import React from 'react';
import { render, screen, act, within } from '@testing-library/react';
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
  expect(screen.getByRole('heading', { level: 1, name: 'Julien Guinot' })).toBeInTheDocument();
  const nav = within(screen.getByRole('navigation', { name: 'Main' }));
  expect(nav.getByRole('link', { name: 'About' })).toHaveAttribute('aria-current', 'page');
  expect(nav.queryByRole('link', { name: 'Projects' })).toBeNull();
});

test('nav link navigates without full reload', async () => {
  await renderAt('/about');
  await act(async () => { await preload('/academia'); });
  await userEvent.click(within(screen.getByRole('navigation', { name: 'Main' })).getByRole('link', { name: 'Research' }));
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
  expect(await screen.findByRole('heading', { level: 1, name: 'Julien Guinot' })).toBeInTheDocument();
});
