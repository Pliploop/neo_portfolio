import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DropCapHeading from './DropCapHeading';
import Expandable from './Expandable';
import Embed from './Embed';
import { youtubeId, youtubeEmbed, soundcloudEmbed } from './embeds';

test('DropCapHeading keeps the full accessible name', () => {
  render(<DropCapHeading level={1} text="Julien Guinot" caps={['zighead', 'saint']} accentWord={0} />);
  expect(screen.getByRole('heading', { level: 1, name: 'Julien Guinot' })).toBeInTheDocument();
});

test('Expandable toggles aria-expanded and inertness', async () => {
  render(<Expandable summary="Row">Body text</Expandable>);
  const btn = screen.getByRole('button', { name: /row/i });
  const region = document.getElementById(btn.getAttribute('aria-controls'));
  expect(btn).toHaveAttribute('aria-expanded', 'false');
  expect(region).toHaveAttribute('inert');
  await userEvent.click(btn);
  expect(btn).toHaveAttribute('aria-expanded', 'true');
  expect(region).not.toHaveAttribute('inert');
});

test('Embed loads its iframe only after a click', async () => {
  render(<Embed src="https://example.com/e" title="Clip" href="https://example.com" />);
  expect(document.querySelector('iframe')).toBeNull();
  await userEvent.click(screen.getByRole('button', { name: /play clip/i }));
  expect(document.querySelector('iframe')).toHaveAttribute('src', 'https://example.com/e');
  expect(screen.getByRole('link', { name: /open/i })).toHaveAttribute('href', 'https://example.com');
});

test('youtube helpers', () => {
  expect(youtubeId('https://youtu.be/bPJmExJGmmU?si=x')).toBe('bPJmExJGmmU');
  expect(youtubeId('https://www.youtube.com/watch?v=MUyIXcaW89s&ab_channel=F')).toBe('MUyIXcaW89s');
  expect(youtubeId('https://example.com')).toBeNull();
  expect(youtubeEmbed('https://youtu.be/bPJmExJGmmU')).toBe('https://www.youtube-nocookie.com/embed/bPJmExJGmmU?autoplay=1');
});

test('soundcloud helper encodes the track url', () => {
  const src = soundcloudEmbed('https://soundcloud.com/jujgui/aztecs');
  expect(src).toContain('url=https%3A%2F%2Fsoundcloud.com%2Fjujgui%2Faztecs');
  expect(src).toContain('auto_play=true');
});
