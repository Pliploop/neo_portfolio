import React from 'react';
import { render, screen } from '@testing-library/react';
import ErrorBoundary from './ErrorBoundary';

function Boom() { throw new Error('chunk 404'); }

test('shows a reload link instead of a blank page when a page fails', () => {
  vi.spyOn(console, 'error').mockImplementation(() => {});
  render(<ErrorBoundary><Boom /></ErrorBoundary>);
  expect(screen.getByRole('heading', { name: /did not load/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /reload/i })).toHaveAttribute('href', window.location.pathname);
  console.error.mockRestore();
});

test('renders children when nothing throws', () => {
  render(<ErrorBoundary><p>fine</p></ErrorBoundary>);
  expect(screen.getByText('fine')).toBeInTheDocument();
});
