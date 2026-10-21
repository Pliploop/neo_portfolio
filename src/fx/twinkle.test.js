import { twinkleFrame, TWINKLE_STEPS } from './twinkle';

test('small twinkles cycle single ASCII glyphs and loop', () => {
  const frames = Array.from({ length: TWINKLE_STEPS }, (_, i) => twinkleFrame('sm', i));
  frames.forEach((f) => expect(f).toHaveLength(1));
  expect(new Set(frames).size).toBeGreaterThan(2);
  expect(twinkleFrame('sm', TWINKLE_STEPS + 3)).toBe(twinkleFrame('sm', 3));
});

test('medium twinkles are 3x3 ASCII stars with a bright peak', () => {
  const frames = Array.from({ length: TWINKLE_STEPS }, (_, i) => twinkleFrame('md', i));
  frames.forEach((f) => {
    const lines = f.split('\n');
    expect(lines).toHaveLength(3);
    lines.forEach((l) => expect(l).toHaveLength(3));
  });
  expect(frames.some((f) => f.includes('*'))).toBe(true);
});

test('negative or fractional steps still give a frame', () => {
  expect(twinkleFrame('sm', -1)).toHaveLength(1);
  expect(twinkleFrame('md', 2.7).split('\n')).toHaveLength(3);
});

test('inline twinkles never go blank, so a badge never shows an empty gap', () => {
  for (let i = 0; i < TWINKLE_STEPS * 2; i++) expect(twinkleFrame('xs', i).trim()).not.toBe('');
});
