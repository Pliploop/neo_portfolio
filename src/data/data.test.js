import { papers } from './papers';
import { filterPapers, featuredPapers, badgesFor, isOwner, groupByYear } from './paperUtils';
import { about, playerLines, research } from './about';
import { music, fonkey, productions, commuz } from './music';
import { educationData, experienceData } from './education';

const EM_DASH = /—/;
const BANNED = /fascinat|intersection of|passionate|journey/i;

function allStrings(value) {
  if (typeof value === 'string') return [value];
  if (Array.isArray(value)) return value.flatMap(allStrings);
  if (value && typeof value === 'object') return Object.values(value).flatMap(allStrings);
  return [];
}

test('copy has no em dashes or stock phrasing', () => {
  const strings = allStrings([about, playerLines, research, music, fonkey, productions, commuz, educationData, experienceData]);
  strings.forEach((s) => {
    expect(s).not.toMatch(EM_DASH);
    expect(s).not.toMatch(BANNED);
  });
});

test('featured papers are excluded from the filtered list', () => {
  const featured = featuredPapers(papers);
  expect(featured.length).toBeGreaterThan(0);
  filterPapers(papers, 'all').forEach((p) => expect(p.featured).toBeFalsy());
});

test('filters', () => {
  expect(filterPapers(papers, 'journal').every((p) => p.isJournal)).toBe(true);
  expect(filterPapers(papers, '2024').every((p) => p.year === 2024)).toBe(true);
  expect(filterPapers(papers, 'oral').every((p) => p.presentationType?.includes('oral'))).toBe(true);
  expect(filterPapers(papers, 'unknown')).toEqual(filterPapers(papers, 'all'));
});

test('badges are bracket-ready labels with only awards accented', () => {
  const b = badgesFor({ venue: 'ISMIR 2025', presentationType: 'oral,poster', awards: ['Best Paper Nominee'] });
  expect(b).toEqual([
    { label: 'ISMIR 2025', accent: false },
    { label: 'Oral', accent: false },
    { label: 'Poster', accent: false },
    { label: 'Best Paper Nominee', accent: true },
  ]);
});

test('owner detection and year grouping', () => {
  expect(isOwner('Julien Guinot')).toBe(true);
  expect(isOwner('Elio Quinton')).toBe(false);
  const groups = groupByYear([{ year: 2024 }, { year: 2025 }, { year: 2024 }]);
  expect(groups.map(([y, ps]) => [y, ps.length])).toEqual([[2025, 1], [2024, 2]]);
});

test('commuz plays each have a spotify album', () => {
  expect(commuz.plays).toHaveLength(4);
  commuz.plays.forEach((p) => expect(p.spotify).toMatch(/^https:\/\/open\.spotify\.com\/embed\/album\//));
});
