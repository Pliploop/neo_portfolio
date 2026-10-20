import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import Music from './Music';
import { fonkey, commuz } from '../../data/music';

const renderPage = () => render(<MemoryRouter><Music /></MemoryRouter>);

test('h1 and no third-party iframes before interaction', () => {
  renderPage();
  expect(screen.getByRole('heading', { level: 1, name: 'Music' })).toBeInTheDocument();
  expect(document.querySelectorAll('iframe')).toHaveLength(0);
});

test('fonkey setlist switches the active track', async () => {
  renderPage();
  const second = screen.getByRole('button', { name: new RegExp(`^${fonkey.tracks[1].title}`) });
  await userEvent.click(second);
  expect(second).toHaveAttribute('aria-pressed', 'true');
  expect(screen.getByText(new RegExp(`${fonkey.tracks[1].original} cover`))).toBeInTheDocument();
});

test('fonkey next wraps around', async () => {
  renderPage();
  const next = screen.getByRole('button', { name: 'Next video' });
  for (let i = 0; i < fonkey.tracks.length; i++) await userEvent.click(next);
  expect(screen.getByRole('button', { name: new RegExp(`^${fonkey.tracks[0].title}`) })).toHaveAttribute('aria-pressed', 'true');
});

test('commuz year tabs show each play', async () => {
  renderPage();
  await userEvent.click(screen.getByRole('tab', { name: commuz.plays[3].year }));
  expect(screen.getByRole('heading', { level: 3, name: commuz.plays[3].title })).toBeInTheDocument();
});
