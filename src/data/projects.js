export const projects = [
  {
    title: 'Sparse Steerable Retrieval',
    href: 'https://pliploop.github.io/sparse-steer-retrieval/',
    description: 'Project page for the ISMIR 2026 paper. Pick a seed track and a free-form concept, then drag a slider to amplify or suppress it in the retrieved results.',
    links: [
      { label: 'Demo', href: 'https://huggingface.co/spaces/Pliploop/steerable-retrieval' },
      { label: 'Model', href: 'https://huggingface.co/Pliploop/steerable-retrieval-sae' },
      { label: 'Code', href: 'https://github.com/Pliploop/sparse-steer-retrieval' },
    ],
    seed: 41,
  },
  {
    title: 'Music Lenses',
    href: 'https://pliploop.github.io/sparse-steer-retrieval/lenses/',
    description: 'An interactive map of a music collection. Start from a song or artist, choose a lens to change how tracks relate to each other, and listen to the neighbours.',
    links: [{ label: 'How it works', href: 'https://pliploop.github.io/sparse-steer-retrieval/lenses/explanation.html' }],
    seed: 52,
  },
];
