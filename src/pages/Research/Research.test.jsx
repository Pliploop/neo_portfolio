import React from 'react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import Research from './Research';
import { papers } from '../../data/papers';
import { filterPapers, featuredPapers } from '../../data/paperUtils';

const renderPage = () => render(<MemoryRouter><Research /></MemoryRouter>);

test('h1 and featured cards', () => {
  renderPage();
  expect(screen.getByRole('heading', { level: 1, name: 'Research' })).toBeInTheDocument();
  featuredPapers(papers).forEach((p) => expect(screen.getByRole('heading', { level: 3, name: p.title })).toBeInTheDocument());
});

test('filter buttons change the list', async () => {
  renderPage();
  const list = screen.getByRole('list', { name: 'Publications' });
  expect(within(list).getAllByRole('listitem')).toHaveLength(filterPapers(papers, 'all').length);
  await userEvent.click(screen.getByRole('button', { name: 'Journal' }));
  expect(screen.getByRole('button', { name: 'Journal' })).toHaveAttribute('aria-pressed', 'true');
  expect(within(list).getAllByRole('listitem')).toHaveLength(filterPapers(papers, 'journal').length);
});

test('empty filter shows a message', async () => {
  renderPage();
  const empty = ['all', '2025', '2024', 'oral', 'award', 'journal'].find((f) => filterPapers(papers, f).length === 0);
  if (!empty) return;
  await userEvent.click(screen.getByRole('button', { name: new RegExp(`^${empty}$`, 'i') }));
  expect(screen.getByText(/no publications match/i)).toBeInTheDocument();
});

test('abstract toggle on featured card', async () => {
  renderPage();
  const [first] = screen.getAllByRole('button', { name: /abstract/i });
  await userEvent.click(first);
  expect(first).toHaveAttribute('aria-expanded', 'true');
});
