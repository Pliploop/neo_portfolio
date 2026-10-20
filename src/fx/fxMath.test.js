import { mulberry32 } from './random';
import { bayerMatrix, bayerThreshold, ditherBit } from './bayer';
import { makeBlobs, blobPositions, fieldAt } from './blobs';
import { RAMP, rampChar, asciiFrame, waveFrame } from './asciiRamp';
import { parseRgbVar } from './color';
import { coverTransform } from './cover';
import { ditherPixels } from './ditherCpu';
import { grainBits } from './grain';
import { ditherMaskBits } from './ditherMasks';

describe('random', () => {
  test('mulberry32 is deterministic and in [0,1)', () => {
    const a = mulberry32(42); const b = mulberry32(42);
    const xs = Array.from({ length: 100 }, () => a());
    expect(xs).toEqual(Array.from({ length: 100 }, () => b()));
    xs.forEach((x) => { expect(x).toBeGreaterThanOrEqual(0); expect(x).toBeLessThan(1); });
  });
});

describe('bayer', () => {
  test('2x2 matrix is the canonical one', () => {
    expect(bayerMatrix(2)).toEqual([[0, 2], [3, 1]]);
  });
  test('8x8 contains each of 0..63 exactly once', () => {
    const flat = bayerMatrix(8).flat().sort((a, b) => a - b);
    expect(flat).toEqual(Array.from({ length: 64 }, (_, i) => i));
  });
  test('threshold is strictly inside (0,1) and tiles', () => {
    expect(bayerThreshold(0, 0)).toBeCloseTo(0.5 / 64);
    expect(bayerThreshold(8, 8)).toBe(bayerThreshold(0, 0));
  });
  test('ditherBit extremes and mid density', () => {
    let on = 0;
    for (let y = 0; y < 8; y++) for (let x = 0; x < 8; x++) {
      expect(ditherBit(0, x, y)).toBe(0);
      expect(ditherBit(1, x, y)).toBe(1);
      on += ditherBit(0.5, x, y);
    }
    expect(on).toBe(32);
  });
});

describe('blobs', () => {
  test('makeBlobs is deterministic per seed', () => {
    expect(makeBlobs(3, 4)).toEqual(makeBlobs(3, 4));
    expect(makeBlobs(3, 4)).not.toEqual(makeBlobs(4, 4));
  });
  test('positions stay inside the unit square', () => {
    const blobs = makeBlobs(1, 6);
    for (let t = 0; t < 60; t += 1.7) {
      blobPositions(blobs, t).forEach((p) => {
        expect(p.x).toBeGreaterThan(0); expect(p.x).toBeLessThan(1);
        expect(p.y).toBeGreaterThan(0); expect(p.y).toBeLessThan(1);
      });
    }
  });
  test('field is 1-capped and peaks at a blob centre', () => {
    const pos = [{ x: 0.5, y: 0.5, r: 0.2 }];
    expect(fieldAt(0.5, 0.5, 1, pos)).toBeCloseTo(1);
    expect(fieldAt(0.0, 0.0, 1, pos)).toBeLessThan(0.01);
    expect(fieldAt(0.5, 0.5, 1, [...pos, ...pos])).toBe(1);
  });
});

describe('ascii', () => {
  test('rampChar maps 0 to space and 1 to last glyph, clamps', () => {
    expect(rampChar(0)).toBe(' ');
    expect(rampChar(1)).toBe('@');
    expect(rampChar(-3)).toBe(' ');
    expect(rampChar(9)).toBe('@');
  });
  test('asciiFrame has the requested shape and only ramp glyphs', () => {
    const lines = asciiFrame({ cols: 20, rows: 6, t: 1, blobs: makeBlobs(2, 3) });
    expect(lines).toHaveLength(6);
    lines.forEach((l) => {
      expect(l).toHaveLength(20);
      [...l].forEach((c) => expect(RAMP).toContain(c));
    });
  });
  test('waveFrame shape and motion over time', () => {
    const a = waveFrame({ cols: 30, rows: 3, t: 0 });
    const b = waveFrame({ cols: 30, rows: 3, t: 1 });
    expect(a).toHaveLength(3);
    expect(a[0]).toHaveLength(30);
    expect(a).not.toEqual(b);
  });
});

describe('color', () => {
  test('parses space-separated and rgb() forms', () => {
    expect(parseRgbVar(' 239 235 227 ')).toEqual([239, 235, 227]);
    expect(parseRgbVar('rgb(20, 20, 20)')).toEqual([20, 20, 20]);
    expect(parseRgbVar('')).toEqual([0, 0, 0]);
  });
});

describe('cover', () => {
  test('wide image in square box crops horizontally', () => {
    const { scale, offset } = coverTransform(100, 100, 200, 100);
    expect(scale[0]).toBeCloseTo(0.5); expect(scale[1]).toBeCloseTo(1);
    expect(offset[0]).toBeCloseTo(0.25); expect(offset[1]).toBeCloseTo(0);
  });
  test('tall image in square box crops vertically', () => {
    const { scale, offset } = coverTransform(100, 100, 100, 400);
    expect(scale).toEqual([1, 0.25]);
    expect(offset[1]).toBeCloseTo(0.375);
  });
});

describe('cpu dither', () => {
  test('writes fg where value is 1 and bg where 0', () => {
    const px = ditherPixels({ width: 2, height: 1, valueAt: (x) => (x === 0 ? 1 : 0), fg: [1, 2, 3], bg: [9, 9, 9] });
    expect(Array.from(px)).toEqual([1, 2, 3, 255, 9, 9, 9, 255]);
  });
});

describe('grain', () => {
  test('deterministic and roughly half density', () => {
    const g = grainBits(64, 7);
    expect(g).toEqual(grainBits(64, 7));
    const on = g.reduce((s, v) => s + v, 0);
    expect(on / g.length).toBeGreaterThan(0.4);
    expect(on / g.length).toBeLessThan(0.6);
  });
});

describe('dither masks', () => {
  test('level controls the share of visible cells', () => {
    expect(ditherMaskBits(0).every((v) => v === 0)).toBe(true);
    expect(ditherMaskBits(1).every((v) => v === 1)).toBe(true);
    expect(ditherMaskBits(0.5).filter(Boolean)).toHaveLength(32);
  });
});
