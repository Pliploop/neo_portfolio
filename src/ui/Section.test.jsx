import React from 'react';
import { render, screen } from '@testing-library/react';
import Section from './Section';

test('puts the heading in its own column and has no numbered caption', () => {
  const { container } = render(
    <Section id="x" title={<h2>About me</h2>}><p>Body</p></Section>,
  );
  const heading = screen.getByRole('heading', { name: 'About me' });
  const body = screen.getByText('Body');
  expect(heading.parentElement).not.toBe(body.parentElement);
  expect(container.textContent).not.toMatch(/\b0\d\b/);
});

test('without a title the content spans the full grid', () => {
  render(<Section><p>Body</p></Section>);
  expect(screen.getByText('Body').parentElement.className).toContain('col-span-12');
  expect(screen.getByText('Body').parentElement.className).not.toContain('md:col-span-8');
});
