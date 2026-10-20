import React from 'react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import About from './About';
import { experienceData } from '../../data/education';

function renderAbout() {
  return render(<MemoryRouter><About /></MemoryRouter>);
}

test('hero shows the name as the only h1', () => {
  renderAbout();
  expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
  expect(screen.getByRole('heading', { level: 1, name: 'Julien Guinot' })).toBeInTheDocument();
});

test('now box lists supervisors', () => {
  renderAbout();
  expect(screen.getByText('Prof. George Fazekas, Elio Quinton')).toBeInTheDocument();
});

test('timeline switches tabs and expands rows', async () => {
  renderAbout();
  const tabs = screen.getByRole('tablist', { name: 'Background' });
  await userEvent.click(within(tabs).getByRole('tab', { name: 'Experience' }));
  expect(within(tabs).getByRole('tab', { name: 'Experience' })).toHaveAttribute('aria-selected', 'true');
  const firstRole = experienceData[0].title;
  const row = screen.getByRole('button', { name: new RegExp(firstRole.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')) });
  await userEvent.click(row);
  expect(row).toHaveAttribute('aria-expanded', 'true');
});

test('portrait has alt text', () => {
  renderAbout();
  expect(screen.getByAltText('Julien Guinot')).toBeInTheDocument();
});
