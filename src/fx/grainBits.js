import { mulberry32 } from './random';

export function grainBits(size, seed) {
  const rand = mulberry32(seed);
  return Uint8Array.from({ length: size * size }, () => (rand() > 0.5 ? 1 : 0));
}
