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

test('awards are visible on the paper rows without expanding them', () => {
  renderPage();
  filterPapers(papers, 'all').filter((p) => p.awards?.length).forEach((p) => {
    const row = screen.getByRole('button', { name: new RegExp(p.title.slice(0, 30).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')) });
    p.awards.forEach((a) => expect(within(row).getByText(a)).toBeInTheDocument());
  });
});

test('featured cards show their awards as a badge', () => {
  renderPage();
  featuredPapers(papers).filter((p) => p.awards?.length).forEach((p) => {
    p.awards.forEach((a) => expect(screen.getAllByTestId('award').some((el) => el.textContent.includes(a))).toBe(true));
  });
});

test('featured cards link to the project page and demo when they exist', () => {
  renderPage();
  expect(screen.getAllByRole('link', { name: /project/i }).map((a) => a.getAttribute('href')))
    .toContain('https://pliploop.github.io/sparse-steer-retrieval/');
  expect(screen.getAllByRole('link', { name: /demo/i }).map((a) => a.getAttribute('href')))
    .toContain('https://huggingface.co/spaces/Pliploop/steerable-retrieval');
});

test('a projects section lists the project sites', () => {
  renderPage();
  expect(screen.getByRole('heading', { level: 2, name: 'Projects' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /music lenses/i })).toHaveAttribute('href', 'https://pliploop.github.io/sparse-steer-retrieval/lenses/');
  expect(screen.getByRole('link', { name: /^sparse steerable retrieval/i })).toHaveAttribute('href', 'https://pliploop.github.io/sparse-steer-retrieval/');
});
