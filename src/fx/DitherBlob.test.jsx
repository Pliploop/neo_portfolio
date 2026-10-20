import React from 'react';
import { render } from '@testing-library/react';
import DitherBlob from './DitherBlob';

test('layers an ASCII field over the dither, both decorative', () => {
  const { container } = render(<DitherBlob seed={11} />);
  const canvases = container.querySelectorAll('canvas');
  expect(canvases).toHaveLength(2);
  canvases.forEach((c) => expect(c).toHaveAttribute('aria-hidden', 'true'));
});
