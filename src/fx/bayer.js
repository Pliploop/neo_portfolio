export function bayerMatrix(n) {
  if (n === 1) return [[0]];
  const half = bayerMatrix(n / 2);
  const size = n / 2;
  return Array.from({ length: n }, (_, y) => Array.from({ length: n }, (_, x) => {
    const base = 4 * half[y % size][x % size];
    const quadrant = (y < size ? 0 : 2) + (x < size ? 0 : 1);
    return base + [0, 2, 3, 1][quadrant];
  }));
}

const CACHE = new Map();

function matrix(n) {
  if (!CACHE.has(n)) CACHE.set(n, bayerMatrix(n));
  return CACHE.get(n);
}

export function bayerThreshold(x, y, n = 8) {
  const m = matrix(n);
  return (m[y % n][x % n] + 0.5) / (n * n);
}

export function ditherBit(value, x, y, n = 8) {
  return value > bayerThreshold(x, y, n) ? 1 : 0;
}
