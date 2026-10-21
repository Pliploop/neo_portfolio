import { mulberry32 } from './random';
import { bayerMatrix, bayerThreshold, ditherBit } from './bayer';
import { makeBlobs, blobPositions, fieldAt } from './blobs';
import { RAMP, rampChar, asciiFrame, waveFrame } from './asciiRamp';
import { parseRgbVar } from './color';
import { coverTransform } from './cover';
import { ditherPixels } from './ditherCpu';
import { grainBits } from './grainBits';
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

describe('radial fade', () => {
  test('is full at the centre and gone at the edges', async () => {
    const { radialFade } = await import('./blobs');
    expect(radialFade(0.5, 0.5)).toBe(1);
    expect(radialFade(0.5, 0)).toBe(0);
    expect(radialFade(0, 0)).toBe(0);
    const mid = radialFade(0.5, 0.2);
    expect(mid).toBeGreaterThan(0);
    expect(mid).toBeLessThan(1);
  });
});

describe('ascii shimmer', () => {
  const still = [{ ax: 0, ay: 0, fx: 0, fy: 0, phase: 0, radius: 0.3 }];

  test('cellNoise is deterministic and in [0,1)', async () => {
    const { cellNoise } = await import('./asciiRamp');
    expect(cellNoise(3, 4, 7)).toBe(cellNoise(3, 4, 7));
    for (let i = 0; i < 200; i++) {
      const n = cellNoise(i, i * 3, i * 7);
      expect(n).toBeGreaterThanOrEqual(0);
      expect(n).toBeLessThan(1);
    }
  });

  test('without jitter a still field does not change over time', () => {
    const a = asciiFrame({ cols: 30, rows: 10, t: 0, blobs: still });
    const b = asciiFrame({ cols: 30, rows: 10, t: 3, blobs: still });
    expect(a).toEqual(b);
  });

  test('with jitter the characters shimmer even when the field is still', () => {
    const a = asciiFrame({ cols: 30, rows: 10, t: 0, blobs: still, jitter: 0.25 });
    const b = asciiFrame({ cols: 30, rows: 10, t: 3, blobs: still, jitter: 0.25 });
    expect(a).not.toEqual(b);
  });

  test('wave frames shimmer with jitter', () => {
    const a = waveFrame({ cols: 40, rows: 1, t: 0, jitter: 0.3 });
    const b = waveFrame({ cols: 40, rows: 1, t: 0.001, jitter: 0.3 });
    const c = waveFrame({ cols: 40, rows: 1, t: 0.5, jitter: 0.3 });
    expect(a).toEqual(b);
    expect(a).not.toEqual(c);
  });
});

describe('breathing blobs', () => {
  test('radii pulse over time within ±20% of the base radius', () => {
    const blobs = makeBlobs(5, 4);
    const radii = (t) => blobPositions(blobs, t).map((p) => p.r);
    expect(radii(0)).not.toEqual(radii(4));
    for (let t = 0; t < 40; t += 0.9) {
      radii(t).forEach((r, i) => {
        expect(r).toBeGreaterThanOrEqual(blobs[i].radius * 0.8);
        expect(r).toBeLessThanOrEqual(blobs[i].radius * 1.2);
      });
    }
  });
});

describe('ascii over dither', () => {
  test('fade empties the corners like the dither fade does', () => {
    const big = [{ ax: 0, ay: 0, fx: 0, fy: 0, phase: 0, radius: 2 }];
    const plain = asciiFrame({ cols: 20, rows: 10, t: 0, blobs: big });
    const faded = asciiFrame({ cols: 20, rows: 10, t: 0, blobs: big, fade: true });
    expect(plain[0][0]).not.toBe(' ');
    expect(faded[0][0]).toBe(' ');
  });

  test('speed scales time like the dither speed does', () => {
    const blobs = makeBlobs(9, 3);
    expect(asciiFrame({ cols: 20, rows: 8, t: 2, blobs, speed: 2 })).toEqual(asciiFrame({ cols: 20, rows: 8, t: 4, blobs }));
  });
});

describe('ascii flees the pointer', () => {
  test('characters under the pointer thin out', () => {
    const big = [{ ax: 0, ay: 0, fx: 0, fy: 0, phase: 0, radius: 0.6 }];
    const idx = (c) => RAMP.indexOf(c);
    const calm = asciiFrame({ cols: 21, rows: 11, t: 0, blobs: big });
    const fled = asciiFrame({ cols: 21, rows: 11, t: 0, blobs: big, mouse: { x: 0.5, y: 0.5, s: 1 } });
    expect(idx(fled[5][10])).toBeLessThan(idx(calm[5][10]));
    expect(fled[0]).toEqual(calm[0]);
  });
});

test('cpu dither can leave the background transparent', () => {
  const px = ditherPixels({ width: 2, height: 1, valueAt: (x) => (x === 0 ? 1 : 0), fg: [1, 2, 3], bg: [9, 9, 9], bgAlpha: 0 });
  expect(Array.from(px)).toEqual([1, 2, 3, 255, 9, 9, 9, 0]);
});

describe('ascii star', () => {
  test('dense at the centre, blank in the corners, longer along the axes than the diagonals', async () => {
    const { starFrame, starAt } = await import('./asciiRamp');
    const lines = starFrame({ cols: 21, rows: 21, t: 0, cellAspect: 1 });
    expect(lines).toHaveLength(21);
    expect(RAMP.indexOf(lines[10][10])).toBeGreaterThan(RAMP.length - 3);
    expect(lines[0][0]).toBe(' ');
    expect(lines[20][20]).toBe(' ');
    // a point on an arm is brighter than a point at the same distance on the diagonal
    expect(starAt(0.5, 0.2, 0)).toBeGreaterThan(starAt(0.5 - 0.212, 0.5 - 0.212, 0));
  });

  test('breathes over time', async () => {
    const { starFrame } = await import('./asciiRamp');
    expect(starFrame({ cols: 21, rows: 21, t: 0, cellAspect: 1 })).not.toEqual(starFrame({ cols: 21, rows: 21, t: 1.1, cellAspect: 1 }));
  });

  test('parts around the pointer like the blobs', async () => {
    const { starFrame } = await import('./asciiRamp');
    const calm = starFrame({ cols: 21, rows: 21, t: 0, cellAspect: 1 });
    const fled = starFrame({ cols: 21, rows: 21, t: 0, cellAspect: 1, mouse: { x: 0.5, y: 0.5, s: 1 } });
    expect(RAMP.indexOf(fled[10][10])).toBeLessThan(RAMP.indexOf(calm[10][10]));
  });
});
