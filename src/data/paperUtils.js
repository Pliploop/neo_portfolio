export const PAPER_FILTERS = [
  { id: 'all', label: 'All' },
  { id: '2026', label: '2026' },
  { id: '2025', label: '2025' },
  { id: '2024', label: '2024' },
  { id: 'oral', label: 'Oral' },
  { id: 'award', label: 'Award' },
  { id: 'journal', label: 'Journal' },
];

const PREDICATES = {
  all: () => true,
  2026: (p) => p.year === 2026,
  2025: (p) => p.year === 2025,
  2024: (p) => p.year === 2024,
  oral: (p) => Boolean(p.presentationType?.includes('oral')),
  award: (p) => (p.awards?.length ?? 0) > 0,
  journal: (p) => Boolean(p.isJournal),
};

export function featuredPapers(papers) {
  return papers.filter((p) => p.featured);
}

export function filterPapers(papers, filterId) {
  const test = PREDICATES[filterId] ?? PREDICATES.all;
  // "All" leaves out featured papers (shown above the list); specific filters search everything.
  if (!PREDICATES[filterId] || filterId === 'all') return papers.filter((p) => !p.featured);
  return papers.filter(test);
}

export function badgesFor(paper) {
  const out = [{ label: paper.venue, accent: false }];
  if (paper.isJournal) out.push({ label: 'Journal', accent: false });
  if (paper.presentationType?.includes('oral')) out.push({ label: 'Oral', accent: false });
  if (paper.presentationType?.includes('poster')) out.push({ label: 'Poster', accent: false });
  (paper.awards ?? []).forEach((a) => out.push({ label: a, accent: true }));
  return out;
}

export function isOwner(name) {
  return /julien guinot/i.test(name);
}

export function groupByYear(papers) {
  const map = new Map();
  papers.forEach((p) => map.set(p.year, [...(map.get(p.year) ?? []), p]));
  return [...map.entries()].sort((a, b) => b[0] - a[0]);
}
