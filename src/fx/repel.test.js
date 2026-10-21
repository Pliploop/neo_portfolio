import { repel, easeStrength, REPEL } from './repel';

test('no pointer means no change', () => {
  expect(repel(0.3, 0.4, 1, null)).toEqual({ x: 0.3, y: 0.4, k: 1 });
  expect(repel(0.3, 0.4, 1, { x: 0.3, y: 0.4, s: 0 })).toEqual({ x: 0.3, y: 0.4, k: 1 });
});

test('right under the pointer the field is hollowed out', () => {
  const r = repel(0.5, 0.5, 1, { x: 0.5, y: 0.5, s: 1 });
  expect(r.k).toBeCloseTo(1 - REPEL.hole);
});

test('nearby points sample from closer to the pointer, so content is pushed outward', () => {
  const r = repel(0.6, 0.5, 1, { x: 0.5, y: 0.5, s: 1 });
  expect(r.x).toBeLessThan(0.6);
  expect(r.x).toBeGreaterThan(0.5);
  expect(r.y).toBeCloseTo(0.5);
});

test('far from the pointer nothing moves', () => {
  const r = repel(0.95, 0.95, 1, { x: 0.05, y: 0.05, s: 1 });
  expect(r.x).toBeCloseTo(0.95, 3);
  expect(r.k).toBeCloseTo(1, 3);
});

test('strength eases toward its target and back', () => {
  let s = 0;
  for (let i = 0; i < 30; i++) s = easeStrength(s, 1);
  expect(s).toBeGreaterThan(0.95);
  for (let i = 0; i < 60; i++) s = easeStrength(s, 0);
  expect(s).toBeLessThan(0.05);
});
