import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const SRC = join(__dirname, '..');

function walk(dir) {
  return readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) return walk(p);
    return /\.(jsx?|css)$/.test(f) && !f.includes('.test.') ? [p] : [];
  });
}

const files = walk(SRC).map((p) => ({ path: relative(SRC, p), text: readFileSync(p, 'utf8') }));

// The restyle is Swiss and fine-grained: hairlines, no hard shadows, no heavy weights.
const BANNED = [
  { name: 'neobrutalist frame classes', re: /\bbrut(-thick|-press)?\b/ },
  { name: 'hard offset shadows', re: /shadow-hard|\d+px \d+px 0 0 rgb/ },
  { name: 'thick borders', re: /\bborder(-[trblxy])?-(2|4|8)\b|border-\[[2-9]px\]|border: [2-9]px/ },
  { name: 'black / extra-bold weights', re: /font-(extrabold|black)\b|font-weight: (800|900)/ },
];

test.each(BANNED)('no $name anywhere in src', ({ re }) => {
  const hits = files.filter((f) => re.test(f.text)).map((f) => f.path);
  expect(hits).toEqual([]);
});

test('dither fields use fine cells (2px or less)', () => {
  const coarse = files.flatMap((f) => [...f.text.matchAll(/cell=\{(\d+(?:\.\d+)?)\}/g)]
    .filter(([, n]) => Number(n) > 2)
    .map(([m]) => `${f.path}: ${m}`));
  expect(coarse).toEqual([]);
});
